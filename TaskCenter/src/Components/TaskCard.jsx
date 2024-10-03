import React, { useState } from "react";
import { useDrag } from "react-dnd";
import "./TaskCard.css";
import deleteIcon from "../assets/delete.jpeg";

const TaskCard = ({ title, handleDelete, index, setActiveCard, handleEdit, moveTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskText, setTaskText] = useState(title);

  // Set up the drag behavior
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleSave = () => {
    handleEdit(index, taskText);
    setIsEditing(false);
  };

  return (
    <article
      ref={drag} // Attach the drag ref here
      className="task_card"
      style={{ opacity: isDragging ? 0.5 : 1 }} // Optional: Reduce opacity while dragging
    >
      {isEditing ? (
        <input
          className="task_edit_input"
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
      ) : (
        <p className="task_text">{title}</p>
      )}

      <div className="task_actions">
        {isEditing ? (
          <button className="task_save_button" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className="task_edit_button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
        <div className="task_delete" onClick={() => handleDelete(index)}>
          <img src={deleteIcon} className="delete_icon" alt="Delete" />
        </div>
      </div>
    </article>
  );
};

export default TaskCard;

