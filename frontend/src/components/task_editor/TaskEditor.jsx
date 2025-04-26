import { X } from "lucide-react";
import { useState } from "react";

import DateSelector from "../date_selector/DateSelector";

export default function TaskEditor(prop) {
  
  const[closing, setClosing] = useState(false);

  const animateOut = () => {
    setClosing(true);
    setTimeout(() => {
      prop.addingTask(false);
    }, 180);
  }

  return (
    <div
      className={`
      flex flex-col w-2/5 min-w-50 h-1/2 min-h-50 p-6 
      fixed top-1/2 left-1/2
      justify-between
      bg-[#242424] rounded-xl
      transform -translate-x-1/2 -translate-y-1/2
      
      ${closing ? "animate-fade-out-scale" : "animate-fade-in-scale"}
    `}
    >
      <div className="flex h-3/10 flex-col">
        <div className="flex justify-end text-gray-400">
          <X
            onClick={animateOut}
            className="hover:cursor-pointer"
          />
        </div>
        <input
          type="text"
          placeholder="Title"
          className="h-12 text-2xl border-b border-gray-400 outline-none placeholder:text-2xl hover:border-blue-500"
        />
        <DateSelector />
      </div>
      <div className="flex justify-end">
        <div className="px-5 py-1 mt-3 bg-blue-500 rounded-full hover:cursor-pointer hover:bg-blue-600 transition duration-150" onClick={animateOut}>
          Add
        </div>
      </div>
    </div>
  );
}
