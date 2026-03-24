import { merchants } from '../data/mock.js';

export function initSearch() {
  const overlay = document.getElementById('search-overlay');
  const input = document.getElementById('search-input');
  const clearBtn = document.getElementById('search-clear');
  const cancelBtn = document.getElementById('search-cancel');
  const results = document.getElementById('search-results');

  function renderResults(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      results.innerHTML = `<div class="search-empty">
        <div class="search-hot-title">热门搜索</div>
        <div class="search-hot-tags">
          ${['数物旗舰店','潮玩周边','娱乐场所','限定NFT','餐饮消费'].map(t =>
            `<span class="search-tag">${t}</span>`).join('')}
        </div>
      </div>`;
      return;
    }
    const list = merchants.filter(m =>
      m.name.includes(q) || m.desc.includes(q) || m.category.includes(q)
    );
    if (!list.length) {
      results.innerHTML = `<div class="search-no-result">未找到"${query}"相关商户</div>`;
      return;
    }
    results.innerHTML = list.map(m => `
      <div class="search-result-item" data-id="${m.id}">
        <div class="sri-img"><img src="${m.image}" alt="${m.name}" /></div>
        <div class="sri-info">
          <div class="sri-name">${m.name}</div>
          <div class="sri-desc">${m.desc}</div>
        </div>
        ${m.goldTier ? '<div class="sri-gold">精选</div>' : ''}
      </div>
    `).join('');
  }

  window.addEventListener('openSearch', () => {
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
      const merchant = merchants.find(m => m.id === id);
      if (merchant) {
        overlay.classList.add('hidden');
        window.dispatchEvent(new CustomEvent('openPayment', { detail: merchant }));
      }
    }
  });
}
