import { useState, useEffect, useContext } from "react";

import Task from "./task/Task";

// Contexts
import { TaskbarContext } from "../../pages/Home";

// Fetches all user task in db
const getTask = async (userId) => {
  const res = await fetch(`/task/getTasks/${userId}`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("ERROR: FAILED TO GET TASK");
  }

  return res.json();
};

export default function Taskbar() {
  const { setTaskbarOperations } = useContext(TaskbarContext);

  const [tasks, setTasks] = useState([]);

  const userId = 1; // Temporary

  // Updates the displayed task in the taskbar
  const updateTaskbarDisplay = () => {
    getTask(userId)
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        setTasks([
          {
            id: -1,
            title: "ERROR: UNABLE TO RETRIEVE TASKS...",
            date: "",
            description: "",
          },
        ]);
      });
  };

  // Add task to taskbar
  const addTask = (title, date, description) => {
    let tempId = Math.floor(Math.random() * 1000);

    fetch("/task/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, date, userId, description }),
    }).catch((err) => {
      console.error("Failed to add task:", err);
    });

    setTasks((prev) => [
      ...prev,
      { id: tempId, title: title, date: date, description: description },
    ]);
    updateTaskbarDisplay();
  };

  // Delete a task in the taskbar
  const deleteTask = (taskId) => {
    fetch(`/task/delete/${taskId}`, { method: "DELETE" }).catch((err) => {
      console.error("Delete failed:", err);
    });

    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    updateTaskbarDisplay();
  };

  // Update a task in the taskbar
  const updateTask = (taskId, title, date, description) => {
    fetch("/task/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId, title, date, description }),
    }).catch((err) => {
      console.error("Delete failed:", err);
    });

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, title, date, description } : task,
      ),
    );
    updateTaskbarDisplay();
  };

  // Format Date
  const formatDate = (date) => {
    return new Date(date).toISOString().split("T")[0];
  };

  useEffect(() => {
    setTaskbarOperations({ addTask, deleteTask, updateTask });
    updateTaskbarDisplay();
  }, []);

  return (
    <div className="no-scrollbar h-1/2 space-y-2 overflow-y-scroll px-2 py-[2px]">
      {tasks.map((task) => (
        <Task
          key={task.id}
          taskId={task.id}
          title={task.title}
          date={formatDate(task.date)}
          desc={task.description}
        />
      ))}
    </div>
  );
}
