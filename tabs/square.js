import { posts as initialPosts, ticker, topics, userState } from '../data/mock.js';

const TABS = [
  { id: '热门', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/></svg>` },
  { id: '社区', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>` },
  { id: '快讯', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>` },
  { id: '社区', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>` },
];

const REAL_TABS = ['关注', '热门', '快讯', '社区'];

const POST_COST = 0.5;
let posts = initialPosts.map(p => ({ ...p }));
let activeTab = '热门';
let postIdCounter = posts.length + 1;

const TAB_ICONS = {
  关注: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,
  热门: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/></svg>`,
  快讯: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>`,
  社区: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
};

const HOT_TOPICS = [
  { tag: 'NFT市场分析', count: '12.5k' },
  { tag: 'SWORL生态', count: '8.2k' },
  { tag: '数字藏品', count: '6.8k' },
  { tag: 'Web3新项目', count: '5.1k' },
];

const AVATAR_COLORS = ['#8B5CF6','#3B82F6','#10B981','#F59E0B','#EF4444','#EC4899','#6366F1'];

const MOCK_COMMENTS = [
  { user: '数物先行者', text: '说得太对了，完全认同！', time: '1分钟前', color: '#1A1A1A' },
  { user: 'CryptoNomad', text: '这个观点很有意思，值得深入探讨', time: '5分钟前', color: '#5856D6' },
  { user: 'NFT_Collector', text: '支持！数物生态越来越完善了', time: '12分钟前', color: '#FF6B35' },
  { user: '夜行者_Shanghai', text: '已转发给朋友，大家都觉得很有价值', time: '28分钟前', color: '#34C759' },
];

function showToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;bottom:calc(var(--nav-h) + 24px);left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.75);color:#fff;padding:10px 20px;border-radius:999px;font-size:13px;z-index:9999;pointer-events:none;white-space:nowrap;backdrop-filter:blur(8px)';
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2200);
}

