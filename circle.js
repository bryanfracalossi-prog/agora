/* Ágora — Círculo
   Camada de dados do espaço de apoio entre pessoas.
   - Online: /api/community (servidor local do Ágora, compartilhado na rede)
   - Local: localStorage, quando o app é aberto sem o servidor
   Nenhum texto é enviado para serviços de terceiros. */

const CIRCLE = (() => {
  'use strict';

  const API = '/api/community';
  const LOCAL_KEY = 'agora.circle.local.v1';
  const MINE_KEY = 'agora.circle.mine.v1';
  const IDENTITY_KEY = 'agora.circle.identity.v1';
  const DEVICE_KEY = 'agora.circle.device.v1';
  const PRESENCE_KEY = 'agora.circle.presence.v1';

  const MOODS = [
    { id: 'medo', label: 'Medo' },
    { id: 'ansiedade', label: 'Ansiedade' },
    { id: 'futuro', label: 'Futuro' },
    { id: 'trabalho', label: 'Trabalho' },
    { id: 'dinheiro', label: 'Dinheiro' },
    { id: 'solidao', label: 'Solidão' },
    { id: 'recomeco', label: 'Recomeço' },
    { id: 'acolhimento', label: 'Acolhimento' },
    { id: 'outro', label: 'Outro' }
  ];

  const PAGE_LIMIT = 80;

  let mode = null;
  let checkedAt = 0;

  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      const data = JSON.parse(raw);
      return data ?? fallback;
    } catch (err) {
      return fallback;
    }
  }

  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (err) { /* modo privado */ }
  }

  function randomId(prefix) {
    return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
  }

  function deviceId() {
    let id = read(DEVICE_KEY, null);
    if (!id || typeof id !== 'string') {
      id = randomId('d');
      write(DEVICE_KEY, id);
    }
    return id;
  }

  function identity() {
    return read(IDENTITY_KEY, 'anon') === 'named' ? 'named' : 'anon';
  }

  function setIdentity(value) {
    write(IDENTITY_KEY, value === 'named' ? 'named' : 'anon');
  }

  function mineList() {
    const list = read(MINE_KEY, []);
    return Array.isArray(list) ? list : [];
  }

  function rememberMine(id, token) {
    if (!id || !token) return;
    const list = mineList().filter(x => x.id !== id);
    list.push({ id, token });
    write(MINE_KEY, list.slice(-200));
  }

  function forgetMine(id) {
    write(MINE_KEY, mineList().filter(x => x.id !== id));
  }

  function mineToken(id) {
    const item = mineList().find(x => x.id === id);
    return item ? item.token : null;
  }

  function isMine(id) {
    return !!mineToken(id);
  }

  function presenceMarkedToday() {
    return read(PRESENCE_KEY, '') === new Date().toISOString().slice(0, 10);
  }

  function markPresenceToday() {
    write(PRESENCE_KEY, new Date().toISOString().slice(0, 10));
  }

  function todayKey() {
    return new Date().toISOString().slice(0, 10);
  }

  function moodLabel(id) {
    return (MOODS.find(m => m.id === id) || {}).label || 'Desabafo';
  }

  function isHeavy(text) {
    return /(suic[ií]d|me matar|me cortar|acabar com tudo|n[ãa]o quero mais viver|n[ãa]o aguento mais viver|desaparecer para sempre)/i.test(String(text || ''));
  }

  function hasPersonalData(text) {
    const s = String(text || '');
    return /(\(?\d{2}\)?\s?9?\d{4}[-\s]?\d{4})|([\w.+-]+@[\w-]+\.[\w.]+)/.test(s);
  }

  function normPost(p) {
    return {
      id: String(p.id || randomId('p')),
      ts: Number(p.ts) || Date.now(),
      author: p.author || null,
      anonymous: p.anonymous !== false,
      app: !!p.app,
      mood: p.mood || 'acolhimento',
      text: String(p.text || ''),
      hearts: Number(p.hearts) || 0,
      meToo: Number(p.meToo) || 0,
      reactedHeart: !!p.reactedHeart,
      reactedMeToo: !!p.reactedMeToo,
      comments: Array.isArray(p.comments) ? p.comments.map(normComment) : [],
      hidden: !!p.hidden
    };
  }

  function normComment(c) {
    return {
      id: String(c.id || randomId('c')),
      ts: Number(c.ts) || Date.now(),
      author: c.author || null,
      anonymous: c.anonymous !== false,
      text: String(c.text || ''),
      hidden: !!c.hidden
    };
  }

  function localSeed() {
    const now = Date.now();
    const app = (text, mood, ago) => ({
      id: randomId('app'),
      ts: now - ago,
      author: 'Ágora',
      anonymous: false,
      app: true,
      mood,
      text,
      hearts: 0,
      meToo: 0,
      comments: [],
      hidden: false,
      heartsBy: [],
      meTooBy: []
    });
    return {
      version: 1,
      seeded: true,
      posts: [
        app(
          'Este é o Círculo. Um lugar para colocar em palavras o que está pesando — sem nome, se preferir. Comece com uma frase simples: “Hoje eu estou com medo de...”. Ninguém aqui precisa ter a resposta.',
          'acolhimento',
          1000 * 60 * 18
        ),
        app(
          'Tem uma entrevista, uma conversa, um resultado vindo por aí? Você não precisa viver o dia de amanhã hoje. Se quiser, escreva o que está temendo. Talvez alguém aqui já tenha atravessado algo parecido.',
          'futuro',
          1000 * 60 * 6
        )
      ],
      presence: { date: todayKey(), devices: [deviceId()] }
    };
  }

  function readLocal() {
    let data = read(LOCAL_KEY, null);
    if (!data || typeof data !== 'object' || !Array.isArray(data.posts)) {
      data = localSeed();
      write(LOCAL_KEY, data);
    }
    data.posts = data.posts.map(normPost).filter(p => !p.hidden);
    data.presence = data.presence && typeof data.presence === 'object' ? data.presence : { date: todayKey(), devices: [] };
    if (data.presence.date !== todayKey()) {
      data.presence = { date: todayKey(), devices: [] };
    }
    data.presence.devices = Array.isArray(data.presence.devices) ? data.presence.devices : [];
    return data;
  }

  function writeLocal(data) {
    write(LOCAL_KEY, data);
  }

  function localStats(data) {
    const posts = data.posts.filter(p => !p.hidden);
    const comments = posts.reduce((n, p) => n + p.comments.filter(c => !c.hidden).length, 0);
    const hearts = posts.reduce((n, p) => n + p.hearts, 0);
    const meToo = posts.reduce((n, p) => n + p.meToo, 0);
    return {
      posts: posts.length,
      comments,
      hearts,
      meToo,
      presence: (data.presence.devices || []).length,
      unanswered: posts.filter(p => p.comments.filter(c => !c.hidden).length === 0).length
    };
  }

  async function fetchJSON(path, options = {}, timeout = 9000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
      const res = await fetch(API + path, {
        cache: 'no-store',
        ...options,
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          ...(options.body ? { 'Content-Type': 'application/json' } : {}),
          ...(options.headers || {})
        }
      });
      let data = null;
      try { data = await res.json(); } catch (err) { data = null; }
      if (!res.ok) {
        const message = (data && data.error) ? data.error : 'Não consegui falar com o Círculo agora.';
        const error = new Error(message);
        error.status = res.status;
        throw error;
      }
      return data || {};
    } finally {
      clearTimeout(timer);
    }
  }

  async function detect(force = false) {
    if (!force && mode && Date.now() - checkedAt < 15000) return mode;
    try {
      const data = await fetchJSON('/health', {}, 4500);
      if (data && data.ok) {
        mode = 'online';
        checkedAt = Date.now();
        return mode;
      }
    } catch (err) { /* servidor indisponível */ }
    mode = 'local';
    checkedAt = Date.now();
    return mode;
  }

  function sortPosts(posts, sort) {
    const list = posts.slice();
    if (sort === 'hearts') {
      list.sort((a, b) => (b.hearts + b.meToo) - (a.hearts + a.meToo) || b.ts - a.ts);
    } else if (sort === 'unanswered') {
      return list.filter(p => p.comments.filter(c => !c.hidden).length === 0).sort((a, b) => b.ts - a.ts);
    } else {
      list.sort((a, b) => b.ts - a.ts);
    }
    return list;
  }

  async function list({ sort = 'recent', mood = 'todas' } = {}) {
    const m = await detect();
    if (m === 'online') {
      try {
        const q = new URLSearchParams({ limit: String(PAGE_LIMIT), device: deviceId() });
        if (mood && mood !== 'todas') q.set('mood', mood);
        const data = await fetchJSON('/posts?' + q.toString());
        const posts = (data.posts || []).map(normPost);
        return {
          mode: 'online',
          posts: sortPosts(posts, sort),
          stats: data.stats || localStats({ posts, presence: { devices: [] } }),
          error: null
        };
      } catch (err) {
        mode = 'local';
        checkedAt = Date.now();
        const data = readLocal();
        const posts = mood && mood !== 'todas' ? data.posts.filter(p => p.mood === mood) : data.posts;
        return {
          mode: 'local',
          posts: sortPosts(posts, sort),
          stats: localStats(data),
          error: 'O servidor do Círculo não respondeu. Você está no modo local.'
        };
      }
    }

    const data = readLocal();
    const posts = mood && mood !== 'todas' ? data.posts.filter(p => p.mood === mood) : data.posts;
    return {
      mode: 'local',
      posts: sortPosts(posts, sort),
      stats: localStats(data),
      error: null
    };
  }

  async function create({ text, author, anonymous, mood }) {
    const clean = String(text || '').trim();
    const m = await detect();
    if (m === 'online') {
      const data = await fetchJSON('/posts', {
        method: 'POST',
        body: JSON.stringify({
          text: clean,
          author: anonymous ? null : (author || null),
          anonymous: !!anonymous,
          mood: mood || 'acolhimento',
          device: deviceId()
        })
      });
      const post = normPost(data.post);
      rememberMine(post.id, data.deleteToken);
      return { mode: 'online', post, token: data.deleteToken };
    }

    const dataLocal = readLocal();
    const post = {
      id: randomId('p'),
      ts: Date.now(),
      author: anonymous ? null : (author || null),
      anonymous: !!anonymous,
      app: false,
      mood: mood || 'acolhimento',
      text: clean,
      hearts: 0,
      meToo: 0,
      comments: [],
      hidden: false,
      heartsBy: [],
      meTooBy: []
    };
    const token = randomId('t');
    dataLocal.posts.unshift(post);
    writeLocal(dataLocal);
    rememberMine(post.id, token);
    return { mode: 'local', post: normPost(post), token };
  }

  async function comment(postId, { text, author, anonymous }) {
    const clean = String(text || '').trim();
    const m = await detect();
    if (m === 'online') {
      const data = await fetchJSON(`/posts/${encodeURIComponent(postId)}/comments`, {
        method: 'POST',
        body: JSON.stringify({
          text: clean,
          author: anonymous ? null : (author || null),
          anonymous: !!anonymous,
          device: deviceId()
        })
      });
      return { mode: 'online', comment: normComment(data.comment), post: data.post ? normPost(data.post) : null };
    }

    const dataLocal = readLocal();
    const post = dataLocal.posts.find(p => p.id === postId);
    if (!post) throw new Error('Esse desabafo não está mais aqui.');
    const c = {
      id: randomId('c'),
      ts: Date.now(),
      author: anonymous ? null : (author || null),
      anonymous: !!anonymous,
      text: clean,
      hidden: false
    };
    post.comments.push(c);
    writeLocal(dataLocal);
    return { mode: 'local', comment: normComment(c), post: normPost(post) };
  }

  async function react(postId, type) {
    const m = await detect();
    if (m === 'online') {
      const data = await fetchJSON(`/posts/${encodeURIComponent(postId)}/react`, {
        method: 'POST',
        body: JSON.stringify({ type, device: deviceId() })
      });
      return { mode: 'online', post: normPost(data.post) };
    }

    const dataLocal = readLocal();
    const post = dataLocal.posts.find(p => p.id === postId);
    if (!post) throw new Error('Esse desabafo não está mais aqui.');
    post.heartsBy = Array.isArray(post.heartsBy) ? post.heartsBy : [];
    post.meTooBy = Array.isArray(post.meTooBy) ? post.meTooBy : [];
    const arr = type === 'meToo' ? post.meTooBy : post.heartsBy;
    const field = type === 'meToo' ? 'meToo' : 'hearts';
    if (!arr.includes(deviceId())) {
      arr.push(deviceId());
      post[field] = (Number(post[field]) || 0) + 1;
    }
    writeLocal(dataLocal);
    const out = normPost(post);
    out.reactedHeart = post.heartsBy.includes(deviceId());
    out.reactedMeToo = post.meTooBy.includes(deviceId());
    return { mode: 'local', post: out };
  }

  async function report(postId, { reason = '', commentId = null } = {}) {
    const m = await detect();
    if (m === 'online') {
      const data = await fetchJSON(`/posts/${encodeURIComponent(postId)}/report`, {
        method: 'POST',
        body: JSON.stringify({ reason, commentId, device: deviceId() })
      });
      return { mode: 'online', hidden: !!data.hidden };
    }

    const dataLocal = readLocal();
    const post = dataLocal.posts.find(p => p.id === postId);
    if (!post) return { mode: 'local', hidden: false };
    if (commentId) {
      const c = post.comments.find(x => x.id === commentId);
      if (c) {
        c.reports = (Number(c.reports) || 0) + 1;
        if (c.reports >= 3) c.hidden = true;
      }
    } else {
      post.reports = (Number(post.reports) || 0) + 1;
      if (post.reports >= 3) post.hidden = true;
    }
    writeLocal(dataLocal);
    return { mode: 'local', hidden: !!post.hidden };
  }

  async function remove(postId) {
    const token = mineToken(postId);
    if (!token) throw new Error('Você só pode apagar o que publicou neste aparelho.');
    const m = await detect();
    if (m === 'online') {
      await fetchJSON(`/posts/${encodeURIComponent(postId)}`, {
        method: 'DELETE',
        body: JSON.stringify({ token })
      });
    } else {
      const dataLocal = readLocal();
      dataLocal.posts = dataLocal.posts.filter(p => p.id !== postId);
      writeLocal(dataLocal);
    }
    forgetMine(postId);
    return true;
  }

  async function presence() {
    const m = await detect();
    if (m === 'online') {
      const data = await fetchJSON('/presence', {
        method: 'POST',
        body: JSON.stringify({ device: deviceId() })
      });
      markPresenceToday();
      return { mode: 'online', count: Number(data.count) || 0 };
    }

    const dataLocal = readLocal();
    if (!dataLocal.presence.devices.includes(deviceId())) {
      dataLocal.presence.devices.push(deviceId());
      writeLocal(dataLocal);
    }
    markPresenceToday();
    return { mode: 'local', count: dataLocal.presence.devices.length };
  }

  function timeAgo(ts) {
    const diff = Math.max(0, Date.now() - Number(ts || Date.now()));
    if (diff < 45000) return 'agora';
    if (diff < 3600000) return `há ${Math.max(1, Math.floor(diff / 60000))} min`;
    if (diff < 86400000) return `há ${Math.floor(diff / 3600000)} h`;
    if (diff < 7 * 86400000) return `há ${Math.floor(diff / 86400000)} d`;
    return new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short' }).format(new Date(Number(ts)));
  }

  return {
    MOODS,
    mode: () => mode,
    detect,
    list,
    create,
    comment,
    react,
    report,
    remove,
    presence,
    timeAgo,
    moodLabel,
    isHeavy,
    hasPersonalData,
    identity,
    setIdentity,
    isMine,
    mineToken,
    presenceMarkedToday,
    markPresenceToday,
    deviceId
  };
})();
