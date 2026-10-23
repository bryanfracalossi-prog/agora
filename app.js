/* NEURON — lógica do app
   Sem dependências. Tudo salvo no localStorage do aparelho. */

(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const view = $('#view');
  const runnerEl = $('#runner');
  const runnerBody = $('#runner-body');
  const runnerFoot = $('#runner-foot');
  const toastEl = $('#toast');

  /* ---------------- ícones ---------------- */

  const S = (inner, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" ${extra}>${inner}</svg>`;

  const ICON = {
    sun: S('<circle cx="12" cy="12" r="4.1"/><path d="M12 2.6v2.1M12 19.3v2.1M2.6 12h2.1M19.3 12h2.1M5.3 5.3l1.5 1.5M17.2 17.2l1.5 1.5M18.7 5.3l-1.5 1.5M6.8 17.2l-1.5 1.5"/>'),
    moon: S('<path d="M20.2 14.6A8.6 8.6 0 0 1 9.4 3.8a8.6 8.6 0 1 0 10.8 10.8z"/>'),
    comic: S('<rect x="3" y="4" width="18" height="16" rx="2.2"/><path d="M3 9.3h18M3 14.7h18M9 4v16M15 4v16"/>'),
    compass: S('<circle cx="12" cy="12" r="8.6"/><path d="M15.4 8.6l-2 5-5 2 2-5z"/>'),
    wind: S('<path d="M3 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h8a2.5 2.5 0 1 1-2.5 2.5"/>'),
    bookmark: S('<path d="M6 4.5h12a1 1 0 0 1 1 1V21l-7-4.2L5 21V5.5a1 1 0 0 1 1-1z"/>'),
    bookmarkFilled: S('<path d="M6 4.5h12a1 1 0 0 1 1 1V21l-7-4.2L5 21V5.5a1 1 0 0 1 1-1z" fill="currentColor"/>'),
    settings: S('<path d="M4 7.5h9M17 7.5h3M4 16.5h3M11 16.5h9"/><circle cx="15" cy="7.5" r="2.2"/><circle cx="9" cy="16.5" r="2.2"/>'),
    heart: S('<path d="M12 20s-7.6-4.6-7.6-9.8A4.3 4.3 0 0 1 12 7.1a4.3 4.3 0 0 1 7.6 3.1C19.6 15.4 12 20 12 20z"/>'),
    heartFilled: S('<path d="M12 20s-7.6-4.6-7.6-9.8A4.3 4.3 0 0 1 12 7.1a4.3 4.3 0 0 1 7.6 3.1C19.6 15.4 12 20 12 20z" fill="currentColor"/>'),
    arrowRight: S('<path d="M4 12h15M13 6l6 6-6 6"/>'),
    arrowLeft: S('<path d="M20 12H5M11 6l-6 6 6 6"/>'),
    check: S('<path d="M4.5 12.5l5 5 10-11"/>'),
    clock: S('<circle cx="12" cy="12" r="8.6"/><path d="M12 7v5.4l3.6 2.1"/>'),
    leaf: S('<path d="M20 4C10 4 4 9 4 16c0 2.2 1.2 4 3 4 7 0 13-6 13-16z"/><path d="M9 15c2-3 4.5-5.5 8-7"/>'),
    eye: S('<path d="M2.5 12S5.8 5.8 12 5.8 21.5 12 21.5 12 18.2 18.2 12 18.2 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/>'),
    footsteps: S('<path d="M8 14c-2 0-3 1.6-3 3.2 0 1.2.6 2 1.7 2C8.2 19.2 9 18 9 16.6 9 15.2 8.9 14 8 14zM6 11.5c0-2 1.3-3.5 3-3.5s2.4 1.4 2.4 3S10.6 14 9 14s-3-1-3-2.5z"/><path d="M17 6c-1.8 0-2.8 1.5-2.8 3 0 1.1.6 1.8 1.6 1.8 1.4 0 2.2-1.1 2.2-2.4C18 7.1 17.8 6 17 6zM15.2 13c1.6 0 2.8 1.3 2.8 2.8s-1 2.6-2.4 2.6-2.2-1-2.2-2.4.6-3 1.8-3z"/>'),
    trash: S('<path d="M4 7h16M9 7V4.8h6V7M6.5 7l.8 12.2h9.4L17.5 7M10 10.5v5M14 10.5v5"/>'),
    edit: S('<path d="M4 20h4L20 8l-4-4L4 16v4zM14.5 5.5l4 4"/>'),
    download: S('<path d="M12 3v11M7 10l5 5 5-5M4 18.5h16"/>'),
    upload: S('<path d="M12 15V4M7 8l5-5 5 5M4 19h16"/>'),
    lifebuoy: S('<circle cx="12" cy="12" r="8.6"/><circle cx="12" cy="12" r="3.6"/><path d="M5.9 5.9l3.5 3.5M14.6 14.6l3.5 3.5M18.1 5.9l-3.5 3.5M9.4 14.6l-3.5 3.5"/>'),
    sparkle: S('<path d="M12 3l1.7 4.8L18.5 9.5l-4.8 1.7L12 16l-1.7-4.8L5.5 9.5l4.8-1.7z"/><path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>'),
    play: S('<circle cx="12" cy="12" r="8.6"/><path d="M10 8.7l5.4 3.3L10 15.3z" fill="currentColor" stroke="none"/>'),
    book: S('<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v18H6.5A2.5 2.5 0 0 1 4 18.5z"/><path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20"/>'),
    phone: S('<path d="M6.5 3.5h3l1.5 4-2.2 1.6a12 12 0 0 0 5.1 5.1l1.6-2.2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z"/>'),
    close: S('<path d="M6 6l12 12M18 6L6 18"/>'),
    quote: S('<path d="M9 6H5v6h4c0 3-1 4.5-3 5.5M19 6h-4v6h4c0 3-1 4.5-3 5.5"/>'),
    users: S('<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19c0-3.1 2.5-5.2 5.5-5.2s5.5 2.1 5.5 5.2"/><path d="M16 5.2a3.2 3.2 0 0 1 0 6.4M17.5 14.2c2.4.4 4 2.2 4 4.8"/>'),
    message: S('<path d="M4 5.5h16v10H9l-4 3.5v-3.5H4z"/>'),
    hand: S('<path d="M7 12.5V7.8a1.5 1.5 0 0 1 3 0v3.4M10 11V5.8a1.5 1.5 0 0 1 3 0v5M13 11V6.8a1.5 1.5 0 0 1 3 0v5M16 12V9.3a1.5 1.5 0 0 1 3 0v5.2c0 3.4-2.4 5.5-5.7 5.5h-1.2c-2.2 0-3.5-1-4.6-2.8L5 12.5a1.6 1.6 0 0 1 2.6-1.8L10 14"/>'),
    shield: S('<path d="M12 3l7 3v5.3c0 4.4-3 7.7-7 9.7-4-2-7-5.3-7-9.7V6z"/><path d="M8.8 12l2.2 2.2 4.3-4.5"/>'),
    refresh: S('<path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5"/>'),
    flag: S('<path d="M6 21V4M6 4h11l-2 4 2 4H6"/>'),
    lock: S('<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10"/>'),
    send: S('<path d="M4 12l16-8-6 16-2.8-6.2z"/><path d="M11.2 13.8L20 4"/>')
  };

  $$('[data-icon]').forEach(el => { el.innerHTML = ICON[el.dataset.icon] || ''; });
  const settingsBtn = $('#btn-settings');
  if (settingsBtn) settingsBtn.innerHTML = ICON.settings;

  /* ---------------- estado ---------------- */

  const STORE_KEY = 'agora.v1';

  const defaultState = () => ({
    version: 1,
    entries: [],
    sessions: [],
    favorites: [],
    readComics: [],
    readLessons: [],
    checks: {},
    activity: {},
    settings: { name: '', theme: 'system' }
  });

  function loadState() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return defaultState();
      const data = JSON.parse(raw);
      const base = defaultState();
      return {
        ...base,
        ...data,
        settings: { ...base.settings, ...(data.settings || {}) },
        entries: Array.isArray(data.entries) ? data.entries : [],
        sessions: Array.isArray(data.sessions) ? data.sessions : [],
        favorites: Array.isArray(data.favorites) ? data.favorites : [],
        readComics: Array.isArray(data.readComics) ? data.readComics : [],
        readLessons: Array.isArray(data.readLessons) ? data.readLessons : [],
        checks: data.checks && typeof data.checks === 'object' ? data.checks : {},
        activity: data.activity && typeof data.activity === 'object' ? data.activity : {}
      };
    } catch (err) {
      return defaultState();
    }
  }

  let state = loadState();

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (err) { /* modo privado */ }
  }

  /* ---------------- utilidades ---------------- */

  const pad = n => String(n).padStart(2, '0');

  function dayKey(d = new Date()) {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

  function addDays(d, n) {
    const x = new Date(d);
    x.setDate(x.getDate() + n);
    return x;
  }

  function touchActivity() {
    const k = dayKey();
    state.activity[k] = (state.activity[k] || 0) + 1;
    save();
  }

  function streak() {
    let d = new Date();
    if (!state.activity[dayKey(d)]) d = addDays(d, -1);
    let n = 0;
    while (state.activity[dayKey(d)]) { n++; d = addDays(d, -1); }
    return n;
  }

  function uid() {
    return 'e' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function esc(s) {
    return String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  const monthFmt = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short' });
  const longFmt = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  const weekdayFmt = new Intl.DateTimeFormat('pt-BR', { weekday: 'narrow' });

  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

  function dailyIndex(len) {
    const d = new Date();
    return (d.getFullYear() * 372 + d.getMonth() * 31 + d.getDate()) % len;
  }

  function greeting() {
    const h = new Date().getHours();
    if (h < 12) return 'Bom dia';
    if (h < 18) return 'Boa tarde';
    return 'Boa noite';
  }

  function themeLabel(id) {
    return (CONTENT.themes.find(t => t.id === id) || {}).label || id;
  }

  function emotion(id) {
    return CONTENT.emotions.find(e => e.id === id) || null;
  }

  function favorite(id) { return state.favorites.includes(id); }

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('is-on');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toastEl.classList.remove('is-on'), 2800);
  }

  /* ---------------- círculo ---------------- */

  let circleData = { mode: null, posts: [], stats: null, loading: false, error: null, loadedAt: 0 };
  let circleSort = 'recent';
  let circleMood = 'todas';
  let circleDraftMood = null;
  let circleExpanded = new Set();
  let circleIdentity = CIRCLE.identity();
  let circleLoading = false;
  let circlePosting = false;

  function circleStats() {
    return circleData.stats || { posts: 0, comments: 0, hearts: 0, meToo: 0, presence: 0, unanswered: 0 };
  }

  function circleModeBadge() {
    if (circleData.mode === 'online') {
      return `<span class="circle-mode is-online">${ICON.users} comunidade</span>`;
    }
    if (circleData.mode === 'local') {
      return `<span class="circle-mode is-local">${ICON.lock} modo local</span>`;
    }
    return `<span class="circle-mode">${ICON.refresh} conectando</span>`;
  }

  function circleStatsHTML() {
    const s = circleStats();
    return `
      <div class="circle-stat"><strong>${s.posts || 0}</strong><span>${(s.posts || 0) === 1 ? 'desabafo' : 'desabafos'}</span></div>
      <div class="circle-stat"><strong>${s.comments || 0}</strong><span>${(s.comments || 0) === 1 ? 'eco' : 'ecos'}</span></div>
      <div class="circle-stat"><strong>${(s.hearts || 0) + (s.meToo || 0)}</strong><span>gestos de apoio</span></div>
      <div class="circle-stat is-presence"><strong>${s.presence || 0}</strong><span>por aqui hoje</span></div>
    `;
  }

  function circleBannerHTML() {
    if (circleData.error) {
      return `<div class="circle-banner is-warn">${ICON.lifebuoy}<p><strong>O Círculo compartilhado não respondeu.</strong> ${esc(circleData.error)} Seus posts ficam neste aparelho. Para conversar com outras pessoas, inicie o servidor do NEURON.</p></div>`;
    }
    if (circleData.mode === 'local') {
      return `<div class="circle-banner is-local">${ICON.lock}<p><strong>Modo local.</strong> Este Círculo está só neste aparelho. Para abrir para outras pessoas, inicie o servidor do NEURON (<code>serve.ps1</code>) e acesse pelo endereço dele.</p></div>`;
    }
    if (circleData.mode === 'online') {
      return `<div class="circle-banner is-online">${ICON.users}<p><strong>Você está no Círculo compartilhado.</strong> Do outro lado tem uma pessoa. Responda como você gostaria de ser respondido.</p></div>`;
    }
    return '';
  }

  function circlePresenceHTML() {
    const s = circleStats();
    const marked = CIRCLE.presenceMarkedToday();
    const count = s.presence || 0;
    return `
      <div class="presence-card" id="circle-presence-card">
        <span class="presence-pulse" aria-hidden="true"></span>
        <div class="presence-body">
          <p class="eyebrow">Presença</p>
          <h3>${count === 0 ? 'Seja a primeira pessoa a deixar um sinal hoje.' : `${count} ${count === 1 ? 'pessoa passou' : 'pessoas passaram'} por aqui hoje`}</h3>
          <p>Você não está sozinho. Se quiser, deixe um sinal — sem nome, sem explicação.</p>
        </div>
        <button class="btn btn-soft btn-sm" type="button" data-action="circle-presence" ${marked ? 'disabled' : ''}>
          ${marked ? 'Você já está aqui' : 'Estou aqui'}
        </button>
      </div>
    `;
  }

  function circleAuthor(p) {
    if (p.anonymous) return 'Alguém';
    return (p.author || '').trim() || 'Alguém';
  }

  function circleAvatar(p) {
    const name = circleAuthor(p);
    const cls = p.app ? 'is-app' : p.anonymous ? 'is-anon' : 'is-named';
    const letter = p.app ? 'Á' : p.anonymous ? '?' : name.charAt(0).toUpperCase();
    return `<span class="circle-avatar ${cls}" aria-hidden="true">${esc(letter)}</span>`;
  }

  function circleMoodPill(p) {
    if (!p.mood || p.mood === 'outro') return '';
    return `<span class="circle-mood-pill">${esc(CIRCLE.moodLabel(p.mood))}</span>`;
  }

  function circleCommentHTML(post, c) {
    const name = c.anonymous ? 'Alguém' : (c.author || '').trim() || 'Alguém';
    return `
      <div class="circle-comment" data-comment-id="${c.id}">
        <div class="circle-comment-head">
          <strong>${esc(name)}</strong>
          <span>${esc(CIRCLE.timeAgo(c.ts))}</span>
          <button class="comment-flag" type="button" data-action="circle-report-comment" data-id="${post.id}" data-comment="${c.id}" aria-label="Denunciar este eco">${ICON.flag}</button>
        </div>
        <p>${esc(c.text)}</p>
      </div>
    `;
  }

  function circlePostHTML(p) {
    const comments = (p.comments || []).filter(c => !c.hidden);
    const expanded = circleExpanded.has(p.id);
    const visibleComments = expanded ? comments : comments.slice(-2);
    const hiddenCount = Math.max(0, comments.length - visibleComments.length);
    const author = circleAuthor(p);
    const mine = CIRCLE.isMine(p.id);
    const replyAnon = true;

    return `
      <article class="circle-post ${p.app ? 'is-app' : ''}" data-post-id="${p.id}">
        <header class="circle-post-head">
          ${circleAvatar(p)}
          <div class="circle-post-meta">
            <div class="circle-post-who">
              <strong>${esc(author)}</strong>
              ${p.app ? '<span class="app-tag">NEURON</span>' : ''}
              ${p.anonymous && !p.app ? '<span class="anon-tag">anônimo</span>' : ''}
            </div>
            <div class="circle-post-sub">
              <span>${esc(CIRCLE.timeAgo(p.ts))}</span>
              ${circleMoodPill(p)}
            </div>
          </div>
          <div class="circle-post-menu">
            ${mine ? `<button class="icon-btn danger" type="button" data-action="circle-delete" data-id="${p.id}" aria-label="Apagar meu desabafo">${ICON.trash}</button>` : ''}
            ${!p.app ? `<button class="icon-btn" type="button" data-action="circle-report" data-id="${p.id}" aria-label="Denunciar desabafo">${ICON.flag}</button>` : ''}
          </div>
        </header>

        <p class="circle-post-text">${esc(p.text)}</p>

        <div class="circle-post-actions">
          <button class="circle-react ${p.reactedHeart ? 'is-on' : ''}" type="button" data-action="circle-react" data-id="${p.id}" data-type="heart" aria-pressed="${p.reactedHeart}">
            ${p.reactedHeart ? ICON.heartFilled : ICON.heart}<span>Estou com você</span><b>${p.hearts || 0}</b>
          </button>
          <button class="circle-react ${p.reactedMeToo ? 'is-on' : ''}" type="button" data-action="circle-react" data-id="${p.id}" data-type="meToo" aria-pressed="${p.reactedMeToo}">
            ${ICON.hand}<span>Eu também</span><b>${p.meToo || 0}</b>
          </button>
          <button class="circle-react" type="button" data-action="circle-expand" data-id="${p.id}">
            ${ICON.message}<span>${comments.length} ${comments.length === 1 ? 'eco' : 'ecos'}</span>
          </button>
        </div>

        ${comments.length ? `
          <div class="circle-comments">
            ${visibleComments.map(c => circleCommentHTML(p, c)).join('')}
            ${comments.length > 2 ? `<button class="circle-more" type="button" data-action="circle-expand" data-id="${p.id}">${expanded ? 'Mostrar menos' : `Ver ${hiddenCount} ${hiddenCount === 1 ? 'eco' : 'ecos'} anterior${hiddenCount === 1 ? '' : 'es'}`}</button>` : ''}
          </div>
        ` : ''}

        <details class="circle-reply">
          <summary>Deixar um eco ${ICON.message}</summary>
          <div class="circle-reply-box">
            <textarea class="circle-comment-text" rows="2" maxlength="500" placeholder="Uma palavra já ajuda. O que você diria a essa pessoa?"></textarea>
            <div class="circle-reply-foot">
              <label class="mini-check"><input type="checkbox" class="circle-comment-anon" ${replyAnon ? 'checked' : ''}> anônimo</label>
              <button class="btn btn-soft btn-sm" type="button" data-action="circle-comment" data-id="${p.id}">Enviar eco</button>
            </div>
          </div>
        </details>
      </article>
    `;
  }

  function circleSkeletonHTML() {
    return `
      <div class="circle-skeleton" aria-label="Carregando o Círculo">
        <div class="sk-line"></div><div class="sk-line short"></div><div class="sk-line"></div>
      </div>
      <div class="circle-skeleton" aria-hidden="true">
        <div class="sk-line short"></div><div class="sk-line"></div>
      </div>
    `;
  }

  function circleFeedHTML() {
    const posts = circleData.posts || [];
    if (circleData.loading && !posts.length) return circleSkeletonHTML();
    if (!posts.length) {
      return `<div class="empty circle-empty">
        <h3>${circleMood !== 'todas' ? 'Nada com esse filtro por aqui' : 'O Círculo está começando'}</h3>
        <p>${circleMood !== 'todas' ? 'Experimente “Todos” ou escreva o que está pesando.' : 'Seja a primeira pessoa a deixar uma palavra. Não precisa ter as palavras certas.'}</p>
        <button class="btn btn-primary btn-sm" type="button" data-action="circle-focus">Escrever agora</button>
      </div>`;
    }
    const s = circleStats();
    const callout = s.unanswered > 0 && circleSort !== 'unanswered'
      ? `<button class="circle-callout" type="button" data-action="circle-sort" data-sort="unanswered">${ICON.message}<span><strong>${s.unanswered} ${s.unanswered === 1 ? 'desabafo ainda está' : 'desabafos ainda estão'} sem eco.</strong> Às vezes uma frase basta.</span>${ICON.arrowRight}</button>`
      : '';
    return callout + posts.map(circlePostHTML).join('');
  }

  function circleComposerHTML() {
    const named = circleIdentity === 'named';
    return `
      <section class="circle-composer card" id="circle-composer">
        <div class="circle-composer-head">
          <div>
            <p class="eyebrow">Desabafo</p>
            <h2>O que está pesando agora?</h2>
          </div>
          <div class="segmented circle-identity" role="group" aria-label="Como aparecer">
            <button type="button" data-action="circle-identity" data-identity="anon" class="${named ? '' : 'is-active'}">Anônimo</button>
            <button type="button" data-action="circle-identity" data-identity="named" class="${named ? 'is-active' : ''}">Com meu nome</button>
          </div>
        </div>

        <div class="circle-name-wrap" id="circle-name-wrap" ${named ? '' : 'hidden'}>
          <label class="field">
            <span class="field-label">Como quer aparecer?</span>
            <input id="circle-name" type="text" maxlength="40" value="${esc(state.settings.name || '')}" placeholder="Seu nome ou apelido" autocomplete="nickname">
          </label>
        </div>

        <div class="circle-mood-row">
          <span class="field-label">Se quiser, dê um nome ao que sente:</span>
          <div class="chip-row wrap">
            ${CIRCLE.MOODS.map(m => `<button class="chip ${circleDraftMood === m.id ? 'is-active' : ''}" type="button" data-action="circle-draft-mood" data-mood="${m.id}" aria-pressed="${circleDraftMood === m.id}">${esc(m.label)}</button>`).join('')}
          </div>
        </div>

        <label class="field circle-text-field">
          <span class="field-label">Seu desabafo</span>
          <textarea id="circle-text" rows="5" maxlength="1200" placeholder="Hoje eu estou com medo de..."></textarea>
        </label>

        <div class="circle-warning" id="circle-warning" hidden></div>

        <div class="circle-composer-foot">
          <span class="muted small" id="circle-count">0/1200</span>
          <div class="btn-row">
            <button class="btn btn-ghost" type="button" data-action="circle-private">Guardar só para mim</button>
            <button class="btn btn-primary" type="button" data-action="circle-publish">Publicar no Círculo</button>
          </div>
        </div>
        <p class="circle-privacy">${ICON.lock} No modo anônimo, seu nome não é enviado. Mesmo assim, evite telefone, endereço ou dados de outras pessoas.</p>
      </section>
    `;
  }

  function screenCircle() {
    const named = circleIdentity === 'named';
    return `
      <section class="circle-hero">
        <div class="circle-hero-top">
          <p class="eyebrow">Círculo · apoio entre pessoas</p>
          <span id="circle-mode-badge">${circleModeBadge()}</span>
        </div>
        <h1>Você não está sozinho.</h1>
        <p class="lead">Tem coisa que a gente não consegue resolver sozinho. Aqui, você pode colocar em palavras o que está pesando — sem nome, se preferir — e encontrar alguém que já atravessou algo parecido.</p>
        <div class="circle-stats" id="circle-stats">${circleStatsHTML()}</div>
        <div class="circle-hero-actions">
          <button class="btn btn-primary" type="button" data-action="circle-focus">Escrever o que sinto</button>
          <button class="btn btn-ghost" type="button" data-action="open-help">Preciso de ajuda agora</button>
        </div>
      </section>

      <div class="circle-safety">
        <span class="circle-safety-ico">${ICON.lifebuoy}</span>
        <p><strong>Apoio entre pessoas, não terapia.</strong> Se estiver em crise, ligue <a href="tel:188">188</a> (CVV, 24h, gratuito). Em risco imediato: <a href="tel:192">192</a>.</p>
      </div>

      <div id="circle-banner">${circleBannerHTML()}</div>

      ${circleComposerHTML()}

      <div id="circle-presence">${circlePresenceHTML()}</div>

      <div class="circle-toolbar">
        <div class="seg-tabs circle-sort" role="group" aria-label="Ordenar desabafos">
          <button type="button" data-action="circle-sort" data-sort="recent" class="${circleSort === 'recent' ? 'is-active' : ''}">Recentes</button>
          <button type="button" data-action="circle-sort" data-sort="hearts" class="${circleSort === 'hearts' ? 'is-active' : ''}">Mais abraçados</button>
          <button type="button" data-action="circle-sort" data-sort="unanswered" class="${circleSort === 'unanswered' ? 'is-active' : ''}">Sem eco</button>
        </div>
        <button class="icon-round" type="button" data-action="circle-refresh" aria-label="Atualizar o Círculo" title="Atualizar">${ICON.refresh}</button>
      </div>

      <div class="circle-filters" role="group" aria-label="Filtrar por sentimento">
        <button class="chip ${circleMood === 'todas' ? 'is-active' : ''}" type="button" data-action="circle-mood-filter" data-mood="todas">Todos</button>
        ${CIRCLE.MOODS.map(m => `<button class="chip ${circleMood === m.id ? 'is-active' : ''}" type="button" data-action="circle-mood-filter" data-mood="${m.id}">${esc(m.label)}</button>`).join('')}
      </div>

      <div id="circle-feed" class="circle-feed" aria-live="polite">${circleFeedHTML()}</div>

      <div class="circle-bottom">
        <div class="circle-help-card card">
          <div class="circle-help-head">${ICON.lifebuoy}<div><p class="eyebrow">Cuidado acessível</p><h3>Onde buscar ajuda</h3></div></div>
          <p><strong>CVV 188</strong> — 24h, gratuito e sigiloso. Também por chat em <a href="https://www.cvv.org.br" target="_blank" rel="noopener">cvv.org.br</a>.</p>
          <p><strong>CAPS e UBS</strong> — procure a unidade de saúde mais próxima e pergunte pelo CAPS. O atendimento pelo SUS é gratuito.</p>
          <p><strong>Clínicas-escola</strong> — universidades com curso de Psicologia costumam oferecer atendimento gratuito ou social.</p>
          <p class="muted small">Se houver risco imediato: <a href="tel:192">192</a> (SAMU) ou <a href="tel:190">190</a> (Polícia).</p>
          <button class="btn btn-ghost btn-sm" type="button" data-action="open-help">Abrir ajuda agora</button>
        </div>

        <details class="circle-rules card">
          <summary>${ICON.shield} Cuidado coletivo <span>o que cabe aqui</span></summary>
          <ul>
            <li>Não julgue, não diagnostique, não dê sermão. Você não precisa ter a resposta.</li>
            <li>Você pode ser anônimo. Não publique dados de outras pessoas.</li>
            <li>Racismo, LGBTfobia, machismo, capacitismo e ameaças não cabem aqui.</li>
            <li>Responda como você gostaria de ser respondido.</li>
            <li>Se estiver em risco, procure ajuda profissional. O Círculo não substitui terapia.</li>
          </ul>
        </details>
      </div>
    `;
  }

  function updateCircleWarning(text) {
    const box = $('#circle-warning');
    if (!box) return;
    const heavy = CIRCLE.isHeavy(text);
    const personal = CIRCLE.hasPersonalData(text);
    if (!heavy && !personal) {
      box.hidden = true;
      box.innerHTML = '';
      return;
    }
    box.hidden = false;
    box.innerHTML = `
      ${heavy ? `<p><strong>Parece que você está carregando algo muito pesado.</strong> Você pode publicar, mas não precisa passar por isso sozinho. O CVV atende 24h no <a href="tel:188">188</a>, de graça.</p>` : ''}
      ${personal ? `<p>${ICON.lock} Evite telefone, e-mail ou endereço. O Círculo é visível para quem acessa este servidor.</p>` : ''}
    `;
  }

  function updateCircleChrome() {
    const statsEl = $('#circle-stats');
    if (statsEl) statsEl.innerHTML = circleStatsHTML();
    const banner = $('#circle-banner');
    if (banner) banner.innerHTML = circleBannerHTML();
    const badge = $('#circle-mode-badge');
    if (badge) badge.innerHTML = circleModeBadge();
    const presence = $('#circle-presence');
    if (presence) presence.innerHTML = circlePresenceHTML();
    const feed = $('#circle-feed');
    if (feed) feed.innerHTML = circleFeedHTML();
    $$('.circle-sort [data-sort]').forEach(b => b.classList.toggle('is-active', b.dataset.sort === circleSort));
    $$('.circle-filters [data-mood]').forEach(b => b.classList.toggle('is-active', b.dataset.mood === circleMood));
  }

  async function loadCircle(force = false) {
    if (circleLoading) return;
    const page = location.hash.replace(/^#\/?/, '').split('/')[0] || 'hoje';
    if (page !== 'circulo') return;
    if (!force && circleData.loadedAt && Date.now() - circleData.loadedAt < 15000) return;

    circleLoading = true;
    circleData.loading = true;
    updateCircleChrome();
    try {
      const res = await CIRCLE.list({ sort: circleSort, mood: circleMood });
      circleData = {
        mode: res.mode,
        posts: res.posts || [],
        stats: res.stats || circleStats(),
        loading: false,
        error: res.error || null,
        loadedAt: Date.now()
      };
    } catch (err) {
      circleData.loading = false;
      circleData.error = 'Não consegui carregar o Círculo agora.';
    } finally {
      circleLoading = false;
      updateCircleChrome();
    }
  }

  async function publishCirclePost() {
    if (circlePosting) return;
    const textEl = $('#circle-text');
    if (!textEl) return;
    const text = textEl.value.trim();
    if (!text) {
      toast('Escreva uma frase antes de publicar.');
      textEl.focus();
      return;
    }
    if (text.length > 1200) {
      toast('O desabafo pode ter até 1200 caracteres.');
      return;
    }

    const anonymous = circleIdentity !== 'named';
    let author = null;
    if (!anonymous) {
      author = (($('#circle-name') && $('#circle-name').value) || state.settings.name || '').trim();
      if (!author) {
        toast('Escreva um nome ou publique anônimo.');
        if ($('#circle-name')) $('#circle-name').focus();
        return;
      }
      if (author.length > 40) author = author.slice(0, 40);
      state.settings.name = author;
      save();
    }

    const btn = $('[data-action="circle-publish"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Publicando…'; }
    circlePosting = true;
    try {
      const res = await CIRCLE.create({ text, author, anonymous, mood: circleDraftMood || 'outro' });
      const post = res.post;
      circleData.mode = res.mode;
      circleData.posts = [post, ...circleData.posts.filter(p => p.id !== post.id)];
      circleData.loadedAt = Date.now();
      const s = circleStats();
      circleData.stats = { ...s, posts: (s.posts || 0) + 1, unanswered: (s.unanswered || 0) + 1 };
      textEl.value = '';
      circleDraftMood = null;
      const count = $('#circle-count');
      if (count) count.textContent = '0/1200';
      const warning = $('#circle-warning');
      if (warning) { warning.hidden = true; warning.innerHTML = ''; }
      $$('.circle-mood-row [data-mood]').forEach(b => b.classList.remove('is-active'));
      updateCircleChrome();
      toast(res.mode === 'online' ? 'Publicado. Obrigado por dividir.' : 'Guardado no Círculo local. Você não está sozinho.');
    } catch (err) {
      toast(err.message || 'Não consegui publicar agora.');
    } finally {
      circlePosting = false;
      if (btn) { btn.disabled = false; btn.textContent = 'Publicar no Círculo'; }
    }
  }

  async function reactCircle(btn) {
    const id = btn.dataset.id;
    const type = btn.dataset.type;
    const post = circleData.posts.find(p => p.id === id);
    if (!post) return;
    if (type === 'heart' && post.reactedHeart) {
      toast('Você já segurou a mão dessa pessoa.');
      return;
    }
    if (type === 'meToo' && post.reactedMeToo) {
      toast('Você já disse “eu também”.');
      return;
    }
    btn.disabled = true;
    try {
      const res = await CIRCLE.react(id, type);
      const idx = circleData.posts.findIndex(p => p.id === id);
      if (idx >= 0) circleData.posts[idx] = res.post;
      const s = circleStats();
      if (type === 'heart') s.hearts = (s.hearts || 0) + 1;
      else s.meToo = (s.meToo || 0) + 1;
      circleData.stats = s;
      circleData.loadedAt = Date.now();
      updateCircleChrome();
    } catch (err) {
      btn.disabled = false;
      toast(err.message || 'Não consegui registrar seu apoio.');
    }
  }

  async function addCircleComment(btn) {
    const id = btn.dataset.id;
    const card = btn.closest('.circle-post');
    if (!card) return;
    const ta = $('.circle-comment-text', card);
    if (!ta) return;
    const text = ta.value.trim();
    if (!text) {
      toast('Escreva uma frase antes de enviar.');
      ta.focus();
      return;
    }
    if (text.length > 500) {
      toast('O eco pode ter até 500 caracteres.');
      return;
    }
    const anonBox = $('.circle-comment-anon', card);
    const anonymous = anonBox ? anonBox.checked : true;
    let author = null;
    if (!anonymous) {
      author = (state.settings.name || '').trim();
      if (!author) {
        toast('Coloque seu nome nos ajustes ou responda anônimo.');
        return;
      }
    }

    btn.disabled = true;
    btn.textContent = 'Enviando…';
    const post = circleData.posts.find(p => p.id === id);
    const before = post ? (post.comments || []).filter(c => !c.hidden).length : 0;
    try {
      const res = await CIRCLE.comment(id, { text, author, anonymous });
      const idx = circleData.posts.findIndex(p => p.id === id);
      if (idx >= 0 && res.post) circleData.posts[idx] = res.post;
      circleExpanded.add(id);
      const s = circleStats();
      s.comments = (s.comments || 0) + 1;
      if (before === 0) s.unanswered = Math.max(0, (s.unanswered || 0) - 1);
      circleData.stats = s;
      circleData.loadedAt = Date.now();
      if (circleSort === 'unanswered') {
        circleData.posts = circleData.posts.filter(p => p.id !== id);
      }
      updateCircleChrome();
      toast('Eco enviado. Obrigado por não deixar sozinho.');
    } catch (err) {
      btn.disabled = false;
      btn.textContent = 'Enviar eco';
      toast(err.message || 'Não consegui enviar seu eco.');
    }
  }

  async function reportCircle(btn) {
    const id = btn.dataset.id;
    const commentId = btn.dataset.comment || null;
    const what = commentId ? 'este eco' : 'este desabafo';
    if (!confirm(`Denunciar ${what}? Ele pode ser ocultado se outras pessoas também denunciarem.`)) return;
    btn.disabled = true;
    try {
      const res = await CIRCLE.report(id, { reason: 'denúncia pelo app', commentId });
      if (commentId) {
        const post = circleData.posts.find(p => p.id === id);
        const c = post && (post.comments || []).find(x => x.id === commentId);
        if (c) c.hidden = true;
        const s = circleStats();
        s.comments = Math.max(0, (s.comments || 0) - 1);
        circleData.stats = s;
      } else {
        const post = circleData.posts.find(p => p.id === id);
        circleData.posts = circleData.posts.filter(p => p.id !== id);
        const s = circleStats();
        s.posts = Math.max(0, (s.posts || 0) - 1);
        if (post) {
          s.hearts = Math.max(0, (s.hearts || 0) - (post.hearts || 0));
          s.meToo = Math.max(0, (s.meToo || 0) - (post.meToo || 0));
        }
        circleData.stats = s;
      }
      updateCircleChrome();
      toast('Denúncia registrada. Obrigado por cuidar do Círculo.');
    } catch (err) {
      btn.disabled = false;
      toast(err.message || 'Não consegui registrar a denúncia.');
    }
  }

  async function deleteCirclePost(btn) {
    const id = btn.dataset.id;
    if (!confirm('Apagar seu desabafo? Não dá para desfazer.')) return;
    btn.disabled = true;
    try {
      await CIRCLE.remove(id);
      const post = circleData.posts.find(p => p.id === id);
      const removedComments = post ? (post.comments || []).filter(c => !c.hidden).length : 0;
      circleData.posts = circleData.posts.filter(p => p.id !== id);
      const s = circleStats();
      s.posts = Math.max(0, (s.posts || 0) - 1);
      s.comments = Math.max(0, (s.comments || 0) - removedComments);
      if (post) {
        s.hearts = Math.max(0, (s.hearts || 0) - (post.hearts || 0));
        s.meToo = Math.max(0, (s.meToo || 0) - (post.meToo || 0));
        if (removedComments === 0) s.unanswered = Math.max(0, (s.unanswered || 0) - 1);
      }
      circleData.stats = s;
      updateCircleChrome();
      toast('Desabafo apagado.');
    } catch (err) {
      btn.disabled = false;
      toast(err.message || 'Não consegui apagar agora.');
    }
  }

  async function markCirclePresence() {
    try {
      const res = await CIRCLE.presence();
      const s = circleStats();
      s.presence = res.count;
      circleData.stats = s;
      updateCircleChrome();
      toast('Você não está sozinho. Obrigado por estar aqui.');
    } catch (err) {
      toast(err.message || 'Não consegui registrar sua presença.');
    }
  }

  function updateCircleIdentityUI() {
    $$('.circle-identity [data-identity]').forEach(b => b.classList.toggle('is-active', b.dataset.identity === circleIdentity));
    const wrap = $('#circle-name-wrap');
    if (wrap) wrap.hidden = circleIdentity !== 'named';
  }

  let savedScroll = 0;
  function render(keepScroll = false) {
    savedScroll = keepScroll ? window.scrollY : 0;
    if (activeObserver) { activeObserver.disconnect(); activeObserver = null; }

    const raw = location.hash.replace(/^#\/?/, '') || 'hoje';
    const parts = raw.split('/');
    const page = parts[0] || 'hoje';

    let html = '';
    if (page === 'tirinhas') html = screenTirinhas();
    else if (page === 'tirinha') html = screenComic(parts[1]);
    else if (page === 'licoes') html = screenLicoes();
    else if (page === 'licao') html = screenLicao(parts[1]);
    else if (page === 'pausas') html = screenPausas();
    else if (page === 'circulo') html = screenCircle();
    else if (page === 'meu') html = screenMeu();
    else html = screenHoje();

    view.innerHTML = html;
    setActiveTab(page);
    applyTheme();

    if (keepScroll) requestAnimationFrame(() => window.scrollTo(0, savedScroll));
    else window.scrollTo(0, 0);

    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      view.animate(
        [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }],
        { duration: 320, easing: 'cubic-bezier(.2,.7,.3,1)' }
      );
    }

    if (page === 'tirinha') observeComicEnd(parts[1]);
    if (page === 'licao') markLessonSeen(parts[1]);
    if (page === 'meu' && meuTab === 'diario' && diaryQuery) applyDiaryFilter();
    if (page === 'circulo') setTimeout(() => loadCircle(false), 0);
  }

  function rerenderKeepScroll() {
    const y = window.scrollY;
    render(true);
    requestAnimationFrame(() => window.scrollTo(0, y));
  }

  function setActiveTab(page) {
    const map = { tirinha: 'tirinhas', licao: 'licoes' };
    const active = map[page] || page;
    $$('.tab').forEach(t => {
      const on = t.dataset.route === active;
      t.classList.toggle('is-active', on);
      if (on) t.setAttribute('aria-current', 'page');
      else t.removeAttribute('aria-current');
    });
  }

  /* ---------------- telas ---------------- */

  function screenHoje() {
    const comic = COMICS[dailyIndex(COMICS.length)];
    const lesson = CONTENT.lessons[dailyIndex(CONTENT.lessons.length)];
    const pause = CONTENT.pauses[dailyIndex(CONTENT.pauses.length)];
    const quote = CONTENT.quotes[dailyIndex(CONTENT.quotes.length)];
    const name = state.settings.name ? `, ${esc(state.settings.name)}` : '';
    const streakN = streak();

    return `
      <section class="hero">
        <p class="eyebrow">${esc(cap(longFmt.format(new Date())))}</p>
        <h1>${greeting()}${name}.</h1>
        <p class="lead">A vida não começa depois do trabalho. Ela está acontecendo agora — inclusive neste minuto.</p>
        ${streakN > 1 ? `<p class="small muted" style="margin-top:10px">Você já parou ${streakN} dias seguidos. Que bom ter você aqui.</p>` : ''}
      </section>

      <a class="daily" href="#tirinha/${comic.id}">
        <div class="comic-cover">${COMICART.render(comic.cover)}</div>
        <div class="daily-body">
          <span class="badge">${ICON.sparkle} Tirinha do dia</span>
          <h2>${esc(comic.title)}</h2>
          <p class="sub">${esc(comic.subtitle)}</p>
          <p>${esc(comic.intro)}</p>
          <span class="daily-cta">Ler a tirinha ${ICON.arrowRight}</span>
        </div>
      </a>

      <div class="home-grid">
        <button class="card practice-teaser" type="button" data-action="start-pause" data-id="${pause.id}">
          <span class="teaser-ico">${ICON[pause.icon] || ICON.wind}</span>
          <div>
            <h3>${esc(pause.title)}</h3>
            <p>${esc(pause.subtitle)} · ${pause.minutes} min</p>
          </div>
          <span class="link">Começar a pausa</span>
        </button>

        <a class="card practice-teaser" href="#licao/${lesson.id}">
          <span class="teaser-ico">${ICON.compass}</span>
          <div>
            <h3>${esc(lesson.title)}</h3>
            <p>${esc(lesson.summary)}</p>
          </div>
          <span class="link">Ler a lição</span>
        </a>
      </div>

      <section class="circle-teaser">
        <div class="circle-teaser-mark">${ICON.users}</div>
        <div class="circle-teaser-body">
          <p class="eyebrow">Círculo · apoio entre pessoas</p>
          <h2>Você não está sozinho.</h2>
          <p>Se o futuro está pesando — uma entrevista, uma conta, uma conversa — escreva. Alguém pode estar sentindo o mesmo agora.</p>
          <div class="circle-teaser-actions">
            <a class="btn btn-primary btn-sm" href="#circulo">Entrar no Círculo</a>
            <a class="link" href="#licao/futuro">Ler: o futuro não se resolve hoje</a>
          </div>
        </div>
      </section>

      <div class="section-head">
        <h2 class="section-title">Um pensamento</h2>
        <a class="link" href="#tirinhas">Ver todas as tirinhas</a>
      </div>
      <article class="card">
        <p class="mini-quote">“${esc(quote.text)}”</p>
        <p class="muted small" style="margin-top:10px">— ${esc(quote.author)}, ${esc(quote.source)}</p>
      </article>

      <div class="support">
        <span class="support-ico">${ICON.lifebuoy}</span>
        <div>
          <h3>Se hoje está pesado demais</h3>
          <p>Você não precisa dar conta sozinho. O CVV atende 24h, de graça e em sigilo: <a href="tel:188">188</a> · <a href="https://www.cvv.org.br" target="_blank" rel="noopener">cvv.org.br</a>. Em emergência, procure o serviço de saúde mais próximo.</p>
        </div>
      </div>
    `;
  }

  function comicCard(comic) {
    const fav = favorite(comic.id);
    return `
      <div class="comic-wrap">
        <a class="comic-card" href="#tirinha/${comic.id}">
          <div class="comic-cover">${COMICART.render(comic.cover)}</div>
          <div class="comic-card-body">
            <h3>${esc(comic.title)}</h3>
            <span class="sub">${esc(comic.subtitle)}</span>
            <div class="comic-card-foot">
              <span class="read-time">${ICON.clock} ${comic.minutes} min de leitura</span>
              <span class="badge">${esc(themeLabel(comic.themes[0]))}</span>
            </div>
          </div>
        </a>
        <button class="fav-btn ${fav ? 'is-fav' : ''}" type="button" data-action="toggle-fav" data-id="${comic.id}"
          aria-pressed="${fav}" aria-label="${fav ? 'Remover das salvas' : 'Salvar tirinha'}">${fav ? ICON.heartFilled : ICON.heart}</button>
      </div>
    `;
  }

  let comicFilter = 'todas';

  function screenTirinhas() {
    const usedThemes = [...new Set(COMICS.flatMap(c => c.themes))];
    const filtered = comicFilter === 'todas' ? COMICS : COMICS.filter(c => c.themes.includes(comicFilter));

    return `
      <section class="hero">
        <p class="eyebrow">Biblioteca</p>
        <h1>Tirinhas</h1>
        <p class="lead">Histórias antigas para um mundo que não para. Cada uma cabe em poucos minutos e fica para depois.</p>
      </section>

      <div class="theme-filter" role="group" aria-label="Filtrar por tema">
        <button class="chip ${comicFilter === 'todas' ? 'is-active' : ''}" type="button" data-action="filter-comics" data-theme="todas">Todas</button>
        ${usedThemes.map(t => `<button class="chip ${comicFilter === t ? 'is-active' : ''}" type="button" data-action="filter-comics" data-theme="${t}">${esc(themeLabel(t))}</button>`).join('')}
      </div>

      <div class="comic-grid" id="comic-grid">
        ${filtered.map(comicCard).join('')}
      </div>

      ${filtered.length === 0 ? `<div class="empty" style="margin-top:16px"><h3>Nada por aqui ainda</h3><p>Escolha outro tema.</p></div>` : ''}
    `;
  }

  let activeObserver = null;

  function screenComic(id) {
    const comic = COMICS.find(c => c.id === id);
    if (!comic) return notFound('Essa tirinha não existe.', '#tirinhas');

    const lesson = CONTENT.lessons.find(l => l.comic === comic.id);
    const idx = COMICS.indexOf(comic);
    const next = COMICS[(idx + 1) % COMICS.length];
    const fav = favorite(comic.id);

    const panels = comic.panels.map(p => `
      <figure class="comic-panel">
        <div class="panel-art">
          ${COMICART.render(p)}
          ${p.narration ? `<div class="panel-caption">${esc(p.narration)}</div>` : ''}
          ${(p.bubbles || []).map(b => `
            <div class="bubble ${esc(b.pos || 'left')}">
              ${b.who ? `<span class="who">${esc(b.who)}</span>` : ''}
              ${esc(b.text)}
            </div>`).join('')}
        </div>
      </figure>
    `).join('');

    return `
      <div class="reader">
        <div class="reader-top">
          <a class="back-link" href="#tirinhas">${ICON.arrowLeft} Todas as tirinhas</a>
          <button class="icon-round ${fav ? 'is-fav' : ''}" type="button" data-action="toggle-fav" data-id="${comic.id}"
            aria-pressed="${fav}" aria-label="${fav ? 'Remover das salvas' : 'Salvar tirinha'}">${fav ? ICON.heartFilled : ICON.heart}</button>
        </div>

        <header class="reader-head">
          <p class="eyebrow">${esc(comic.source)}</p>
          <h1>${esc(comic.title)}</h1>
          <p class="sub">${esc(comic.subtitle)}</p>
          <div class="reader-meta">
            <span class="badge">${esc(themeLabel(comic.themes[0]))}</span>
            <span>${comic.panels.length} painéis</span>
            <span>·</span>
            <span>${comic.minutes} min</span>
          </div>
        </header>

        <p class="muted" style="font-size:15px;max-width:56ch">${esc(comic.intro)}</p>

        <div class="comic-strip" id="comic-strip">${panels}</div>

        <section class="comic-end" id="comic-end">
          <div class="lesson-block">
            <p class="eyebrow">A lição</p>
            <h2>${esc(comic.lesson.title)}</h2>
            ${comic.lesson.text.map(t => `<p>${esc(t)}</p>`).join('')}
            <div class="quote-line">
              “${esc(comic.quote.text)}”
              <span>— ${esc(comic.quote.author)}, ${esc(comic.quote.source)}</span>
            </div>
            <div class="reader-actions">
              <button class="btn btn-primary" type="button" data-action="write-comic" data-id="${comic.id}">Escrever uma linha</button>
              ${lesson ? `<a class="btn btn-ghost" href="#licao/${lesson.id}">Ver a lição completa</a>` : ''}
            </div>
          </div>

          <a class="reader-next" href="#tirinha/${next.id}">
            <div>
              <span class="label">Próxima tirinha</span>
              <strong>${esc(next.title)}</strong>
            </div>
            ${ICON.arrowRight}
          </a>
        </section>
      </div>
    `;
  }

  function observeComicEnd(id) {
    const target = $('#comic-end');
    if (!target) return;
    if (!('IntersectionObserver' in window)) { markComicRead(id); return; }
    activeObserver = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) {
        markComicRead(id);
        activeObserver.disconnect();
        activeObserver = null;
      }
    }, { threshold: 0.25 });
    activeObserver.observe(target);
  }

  function markComicRead(id) {
    if (state.readComics.includes(id)) return;
    state.readComics.push(id);
    state.readLessons = state.readLessons || [];
    touchActivity();
    save();
    toast('Tirinha lida. Que ela fique com você.');
  }

  let lessonFilter = 'todas';

  function screenLicoes() {
    return `
      <section class="hero">
        <p class="eyebrow">Para o dia a dia</p>
        <h1>Lições de vida</h1>
        <p class="lead">Ideias antigas para problemas bem atuais: trabalhar demais, comparar demais, descansar de menos.</p>
      </section>

      <div class="lesson-grid">
        ${CONTENT.lessons.map(l => {
          const done = (state.checks[l.id] || []).length > 0;
          return `
            <a class="lesson-card ${done ? 'is-done' : ''}" href="#licao/${l.id}">
              <span class="badge">${esc(themeLabel(l.theme))}</span>
              <h3>${esc(l.title)}</h3>
              <p>${esc(l.summary)}</p>
              <div class="lesson-foot">
                <span class="tiny muted">${l.minutes} min · ${(state.checks[l.id] || []).length}/${l.actions.length} passos</span>
                <span class="arrow">${done ? ICON.check : ICON.arrowRight}</span>
              </div>
            </a>`;
        }).join('')}
      </div>
    `;
  }

  function screenLicao(id) {
    const lesson = CONTENT.lessons.find(l => l.id === id);
    if (!lesson) return notFound('Essa lição não existe.', '#licoes');
    const comic = COMICS.find(c => c.id === lesson.comic);
    const checks = state.checks[id] || [];

    return `
      <div class="reader">
        <a class="back-link" href="#licoes">${ICON.arrowLeft} Todas as lições</a>

        <header class="lesson-page-head">
          <p class="eyebrow">${esc(themeLabel(lesson.theme))} · ${lesson.minutes} min</p>
          <h1>${esc(lesson.title)}</h1>
          <p class="muted">${esc(lesson.summary)}</p>
        </header>

        <div class="lesson-reading">
          ${lesson.reading.map(p => `<p>${esc(p)}</p>`).join('')}
        </div>

        <div class="actions-block">
          <h2>Para fazer hoje</h2>
          <ul class="action-list">
            ${lesson.actions.map((a, i) => {
              const done = checks.includes(i);
              return `<li>
                <button class="action-item ${done ? 'is-done' : ''}" type="button" data-action="toggle-check" data-lesson="${lesson.id}" data-index="${i}" aria-pressed="${done}">
                  <span class="box">${ICON.check}</span>
                  <span class="action-text">${esc(a)}</span>
                </button>
              </li>`;
            }).join('')}
          </ul>
        </div>

        ${comic ? `
          <a class="related-comic" href="#tirinha/${comic.id}">
            <div class="comic-cover">${COMICART.render(comic.cover)}</div>
            <div>
              <span class="related-label">A história por trás desta lição</span>
              <strong>${esc(comic.title)}</strong>
            </div>
            ${ICON.arrowRight}
          </a>` : ''}

        <div class="lesson-block" style="margin-top:8px">
          <p class="eyebrow">Se quiser escrever</p>
          <p style="font-size:15.5px;color:var(--ink);margin-bottom:16px">${esc(lesson.actions[0])}</p>
          <button class="btn btn-primary" type="button" data-action="write-lesson" data-id="${lesson.id}">Escrever sobre isso</button>
        </div>

        <div class="support">
          <span class="support-ico">${ICON.lifebuoy}</span>
          <div>
            <h3>Se estiver difícil demais</h3>
            <p>Falar com alguém é coragem, não fraqueza. CVV: <a href="tel:188">188</a> (24h, gratuito).</p>
          </div>
        </div>
      </div>
    `;
  }

  function markLessonSeen(id) {
    if (!id) return;
    if (!state.readLessons.includes(id)) {
      state.readLessons.push(id);
      save();
    }
  }

  function screenPausas() {
    return `
      <section class="hero">
        <p class="eyebrow">Alguns minutos</p>
        <h1>Pausas</h1>
        <p class="lead">Descansar não é recompensa por produtividade. É parte de continuar vivo e presente.</p>
      </section>

      <div class="pause-grid">
        ${CONTENT.pauses.map(p => `
          <article class="pause-card">
            <span class="practice-ico">${ICON[p.icon] || ICON.wind}</span>
            <h3>${esc(p.title)}</h3>
            <span class="pause-sub">${esc(p.subtitle)}</span>
            <p>${esc(p.description)}</p>
            <div class="practice-foot" style="width:100%">
              <span class="practice-time">${ICON.clock} ${p.minutes} min</span>
              <button class="btn btn-soft btn-sm" type="button" data-action="start-pause" data-id="${p.id}">Começar</button>
            </div>
          </article>
        `).join('')}
      </div>

      <div class="support">
        <span class="support-ico">${ICON.lifebuoy}</span>
        <div>
          <h3>Pausa não é tratamento</h3>
          <p>Se a ansiedade ou a tristeza não passam, procure um profissional. CVV: <a href="tel:188">188</a> · <a href="https://www.cvv.org.br" target="_blank" rel="noopener">cvv.org.br</a>.</p>
        </div>
      </div>
    `;
  }

  /* ---------------- meu espaço ---------------- */

  let meuTab = 'diario';
  let diaryQuery = '';

  function screenMeu() {
    const name = state.settings.name ? `, ${esc(state.settings.name)}` : '';
    const last14 = [];
    for (let i = 13; i >= 0; i--) {
      const d = addDays(new Date(), -i);
      last14.push({ d, key: dayKey(d), count: state.activity[dayKey(d)] || 0 });
    }
    const max = Math.max(1, ...last14.map(x => x.count));
    const hasActivity = last14.some(x => x.count > 0);

    const entries = state.entries.slice().sort((a, b) => b.ts - a.ts);
    const favComics = state.favorites.map(id => COMICS.find(c => c.id === id)).filter(Boolean);

    return `
      <section class="meu-head">
        <p class="eyebrow">Seu canto</p>
        <h1>Meu espaço${name}</h1>
        <p>Tudo o que você escreve e salva fica só neste aparelho.</p>
      </section>

      <div class="stats-grid">
        <div class="stat"><div class="stat-num">${streak()}<small>${streak() === 1 ? 'dia' : 'dias'}</small></div><div class="stat-label">Sequência</div></div>
        <div class="stat"><div class="stat-num">${state.readComics.length}<small>/${COMICS.length}</small></div><div class="stat-label">Tirinhas lidas</div></div>
        <div class="stat"><div class="stat-num">${state.sessions.length}</div><div class="stat-label">Pausas feitas</div></div>
        <div class="stat"><div class="stat-num">${state.entries.length}</div><div class="stat-label">Reflexões</div></div>
      </div>

      ${hasActivity ? `
        <div class="card" style="margin-bottom:22px">
          <p class="eyebrow">Últimos 14 dias</p>
          <div class="chart">
            ${last14.map(x => `
              <div class="chart-col ${x.key === dayKey() ? 'is-today' : ''}">
                <div class="chart-track"><div class="chart-bar" style="height:${Math.max(4, Math.round((x.count / max) * 100))}%"></div></div>
                <span class="chart-label">${esc(weekdayFmt.format(x.d).charAt(0))}</span>
              </div>`).join('')}
          </div>
        </div>` : ''}

      <div class="seg-tabs" role="tablist">
        <button type="button" role="tab" aria-selected="${meuTab === 'diario'}" class="${meuTab === 'diario' ? 'is-active' : ''}" data-action="meu-tab" data-tab="diario">Diário</button>
        <button type="button" role="tab" aria-selected="${meuTab === 'salvos'}" class="${meuTab === 'salvos' ? 'is-active' : ''}" data-action="meu-tab" data-tab="salvos">Salvos</button>
      </div>

      ${meuTab === 'diario' ? `
        <div class="filter-bar">
          <input class="input search" id="diary-search" type="search" placeholder="Buscar nas suas reflexões…" value="${esc(diaryQuery)}">
          <button class="btn btn-primary" type="button" data-action="new-entry">Nova reflexão</button>
        </div>

        ${entries.length ? `
          <div class="entry-list" id="entry-list">
            ${entries.map(entryHTML).join('')}
          </div>
          <p class="empty" id="diary-filter-empty" hidden><strong>Nada encontrado.</strong><br>Tente outra palavra.</p>
        ` : `
          <div class="empty">
            <div class="empty-ico">${ICON.book}</div>
            <h3>Uma linha já basta</h3>
            <p>O que passou pela sua cabeça hoje? Escreva sem compromisso — ninguém vai ler.</p>
            <button class="btn btn-primary" type="button" data-action="new-entry">Começar</button>
          </div>
        `}
      ` : `
        ${favComics.length ? `
          <div class="saved-grid">
            ${favComics.map(c => `
              <a class="saved-item" href="#tirinha/${c.id}">
                <div class="comic-cover">${COMICART.render(c.cover)}</div>
                <div><strong>${esc(c.title)}</strong><span>${esc(c.subtitle)}</span></div>
              </a>`).join('')}
          </div>
        ` : `
          <div class="empty">
            <div class="empty-ico">${ICON.bookmark}</div>
            <h3>Nenhuma tirinha salva</h3>
            <p>Toque no coração de uma tirinha para encontrá-la aqui depois.</p>
            <a class="btn btn-primary" href="#tirinhas">Ver tirinhas</a>
          </div>
        `}
      `}

      <div class="btn-row" style="margin-top:24px">
        <button class="btn btn-ghost" type="button" id="btn-settings-2">Ajustes e backup</button>
      </div>

      <div class="support">
        <span class="support-ico">${ICON.lifebuoy}</span>
        <div>
          <h3>Você não precisa dar conta sozinho</h3>
          <p>Se o peso ficar grande, fale com alguém de confiança ou ligue para o CVV: <a href="tel:188">188</a> (24h, gratuito, sigiloso).</p>
        </div>
      </div>
    `;
  }

  function applyDiaryFilter() {
    const input = $('#diary-search');
    if (!input) return;
    const q = input.value.trim().toLowerCase();
    let visible = 0;
    $$('.entry').forEach(el => {
      const match = !q || (el.dataset.search || '').includes(q);
      el.hidden = !match;
      if (match) visible++;
    });
    const empty = $('#diary-filter-empty');
    if (empty) empty.hidden = visible > 0;
  }


  function entryHTML(e) {
    const emo = emotion(e.emotion);
    const themes = (e.themes || []).map(t => `<span class="pill">${esc(themeLabel(t))}</span>`).join('');
    const search = `${e.text} ${emo ? emo.label : ''} ${(e.themes || []).map(themeLabel).join(' ')}`.toLowerCase();
    return `
      <article class="entry" data-search="${esc(search)}">
        <div class="entry-head">
          <span class="entry-date">${esc(monthFmt.format(new Date(e.ts)))}</span>
          ${emo ? `<span class="pill"><span class="dot" style="width:7px;height:7px;border-radius:50%;background:${emo.color};display:inline-block"></span>${esc(emo.label)}</span>` : ''}
          <div class="entry-actions">
            <button class="icon-btn" type="button" data-action="edit-entry" data-id="${e.id}" aria-label="Editar reflexão">${ICON.edit}</button>
            <button class="icon-btn danger" type="button" data-action="delete-entry" data-id="${e.id}" aria-label="Apagar reflexão">${ICON.trash}</button>
          </div>
        </div>
        <p class="entry-text">${esc(e.text)}</p>
        ${e.seed && e.seed.text ? `<div class="entry-quote">“${esc(e.seed.text)}”${e.seed.meta ? ` — ${esc(e.seed.meta)}` : ''}</div>` : ''}
        ${themes ? `<div class="entry-themes">${themes}</div>` : ''}
      </article>
    `;
  }

  function notFound(msg, back) {
    return `<div class="empty" style="margin-top:30px">
      <h3>Não encontrado</h3>
      <p>${esc(msg)}</p>
      <a class="btn btn-ghost" href="${back}">Voltar</a>
    </div>`;
  }

  /* ---------------- compositor ---------------- */

  const composer = $('#composer');
  const composerTitle = $('#composer-title');
  const composerEyebrow = $('#composer-eyebrow');
  const entryText = $('#entry-text');
  const seedBox = $('#composer-seed');
  const seedText = $('#seed-text');
  const seedMeta = $('#seed-meta');
  const seedPrompt = $('#seed-prompt');
  const emotionChips = $('#emotion-chips');
  const themeChips = $('#theme-chips');
  const charCount = $('#char-count');

  let editingId = null;
  let selectedEmotion = null;
  let selectedThemes = [];
  let currentSeed = null;

  function renderComposerChips() {
    emotionChips.innerHTML = CONTENT.emotions.map(e => `
      <button class="chip ${selectedEmotion === e.id ? 'is-active' : ''}" type="button" data-emotion="${e.id}" aria-pressed="${selectedEmotion === e.id}">
        <span class="dot" style="--dot:${e.color}"></span>${esc(e.label)}
      </button>`).join('');

    themeChips.innerHTML = CONTENT.themes.map(t => `
      <button class="chip ${selectedThemes.includes(t.id) ? 'is-active' : ''}" type="button" data-theme-chip="${t.id}" aria-pressed="${selectedThemes.includes(t.id)}">
        ${esc(t.label)}
      </button>`).join('');
  }

  function updateCharCount() {
    const n = entryText.value.length;
    charCount.textContent = `${n} ${n === 1 ? 'caractere' : 'caracteres'}`;
  }

  function openComposer(opts = {}) {
    editingId = opts.entryId || null;
    currentSeed = opts.seed || null;
    selectedEmotion = opts.emotion || null;
    selectedThemes = opts.themes ? opts.themes.slice() : [];

    entryText.value = opts.text || '';
    updateCharCount();

    composerTitle.textContent = editingId ? 'Editar reflexão' : 'Sua reflexão';
    composerEyebrow.textContent = editingId ? 'Editando' : 'Nova entrada';

    if (currentSeed) {
      const hasSeed = !!(currentSeed.text || currentSeed.meta);
      seedBox.hidden = !hasSeed;
      seedText.textContent = currentSeed.text ? `“${currentSeed.text}”` : '';
      seedMeta.textContent = currentSeed.meta || '';
      seedText.hidden = !currentSeed.text;
      seedMeta.hidden = !currentSeed.meta;
      seedPrompt.hidden = !currentSeed.prompt;
      seedPrompt.textContent = currentSeed.prompt || '';
    } else {
      seedBox.hidden = true;
      seedPrompt.hidden = true;
    }

    renderComposerChips();
    composer.showModal();
    setTimeout(() => entryText.focus(), 80);
  }

  function closeComposer() {
    composer.close();
  }

  function saveEntry() {
    const text = entryText.value.trim();
    if (!text) {
      toast('Escreva ao menos uma linha.');
      entryText.focus();
      return;
    }

    if (editingId) {
      const e = state.entries.find(x => x.id === editingId);
      if (e) {
        e.text = text;
        e.emotion = selectedEmotion;
        e.themes = selectedThemes.slice();
        e.seed = currentSeed;
        e.editedAt = Date.now();
      }
    } else {
      state.entries.unshift({
        id: uid(),
        ts: Date.now(),
        text,
        emotion: selectedEmotion,
        themes: selectedThemes.slice(),
        seed: currentSeed
      });
      touchActivity();
    }

    save();
    closeComposer();
    toast(editingId ? 'Reflexão atualizada.' : 'Guardado. Obrigado por escrever.');
    editingId = null;
    render(true);
  }

  /* ---------------- ações ---------------- */

  document.addEventListener('click', (ev) => {
    const btn = ev.target.closest('[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;

    if (action === 'toggle-fav') {
      const id = btn.dataset.id;
      const i = state.favorites.indexOf(id);
      if (i >= 0) { state.favorites.splice(i, 1); toast('Removida das salvas.'); }
      else { state.favorites.push(id); toast('Salva para depois.'); }
      save();
      rerenderKeepScroll();
    }

    if (action === 'filter-comics') {
      comicFilter = btn.dataset.theme;
      render(true);
    }

    if (action === 'new-entry') openComposer();

    if (action === 'write-comic') {
      const comic = COMICS.find(c => c.id === btn.dataset.id);
      if (!comic) return;
      openComposer({
        seed: {
          text: comic.quote.text,
          meta: `${comic.quote.author} · ${comic.quote.source}`,
          prompt: 'O que essa história fez você perceber sobre a sua própria vida?'
        },
        themes: comic.themes.slice(0, 2)
      });
    }

    if (action === 'write-lesson') {
      const lesson = CONTENT.lessons.find(l => l.id === btn.dataset.id);
      if (!lesson) return;
      openComposer({
        seed: { prompt: lesson.actions[0] || lesson.summary },
        themes: [lesson.theme]
      });
    }

    if (action === 'edit-entry') {
      const e = state.entries.find(x => x.id === btn.dataset.id);
      if (!e) return;
      openComposer({
        entryId: e.id, text: e.text, emotion: e.emotion,
        themes: e.themes || [], seed: e.seed || null
      });
    }

    if (action === 'delete-entry') {
      const e = state.entries.find(x => x.id === btn.dataset.id);
      if (!e) return;
      if (confirm('Apagar esta reflexão? Não dá para desfazer.')) {
        state.entries = state.entries.filter(x => x.id !== e.id);
        save();
        render(true);
        toast('Reflexão apagada.');
      }
    }

    if (action === 'toggle-check') {
      const lessonId = btn.dataset.lesson;
      const index = Number(btn.dataset.index);
      const list = state.checks[lessonId] || [];
      const at = list.indexOf(index);
      if (at >= 0) list.splice(at, 1);
      else { list.push(index); touchActivity(); }
      state.checks[lessonId] = list;
      save();
      rerenderKeepScroll();
    }

    if (action === 'meu-tab') {
      meuTab = btn.dataset.tab;
      render(true);
    }

    if (action === 'start-pause') {
      openPause(btn.dataset.id);
    }

    if (action === 'circle-focus') {
      const box = $('#circle-composer');
      if (box) box.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => { const ta = $('#circle-text'); if (ta) ta.focus(); }, 250);
    }

    if (action === 'circle-identity') {
      circleIdentity = btn.dataset.identity === 'named' ? 'named' : 'anon';
      CIRCLE.setIdentity(circleIdentity);
      updateCircleIdentityUI();
      if (circleIdentity === 'named') setTimeout(() => { const n = $('#circle-name'); if (n) n.focus(); }, 50);
    }

    if (action === 'circle-draft-mood') {
      const m = btn.dataset.mood;
      circleDraftMood = circleDraftMood === m ? null : m;
      $$('.circle-mood-row [data-mood]').forEach(b => {
        const on = b.dataset.mood === circleDraftMood;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', on);
      });
    }

    if (action === 'circle-publish') publishCirclePost();

    if (action === 'circle-private') {
      const ta = $('#circle-text');
      const text = ta ? ta.value.trim() : '';
      if (!text) {
        toast('Escreva uma frase primeiro.');
        if (ta) ta.focus();
        return;
      }
      openComposer({
        text,
        seed: { prompt: 'Do Círculo — guardado só para você. Ninguém mais vê.' },
        themes: ['saude']
      });
    }

    if (action === 'circle-react') reactCircle(btn);

    if (action === 'circle-comment') addCircleComment(btn);

    if (action === 'circle-expand') {
      const id = btn.dataset.id;
      if (circleExpanded.has(id)) circleExpanded.delete(id);
      else circleExpanded.add(id);
      updateCircleChrome();
    }

    if (action === 'circle-report') reportCircle(btn);
    if (action === 'circle-report-comment') reportCircle(btn);
    if (action === 'circle-delete') deleteCirclePost(btn);

    if (action === 'circle-presence') markCirclePresence();

    if (action === 'circle-sort') {
      circleSort = btn.dataset.sort || 'recent';
      circleData.loadedAt = 0;
      updateCircleChrome();
      loadCircle(true);
    }

    if (action === 'circle-mood-filter') {
      circleMood = btn.dataset.mood || 'todas';
      circleData.loadedAt = 0;
      updateCircleChrome();
      loadCircle(true);
    }

    if (action === 'circle-refresh') {
      circleData.loadedAt = 0;
      loadCircle(true);
      toast('Atualizando o Círculo…');
    }

    if (action === 'open-help') {
      const d = $('#help-now');
      if (d && d.showModal) d.showModal();
    }

    if (action === 'close-runner') closeRunner();
    if (action === 'runner-next') runnerNext();
    if (action === 'runner-back') runnerBack();
    if (action === 'timer-toggle') timerToggle();
    if (action === 'timer-restart') timerRestart();
  });

  // chips do compositor
  emotionChips.addEventListener('click', (ev) => {
    const chip = ev.target.closest('[data-emotion]');
    if (!chip) return;
    const id = chip.dataset.emotion;
    selectedEmotion = selectedEmotion === id ? null : id;
    renderComposerChips();
  });

  themeChips.addEventListener('click', (ev) => {
    const chip = ev.target.closest('[data-theme-chip]');
    if (!chip) return;
    const id = chip.dataset.themeChip;
    const i = selectedThemes.indexOf(id);
    if (i >= 0) selectedThemes.splice(i, 1);
    else selectedThemes.push(id);
    renderComposerChips();
  });

  entryText.addEventListener('input', updateCharCount);

  $('#btn-save-entry').addEventListener('click', saveEntry);

  $$('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const d = document.getElementById(btn.dataset.close);
      if (d) d.close();
    });
  });

  composer.addEventListener('close', () => { editingId = null; });

  // enter com Ctrl/Cmd salva
  composer.addEventListener('keydown', (ev) => {
    if ((ev.ctrlKey || ev.metaKey) && ev.key === 'Enter') saveEntry();
  });

  // search do diário sem re-render
  view.addEventListener('input', (ev) => {
    if (ev.target.id === 'diary-search') {
      diaryQuery = ev.target.value;
      applyDiaryFilter();
    }
    if (ev.target.id === 'circle-text') {
      const n = ev.target.value.length;
      const count = $('#circle-count');
      if (count) count.textContent = `${n}/1200`;
      updateCircleWarning(ev.target.value);
    }
  });

  // ajustes
  const settings = $('#settings');
  $('#btn-settings').addEventListener('click', openSettings);
  document.addEventListener('click', (ev) => {
    if (ev.target.id === 'btn-settings-2') openSettings();
  });

  const helpSettingsBtn = $('#btn-help-settings');
  if (helpSettingsBtn) {
    helpSettingsBtn.addEventListener('click', () => {
      const d = $('#help-now');
      if (d && d.showModal) d.showModal();
    });
  }

  function openSettings() {
    $('#setting-name').value = state.settings.name || '';
    $$('.segmented [data-theme]').forEach(b => b.classList.toggle('is-active', b.dataset.theme === state.settings.theme));
    settings.showModal();
  }

  $('#setting-name').addEventListener('change', (ev) => {
    state.settings.name = ev.target.value.trim();
    save();
    render(true);
  });

  $$('.segmented [data-theme]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.settings.theme = btn.dataset.theme;
      save();
      $$('.segmented [data-theme]').forEach(b => b.classList.toggle('is-active', b === btn));
      applyTheme();
    });
  });

  $('#btn-export').addEventListener('click', () => {
    const data = { app: 'agora', exportedAt: new Date().toISOString(), ...state };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agora-backup-${dayKey()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    toast('Backup baixado.');
  });

  $('#btn-import').addEventListener('click', () => $('#import-file').click());

  $('#import-file').addEventListener('change', async (ev) => {
    const file = ev.target.files && ev.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (!data || !Array.isArray(data.entries)) throw new Error('formato');
      if (!confirm('Importar este backup? Ele substitui os dados atuais deste aparelho.')) return;
      const base = defaultState();
      state = {
        ...base,
        ...data,
        settings: { ...base.settings, ...(data.settings || {}) },
        entries: data.entries || [],
        sessions: data.sessions || [],
        favorites: data.favorites || [],
        readComics: data.readComics || [],
        readLessons: data.readLessons || [],
        checks: data.checks || {},
        activity: data.activity || {}
      };
      save();
      render(true);
      settings.close();
      toast('Backup importado.');
    } catch (err) {
      toast('Não consegui ler esse arquivo.');
    } finally {
      ev.target.value = '';
    }
  });

  $('#btn-reset').addEventListener('click', () => {
    if (!confirm('Apagar todas as reflexões, tirinhas salvas e práticas deste aparelho?')) return;
    localStorage.removeItem(STORE_KEY);
    localStorage.removeItem('agora.circle.local.v1');
    localStorage.removeItem('agora.circle.mine.v1');
    localStorage.removeItem('agora.circle.presence.v1');
    localStorage.removeItem('agora.circle.identity.v1');
    state = defaultState();
    circleData = { mode: null, posts: [], stats: null, loading: false, error: null, loadedAt: 0 };
    circleIdentity = 'anon';
    save();
    settings.close();
    render();
    toast('Dados apagados. Começando de novo.');
  });

  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', (ev) => {
    ev.preventDefault();
    deferredPrompt = ev;
    const row = $('#install-row');
    if (row) row.hidden = false;
  });
  $('#btn-install').addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    $('#install-row').hidden = true;
  });

  /* ---------------- tema ---------------- */

  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const mq = matchMedia('(prefers-color-scheme: dark)');

  function effectiveTheme() {
    return state.settings.theme === 'system'
      ? (mq.matches ? 'dark' : 'light')
      : state.settings.theme;
  }

  function applyTheme() {
    const t = effectiveTheme();
    document.documentElement.dataset.theme = t;
    const btn = $('#btn-theme');
    if (btn) {
      btn.innerHTML = t === 'dark' ? ICON.sun : ICON.moon;
      btn.setAttribute('aria-label', t === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro');
    }
    if (themeMeta) themeMeta.setAttribute('content', t === 'dark' ? '#121714' : '#f6f1e6');
  }

  $('#btn-theme').addEventListener('click', () => {
    state.settings.theme = effectiveTheme() === 'dark' ? 'light' : 'dark';
    save();
    applyTheme();
  });

  mq.addEventListener('change', () => {
    if (state.settings.theme === 'system') applyTheme();
  });

  /* ---------------- práticas guiadas ---------------- */

  let runner = null;

  function openPause(id) {
    const pause = CONTENT.pauses.find(p => p.id === id);
    if (!pause) return;
    runner = { pause, step: 0, answers: {}, interval: null, timer: null, orbScale: .82 };
    runnerEl.hidden = false;
    document.body.style.overflow = 'hidden';
    renderRunner();
    setTimeout(() => runnerEl.focus(), 50);
  }

  function closeRunner() {
    stopTimer();
    runner = null;
    runnerEl.hidden = true;
    document.body.style.overflow = '';
    const page = location.hash.replace(/^#\/?/, '').split('/')[0];
    if (page === 'meu' || page === 'hoje' || page === '') render(true);
  }

  function stopTimer() {
    if (runner && runner.interval) {
      clearInterval(runner.interval);
      runner.interval = null;
    }
    if (runner) { runner.timer = null; }
  }

  function stepHTML(step, pause) {
    if (step.type === 'intro') {
      return `<div class="step-area">
        <h3 class="step-title">${esc(step.title)}</h3>
        <p class="step-text">${esc(step.text)}</p>
      </div>`;
    }
    if (step.type === 'closing') {
      return `<div class="practice-done">
        <div class="done-mark">${ICON.check}</div>
        <h3 class="step-title">${esc(step.title)}</h3>
        <p class="step-text" style="margin:0 auto">${esc(step.text)}</p>
      </div>`;
    }
    if (step.type === 'prompt') {
      return `<div class="step-area">
        <h3 class="step-title">${esc(step.title)}</h3>
        ${step.hint ? `<p class="step-hint">${esc(step.hint)}</p>` : ''}
        <textarea class="input" data-step-input="1" rows="${step.rows || 4}" placeholder="${esc(step.placeholder || '')}">${esc(runner.answers[step.id] || '')}</textarea>
      </div>`;
    }
    if (step.type === 'scale') {
      const current = Number(runner.answers[step.id] || 0);
      return `<div class="step-area">
        <h3 class="step-title">${esc(step.title)}</h3>
        ${step.hint ? `<p class="step-hint">${esc(step.hint)}</p>` : ''}
        <div class="scale">
          ${[1, 2, 3, 4, 5].map(n => `<button type="button" class="${current === n ? 'is-active' : ''}" data-action="scale-pick" data-step="${step.id}" data-value="${n}" aria-pressed="${current === n}">${n}</button>`).join('')}
        </div>
        <div class="scale-labels">${(step.labels || ['Pouco', 'Médio', 'Muito']).map(l => `<span>${esc(l)}</span>`).join('')}</div>
      </div>`;
    }
    if (step.type === 'timer') {
      return `<div class="step-area">
        <h3 class="step-title">${esc(step.title)}</h3>
        <div class="breath-stage">
          <div class="orb-wrap">
            <div class="orb-ring"></div>
            <div class="orb ${step.mode === 'calm' ? 'calm' : ''}" id="breath-orb"><span id="orb-label">${step.mode === 'calm' ? 'Respire' : 'Prepare-se'}</span></div>
          </div>
          <div class="timer-display" id="timer-display">${formatSeconds(step.seconds)}</div>
          <div class="timer-actions">
            <button class="btn btn-ghost btn-sm" type="button" data-action="timer-toggle">Pausar</button>
            <button class="btn btn-ghost btn-sm" type="button" data-action="timer-restart">Reiniciar</button>
          </div>
        </div>
        <p class="calm-text" style="margin:18px auto 0">${esc(step.text || '')}</p>
      </div>`;
    }
    return '';
  }

  function formatSeconds(total) {
    const s = Math.max(0, Math.ceil(total));
    return `${pad(Math.floor(s / 60))}:${pad(s % 60)}`;
  }

  function renderRunner() {
    if (!runner) return;
    stopTimer();
    const { pause, step } = runner;
    const current = pause.steps[step];
    const total = pause.steps.length;

    $('#runner-title').textContent = pause.title;
    $('#runner-step').textContent = `Passo ${step + 1} de ${total}`;
    $('#runner-total').textContent = `${pause.minutes} min`;
    $('#runner-progress-bar').style.width = `${Math.round(((step + 1) / total) * 100)}%`;

    runnerBody.innerHTML = stepHTML(current, pause);
    runnerBody.scrollTop = 0;

    const isLast = step === total - 1;
    runnerFoot.innerHTML = `
      <button class="btn btn-ghost" type="button" data-action="runner-back" ${step === 0 ? 'hidden' : ''}>Voltar</button>
      <span class="spacer"></span>
      <button class="btn btn-primary" type="button" data-action="runner-next">${isLast ? 'Concluir' : step === 0 ? 'Começar' : 'Continuar'}</button>
    `;

    if (current.type === 'prompt') {
      setTimeout(() => {
        const ta = $('[data-step-input]', runnerBody);
        if (ta && !matchMedia('(max-width: 640px)').matches) ta.focus();
      }, 60);
    }

    if (current.type === 'timer') {
      requestAnimationFrame(() => startTimer(current));
    }

    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      runnerBody.animate(
        [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }],
        { duration: 280, easing: 'ease-out' }
      );
    }
  }

  function runnerNext() {
    if (!runner) return;
    const step = runner.pause.steps[runner.step];
    if (step.type === 'prompt') {
      const ta = $('[data-step-input]', runnerBody);
      if (ta) runner.answers[step.id] = ta.value;
    }
    if (runner.step >= runner.pause.steps.length - 1) {
      finishPractice();
      return;
    }
    runner.step++;
    renderRunner();
  }

  function runnerBack() {
    if (!runner || runner.step === 0) return;
    const step = runner.pause.steps[runner.step];
    if (step.type === 'prompt') {
      const ta = $('[data-step-input]', runnerBody);
      if (ta) runner.answers[step.id] = ta.value;
    }
    runner.step--;
    renderRunner();
  }

  function finishPractice() {
    if (!runner) return;
    const { pause, answers } = runner;
    state.sessions.push({
      id: uid(),
      pauseId: pause.id,
      ts: Date.now(),
      answers: { ...answers },
      minutes: pause.minutes
    });
    touchActivity();
    save();
    closeRunner();
    toast('Pausa registrada. Você parou por um instante.');
  }

  function startTimer(step) {
    stopTimer();
    const orb = $('#breath-orb');
    const label = $('#orb-label');
    const display = $('#timer-display');
    if (!display) return;

    const timer = {
      step,
      seconds: step.seconds,
      endAt: Date.now() + step.seconds * 1000,
      paused: false,
      done: false,
      phaseKey: null
    };
    runner.timer = timer;
    runner.orbScale = .82;

    if (step.mode === 'breath' && step.pattern && orb) {
      const phases = buildPhases(step.pattern);
      timer.phases = phases;
      setPhase(timer, phases[0], orb, label);
    }

    runner.interval = setInterval(() => {
      const t = runner.timer;
      if (!t || t.paused || t.done) return;
      const remaining = (t.endAt - Date.now()) / 1000;
      if (remaining <= 0) {
        display.textContent = '00:00';
        t.done = true;
        clearInterval(runner.interval);
        runner.interval = null;
        if (orb) { orb.classList.remove('calm'); orb.style.transitionDuration = '.6s'; orb.style.transform = 'scale(1)'; }
        if (label) label.textContent = 'Pronto';
        chime();
        return;
      }
      display.textContent = formatSeconds(remaining);

      if (t.phases && orb) {
        const elapsed = t.seconds - remaining;
        const cycle = t.phases.reduce((a, p) => a + p.dur, 0);
        let pos = elapsed % cycle;
        let phase = t.phases[0];
        for (const p of t.phases) {
          if (pos < p.dur) { phase = p; break; }
          pos -= p.dur;
        }
        if (phase.key !== t.phaseKey) setPhase(t, phase, orb, label);
      }
    }, 100);
  }

  function buildPhases(p) {
    const phases = [];
    if (p.in) phases.push({ key: 'in', label: 'Inspire', dur: p.in });
    if (p.hold) phases.push({ key: 'hold', label: 'Segure', dur: p.hold });
    if (p.out) phases.push({ key: 'out', label: 'Expire', dur: p.out });
    if (p.hold2) phases.push({ key: 'hold2', label: 'Segure', dur: p.hold2 });
    return phases;
  }

  function setPhase(timer, phase, orb, label) {
    timer.phaseKey = phase.key;
    if (label) label.textContent = phase.label;
    if (!orb) return;
    orb.classList.remove('calm');
    orb.style.transitionTimingFunction = 'ease-in-out';
    orb.style.transitionDuration = `${phase.dur}s`;
    if (phase.key === 'in') orb.style.transform = 'scale(1.12)';
    else if (phase.key === 'out') orb.style.transform = 'scale(.82)';
  }

  function timerToggle() {
    if (!runner || !runner.timer) return;
    const t = runner.timer;
    if (t.done) return;
    const display = $('#timer-display');
    const btn = $('[data-action="timer-toggle"]');
    if (!t.paused) {
      t.remaining = (t.endAt - Date.now()) / 1000;
      t.paused = true;
      if (btn) btn.textContent = 'Retomar';
      if (display) display.textContent = formatSeconds(t.remaining);
    } else {
      t.endAt = Date.now() + t.remaining * 1000;
      t.paused = false;
      if (btn) btn.textContent = 'Pausar';
    }
  }

  function timerRestart() {
    if (!runner) return;
    const step = runner.pause.steps[runner.step];
    if (step.type === 'timer') startTimer(step);
  }

  // salvar respostas digitadas enquanto digita
  runnerBody.addEventListener('input', (ev) => {
    if (!runner) return;
    if (ev.target.matches('[data-step-input]')) {
      const step = runner.pause.steps[runner.step];
      if (step && step.id) runner.answers[step.id] = ev.target.value;
    }
  });

  // escala
  document.addEventListener('click', (ev) => {
    const btn = ev.target.closest('[data-action="scale-pick"]');
    if (!btn || !runner) return;
    runner.answers[btn.dataset.step] = Number(btn.dataset.value);
    $$('.scale button', runnerBody).forEach(b => b.classList.toggle('is-active', b === btn));
  });

  // fechar com Esc
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && runner) closeRunner();
  });

  function chime() {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(523.25, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + .18);
      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(.12, ctx.currentTime + .03);
      g.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + .9);
      o.connect(g).connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + .95);
      o.onended = () => ctx.close();
    } catch (err) { /* silencioso */ }
  }

  /* ---------------- rotas ---------------- */

  // topo fixo: a sombra só aparece quando o conteúdo sai do lugar
  const topbar = document.querySelector('.topbar');
  if (topbar) {
    let topbarTick = false;
    const syncTopbar = () => {
      topbar.classList.toggle('is-scrolled', window.scrollY > 6);
      topbarTick = false;
    };
    window.addEventListener('scroll', () => {
      if (topbarTick) return;
      topbarTick = true;
      requestAnimationFrame(syncTopbar);
    }, { passive: true });
    syncTopbar();
  }

  window.addEventListener('hashchange', () => render());
  render();
  applyTheme();

  // service worker (offline)
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }
})();
