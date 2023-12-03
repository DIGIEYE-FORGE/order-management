import { SignIn } from "@/components/signIn";
import { Button } from "@/components/ui/button";
import React from "react";
import { useLocalStorage } from "usehooks-ts";

type LayoutProps = {
  children: React.ReactNode;
};

export default function ProtectedLayout({ children }: LayoutProps) {
  return (
    <div className="bg-slate-100 h-full ">
      <div className="h-14 bg-white fixed inset-x-0 top-0 shadow-sm z-10">
        <div
          className="max-w-screen-2xl mx-auto flex 
        h-full items-center"
        >
          <SignIn />
        </div>
      </div>
      <div className="h-full  pt-14 max-w-screen-2xl mx-auto">{children}</div>
    </div>
  );
}
