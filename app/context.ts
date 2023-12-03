import { User } from "@prisma/client";
import React from "react";



const AppContext = React.createContext<{
  users: User | undefined;
  setMachines: React.Dispatch<React.SetStateAction<User | undefined>>;
} | null>(null);

export default AppContext;

export function useAppContext() {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error(
      "useContext must be used within a appContext.Provider",
    );
  }
  return context;
}