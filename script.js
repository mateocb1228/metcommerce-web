const prefiereMenosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    navbar.style.boxShadow = window.scrollY > 50
        ? '0 4px 30px rgba(0,119,182,0.15)'
        : '0 2px 20px rgba(0,0,0,0.08)';

    const boton = document.getElementById('scrollTop');
    if (boton) boton.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });

// ===== MENU MOVIL =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

function cerrarMenu() {
    navToggle.classList.remove('abierto');
    navLinks.classList.remove('abierto');
    navOverlay.classList.remove('visible');
    navToggle.setAttribute('aria-expanded', 'false');
}

function alternarMenu() {
    const abierto = navLinks.classList.toggle('abierto');
    navToggle.classList.toggle('abierto', abierto);
    navOverlay.classList.toggle('visible', abierto);
    navToggle.setAttribute('aria-expanded', String(abierto));
}

if (navToggle) {
    navToggle.addEventListener('click', alternarMenu);
    navOverlay.addEventListener('click', cerrarMenu);
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', cerrarMenu));
}

// ===== BOTON VOLVER ARRIBA =====
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: prefiereMenosMovimiento ? 'auto' : 'smooth' });
    });
}

// ===== FORMULARIO DE CONTACTO =====
function enviarFormulario() {
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const plan = document.getElementById('plan').value;
    const mensaje = document.getElementById('mensaje').value.trim();

    if (!nombre || !telefono || !plan) {
        alert('⚠️ Por favor completa los campos obligatorios.');
        return;
    }

    const texto = `Hola MetCommerce! 👋\n\n*Negocio:* ${nombre}\n*Plan de interés:* ${plan}\n*Mensaje:* ${mensaje}`;
    window.open(`https://wa.me/573042907179?text=${encodeURIComponent(texto)}`, '_blank');
}

// ===== ANIMACION AL HACER SCROLL (fade-in escalonado) =====
const observadorReveal = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observadorReveal.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observadorReveal.observe(el));

// ===== CONTADORES ANIMADOS =====
function animarContador(el) {
    const objetivo = parseFloat(el.dataset.target);
    const sufijo = el.dataset.suffix || '';
    const duracion = 1500;
    const inicio = performance.now();

    function paso(ahora) {
        const progreso = Math.min((ahora - inicio) / duracion, 1);
        const facilitado = 1 - Math.pow(1 - progreso, 3);
        const valorActual = Math.floor(facilitado * objetivo);
        el.textContent = valorActual + sufijo;
        if (progreso < 1) {
            requestAnimationFrame(paso);
        } else {
            el.textContent = objetivo + sufijo;
        }
    }

    if (prefiereMenosMovimiento) {
        el.textContent = objetivo + sufijo;
        return;
    }
    requestAnimationFrame(paso);
}

const observadorContadores = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animarContador(entry.target);
            observadorContadores.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => observadorContadores.observe(el));

// ===== PARTICULAS DE FONDO EN EL HERO =====
(function iniciarParticulas() {
    const canvas = document.getElementById('particles');
    if (!canvas || prefiereMenosMovimiento) return;

    const ctx = canvas.getContext('2d');
    const hero = canvas.closest('.hero');
    let particulas = [];
    let ancho, alto;
    let animando = false;
    let idAnimacion = null;

    const DENSIDAD = 12000;
    const DISTANCIA_MAX = 130;

    function redimensionar() {
        ancho = canvas.width = hero.offsetWidth;
        alto = canvas.height = hero.offsetHeight;
        const cantidad = Math.min(70, Math.floor((ancho * alto) / DENSIDAD));
        particulas = Array.from({ length: cantidad }, crearParticula);
    }

    function crearParticula() {
        return {
            x: Math.random() * ancho,
            y: Math.random() * alto,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 1.8 + 0.6
        };
    }

    function dibujar() {
        ctx.clearRect(0, 0, ancho, alto);

        for (const p of particulas) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > ancho) p.vx *= -1;
            if (p.y < 0 || p.y > alto) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(202, 240, 248, 0.6)';
            ctx.fill();
        }

        for (let i = 0; i < particulas.length; i++) {
            for (let j = i + 1; j < particulas.length; j++) {
                const a = particulas[i], b = particulas[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < DISTANCIA_MAX) {
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `rgba(144, 224, 239, ${0.18 * (1 - dist / DISTANCIA_MAX)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        if (animando) idAnimacion = requestAnimationFrame(dibujar);
    }

    function iniciar() {
        if (animando) return;
        animando = true;
        idAnimacion = requestAnimationFrame(dibujar);
    }

    function detener() {
        animando = false;
        if (idAnimacion) cancelAnimationFrame(idAnimacion);
    }

    redimensionar();
    window.addEventListener('resize', redimensionar, { passive: true });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) detener(); else if (heroVisible) iniciar();
    });

    let heroVisible = true;
    const observadorHero = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            heroVisible = entry.isIntersecting;
            if (heroVisible && !document.hidden) iniciar(); else detener();
        });
    }, { threshold: 0.05 });
    observadorHero.observe(hero);
})();
