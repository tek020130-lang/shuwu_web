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
1. **邮箱注册/登录** — 替换手机号验证码，改为邮箱 + 密码注册，邮箱验证码登录（Nodemailer/SMTP）
2. **区块链集成** — Conflux eSpace 链上钱包、NFT 铸造、SWORL 代币
3. **支付接入** — 数字人民币支付通道
4. **自定义域名** — 将 sworlworld.com 绑定到 Netlify

## 环境变量
- Railway shuwu_api: ALIYUN_ACCESS_KEY, ALIYUN_ACCESS_SECRET, SMS_SIGN_NAME, SMS_TEMPLATE_CODE, DATABASE_URL, JWT_SECRET
- Netlify shuwu_web: VITE_API_URL=https://shuwuapi-production.up.railway.app

## 注意事项
- 验证码目前是开发模式（ALIYUN_ACCESS_KEY=dev），任何6位数字可通过
- 当前 Netlify 地址：https://incredible-gnome-f35455.netlify.app
- 部署命令：`npm run build && netlify deploy --prod --dir=dist`（需配置 netlify.toml）
- 生活/商城/空间板块 API 调用均有 mock 兜底，后端不可用时前端正常显示

## 2026-04-21 详细更新

### 新增功能
- **生活板块 — 商户详情页**：商户卡片点击不再直接跳支付，改为弹出 bottom sheet 详情页（大图、评分、标签、营业时间、距离、SWORL 支持提示），详情页内点"立即消费"才触发支付
- **广场板块 — 评论 sheet**：点评论按钮弹出评论列表 + 输入框，可发送新评论
- **广场板块 — 转发 toast**：点转发按钮显示"转发成功，+0.5 SWORL"提示
- **广场板块 — ··· 菜单**：点三点菜单弹出 action sheet（收藏 / 复制链接 / 举报）
- **商城板块 — 已购状态**：购买成功后商品卡片显示绿色"已购"badge
- **商城板块 — 购物车**：购物车按钮打开已购藏品列表 sheet
- **商城板块 — 商品搜索**：商城搜索框搜索商品（名称/系列/创作者），生活板块搜索框搜索商户，两者独立
- **空间板块 — 复制 toast**：复制钱包地址后显示"地址已复制"提示
- **空间板块 — 菜单项**：安全中心打开 profile-overlay，设置/帮助显示"功能即将上线"toast
- **空间板块 — 余额同步**：支付成功后 SWORL 余额实时更新
- **全局 — paymentSuccess 事件**：支付成功时派发自定义事件，各模块可监听响应

### 数据完善
- `data/mock.js` merchants 补充 `distance`、`openTime`、`tags`、`priceRange` 字段
- `data/mock.js` userState 补充 `name` 字段

### Bug 修复
- **全 app 白屏**：`life.js` 中 `let activeCategory` 声明被插入代码覆盖，导致 ReferenceError 使整个 JS bundle 崩溃，已修复变量声明位置
- **生活板块空白**：`api.getMerchants()` 在无后端时 fetch hang，导致 `renderLife` 卡住不渲染，改为完全使用 mock 数据（移除 API 调用）
- **广场发帖中心 overlay 透视**：`position:fixed` 被 `overflow-y:auto` 父容器裁剪，将 overlay 挂到 `document.body`
- **广场加号按钮状态**：`renderSquare` 重新渲染时无条件设 `display:block`，切换到其他 tab 后发帖会导致按钮重新出现，改为检查当前 tab 状态
- **发帖弹窗期间加号按钮**：打开发帖弹窗时隐藏加号按钮，关闭/发布后恢复
- **空间菜单重复数藏空间**：菜单列表里去掉重复的"数藏空间"入口，保留上方卡片入口
- **Netlify 部署空白**：项目缺少 `netlify.toml`，Netlify 不知道 publish 目录是 `dist`，添加配置文件后恢复正常

### 架构调整
- 新增 `netlify.toml`，明确 `build.command` 和 `publish = "dist"`
- 空间注册状态改用 `localStorage('sw_registered')` 持久化，注册/跳过后下次进入直接显示主页，未注册用户正常触发注册流程

## 2026-04-25 React Native App 框架搭建

### 背景决策
确认数物最终产品形态为正规上架 App Store / Google Play 的原生 App（对标美团，非 WebView 套壳）。现有 Netlify Web 版保留作为演示/备用渠道，主力转向 React Native。

### 新项目位置
`/root/shuwu-app/` — 独立 Expo 项目，与 Web 版并行存在。

### 技术栈
- Expo SDK 52 + Expo Router v4（文件路由）
- TypeScript 全覆盖
- Zustand（客户端状态）+ React Query（服务端缓存）
- NativeWind v4（Tailwind 语法）
- React Native Reanimated 3（动画）
- expo-blur（玻璃效果，iOS 原生 UIVisualEffectView）
- expo-linear-gradient（渐变）
- expo-secure-store（JWT 存储）
- expo-local-authentication（Face ID / 指纹支付）
- Axios + 拦截器（自动注入 Bearer token，统一错误处理）

### 完成内容

#### 设计系统
- `src/design/tokens.ts` — 颜色（bg/gold/sworl/darkCard/glass）、间距、圆角常量
- `src/design/typography.ts` — 字体比例
- `src/design/shadows.ts` — 阴影预设

