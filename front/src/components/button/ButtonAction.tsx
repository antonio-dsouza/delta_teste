export default function ButtonAction({
  icon,
  color,
  onClick,
}: {
  icon: JSX.Element;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`flex w-6 h-6 rounded-lg justify-center items-center hover:bg-${color}-600 bg-${color}-500`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}
