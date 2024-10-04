interface DividerProps {
  text: string;
}

export default function Divider({ text }: DividerProps) {
  return (
    <div className="w-full border-b-[1px] border-blue-400">
      <h1 className="text-lg font-semibold">{text}</h1>
    </div>
  );
}
