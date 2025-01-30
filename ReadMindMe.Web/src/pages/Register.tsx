import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { BookOpen, Loader2 } from "lucide-react";
import { registerType } from "@/features/auth/types/authType";
import { register } from "@/features/auth/services/authService";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { useState } from "react";
import { useAuth } from "@/features/auth/hooks/use-auth";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { registerFormSchema: _registerFormSchema, registerForm } = useAuth();
  const navigate = useNavigate();


  const onSubmit = async (data: z.infer<typeof _registerFormSchema>) => {
    console.log(data);
    setIsLoading((prev) => !prev);
    try {
      await register({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      } as registerType);
      toast.success("Success Registration", {
        description: "you can now login to your account",
      });
      setIsLoading((prev) => !prev);
      navigate("/login");
    } catch (err) {
      console.log(err);

      setIsLoading((prev) => !prev);
    }
  };
  return (
    <div className="flex flex-col min-h-screen font-karla text-[#8B4513] bg-gradient-radial-to-bm from-[#F1E0CB] to-15% to-[#F5F2EE]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" to="/">
          <BookOpen className="h-6 w-6 mr-2" />
          <span className="font-bold">ReadMindMe</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full bg-white shadow rounded-lg max-w-md space-y-8 px-4 py-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Create Your Account</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your information to get started
            </p>
          </div>
          <Form {...registerForm}>
            <form
              onSubmit={registerForm.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={registerForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John@example.com"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John@example.com"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isLoading ? (
                <Button className="w-full" type="submit" disabled>
                  <Loader2 className="animate-spin " />
                </Button>
              ) : (
                <Button className="w-full" type="submit">
                  Sign Up
                </Button>
              )}
            </form>
          </Form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link className="underline" to="/login">
              Log in
            </Link>
          </p>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 ReadMindMe. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
