import { Plus, ChevronRight, ChevronLeft, UserRound, Settings } from 'lucide-react';
import { useState } from 'react';

import TaskEditor from '../task_editor/TaskEditor';

const navButtons = "w-1/5 h-8 p-1.5 rounded-full hover:cursor-pointer hover:bg-blue-600 active:scale-75 transition duration-150";

export default function Navbar() {
  const[addingTask, setAddingTask] = useState(false);

  return (
    <>
      <div className="flex justify-around bg-blue-500 rounded-full">
        <ChevronLeft className={navButtons} />
        <UserRound className={navButtons} />
        <Plus className={navButtons} onClick={() => setAddingTask(true)} />
        <Settings className={navButtons} />
        <ChevronRight className={navButtons} />
      </div>
      
      {addingTask && <TaskEditor addingTask={setAddingTask} />}
    </>
    
  );
} 