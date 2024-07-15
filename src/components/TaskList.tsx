import React from "react";
import TaskItem from "./TaskItem";
import FlipMove from "react-flip-move";
import { taskType } from "../types";

type Props = {
  tasks: taskType[];
  listId: string;
};

const TaskList: React.FC<Props> = ({ tasks, listId }) => {
  return (
    <ul className="p-3 pb-8 bg-blue-100 min-h-24">
      <FlipMove className="space-y-4">
        {tasks.length ? (
          tasks.map((task) => (
            <TaskItem key={task.id} task={task} listId={listId} />
          ))
        ) : (
          <h4 className="text-center font-semibold mt-5">No task added yet!</h4>
        )}
      </FlipMove>
    </ul>
  );
};

export default TaskList;
