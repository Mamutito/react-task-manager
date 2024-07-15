import React, { forwardRef, useState } from "react";
import IconButton from "./IconButton";
import { MdDelete, MdEdit, MdSaveAs } from "react-icons/md";
import { taskType } from "../types";
import { useAppDispatch } from "../store/hooks";
import { deleteTask, updateTask } from "../store/tasksSlice";
import CatchErr from "../utils/catchErr";
import { toastErr } from "../utils/toast";
import { FB_deleteTask, FB_setTask } from "../backend/tasksQueries";

type Props = {
  task: taskType;
  listId: string;
};

const TaskItem = forwardRef(
  ({ task, listId }: Props, ref: React.LegacyRef<HTMLLIElement>) => {
    const { title, editMode, description, collapsed } = task;
    const [taskTitle, setTaskTitle] = useState(title);
    const [taskDescription, setTaskDescription] = useState(description);
    const [saveLoading, setSaveLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const dispatch = useAppDispatch();
    const handleEditMode = () => {
      dispatch(
        updateTask({ task: { ...task, editMode: !editMode }, listId: listId })
      );
    };

    const handleCollapse = () => {
      dispatch(
        updateTask({
          task: { ...task, collapsed: !collapsed },
          listId: listId,
        })
      );
    };

    const handleSaveTask = async () => {
      if (taskTitle === title && taskDescription === description) {
        handleEditMode();
        return;
      }
      if (!taskTitle) {
        toastErr("Task list title cannot be empty");
        return;
      }
      setSaveLoading(true);
      try {
        const taskUpdated = {
          ...task,
          title: taskTitle,
          description: taskDescription,
        };
        const taskId = await FB_setTask(taskUpdated, listId);
        dispatch(
          updateTask({
            task: {
              ...taskUpdated,
              editMode: false,
              collapsed: true,
            },
            listId: listId,
            newId: taskId || "",
          })
        );
      } catch (error) {
        CatchErr(error);
        console.error(error);
      } finally {
        setSaveLoading(false);
      }
    };

    const handleDelete = async () => {
      setDeleteLoading(true);
      try {
        await FB_deleteTask(listId, task.id);
        dispatch(deleteTask({ tlid: listId, tid: task.id }));
      } catch (error) {
        CatchErr(error);
        console.error(error);
      } finally {
        setDeleteLoading(false);
      }
    };

    return (
      <li
        ref={ref}
        className="bg-white p-3 rounded-md drop-shadow-sm hover:drop-shadow-md"
      >
        <header>
          {editMode ? (
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Type your task action..."
              className="px-3 py-1 border border-myBlue rounded-md mb-2 focus:border-2 foucs:border-myBlue outline-none"
              autoFocus
            />
          ) : (
            <h3
              className="cursor-pointer font-semibold"
              onClick={handleCollapse}
            >
              {taskTitle}
            </h3>
          )}
        </header>
        {!collapsed && (
          <div className="mt-2">
            <hr />
            <div>
              {editMode ? (
                <textarea
                  onChange={(e) => setTaskDescription(e.target.value)}
                  value={taskDescription}
                  placeholder="Type your task action description..."
                  className="w-full px-3 py-1 border mt-2 border-myBlue rounded-md mb-1 focus:border-2 foucs:border-myBlue outline-none"
                ></textarea>
              ) : (
                <p className="p-2">{taskDescription}</p>
              )}
              <div className="flex justify-end">
                <IconButton
                  Icon={editMode ? MdSaveAs : MdEdit}
                  reduceHoverOpacity
                  loading={saveLoading}
                  onClick={editMode ? handleSaveTask : handleEditMode}
                />
                <IconButton
                  Icon={MdDelete}
                  loading={deleteLoading}
                  reduceHoverOpacity
                  onClick={handleDelete}
                />
              </div>
            </div>
          </div>
        )}
      </li>
    );
  }
);

export default TaskItem;
