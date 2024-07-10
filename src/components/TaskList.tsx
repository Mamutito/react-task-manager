import React from "react";
import TaskItem from "./TaskItem";

type Props = {};

const TaskList: React.FC = (props: Props) => {
  return (
    <ul className="p-3 pb-8 space-y-3 bg-blue-100">
      <TaskItem />
    </ul>
  );
};

export default TaskList;
