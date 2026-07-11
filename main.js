// ── Initial state ──
let lang = 'uz';
let theme = localStorage.getItem('nd-theme') || 'dark';
const TG = 'Narjan_admin';

// SVG icons for services (replaces emoji)
const SRV_SVG = [
    // Infografika — pen/edit
    `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
    // Poster — image/frame
    `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
    // Brend — briefcase
    `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="17"/><line x1="9" y1="14.5" x2="15" y2="14.5"/></svg>`,
    // Sotsial Media — smartphone
    `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
    // Prezentatsiya — bar chart
    `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>`,
    // Menyu — utensils/food
    `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>`,
];

// Apply theme immediately before anything renders
if (theme === 'dark') document.documentElement.classList.add('dark');
else document.documentElement.classList.remove('dark');

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('yr').textContent = new Date().getFullYear();
    render();
    initCursor();
    initBg();
    initNavScroll();
    initMobileMenu();
    initFadeIn();
    initForm();
    initLightbox();
    document.getElementById('scroll-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => {
        lang = b.dataset.lang;
        render();
    }));
});

// ── Theme ──
function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('nd-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    updateThemeBtn();
}

function updateThemeBtn() {
    const t = translations[lang];
    const ico = document.getElementById('t-ico');
    const lbl = document.getElementById('t-label');
    const moonSvg = document.getElementById('t-svg-moon');
    const sunSvg = document.getElementById('t-svg-sun');
    if (theme === 'dark') {
        ico.className = 't-ico d';
        if (moonSvg) moonSvg.style.display = '';
        if (sunSvg) sunSvg.style.display = 'none';
        lbl.textContent = t.nav.themeDark;
    } else {
        ico.className = 't-ico l';
        if (moonSvg) moonSvg.style.display = 'none';
        if (sunSvg) sunSvg.style.display = '';
        lbl.textContent = t.nav.themeLight;
    }
}

// ── Lang buttons ──
function updateLangBtns() {
    document.querySelectorAll('[data-lang]').forEach(b => b.classList.toggle('on', b.dataset.lang === lang));
}

// ── Render ──
function render() {
    const t = translations[lang];
    updateThemeBtn();
    updateLangBtns();
    rNavbar(t);
    rHero(t);
    rServices(t);
    rPortfolio(t);
    rPricing(t);
    rProcess(t);
    rLocation(t);
    rContact(t);
    rGallery(t);
    setTimeout(() => {
        reobserveFi();
        bindPortfolioLightbox();
    }, 60);
}

function rNavbar(t) {
    const isGal = window.location.pathname.includes('image.html');
    const pfx = isGal ? 'index.html' : '';
    const links = [
        { href: `${pfx}#services`, lbl: t.nav.services },
        { href: `${pfx}#portfolio`, lbl: t.nav.portfolio },
        { href: `${pfx}#pricing`, lbl: t.pricing.title },
        { href: `${pfx}#process`, lbl: t.nav.process },
        { href: `${pfx}#contact`, lbl: t.nav.contact },
    ];
    const li = l => `<li><a href="${l.href}">${l.lbl}</a></li>`;

    // About button text update
    const aboutNav = document.getElementById('about-nav-txt');
    const aboutHero = document.getElementById('about-hero-txt');
    const aboutMob = document.getElementById('about-mob-txt');
    if (aboutNav) aboutNav.textContent = t.nav.about;
    if (aboutHero) aboutHero.textContent = t.nav.about;
    if (aboutMob) aboutMob.textContent = t.nav.about;

    const navLinksObj = document.getElementById('nav-links');
    if (navLinksObj) navLinksObj.innerHTML = links.map(li).join('');

    const mobLinksObj = document.getElementById('mob-links');
    if (mobLinksObj) mobLinksObj.innerHTML = links.map(li).join('');

    const navOrderObj = document.getElementById('nav-order-txt');
    if (navOrderObj) navOrderObj.textContent = t.nav.order;

    // re-bind close
    if (mobLinksObj) {
        mobLinksObj.querySelectorAll('a').forEach(a => a.addEventListener('click', () => document.getElementById('mob-menu').classList.remove('open')));
    }
}

