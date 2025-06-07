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
      className={`fixed top-1/2 left-1/2 flex h-1/2 min-h-50 w-2/5 min-w-50 -translate-x-1/2 -translate-y-1/2 transform flex-col space-y-2 rounded-xl bg-[#171717] border border-blue-500 p-6`}
    >
      <div className="flex grow flex-col space-y-2">
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
          className="h-12 border-b border-blue-500 text-2xl outline-none select-none placeholder:text-2xl hover:border-white"
        />
        <DateSelector setDate={setDate} className />
        <textarea
          value={description}
          onChange={(e) => validateDesc(e.target.value, setDescription)}
          className="flex- grow rounded border border-blue-500 bg-[#171717] p-2"
        ></textarea>
      </div>
      <div className="flex items-center justify-between text-gray-400 select-none">
        <div>{description.length}/250</div>
        {taskEditorOperation == "add" && (
          <button
            onClick={() => {
              taskbarOperations.addTask(title, date, description);
              taskEditor.closeTaskEditor();
            }}
            className="flex rounded-full bg-blue-500 px-5 py-1 text-white transition duration-150 hover:cursor-pointer hover:bg-blue-600"
          >
            Add
          </button>
        )}
        {taskEditorOperation == "update" && (
          <button
            onClick={() => {
              taskbarOperations.updateTask(
                prop.taskId,
                title,
                date,
                description,
              );
              taskEditor.closeTaskEditor();
            }}
            className="flex rounded-full bg-blue-500 px-5 py-1 text-white transition duration-150 hover:cursor-pointer hover:bg-blue-600"
          >
            Update
          </button>
        )}
      </div>
    </div>
  );
}
