"use client";

import { useEffect } from "react";
import { handleGoogleLogin } from "../auth";

declare global {
  interface Window {
    handleGoogleLogin: (
      response: google.accounts.id.CredentialResponse
    ) => Promise<void>;
  }
}

export default function GoogleSignInButton() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: handleGoogleLogin,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("g_id_signin")!,
        {
          type: "standard",
          theme: "outline",
          size: "large",
        }
      );
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <div id="g_id_signin" />
    </div>
  );
}
