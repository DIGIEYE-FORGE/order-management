"use client";
import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
function SignOutComponent() {
  return (
    <Button
      variant="ghost"
      className="text-left justify-start rounded-none gap-2"
      onClick={() => signOut()}
    >
      <LogOut className="h-4 aspect-square" />
      <span>Sign Out</span>
    </Button>
  );
}

export default SignOutComponent;
