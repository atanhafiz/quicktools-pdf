// supabase/functions/delete-pdf/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { PDFDocument } from "npm:pdf-lib";

serve(async (req) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const mode = formData.get("mode") as string;
    const pages = formData.get("pages") as string;

    if (!file) {
      return new Response("No file uploaded", {
        status: 400,
        headers: corsHeaders,
      });
    }

    const buffer = new Uint8Array(await file.arrayBuffer());
    const pdfDoc = await PDFDocument.load(buffer);
    const totalPages = pdfDoc.getPageCount();

    let pagesToDelete: number[] = [];

    if (mode === "specific" && pages) {
      pages.split(",").forEach((range) => {
        if (range.includes("-")) {
          const [start, end] = range.split("-").map((n) => parseInt(n.trim()) - 1);
          for (let i = start; i <= end; i++) pagesToDelete.push(i);
        } else {
          pagesToDelete.push(parseInt(range.trim()) - 1);
        }
      });
    } else if (mode === "odd-even") {
      if (pages === "odd") {
        for (let i = 0; i < totalPages; i++) if ((i + 1) % 2 !== 0) pagesToDelete.push(i);
      } else if (pages === "even") {
        for (let i = 0; i < totalPages; i++) if ((i + 1) % 2 === 0) pagesToDelete.push(i);
      }
    }

    if (pagesToDelete.length === 0) {
      return new Response("No valid pages to delete", {
        status: 400,
        headers: corsHeaders,
      });
    }

    // Buang duplicate & sort dari besar → kecil
    pagesToDelete = [...new Set(pagesToDelete)].sort((a, b) => b - a);

    for (const p of pagesToDelete) {
      if (p >= 0 && p < pdfDoc.getPageCount()) {
        pdfDoc.removePage(p);
      }
    }

    const modified = await pdfDoc.save();

    return new Response(modified, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=deleted.pdf",
      },
    });
  } catch (err) {
    console.error(err);
    return new Response("Error processing PDF: " + err.message, {
      status: 500,
      headers: corsHeaders,
    });
  }
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Preflight (OPTIONS) handler
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
});
