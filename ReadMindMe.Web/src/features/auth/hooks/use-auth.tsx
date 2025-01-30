import { setLogin, setLogout } from "@/features/auth/authSlice";
import { googleLogin, login } from "@/features/auth/services/authService";
import {
  LoginType,
  LoginResponse,
  GoogleData,
} from "@/features/auth/types/authType";
import { usePresence } from "@/hooks/use-presence";
import { RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const { stopConnection } = usePresence(auth.token);
  const navigate = useNavigate();

  const registerFormSchema = z
    .object({
      name: z.string().min(3).max(50),
      email: z.string().email(),
      password: z.string().min(8).max(50),
      confirmPassword: z.string().min(8).max(50),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
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
    stopConnection();
  };

  const handleLoginOauth = async (data: GoogleData) => {
    try {
      setIsLoading(true);
      const auth: LoginResponse = await googleLogin(data);
      console.log(auth);
      dispatch(setLogin(auth));
      localStorage.setItem("token", auth.token);
      localStorage.setItem("user", JSON.stringify(auth.user));
      navigate("/home");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    auth,
    isLoading,
    handleLogin,
    handleLogout,
    FormSchema,
    registerForm,
    registerFormSchema,
    setIsLoading,
    handleLoginOauth,
  };
}
