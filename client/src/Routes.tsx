import { createBrowserRouter } from "react-router-dom";
import LayoutAuth from "./pages/auth/layout";
import SigninPage from "./pages/auth/SigninPage";
import SignupPage from "./pages/auth/SignupPage";
import Root from "./pages/root/Layout";
import ErrorPage from "./pages/ErrorPage";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();
export const router = createBrowserRouter([
  {
    element: <LayoutAuth />,
    children: [
      {
        path: "/sigin",
        element: <SigninPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ],
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: Root.loader(queryClient),
  },
]);
