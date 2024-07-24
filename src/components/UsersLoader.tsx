import React from "react";
const UsersLoader = () => {
  return (
    <div className="flex flex-col">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
        <UserLoader key={s} />
      ))}
    </div>
  );
};

const UserLoader = () => {
  return (
    <article className="animate-pulse flex gap-2 items-center px-5 py-3 border-b border-gray-200">
      <div className="w-11 h-11 rounded-full-bg-gray-300"></div>
      <div className="flex flex-col gap-2 w-[70%]">
        <div className="bg-gray-300 h-3 rounded-md"></div>
        <div className="bg-gray-300 h-3 rounded-md"></div>
      </div>
    </article>
  );
};

export default UsersLoader;
