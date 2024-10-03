import React, { useState, useEffect } from "react";
import "./App.css";
import TaskForm from "./Components/TaskForm";
import TaskColumn from "./Components/TaskColumn";
import todoIcon from "./assets/c257a85fb6946b7e861a5a1e3bc1f9de.jpg";
import doingIcon from "./assets/progress.jpg";
import doneIcon from "./assets/complete.jpg";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {Toggle} from "./Components/Toggle";

const oldTasks = localStorage.getItem("tasks");

const App = () => {
  const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);
  const [isDark, setisDark] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  }, [isDark]);

  const handleDelete = (taskIndex) => {
    const newTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(newTasks);
  };

  const handleEdit = (taskIndex, newTaskText) => {
    const updatedTasks = tasks.map((task, index) =>
      index === taskIndex ? { ...task, task: newTaskText } : task
    );
    setTasks(updatedTasks);
  };

  // Handle the drop event
  const onDrop = (draggedIndex, newStatus) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task, index) => {
        if (index === draggedIndex) {
          return { ...task, status: newStatus };
        }
        return task;
      });
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app" data-theme={isDark ? "dark" : "light"}>
      <div className="header">
        <TaskForm setTasks={setTasks} />
        <Toggle isChecked={isDark} handleChange={() => setisDark(!isDark)} />
        </div>
        <main className="app_main">
          <TaskColumn
            title="To do"
            icon={todoIcon}
            tasks={tasks}
            status="todo"
            handleDelete={handleDelete}
            onDrop={onDrop}
            handleEdit={handleEdit}
          />
          <TaskColumn
            title="Doing"
            icon={doingIcon}
            tasks={tasks}
            status="doing"
            handleDelete={handleDelete}
            onDrop={onDrop}
            handleEdit={handleEdit}
          />
          <TaskColumn
            title="Done"
            icon={doneIcon}
            tasks={tasks}
            status="done"
            handleDelete={handleDelete}
            onDrop={onDrop}
            handleEdit={handleEdit}
          />
        </main>
      </div>
    </DndProvider>
  );
};

export default App;
