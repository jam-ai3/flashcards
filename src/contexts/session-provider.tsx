"use client";

import { Session } from "@/lib/types";
import { createContext, ReactNode, useContext } from "react";

const SessionContext = createContext<Session>({
  id: "",
  email: "",
  isAdmin: false,
});

type SessionProviderProps = {
  children: ReactNode;
  session: Session;
};

export function SessionProvider({ children, session }: SessionProviderProps) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