function rHero(t) {
    if (!document.getElementById('hero-badge-txt')) return;
    document.getElementById('hero-badge-txt').textContent = t.hero.badge;
    document.getElementById('hero-t1').textContent = t.hero.t1;
    document.getElementById('hero-t2').textContent = t.hero.t2;
    document.getElementById('hero-t3').textContent = t.hero.t3;
    document.getElementById('hero-sub').textContent = t.hero.sub;
    document.getElementById('hero-btn1-txt').textContent = t.hero.btn1;
    document.getElementById('hero-btn2-txt').textContent = t.hero.btn2;
    document.getElementById('stat-lbl-1').textContent = t.hero.s1;
    document.getElementById('stat-lbl-2').textContent = t.hero.s2;
    document.getElementById('stat-lbl-3').textContent = t.hero.s3;
}

function rServices(t) {
    if (!document.getElementById('srv-title')) return;
    document.getElementById('srv-title').textContent = t.services.title;
    document.getElementById('srv-sub').textContent = t.services.sub;
    document.getElementById('srv-grid').innerHTML = t.services.items.map((item, i) => `
    <div class="srv-card fi" style="transition-delay:${i * 0.08}s">
      <div class="srv-ico">${SRV_SVG[i]}</div>
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    </div>`).join('');
}

function rPortfolio(t) {
    if (!document.getElementById('port-title')) return;
    document.getElementById('port-title').textContent = t.portfolio.title;
    if (document.getElementById('btn-view-all')) document.getElementById('btn-view-all').textContent = t.portfolio.viewAll;
    document.getElementById('port-sub').textContent = t.portfolio.sub;
    const imgs = ['1rasm.jpg', '2rasm.jpg', '3rasm.jpg', '4rasm.jpg', '5rasm.jpg'];
    document.getElementById('port-grid').innerHTML = imgs.map((img, i) => `
    <div class="port-item ${i === 0 ? 'big' : ''} fi" style="transition-delay:${i * 0.08}s">
      <img src="images/${img}" alt="${t.portfolio.items[i]}" loading="lazy"/>
      <div class="port-ov">
        <h3>${t.portfolio.items[i]}</h3>
        <div class="port-bar"></div>
      </div>
    </div>`).join('');
}

// Checkmark SVG for pricing features
const CHECK_SVG = `<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

// Star SVG for popular badge
const STAR_SVG = `<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;

function rPricing(t) {
    if (!document.getElementById('price-badge-txt')) return;
    const p = t.pricing;
    document.getElementById('price-badge-txt').textContent = p.title;
    document.getElementById('price-title').textContent = p.title;
    document.getElementById('price-sub').textContent = p.sub;
    document.getElementById('price-grid').innerHTML = p.plans.map((plan, i) => {
                const pop = i === 1;
                return `<div class="price-card ${pop ? 'pop' : ''} fi" style="transition-delay:${i * 0.1}s">
            ${pop ? `<div class="pop-badge">${STAR_SVG} ${p.popular} ${STAR_SVG}</div>` : ''}
            <div class="price-top">
                <div class="price-tier">${plan.name}</div>
                <div class="price-amount"><span class="num">${plan.price}</span><span class="cur">${p.cur}</span></div>
                <p class="price-desc">${plan.desc}</p>
            </div>
            <div class="price-body">
                <ul class="price-feats">${plan.features.map(f => `<li><div class="feat-chk">${CHECK_SVG}</div>${f}</li>`).join('')}</ul>
                <a href="#contact" class="price-btn">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    ${p.order}
                </a>
            </div>
        </div>`;
    }).join('');
}

function rProcess(t) {
    if (!document.getElementById('proc-title')) return;
    document.getElementById('proc-title').textContent = t.process.title;
    document.getElementById('proc-grid').innerHTML = t.process.steps.map((s, i) => `
    <div class="proc-step fi" style="transition-delay:${i * 0.12}s">
        <div class="proc-num">0${i + 1}</div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
    </div>`).join('');
}

function rLocation(t) {
    if (!document.getElementById('loc-title')) return;
    document.getElementById('loc-title').textContent = t.location.title;
    document.getElementById('loc-addr').textContent = t.location.addr;
    document.getElementById('loc-note').textContent = t.location.note;
}

