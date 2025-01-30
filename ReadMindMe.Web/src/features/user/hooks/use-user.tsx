import { useState } from "react";
import {
  FetchUserBySlug,
  FollowUser,
  UnFollowUser,
} from "../services/user-service";
import { UserDetail } from "../types/user";

export const useUser = () => {
  const [userSlug, setUserSlug] = useState<UserDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getUserBySlug = (slug: string) => {
    setIsLoading(true);
    setUserSlug(null);
    FetchUserBySlug(slug)
      .then((user) => setUserSlug(user))
      .finally(() => setIsLoading(false));
  };

  const followUser = async () => {
    try {
      console.log("Follow user");
      setUserSlug({ ...userSlug!, isFollowed: true });
      await FollowUser(userSlug!.id);
    } catch (error) {
      setUserSlug({ ...userSlug!, isFollowed: false });
      console.log(error);
    }
  };

  const unFollowUser = async () => {
    try {
      console.log("Unfollow user");
      setUserSlug({ ...userSlug!, isFollowed: false });
      await UnFollowUser(userSlug!.id);
    } catch (error) {
      setUserSlug({ ...userSlug!, isFollowed: true });
      console.log(error);
    }
  };

  return {
    getUserBySlug,
    userSlug,
    isLoading,
    followUser,
    unFollowUser,
  };
};
