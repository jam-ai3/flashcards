"use server";

import db from "@/db/db";
import { CustomError } from "@/lib/utils";
import {
  InputFormat,
  InputType,
  PaymentResult,
  RawFlashcard,
} from "@/lib/types";
import { redirect } from "next/navigation";

type PaymentType = "free" | "single" | "subscription";

export async function getPaymentOptions(
  userId: string
): Promise<PaymentResult | CustomError> {
  // const [subscription,  user] = await Promise.all([
  //   db.subscription.findUnique({
  //     where: { userId },
  //     select: { type: true, expiresAt: true },
  //   }),
  //   db.user.findUnique({
  //     where: { id: userId },
  //     select: { freeTrialStart: true },
  //   }),
  // ]);
  const user = await db.user.findUnique({ where: { id: userId } });

  if (!user) return { error: "User not found" };

  // all generations are free
  // const subscriptionType =
  //   subscription && subscription.expiresAt.getTime() > Date.now()
  //     ? "subscription"
  //     : isFreeTrialActive(user)
  //     ? "free"
  //     : null;
  const subscriptionType = "subscription";

  return { subscriptionType };
}

export async function createFlashcards(
  deckId: string,
  userId: string,
  paymentType: PaymentType,
  inputType: InputType,
  inputFormat: InputFormat,
  prompt: string,
  flashcards: RawFlashcard[]
) {
  try {
    const { id: logId } = await db.creationLog.create({
      data: {
        userId,
        prompt,
        paymentType,
        inputType,
        inputFormat,
      },
    });
    await db.flashcardDeck.create({
      data: {
        id: deckId,
        name: "",
        userId,
        logId: logId,
      },
    });
    await db.flashcard.createMany({
      data: flashcards.map((f) => ({
        ...f,
        type: "",
        deckId,
      })),
    });
  } catch (error) {
    console.error(error);
    return {
      error: "",
      devError: `Failed to create flashcards in database error: ${error}`,
    };
  }
}

export async function createErrorLog(
  userId: string,
  prompt: string,
  paymentType: PaymentType,
  inputType: InputType,
  inputFormat: InputFormat,
  error: string
) {
  await db.creationLog.create({
    data: {
      userId,
      prompt,
      paymentType,
      inputType,
      inputFormat,
      error,
    },
  });
}

export async function serverRedirect(url: string) {
  redirect(url);
}
