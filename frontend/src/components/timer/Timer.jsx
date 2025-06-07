import { useState, useEffect } from "react";

import { RotateCcw, Play, Pause } from "lucide-react";
export default function Timer() {
  const [time, setTime] = useState(1500);
  const [timer, setTimer] = useState(null);
  const startTimer = () => {
    if (!timer) {
      const interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
      setTimer(interval);
    }
  };

  const stopTimer = () => {
    clearInterval(timer);
    setTimer(null);
  };

  const resetTimer = () => {
		stopTimer(null);
    setTime(1500);
  };

  const minutes = Math.floor(time / 60);
  const seconds = String(time % 60).padStart(2, "0");

  const controlBar =
    "select-none flex justify-center items-center rounded-full grow border border-blue-500/0 hover:border-blue-500 transition duration-150 hover:cursor-pointer active:scale-75";
		
  return (
    <div className="flex w-full flex-col items-center justify-around p-3">
      <div className="flex w-full grow items-center justify-around">
        <div className="text-9xl font-light">
          {minutes} : {seconds}
        </div>
      </div>
      <div className="flex h-10 w-1/4 justify-around rounded-full border border-blue-500">
        <button className={controlBar} onClick={resetTimer}>
          <RotateCcw />
        </button>
        <button className={controlBar} onClick={startTimer}>
          <Play />
        </button>
        <button className={controlBar} onClick={stopTimer}>
          <Pause />
        </button>
      </div>
    </div>
  );
}
