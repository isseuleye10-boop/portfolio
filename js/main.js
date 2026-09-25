/**
 * PORTFOLIO ISSEU LEYE — JAVASCRIPT
 * Thème, langue, navigation, animations, projets, modales, formulaire et copie d'email.
 * Partagé entre index.html et projet.html (chaque fonction vérifie que ses éléments existent).
 */

const SITE = window.SITE || {};
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const icon = (name, cls = '') => `<svg class="icon ${cls}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;

document.addEventListener('DOMContentLoaded', () => {
  window.i18n.init();
  initTheme();
  initLinks();
  initAnalytics();
  initNavigation();
  initScrollEffects();
  renderProjects();
  initProjectFilters();
  initModals();
  initContactForm();
  initCopyEmail();
  initReveal();

  const y = $('#current-year');
  if (y) y.textContent = new Date().getFullYear();
});

/* ==================== THÈME CLAIR / SOMBRE ==================== */
function initTheme() {
  const root = document.documentElement;
  const meta = $('meta[name="theme-color"]');

  const apply = (t) => {
    root.setAttribute('data-theme', t);
    if (meta) meta.setAttribute('content', t === 'dark' ? '#0D0D0C' : '#FAFAF8');
  };
  apply(root.getAttribute('data-theme') || 'light');

  $$('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  });
}

/* ==================== LIENS GITHUB / LINKEDIN (depuis config.js) ==================== */
function initLinks() {
  $$('[data-link]').forEach(a => {
    const url = SITE[a.dataset.link];
    const target = a.parentElement.tagName === 'LI' ? a.parentElement : a;
    if (url) {
      a.href = url;
      target.hidden = false;
      a.hidden = false;
    } else {
      target.hidden = true;
    }
  });
}

/* ==================== STATISTIQUES DE VISITES (GoatCounter) ==================== */
function initAnalytics() {
  if (!SITE.goatcounter || location.protocol === 'file:') return;
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://gc.zgo.at/count.js';
  s.dataset.goatcounter = `https://${SITE.goatcounter}.goatcounter.com/count`;
  document.head.appendChild(s);
}

/* ==================== NAVIGATION ==================== */
function initNavigation() {
  const toggle = $('#mobile-toggle');
  const menu = $('#nav-menu');
  const links = $$('.nav-link');

  if (toggle && menu) {
    const setOpen = (open) => {
      toggle.classList.toggle('active', open);
      menu.classList.toggle('active', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };
    toggle.addEventListener('click', () => setOpen(!menu.classList.contains('active')));
    links.forEach(l => l.addEventListener('click', () => setOpen(false)));
    $$('[data-open-cv]', menu).forEach(b => b.addEventListener('click', () => setOpen(false)));
  }

  // Scroll spy : surligne la section visible
  const sections = links
    .map(l => l.getAttribute('href'))
    .filter(h => h && h.startsWith('#'))
    .map(h => document.querySelector(h))
    .filter(Boolean);
  if (!sections.length) return;

  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));
}

/* ==================== EFFETS AU SCROLL ==================== */
function initScrollEffects() {
  const navbar = $('#navbar');
  const progress = $('#scroll-progress');
  const topBtn = $('#back-to-top');
  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (navbar) navbar.classList.toggle('scrolled', y > 20);
    if (progress) progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    if (topBtn) topBtn.classList.toggle('visible', y > 600);
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();

  if (topBtn) topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ==================== APPARITION DES ÉLÉMENTS ==================== */
let revealObserver = null;

function initReveal(root = document) {
  $$('.services-grid, .skills-grid, .projects-grid, .timeline, .hero-content, .method-steps', root).forEach(group => {
    $$(':scope > .reveal', group).forEach((el, i) => el.style.setProperty('--delay', `${i * 0.08}s`));
  });

  const items = $$('.reveal:not(.in-view)', root);
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('in-view'));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  }
  items.forEach(el => revealObserver.observe(el));
}

/* ==================== PROJETS ==================== */
const PROJECTS = window.PROJECTS || [];

// Visuel d'un projet : capture d'écran si disponible, sinon illustration avec icône
function projectVisual(p, extraClass = '') {
  const cover = p.images && p.images[0];
  return `
    <div class="project-visual ${cover ? 'has-image' : ''} ${extraClass}" style="--accent:${p.accent}">
      <div class="mock-bar"><span></span><span></span><span></span></div>
      ${cover
        ? `<img src="${cover}" alt="${window.i18n.pick(p).name}" loading="lazy" decoding="async">`
        : icon(p.icon)}
    </div>`;
}

