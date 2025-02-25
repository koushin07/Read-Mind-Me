import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/Landing";
import HomePage from "./pages/Home";
import CommunityPage from "./pages/Community";
import MainLayout from "./layout/MainLayout";
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
import { GoogleOAuthProvider } from '@react-oauth/google';
import SearchPage from "./pages/Search";
// import MessageLayout from "./pages/Message";
// import MessagePage from "./layout/MessageLayout";


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
      { path: "profile/:slug", element: <ProfilePage /> },
      { path: "/search", element: <SearchPage /> },
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



  { path: "*", element: <NotFoundPage /> },
]);
function App() {
  useEffect(() => {
    document.title = "Read Mind Me"; // Set the page title
  }, []);
  // return
  return (
    <GoogleOAuthProvider clientId="1018879496409-o3528ll0ccrbfsukp6g147s5rn4h0nv2.apps.googleusercontent.com">
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster closeButton position="bottom-right" />
      </Provider>
      </GoogleOAuthProvider>
  );
}

export default App;
