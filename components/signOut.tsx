"use client";
import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

function SignOutComponent() {
  return (
    <Button
      onClick={() => {
        console.log("i am here");
        signOut();
      }}
    >
      Sign Out
    </Button>
  );
}

export default SignOutComponent;
