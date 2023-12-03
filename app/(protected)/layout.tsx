import getCurrentUser from "@/actions/get-current-user";
import { Login } from "@/components/signIn";
import SignOutComponent from "@/components/signOut";
import { SignUp } from "@/components/signUp";
import React, { Fragment } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function ProtectedLayout({ children }: LayoutProps) {
  const user = await getCurrentUser();
  return (
    <div className="bg-slate-100 h-full ">
      <div className="h-14 bg-white fixed inset-x-0 top-0 shadow-sm z-10">
        <div
          className="max-w-screen-2xl px-6 mx-auto flex 
        h-full items-center justify-end gap-2"
        >
          <span
            className="mr-auto font-semibold "
            style={{
              letterSpacing: "-0.0125rem",
            }}
          >
            DIGIORDER
          </span>
          {!user ? (
            <>
              <SignUp />
              <Login />
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost">{user?.name}</Button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="flex p-0 py-3 flex-col max-w-[14rem]"
                side="bottom"
                sideOffset={6}
              >
                <span className="px-3 truncate py-2">{user.email}</span>
                <Separator />
                <SignOutComponent />
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
      <div className="h-full  pt-14 max-w-screen-2xl mx-auto">{children}</div>
    </div>
  );
}
