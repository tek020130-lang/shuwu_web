(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:1,name:`数物旗舰店`,desc:`官方直营 · 限定发售`,category:`旗舰店`,image:`https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&q=80`,goldTier:!0,sworlSupport:!0,rating:4.9},{id:2,name:`NEON潮玩`,desc:`潮流手办 · 盲盒`,category:`潮玩周边`,image:`https://images.unsplash.com/photo-1608501078713-8e445a709b39?w=400&q=80`,goldTier:!0,sworlSupport:!0,rating:4.8},{id:3,name:`星际KTV`,desc:`沉浸式娱乐体验`,category:`娱乐场所`,image:`https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80`,goldTier:!1,sworlSupport:!0,rating:4.7},{id:4,name:`云端餐厅`,desc:`米其林推荐 · 区块链溯源`,category:`餐饮消费`,image:`https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80`,goldTier:!1,sworlSupport:!0,rating:4.6},{id:5,name:`数物限定馆`,desc:`限量 · 仅限持币用户`,category:`数物限定`,image:`https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80`,goldTier:!0,sworlSupport:!0,rating:5},{id:6,name:`VOID电竞馆`,desc:`专业赛事 · 代币积分`,category:`娱乐场所`,image:`https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80`,goldTier:!1,sworlSupport:!0,rating:4.5},{id:7,name:`幻境密室`,desc:`沉浸剧本 · NFT道具`,category:`娱乐场所`,image:`https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&q=80`,goldTier:!1,sworlSupport:!0,rating:4.7},{id:8,name:`潮流集合店`,desc:`联名款 · 限时折扣`,category:`潮玩周边`,image:`https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80`,goldTier:!1,sworlSupport:!1,rating:4.4}],t=[{id:`all`,name:`全部`,icon:`grid`},{id:`旗舰店`,name:`旗舰店`,icon:`star`},{id:`潮玩周边`,name:`潮玩周边`,icon:`cube`},{id:`娱乐场所`,name:`娱乐场所`,icon:`music`},{id:`餐饮消费`,name:`餐饮消费`,icon:`food`},{id:`数物限定`,name:`数物限定`,icon:`diamond`}],n=[{id:1,tier:`genesis`,name:`创世徽章`,color:`#C9A84C`}],r={sworlToCny:.85,cnyToSworl:1.18},i={city:`上海`,sworlBalance:2480},a=[`数物生态`,`SWORL行情`,`NFT`,`娱乐场所`,`限定活动`],o=[`数物先行者 刚刚通过扫码获得了 50 SWORL 分红`,`旗舰店新周边「创世系列 Vol.3」已上链`,`SWORL 持有人数突破 10,000`,`幻境密室 本周新增 NFT 道具 3 件`,`今日分红池已注入 12,800 e-CNY`,`NEON潮玩 限定盲盒 48 小时内售罄`],s=[{id:1,userId:`u1`,userName:`数物先行者`,nftTier:`genesis`,avatarColor:`#1A1A1A`,verified:!0,content:`刚刚在旗舰店消费了 500 SWORL，体验非常丝滑，混合支付的设计真的很超前。这才是 Web3 应该有的样子，不是那种强迫你用钱包的感觉，而是自然融入日常消费。`,topic:`数物生态`,value:38.5,comments:12,reposts:6,time:`2分钟前`,liked:!1},{id:2,userId:`u2`,userName:`CryptoNomad`,nftTier:`premium`,avatarColor:`#5856D6`,verified:!1,content:`SWORL 今天又涨了，持仓收益不错。更重要的是分红机制真的在跑，上周收到了 120 e-CNY，完全来自平台消费分成。`,topic:`SWORL行情`,value:22,comments:8,reposts:3,time:`15分钟前`,liked:!1},{id:3,userId:`u3`,userName:`NFT_Collector`,nftTier:`basic`,avatarColor:`#FF6B35`,verified:!1,content:`创世 NFT 的支付滑块真的太好看了，那个珠光金色球体每次滑动都有一种仪式感。细节做到这个程度，团队是认真的。`,topic:`NFT`,value:15.5,comments:5,reposts:2,time:`32分钟前`,liked:!1},{id:4,userId:`u4`,userName:`夜行者_Shanghai`,nftTier:`none`,avatarColor:`#34C759`,verified:!1,content:`昨晚去了星际KTV，用 SWORL 支付，还额外获赠了代币。这种消费即挖矿的模式比传统积分好太多了，积分过期没用，代币永远是你的。`,topic:`娱乐场所`,value:9,comments:3,reposts:1,time:`1小时前`,liked:!1},{id:5,userId:`u5`,userName:`BlockchainBro`,nftTier:`genesis`,avatarColor:`#FF9500`,verified:!0,content:`数物限定馆的新品刚上，只有持币用户才能看到，这种信息差设计很聪明。普通用户看到的是空页面，持币用户看到的是专属内容。`,topic:`限定活动`,value:44,comments:18,reposts:9,time:`2小时前`,liked:!1},{id:6,userId:`u6`,userName:`DeFi_Daily`,nftTier:`premium`,avatarColor:`#007AFF`,verified:!1,content:`付费发帖机制是个好设计。0.5 SWORL 的门槛不高，但足以过滤掉大量垃圾信息。广场的内容质量明显比其他平台高。`,topic:`数物生态`,value:31.5,comments:14,reposts:7,time:`3小时前`,liked:!1},{id:7,userId:`u7`,userName:`潮玩收藏家`,nftTier:`basic`,avatarColor:`#AF52DE`,verified:!1,content:`NEON潮玩的新盲盒系列和 NFT 联动了，买实体盲盒可以解锁对应的数字藏品。这个玩法很有意思，实体和数字资产双向绑定。`,topic:`NFT`,value:18,comments:7,reposts:4,time:`5小时前`,liked:!1}],c={isRegistered:!1,sworlBalance:8888230,ecnyBalance:25600.5,cfxBalance:1240.8,dividendToday:128.5,walletAddress:`0xfb75...de7a`,userName:`数物先行者`,avatarColor:`#1A1A1A`},l=[{id:1,name:`创世勋章 #001`,tier:`genesis`,color:`#C9A84C`,dividendBoost:`1.5x`,image:null},{id:2,name:`数物先锋 #088`,tier:`premium`,color:`#A3E635`,dividendBoost:`1.2x`,image:null},{id:3,name:`潮玩联名 #012`,tier:`basic`,color:`#8E8E93`,dividendBoost:`1.0x`,image:null}],u=[{date:`今日`,amount:128.5,sworlSnapshot:8888230},{date:`昨日`,amount:115.2,sworlSnapshot:8888230},{date:`3天前`,amount:98.8,sworlSnapshot:85e5},{date:`4天前`,amount:142.3,sworlSnapshot:85e5},{date:`5天前`,amount:88.6,sworlSnapshot:82e5}],d=[`旗舰周边`,`艺术家联名`,`创始系列`,`数字藏品`],f=[{id:1,name:`创世勋章 Vol.1`,series:`创始系列`,type:`nft`,price:888,image:`https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80`,limited:!0,creator:`数物官方`,royalty:5,chainHash:`0x3f8a...c12e`,collection:`创始系列`,date:`3月`},{id:2,name:`数物帆布包 · 创世版`,series:`旗舰周边`,type:`phygital`,price:320,image:`https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80`,limited:!0,creator:`数物官方`,royalty:5,chainHash:`0x7b2d...f44a`,collection:`旗舰周边`,date:`3月`},{id:3,name:`NEON × 数物联名帽`,series:`艺术家联名`,type:`phygital`,price:480,image:`https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80`,limited:!1,creator:`NEON Studio`,royalty:8,chainHash:`0x9c1f...b83d`,collection:`艺术家联名`,date:`3月`},{id:4,name:`数字先锋 #088`,series:`数字藏品`,type:`nft`,price:1200,image:`https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=600&q=80`,limited:!0,creator:`CryptoNomad`,royalty:8,chainHash:`0x2e5c...a91b`,collection:`数字藏品`,date:`2月`},{id:5,name:`创世马克杯`,series:`旗舰周边`,type:`phygital`,price:180,image:`https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80`,limited:!1,creator:`数物官方`,royalty:5,chainHash:`0x6d4e...c77f`,collection:`旗舰周边`,date:`2月`},{id:6,name:`幻境系列 NFT #012`,series:`艺术家联名`,type:`nft`,price:560,image:`https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&q=80`,limited:!1,creator:`幻境工作室`,royalty:8,chainHash:`0x1a8b...d55c`,collection:`艺术家联名`,date:`2月`},{id:7,name:`数物 T-Shirt · 黑标`,series:`旗舰周边`,type:`phygital`,price:260,image:`https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80`,limited:!1,creator:`数物官方`,royalty:5,chainHash:`0x4f2a...e88d`,collection:`旗舰周边`,date:`1月`},{id:8,name:`创世徽章 · 链上版`,series:`创始系列`,type:`nft`,price:2400,image:`https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=600&q=80`,limited:!0,creator:`数物官方`,royalty:5,chainHash:`0x8e3d...f12a`,collection:`创始系列`,date:`1月`}],p=[f[0],f[3],f[2]],m=`https://shuwuapi-production.up.railway.app`;function h(){return localStorage.getItem(`sw_token`)}function g(e){localStorage.setItem(`sw_token`,e)}function _(){return!!h()}async function v(e,t={}){let n=h(),r=await fetch(m+e,{...t,headers:{"Content-Type":`application/json`,...n?{Authorization:`Bearer `+n}:{},...t.headers}}),i=await r.json();if(!r.ok)throw Error(i.error||`请求失败`);return i}var y={sendCode:e=>v(`/api/auth/send-code`,{method:`POST`,body:JSON.stringify({phone:e})}),verify:(e,t)=>v(`/api/auth/verify`,{method:`POST`,body:JSON.stringify({phone:e,code:t})}),getProfile:()=>v(`/api/user/profile`),getNFTs:()=>v(`/api/user/nfts`),getDividends:()=>v(`/api/user/dividends`),getProducts:(e={})=>v(`/api/mall/products?`+new URLSearchParams(e)),getProduct:e=>v(`/api/mall/products/${e}`),getCollections:()=>v(`/api/mall/collections`),getDrops:()=>v(`/api/mall/drops`),purchase:e=>v(`/api/mall/purchase`,{method:`POST`,body:JSON.stringify({productId:e})}),getMerchants:(e={})=>v(`/api/merchants?`+new URLSearchParams(e)),getPosts:()=>v(`/api/posts`),createPost:(e,t)=>v(`/api/posts`,{method:`POST`,body:JSON.stringify({content:e,topic:t})}),likePost:e=>v(`/api/posts/${e}/like`,{method:`POST`})},b={all:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,旗舰店:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>`,潮玩周边:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>`,娱乐场所:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,餐饮消费:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,数物限定:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22,8.5 12,15.5 2,8.5"/></svg>`},x=`all`;function S(){return`
    <div class="life-header">
      <div class="header-top">
        <div class="city-label" id="city-label">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          ${i.city}
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
        ${t.map(e=>`
          <div class="cat-item${e.id===x?` active`:``}" data-cat="${e.id}">
            <div class="cat-icon">${b[e.id]||b.all}</div>
            <span>${e.name}</span>
          </div>
        `).join(``)}
      </div>
    </div>
  `}function C(e){return`
    <div class="merchant-feed" id="merchant-feed">
      ${e.map(e=>`
        <div class="merchant-card${e.goldTier?` gold-tier`:``}" data-id="${e.id}">
          <div class="card-img">
            <img src="${e.image}" alt="${e.name}" loading="lazy" />
          </div>
          <div class="card-body">
            <div class="card-name">${e.name}</div>
            <div class="card-desc">${e.desc}</div>
            <div class="card-rating">评分 <b>${e.rating}</b></div>
          </div>
          ${e.sworlSupport?`<div class="sworl-badge">S</div>`:``}
        </div>
      `).join(``)}
    </div>
  `}async function w(t){let n=e;try{n=await y.getMerchants()}catch{}t.innerHTML=S()+C(n),t.querySelector(`#search-bar-trigger`).addEventListener(`click`,()=>{window.dispatchEvent(new CustomEvent(`openSearch`))}),t.querySelector(`#map-btn`).addEventListener(`click`,()=>{window.dispatchEvent(new CustomEvent(`openMap`))}),t.addEventListener(`click`,async r=>{let i=r.target.closest(`.cat-item`);if(i){x=i.dataset.cat,t.querySelectorAll(`.cat-item`).forEach(e=>{e.classList.toggle(`active`,e.dataset.cat===x)});let n=x===`all`?{}:{category:x},r=e.filter(e=>x===`all`||e.category===x);try{r=await y.getMerchants(n)}catch{}let a=t.querySelector(`#merchant-feed`),o=document.createElement(`div`);o.innerHTML=C(r),a.replaceWith(o.firstElementChild)}let a=r.target.closest(`.merchant-card`);if(a){let t=parseInt(a.dataset.id),r=n.find(e=>e.id===t)||e.find(e=>e.id===t);r&&window.dispatchEvent(new CustomEvent(`openPayment`,{detail:r}))}})}var ee={genesis:`#C9A84C`,premium:`#A3E635`,basic:`#8E8E93`,none:`transparent`},te=[`关注`,`热门`,`快讯`,`社区`],ne=.5,T=s.map(e=>({...e})),E=`热门`,D=T.length+1;function O(e){return e.charAt(0).toUpperCase()}function k(){let e=o.join(`　·　`);return`
    <div class="sq-ticker">
      <div class="sq-ticker-inner">
        <span>${e}　·　${e}</span>
      </div>
    </div>
  `}function A(e){let t=ee[e.nftTier]||`transparent`,n=e.nftTier!==`none`;return`
    <div class="sq-post" data-id="${e.id}">
      <div class="sq-post-left">
        ${n?`<div class="sq-nft-line" style="background:${t}"></div>`:`<div class="sq-nft-line transparent"></div>`}
        <div class="sq-avatar" style="background:${e.avatarColor}">${O(e.userName)}</div>
      </div>
      <div class="sq-post-body">
        <div class="sq-post-header">
          <span class="sq-username">${e.userName}</span>
          ${e.verified?`<span class="sq-verified">✦</span>`:``}
          <span class="sq-time">${e.time}</span>
        </div>
        <div class="sq-content">${e.content}</div>
        <div class="sq-post-footer">
          <span class="sq-topic">#${e.topic}</span>
          <div class="sq-actions">
            <button class="sq-like-btn${e.liked?` liked`:``}" data-id="${e.id}">
              <svg viewBox="0 0 24 24" fill="${e.liked?`#C9A84C`:`none`}" stroke="${e.liked?`#C9A84C`:`currentColor`}" stroke-width="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
              <span class="sq-value">${e.value.toFixed(1)} S</span>
            </button>
            <button class="sq-action-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
              <span>${e.comments}</span>
            </button>
            <button class="sq-action-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <polyline points="17,1 21,5 17,9"/><path d="M3 11V9a4 4 0 014-4h14"/>
                <polyline points="7,23 3,19 7,15"/><path d="M21 13v2a4 4 0 01-4 4H3"/>
              </svg>
              <span>${e.reposts}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `}function j(e){let t=e.querySelector(`#sq-feed`),n=E===`快讯`?[]:T,r=``;n.forEach((e,t)=>{t>0&&t%4==0&&(r+=k()),r+=A(e)}),E===`快讯`&&(r=`<div class="sq-ticker-page">${o.map(e=>`<div class="sq-ticker-item">${e}</div>`).join(``)}</div>`),t.innerHTML=r}function M(e){e.innerHTML=`
    <div class="sq-header">
      <div class="sq-title">广场</div>
      <div class="sq-tabs" id="sq-tabs">
        ${te.map(e=>`<button class="sq-tab${e===E?` active`:``}" data-tab="${e}">${e}</button>`).join(``)}
        <div class="sq-tab-line" id="sq-tab-line"></div>
      </div>
    </div>
    <div id="sq-feed" class="sq-feed"></div>
    <button class="sq-compose-btn" id="sq-compose-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    </button>
  `,j(e),re(e),e.querySelector(`#sq-tabs`).addEventListener(`click`,t=>{let n=t.target.closest(`.sq-tab`);n&&(E=n.dataset.tab,e.querySelectorAll(`.sq-tab`).forEach(e=>e.classList.toggle(`active`,e.dataset.tab===E)),N(e),j(e))}),e.addEventListener(`click`,e=>{let t=e.target.closest(`.sq-like-btn`);if(t){let e=parseInt(t.dataset.id),n=T.find(t=>t.id===e);if(!n)return;n.liked=!n.liked,n.value=n.liked?+(n.value+.5).toFixed(1):+(n.value-.5).toFixed(1),t.classList.toggle(`liked`,n.liked),t.querySelector(`svg`).setAttribute(`fill`,n.liked?`#C9A84C`:`none`),t.querySelector(`svg`).setAttribute(`stroke`,n.liked?`#C9A84C`:`currentColor`),t.querySelector(`.sq-value`).textContent=n.value.toFixed(1)+` S`,t.style.transform=`scale(1.3)`,setTimeout(()=>t.style.transform=``,200)}}),e.querySelector(`#sq-compose-btn`).addEventListener(`click`,()=>{window.dispatchEvent(new CustomEvent(`openCompose`))})}function re(e){requestAnimationFrame(()=>N(e))}function N(e){let t=e.querySelector(`.sq-tab.active`),n=e.querySelector(`#sq-tab-line`);if(!t||!n)return;let r=e.querySelector(`#sq-tabs`).getBoundingClientRect(),i=t.getBoundingClientRect();n.style.left=i.left-r.left+i.width/2-12+`px`,n.style.width=`24px`}function P(e,t){let n={id:++D,userId:`me`,userName:`我`,nftTier:`genesis`,avatarColor:`#1A1A1A`,verified:!0,content:e,topic:t,value:0,comments:0,reposts:0,time:`刚刚`,liked:!1};return T.unshift(n),i.sworlBalance=+(i.sworlBalance-ne).toFixed(1),n}function F(e){e.innerHTML=`
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
  `;let t=e.querySelector(`#reg-phone`),n=e.querySelector(`#reg-code-row`),r=e.querySelector(`#reg-submit`),i=e.querySelector(`#reg-send-btn`),a=e.querySelector(`#reg-error`),o=1;t.addEventListener(`input`,()=>{t.value.length===11&&n.classList.remove(`hidden`)}),i.addEventListener(`click`,async()=>{i.disabled=!0;try{await y.sendCode(t.value);let e=60;i.textContent=`${e}s后重发`;let n=setInterval(()=>{--e<=0?(clearInterval(n),i.textContent=`重新发送`,i.disabled=!1):i.textContent=`${e}s后重发`},1e3)}catch(e){a.textContent=e.message,a.classList.remove(`hidden`),i.disabled=!1}}),r.addEventListener(`click`,async()=>{if(a.classList.add(`hidden`),o===1&&t.value.length===11)o=2,r.textContent=`完成注册`;else if(o===2){r.disabled=!0;try{let{token:n}=await y.verify(t.value,e.querySelector(`#reg-code`).value);g(n),I(e)}catch(e){a.textContent=e.message,a.classList.remove(`hidden`),r.disabled=!1}}}),e.querySelector(`#reg-skip`).addEventListener(`click`,()=>{c.isRegistered=!0,I(e)})}async function I(e){let t=c,n=l,r=u;if(_())try{[t,n,r]=await Promise.all([y.getProfile(),y.getNFTs(),y.getDividends()]),t={sworlBalance:t.sworlBalance,ecnyBalance:t.ecnyBalance,cfxBalance:t.cfxBalance,dividendToday:r[0]?.amount||0,walletAddress:t.walletAddress,userName:t.userName,avatarColor:t.avatarColor}}catch{}e.innerHTML=`
    <div class="sp-page">
      <!-- Top Bar -->
      <div class="sp-topbar">
        <button class="sp-avatar-btn" id="sp-avatar-btn">
          <div class="sp-avatar" style="background:${t.avatarColor}">${t.userName.charAt(0)}</div>
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
            <div class="sp-sworl-balance">${t.sworlBalance.toLocaleString()}<span>SWORL</span></div>
            <div class="sp-card-divider"></div>
            <div class="sp-ecny-row">
              <div>
                <div class="sp-ecny-label">数字人民币</div>
                <div class="sp-ecny-balance">¥ ${t.ecnyBalance.toLocaleString(`zh-CN`,{minimumFractionDigits:2})}</div>
              </div>
              <div class="sp-dividend-badge">
                <span class="sp-dividend-label">今日已分红</span>
                <span class="sp-dividend-val">+¥${(t.dividendToday||0).toFixed(2)}</span>
              </div>
            </div>
            <!-- Expanded assets (hidden by default) -->
            <div class="sp-more-assets hidden" id="sp-more-assets">
              <div class="sp-card-divider"></div>
              <div class="sp-extra-asset">
                <span>CFX</span>
                <span>${(t.cfxBalance||0).toLocaleString()} CFX</span>
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
          ${n.map((e,t)=>`
            <div class="sp-nft-card${t===1?` center`:``}" data-id="${e.id}" style="--nft-color:${e.color}">
              <div class="sp-nft-face">
                <div class="sp-nft-glow" style="background:${e.color}"></div>
                <div class="sp-nft-tier" style="color:${e.color}">${e.tier===`genesis`?`创世`:e.tier===`premium`?`高阶`:`基础`}</div>
                <div class="sp-nft-name">${e.name}</div>
                <div class="sp-nft-boost">分红加成 ${e.dividendBoost}</div>
              </div>
            </div>
          `).join(``)}
        </div>
      </div>

      <!-- Dividend History -->
      <div class="sp-dividend-section">
        <div class="sp-section-title">分红记录</div>
        ${r.map(e=>`
          <div class="sp-dividend-row">
            <div class="sp-div-date">${e.date}</div>
            <div class="sp-div-snap">${(e.sworlSnapshot/1e4).toFixed(0)}万 SWORL</div>
            <div class="sp-div-amount">+¥${e.amount.toFixed(2)}</div>
          </div>
        `).join(``)}
      </div>
    </div>
  `,e.querySelector(`#sp-more-btn`).addEventListener(`click`,()=>{e.querySelector(`#sp-more-assets`).classList.toggle(`hidden`)}),e.querySelector(`.sp-actions`).addEventListener(`click`,e=>{let t=e.target.closest(`.sp-action`);if(!t)return;let n=t.dataset.action;n===`scan`?window.dispatchEvent(new CustomEvent(`openScan`)):n===`receive`?window.dispatchEvent(new CustomEvent(`openReceive`)):n===`transfer`?window.dispatchEvent(new CustomEvent(`openTransfer`)):n===`swap`&&window.dispatchEvent(new CustomEvent(`openSwapInfo`))}),L(e,n.length),e.querySelector(`#sp-avatar-btn`).addEventListener(`click`,()=>{window.dispatchEvent(new CustomEvent(`openProfile`))}),e.querySelector(`#sp-gallery-all`).addEventListener(`click`,()=>{window.dispatchEvent(new CustomEvent(`openGallery`))})}function L(e,t){let n=e.querySelector(`#sp-gallery-track`),r=0,i=1;n.addEventListener(`pointerdown`,e=>{r=e.clientX}),n.addEventListener(`pointerup`,e=>{let a=e.clientX-r;Math.abs(a)<30||(a<0&&i<t-1?i++:a>0&&i>0&&i--,R(n,i))})}function R(e,t){e.querySelectorAll(`.sp-nft-card`).forEach((e,n)=>{e.classList.toggle(`center`,n===t),e.classList.toggle(`left`,n<t),e.classList.toggle(`right`,n>t)})}function z(e){_()?I(e):F(e)}var B=[`全部`,`3月`,`2月`,`1月`],V=`all`,H=`全部`;function U(e){return e===`nft`?`<span class="mall-tag nft-tag">纯资产</span>`:`<span class="mall-tag phygital-tag">含实物</span>`}function W(e){return`
    <div class="mall-drop-card" data-id="${e.id}">
      <div class="mall-drop-img">
        <img src="${e.image}" alt="${e.name}" loading="lazy" />
        ${e.limited?`<div class="mall-limited-badge">限定</div>`:``}
      </div>
      <div class="mall-drop-info">
        ${U(e.type)}
        <div class="mall-drop-name">${e.name}</div>
        <div class="mall-drop-price">${e.price.toLocaleString()} <span>SWORL</span></div>
      </div>
    </div>
  `}function G(e){return`
    <div class="mall-product-card${e.limited?` limited`:``}" data-id="${e.id}">
      <div class="mall-product-img">
        <img src="${e.image}" alt="${e.name}" loading="lazy" />
      </div>
      <div class="mall-product-body">
        ${U(e.type)}
        <div class="mall-product-name">${e.name}</div>
        <div class="mall-product-price">${e.price.toLocaleString()} <span>SWORL</span></div>
      </div>
    </div>
  `}function K(){return f.filter(e=>{let t=V===`all`||e.collection===V,n=H===`全部`||e.date===H;return t&&n})}function q(e){e.querySelector(`#mall-feed`).innerHTML=K().map(G).join(``)}function J(e){e.querySelector(`#mall-date-col`).innerHTML=B.map(e=>`
    <button class="mall-date-btn${e===H?` active`:``}" data-date="${e}">${e}</button>
  `).join(``)}function Y(e){let t=f.find(t=>t.id===e);if(!t)return;let n=document.getElementById(`mall-detail-overlay`),r=document.getElementById(`mall-detail-sheet`);r.innerHTML=`
    <div class="mall-detail-header">
      <button class="mall-detail-close" id="mall-detail-close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="mall-detail-scroll">
      <div class="mall-detail-img">
        <img src="${t.image}" alt="${t.name}" />
        ${t.limited?`<div class="mall-limited-badge">限定</div>`:``}
      </div>
      <div class="mall-detail-body">
        <div class="mall-detail-top">
          ${U(t.type)}
          ${t.limited?`<span class="mall-tag limited-tag">限定</span>`:``}
        </div>
        <div class="mall-detail-name">${t.name}</div>
        <div class="mall-detail-series">${t.series} · 创作者：${t.creator}</div>
        <div class="mall-royalty-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:14px;height:14px"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
          版税 ${t.royalty}% · 每次流转自动结算至创作者
        </div>
        <button class="mall-chain-btn" id="mall-chain-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:14px;height:14px"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
          链上溯源
        </button>
        <div class="mall-chain-timeline hidden" id="mall-chain-timeline">
          <div class="mall-chain-step"><div class="mall-chain-dot"></div><div><div class="mall-chain-label">工厂生产</div><div class="mall-chain-hash">2024-01-15 · 质检通过</div></div></div>
          <div class="mall-chain-step"><div class="mall-chain-dot active"></div><div><div class="mall-chain-label">链上铸造</div><div class="mall-chain-hash">${t.chainHash}</div></div></div>
          <div class="mall-chain-step"><div class="mall-chain-dot active"></div><div><div class="mall-chain-label">商城发售</div><div class="mall-chain-hash">2024-03-01 · 公开发售</div></div></div>
        </div>
        ${t.type===`phygital`?`<div class="mall-phygital-note"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:14px;height:14px;flex-shrink:0"><path d="M5 12h14M12 5l7 7-7 7"/></svg>购买后 3-7 个工作日发货，含 NFC 芯片验真</div>`:``}
      </div>
    </div>
    <div class="mall-detail-footer">
      <div class="mall-detail-price">${t.price.toLocaleString()} <span>SWORL</span></div>
      <button class="mall-buy-btn" id="mall-buy-btn">立即购买</button>
    </div>
  `,n.style.display=`flex`,r.querySelector(`#mall-detail-close`).addEventListener(`click`,()=>{n.style.display=`none`}),r.querySelector(`#mall-chain-btn`).addEventListener(`click`,()=>{r.querySelector(`#mall-chain-timeline`).classList.toggle(`hidden`)}),r.querySelector(`#mall-buy-btn`).addEventListener(`click`,()=>{n.style.display=`none`,window.dispatchEvent(new CustomEvent(`openPayment`,{detail:{name:t.name,sub:t.series+` · `+t.creator,amount:(t.price*.85).toFixed(2)}}))})}function ie(e){e.innerHTML=`
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
        ${p.map(W).join(``)}
      </div>

      <div class="mall-collections" id="mall-collections">
        <button class="mall-col-tab active" data-col="all">全部</button>
        ${d.map(e=>`<button class="mall-col-tab" data-col="${e}">${e}</button>`).join(``)}
      </div>

      <div class="mall-body">
        <div class="mall-date-col" id="mall-date-col"></div>
        <div class="mall-feed" id="mall-feed"></div>
      </div>
    </div>
  `,J(e),q(e),e.querySelector(`#mall-search-trigger`).addEventListener(`click`,()=>{window.dispatchEvent(new CustomEvent(`openSearch`))}),e.querySelector(`.mall-drops-track`).addEventListener(`click`,e=>{let t=e.target.closest(`.mall-drop-card`);t&&Y(+t.dataset.id)}),e.querySelector(`#mall-feed`).addEventListener(`click`,e=>{let t=e.target.closest(`.mall-product-card`);t&&Y(+t.dataset.id)}),e.querySelector(`#mall-collections`).addEventListener(`click`,t=>{let n=t.target.closest(`.mall-col-tab`);n&&(V=n.dataset.col,e.querySelectorAll(`.mall-col-tab`).forEach(e=>e.classList.toggle(`active`,e.dataset.col===V)),q(e))}),e.querySelector(`#mall-date-col`).addEventListener(`click`,t=>{let n=t.target.closest(`.mall-date-btn`);n&&(H=n.dataset.date,e.querySelectorAll(`.mall-date-btn`).forEach(e=>e.classList.toggle(`active`,e.dataset.date===H)),q(e))}),e.querySelector(`#mall-creator-banner`).addEventListener(`click`,()=>{document.getElementById(`mall-creator-overlay`).style.display=`flex`}),document.getElementById(`mall-creator-close`).addEventListener(`click`,()=>{document.getElementById(`mall-creator-overlay`).style.display=`none`}),document.getElementById(`mall-creator-tabs`).addEventListener(`click`,e=>{let t=e.target.closest(`.mall-creator-tab`);if(!t)return;document.querySelectorAll(`.mall-creator-tab`).forEach(e=>e.classList.toggle(`active`,e===t));let n=t.dataset.ctab===`nft`;document.getElementById(`mall-creator-nft-panel`).classList.toggle(`hidden`,!n),document.getElementById(`mall-creator-merch-panel`).classList.toggle(`hidden`,n)}),document.getElementById(`mall-upload-zone`).addEventListener(`click`,()=>document.getElementById(`mall-file-nft`).click()),document.getElementById(`mall-upload-zone-merch`).addEventListener(`click`,()=>document.getElementById(`mall-file-merch`).click()),[`mall-submit-nft`,`mall-submit-merch`].forEach(e=>{document.getElementById(e).addEventListener(`click`,function(){this.textContent=`✓ 已提交`,this.style.background=`var(--sworl)`,this.style.color=`#1A1A1A`,setTimeout(()=>{document.getElementById(`mall-creator-overlay`).style.display=`none`,this.textContent=e.includes(`nft`)?`提交铸造`:`提交审核`,this.style.background=``,this.style.color=``},1200)})})}function ae(){let e=document.getElementById(`scan-btn`),t=document.getElementById(`scan-overlay`),n=document.getElementById(`scan-close`),r=document.getElementById(`scan-mock`),i=()=>t.classList.remove(`hidden`);e.addEventListener(`click`,i),window.addEventListener(`openScan`,i),n.addEventListener(`click`,()=>t.classList.add(`hidden`)),r.addEventListener(`click`,()=>{t.classList.add(`hidden`),window.dispatchEvent(new CustomEvent(`openPayment`,{detail:{name:`数物旗舰店`,sub:`官方直营 · Conflux eSpace`,amount:`128.00`}}))})}function oe(){let e=document.getElementById(`payment-overlay`),t=document.getElementById(`payment-backdrop`),i=document.getElementById(`pay-btn`),a=document.getElementById(`pay-ripple`),o=document.getElementById(`pay-success`),s=document.getElementById(`slider-ball`),c=document.getElementById(`slider-trail`),l=document.getElementById(`slider-track`),u=document.getElementById(`sworl-pct`),d=document.getElementById(`cny-pct`),f=document.getElementById(`pay-amount`),p=document.getElementById(`pay-sworl-val`),m=document.getElementById(`pay-cny-val`),h=0,g=128,_=n[0];(_?.tier===`genesis`||_?.tier===`premium`)&&s.classList.add(_.tier===`genesis`?`genesis`:`premium`);function v(e){h=Math.max(0,Math.min(1,e));let t=Math.round((1-h)*(g/r.sworlToCny)*10)/10,n=Math.round(h*g*100)/100;c.style.width=`${h*100}%`,s.style.left=`${h*100}%`,u.textContent=`${Math.round((1-h)*100)}%`,d.textContent=`${Math.round(h*100)}%`,p.textContent=t.toFixed(1),m.textContent=n.toFixed(2)}let y=!1;function b(e){let t=l.getBoundingClientRect();return(e-t.left)/t.width}l.addEventListener(`pointerdown`,e=>{y=!0,l.setPointerCapture(e.pointerId),v(b(e.clientX))}),l.addEventListener(`pointermove`,e=>{y&&v(b(e.clientX))}),l.addEventListener(`pointerup`,()=>{y=!1}),window.addEventListener(`openPayment`,t=>{let n=t.detail;document.querySelector(`.merchant-name`).textContent=n.name||`数物旗舰店`,document.querySelector(`.merchant-sub`).textContent=n.sub||`官方直营 · Conflux eSpace`,g=parseFloat(n.amount||`128.00`),f.textContent=g.toFixed(2),v(0),e.classList.remove(`hidden`)}),t.addEventListener(`click`,()=>e.classList.add(`hidden`)),i.addEventListener(`click`,t=>{let n=i.getBoundingClientRect();a.style.left=`${t.clientX-n.left}px`,a.style.top=`${t.clientY-n.top}px`,a.classList.remove(`active`),a.offsetWidth,a.classList.add(`active`),setTimeout(()=>{e.classList.add(`hidden`),o.classList.remove(`hidden`),setTimeout(()=>o.classList.add(`hidden`),2e3)},400)})}function se(){let t=document.getElementById(`search-overlay`),n=document.getElementById(`search-input`),r=document.getElementById(`search-clear`),i=document.getElementById(`search-cancel`),a=document.getElementById(`search-results`);function o(t){let n=t.trim().toLowerCase();if(!n){a.innerHTML=`<div class="search-empty">
        <div class="search-hot-title">热门搜索</div>
        <div class="search-hot-tags">
          ${[`数物旗舰店`,`潮玩周边`,`娱乐场所`,`限定NFT`,`餐饮消费`].map(e=>`<span class="search-tag">${e}</span>`).join(``)}
        </div>
      </div>`;return}let r=e.filter(e=>e.name.includes(n)||e.desc.includes(n)||e.category.includes(n));if(!r.length){a.innerHTML=`<div class="search-no-result">未找到"${t}"相关商户</div>`;return}a.innerHTML=r.map(e=>`
      <div class="search-result-item" data-id="${e.id}">
        <div class="sri-img"><img src="${e.image}" alt="${e.name}" /></div>
        <div class="sri-info">
          <div class="sri-name">${e.name}</div>
          <div class="sri-desc">${e.desc}</div>
        </div>
        ${e.goldTier?`<div class="sri-gold">精选</div>`:``}
      </div>
    `).join(``)}window.addEventListener(`openSearch`,()=>{t.classList.remove(`hidden`),setTimeout(()=>n.focus(),100),o(``)}),n.addEventListener(`input`,()=>{r.classList.toggle(`hidden`,!n.value),o(n.value)}),r.addEventListener(`click`,()=>{n.value=``,r.classList.add(`hidden`),o(``),n.focus()}),i.addEventListener(`click`,()=>{t.classList.add(`hidden`),n.value=``,r.classList.add(`hidden`)}),a.addEventListener(`click`,i=>{let a=i.target.closest(`.search-result-item, .search-tag`);if(a?.classList.contains(`search-tag`)){n.value=a.textContent,r.classList.remove(`hidden`),o(a.textContent);return}if(a){let n=parseInt(a.dataset.id),r=e.find(e=>e.id===n);r&&(t.classList.add(`hidden`),window.dispatchEvent(new CustomEvent(`openPayment`,{detail:r})))}})}var ce=e.slice(0,5).map((e,t)=>({...e,dist:[180,320,450,560,680][t]+`m`}));function le(){let t=document.getElementById(`map-overlay`),n=document.getElementById(`map-close`),r=document.getElementById(`map-list`),i=document.getElementById(`map-tooltip`),a=document.getElementById(`map-tooltip-name`),o=document.getElementById(`map-tooltip-dist`);r.innerHTML=ce.map(e=>`
    <div class="map-list-item" data-id="${e.id}">
      <div class="mli-dot${e.goldTier?` gold`:``}"></div>
      <div class="mli-info">
        <div class="mli-name">${e.name}</div>
        <div class="mli-meta">${e.category} · ${e.dist}</div>
      </div>
      <div class="mli-sworl">S</div>
    </div>
  `).join(``),document.querySelectorAll(`.map-merchant-dot`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),a.textContent=e.dataset.name,o.textContent=e.dataset.dist,i.style.left=e.style.left,i.style.top=`calc(${e.style.top} - 52px)`,i.classList.remove(`hidden`)})}),document.getElementById(`map-canvas`).addEventListener(`click`,()=>{i.classList.add(`hidden`)}),window.addEventListener(`openMap`,()=>t.classList.remove(`hidden`)),n.addEventListener(`click`,()=>t.classList.add(`hidden`)),r.addEventListener(`click`,n=>{let r=n.target.closest(`.map-list-item`);if(r){let n=parseInt(r.dataset.id),i=e.find(e=>e.id===n);i&&(t.classList.add(`hidden`),window.dispatchEvent(new CustomEvent(`openPayment`,{detail:i})))}})}function X(){window.addEventListener(`openProfile`,()=>{document.getElementById(`profile-overlay`).classList.remove(`hidden`)}),document.getElementById(`profile-close`).addEventListener(`click`,()=>{document.getElementById(`profile-overlay`).classList.add(`hidden`)}),document.getElementById(`profile-copy-addr`).addEventListener(`click`,()=>{navigator.clipboard?.writeText(c.walletAddress).catch(()=>{});let e=document.getElementById(`profile-copy-addr`);e.style.color=`var(--sworl)`,setTimeout(()=>e.style.color=``,1e3)})}function ue(){window.addEventListener(`openSwapInfo`,()=>{document.getElementById(`swap-info-overlay`).classList.remove(`hidden`)}),document.getElementById(`swap-info-close`).addEventListener(`click`,()=>{document.getElementById(`swap-info-overlay`).classList.add(`hidden`)})}function de(){window.addEventListener(`openReceive`,()=>{document.getElementById(`receive-overlay`).classList.remove(`hidden`)}),document.getElementById(`receive-close`).addEventListener(`click`,()=>{document.getElementById(`receive-overlay`).classList.add(`hidden`)})}function fe(){window.addEventListener(`openGallery`,()=>{document.getElementById(`gallery-overlay`).classList.remove(`hidden`)}),document.getElementById(`gallery-close`).addEventListener(`click`,()=>{document.getElementById(`gallery-overlay`).classList.add(`hidden`)})}var Z=document.getElementById(`nav-blob`),pe=document.getElementById(`nav-capsule`),Q=6;function me(e){let t=pe.getBoundingClientRect(),n=e.getBoundingClientRect(),r=t.width-Q-(n.right-n.left),i=Math.max(Q,Math.min(n.left-t.left,r)),a=Math.min(n.width,t.width-Q*2);Z.style.left=i+`px`,Z.style.width=a+`px`}function $(e){document.querySelectorAll(`.tab-page`).forEach(e=>e.classList.remove(`active`)),document.querySelectorAll(`.nav-item[data-tab]`).forEach(e=>e.classList.remove(`active`)),document.getElementById(`page-${e}`).classList.add(`active`);let t=document.querySelector(`.nav-item[data-tab="${e}"]`);t&&(t.classList.add(`active`),me(t))}document.querySelectorAll(`.nav-item[data-tab]`).forEach(e=>{e.addEventListener(`click`,()=>$(e.dataset.tab))}),w(document.getElementById(`page-life`)),M(document.getElementById(`page-square`)),ie(document.getElementById(`page-mall`)),z(document.getElementById(`page-space`)),ae(),oe(),se(),le(),he(),X(),ue(),de(),fe(),ge();function he(){let e=document.getElementById(`compose-overlay`),t=document.getElementById(`compose-backdrop`),n=document.getElementById(`compose-textarea`),r=document.getElementById(`compose-publish-btn`),i=document.getElementById(`compose-glow`),o=document.getElementById(`compose-topics`),s=a[0];o.innerHTML=a.map(e=>`<button class="compose-topic-tag${e===s?` selected`:``}" data-topic="${e}">#${e}</button>`).join(``),o.addEventListener(`click`,e=>{let t=e.target.closest(`.compose-topic-tag`);t&&(s=t.dataset.topic,o.querySelectorAll(`.compose-topic-tag`).forEach(e=>e.classList.toggle(`selected`,e.dataset.topic===s)))}),window.addEventListener(`openCompose`,()=>{e.classList.remove(`hidden`),setTimeout(()=>n.focus(),300)}),t.addEventListener(`click`,()=>e.classList.add(`hidden`)),r.addEventListener(`click`,()=>{let t=n.value.trim();t&&(i.classList.remove(`active`),i.offsetWidth,i.classList.add(`active`),setTimeout(()=>{P(t,s),e.classList.add(`hidden`),n.value=``,M(document.getElementById(`page-square`))},400))})}requestAnimationFrame(()=>$(`life`));function ge(){let e=document.getElementById(`gallery-grid`),t=document.getElementById(`gallery-tabs`),n=`nft`;function r(){n===`nft`?e.innerHTML=l.map(e=>`
        <div class="gallery-item">
          <div class="gallery-item-tier" style="color:${e.color}">${e.tier===`genesis`?`创世`:e.tier===`premium`?`高阶`:`基础`}</div>
          <div class="gallery-item-name">${e.name}</div>
          <div class="gallery-item-boost">分红加成 ${e.dividendBoost}</div>
        </div>
      `).join(``):e.innerHTML=`
        <div class="gallery-item"><div class="gallery-item-tier" style="color:#8E8E93">文创</div><div class="gallery-item-name">数物帆布包</div><div class="gallery-item-boost">限量 500 件</div></div>
        <div class="gallery-item"><div class="gallery-item-tier" style="color:#8E8E93">文创</div><div class="gallery-item-name">创世马克杯</div><div class="gallery-item-boost">限量 200 件</div></div>
      `}t?.addEventListener(`click`,e=>{let i=e.target.closest(`.gallery-tab`);i&&(n=i.dataset.gtype,t.querySelectorAll(`.gallery-tab`).forEach(e=>e.classList.toggle(`active`,e.dataset.gtype===n)),r())}),window.addEventListener(`openGallery`,()=>r())}