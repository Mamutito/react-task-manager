import React, { useEffect } from "react";
import TaskListItem from "../components/TaskListItem";
import { getAllTaskList } from "../backend/tasksQueries";
import { taskListType, userType } from "../types";
import { useLoaderData } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setTaskList } from "../store/tasksSlice";

const ListPage: React.FC = () => {
  const taskListLoaderData = useLoaderData() as taskListType[];
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (taskListLoaderData) {
      dispatch(setTaskList(taskListLoaderData));
    }
  }, [dispatch, taskListLoaderData]);

  const temporaryLists = useAppSelector(
    (state) => state.tasks.temporaryTasksList
  );

  const taskListsData = useAppSelector((state) => state.tasks.currentTasksList);

  const taskLists = [...taskListsData, ...temporaryLists];

  return (
    <section className="grid p-10 gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {taskLists.map((taskList) => (
        <TaskListItem key={taskList.id} taskList={taskList} />
      ))}
    </section>
  );
};

export default ListPage;

export const taskListLoader = async () => {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    const user: userType = JSON.parse(currentUser);

    return await getAllTaskList(user.id);
  }
  return false;
};
