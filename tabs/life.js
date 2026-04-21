import { merchants as mockMerchants, userState } from '../data/mock.js';

function showToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;bottom:calc(var(--nav-h) + 24px);left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.75);color:#fff;padding:10px 20px;border-radius:999px;font-size:13px;z-index:9999;pointer-events:none;white-space:nowrap;backdrop-filter:blur(8px)';
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2200);
}

// 精美简笔画图标 SVG
const QUICK_ICONS = {
  all: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M5 19l.5 1.5L7 21l-1.5.5L5 23l-.5-1.5L3 21l1.5-.5L5 19z"/><path d="M19 5l.5 1.5L21 7l-1.5.5L19 9l-.5-1.5L17 7l1.5-.5L19 5z"/></svg>`,
  旗舰店: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>`,
  潮玩周边: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>`,
  娱乐场所: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="3"/><circle cx="9" cy="12" r="1" fill="currentColor"/><circle cx="15" cy="12" r="1" fill="currentColor"/><path d="M6 9v6M3 12h6"/></svg>`,
  餐饮消费: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
  数物限定: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22,8.5 12,15.5 2,8.5"/></svg>`,
};


function openMerchantDetail(merchant) {
  let overlay = document.getElementById('life-merchant-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'life-merchant-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:300;display:none;flex-direction:column;justify-content:flex-end';
    overlay.innerHTML = `
      <div id="life-merchant-backdrop" style="position:absolute;inset:0;background:rgba(0,0,0,0.4);backdrop-filter:blur(6px)"></div>
      <div id="life-merchant-sheet" style="position:relative;z-index:1;background:#fff;border-radius:28px 28px 0 0;max-height:88vh;display:flex;flex-direction:column;transform:translateY(100%);transition:transform 0.4s cubic-bezier(0.23,1,0.32,1)">
        <div id="life-merchant-content" style="overflow-y:auto;flex:1"></div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.querySelector('#life-merchant-backdrop').addEventListener('click', closeMerchantDetail);
  }

  const m = merchant;
  overlay.querySelector('#life-merchant-content').innerHTML = `
    <div style="position:relative">
      <img src="${m.image}" alt="${m.name}" style="width:100%;height:220px;object-fit:cover;border-radius:28px 28px 0 0" />
      ${m.goldTier ? `<div style="position:absolute;top:16px;left:16px;background:rgba(201,168,76,0.9);color:#fff;font-size:11px;font-weight:600;padding:4px 10px;border-radius:20px;backdrop-filter:blur(4px)">数物旗舰店</div>` : ''}
      <button id="life-merchant-close" style="position:absolute;top:16px;right:16px;width:36px;height:36px;border-radius:50%;background:rgba(0,0,0,0.4);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;backdrop-filter:blur(8px)">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="width:18px;height:18px"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div style="padding:20px 20px 40px">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:8px">
        <div style="font-size:22px;font-weight:700">${m.name}</div>
        <div style="display:flex;align-items:center;gap:4px;background:#FFF9F0;padding:6px 12px;border-radius:20px">
          <svg viewBox="0 0 24 24" fill="#F59E0B" style="width:14px;height:14px"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          <span style="font-size:14px;font-weight:600;color:#F59E0B">${m.rating}</span>
        </div>
      </div>
      <div style="font-size:14px;color:var(--text-sub);margin-bottom:16px">${m.desc}</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px">
        ${(m.tags || []).map(tag => `<span style="font-size:12px;padding:4px 10px;border-radius:20px;background:#F5F5F7;color:var(--text-sub)">${tag}</span>`).join('')}
      </div>
      <div style="display:flex;gap:20px;margin-bottom:20px">
        ${m.distance ? `<div style="display:flex;align-items:center;gap:6px;font-size:13px;color:var(--text-sub)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:15px;height:15px"><path d="M12 21s-8-4.5-8-11a8 8 0 1116 0c0 6.5-8 11-8 11z"/><circle cx="12" cy="10" r="3"/></svg>${m.distance}</div>` : ''}
        ${m.openTime ? `<div style="display:flex;align-items:center;gap:6px;font-size:13px;color:var(--text-sub)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:15px;height:15px"><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></svg>${m.openTime}</div>` : ''}
        ${m.priceRange ? `<div style="font-size:13px;color:var(--text-sub)">${m.priceRange}</div>` : ''}
      </div>
      ${m.sworlSupport ? `<div style="display:flex;align-items:center;gap:8px;padding:12px 16px;background:linear-gradient(135deg,rgba(139,92,246,0.08),rgba(167,139,250,0.08));border-radius:14px;margin-bottom:20px">
        <svg viewBox="0 0 24 24" fill="none" style="width:18px;height:18px;flex-shrink:0"><circle cx="12" cy="12" r="10" fill="url(#sg-detail)"/><path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" stroke="white" stroke-width="2" stroke-linecap="round"/><defs><linearGradient id="sg-detail" x1="0" y1="0" x2="24" y2="24"><stop stop-color="#8B5CF6"/><stop offset="1" stop-color="#A78BFA"/></linearGradient></defs></svg>
        <span style="font-size:13px;color:#8B5CF6;font-weight:500">支持 SWORL 支付，消费即获分红</span>
      </div>` : ''}
      <button id="life-merchant-pay-btn" style="width:100%;height:54px;border-radius:999px;background:#1A1A1A;color:#fff;font-size:16px;font-weight:600;border:none;cursor:pointer">立即消费</button>
    </div>
  `;

  overlay.style.display = 'flex';
  requestAnimationFrame(() => { overlay.querySelector('#life-merchant-sheet').style.transform = 'translateY(0)'; });

  overlay.querySelector('#life-merchant-close').addEventListener('click', closeMerchantDetail);
  overlay.querySelector('#life-merchant-pay-btn').addEventListener('click', () => {
    closeMerchantDetail();
    window.dispatchEvent(new CustomEvent('openPayment', {
      detail: { name: m.name, sub: m.desc, amount: (m.priceRange === '¥¥¥¥' ? 680 : m.priceRange === '¥¥¥' ? 320 : m.priceRange === '¥¥' ? 128 : 68).toFixed(2) }
    }));
  });
}

function closeMerchantDetail() {
  const overlay = document.getElementById('life-merchant-overlay');
  const sheet = overlay?.querySelector('#life-merchant-sheet');
  if (!overlay || !sheet) return;
  sheet.style.transform = 'translateY(100%)';
  setTimeout(() => { overlay.style.display = 'none'; }, 400);
}

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
          <div class="life-quick-icon glass-icon">
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

export function renderLife(container) {
  const merchantList = mockMerchants;

  container.innerHTML = renderHeader() + renderQuickNav() + renderFeed(merchantList);

  container.querySelector('#search-bar-trigger').addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('openSearch'));
  });

  container.querySelector('#map-btn').addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('openMap'));
  });

  container.addEventListener('click', e => {
    const catItem = e.target.closest('.cat-item');
    if (catItem) {
      activeCategory = catItem.dataset.cat;
      container.querySelectorAll('.cat-item').forEach(el => {
        el.classList.toggle('active', el.dataset.cat === activeCategory);
      });
      const params = activeCategory !== 'all' ? { category: activeCategory } : {};
      let list = mockMerchants.filter(m => activeCategory === 'all' || m.category === activeCategory);
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
      if (merchant) openMerchantDetail(merchant);
      return;
    }

    // 金刚区点击 → 触发对应分类筛选
    const quickItem = e.target.closest('.life-quick-item');
    if (quickItem) {
      const label = quickItem.querySelector('.life-quick-label').textContent.trim();
      if (label === '附近商户') {
        window.dispatchEvent(new CustomEvent('openMap'));
        return;
      }
      if (label === '更多服务') {
        showToast('更多服务即将上线，敬请期待');
        return;
      }
      const catMap = { '娱乐中心': '娱乐场所', '文创工坊': '潮玩周边', '餐饮消费': '餐饮消费', '数物限定': '数物限定', '旗舰店': '旗舰店', '精选推荐': 'all' };
      const cat = catMap[label] || 'all';
      activeCategory = cat;
      container.querySelectorAll('.cat-item').forEach(el => el.classList.toggle('active', el.dataset.cat === activeCategory));
      let list = mockMerchants.filter(m => cat === 'all' || m.category === cat);
      const feed = container.querySelector('#merchant-feed');
      const tmp = document.createElement('div');
      tmp.innerHTML = renderFeed(list);
      feed.replaceWith(tmp.querySelector('#merchant-feed'));
    }
  });
}
