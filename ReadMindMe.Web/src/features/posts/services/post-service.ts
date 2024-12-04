import api from "@/utils/axiosConfig"
import { CreatePost, EditPost, PostResponse } from "../types/postType";

export const getAllPost = async (): Promise<PostResponse[]> => {
    return api.get<PostResponse[]>('/Post').then((response) => response.data);
}
export const getAllPublicPost = async (): Promise<PostResponse[]> => {
    return api.get<PostResponse[]>('/Post/public').then((response) => response.data);
}

export const createPost = async (data: CreatePost): Promise<PostResponse> => {
    return api.post<PostResponse>('/Post', data).then((res) => res.data)
}

export const updatePost = async (data: EditPost) => {
    return api.put('/Post/' + data.id, { content: data.content, verse: data.verse })
}

export const deletePost = async (postId: number) => {
    return await api.delete('/Post/' + postId)
}

export const getTrendingPosts = async () => {
    return await api.get<PostResponse[]>('/Post/trending').then(res => res.data)
}
