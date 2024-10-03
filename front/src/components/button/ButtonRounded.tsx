import { LucideIcon } from "lucide-react";

interface ButtonProps {
  Icon: LucideIcon;
  href: string;
  text: string;
  style?: string;
  active?: boolean;
}

export default function ButtonRounded({
  active = false,
  Icon,
  href,
  style,
  text,
  ...props
}: ButtonProps) {
  return (
    <a
      href={href}
      data-active={active}
      className={`flex flex-col w-20 h-16 justify-center items-center hover:bg-blue-100 text-zinc-800 text-xs gap-1 data-[active=true]:bg-blue-100 ${style}`}
      {...props}
    >
      <Icon color="#5e5e61" />
      <span className="hidden md:inline">{text}</span>
    </a>
  );
}
