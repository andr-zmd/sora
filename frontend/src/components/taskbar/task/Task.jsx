import { CopyMinus, Pencil, X } from "lucide-react";
import { useContext, useState } from 'react';

import { TaskbarUpdaterContext } from "../../../pages/Home";
import { LocalTaskbarUpdaterContext } from "../../../pages/Home";


import TaskEditor from "../../task_editor/TaskEditor"; 
// Try Authentication

function deleteTask(id) {

  try {
    fetch(`/task/delete/${id}`, { method: "DELETE" });
  } catch (err) {
    console.log(err);
  }
}

export default function Task(prop) {
  const { updateTaskbar } = useContext(TaskbarUpdaterContext);
  const { updateLocalTaskbar } = useContext(LocalTaskbarUpdaterContext);
  const[editingTask, setEditingTask] = useState(false);

  return (
    <>
      <div className="flex p-2 bg-[#242424] rounded-lg hover:scale-102 hover:cursor-pointer transition duration-150">
        <div className="flex flex-col justify-between mr-2">
          <button >
            <X
              size={20}
              onClick={() => {
                updateLocalTaskbar.deleteTaskLocally(prop.taskId);
                deleteTask(prop.taskId);
                updateTaskbar();
              }}
              className="hover:text-red-400 hover:cursor-pointer transition duration-150 active:scale-75"
            />
          </button>
          <button>
            <Pencil
              size={20}
              onClick={ () => setEditingTask(!editingTask) }
              className="hover:text-green-300 hover:cursor-pointer transition duration-150"
            />
          </button>
        </div>
        <p className="size-12 grow truncate">{prop.title}</p>
      </div>
      {editingTask && <TaskEditor display={setEditingTask} operation="update"></TaskEditor>}
    </>
  );
}
