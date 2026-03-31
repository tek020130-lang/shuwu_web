import { renderLife } from './tabs/life.js';
import { renderSquare, addPost } from './tabs/square.js';
import { renderSpace } from './tabs/space.js';
import { renderMall } from './tabs/mall.js';
import { initScan } from './components/scan.js';
import { initPayment } from './components/payment.js';
import { initSearch } from './components/search.js';
import { initMap } from './components/map.js';
import { initProfile, initSwapInfo, initReceive, initGalleryDetail } from './components/profile.js';
import { topics, spaceNFTs } from './data/mock.js';

const blob = document.getElementById('nav-blob');
const capsule = document.getElementById('nav-capsule');
const PAD = 6; // must match .nav-capsule padding in CSS

function moveBlob(el) {
  const cr = capsule.getBoundingClientRect();
  const er = el.getBoundingClientRect();
  const maxLeft = cr.width - PAD - (er.right - er.left);
  const left = Math.max(PAD, Math.min(er.left - cr.left, maxLeft));
  const width = Math.min(er.width, cr.width - PAD * 2);
  blob.style.left = left + 'px';
  blob.style.width = width + 'px';
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item[data-tab]').forEach(n => n.classList.remove('active'));
  document.getElementById(`page-${tabId}`).classList.add('active');
  const activeBtn = document.querySelector(`.nav-item[data-tab="${tabId}"]`);
  if (activeBtn) { activeBtn.classList.add('active'); moveBlob(activeBtn); }
  // 广场浮动按钮只在广场 tab 显示
  const floatBtns = document.getElementById('sq-float-btns');
  if (floatBtns) floatBtns.style.display = tabId === 'square' ? 'flex' : 'none';
}

document.querySelectorAll('.nav-item[data-tab]').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

renderLife(document.getElementById('page-life'));
renderSquare(document.getElementById('page-square'));
renderMall(document.getElementById('page-mall'));
renderSpace(document.getElementById('page-space'));
initScan();
initPayment();
initSearch();
initMap();
initCompose();
initProfile();
initSwapInfo();
initReceive();
initGalleryDetail();
initGalleryTabs();

function initCompose() {
  const overlay = document.getElementById('compose-overlay');
  const backdrop = document.getElementById('compose-backdrop');
  const textarea = document.getElementById('compose-textarea');
  const publishBtn = document.getElementById('compose-publish-btn');
  const glow = document.getElementById('compose-glow');
  const topicsEl = document.getElementById('compose-topics');
  let selectedTopic = topics[0];

  topicsEl.innerHTML = topics.map(t =>
    `<button class="compose-topic-tag${t === selectedTopic ? ' selected' : ''}" data-topic="${t}">#${t}</button>`
  ).join('');

  topicsEl.addEventListener('click', e => {
    const tag = e.target.closest('.compose-topic-tag');
    if (!tag) return;
    selectedTopic = tag.dataset.topic;
    topicsEl.querySelectorAll('.compose-topic-tag').forEach(b => b.classList.toggle('selected', b.dataset.topic === selectedTopic));
  });

  window.addEventListener('openCompose', () => {
    overlay.classList.remove('hidden');
    setTimeout(() => textarea.focus(), 300);
  });

  backdrop.addEventListener('click', () => overlay.classList.add('hidden'));

  publishBtn.addEventListener('click', () => {
    const content = textarea.value.trim();
    if (!content) return;
    glow.classList.remove('active');
    void glow.offsetWidth;
    glow.classList.add('active');
    setTimeout(() => {
      addPost(content, selectedTopic);
      overlay.classList.add('hidden');
      textarea.value = '';
      // Re-render square feed
      renderSquare(document.getElementById('page-square'));
    }, 400);
  });
}

requestAnimationFrame(() => switchTab('life'));

function initGalleryTabs() {
  const grid = document.getElementById('gallery-grid');
  const tabs = document.getElementById('gallery-tabs');
  let activeType = 'nft';

  function renderGrid() {
    if (activeType === 'nft') {
      grid.innerHTML = spaceNFTs.map(n => `
        <div class="gallery-item">
          <div class="gallery-item-tier" style="color:${n.color}">${n.tier === 'genesis' ? '创世' : n.tier === 'premium' ? '高阶' : '基础'}</div>
          <div class="gallery-item-name">${n.name}</div>
          <div class="gallery-item-boost">分红加成 ${n.dividendBoost}</div>
        </div>
      `).join('');
    } else {
      grid.innerHTML = `
        <div class="gallery-item"><div class="gallery-item-tier" style="color:#8E8E93">文创</div><div class="gallery-item-name">数物帆布包</div><div class="gallery-item-boost">限量 500 件</div></div>
        <div class="gallery-item"><div class="gallery-item-tier" style="color:#8E8E93">文创</div><div class="gallery-item-name">创世马克杯</div><div class="gallery-item-boost">限量 200 件</div></div>
      `;
    }
  }

  tabs?.addEventListener('click', e => {
    const tab = e.target.closest('.gallery-tab');
    if (!tab) return;
    activeType = tab.dataset.gtype;
    tabs.querySelectorAll('.gallery-tab').forEach(b => b.classList.toggle('active', b.dataset.gtype === activeType));
    renderGrid();
  });

  window.addEventListener('openGallery', () => renderGrid());
}
