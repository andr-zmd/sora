import { useContext, useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";

import { TaskbarContext, TaskEditorContext } from "../../../pages/Home";

// Try Authentication

export default function Task(prop) {
  const { taskbarOperations } = useContext(TaskbarContext);
  const { taskEditor } = useContext(TaskEditorContext);

  return (
    <>
      <div className="flex rounded-lg border border-blue-500 p-2 transition duration-150 hover:scale-102 hover:cursor-pointer">
        <div className="mr-2 flex flex-col gap-1">
          <button>
            <X
              size={20}
              onClick={() => {
                taskbarOperations.deleteTask(prop.taskId);
              }}
              className="transition duration-150 hover:cursor-pointer hover:text-red-400 active:scale-75"
            />
          </button>
          <button>
            <Pencil
              size={19}	
              onClick={() => taskEditor.openTaskEditor("update", prop.taskId)}
              className="transition duration-150 hover:cursor-pointer hover:text-green-300"
            />
          </button>
        </div>
        <div className="grow overflow-y-hidden">
          <p className="w-full truncate font-medium">{prop.title}</p>
          <p className="text-xs break-words font-light">{prop.desc}</p>
          <p className="flex justify-end text-sm font-light">{prop.date}</p>
        </div>
      </div>
    </>
  );
}
