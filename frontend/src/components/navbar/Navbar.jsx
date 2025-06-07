import { Plus, ChevronRight, ChevronLeft, UserRound, Settings } from 'lucide-react';
import { useContext } from 'react';

import { TaskEditorContext } from '../../pages/Home';

const navButtons = "flex w-1/5 h-8 p-1.5 justify-around items-center rounded-full hover:cursor-pointer hover:border-blue-500 border border-blue-600/0 active:scale-75 transition duration-150";

export default function Navbar() {
  const { taskEditor } = useContext(TaskEditorContext);

  return (
    <>
      <div className="m-3 flex justify-around border border-blue-500 rounded-full">
        <button className={navButtons}><ChevronLeft  /></button>
        <button className={navButtons}><UserRound  /></button>
        <button className={navButtons} onClick={() => taskEditor.openTaskEditor("add")}><Plus  /></button>
        <button className={navButtons}><Settings /></button>
        <button className={navButtons}><ChevronRight /></button>
      </div>
    </>
  );
} 