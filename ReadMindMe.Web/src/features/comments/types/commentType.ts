import { User } from "@/features/user/types/user";

export type Comment = {
    id: number,
    user: User,
    avatar: string,
    content: string,
    createdAt?: Date,
    likes?: number,
}

export type NewComment = { [key: number]: string };

export type CommentRequest = {
    postId: number,
    content: string,
}
