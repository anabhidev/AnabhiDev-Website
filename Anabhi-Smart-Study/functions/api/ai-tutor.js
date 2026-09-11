// ================================================================
// AnabhiDev-SMARTSTUDY — Cloudflare Pages Function: Gemini AI Tutor
// Endpoint: POST /api/ai-tutor
// Development · Anabhi Dev
// ================================================================

export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    // 1. Baca GEMINI_API_KEY dari Environment Variable Cloudflare Pages
    const apiKey = env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({
        error: 'GEMINI_API_KEY belum dikonfigurasi di Cloudflare Pages Environment Variables.'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    const { prompt, subject = 'Umum', studentGrade = 'Kelas 1 SD' } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return new Response(JSON.stringify({ error: 'Prompt pertanyaan wajib diisi.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. System Instruction ramah anak & edukatif sesuai standar Anabhi Dev
    const systemInstruction = `Kamu adalah "Kakak Belajar Pintar", asisten AI yang ramah, ceria, dan penuh empati untuk anak-anak sekolah dasar (${studentGrade}) di aplikasi Anabhi Dev Smart Study.
Aturan penting:
1. Gunakan bahasa Indonesia yang sederhana, hangat, santun, dan mudah dimengerti anak kecil.
2. Jelaskan materi dengan contoh konkret di dunia nyata atau analogi seru.
3. Berikan apresiasi dan semangat positif (misal: "Pertanyaanmu hebat sekali!", "Wah, seru banget kan?").
4. Jika anak menanyakan soal latihan atau kuis, JANGAN langsung berikan jawaban jadinya, melainkan pandu langkah demi langkah (metode Sokratik) agar anak berpikir sendiri.
5. Panjang respon ringkas dan padat (maksimal 2-3 paragraf pendek) agar anak tidak lelah membaca.
Mata pelajaran saat ini: ${subject}`;

    const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const requestBody = {
      contents: [
        {
          role: 'user',
          parts: [
            { text: `${systemInstruction}\n\nPertanyaan Anak: "${prompt}"` }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 600
      }
    };

    const resp = await fetch(geminiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!resp.ok) {
      const errData = await resp.text();
      return new Response(JSON.stringify({ error: `Gagal memanggil Gemini API: ${errData}` }), {
        status: resp.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await resp.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Wah, Kakak AI sedang berpikir keras. Boleh ulangi pertanyaannya?';

    return new Response(JSON.stringify({ reply }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
