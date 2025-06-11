import { useState, useEffect, useContext } from "react";

import Task from "./task/Task";

// Contexts
import { TaskbarContext } from "../../pages/Home";

// Fetches all user task in db
const getTask = async () => {
  try {
    const res = await fetch("/task/getTasks", {
      method: "GET"
    });

    if (!res.ok) {
      return [{id: -1, title: "ERROR!", description: "Error fetching task, try again later..."}] 
    }

    return await res.json();
  } catch (error) {
    return [{id: -1, title: "ERROR!", description: "Error connecting to server, try again later..."}]  
  }
};

export default function Taskbar() {
  const { setTaskbarOperations } = useContext(TaskbarContext);

  const [tasks, setTasks] = useState([]);

  // Updates the displayed task in the taskbar
  const updateTaskbarDisplay = () => {
    getTask()
      .then((data) => {
        setTasks(data);
      })
  };

  // Add task to taskbar
  const addTask = (title, date, description) => {
    let tempId = Math.floor(Math.random() * 1000);

    console.log("task added");

    setTasks((prev) => [
      ...prev,
      { id: tempId, title: title, date: date, description: description },
    ]);

    fetch("/task/addTask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, date, description }),
    }).catch((err) => {
      console.error("Failed to add task:", err);
    }); 

  };

  // Delete a task in the taskbar
  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));

    fetch(`/task/deleteTask/${taskId}`, { 
      method: "DELETE",
    }).catch((err) => {
      console.error("Delete failed:", err);
    });
  };

  // Update a task in the taskbar
  const updateTask = (taskId, title, date, description) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, title, date, description } : task,
      )
    );

    fetch("/task/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId, title, date, description }),
    }).catch((err) => {
      console.error("Delete failed:", err);
    });
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
          date={task.date ? formatDate(task.date) : undefined}
          desc={task.description}
        />
      ))}
    </div>
  );
}
