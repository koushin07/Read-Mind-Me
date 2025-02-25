import api from "@/utils/axiosConfig"
import { SearchResult, User, UserDetail } from "../types/user";

export const UpdateUser = async (data: FormData): Promise<User> => {
    return api.put<User>("/User", data, {
        headers: {
            "Content-Type": "multipart/form-data", // Set the appropriate content type
        },
    }).then(response => response.data);
}

export const FetchUserBySlug = async (slug: string): Promise<UserDetail> => {
    return api.get<UserDetail>("/User/profile/" + slug).then((res) => res.data)
}

export const FollowUser = async (userId: number): Promise<void> => {
    api.get('/User/follow/' + userId)
}

export const UnFollowUser = async (userId: number): Promise<void> => {
    api.get('/User/unfollow/' + userId)
}

export const GetSearch = async (searchTerm: string): Promise<SearchResult> => {
    return api.get<SearchResult>('/User/Search/' + searchTerm).then(res=>res.data)
}
