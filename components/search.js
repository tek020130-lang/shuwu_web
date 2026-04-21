import { merchants, mallProducts } from '../data/mock.js';

export function initSearch() {
  const overlay = document.getElementById('search-overlay');
  const input = document.getElementById('search-input');
  const clearBtn = document.getElementById('search-clear');
  const cancelBtn = document.getElementById('search-cancel');
  const results = document.getElementById('search-results');
  let currentMode = 'life';

  function renderResults(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      results.innerHTML = `<div class="search-empty">
        <div class="search-hot-title">热门搜索</div>
        <div class="search-hot-tags">
          ${(currentMode === 'mall'
            ? ['创世勋章','数物帆布包','联名帽','数字藏品','限定NFT']
            : ['数物旗舰店','潮玩周边','娱乐场所','限定NFT','餐饮消费']
          ).map(t => `<span class="search-tag">${t}</span>`).join('')}
        </div>
      </div>`;
      return;
    }
    if (currentMode === 'mall') {
      const list = mallProducts.filter(p =>
        p.name.includes(q) || p.series.includes(q) || p.creator.includes(q) || p.collection.includes(q)
      );
      if (!list.length) {
        results.innerHTML = `<div class="search-no-result">未找到"${query}"相关商品</div>`;
        return;
      }
      results.innerHTML = list.map(p => `
        <div class="search-result-item" data-id="${p.id}" data-type="product">
          <div class="sri-img"><img src="${p.image}" alt="${p.name}" /></div>
          <div class="sri-info">
            <div class="sri-name">${p.name}</div>
            <div class="sri-desc">${p.series} · ${p.creator}</div>
          </div>
          ${p.limited ? '<div class="sri-gold">限定</div>' : ''}
        </div>
      `).join('');
    } else {
      const list = merchants.filter(m =>
        m.name.includes(q) || m.desc.includes(q) || m.category.includes(q)
      );
      if (!list.length) {
        results.innerHTML = `<div class="search-no-result">未找到"${query}"相关商户</div>`;
        return;
      }
      results.innerHTML = list.map(m => `
        <div class="search-result-item" data-id="${m.id}" data-type="merchant">
          <div class="sri-img"><img src="${m.image}" alt="${m.name}" /></div>
          <div class="sri-info">
            <div class="sri-name">${m.name}</div>
            <div class="sri-desc">${m.desc}</div>
          </div>
          ${m.goldTier ? '<div class="sri-gold">精选</div>' : ''}
        </div>
      `).join('');
    }
  }

  window.addEventListener('openSearch', e => {
    currentMode = e.detail?.mode || 'life';
    input.placeholder = currentMode === 'mall' ? '搜索NFT、数字藏品、文创…' : '搜索商户、活动、品类…';
    overlay.classList.remove('hidden');
    setTimeout(() => input.focus(), 100);
    renderResults('');
  });

  input.addEventListener('input', () => {
    clearBtn.classList.toggle('hidden', !input.value);
    renderResults(input.value);
  });

  clearBtn.addEventListener('click', () => {
    input.value = ''; clearBtn.classList.add('hidden');
    renderResults(''); input.focus();
  });

  cancelBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    input.value = ''; clearBtn.classList.add('hidden');
  });

  results.addEventListener('click', e => {
    const item = e.target.closest('.search-result-item, .search-tag');
    if (item?.classList.contains('search-tag')) {
      input.value = item.textContent;
      clearBtn.classList.remove('hidden');
      renderResults(item.textContent);
      return;
    }
    if (item) {
      const id = parseInt(item.dataset.id);
      overlay.classList.add('hidden');
      if (item.dataset.type === 'product') {
        const p = mallProducts.find(x => x.id === id);
        if (p) window.dispatchEvent(new CustomEvent('openPayment', {
          detail: { name: p.name, sub: p.series + ' · ' + p.creator, amount: (p.price * 0.85).toFixed(2) }
        }));
      } else {
        const merchant = merchants.find(m => m.id === id);
        if (merchant) window.dispatchEvent(new CustomEvent('openMerchantDetail', { detail: merchant }));
      }
    }
  });
}
