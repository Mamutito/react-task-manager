import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import {
  LoaderFunction,
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ListPage, { taskListLoader } from "./pages/ListPage";
import ChatPage from "./pages/ChatPage";
import ProfilePage, { action as updateUserAction } from "./pages/ProfilePage";

import store from "./store/store";
import { ToastContainer } from "react-toastify";
import ProtectedRoute, { authLoader } from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    loader: authLoader as LoaderFunction,
    children: [
      {
        index: true,
        element: <ListPage />,
        loader: taskListLoader as LoaderFunction,
      },
      { path: "chat", element: <ChatPage /> },
      { path: "profile", element: <ProfilePage />, action: updateUserAction },
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
