import api from "@/utils/axiosConfig"
import { Community, CreateCommunity } from "../types/community"
import { CreateCommunityPost } from "@/features/posts/types/postType"

export const PostCommunity = async (data: CreateCommunity): Promise<Community> => {
    return api.post<Community>('/Community', data).then((res) => res.data)
}


export const getAllCommunity = async (): Promise<Community[]> => {
    return api.get<Community[]>('/Community').then((res) => res.data)
}

export const getCommunityBySlug = async (slug: string): Promise<Community> => {
    return api.get<Community>('/Community/' + slug).then((res) => {
        console.log(res)
        return res.data
    })
}

export const updateJoinCommunity = async (id: number): Promise<Community> => {
    return api.put<Community>(`/Community/join/${id}`).then(res => res.data)
}

export const createCommunityPost = async (content: CreateCommunityPost): Promise<Community> => {
    return api.post<Community>(`/Community/add-post`, content).then(res=>res.data)
}
