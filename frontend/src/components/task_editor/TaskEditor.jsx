import { X } from "lucide-react";
import { useState, useContext } from "react";

import { TaskbarUpdaterContext } from "../../pages/Home";
import { LocalTaskbarUpdaterContext } from "../../pages/Home";

import DateSelector from "../date_selector/DateSelector";

async function addTask(userId, title, date, desc) {
  try {
    const res = await fetch("/task/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, date, userId, desc }),
    });
  } catch (err) {
    console.log(err);
  }
}

async function updateTask(userId, taskId, title, date, desc) {
  try {
    const res = await fetch("/task/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ TaskId, title, date, userId, desc }),
    });
  } catch (err) {
    console.log(err);
  }
}

// Makes sure description is <= 250
function validateDesc(description, setDescription) {
  if (description.length <= 250) {
    setDescription(description);
  }
}

export default function TaskEditor(prop) {
  const { updateTaskbar } = useContext(TaskbarUpdaterContext);
  const { updateLocalTaskbar } = useContext(LocalTaskbarUpdaterContext)

  // PLACEHOLDER USER ID
  const userId = 1;

  const [closing, setClosing] = useState(false);

  const [tempId, setTempId] = useState(Math.random());
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");


  const animateOut = () => {
    setClosing(true);
    setTimeout(() => {
      prop.display(false);
    }, 180);
  };

  return (
    <div
      className={`
      flex flex-col w-2/5 min-w-50 h-1/2 min-h-50 p-6 space-y-2
      fixed left-1/2 top-1/2
      bg-[#242424] rounded-xl
      transform -translate-x-1/2 -translate-y-1/2
      
      ${closing ? "animate-fade-out-scale" : "animate-fade-in-scale"}
    `}
    >
      <div className="flex flex-col grow space-y-2">
        <div className="flex justify-end text-gray-400">
          <button onClick={animateOut}>
            <X className="hover:cursor-pointer" />
          </button>
        </div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-12 text-2xl border-b border-gray-400 outline-none placeholder:text-2xl hover:border-blue-500 select-none"
        />
        <DateSelector setDate={setDate} className />
        <textarea
          value={description}
          onChange={(e) => validateDesc(e.target.value, setDescription)}
          className="border p-2 grow bg-[#171717] border-gray-400 rounded flex-"
        ></textarea>
      </div>
      <div className="flex justify-between items-center text-gray-400 select-none">
        <div>{description.length}/250</div>
        {prop.operation == "add" && 
          <button
            onClick={() => {
              addTask(userId, title, date, description);
              updateLocalTaskbar.addTaskLocally(tempId, title, date, description);
              updateTaskbar();
              animateOut();
            }}
            className="flex px-5 py-1 bg-blue-500 text-white rounded-full hover:cursor-pointer hover:bg-blue-600 transition duration-150"
          >
            Add
          </button>
        }
        {prop.operation == "update" && 
          <button
            onClick={() => {
              addTask(userId, title, date, description);
              updateTask();
              animateOut();
            }}
            className="flex px-5 py-1 bg-blue-500 text-white rounded-full hover:cursor-pointer hover:bg-blue-600 transition duration-150"
          >
            Update
          </button>
        }

      </div>
    </div>
  );
}
