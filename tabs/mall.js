import { mallProducts as mockProducts, mallCollections, newDrops } from '../data/mock.js';
import { api, isLoggedIn } from '../api/client.js';

const DATE_FILTERS = [
  { date: '全部', day: '全部' },
  { date: '3月', day: '3月' },
  { date: '2月', day: '2月' },
  { date: '1月', day: '1月' },
];

let activeCollection = 'all';
let activeDate = '全部';
let spiralObserver = null;
const purchasedIds = new Set();
let products = mockProducts.map(p => ({ ...p }));

function showToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;bottom:calc(var(--nav-h) + 24px);left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.75);color:#fff;padding:10px 20px;border-radius:999px;font-size:13px;z-index:9999;pointer-events:none;white-space:nowrap;backdrop-filter:blur(8px)';
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2200);
}

// SWORL 图标 SVG
function sworlIcon(id = '') {
  return `<svg viewBox="0 0 24 24" fill="none" style="width:15px;height:15px"><circle cx="12" cy="12" r="10" fill="url(#sg-mall${id})"/><path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" stroke="white" stroke-width="2" stroke-linecap="round"/><defs><linearGradient id="sg-mall${id}" x1="0" y1="0" x2="24" y2="24"><stop stop-color="#8B5CF6"/><stop offset="1" stop-color="#A78BFA"/></linearGradient></defs></svg>`;
}

function typeLabel(type) {
  return type === 'nft'
    ? '<span class="mall-tag nft-tag">纯资产</span>'
    : '<span class="mall-tag phygital-tag">含实物</span>';
}

