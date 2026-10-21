/* Original scene generated for T01 after contexts/T01.json was saved. */
(() => {
  'use strict';
  const host = document.getElementById('city-scene');
  if (!host) return;
  const places = [
    { id: 'home', title: 'Home', subtitle: 'Welcome house', x: 62, y: 48, w: 88, h: 62, door: [106, 122], color: '#c96d50' },
    { id: 'about', title: 'About', subtitle: 'Learning quarter', x: 318, y: 42, w: 100, h: 68, door: [368, 122], color: '#4c8581' },
    { id: 'projects', title: 'Projects', subtitle: 'Engineering workshop', x: 306, y: 186, w: 112, h: 62, door: [362, 260], color: '#5b7794' },
    { id: 'contact', title: 'Contact', subtitle: 'Harbor post', x: 62, y: 184, w: 88, h: 60, door: [106, 256], color: '#d39249' }
  ];
  host.innerHTML = '<div class="city-heading"><div><span class="city-kicker">THE HARBOR DISTRICT</span><h2>A small world of my work.</h2></div><p>Choose a labelled destination to visit.</p></div><div class="city-map"><canvas class="city-canvas" width="480" height="320" tabindex="0" aria-label="Interactive city map. Use arrow keys or W A S D to walk, then Enter near a building to visit. Tab leaves the map."></canvas><div class="city-destinations" aria-label="City destinations"></div></div><div class="city-toolbar"><p class="city-help">Click a building label, or focus the map and walk with <kbd>WASD</kbd> / <kbd>↑ ↓ ← →</kbd>. <kbd>Enter</kbd> visits a nearby place.</p><button class="city-reset" type="button">Reset walk</button></div><p class="city-status" role="status" aria-live="polite">You are in the central square. Every destination is also available in the navigation above.</p>';
  const canvas = host.querySelector('canvas');
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) { canvas.hidden = true; return; }
  const backdrop = document.createElement('canvas');
  backdrop.width = 480;
  backdrop.height = 320;
  const art = backdrop.getContext('2d', { alpha: false });
  ctx.imageSmoothingEnabled = false;
  art.imageSmoothingEnabled = false;
  const destinationList = host.querySelector('.city-destinations');
  const status = host.querySelector('.city-status');
  let position = { x: 240, y: 154 };
  let paused = false;
  let nearby = null;
  let frame = 0;

  function visit(place, opener) {
    if (window.PortfolioPanels) window.PortfolioPanels.open(place.id, opener);
    else document.getElementById(place.id)?.scrollIntoView();
  }
  places.forEach((place, i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'city-destination city-destination--' + place.id;
    button.dataset.section = place.id;
    button.style.setProperty('--place-x', ((place.x + place.w / 2) / 480 * 100) + '%');
    button.style.setProperty('--place-y', ((place.y - 17) / 320 * 100) + '%');
    button.innerHTML = '<span class="city-number">0' + (i + 1) + '</span><span>' + place.title + '</span><span aria-hidden="true">↗</span>';
    button.setAttribute('aria-label', place.title + ' — ' + place.subtitle);
    button.addEventListener('click', () => visit(place, button));
    destinationList.append(button);
  });

  function rect(x, y, w, h, color) {
    art.fillStyle = color;
    art.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  }
  function tree(x, y, variant = 0) {
    rect(x + 2, y + 10, 7, 10, '#77927a');
    rect(x + 1, y + 8, 3, 10, '#80614a');
    rect(x - 6, y - 2, 18, 11, '#3f7059');
    rect(x - 9, y + 1, 24, 8, '#3f7059');
    rect(x - 4, y - 6, 14, 9, variant ? '#81aa72' : '#679568');
    rect(x - 6, y - 1, 13, 6, variant ? '#a6be7e' : '#86aa70');
    rect(x + 6, y + 3, 5, 5, '#315e50');
  }
  function lamp(x, y) {
    rect(x + 2, y + 10, 6, 3, '#a8ac9a');
    rect(x + 1, y, 2, 13, '#4c6260');
    rect(x - 2, y - 3, 8, 5, '#f3d697');
    rect(x - 3, y - 4, 10, 2, '#425b57');
  }
  function bench(x, y) {
    rect(x, y + 6, 20, 3, '#b9b79e');
    rect(x + 2, y, 16, 3, '#b97d50');
    rect(x, y + 4, 20, 3, '#d19963');
    rect(x + 2, y + 7, 2, 3, '#5b645a');
    rect(x + 16, y + 7, 2, 3, '#5b645a');
  }
  function building(place) {
    const { x, y, w, h, color } = place;
    rect(x + 6, y + 6, w, h, '#9fa78b');
    rect(x - 3, y - 3, w + 6, h + 6, '#6b7666');
    rect(x, y + 5, w, h - 5, '#e6d7ab');
    rect(x, y + h - 14, w, 14, '#c4b58c');
    rect(x - 3, y - 3, w + 6, 43, color);
    rect(x + 3, y + 2, w - 6, 3, '#efd8b1');
    for (let yy = y + 11; yy < y + 35; yy += 8) {
      rect(x, yy, w, 2, '#334e5538');
      for (let xx = x + 8; xx < x + w; xx += 16) rect(xx, yy - 6, 1, 6, '#f5e5be35');
    }
    rect(x - 4, y + 37, w + 8, 4, '#4e6058');
    for (let xx = x + 10; xx < x + w - 8; xx += 23) {
      rect(xx, y + 45, 12, 10, '#47676d');
      rect(xx + 2, y + 46, 8, 4, '#a4c8bd');
      rect(xx + 6, y + 45, 1, 10, '#e8dcb7');
    }
    rect(x + w / 2 - 6, y + h - 15, 12, 17, '#486068');
    rect(x + w / 2 - 4, y + h - 13, 8, 8, '#b8d3c1');
    rect(x + w / 2 + 2, y + h - 3, 2, 2, '#f5d48e');
    rect(x + w / 2 - 10, y + h + 2, 20, 4, '#e8dbbc');
    if (place.id === 'projects') {
      rect(x + 65, y + 5, 28, 20, '#334e62');
      for (let i = 0; i < 4; i++) rect(x + 68 + i * 7, y + 7, 1, 16, '#8fb6c3');
      rect(x + 66, y + 14, 26, 1, '#8fb6c3');
      rect(x + 17, y - 9, 10, 13, '#8f9996');
    }
    if (place.id === 'about') {
      rect(x + 38, y + 6, 25, 22, '#d6d0a9');
      rect(x + 42, y + 10, 17, 14, '#597e78');
      rect(x + 50, y + 12, 2, 7, '#f2e3b7');
      rect(x + 50, y + 18, 6, 2, '#f2e3b7');
    }
    if (place.id === 'contact') {
      rect(x + 34, y + 8, 21, 15, '#f6e8be');
      rect(x + 36, y + 11, 17, 2, '#ad684e');
      rect(x + 39, y + 13, 11, 2, '#ad684e');
      rect(x + 43, y + 15, 4, 2, '#ad684e');
    }
    if (place.id === 'home') {
      rect(x + 61, y - 8, 10, 18, '#9c6954');
      rect(x + 59, y - 9, 14, 3, '#d4ae82');
    }
  }
  function paintTown() {
    rect(0, 0, 480, 320, '#bdd1a0');
    for (let x = 0; x < 480; x += 16) for (let y = 0; y < 280; y += 16) {
      if ((x / 16 + y / 16) % 4 === 0) rect(x + 3, y + 7, 3, 2, '#9cba86');
    }
    rect(18, 16, 444, 266, '#dddbb8');
    rect(24, 22, 432, 254, '#a9c18d');
    rect(200, 16, 80, 266, '#e5d9b7');
    rect(18, 126, 444, 54, '#e5d9b7');
    rect(218, 16, 44, 266, '#7b8d87');
    rect(18, 136, 444, 34, '#7b8d87');
    for (let x = 29; x < 461; x += 25) rect(x, 152, 12, 2, '#cbd0b7');
    for (let y = 26; y < 275; y += 22) rect(239, y, 2, 10, '#cbd0b7');
    rect(206, 126, 68, 54, '#d7cdac');
    rect(213, 133, 54, 40, '#eee1bf');
    rect(220, 139, 40, 28, '#c5bb9e');
    for (let y = 137; y < 170; y += 6) { rect(192, y, 12, 3, '#f4e8c5'); rect(276, y, 12, 3, '#f4e8c5'); }
    [106, 368].forEach(x => rect(x - 13, 106, 26, 24, '#e5d9b7'));
    [106, 362].forEach(x => rect(x - 13, 244, 26, 28, '#e5d9b7'));
    rect(24, 264, 432, 12, '#e5d9b7');
    places.forEach(building);
    [[31,45],[30,91],[176,54],[173,96],[292,51],[443,43],[444,94],[30,198],[29,240],[173,210],[291,220],[446,212],[442,252]].forEach((p,i)=>tree(p[0],p[1],i%2));
    bench(171, 112); bench(284, 113); bench(169, 185); bench(282, 267);
    [[52,119],[166,121],[300,119],[429,119],[52,261],[167,259],[300,259],[429,260]].forEach(p=>lamp(p[0],p[1]));
    rect(166, 25, 26, 13, '#e9d597'); rect(170, 28, 3, 3, '#cf8063'); rect(181, 30, 3, 3, '#d4aa59');
    rect(285, 77, 19, 22, '#83a27d'); rect(288, 80, 13, 16, '#e9cb79');
    rect(0, 282, 480, 38, '#668f96');
    rect(0, 282, 480, 4, '#e6d3a7');
    for (let x = 2; x < 480; x += 23) { rect(x, 290 + (x % 3) * 4, 10, 2, '#8fb1ad'); rect(x + 8, 310, 6, 1, '#436e83'); }
    rect(193, 282, 16, 30, '#b08a63');
    for (let y = 286; y < 312; y += 6) rect(193, y, 16, 1, '#8c6f54');
    rect(211, 303, 27, 8, '#ddd9bb'); rect(216, 298, 17, 8, '#bd7051'); rect(220, 299, 9, 4, '#b7d1c9');
    rect(387, 299, 28, 8, '#ebe0bd'); rect(392, 295, 18, 7, '#526b7d');
  }
  function draw() {
    frame = 0;
    ctx.drawImage(backdrop, 0, 0);
    const x = Math.round(position.x), y = Math.round(position.y);
    ctx.fillStyle = '#647c71'; ctx.fillRect(x - 5, y + 7, 12, 3);
    ctx.fillStyle = '#334e60'; ctx.fillRect(x - 3, y + 3, 3, 6); ctx.fillRect(x + 1, y + 3, 3, 6);
    ctx.fillStyle = '#e8ab66'; ctx.fillRect(x - 4, y - 3, 9, 7);
    ctx.fillStyle = '#ecd6ae'; ctx.fillRect(x - 3, y - 9, 7, 7);
    ctx.fillStyle = '#354956'; ctx.fillRect(x - 4, y - 11, 9, 4); ctx.fillRect(x + 2, y - 6, 2, 2);
    const next = places.find(p => Math.hypot(position.x - p.door[0], position.y - p.door[1]) <= 22) || null;
    if (next !== nearby) {
      nearby = next;
      status.textContent = nearby ? 'You are near ' + nearby.title + '. Press Enter to visit ' + nearby.subtitle.toLowerCase() + '.' : 'Walk to a doorway, or choose any building label. Tab leaves the map.';
    }
    if (nearby) {
      ctx.strokeStyle = '#fff4cf'; ctx.lineWidth = 2;
      ctx.strokeRect(nearby.door[0] - 8, nearby.door[1] - 5, 16, 10);
    }
    canvas.dataset.playerX = x;
    canvas.dataset.playerY = y;
  }
  function blocked(x, y) {
    return x < 15 || x > 465 || y < 15 || y > 273 || places.some(p => x > p.x - 7 && x < p.x + p.w + 7 && y > p.y - 9 && y < p.y + p.h + 7);
  }
  function requestDraw() { if (!frame) frame = requestAnimationFrame(draw); }
  canvas.addEventListener('keydown', event => {
    if (paused || event.altKey || event.ctrlKey || event.metaKey) return;
    const key = event.key.toLowerCase();
    const directions = { arrowup: [0,-4], w: [0,-4], arrowdown: [0,4], s: [0,4], arrowleft: [-4,0], a: [-4,0], arrowright: [4,0], d: [4,0] };
    if (directions[key]) {
      event.preventDefault();
      const [dx,dy] = directions[key];
      if (!blocked(position.x + dx, position.y + dy)) { position.x += dx; position.y += dy; requestDraw(); }
    } else if (key === 'enter' && nearby) {
      event.preventDefault();
      if (!event.repeat) visit(nearby, canvas);
    }
  });
  canvas.addEventListener('pointerdown', () => canvas.focus({ preventScroll: true }));
  host.querySelector('.city-reset').addEventListener('click', () => {
    position = { x: 240, y: 154 }; nearby = null;
    status.textContent = 'You are back in the central square.';
    requestDraw(); canvas.focus({ preventScroll: true });
  });
  document.addEventListener('portfolio:panelchange', event => { paused = Boolean(event.detail.open); });
  paintTown();
  draw();
})();