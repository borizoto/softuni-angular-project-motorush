import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { Motorbike } from "../../models";
import { environment } from "../../../environments/environment";
import { AuthService } from "./auth.service";
import { WatchlistEntry } from "../../models/watchlistEntry.model";

@Injectable({
    providedIn: 'root'
})
export class ListingService {
    private readonly baseUrl = environment.BASE_URL;

    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    getAll(): Observable<Motorbike[]> {
        return this.httpClient.get<Motorbike[]>(`${this.baseUrl}/listings`);
    }

    getOne(listingId: string): Observable<Motorbike> {
        return this.httpClient.get<Motorbike>(`${this.baseUrl}/listings/${listingId}`);
    }

    create(bikeData: Partial<Motorbike>): Observable<Motorbike> {
        const accessToken = this.authService.currentUser()?.accessToken;

        if (!accessToken) {
            return throwError(() => new Error('Unauthorized!'));
        }

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-Authorization': accessToken
        });

        return this.httpClient.post<Motorbike>(
            `${this.baseUrl}/listings`,
            bikeData,
            { headers }
        );
    }

    edit(bikeData: Partial<Motorbike>, listingId: string): Observable<Motorbike> {
        const accessToken = this.authService.currentUser()?.accessToken;

        if (!accessToken) {
            return throwError(() => new Error('Unauthorized!'));
        }

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-Authorization': accessToken
        });

        return this.httpClient.put<Motorbike>(
            `${this.baseUrl}/listings/${listingId}`,
            bikeData,
            { headers }
        );
    }

    delete(listingId: string): Observable<void> {
        const accessToken = this.authService.currentUser()?.accessToken;

        if (!accessToken) {
            return throwError(() => new Error('Unauthorized!'));
        }

        const headers = new HttpHeaders({
            'X-Authorization': accessToken
        });

        return this.httpClient.delete<void>(`${this.baseUrl}/listings/${listingId}`, { headers });
    }

    getByOwner(userId: string): Observable<WatchlistEntry[]> {
        const searchParams = new URLSearchParams({
            where: `_ownerId="${userId}"`
        })

        return this.httpClient.get<WatchlistEntry[]>(
            `${this.baseUrl}/listings?${searchParams.toString()}`
        );
    }

    getLatestListings(): Observable<Motorbike[]> {
        const searchParams = new URLSearchParams({
            sortBy: '_createdOn desc',
            pageSize: '5'
        });

        return this.httpClient.get<Motorbike[]>(
            `${this.baseUrl}/listings?${searchParams.toString()}`
        );
    }
}