#### 核心 UI 组件
- `GlassCard` — BlurView + LinearGradient + 顶部高光边，iOS 原生玻璃效果
- `GlassGoldCard` — 金色变体
- `Toast` — 底部 pill 提示，读取 useUIStore 自动显示/隐藏
- `TabBar` — 自定义底部导航，Reanimated 动画 blob 指示器（SWORL 绿）
- `PaymentSlider` — 滑动确认支付组件，Reanimated pan 手势，90% 阈值触发

#### 状态管理
- `store/auth.ts` — token、user、isGuest、isLoading、logout
- `store/ui.ts` — toast 状态，showToast 自动 2200ms 后隐藏

#### API 层（完全镜像后端接口）
- `api/client.ts` — Axios 实例，baseURL 指向 Railway，typed get/post 封装
- `api/auth.ts` — sendCode / verify
- `api/user.ts` — getProfile / getNFTs / getDividends / getMyPosts
- `api/merchants.ts` — getAll
- `api/posts.ts` — getAll / create / like
- `api/mall.ts` — getProducts / getProduct / getCollections / getDrops / purchase

#### 工具库
- `lib/storage.ts` — SecureStore 封装（key: sw_token）
- `lib/haptics.ts` — hapticLight / hapticMedium / hapticSuccess / hapticError
- `hooks/useBiometric.ts` — Face ID / 指纹验证封装，无硬件时自动放行

#### Auth 流程（端到端）
- `(auth)/index.tsx` — 手机号输入，11位校验，调 authApi.sendCode
- `(auth)/verify.tsx` — 6位验证码，调 authApi.verify → SecureStore 存 token → 进入 tabs
- `_layout.tsx` — AuthGate 启动时读 token → 验证 profile → 自动跳转

#### 四个 Tab 页面（均接真实 API）
- `(tabs)/life/index.tsx` — 商户列表，分类筛选，GlassCard，点击进详情
- `(tabs)/square/index.tsx` — 帖子流，子 tab，点赞 mutation，下拉刷新，「+ 发帖」按钮
- `(tabs)/mall/index.tsx` — 商品 2 列网格，系列筛选，GlassGoldCard 创作中心 banner，点击进详情
- `(tabs)/space/index.tsx` — 深色渐变资产卡（SWORL + e-CNY 余额），4 个快捷操作，NFT 入口，分红历史

#### 详情页
- `life/[id].tsx` — 商户详情，大图 hero，标签/营业时间/距离，「扫码消费」CTA
- `square/[id].tsx` — 帖子详情，点赞，内容价值展示，评论占位
- `mall/[id].tsx` — 商品详情，链上信息，「立即购买」跳支付弹窗

#### 弹窗（8个）
- `modals/payment.tsx` — 支付确认，商品信息卡，PaymentSlider + 生物识别，成功状态自动关闭
- `modals/compose.tsx` — 发帖，话题 chip 选择，字数限制，发布后刷新 React Query 缓存
- `modals/profile.tsx` — 个人设置，账户信息，退出登录（Alert 确认）
- `modals/receive.tsx` — 收款，钱包地址展示，系统分享
- `modals/scan.tsx` — 扫码全屏，扫描框四角动画（需 expo-camera 开发构建）
- `modals/map.tsx` — 附近商户地图，商户列表底部卡片（需 react-native-maps 开发构建）
- `modals/gallery.tsx` — NFT 全屏画廊，缩略图切换，链上信息展示
- `modals/swap-info.tsx` — SWORL 兑换说明，汇率表，FAQ

### Bug 修复记录
- `(tabs)/_layout.tsx` screen name 从 `life/index` 改为 `life`（Expo Router v4 规范）
- `tokens.ts` 重复 key（sworlPurple/sworlPurpleLight）导致 TS 报错，已清理
- Axios 响应拦截器 unwrap data 后 TypeScript 类型不匹配，改用 typed wrapper 函数 `get<T>()` / `post<T>()` 解决
- `profile.tsx` 引用了不存在的 `nickname`/`email` 字段，改为 `userName`/`phone`（与 UserProfile 类型一致）
- `square/index.tsx` header 改动后残留多余 `</View>` 导致 JSX 结构错误，已修复
- `mall/[id].tsx` 未使用的 `showToast` import 导致 TS 警告，已清理

### 当前状态
TypeScript 零错误，项目结构完整，可用 `npx expo start --tunnel` 配合 Expo Go 预览。

### 待完成（下一阶段）
- 扫码：安装 `expo-camera` 接入真实相机
- 地图：安装 `react-native-maps` 接入真实地图
- EAS Build 配置（`eas.json`）→ 云端打包 APK / IPA
- App 图标 + 启动屏（`assets/icon.png`、`splash.png`）
- 后端邮箱验证码（替换当前开发模式验证码）
- SWORL 合约集成（等待合约地址 + ABI）
- 托管钱包（注册时生成真实链上地址，私钥 AES-256-GCM 加密存储）
- NFT 盲盒铸造流程
- 支付宝 / 微信支付接入（e-CNY 充值通道）
- 商家管理后台（独立入口，每个商家可独立登录）

---

## 更新记录
- **2026-03-25** — 完成后端 API + 数据库初始化 + 前端部署，整个全栈架构跑通
- **2026-03-31** — 全面重设计 UI 为 xinUI 风格（liquid glass），修复多个运行时 bug
- **2026-04-21** — 全功能 UI 完善 + 一系列 bug 修复
- **2026-04-25** — React Native App 框架完整搭建，TypeScript 零错误，41 个文件，8 个弹窗，3 个详情页
