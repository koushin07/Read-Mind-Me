import { Button } from "@/components/ui/button";
import { Users, Home } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

import Navigation from "@/components/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import UnauthorizePage from "@/pages/Unauthorize";
import { useEffect } from "react";

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

  console.log("first run");
  useEffect(() => {

  }, []);
  if (!isLoggedin && token == null) return <UnauthorizePage />;
  return (
    <div className="min-h-screen font-karla bg-[#F5F2EE] dark:bg-gray-900">
      <Navigation />
      {/* <Button onClick={() =>invoking}>Invoking</Button> */}
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <aside className="hidden w-64 flex-col md:flex">
          <nav className=" space-y-2">
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
          </nav>
        </aside>
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
