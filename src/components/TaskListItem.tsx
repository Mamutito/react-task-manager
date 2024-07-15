import React, { forwardRef, useEffect, useState } from "react";
import IconButton from "./IconButton";
import {
  MdAdd,
  MdDelete,
  MdEdit,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdSave,
} from "react-icons/md";
import TaskList from "./TaskList";
import { taskListType } from "../types";
import { FB_setTaskList, FB_deleteTaskList } from "../backend/tasksQueries";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addTask,
  collapseTaskList,
  deleteTaskList,
  removeTemporaryTaskList,
  updateTaskList,
} from "../store/tasksSlice";
import { toastErr } from "../utils/toast";
import CatchErr from "../utils/catchErr";

type Props = {
  taskList: taskListType;
};

const TaskListItem = forwardRef(
  ({ taskList }: Props, ref: React.LegacyRef<HTMLElement>) => {
    const [saveLoading, setSaveLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [isCollapseAll, setIsCollapseAll] = useState(true);
    const uid = useAppSelector((state) => state.users.currentUser.id);
    const { title, id, editMode, tasks } = taskList;
    const [titleTaskList, setTitleTaskList] = useState(title);
    const dispatch = useAppDispatch();

    useEffect(() => {
      setIsCollapseAll(tasks.every((task) => task.collapsed === true));
    }, [tasks]);

    const handleSaveTaskList = async () => {
      if (!titleTaskList) {
        toastErr("Task list title cannot be empty");
        return;
      }
      if (titleTaskList === taskList.title) {
        handleEditMode();
        return;
      }
      setSaveLoading(true);
      try {
        const updatedTaskList = { ...taskList, title: titleTaskList };
        const taskListData = await FB_setTaskList(updatedTaskList, uid);
        if (taskListData) {
          dispatch(removeTemporaryTaskList(id));
          dispatch(updateTaskList(taskListData));
        }
      } catch (error) {
        CatchErr(error);
        console.error(error);
      } finally {
        setSaveLoading(false);
      }
    };

    const handleEditMode = () => {
      dispatch(updateTaskList({ ...taskList, editMode: !editMode }));
    };

    const handleDelete = async () => {
      setDeleteLoading(true);
      try {
        await FB_deleteTaskList(id, tasks);
        dispatch(deleteTaskList(id));
      } catch (error) {
        CatchErr(error);
        console.error(error);
      } finally {
        setDeleteLoading(false);
      }
    };

    const handleAddTask = () => {
      dispatch(addTask(id));
    };

    const handleCollapseAll = () => {
      dispatch(collapseTaskList({ tlid: id, collapsed: !isCollapseAll }));
      setIsCollapseAll((prev) => !prev);
    };

    return (
      <article className="relative" ref={ref}>
        <div className="min-h-40 drop-shadow-md ">
          <header className="flex items-center placeholder-gray-300 p-3 text-white justify-between rounded-t-md overflow-hidden  bg-gradient-to-r from-myBlue to-myPink">
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
                loading={editMode && saveLoading}
              />
              <IconButton
                Icon={MdDelete}
                reduceHoverOpacity
                loading={deleteLoading}
                onClick={handleDelete}
              />
              <IconButton
                Icon={isCollapseAll ? MdKeyboardArrowUp : MdKeyboardArrowDown}
                onClick={handleCollapseAll}
                reduceHoverOpacity
              />
            </div>
          </header>
          <TaskList tasks={tasks} listId={id} />
          <IconButton
            Icon={MdAdd}
            loading={saveLoading || taskList.editMode || deleteLoading}
            onClick={handleAddTask}
            className="absolute drop-shadow-lg -bottom-6 -left-6"
          />
        </div>
      </article>
    );
  }
);

export default TaskListItem;
