import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
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

import store from "./store/store";
import { ToastContainer } from "react-toastify";

const isAuthenticated = (): boolean => {
  // TODO: implemented signin logic
  return false;
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
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer position="top-center" />
  </Provider>
);
