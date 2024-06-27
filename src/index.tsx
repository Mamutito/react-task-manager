import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Layout from "./pages/Layout";
import ListPage from "./pages/ListPage";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";

const isAuthenticated = (): boolean => {
  // TODO: implemented signin logic
  return true;
};

const ProtectedRoute = ({
  redirectPath = "/auth",
}: {
  redirectPath?: string;
}) => {
  if (!isAuthenticated()) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Layout />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: isAuthenticated() ? (
      <Navigate to="/dashboard" />
    ) : (
      <Navigate to="/auth" />
    ),
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <ListPage /> },
      { path: "chat", element: <ChatPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
  {
    path: "/auth",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" />,
  },
]);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);
