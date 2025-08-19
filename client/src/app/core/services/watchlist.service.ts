import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { AuthService } from "./auth.service";
import { WatchlistEntry } from "../../models/watchlistEntry.model";

@Injectable({
    providedIn: 'root'
})
export class WatchlistService {
    private readonly baseUrl = environment.BASE_URL;

    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    addToWatchlist(listingId: string, make: string, model: string, imageUrl1: string): Observable<WatchlistEntry> {
        const accessToken = this.authService.currentUser()?.accessToken;

        if (!accessToken) {
            return throwError(() => new Error('Unauthorized!'));
        }

        const body = { listingId, make, model, imageUrl1 };
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-Authorization': accessToken
        });

        return this.httpClient.post<WatchlistEntry>(`${this.baseUrl}/watchlist`, body, { headers });
    }

    getWatchlist(userId: string): Observable<WatchlistEntry[]> {
        const searchParams = new URLSearchParams({
            where: `_ownerId="${userId}"`
        })
        return this.httpClient.get<WatchlistEntry[]>(`${this.baseUrl}/watchlist?${searchParams.toString()}`);
    }

    getOwnWatchlist(listingId: string, userId: string): Observable<WatchlistEntry[]> {
        const searchParams = new URLSearchParams({
            where: `_ownerId="${userId}" AND listingId="${listingId}"`
        });

        return this.httpClient.get<WatchlistEntry[]>(`${this.baseUrl}/watchlist?${searchParams.toString()}`);
    }

    getWatchlistedCount(listingId: string): Observable<WatchlistEntry[]> {
        const searchParams = new URLSearchParams({
            where: `listingId="${listingId}"`
        });

        return this.httpClient.get<WatchlistEntry[]>(`${this.baseUrl}/watchlist?${searchParams.toString()}`);
    }
}