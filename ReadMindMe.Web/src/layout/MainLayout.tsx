import { Button } from "@/components/ui/button";
import { Users, Home } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

import Navigation from "@/components/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import UnauthorizePage from "@/pages/Unauthorize";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/features/auth/hooks/use-auth";

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
  // {
  //   path: "/explore",
  //   label: "Explore",
  //   icon: Search,
  // },
  // {
  //   path: "/messages",
  //   label: "Messages",
  //   icon: MessageCircleMore,
  // },
];

function MainLayout() {
  const { isLoggedin } = useSelector((state: RootState) => state.auth);
  const token = localStorage.getItem("token");
  const { auth } = useAuth();
  console.log("first run");
  useEffect(() => {}, []);
  if (!isLoggedin && token == null) return <UnauthorizePage />;
  return (
    <div className="min-h-screen font-karla bg-[#F5F2EE] dark:bg-gray-900">
  <Navigation />

  <div className="container mx-auto  flex flex-col md:flex-row gap-8 h-[calc(100vh-56px)]"> {/* Adjusted height to account for Navigation */}
    <aside className="hidden my-4 ml-4 py-2 w-64 flex-col md:flex bg-secondary border shadow">
      <div className="">
        <div className="flex flex-col items-center">
          <Avatar className="w-24 h-24">
            <AvatarImage src={auth.user.avatar} />
            <AvatarFallback>{auth.user.name && auth.user.name[0]}</AvatarFallback>
          </Avatar>
          <h1 className="capitalize text-center mt-4 text-xl font-semibold">
            {auth.user.name}
          </h1>
        </div>
      </div>
      <nav className="flex flex-col justify-evenly pt-10">
        {navlinks.map((link) => (
          <NavLink className="" to={link.path} key={link.path}>
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
      </nav>
    </aside>

    <main className="flex-1 overflow-y-auto">
      <Outlet />
    </main>
  </div>
</div>
  );
}

export default MainLayout;
