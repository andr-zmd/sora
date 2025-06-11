export default function Login() {
  const buttonClass = "text-sm font-light items-center flex justify-around w-1/2 border-blue-500 border py-2 rounded-xl";
  return (
    <div className="fixed w-1/6 h-1/3 right-3 top-3 p-2 border border-blue-500 rounded-xl">
      <div className="flex h-1/8 items flex-row gap-2 ">
        <div className={buttonClass}>
          Login
        </div>
        <div className={buttonClass}>
          Sign Up
        </div>
      </div>
      <div className="flex flex-col pt-2 gap-2 bg-black">
        <h3>Username: </h3>
        <input className="grow bg-[#171717] rounded-md"/>
        <h3>Password: </h3>
        <input className="grow bg-[#171717] rounded-md"/>
      </div>
    </div>
  )
}