import { Plus, ChevronRight, ChevronLeft, UserRound, Settings } from 'lucide-react';

const navButtons = "w-1/5 h-8 p-1.5 rounded-full hover:cursor-pointer hover:bg-blue-600 active:scale-75 transition duration-150";

export default function Navbar() {
  return (
    <div className="flex justify-around bg-blue-500 rounded-full">
      <ChevronLeft className={navButtons} />
      <UserRound className={navButtons} />
      <Plus className={navButtons} />
      <Settings className={navButtons} />
      <ChevronRight className={navButtons} />
    </div>
  );
} 