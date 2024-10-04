export default function ButtonAction({
  icon,
  color,
  onClick,
}: {
  icon: JSX.Element;
  color: { bg: string; hover: string };
  onClick: () => void;
}) {
  return (
    <button
      className={`flex w-6 h-6 rounded-lg justify-center items-center ${color.bg} ${color.hover}`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}
