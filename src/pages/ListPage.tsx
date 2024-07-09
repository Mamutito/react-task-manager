import React from "react";
import TaskListItem from "../components/TaskListItem";
import { useAppSelector } from "../store/hooks";

const ListPage: React.FC = () => {
  const taskLists = useAppSelector((state) => state.tasks.currentTasks);
  return (
    <section className="grid p-10 gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {taskLists.map((taskList) => (
        <TaskListItem key={taskList.id} taskList={taskList} />
      ))}
    </section>
  );
};

export default ListPage;
