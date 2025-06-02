import db from "@/db/db";
import FlashcardGrid from "./_components/flashcard-grid";
import { notFound } from "next/navigation";
import { PaymentType } from "@/lib/types";

type FlashcardsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function FlashcardsPage({ params }: FlashcardsPageProps) {
  const { id } = await params;
  const [deck, flashcards] = await Promise.all([
    db.flashcardDeck.findUnique({
      where: { id },
      select: {
        id: true,
        log: {
          select: {
            error: true,
            paymentType: true,
          },
        },
      },
    }),
    db.flashcard.findMany({ where: { deckId: id } }),
  ]);

  if (!deck) {
    return notFound();
  }

  return (
    <FlashcardGrid
      deckId={deck.id}
      flashcards={flashcards}
      paymentType={deck.log.paymentType as PaymentType}
      error={deck.log.error}
    />
  );
}
