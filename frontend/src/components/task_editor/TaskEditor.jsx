import { X } from "lucide-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

export default function TaskEditor(prop) {
  const[startDate, setStartDate] = useState(new Date())


  return (
    <div
      className="
      flex flex-col fixed top-1/2 left-1/2
      w-2/5 min-w-50 h-1/2 min-h-50 p-6
      bg-[#242424] rounded-xl
      transform -translate-x-1/2 -translate-y-1/2"
    >
      <div className="flex justify-end text-gray-400">
        <X
          onClick={() => prop.addingTask(false)}
          className="hover:cursor-pointer"
        />
      </div>
      <input
        type="text"
        placeholder="Title"
        className="
        h-12 border-b-2 border-gray-400 
        text-2xl
        placeholder:text-2xl outline-none"
      />
      <DatePicker
        selected={startDate}
        popperPlacement="bottom-start"
        onChange={(date) => setStartDate(date)}
        className="mt-4 p-2 bg-[#1a1a1a] text-white rounded border border-gray-400"
      />
      <div className="flex justify-end">
        <div className="px-5 py-1 bg-blue-500 rounded-full mt-3">Add</div>
      </div>
    </div>
  );
}
