import { FiList } from "react-icons/fi";
import { BsFillChatFill } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import React from "react";
import Button from "./Button";
import IconButton from "./IconButton";
import UserProfileHeader from "./UserProfileHeader";
import { useAppSelector } from "../store/hooks";
import { Link } from "react-router-dom";

const HeaderButtons: React.FC = () => {
  const user = useAppSelector((state) => state.users.currentUser);
  return (
    <section className="flex flex-row-reverse justify-center gap-5 md:flex-row">
      <Button text="Add New List Board" secondary className="hidden md:flex" />
      <IconButton Icon={MdAdd} className="block md:hidden" />
      <IconButton Icon={BsFillChatFill} ping />
      <IconButton Icon={FiList} />
      <section className="relative group">
        <UserProfileHeader user={user} />
        <div className="group-hover:block hidden absolute">
          <ul className="w-full bg-white text-gray-700 rounded-md shadow-md min-w-max mt-5 p-1 font-semibold">
            <li>
              <Link className="hover:bg-gray-200 py-2 px-4 block" to="/profile">
                Go to your profile
              </Link>
            </li>
            <li>
              <Link className="hover:bg-gray-200 py-2 px-4 block" to="/auth">
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
