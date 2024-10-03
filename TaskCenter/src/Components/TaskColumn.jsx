import React from "react";
import { useDrop } from "react-dnd";
import "./TaskColumn.css";
import TaskCard from "./TaskCard";

const TaskColumn = ({ title, icon, tasks, status, handleDelete, setActiveCard, onDrop, handleEdit }) => {
  // Set up the drop behavior
  const [, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => onDrop(item.index, status), // Pass the index and new status
  }));

  return (
    <section ref={drop} className="task_column">
      <h2 className="task_column_heading">
        <img className="task_column_icon" src={icon} alt={title} /> {title}
      </h2>

      {tasks.map(
        (task, index) =>
          task.status === status && (
            <TaskCard
              key={index}
              title={task.task}
              handleDelete={handleDelete}
              index={index}
              setActiveCard={setActiveCard}
              handleEdit={handleEdit}
            />
          )
      )}
    </section>
  );
};

export default TaskColumn;

