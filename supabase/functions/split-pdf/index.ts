// supabase/functions/split-pdf/index.ts
// Split PDF function:
// - Manual mode: extract selected pages (e.g. 1,3-5)
// - Auto mode: split entire PDF (1 file = all pages; later boleh expand to multi-files if perlu)

import { PDFDocument } from "https://esm.sh/pdf-lib@1.17.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Production: set ke https://quicktoolstech.com
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const form = await req.formData();
    const file = form.get("file") as File;
    const mode = form.get("mode")?.toString() || "manual";
    const pagesSpec = form.get("pages")?.toString() || "";

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const buffer = await file.arrayBuffer();
    const src = await PDFDocument.load(buffer);
    const out = await PDFDocument.create();

    let pageIndices: number[] = [];

    if (mode === "auto") {
      // ambik semua pages
      pageIndices = src.getPageIndices();
    } else {
      // manual mode → parse page range string (e.g. 1,3-5)
      if (pagesSpec) {
        pagesSpec.split(",").forEach((part) => {
          if (part.includes("-")) {
            const [start, end] = part.split("-").map((n) => parseInt(n.trim(), 10) - 1);
            for (let i = start; i <= end; i++) {
              if (i >= 0 && i < src.getPageCount()) pageIndices.push(i);
            }
          } else {
            const idx = parseInt(part.trim(), 10) - 1;
            if (idx >= 0 && idx < src.getPageCount()) pageIndices.push(idx);
          }
        });
      } else {
        pageIndices = src.getPageIndices(); // fallback → semua pages
      }
    }

    const copied = await out.copyPages(src, pageIndices);
    copied.forEach((p) => out.addPage(p));

    const outBytes = await out.save();

    return new Response(outBytes, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="split.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to split PDF" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
