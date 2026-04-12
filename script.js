// ── PHOTOS ────────────────────────────────────────────────────────
const photos = [
    {
        src: "Fotos Julieta/Aniversario.jpeg",
        caption: "Aniversario 💕",
        desc: "Uno de mis momentos favoritos con vos."
    },
    {
        src: "Fotos Julieta/Playa.jpg",
        caption: "En la playa 🏖️",
        desc: "El mar te queda perfecto."
    },
    {
        src: "Fotos Julieta/Cute.jpeg",
        caption: "Así de linda sos 🥰",
        desc: "No lo podés negar."
    },
    {
        src: "Fotos Julieta/Modelo.jpeg",
        caption: "Mi modelo favorita ✨",
        desc: "Siempre tan elegante."
    },
    {
        src: "Fotos Julieta/Ella.jpeg",
        caption: "Ella 💖",
        desc: "La persona que más quiero."
    },
    {
        src: "Fotos Julieta/Besito parlante.jpeg",
        caption: "Besito 😘",
        desc: "Nunca me canso de ese besito."
    },
    {
        src: "Fotos Julieta/Mascara.jpeg",
        caption: "Hermosa 💄",
        desc: "Te ponés cualquier cosa y seguís siendo lo más."
    },
    {
        src: "Fotos Julieta/Sillon.jpeg",
        caption: "Momentos tranquis 🛋️",
        desc: "Los mejores planes son con vos."
    },
    {
        src: "Fotos Julieta/Fachas.jpeg",
        caption: "Fachas y todo linda 😄",
        desc: "Incluso en los días casuales sos perfecta."
    },
    {
        src: "Fotos Julieta/lengua.jpeg",
        caption: "Jajaja 😜",
        desc: "Sos lo más divertida."
    },
    {
        src: "Fotos Julieta/Ducha.jpeg",
        caption: "Natural beauty 🌸",
        desc: "Siempre tan vos."
    }
];

// ── ANNIVERSARY DATE ──────────────────────────────────────────────
const startDate = new Date(2026, 2, 2); // 2 de Marzo 2026

// ── BUILD GALLERY ─────────────────────────────────────────────────
const gallery = document.getElementById('gallery');
photos.forEach((photo, i) => {
    const card = document.createElement('div');
    card.className = 'photo-card';
    card.style.animationDelay = `${i * 0.07}s`;
    card.innerHTML = `
        <img src="${photo.src}" alt="${photo.caption}" loading="lazy">
        <div class="photo-overlay">
            <div class="photo-caption">${photo.caption}</div>
            <div class="photo-desc">${photo.desc}</div>
        </div>
        <div class="photo-badge">❤</div>
    `;
    card.addEventListener('click', () => openLightbox(i));
    gallery.appendChild(card);
});

// ── COUNTER ───────────────────────────────────────────────────────
function updateCounter() {
    const now  = new Date();
    const diff = now - startDate;
    if (diff < 0) return;
    const days    = Math.floor(diff / 86400000);
    const hours   = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000)  / 60000);
    const seconds = Math.floor((diff % 60000)    / 1000);
    document.getElementById('cnt-days').textContent    = days.toLocaleString('es');
    document.getElementById('cnt-hours').textContent   = String(hours).padStart(2, '0');
    document.getElementById('cnt-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('cnt-seconds').textContent = String(seconds).padStart(2, '0');
}
updateCounter();
setInterval(updateCounter, 1000);

// ── INTRO ─────────────────────────────────────────────────────────
document.getElementById('intro').addEventListener('click', () => {
    document.getElementById('intro').classList.add('hidden');
});

// ── LIGHTBOX ──────────────────────────────────────────────────────
let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    const p = photos[index];
    document.getElementById('lightbox-img').src          = p.src;
    document.getElementById('lb-title').textContent      = p.caption;
    document.getElementById('lb-desc').textContent       = p.desc;
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

function navLightbox(dir) {
    currentIndex = (currentIndex + dir + photos.length) % photos.length;
    openLightbox(currentIndex);
}

document.getElementById('lightbox').addEventListener('click', e => {
    if (e.target === document.getElementById('lightbox')) closeLightbox();
});

document.addEventListener('keydown', e => {
    if (!document.getElementById('lightbox').classList.contains('active')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowRight') navLightbox(1);
    if (e.key === 'ArrowLeft')  navLightbox(-1);
});

// ── FLOATING HEARTS (canvas) ──────────────────────────────────────
(function () {
    const canvas = document.getElementById('bg-canvas');
    const ctx    = canvas.getContext('2d');
    let hearts   = [];

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const COLORS = ['#e8001e', '#ff2055', '#ff4d78', '#ff8fab', '#c9002a', '#ffd6e0'];

    function spawnHeart() {
        hearts.push({
            x:     Math.random() * canvas.width,
            y:     canvas.height + 20,
            size:  6 + Math.random() * 18,
            speed: 0.5 + Math.random() * 1.4,
            drift: (Math.random() - 0.5) * 0.6,
            alpha: 0,
            fade:  'in',
            color: COLORS[Math.floor(Math.random() * COLORS.length)]
        });
    }

    function drawHeart(ctx, x, y, size, color, alpha) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle   = color;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.bezierCurveTo(x, y - size * 0.3, x - size * 0.5, y - size * 0.8, x - size * 0.5, y - size * 0.5);
        ctx.bezierCurveTo(x - size * 0.5, y - size * 1.1, x + size * 0.5, y - size * 1.1, x + size * 0.5, y - size * 0.5);
        ctx.bezierCurveTo(x + size * 0.5, y - size * 0.8, x, y - size * 0.3, x, y);
        ctx.fill();
        ctx.restore();
    }

    setInterval(spawnHeart, 600);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hearts = hearts.filter(h => h.y > -30 && h.alpha >= 0);
        for (const h of hearts) {
            h.y    -= h.speed;
            h.x    += h.drift;
            if (h.fade === 'in')  { h.alpha = Math.min(h.alpha + 0.025, 0.6); if (h.alpha >= 0.6) h.fade = 'hold'; }
            if (h.fade === 'hold' && h.y < canvas.height * 0.3) h.fade = 'out';
            if (h.fade === 'out') h.alpha = Math.max(h.alpha - 0.012, 0);
            drawHeart(ctx, h.x, h.y, h.size, h.color, h.alpha);
        }
        requestAnimationFrame(animate);
    }
    animate();
})();
