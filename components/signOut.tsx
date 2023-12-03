"use client";
import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

function SignOutComponent() {
  return (
    <Button
      onClick={() => {
        signOut();
      }}
    >
      Sign Out
    </Button>
  );
}

export default SignOutComponent;
