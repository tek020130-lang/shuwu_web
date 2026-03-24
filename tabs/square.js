import { posts as initialPosts, ticker, topics, userState } from '../data/mock.js';

const NFT_LINE_COLOR = { genesis: '#C9A84C', premium: '#A3E635', basic: '#8E8E93', none: 'transparent' };
const TABS = ['关注', '热门', '快讯', '社区'];
const POST_COST = 0.5;

let posts = initialPosts.map(p => ({ ...p }));
let activeTab = '热门';
let postIdCounter = posts.length + 1;

function avatarInitial(name) { return name.charAt(0).toUpperCase(); }

function renderTickerItem() {
  const text = ticker.join('　·　');
  return `
    <div class="sq-ticker">
      <div class="sq-ticker-inner">
        <span>${text}　·　${text}</span>
      </div>
    </div>
  `;
}

function renderPost(p) {
  const lineColor = NFT_LINE_COLOR[p.nftTier] || 'transparent';
  const hasLine = p.nftTier !== 'none';
  return `
    <div class="sq-post" data-id="${p.id}">
      <div class="sq-post-left">
        ${hasLine ? `<div class="sq-nft-line" style="background:${lineColor}"></div>` : '<div class="sq-nft-line transparent"></div>'}
        <div class="sq-avatar" style="background:${p.avatarColor}">${avatarInitial(p.userName)}</div>
      </div>
      <div class="sq-post-body">
        <div class="sq-post-header">
          <span class="sq-username">${p.userName}</span>
          ${p.verified ? '<span class="sq-verified">✦</span>' : ''}
          <span class="sq-time">${p.time}</span>
        </div>
        <div class="sq-content">${p.content}</div>
        <div class="sq-post-footer">
          <span class="sq-topic">#${p.topic}</span>
          <div class="sq-actions">
            <button class="sq-like-btn${p.liked ? ' liked' : ''}" data-id="${p.id}">
              <svg viewBox="0 0 24 24" fill="${p.liked ? '#C9A84C' : 'none'}" stroke="${p.liked ? '#C9A84C' : 'currentColor'}" stroke-width="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
              <span class="sq-value">${p.value.toFixed(1)} S</span>
            </button>
            <button class="sq-action-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
              <span>${p.comments}</span>
            </button>
            <button class="sq-action-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <polyline points="17,1 21,5 17,9"/><path d="M3 11V9a4 4 0 014-4h14"/>
                <polyline points="7,23 3,19 7,15"/><path d="M21 13v2a4 4 0 01-4 4H3"/>
              </svg>
              <span>${p.reposts}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderFeed(container) {
  const feed = container.querySelector('#sq-feed');
  const filtered = activeTab === '快讯'
    ? []
    : posts;

  let html = '';
  filtered.forEach((p, i) => {
    // Insert ticker every 4 posts
    if (i > 0 && i % 4 === 0) html += renderTickerItem();
    html += renderPost(p);
  });

  if (activeTab === '快讯') {
    html = `<div class="sq-ticker-page">${ticker.map(t => `<div class="sq-ticker-item">${t}</div>`).join('')}</div>`;
  }

  feed.innerHTML = html;
}

export function renderSquare(container) {
  container.innerHTML = `
    <div class="sq-header">
      <div class="sq-title">广场</div>
      <div class="sq-tabs" id="sq-tabs">
        ${TABS.map(t => `<button class="sq-tab${t === activeTab ? ' active' : ''}" data-tab="${t}">${t}</button>`).join('')}
        <div class="sq-tab-line" id="sq-tab-line"></div>
      </div>
    </div>
    <div id="sq-feed" class="sq-feed"></div>
    <button class="sq-compose-btn" id="sq-compose-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    </button>
  `;

  renderFeed(container);
  initTabLine(container);

  // Tab switching
  container.querySelector('#sq-tabs').addEventListener('click', e => {
    const btn = e.target.closest('.sq-tab');
    if (!btn) return;
    activeTab = btn.dataset.tab;
    container.querySelectorAll('.sq-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === activeTab));
    moveTabLine(container);
    renderFeed(container);
  });

  // Like / tip
  container.addEventListener('click', e => {
    const likeBtn = e.target.closest('.sq-like-btn');
    if (likeBtn) {
      const id = parseInt(likeBtn.dataset.id);
      const post = posts.find(p => p.id === id);
      if (!post) return;
      post.liked = !post.liked;
      post.value = post.liked ? +(post.value + 0.5).toFixed(1) : +(post.value - 0.5).toFixed(1);
      likeBtn.classList.toggle('liked', post.liked);
      likeBtn.querySelector('svg').setAttribute('fill', post.liked ? '#C9A84C' : 'none');
      likeBtn.querySelector('svg').setAttribute('stroke', post.liked ? '#C9A84C' : 'currentColor');
      likeBtn.querySelector('.sq-value').textContent = post.value.toFixed(1) + ' S';
      // Animate
      likeBtn.style.transform = 'scale(1.3)';
      setTimeout(() => likeBtn.style.transform = '', 200);
    }
  });

  // Compose
  container.querySelector('#sq-compose-btn').addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('openCompose'));
  });
}

function initTabLine(container) {
  requestAnimationFrame(() => moveTabLine(container));
}

function moveTabLine(container) {
  const activeBtn = container.querySelector('.sq-tab.active');
  const line = container.querySelector('#sq-tab-line');
  if (!activeBtn || !line) return;
  const tabs = container.querySelector('#sq-tabs');
  const tr = tabs.getBoundingClientRect();
  const br = activeBtn.getBoundingClientRect();
  line.style.left = (br.left - tr.left + br.width / 2 - 12) + 'px';
  line.style.width = '24px';
}

export function addPost(content, topic) {
  const newPost = {
    id: ++postIdCounter,
    userId: 'me', userName: '我', nftTier: 'genesis',
    avatarColor: '#1A1A1A', verified: true,
    content, topic, value: 0, comments: 0, reposts: 0,
    time: '刚刚', liked: false,
  };
  posts.unshift(newPost);
  userState.sworlBalance = +(userState.sworlBalance - POST_COST).toFixed(1);
  return newPost;
}
