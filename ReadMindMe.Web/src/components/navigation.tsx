import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

import {
  Users,
  Home,
  Search,
  MessageCircleMore,
  LogOut,
  Menu,
  Settings,
  Bell,
  CircleAlert,
  BookOpen,
} from "lucide-react";
import * as signalR from "@microsoft/signalr";

import { Link, NavLink } from "react-router-dom";
import { SheetTrigger, SheetContent, Sheet } from "./ui/sheet";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useDispatch } from "react-redux";
import { User } from "@/features/user/types/user";
import { usePresence } from "@/hooks/use-presence";
import { setLogin } from "@/features/auth/authSlice";

function Navigation() {
  const { auth} = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { handleLogout } = useAuth();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const { createConnection } = usePresence(token!);
  const navlinks = [
    {
      path: "/home",
      label: "Home",
      icon: Home,
    },
    {
      path: "/community",
      label: "Community",
      icon: Users,
    },
    {
      path: "/explore",
      label: "Explore",
      icon: Search,
    },
    {
      path: "/messages",
      label: "Messages",
      icon: MessageCircleMore,
    },
  ];

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
          .withUrl("http://localhost:5081/hubs/presence", {
            accessTokenFactory: () => token!, // Add auth token if needed
          })
          .withAutomaticReconnect()
          .build();

    connection
      .start()
      .then(() => console.log("SignalR Notification started"))
      .catch((err) => console.error("SignalR connection error: ", err));

    connection.on("ReceiveNotification", (message: string) => {
      alert(message); // Handle the received notification
    });

    const stringUser = localStorage.getItem("user");

    if (stringUser && token) {
      const user: User = JSON.parse(stringUser) as User;
      // dispatch(setToken(token));
      // dispatch(setUser(user));
      dispatch(setLogin({ token, user }));
      createConnection();
    }
  }, []);
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" to="/home">
        <BookOpen className="h-6 w-6 mr-2" />
        <span className="font-bold">ReadMindMe</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="px-0 text-base hover:bg-transparent focus:ring-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Navigation
              </h2>
              <div className="space-y-1">
                {navlinks.map((link) => (
                  <NavLink to={link.path} key={link.path}>
                    {({ isActive }) => (
                      <Button
                        variant="ghost"
                        className={`w-full justify-start ${
                          isActive
                            ? "underline decoration-2 underline-offset-2"
                            : ""
                        }`}
                      >
                        <link.icon className="mr-2 h-4 w-4" />
                        {link.label}
                      </Button>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-72" align="end" forceMount>
            <DropdownMenuItem>
              <CircleAlert color="orange" className="mr-2 h-4 w-4" />
              <h4 className="truncate text-xs font-medium tracking-normal">
                P. Diddy sent you a message
              </h4>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CircleAlert color="orange" className="mr-2 h-4 w-4" />
              <h4 className="text-xs truncate font-medium tracking-normal">
                P. Diddy add you to budhha community
              </h4>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost"  size="icon">
              <Avatar className="h-8 w-8">
                <AvatarImage className="rounded-full" src={auth.user.avatar} alt="User" />
                <AvatarFallback>{auth.user.name && auth.user.name[0]} </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <Link to={"account/settings"}>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
}

export default Navigation;
