// supabase/functions/organize-pdf/index.ts
// Reorder pages in a PDF.
// Modes:
//  - custom: use order string e.g. "3,1,2" or "1-3,5,4" (1-based)
//  - reverse: reverse all pages
//
// Request: multipart/form-data
//  - file: File (PDF)
//  - mode: "custom" | "reverse"
//  - order: string (required if mode=custom)
//
// Response: application/pdf (single reordered PDF)

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { PDFDocument } from "npm:pdf-lib@1.17.1";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*", // PRODUCTION: tukar ke https://quicktoolstech.com kalau nak ketat
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function parseOrder(order: string, totalPages: number): number[] {
  // convert "3,1,2" / "1-3,5,4" -> zero-based indices array
  // allow duplicates; ignore out-of-range gracefully
  const tokens = order.split(",").map((t) => t.trim()).filter(Boolean);
  const out: number[] = [];

  for (const t of tokens) {
    if (t.includes("-")) {
      const [a, b] = t.split("-").map((x) => parseInt(x.trim(), 10));
      if (Number.isFinite(a) && Number.isFinite(b)) {
        const start = Math.min(a, b);
        const end = Math.max(a, b);
        for (let i = start; i <= end; i++) {
          const idx = i - 1; // 1-based -> 0-based
          if (idx >= 0 && idx < totalPages) out.push(idx);
        }
      }
    } else {
      const n = parseInt(t, 10);
      const idx = n - 1;
      if (Number.isFinite(n) && idx >= 0 && idx < totalPages) out.push(idx);
    }
  }
  return out;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    const mode = (form.get("mode")?.toString() || "custom").toLowerCase();
    const orderStr = form.get("order")?.toString() || "";

    if (!file) {
      return new Response("No file uploaded", { status: 400, headers: corsHeaders });
    }

    const input = new Uint8Array(await file.arrayBuffer());
    const src = await PDFDocument.load(input);
    const total = src.getPageCount();

    let sequence: number[] = [];
    if (mode === "reverse") {
      sequence = Array.from({ length: total }, (_, i) => total - 1 - i);
    } else {
      // custom
      if (!orderStr.trim()) {
        return new Response("Order string is required for custom mode", { status: 400, headers: corsHeaders });
      }
      sequence = parseOrder(orderStr, total);
      if (sequence.length === 0) {
        return new Response("No valid page indices in order", { status: 400, headers: corsHeaders });
      }
    }

    const out = await PDFDocument.create();
    const copied = await out.copyPages(src, sequence);
    copied.forEach((p) => out.addPage(p));

    const bytes = await out.save();

    return new Response(bytes, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="organized.pdf"',
        "Cache-Control": "no-store",
      },
    });
  } catch (err: any) {
    console.error("organize-pdf error:", err);
    return new Response("Error: " + (err?.message || "unknown"), { status: 500, headers: corsHeaders });
  }
});
