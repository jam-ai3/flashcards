"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader, LogIn } from "lucide-react";
import { useActionState } from "react";
import { handleEmailSending } from "../auth";

export default function ForgotPasswordPage() {
  const [error, action, isPending] = useActionState(handleEmailSending, {});

  return (
    <main className="place-items-center grid bg-secondary h-screen">
      <form
        action={action}
        className="flex flex-col gap-4 bg-background p-6 rounded-md w-3/4 md:w-2/5"
      >
        <h1 className="mx-auto font-bold text-2xl">Reset Password</h1>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="jdoe@gmail"
          />
          {error.email && (
            <p className="text-destructive text-sm">{error.email}</p>
          )}
        </div>
        <Button type="submit" disabled={isPending} variant="accent">
          {isPending ? (
            <>
              <span>Sending...</span>
              <Loader className="animate-spin" />
            </>
          ) : (
            <>
              <span>Reset Password</span>
              <LogIn />
            </>
          )}
        </Button>
      </form>
    </main>
  );
}