function rContact(t) {
    if (!document.getElementById('contact-badge-txt')) return;
    document.getElementById('contact-badge-txt').textContent = t.contact.title;
    document.getElementById('contact-title').textContent = t.contact.sub;
    document.getElementById('lbl-name').textContent = t.contact.name;
    document.getElementById('lbl-srv').textContent = t.contact.srv;
    document.getElementById('lbl-price').textContent = t.contact.price;
    document.getElementById('lbl-tg').textContent = t.contact.tg;
    document.getElementById('lbl-dl').textContent = t.contact.dl;
    document.getElementById('lbl-msg').textContent = t.contact.msg;
    document.getElementById('btn-sub-txt').textContent = t.contact.send;
    const sel = document.getElementById('f-srv');
    if (sel) {
        sel.innerHTML = `<option value="" disabled selected>${t.contact.srvPh}</option>` + t.services.items.map(s => `<option value="${s.title}">${s.title}</option>`).join('');
    }
}

function rGallery(t) {
    if (!document.getElementById('gal-title')) return;
    document.getElementById('gal-title').textContent = t.gallery.title;
    document.getElementById('gal-sub').textContent = t.gallery.sub;
    document.getElementById('gal-back').textContent = t.gallery.back;

    // 34 ta rasmiy kiritdik
    const imgs = [
        '1rasm.jpg', '2rasm.jpg', '3rasm.jpg', '4rasm.jpg', '5rasm.jpg', '6rasm.jpg',
        '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg',
        '14.png', '15.png', '16.png', '17.png', '18.png', '19.png', '20.png',
        '21.jpg', '22.png', '23.png', '24.jpg', '25.jpg', '26.jpg', '27.jpg',
        '28.jpg', '29.jpg', '30.jpg', '31.jpg', '32.jpg', '33.jpg', '34.jpg', 'photo_2026-07-11_12-34-21.jpg'
    ];
    document.getElementById('gallery-grid').innerHTML = imgs.map((img, i) => `
    <div class="port-item fi" style="transition-delay:${(i % 5) * 0.05}s">
      <img src="images/${img}" alt="${t.gallery.project || 'Project'} ${i + 1}" loading="lazy"/>
      <div class="port-ov">
        <h3>${t.gallery.project || 'Project'} ${i + 1}</h3>
        <div class="port-bar"></div>
      </div>
    </div>`).join('');
}

// ── FadeIn ──
let fiObserver;
function initFadeIn() {
    fiObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('in');
                fiObserver.unobserve(e.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.fi').forEach(el => fiObserver.observe(el));
}

function reobserveFi() {
    document.querySelectorAll('.fi:not(.in)').forEach(el => fiObserver && fiObserver.observe(el));
}

// ── Navbar scroll ──
function initNavScroll() {
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
}

// ── Mobile Menu ──
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobClose = document.getElementById('mob-close');
    const mobMenu = document.getElementById('mob-menu');
    if (hamburger) hamburger.addEventListener('click', () => mobMenu.classList.add('open'));
    if (mobClose) mobClose.addEventListener('click', () => mobMenu.classList.remove('open'));
}

// ── Contact form ──
function initForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('f-name')?.value || '';
        const service = document.getElementById('f-srv')?.value || '';
        const price = document.getElementById('f-price')?.value || '';
        const tg = document.getElementById('f-tg')?.value || '';
        const dl = document.getElementById('f-dl')?.value || '';
        const msg = document.getElementById('f-msg')?.value || '';

        if (!name || !service) {
            showToast('⚠️ Xatolik', 'Iltimos, ism va xizmat turini to\'ldiring.');
            return;
        }

        let messageText = `🔥 YANGI BUYURTMA!\n`;
        messageText += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
        messageText += `👤 Mijoz ismi: ${name}\n`;
        messageText += `🛠 Tanlangan xizmat: ${service}\n`;
        if (price) messageText += `💰 Mo'ljallangan byudjet: ${price}\n`;
        if (tg) messageText += `📱 Telegram: ${tg}\n`;
        if (dl) messageText += `⏳ Kutilayotgan muddat: ${dl}\n`;
        if (msg) messageText += `\n💬 Qo'shimcha izoh:\n📌 ${msg}\n`;
        messageText += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
        messageText += `📅 Jo'natish vaqti: ${new Date().toLocaleString('uz-UZ')}`;

        const encodedMessage = encodeURIComponent(messageText);
        const telegramUrl = `https://t.me/${TG}?text=${encodedMessage}`;

        window.open(telegramUrl, '_blank', 'noopener,noreferrer');
        showToast('✅ Telegram ochildi!', 'Xabar avtomatik yozildi. Faqat "Yuborish" tugmasini bosing.');
    });
}

