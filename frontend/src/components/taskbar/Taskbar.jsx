import { useState, useEffect, useContext } from "react";

import { TaskbarUpdaterContext } from "../../pages/Home";
import { LocalTaskbarUpdaterContext } from "../../pages/Home";

import Task from "./task/Task";
import { Zap } from "lucide-react";

async function getTask(userId) {
  const res = await fetch(`/task/get?userId=${userId}`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("ERROR: FAILED TO GET TASK");
  }
  return res.json();
}

export default function Taskbar() {
  const { setUpdateTaskbar } = useContext(TaskbarUpdaterContext);
  const { setUpdateLocalTaskbar } = useContext(LocalTaskbarUpdaterContext);

  const [tasks, setTasks] = useState([]);

  // Add task locally before fetch
  const addTaskLocally = (id, title, date, description) => {
    setTasks((prev) => [...prev, {id: id, title:title, date:date, desc:description}])
  }

  // Delete task locally before fetch
  const deleteTaskLocally = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }

  // Updates the taskbar
  const updateTaskbar = () => {
    const userId = 1;

    getTask(userId)
      .then((data) => {
        setTasks(data);
        console.log(data);
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

  const formatDate = (date) => {
    return new Date(date).toISOString().split("T")[0];
  };

  useEffect(() => {
    setUpdateTaskbar(() => updateTaskbar)
    setUpdateLocalTaskbar({addTaskLocally, deleteTaskLocally})
    updateTaskbar();
  }, [setUpdateTaskbar]);

  return (
    <div className="h-1/2 mt-2 space-y-3 overflow-y-auto px-3">
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
