// supabase/functions/rotate-pdf/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { PDFDocument, degrees } from "npm:pdf-lib@1.17.1";

serve(async (req) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const angle = parseInt(formData.get("angle") as string) || 90;
    const mode = (formData.get("mode") as string) || "all";
    const pages = (formData.get("pages") as string) || "";

    if (!file) {
      return new Response("No file uploaded", { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    if (mode === "all") {
      pdfDoc.getPages().forEach((page) => {
        page.setRotation(degrees(angle));
      });
    } else if (mode === "selected" && pages) {
      const pageNums = pages.split(",").flatMap((part) => {
        if (part.includes("-")) {
          const [start, end] = part.split("-").map((n) => parseInt(n.trim(), 10) - 1);
          return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        } else {
          return [parseInt(part.trim(), 10) - 1];
        }
      });

      pageNums.forEach((num) => {
        const page = pdfDoc.getPage(num);
        page.setRotation(degrees(angle));
      });
    }

    const pdfBytes = await pdfDoc.save();
    return new Response(pdfBytes, {
      headers: { "Content-Type": "application/pdf" },
    });
  } catch (err) {
    return new Response("Error rotating PDF: " + err.message, { status: 500 });
  }
});
