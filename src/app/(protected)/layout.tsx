import Header from "@/components/header/header";
import { SessionProvider } from "@/contexts/session-provider";
import { getSession } from "@/lib/auth";
import { LOGIN_PAGE_URL } from "@/lib/constants";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session?.id) redirect(LOGIN_PAGE_URL);

  return (
    <>
      <Header />
      <SessionProvider session={session}>{children}</SessionProvider>
    </>
  );
}
