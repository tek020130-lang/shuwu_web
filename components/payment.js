import { nftList, priceOracle } from '../data/mock.js';

export function initPayment() {
  const overlay = document.getElementById('payment-overlay');
  const backdrop = document.getElementById('payment-backdrop');
  const payBtn = document.getElementById('pay-btn');
  const ripple = document.getElementById('pay-ripple');
  const success = document.getElementById('pay-success');
  const ball = document.getElementById('slider-ball');
  const trail = document.getElementById('slider-trail');
  const track = document.getElementById('slider-track');
  const sworlPct = document.getElementById('sworl-pct');
  const cnyPct = document.getElementById('cny-pct');
  const payAmount = document.getElementById('pay-amount');
  const paySworl = document.getElementById('pay-sworl-val');
  const payCny = document.getElementById('pay-cny-val');

  let ratio = 0; // 0 = all SWORL, 1 = all e-CNY
  let amount = 128;
  const nft = nftList[0];

  // Apply NFT tier to ball
  if (nft?.tier === 'genesis' || nft?.tier === 'premium') {
    ball.classList.add(nft.tier === 'genesis' ? 'genesis' : 'premium');
  }

  function updateSlider(pct) {
    ratio = Math.max(0, Math.min(1, pct));
    const sworl = Math.round((1 - ratio) * (amount / priceOracle.sworlToCny) * 10) / 10;
    const cny = Math.round(ratio * amount * 100) / 100;
    trail.style.width = `${ratio * 100}%`;
    ball.style.left = `${ratio * 100}%`;
    sworlPct.textContent = `${Math.round((1 - ratio) * 100)}%`;
    cnyPct.textContent = `${Math.round(ratio * 100)}%`;
    paySworl.textContent = sworl.toFixed(1);
    payCny.textContent = cny.toFixed(2);
  }

  // Slider drag (touch + mouse)
  let dragging = false;
  function getTrackRatio(clientX) {
    const rect = track.getBoundingClientRect();
    return (clientX - rect.left) / rect.width;
  }
  track.addEventListener('pointerdown', e => {
    dragging = true; track.setPointerCapture(e.pointerId);
    updateSlider(getTrackRatio(e.clientX));
  });
  track.addEventListener('pointermove', e => { if (dragging) updateSlider(getTrackRatio(e.clientX)); });
  track.addEventListener('pointerup', () => { dragging = false; });

  // Open payment
  window.addEventListener('openPayment', e => {
    const m = e.detail;
    document.querySelector('.merchant-name').textContent = m.name || '数物旗舰店';
    document.querySelector('.merchant-sub').textContent = m.sub || '官方直营 · Conflux eSpace';
    amount = parseFloat(m.amount || '128.00');
    payAmount.textContent = amount.toFixed(2);
    updateSlider(0);
    overlay.classList.remove('hidden');
  });

  backdrop.addEventListener('click', () => overlay.classList.add('hidden'));

  // Pay button
  payBtn.addEventListener('click', e => {
    const rect = payBtn.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    ripple.classList.remove('active');
    void ripple.offsetWidth;
    ripple.classList.add('active');

    setTimeout(() => {
      overlay.classList.add('hidden');
      success.classList.remove('hidden');
      setTimeout(() => success.classList.add('hidden'), 2000);
    }, 400);
  });
}
