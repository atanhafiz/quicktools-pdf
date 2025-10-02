// supabase/functions/delete-pdf/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { PDFDocument } from "npm:pdf-lib@1.17.1";

serve(async (req) => {
  try {
    const form = await req.formData();
    const file = form.get("file") as File;
    const mode = form.get("mode")?.toString() || "specific";
    const pagesInput = form.get("pages")?.toString() || "";

    if (!file) {
      return new Response("No file uploaded", {
        status: 400,
        headers: corsHeaders,
      });
    }

    const buffer = new Uint8Array(await file.arrayBuffer());
    const pdfDoc = await PDFDocument.load(buffer);

    let pagesToDelete: number[] = [];

    if (mode === "specific") {
      // Parse "1,3,5-7"
      if (pagesInput.trim() !== "") {
        pagesInput.split(",").forEach((part) => {
          part = part.trim();
          if (part.includes("-")) {
            const [start, end] = part.split("-").map((n) => parseInt(n));
            for (let i = start; i <= end; i++) pagesToDelete.push(i - 1);
          } else {
            pagesToDelete.push(parseInt(part) - 1);
          }
        });
      }
    } else if (mode === "odd-even") {
      if (pagesInput === "odd") {
        pdfDoc.getPages().forEach((_, i) => {
          if ((i + 1) % 2 !== 0) pagesToDelete.push(i);
        });
      } else if (pagesInput === "even") {
        pdfDoc.getPages().forEach((_, i) => {
          if ((i + 1) % 2 === 0) pagesToDelete.push(i);
        });
      }
    }

    // Validate
    pagesToDelete = pagesToDelete.filter(
      (p) => p >= 0 && p < pdfDoc.getPageCount()
    );
    if (pagesToDelete.length === 0) {
      return new Response("No valid pages to delete", {
        status: 400,
        headers: corsHeaders,
      });
    }

    // Delete descending order
    pagesToDelete.sort((a, b) => b - a);
    for (const p of pagesToDelete) {
      pdfDoc.removePage(p);
    }

    const outPdf = await pdfDoc.save();
    return new Response(outPdf, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=deleted.pdf",
      },
    });
  } catch (err) {
    console.error("Delete-PDF error:", err);
    return new Response(`Error: ${err.message}`, {
      status: 500,
      headers: corsHeaders,
    });
  }
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};
