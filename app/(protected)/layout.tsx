import getCurrentUser from "@/actions/get-current-user";
import { Login } from "@/components/signIn";
import { SignUp } from "@/components/signUp";
import { Button } from "@/components/ui/button";
import React, { Fragment } from "react";
import AppContext from "../context";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function ProtectedLayout({ children }: LayoutProps) {
  const user = await getCurrentUser();
  return (
    <div className="bg-slate-100 h-full ">
      <div className="h-14 bg-white fixed inset-x-0 top-0 shadow-sm z-10">
        <div
          className="max-w-screen-2xl mx-auto flex 
        h-full items-center"
        >
          <div className="flex-1"></div>
          <div className=" flex items-center gap-4 justify-end">
            {!user ? (
              <Fragment>
                <SignUp />
                <Login />
              </Fragment>
            ) : (
              <p className="text-sm  text-red-500">{user?.email}</p>
            )}
          </div>
        </div>
      </div>
      <div className="h-full  pt-14 max-w-screen-2xl mx-auto">{children}</div>
    </div>
  );
}
