"use client";
import React from "react";
import { SignUp } from "./signUp";
import { Login } from "@/components/signIn";
import SignOutComponent from "@/components/signOut";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

function UserButton() {
  const { data: session, status } = useSession();
  if (status === "unauthenticated")
    return (
      <>
        <SignUp />
        <Login />
      </>
    );
  if (status === "loading") return "Loading...";
  const user = session?.user;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2" size="sm">
          <span className="hidden md:inline-block capitalize">
            {user?.name}
          </span>
          <Avatar className="w-6 h-6">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>{user?.name?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex p-0 py-3 flex-col max-w-min"
        side="bottom"
        sideOffset={6}
      >
        <span className="px-3 truncate py-2">{user?.email}</span>
        <Separator />
        <SignOutComponent />
      </PopoverContent>
    </Popover>
  );
}

export default UserButton;
