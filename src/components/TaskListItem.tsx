import React from "react";
import IconButton from "./IconButton";
import { MdAdd, MdDelete, MdEdit, MdKeyboardArrowDown } from "react-icons/md";
import TaskList from "./TaskList";

type Props = {};

const TaskListItem: React.FC = (props: Props) => {
  return (
    <article className="relative">
      <div className="min-h-40 drop-shadow-md rounded-md overflow-hidden">
        <header className="flex items-center text-white justify-between  bg-gradient-to-r from-myBlue to-myPink">
          <h2 className="p-5">TaskTitle</h2>
          <div className="p-2 flex">
            <IconButton Icon={MdEdit} reduceHoverOpacity />
            <IconButton Icon={MdDelete} reduceHoverOpacity />
            <IconButton Icon={MdKeyboardArrowDown} reduceHoverOpacity />
          </div>
        </header>
        <TaskList />
      </div>
      <IconButton
        Icon={MdAdd}
        loading
        className="absolute drop-shadow-lg -bottom-6 -left-6"
      />
    </article>
  );
};

export default TaskListItem;
