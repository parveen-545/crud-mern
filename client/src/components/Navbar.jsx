export default function Navbar() {
  return (
    <>
      <div className="w-full flex justify-between h-15 items-center bg-gray-100 p-8 text-zinc-700">
        <div>
          <h1 className="cursor-pointer">Logo</h1>
        </div>
        <div className="w-[50%] h-full flex items-center ">
          <ul className="flex gap-8 w-full justify-end cursor-pointer">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </>
  );
}
