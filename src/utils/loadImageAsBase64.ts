import path from "path";
import { glob } from "glob";
import { readFile } from "fs/promises";

export async function loadImageAsBase64(graphicId: string) {
  const imagePathBase = path.join(process.cwd(), "public", graphicId);

  // Look for the extension of the image file. There's only one.
  const imageFiles = await glob(imagePathBase + ".*");
  if (imageFiles.length === 0) {
    return null;
  }
  const extension = path.extname(imageFiles[0]).slice(1);
  const mimeTypeMap = {
    svg: "svg+xml",
    png: "png",
  } as Record<string, string>;

  const imageBuffer = await readFile(imageFiles[0]);
  const base64Image = imageBuffer.toString("base64");

  return `data:image/${mimeTypeMap[extension]};base64,${base64Image}`;
}
