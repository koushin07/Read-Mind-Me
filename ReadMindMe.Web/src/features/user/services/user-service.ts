import api from "@/utils/axiosConfig"
import { User } from "../types/user";

export const UpdateUser = async (data: FormData): Promise<User> => {
    return api.put<User>("/User", data, {
        headers: {
            "Content-Type": "multipart/form-data", // Set the appropriate content type
        },
    }).then(response => response.data);
}
