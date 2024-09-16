import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setChatTab } from "../store/chatSlice";
import Chats from "./Chats";
import UsersList from "./UsersList";
import { FB_getAllUsers } from "../backend/authQueries";
import { setUsers } from "../store/usersSlice";

const UsersSidebarLeft = () => {
  const isChatTab = useAppSelector((state) => state.chat.isChatTab);
  const users = useAppSelector((state) => state.users.users);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllUsers = async () => {
      const usersList = await FB_getAllUsers();
      if (usersList) {
        dispatch(setUsers(usersList));
      }
    };

    getAllUsers();
    setLoading(false);
  }, [dispatch]);

  return (
    <aside
      className={`bg-white absolute w-full md:relative z-10 md:z-0 shadow-md border-2 rounded-l-3xl overflow-hidden flex-[0.8] lg:flex-[0.3]`}
    >
      <header className="sticky flex top-0 z-10 w-full">
        <p
          onClick={() => dispatch(setChatTab(true))}
          className={`p-5 flex-1 text-center font-bold cursor-pointer ${
            isChatTab
              ? "bg-gradient-to-r from-myBlue to-myPink text-white"
              : "bg-gray-200 text-gray-900"
          }`}
        >
          Chats
        </p>
        <p
          onClick={() => dispatch(setChatTab(false))}
          className={`p-5 flex-1 text-center font-bold cursor-pointer ${
            !isChatTab
              ? "bg-gradient-to-r from-myBlue to-myPink text-white"
              : "bg-gray-200 text-gray-900"
          }`}
        >
          Users
        </p>
      </header>
      <section className="py-2 max-h-full overflow-y-auto">
        {isChatTab ? <Chats /> : <UsersList loading={loading} users={users} />}
      </section>
    </aside>
  );
};

export default UsersSidebarLeft;
