/* NEURON — arte das tirinhas (edição quadrinho/mangá)
   Ilustrações vetoriais originais, sem imagens externas.
   Traço grosso, retícula, enquadramentos dramáticos e expressões de mangá. */

const COMICART = (() => {
  const C = {
    paper: '#f7efdd',
    ink: '#171717',
    inkSoft: '#3a3a3a',
    cream: '#fff8e7',
    white: '#fffdf5',
    skin: '#f2c9a0',
    skinShade: '#d9a077',
    hair: '#191919',
    teal: '#2f7d78',
    tealDark: '#1d4f4c',
    tealLight: '#8fcac3',
    orange: '#e27a3f',
    crimson: '#b63c3c',
    red: '#8f2929',
    gold: '#f0b93e',
    yellow: '#ffd85c',
    skyDay: '#8fd0ca',
    skyWarm: '#f9e8b9',
    sand: '#e8cf9e',
    sandDark: '#c9a86a',
    green: '#5f8f5e',
    greenDark: '#3f6b4a',
    stone: '#b9b19a',
    stoneDark: '#8f8872',
    brown: '#7a5334',
    night: '#1b2f3a',
    shadow: 'rgba(23,23,23,.18)'
  };

  let seq = 0;
  let HT = 'ht0';

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const st = (w = 2.5) => `stroke="${C.ink}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;

  /* ---------------- retícula / céu / astros ---------------- */

  function dotFill(opacity = .3) {
    return `fill="url(#${HT})" opacity="${opacity}"`;
  }

  function sky(time) {
    const id = 'sky' + (++seq);
    const palettes = {
      day: ['#8fd0ca', '#f9e8b9'],
      dusk: ['#e97a4f', '#f6c66b'],
      dawn: ['#f2b26b', '#ffe9c4'],
      night: ['#152835', '#35586a'],
      dark: ['#0c1517', '#1b2926']
    };
    const p = palettes[time] || palettes.day;
    const defs = `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${p[0]}"/><stop offset="1" stop-color="${p[1]}"/>
    </linearGradient>`;

    let extras = '';
    if (time === 'night' || time === 'dark') {
      extras = stars() + moon(322, 56, 21);
    } else if (time === 'dusk' || time === 'dawn') {
      extras = sun(296, time === 'dawn' ? 132 : 118, 33, time === 'dawn' ? '#ffcf7d' : '#ff9a54') + cloud(88, 68, .85, C.cream, .9);
    } else {
      extras = sun(322, 58, 27, C.gold) + cloud(92, 66, 1, C.cream, .95) + cloud(268, 96, .65, C.cream, .8);
    }

    return {
      defs,
      body: `<rect width="400" height="300" fill="url(#${id})"/>` + extras
    };
  }

  function sun(x, y, r, fill) {
    let rays = '';
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const x1 = x + Math.cos(a) * (r + 5);
      const y1 = y + Math.sin(a) * (r + 5);
      const x2 = x + Math.cos(a) * (r + (i % 2 ? 12 : 19));
      const y2 = y + Math.sin(a) * (r + (i % 2 ? 12 : 19));
      rays += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/>`;
    }
    return `<g>${rays}<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${st(3)}/></g>`;
  }

  function moon(x, y, r) {
    return `<path d="M${x} ${y - r} A ${r} ${r} 0 1 0 ${x} ${y + r} A ${r * .76} ${r * .76} 0 1 1 ${x} ${y - r} Z"
      fill="${C.cream}" ${st(2.4)}/>`;
  }

  function star(x, y, r, fill = C.cream) {
    return `<path d="M${x} ${y - r} L${x + r * .28} ${y - r * .28} L${x + r} ${y} L${x + r * .28} ${y + r * .28} L${x} ${y + r} L${x - r * .28} ${y + r * .28} L${x - r} ${y} L${x - r * .28} ${y - r * .28} Z" fill="${fill}" ${st(1)}/>`;
  }

  function stars() {
    const pts = [[32, 40, 5], [72, 24, 3.5], [112, 62, 4], [158, 34, 3], [204, 64, 4.5], [252, 20, 3], [292, 48, 3.5], [350, 30, 4], [378, 74, 3], [50, 88, 3], [138, 96, 2.6], [332, 104, 2.8]];
    return pts.map(([x, y, r]) => star(x, y, r)).join('');
  }

  function cloud(x, y, s = 1, fill = C.cream, opacity = 1) {
    return `<g transform="translate(${x} ${y}) scale(${s})" opacity="${opacity}">
      <path d="M-42 10 q-3 -15 12 -18 q2 -15 19 -15 q12 -11 26 0 q16 0 18 15 q13 3 11 16 q-11 6 -21 2 q-10 6 -21 0 q-10 6 -22 0 q-11 4 -22 0 z"
        fill="${fill}" ${st(2.3)}/>
    </g>`;
  }

  /* ---------------- pessoas ---------------- */

  function person(o = {}) {
    const x = o.x ?? 200;
    const y = o.y ?? 250;
    const s = o.s ?? 1;
    const flip = o.flip ? -1 : 1;
    const detail = o.detail !== undefined ? o.detail : s >= .72;
    const shirt = o.shirt || C.teal;
    const pants = o.pants || '#33413d';
    const skin = o.skin || C.skin;
    const hairC = o.hair || C.hair;
    const pose = o.pose || 'stand';
    const face = o.face || 'neutral';
    const hairStyle = o.hairStyle || 'spiky';
    const outline = 2.5;

    const limb = (d, color, w = 9) =>
      `<path d="${d}" fill="none" stroke="${C.ink}" stroke-width="${w + 3.4}" stroke-linecap="round" stroke-linejoin="round"/>
       <path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;

    let legPaths = ['M-7 -36 L-9 -5', 'M7 -36 L9 -5'];
    let armPaths = ['M-14 -64 L-21 -39', 'M14 -64 L20 -39'];
    let hands = [[-21, -39], [20, -39]];
    let tilt = 0;
    let shoeL = [-9, -4];
    let shoeR = [9, -4];

    if (pose === 'walk') {
      legPaths = ['M-6 -36 L-17 -5', 'M6 -36 L16 -5'];
      armPaths = ['M-14 -64 L-23 -43', 'M14 -64 L22 -48'];
      hands = [[-23, -43], [22, -48]];
      shoeL = [-17, -4]; shoeR = [16, -4];
      tilt = -2;
    } else if (pose === 'run') {
      legPaths = ['M-7 -36 L-21 -18 L-25 -4', 'M7 -36 L19 -14 L24 -4'];
      armPaths = ['M-14 -64 L-26 -52 L-29 -40', 'M14 -64 L26 -54 L30 -44'];
      hands = [[-29, -40], [30, -44]];
      shoeL = [-25, -4]; shoeR = [24, -4];
      tilt = -7;
    } else if (pose === 'push') {
      legPaths = ['M-6 -36 L-16 -4', 'M6 -36 L12 -4'];
      armPaths = ['M-13 -64 L22 -60', 'M8 -60 L24 -48'];
      hands = [[22, -60], [24, -48]];
      shoeL = [-16, -3]; shoeR = [12, -3];
      tilt = 6;
    } else if (pose === 'think') {
      armPaths = ['M-14 -64 L-21 -39', 'M14 -64 L4 -84'];
      hands = [[-21, -39], [4, -84]];
    } else if (pose === 'point') {
      armPaths = ['M-14 -64 L-21 -39', 'M14 -64 L31 -80'];
      hands = [[-21, -39], [31, -80]];
    } else if (pose === 'shout') {
      armPaths = ['M-14 -64 L-29 -79', 'M14 -64 L29 -79'];
      hands = [[-29, -79], [29, -79]];
    } else if (pose === 'carry') {
      armPaths = ['M-14 -64 L-17 -48', 'M14 -64 L17 -48'];
      hands = [[-17, -48], [17, -48]];
    } else if (pose === 'reach') {
      armPaths = ['M-14 -64 L-21 -39', 'M14 -64 L25 -88'];
      hands = [[-21, -39], [25, -88]];
    }

    let hairBack = '';
    if (hairStyle === 'long') {
      hairBack = `<path d="M-15 -95 Q-17 -113 0 -113 Q17 -113 15 -95 L21 -50 L11 -54 L9 -91 Q5 -101 0 -101 Q-5 -101 -9 -91 L-11 -54 L-21 -50 Z" fill="${hairC}" ${st(2.2)}/>`;
    }

    let hairTop = '';
    if (hairStyle === 'spiky') {
      hairTop = `<path d="M-15 -94 L-19 -109 L-11 -104 L-9 -119 L0 -107 L9 -120 L12 -105 L19 -110 L15 -93 Q8 -101 0 -101 Q-8 -101 -15 -94 Z" fill="${hairC}" ${st(2.2)}/>
        <path d="M-8 -105 q4 -4 9 -2" fill="none" stroke="${C.cream}" stroke-width="1.6" opacity=".35"/>`;
    } else if (hairStyle === 'short') {
      hairTop = `<path d="M-14 -96 Q-14 -111 0 -111 Q14 -111 14 -96 Q8 -103 0 -103 Q-8 -103 -14 -96 Z" fill="${hairC}" ${st(2.2)}/>
        <path d="M-8 -105 q4 -3 9 -2" fill="none" stroke="${C.cream}" stroke-width="1.5" opacity=".3"/>`;
    } else if (hairStyle === 'bob') {
      hairTop = `<path d="M-14 -96 Q-14 -111 0 -111 Q14 -111 14 -96 L16 -82 L10 -83 L9 -99 Q4 -104 0 -104 Q-4 -104 -9 -99 L-10 -83 L-16 -82 Z" fill="${hairC}" ${st(2.2)}/>`;
    } else if (hairStyle === 'bun') {
      hairTop = `<circle cx="0" cy="-113" r="7" fill="${hairC}" ${st(2)}/>
        <path d="M-14 -96 Q-14 -110 0 -110 Q14 -110 14 -96 Q8 -103 0 -103 Q-8 -103 -14 -96 Z" fill="${hairC}" ${st(2.2)}/>`;
    } else if (hairStyle === 'curly') {
      hairTop = `<g fill="${hairC}" ${st(2)}>
        <circle cx="-9" cy="-106" r="7"/><circle cx="0" cy="-111" r="8"/><circle cx="9" cy="-106" r="7"/><circle cx="-13" cy="-97" r="6"/><circle cx="13" cy="-97" r="6"/>
      </g>`;
    } else if (hairStyle === 'long') {
      hairTop = `<path d="M-14 -96 Q-14 -111 0 -111 Q14 -111 14 -96 Q8 -103 0 -103 Q-8 -103 -14 -96 Z" fill="${hairC}" ${st(2.2)}/>`;
    } else if (hairStyle === 'bald') {
      hairTop = `<path d="M-7 -105 q4 -4 9 -1" fill="none" stroke="${C.cream}" stroke-width="2" opacity=".45"/>`;
    }

    const cape = o.cape
      ? `<path d="M-14 -68 Q-32 -46 -28 -10 L-14 -16 L-8 -8 L0 -18 L8 -8 L14 -16 L28 -10 Q32 -46 14 -68 Z" fill="${o.cape}" ${st(2.4)}/>
         <path d="M-10 -60 Q-18 -42 -17 -18 M10 -60 Q18 -42 17 -18" fill="none" stroke="${C.ink}" stroke-width="1.2" opacity=".35"/>`
      : '';

    const shoes = `<path d="M${shoeL[0] - 5} ${shoeL[1]} h9 q4 0 3 4 h-12 z" fill="${C.ink}"/>
      <path d="M${shoeR[0] - 5} ${shoeR[1]} h9 q4 0 3 4 h-12 z" fill="${C.ink}"/>`;

    const torso = `<path d="M-15 -70 Q-18 -52 -12 -34 L12 -34 Q18 -52 15 -70 Q7 -75 0 -75 Q-7 -75 -15 -70 Z" fill="${shirt}" ${st(outline)}/>
      <path d="M-9 -70 L0 -62 L9 -70" fill="none" ${st(1.8)}/>
      <path d="M-12 -46 H12" stroke="${C.ink}" stroke-width="1.4" opacity=".45"/>
      <path d="M-12 -38 H12" stroke="${C.ink}" stroke-width="2.6"/>
      <circle cx="0" cy="-38" r="1.8" fill="${C.gold}" ${st(1)}/>`;

    const robe = o.robe
      ? `<path d="M-15 -42 L-26 -2 H26 L15 -42 Z" fill="${o.robe}" ${st(2.4)}/>
         <path d="M-8 -36 L-12 -4 M8 -36 L12 -4" stroke="${C.ink}" stroke-width="1.2" opacity=".35"/>`
      : '';

    const neck = `<rect x="-5" y="-79" width="10" height="10" fill="${skin}" ${st(2)}/>`;

    const head = `<path d="M0 -106 C-11 -106 -15 -98 -14 -90 C-13 -81 -7 -75 0 -75 C7 -75 13 -81 14 -90 C15 -98 11 -106 0 -106 Z" fill="${skin}" ${st(outline)}/>
      <path d="M-14 -92 q-5 -3 -5 3 q0 5 5 4" fill="${skin}" ${st(1.8)}/>
      <path d="M14 -92 q5 -3 5 3 q0 5 -5 4" fill="${skin}" ${st(1.8)}/>
      <path d="M-13 -91 Q-12 -80 -4 -76 Q-10 -79 -11 -88 Z" fill="${C.skinShade}" opacity=".55"/>`;

    const eye = (cx, open = 1) => {
      const h = 4.4 * open;
      return `<path d="M${cx - 5.2} -90 Q${cx} ${-90 - h} ${cx + 5.2} -90 Q${cx} ${-90 + h * .72} ${cx - 5.2} -90 Z" fill="${C.white}" ${st(1.4)}/>
        <circle cx="${cx}" cy="-90" r="2.25" fill="${C.ink}"/>
        <circle cx="${cx - .8}" cy="-90.9" r=".8" fill="#fff"/>`;
    };

    let eyes;
    if (!detail) {
      eyes = `<circle cx="-5" cy="-90" r="1.5" fill="${C.ink}"/><circle cx="5" cy="-90" r="1.5" fill="${C.ink}"/>`;
    } else if (face === 'tired') {
      eyes = `<path d="M-10 -90 q5 3 10 0 M0 -90 q5 3 10 0" fill="none" ${st(1.6)}/>`;
    } else if (face === 'shout' || face === 'surprise') {
      eyes = eye(-5, 1.1) + eye(5, 1.1);
    } else {
      eyes = eye(-5) + eye(5);
    }

    let browL = 'M-10 -98 L-3 -100';
    let browR = 'M10 -98 L3 -100';
    if (face === 'angry' || face === 'shout') {
      browL = 'M-10 -100 L-3 -96';
      browR = 'M10 -100 L3 -96';
    } else if (face === 'sad' || face === 'tired') {
      browL = 'M-10 -96 L-3 -99';
      browR = 'M10 -96 L3 -99';
    } else if (face === 'surprise') {
      browL = 'M-10 -101 Q-6 -104 -3 -100';
      browR = 'M10 -101 Q6 -104 3 -100';
    }

    const mouth = {
      neutral: `<path d="M-4 -81 h8" fill="none" ${st(1.5)}/>`,
      smile: `<path d="M-5 -82 q5 6 10 0" fill="none" ${st(1.6)}/>`,
      smirk: `<path d="M-4 -81 q5 3 9 -1" fill="none" ${st(1.6)}/>`,
      frown: `<path d="M-5 -79 q5 -5 10 0" fill="none" ${st(1.6)}/>`,
      tired: `<path d="M-4 -80 h8" fill="none" ${st(1.5)}/>`,
      surprise: `<ellipse cx="0" cy="-80" rx="3.2" ry="4.4" fill="${C.ink}"/>`,
      shout: `<path d="M-5 -83 Q0 -71 5 -83 Q0 -78 -5 -83 Z" fill="${C.ink}" ${st(1.5)}/><path d="M-3 -79 q3 2 6 0" fill="none" stroke="${C.crimson}" stroke-width="1.4"/>`,
      grit: `<rect x="-5" y="-83" width="10" height="5" rx="1" fill="${C.ink}"/><path d="M-5 -80.5 h10" stroke="#fff" stroke-width="1"/>`
    };

    const beard = o.beard
      ? `<path d="M-10 -84 Q0 -66 10 -84 Q6 -74 0 -72 Q-6 -74 -10 -84 Z" fill="${hairC}" ${st(1.8)}/>`
      : '';

    const blush = o.blush
      ? `<g stroke="#c05a4a" stroke-width="1.3" stroke-linecap="round"><path d="M-12 -84 l3 -2 M-11 -81 l3 -2"/><path d="M9 -84 l3 -2 M8 -81 l3 -2"/></g>`
      : '';

    const sweat = o.sweat
      ? `<path d="M17 -101 q4 6 0 9 q-4 -3 0 -9 z" fill="#8fd0e0" ${st(1.2)}/>`
      : '';

    const headphones = o.headphones
      ? `<path d="M-16 -95 Q-16 -113 0 -113 Q16 -113 16 -95" fill="none" ${st(4.2)}/>
         <rect x="-20" y="-97" width="8" height="13" rx="4" fill="${C.orange}" ${st(2)}/>
         <rect x="12" y="-97" width="8" height="13" rx="4" fill="${C.orange}" ${st(2)}/>`
      : '';

    const piercing = o.piercing
      ? `<circle cx="14" cy="-86" r="1.3" fill="${C.gold}" ${st(.8)}/>`
      : '';

    const hat = o.hat === 'straw'
      ? `<ellipse cx="0" cy="-107" rx="24" ry="5" fill="#e8c07a" ${st(2.2)}/>
         <path d="M-12 -107 q2 -13 12 -13 q10 0 12 13 z" fill="#f0d093" ${st(2.2)}/>`
      : (o.hat === 'crown'
        ? `<path d="M-11 -107 L-9 -121 L-4 -112 L0 -124 L4 -112 L9 -121 L11 -107 Z" fill="${C.gold}" ${st(2.2)}/>
           <circle cx="0" cy="-114" r="1.5" fill="${C.crimson}"/>`
        : '');

    return `<g transform="translate(${x} ${y}) rotate(${tilt}) scale(${flip * s} ${s})">
      <ellipse cx="0" cy="2" rx="19" ry="4.2" fill="${C.shadow}"/>
      ${hairBack}
      ${cape}
      ${legPaths.map(d => limb(d, pants, 9)).join('')}
      ${shoes}
      ${armPaths.map(d => limb(d, shirt, 8)).join('')}
      <rect x="-5" y="-79" width="10" height="10" fill="${skin}" ${st(2)}/>
      ${torso}
      ${robe}
      ${hands.map(([hx, hy]) => `<circle cx="${hx}" cy="${hy}" r="3.1" fill="${skin}" ${st(1.5)}/>`).join('')}
      ${head}
      ${hairTop}
      ${eyes}
      <path d="${browL}" fill="none" ${st(1.7)}/>
      <path d="${browR}" fill="none" ${st(1.7)}/>
      <path d="M0 -88 l2 3" fill="none" ${st(1.2)}/>
      ${mouth[face] || mouth.neutral}
      ${beard}
      ${blush}
      ${sweat}
      ${headphones}
      ${piercing}
      ${hat}
    </g>`;
  }

  function lying(x, y, s = 1, o = {}) {
    const shirt = o.shirt || C.teal;
    const skin = o.skin || C.skin;
    const hairC = o.hair || C.hair;
    return `<g transform="translate(${x} ${y}) scale(${s}) rotate(${o.rot || 0})">
      <ellipse cx="0" cy="3" rx="55" ry="6" fill="${C.shadow}"/>
      <path d="M-48 0 Q-42 -20 -20 -20 L26 -20 Q46 -20 46 0 Z" fill="${shirt}" ${st(2.6)}/>
      <path d="M-10 -20 L-26 -34 L-42 -18" fill="none" ${st(9 * 1.2)}/>
      <path d="M-10 -20 L-26 -34 L-42 -18" fill="none" stroke="${C.tealDark}" stroke-width="9" stroke-linecap="round"/>
      <path d="M8 -20 Q16 -8 26 0" fill="none" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/>
      <path d="M8 -20 Q16 -8 26 0" fill="none" stroke="${C.tealDark}" stroke-width="8" stroke-linecap="round"/>
      <circle cx="42" cy="-27" r="13" fill="${skin}" ${st(2.5)}/>
      <path d="M30 -30 Q34 -42 46 -40 Q56 -38 55 -27 Q48 -34 42 -33 Q36 -32 30 -30 Z" fill="${hairC}" ${st(2)}/>
      <path d="M34 -25 q4 3 7 0" fill="none" ${st(1.4)}/>
      <path d="M29 -28 q-8 8 2 16" fill="none" stroke="${skin}" stroke-width="7" stroke-linecap="round"/>
      <path d="M29 -28 q-8 8 2 16" fill="none" ${st(10)} opacity="0"/>
      ${o.headphones ? `<path d="M31 -37 Q40 -47 53 -38" fill="none" ${st(4.2)}/><rect x="28" y="-38" width="7" height="11" rx="3.5" fill="${C.orange}" ${st(2)}/><rect x="53" y="-38" width="7" height="11" rx="3.5" fill="${C.orange}" ${st(2)}/>` : ''}
      <path d="M42 -24 q3 3 7 0" fill="none" ${st(1.5)}/>
    </g>`;
  }

  function seated(x, y, s, color) {
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="2" rx="20" ry="3.6" fill="${C.shadow}"/>
      <path d="M-18 0 Q-21 -17 -9 -25 Q-2 -31 7 -25 Q17 -18 14 0 Z" fill="${color}" ${st(2.2)}/>
      <circle cx="5" cy="-30" r="9" fill="${color}" ${st(2.2)}/>
      <path d="M2 -24 q-10 8 -18 10" fill="none" stroke="${color}" stroke-width="7" stroke-linecap="round"/>
      <circle cx="8" cy="-31" r="1.4" fill="${C.gold}"/>
    </g>`;
  }

  /* ---------------- animais / objetos ---------------- */

  function camel(x, y, s = 1, color = C.brown) {
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="3" rx="36" ry="5" fill="${C.shadow}"/>
      <path d="M-35 -22 Q-38 -44 -20 -46 Q-12 -62 -2 -46 Q8 -64 18 -46 Q34 -44 32 -22 Q20 -14 0 -14 Q-20 -14 -35 -22 Z" fill="${color}" ${st(2.6)}/>
      <path d="M28 -38 Q36 -52 32 -68 Q34 -80 44 -80 Q54 -78 53 -68 Q52 -62 46 -62 Q42 -60 42 -50" fill="${color}" ${st(2.6)}/>
      <path d="M44 -80 l5 -7 M50 -80 l7 -4" fill="none" ${st(2)}/>
      <circle cx="47" cy="-73" r="1.7" fill="${C.ink}"/>
      <g ${st(2.4)}>
        <path d="M-26 -16 v16" stroke="${color}" stroke-width="8"/><path d="M-26 -16 v16" fill="none" ${st(2.4)} opacity="0"/>
        <path d="M-14 -14 v14" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
        <path d="M10 -14 v14" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
        <path d="M24 -16 v16" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
        <path d="M-26 0 h-7 M-14 0 h7 M10 0 h7 M24 0 h7" fill="none" ${st(2.2)}/>
      </g>
      <path d="M-35 -28 q-6 8 -2 16" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round"/>
      <g>
        <path d="M-24 -46 q2 -12 12 -14 l6 10 z" fill="${C.orange}" ${st(2)}/>
        <path d="M8 -48 q2 -12 12 -13 l5 11 z" fill="${C.teal}" ${st(2)}/>
        <rect x="-8" y="-52" width="12" height="8" rx="2" fill="${C.gold}" ${st(1.8)}/>
      </g>
    </g>`;
  }

  function lion(x, y, s = 1) {
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="3" rx="36" ry="5" fill="${C.shadow}"/>
      <path d="M-34 -30 Q-38 -48 -18 -50 L16 -50 Q36 -48 34 -30 Q28 -16 0 -16 Q-28 -16 -34 -30 Z" fill="${C.gold}" ${st(2.6)}/>
      <path d="M-26 -30 q-8 4 -10 12" fill="none" ${st(5)}/>
      <path d="M28 -46 Q34 -60 48 -58 Q60 -56 60 -44 Q60 -32 48 -32 Q38 -32 34 -42" fill="${C.orange}" ${st(2.6)}/>
      <path d="M34 -58 l-6 -8 l-2 10 M44 -62 l2 -10 l6 9 M54 -58 l9 -6 l-2 10" fill="${C.orange}" ${st(2)}/>
      <path d="M44 -46 q4 5 10 0" fill="none" ${st(2.2)}/>
      <circle cx="44" cy="-49" r="1.8" fill="${C.ink}"/><circle cx="55" cy="-49" r="1.8" fill="${C.ink}"/>
      <path d="M46 -40 q4 8 10 0" fill="${C.crimson}" ${st(1.8)}/>
      <g fill="none" stroke="${C.gold}" stroke-width="7" stroke-linecap="round">
        <path d="M-24 -16 v14"/><path d="M-10 -16 v14"/><path d="M14 -16 v14"/><path d="M26 -16 v14"/>
      </g>
      <path d="M34 -36 q12 6 10 16" fill="none" stroke="${C.orange}" stroke-width="4" stroke-linecap="round"/>
    </g>`;
  }

  function horse(x, y, s = 1, color = C.brown) {
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="3" rx="34" ry="5" fill="${C.shadow}"/>
      <path d="M-32 -32 Q-36 -46 -18 -48 L16 -48 Q34 -44 30 -28 Q24 -18 0 -18 Q-24 -18 -32 -32 Z" fill="${color}" ${st(2.6)}/>
      <path d="M22 -44 Q30 -58 28 -72 Q30 -84 40 -84 Q50 -82 49 -72 Q48 -66 42 -66 Q38 -64 38 -54" fill="${color}" ${st(2.6)}/>
      <path d="M40 -84 l4 -8 M47 -82 l7 -5" fill="none" ${st(2)}/>
      <circle cx="43" cy="-76" r="1.6" fill="${C.ink}"/>
      <path d="M28 -80 q-6 -2 -10 2" fill="none" stroke="${C.hair}" stroke-width="3" stroke-linecap="round"/>
      <g fill="none" stroke="${color}" stroke-width="7" stroke-linecap="round">
        <path d="M-22 -18 v16"/><path d="M-10 -18 v16"/><path d="M12 -18 v16"/><path d="M24 -18 v16"/>
      </g>
      <path d="M-32 -38 q-10 8 -8 20" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round"/>
    </g>`;
  }

  function boat(x, y, s = 1, sail = true) {
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="14" rx="46" ry="4" fill="${C.shadow}"/>
      <path d="M-42 0 Q0 22 42 0 L34 17 Q0 28 -34 17 Z" fill="${C.crimson}" ${st(2.6)}/>
      <path d="M-36 6 Q0 18 36 6" fill="none" ${st(1.6)} opacity=".55"/>
      ${sail ? `<path d="M-2 0 V-58" ${st(3)}/>
        <path d="M0 -54 L30 -4 H0 Z" fill="${C.cream}" ${st(2.4)}/>
        <path d="M0 -54 L-22 -8 H0 Z" fill="${C.white}" ${st(2.4)}/>
        <path d="M2 -44 L18 -12 M0 -30 L12 -10" fill="none" ${st(1.2)} opacity=".35"/>` : `<path d="M-2 0 V-14" ${st(3)}/>`}
    </g>`;
  }

  function tree(x, y, s = 1, color = C.greenDark) {
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <ellipse cx="0" cy="2" rx="28" ry="4" fill="${C.shadow}"/>
      <path d="M0 0 V-46 M0 -34 L-16 -48 M0 -40 L15 -52" fill="none" stroke="${C.brown}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M-26 -58 Q-34 -76 -18 -84 Q-6 -96 10 -86 Q28 -84 30 -66 Q42 -54 28 -44 Q12 -36 0 -44 Q-16 -36 -26 -44 Q-38 -50 -26 -58 Z" fill="${color}" ${st(2.6)}/>
      <path d="M-18 -72 q10 -10 24 -6" fill="none" stroke="${C.cream}" stroke-width="2" opacity=".25"/>
    </g>`;
  }

  function flower(x, y, s = 1, color = C.orange) {
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M0 0 V-16" fill="none" ${st(1.6)}/>
      <path d="M0 -7 q-8 -2 -9 -8 q7 0 9 5 z" fill="${C.greenDark}" ${st(1.2)}/>
      <circle cx="-4" cy="-18" r="3" fill="${color}" ${st(1.3)}/>
      <circle cx="4" cy="-18" r="3" fill="${color}" ${st(1.3)}/>
      <circle cx="0" cy="-23" r="3" fill="${color}" ${st(1.3)}/>
      <circle cx="0" cy="-13" r="3" fill="${color}" ${st(1.3)}/>
      <circle cx="0" cy="-18" r="2.2" fill="${C.gold}" ${st(1)}/>
    </g>`;
  }

  function butterfly(x, y, s = 1, color = C.orange) {
    return `<g transform="translate(${x} ${y}) scale(${s})">
      <path d="M0 0 C-16 -16 -24 -2 -8 6 C-18 12 -8 20 0 8 C8 20 18 12 8 6 C24 -2 16 -16 0 0 Z" fill="${color}" ${st(1.8)}/>
      <path d="M0 -4 v12" fill="none" ${st(1.5)}/>
      <path d="M-2 -4 q-4 -7 -7 -8 M2 -4 q4 -7 7 -8" fill="none" ${st(1.2)}/>
      <circle cx="-8" cy="0" r="2" fill="${C.cream}" opacity=".7"/>
      <circle cx="8" cy="0" r="2" fill="${C.cream}" opacity=".7"/>
    </g>`;
  }

  /* ---------------- cenas ---------------- */

  function mountain(time) {
    const sk = sky(time);
    const dark = time === 'night' || time === 'dark';
    return sk.defs + sk.body + `
      <path d="M0 300 V204 L64 172 L132 196 L206 160 L278 190 L344 168 L400 190 V300 Z" fill="${dark ? '#2f4a44' : '#7f9c86'}" ${st(2.4)}/>
      <path d="M0 300 V236 L90 208 L170 232 L250 210 L330 236 L400 220 V300 Z" fill="${dark ? '#243a34' : '#5f8168'}" ${st(2.4)}/>
      <path d="M-20 300 L118 78 L262 300 Z" fill="${dark ? '#3f4e46' : C.stoneDark}" ${st(3)}/>
      <path d="M150 300 L286 46 L420 300 Z" fill="${dark ? '#4b5a50' : C.stone}" ${st(3)}/>
      <path d="M286 46 L326 112 L306 104 L292 128 L274 104 L254 118 Z" fill="${C.cream}" ${st(2.2)}/>
      <path d="M176 300 L286 46 L352 300 Z" ${dotFill(dark ? .45 : .28)}/>
      <path d="M120 296 L156 258 L142 238 L188 200 L174 178 L216 142 L204 120"
        fill="none" stroke="${C.cream}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"
        opacity=".8" stroke-dasharray="12 9"/>
      <path d="M-10 300 Q80 268 178 282 Q280 298 410 274 V300 Z" fill="${dark ? '#1c2d28' : '#41634f'}" ${st(2.4)}/>
      ${person({ x: 154, y: 267, s: .72, pose: 'push', shirt: C.orange, face: 'grit', hairStyle: 'spiky' })}
      <ellipse cx="198" cy="241" rx="25" ry="22" fill="${dark ? '#6f7568' : '#8d8978'}" ${st(2.8)}/>
      <ellipse cx="190" cy="233" rx="8" ry="6" fill="${C.cream}" opacity=".25"/>
      <path d="M166 221 l-6 -7 M174 216 l-3 -9" fill="none" ${st(1.6)} opacity=".7"/>
      <path d="M228 78 q6 -5 12 0 q6 -5 12 0 M258 96 q4 -4 8 0 q4 -4 8 0" fill="none" ${st(1.6)} opacity=".55"/>
    `;
  }

  function beach(time) {
    const sk = sky(time);
    const dusk = time === 'dusk' || time === 'night' || time === 'dark';
    return sk.defs + sk.body + `
      <rect y="152" width="400" height="74" fill="${dusk ? '#3f6b70' : '#4f9e9a'}" ${st(2.4)}/>
      <path d="M0 176 q26 -9 52 0 t52 0 t52 0 t52 0 t52 0 t52 0 t52 0" fill="none" stroke="${C.cream}" stroke-width="2.6" opacity=".7"/>
      <path d="M0 198 q32 -8 64 0 t64 0 t64 0 t64 0 t64 0 t64 0" fill="none" stroke="${C.cream}" stroke-width="1.8" opacity=".4"/>
      <path d="M0 224 Q100 204 200 218 T400 212 V300 H0 Z" fill="${dusk ? '#d6b989' : C.sand}" ${st(2.6)}/>
      <path d="M0 228 Q90 212 180 222 T400 218" fill="none" stroke="${C.cream}" stroke-width="3.4" opacity=".7"/>
      <path d="M48 226 C40 190 48 158 64 132" fill="none" stroke="${C.brown}" stroke-width="8" stroke-linecap="round" ${st(0)}/>
      <path d="M64 132 q-30 -6 -42 -24 q24 -3 42 14 z" fill="${C.greenDark}" ${st(2.2)}/>
      <path d="M64 132 q4 -30 22 -40 q8 22 -10 40 z" fill="${C.greenDark}" ${st(2.2)}/>
      <path d="M64 132 q30 -4 44 -20 q-4 22 -34 26 z" fill="${C.greenDark}" ${st(2.2)}/>
      <path d="M64 132 q-24 8 -32 24 q22 0 36 -14 z" fill="${C.greenDark}" ${st(2.2)}/>
      ${boat(296, 204, .88)}
      ${person({ x: 176, y: 260, s: .92, shirt: '#405360', pants: '#2b3438', pose: 'stand', face: 'neutral', hairStyle: 'short' })}
      ${person({ x: 230, y: 264, s: .98, shirt: C.teal, pose: 'stand', face: 'smile', hat: 'straw', hairStyle: 'short' })}
      <path d="M150 274 q30 -4 62 0" fill="none" ${st(1.4)} opacity=".3"/>
      <path d="M200 284 q40 -4 84 0" fill="none" ${st(1.4)} opacity=".25"/>
    `;
  }

  function square(time) {
    const sk = sky(time);
    const dark = time === 'night' || time === 'dark';
    const wall = dark ? '#7a644a' : '#efe3c8';
    const line = C.ink;
    return sk.defs + sk.body + `
      <path d="M0 300 V238 H400 V300 Z" fill="${dark ? '#3a332b' : '#d7c5a4'}" ${st(2.6)}/>
      <path d="M30 108 H370 V238 H30 Z" fill="${wall}" ${st(3)}/>
      <path d="M22 108 L200 56 L378 108 Z" fill="${dark ? '#8b7052' : '#f4e9d2'}" ${st(3)}/>
      <path d="M56 108 L200 66 L344 108 Z" fill="${dark ? '#6a533d' : '#d8c3a0'}" ${st(2)}/>
      <g fill="${dark ? '#524334' : '#e2d2b2'}" ${st(2.4)}>
        <rect x="56" y="112" width="16" height="126"/><rect x="104" y="112" width="16" height="126"/>
        <rect x="152" y="112" width="16" height="126"/><rect x="232" y="112" width="16" height="126"/>
        <rect x="280" y="112" width="16" height="126"/><rect x="328" y="112" width="16" height="126"/>
      </g>
      <g stroke="${C.ink}" stroke-width="1.6" opacity=".4">
        <path d="M60 118 V234 M108 118 V234 M156 118 V234 M236 118 V234 M284 118 V234 M332 118 V234"/>
      </g>
      <rect x="22" y="238" width="356" height="12" fill="${dark ? '#6b5941' : '#e7d8bb'}" ${st(2.6)}/>
      <path d="M0 300 V270 H400 V300 Z" fill="${dark ? '#2b2620' : '#c9b28d'}" ${st(2.6)}/>
      ${person({ x: 132, y: 252, s: .98, shirt: C.green, pose: 'think', face: 'smirk', beard: true, hairStyle: 'short' })}
      <path d="M100 218 H164 V252 Q164 262 154 262 H110 Q100 262 100 252 Z" fill="${C.brown}" ${st(3)}/>
      <path d="M100 226 H164 M100 246 H164" fill="none" ${st(2.4)}/>
      <path d="M100 218 Q132 210 164 218" fill="${C.orange}" ${st(2.4)}/>
      ${person({ x: 286, y: 254, s: 1.02, shirt: C.crimson, cape: C.crimson, pose: 'stand', face: 'smile', hat: 'crown', hairStyle: 'short' })}
      <g opacity=".9">
        ${person({ x: 334, y: 248, s: .84, shirt: '#4b4b42', pose: 'stand', face: 'neutral', hairStyle: 'short' })}
        ${person({ x: 240, y: 246, s: .8, shirt: '#5a5648', pose: 'stand', face: 'neutral', hairStyle: 'short' })}
      </g>
      <path d="M334 200 v-40 M240 204 v-34" fill="none" ${st(2.6)}/>
      <path d="M334 160 l-4 -14 l8 4 z" fill="${C.ink}"/>
      <path d="M240 170 l-4 -12 l8 4 z" fill="${C.ink}"/>
      <path d="M0 300 H400" ${st(0)}/>
    `;
  }

  function palace(time) {
    const dark = time === 'night' || time === 'dark';
    const wall = dark ? '#3c2628' : '#5f3334';
    const light = dark ? .75 : 1;
    return `
      <defs><linearGradient id="pal${++seq}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${dark ? '#211416' : '#4a282b'}"/><stop offset="1" stop-color="${wall}"/>
      </linearGradient></defs>
      <rect width="400" height="300" fill="url(#pal${seq})"/>
      <path d="M0 0 H400 V54 Q300 78 200 54 Q100 30 0 54 Z" fill="${C.red}" ${st(2.6)}/>
      <g fill="${dark ? '#4d3030' : '#74413f'}" ${st(2)}>
        <rect x="16" y="0" width="34" height="300"/><rect x="350" y="0" width="34" height="300"/>
      </g>
      <g fill="${C.gold}" ${st(1.6)}>
        <rect x="50" y="0" width="6" height="300"/><rect x="344" y="0" width="6" height="300"/>
      </g>
      <path d="M0 300 V238 H400 V300 Z" fill="${dark ? '#1d1315' : '#3a2224'}" ${st(2.6)}/>
      <path d="M168 0 L232 0 L292 238 L108 238 Z" fill="${C.cream}" opacity=".07"/>
      <path d="M56 228 H344" fill="none" ${st(2.4)} opacity=".5"/>
      <g>
        <path d="M126 206 H286 V216 H126 Z" fill="${C.brown}" ${st(2.4)}/>
        <path d="M134 216 v40 M278 216 v40" fill="none" ${st(4)}/>
        <path d="M144 206 q24 -8 48 0 q-8 12 -24 12 q-16 0 -24 -12 z" fill="${C.gold}" ${st(2.2)}/>
        <circle cx="164" cy="198" r="6" fill="${C.crimson}" ${st(1.8)}/>
        <circle cx="188" cy="196" r="6" fill="${C.green}" ${st(1.8)}/>
        <circle cx="212" cy="198" r="6" fill="${C.orange}" ${st(1.8)}/>
      </g>
      <g>
        <path d="M292 238 V192 Q292 176 314 176 Q336 176 336 192 V238 Z" fill="${C.gold}" ${st(2.8)}/>
        <path d="M286 194 H342 V202 H286 Z" fill="#c9932f" ${st(2.2)}/>
        <path d="M300 204 V232 M328 204 V232" fill="none" ${st(2)} opacity=".55"/>
      </g>
      <path d="M304 0 V96" fill="none" stroke="${C.cream}" stroke-width="1.6"/>
      <g transform="translate(304 96)">
        <path d="M-8 0 H8 L4 9 H-4 Z" fill="${C.gold}" ${st(2.2)}/>
        <path d="M-3 9 H3 L7 58 H-7 Z" fill="#d8d4c6" ${st(2.4)}/>
        <path d="M0 10 V58" fill="none" ${st(1.2)} opacity=".5"/>
        <path d="M-7 58 l7 9 l7 -9" fill="${C.gold}" ${st(1.8)}/>
      </g>
      ${person({ x: 322, y: 254, s: 1, shirt: '#4a3457', cape: C.crimson, pose: 'stand', face: 'neutral', hat: 'crown', hairStyle: 'short' })}
      ${person({ x: 198, y: 256, s: 1.02, shirt: '#7a5b3a', pose: 'stand', face: 'surprise', hairStyle: 'short' })}
      <g opacity="${light}">
        <circle cx="304" cy="96" r="46" fill="${C.gold}" opacity=".12"/>
        <path d="M304 60 l-10 20 h20 z" fill="${C.gold}" opacity=".18"/>
      </g>
      <path d="M0 300 V286 H400 V300 Z" fill="${C.ink}" opacity=".5"/>
    `;
  }

  function cave(time, variant) {
    const exit = variant === 'exit';
    return `
      <defs><radialGradient id="fire${++seq}" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="${C.gold}" stop-opacity=".5"/><stop offset="1" stop-color="${C.gold}" stop-opacity="0"/>
      </radialGradient></defs>
      <rect width="400" height="300" fill="#10100e"/>
      <path d="M0 300 V62 Q54 20 124 40 Q180 56 220 38 Q282 14 330 48 Q370 74 400 58 V300 Z" fill="#241d18" ${st(3)}/>
      <path d="M0 96 Q64 50 132 76 Q196 100 254 78 Q318 54 400 92" fill="none" stroke="#3b2f26" stroke-width="10" opacity=".8"/>
      ${exit ? `
        <circle cx="356" cy="48" r="70" fill="url(#fire${seq})"/>
        <circle cx="358" cy="44" r="30" fill="${C.cream}"/>
        <path d="M400 0 L262 300 H400 Z" fill="${C.cream}" opacity=".13"/>
        <path d="M336 20 L246 300" stroke="${C.cream}" stroke-width="2.4" opacity=".35"/>
        <path d="M366 16 L300 300" stroke="${C.cream}" stroke-width="1.6" opacity=".22"/>
      ` : ''}
      <g>
        <ellipse cx="100" cy="252" rx="38" ry="10" fill="#0b0a08"/>
        <path d="M100 224 q8 -22 -6 -34 q22 6 24 34 q-10 8 -18 0 z" fill="${C.orange}" ${st(2.2)}/>
        <path d="M100 228 q-12 14 -2 26 q10 -10 6 -26 z" fill="${C.gold}" ${st(1.6)}/>
        <path d="M100 238 q8 8 2 16 q-8 -6 -2 -16 z" fill="${C.cream}" ${st(1)}/>
        <circle cx="100" cy="226" r="58" fill="url(#fire${seq})"/>
      </g>
      <g opacity=".55" fill="#3c3026">
        <path d="M140 128 q18 -14 38 0 v96 h-38 z"/>
        <path d="M238 106 q24 -12 48 0 v118 h-48 z"/>
        <ellipse cx="292" cy="162" rx="17" ry="28"/>
        <ellipse cx="168" cy="172" rx="13" ry="21"/>
        <path d="M320 120 q14 18 0 36 q-14 -18 0 -36 z"/>
      </g>
      ${seated(154, 272, 1.05, '#4a3a2e')}
      ${seated(202, 276, 1.15, '#403227')}
      ${seated(252, 272, 1.05, '#4a3a2e')}
      <g fill="none" ${st(2.4)} opacity=".7">
        <path d="M118 270 q18 -12 34 -4"/>
        <path d="M168 274 q18 -12 34 -4"/>
        <path d="M220 276 q18 -12 34 -4"/>
      </g>
      ${exit ? `
        <g>
          <path d="M262 282 l-64 -38 M306 286 l-76 -54" fill="none" stroke="${C.cream}" stroke-width="2.4" opacity=".25"/>
          ${person({ x: 322, y: 270, s: .95, shirt: '#6b5a48', pose: 'walk', face: 'surprise', hairStyle: 'short' })}
        </g>` : ''}
      <path d="M0 0 H400 V300 H0 Z" fill="#000" opacity="${exit ? .05 : .12}"/>
    `;
  }

  function farm(time) {
    const sk = sky(time);
    const dark = time === 'night' || time === 'dark';
    return sk.defs + sk.body + `
      <path d="M0 300 V184 Q80 146 160 176 Q240 206 320 170 Q360 152 400 174 V300 Z" fill="${dark ? '#33543f' : '#7fae77'}" ${st(2.6)}/>
      <path d="M0 300 V224 Q100 200 200 220 Q300 240 400 212 V300 Z" fill="${dark ? '#284333' : '#5c8a5c'}" ${st(2.6)}/>
      <g>
        <path d="M42 196 H122 V246 H42 Z" fill="${dark ? '#5b4634' : '#e0bd83'}" ${st(2.8)}/>
        <path d="M32 196 L82 156 L132 196 Z" fill="${C.crimson}" ${st(2.8)}/>
        <rect x="72" y="212" width="20" height="34" fill="${C.brown}" ${st(2.2)}/>
        <rect x="50" y="204" width="15" height="14" fill="${C.cream}" ${st(2)}/>
        <path d="M82 156 V136" fill="none" ${st(2)}/><path d="M82 136 l14 5 l-14 6 z" fill="${C.gold}" ${st(1.4)}/>
      </g>
      <g fill="none" ${st(3)} opacity=".9">
        <path d="M0 246 H70 M0 262 H70"/>
        <path d="M12 246 V262 M32 246 V262 M52 246 V262"/>
      </g>
      ${horse(296, 244, .95, dark ? '#3a2a20' : '#7a5334')}
      ${person({ x: 178, y: 258, s: .98, shirt: '#54707a', pose: 'stand', face: 'neutral', hat: 'straw', hairStyle: 'short' })}
      ${tree(356, 248, .72, dark ? '#244134' : C.greenDark)}
      <path d="M0 300 V286 Q100 272 200 284 Q300 296 400 282 V300 Z" fill="${dark ? '#1d3027' : '#3f6b4a'}" ${st(2.4)}/>
    `;
  }

  function pottery(time) {
    return `
      <rect width="400" height="300" fill="#e9d6b4"/>
      <path d="M0 300 V232 H400 V300 Z" fill="#b98156" ${st(2.8)}/>
      <path d="M0 228 H400" fill="none" ${st(3)}/>
      <g>
        <rect x="32" y="42" width="116" height="82" fill="#8fd0ca" ${st(4)}/>
        <path d="M32 76 H148 M90 42 V124" fill="none" ${st(3)}/>
        <path d="M40 52 q18 8 0 16 q-18 8 0 16" fill="none" stroke="${C.cream}" stroke-width="2" opacity=".7"/>
      </g>
      <rect x="198" y="54" width="160" height="9" fill="${C.brown}" ${st(2.6)}/>
      <g>
        <path d="M212 64 q-10 -22 8 -22 h10 q18 0 8 22 q-6 12 -13 12 q-8 0 -13 -12 z" fill="#b9744c" ${st(2.4)}/>
        <path d="M254 64 q-9 -26 9 -26 h8 q18 0 9 26 q-5 13 -13 13 q-8 0 -13 -13 z" fill="${C.orange}" ${st(2.4)}/>
        <path d="M296 64 q-8 -16 7 -16 h8 q15 0 7 16 q-4 10 -11 10 q-7 0 -11 -10 z" fill="${C.gold}" ${st(2.4)}/>
      </g>
      <path d="M52 232 H344 V242 H52 Z" fill="#8f5f3c" ${st(2.6)}/>
      <g>
        <path d="M96 232 q-16 -34 0 -52 q10 -10 7 -22 h18 q-3 12 7 22 q16 18 0 52 z" fill="#c98f63" ${st(2.8)}/>
        <path d="M98 190 h24" fill="none" ${st(1.6)} opacity=".5"/>
        <path d="M100 200 h20" fill="none" ${st(1.4)} opacity=".4"/>
      </g>
      <g>
        <path d="M176 232 q-18 -38 0 -56 q10 -10 8 -24 h20 q-2 14 8 24 q18 18 0 56 z" fill="#b9744c" ${st(2.8)}/>
        <path d="M174 190 q22 7 44 0" fill="none" ${st(2)} opacity=".55"/>
        <path d="M190 178 l7 13 -8 11 9 11 -6 13" fill="none" stroke="${C.ink}" stroke-width="2.4" stroke-linecap="round"/>
        ${flower(198, 178, .95, C.gold)}
        ${flower(208, 184, .75, C.crimson)}
      </g>
      <g>
        <path d="M256 232 q-13 -28 0 -42 q8 -8 6 -17 h16 q-2 9 6 17 q13 14 0 42 z" fill="#c9a06d" ${st(2.8)}/>
      </g>
      ${person({ x: 328, y: 254, s: .9, shirt: C.teal, pose: 'point', face: 'smile', hairStyle: 'bun' })}
      <path d="M368 50 v26 M362 50 h12" fill="none" ${st(2)} opacity=".5"/>
      <circle cx="368" cy="86" r="8" fill="${C.gold}" ${st(2)}/>
    `;
  }

  function river(time) {
    const sk = sky(time);
    const dark = time === 'night' || time === 'dark';
    return sk.defs + sk.body + `
      <path d="M0 300 V174 Q50 154 100 172 Q150 190 200 168 Q250 146 300 166 Q350 186 400 164 V300 Z" fill="${dark ? '#1e3531' : '#78966f'}" ${st(2.6)}/>
      <path d="M0 300 V198 Q60 178 120 194 Q180 210 240 190 Q300 170 360 190 Q380 196 400 188 V300 Z" fill="${dark ? '#24464a' : '#6fa7a2'}" ${st(2.6)}/>
      <g fill="none" stroke="${C.cream}" stroke-width="2.2" opacity="${dark ? .5 : .65}">
        <path d="M18 218 q32 -6 64 0 t64 0 t64 0 t64 0 t64 0 t64 0"/>
        <path d="M0 242 q34 -6 68 0 t68 0 t68 0 t68 0 t68 0 t68 0"/>
        <path d="M38 266 q30 -5 60 0 t60 0 t60 0 t60 0 t60 0"/>
      </g>
      ${dark ? `<path d="M322 56 v80" stroke="${C.cream}" stroke-width="2" opacity=".22"/><ellipse cx="322" cy="150" rx="30" ry="5" fill="${C.cream}" opacity=".2"/>` : ''}
      ${boat(272, 202, .95, false)}
      <path d="M250 208 q30 -8 54 0" fill="none" ${st(2.2)}/>
      <path d="M238 202 l-26 -10" fill="none" ${st(3)}/>
      <g fill="none" stroke="${dark ? '#2c4a3b' : C.greenDark}" stroke-width="2.6" stroke-linecap="round">
        <path d="M180 246 q-2 -28 8 -42"/><path d="M186 240 q-14 -10 -16 -24"/><path d="M190 234 q12 -12 12 -26"/>
        <path d="M372 252 q2 -26 -8 -38"/><path d="M366 244 q14 -10 16 -22"/>
      </g>
      ${person({ x: 96, y: 262, s: .95, shirt: '#416a74', pose: 'stand', face: 'neutral', hairStyle: 'short' })}
      <path d="M96 220 L60 292" fill="none" ${st(3)}/>
      <circle cx="58" cy="294" r="4" fill="${C.brown}" ${st(1.6)}/>
      ${star(146, 120, 3)}${star(204, 104, 2.4)}${star(272, 138, 2.8)}
      <path d="M0 300 V282 Q100 272 200 282 Q300 292 400 280 V300 Z" fill="${dark ? '#12201d' : '#41634f'}" ${st(2.4)}/>
    `;
  }

  function kingdom(time) {
    const sk = sky(time);
    const dark = time === 'night' || time === 'dark';
    return sk.defs + sk.body + `
      <path d="M0 300 V202 Q70 168 140 194 Q210 220 280 188 Q340 160 400 186 V300 Z" fill="${dark ? '#30473c' : '#83a37f'}" ${st(2.6)}/>
      <path d="M0 300 V248 Q100 228 200 244 Q300 260 400 236 V300 Z" fill="${dark ? '#263a30' : '#5d8a62'}" ${st(2.6)}/>
      <g>
        <rect x="178" y="116" width="112" height="78" fill="${dark ? '#5a4c3c' : '#dcc79f'}" ${st(2.8)}/>
        <path d="M170 116 L234 76 L298 116 Z" fill="${C.crimson}" ${st(2.8)}/>
        <rect x="158" y="92" width="26" height="104" fill="${dark ? '#6b5a45' : '#cdb68d'}" ${st(2.6)}/>
        <path d="M154 92 L171 66 L188 92 Z" fill="${C.crimson}" ${st(2.6)}/>
        <rect x="286" y="100" width="24" height="96" fill="${dark ? '#6b5a45' : '#cdb68d'}" ${st(2.6)}/>
        <path d="M282 100 L298 76 L314 100 Z" fill="${C.crimson}" ${st(2.6)}/>
        <path d="M171 66 V48" fill="none" ${st(2)}/><path d="M171 48 l16 5 l-16 6 z" fill="${C.gold}" ${st(1.4)}/>
        <path d="M298 76 V58" fill="none" ${st(2)}/><path d="M298 58 l14 5 l-14 6 z" fill="${C.gold}" ${st(1.4)}/>
        <rect x="222" y="152" width="24" height="42" fill="${C.brown}" ${st(2.4)}/>
        <rect x="190" y="130" width="16" height="20" fill="${C.cream}" ${st(2)}/>
        <rect x="262" y="130" width="16" height="20" fill="${C.cream}" ${st(2)}/>
        <path d="M178 116 H290" fill="none" ${st(2)} opacity=".4"/>
      </g>
      <path d="M208 300 Q194 264 170 230 Q158 212 176 214 Q196 218 206 244 Q224 272 232 300 Z" fill="${dark ? '#6b5a45' : '#d7c09a'}" ${st(2.6)}/>
      <path d="M0 300 Q42 262 84 258 Q126 254 150 300 Z" fill="${dark ? '#3d3228' : '#c9b08a'}" ${st(2.6)}/>
      <g>
        <rect x="38" y="250" width="38" height="28" fill="${dark ? '#5b4a3a' : '#e0bd83'}" ${st(2.4)}/>
        <path d="M33 250 L57 232 L81 250 Z" fill="${C.crimson}" ${st(2.4)}/>
        <rect x="51" y="262" width="10" height="16" fill="${C.brown}" ${st(1.8)}/>
      </g>
      ${person({ x: 250, y: 282, s: .58, shirt: '#6b7d8f', pose: 'walk', face: 'neutral', hairStyle: 'short' })}
      ${person({ x: 278, y: 286, s: .54, shirt: '#8a6a4a', pose: 'walk', face: 'neutral', hairStyle: 'short' })}
      ${tree(358, 262, .65, dark ? '#244134' : C.greenDark)}
      <path d="M0 300 H400" ${st(0)}/>
    `;
  }

  function road(time, variant) {
    const sk = sky(time);
    const dark = time === 'night' || time === 'dark';
    const flowers = variant === 'flowers';
    const ring = variant === 'ring';
    return sk.defs + sk.body + `
      <path d="M0 300 V190 Q70 150 140 176 Q210 202 280 168 Q340 140 400 170 V300 Z" fill="${dark ? '#31493e' : '#93b08b'}" ${st(2.6)}/>
      <path d="M0 300 V230 Q100 210 200 228 Q300 246 400 218 V300 Z" fill="${dark ? '#273f34' : '#6a916b'}" ${st(2.6)}/>
      <path d="M148 300 Q168 240 202 208 Q224 186 218 164 Q214 148 230 146 Q246 148 242 164 Q238 184 256 204 Q286 234 300 300 Z" fill="${dark ? '#6d604b' : '#dcc79f'}" ${st(2.8)}/>
      <path d="M184 300 Q202 252 226 224" fill="none" stroke="${C.cream}" stroke-width="3.4" opacity=".55" stroke-dasharray="10 8"/>
      ${ring ? `<g><ellipse cx="232" cy="252" rx="13" ry="6" fill="${C.gold}" ${st(2.4)}/><ellipse cx="232" cy="252" rx="7" ry="3" fill="${C.ink}" opacity=".25"/><path d="M244 238 l3 -8 M250 244 l8 -3 M246 250 l5 6" ${st(1.4)} opacity=".8"/></g>` : ''}
      <g transform="translate(316 212)">
        <path d="M0 0 V-48" fill="none" ${st(4)}/>
        <path d="M-26 -48 H26 V-26 H-26 Z" fill="${C.cream}" ${st(2.6)}/>
        <path d="M-16 -43 H-4 M-16 -35 H6" fill="none" ${st(2.4)}/>
      </g>
      ${tree(80, 242, .98, dark ? '#244134' : C.greenDark)}
      ${flowers ? `<g>${flower(70, 276, 1, C.orange)}${flower(96, 290, .9, C.gold)}${flower(122, 272, .8, C.crimson)}${flower(50, 294, .8, C.gold)}${flower(148, 290, .75, C.orange)}${flower(252, 294, .8, C.gold)}</g>` : ''}
      ${person({ x: 206, y: 272, s: .66, shirt: '#7a5b3a', pose: 'walk', face: 'neutral', hairStyle: 'short' })}
    `;
  }

  function desert(time, variant) {
    const sk = sky(time);
    const dark = time === 'night' || time === 'dark';
    const warm = time === 'dusk' || time === 'dawn';
    return sk.defs + sk.body + `
      <path d="M0 300 V196 Q80 168 160 188 Q240 208 320 182 Q360 170 400 184 V300 Z" fill="${dark ? '#5a4431' : warm ? '#d9a35f' : '#e0b36f'}" ${st(2.6)}/>
      <path d="M0 300 V230 Q100 200 200 222 Q300 244 400 210 V300 Z" fill="${dark ? '#433224' : warm ? '#c88a4f' : '#d29a56'}" ${st(2.6)}/>
      <path d="M0 300 V262 Q120 238 240 258 Q320 272 400 252 V300 Z" fill="${dark ? '#2e231a' : warm ? '#a96638' : '#b97a42'}" ${st(2.6)}/>
      <g fill="none" stroke="${C.ink}" stroke-width="2" opacity=".35">
        <path d="M20 282 q80 -12 160 0 t160 0"/>
        <path d="M60 246 q70 -10 140 0 t140 0"/>
      </g>
      ${variant === 'camel' ? `
        ${camel(238, 240, 1.02, dark ? '#4a3424' : '#8a5f3a')}
        ${person({ x: 160, y: 268, s: .62, shirt: C.orange, pose: 'walk', face: 'tired', hairStyle: 'short' })}
      ` : variant === 'lion' ? `
        <path d="M150 250 q44 -28 92 -6 q20 10 12 22 H150 Z" fill="${dark ? '#3d2d20' : '#8a5f3a'}" ${st(2.6)}/>
        ${lion(226, 224, 1.05)}
      ` : variant === 'child' ? `
        <path d="M116 300 q20 -24 36 -24 q16 0 28 24 z" fill="${dark ? '#3a2b1f' : '#c98a4b'}" ${st(2.4)}/>
        ${person({ x: 202, y: 260, s: .86, shirt: C.teal, pose: 'reach', face: 'smile', hair: '#d46a8e', hairStyle: 'bob', headphones: true, sweat: false })}
        ${star(248, 150, 12, C.gold)}
        ${star(300, 112, 6, C.cream)}
        ${star(166, 122, 5, C.cream)}
        ${butterfly(282, 208, .8, C.orange)}
        ${butterfly(236, 186, .6, C.gold)}
      ` : `
        ${person({ x: 214, y: 266, s: .7, shirt: '#7a5b3a', pose: 'walk', face: 'neutral', hairStyle: 'short' })}
        ${star(300, 120, 6, C.gold)}
      `}
      <path d="M0 300 H400" ${st(0)}/>
    `;
  }

  function gate(time, variant) {
    const sk = sky(time);
    const dark = time === 'night' || time === 'dark';
    const dawn = time === 'dawn';
    return sk.defs + sk.body + `
      <path d="M0 300 V210 H400 V300 Z" fill="${dark ? '#2b2a28' : '#b9a98d'}" ${st(2.6)}/>
      <g fill="${dark ? '#4a4640' : '#cbbda3'}" ${st(3)}>
        <rect x="82" y="66" width="48" height="170"/>
        <rect x="270" y="66" width="48" height="170"/>
        <rect x="70" y="48" width="260" height="30"/>
        <path d="M60 48 L200 14 L340 48 Z" fill="${dark ? '#57524a' : '#d6c8ad'}" ${st(3)}/>
      </g>
      <g fill="none" ${st(1.8)} opacity=".55">
        <path d="M94 86 H118 M94 112 H118 M94 138 H118 M94 164 H118 M94 190 H118 M94 216 H118"/>
        <path d="M282 86 H306 M282 112 H306 M282 138 H306 M282 164 H306 M282 190 H306 M282 216 H306"/>
        <path d="M84 62 H316 M84 72 H316"/>
      </g>
      <path d="M130 236 V96 H270 V236" fill="none" ${st(2.6)} opacity=".45"/>
      <path d="M130 236 H270" fill="none" ${st(2.6)} opacity=".45"/>
      <g>
        <path d="M40 150 v-36" fill="none" ${st(4)}/>
        <path d="M40 114 q-8 -16 2 -22 q10 6 6 22 q-4 8 -8 0 z" fill="${C.orange}" ${st(2)}/>
        <circle cx="40" cy="112" r="20" fill="${C.gold}" opacity=".18"/>
        <path d="M360 150 v-36" fill="none" ${st(4)}/>
        <path d="M360 114 q-8 -16 2 -22 q10 6 6 22 q-4 8 -8 0 z" fill="${C.orange}" ${st(2)}/>
        <circle cx="360" cy="112" r="20" fill="${C.gold}" opacity=".18"/>
      </g>
      ${person({ x: 168, y: 254, s: .98, shirt: '#6e8f83', robe: '#d9c8a8', pose: 'stand', face: 'neutral', hairStyle: 'long', hair: '#3a2b24' })}
      ${person({ x: 122, y: 258, s: .84, shirt: '#8a7a68', robe: '#c9bca4', pose: 'stand', face: 'tired', hairStyle: 'long', hair: '#4a3528' })}
      <path d="M147 218 v-10 q0 -8 8 -8 q8 0 8 8 v10 z" fill="${C.gold}" ${st(2)}/>
      <circle cx="155" cy="218" r="5" fill="${C.cream}" ${st(1.6)}/>
      <g opacity=".85">
        ${person({ x: 300, y: 252, s: .82, shirt: '#4b4b42', pose: 'stand', face: 'neutral', hairStyle: 'short' })}
        ${person({ x: 332, y: 248, s: .78, shirt: '#5a5648', pose: 'stand', face: 'neutral', hairStyle: 'short' })}
        <path d="M300 206 v-40 M332 202 v-34" fill="none" ${st(2.4)}/>
        <path d="M300 166 l-4 -12 l8 4 z" fill="${C.ink}"/>
        <path d="M332 168 l-4 -12 l8 4 z" fill="${C.ink}"/>
      </g>
      ${dawn ? `<path d="M0 300 V270 Q100 252 200 264 T400 258 V300 Z" fill="#7d6a52" ${st(2.4)}/>` : ''}
      <path d="M0 300 H400" ${st(0)}/>
    `;
  }

  function meadow(time, variant) {
    const sk = sky(time);
    const dark = time === 'night' || time === 'dark';
    const dream = variant === 'butterfly';
    const sprout = variant === 'bamboo';
    const tall = variant === 'bamboo-tall';
    const grove = sprout || tall;
    return sk.defs + sk.body + `
      <path d="M0 300 V186 Q70 158 140 180 Q210 202 280 176 Q340 154 400 178 V300 Z" fill="${dark ? '#27443c' : '#86ad7f'}" ${st(2.6)}/>
      <path d="M0 300 V232 Q100 210 200 228 Q300 246 400 218 V300 Z" fill="${dark ? '#1f3832' : '#628e66'}" ${st(2.6)}/>
      <path d="M0 300 V262 Q120 242 240 258 Q320 270 400 254 V300 Z" fill="${dark ? '#172b26' : '#4a7554'}" ${st(2.4)}/>
      ${dark ? `<path d="M300 300 V210 Q300 190 320 190 Q340 190 340 210 V300 Z" fill="#31555a" ${st(2.2)}/><path d="M306 240 q16 -4 28 0" fill="none" stroke="${C.cream}" stroke-width="1.6" opacity=".45"/>` : ''}
      ${tree(92, 256, 1.15, dark ? '#1d3b30' : C.greenDark)}
      ${grove ? '' : lying(176, 268, .95, { shirt: C.teal, hair: '#d46a8e', headphones: true, rot: -4 })}
      ${grove ? `
        ${tall ? `
          <g>
            <path d="M320 300 V100" fill="none" stroke="${dark ? '#3a6049' : '#8bbb67'}" stroke-width="10" stroke-linecap="round"/>
            <path d="M286 300 V158" fill="none" stroke="${dark ? '#325340' : '#7cab5c'}" stroke-width="8" stroke-linecap="round"/>
            <g stroke="${dark ? '#25412f' : '#5f8f46'}" stroke-width="2.2" opacity=".9">
              <path d="M313 262 h14 M313 216 h14 M313 170 h14 M313 128 h14"/>
              <path d="M281 258 h10 M281 216 h10 M281 178 h10"/>
            </g>
            <g fill="${dark ? '#2f5641' : '#6fa04f'}" ${st(2)}>
              <path d="M320 168 q34 -22 46 -2 q-24 14 -46 2 z"/>
              <path d="M320 214 q-30 -18 -44 -2 q22 14 44 2 z"/>
              <path d="M286 206 q28 -20 40 -4 q-20 14 -40 4 z"/>
            </g>
          </g>
        ` : `
          <g>
            <path d="M320 300 V268" fill="none" stroke="${dark ? '#3a6049' : '#8bbb67'}" stroke-width="7" stroke-linecap="round"/>
            <g fill="${dark ? '#2f5641' : '#6fa04f'}" ${st(2)}>
              <path d="M320 274 q26 -16 36 -2 q-18 12 -36 2 z"/>
              <path d="M320 282 q-22 -12 -32 0 q16 10 32 0 z"/>
            </g>
            <path d="M320 300 q-6 6 -10 2 M320 300 q6 6 10 2" fill="none" stroke="${dark ? '#25412f' : '#5f8f46'}" stroke-width="2" opacity=".7"/>
          </g>
        `}
        ${person({ x: 176, y: 274, s: .8, shirt: C.teal, pose: 'stand', face: 'neutral', hairStyle: 'short' })}
        ${person({ x: 214, y: 276, s: .72, shirt: '#7a5b3a', pose: 'point', face: 'smile', hairStyle: 'bald' })}
      ` : ''}
      <g fill="none" stroke="${dark ? '#1b332b' : C.greenDark}" stroke-width="2.4" stroke-linecap="round">
        <path d="M250 282 q-4 -20 6 -30"/><path d="M258 278 q-12 -6 -16 -16"/><path d="M262 272 q10 -8 12 -18"/>
        <path d="M320 292 q-2 -16 6 -24"/><path d="M326 288 q-10 -4 -14 -12"/>
      </g>
      ${flower(300, 284, .9, C.gold)}
      ${flower(342, 290, .8, C.orange)}
      ${flower(240, 294, .7, C.crimson)}
      ${dream ? `
        <circle cx="272" cy="150" r="56" fill="${C.gold}" opacity=".14"/>
        ${butterfly(272, 150, 2.3, C.gold)}
        ${butterfly(216, 116, .9, C.orange)}
        ${butterfly(330, 190, 1, C.cream)}
        ${star(210, 88, 5, C.cream)}
        ${star(342, 112, 4, C.cream)}
      ` : `
        ${butterfly(252, 180, .7, C.orange)}
        ${butterfly(316, 206, .55, C.gold)}
        ${star(210, 96, 3.5, C.cream)}
      `}
      ${dark ? `<g fill="${C.gold}" opacity=".8">${star(150, 216, 2.2, C.gold)}${star(220, 230, 1.8, C.gold)}${star(286, 218, 2, C.gold)}${star(350, 240, 1.7, C.gold)}</g>` : ''}
      <path d="M0 300 H400" ${st(0)}/>
    `;
  }

  /* quarto: cama, janela e a mesa com o computador aceso */
  function room(time, variant) {
    const dark = time === 'night' || time === 'dark';
    const warm = time === 'dusk' || time === 'dawn';
    const wall = dark ? '#2c3237' : warm ? '#c9b096' : '#cec7b7';
    const wallLow = dark ? '#242a2e' : warm ? '#b89f84' : '#bdb4a2';
    const floor = dark ? '#1b2023' : '#8b7760';
    const wood = dark ? '#4b3c2f' : '#a8825a';
    const woodDark = dark ? '#33291f' : '#84643f';
    const skyC = dark ? '#1c2b34' : warm ? '#e9a566' : '#a9c8d5';
    const sheet = dark ? '#b9b3a4' : '#f3eddf';
    const busy = variant === 'desk';
    const door = variant === 'door';
    return `
      <rect width="400" height="300" fill="${wall}"/>
      <rect y="236" width="400" height="64" fill="${floor}"/>
      <path d="M0 236 H400" ${st(3)}/>
      <path d="M0 194 H400" fill="none" stroke="${wallLow}" stroke-width="3"/>
      <g opacity=".14" stroke="${C.ink}" stroke-width="2">
        <path d="M124 194 v42 M224 194 v42 M324 194 v42"/>
      </g>

      <g>
        <rect x="32" y="44" width="106" height="108" rx="2" fill="${skyC}" ${st(3)}/>
        ${dark ? moon(112, 74, 14) : sun(112, 76, 12, warm ? C.orange : C.gold)}
        <path d="M85 44 V152 M32 99 H138" fill="none" ${st(2.6)}/>
        <rect x="24" y="152" width="122" height="9" rx="2" fill="${woodDark}" ${st(2.4)}/>
        <path d="M32 44 h106 v108 h-106 z" fill="${dark ? C.gold : C.cream}" opacity="${dark ? .12 : .07}"/>
      </g>

      <g transform="translate(206 74)">
        <circle r="20" fill="${C.cream}" ${st(2.8)}/>
        <path d="M0 -13 V0 L9 6" fill="none" ${st(2.6)}/>
        <circle r="2" fill="${C.ink}"/>
      </g>

      ${door ? `
        <g>
          <rect x="248" y="96" width="104" height="140" fill="${dark ? '#15181a' : '#5d462c'}" ${st(3)}/>
          <path d="M248 96 L316 80 V236 L248 236 Z" fill="${C.gold}" opacity=".38" ${st(2.6)}/>
          <path d="M316 80 V236" fill="none" ${st(3)}/>
          <circle cx="306" cy="162" r="3.2" fill="${C.gold}" ${st(1.2)}/>
        </g>
        ${person({ x: 196, y: 244, s: .98, shirt: '#6f8190', pose: 'stand', face: 'sad', hairStyle: 'short', hair: '#2a2119' })}
      ` : busy ? `
        <g>
          <rect x="150" y="206" width="200" height="11" rx="3" fill="${wood}" ${st(2.8)}/>
          <path d="M166 217 v36 M334 217 v36" fill="none" ${st(4)}/>
          <g transform="translate(268 178)">
            <rect x="-24" y="4" width="48" height="28" rx="3" fill="${dark ? '#20262a' : '#3b4347'}" ${st(2.4)}/>
            <path d="M-18 11 h36 M-18 17 h24 M-18 23 h30" stroke="${C.gold}" stroke-width="1.6" fill="none" opacity=".75"/>
            <path d="M-28 32 h56 l-6 -9 h-44 z" fill="${dark ? '#4a5054' : '#e6dfd0'}" ${st(2.2)}/>
          </g>
          <g transform="translate(198 192)">
            <rect x="-20" y="-13" width="40" height="28" rx="1" fill="${C.cream}" ${st(2)} transform="rotate(-7)"/>
            <path d="M-13 -6 h24 M-13 0 h18 M-13 6 h22" stroke="${C.ink}" stroke-width="1.3" opacity=".4" fill="none" transform="rotate(-7)"/>
          </g>
          <g transform="translate(318 194)">
            <path d="M-8 -14 h16 v14 q0 6 -8 6 q-8 0 -8 -6 z" fill="${dark ? '#5e6a6e' : '#dfd6c3'}" ${st(2.2)}/>
            <path d="M8 -10 q8 0 8 6 q0 6 -8 6" fill="none" ${st(2.2)}/>
            <path d="M-4 -20 q2 -4 0 -7 M2 -20 q2 -4 0 -7" fill="none" stroke="${C.cream}" stroke-width="1.6" opacity=".55"/>
          </g>
          <g opacity="${dark ? .8 : .5}">
            <g transform="translate(238 104)"><rect x="-16" y="-11" width="32" height="22" rx="3" fill="${C.cream}" ${st(1.8)}/><path d="M-10 -4 h20 M-10 2 h12" stroke="${C.ink}" stroke-width="1.4" opacity=".5" fill="none"/></g>
            <g transform="translate(300 132)"><rect x="-13" y="-9" width="26" height="18" rx="3" fill="${C.cream}" ${st(1.8)}/><path d="M-7 -3 h14 M-7 2 h9" stroke="${C.ink}" stroke-width="1.3" opacity=".5" fill="none"/></g>
            <g transform="translate(340 88)"><rect x="-11" y="-8" width="22" height="16" rx="3" fill="${C.cream}" ${st(1.6)}/><path d="M-6 -2 h12 M-6 2 h8" stroke="${C.ink}" stroke-width="1.2" opacity=".5" fill="none"/></g>
          </g>
        </g>
        ${person({ x: 118, y: 258, s: 1, shirt: '#5f7178', pose: 'think', face: 'tired', hairStyle: 'short', hair: '#241c16' })}
      ` : `
        <g>
          <rect x="140" y="208" width="204" height="34" rx="5" fill="${sheet}" ${st(2.8)}/>
          <rect x="140" y="232" width="204" height="16" rx="4" fill="${dark ? '#3a3f43' : '#e4dbc8'}" ${st(2.4)}/>
          <path d="M140 222 q52 -8 104 -2 t100 -2" fill="none" stroke="${C.ink}" stroke-width="1.6" opacity=".18"/>
          <rect x="336" y="170" width="20" height="78" rx="4" fill="${wood}" ${st(2.8)}/>
          <rect x="130" y="216" width="14" height="58" rx="4" fill="${wood}" ${st(2.6)}/>
          <rect x="296" y="194" width="38" height="15" rx="7" fill="${C.cream}" ${st(2.2)}/>
          <path d="M146 240 v14 M330 240 v14" fill="none" ${st(3)}/>
        </g>
        ${lying(248, 208, .92, { shirt: '#b9c3c6', rot: -1 })}
        <path d="M150 210 q46 -9 92 -2 q-4 20 -46 22 q-42 2 -46 -20 z" fill="${dark ? '#455257' : '#9fb5b2'}" ${st(2.4)}/>
        <g transform="translate(352 206)">
          <path d="M-8 0 h16 v-26 h-16 z" fill="${woodDark}" ${st(2.2)}/>
          <path d="M0 -26 v-10" fill="none" ${st(3)}/>
          <path d="M-14 -36 h28 l-6 -12 h-16 z" fill="${dark ? C.gold : C.orange}" ${st(2.2)}/>
          <circle cx="0" cy="-42" r="24" fill="${C.gold}" opacity="${dark ? .22 : .16}"/>
        </g>
      `}
      <path d="M0 300 H400" ${st(0)}/>
    `;
  }

  /* sala de aula: quadro, professor e carteiras */
  function classroom(time, variant) {
    const dark = time === 'night' || time === 'dark';
    const warm = time === 'dusk' || time === 'dawn';
    const wall = dark ? '#2c3237' : warm ? '#c8ae92' : '#cfc7b6';
    const floor = dark ? '#1b2023' : '#8b7760';
    const board = dark ? '#1f3931' : '#2e4d42';
    const chalk = C.cream;
    const wood = dark ? '#4b3c2f' : '#a8825a';
    const empty = variant === 'empty';
    return `
      <rect width="400" height="300" fill="${wall}"/>
      <rect y="234" width="400" height="66" fill="${floor}"/>
      <path d="M0 234 H400" ${st(3)}/>
      <g>
        <rect x="80" y="30" width="286" height="136" rx="5" fill="${board}" ${st(3)}/>
        <rect x="88" y="38" width="270" height="120" rx="3" fill="none" stroke="${chalk}" stroke-width="1.2" opacity=".18"/>
        <g stroke="${chalk}" stroke-width="2.6" fill="none" opacity=".8" stroke-linecap="round">
          <path d="M108 68 h86"/>
          <path d="M108 88 h132"/>
          <path d="M108 108 h72"/>
          <path d="M108 130 h150"/>
        </g>
        <circle cx="288" cy="96" r="24" fill="none" stroke="${chalk}" stroke-width="2.4" opacity=".7"/>
        <path d="M270 122 q18 -16 36 2" fill="none" stroke="${chalk}" stroke-width="2.2" opacity=".6"/>
        <path d="M264 96 h-12 M324 96 h12" stroke="${chalk}" stroke-width="2.2" opacity=".5" fill="none"/>
      </g>
      <g transform="translate(92 176)">
        <rect x="0" y="0" width="40" height="9" rx="3" fill="${wood}" ${st(2)}/>
        <rect x="-8" y="9" width="56" height="8" rx="2" fill="${dark ? '#3d3a34' : '#6a6558'}" ${st(2)}/>
      </g>
      ${person({ x: 196, y: 226, s: 1.02, shirt: '#7d6a4f', pants: '#3a3f42', pose: 'point', face: 'smile', hairStyle: 'short', hair: '#3b3129' })}
      ${empty ? '' : `
        ${seated(126, 250, 1, '#6c7f76')}
        ${seated(214, 254, 1, '#7c6b7d')}
        ${seated(302, 250, 1, '#6e7d64')}
      `}
      <g>
        <rect x="70" y="240" width="92" height="8" rx="2" fill="${wood}" ${st(2.2)}/>
        <path d="M80 248 v20 M152 248 v20" fill="none" ${st(3)}/>
        <rect x="158" y="244" width="92" height="8" rx="2" fill="${wood}" ${st(2.2)}/>
        <path d="M168 252 v20 M240 252 v20" fill="none" ${st(3)}/>
        <rect x="246" y="240" width="92" height="8" rx="2" fill="${wood}" ${st(2.2)}/>
        <path d="M256 248 v20 M328 248 v20" fill="none" ${st(3)}/>
      </g>
      <path d="M0 300 H400" ${st(0)}/>
    `;
  }

  const SCENES = { mountain, beach, square, palace, cave, farm, pottery, river, kingdom, road, desert, gate, meadow, room, classroom };

  /* ---------------- efeitos ---------------- */

  function fxLayer(kind, focus = [200, 150], time = 'day') {
    const light = time === 'night' || time === 'dark';
    const col = light ? C.cream : C.ink;
    const [cx, cy] = focus;

    if (kind === 'speed') {
      let rays = '';
      for (let i = 0; i < 30; i++) {
        const a = (i / 30) * Math.PI * 2 + .12;
        const r1 = 82 + (i % 4) * 8;
        const r2 = r1 + 34 + (i % 3) * 14;
        const x1 = cx + Math.cos(a) * r1;
        const y1 = cy + Math.sin(a) * r1;
        const x2 = cx + Math.cos(a) * r2;
        const y2 = cy + Math.sin(a) * r2;
        rays += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
      }
      return `<g stroke="${col}" stroke-width="1.8" stroke-linecap="round" opacity=".28">${rays}</g>`;
    }

    if (kind === 'sparkle') {
      const pts = [[70, 90, 5], [118, 52, 3.5], [300, 78, 6], [338, 128, 3.5], [84, 190, 4], [322, 210, 4.5], [254, 44, 3]];
      return `<g opacity=".9">${pts.map(([x, y, r]) => star(x, y, r, C.gold)).join('')}</g>`;
    }

    if (kind === 'rain') {
      let lines = '';
      for (let i = 0; i < 34; i++) {
        const x = (i * 47) % 430 - 15;
        const y = (i * 73) % 260;
        lines += `<line x1="${x}" y1="${y}" x2="${x - 14}" y2="${y + 34}"/>`;
      }
      return `<g stroke="${col}" stroke-width="1.4" opacity=".22" stroke-linecap="round">${lines}</g>`;
    }

    if (kind === 'gloom') {
      let lines = '';
      for (let i = 0; i < 22; i++) {
        const x = 18 + i * 17;
        const h = 30 + (i % 5) * 16;
        lines += `<line x1="${x}" y1="0" x2="${x}" y2="${h}"/>`;
      }
      return `<g stroke="${col}" stroke-width="2" opacity=".16" stroke-linecap="round">${lines}</g>`;
    }

    if (kind === 'petals') {
      const pts = [[58, 90, 1], [116, 60, .8], [286, 72, .9], [332, 140, 1.1], [78, 186, .8], [310, 214, .9], [250, 48, .7]];
      return `<g opacity=".95">${pts.map(([x, y, s], i) => `<g transform="translate(${x} ${y}) rotate(${i * 24})"><path d="M0 0 q-8 -6 -4 -12 q8 0 8 8 q6 -8 12 -4 q2 8 -8 10 q8 2 6 10 q-8 2 -10 -6 q-2 8 -10 6 q-4 -6 6 -12 z" fill="${i % 2 ? C.orange : C.gold}" ${st(1.2)}/></g>`).join('')}</g>`;
    }

    return '';
  }

  /* ---------------- render ---------------- */

  function render(panel) {
    const p = panel || {};
    HT = 'ht' + (++seq);
    const scene = SCENES[p.scene] || SCENES.road;
    const inner = scene(p.time || 'day', p.variant, p);
    const zoom = Math.max(1, p.zoom || 1);
    const w = 400 / zoom;
    const h = 300 / zoom;
    const focus = p.focus || [200, 150];
    const cx = clamp(focus[0], w / 2, 400 - w / 2);
    const cy = clamp(focus[1], h / 2, 300 - h / 2);
    const fx = p.fx ? fxLayer(p.fx, focus, p.time) : '';
    return `<svg class="comic-svg" viewBox="${(cx - w / 2).toFixed(1)} ${(cy - h / 2).toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}"
      preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">
      <defs><pattern id="${HT}" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(18)">
        <circle cx="1.4" cy="1.4" r="1.05" fill="${C.ink}"/>
      </pattern></defs>
      ${inner}
      ${fx}
    </svg>`;
  }

  return { render, C };
})();
