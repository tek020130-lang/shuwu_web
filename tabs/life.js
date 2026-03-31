import { merchants as mockMerchants, userState } from '../data/mock.js';
import { api } from '../api/client.js';

// 精美简笔画图标 SVG
const QUICK_ICONS = {
  all: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M5 19l.5 1.5L7 21l-1.5.5L5 23l-.5-1.5L3 21l1.5-.5L5 19z"/><path d="M19 5l.5 1.5L21 7l-1.5.5L19 9l-.5-1.5L17 7l1.5-.5L19 5z"/></svg>`,
  旗舰店: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>`,
  潮玩周边: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>`,
  娱乐场所: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="3"/><circle cx="9" cy="12" r="1" fill="currentColor"/><circle cx="15" cy="12" r="1" fill="currentColor"/><path d="M6 9v6M3 12h6"/></svg>`,
  餐饮消费: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
  数物限定: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22,8.5 12,15.5 2,8.5"/></svg>`,
};

// 快捷导航图标渐变色背景
const QUICK_BG_COLORS = [
  'rgba(251,207,232,0.5)',
  'rgba(253,230,138,0.5)',
  'rgba(167,243,208,0.5)',
  'rgba(221,214,254,0.5)',
  'rgba(186,230,253,0.5)',
  'rgba(199,210,254,0.5)',
  'rgba(251,207,232,0.5)',
  'rgba(229,231,235,0.4)',
];

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
        <div class="life-search-bar glass-input" id="search-bar-trigger">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          搜索娱乐场所、文创店…
        </div>
        <button class="map-btn glass-icon" id="map-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2"/>
            <line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>
          </svg>
        </button>
      </div>
      <div class="category-bar" id="category-bar">
        ${[{id:'all',name:'精选'},{id:'旗舰店',name:'旗舰店'},{id:'潮玩周边',name:'潮玩周边'},{id:'娱乐场所',name:'娱乐场所'},{id:'餐饮消费',name:'餐饮消费'},{id:'数物限定',name:'数物限定'}].map(c => `
          <div class="cat-item${c.id === activeCategory ? ' active' : ''}" data-cat="${c.id}">
            <div class="cat-icon">${QUICK_ICONS[c.id] || QUICK_ICONS.all}</div>
            <span>${c.name}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderQuickNav() {
  const items = [
    { name: '娱乐中心', icon: QUICK_ICONS['娱乐场所'] },
    { name: '文创工坊', icon: QUICK_ICONS['潮玩周边'] },
    { name: '餐饮消费', icon: QUICK_ICONS['餐饮消费'] },
    { name: '数物限定', icon: QUICK_ICONS['数物限定'] },
    { name: '旗舰店', icon: QUICK_ICONS['旗舰店'] },
    { name: '精选推荐', icon: QUICK_ICONS['all'] },
    { name: '附近商户', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-8-4.5-8-11a8 8 0 1116 0c0 6.5-8 11-8 11z"/><circle cx="12" cy="10" r="3"/></svg>` },
    { name: '更多服务', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>` },
  ];
  return `
    <div class="life-quick-nav">
      ${items.map((item, i) => `
        <div class="life-quick-item">
          <div class="life-quick-icon glass-icon" style="background:${QUICK_BG_COLORS[i]}">
            ${item.icon}
          </div>
          <span class="life-quick-label">${item.name}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderFeed(list) {
  return `
    <div class="life-section-header">
      <span class="life-section-title">附近推荐</span>
      <span class="life-section-more">
        查看更多
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18l6-6-6-6"/></svg>
      </span>
    </div>
    <div class="merchant-feed" id="merchant-feed">
      ${list.map(m => `
        <div class="merchant-card${m.goldTier ? ' gold-tier' : ''}" data-id="${m.id}">
          <div class="card-img">
            <img src="${m.image}" alt="${m.name}" loading="lazy" />
            ${m.goldTier ? `
              <div class="card-flagship-badge">
                <svg viewBox="0 0 24 24" fill="currentColor" style="width:10px;height:10px"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                数物旗舰店
              </div>` : ''}
            ${m.sworlSupport ? '<div class="sworl-badge">S</div>' : ''}
            <div style="position:absolute;bottom:12px;right:12px;padding:5px 12px;border-radius:12px;font-size:12px;font-weight:600;color:var(--text)" class="glass">
              ${m.priceRange || ''}
            </div>
          </div>
          <div class="card-body">
            <div class="card-name-row">
              <div style="display:flex;align-items:center;gap:8px">
                <div class="card-name">${m.name}</div>
                ${m.goldTier ? `<svg viewBox="0 0 24 24" fill="#C9A84C" style="width:16px;height:16px"><path d="M12 1l2.5 2.5h3.5v3.5l2.5 2.5-2.5 2.5v3.5h-3.5L12 18l-2.5-2.5H6v-3.5L3.5 9.5 6 7V3.5h3.5L12 1z"/><path d="M9 12l2 2 4-4" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>` : ''}
              </div>
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
  let merchantList = mockMerchants;
  try { merchantList = await api.getMerchants(); } catch { /* use mock */ }

  container.innerHTML = renderHeader() + renderQuickNav() + renderFeed(merchantList);

  container.querySelector('#search-bar-trigger').addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('openSearch'));
  });

  container.querySelector('#map-btn').addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('openMap'));
  });

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
      const tmp = document.createElement('div');
      tmp.innerHTML = renderFeed(list);
      feed.replaceWith(tmp.querySelector('#merchant-feed'));
      return;
    }

    const card = e.target.closest('.merchant-card');
    if (card) {
      const id = parseInt(card.dataset.id);
      const merchant = merchantList.find(m => m.id === id) || mockMerchants.find(m => m.id === id);
      if (merchant) window.dispatchEvent(new CustomEvent('openPayment', { detail: merchant }));
      return;
    }

    // 金刚区点击 → 触发对应分类筛选
    const quickItem = e.target.closest('.life-quick-item');
    if (quickItem) {
      const label = quickItem.querySelector('.life-quick-label').textContent.trim();
      const catMap = { '娱乐中心': '娱乐场所', '文创工坊': '潮玩周边', '餐饮消费': '餐饮消费', '数物限定': '数物限定', '旗舰店': '旗舰店', '精选推荐': 'all', '附近商户': 'all' };
      const cat = catMap[label] || 'all';
      activeCategory = cat;
      container.querySelectorAll('.cat-item').forEach(el => el.classList.toggle('active', el.dataset.cat === activeCategory));
      let list = mockMerchants.filter(m => cat === 'all' || m.category === cat);
      try { list = await api.getMerchants(cat !== 'all' ? { category: cat } : {}); } catch { /* use mock */ }
      const feed = container.querySelector('#merchant-feed');
      const tmp = document.createElement('div');
      tmp.innerHTML = renderFeed(list);
      feed.replaceWith(tmp.querySelector('#merchant-feed'));
    }
  });
}
