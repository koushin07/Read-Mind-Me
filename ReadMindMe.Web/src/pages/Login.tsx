/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { jwtDecode } from "jwt-decode";
import { BookOpen, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { GoogleLogin } from "@react-oauth/google";
export default function LoginPage() {
  const { handleLogin, isLoading, FormSchema, handleLoginOauth } = useAuth();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });



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
          <div className="space-y-2  text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your credentials to access your account
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isLoading ? (
                <Button className="w-full" type="submit" disabled>
                  <Loader2 className="animate-spin" />
                </Button>
              ) : (
                <Button className="w-full" type="submit">
                  Login
                </Button>
              )}
            </form>
          </Form>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const decoded = jwtDecode(credentialResponse.credential!);

              handleLoginOauth({
                email: (decoded as any).email!,
                name: (decoded as any).name!,
                picture: (decoded as any).picture,
              });

            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
          ;
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Link className="underline" to="/register">
              Register
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
