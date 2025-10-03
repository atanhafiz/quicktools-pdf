// supabase/functions/unlock-pdf/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const EXTERNAL_URL =
  Deno.env.get("PDF_PROTECTOR_URL") || "http://localhost:8080/unlock";
const PROXY_SECRET =
  Deno.env.get("PDF_PROTECTOR_SECRET") || "supersecret-change-this";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const password = (formData.get("password") as string) || "";

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const arrayBuffer = await file.arrayBuffer();

    const forwardForm = new FormData();
    forwardForm.append("file", new Blob([arrayBuffer]), "input.pdf");
    forwardForm.append("password", password);

    const resp = await fetch(EXTERNAL_URL, {
      method: "POST",
      body: forwardForm,
      headers: {
        "x-proxy-secret": PROXY_SECRET,
      },
    });

    if (!resp.ok) {
      const text = await resp.text();
      return new Response("Unlock service error: " + text, {
        status: 502,
        headers: corsHeaders,
      });
    }

    const pdfArrayBuffer = await resp.arrayBuffer();

    return new Response(pdfArrayBuffer, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="unlocked.pdf"`,
      },
    });
  } catch (err) {
    console.error("Unlock PDF proxy error:", err);
    return new Response("Failed to unlock PDF: " + err.message, {
      status: 500,
      headers: corsHeaders,
    });
  }
});
