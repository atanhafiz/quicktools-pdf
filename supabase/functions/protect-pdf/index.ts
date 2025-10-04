import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const EXTERNAL_URL = Deno.env.get("PDF_PROTECTOR_URL");
const PROXY_SECRET = Deno.env.get("PDF_PROTECTOR_SECRET");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Check environment variables
  if (!EXTERNAL_URL || !PROXY_SECRET) {
    console.error("Missing environment variables:", {
      hasUrl: !!EXTERNAL_URL,
      hasSecret: !!PROXY_SECRET,
    });
    return new Response(
      JSON.stringify({ error: "Service configuration error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  // Log configuration (without exposing secrets)
  console.log("External URL:", EXTERNAL_URL);
  console.log("Proxy secret length:", PROXY_SECRET.length);

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const password = (formData.get("password") as string) || "123456";

    if (!file) {
      return new Response(
        JSON.stringify({ error: "No file uploaded" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Re-create FormData with Blob correctly
    const buffer = await file.arrayBuffer();
    const forwardForm = new FormData();
    forwardForm.append("file", new Blob([buffer], { type: file.type }), file.name || "input.pdf");
    forwardForm.append("password", password);

    console.log("Forwarding request to Render service...");

    // Call Render service with proper headers and error handling
    const resp = await fetch(EXTERNAL_URL, {
      method: "POST",
      body: forwardForm,
      headers: {
        "x-proxy-secret": PROXY_SECRET,
        "Connection": "keep-alive",
        "Accept": "*/*",
      },
      redirect: "follow",
    }).catch((fetchError) => {
      console.error("Fetch error:", fetchError);
      throw new Error(`Failed to connect to protect service: ${fetchError.message}`);
    });

    console.log("Render service response status:", resp.status);

    if (!resp.ok) {
      const text = await resp.text();
      console.error("Render service error:", text);
      return new Response(
        JSON.stringify({ error: `Protect service error: ${text}` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Stream PDF back with proper headers
    const pdfBytes = await resp.arrayBuffer();
    console.log("Successfully protected PDF, size:", pdfBytes.byteLength, "bytes");

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
    return new Response(
      JSON.stringify({ error: `Failed to protect PDF: ${err.message}` }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});