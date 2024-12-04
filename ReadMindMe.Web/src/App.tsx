import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/Landing";
import HomePage from "./pages/Home";
import CommunityPage from "./pages/Community";
import ExplorePage from "./pages/Explore";
import MainLayout from "./layout/MainLayout";
import MessagePage from "./pages/Message";
import CommunityDetailPage from "./pages/CommunityDetail";
import { useEffect } from "react";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import SettingsPage from "./pages/Settings";
import { Provider } from "react-redux";
import store from "./store/store";
import { Toaster } from "@/components/ui/sonner";
import NotFoundPage from "./pages/NotFound";
import AccountLayout from "./layout/AccountLayout";
import ProfilePage from "./pages/Profile";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },

  {
    Component: MainLayout,
    children: [
      { path: "/home", element: <HomePage /> },
      { path: "/community", element: <CommunityPage /> },
      { path: "/community/:slug", element: <CommunityDetailPage /> },
      // { path: "/explore", element: <ExplorePage /> },
    ],
  },
  {
    Component: AccountLayout,
    path: "/account",
    children: [
      { path: "settings", element: <SettingsPage /> },
      // { path: "/notifications", element: <SettingsPage /> },
      // { path: "/security", element: <SettingsPage /> },
    ],
  },

  { path: "profile", element: <ProfilePage /> },

  { path: "/messages", element: <MessagePage /> },
  { path: "*", element: <NotFoundPage /> },
]);
function App() {
  useEffect(() => {
    document.title = "Read Mind Me"; // Set the page title
  }, []);
  // return
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster closeButton position="bottom-right" />
    </Provider>
  );
}

export default App;
