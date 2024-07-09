import React from "react";
import TaskListItem from "../components/TaskListItem";

type Props = {};

const ListPage: React.FC = (props: Props) => {
  return (
    <section className="grid p-10 gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <TaskListItem />
      <TaskListItem />
    </section>
  );
};

export default ListPage;
