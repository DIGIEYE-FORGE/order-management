import getCurrentUser from "@/actions/get-current-user";
import React from "react";
import UserButton from "@/components/userButton";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function ProtectedLayout({ children }: LayoutProps) {
  const user = await getCurrentUser();
  return (
    <div className="bg-gray-100 h-full ">
      <div className="h-14 bg-white fixed inset-x-0 top-0 shadow-sm z-10">
        <div
          className="max-w-screen-2xl px-6 mx-auto flex 
        h-full items-center justify-end gap-2"
        >
          <span
            className="mr-auto font-semibold hidden md:inline-block"
            style={{
              letterSpacing: "-0.0125rem",
            }}
          >
            DIGIORDER
          </span>
          <UserButton />
        </div>
      </div>
      <div className="h-full  pt-14 max-w-screen-2xl mx-auto">{children}</div>
    </div>
  );
}
