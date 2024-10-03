export default function Input({ ...props }) {
  return (
    <input
      className="bg-white rounded-md border-solid border-[0.5px] border-blue-500 h-9 pl-4 focus:outline-none text-sm items-center"
      {...props}
    ></input>
  );
}
