import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const EXTERNAL_URL = Deno.env.get("PDF_PROTECTOR_URL") || "";
const PROXY_SECRET = Deno.env.get("PDF_PROTECTOR_SECRET") || "";

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
    const password = (formData.get("password") as string) || "123456";

    if (!file) {
      return new Response("No file uploaded", { status: 400, headers: corsHeaders });
    }

    const arrayBuffer = await file.arrayBuffer();
    const forwardForm = new FormData();
    forwardForm.append("file", new Blob([arrayBuffer]), "input.pdf");
    forwardForm.append("password", password);

    const resp = await fetch(EXTERNAL_URL, {
      method: "POST",
      body: forwardForm,
      headers: { "x-proxy-secret": PROXY_SECRET },
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error("Protect service error:", text);
      return new Response("Protect service error: " + text, {
        status: 502,
        headers: corsHeaders,
      });
    }

    const pdfBytes = await resp.arrayBuffer();

    return new Response(pdfBytes, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="protected.pdf"',
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
