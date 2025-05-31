"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader, LogIn } from "lucide-react";
import { useActionState } from "react";
import AccentLink from "@/components/accent-link";
import GoogleSignInButton from "../_components/google-button";
import { handleLogin } from "../auth";
import { IS_DEV } from "@/lib/constants";

export default function LoginPage() {
  const [error, action, isPending] = useActionState(handleLogin, {});

  return (
    <main className="place-items-center grid bg-secondary h-screen">
      <form
        action={action}
        className="flex flex-col gap-4 bg-background p-6 rounded-md w-3/4 md:w-2/5"
      >
        <h1 className="mx-auto font-bold text-2xl">Login</h1>
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
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
          />
          {error.password && (
            <p className="text-destructive text-sm">{error.password}</p>
          )}
        </div>
        <AccentLink className="text-sm" href="/forgot-password">
          Forgot password?
        </AccentLink>
        <Button type="submit" disabled={isPending} variant="accent">
          {isPending ? (
            <>
              <span>Loading...</span>
              <Loader className="animate-spin" />
            </>
          ) : (
            <>
              <span>Login</span>
              <LogIn />
            </>
          )}
        </Button>
        {!IS_DEV && <GoogleSignInButton />}
        <div className="flex gap-1">
          <p className="text-muted-foreground">Don&apos;t have an account?</p>
          <AccentLink href="/register">Register</AccentLink>
        </div>
      </form>
    </main>
  );
}
