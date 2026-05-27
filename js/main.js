/* =========================================================
   main.js — interacciones globales
   1) Toggle del menú móvil
   2) Animación de entrada del collage (randomizada, 2.5s)
   ========================================================= */

(() => {
  /* ----- 1) NAV mobile ----- */
  const nav    = document.querySelector('.nav');
  const burger = document.querySelector('.nav__burger');
  if (nav && burger) {
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(isOpen));
    });
    nav.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ----- 2) Collage: entrada randomizada -----
     Cada pieza recibe:
       --enter-scale  → entre 0.8 y 1.2
       --enter-rotate → entre -30deg y +30deg (≈20-30 abs)
       --enter-delay  → entre 0 y 2.1s (último para la foto central)
     Total: ~2.5s. La foto del cuarteto siempre la última. */
  const collage = document.querySelector('.hero__collage');
  if (!collage) return;

  const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return; // CSS ya deja todo visible sin animar

  const pieces = Array.from(collage.querySelectorAll('.piece'));
  const quartet = collage.querySelector('[data-quartet]');
  const others = pieces.filter(p => p !== quartet);

  const rand = (min, max) => Math.random() * (max - min) + min;
  const signedAngle = () => {
    const sign = Math.random() < 0.5 ? -1 : 1;
    return sign * rand(20, 30);          // |20°..30°|
  };

  /* Distribuye delays para 'others' entre 0 y 0.9s, y deja
     la foto central a 1.05s para que sea la última en aparecer.
     Total ≈ 1.25s (mitad del tiempo original). */
  const maxDelayOthers = 0.9;
  // baraja aleatoriamente
  const shuffled = others.map(p => ({ p, k: Math.random() })).sort((a,b) => a.k - b.k).map(o => o.p);
  shuffled.forEach((piece, i) => {
    const delay = (i / (shuffled.length - 1)) * maxDelayOthers; // 0..0.9
    // pequeño jitter ±0.05s para que no se vea matemático
    const jitter = rand(-0.05, 0.05);
    piece.style.setProperty('--enter-scale',  rand(0.85, 1.2).toFixed(3));
    piece.style.setProperty('--enter-rotate', signedAngle().toFixed(2) + 'deg');
    piece.style.setProperty('--enter-delay',  Math.max(0, (delay + jitter)).toFixed(3) + 's');
  });

  if (quartet) {
    quartet.style.setProperty('--enter-scale',  '0.9');
    quartet.style.setProperty('--enter-rotate', '0deg');
    quartet.style.setProperty('--enter-delay',  '1.05s');
  }
})();

/* ----- 3) Modales de músicos (página El Cuarteto) ----- */
(() => {
  document.querySelectorAll('.musician__btn').forEach(btn => {
    const li = btn.closest('[data-musician]');
    if (!li) return;
    const id = 'modal-' + li.dataset.musician;
    const modal = document.getElementById(id);
    if (!modal) return;

    btn.addEventListener('click', () => {
      if (typeof modal.showModal === 'function') modal.showModal();
      else modal.setAttribute('open', '');
      document.body.style.overflow = 'hidden';
    });

    const closeBtn = modal.querySelector('.musician-modal__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.close();
        document.body.style.overflow = '';
      });
    }
    // click en el backdrop (fuera del inner) → cerrar
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.close();
        document.body.style.overflow = '';
      }
    });
    // ESC nativo también dispara 'close' en <dialog>
    modal.addEventListener('close', () => {
      document.body.style.overflow = '';
    });
  });
})();

/* ----- 4) Lightbox para la galería de Media ----- */
(() => {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  const img    = lb.querySelector('.lightbox__img');
  const dlBtn  = lb.querySelector('.lightbox__download');
  const close  = lb.querySelector('.lightbox__close');

  function openWith(src, alt) {
    img.src = src;
    img.alt = alt || '';
    dlBtn.href = src;
    // Extrae el nombre del archivo de la URL para que el download
    // se guarde con un nombre legible.
    const fname = src.split('/').pop() || 'imagen.jpg';
    dlBtn.setAttribute('download', fname);
    if (typeof lb.showModal === 'function') lb.showModal();
    else lb.setAttribute('open', '');
  }

  document.querySelectorAll('.gallery__item img').forEach(thumb => {
    thumb.addEventListener('click', () => openWith(thumb.src, thumb.alt));
    // hace que la imagen sea accesible con teclado
    thumb.setAttribute('tabindex', '0');
    thumb.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openWith(thumb.src, thumb.alt);
      }
    });
  });

  close.addEventListener('click', () => lb.close());
  // click en el fondo (fuera de la imagen) → cerrar
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });
})();
