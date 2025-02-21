import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Loader2, Upload, User } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { UpdateUser } from "../services/user-service";
import { useDispatch } from "react-redux";
import { setUser } from "@/features/auth/authSlice";
import { toast } from "sonner";

const profileFormSchema = z.object({
  avatar: z
    .any()
    .refine(
      (file) => !file || (file instanceof File && file.size <= 5 * 1024 * 1024),
      {
        message: "File must be under 5MB",
      }
    ),
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(160).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
export default function ProfileTab() {
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useAuth();
  const dispatch = useDispatch();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    auth.user.avatar
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      avatar: "",
      name: "",
      email: "",
      bio: "",
    },
  });
  async function onProfileSubmit(data: ProfileFormValues) {
    setIsLoading(true);
    const formData = new FormData();
    if (data.avatar instanceof File) {
      formData.append("avatar", data.avatar); // Append the avatar file
    }
    formData.append("name", data.name); // Append other fields
    formData.append("email", data.email);
    formData.append("bio", data.bio || "");

    // Send the formData instead of the `data` object
    try {
      const updatedUser = await UpdateUser(formData);

      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(updatedUser));
      dispatch(setUser(updatedUser));
      toast.success("Profile Updated", {
        description: "Your profile information has been updated successfully.",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      profileForm.setValue("avatar", file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };
  useEffect(() => {
    if (auth.user.avatar) {
      setAvatarPreview(auth.user.avatar);
    }
    if (auth.user) {
      profileForm.reset({
        avatar: auth.user.avatar,
        name: auth.user.name,
        email: auth.user.email,
        bio: auth.user.bio,
      });
    }
  }, [auth.user, profileForm]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>
          Manage your public profile information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...profileForm}>
          <form
            onSubmit={profileForm.handleSubmit(onProfileSubmit)}
            className="space-y-8"
          >
            <FormField
              control={profileForm.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <h3 className="mb-4 text-lg font-medium">Avatar</h3>
                      <div className=" relative w-fit items-center space-x-4 ">
                        <Input
                          id="avatar-upload"
                          type="file"
                          accept="image/png, image/jpeg"
                          className="hidden "
                          disabled={isLoading}
                          onChange={(e) => {
                            handleFileSelect(e);
                            field.onChange(e.target.files?.[0]);
                          }}
                          ref={fileInputRef}
                        />
                        <Avatar
                          onClick={handleAvatarClick}
                          className="h-24 w-24 cursor-pointer hover:shadow-2xl"
                        >
                          <AvatarImage
                            src={avatarPreview || ""}
                            alt="Profile picture"
                          />
                          <AvatarFallback>
                            <User className="h-12 w-12 text-muted-foreground" />
                          </AvatarFallback>
                        </Avatar>
                        <div
                          onClick={handleAvatarClick}
                          className="absolute cursor-pointer inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 hover:opacity-100 transition-opacity"
                        >
                          <Upload className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <div className="pl-2 pt-2">
                        <Button
                          disabled={isLoading}
                          onClick={handleAvatarClick}
                          type="button"
                          size={"sm"}
                        >
                          Change Avatar
                        </Button>
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Click on the avatar or button to select an image. Max file
                    size: 5MB.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={profileForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="johndoe"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={profileForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="john@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={profileForm.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {isLoading ? (
              <Button disabled>
                <Loader2 className="animate-spin mx-9" />
              </Button>
            ) : (
              <Button type="submit">Save Changes</Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
