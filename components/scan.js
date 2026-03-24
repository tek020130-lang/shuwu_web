export function initScan() {
  const btn = document.getElementById('scan-btn');
  const overlay = document.getElementById('scan-overlay');
  const closeBtn = document.getElementById('scan-close');
  const mockBtn = document.getElementById('scan-mock');

  const open = () => overlay.classList.remove('hidden');
  btn.addEventListener('click', open);
  window.addEventListener('openScan', open);
  closeBtn.addEventListener('click', () => overlay.classList.add('hidden'));

  mockBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    window.dispatchEvent(new CustomEvent('openPayment', {
      detail: { name: '数物旗舰店', sub: '官方直营 · Conflux eSpace', amount: '128.00' }
    }));
  });
}

