
import api from "@/utils/axiosConfig";
import { LoginResponse, LoginType, registerType } from "../types/authType";


export const login = async (credential: LoginType) : Promise<LoginResponse> => {
   const response = await api.post<LoginResponse>(`/Authentication/login`, credential)
      .then(response => response.data)


   localStorage.setItem('token', response.token)
   localStorage.setItem('user', JSON.stringify(response.user))
   return response;

}

export const register = (form: registerType) => {
   return api.post(`/Authentication/register`, form)

}

export const logout = () => {

}
