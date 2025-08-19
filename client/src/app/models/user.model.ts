import { Id } from "./motorbike.model"

export interface User {
    email: string,
    username: string,
    hashedPassword: string
    accessToken?: string
    _id?: Id
}