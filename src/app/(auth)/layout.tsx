import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AuthHeader from "./_components/auth-header";
import { APP_URL } from "@/lib/constants";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session?.id) return redirect(APP_URL);

  return (
    <>
      <AuthHeader />
      {children}
    </>
  );
}
