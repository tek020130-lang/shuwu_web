import { spaceState, spaceNFTs, dividendHistory } from '../data/mock.js';
import { api, setToken, isLoggedIn } from '../api/client.js';

// ── Registration Page ──
function renderRegister(container) {
  container.innerHTML = `
    <div class="sp-register">
      <div class="sp-reg-top">
        <div class="sp-reg-logo">数物</div>
        <div class="sp-reg-title">创建你的专属钱包</div>
        <div class="sp-reg-sub">手机号注册，自动生成链上身份</div>
      </div>
      <div class="sp-reg-form">
        <div class="sp-reg-field">
          <span class="sp-reg-prefix">+86</span>
          <input class="sp-reg-input" id="reg-phone" type="tel" placeholder="请输入手机号" maxlength="11" />
        </div>
        <div class="sp-reg-field sp-reg-code-row hidden" id="reg-code-row">
          <input class="sp-reg-input" id="reg-code" type="number" placeholder="验证码" maxlength="6" />
          <button class="sp-reg-send-btn" id="reg-send-btn">发送验证码</button>
        </div>
        <div class="sp-reg-error hidden" id="reg-error" style="color:#FF3B30;font-size:13px;padding:4px 0"></div>
        <button class="sp-reg-submit" id="reg-submit">下一步</button>
        <div class="sp-reg-passkey-hint">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/>
          </svg>
          注册后使用面容/指纹保护钱包，无需助记词
        </div>
      </div>
      <button class="sp-reg-skip" id="reg-skip">跳过，先体验</button>
    </div>
  `;

  const phoneInput = container.querySelector('#reg-phone');
  const codeRow = container.querySelector('#reg-code-row');
  const submitBtn = container.querySelector('#reg-submit');
  const sendBtn = container.querySelector('#reg-send-btn');
  const errorEl = container.querySelector('#reg-error');
  let step = 1;

  phoneInput.addEventListener('input', () => {
    if (phoneInput.value.length === 11) codeRow.classList.remove('hidden');
  });

  sendBtn.addEventListener('click', async () => {
    sendBtn.disabled = true;
    try {
      await api.sendCode(phoneInput.value);
      let t = 60;
      sendBtn.textContent = `${t}s后重发`;
      const iv = setInterval(() => {
        if (--t <= 0) { clearInterval(iv); sendBtn.textContent = '重新发送'; sendBtn.disabled = false; }
        else sendBtn.textContent = `${t}s后重发`;
      }, 1000);
    } catch (e) {
      errorEl.textContent = e.message; errorEl.classList.remove('hidden');
      sendBtn.disabled = false;
    }
  });

  submitBtn.addEventListener('click', async () => {
    errorEl.classList.add('hidden');
    if (step === 1 && phoneInput.value.length === 11) {
      step = 2; submitBtn.textContent = '完成注册';
    } else if (step === 2) {
      submitBtn.disabled = true;
      try {
        const { token } = await api.verify(phoneInput.value, container.querySelector('#reg-code').value);
        setToken(token);
        renderSpaceMain(container);
      } catch (e) {
        errorEl.textContent = e.message; errorEl.classList.remove('hidden');
        submitBtn.disabled = false;
      }
    }
  });

  container.querySelector('#reg-skip').addEventListener('click', () => {
    spaceState.isRegistered = true;
    renderSpaceMain(container);
  });
}

