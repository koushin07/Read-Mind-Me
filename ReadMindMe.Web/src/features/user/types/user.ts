import { JoinedCommunity } from "@/features/communities/types/community";
import { PostActivity } from "@/features/posts/types/postType";

export interface User {
    id: number;
    name: string;
    slug: string;
    email: string;
    bio: string;
    password: string;
    avatar: string;
    createdAt: string;
}
export type People = {
    id: number,
    name: string
    avatar: string,
    role: string,
    following: boolean,
}

export interface UserDetail {
    id: number;
    name: string;
    slug: string;
    email: string;
    followersCount: number;
    followingCount: number;
    isFollowed: boolean;
    postsCount: number;
    bio: string;
    password: string;
    avatar: string;
    postActivities: PostActivity[];
    communities: JoinedCommunity[];
    createdAt: string;
}

