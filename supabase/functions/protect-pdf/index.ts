// supabase/functions/protect-pdf/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const EXTERNAL_URL =
  Deno.env.get("PDF_PROTECTOR_URL") || "http://localhost:8080/protect";
const PROXY_SECRET =
  Deno.env.get("PDF_PROTECTOR_SECRET") || "supersecret-change-this";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

serve(async (req: Request) => {
  // ✅ Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // ✅ Ambil form data (file + password)
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const password = (formData.get("password") as string) || "123456";

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ✅ Convert file to ArrayBuffer → forward ke microservice
    const arrayBuffer = await file.arrayBuffer();
    const forwardForm = new FormData();
    forwardForm.append("file", new Blob([arrayBuffer]), "input.pdf");
    forwardForm.append("password", password);

    // ✅ Hantar ke microservice
    const resp = await fetch(EXTERNAL_URL, {
      method: "POST",
      body: forwardForm,
      headers: { "x-proxy-secret": PROXY_SECRET },
    });

    if (!resp.ok) {
      const text = await resp.text();
      return new Response("Protect service error: " + text, {
        status: 502,
        headers: corsHeaders,
      });
    }

    // ✅ Ambil balik PDF encrypted
    const pdfArrayBuffer = await resp.arrayBuffer();

    return new Response(pdfArrayBuffer, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="protected.pdf"`,
      },
    });
  } catch (err) {
    console.error("Protect PDF proxy error:", err);
    return new Response("Failed to protect PDF: " + err.message, {
      status: 500,
      headers: corsHeaders,
    });
  }
});