function showToast(title, msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.innerHTML = `<h4>${title}</h4><p>${msg}</p>`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
}

// ── Custom Cursor — Trail Effect ──
function initCursor() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    const TRAIL_N = 14;
    const trails = [];
    let mx = 0, my = 0, rx = 0, ry = 0, vis = false;
    let positions = Array.from({ length: TRAIL_N }, () => ({ x: 0, y: 0 }));

    // Get accent hex directly (not CSS var) — ensures correct color on every bg
    function accentHex() {
        return document.documentElement.classList.contains('dark')
            ? '#a8e82f'   // dark mode green
            : '#d8220a';  // light mode red
    }

    // Create trail particles
    for (let i = 0; i < TRAIL_N; i++) {
        const el = document.createElement('div');
        el.className = 'cursor-trail';
        const sz = Math.max(9 - i * 0.55, 2);
        el.style.width = sz + 'px';
        el.style.height = sz + 'px';
        el.style.opacity = '0';
        document.body.appendChild(el);
        trails.push(el);
    }

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        if (!vis) {
            vis = true;
            dot.style.opacity = '1';
            ring.style.opacity = '0.7';
        }
    });

    document.addEventListener('mouseleave', () => {
        vis = false;
        dot.style.opacity = '0';
        ring.style.opacity = '0';
        trails.forEach(t => t.style.opacity = '0');
    });

    // Hover: ring tightens, dot grows
    document.addEventListener('mouseover', e => {
        const ix = e.target.closest('a,button,input,textarea,select,label,[role="button"]');
        if (ix) {
            dot.style.width = dot.style.height = '14px';
            ring.style.width = ring.style.height = '44px';
            ring.style.opacity = '0.85';
            ring.style.background = 'rgba(255,255,255,0.06)';
        } else {
            dot.style.width = dot.style.height = '10px';
            ring.style.width = ring.style.height = '38px';
            ring.style.opacity = '0.7';
            ring.style.background = 'transparent';
        }
    });

    // Click snap
    document.addEventListener('mousedown', () => {
        ring.style.transition = 'width .07s, height .07s';
        ring.style.width = ring.style.height = '20px';
    });
    document.addEventListener('mouseup', () => {
        ring.style.transition = 'width .32s cubic-bezier(.34,1.56,.64,1), height .32s cubic-bezier(.34,1.56,.64,1), opacity .3s, background .2s';
        ring.style.width = ring.style.height = '38px';
    });

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
        const accent = accentHex();

        // Dot: snaps instantly
        dot.style.left = mx + 'px';
        dot.style.top = my + 'px';
        dot.style.background = accent;

        // Ring: smooth lag
        rx = lerp(rx, mx, 0.14);
        ry = lerp(ry, my, 0.14);
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        ring.style.borderColor = accent;

        // Trail chain — each follows the previous
        positions[0].x = lerp(positions[0].x, mx, 0.38);
        positions[0].y = lerp(positions[0].y, my, 0.38);
        for (let i = 1; i < TRAIL_N; i++) {
            const lag = Math.max(0.30 - i * 0.017, 0.06);
            positions[i].x = lerp(positions[i].x, positions[i - 1].x, lag);
            positions[i].y = lerp(positions[i].y, positions[i - 1].y, lag);
        }

        for (let i = 0; i < TRAIL_N; i++) {
            const op = vis ? (1 - i / TRAIL_N) * 0.5 : 0;
            trails[i].style.left = positions[i].x + 'px';
            trails[i].style.top = positions[i].y + 'px';
            trails[i].style.opacity = op;
            trails[i].style.background = accent;
        }

        requestAnimationFrame(tick);
    };
    tick();
}
// ── Background ──
function initBg() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;
    const resize = () => {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const mMV = (m, v) => [m[0][0] * v[0] + m[0][1] * v[1] + m[0][2] * v[2], m[1][0] * v[0] + m[1][1] * v[1] + m[1][2] * v[2], m[2][0] * v[0] + m[2][1] * v[1] + m[2][2] * v[2]];
    const mMM = (a, b) => {
        const r = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) for (let k = 0; k < 3; k++) r[i][j] += a[i][k] * b[k][j];
        return r;
    };
    const rX = a => { const c = Math.cos(a), s = Math.sin(a); return [[1, 0, 0], [0, c, -s], [0, s, c]]; };
    const rY = a => { const c = Math.cos(a), s = Math.sin(a); return [[c, 0, s], [0, 1, 0], [-s, 0, c]]; };
    const rZ = a => { const c = Math.cos(a), s = Math.sin(a); return [[c, -s, 0], [s, c, 0], [0, 0, 1]]; };
    const proj = (v, cx, cy) => { const d = 400 / (v[2] + 400); return [v[0] * d + cx, v[1] * d + cy]; };

    const CV = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
    const CE = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
    const OV = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
    const OE = [[0, 2], [0, 3], [1, 2], [1, 3], [0, 4], [0, 5], [1, 4], [1, 5], [2, 4], [2, 5], [3, 4], [3, 5]];
    const TV = [[1, 1, 1], [-1, -1, 1], [-1, 1, -1], [1, -1, -1]];
    const TE = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
    const ph = (1 + Math.sqrt(5)) / 2, nn = Math.sqrt(1 + ph * ph);
    const IV = [[-1, ph, 0], [1, ph, 0], [-1, -ph, 0], [1, -ph, 0], [0, -1, ph], [0, 1, ph], [0, -1, -ph], [0, 1, -ph], [ph, 0, -1], [ph, 0, 1], [-ph, 0, -1], [-ph, 0, 1]].map(([x, y, z]) => [x / nn, y / nn, z / nn]);
    const IE = [[0, 1], [0, 5], [0, 7], [0, 10], [0, 11], [1, 5], [1, 7], [1, 8], [1, 9], [2, 3], [2, 4], [2, 6], [2, 10], [2, 11], [3, 4], [3, 6], [3, 8], [3, 9], [4, 5], [4, 9], [4, 11], [5, 9], [5, 11], [6, 7], [6, 8], [6, 10], [7, 8], [7, 10], [8, 9], [10, 11]];

    const shapes = [
        { V: CV, E: CE, x: .25, y: .45, s: 110, rx: .3, ry: .5, rz: .1, vrx: .0004, vry: .0007, vrz: .0003, a: .22 },
        { V: IV, E: IE, x: 1.70, y: .40, s: 95, rx: .8, ry: .2, rz: .6, vrx: .0006, vry: .0005, vrz: .0002, a: .18 },
        { V: OV, E: OE, x: 1.75, y: 1.55, s: 80, rx: .1, ry: .9, rz: .4, vrx: .0005, vry: .0009, vrz: .0004, a: .20 },
        { V: TV, E: TE, x: .30, y: 1.60, s: 70, rx: .6, ry: .3, rz: .8, vrx: .0008, vry: .0006, vrz: .0005, a: .16 },
        { V: CV, E: CE, x: 1.35, y: .90, s: 45, rx: .2, ry: .7, rz: .5, vrx: .001, vry: .0012, vrz: .0008, a: .13 },
        { V: OV, E: OE, x: .55, y: 1.10, s: 40, rx: .9, ry: .1, rz: .3, vrx: .0009, vry: .0011, vrz: .0006, a: .12 },
    ];

    const getAccent = () => document.documentElement.classList.contains('dark') ? [168, 232, 47] : [216, 34, 10];

    const frame = () => {
        ctx.clearRect(0, 0, W, H);
        const [aR, aG, aB] = getAccent();
        const isDark = document.documentElement.classList.contains('dark');
        const cx = W / 2, cy = H / 2;

        ctx.fillStyle = isDark ? 'rgba(232,228,219,0.055)' : 'rgba(42,42,53,0.065)';
        for (let x = 20; x < W; x += 40) for (let y = 20; y < H; y += 40) {
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fill();
        }

        for (const s of shapes) {
            s.rx += s.vrx;
            s.ry += s.vry;
            s.rz += s.vrz;
            const rot = mMM(rX(s.rx), mMM(rY(s.ry), rZ(s.rz)));
            const px = s.x * cx, py = s.y * cy;
            const pts = s.V.map(v => {
                const rv = mMV(rot, v);
                return proj([rv[0] * s.s, rv[1] * s.s, rv[2] * s.s], px, py);
            });
            ctx.strokeStyle = `rgba(${aR},${aG},${aB},${s.a})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            for (const [a, b] of s.E) {
                ctx.moveTo(pts[a][0], pts[a][1]);
                ctx.lineTo(pts[b][0], pts[b][1]);
            }
            ctx.stroke();
            ctx.fillStyle = `rgba(${aR},${aG},${aB},${s.a * 1.5})`;
            for (const [x, y] of pts) {
                ctx.beginPath();
                ctx.arc(x, y, 1.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const g1 = ctx.createRadialGradient(W * .25, H * .3, 0, W * .25, H * .3, W * .22);
        g1.addColorStop(0, `rgba(${aR},${aG},${aB},0.06)`);
        g1.addColorStop(1, 'transparent');
        ctx.fillStyle = g1;
        ctx.fillRect(0, 0, W, H);

        const g2 = ctx.createRadialGradient(W * .75, H * .7, 0, W * .75, H * .7, W * .18);
        g2.addColorStop(0, `rgba(${aR},${aG},${aB},0.05)`);
        g2.addColorStop(1, 'transparent');
        ctx.fillStyle = g2;
        ctx.fillRect(0, 0, W, H);

        [[W - 60, 80, 14, .3], [60, H - 80, 14, .25], [W * .5, H * .5, 10, .12]].forEach(([x, y, sz, op]) => {
            ctx.strokeStyle = `rgba(${aR},${aG},${aB},${op})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(x - sz, y);
            ctx.lineTo(x + sz, y);
            ctx.moveTo(x, y - sz);
            ctx.lineTo(x, y + sz);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${aR},${aG},${aB},${op * 1.4})`;
            ctx.stroke();
        });

        requestAnimationFrame(frame);
    };
    frame();
}

// ── Lightbox ──
let lbImages = [];
let lbIndex = 0;

function initLightbox() {
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const lbCounter = document.getElementById('lightbox-counter');
    const lbClose = document.getElementById('lightbox-close');
    const lbPrev = document.getElementById('lightbox-prev');
    const lbNext = document.getElementById('lightbox-next');
    if (!lb || !lbImg) return;

    function openLightbox(index) {
        lbIndex = index;
        lbImg.src = lbImages[lbIndex];
        lbCounter.textContent = `${lbIndex + 1} / ${lbImages.length}`;
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lb.classList.remove('open');
        document.body.style.overflow = '';
        setTimeout(() => { lbImg.src = ''; }, 350);
    }

    function showPrev() {
        lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length;
        lbImg.style.opacity = '0';
        lbImg.style.transform = 'scale(0.88) translateX(40px)';
        setTimeout(() => {
            lbImg.src = lbImages[lbIndex];
            lbCounter.textContent = `${lbIndex + 1} / ${lbImages.length}`;
            lbImg.style.opacity = '1';
            lbImg.style.transform = 'scale(1) translateX(0)';
        }, 200);
    }

    function showNext() {
        lbIndex = (lbIndex + 1) % lbImages.length;
        lbImg.style.opacity = '0';
        lbImg.style.transform = 'scale(0.88) translateX(-40px)';
        setTimeout(() => {
            lbImg.src = lbImages[lbIndex];
            lbCounter.textContent = `${lbIndex + 1} / ${lbImages.length}`;
            lbImg.style.opacity = '1';
            lbImg.style.transform = 'scale(1) translateX(0)';
        }, 200);
    }

    lbClose.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', showPrev);
    lbNext.addEventListener('click', showNext);
    lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });

    document.addEventListener('keydown', e => {
        if (!lb.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });

    // Expose open function globally so rPortfolio can call it
    window._openLightbox = openLightbox;
}

function bindPortfolioLightbox() {
    const imgEls = document.querySelectorAll('.port-item img');
    lbImages = Array.from(imgEls).map(img => img.getAttribute('src'));

    document.querySelectorAll('.port-item').forEach((item, i) => {
        // Avvalgi event listener'larni tozalash shart emas, 
        // chunki innerHTML orqali har doim yangi elementlar yasaladi.
        item.addEventListener('click', () => {
            if (window._openLightbox) window._openLightbox(i);
        });
    });
}
