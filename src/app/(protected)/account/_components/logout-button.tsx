"use client";

import { LogOutIcon } from "lucide-react";
import MotionButtonAccount from "./motion-button-account";
import { logoutAndRedirect } from "@/lib/auth";

export default function LogoutButton() {
  return (
    <form action={logoutAndRedirect} className="contents">
      <MotionButtonAccount variant="default" type="submit" className="flex-1">
        <LogOutIcon />
        <span>Logout</span>
      </MotionButtonAccount>
    </form>
  );
}
