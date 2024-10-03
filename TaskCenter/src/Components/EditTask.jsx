import React, { useState } from "react";
import editIcon from "../assets/editIcon.jpg"; // Import the edit icon
import "./EditTask.css"; // Import the new CSS file

console.log("Image Path:", editIcon);

const EditTask = ({ task, index, updateTask }) => {
  const [editedTask, setEditedTask] = useState(task);

  const handleEditChange = (e) => {
    setEditedTask({ ...editedTask, task: e.target.value });
  };

  const handleSave = () => {
    updateTask(index, editedTask);
  };

  return (
    <div className="edit-task">
      <input
        type="text"
        value={editedTask.task}
        onChange={handleEditChange}
        className="edit-task-input"
      />
      <button type="button" onClick={handleSave} className="edit-task-button">
        <img src={editIcon} alt="Edit Task" className="edit-task-icon" />
      </button>
    </div>
  );
};

export default EditTask;
