import React from "react";
import IconButton from "./IconButton";
import { MdAdd, MdDelete, MdEdit, MdKeyboardArrowDown } from "react-icons/md";

type Props = {};

const TaskListItem = (props: Props) => {
  return (
    <article className="relative">
      <div className="bg-white min-h-40 drop-shadow-md rounded-md overflow-hidden">
        <header className="flex items-center text-white justify-between  bg-gradient-to-r from-myBlue to-myPink">
          <h2 className="p-5">TaskTitle</h2>
          <div className="p-2 flex">
            <IconButton Icon={MdEdit} reduceHoverOpacity />
            <IconButton Icon={MdDelete} reduceHoverOpacity />
            <IconButton Icon={MdKeyboardArrowDown} reduceHoverOpacity />
          </div>
        </header>
        <div className="p-4">Task items</div>
      </div>
      <IconButton
        Icon={MdAdd}
        className="absolute drop-shadow-lg -bottom-6 -left-6"
      />
    </article>
  );
};

export default TaskListItem;
