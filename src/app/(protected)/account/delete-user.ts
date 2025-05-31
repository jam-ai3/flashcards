"use server";

import db from "@/db/db";
import { getSession } from "@/lib/auth";

type deleteUserSaveReviewProps = {
  questionOne: string;
  message: string;
};

export async function deleteUserSaveReview({
  questionOne,
  message,
}: deleteUserSaveReviewProps) {
  deleteUser();
  saveReview(questionOne, message);
}

export async function deleteUser() {
  const context = await getSession();
  await db.user.delete({
    where: {
      id: context?.id,
    },
  });
}

export async function saveReview(questionOne: string, message: string) {
  const context = await getSession();
  await db.deleteResponse.create({
    data: {
      questionOne: questionOne,
      message: message,
      email: context?.email || "",
    },
  });
}
