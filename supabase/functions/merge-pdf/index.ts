// supabase/functions/merge-pdf/index.ts
// Edge Function untuk merge multiple PDF files jadi satu
// Upload file guna multipart/form-data dengan key "files"

import { PDFDocument } from "https://esm.sh/pdf-lib@1.17.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Production: tukar ke https://quicktoolstech.com
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const MAX_FILES = 30;              // Limit bilangan fail
const MAX_TOTAL_BYTES = 50 * 1024 * 1024; // Limit saiz total (50MB)

Deno.serve(async (req: Request) => {
  // Handle preflight
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
    const files = form.getAll("files").filter((f) => f instanceof File) as File[];

    if (!files || files.length === 0) {
      return new Response(JSON.stringify({ error: "No files uploaded" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (files.length > MAX_FILES) {
      return new Response(JSON.stringify({ error: `Too many files (max ${MAX_FILES})` }), {
        status: 413,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Kira total size
    let totalBytes = 0;
    for (const f of files) totalBytes += f.size;
    if (totalBytes > MAX_TOTAL_BYTES) {
      return new Response(JSON.stringify({ error: "Payload too large" }), {
        status: 413,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Merge PDF logic
    const merged = await PDFDocument.create();

    for (const file of files) {
      const buf = await file.arrayBuffer();
      const src = await PDFDocument.load(buf);
      const pages = await merged.copyPages(src, src.getPageIndices());
      for (const p of pages) merged.addPage(p);
    }

    const outBytes = await merged.save();

    return new Response(outBytes, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="merged.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to merge PDFs" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
