import { merchants as mockMerchants, categories, userState } from '../data/mock.js';
import { api } from '../api/client.js';

const CATEGORY_ICONS = {
  all: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
  旗舰店: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>`,
  潮玩周边: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>`,
  娱乐场所: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
  餐饮消费: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
  数物限定: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22,8.5 12,15.5 2,8.5"/></svg>`,
};

let activeCategory = 'all';

function renderHeader() {
  return `
    <div class="life-header">
      <div class="header-top">
        <div class="city-label" id="city-label">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          ${userState.city}
        </div>
        <div class="search-bar" id="search-bar-trigger">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          搜索商户、活动…
        </div>
        <button class="map-btn" id="map-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2"/>
            <line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>
          </svg>
        </button>
      </div>
      <div class="category-bar" id="category-bar">
        ${categories.map(c => `
          <div class="cat-item${c.id === activeCategory ? ' active' : ''}" data-cat="${c.id}">
            <div class="cat-icon">${CATEGORY_ICONS[c.id] || CATEGORY_ICONS.all}</div>
            <span>${c.name}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderFeed(list) {
  return `
    <div class="merchant-feed" id="merchant-feed">
      ${list.map(m => `
        <div class="merchant-card${m.goldTier ? ' gold-tier' : ''}" data-id="${m.id}">
          <div class="card-img">
            <img src="${m.image}" alt="${m.name}" loading="lazy" />
            ${m.goldTier ? '<div class="card-flagship-badge"><svg viewBox="0 0 24 24" fill="currentColor" style="width:10px;height:10px"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> 数物旗舰店</div>' : ''}
            ${m.sworlSupport ? '<div class="sworl-badge">S</div>' : ''}
          </div>
          <div class="card-body">
            <div class="card-name-row">
              <div class="card-name">${m.name}</div>
              <div class="card-rating"><b>${m.rating}</b></div>
            </div>
            <div class="card-desc">${m.desc}</div>
            <div class="card-meta">
              ${m.distance ? `<span class="card-meta-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:12px;height:12px"><path d="M12 21s-8-4.5-8-11a8 8 0 1116 0c0 6.5-8 11-8 11z"/><circle cx="12" cy="10" r="3"/></svg>${m.distance}</span>` : ''}
              ${m.openTime ? `<span class="card-meta-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:12px;height:12px"><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></svg>${m.openTime}</span>` : ''}
            </div>
            ${m.tags && m.tags.length ? `<div class="card-tags">${m.tags.map(t => `<span class="card-tag${m.goldTier ? ' gold' : ''}">${t}</span>`).join('')}</div>` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

export async function renderLife(container) {
  // Load merchants from API, fall back to mock
  let merchantList = mockMerchants;
  try { merchantList = await api.getMerchants(); } catch { /* use mock */ }

  container.innerHTML = renderHeader() + renderFeed(merchantList);

  // Search trigger
  container.querySelector('#search-bar-trigger').addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('openSearch'));
  });

  // Map trigger
  container.querySelector('#map-btn').addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('openMap'));
  });

  // Category filter
  container.addEventListener('click', async e => {
    const catItem = e.target.closest('.cat-item');
    if (catItem) {
      activeCategory = catItem.dataset.cat;
      container.querySelectorAll('.cat-item').forEach(el => {
        el.classList.toggle('active', el.dataset.cat === activeCategory);
      });
      const params = activeCategory !== 'all' ? { category: activeCategory } : {};
      let list = mockMerchants.filter(m => activeCategory === 'all' || m.category === activeCategory);
      try { list = await api.getMerchants(params); } catch { /* use mock */ }
      const feed = container.querySelector('#merchant-feed');
      const newFeed = document.createElement('div');
      newFeed.innerHTML = renderFeed(list);
      feed.replaceWith(newFeed.firstElementChild);
    }

    const card = e.target.closest('.merchant-card');
    if (card) {
      const id = parseInt(card.dataset.id);
      const merchant = merchantList.find(m => m.id === id) || mockMerchants.find(m => m.id === id);
      if (merchant) window.dispatchEvent(new CustomEvent('openPayment', { detail: merchant }));
    }
  });
}