function renderProductCard(p, index) {
  const isPurchased = purchasedIds.has(p.id);
  return `
    <div class="mall-grid-item" data-index="${index}">
      <div class="mall-grid-card glass-card" data-id="${p.id}">
        <div class="mall-grid-img">
          <img src="${p.image}" alt="${p.name}" loading="lazy" />
          ${p.limited ? '<div class="mall-grid-badge">限定</div>' : ''}
          ${isPurchased ? '<div class="mall-grid-badge" style="background:rgba(16,185,129,0.9);right:8px;left:auto">已购</div>' : ''}
        </div>
        <div class="mall-grid-body">
          <div class="mall-grid-type">${typeLabel(p.type)}</div>
          <div class="mall-grid-name">${p.name}</div>
          <div class="mall-grid-price">
            ${sworlIcon(p.id)}
            <span>${p.price.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getFiltered() {
  return products.filter(p => {
    const colMatch = activeCollection === 'all' || p.collection === activeCollection;
    const dateMatch = activeDate === '全部' || p.date === activeDate;
    return colMatch && dateMatch;
  });
}

function initSpiralObserver(container) {
  if (spiralObserver) spiralObserver.disconnect();
  spiralObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = (parseInt(e.target.dataset.index || 0) % 4) * 80;
        setTimeout(() => e.target.classList.add('visible'), delay);
        spiralObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  container.querySelectorAll('.mall-grid-item').forEach(el => spiralObserver.observe(el));
}

function renderFeed(container) {
  const products = getFiltered();
  const grid = container.querySelector('#mall-product-grid');
  grid.innerHTML = `<div class="mall-product-grid-2col">${products.map((p, i) => renderProductCard(p, i)).join('')}</div>`;
  initSpiralObserver(grid);
}

function renderDateCol(container) {
  container.querySelector('#mall-date-col').innerHTML = DATE_FILTERS.map((d, i) => `
    <button class="mall-date-btn-new glass-icon${i === 0 ? ' active' : ''}" data-date="${d.date}">
      <div class="date-num">${d.day}</div>
    </button>
  `).join('');
}

function openDetail(productId) {
  const p = products.find(x => x.id === productId);
  if (!p) return;

  const overlay = document.getElementById('mall-detail-overlay');
  const sheet = document.getElementById('mall-detail-sheet');

  sheet.innerHTML = `
    <div class="mall-detail-header">
      <button class="mall-detail-close" id="mall-detail-close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="mall-detail-scroll">
      <div class="mall-detail-img">
        <img src="${p.image}" alt="${p.name}" />
        ${p.limited ? '<div class="mall-limited-badge">限定</div>' : ''}
      </div>
      <div class="mall-detail-body">
        <div class="mall-detail-top">
          ${typeLabel(p.type)}
          ${p.limited ? '<span class="mall-tag limited-tag">限定</span>' : ''}
        </div>
        <div class="mall-detail-name">${p.name}</div>
        <div class="mall-detail-series">${p.series} · 创作者：${p.creator}</div>
        <div class="mall-royalty-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:14px;height:14px"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
          版税 ${p.royalty}% · 每次流转自动结算至创作者
        </div>
        <button class="mall-chain-btn" id="mall-chain-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:14px;height:14px"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
          链上溯源
        </button>
        <div class="mall-chain-timeline hidden" id="mall-chain-timeline">
          <div class="mall-chain-step"><div class="mall-chain-dot"></div><div><div class="mall-chain-label">工厂生产</div><div class="mall-chain-hash">2024-01-15 · 质检通过</div></div></div>
          <div class="mall-chain-step"><div class="mall-chain-dot active"></div><div><div class="mall-chain-label">链上铸造</div><div class="mall-chain-hash">${p.chainHash}</div></div></div>
          <div class="mall-chain-step"><div class="mall-chain-dot active"></div><div><div class="mall-chain-label">商城发售</div><div class="mall-chain-hash">2024-03-01 · 公开发售</div></div></div>
        </div>
        ${p.type === 'phygital' ? '<div class="mall-phygital-note"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:14px;height:14px;flex-shrink:0"><path d="M5 12h14M12 5l7 7-7 7"/></svg>购买后 3-7 个工作日发货，含 NFC 芯片验真</div>' : ''}
      </div>
    </div>
    <div class="mall-detail-footer">
      <div class="mall-detail-price">${p.price.toLocaleString()} <span>SWORL</span></div>
      <button class="mall-buy-btn" id="mall-buy-btn">立即购买</button>
    </div>
  `;

  overlay.style.display = 'flex';

  sheet.querySelector('#mall-detail-close').addEventListener('click', () => {
    overlay.style.display = 'none';
  });
  sheet.querySelector('#mall-chain-btn').addEventListener('click', () => {
    sheet.querySelector('#mall-chain-timeline').classList.toggle('hidden');
  });
  sheet.querySelector('#mall-buy-btn').addEventListener('click', async () => {
    overlay.style.display = 'none';
    if (isLoggedIn()) {
      try {
        await api.purchase(p.id);
        purchasedIds.add(p.id);
        showToast(`${p.name} 购买成功`);
        window.dispatchEvent(new CustomEvent('paymentSuccess', { detail: { amount: p.price } }));
        return;
      } catch (e) {
        showToast(e.message || '购买失败');
        return;
      }
    }
    window.dispatchEvent(new CustomEvent('openPayment', {
      detail: { name: p.name, sub: p.series + ' · ' + p.creator, amount: (p.price * 0.85).toFixed(2) }
    }));
    const onSuccess = () => {
      purchasedIds.add(p.id);
      window.removeEventListener('paymentSuccess', onSuccess);
      showToast(`${p.name} 购买成功`);
    };
    window.addEventListener('paymentSuccess', onSuccess);
  });
}

function openCartSheet() {
  let overlay = document.getElementById('mall-cart-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'mall-cart-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:300;display:none;flex-direction:column;justify-content:flex-end';
    overlay.innerHTML = `
      <div id="mall-cart-backdrop" style="position:absolute;inset:0;background:rgba(0,0,0,0.4);backdrop-filter:blur(6px)"></div>
      <div id="mall-cart-sheet" style="position:relative;z-index:1;background:#fff;border-radius:28px 28px 0 0;max-height:75vh;display:flex;flex-direction:column;transform:translateY(100%);transition:transform 0.4s cubic-bezier(0.23,1,0.32,1)">
        <div style="width:36px;height:4px;border-radius:2px;background:#E5E5EA;margin:12px auto 0;flex-shrink:0"></div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 20px 12px;flex-shrink:0">
          <div style="font-size:18px;font-weight:700">已购藏品</div>
          <button id="mall-cart-close" style="width:32px;height:32px;border-radius:50%;border:none;background:#F5F5F7;display:flex;align-items:center;justify-content:center;cursor:pointer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div id="mall-cart-list" style="overflow-y:auto;padding:0 16px 40px;display:flex;flex-direction:column;gap:12px"></div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.querySelector('#mall-cart-backdrop').addEventListener('click', closeCartSheet);
    overlay.querySelector('#mall-cart-close').addEventListener('click', closeCartSheet);
  }

  const list = overlay.querySelector('#mall-cart-list');
  const purchased = mallProducts.filter(p => purchasedIds.has(p.id));
  if (purchased.length === 0) {
    list.innerHTML = `<div style="text-align:center;padding:60px 0;color:var(--text-sub)">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" style="width:48px;height:48px;margin-bottom:12px;opacity:0.3"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
      <div style="font-size:15px">暂无已购藏品</div>
    </div>`;
  } else {
    list.innerHTML = purchased.map(p => `
      <div style="display:flex;gap:12px;padding:12px;background:#F9F9FB;border-radius:16px">
        <img src="${p.image}" alt="${p.name}" style="width:64px;height:64px;border-radius:12px;object-fit:cover;flex-shrink:0" />
        <div style="flex:1;min-width:0">
          <div style="font-size:14px;font-weight:600;margin-bottom:4px">${p.name}</div>
          <div style="font-size:12px;color:var(--text-sub);margin-bottom:6px">${p.series} · ${p.creator}</div>
          <div style="display:flex;align-items:center;gap:4px;font-size:13px;font-weight:600">
            <svg viewBox="0 0 24 24" fill="none" style="width:14px;height:14px"><circle cx="12" cy="12" r="10" fill="url(#sg-cart${p.id})"/><path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" stroke="white" stroke-width="2" stroke-linecap="round"/><defs><linearGradient id="sg-cart${p.id}" x1="0" y1="0" x2="24" y2="24"><stop stop-color="#8B5CF6"/><stop offset="1" stop-color="#A78BFA"/></linearGradient></defs></svg>
            ${p.price.toLocaleString()}
          </div>
        </div>
        <div style="font-size:11px;color:#10B981;font-weight:600;align-self:flex-start;padding:3px 8px;background:rgba(16,185,129,0.1);border-radius:20px">已购</div>
      </div>
    `).join('');
  }

  overlay.style.display = 'flex';
  requestAnimationFrame(() => { overlay.querySelector('#mall-cart-sheet').style.transform = 'translateY(0)'; });
}

