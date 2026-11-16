// Mobile menu
const burger = document.querySelector('.burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
  }
});

// Highlight the current section in the nav
const links = [...menu.querySelectorAll('a')];
const sections = links.map(a => document.querySelector(a.getAttribute('href')));
const spy = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => s && spy.observe(s));

// Skill indicators: only chips with data-level="0-100" get a bar
document.querySelectorAll('.chips li[data-level]').forEach(li => li.style.setProperty('--lv', li.dataset.level));
const barObs = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); barObs.unobserve(en.target); } });
}, { threshold: .3 });
document.querySelectorAll('[data-group]').forEach(g => barObs.observe(g));

// Placeholder links: stop "#" jumping to the top until you add real URLs
document.querySelectorAll('a[data-todo]').forEach(a => {
  a.addEventListener('click', e => {
    if (a.getAttribute('href') === '#') e.preventDefault();
  });
});

// Contact form (Formspree). Replace YOUR_FORM_ID in index.html.
const form = document.getElementById('form');
const statusEl = document.getElementById('status');
form.addEventListener('submit', async e => {
  e.preventDefault();
  if (form.action.includes('YOUR_FORM_ID')) {
    statusEl.textContent = 'Form is not connected yet. Add your Formspree form ID in index.html.';
    return;
  }
  statusEl.textContent = 'Sending...';
  try {
    const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    if (res.ok) { statusEl.textContent = 'Message sent. Thank you!'; form.reset(); }
    else statusEl.textContent = 'Could not send the message. Please email me directly.';
  } catch {
    statusEl.textContent = 'Network error. Please email me directly.';
  }
});

document.getElementById('year').textContent = new Date().getFullYear();
