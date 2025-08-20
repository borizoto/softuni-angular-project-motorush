import { Id } from "./motorbike.model"

export interface CommentModel {
    _ownerId: string;
    comment: string;
    username: string
    _createdOn: string;
    _id?: Id;
}