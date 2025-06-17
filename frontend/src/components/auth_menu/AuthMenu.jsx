import { useState, useContext } from "react";
import { TaskbarContext } from "../../pages/Home";

import Login from "./login/Login";
import Register from "./register/Register";

export default function AuthMenu() {
  const { taskbarOperations } = useContext(TaskbarContext);

  const [operation, setOperation] = useState(0);
  const tabsClass = `hover:bg-blue-600 hover:border-blue-600 transition duration-150 text-sm font-light items-center flex justify-around w-1/2 border-blue-500 hover:bg-blue-500 hover:cursor-pointer border py-2 rounded-xl`;

  async function login(email, password) {
    const res = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    });

    taskbarOperations.updateTaskbarDisplay();
  }

  async function register(username, email, password) {
    fetch("/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });
  }

  return (
    <div className="fixed top-1/2 left-1/2 w-1/4 min-w-3xs -translate-1/2 rounded-xl border border-blue-500 bg-[#171717] p-2">
      <div className="items flex h-1/8 flex-row gap-2">
        <button
          onClick={() => setOperation(0)}
          className={`${tabsClass} ${!operation && "bg-blue-500"}`}
        >
          Login
        </button>
        <button
          onClick={() => setOperation(1)}
          className={`${tabsClass} ${operation && "bg-blue-500"}`}
        >
          Sign Up
        </button>
      </div>
      <div className="flex flex-col gap-2 pt-2">
        {operation ? <Register register={register} /> : <Login login={login} />}
      </div>
    </div>
  );
}
