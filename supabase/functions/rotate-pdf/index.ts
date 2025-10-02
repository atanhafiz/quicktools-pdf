import { serve } from "https://deno.land/std/http/server.ts";
import { PDFDocument, degrees } from "npm:pdf-lib";

serve(async (req) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const angle = Number(formData.get("angle") || 90);
    const mode = formData.get("mode") || "all";
    const pages = formData.get("pages")?.toString() || "";

    if (!file) {
      return new Response("No file uploaded", { status: 400 });
    }

    const inputBytes = new Uint8Array(await file.arrayBuffer());
    const pdfDoc = await PDFDocument.load(inputBytes);

    // ✅ convert numeric angle → pdf-lib degrees
    const rotation = [90, 180, 270].includes(angle) ? degrees(angle) : null;
    if (!rotation) {
      return new Response(`Invalid rotation: ${angle}`, { status: 400 });
    }

    if (mode === "all") {
      pdfDoc.getPages().forEach((page) => page.setRotation(rotation));
    } else if (mode === "selected") {
      const pageNumbers = pages
        .split(",")
        .flatMap((part) =>
          part.includes("-")
            ? (() => {
                const [start, end] = part.split("-").map(Number);
                return Array.from({ length: end - start + 1 }, (_, i) => start + i);
              })()
            : [Number(part)]
        );

      pageNumbers.forEach((p) => {
        const page = pdfDoc.getPages()[p - 1];
        if (page) page.setRotation(rotation);
      });
    }

    const outputBytes = await pdfDoc.save();

    return new Response(outputBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
  } catch (err) {
    return new Response(`Error: ${err.message}`, {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
  }
});
