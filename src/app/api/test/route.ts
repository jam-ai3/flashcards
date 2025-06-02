// app/api/parse-apkg/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import os from "os";
import AdmZip from "adm-zip";
import Database from "better-sqlite3";
import { Note } from "@/lib/types";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file)
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());

  // Extract to temp dir
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "apkg-"));
  const zip = new AdmZip(buffer);
  zip.extractAllTo(tempDir, true);

  const dbPath = path.join(tempDir, "collection.anki2");
  const mediaJsonPath = path.join(tempDir, "media");
  const mediaMap = JSON.parse(await fs.readFile(mediaJsonPath, "utf-8"));

  const db = new Database(dbPath);
  const notes = db.prepare("SELECT * FROM notes").all() as Note[];

  const cards = notes.map((note) => {
    const [front, back] = note.flds.split("\x1f");
    return { id: note.id, front, back };
  });

  const mediaFiles: Record<
    string,
    { filename: string; buffer: Buffer; mimeType: string }
  > = {};
  const dirFiles = await fs.readdir(tempDir);
  for (const fileName of dirFiles) {
    if (/^\d+$/.test(fileName)) {
      const id = fileName;
      const filename = mediaMap[id];
      if (filename) {
        const buffer = await fs.readFile(path.join(tempDir, fileName));
        mediaFiles[id] = {
          filename,
          buffer,
          mimeType: getMimeType(filename),
        };
      }
    }
  }

  const media = Object.entries(mediaFiles).map(
    ([id, { filename, buffer, mimeType }]) => ({
      id,
      filename,
      mimeType,
      base64: buffer.toString("base64"),
    })
  );

  return NextResponse.json({ cards, media });
}

function getMimeType(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "mp3":
      return "audio/mpeg";
    case "ogg":
      return "audio/ogg";
    case "webm":
      return "video/webm";
    default:
      return "application/octet-stream";
  }
}
