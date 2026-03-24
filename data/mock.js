export const merchants = [
  { id: 1, name: '数物旗舰店', desc: '官方直营 · 限定发售', category: '旗舰店', image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&q=80', goldTier: true, sworlSupport: true, rating: 4.9 },
  { id: 2, name: 'NEON潮玩', desc: '潮流手办 · 盲盒', category: '潮玩周边', image: 'https://images.unsplash.com/photo-1608501078713-8e445a709b39?w=400&q=80', goldTier: true, sworlSupport: true, rating: 4.8 },
  { id: 3, name: '星际KTV', desc: '沉浸式娱乐体验', category: '娱乐场所', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80', goldTier: false, sworlSupport: true, rating: 4.7 },
  { id: 4, name: '云端餐厅', desc: '米其林推荐 · 区块链溯源', category: '餐饮消费', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80', goldTier: false, sworlSupport: true, rating: 4.6 },
  { id: 5, name: '数物限定馆', desc: '限量 · 仅限持币用户', category: '数物限定', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', goldTier: true, sworlSupport: true, rating: 5.0 },
  { id: 6, name: 'VOID电竞馆', desc: '专业赛事 · 代币积分', category: '娱乐场所', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80', goldTier: false, sworlSupport: true, rating: 4.5 },
  { id: 7, name: '幻境密室', desc: '沉浸剧本 · NFT道具', category: '娱乐场所', image: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&q=80', goldTier: false, sworlSupport: true, rating: 4.7 },
  { id: 8, name: '潮流集合店', desc: '联名款 · 限时折扣', category: '潮玩周边', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80', goldTier: false, sworlSupport: false, rating: 4.4 },
];

export const categories = [
  { id: 'all', name: '全部', icon: 'grid' },
  { id: '旗舰店', name: '旗舰店', icon: 'star' },
  { id: '潮玩周边', name: '潮玩周边', icon: 'cube' },
  { id: '娱乐场所', name: '娱乐场所', icon: 'music' },
  { id: '餐饮消费', name: '餐饮消费', icon: 'food' },
  { id: '数物限定', name: '数物限定', icon: 'diamond' },
];

export const nftList = [
  { id: 1, tier: 'genesis', name: '创世徽章', color: '#C9A84C' },
];

export const priceOracle = { sworlToCny: 0.85, cnyToSworl: 1.18 };

export const userState = { city: '上海', sworlBalance: 2480 };

// ── Square / 广场 ──
export const topics = ['数物生态', 'SWORL行情', 'NFT', '娱乐场所', '限定活动'];

export const ticker = [
  '数物先行者 刚刚通过扫码获得了 50 SWORL 分红',
  '旗舰店新周边「创世系列 Vol.3」已上链',
  'SWORL 持有人数突破 10,000',
  '幻境密室 本周新增 NFT 道具 3 件',
  '今日分红池已注入 12,800 e-CNY',
  'NEON潮玩 限定盲盒 48 小时内售罄',
];

export const posts = [
  {
    id: 1, userId: 'u1', userName: '数物先行者', nftTier: 'genesis',
    avatarColor: '#1A1A1A', verified: true,
    content: '刚刚在旗舰店消费了 500 SWORL，体验非常丝滑，混合支付的设计真的很超前。这才是 Web3 应该有的样子，不是那种强迫你用钱包的感觉，而是自然融入日常消费。',
    topic: '数物生态', value: 38.5, comments: 12, reposts: 6, time: '2分钟前', liked: false,
  },
  {
    id: 2, userId: 'u2', userName: 'CryptoNomad', nftTier: 'premium',
    avatarColor: '#5856D6', verified: false,
    content: 'SWORL 今天又涨了，持仓收益不错。更重要的是分红机制真的在跑，上周收到了 120 e-CNY，完全来自平台消费分成。',
    topic: 'SWORL行情', value: 22.0, comments: 8, reposts: 3, time: '15分钟前', liked: false,
  },
  {
    id: 3, userId: 'u3', userName: 'NFT_Collector', nftTier: 'basic',
    avatarColor: '#FF6B35', verified: false,
    content: '创世 NFT 的支付滑块真的太好看了，那个珠光金色球体每次滑动都有一种仪式感。细节做到这个程度，团队是认真的。',
    topic: 'NFT', value: 15.5, comments: 5, reposts: 2, time: '32分钟前', liked: false,
  },
  {
    id: 4, userId: 'u4', userName: '夜行者_Shanghai', nftTier: 'none',
    avatarColor: '#34C759', verified: false,
    content: '昨晚去了星际KTV，用 SWORL 支付，还额外获赠了代币。这种消费即挖矿的模式比传统积分好太多了，积分过期没用，代币永远是你的。',
    topic: '娱乐场所', value: 9.0, comments: 3, reposts: 1, time: '1小时前', liked: false,
  },
  {
    id: 5, userId: 'u5', userName: 'BlockchainBro', nftTier: 'genesis',
    avatarColor: '#FF9500', verified: true,
    content: '数物限定馆的新品刚上，只有持币用户才能看到，这种信息差设计很聪明。普通用户看到的是空页面，持币用户看到的是专属内容。',
    topic: '限定活动', value: 44.0, comments: 18, reposts: 9, time: '2小时前', liked: false,
  },
  {
    id: 6, userId: 'u6', userName: 'DeFi_Daily', nftTier: 'premium',
    avatarColor: '#007AFF', verified: false,
    content: '付费发帖机制是个好设计。0.5 SWORL 的门槛不高，但足以过滤掉大量垃圾信息。广场的内容质量明显比其他平台高。',
    topic: '数物生态', value: 31.5, comments: 14, reposts: 7, time: '3小时前', liked: false,
  },
  {
    id: 7, userId: 'u7', userName: '潮玩收藏家', nftTier: 'basic',
    avatarColor: '#AF52DE', verified: false,
    content: 'NEON潮玩的新盲盒系列和 NFT 联动了，买实体盲盒可以解锁对应的数字藏品。这个玩法很有意思，实体和数字资产双向绑定。',
    topic: 'NFT', value: 18.0, comments: 7, reposts: 4, time: '5小时前', liked: false,
  },
];

// ── Space / 空间 ──
export const spaceState = {
  isRegistered: false, // 首次进入触发注册页
  sworlBalance: 8888230,
  ecnyBalance: 25600.50,
  cfxBalance: 1240.8,
  dividendToday: 128.50,
  walletAddress: '0xfb75...de7a',
  userName: '数物先行者',
  avatarColor: '#1A1A1A',
};

export const spaceNFTs = [
  { id: 1, name: '创世勋章 #001', tier: 'genesis', color: '#C9A84C', dividendBoost: '1.5x', image: null },
  { id: 2, name: '数物先锋 #088', tier: 'premium', color: '#A3E635', dividendBoost: '1.2x', image: null },
  { id: 3, name: '潮玩联名 #012', tier: 'basic', color: '#8E8E93', dividendBoost: '1.0x', image: null },
];

export const dividendHistory = [
  { date: '今日', amount: 128.50, sworlSnapshot: 8888230 },
  { date: '昨日', amount: 115.20, sworlSnapshot: 8888230 },
  { date: '3天前', amount: 98.80, sworlSnapshot: 8500000 },
  { date: '4天前', amount: 142.30, sworlSnapshot: 8500000 },
  { date: '5天前', amount: 88.60, sworlSnapshot: 8200000 },
];

// ── Mall / 商城 ──
export const mallCollections = ['旗舰周边', '艺术家联名', '创始系列', '数字藏品'];

export const mallProducts = [
  { id: 1, name: '创世勋章 Vol.1', series: '创始系列', type: 'nft', price: 888, image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80', limited: true, creator: '数物官方', royalty: 5, chainHash: '0x3f8a...c12e', collection: '创始系列', date: '3月' },
  { id: 2, name: '数物帆布包 · 创世版', series: '旗舰周边', type: 'phygital', price: 320, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80', limited: true, creator: '数物官方', royalty: 5, chainHash: '0x7b2d...f44a', collection: '旗舰周边', date: '3月' },
  { id: 3, name: 'NEON × 数物联名帽', series: '艺术家联名', type: 'phygital', price: 480, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80', limited: false, creator: 'NEON Studio', royalty: 8, chainHash: '0x9c1f...b83d', collection: '艺术家联名', date: '3月' },
  { id: 4, name: '数字先锋 #088', series: '数字藏品', type: 'nft', price: 1200, image: 'https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=600&q=80', limited: true, creator: 'CryptoNomad', royalty: 8, chainHash: '0x2e5c...a91b', collection: '数字藏品', date: '2月' },
  { id: 5, name: '创世马克杯', series: '旗舰周边', type: 'phygital', price: 180, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80', limited: false, creator: '数物官方', royalty: 5, chainHash: '0x6d4e...c77f', collection: '旗舰周边', date: '2月' },
  { id: 6, name: '幻境系列 NFT #012', series: '艺术家联名', type: 'nft', price: 560, image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&q=80', limited: false, creator: '幻境工作室', royalty: 8, chainHash: '0x1a8b...d55c', collection: '艺术家联名', date: '2月' },
  { id: 7, name: '数物 T-Shirt · 黑标', series: '旗舰周边', type: 'phygital', price: 260, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80', limited: false, creator: '数物官方', royalty: 5, chainHash: '0x4f2a...e88d', collection: '旗舰周边', date: '1月' },
  { id: 8, name: '创世徽章 · 链上版', series: '创始系列', type: 'nft', price: 2400, image: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=600&q=80', limited: true, creator: '数物官方', royalty: 5, chainHash: '0x8e3d...f12a', collection: '创始系列', date: '1月' },
];

export const newDrops = [mallProducts[0], mallProducts[3], mallProducts[2]];
