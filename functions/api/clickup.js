// ================================================================
// MFB-HR — Miss Fish Bali HR Career & Recruitment Platform
// Cloudflare Pages Function: ClickUp REST API v2 Edge Proxy
// Path: /functions/api/clickup.js
// Endpoint: GET /api/clickup (verify) | POST /api/clickup (create task)
// IT Department · Miss Fish Bali · Version 2.0
// ================================================================

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

// GET: Verifikasi kredensial dan status ClickUp List
export async function onRequestGet(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=utf-8',
  };

  try {
    const { env } = context;
    const token = (env.CLICKUP_API_TOKEN || '').trim();
    const listId = (env.CLICKUP_RECRUITMENT_LIST_ID || env.CLICKUP_LIST_ID || '').trim();

    if (!token || !listId) {
      return new Response(
        JSON.stringify({
          success: false,
          needsSetup: true,
          tokenConfigured: !!token,
          listIdConfigured: !!listId,
          message: 'CLICKUP_API_TOKEN atau CLICKUP_RECRUITMENT_LIST_ID belum di-set di Cloudflare Pages Environment Variables.',
        }),
        { status: 200, headers: corsHeaders }
      );
    }

    // Panggil ClickUp API untuk mendapatkan info List
    const listRes = await fetch(`https://api.clickup.com/api/v2/list/${encodeURIComponent(listId)}`, {
      method: 'GET',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });

    if (listRes.ok) {
      const listData = await listRes.json();
      return new Response(
        JSON.stringify({
          success: true,
          connected: true,
          list: {
            id: listData.id,
            name: listData.name,
            space: listData.space?.name,
            folder: listData.folder?.name,
          },
          message: `Terhubung ke ClickUp List: "${listData.name}"`,
        }),
        { status: 200, headers: corsHeaders }
      );
    }

    const errData = await listRes.json().catch(() => ({}));
    return new Response(
      JSON.stringify({
        success: false,
        status: listRes.status,
        message: errData.err || errData.message || `ClickUp API Error (HTTP ${listRes.status})`,
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, message: `Server error: ${err.message}` }),
      { status: 500, headers: corsHeaders }
    );
  }
}

// POST: Sinkronisasi data pelamar ke ClickUp Task
export async function onRequestPost(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=utf-8',
  };

  try {
    const { request, env } = context;
    const token = (env.CLICKUP_API_TOKEN || '').trim();
    const listId = (env.CLICKUP_RECRUITMENT_LIST_ID || env.CLICKUP_LIST_ID || '').trim();

    if (!token || !listId) {
      return new Response(
        JSON.stringify({
          success: false,
          needsSetup: true,
          message: 'CLICKUP_API_TOKEN atau CLICKUP_RECRUITMENT_LIST_ID belum di-set di Cloudflare Pages Environment Variables. Buka setup.html untuk panduan konfigurasi.',
        }),
        { status: 200, headers: corsHeaders }
      );
    }

    let payload = {};
    try {
      payload = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid JSON payload.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const {
      candidateId = `MFB-HR-${Date.now().toString(36).toUpperCase()}`,
      fullName = 'Kandidat Baru',
      email = '',
      phone = '',
      role = 'Posisi Tidak Ditentukan',
      department = 'General',
      experience = '0',
      expectedSalary = '',
      earliestStartDate = '',
      resumeUrl = '',
      portfolioUrl = '',
      coverLetter = '',
      source = 'Career Website',
    } = payload;

    // Tentukan emoji departemen sesuai konvensi MFB
    const deptEmojis = {
      Kitchen: '🍣',
      Service: '🛎️',
      Bar: '🍸',
      'Board of Director': '👑',
      Engineering: '⚡',
      'Guest Relation': '🌸',
      'Public Attendant': '✨',
      Accounting: '📊',
      Security: '🛡️',
      'Human Resources': '👥',
      'Creative & Marketing': '🎨',
      IT: '💻',
      'General & Admin': '📁',
    };
    const emoji = deptEmojis[department] || '💼';

    // Format Task Name: [Emoji] [Full Name] — [Role] ([Candidate ID])
    const taskName = `${emoji} ${fullName} — ${role} (${candidateId})`;

    // Format Task Description dengan Markdown terstruktur
    const taskDescription = [
      `### 📋 Profil Pelamar Miss Fish Bali`,
      `- **Candidate ID:** \`${candidateId}\``,
      `- **Nama Lengkap:** **${fullName}**`,
      `- **Posisi Dilamar:** ${role}`,
      `- **Departemen:** ${department}`,
      `- **Email:** [${email}](mailto:${email})`,
      `- **WhatsApp / Telp:** [${phone}](https://wa.me/${phone.replace(/[^0-9]/g, '')})`,
      `- **Pengalaman:** ${experience} tahun`,
      `- **Ekspektasi Gaji:** ${expectedSalary || 'Sesuai Standar'}`,
      `- **Ketersediaan Mulai:** ${earliestStartDate || 'Segera'}`,
      `- **Sumber Akuisisi:** ${source}`,
      ``,
      `### 📎 Dokumen & Portofolio`,
      resumeUrl ? `- **CV / Resume:** [Lihat Berkas CV ↗](${resumeUrl})` : `- *CV belum dilampirkan*`,
      portfolioUrl ? `- **Portofolio:** [Buka Portofolio ↗](${portfolioUrl})` : '',
      ``,
      `### 💬 Surat Lamaran / Cover Letter`,
      `> ${coverLetter.replace(/\n/g, '\n> ') || '*(Tidak disertakan)*'}`,
      ``,
      `---`,
      `*Disinkronkan otomatis dari Miss Fish Bali Career Portal & Cloudflare Pages Edge Functions*`,
    ].filter(Boolean).join('\n');

    const clickUpPayload = {
      name: taskName,
      description: taskDescription,
      tags: [
        'career-web',
        `dept-${department.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        'new-applicant',
      ],
      status: 'Screening',
      priority: 3, // Normal
    };

    const createRes = await fetch(`https://api.clickup.com/api/v2/list/${encodeURIComponent(listId)}/task`, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clickUpPayload),
    });

    if (createRes.ok) {
      const taskData = await createRes.json();
      return new Response(
        JSON.stringify({
          success: true,
          taskId: taskData.id,
          taskUrl: taskData.url,
          taskName: taskData.name,
          message: `Berhasil membuat task pelamar di ClickUp (${taskData.id})`,
        }),
        { status: 200, headers: corsHeaders }
      );
    }

    const errData = await createRes.json().catch(() => ({}));
    return new Response(
      JSON.stringify({
        success: false,
        status: createRes.status,
        message: errData.err || errData.message || `Gagal membuat task di ClickUp (HTTP ${createRes.status})`,
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

