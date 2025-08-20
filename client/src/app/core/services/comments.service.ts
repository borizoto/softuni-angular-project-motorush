import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { AuthService } from "./auth.service";
import { CommentModel } from "../../models/comment.model";

@Injectable({
    providedIn: 'root'
})
export class CommentsService {
    private readonly baseUrl = environment.BASE_URL;

    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    getAll(listingId: string): Observable<CommentModel[]> {
        const searchParams = new URLSearchParams({
            where: `listingId="${listingId}"`
        })
        return this.httpClient.get<CommentModel[]>(`${this.baseUrl}/comments?${searchParams.toString()}`);
    }

    create(comment: string, listingId: string, username: string): Observable<CommentModel> {
        const accessToken = this.authService.currentUser()?.accessToken;

        if (!accessToken) {
            return throwError(() => new Error('Unauthorized!'));
        }

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-Authorization': accessToken
        });

        return this.httpClient.post<CommentModel>(
            `${this.baseUrl}/comments`,
            { comment, listingId, username },
            { headers }
        );
    }
}