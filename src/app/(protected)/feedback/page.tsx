"use server";

import FeedbackForm from "./_components/feedback-form";
import db from "@/db/db";
import { getSession } from "@/lib/auth";
import { LOGIN_PAGE_URL } from "@/lib/constants";
import { redirect } from "next/navigation";

export default async function FeedbackPage() {
  const session = await getSession();

  if (!session?.id) redirect(LOGIN_PAGE_URL);

  const review = await db.review.findUnique({ where: { userId: session.id } });

  return (
    <main className="place-items-center grid h-page">
      {session && (
        <FeedbackForm
          userId={session.id}
          disabled={!!review}
          email={session.email}
        />
      )}
    </main>
  );
}
