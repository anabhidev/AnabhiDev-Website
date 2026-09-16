// ================================================================
// MFB-HR — Miss Fish Bali HR Career & Recruitment Platform
// Cloudflare Pages Function: Google Gemini AI Edge Proxy
// Path: /functions/api/gemini.js
// Endpoint: POST /api/gemini
// IT Department · Miss Fish Bali · Version 2.0
// ================================================================

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

export async function onRequestPost(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=utf-8',
  };

  try {
    const { request, env } = context;
    let body = {};
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid JSON payload.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const { prompt, action = 'generate', model: requestedModel } = body;

    if (!prompt && action !== 'ping') {
      return new Response(
        JSON.stringify({ success: false, message: 'Parameter "prompt" diperlukan.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Ambil API Keys dari Cloudflare Environment Variables (Multi-key rotation)
    const apiKeys = [
      env.GEMINI_API_KEY,
      env.GEMINI_API_KEY_2,
      env.GEMINI_API_KEY_3,
    ].filter((k) => typeof k === 'string' && k.trim().length > 0);

    // Default model: Gemini 2.5 Flash / 1.5 Flash
    const model = requestedModel || env.GEMINI_MODEL || 'gemini-1.5-flash';

    // Jika belum ada API key di Cloudflare Environment Variables
    if (apiKeys.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          needsSetup: true,
          message: 'GEMINI_API_KEY belum dikonfigurasi di Cloudflare Pages Environment Variables. Buka setup.html untuk panduan.',
          sampleResponse: 'Koneksi ke edge Cloudflare Pages berhasil, namun GEMINI_API_KEY belum di-set di Dashboard Cloudflare.',
        }),
        { status: 200, headers: corsHeaders }
      );
    }

    // Ping check action
    if (action === 'ping') {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Gemini Edge Proxy siap digunakan.',
          activeKeysCount: apiKeys.length,
          model,
        }),
        { status: 200, headers: corsHeaders }
      );
    }

    // Eksekusi pemanggilan Google Gemini API dengan auto-retry / key rotation
    let lastError = null;
    for (let i = 0; i < apiKeys.length; i++) {
      const currentKey = apiKeys[i].trim();
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${currentKey}`;

      try {
        const geminiRes = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 2048,
            },
          }),
        });

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
          return new Response(
            JSON.stringify({
              success: true,
              text: generatedText,
              modelUsed: model,
              keyIndexUsed: i + 1,
            }),
            { status: 200, headers: corsHeaders }
          );
        }

        const errData = await geminiRes.json().catch(() => ({}));
        const statusCode = geminiRes.status;
        lastError = errData?.error?.message || `HTTP ${statusCode}`;

        // Jika error rate limit 429 atau auth 403, coba key berikutnya di rotasi
        if ((statusCode === 429 || statusCode === 403) && i < apiKeys.length - 1) {
          continue;
        }

        // Jika bukan rate limit atau tidak ada key lain, hentikan
        break;
      } catch (networkErr) {
        lastError = networkErr.message;
      }
    }

    return new Response(
      JSON.stringify({
        success: false,
        message: `Gagal memanggil Gemini API: ${lastError}`,
      }),
      { status: 502, headers: corsHeaders }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, message: `Server error: ${err.message}` }),
      { status: 500, headers: corsHeaders }
    );
  }
}
