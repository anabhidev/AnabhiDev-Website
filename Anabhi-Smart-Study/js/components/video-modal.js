// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · YouTube Safe Video Modal Component
// Development · Anabhi Dev
// Version   : 2.0 (Resilient file:/// & http/https Player Support)
// Generated : 11 September 2026
// ================================================================

export class VideoModalComponent {
  constructor(modalContainer) {
    this.container = modalContainer;
    this.initEvents();
  }

  initEvents() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.container.classList.contains('show')) {
        this.close();
      }
    });

    this.container.addEventListener('click', (e) => {
      if (e.target === this.container) {
        this.close();
      }
    });
  }

  open(title, youtubeUrl) {
    if (!youtubeUrl) return;

    // Ekstrak ID YouTube dengan aman
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=[&]?|&v=)([^#&?]*).*/;
    const match = youtubeUrl.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;

    const directUrl = videoId
      ? `https://www.youtube.com/watch?v=${videoId}`
      : youtubeUrl;
    const embedUrl = videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
      : youtubeUrl;
    const thumbUrl = videoId
      ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
      : '';

    const isFileProtocol = (typeof window !== 'undefined' && window.location.protocol === 'file:');

    // Buat template modal yang adaptif
    this.container.innerHTML = `
      <div class="video-modal-content" role="dialog" aria-modal="true" aria-labelledby="modalVideoTitle">
        <div class="video-modal-header">
          <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
            <strong id="modalVideoTitle" style="font-size:15px; font-weight:800; color:var(--ink);">${title || 'Video Pembelajaran'}</strong>
            <a href="${directUrl}" target="_blank" rel="noopener noreferrer" class="btn" style="padding:4px 10px; font-size:11.5px; text-decoration:none; display:inline-flex; align-items:center; gap:5px; background:rgba(239,68,68,0.12); color:#ef4444; border-color:rgba(239,68,68,0.3);">
              <span>▶ Buka di YouTube</span> ↗
            </a>
          </div>
          <button class="iconbtn" id="btnModalClose" type="button" aria-label="Tutup video" style="color:var(--ink); border-color:var(--line); height:36px; min-width:36px;">
            ✕
          </button>
        </div>

        <div class="video-iframe-wrap" id="videoWrapper">
          ${isFileProtocol ? `
            <div id="filePlayerPoster" style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#0b1526; cursor:pointer; text-align:center; padding:16px;">
              ${thumbUrl ? `<img src="${thumbUrl}" alt="${title}" style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:brightness(0.65); transition:filter 0.2s;" />` : ''}
              
              <!-- Tombol Play Merah YouTube -->
              <div style="position:relative; z-index:2; display:flex; flex-direction:column; align-items:center; gap:12px;">
                <div id="btnPosterPlay" style="width:76px; height:52px; background:#ff0000; border-radius:16px; display:flex; align-items:center; justify-content:center; box-shadow:0 10px 25px rgba(255,0,0,0.5), 0 0 0 4px rgba(255,255,255,0.25); transition:transform 0.18s ease-in-out;">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffffff"><path d="M8 5v14l11-7z"/></svg>
                </div>
                <div style="background:rgba(15,23,42,0.88); color:#ffffff; padding:7px 16px; border-radius:20px; font-size:13px; font-weight:700; border:1px solid rgba(255,255,255,0.25); backdrop-filter:blur(6px); letter-spacing:0.3px;">
                  ▶ Putar Video (Popup Jendela Bebas Gangguan)
                </div>
              </div>
            </div>
          ` : `
            <iframe
              id="ytEmbedIframe"
              src="${embedUrl}"
              title="${title || 'Video Pembelajaran'}"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
              loading="lazy">
            </iframe>
          `}
        </div>

        <div class="video-modal-footer" style="padding:12px 18px; background:var(--surface); border-top:1px solid var(--line); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; font-size:12.5px;">
          <div style="color:var(--muted); max-width:480px; line-height:1.45;">
            ${isFileProtocol ? `
              💡 <strong>Mode Berkas Lokal (file://):</strong> Browser melindungi privasi dengan membatasi iframe YouTube (Error 153). Klik tombol putar untuk membuka jendela video interaktif bebas gangguan, atau jalankan <code>start-server.bat</code> untuk pemutar tersemat.
            ` : `
              💡 <strong>Info:</strong> Bila pemutar lokal terhalang aturan privasi, tonton video langsung melalui tombol di sebelah kanan.
            `}
          </div>
          <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
            ${isFileProtocol ? `
              <button class="btn" id="btnForceEmbed" type="button" style="font-size:12px; padding:6px 12px;">
                🔄 Paksa Sematkan Iframe
              </button>
            ` : ''}
            <a href="${directUrl}" id="btnOpenDirect" target="_blank" rel="noopener noreferrer" class="btn primary" style="padding:7px 14px; font-size:12.5px; text-decoration:none; display:inline-flex; align-items:center; gap:6px;">
              <span>▶ Tonton di YouTube</span> ↗
            </a>
          </div>
        </div>
      </div>
    `;

    this.container.classList.add('show');

    // Handler tombol tutup
    const closeBtn = this.container.querySelector('#btnModalClose');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    // Helper membuka video dalam popup elegan
    const launchVideoPopup = () => {
      const width = Math.min(window.screen.availWidth || 960, 960);
      const height = Math.min(window.screen.availHeight || 560, 560);
      const left = Math.max(0, Math.floor((window.screen.availWidth - width) / 2));
      const top = Math.max(0, Math.floor((window.screen.availHeight - height) / 2));
      const popup = window.open(
        directUrl,
        'ytPlayer_' + (videoId || 'vid'),
        `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=no`
      );
      if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        window.open(directUrl, '_blank', 'noopener,noreferrer');
      }
    };

    // Handler klik poster / tombol play di file://
    const poster = this.container.querySelector('#filePlayerPoster');
    if (poster) {
      poster.addEventListener('click', launchVideoPopup);
    }

    // Handler paksa sematkan iframe jika user menginginkannya
    const forceEmbedBtn = this.container.querySelector('#btnForceEmbed');
    if (forceEmbedBtn) {
      forceEmbedBtn.addEventListener('click', () => {
        const wrap = this.container.querySelector('#videoWrapper');
        if (wrap) {
          wrap.innerHTML = `
            <iframe
              id="ytEmbedIframe"
              src="${embedUrl}"
              title="${title || 'Video Pembelajaran'}"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
              loading="lazy">
            </iframe>
          `;
        }
        forceEmbedBtn.style.display = 'none';
      });
    }
  }

  close() {
    this.container.innerHTML = '';
    this.container.classList.remove('show');
  }
}

