import Taskbar from "../components/taskbar/Taskbar";
import Timer from "../components/timer/Timer";
import Navbar from "../components/navbar/Navbar";

export default function Home() {
  return (
    <div className="flex">
      <div className="w-1/4 min-w-70 p-3">
        <Navbar />
        <Taskbar />
      </div>
      <Timer />
    </div>
  )
}