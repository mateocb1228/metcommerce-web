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
const formContacto = document.getElementById('formContacto');

// Cada campo obligatorio con la función que devuelve su mensaje de error ('' si es válido)
const validaciones = {
    nombre: valor => valor ? '' : 'Escribe el nombre de tu negocio.',
    telefono: valor => {
        if (!valor) return 'Escribe tu número de WhatsApp.';
        const digitos = valor.replace(/\D/g, '');
        return digitos.length >= 7 && digitos.length <= 15 ? '' : 'Revisa el número: debe tener entre 7 y 15 dígitos.';
    },
    plan: valor => valor ? '' : 'Elige el plan que te interesa.'
};

function mostrarError(campo, mensaje) {
    const error = document.getElementById(`${campo.id}-error`);
    error.textContent = mensaje;
    // aria-invalid vacío cuenta como "false", por eso se pone "true" explícito
    if (mensaje) campo.setAttribute('aria-invalid', 'true');
    else campo.removeAttribute('aria-invalid');
}

if (formContacto) {
    formContacto.addEventListener('submit', (evento) => {
        evento.preventDefault();
        const estado = document.getElementById('formEstado');
        estado.textContent = '';

        let primerInvalido = null;
        for (const [id, validar] of Object.entries(validaciones)) {
            const campo = document.getElementById(id);
            const mensaje = validar(campo.value.trim());
            mostrarError(campo, mensaje);
            if (mensaje && !primerInvalido) primerInvalido = campo;
        }

        // El foco va al primer campo con error; el lector de pantalla lee su mensaje por aria-describedby
        if (primerInvalido) {
            primerInvalido.focus();
            return;
        }

        const datos = new FormData(formContacto);
        const lineas = [
            'Hola MetCommerce! 👋',
            '',
            `*Negocio:* ${datos.get('nombre').trim()}`,
            `*WhatsApp:* ${datos.get('telefono').trim()}`,
            `*Plan de interés:* ${datos.get('plan')}`
        ];
        const mensaje = datos.get('mensaje').trim();
        if (mensaje) lineas.push(`*Mensaje:* ${mensaje}`);

        const url = `https://wa.me/573042907179?text=${encodeURIComponent(lineas.join('\n'))}`;
        // Sin 'noopener' en window.open: con él siempre devuelve null y no se podría
        // saber si el navegador bloqueó la ventana. Se corta el opener a mano.
        const ventana = window.open(url, '_blank');
        if (ventana) ventana.opener = null;
        else window.location.href = url;
        estado.textContent = 'Abrimos WhatsApp con tu mensaje. Solo tienes que enviarlo.';
    });

    // Al corregir un campo, su error se quita en cuanto vuelve a ser válido
    for (const id of Object.keys(validaciones)) {
        const campo = document.getElementById(id);
        const evento = campo.tagName === 'SELECT' ? 'change' : 'input';
        campo.addEventListener(evento, () => {
            if (campo.hasAttribute('aria-invalid') && !validaciones[id](campo.value.trim())) mostrarError(campo, '');
        });
    }

    // Los botones de los planes (data-plan) dejan ese plan elegido en el formulario
    document.querySelectorAll('[data-plan]').forEach(boton => {
        boton.addEventListener('click', () => {
            const plan = document.getElementById('plan');
            plan.value = boton.dataset.plan;
            plan.dispatchEvent(new Event('change'));
        });
    });
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
