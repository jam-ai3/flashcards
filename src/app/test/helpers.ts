import { unzipSync } from "fflate";

export async function parseApkg(file: File) {
  const buffer = new Uint8Array(await file.arrayBuffer());
  const zip = unzipSync(buffer);

  const dbData = zip["collection.anki2"];
  const mediaJson = JSON.parse(new TextDecoder().decode(zip["media"]));

  const media = Object.entries(zip)
    .filter(([k]) => /^\d+$/.test(k))
    .map(([id, buf]) => ({
      id,
      buffer: buf,
      filename: mediaJson[id],
      mimeType: formatMimeType(mediaJson[id]),
    }))
    .map(({ buffer, filename, mimeType }) => ({
      filename,
      url: URL.createObjectURL(
        new Blob([new Uint8Array(buffer)], { type: mimeType })
      ),
    }));

  return { dbData, media };
}

function formatMimeType(filename: string) {
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
