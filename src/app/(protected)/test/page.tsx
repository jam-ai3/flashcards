"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function UploadForm() {
  const [cards, setCards] = useState<Card[]>([]);
  const [mediaMap, setMediaMap] = useState<Record<string, string>>({});

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem(
      "file"
    ) as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/parse-apkg", {
      method: "POST",
      body: formData,
    });
    const { cards, media } = await res.json();
    setCards(cards);
    setMediaMap(buildMediaMap(media));
  }

  return (
    <div>
      <form onSubmit={handleUpload} className="flex gap-6 px-6">
        <Input type="file" name="file" accept=".apkg" />
        <Button type="submit">Upload</Button>
      </form>

      <div className="mt-4">
        {cards.map((card) => (
          <div key={card.id} className="my-2 p-4 border">
            <div>
              <strong>Front:</strong>
              <div
                dangerouslySetInnerHTML={{
                  __html: replaceMediaSrcs(card.front, mediaMap),
                }}
              />
            </div>
            <div>
              <strong>Back:</strong>
              <div
                dangerouslySetInnerHTML={{
                  __html: replaceMediaSrcs(card.back, mediaMap),
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type Card = { id: number; front: string; back: string };
type Media = { filename: string; mimeType: string; base64: string };

function buildMediaMap(media: Media[]) {
  const map: Record<string, string> = {};
  for (const { filename, mimeType, base64 } of media) {
    const url = `data:${mimeType};base64,${base64}`;
    map[filename] = url;
  }
  return map;
}

function replaceMediaSrcs(
  html: string,
  mediaMap: Record<string, string>
): string {
  return html.replace(
    /<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi,
    (match, filename) => {
      const dataUrl = mediaMap[filename];
      if (dataUrl) {
        return match.replace(filename, dataUrl);
      }
      return match; // leave untouched if not found
    }
  );
}
