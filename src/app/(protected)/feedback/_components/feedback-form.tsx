"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2, Star } from "lucide-react";
import { useActionState, useState } from "react";
import { createReview } from "../review";

const STARS: Rating[] = [1, 2, 3, 4, 5];

export type Rating = 1 | 2 | 3 | 4 | 5;

type FeedbackFormProps = {
  userId: string;
  disabled?: boolean;
  email: string;
};

export default function FeedbackForm({
  userId,
  disabled = false,
  email,
}: FeedbackFormProps) {
  const [rating, setRating] = useState<Rating | null>(null);
  const [message, setMessage] = useState<string>("");
  const [error, action, isPending] = useActionState(
    createReview.bind(null, userId, rating, message, email),
    { rating: "" }
  );

  function handleSelectRating(event: React.MouseEvent, rating: Rating) {
    event.preventDefault();
    setRating(rating);
  }

  return (
    <form
      action={action}
      className="relative flex flex-col gap-4 bg-secondary p-4 border-2 rounded-md w-1/2 overflow-hidden"
    >
      <div>
        <p className="font-semibold text-lg">Rate us</p>
        <p className="text-muted-foreground">
          How has your jamAI experience been?
        </p>
      </div>
      <RatingView rating={rating} handleSelectRating={handleSelectRating} />
      {error.rating && <p className="text-destructive">{error.rating}</p>}
      <Textarea
        placeholder="Share your feedback here"
        className="min-h-32 resize-none"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <Button type="submit" disabled={rating === null} variant="accent">
        {isPending ? (
          <>
            <Loader2 className="animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <span>Rate</span>
        )}
      </Button>
      {error.error && <p className="text-destructive">{error.error}</p>}
      {disabled && (
        <div className="absolute inset-0 flex justify-center items-center gap-2 backdrop-blur-md">
          <CheckCircle />
          <span className="font-semibold">You have already rated</span>
        </div>
      )}
    </form>
  );
}

type RatingViewProps = {
  rating: Rating | null;
  handleSelectRating?: (event: React.MouseEvent, rating: Rating) => void;
};

export function RatingView({ rating, handleSelectRating }: RatingViewProps) {
  return (
    <div className="flex gap-2">
      {STARS.map((star) => {
        return handleSelectRating !== undefined ? (
          <button
            key={star}
            onClick={(event) => handleSelectRating(event, star)}
            className="cursor-pointer"
          >
            <Star style={{ fill: (rating ?? 0) >= star ? "gold" : "none" }} />
          </button>
        ) : (
          <Star
            key={star}
            style={{ fill: (rating ?? 0) >= star ? "gold" : "none" }}
          />
        );
      })}
    </div>
  );
}