function renderProjects() {
  const grid = $('#projects-grid');
  if (!grid) return;

  const stat = $('#stat-projects');
  if (stat) stat.textContent = PROJECTS.length;

  const draw = () => {
    const filter = ($('.filter-btn.active') || {}).dataset?.filter || 'all';
    grid.innerHTML = PROJECTS.map((p, i) => {
      const d = window.i18n.pick(p);
      const hidden = filter !== 'all' && p.category !== filter;
      return `
        <article class="project-card reveal in-view ${hidden ? 'is-hidden' : ''}" data-category="${p.category}">
          <button class="project-open" data-project="${i}" aria-label="${window.i18n.t('details')} : ${d.name}">
            ${projectVisual(p)}
            <div class="project-info">
              <span class="project-cat">${d.cat}</span>
              <h3>${d.name}</h3>
              <p>${d.short}</p>
              <ul class="chips">${p.tech.slice(0, 3).map(t => `<li>${t}</li>`).join('')}</ul>
              <span class="project-link">${window.i18n.t('viewProject')} ${icon('arrow-right')}</span>
            </div>
          </button>
        </article>`;
    }).join('');

    $$('.project-open', grid).forEach(btn => {
      btn.addEventListener('click', () => openProject(Number(btn.dataset.project)));
    });
  };

  draw();
  // Première apparition animée, puis rendu direct lors des changements de langue
  $$('.project-card', grid).forEach(c => c.classList.remove('in-view'));
  window.i18n.onChange(draw);
}

function initProjectFilters() {
  const buttons = $$('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.toggle('active', b === btn));
      $$('.project-card').forEach(card => {
        const show = btn.dataset.filter === 'all' || card.dataset.category === btn.dataset.filter;
        card.classList.toggle('is-hidden', !show);
        if (show) {
          card.classList.remove('in-view');
          requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add('in-view')));
        }
      });
    });
  });
}

// Boutons d'action d'un projet (réutilisés par la page étude de cas)
function projectActions(p, { withCase = true } = {}) {
  const t = window.i18n.t;
  const btns = [];
  if (withCase) btns.push(`<a href="projet.html?p=${p.slug}" class="btn btn-primary btn-sm">${t('caseStudy')} ${icon('arrow-right', 'arrow')}</a>`);
  if (p.demo) btns.push(`<a href="${p.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm">${icon('arrow-up-right-from-square')} <span>${t('demo')}</span></a>`);
  if (p.github) btns.push(`<a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm">${icon('github')} <span>${t('code')}</span></a>`);
  if (!p.demo && !p.github) btns.push(`<a href="index.html#contact" class="btn btn-ghost btn-sm" data-close>${icon('comment-o')} <span>${t('askDemo')}</span></a>`);
  return btns.join('');
}

function openProject(index) {
  const p = PROJECTS[index];
  const modal = $('#project-modal');
  if (!p || !modal) return;
  const d = window.i18n.pick(p);

  $('#pm-title').textContent = d.name;
  $('#pm-body').innerHTML = `
    ${projectVisual(p, 'pm-visual')}
    <ul class="chips pm-tech">${p.tech.map(t => `<li>${t}</li>`).join('')}</ul>
    <p class="pm-desc">${d.desc}</p>
    <div class="pm-points">
      <h4>${window.i18n.t('keyPoints')}</h4>
      <ul>${d.points.map(pt => `<li>${icon('check')}<span>${pt}</span></li>`).join('')}</ul>
    </div>
    <div class="pm-actions">${projectActions(p)}</div>`;

  openModal(modal);
}

/* ==================== MODALES ==================== */
let lastFocused = null;

function openModal(modal) {
  if (!modal) return;
  lastFocused = document.activeElement;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  const closeBtn = $('.modal-close', modal);
  if (closeBtn) setTimeout(() => closeBtn.focus(), 50);
}

function closeModal(modal) {
  if (!modal || !modal.classList.contains('active')) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
  if (lastFocused) lastFocused.focus();
}