function openCommentSheet(post) {
  let overlay = document.getElementById('sq-comment-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'sq-comment-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:300;display:none;flex-direction:column;justify-content:flex-end';
    overlay.innerHTML = `
      <div id="sq-comment-backdrop" style="position:absolute;inset:0;background:rgba(0,0,0,0.4);backdrop-filter:blur(6px)"></div>
      <div id="sq-comment-sheet" style="position:relative;z-index:1;background:#fff;border-radius:28px 28px 0 0;max-height:80vh;display:flex;flex-direction:column;transform:translateY(100%);transition:transform 0.4s cubic-bezier(0.23,1,0.32,1)">
        <div style="width:36px;height:4px;border-radius:2px;background:#E5E5EA;margin:12px auto 0;flex-shrink:0"></div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 20px 10px;flex-shrink:0">
          <div style="font-size:17px;font-weight:700" id="sq-comment-title">评论</div>
          <button id="sq-comment-close" style="width:32px;height:32px;border-radius:50%;border:none;background:#F5F5F7;display:flex;align-items:center;justify-content:center;cursor:pointer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div id="sq-comment-list" style="overflow-y:auto;flex:1;padding:0 16px 8px"></div>
        <div style="padding:12px 16px 40px;border-top:1px solid rgba(0,0,0,0.06);flex-shrink:0;display:flex;gap:10px">
          <input id="sq-comment-input" placeholder="说点什么…" style="flex:1;height:44px;border-radius:22px;border:1px solid rgba(0,0,0,0.1);padding:0 16px;font-size:14px;font-family:inherit;outline:none;background:#F9F9FB" />
          <button id="sq-comment-send" style="height:44px;padding:0 20px;border-radius:22px;background:#1A1A1A;color:#fff;font-size:14px;font-weight:500;border:none;cursor:pointer">发送</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.querySelector('#sq-comment-backdrop').addEventListener('click', closeCommentSheet);
    overlay.querySelector('#sq-comment-close').addEventListener('click', closeCommentSheet);
  }

  overlay.querySelector('#sq-comment-title').textContent = `评论 (${post.comments})`;
  const list = overlay.querySelector('#sq-comment-list');
  list.innerHTML = MOCK_COMMENTS.slice(0, post.comments > 0 ? Math.min(post.comments, 4) : 0).map(c => `
    <div style="display:flex;gap:10px;padding:12px 0;border-bottom:1px solid rgba(0,0,0,0.04)">
      <div style="width:36px;height:36px;border-radius:50%;background:${c.color};display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;font-weight:600;flex-shrink:0">${c.user.charAt(0)}</div>
      <div style="flex:1">
        <div style="font-size:13px;font-weight:600;margin-bottom:3px">${c.user}</div>
        <div style="font-size:14px;line-height:1.5;color:var(--text)">${c.text}</div>
        <div style="font-size:11px;color:var(--text-sub);margin-top:4px">${c.time}</div>
      </div>
    </div>
  `).join('') || `<div style="text-align:center;padding:40px 0;color:var(--text-sub);font-size:14px">暂无评论，来说第一句话</div>`;

  const sendBtn = overlay.querySelector('#sq-comment-send');
  const input = overlay.querySelector('#sq-comment-input');
  const newSend = sendBtn.cloneNode(true);
  sendBtn.parentNode.replaceChild(newSend, sendBtn);
  newSend.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;
    post.comments++;
    const newComment = document.createElement('div');
    newComment.style.cssText = 'display:flex;gap:10px;padding:12px 0;border-bottom:1px solid rgba(0,0,0,0.04)';
    newComment.innerHTML = `
      <div style="width:36px;height:36px;border-radius:50%;background:#1A1A1A;display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;font-weight:600;flex-shrink:0">我</div>
      <div style="flex:1">
        <div style="font-size:13px;font-weight:600;margin-bottom:3px">我</div>
        <div style="font-size:14px;line-height:1.5">${text}</div>
        <div style="font-size:11px;color:var(--text-sub);margin-top:4px">刚刚</div>
      </div>
    `;
    list.insertBefore(newComment, list.firstChild);
    input.value = '';
    showToast('评论成功');
  });

  overlay.style.display = 'flex';
  requestAnimationFrame(() => { overlay.querySelector('#sq-comment-sheet').style.transform = 'translateY(0)'; });
}

function closeCommentSheet() {
  const overlay = document.getElementById('sq-comment-overlay');
  const sheet = overlay?.querySelector('#sq-comment-sheet');
  if (!overlay || !sheet) return;
  sheet.style.transform = 'translateY(100%)';
  setTimeout(() => { overlay.style.display = 'none'; }, 400);
}

function openMenuSheet(post) {
  let overlay = document.getElementById('sq-menu-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'sq-menu-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:300;display:none;flex-direction:column;justify-content:flex-end';
    overlay.innerHTML = `
      <div id="sq-menu-backdrop" style="position:absolute;inset:0;background:rgba(0,0,0,0.3);backdrop-filter:blur(4px)"></div>
      <div id="sq-menu-sheet" style="position:relative;z-index:1;background:#fff;border-radius:28px 28px 0 0;padding:16px 16px 48px;transform:translateY(100%);transition:transform 0.35s cubic-bezier(0.23,1,0.32,1)">
        <div style="width:36px;height:4px;border-radius:2px;background:#E5E5EA;margin:0 auto 16px"></div>
        <div id="sq-menu-actions"></div>
        <button id="sq-menu-cancel" style="width:100%;height:52px;border-radius:16px;background:#F5F5F7;border:none;font-size:16px;color:var(--text-sub);cursor:pointer;margin-top:8px">取消</button>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.querySelector('#sq-menu-backdrop').addEventListener('click', closeMenuSheet);
    overlay.querySelector('#sq-menu-cancel').addEventListener('click', closeMenuSheet);
  }

  const actions = [
    { label: '收藏', icon: '<path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>' },
    { label: '复制链接', icon: '<path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>' },
    { label: '举报', icon: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>', color: '#FF3B30' },
  ];

  overlay.querySelector('#sq-menu-actions').innerHTML = actions.map((a, i) => `
    <button class="sq-menu-action-btn" data-action="${a.label}" style="width:100%;height:52px;border-radius:16px;background:#F9F9FB;border:none;display:flex;align-items:center;gap:14px;padding:0 20px;font-size:16px;cursor:pointer;color:${a.color || 'var(--text)'};margin-bottom:8px">
      <svg viewBox="0 0 24 24" fill="none" stroke="${a.color || 'currentColor'}" stroke-width="1.5" style="width:20px;height:20px">${a.icon}</svg>
      ${a.label}
    </button>
  `).join('');

  const actionsEl = overlay.querySelector('#sq-menu-actions');
  const newActionsEl = actionsEl.cloneNode(true);
  actionsEl.parentNode.replaceChild(newActionsEl, actionsEl);
  newActionsEl.addEventListener('click', e => {
    const btn = e.target.closest('.sq-menu-action-btn');
    if (!btn) return;
    const action = btn.dataset.action;
    closeMenuSheet();
    if (action === '收藏') showToast('已收藏');
    else if (action === '复制链接') showToast('链接已复制');
    else if (action === '举报') showToast('举报已提交，感谢反馈');
  });

  overlay.style.display = 'flex';
  requestAnimationFrame(() => { overlay.querySelector('#sq-menu-sheet').style.transform = 'translateY(0)'; });
}

function closeMenuSheet() {
  const overlay = document.getElementById('sq-menu-overlay');
  const sheet = overlay?.querySelector('#sq-menu-sheet');
  if (!overlay || !sheet) return;
  sheet.style.transform = 'translateY(100%)';
  setTimeout(() => { overlay.style.display = 'none'; }, 350);
}

function avatarColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

function renderPost(p) {
  const color = p.avatarColor || avatarColor(p.userName);
  return `
    <div class="sq-post-new glass-card" data-id="${p.id}">
      <div class="sq-author-row">
        <div class="sq-author-info">
          <div class="sq-avatar-img" style="background:${color}">${p.userName.charAt(0).toUpperCase()}</div>
          <div>
            <div class="sq-author-name-row">
              <span class="sq-author-name">${p.userName}</span>
              ${p.verified ? `<svg viewBox="0 0 24 24" fill="#8B5CF6" style="width:14px;height:14px"><path d="M12 1l2.5 2.5h3.5v3.5l2.5 2.5-2.5 2.5v3.5h-3.5L12 18l-2.5-2.5H6v-3.5L3.5 9.5 6 7V3.5h3.5L12 1z"/><path d="M9 12l2 2 4-4" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>` : ''}
              <span class="sq-author-level">Lv.${p.nftTier === 'genesis' ? 5 : p.nftTier === 'premium' ? 3 : 1}</span>
            </div>
            <span class="sq-post-time">${p.time}</span>
          </div>
        </div>
        <button class="glass-icon sq-menu-btn" style="width:34px;height:34px;border-radius:10px;display:flex;align-items:center;justify-content:center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:16px;height:16px"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
        </button>
      </div>
      <p class="sq-post-text">${p.content}</p>
      <div class="sq-post-actions">
        <button class="sq-action-new sq-like-btn${p.liked ? ' liked' : ''}" data-id="${p.id}">
          <svg viewBox="0 0 24 24" fill="none" style="width:18px;height:18px">
            <circle cx="12" cy="12" r="10" fill="url(#sg-${p.id})"/>
            <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <defs><linearGradient id="sg-${p.id}" x1="0" y1="0" x2="24" y2="24"><stop stop-color="#8B5CF6"/><stop offset="1" stop-color="#A78BFA"/></linearGradient></defs>
          </svg>
          <span class="sq-value">${p.value.toFixed(1)}</span>
          ${!p.liked ? '<span style="font-size:10px;opacity:0.6">+1 SWORL</span>' : ''}
        </button>
        <button class="sq-action-new sq-comment-btn" data-id="${p.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:18px;height:18px"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          <span>${p.comments}</span>
        </button>
        <button class="sq-action-new sq-repost-btn" data-id="${p.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:18px;height:18px"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>
          <span>${p.reposts}</span>
        </button>
      </div>
    </div>
  `;
}

function renderHotTopics() {
  return `
    <div class="sq-hot-topics">
      <div class="sq-hot-header">
        <span class="sq-hot-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h16M4 15h16M10 3L8 21M16 3l-2 18"/></svg>
          热门话题
        </span>
        <span class="sq-hot-more">更多 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:12px;height:12px"><path d="M9 18l6-6-6-6"/></svg></span>
      </div>
      <div class="sq-hot-scroll">
        ${HOT_TOPICS.map(t => `
          <div class="sq-hot-tag glass-card">
            <span class="sq-hot-tag-hash">#</span>
            <span class="sq-hot-tag-name">${t.tag}</span>
            <span class="sq-hot-tag-count">${t.count}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderFeed(container) {
  const feed = container.querySelector('#sq-feed');

  if (activeTab === '快讯') {
    feed.innerHTML = `
      <div style="padding:16px 16px">
        <div style="font-size:12px;color:var(--text-sub);font-weight:500;letter-spacing:1px;text-transform:uppercase;margin-bottom:12px">实时快讯</div>
        ${ticker.map((t, i) => `
          <div class="sq-ticker-item" style="display:flex;align-items:flex-start;gap:12px;padding:14px 0;border-bottom:1px solid rgba(0,0,0,0.05)">
            <div style="width:6px;height:6px;border-radius:50%;background:var(--gold);flex-shrink:0;margin-top:6px"></div>
            <div>
              <div style="font-size:14px;line-height:1.6;color:var(--text);font-weight:300">${t}</div>
              <div style="font-size:11px;color:var(--text-sub);margin-top:4px">${i === 0 ? '刚刚' : i < 3 ? `${i * 12}分钟前` : `${i}小时前`}</div>
            </div>
          </div>
        `).join('')}
      </div>`;
    return;
  }

  if (activeTab === '关注') {
    const followedPosts = posts.filter(p => p.nftTier === 'genesis');
    if (followedPosts.length === 0) {
      feed.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 20px;gap:12px">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" style="width:48px;height:48px;color:#D1D1D6"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
        <div style="font-size:16px;font-weight:300;color:#C7C7CC">还没有关注的人</div>
        <div style="font-size:13px;color:#D1D1D6">去热门发现感兴趣的创作者</div>
      </div>`;
      return;
    }
    feed.innerHTML = `<div style="padding:12px 16px;display:flex;flex-direction:column;gap:12px">${followedPosts.map(p => renderPost(p)).join('')}</div>`;
    return;
  }

  if (activeTab === '社区') {
    const topicGroups = {};
    posts.forEach(p => {
      const t = p.topic || '其他';
      if (!topicGroups[t]) topicGroups[t] = [];
      topicGroups[t].push(p);
    });
    let html = '';
    Object.entries(topicGroups).slice(0, 4).forEach(([topic, tPosts]) => {
      html += `
        <div style="padding:0 16px 4px">
          <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 0 10px">
            <span style="font-size:15px;font-weight:600">#${topic}</span>
            <span style="font-size:12px;color:var(--text-sub)">${tPosts.length} 条讨论</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${tPosts.slice(0, 2).map(p => renderPost(p)).join('')}
          </div>
        </div>
        <div style="height:8px;background:rgba(0,0,0,0.03);margin:8px 0"></div>
      `;
    });
    feed.innerHTML = html;
    return;
  }

  // 热门 tab（默认）
  let html = renderHotTopics();
  posts.forEach((p, i) => {
    if (i > 0 && i % 4 === 0) {
      html += `<div class="sq-ticker" style="margin:0 16px"><div class="sq-ticker-inner"><span>${ticker.join('　·　')}　·　${ticker.join('　·　')}</span></div></div>`;
    }
    html += renderPost(p);
  });
  feed.innerHTML = `<div style="padding:12px 16px;display:flex;flex-direction:column;gap:12px">${html}</div>`;
}

export function renderSquare(container) {
  container.innerHTML = `
    <div class="sq-header">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 20px 10px">
        <button id="sq-profile-btn" style="width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;border:none" class="glass-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px"><circle cx="12" cy="7" r="3.5"/><path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6"/></svg>
        </button>
        <div style="font-size:15px;font-weight:600;color:var(--text)">广场</div>
        <div style="width:36px"></div>
      </div>
      <div class="sq-tabs" id="sq-tabs" style="margin:0 16px 14px">
        ${REAL_TABS.map(t => `
          <button class="sq-tab${t === activeTab ? ' active' : ''}" data-tab="${t}">
            <span style="display:flex;align-items:center;gap:5px;justify-content:center">
              <span style="width:14px;height:14px;display:flex;align-items:center;justify-content:center">${TAB_ICONS[t]}</span>
              ${t}
            </span>
          </button>
        `).join('')}
        <div class="sq-tab-line" id="sq-tab-line"></div>
      </div>
    </div>
    <div id="sq-feed" class="sq-feed"></div>
  `;

  // 发帖中心 overlay — 挂到 body 避免被 overflow:auto 裁剪
  let postsCenter = document.getElementById('sq-posts-center');
  if (!postsCenter) {
    postsCenter = document.createElement('div');
    postsCenter.id = 'sq-posts-center';
    postsCenter.style.cssText = 'position:fixed;inset:0;z-index:300;display:none;flex-direction:column';
    postsCenter.innerHTML = `
      <div style="position:absolute;inset:0;background:rgba(0,0,0,0.35);backdrop-filter:blur(6px)" id="sq-posts-center-backdrop"></div>
      <div id="sq-posts-center-sheet" style="position:relative;z-index:1;background:#fff;border-radius:28px 28px 0 0;margin-top:auto;max-height:85vh;display:flex;flex-direction:column;transform:translateY(100%);transition:transform 0.4s cubic-bezier(0.23,1,0.32,1)">
        <div style="width:36px;height:4px;border-radius:2px;background:#E5E5EA;margin:12px auto 0;flex-shrink:0"></div>
        <div id="sq-posts-center-title" style="font-size:18px;font-weight:700;text-align:center;padding:16px 24px 4px;flex-shrink:0"></div>
        <div id="sq-posts-center-list" style="overflow-y:auto;padding:0 16px 40px;display:flex;flex-direction:column;gap:12px"></div>
      </div>
    `;
    document.body.appendChild(postsCenter);
    postsCenter.querySelector('#sq-posts-center-backdrop').addEventListener('click', () => closePostsCenter());
  }

  // 把按钮组挂到 body，避免被 overflow:hidden 裁剪
  let btnGroup = document.getElementById('sq-float-btns');
  if (!btnGroup) {
    btnGroup = document.createElement('div');
    btnGroup.id = 'sq-float-btns';
    btnGroup.style.cssText = 'position:fixed;right:16px;top:50%;transform:translateY(-50%);z-index:200';
    btnGroup.innerHTML = `
      <button id="sq-compose-btn" style="width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.9);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.95);box-shadow:0 4px 20px rgba(0,0,0,0.12),0 1px 0 inset rgba(255,255,255,1);display:flex;align-items:center;justify-content:center;cursor:pointer">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:22px;height:22px"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>
    `;
    document.body.appendChild(btnGroup);
  }
  const isSquareActive = document.getElementById('page-square')?.classList.contains('active');
  btnGroup.style.display = isSquareActive ? 'block' : 'none';

  renderFeed(container);
  requestAnimationFrame(() => moveTabLine(container));

  container.querySelector('#sq-tabs').addEventListener('click', e => {
    const btn = e.target.closest('.sq-tab');
    if (!btn) return;
    activeTab = btn.dataset.tab;
    container.querySelectorAll('.sq-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === activeTab));
    moveTabLine(container);
    renderFeed(container);
  });

  container.addEventListener('click', e => {
    const likeBtn = e.target.closest('.sq-like-btn');
    if (likeBtn) {
      const id = parseInt(likeBtn.dataset.id);
      const post = posts.find(p => p.id === id);
      if (!post) return;
      post.liked = !post.liked;
      post.value = post.liked ? +(post.value + 0.5).toFixed(1) : +(post.value - 0.5).toFixed(1);
      likeBtn.classList.toggle('liked', post.liked);
      likeBtn.querySelector('.sq-value').textContent = post.value.toFixed(1);
      likeBtn.style.transform = 'scale(1.25)';
      setTimeout(() => likeBtn.style.transform = '', 200);
      return;
    }

    const commentBtn = e.target.closest('.sq-comment-btn');
    if (commentBtn) {
      const id = parseInt(commentBtn.dataset.id);
      const post = posts.find(p => p.id === id);
      if (post) openCommentSheet(post);
      return;
    }

    const repostBtn = e.target.closest('.sq-repost-btn');
    if (repostBtn) {
      const id = parseInt(repostBtn.dataset.id);
      const post = posts.find(p => p.id === id);
      if (post) {
        post.reposts++;
        repostBtn.querySelector('span').textContent = post.reposts;
        showToast('转发成功，+0.5 SWORL');
      }
      return;
    }

    const menuBtn = e.target.closest('.sq-menu-btn');
    if (menuBtn) {
      const postEl = menuBtn.closest('.sq-post-new');
      if (!postEl) return;
      const id = parseInt(postEl.dataset.id);
      const post = posts.find(p => p.id === id);
      if (post) openMenuSheet(post);
      return;
    }

    const avatar = e.target.closest('.sq-avatar-img');
    if (avatar) {
      const postEl = avatar.closest('.sq-post-new');
      if (!postEl) return;
      const id = parseInt(postEl.dataset.id);
      const post = posts.find(p => p.id === id);
      if (!post) return;
      openPostsCenter(post.userName, posts.filter(p => p.userId === post.userId));
    }
  });

  document.getElementById('sq-compose-btn').addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('openCompose'));
  });

  container.querySelector('#sq-profile-btn').addEventListener('click', () => {
    const myPosts = posts.filter(p => p.userId === 'me' || p.userName === userState.name || p.userName === '我');
    openPostsCenter('我的帖子', myPosts);
  });
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

function openPostsCenter(title, userPosts) {
  const overlay = document.getElementById('sq-posts-center');
  const sheet = document.getElementById('sq-posts-center-sheet');
  document.getElementById('sq-posts-center-title').textContent = title;
  const list = document.getElementById('sq-posts-center-list');
  list.innerHTML = userPosts.length === 0
    ? '<div style="text-align:center;color:var(--text-sub);padding:40px 0;font-size:14px">暂无帖子</div>'
    : userPosts.map(p => renderPost(p)).join('');
  overlay.style.display = 'flex';
  requestAnimationFrame(() => { sheet.style.transform = 'translateY(0)'; });
}

function closePostsCenter() {
  const overlay = document.getElementById('sq-posts-center');
  const sheet = document.getElementById('sq-posts-center-sheet');
  if (!overlay || !sheet) return;
  sheet.style.transform = 'translateY(100%)';
  setTimeout(() => { overlay.style.display = 'none'; }, 400);
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
