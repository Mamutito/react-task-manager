import React from "react";
import { userType } from "../types";
import formatDate from "../utils/formDate";

type Props = {
  user: userType;
  onClick?: () => void;
};

const UserProfileHeader: React.FC<Props> = ({ user, onClick }) => {
  return (
    <section
      className="inline-flex items-center space-x-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <img
          className="w-11 h-11 rounded-full p-0.5 ring-white ring-2"
          src={`${user.img}.png`}
          alt="random avatar"
        />
        <span className="absolute -top-1 -right-0 rounded-full h-4 w-4 bg-green-400 border-gray-800 border-2"></span>
      </div>
      <div className="hidden md:block">
        <p className="text-white font-semibold -mb-1">{user.username}</p>
        <small className="text-white">{`Joined in ${
          user.creationTime && formatDate(user.creationTime)
        }`}</small>
      </div>
    </section>
  );
};

export default UserProfileHeader;
