"use server";

import { Card, Note } from "@/lib/types";
import Database from "better-sqlite3";

export async function parseNotes(data: Uint8Array<ArrayBufferLike>) {
  const db = new Database(Buffer.from(data));
  const notes = db.prepare("SELECT * FROM notes").all() as Note[];
  const cards = db.prepare("SELECT * FROM cards").all() as Card[];
  console.log(cards);
  return notes;
}
