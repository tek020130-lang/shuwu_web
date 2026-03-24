const BASE = import.meta.env.VITE_API_URL || '';

function getToken() {
  return localStorage.getItem('sw_token');
}

export function setToken(token) {
  localStorage.setItem('sw_token', token);
}

export function clearToken() {
  localStorage.removeItem('sw_token');
}

export function isLoggedIn() {
  return !!getToken();
}

async function request(path, options = {}) {
  const token = getToken();
  const res = await fetch(BASE + path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
      ...options.headers,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || '请求失败');
  return data;
}

export const api = {
  // Auth
  sendCode: (phone) => request('/api/auth/send-code', { method: 'POST', body: JSON.stringify({ phone }) }),
  verify: (phone, code) => request('/api/auth/verify', { method: 'POST', body: JSON.stringify({ phone, code }) }),

  // User
  getProfile: () => request('/api/user/profile'),
  getNFTs: () => request('/api/user/nfts'),
  getDividends: () => request('/api/user/dividends'),

  // Mall
  getProducts: (params = {}) => request('/api/mall/products?' + new URLSearchParams(params)),
  getProduct: (id) => request(`/api/mall/products/${id}`),
  getCollections: () => request('/api/mall/collections'),
  getDrops: () => request('/api/mall/drops'),
  purchase: (productId) => request('/api/mall/purchase', { method: 'POST', body: JSON.stringify({ productId }) }),

  // Merchants
  getMerchants: (params = {}) => request('/api/merchants?' + new URLSearchParams(params)),

  // Posts
  getPosts: () => request('/api/posts'),
  createPost: (content, topic) => request('/api/posts', { method: 'POST', body: JSON.stringify({ content, topic }) }),
  likePost: (id) => request(`/api/posts/${id}/like`, { method: 'POST' }),
};
