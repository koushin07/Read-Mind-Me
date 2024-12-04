import api from "@/utils/axiosConfig"
import { Comment, CommentRequest } from "../types/commentType"

export const PostComment = async (data: CommentRequest): Promise<Comment> => {
    return api.post<Comment>('/Comment', data).then((res) => res.data)
}

export const deleteComment = async (commentId: number): Promise<void> => {
    await api.delete<Comment>('/Comment/' + commentId)
}
