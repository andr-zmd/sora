import {useState, createContext} from 'react';

import Taskbar from "../components/taskbar/Taskbar";
import Timer from "../components/timer/Timer";
import Navbar from "../components/navbar/Navbar";

export const TaskbarUpdaterContext = createContext();
export const LocalTaskbarUpdaterContext = createContext();

export default function Home() {
  const [updateTaskbar, setUpdateTaskbar] = useState(() => {});
  const [updateLocalTaskbar, setUpdateLocalTaskbar] = useState({})

  return (
    <div className="flex h-screen">
      <div className="w-1/4 min-w-70 h-1/1">
        <LocalTaskbarUpdaterContext.Provider value={{updateLocalTaskbar, setUpdateLocalTaskbar}}>
          <TaskbarUpdaterContext.Provider value={{updateTaskbar, setUpdateTaskbar}}>
            <Navbar />
            <Taskbar />
          </TaskbarUpdaterContext.Provider>
        </LocalTaskbarUpdaterContext.Provider>
      </div>
      <Timer />
    </div>
  )
}