import { FiList } from "react-icons/fi";
import { BsFillChatFill } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import React from "react";
import Button from "./Button";
import IconButton from "./IconButton";
import UserProfileHeader from "./UserProfileHeader";
import { useAppSelector } from "../store/hooks";

const HeaderButtons: React.FC = () => {
  const user = useAppSelector((state) => state.users.currentUser);
  return (
    <section className="flex flex-row-reverse justify-center gap-5 md:flex-row">
      <Button text="Add New List Board" secondary className="hidden md:flex" />
      <IconButton Icon={MdAdd} className="block md:hidden" />
      <IconButton Icon={BsFillChatFill} ping />
      <IconButton Icon={FiList} />
      <UserProfileHeader user={user} />
    </section>
  );
};

export default HeaderButtons;
