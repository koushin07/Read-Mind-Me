import { User } from "../../user/types/user"

export type LoginType = {
    email: string,
    password: string,
}
export type registerType = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export type LoginResponse = {
    user: User,
    token: string,
}

export type AuthState = {
    user: User ;
    token: string ;
    error: string;
    isLoggedin: boolean
}
export interface AuthError {
    code: string;
    message: string;
  }
