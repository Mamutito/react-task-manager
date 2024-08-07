import React, { useEffect } from "react";
import { Navigate, useLoaderData } from "react-router-dom";
import Layout from "../pages/Layout";
import { useAppDispatch } from "../store/hooks";
import { setUser } from "../store/usersSlice";
import { getUserInfo } from "../backend/authQueries";
import { userType } from "../types";
import CatchErr from "../utils/catchErr";

const ProtectedRoute: React.FC = () => {
  const dispatch = useAppDispatch();
  const authenticatedUser = useLoaderData() as userType;
  useEffect(() => {
    if (authenticatedUser) {
      dispatch(setUser(authenticatedUser));
    }
  }, [authenticatedUser, dispatch]);
  return authenticatedUser ? <Layout /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;

export const authLoader = async () => {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    const user: userType = JSON.parse(currentUser);
    try {
      return await getUserInfo(user.id);
    } catch (error) {
      CatchErr(error);
    }
  }
  return false;
};
