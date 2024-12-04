import { User } from "@/features/user/types/user"
import { PostResponse } from "@/features/posts/types/postType"

export type Community = {
    id: number,
    name: string,
    slug: string,
    description: string,
    isJoin: boolean,
    userCommunities: UserCommunities[],
    activities: CommunityActivity[],
    posts: PostResponse[],
    about: string,
    guidelines: [{ value: string }],

}
export type CommunityActivity = {
    id: number,
    user: string,
    action: string,
}

export type CreateCommunity = {
    name: string,
    description: string,
    about: string,
    guidelines: [{ value: string }]
}
export type UserCommunities = {
    user: User
    role: string
}

