import { useContext, useState } from "react";
import { AuthContext } from "../../../pages/Home";
export default function Register(prop) {
  const setIsAuthOpen = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputClass = "grow bg-[#171717] border border-blue-500 rounded-md px-1";
  const buttonClass =
    "flex rounded-full font-light px-5 py-1 text-white transition duration-150 hover:cursor-pointer hover:bg-blue-600";
  return (
    <>
      <h3>Username: </h3>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={inputClass}
      ></input>
      <h3>Email: </h3>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
      ></input>
      <h3>Password: </h3>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={inputClass}
      />
      <div className="flex justify-end gap-2">
        <button onClick={() => setIsAuthOpen(false)}className={`${buttonClass} border border-blue-500`}>
          Cancel
        </button>
        <button
          onClick={() => {
            prop.register(username, email, password);
            setIsAuthOpen(false);
          }}
          className={`${buttonClass} bg-blue-500`}
        >
          Register
        </button>
      </div>
    </>
  );
}
