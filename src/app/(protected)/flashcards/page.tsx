import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { getSession } from "@/lib/auth";
import { LANDING_PAGE_URL } from "@/lib/constants";
import { ArrowRight, CircleCheck, CircleX } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import DeleteButton from "./_components/delete-btn";

export default async function GroupsPage() {
  const session = await getSession();
  if (!session) redirect(LANDING_PAGE_URL);
  const decks = await db.flashcardDeck.findMany({
    where: { userId: session.id },
    select: {
      id: true,
      log: {
        select: {
          error: true,
          createdAt: true,
        },
      },
      _count: {
        select: {
          flashcards: true,
        },
      },
    },
    orderBy: {
      log: {
        createdAt: "desc",
      },
    },
  });

  if (!decks || decks.length === 0) {
    return (
      <main className="place-items-center grid h-page">
        <div className="flex flex-col items-center gap-4">
          <p className="font-semibold text-lg">No Flashcard Sets Created</p>
          <p className="text-muted-foreground text-center">
            Click the button below to get started
          </p>
          <Button asChild variant="accent">
            <Link href="/">
              <span>Generate Flashcards</span>
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="px-6">
      <ul className="flex flex-col gap-4 pb-4">
        {decks.map((deck, index) => (
          <li
            key={deck.id}
            className="flex justify-between items-center bg-secondary px-4 py-2 border rounded-md text-primary"
          >
            <Link href={`/flashcards/${deck.id}`}>
              <div className="flex items-center gap-4">
                {deck.log.error === null ? (
                  <CircleCheck />
                ) : (
                  <CircleX className="text-destructive" />
                )}
                <div>
                  <p className="font-semibold">
                    Generation #{index + 1} - {deck._count.flashcards} cards
                  </p>
                  <p className="text-muted-foreground">
                    {deck.log.createdAt.toLocaleString()}
                  </p>
                </div>
              </div>
            </Link>
            <DeleteButton deckId={deck.id} />
          </li>
        ))}
      </ul>
    </main>
  );
}
