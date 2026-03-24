import { spaceState } from '../data/mock.js';

export function initProfile() {
  window.addEventListener('openProfile', () => {
    const overlay = document.getElementById('profile-overlay');
    overlay.classList.remove('hidden');
  });

  document.getElementById('profile-close').addEventListener('click', () => {
    document.getElementById('profile-overlay').classList.add('hidden');
  });

  document.getElementById('profile-copy-addr').addEventListener('click', () => {
    navigator.clipboard?.writeText(spaceState.walletAddress).catch(() => {});
    const btn = document.getElementById('profile-copy-addr');
    btn.style.color = 'var(--sworl)';
    setTimeout(() => btn.style.color = '', 1000);
  });
}

export function initSwapInfo() {
  window.addEventListener('openSwapInfo', () => {
    document.getElementById('swap-info-overlay').classList.remove('hidden');
  });
  document.getElementById('swap-info-close').addEventListener('click', () => {
    document.getElementById('swap-info-overlay').classList.add('hidden');
  });
}

export function initReceive() {
  window.addEventListener('openReceive', () => {
    document.getElementById('receive-overlay').classList.remove('hidden');
  });
  document.getElementById('receive-close').addEventListener('click', () => {
    document.getElementById('receive-overlay').classList.add('hidden');
  });
}

export function initGalleryDetail() {
  window.addEventListener('openGallery', () => {
    document.getElementById('gallery-overlay').classList.remove('hidden');
  });
  document.getElementById('gallery-close').addEventListener('click', () => {
    document.getElementById('gallery-overlay').classList.add('hidden');
  });
}
