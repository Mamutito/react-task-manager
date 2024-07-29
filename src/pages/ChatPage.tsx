import React from "react";
import UsersSidebarLeft from "../components/UsersSidebarLeft";
import nochat from "../assets/nochat.jpg";
const ChatPage: React.FC = () => {
  return (
    <main className="flex relative h-heightFix justify-between p-3">
      <UsersSidebarLeft />
      <div className="hidden border-2 lg:block bg-white rounded-r-3xl flex-[0.7] overflow-hidden">
        <img
          src={nochat}
          alt="no chat open"
          className="object-contain w-full h-full"
        />
      </div>
    </main>
  );
};

export default ChatPage;
