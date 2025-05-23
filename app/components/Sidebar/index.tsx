"use client";
import LogoutBtn from "@/app/ui/Button/LogoutBtn";
import Sections from "./Sections";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  if (isLoginPage) {
    return <></>;
  }

  return (
    <aside className="w-16 bg-white border-r border-gray-200 h-full flex flex-col items-center py-4 space-y-6 shadow-sm">
      <Sections />
      <LogoutBtn />
    </aside>
  );
}
