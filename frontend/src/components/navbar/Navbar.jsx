import { Plus, ChevronRight, ChevronLeft, UserRound, Settings } from 'lucide-react';
import { useState } from 'react';

import TaskEditor from '../task_editor/TaskEditor';

const navButtons = "flex w-1/5 h-8 p-1.5 justify-around items-center rounded-full hover:cursor-pointer hover:bg-blue-600 active:scale-75 transition duration-150";

export default function Navbar() {
  const[addingTask, setAddingTask] = useState(false);

  return (
    <>
      <div className="flex justify-around bg-blue-500 rounded-full m-3">
        <button className={navButtons}><ChevronLeft  /></button>
        <button className={navButtons}><UserRound  /></button>
        <button className={navButtons} onClick={() => setAddingTask(true)}><Plus  /></button>
        <button className={navButtons}><Settings /></button>
        <button className={navButtons}><ChevronRight /></button>
      </div>
      
      {addingTask && <TaskEditor display={setAddingTask} operation={"add"}/>}
    </>
    
  );
} 