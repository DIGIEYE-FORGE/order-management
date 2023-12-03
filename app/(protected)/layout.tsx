import getCurrentUser from "@/actions/get-current-user";
import { Login } from "@/components/signIn";
import SignOutComponent from "@/components/signOut";
import { SignUp } from "@/components/signUp";
import React, { Fragment } from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function ProtectedLayout({ children }: LayoutProps) {
  const user = await getCurrentUser();
  return (
    <div className="bg-slate-100 h-full ">
      <div className="h-14 bg-white fixed inset-x-0 top-0 shadow-sm z-10">
        <div
          className="max-w-screen-2xl px-4 mx-auto flex 
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
              <Fragment>
                <p className="text-sm  text-red-500">{user?.email}</p>
                <SignOutComponent />
              </Fragment>
            )}
          </div>
        </div>
      </div>
      <div className="h-full  pt-14 max-w-screen-2xl mx-auto">{children}</div>
    </div>
  );
}
