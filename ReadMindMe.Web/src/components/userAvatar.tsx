import { User } from "@/features/user/types/user";
import React, { useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

type avatarProps = {
  user: User;
};
function UserAvatar({ user }: avatarProps) {

  const onlineUsers = useSelector((state: RootState) => state.presence.onlineUser);
  const isOnline = useMemo(() => onlineUsers?.includes(user.email), [onlineUsers, user]);

  return (
    <div className="relative inline-block">
      <Avatar>
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
      <span
        className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ${
          isOnline ? "bg-green-500" : "bg-white border-2 border-gray-300"
        }`}
      />
    </div>
  );
}

export default UserAvatar;
