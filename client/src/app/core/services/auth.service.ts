import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { environment } from "../../../environments/environment";
import { User } from "../../models/user.model";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly authUrl = environment.AUTH_URL;

    private _isLoggedIn = signal<boolean>(false);
    private _currentUser = signal<User | null>(null);

    isLoggedIn = this._isLoggedIn.asReadonly();
    currentUser = this._currentUser.asReadonly();

    constructor(private httpClient: HttpClient) {
        const currentUser = localStorage.getItem('currentUser');

        if (currentUser) {
            const user: User = JSON.parse(currentUser);
            this._currentUser.set(user);
            this._isLoggedIn.set(true);
        }
    }

    register(email: string, password: string, username: string, phoneNumber: string): Observable<User> {
        return this.httpClient.post<User>(`${this.authUrl}/register`, {
            email,
            password,
            username,
            phoneNumber,
        }).pipe(
            tap(user => {
                this._currentUser.set(user);
                this._isLoggedIn.set(true);
                localStorage.setItem('currentUser', JSON.stringify(user));
            })
        );
    }

    login(email: string, password: string) {
        return this.httpClient.post<User>(`${this.authUrl}/login`, {
            email,
            password,
        }).pipe(
            tap(user => {
                this._currentUser.set(user);
                this._isLoggedIn.set(true);
                localStorage.setItem('currentUser', JSON.stringify(user));
            })
        );
    }

    get accessToken(): string | null {
        return this._currentUser()?.accessToken ?? null;
    }

    logout() {
        if (!this.accessToken) {
            return;
        }

        const headers = new HttpHeaders({
            'X-Authorization': this.accessToken,
        });

        this.httpClient.get(`${this.authUrl}/logout`, { headers, observe: 'response' }).subscribe({
            next: (res) => {
                if (res.status === 204) {
                    console.log('Successfully logged out.');
                }
                this._currentUser.set(null);
                this._isLoggedIn.set(false);
                localStorage.removeItem('currentUser');
            },
            error: (err) => {
                console.error('Logout failed:', err);
                this._currentUser.set(null);
                this._isLoggedIn.set(false);
                localStorage.removeItem('currentUser');
            },
        });
    }
}