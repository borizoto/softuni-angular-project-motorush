import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Motorbike } from "../../models";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ListingService {
    private readonly baseUrl = environment.BASE_URL;

    constructor(private httpClient: HttpClient) { }

    getAll(): Observable<Motorbike[]> {
        return this.httpClient.get<Motorbike[]>(`${this.baseUrl}/listings`);
    }

    getOne(listingId: string): Observable<Motorbike> {
        return this.httpClient.get<Motorbike>(`${this.baseUrl}/listings/${listingId}`);
    }
}