function closeCartSheet() {
  const overlay = document.getElementById('mall-cart-overlay');
  const sheet = overlay?.querySelector('#mall-cart-sheet');
  if (!overlay || !sheet) return;
  sheet.style.transform = 'translateY(100%)';
  setTimeout(() => { overlay.style.display = 'none'; }, 400);
}

async function loadProducts() {
  try {
    const data = await api.getProducts();
    if (Array.isArray(data) && data.length > 0) products = data;
  } catch { /* keep mock */ }
}

export function renderMall(container) {
  loadProducts().then(() => renderFeed(container));
  container.innerHTML = `
    <div class="mall-page">
      <div class="mall-header">
        <span class="mall-title">商城</span>
        <button class="mall-cart-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
          </svg>
        </button>
      </div>

      <!-- 精致搜索栏 -->
      <div style="padding:0 16px 16px">
        <div class="glass-input" id="mall-search-trigger" style="height:50px;border-radius:25px;display:flex;align-items:center;gap:10px;padding:0 20px;cursor:pointer;color:var(--text-sub);font-size:14px">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:17px;height:17px;flex-shrink:0">
            <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          搜索NFT、数字藏品、文创…
        </div>
      </div>

      <!-- 创作中心 banner -->
      <div class="mall-creator-banner-new glass-gold" id="mall-creator-banner">
        <div class="mall-creator-deco mall-creator-deco-1"></div>
        <div class="mall-creator-deco mall-creator-deco-2"></div>
        <div class="mall-creator-banner-inner">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:16px">
            <div style="display:flex;align-items:center;gap:14px">
              <div class="mall-creator-icon-wrap">
                <div class="mall-creator-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:30px;height:30px;color:#fff"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M5 19l.5 1.5L7 21l-1.5.5L5 23l-.5-1.5L3 21l1.5-.5L5 19z"/><path d="M19 5l.5 1.5L21 7l-1.5.5L19 9l-.5-1.5L17 7l1.5-.5L19 5z"/></svg>
                </div>
                <div class="mall-creator-icon-dot"></div>
              </div>
              <div>
                <div class="mall-creator-banner-title">创作中心</div>
                <div class="mall-creator-banner-sub">开启Web3创作之旅</div>
              </div>
            </div>
            <div class="glass-icon" style="width:38px;height:38px;border-radius:12px;display:flex;align-items:center;justify-content:center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:18px;height:18px"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          </div>
          <div class="mall-creator-feature-tags">
            <div class="mall-creator-feature-tag">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:13px;height:13px"><path d="M18.37 2.63L14 7l-1.59-1.59a2 2 0 00-2.82 0L8 7l9 9 1.59-1.59a2 2 0 000-2.82L17 10l4.37-4.37a2.12 2.12 0 10-3-3z"/><path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-10"/></svg>
              NFT铸造
            </div>
            <div class="mall-creator-feature-tag">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:13px;height:13px"><path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8L19 13M17.8 6.2L19 5M3 21l9-9M12.2 6.2L11 5"/></svg>
              文创设计
            </div>
            <div class="mall-creator-feature-tag">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:13px;height:13px"><circle cx="8" cy="8" r="2.5"/><circle cx="16" cy="16" r="2.5"/><path d="M6 18L18 6"/></svg>
              永久版税
            </div>
          </div>
          <div class="mall-creator-banner-footer">
            <div class="mall-creator-cost">
              ${sworlIcon('banner')}
              创作消耗 50 SWORL
            </div>
            <div class="mall-creator-royalty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:14px;height:14px"><path d="M2.7 10.3l8.6 10.4a1 1 0 001.4 0l8.6-10.4a1 1 0 00.1-1.2L18.6 4a1 1 0 00-.8-.4H6.2a1 1 0 00-.8.4L2.6 9.1a1 1 0 00.1 1.2z"/><path d="M12 3.6L9 9l3 11.7L15 9l-3-5.4z"/><path d="M2.7 9.6h18.6"/></svg>
              采用即享 10% 永久分红
            </div>
          </div>
        </div>
      </div>

      <!-- 分类标签 -->
      <div class="mall-collections" id="mall-collections">
        <button class="mall-col-tab active" data-col="all">全部</button>
        ${mallCollections.map(c => `<button class="mall-col-tab" data-col="${c}">${c}</button>`).join('')}
      </div>

      <!-- 日期筛选 pill -->
      <div class="mall-date-pills" id="mall-date-col">
        ${DATE_FILTERS.map((d, i) => `<button class="mall-date-pill${i === 0 ? ' active' : ''}" data-date="${d.date}">${d.day}</button>`).join('')}
      </div>

      <!-- 螺旋商品流 -->
      <div id="mall-product-grid"></div>
    </div>
  `;

  renderFeed(container);

  container.querySelector('#mall-search-trigger').addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('openSearch', { detail: { mode: 'mall' } }));
  });

  container.querySelector('.mall-cart-btn').addEventListener('click', () => openCartSheet());

  container.querySelector('#mall-product-grid').addEventListener('click', e => {
    const card = e.target.closest('.mall-grid-card');
    if (card && !e.target.closest('.prod-like-btn')) openDetail(+card.dataset.id);
  });

  container.querySelector('#mall-collections').addEventListener('click', e => {
    const tab = e.target.closest('.mall-col-tab');
    if (!tab) return;
    activeCollection = tab.dataset.col;
    container.querySelectorAll('.mall-col-tab').forEach(b => b.classList.toggle('active', b.dataset.col === activeCollection));
    renderFeed(container);
  });

  container.querySelector('#mall-date-col').addEventListener('click', e => {
    const btn = e.target.closest('.mall-date-pill');
    if (!btn) return;
    activeDate = btn.dataset.date;
    container.querySelectorAll('.mall-date-pill').forEach(b => b.classList.toggle('active', b.dataset.date === activeDate));
    renderFeed(container);
  });

  container.querySelector('#mall-creator-banner').addEventListener('click', () => {
    document.getElementById('mall-creator-overlay').style.display = 'flex';
  });

  document.getElementById('mall-creator-close').addEventListener('click', () => {
    document.getElementById('mall-creator-overlay').style.display = 'none';
  });

  document.getElementById('mall-creator-tabs').addEventListener('click', e => {
    const tab = e.target.closest('.mall-creator-tab');
    if (!tab) return;
    document.querySelectorAll('.mall-creator-tab').forEach(b => b.classList.toggle('active', b === tab));
    const isNft = tab.dataset.ctab === 'nft';
    document.getElementById('mall-creator-nft-panel').classList.toggle('hidden', !isNft);
    document.getElementById('mall-creator-merch-panel').classList.toggle('hidden', isNft);
  });

  document.getElementById('mall-upload-zone').addEventListener('click', () => document.getElementById('mall-file-nft').click());
  document.getElementById('mall-upload-zone-merch').addEventListener('click', () => document.getElementById('mall-file-merch').click());

  ['mall-submit-nft', 'mall-submit-merch'].forEach(id => {
    document.getElementById(id).addEventListener('click', function() {
      this.textContent = '✓ 已提交';
      this.style.background = 'var(--sworl)';
      this.style.color = '#1A1A1A';
      setTimeout(() => {
        document.getElementById('mall-creator-overlay').style.display = 'none';
        this.textContent = id.includes('nft') ? '提交铸造' : '提交审核';
        this.style.background = '';
        this.style.color = '';
      }, 1200);
    });
  });
}
