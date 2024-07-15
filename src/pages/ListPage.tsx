import React, { useEffect } from "react";
import TaskListItem from "../components/TaskListItem";
import { FB_getAllTaskList } from "../backend/tasksQueries";
import { taskListType, userType } from "../types";
import { useLoaderData } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setTaskList } from "../store/tasksSlice";
import FlipMove from "react-flip-move";
import CatchErr from "../utils/catchErr";

const ListPage: React.FC = () => {
  const taskListLoaderData = useLoaderData() as taskListType[];
  const dispatch = useAppDispatch();

  const temporaryLists = useAppSelector(
    (state) => state.tasks.temporaryTasksList
  );

  useEffect(() => {
    if (taskListLoaderData) {
      dispatch(setTaskList(taskListLoaderData));
    }
  }, [dispatch, taskListLoaderData]);

  const taskListsData = useAppSelector((state) => state.tasks.currentTasksList);

  const taskLists = [...taskListsData, ...temporaryLists];

  if (!taskLists.length) {
    return (
      <h1 className="text-3xl text-gray-400 mt-20 text-center font-bold">
        There are no task lists yet created, please create one.
      </h1>
    );
  }
  return (
    <section>
      <FlipMove className="grid p-10 gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {taskLists.map((taskList) => (
          <TaskListItem key={taskList.id} taskList={taskList} />
        ))}
      </FlipMove>
    </section>
  );
};

export default ListPage;

export const taskListLoader = async () => {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    const user: userType = JSON.parse(currentUser);
    try {
      return await FB_getAllTaskList(user.id);
    } catch (error) {
      CatchErr(error);
      console.error(error);
    }
  }
  return false;
};
