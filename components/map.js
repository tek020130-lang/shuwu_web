import { merchants } from '../data/mock.js';

const NEARBY = merchants.slice(0, 5).map((m, i) => ({
  ...m, dist: [180, 320, 450, 560, 680][i] + 'm'
}));

export function initMap() {
  const overlay = document.getElementById('map-overlay');
  const closeBtn = document.getElementById('map-close');
  const mapList = document.getElementById('map-list');
  const tooltip = document.getElementById('map-tooltip');
  const tooltipName = document.getElementById('map-tooltip-name');
  const tooltipDist = document.getElementById('map-tooltip-dist');

  // Render bottom list
  mapList.innerHTML = NEARBY.map(m => `
    <div class="map-list-item" data-id="${m.id}">
      <div class="mli-dot${m.goldTier ? ' gold' : ''}"></div>
      <div class="mli-info">
        <div class="mli-name">${m.name}</div>
        <div class="mli-meta">${m.category} · ${m.dist}</div>
      </div>
      <div class="mli-sworl">S</div>
    </div>
  `).join('');

  // Map dot tooltips
  document.querySelectorAll('.map-merchant-dot').forEach(dot => {
    dot.addEventListener('click', e => {
      e.stopPropagation();
      tooltipName.textContent = dot.dataset.name;
      tooltipDist.textContent = dot.dataset.dist;
      tooltip.style.left = dot.style.left;
      tooltip.style.top = `calc(${dot.style.top} - 52px)`;
      tooltip.classList.remove('hidden');
    });
  });

  document.getElementById('map-canvas').addEventListener('click', () => {
    tooltip.classList.add('hidden');
  });

  window.addEventListener('openMap', () => overlay.classList.remove('hidden'));
  closeBtn.addEventListener('click', () => overlay.classList.add('hidden'));

  mapList.addEventListener('click', e => {
    const item = e.target.closest('.map-list-item');
    if (item) {
      const id = parseInt(item.dataset.id);
      const merchant = merchants.find(m => m.id === id);
      if (merchant) {
        overlay.classList.add('hidden');
        window.dispatchEvent(new CustomEvent('openPayment', { detail: merchant }));
      }
    }
  });
}
