"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { parseApkg } from "./helpers";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { parseNotes } from "./actions";

type Media = { filename: string; url: string };

export default function UploadForm() {
  const [media, setMedia] = useState<Media[]>([]);
  const [index, setIndex] = useState(0);

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem(
      "file"
    ) as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const { dbData, media } = await parseApkg(file);

    await parseNotes(dbData);

    setMedia(media);
  }

  return (
    <main className="flex flex-col gap-6 p-6 h-full">
      <form onSubmit={handleUpload} className="flex gap-6">
        <Input type="file" name="file" accept=".apkg" />
        <Button type="submit">Upload</Button>
      </form>
      <div className="flex-1 place-items-center grid">
        {media.length > 0 && <img src={media[index].url} alt="Image" />}
      </div>
      <div className="flex justify-between">
        <Button disabled={index === 0} onClick={() => setIndex(index - 1)}>
          <ArrowLeft />
          <span>Back</span>
        </Button>
        <Button
          disabled={media.length === 0 || index === media.length - 1}
          onClick={() => setIndex(index + 1)}
        >
          <span>Next</span>
          <ArrowRight />
        </Button>
      </div>
    </main>
  );
}