function initModals() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') $$('.modal.active').forEach(closeModal);
  });

  document.addEventListener('click', (e) => {
    if (e.target.classList && e.target.classList.contains('modal')) closeModal(e.target);
    const closer = e.target.closest && e.target.closest('[data-close]');
    if (closer) closeModal(closer.closest('.modal'));
  });

  // CV : aperçu (cv.html) + téléchargement du PDF dans la langue active
  const cvModal = $('#cv-modal');
  if (!cvModal) return;
  const frame = $('#cv-frame');
  const download = $('#cv-download');

  const syncCv = () => {
    const lang = window.i18n.lang();
    if (download) download.href = window.i18n.t('cvFile');
    if (frame && frame.dataset.lang !== lang && cvModal.classList.contains('active')) {
      frame.src = `cv.html?lang=${lang}&embed=1`;
      frame.dataset.lang = lang;
    }
  };

  $$('[data-open-cv]').forEach(b => b.addEventListener('click', () => {
    openModal(cvModal);
    syncCv();
  }));
  window.i18n.onChange(syncCv);
  syncCv();
}

/* ==================== FORMULAIRE DE CONTACT ==================== */
function initContactForm() {
  const form = $('#contact-form');
  if (!form) return;

  const t = window.i18n.t;
  const nameIn = $('#name');
  const emailIn = $('#email');
  const subjectIn = $('#subject');
  const msgIn = $('#message');
  const submitBtn = $('#submit-btn');

  const setErr = (el, id, txt) => {
    $('#' + id).textContent = txt;
    el.closest('.field').classList.add('has-error');
  };
  const clearErr = (el, id) => {
    $('#' + id).textContent = '';
    el.closest('.field').classList.remove('has-error');
  };

  [[nameIn, 'name-error'], [emailIn, 'email-error'], [msgIn, 'message-error']].forEach(([el, id]) => {
    el.addEventListener('input', () => clearErr(el, id));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let ok = true;

    if (!nameIn.value.trim()) { setErr(nameIn, 'name-error', t('errName')); ok = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailIn.value.trim())) { setErr(emailIn, 'email-error', t('errEmail')); ok = false; }
    if (!msgIn.value.trim()) { setErr(msgIn, 'message-error', t('errMsg')); ok = false; }

    if (!ok) {
      const firstErr = $('.has-error input, .has-error textarea', form);
      if (firstErr) firstErr.focus();
      return;
    }

    // Robot détecté (case piège cochée) : on ignore silencieusement
    if (form.botcheck && form.botcheck.checked) return;

    const name = nameIn.value.trim();
    const email = emailIn.value.trim();
    const subject = `[Portfolio] ${subjectIn.value} — ${name}`;
    const message = msgIn.value.trim();

    // Solution de secours : ouvre la messagerie du visiteur
    if (!SITE.web3formsKey) {
      const body = `${message}\n\n— ${name}\n${email}`;
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      showToast(t('mailTitle'), t('mailMsg'));
      form.reset();
      return;
    }

    // Envoi direct via Web3Forms
    const original = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `${icon('circle-notch', 'spin')} <span>${t('sending')}</span>`;

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: SITE.web3formsKey,
          subject,
          from_name: 'Portfolio Isseu Leye',
          name,
          email,
          message,
          botcheck: false
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Erreur');
      form.reset();
      showToast(t('sentTitle'), t('sentMsg'));
    } catch (err) {
      showToast(t('failTitle'), t('failMsg'), true);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = original;
    }
  });
}

/* ==================== COPIER L'EMAIL ==================== */
function initCopyEmail() {
  const btn = $('#copy-email');
  if (!btn) return;
  const label = $('span', btn);

  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
    } catch (e) {
      // Repli pour les navigateurs sans accès au presse-papiers
      const tmp = document.createElement('textarea');
      tmp.value = SITE.email;
      document.body.appendChild(tmp);
      tmp.select();
      document.execCommand('copy');
      tmp.remove();
    }
    btn.classList.add('copied');
    label.textContent = window.i18n.t('copied');
    showToast(window.i18n.t('copiedTitle'), SITE.email);
    setTimeout(() => {
      btn.classList.remove('copied');
      label.textContent = window.i18n.t('copy');
    }, 2000);
  });
}

/* ==================== TOAST ==================== */
let toastTimer;
function showToast(title, msg, isError = false) {
  const box = $('#toast');
  if (!box) return;
  $('#toast-title').textContent = title;
  $('#toast-msg').textContent = msg;
  $('#toast-icon').innerHTML = icon(isError ? 'circle-exclamation' : 'check');
  box.classList.toggle('is-error', isError);

  box.classList.add('active');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => box.classList.remove('active'), 4500);
  $('#toast-close').onclick = () => box.classList.remove('active');
}
