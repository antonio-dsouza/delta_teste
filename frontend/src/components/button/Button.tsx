export default function Button({ ...props }) {
  return (
    <button
      className="w-full h-12 bg-blue-500 rounded-md text-white hover:bg-blue-400"
      {...props}
    ></button>
  );
}
