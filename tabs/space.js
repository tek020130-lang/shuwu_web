import { spaceState, spaceNFTs, dividendHistory } from '../data/mock.js';
import { api, setToken, isLoggedIn } from '../api/client.js';

// 精美简笔画人物图标
const AVATAR_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" style="width:20px;height:20px">
  <circle cx="12" cy="7" r="3.5"/>
  <path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6"/>
  <path d="M9 6.5c.5-.8 1.5-1.5 3-1.5s2.5.7 3 1.5"/>
</svg>`;

// SWORL 图标
function sworlIcon() {
  return `<svg viewBox="0 0 24 24" fill="none" style="width:22px;height:22px"><circle cx="12" cy="12" r="10" fill="url(#sg-sp)"/><path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" stroke="white" stroke-width="2" stroke-linecap="round"/><defs><linearGradient id="sg-sp" x1="0" y1="0" x2="24" y2="24"><stop stop-color="#8B5CF6"/><stop offset="1" stop-color="#A78BFA"/></linearGradient></defs></svg>`;
}

// ── 注册页面 ──
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
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:14px;height:14px;flex-shrink:0"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>
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

// ── 主页面 ──
async function renderSpaceMain(container) {
  let profile = spaceState, nfts = spaceNFTs, divs = dividendHistory;
  if (isLoggedIn()) {
    try {
      [profile, nfts, divs] = await Promise.all([api.getProfile(), api.getNFTs(), api.getDividends()]);
      profile = {
        sworlBalance: profile.sworlBalance, ecnyBalance: profile.ecnyBalance,
        cfxBalance: profile.cfxBalance, dividendToday: divs[0]?.amount || 0,
        walletAddress: profile.walletAddress, userName: profile.userName,
      };
    } catch { /* fallback to mock */ }
  }

  const walletShort = (profile.walletAddress || '0xfb75...de7a').slice(0, 6) + '...' + (profile.walletAddress || '0xfb75...de7a').slice(-4);

  container.innerHTML = `
    <div class="sp-page">
      <!-- 顶部导航 -->
      <div class="sp-topbar">
        <button class="sp-avatar-btn" id="sp-avatar-btn">
          <div class="sp-avatar">${AVATAR_ICON}</div>
        </button>
        <div class="sp-network-pill">
          <div class="sp-net-dot"></div>
          <span>Conflux eSpace</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px"><polyline points="6,9 12,15 18,9"/></svg>
        </div>
        <button class="sp-notif-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
        </button>
      </div>

      <!-- 资产卡 -->
      <div class="sp-asset-card-new">
        <div class="sp-asset-deco-1"></div>
        <div class="sp-asset-deco-2"></div>
        <div class="sp-asset-inner">
          <div class="sp-asset-top">
            <div class="sp-network-btn">
              <span>◎</span>
              <span>SWORL Chain</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px"><polyline points="6,9 12,15 18,9"/></svg>
            </div>
            <button class="sp-more-assets-btn-new" id="sp-more-btn">
              更多资产
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
          <div class="sp-wallet-row">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:15px;height:15px;color:rgba(255,255,255,0.5)"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z"/></svg>
            <span class="sp-wallet-addr">${walletShort}</span>
            <button class="sp-wallet-copy" id="sp-copy-addr">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:14px;height:14px;color:rgba(255,255,255,0.5)"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            </button>
          </div>
          <!-- SWORL -->
          <div class="sp-asset-token-row">
            <div class="sp-token-left">
              <div class="sp-token-icon sworl">${sworlIcon()}</div>
              <div>
                <div class="sp-token-name">SWORL</div>
              </div>
            </div>
            <div class="sp-token-right">
              <div class="sp-token-balance">${profile.sworlBalance.toLocaleString()}</div>
              <div class="sp-token-value">≈ ¥${(profile.sworlBalance * 2).toLocaleString()}</div>
            </div>
          </div>
          <div class="sp-asset-divider"></div>
          <!-- e-CNY -->
          <div class="sp-asset-token-row">
            <div class="sp-token-left">
              <div class="sp-token-icon ecny">
                <svg viewBox="0 0 24 24" fill="none" style="width:22px;height:22px"><circle cx="12" cy="12" r="10" fill="url(#dcep-sp)"/><text x="12" y="16" text-anchor="middle" fill="white" font-size="10" font-weight="bold">¥</text><defs><linearGradient id="dcep-sp" x1="0" y1="0" x2="24" y2="24"><stop stop-color="#DC2626"/><stop offset="1" stop-color="#EF4444"/></linearGradient></defs></svg>
              </div>
              <div>
                <div class="sp-token-name">数字人民币</div>
              </div>
            </div>
            <div class="sp-token-right">
              <div class="sp-token-balance">¥${profile.ecnyBalance.toLocaleString('zh-CN', {minimumFractionDigits:2})}</div>
              <div class="sp-token-value">今日分红 +¥${(profile.dividendToday||0).toFixed(2)}</div>
            </div>
          </div>
          <!-- 更多资产 -->
          <div class="sp-more-assets hidden" id="sp-more-assets">
            <div class="sp-asset-divider"></div>
            <div class="sp-extra-asset">
              <span>CFX</span>
              <span>${(profile.cfxBalance||0).toLocaleString()} CFX</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 快捷操作 -->
      <div class="sp-actions-new">
        <button class="sp-action-new" data-action="scan">
          <div class="sp-action-icon-new" style="background:linear-gradient(135deg,#8B5CF6,#A78BFA);box-shadow:0 4px 16px rgba(139,92,246,0.35)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:22px;height:22px;color:#fff"><polyline points="4,7 4,4 7,4"/><polyline points="17,4 20,4 20,7"/><polyline points="20,17 20,20 17,20"/><polyline points="7,20 4,20 4,17"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>
          </div>
          <span class="sp-action-label">扫码支付</span>
        </button>
        <button class="sp-action-new" data-action="receive">
          <div class="sp-action-icon-new" style="background:linear-gradient(135deg,#10B981,#34D399);box-shadow:0 4px 16px rgba(16,185,129,0.35)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:22px;height:22px;color:#fff"><path d="M17 17l-9-9M17 8v9H8"/></svg>
          </div>
          <span class="sp-action-label">收款</span>
        </button>
        <button class="sp-action-new" data-action="transfer">
          <div class="sp-action-icon-new" style="background:linear-gradient(135deg,#3B82F6,#60A5FA);box-shadow:0 4px 16px rgba(59,130,246,0.35)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:22px;height:22px;color:#fff"><polyline points="17,1 21,5 17,9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7,23 3,19 7,15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
          </div>
          <span class="sp-action-label">划转</span>
        </button>
        <button class="sp-action-new" data-action="swap">
          <div class="sp-action-icon-new" style="background:linear-gradient(135deg,#F59E0B,#FCD34D);box-shadow:0 4px 16px rgba(245,158,11,0.35)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:22px;height:22px;color:#fff"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>
          </div>
          <span class="sp-action-label">兑换</span>
        </button>
      </div>

      <!-- 数藏空间入口 -->
      <div class="sp-nft-entry glass-gold" id="sp-nft-entry">
        <div class="sp-nft-entry-inner">
          <div class="sp-nft-entry-left">
            <div class="sp-nft-entry-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:24px;height:24px;color:#fff"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 15l4-4a2 2 0 012.8 0L15 16"/><path d="M14 14l1-1a2 2 0 012.8 0L21 16"/><circle cx="16" cy="8" r="1.5"/></svg>
            </div>
            <div>
              <div class="sp-nft-entry-title">数藏空间</div>
              <div class="sp-nft-entry-sub">查看我的数字藏品</div>
            </div>
          </div>
          <div class="sp-nft-entry-right">
            <span class="sp-nft-count-badge">${nfts.length} 件藏品</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="sp-nft-entry-arrow"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>
      </div>

      <!-- 功能菜单 -->
      <div class="sp-menu-list glass-card">
        ${[
          { id:'nft', name:'数藏空间', desc:'查看我的NFT藏品', badge:'12', icon:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 15l4-4a2 2 0 012.8 0L15 16"/><circle cx="16" cy="8" r="1.5"/>' },
          { id:'swap', name:'兑换', desc:'代币兑换服务', icon:'<path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>' },
          { id:'security', name:'安全中心', desc:'账户安全设置', icon:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' },
          { id:'settings', name:'设置', desc:'应用设置', icon:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>' },
          { id:'help', name:'帮助', desc:'常见问题', icon:'<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>' },
        ].map((item, idx, arr) => `
          <button class="sp-menu-item" data-menu="${item.id}" style="${idx < arr.length-1 ? 'border-bottom:1px solid rgba(0,0,0,0.05)' : ''}">
            <div class="sp-menu-item-left">
              <div class="sp-menu-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:18px;height:18px">${item.icon}</svg>
              </div>
              <div>
                <div class="sp-menu-name">${item.name}</div>
                <div class="sp-menu-desc">${item.desc}</div>
              </div>
            </div>
            <div class="sp-menu-right">
              ${item.badge ? `<span class="sp-menu-badge">${item.badge}</span>` : ''}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="sp-menu-arrow"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          </button>
        `).join('')}
      </div>

      <!-- 分红记录 -->
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

    <!-- 数藏空间弹窗 -->
    <div class="sp-nft-modal hidden" id="sp-nft-modal">
      <div class="sp-nft-modal-backdrop" id="sp-nft-modal-backdrop"></div>
      <div class="sp-nft-modal-sheet">
        <div class="sp-nft-modal-handle"></div>
        <div class="sp-nft-modal-title">数藏空间</div>
        <div class="sp-nft-modal-sub">共 ${nfts.length} 件数字藏品</div>
        <div class="sp-nft-modal-grid">
          ${nfts.map(nft => `
            <div class="sp-nft-modal-card glass-card" data-nft-id="${nft.id}">
              <div class="sp-nft-modal-img">
                <div style="width:100%;aspect-ratio:1/1;background:linear-gradient(145deg,${nft.color}33,${nft.color}11);display:flex;align-items:center;justify-content:center">
                  <div style="font-size:32px;color:${nft.color}">✦</div>
                </div>
              </div>
              <div class="sp-nft-modal-info">
                <div class="sp-nft-modal-name">${nft.name}</div>
                <div class="sp-nft-modal-collection">${nft.tier === 'genesis' ? '创世' : nft.tier === 'premium' ? '高阶' : '基础'}</div>
                <div class="sp-nft-modal-price">
                  <svg viewBox="0 0 24 24" fill="none" style="width:14px;height:14px"><circle cx="12" cy="12" r="10" fill="url(#sg-nft${nft.id})"/><path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" stroke="white" stroke-width="2" stroke-linecap="round"/><defs><linearGradient id="sg-nft${nft.id}" x1="0" y1="0" x2="24" y2="24"><stop stop-color="#8B5CF6"/><stop offset="1" stop-color="#A78BFA"/></linearGradient></defs></svg>
                  分红加成 ${nft.dividendBoost}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- NFT 全屏详情 -->
    <div class="nft-fullscreen-overlay" id="nft-fullscreen-overlay">
      <button class="nft-fullscreen-close" id="nft-fullscreen-close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="nft-fullscreen-card" id="nft-fullscreen-card"></div>
    </div>
  `;

  // 更多资产
  container.querySelector('#sp-more-btn').addEventListener('click', () => {
    container.querySelector('#sp-more-assets').classList.toggle('hidden');
  });

  // 复制地址
  container.querySelector('#sp-copy-addr').addEventListener('click', () => {
    navigator.clipboard.writeText(profile.walletAddress || '0xfb75...de7a').catch(() => {});
  });

  // 快捷操作
  container.querySelector('.sp-actions-new').addEventListener('click', e => {
    const btn = e.target.closest('.sp-action-new');
    if (!btn) return;
    const action = btn.dataset.action;
    if (action === 'scan') window.dispatchEvent(new CustomEvent('openScan'));
    else if (action === 'receive') window.dispatchEvent(new CustomEvent('openReceive'));
    else if (action === 'transfer') window.dispatchEvent(new CustomEvent('openTransfer'));
    else if (action === 'swap') window.dispatchEvent(new CustomEvent('openSwapInfo'));
  });

  // 数藏入口
  const nftModal = container.querySelector('#sp-nft-modal');
  const openNFTModal = () => nftModal.classList.remove('hidden');
  const closeNFTModal = () => nftModal.classList.add('hidden');
  container.querySelector('#sp-nft-entry').addEventListener('click', openNFTModal);
  container.querySelector('#sp-nft-modal-backdrop').addEventListener('click', closeNFTModal);

  // 菜单点击
  container.querySelector('.sp-menu-list').addEventListener('click', e => {
    const btn = e.target.closest('.sp-menu-item');
    if (!btn) return;
    if (btn.dataset.menu === 'nft') openNFTModal();
  });

  // NFT 卡片全屏
  const fsOverlay = container.querySelector('#nft-fullscreen-overlay');
  const fsCard = container.querySelector('#nft-fullscreen-card');
  container.querySelector('#nft-fullscreen-close').addEventListener('click', () => fsOverlay.classList.remove('active'));
  fsOverlay.addEventListener('click', e => { if (e.target === fsOverlay) fsOverlay.classList.remove('active'); });
  container.querySelector('#sp-nft-modal').addEventListener('click', e => {
    const card = e.target.closest('.sp-nft-modal-card');
    if (!card) return;
    const nft = nfts.find(n => n.id === +card.dataset.nftId);
    if (!nft) return;
    const tierLabel = nft.tier === 'genesis' ? '创世' : nft.tier === 'premium' ? '高阶' : '基础';
    fsCard.innerHTML = `
      <div class="nft-fullscreen-glow" style="--nft-color:${nft.color};background:${nft.color}">✦</div>
      <div class="nft-fullscreen-tier">${tierLabel}</div>
      <div class="nft-fullscreen-name">${nft.name}</div>
      <div class="nft-fullscreen-boost">分红加成 ${nft.dividendBoost}</div>
      <div class="nft-fullscreen-divider"></div>
      <div class="nft-fullscreen-meta">
        <div class="nft-fullscreen-meta-item"><div class="nft-fullscreen-meta-label">等级</div><div class="nft-fullscreen-meta-val">${tierLabel}</div></div>
        <div class="nft-fullscreen-meta-item"><div class="nft-fullscreen-meta-label">分红加成</div><div class="nft-fullscreen-meta-val">${nft.dividendBoost}</div></div>
      </div>
    `;
    closeNFTModal();
    fsOverlay.classList.add('active');
  });

  // 个人中心
  container.querySelector('#sp-avatar-btn').addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('openProfile'));
  });
}

export function renderSpace(container) {
  if (isLoggedIn()) {
    renderSpaceMain(container);
  } else {
    renderRegister(container);
  }
}
