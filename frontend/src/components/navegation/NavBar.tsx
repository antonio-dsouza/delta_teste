"use client";

import Image from "next/image";
import logo from "@assets/delta_logo.png";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Home, LogOut, Users } from "lucide-react";
import ButtonRounded from "../button/ButtonRounded";
import { logout } from "@services/authService";

export default function NavBar() {
  const pathname = usePathname();
  const [route] = useState(pathname);
  const appUrl = process.env.NEXT_PUBLIC_URL;
  const userName = localStorage.getItem("name");

  async function handleLogout() {
    logout();
  }

  return (
    <nav className="flex w-full bg-white px-4">
      <div className="flex items-center gap-10 w-3/12 max-lg:gap-4">
        <Image className="h-10 w-auto max-sm:h-5" src={logo} alt="logo" />
      </div>
      <div className="flex w-6/12 max-md:w-7/12 justify-center items-center">
        <ButtonRounded
          active={route == "/"}
          href={`${appUrl}`}
          Icon={Home}
          text="Dashboard"
        />
        <ButtonRounded
          active={route.includes("/students")}
          href={`${appUrl}/students`}
          Icon={Users}
          text="Alunos"
        />
      </div>
      <div className="w-3/12 flex justify-end items-center gap-2 max-md:w-2/12">
        <div className="relative inline-block text-left">
          <div className="flex gap-3 justify-center items-center">
            <div className="flex flex-col items-end gap-1">
              <h1 className="text-sm">Olá {userName ?? ""}</h1>
              <button
                onClick={handleLogout}
                className="p-2 border h-6 border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-100"
              >
                <LogOut className="w-4 h-4" color="#5e5e61" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
