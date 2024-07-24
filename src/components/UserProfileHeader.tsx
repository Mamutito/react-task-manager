import React from "react";
import { userType } from "../types";
import formatDate from "../utils/formDate";

type Props = {
  user: userType;
  onClick?: () => void;
  otherUser?: boolean;
  lastMsg?: string;
  className?: string;
};

const UserProfileHeader: React.FC<Props> = ({
  user,
  lastMsg,
  otherUser,
  className,
  onClick,
}) => {
  return (
    <section
      className={`inline-flex group items-center space-x-4 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="relative">
        <img
          className={`w-11 h-11 rounded-full p-0.5 ring-2 ${
            otherUser ? "ring-gray-300 group-hover:ring-gray-400" : "ring-white"
          }`}
          src={`${user.img}`}
          alt="random avatar"
        />
        <span className="absolute -top-1 -right-0 rounded-full h-4 w-4 bg-green-400 border-gray-800 border-2"></span>
      </div>
      <div className={`${!otherUser && "hidden md:block"}`}>
        <p
          className={`font-semibold -mb-1 ${
            otherUser ? "text-gray-600 group-hover:text-gray-900" : "text-white"
          }`}
        >
          {user.username}
        </p>
        <small
          className={
            otherUser
              ? "text-gray-400 group-hover:text-gray-500"
              : "text-gray-300"
          }
        >
          {otherUser
            ? `${lastMsg ? "lastMsg" : "Last Seen:" + user.lastSeen}`
            : `Joined in ${user.creationTime && formatDate(user.creationTime)}`}
        </small>
      </div>
    </section>
  );
};

export default UserProfileHeader;
