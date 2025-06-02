"use server";

import db from "@/db/db";

export async function deleteGroup(id: string) {
  await db.flashcardDeck.delete({ where: { id } });
}
