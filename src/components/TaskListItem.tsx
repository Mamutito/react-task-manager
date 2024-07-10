import React, { forwardRef, useState } from "react";
import IconButton from "./IconButton";
import {
  MdAdd,
  MdDelete,
  MdEdit,
  MdKeyboardArrowDown,
  MdSave,
} from "react-icons/md";
import TaskList from "./TaskList";
import { taskListType } from "../types";
import { FB_setTaskList } from "../backend/tasksQueries";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { removeTemporaryTaskList, updateTaskList } from "../store/tasksSlice";
import { toastErr } from "../utils/toast";

type Props = {
  taskList: taskListType;
};

const TaskListItem = forwardRef(
  ({ taskList }: Props, ref: React.LegacyRef<HTMLElement>) => {
    const [loading, setLoading] = useState(false);
    const uid = useAppSelector((state) => state.users.currentUser.id);
    const { title, id, editMode } = taskList;
    const [titleTaskList, setTitleTaskList] = useState(title);
    const dispatch = useAppDispatch();

    const handleSaveTaskList = async () => {
      if (!titleTaskList) {
        toastErr("Task list title cannot be empty");
        return;
      }
      if (titleTaskList !== taskList.title) {
        const updatedTaskList = { ...taskList, title: titleTaskList };
        const taskListData = await FB_setTaskList(
          setLoading,
          updatedTaskList,
          uid
        );
        if (taskListData) {
          dispatch(removeTemporaryTaskList(id));
          dispatch(updateTaskList(taskListData));
        }
      } else {
        handleEditMode();
      }
    };
    const handleEditMode = () => {
      dispatch(updateTaskList({ ...taskList, editMode: !editMode }));
    };
    return (
      <article className="relative" ref={ref}>
        <div className="min-h-40 drop-shadow-md rounded-t-md overflow-hidden">
          <header className="flex items-center placeholder-gray-300 p-3 text-white justify-between  bg-gradient-to-r from-myBlue to-myPink">
            {editMode ? (
              <input
                value={titleTaskList}
                onChange={(e) => setTitleTaskList(e.target.value)}
                placeholder="Type your task title..."
                className="bg-transparent px-3 py-1 border border-white rounded-md"
                autoFocus
              />
            ) : (
              <h2 className="p-2">{titleTaskList}</h2>
            )}
            <div className="flex">
              <IconButton
                Icon={editMode ? MdSave : MdEdit}
                reduceHoverOpacity
                onClick={editMode ? handleSaveTaskList : handleEditMode}
                loading={editMode && loading}
              />
              <IconButton Icon={MdDelete} reduceHoverOpacity />
              <IconButton Icon={MdKeyboardArrowDown} reduceHoverOpacity />
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
  }
);

export default TaskListItem;
