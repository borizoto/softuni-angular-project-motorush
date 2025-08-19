import { Id } from "./motorbike.model"

export interface WatchlistEntry {
    _ownerId: string;
    listingId: string;
    make: string;
    model: string;
    imageUrl1: string;
    _createdOn: string;
    _id?: Id;
}