import { useContext, useState } from "react";
import { AuthContext } from "../../../pages/Home";

export default function Login(prop) {
  const setIsAuthOpen = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputClass = "grow bg-[#171717] border border-blue-500 rounded-md px-1";
  const buttonClass =
    "flex hover:border-blue-600 rounded-full px-5 py-1 text-white font-light transition duration-150 hover:cursor-pointer hover:bg-blue-600";
  return (
    <>
      <h3>Email: </h3>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
      />
      <h3>Password: </h3>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={inputClass}
      />
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setIsAuthOpen(false)}
          className={`${buttonClass} border border-blue-500`}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            prop.login(email, password);
            setIsAuthOpen(false);
          }}
          className={`${buttonClass} bg-blue-500`}
        >
          Login
        </button>
      </div>
    </>
  );
}
