import { User } from "@/features/user/types/user";
import { Comment } from "@/features/comments/types/commentType";
import { Community } from "@/features/communities/types/community";
import { z } from "zod";

export interface PostResponse {
    slug?: string;
    id: number;
    content: string;
    likes: number;
    isLike: boolean;
    verse: Verse;
    author: User;
    comments: Comment[];
    createdAt: string;
    isPublic: boolean;
    postType: postType;
    community: Community[] | null;

}


export type Verse = {
    text: string,
    book: SourceType
}

export type SourceType = "Bible" | "Quran" | "Torah" | "Bhagavad Gita" | "Other";


export type PostRequest = {
    content: string;
    verse: Verse
}


export type trending = {
    id: number,
    name: string,
    posts: number,
}
export type CreatePost = {
    content: string,
    verse: Verse | null,
    isPublic: boolean,
    postType: postType,


}

export type CreateCommunityPost = {
    content: string,
    verse: Verse | null,
    isPublic: boolean,
    postType: postType,
    communityId: number,
}

export type postType = "book" | "prayer" | "question" | "thoughts" | "guide"


export type EditPost = {
    id: number,
    content: string,
    verse: Verse,
    postType: postType
}

export type SourceList = {
    value: SourceType;
    label: string;
};


export const postFormSchema = z.object({
    post: z.string(),
    postType: z.enum(["prayer", "guide", "thoughts", "question", "book"]),
    verse: z.object({
        text: z.string(),
        source: z
            .enum(["Bible", "Quran", "Torah", "Bhagavad Gita", "Other"])
            .default("Bible"),
    }),
});


export interface PostActivity {
    id: number;
    content: string;
    likeCount: number;
    commentCount: number;
    createdAt: string;
}
