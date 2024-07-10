import React, { useState } from "react";
import IconButton from "./IconButton";
import { MdAdd, MdDelete, MdEdit, MdKeyboardArrowDown } from "react-icons/md";
import TaskList from "./TaskList";
import { taskListType } from "../types";
import { FB_setTaskList } from "../backend/tasksQueries";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { removeTemporaryTaskList, updateTaskList } from "../store/tasksSlice";

type Props = {
  taskList: taskListType;
};

const TaskListItem: React.FC<Props> = ({ taskList }) => {
  const [loading, setLoading] = useState(false);
  const uid = useAppSelector((state) => state.users.currentUser.id);
  const dispatch = useAppDispatch();

  const handleSaveTaskList = async () => {
    const taskListData = await FB_setTaskList(setLoading, taskList, uid);
    if (taskListData) {
      dispatch(removeTemporaryTaskList(taskList.id));
      dispatch(updateTaskList(taskListData));
    }
  };
  return (
    <article className="relative">
      <div className="min-h-40 drop-shadow-md rounded-md overflow-hidden">
        <header className="flex items-center text-white justify-between  bg-gradient-to-r from-myBlue to-myPink">
          <h2 className="p-5">{taskList.title}</h2>
          <div className="p-2 flex">
            <IconButton
              Icon={MdEdit}
              reduceHoverOpacity
              onClick={handleSaveTaskList}
              loading={loading}
            />
            <IconButton Icon={MdDelete} reduceHoverOpacity loading={loading} />
            <IconButton
              Icon={MdKeyboardArrowDown}
              reduceHoverOpacity
              loading={loading}
            />
          </div>
        </header>
        <TaskList />
      </div>
      <IconButton
        Icon={MdAdd}
        loading={loading || taskList.editMode}
        className="absolute drop-shadow-lg -bottom-6 -left-6"
      />
    </article>
  );
};

export default TaskListItem;
