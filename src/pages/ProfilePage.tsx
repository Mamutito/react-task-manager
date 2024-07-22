import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Input from "../components/Input";
import { Form, redirect, useNavigate, useNavigation } from "react-router-dom";
import Button from "../components/Button";
import { toastErr, toastSucc } from "../utils/toast";
import avatarGenerator from "../utils/avatarGenerator";
import { FB_deleteAccount, FB_saveProfile } from "../backend/authQueries";
import { FormProfileData } from "../types";
import { defaultUser, setUser } from "../store/usersSlice";

const ProfilePage: React.FC = () => {
  const user = useAppSelector((state) => state.users.currentUser);
  const [imageURL, setImageURL] = useState(user.img);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigation = useNavigation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = navigation.state === "submitting";
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmed) {
      setDeleteLoading(true);
      const result = await FB_deleteAccount();
      if (result.success) {
        dispatch(setUser(defaultUser));
        toastSucc("Account deleted successfully.");
        navigate("/auth");
      } else {
        toastErr(result.error);
      }
    }
  };
  const handleAvatarGeneration = () => {
    setImageURL(avatarGenerator());
  };
  useEffect(() => {
    setImageURL(user.img);
  }, [user.img]);

  return (
    <section className="bg-white shadow-md max-w-2xl m-5 md:m-auto md:mt-10 rounded-xl space-y-5 flex flex-col p-6 md:p-10">
      <header
        className="relative self-center cursor-pointer"
        onClick={!loading ? handleAvatarGeneration : undefined}
      >
        <img
          className="w-32 h-32 md:h-48 md:w-48 rounded-full p-0.5 ring-gray-300 ring-2"
          src={`${imageURL}`}
          alt="random avatar"
        />
        <span className="absolute top-7 left-28 md:left-40 w-5 h-5 rounded-full bg-green-400 border-gray-800 border-2"></span>
      </header>
      <p className="text-gray-400 text-sm text-center">
        Note: Click on the image to temporary change it, when you like it, then
        save profile. You can leave password and username as they are if you
        don't want to change them.
      </p>
      <Form method="post" className="flex flex-col space-y-2">
        <input type="hidden" name="img" value={imageURL} />
        <Input
          type="email"
          name="email"
          defaultValue={user.email}
          className="bg-gray-100"
          required
          disabled
        />
        <Input
          type="text"
          name="username"
          placeholder="Enter user name"
          defaultValue={user.username}
          required
        />
        <Input type="password" name="password" placeholder="Enter password" />
        <Input
          type="password"
          name="password-confirm"
          placeholder="Enter again password"
        />
        <Button
          text="Update profile"
          loading={loading}
          disabled={deleteLoading}
        />
        <Button
          type="button"
          text="Delete account"
          secondary
          onClick={handleDeleteAccount}
          disabled={loading}
          loading={deleteLoading}
        />
      </Form>
    </section>
  );
};

export default ProfilePage;

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();

  const userData = Object.fromEntries(formData) as FormProfileData;
  if (userData.password.length < 6 && userData.password !== "") {
    toastErr("Password should be at least 6 characters");
    return false;
  }
  if (userData.password !== userData["password-confirm"]) {
    toastErr("Passwords do not match");
    return false;
  }

  await FB_saveProfile({
    username: userData.username,
    email: userData.email,
    password: userData.password,
    img: userData.img,
  });

  return redirect("/dashboard/profile");
};
