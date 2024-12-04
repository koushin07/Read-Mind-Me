import { setLogin, setLogout } from "@/features/auth/authSlice";
import { login } from "@/features/auth/services/authService";
import { LoginType, LoginResponse } from "@/features/auth/types/authType";
import { usePresence } from "@/hooks/use-presence";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const {stopConnection } = usePresence(auth.token);
  const navigate = useNavigate();

  const FormSchema = z.object({
    email: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .email({ message: "Invalid Email address" }),
    password: z.string(),
  });

  const handleLogin = (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    console.log(data);
    login({
      email: data.email,
      password: data.password,
    } as LoginType)
      .then((auth: LoginResponse) => {
        dispatch(setLogin(auth));
        setIsLoading(false);

        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(setLogout());

    navigate("/login");
    stopConnection()
  };
  return {
    auth,
    isLoading,
    handleLogin,
    handleLogout,
    FormSchema,
  };
}
