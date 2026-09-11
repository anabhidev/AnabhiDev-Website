// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Geography Engine & 3D Desktop Globe
// Development · Anabhi Dev
// Version   : 1.2
// Generated : 10 September 2026, 21:30:00
// ================================================================

import { GEO_DATA } from '../data/geo-data.js';
import { GLOBE_COUNTRIES, GLOBE_LABELS } from '../data/globe-paths.js';

export class GeoEngine {
  // Ambil semua negara di dunia
  static getAllCountries() {
    return GEO_DATA.countries || [];
  }

  // Filter negara berdasarkan benua
  static getCountriesByContinent(continent) {
    const list = GEO_DATA.countries || [];
    if (!continent || continent === 'Semua' || continent === 'All') return list;
    return list.filter(c => c.continent.toLowerCase() === continent.toLowerCase());
  }

  // Cari negara berdasarkan nama (ID & EN), ibukota, benua, mata uang, atau landmark
  static searchCountries(query) {
    const list = GEO_DATA.countries || [];
    if (!query) return list;
    const q = query.trim().toLowerCase();
    return list.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.nameEn.toLowerCase().includes(q) ||
      c.capital.toLowerCase().includes(q) ||
      c.continent.toLowerCase().includes(q) ||
      c.currency.toLowerCase().includes(q) ||
      c.landmark.toLowerCase().includes(q)
    );
  }

  // Ambil negara berdasarkan id
  static getCountryById(id) {
    return (GEO_DATA.countries || []).find(c => c.id === id);
  }

  // Ambil semua provinsi
  static getAllProvinces() {
    return GEO_DATA.provinces || [];
  }

  // Filter provinsi berdasarkan pulau
  static getProvincesByIsland(islandName) {
    if (!islandName || islandName === 'Semua') return GEO_DATA.provinces;
    return GEO_DATA.provinces.filter(p => p.island.toLowerCase().includes(islandName.toLowerCase()));
  }

  // Cari provinsi atau ibu kota
  static searchProvinces(query) {
    if (!query) return GEO_DATA.provinces;
    const q = query.trim().toLowerCase();
    return GEO_DATA.provinces.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.capital.toLowerCase().includes(q) ||
      p.island.toLowerCase().includes(q)
    );
  }

  // Ambil data kota non-ibu kota terkenal (termasuk Malang -> Jatim)
  static getNonCapitalCities(query = '') {
    const list = GEO_DATA.famousNonCapitalCities || [];
    if (!query) return list;
    const q = query.trim().toLowerCase();
    return list.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.province.toLowerCase().includes(q) ||
      c.island.toLowerCase().includes(q)
    );
  }

  // Ambil data modul Bali (8 Kabupaten + 1 Kota)
  static getBaliRegions() {
    return (GEO_DATA.baliModule && GEO_DATA.baliModule.regions) || [];
  }

  // Ambil data kuis geografi
  static getQuizzes() {
    return GEO_DATA.quizzes || [];
  }
}

/**
 * 3D Desktop Globe Visualizer (Classic Schoolroom Desk Globe Stand & Political Map)
 * Menampilkan bola bumi politik 3D berwarna-warni sesuai referensi foto globe meja fisik:
 * - Peta politik dunia: negara-negara penuh warna pastel cerah, batas tegas, nama negara & samudra jelas.
 * - Kerangka dudukan meja mewah: Busur meridian logam berskala derajat (0°-90°), poros miring 23.5°,
 *   tiang vertikal krom, dan kaki penyangga bundar berkilau dengan bayangan realistis.
 * - Rotasi 3D halus 60fps dengan kontrol sentuh/geser, tombol putar, zoom, dan fokus instan.
 */
export class GlobeVisualizer {
  constructor(canvasElement, overlayElement = null) {
    this.canvas = canvasElement;
    this.overlayCanvas = overlayElement;
    this.ctx = null;
    this.overlayCtx = null;
    this.gl = null;
    this.useWebGL = false;

    // Parameter Rotasi & Posisi Bola
    this.rotation = 118;   // Derajat bujur — default menghadap ke Indonesia (118° BT)
    this.tilt = 6;         // Derajat lintang pandangan kamera
    this.axialTilt = 23.5; // Kemiringan sumbu bumi asli 23.5 derajat
    this.zoom = 1.0;       // Rentang zoom 0.8x s/d 2.0x
    this.isRotating = true;
    this.animId = null;

    // Target Animasi Halus (Lerp ke koordinat tujuan)
    this.targetRotation = null;
    this.targetTilt = null;
    this.focusedLocation = { lon: 118, lat: -2, name: 'INDONESIA 🇮🇩' };

    // Status Pointer (Mouse / Touch Tablet)
    this.pointerDown = false;
    this.lastX = 0;
    this.lastY = 0;
    this.pulseAngle = 0;

    // Aset Tekstur Peta Politik Dunia
    this.textureLoaded = false;
    this.offscreenCanvas = null;
    this.earthImage = null;

    this.initRenderer();
    this.initEvents();
  }

