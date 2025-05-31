"use client";

import { Button } from "@/components/ui/button";
import { Flashcard } from "@prisma/client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type StudyViewProps = {
  flashcards: Flashcard[];
};

export default function StudyView({ flashcards }: StudyViewProps) {
  const [index, setIndex] = useState(0);

  function handleBack() {
    if (index !== 0) setIndex(index - 1);
  }

  function handleNext() {
    if (index < flashcards.length - 1) setIndex(index + 1);
  }

  return (
    <div className="place-items-center grid h-page">
      <FlashcardView flashcard={flashcards[index]} />
      <div className="bottom-8 absolute flex justify-between w-3/4">
        <Button onClick={handleBack} disabled={index <= 0}>
          <ArrowLeft />
          <span>Back</span>
        </Button>
        <p>
          {index + 1}/{flashcards.length}
        </p>
        <Button onClick={handleNext} disabled={index >= flashcards.length - 1}>
          <span>Next</span>
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}

type FlashcardViewProps = {
  flashcard: Flashcard;
};

function FlashcardView({ flashcard }: FlashcardViewProps) {
  const [side, setSide] = useState<"front" | "back">("front");

  useEffect(() => {
    setSide("front");
  }, [flashcard]);

  return (
    <div
      className="relative w-5/6 md:w-2/3 lg:w-1/2 aspect-video cursor-pointer"
      onClick={() => setSide(side === "front" ? "back" : "front")}
    >
      <motion.div
        className="absolute inset-0 flex justify-center items-center bg-white p-6 border-2 rounded-xl"
        initial={{ rotateY: 0 }}
        animate={{ rotateY: side === "front" ? 0 : 180 }}
        transition={{ duration: 0.5 }}
        style={{ backfaceVisibility: "hidden" }}
      >
        <p className="text-sm md:text-lg text-center">{flashcard.front}</p>
      </motion.div>
      <motion.div
        className="absolute inset-0 flex justify-center items-center bg-secondary p-6 border-2 rounded-xl"
        initial={{ rotateY: -180 }}
        animate={{ rotateY: side === "front" ? -180 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ backfaceVisibility: "hidden" }}
      >
        <p className="text-sm md:text-lg text-center">{flashcard.back}</p>
      </motion.div>
    </div>
  );
}
