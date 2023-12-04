"use client";

import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathName = usePathname();
  return <div className="w-full flex-col py-6 gap-2"></div>;
}