// ── Main Space Page ──
async function renderSpaceMain(container) {
  // Load real data if logged in, fall back to mock
  let profile = spaceState, nfts = spaceNFTs, divs = dividendHistory;
  if (isLoggedIn()) {
    try {
      [profile, nfts, divs] = await Promise.all([api.getProfile(), api.getNFTs(), api.getDividends()]);
      // normalize field names to match template expectations
      profile = {
        sworlBalance: profile.sworlBalance, ecnyBalance: profile.ecnyBalance,
        cfxBalance: profile.cfxBalance, dividendToday: divs[0]?.amount || 0,
        walletAddress: profile.walletAddress, userName: profile.userName,
        avatarColor: profile.avatarColor,
      };
    } catch { /* fall back to mock on error */ }
  }

  container.innerHTML = `
    <div class="sp-page">
      <!-- Top Bar -->
      <div class="sp-topbar">
        <button class="sp-avatar-btn" id="sp-avatar-btn">
          <div class="sp-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:18px;height:18px">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
          </div>
        </button>
        <div class="sp-network-pill">
          <div class="sp-net-dot"></div>
          <span>Conflux eSpace</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px"><polyline points="6,9 12,15 18,9"/></svg>
        </div>
        <button class="sp-notif-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
        </button>
      </div>

      <!-- Super Asset Card -->
      <div class="sp-card-wrap">
        <div class="sp-asset-card" id="sp-asset-card">
          <div class="sp-card-glass"></div>
          <div class="sp-card-inner">
            <div class="sp-card-header">
              <span class="sp-card-label">SWORL 余额</span>
              <button class="sp-more-assets-btn" id="sp-more-btn">更多资产</button>
            </div>
            <div class="sp-sworl-balance">${profile.sworlBalance.toLocaleString()}<span>SWORL</span></div>
            <div class="sp-card-divider"></div>
            <div class="sp-ecny-row">
              <div>
                <div class="sp-ecny-label">数字人民币</div>
                <div class="sp-ecny-balance">¥ ${profile.ecnyBalance.toLocaleString('zh-CN', {minimumFractionDigits:2})}</div>
              </div>
              <div class="sp-dividend-badge">
                <span class="sp-dividend-label">今日已分红</span>
                <span class="sp-dividend-val">+¥${(profile.dividendToday||0).toFixed(2)}</span>
              </div>
            </div>
            <!-- Expanded assets (hidden by default) -->
            <div class="sp-more-assets hidden" id="sp-more-assets">
              <div class="sp-card-divider"></div>
              <div class="sp-extra-asset">
                <span>CFX</span>
                <span>${(profile.cfxBalance||0).toLocaleString()} CFX</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Row -->
      <div class="sp-actions">
        <button class="sp-action" data-action="scan">
          <div class="sp-action-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <polyline points="4,7 4,4 7,4"/><polyline points="17,4 20,4 20,7"/>
              <polyline points="20,17 20,20 17,20"/><polyline points="7,20 4,20 4,17"/>
              <rect x="9" y="9" width="6" height="6" rx="1"/>
            </svg>
          </div>
          <span>扫码支付</span>
        </button>
        <button class="sp-action" data-action="receive">
          <div class="sp-action-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M17 17l-9-9M17 8v9H8"/>
            </svg>
          </div>
          <span>收款</span>
        </button>
        <button class="sp-action" data-action="transfer">
          <div class="sp-action-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <polyline points="17,1 21,5 17,9"/><path d="M3 11V9a4 4 0 014-4h14"/>
              <polyline points="7,23 3,19 7,15"/><path d="M21 13v2a4 4 0 01-4 4H3"/>
            </svg>
          </div>
          <span>划转</span>
        </button>
        <button class="sp-action" data-action="swap">
          <div class="sp-action-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>
            </svg>
          </div>
          <span>兑换</span>
        </button>
      </div>

      <!-- 3D NFT Gallery -->
      <div class="sp-gallery-section">
        <div class="sp-gallery-header">
          <span class="sp-gallery-title">数物陈列室</span>
          <button class="sp-gallery-all" id="sp-gallery-all">查看全部</button>
        </div>
        <div class="sp-gallery-track" id="sp-gallery-track">
          ${nfts.map((nft, i) => `
            <div class="sp-nft-card${i === 1 ? ' center' : ''}" data-id="${nft.id}" style="--nft-color:${nft.color}">
              <div class="sp-nft-face">
                <div class="sp-nft-glow" style="background:${nft.color}"></div>
                <div class="sp-nft-tier" style="color:${nft.color}">${nft.tier === 'genesis' ? '创世' : nft.tier === 'premium' ? '高阶' : '基础'}</div>
                <div class="sp-nft-name">${nft.name}</div>
                <div class="sp-nft-boost">分红加成 ${nft.dividendBoost}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Dividend History -->
      <div class="sp-dividend-section">
        <div class="sp-section-title">分红记录</div>
        ${divs.map(d => `
          <div class="sp-dividend-row">
            <div class="sp-div-date">${d.date}</div>
            <div class="sp-div-snap">${(d.sworlSnapshot/10000).toFixed(0)}万 SWORL</div>
            <div class="sp-div-amount">+¥${d.amount.toFixed(2)}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- NFT Fullscreen Overlay -->
    <div class="nft-fullscreen-overlay" id="nft-fullscreen-overlay">
      <button class="nft-fullscreen-close" id="nft-fullscreen-close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      <div class="nft-fullscreen-card" id="nft-fullscreen-card"></div>
    </div>
  `;

  // More assets toggle
  container.querySelector('#sp-more-btn').addEventListener('click', () => {
    const el = container.querySelector('#sp-more-assets');
    el.classList.toggle('hidden');
  });

  // Action buttons
  container.querySelector('.sp-actions').addEventListener('click', e => {
    const btn = e.target.closest('.sp-action');
    if (!btn) return;
    const action = btn.dataset.action;
    if (action === 'scan') window.dispatchEvent(new CustomEvent('openScan'));
    else if (action === 'receive') window.dispatchEvent(new CustomEvent('openReceive'));
    else if (action === 'transfer') window.dispatchEvent(new CustomEvent('openTransfer'));
    else if (action === 'swap') window.dispatchEvent(new CustomEvent('openSwapInfo'));
  });

  // Gallery swipe
  initGallerySwipe(container, nfts.length);

  // Profile
  container.querySelector('#sp-avatar-btn').addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('openProfile'));
  });

  // Gallery all
  container.querySelector('#sp-gallery-all').addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('openGallery'));
  });

  // NFT card fullscreen
  const fsOverlay = container.querySelector('#nft-fullscreen-overlay');
  const fsCard = container.querySelector('#nft-fullscreen-card');
  container.querySelector('#nft-fullscreen-close').addEventListener('click', () => {
    fsOverlay.classList.remove('active');
  });
  fsOverlay.addEventListener('click', e => {
    if (e.target === fsOverlay) fsOverlay.classList.remove('active');
  });
  container.querySelector('#sp-gallery-track').addEventListener('click', e => {
    const card = e.target.closest('.sp-nft-card');
    if (!card) return;
    const nft = nfts.find(n => n.id === +card.dataset.id);
    if (!nft) return;
    const tierLabel = nft.tier === 'genesis' ? '创世' : nft.tier === 'premium' ? '高阶' : '基础';
    fsCard.innerHTML = `
      <div class="nft-fullscreen-glow" style="--nft-color:${nft.color}; background:${nft.color}">✦</div>
      <div class="nft-fullscreen-tier">${tierLabel}</div>
      <div class="nft-fullscreen-name">${nft.name}</div>
      <div class="nft-fullscreen-boost">分红加成 ${nft.dividendBoost}</div>
      <div class="nft-fullscreen-divider"></div>
      <div class="nft-fullscreen-meta">
        <div class="nft-fullscreen-meta-item">
          <div class="nft-fullscreen-meta-label">等级</div>
          <div class="nft-fullscreen-meta-val">${tierLabel}</div>
        </div>
        <div class="nft-fullscreen-meta-item">
          <div class="nft-fullscreen-meta-label">分红加成</div>
          <div class="nft-fullscreen-meta-val">${nft.dividendBoost}</div>
        </div>
      </div>
    `;
    fsOverlay.classList.add('active');
  });
}

function initGallerySwipe(container, nftCount) {
  const track = container.querySelector('#sp-gallery-track');
  let startX = 0, currentIndex = 1;

  track.addEventListener('pointerdown', e => { startX = e.clientX; });
  track.addEventListener('pointerup', e => {
    const dx = e.clientX - startX;
    if (Math.abs(dx) < 30) return;
    if (dx < 0 && currentIndex < nftCount - 1) currentIndex++;
    else if (dx > 0 && currentIndex > 0) currentIndex--;
    updateGallery(track, currentIndex);
  });
}

function updateGallery(track, activeIndex) {
  track.querySelectorAll('.sp-nft-card').forEach((card, i) => {
    card.classList.toggle('center', i === activeIndex);
    card.classList.toggle('left', i < activeIndex);
    card.classList.toggle('right', i > activeIndex);
  });
}

export function renderSpace(container) {
  if (isLoggedIn()) {
    renderSpaceMain(container);
  } else {
    renderRegister(container);
  }
}
