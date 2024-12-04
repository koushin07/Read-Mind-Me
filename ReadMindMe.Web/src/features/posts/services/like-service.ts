import api from "@/utils/axiosConfig"

export const likePost = async (id: number) => {
    return api.put(`/Post/like/${id}`)
}

export const unlikePost = async (id: number) => {
    return api.put(`/Post/unlike/${id}`)
}

