import { mallProducts, mallCollections, newDrops } from '../data/mock.js';

const DATES = ['全部', '3月', '2月', '1月'];
let activeCollection = 'all';
let activeDate = '全部';

function typeLabel(type) {
  return type === 'nft'
    ? '<span class="mall-tag nft-tag">纯资产</span>'
    : '<span class="mall-tag phygital-tag">含实物</span>';
}

function renderDropCard(p) {
  return `
    <div class="mall-drop-card" data-id="${p.id}">
      <div class="mall-drop-img">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        ${p.limited ? '<div class="mall-limited-badge">限定</div>' : ''}
      </div>
      <div class="mall-drop-info">
        ${typeLabel(p.type)}
        <div class="mall-drop-name">${p.name}</div>
        <div class="mall-drop-price">${p.price.toLocaleString()} <span>SWORL</span></div>
      </div>
    </div>
  `;
}

function renderProductCard(p) {
  return `
    <div class="mall-product-card${p.limited ? ' limited' : ''}" data-id="${p.id}">
      <div class="mall-product-img">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
      </div>
      <div class="mall-product-body">
        ${typeLabel(p.type)}
        <div class="mall-product-name">${p.name}</div>
        <div class="mall-product-price">${p.price.toLocaleString()} <span>SWORL</span></div>
      </div>
    </div>
  `;
}

function getFiltered() {
  return mallProducts.filter(p => {
    const colMatch = activeCollection === 'all' || p.collection === activeCollection;
    const dateMatch = activeDate === '全部' || p.date === activeDate;
    return colMatch && dateMatch;
  });
}

function renderFeed(container) {
  container.querySelector('#mall-feed').innerHTML = getFiltered().map(renderProductCard).join('');
}

function renderDateCol(container) {
  container.querySelector('#mall-date-col').innerHTML = DATES.map(d => `
    <button class="mall-date-btn${d === activeDate ? ' active' : ''}" data-date="${d}">${d}</button>
  `).join('');
}

function openDetail(productId) {
  const p = mallProducts.find(x => x.id === productId);
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
  sheet.querySelector('#mall-buy-btn').addEventListener('click', () => {
    overlay.style.display = 'none';
    window.dispatchEvent(new CustomEvent('openPayment', {
      detail: { name: p.name, sub: p.series + ' · ' + p.creator, amount: (p.price * 0.85).toFixed(2) }
    }));
  });
}

export function renderMall(container) {
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

      <div class="mall-search-bar" id="mall-search-trigger">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        搜索商品、创作者…
      </div>

      <div class="mall-creator-banner" id="mall-creator-banner">
        <div class="mall-creator-left">
          <div class="mall-creator-title">数物创作中心</div>
          <div class="mall-creator-sub">上传设计 · 铸造 NFT · 赚取版税</div>
        </div>
        <button class="mall-creator-cta">Create →</button>
      </div>

      <div class="mall-section-label">New Drops</div>
      <div class="mall-drops-track">
        ${newDrops.map(renderDropCard).join('')}
      </div>

      <div class="mall-collections" id="mall-collections">
        <button class="mall-col-tab active" data-col="all">全部</button>
        ${mallCollections.map(c => `<button class="mall-col-tab" data-col="${c}">${c}</button>`).join('')}
      </div>

      <div class="mall-body">
        <div class="mall-date-col" id="mall-date-col"></div>
        <div class="mall-feed" id="mall-feed"></div>
      </div>
    </div>
  `;

  renderDateCol(container);
  renderFeed(container);

  container.querySelector('#mall-search-trigger').addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('openSearch'));
  });

  container.querySelector('.mall-drops-track').addEventListener('click', e => {
    const card = e.target.closest('.mall-drop-card');
    if (card) openDetail(+card.dataset.id);
  });

  container.querySelector('#mall-feed').addEventListener('click', e => {
    const card = e.target.closest('.mall-product-card');
    if (card) openDetail(+card.dataset.id);
  });

  container.querySelector('#mall-collections').addEventListener('click', e => {
    const tab = e.target.closest('.mall-col-tab');
    if (!tab) return;
    activeCollection = tab.dataset.col;
    container.querySelectorAll('.mall-col-tab').forEach(b => b.classList.toggle('active', b.dataset.col === activeCollection));
    renderFeed(container);
  });

  container.querySelector('#mall-date-col').addEventListener('click', e => {
    const btn = e.target.closest('.mall-date-btn');
    if (!btn) return;
    activeDate = btn.dataset.date;
    container.querySelectorAll('.mall-date-btn').forEach(b => b.classList.toggle('active', b.dataset.date === activeDate));
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
