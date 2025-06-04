import { useState, useContext } from "react";
import { X } from "lucide-react";

import { TaskbarContext } from "../../pages/Home";
import { TaskEditorContext } from "../../pages/Home";

import DateSelector from "../date_selector/DateSelector";

// Makes sure description is <= 250
function validateDesc(description, setDescription) {
  if (description.length <= 250) {
    setDescription(description);
  }
}

export default function TaskEditor(prop) {
  const { taskbarOperations } = useContext(TaskbarContext);
  const { taskEditor, taskEditorOperation } = useContext(TaskEditorContext);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div
      className={`
      flex flex-col w-2/5 min-w-50 h-1/2 min-h-50 p-6 space-y-2
      fixed left-1/2 top-1/2
      bg-[#242424] rounded-xl
      transform -translate-x-1/2 -translate-y-1/2
    `}
    >
      <div className="flex flex-col grow space-y-2">
        <div className="flex justify-end text-gray-400">
          <button onClick={taskEditor.closeTaskEditor}>
            <X className="hover:cursor-pointer" />
          </button>
        </div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-12 text-2xl border-b border-gray-400 outline-none placeholder:text-2xl hover:border-blue-500 select-none"
        />
        <DateSelector setDate={setDate} className />
        <textarea
          value={description}
          onChange={(e) => validateDesc(e.target.value, setDescription)}
          className="border p-2 grow bg-[#171717] border-gray-400 rounded flex-"
        ></textarea>
      </div>
      <div className="flex justify-between items-center text-gray-400 select-none">
        <div>{description.length}/250</div>
        { taskEditorOperation == "add" && (
          <button
            onClick={() => {
              taskbarOperations.addTask(title, date, description);
              taskEditor.closeTaskEditor();
            }}
            className="flex px-5 py-1 bg-blue-500 text-white rounded-full hover:cursor-pointer hover:bg-blue-600 transition duration-150"
          >
            Add
          </button>
        )}
        { taskEditorOperation == "update" && (
          <button
            onClick={() => {
              taskbarOperations.updateTask(prop.taskId, title, date, description);
              taskEditor.closeTaskEditor();
            }}
            className="flex px-5 py-1 bg-blue-500 text-white rounded-full hover:cursor-pointer hover:bg-blue-600 transition duration-150"
          >
            Update
          </button>
        )}
      </div>
    </div>
  );
}