  initRenderer() {
    if (!this.canvas) return;

    if (this.overlayCanvas && typeof this.overlayCanvas.getContext === 'function') {
      this.overlayCtx = this.overlayCanvas.getContext('2d');
    }

    // Siapkan offscreen canvas 2048x1024 untuk tekstur
    this.offscreenCanvas = document.createElement('canvas');
    this.offscreenCanvas.width = 2048;
    this.offscreenCanvas.height = 1024;
    this.drawProceduralPoliticalTexture(this.offscreenCanvas);
    this.textureLoaded = true;

    // Coba inisialisasi WebGL
    try {
      this.gl = this.canvas.getContext('webgl', { antialias: true, alpha: true, premultipliedAlpha: false }) ||
                this.canvas.getContext('experimental-webgl');
    } catch (e) {
      this.gl = null;
    }

    if (this.gl) {
      this.initWebGL();
    } else if (typeof this.canvas.getContext === 'function') {
      this.ctx = this.canvas.getContext('2d');
    }

    // Muat peta politik SVG beresolusi tinggi bila lingkungan mengizinkan
    this.loadPoliticalMapSvg();
  }

  // Menghasilkan tekstur peta dunia politik lengkap (177 negara + samudra + garis lintang bujur + pin Indonesia)
  drawProceduralPoliticalTexture(canvas) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    // 1. Latar Samudra Biru Cerah Meja Sekolah (sesuai referensi fisik)
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, H);
    oceanGrad.addColorStop(0, '#1a78b5');
    oceanGrad.addColorStop(0.35, '#2192cf');
    oceanGrad.addColorStop(0.5, '#28a9e0');
    oceanGrad.addColorStop(0.65, '#2192cf');
    oceanGrad.addColorStop(1, '#1a78b5');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, W, H);

    // 2. Garis Lintang & Bujur (Graticules Halus)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
    ctx.lineWidth = 1;
    for (let lat = -75; lat <= 75; lat += 15) {
      const y = ((90 - lat) / 180) * H;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
    for (let lon = -180; lon <= 180; lon += 30) {
      const x = ((lon + 180) / 360) * W;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }

    // 3. Garis Khatulistiwa (Ekuator) Emas Tegas
    const eqY = H / 2;
    ctx.strokeStyle = '#f5cd79';
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 6]);
    ctx.beginPath();
    ctx.moveTo(0, eqY);
    ctx.lineTo(W, eqY);
    ctx.stroke();
    ctx.setLineDash([]);

    // 4. Render Semua 177 Negara Dunia secara Vektor Instan (Path2D)
    if (typeof Path2D !== 'undefined' && Array.isArray(GLOBE_COUNTRIES)) {
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = '#1e293b';
      ctx.lineJoin = 'round';
      for (let i = 0; i < GLOBE_COUNTRIES.length; i++) {
        const country = GLOBE_COUNTRIES[i];
        try {
          const path = new Path2D(country.d);
          ctx.fillStyle = country.fill || '#55efc4';
          ctx.fill(path);
          ctx.stroke(path);
        } catch (e) {}
      }
    }

    // 5. Highlight Khusus Wilayah Indonesia (Zamrud Cerah & Batas Putih Tegas)
    const indo = (GLOBE_COUNTRIES || []).find(c => c.name === 'Indonesia');
    if (indo && typeof Path2D !== 'undefined') {
      try {
        const indoPath = new Path2D(indo.d);
        ctx.save();
        ctx.fillStyle = '#10ac84';
        ctx.fill(indoPath);
        ctx.lineWidth = 2.2;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke(indoPath);
        ctx.restore();
      } catch (e) {}
    }

    // 6. Label Khatulistiwa & Samudra Dunia
    ctx.font = 'bold 15px Arial, sans-serif';
    ctx.fillStyle = '#fed330';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('EQUATOR / KHATULISTIWA (0°)', 500, eqY - 8);
    ctx.fillText('EQUATOR / KHATULISTIWA (0°)', 1500, eqY - 8);

    // 7. Label Teks Negara & Samudra (Teks Bergaris Tepi Gelap agar Kontras Tinggi)
    if (Array.isArray(GLOBE_LABELS)) {
      for (let i = 0; i < GLOBE_LABELS.length; i++) {
        const lbl = GLOBE_LABELS[i];
        if (!lbl || lbl.text.includes('EQUATOR')) continue;

        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (lbl.text.includes('OCEAN')) {
          // Label Samudra
          ctx.font = `italic bold ${lbl.size || 22}px Arial, sans-serif`;
          ctx.fillStyle = lbl.fill || 'rgba(255,255,255,0.75)';
          ctx.strokeStyle = 'rgba(10, 50, 90, 0.75)';
          ctx.lineWidth = 3.5;
          ctx.strokeText(lbl.text, lbl.x, lbl.y);
          ctx.fillText(lbl.text, lbl.x, lbl.y);
        } else if (lbl.text.includes('INDONESIA')) {
          // Pin Marker & Badge Indonesia
          ctx.beginPath();
          ctx.arc(1715.7, 523.6, 7, 0, Math.PI * 2);
          ctx.fillStyle = '#ff4757';
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#ffffff';
          ctx.stroke();

          // Kotak Badge
          ctx.fillStyle = 'rgba(15, 32, 67, 0.92)';
          ctx.strokeStyle = '#55efc4';
          ctx.lineWidth = 2;
          ctx.beginPath();
          if (typeof ctx.roundRect === 'function') {
            ctx.roundRect(lbl.x - 72, lbl.y - 12, 144, 24, 12);
          } else {
            ctx.rect(lbl.x - 72, lbl.y - 12, 144, 24);
          }
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#55efc4';
          ctx.font = 'bold 13px Arial, sans-serif';
          ctx.fillText('INDONESIA 🇮🇩', lbl.x, lbl.y);
        } else {
          // Nama Negara Terkemuka
          ctx.font = `bold ${lbl.size || 13}px Arial, sans-serif`;
          ctx.fillStyle = '#ffffff';
          ctx.strokeStyle = '#1e293b';
          ctx.lineWidth = 3;
          ctx.strokeText(lbl.text, lbl.x, lbl.y);
          ctx.fillText(lbl.text, lbl.x, lbl.y);
        }
        ctx.restore();
      }
    }
  }

  loadPoliticalMapSvg() {
    try {
      this.earthImage = new Image();
      this.earthImage.onload = () => {
        try {
          if (this.offscreenCanvas) {
            const octx = this.offscreenCanvas.getContext('2d');
            octx.drawImage(this.earthImage, 0, 0, 2048, 1024);
          }
          if (this.gl && this.earthTexture) {
            const gl = this.gl;
            gl.bindTexture(gl.TEXTURE_2D, this.earthTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.offscreenCanvas);
            gl.generateMipmap(gl.TEXTURE_2D);
          }
          this.textureLoaded = true;
          this.draw();
        } catch (e) {
          // Tekstur vektor canvas sudah aktif dan sempurna
        }
      };
      this.earthImage.onerror = () => {
        // Tekstur vektor canvas sudah aktif dan sempurna
      };
      this.earthImage.src = 'assets/img/earth_political.svg';
    } catch (e) {}
  }

  initWebGL() {
    const gl = this.gl;
    this.useWebGL = true;

    // Vertex Shader
    const vsSource = `
      attribute vec3 aPos;
      attribute vec2 aUV;
      uniform mat4 uMVP;
      varying vec2 vUV;
      varying vec3 vNorm;
      void main() {
        vUV = aUV;
        vNorm = aPos;
        gl_Position = uMVP * vec4(aPos, 1.0);
      }
    `;

    // Fragment Shader: Pencahayaan terang alami globe meja kelas (warna negara cerah & specular halus)
    const fsSource = `
      precision mediump float;
      uniform sampler2D uSampler;
      uniform vec3 uSunDir;
      varying vec2 vUV;
      varying vec3 vNorm;
      void main() {
        vec4 tex = texture2D(uSampler, vUV);
        vec3 n = normalize(vNorm);
        float diff = max(dot(n, uSunDir), 0.0);
        float light = 0.72 + 0.28 * diff; // Latar terang agar warna negara pastel tetap jelas
        
        // Pantulan kilap halus (gloss finish globe)
        vec3 halfDir = normalize(uSunDir + vec3(0.0, 0.0, 1.0));
        float spec = pow(max(dot(n, halfDir), 0.0), 32.0) * 0.25;
        
        gl_FragColor = vec4(tex.rgb * light + vec3(spec), 1.0);
      }
    `;

    const program = this.createShaderProgram(gl, vsSource, fsSource);
    if (!program) {
      this.useWebGL = false;
      this.ctx = this.canvas.getContext('2d');
      this.textureLoaded = true;
      return;
    }

    this.program = program;
    this.attribs = {
      pos: gl.getAttribLocation(program, 'aPos'),
      uv: gl.getAttribLocation(program, 'aUV')
    };
    this.uniforms = {
      mvp: gl.getUniformLocation(program, 'uMVP'),
      sampler: gl.getUniformLocation(program, 'uSampler'),
      sunDir: gl.getUniformLocation(program, 'uSunDir')
    };

    // Geometri Bola Sferis UV
    this.createSphereMesh(gl, 1.0, 48, 48);

    // Buat Tekstur WebGL dari Offscreen Canvas
    this.earthTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.earthTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.offscreenCanvas);
    try {
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    } catch (e) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
  }

  createShaderProgram(gl, vs, fs) {
    const vShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vShader, vs);
    gl.compileShader(vShader);
    if (!gl.getShaderParameter(vShader, gl.COMPILE_STATUS)) {
      console.warn('[WebGL] Vertex shader error:', gl.getShaderInfoLog(vShader));
      return null;
    }

    const fShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fShader, fs);
    gl.compileShader(fShader);
    if (!gl.getShaderParameter(fShader, gl.COMPILE_STATUS)) {
      console.warn('[WebGL] Fragment shader error:', gl.getShaderInfoLog(fShader));
      return null;
    }

    const prog = gl.createProgram();
    gl.attachShader(prog, vShader);
    gl.attachShader(prog, fShader);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn('[WebGL] Link error:', gl.getProgramInfoLog(prog));
      return null;
    }
    return prog;
  }

  createSphereMesh(gl, radius, latBands, lonBands) {
    const positions = [];
    const uvs = [];
    const indices = [];

    for (let lat = 0; lat <= latBands; lat++) {
      const theta = (lat * Math.PI) / latBands;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);

      for (let lon = 0; lon <= lonBands; lon++) {
        const phi = (lon * 2 * Math.PI) / lonBands;
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);

        const x = cosPhi * sinTheta;
        const y = cosTheta;
        const z = sinPhi * sinTheta;
        const u = 1 - (lon / lonBands);
        const v = lat / latBands;

        positions.push(radius * x, radius * y, radius * z);
        uvs.push(u, v);
      }
    }

    for (let lat = 0; lat < latBands; lat++) {
      for (let lon = 0; lon < lonBands; lon++) {
        const first = lat * (lonBands + 1) + lon;
        const second = first + lonBands + 1;
        indices.push(first, second, first + 1);
        indices.push(second, second + 1, first + 1);
      }
    }

    this.posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    this.uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.STATIC_DRAW);

    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    this.indexCount = indices.length;
  }

  initEvents() {
    const target = this.canvas;
    if (!target) return;

    target.addEventListener('pointerdown', (e) => {
      this.pointerDown = true;
      this.lastX = e.clientX;
      this.lastY = e.clientY;
      this.isRotating = false;
      this.targetRotation = null;
      this.targetTilt = null;
      if (typeof target.setPointerCapture === 'function') {
        target.setPointerCapture(e.pointerId);
      }
    });

    window.addEventListener('pointermove', (e) => {
      if (!this.pointerDown) return;
      const dx = e.clientX - this.lastX;
      const dy = e.clientY - this.lastY;
      this.rotation += dx * 0.45;
      this.tilt = Math.max(-45, Math.min(45, this.tilt - dy * 0.35));
      this.lastX = e.clientX;
      this.lastY = e.clientY;
      this.draw();
    });

    window.addEventListener('pointerup', () => {
      if (this.pointerDown) {
        this.pointerDown = false;
      }
    });

    target.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.1 : -0.1;
      this.zoomBy(delta);
    }, { passive: false });
  }

  startLoop() {
    const render = () => {
      if (this.isRotating) {
        this.rotation += 0.25;
      }

      // Animasi pergerakan halus (Lerp)
      if (this.targetRotation !== null) {
        const diffR = this.targetRotation - this.rotation;
        this.rotation += diffR * 0.1;
        if (Math.abs(diffR) < 0.2) {
          this.rotation = this.targetRotation;
          this.targetRotation = null;
        }
      }
      if (this.targetTilt !== null) {
        const diffT = this.targetTilt - this.tilt;
        this.tilt += diffT * 0.1;
        if (Math.abs(diffT) < 0.2) {
          this.tilt = this.targetTilt;
          this.targetTilt = null;
        }
      }

      this.pulseAngle = (this.pulseAngle + 0.05) % (Math.PI * 2);

      this.draw();
      this.animId = requestAnimationFrame(render);
    };
    render();
  }

  stopLoop() {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  }

  toggleAutoRotate() {
    this.isRotating = !this.isRotating;
    this.targetRotation = null;
    return this.isRotating;
  }

  rotateBy(deltaDeg) {
    this.rotation += deltaDeg;
    this.targetRotation = null;
    this.draw();
  }

  zoomBy(delta) {
    this.zoom = Math.max(0.85, Math.min(1.85, this.zoom + delta));
    this.draw();
  }

  focusCoordinates(lon, lat, name = null) {
    this.isRotating = false;
    const normCurrent = ((this.rotation % 360) + 360) % 360;
    const target = lon;
    let diff = target - normCurrent;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    this.targetRotation = this.rotation + diff;
    this.targetTilt = Math.max(-30, Math.min(30, lat));
    this.zoom = Math.max(1.1, this.zoom);
    if (name) {
      this.focusedLocation = { lon, lat, name };
    }
  }

  focusIndonesia() {
    this.focusCoordinates(118, -2, 'INDONESIA 🇮🇩');
  }

  draw() {
    if (this.useWebGL && this.gl) {
      this.drawWebGL();
    } else {
      this.draw2D();
    }
    this.drawOverlay();
  }

  drawWebGL() {
    const gl = this.gl;
    const canvas = this.canvas;
    const w = canvas.width;
    const h = canvas.height;

    gl.viewport(0, 0, w, h);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(this.program);

    // Matriks Proyeksi Perspektif
    const fov = 45 * Math.PI / 180;
    const aspect = w / h;
    const pMat = this.createPerspectiveMatrix(fov, aspect, 0.1, 100.0);

    // Jarak kamera disesuaikan dengan posisi globe meja (presisi di tengah meridian ring 335, 280)
    const dist = 4.83 / this.zoom;
    let mvMat = this.createIdentityMatrix();
    mvMat = this.mat4Translate(mvMat, 0.094, 0.25, -dist);
    // Kemiringan pandangan pengguna (pitch)
    mvMat = this.mat4RotateX(mvMat, this.tilt * Math.PI / 180);
    // Kemiringan sumbu bumi asli 23.5° (tilted ke kanan seperti foto referensi)
    mvMat = this.mat4RotateZ(mvMat, -this.axialTilt * Math.PI / 180);
    // Rotasi bola bumi pada porosnya (yaw)
    mvMat = this.mat4RotateY(mvMat, this.rotation * Math.PI / 180);

    const mvpMat = this.mat4Multiply(pMat, mvMat);
    gl.uniformMatrix4fv(this.uniforms.mvp, false, new Float32Array(mvpMat));

    // Arah cahaya dari kanan-atas depan
    gl.uniform3f(this.uniforms.sunDir, 0.75, 0.45, 1.25);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.earthTexture);
    gl.uniform1i(this.uniforms.sampler, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuffer);
    gl.enableVertexAttribArray(this.attribs.pos);
    gl.vertexAttribPointer(this.attribs.pos, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
    gl.enableVertexAttribArray(this.attribs.uv);
    gl.vertexAttribPointer(this.attribs.uv, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0);
  }

  draw2D() {
    const canvas = this.canvas;
    if (!canvas || !this.ctx) return;
    const ctx = this.ctx;
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2 + 15;
    const cy = h / 2 - 40;
    const r = 160 * this.zoom;

    ctx.clearRect(0, 0, w, h);

    // Bola Samudra
    const ocean = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.35, r * 0.1, cx, cy, r);
    ocean.addColorStop(0, '#28a9e0');
    ocean.addColorStop(0.7, '#2192cf');
    ocean.addColorStop(1, '#156596');

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = ocean;
    ctx.fill();
    ctx.clip();

    // Gambar tekstur jika siap
    if (this.offscreenCanvas) {
      const rotNorm = ((this.rotation % 360) + 360) % 360;
      const sx = (rotNorm / 360) * this.offscreenCanvas.width;
      const sw = this.offscreenCanvas.width * 0.5;
      ctx.drawImage(this.offscreenCanvas, sx % this.offscreenCanvas.width, 0, sw, this.offscreenCanvas.height, cx - r, cy - r, r * 2, r * 2);
    }

    // Shading 3D
    const shade = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.35, r * 0.15, cx, cy, r);
    shade.addColorStop(0, 'rgba(255, 255, 255, 0.28)');
    shade.addColorStop(0.65, 'rgba(0, 0, 0, 0)');
    shade.addColorStop(1, 'rgba(10, 35, 60, 0.6)');
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  /**
   * Menggambar Kerangka Dudukan Globe Meja Klasik (Desk Stand) & Busur Meridian Berskala
   * Persis seperti foto referensi meja sekolah fisik (images2):
   * - Busur meridian perak krom di sisi kiri dengan angka derajat lintang 0° - 90°
   * - Pin kutub atas & bawah pada kemiringan 23.5°
   * - Tiang penyangga silinder krom vertikal
   * - Piringan kaki penyangga bertingkat (tiered pedestal base) dengan kilau logam & bayangan meja
   */
  drawOverlay() {
    const overlay = this.overlayCanvas;
    if (!overlay || !this.overlayCtx) return;
    const ctx = this.overlayCtx;
    const w = overlay.width;
    const h = overlay.height;

    ctx.clearRect(0, 0, w, h);

    // Koordinat pusat bola bumi pada panggung
    const cx = w / 2 + 15;
    const cy = h / 2 - 40;
    const r = 160 * this.zoom;

    // Sudut kemiringan sumbu bumi asli 23.5°
    const tiltAngle = this.axialTilt * Math.PI / 180;
    const sinA = Math.sin(tiltAngle);
    const cosA = Math.cos(tiltAngle);

    // Titik Kutub Utara & Kutub Selatan pada permukaan bola
    const northX = cx + r * sinA;
    const northY = cy - r * cosA;
    const southX = cx - r * sinA;
    const southY = cy + r * cosA;

    // Radius busur meridian logam (sedikit di luar bola)
    const rArch = r + 24;
    const archThick = 18;

    // -------------------------------------------------------------
    // 1. Bayangan Dudukan Meja (Tabletop Shadow)
    // -------------------------------------------------------------
    const baseCenterX = cx;
    const baseCenterY = 575;
    const shadowGrad = ctx.createRadialGradient(baseCenterX, baseCenterY + 12, 20, baseCenterX, baseCenterY + 12, 170);
    shadowGrad.addColorStop(0, 'rgba(3, 10, 20, 0.55)');
    shadowGrad.addColorStop(0.5, 'rgba(5, 15, 30, 0.25)');
    shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = shadowGrad;
    ctx.beginPath();
    ctx.ellipse(baseCenterX, baseCenterY + 12, 170, 24, 0, 0, Math.PI * 2);
    ctx.fill();

    // -------------------------------------------------------------
    // 2. Kaki Penyangga Bundar Bertingkat (Chrome Tiered Pedestal Base)
    // -------------------------------------------------------------
    // Piringan Bawah Terlebar
    const baseW = 145;
    const baseH = 22;
    const baseGrad1 = ctx.createLinearGradient(baseCenterX - baseW, baseCenterY, baseCenterX + baseW, baseCenterY);
    baseGrad1.addColorStop(0, '#475569');
    baseGrad1.addColorStop(0.2, '#94a3b8');
    baseGrad1.addColorStop(0.45, '#ffffff');
    baseGrad1.addColorStop(0.7, '#cbd5e1');
    baseGrad1.addColorStop(0.9, '#64748b');
    baseGrad1.addColorStop(1, '#334155');

    ctx.fillStyle = baseGrad1;
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(baseCenterX, baseCenterY, baseW, baseH, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Piringan Tingkat Kedua (Tengah)
    const baseGrad2 = ctx.createLinearGradient(baseCenterX - baseW * 0.82, baseCenterY - 10, baseCenterX + baseW * 0.82, baseCenterY - 10);
    baseGrad2.addColorStop(0, '#334155');
    baseGrad2.addColorStop(0.25, '#cbd5e1');
    baseGrad2.addColorStop(0.5, '#ffffff');
    baseGrad2.addColorStop(0.75, '#94a3b8');
    baseGrad2.addColorStop(1, '#475569');

    ctx.fillStyle = baseGrad2;
    ctx.beginPath();
    ctx.ellipse(baseCenterX, baseCenterY - 10, baseW * 0.82, baseH * 0.8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Kerucut Penopang (Conical Neck)
    const neckGrad = ctx.createLinearGradient(baseCenterX - 50, baseCenterY - 30, baseCenterX + 50, baseCenterY - 30);
    neckGrad.addColorStop(0, '#475569');
    neckGrad.addColorStop(0.3, '#ffffff');
    neckGrad.addColorStop(0.7, '#94a3b8');
    neckGrad.addColorStop(1, '#334155');

    ctx.fillStyle = neckGrad;
    ctx.beginPath();
    ctx.moveTo(baseCenterX - 55, baseCenterY - 10);
    ctx.lineTo(baseCenterX - 22, baseCenterY - 45);
    ctx.lineTo(baseCenterX + 22, baseCenterY - 45);
    ctx.lineTo(baseCenterX + 55, baseCenterY - 10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Tiang Silinder Krom Vertikal (Vertical Spindle)
    const stemGrad = ctx.createLinearGradient(baseCenterX - 14, 0, baseCenterX + 14, 0);
    stemGrad.addColorStop(0, '#334155');
    stemGrad.addColorStop(0.3, '#f8fafc');
    stemGrad.addColorStop(0.7, '#cbd5e1');
    stemGrad.addColorStop(1, '#475569');

    ctx.fillStyle = stemGrad;
    ctx.beginPath();
    ctx.rect(baseCenterX - 14, baseCenterY - 95, 28, 52);
    ctx.fill();
    ctx.stroke();

    // Cincin Sambungan Bawah (Lower Collar)
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.ellipse(baseCenterX, baseCenterY - 45, 26, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // -------------------------------------------------------------
    // 3. Lengan Sambungan ke Busur Meridian (Lower Arm Bracket)
    // -------------------------------------------------------------
    ctx.fillStyle = stemGrad;
    ctx.beginPath();
    ctx.moveTo(baseCenterX - 14, baseCenterY - 95);
    ctx.quadraticCurveTo(baseCenterX - 25, baseCenterY - 105, southX - 18 * sinA, southY + 18 * cosA + 10);
    ctx.lineTo(southX - 34 * sinA, southY + 34 * cosA + 15);
    ctx.quadraticCurveTo(baseCenterX + 10, baseCenterY - 90, baseCenterX + 14, baseCenterY - 95);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // -------------------------------------------------------------
    // 4. Busur Meridian Logam Berskala (Calibrated Semi-Meridian Arch)
    // -------------------------------------------------------------
    // Busur membentang dari kutub utara ke kutub selatan di sisi kiri bola
    const startAngle = -Math.PI / 2 + tiltAngle;
    const endAngle = Math.PI / 2 + tiltAngle;

    ctx.save();
    // Gradien Logam Krom Busur
    const archGrad = ctx.createLinearGradient(cx - rArch, cy, cx, cy);
    archGrad.addColorStop(0, '#94a3b8');
    archGrad.addColorStop(0.35, '#ffffff');
    archGrad.addColorStop(0.75, '#cbd5e1');
    archGrad.addColorStop(1, '#64748b');

    // Badan Utama Busur (Tebal 18px)
    ctx.strokeStyle = archGrad;
    ctx.lineWidth = archThick;
    ctx.lineCap = 'butt';
    ctx.beginPath();
    ctx.arc(cx, cy, rArch, startAngle, endAngle, false);
    ctx.stroke();

    // Garis Batas Luar & Dalam (Bevel Rims)
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, rArch - archThick / 2, startAngle, endAngle, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, rArch + archThick / 2, startAngle, endAngle, false);
    ctx.stroke();

    // Garis Kilap Putih Spekular
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(cx, cy, rArch - 2, startAngle + 0.1, endAngle - 0.1, false);
    ctx.stroke();

    // Tanda Skala Derajat Lintang (0° hingga 90° Utara & Selatan)
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.2;
    ctx.font = 'bold 8.5px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let deg = -90; deg <= 90; deg += 10) {
      const a = (deg * Math.PI / 180) + tiltAngle + Math.PI;
      const cosT = Math.cos(a);
      const sinT = Math.sin(a);

      const xInner = cx + (rArch - archThick / 2) * cosT;
      const yInner = cy + (rArch - archThick / 2) * sinT;
      const isMajor = deg % 30 === 0;
      const tickLen = isMajor ? archThick * 0.7 : archThick * 0.45;
      const xOuter = cx + (rArch - archThick / 2 + tickLen) * cosT;
      const yOuter = cy + (rArch - archThick / 2 + tickLen) * sinT;

      ctx.beginPath();
      ctx.moveTo(xInner, yInner);
      ctx.lineTo(xOuter, yOuter);
      ctx.stroke();

      // Angka derajat pada garis utama
      if (isMajor && Math.abs(deg) !== 90) {
        const xText = cx + (rArch + 4) * cosT;
        const yText = cy + (rArch + 4) * sinT;
        ctx.save();
        ctx.translate(xText, yText);
        ctx.rotate(a + Math.PI / 2);
        ctx.fillText(`${Math.abs(deg)}°`, 0, 0);
        ctx.restore();
      }
    }
    ctx.restore();

    // -------------------------------------------------------------
    // 5. Pin & Baut Kutub Atas dan Bawah (North & South Pole Finials)
    // -------------------------------------------------------------
    // Pin Kutub Utara
    const pinLen = 28;
    const nPinStartX = cx + (r - 4) * sinA;
    const nPinStartY = cy - (r - 4) * cosA;
    const nPinEndX = cx + (rArch + 12) * sinA;
    const nPinEndY = cy - (rArch + 12) * cosA;

    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(nPinStartX, nPinStartY);
    ctx.lineTo(nPinEndX, nPinEndY);
    ctx.stroke();

    // Baut Krom Kutub Utara
    ctx.fillStyle = '#f8fafc';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(nPinEndX, nPinEndY, 7.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Pin Kutub Selatan
    const sPinStartX = cx - (r - 4) * sinA;
    const sPinStartY = cy + (r - 4) * cosA;
    const sPinEndX = cx - (rArch + 12) * sinA;
    const sPinEndY = cy + (rArch + 12) * cosA;

    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(sPinStartX, sPinStartY);
    ctx.lineTo(sPinEndX, sPinEndY);
    ctx.stroke();

    // Baut Krom Kutub Selatan
    ctx.beginPath();
    ctx.arc(sPinEndX, sPinEndY, 7.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // -------------------------------------------------------------
    // 6. Penanda Lokasi Aktif / Fokus (Radar Pulse & Label)
    // -------------------------------------------------------------
    if (this.focusedLocation) {
      const coord = this.project3DPoint(this.focusedLocation.lon, this.focusedLocation.lat, r, cx, cy);
      if (coord && coord.isFront) {
        const px = coord.x;
        const py = coord.y;

        // Gelombang Radar Emas
        const pulseR = 12 + Math.sin(this.pulseAngle) * 6;
        ctx.strokeStyle = `rgba(255, 178, 27, ${0.45 + Math.sin(this.pulseAngle) * 0.35})`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(px, py, pulseR, 0, Math.PI * 2);
        ctx.stroke();

        // Pin Emas Merah
        ctx.fillStyle = '#ffb21b';
        ctx.beginPath();
        ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#e53e3e';
        ctx.beginPath();
        ctx.arc(px, py, 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Kartu Label Lokasi Mengambang
        const labelText = this.focusedLocation.name;
        const labelW = 164;
        const labelH = 38;
        const labelX = px + 12;
        const labelY = py - labelH / 2;

        ctx.fillStyle = 'rgba(15, 32, 67, 0.92)';
        ctx.strokeStyle = '#55efc4';
        ctx.lineWidth = 1.5;
        this.drawRoundedRect(ctx, labelX, labelY, labelW, labelH, 10);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Arial, sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(labelText, labelX + 12, labelY + 14);

        ctx.fillStyle = '#55efc4';
        ctx.font = 'bold 9.5px Arial, sans-serif';
        ctx.fillText(`${this.focusedLocation.lat >= 0 ? this.focusedLocation.lat + '° LU' : Math.abs(this.focusedLocation.lat) + '° LS'}, ${this.focusedLocation.lon}° BT`, labelX + 12, labelY + 27);
      }
    }
  }

  project3DPoint(lonDeg, latDeg, radius, cx, cy) {
    const DEG2RAD = Math.PI / 180;
    const phi = latDeg * DEG2RAD;
    const theta = lonDeg * DEG2RAD;

    const x0 = Math.cos(phi) * Math.sin(theta);
    const y0 = Math.sin(phi);
    const z0 = Math.cos(phi) * Math.cos(theta);

    // 1. Rotasi bujur (Yaw)
    const rotY = this.rotation * DEG2RAD;
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const x1 = x0 * cosY - z0 * sinY;
    const y1 = y0;
    const z1 = x0 * sinY + z0 * cosY;

    // 2. Kemiringan sumbu bumi asli 23.5°
    const rotZ = -this.axialTilt * DEG2RAD;
    const cosZ = Math.cos(rotZ);
    const sinZ = Math.sin(rotZ);
    const x2 = x1 * cosZ - y1 * sinZ;
    const y2 = x1 * sinZ + y1 * cosZ;
    const z2 = z1;

    // 3. Kemiringan pandangan (Pitch)
    const rotX = this.tilt * DEG2RAD;
    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    const x3 = x2;
    const y3 = y2 * cosX - z2 * sinX;
    const z3 = y2 * sinX + z2 * cosX;

    return {
      x: cx + x3 * radius,
      y: cy - y3 * radius,
      z: z3,
      isFront: z3 > 0.05
    };
  }

  drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  // Matriks Pembantu 4x4 (Standar Column-Major WebGL)
  createIdentityMatrix() {
    return [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ];
  }

  createPerspectiveMatrix(fovRad, aspect, near, far) {
    const f = 1.0 / Math.tan(fovRad / 2);
    const nf = 1 / (near - far);
    return [
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (far + near) * nf, -1,
      0, 0, 2 * far * near * nf, 0
    ];
  }

  mat4Multiply(a, b) {
    const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    const out = new Array(16);
    let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  }

  mat4Translate(m, x, y, z) {
    const out = m.slice();
    out[12] = m[0] * x + m[4] * y + m[8] * z + m[12];
    out[13] = m[1] * x + m[5] * y + m[9] * z + m[13];
    out[14] = m[2] * x + m[6] * y + m[10] * z + m[14];
    out[15] = m[3] * x + m[7] * y + m[11] * z + m[15];
    return out;
  }

  mat4RotateX(m, rad) {
    const s = Math.sin(rad);
    const c = Math.cos(rad);
    const a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7];
    const a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11];
    const out = m.slice();
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
  }

  mat4RotateY(m, rad) {
    const s = Math.sin(rad);
    const c = Math.cos(rad);
    const a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3];
    const a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11];
    const out = m.slice();
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
  }

  mat4RotateZ(m, rad) {
    const s = Math.sin(rad);
    const c = Math.cos(rad);
    const a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3];
    const a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7];
    const out = m.slice();
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
  }
}
