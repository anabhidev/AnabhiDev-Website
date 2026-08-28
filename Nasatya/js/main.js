// ================================================================
// AnabhiDev-WEB — Nasatya Website (Main Interactive Logic)
// JavaScript ES6 · DOM Manipulation · IntersectionObserver
// Development · Anabhi Dev
// Version   : 1.7
// Generated : 28 August 2026, 16:45:00
// ================================================================

document.addEventListener('DOMContentLoaded', () => {
  /* ── Menu Mobile ── */
  const burger = document.getElementById('burger');
  const mob = document.getElementById('mobmenu');
  if (burger && mob) {
    burger.addEventListener('click', () => {
      const open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      mob.classList.toggle('open', !open);
    });
    mob.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        burger.setAttribute('aria-expanded', 'false');
        mob.classList.remove('open');
      }
    });
  }

  /* ── Reveal Animations on Scroll ── */
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('reveal-on');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  }

  /* ── Active Navigation State ── */
  const links = document.querySelectorAll('.nav-links a[href^="#"]');
  const targets = [];
  links.forEach(link => {
    const t = document.querySelector(link.getAttribute('href'));
    if (t) targets.push({ link: link, el: t });
  });

  if (targets.length && 'IntersectionObserver' in window) {
    const navObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          targets.forEach(t => t.link.classList.toggle('on', t.el === e.target));
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    targets.forEach(t => navObs.observe(t.el));
  }

  /* ── Render 14 Products ── */
  const productGrid = document.getElementById('productGrid');
  if (productGrid && typeof PRODUCTS !== 'undefined') {
    renderProducts(PRODUCTS);
    setupFilters();
  }
});

function renderProducts(items) {
  const container = document.getElementById('productGrid');
  if (!container) return;
  
  container.innerHTML = '';
  
  if (items.length === 0) {
    container.innerHTML = '<p class="sec-p">Tidak ada varian yang cocok dengan kategori ini.</p>';
    return;
  }

  items.forEach((prod) => {
    const card = document.createElement('article');
    card.className = 'card';
    
    const imgName = prod.gallery && prod.gallery[0] ? `${prod.id}-${prod.gallery[0]}` : `${prod.id}-primary`;
    const imgSrc = `assets/products/${imgName}.webp`;
    
    const priceText = prod.sizes && prod.sizes[0] ? `${prod.sizes[0].size} · ${prod.sizes[0].price}` : '';
    const categoryName = prod.categoryLabel || 'Produk';
    
    // Complaints snippet (first 3)
    const complaintsSnippet = prod.complaints && prod.complaints.length > 0 
      ? `<div style="font-size:12px; color:var(--muted); margin-bottom:14px; line-height:1.5;"><b>Keluhan:</b> ${prod.complaints.slice(0, 3).join(', ')}...</div>` 
      : '';

    card.innerHTML = `
      <div class="frame">
        <img src="${imgSrc}" alt="${prod.name}" loading="lazy" onerror="this.src='assets/brand/logo-nasatya.webp'">
      </div>
      <span class="tag">${categoryName}</span>
      <h3>${prod.name}</h3>
      <p class="card-subtitle">${prod.subtitle || ''}</p>
      ${complaintsSnippet}
      <div class="card-price">${priceText}</div>
      <a class="link-a" href="https://wa.me/6281234567890?text=Halo%20saya%20tertarik%20dengan%20varian%20${encodeURIComponent(prod.name)}" target="_blank" rel="noopener noreferrer">
        Konsultasi &amp; Beli →
      </a>
    `;
    
    container.appendChild(card);
  });
}

function setupFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      
      const filterValue = e.target.getAttribute('data-filter');
      
      if (filterValue === 'all') {
        renderProducts(PRODUCTS);
      } else {
        const filtered = PRODUCTS.filter(p => p.category === filterValue);
        renderProducts(filtered);
      }
    });
  });
}
