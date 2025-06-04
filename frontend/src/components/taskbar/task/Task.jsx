import { useContext, useState } from 'react';
import { Pencil, X } from "lucide-react";

import { TaskbarContext, TaskEditorContext} from '../../../pages/Home';

// Try Authentication

export default function Task(prop) {
  const { taskbarOperations } = useContext(TaskbarContext);
  const { taskEditor } = useContext(TaskEditorContext);

  return (
    <>
      <div className="flex p-2 bg-[#242424] rounded-lg hover:scale-102 hover:cursor-pointer transition duration-150">
        <div className="flex flex-col justify-between mr-2">
          <button >
            <X
              size={20}
              onClick={() => {
                taskbarOperations.deleteTask(prop.taskId);
              }}
              className="hover:text-red-400 hover:cursor-pointer transition duration-150 active:scale-75"
            />
          </button>
          <button>
            <Pencil
              size={20}
              onClick={ () => taskEditor.openTaskEditor("update", prop.taskId) }
              className="hover:text-green-300 hover:cursor-pointer transition duration-150"
            />
          </button>
        </div>
        <p className="size-12 grow truncate">{prop.title}</p>
      </div>
    </>
  );
}
