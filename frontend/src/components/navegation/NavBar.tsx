"use client";

import Image from "next/image";
import logo from "@assets/delta_logo.png";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Home, Users } from "lucide-react";
import ButtonRounded from "../button/ButtonRounded";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [route] = useState(pathname);
  const appUrl = process.env.NEXT_PUBLIC_URL;
  const { data: session } = useSession();

  async function logout() {
    await signOut({
      redirect: false,
    });

    router.replace("/");
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
            <div>
              <h1 className="text-sm">Olá {session?.user?.name ?? ""}</h1>
            </div>
            <button
              onClick={logout}
              className="p-2 w-40 border border-gray-300 rounded-md"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
