import { FiList } from "react-icons/fi";
import { BsFillChatFill } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import React from "react";
import Button from "./Button";
import IconButton from "./IconButton";
import UserProfileHeader from "./UserProfileHeader";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Link, useLocation } from "react-router-dom";
import { FB_AuthSignOut } from "../backend/authQueries";
import { defaultUser, setUser } from "../store/usersSlice";

const HeaderButtons: React.FC = () => {
  const user = useAppSelector((state) => state.users.currentUser);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const handleSignOut = async () => {
    await FB_AuthSignOut(user.id);
    dispatch(setUser(defaultUser));
    localStorage.removeItem("currentUser");
  };
  return (
    <section className="flex flex-row-reverse justify-center gap-5 md:flex-row">
      {location.pathname === "/dashboard" && (
        <>
          <Button
            text="Add New List Board"
            secondary
            className="hidden md:flex"
          />
          <IconButton Icon={MdAdd} className="block md:hidden" />
        </>
      )}
      {location.pathname !== "/dashboard/chat" && (
        <IconButton Icon={BsFillChatFill} ping />
      )}
      {location.pathname !== "/dashboard" && <IconButton Icon={FiList} />}
      <section className="relative group">
        <UserProfileHeader user={user} />
        <div className="group-hover:block hidden absolute">
          <ul className="w-full bg-white text-gray-700 rounded-md shadow-md min-w-max mt-5 p-1 font-semibold">
            <li>
              <Link className="hover:bg-gray-200 py-2 px-4 block" to="profile">
                Go to your profile
              </Link>
            </li>
            <li>
              <Link
                className="hover:bg-gray-200 py-2 px-4 block"
                to="/auth"
                onClick={handleSignOut}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </section>
  );
};

export default HeaderButtons;