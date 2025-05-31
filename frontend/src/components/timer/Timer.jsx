import { useState, useEffect} from "react"

export default function Timer() {
  const [time, setTime] = useState(1500);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  
  const minutes = Math.floor(time / 60);
  const seconds = String(time % 60).padStart(2, '0');

  return (
    <div className="flex w-full justify-around font-bold text-[10rem] items-center select-none">
      {minutes} : {seconds}
    </div>
  );
}
