import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { isAuthenticated } from "../services/authService";

interface PrivateLayoutProps {
  children: ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  const token = isAuthenticated();

  if (!token) {
    redirect("/login");
  }

  return <>{children}</>;
}
