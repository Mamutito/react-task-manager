import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setChatTab } from "../store/chatSlice";
import Chats from "./Chats";
import UsersList from "./UsersList";
import { userType } from "../types";
import { FB_getAllUsers } from "../backend/authQueries";
import { setUsers } from "../store/usersSlice";
type Props = {
  className?: string;
};

const UsersSidebarLeft = ({ className }: Props) => {
  const isChatTab = useAppSelector((state) => state.chat.isChatTab);
  const dispatch = useAppDispatch();
  const [usersState, setUsersState] = useState<userType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = FB_getAllUsers(setUsersState);
    dispatch(setUsers(usersState));
    setLoading(false);

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [dispatch, usersState]);

  return (
    <aside
      className={`bg-white absolute w-full md:relative z-10 md:z-0 shadow-md border-2 rounded-l-3xl overflow-hidden ${className}`}
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
      <section className="py-2 max-h-full">
        {isChatTab ? (
          <Chats />
        ) : (
          <UsersList loading={loading} users={usersState} />
        )}
      </section>
    </aside>
  );
};

export default UsersSidebarLeft;
