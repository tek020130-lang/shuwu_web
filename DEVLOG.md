# 数物 (ShuWu) 开发日志

## 项目概览
区块链娱乐生态 App，基于 Conflux eSpace。
- 前端：`/root/shuwu_web` → Netlify: https://wondrous-macaron-37f58e.netlify.app
- 后端：`/root/shuwu_api` → Railway: https://shuwuapi-production.up.railway.app
- GitHub: tek020130-lang/shuwu_web, tek020130-lang/shuwu_api

## 已完成

### UI 设计
- ~~暖白背景~~ → 改为 #f2f2f7（iOS 无色磨砂玻璃质感背景）
- 黑色胶囊导航栏 + 绿色荧光激活效果（保留）
- 全面引入 xinUI 风格：增强版 liquid glass 系统（glass/glass-card/glass-gold/glass-icon/glass-input）
- 生活板块：8格金刚区快捷导航 + 精致搜索栏 + 全宽商户卡片（一店一栏）
- 广场板块：去掉标题/副标题，新帖子卡片（头像+作者+内容），热门话题横滚，+ 号固定右侧垂直居中，左上角个人中心图标
- 商城板块：精致搜索栏 + 创作中心 banner + 2列瀑布流商品 + 月份日期筛选
- 空间板块：新资产卡（深色渐变）+ 精美简笔画头像图标 + 数藏空间全屏覆盖弹窗（挂到 body 层级）

### 后端 API (Node.js + Express + PostgreSQL)
- `POST /api/auth/send-code` — 发送验证码（开发模式打印到控制台）
- `POST /api/auth/verify` — 验证码登录/注册，返回 JWT
- `GET /api/user/profile` — 钱包余额、用户信息
- `GET /api/user/nfts` — NFT 列表
- `GET /api/user/dividends` — 分红历史
- `GET /api/mall/products` — 商品列表（支持 collection/date 筛选）
- `GET /api/mall/collections` — 系列列表
- `GET /api/mall/drops` — New Drops
- `POST /api/mall/purchase` — 购买（需 JWT）
- `GET /api/merchants` — 商户列表（支持 category/q 筛选）
- `GET /api/posts` — 帖子列表
- `POST /api/posts` — 发帖（扣 0.5 SWORL）
- `POST /api/posts/:id/like` — 点赞

### 数据库 (PostgreSQL on Railway)
- 9张表全部创建：users, sms_codes, nfts, dividends, merchants, products, orders, posts, post_likes
- 已写入种子数据：8个商户，8个商品

### 前端 API 接入
- `api/client.js` — 统一 fetch 封装，读取 VITE_API_URL
- `tabs/space.js` — 注册/登录调真实 API，余额/NFT/分红有 mock 兜底
- `tabs/life.js` — 商户列表调真实 API，有 mock 兜底
- `tabs/mall.js` — 商品列表调真实 API

### 部署
- 后端部署到 Railway，DATABASE_URL 已配置
- 前端部署到 Netlify，VITE_API_URL 已配置，GitHub 自动部署

## 下一步计划
1. **阿里云短信** — 配置真实短信验证码（需实名认证 + 申请签名模板）
2. **区块链集成** — Conflux eSpace 链上钱包、NFT 铸造、SWORL 代币
3. **支付接入** — 数字人民币支付通道
4. **自定义域名** — 将 sworlworld.com 绑定到 Netlify

## 环境变量
- Railway shuwu_api: ALIYUN_ACCESS_KEY, ALIYUN_ACCESS_SECRET, SMS_SIGN_NAME, SMS_TEMPLATE_CODE, DATABASE_URL, JWT_SECRET
- Netlify shuwu_web: VITE_API_URL=https://shuwuapi-production.up.railway.app

## 注意事项
- 验证码目前是开发模式（ALIYUN_ACCESS_KEY=dev），任何6位数字可通过
- 旧 Netlify 链接 https://incredible-gnome-f35455.netlify.app 已废弃

## 更新记录
- **2026-03-25** — 完成后端 API + 数据库初始化 + 前端部署，整个全栈架构跑通
- **2026-03-31** — 全面重设计 UI 为 xinUI 风格（liquid glass），修复多个运行时 bug（数藏弹窗遮挡、商城日期筛选、广场+号固定定位、空间板块点击空白）
