// Shared: theme toggle, EN/ID switch, mobile menu, nav border.
// English lives in the HTML; each page sets window.I18N_ID = { key: "Indonesian text" }.
(function () {
  const root = document.documentElement;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  // light theme only
  root.removeAttribute('data-theme');

  // language — English default
  const nodes = [...document.querySelectorAll('[data-i18n]')];
  nodes.forEach(n => { n.dataset.en = n.innerHTML; });
  const langBtns = [...document.querySelectorAll('#lang button')];
  function setLang(l) {
    const id = window.I18N_ID || {};
    nodes.forEach(n => {
      const k = n.dataset.i18n;
      n.innerHTML = l === 'id' && id[k] != null ? id[k] : n.dataset.en;
    });
    root.lang = l;
    langBtns.forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === l));
    store.set('lang', l);
    document.dispatchEvent(new CustomEvent('langchange', { detail: l }));
  }
  langBtns.forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
  setLang(store.get('lang') === 'id' ? 'id' : 'en');

  // mobile menu
  const menuBtn = document.getElementById('menu'), menu = document.getElementById('mobile-menu');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open);
    });
    menu.addEventListener('click', e => { if (e.target.tagName === 'A') { menu.classList.remove('open'); menuBtn.setAttribute('aria-expanded', false); } });
  }

  // nav hairline on scroll
  const nav = document.querySelector('[data-nav]');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', scrollY > 8);
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
})();

// dropdowns (e.g. the CV picker): <div class="dd"><button data-dd>…</button><div class="dd-menu">…</div></div>
(function () {
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-dd]');
    document.querySelectorAll('.dd.open').forEach(d => { if (!t || d !== t.parentElement) { d.classList.remove('open'); d.querySelector('[data-dd]').setAttribute('aria-expanded', false); } });
    if (t) { const open = t.parentElement.classList.toggle('open'); t.setAttribute('aria-expanded', open); }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') document.querySelectorAll('.dd.open').forEach(d => d.classList.remove('open')); });
  const y = document.getElementById('current-year'); if (y) y.textContent = new Date().getFullYear();
})();
