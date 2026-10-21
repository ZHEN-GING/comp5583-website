// T02: native modal semantics, readable focus, and static-content fallback.
(() => {
  const dialog = document.querySelector('#info-panel');
  const store = document.querySelector('#content-sections');
  const panelContent = document.querySelector('#panel-content');
  const label = document.querySelector('#panel-label');
  const sections = new Map([...store.children].map(section => [section.id, section]));
  if (typeof dialog.showModal !== 'function') return;

  let current = null;
  let opener = null;
  const positions = new Map();
  for (const [id, section] of sections) {
    const marker = document.createComment(id);
    section.before(marker);
    positions.set(id, marker);
  }

  function restoreSection() {
    if (!current) return;
    sections.get(current).querySelectorAll('video, audio').forEach(media => media.pause());
    positions.get(current).after(sections.get(current));
    current = null;
  }

  function open(sectionId, source = document.activeElement) {
    const section = sections.get(sectionId);
    if (!section) return;
    if (!dialog.contains(source)) opener = source;
    restoreSection();
    current = sectionId;
    panelContent.append(section);
    label.textContent = sectionId;
    dialog.setAttribute('aria-labelledby', `${sectionId}-heading`);
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('panel-open');
    panelContent.scrollTop = 0;
    section.querySelector('h2').focus({preventScroll:true});
    document.querySelectorAll('.nav-links a').forEach(link => {
      if (link.hash === `#${sectionId}`) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    document.dispatchEvent(new CustomEvent('portfolio:panelchange', {detail:{open:true,sectionId}}));
  }

  dialog.addEventListener('close', () => {
    const sectionId = current;
    restoreSection();
    document.body.classList.remove('panel-open');
    document.querySelectorAll('.nav-links a').forEach(link => link.removeAttribute('aria-current'));
    document.dispatchEvent(new CustomEvent('portfolio:panelchange', {detail:{open:false,sectionId}}));
    if (opener && opener.isConnected) opener.focus({preventScroll:true});
  });
  // T03: keep hidden media quiet and let fullscreen Escape precede modal close.
  for (const section of sections.values()) {
    section.querySelectorAll('details').forEach(disclosure => {
      disclosure.addEventListener('toggle', () => {
        if (!disclosure.open) disclosure.querySelectorAll('video, audio').forEach(media => media.pause());
      });
    });
  }
  let lastFullscreenExit = -Infinity;
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) lastFullscreenExit = performance.now();
  });
  dialog.addEventListener('cancel', event => {
    const fullscreenMedia = document.fullscreenElement;
    if (fullscreenMedia && dialog.contains(fullscreenMedia)) {
      event.preventDefault();
      document.exitFullscreen().catch(() => {
        // Native fullscreen controls remain available if the browser refuses this request.
      });
    } else if (performance.now() - lastFullscreenExit < 250) {
      // Some browsers exit fullscreen before dispatching the same Escape's cancel event.
      event.preventDefault();
    }
  });
  // T04: contain only modal Tab boundaries; preserve native media-control traversal.
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab' || !dialog.open) return;
    const active = document.activeElement;
    if (active.matches('video, audio')) return;
    const controls = [...dialog.querySelectorAll('button:not([disabled]), a[href], summary, input:not([disabled]), select:not([disabled]), textarea:not([disabled]), video[controls], [tabindex]')].filter(control => {
      if (control.getAttribute('tabindex') === '-1' || !control.getClientRects().length) return false;
      for (let parent = control.parentElement; parent && parent !== dialog; parent = parent.parentElement) {
        if (parent.matches('details:not([open])') && !parent.querySelector('summary')?.contains(control)) return false;
      }
      return true;
    });
    const first = controls[0];
    const last = controls[controls.length - 1];
    const heading = current && sections.get(current).querySelector('h2');
    if (event.shiftKey && (active === first || active === heading)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  });
  document.querySelector('#panel-close').addEventListener('click', () => dialog.close());
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const sectionId = link.hash.slice(1);
    if (!sections.has(sectionId)) return;
    event.preventDefault();
    open(sectionId, link);
  });
  window.PortfolioPanels = {open};
  document.documentElement.classList.add('panels-ready');
  if (sections.has(location.hash.slice(1))) open(location.hash.slice(1));
})();
