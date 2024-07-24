import React from "react";
import UsersLoader from "./UsersLoader";
import { userType } from "../types";
import UserProfileHeader from "./UserProfileHeader";

type Props = {
  loading: boolean;
  users: userType[];
};

const UsersList: React.FC<Props> = ({ loading, users }) => {
  const handleStartChat = () => {
    alert("Do you want to open a chat?");
  };
  return loading ? (
    <UsersLoader />
  ) : (
    <div className="flex flex-col">
      {users.map((user) => (
        <UserProfileHeader
          user={user}
          key={user.id}
          otherUser
          className="px-5 py-5 hover:bg-gray-200 border-b border-gray-200"
          onClick={handleStartChat}
        />
      ))}
    </div>
  );
};

export default UsersList;
