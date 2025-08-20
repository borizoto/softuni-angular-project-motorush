import { Id } from "./motorbike.model"

export interface CommentModel {
    _ownerId: string;
    text: string;
    username: string
    _createdOn: string;
    _id?: Id;
}