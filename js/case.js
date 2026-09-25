/**
 * PAGE ÉTUDE DE CAS — projet.html?p=slug
 * Construit la page à partir des données de js/projects.js.
 * Les sections « Le défi », « Ce que j'ai appris » et « Captures » n'apparaissent que si elles sont remplies.
 */

const CASE_FR = {
  back: 'Tous les projets',
  overview: 'Présentation',
  features: 'Fonctionnalités clés',
  challenge: 'Le défi',
  learned: "Ce que j'ai appris",
  gallery: "Captures d'écran",
  stack: 'Technologies',
  prev: 'Projet précédent',
  next: 'Projet suivant',
  'cta.title': 'Ce projet vous plaît ? <em>Travaillons ensemble.</em>',
  'cta.btn': 'Me contacter',
  notfound: 'Projet introuvable.'
};

const tc = (key) => (window.i18n.lang() === 'en' && window.I18N.en['case.' + key]) || CASE_FR[key];

document.addEventListener('DOMContentLoaded', () => {
  renderCase();
  window.i18n.onChange(renderCase);
});

function renderCase() {
  const main = document.getElementById('case');
  const slug = new URLSearchParams(location.search).get('p');
  const index = PROJECTS.findIndex(p => p.slug === slug);
  const p = PROJECTS[index];

  if (!p) {
    main.innerHTML = `
      <section class="case-hero"><div class="container">
        <a href="index.html#projects" class="back-link">${icon('arrow-left')} ${tc('back')}</a>
        <h1 class="case-title" style="margin-top:2rem">${tc('notfound')}</h1>
      </div></section>`;
    return;
  }

  const d = window.i18n.pick(p);
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const gallery = (p.images || []).slice(1);

  document.title = `${d.name} — Isseu Leye`;

  main.innerHTML = `
    <section class="case-hero">
      <div class="container">
        <a href="index.html#projects" class="back-link">${icon('arrow-left')} ${tc('back')}</a>
        <span class="eyebrow">${d.cat}</span>
        <h1 class="case-title">${d.name}</h1>
        <p class="case-lead">${d.short}</p>
        ${projectVisual(p, 'case-visual reveal')}
      </div>
    </section>

    <section class="section" style="padding-top:3rem">
      <div class="container case-body">
        <div>
          <div class="case-section reveal">
            <h2>${tc('overview')}</h2>
            <p>${d.desc}</p>
          </div>

          <div class="case-section reveal">
            <h2>${tc('features')}</h2>
            <ul class="case-features">
              ${d.points.map(pt => `<li>${icon('check')}<span>${pt}</span></li>`).join('')}
            </ul>
          </div>

          ${d.challenge ? `
          <div class="case-section reveal">
            <h2>${tc('challenge')}</h2>
            <p>${d.challenge}</p>
          </div>` : ''}

          ${d.learned ? `
          <div class="case-section reveal">
            <h2>${tc('learned')}</h2>
            <p>${d.learned}</p>
          </div>` : ''}

          ${gallery.length ? `
          <div class="case-section reveal">
            <h2>${tc('gallery')}</h2>
            <div class="case-gallery">
              ${gallery.map((src, i) => `<img src="${src}" alt="${d.name} — ${i + 2}" loading="lazy" decoding="async">`).join('')}
            </div>
          </div>` : ''}
        </div>

        <aside class="case-aside reveal">
          <h3>${tc('stack')}</h3>
          <ul class="chips">${p.tech.map(t => `<li>${t}</li>`).join('')}</ul>
          <div class="case-actions">${projectActions(p, { withCase: false })}</div>
        </aside>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <nav class="case-nav reveal">
          <a href="projet.html?p=${prev.slug}" class="prev">
            <small>${icon('chevron-left')} ${tc('prev')}</small>
            <strong>${window.i18n.pick(prev).name}</strong>
          </a>
          <a href="projet.html?p=${next.slug}" class="next">
            <small>${tc('next')} ${icon('chevron-right')}</small>
            <strong>${window.i18n.pick(next).name}</strong>
          </a>
        </nav>

        <div class="case-cta reveal" style="margin-top:3rem">
          <h2>${tc('cta.title')}</h2>
          <a href="index.html#contact" class="btn btn-gold">${tc('cta.btn')} ${icon('arrow-right', 'arrow')}</a>
        </div>
      </div>
    </section>`;

  initReveal(main);
}
