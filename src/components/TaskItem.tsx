import React from "react";
import IconButton from "./IconButton";
import { MdDelete, MdEdit } from "react-icons/md";

type Props = {};

const TaskItem: React.FC = (props: Props) => {
  return (
    <li className="bg-white p-3 rounded-md drop-shadow-sm hover:drop-shadow-md">
      <header>
        <h3 className="cursor-pointer font-semibold">Task action</h3>
      </header>
      <div>
        <hr />
        <div>
          <p className="p-2">Some description here</p>
          <div className="flex justify-end">
            <IconButton Icon={MdEdit} reduceHoverOpacity />
            <IconButton Icon={MdDelete} reduceHoverOpacity />
          </div>
        </div>
      </div>
    </li>
  );
};

export default TaskItem;
