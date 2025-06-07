import {useState, createContext} from 'react';

import Taskbar from "../components/taskbar/Taskbar";
import Timer from "../components/timer/Timer";
import Navbar from "../components/navbar/Navbar";
import TaskEditor from '../components/task_editor/TaskEditor';

export const TaskEditorContext = createContext();
export const TaskbarContext = createContext();

export default function Home() {

  // Task Editor Logic
  const[isTaskEditorOpen, setIsTaskEditorOpen] = useState(false);
  const[taskEditorOperation, setTaskEditorOperation] = useState("add");

  // TE and TB Variables
  const[taskId, setTaskId] = useState(0);

  const openTaskEditor = (operation, taskId) => {
    setIsTaskEditorOpen(true);
    setTaskEditorOperation(operation);
    setTaskId(taskId);
  }
  const closeTaskEditor = () => setIsTaskEditorOpen(false);

  // Taskbar Logic
  const[taskbarOperations, setTaskbarOperations] = useState({});
  return (
    <div className="flex h-screen bg-radial-[at_60%_50%] from-[#242424] from-5% to-[#121212] to-70%">
      <div className="w-1/4 min-w-70 h-1/1">
        <TaskbarContext.Provider value={{taskbarOperations, setTaskbarOperations}}>
          <TaskEditorContext.Provider value={{taskEditor: {openTaskEditor, closeTaskEditor}, taskEditorOperation }}>
            <Navbar />
            <Taskbar />
            {isTaskEditorOpen && <TaskEditor taskId={taskId}/>}
          </TaskEditorContext.Provider>
        </TaskbarContext.Provider>  
      </div>
      <Timer />
    </div>
  )
}