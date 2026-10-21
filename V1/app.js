/* Integration only: direct navigation and world entrances share one section controller. */
(() => {
  'use strict';
  const ids = ['home', 'about', 'projects', 'contact'];
  const dialog = document.getElementById('section-dialog');
  const panelBody = document.getElementById('panel-body');
  const closeButton = document.getElementById('panel-close');
  const placeLabel = document.getElementById('panel-place');
  const sceneRoot = document.getElementById('district-scene');
  let scene = null;
  let active = null;
  let openingTrigger = null;
  let placeholder = null;
  function putBack() {
    if (!active) return;
    active.querySelectorAll('video').forEach(video => video.pause());
    if (placeholder && placeholder.parentNode) placeholder.replaceWith(active);
    active = null;
    placeholder = null;
  }
  function openSection(id, trigger) {
    if (!ids.includes(id)) return;
    const section = document.getElementById(id);
    if (!section || !dialog.showModal) {
      if (section) section.scrollIntoView();
      return;
    }
    const wasOpen = dialog.open;
    if (active === section && wasOpen) return;
    if (!wasOpen) openingTrigger = trigger || document.activeElement;
    putBack();
    placeholder = document.createComment('Section returns here after the panel closes.');
    section.before(placeholder);
    active = section;
    panelBody.append(section);
    const heading = section.querySelector('h1, h2');
    dialog.setAttribute('aria-labelledby', heading.id);
    const meta = window.PORTFOLIO_SECTIONS[id];
    placeLabel.textContent = meta.place + ' / ' + meta.title;
    if (scene) scene.setPaused(true);
    document.body.classList.add('panel-open');
    if (!wasOpen) dialog.showModal();
    panelBody.scrollTop = 0;
    heading.focus({preventScroll:true});
    history.replaceState(null, '', '#' + id);
  }
  function closePanel() { if (dialog.open) dialog.close(); }
  dialog.addEventListener('close', () => {
    putBack();
    document.body.classList.remove('panel-open');
    if (scene) scene.setPaused(false);
    history.replaceState(null, '', location.pathname + location.search);
    const focusTarget = openingTrigger && openingTrigger.isConnected ? openingTrigger : document.getElementById('brand');
    focusTarget.focus({preventScroll:true});
    openingTrigger = null;
  });
  closeButton.addEventListener('click', closePanel);
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closePanel();
  });
  document.addEventListener('click', event => {
    const link = event.target.closest('[data-section]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const id = link.dataset.section;
    if (ids.includes(id)) { event.preventDefault(); openSection(id, link); }
  });
  if (window.DistrictScene && sceneRoot) {
    scene = window.DistrictScene.create(sceneRoot, {
      onOpen: openSection
    });
  }
  if (scene) sceneRoot.querySelector('.scene-fallback')?.remove();
  window.addEventListener('hashchange', () => {
    const id = location.hash.slice(1);
    if (ids.includes(id)) openSection(id, document.getElementById('brand'));
  });
  document.documentElement.classList.add('js-ready');
  // Read-only state for verification; UI actions remain ordinary DOM events.
  window.PortfolioApp = Object.freeze({openSection, closePanel, getState: () => ({section:active ? active.id : null, dialogOpen:dialog.open, scene:scene ? scene.getState() : null})});
  if (ids.includes(location.hash.slice(1))) openSection(location.hash.slice(1), document.getElementById('brand'));
})();
