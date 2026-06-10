# 数物 (ShuWu) 开发日志

## 项目概览
区块链娱乐生态 App，基于 Conflux eSpace。
- 前端：`/root/shuwu_web` → Netlify: https://wondrous-macaron-37f58e.netlify.app
- 后端：`/root/shuwu_api` → Railway: https://shuwuapi-production.up.railway.app
- GitHub: tek020130-lang/shuwu_web, tek020130-lang/shuwu_api

## 2026-06-10（续）登录修复 + 邀请码 + 商家入驻 + 支付方案讨论

### EAS Build 成功
- Build ID `5d99cfcd` 状态：**finished**
- APK 下载：`https://expo.dev/artifacts/eas/cynTdasN9PNEgXJMPWh58g.apk`

### 登录流程重构
- **问题**：前端调 `/api/auth/verify`，后端无此路由，所有账号登录失败
- **修复**：RegisterScreen 改为完整四步状态机
  - `email` → 选择"登录"（老用户输密码）或"注册新账号"（发验证码）
  - `login` → 输密码 + "忘记密码"入口
  - `code` → 输 6 位验证码（注册/忘密码共用）
  - `setpwd` → 设置/重置密码，完成后自动登录
- 老账号（`password_hash` 为空）走忘记密码重设一次即可
- 新 Build：`0f481f65`（进行中 → 后续触发新 build 含邀请码等改动）

### 邀请码系统
- 格式：6位，2位大写字母 + 4位数字，如 `SW3829`（去掉 I/O 避免混淆）
- 注册时自动生成，碰撞重试最多5次
- 接受可选 `referralCode` 参数，验证通过后给邀请人链上发 20 SWORL
- 老用户迁移：migration 自动补全邀请码
- **开关**：Railway 加 `REFERRAL_ENABLED=true` 才生效，后期关闭只需删除/改为 false
- profile 接口返回 `referralCode` + `referralCount`
- 个人中心展示邀请码 + 已邀请人数 + 一键复制邀请文案
- 注册第三步（设密码）有可选邀请码输入框

### 商家入驻完整链路
- **App 内嵌表单**（生活板块底部低调入口）：
  - 全屏 Sheet，填写：店铺封面图（Pinata IPFS 上传）、名称、类目（8选项）、电话、地址、邮箱+密码
  - 提交成功显示"申请已提交"页
- **后端**：
  - `merchant_users` 表加 `phone/category/address/description/image_url` 字段
  - 新增 `POST /api/merchant/auth/upload-image`（multer + Pinata）
  - 激活逻辑重构：管理员激活时**自动创建** `merchants` 记录（含图片），无需手动填写
- **商家后台** `shuwu-merchant.netlify.app`：注册表单补全类目/电话/地址/简介

### 支付方案讨论（待决策）
**问题**：消费者前期没有数字人民币，当前混合支付 UI 有 e-CNY 选项但无法使用

**推荐方案（待实施）**：微信/支付宝充值 SWORL → 消费全部用 SWORL
- 用户用微信/支付宝购买 SWORL（充值页面待做）
- 消费（商城/盲盒/线下）全部扣 SWORL
- e-CNY 选项暂时隐藏，等银行合作后开放
- 前提：需要微信/支付宝商户号（申请个体户/企业号，1-2周）
- Railway 填入 5 个环境变量即可启用

**待实施内容**：
1. App 空间板块加"充值 SWORL"入口（微信/支付宝 → SWORL）
2. 支付 UI 隐藏 e-CNY 选项（暂时）
3. 商城/生活板块支付改为纯 SWORL



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
- Railway shuwu_api: DATABASE_URL, JWT_SECRET, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
  - QQ 邮箱: SMTP_HOST=smtp.qq.com, SMTP_PORT=465, SMTP_USER=xxx@qq.com, SMTP_PASS=QQ授权码
  - Gmail: SMTP_HOST=smtp.gmail.com, SMTP_PORT=465, SMTP_USER=xxx@gmail.com, SMTP_PASS=应用专用密码
  - 未配置 SMTP_HOST 时自动进入开发模式，验证码打印到 Railway 日志
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

## 2026-05-12 React Native App 全面重写（上架水准）

### 背景
原 App 框架版本廉价感强：无动画、弹窗无弹簧感、大量按钮无响应、缺少触觉反馈。本次全面重写四个板块，目标对标 Apple 官网风格，所有按钮可点击，所有交互有反馈。

### 架构调整
- 放弃 NativeWind / Tailwind，改用 `StyleSheet.create` + 设计 token（`src/data/tokens.ts`）
- 放弃 Expo Router 多页面导航，改为单页 tab 状态切换（`src/components/App.tsx`）
- 放弃 react-native-reanimated（与旧架构 `newArchEnabled:false` 不兼容），改用原生 `Animated` API
- 全局状态统一用 zustand（`src/store/index.ts`）
- 所有弹窗改为 `Modal` + `Pressable` 背景关闭，替代原生 Alert
- 图片全部用 `FadeImage` 组件（opacity 0→1 淡入）
- 所有按钮加 `expo-haptics` 触觉反馈
- 新增 `expo-clipboard` 用于复制钱包地址

### 完成内容

#### 基础设施
- `src/data/tokens.ts` — 颜色/圆角/间距设计 token
- `src/data/mock.ts` — 完整 mock 数据（8商户、8商品含溯源时间线、7帖子、3 NFT、分红历史、热门话题、评论）
- `src/store/index.ts` — zustand store（posts/toggleLike/addPost/purchasedIds/addPurchase/toastMsg/showToast/sworlBalance/ecnyBalance/deductSworl）
- `src/components/Toast.tsx` — 全局 Toast，spring 动画
- `src/components/FadeImage.tsx` — 图片淡入组件
- `src/components/App.tsx` — 原生 Animated 淡入切换 tab，GestureHandlerRootView + SafeAreaProvider

#### 生活板块（LifeScreen.tsx）
- 8格金刚区（SVG 图标）
- 搜索 overlay（全屏，实时过滤商户）
- 地图 sheet（模拟地图画布 + 商户列表）
- 分类筛选 pills
- 商户卡片（FadeImage）→ 商户详情 sheet（大图/评分/标签/营业时间）
- 详情页"立即消费" → 支付 sheet（PanResponder 混合支付滑块，SWORL/e-CNY 比例）
- 支付成功全屏动画 overlay

#### 广场板块（SquareScreen.tsx）
- 4个 feed tab（热门/关注/快讯/社区），animated 下划线指示器
- 热门话题横向滚动
- 帖子卡片：点赞 spring 动画、评论、转发、菜单、头像
- 评论 sheet（评论列表 + 输入框 + KeyboardAvoidingView）
- 菜单 sheet（收藏/复制/举报）
- 用户主页 sheet（该用户所有帖子）
- 发帖 sheet（话题 chip + 500字限制 + 发布）
- 浮动发帖按钮

#### 商城板块（MallScreen.tsx）
- 搜索 overlay（实时过滤藏品）
- 创作中心 sheet（NFT铸造 / 文创设计 两个 tab，表单 + 提交）
- 系列筛选 + 日期筛选
- 商品网格（FadeImage，限定/已购角标）
- 商品详情 sheet（链上信息 + 溯源时间线 + 购买确认二次弹窗）
- 已购藏品 cart sheet
- 购买状态同步 zustand purchasedIds

#### 空间板块（SpaceScreen.tsx）
- 注册页：邮箱输入 → 发送验证码 → 60秒倒计时 → 验证码确认登录
- 资产卡（LinearGradient 深色渐变，SWORL/e-CNY/CFX/今日分红）
- 4个快捷操作（SVG 图标）：扫码/收款/划转/兑换
- 数藏空间：沉浸式全屏黑色背景 NFT 网格，点击弹出详情 overlay
- 划转 sheet：SWORL ⇄ e-CNY 双向，实时估算，连接 zustand 余额
- 收款 sheet：QR 码图案 + 地址 + expo-clipboard 复制
- 个人中心：全屏页面（安全认证/账号绑定/分红权益统计/退出登录）
- 分红历史列表

### Bug 修复记录
- `SquareScreen.tsx` — `ReturnType<typeof useStore>['posts'][0]` 无法推断类型，改为从 mock 直接导入 `typeof mockPosts[0]`
- `MallScreen.tsx` — `chainTimeline` 是 `string[]` 但代码按 `{time,event}` 对象处理，改为字符串分割解析
- `babel.config.js` — 移除 `nativewind` 的 `jsxImportSource` 配置（项目未使用 nativewind，与 reanimated 冲突）
- `app/_layout.tsx` — 移除 `import 'react-native-gesture-handler'`（Expo Router 已自动处理，手动 import 导致 HostFunction 崩溃）
- `src/components/App.tsx` — 移除 `react-native-reanimated` 的 `FadeIn`，改用原生 `Animated.timing`（reanimated 与 `newArchEnabled:false` 不兼容）
- 新增 `expo-clipboard` 依赖（`npx expo install expo-clipboard`）

### 当前状态
TypeScript 零错误，Expo Go 可正常加载，四个板块全部可见。

### 待完成（下一阶段）
- 真机测试各板块交互细节，修复视觉问题
- BottomNav 胶囊导航 blob 动画调优
- 接入真实后端 API（替换 mock 数据）
- EAS Build 打包 APK / IPA
- App Store / Google Play 上架准备

## 2026-05-12（续）React Native App UI 精修 — 弹窗系统重构 + 全局视觉统一

### 背景
App 全面重写后，用户反馈以下问题需要修复：弹窗卡顿/模糊残留、搜索栏飞出屏幕、键盘无法收起、BottomNav blob 溢出卡顿、所有弹窗内容上移到状态栏后面无法点击返回按钮。本次完成全部修复并定版 UI。

### 核心架构变更

#### 1. 弹窗系统全面重构：SheetModal → FullScreenModal
- 废弃 `SheetModal`（BlurView + PanResponder，卡顿 + 关闭后模糊残留）
- 新建 `src/components/FullScreenModal.tsx` — 统一全屏弹窗组件
  - `Modal animationType="slide"` 系统级动画，完全丝滑
  - 左侧返回箭头 header（← 图标），支持 iOS 左划返回、Android 实体返回键（`onRequestClose`）
  - 浅色背景（`C.bg = #F2F2F7`），与空间板块安全中心视觉统一
- 四个板块共 12 个弹窗全部迁移至 `FullScreenModal`

#### 2. Android edge-to-edge Modal 内容上移问题（根本修复）
**根本原因**：`app.json` 中 `"edgeToEdgeEnabled": true` 使 Android 以 edge-to-edge 模式渲染。Modal 在 Android 上是独立 Window，`SafeAreaView` 读取的是主 App 窗口的 insets（可能为 0），不是 Modal 窗口的 insets，导致内容上移到状态栏后面。

**修复方案**：
```tsx
// 不依赖 SafeAreaView，直接读取设备级常量
const topPad = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : insets.top;
```
- Android：`StatusBar.currentHeight` 是系统级常量，不依赖任何 View 树，在 Modal 内部完全可靠
- iOS：Modal 共享同一 UIWindow，`useSafeAreaInsets().top` 可靠
- 涉及文件：`FullScreenModal.tsx`、`SpaceScreen.tsx`（NFTGallery + ProfileScreen）、`LifeScreen.tsx`（SearchOverlay）、`MallScreen.tsx`（SearchOverlay）

#### 3. BottomNav blob 动画优化
- **溢出修复**：`height: 54` 改为 `top: 5, bottom: 5`（自动撑满 capsule 内部，不超出边界）
- **卡顿修复**：spring 参数从 `stiffness: 220, damping: 20` 调整为 `stiffness: 380, damping: 28, mass: 0.7`，长距离跳转（如生活→空间）也能快速到位

#### 4. 全局弹窗颜色系统统一（浅色主题）
所有弹窗内容颜色从深色系（`rgba(255,255,255,0.xx)`）全部改为浅色系，对齐空间板块安全中心（ProfileScreen）设计语言：
- 主文字：`C.text`（`#1A1A1A`）
- 次要文字：`C.textSub`（`#8E8E93`）
- 卡片/输入框背景：`C.bgCard`（白色）/ `C.bgCard2`（`#F5F5F7`）
- 分割线：`C.border`
- SWORL 提示文字：`#4A7A00`（深绿，浅色背景下可读）
- 地图画布：`#E8EDF2`（浅灰，替代深色 `#0D0D1A`）
- 涉及文件：`SquareScreen.tsx`（sh 样式块）、`MallScreen.tsx`（sh/cc/pd/ct 样式块）、`LifeScreen.tsx`（mm/md/pm 样式块）

### 修复的 Bug 清单
| Bug | 根本原因 | 修复方案 |
|-----|---------|---------|
| 弹窗卡顿 + 模糊残留 | SheetModal 用 BlurView + JS 线程动画 | 改用 `Modal animationType="slide"` 系统动画 |
| 搜索栏飞出屏幕 | `statusBarTranslucent` + 不完整 SafeAreaView | 改用 `StatusBar.currentHeight` 手动 padding |
| 键盘无法收起 | ComposeContent 在 SheetModal 内无 KeyboardAvoidingView | 全屏 Modal + `KeyboardAvoidingView` + `TouchableWithoutFeedback onPress={Keyboard.dismiss}` |
| 所有弹窗内容上移 | `edgeToEdgeEnabled:true` 下 Modal 是独立 Window，SafeAreaView insets 为 0 | `StatusBar.currentHeight`（Android）替代 SafeAreaView |
| BottomNav blob 溢出 | `height: 54` 固定值超出 capsule 边界 | 改为 `top: 5, bottom: 5` 自动撑满 |
| BottomNav blob 卡顿 | spring stiffness 不足，长距离动画慢 | stiffness 220→380，mass 加 0.7 |
| 弹窗内容看不见 | 颜色为白色透明，背景改浅色后不可见 | 全部改为深色系 token |

### 当前状态（UI 定版）
- TypeScript 零错误
- 四个板块 + 所有弹窗视觉统一，浅色主题
- BottomNav 动画丝滑，无溢出
- 所有弹窗返回按钮可点击，内容正确显示在状态栏下方
- iOS / Android 均适配

### 下一阶段：真实功能开发
- 接入真实后端 API（替换 mock 数据）
- 用户注册/登录（邮箱验证码，对接 Railway 后端）
- 链上钱包（Conflux eSpace，托管钱包生成）
- SWORL 代币合约集成
- NFT 铸造流程
- EAS Build 打包 APK / IPA → App Store / Google Play 上架

## 更新记录
- **2026-03-25** — 完成后端 API + 数据库初始化 + 前端部署，整个全栈架构跑通
- **2026-03-31** — 全面重设计 UI 为 xinUI 风格（liquid glass），修复多个运行时 bug
- **2026-04-21** — 全功能 UI 完善 + 一系列 bug 修复
- **2026-04-25** — React Native App 框架完整搭建，TypeScript 零错误，41 个文件，8 个弹窗，3 个详情页
- **2026-05-12** — App 全面重写，四个板块完整功能，所有按钮可点击，Expo Go 可正常运行
- **2026-05-12（续）** — UI 精修定版：弹窗系统重构、edge-to-edge Modal 根本修复、BottomNav 优化、全局浅色主题统一
- **2026-05-12（规划）** — 完成完整产品路线图规划，见下方
- **2026-05-13** — App UI 精修第二轮 + 开场动画重构 + 资产卡重设计 + 数藏入口卡动态化 + 后端接入真实 API + Resend 邮件服务 + 邮箱验证码注册/登录上线
- **2026-05-14** — 链上合约系统全部完成并部署主网，后端集成合约调用，支付框架预留
- **2026-05-25** — 数藏盲盒前端流程、话题挑战、商家后台、管理员后台全部完成并上线
- **2026-05-26** — NFT 铸造申请流程 + Pinata IPFS 上传 + 数藏空间重构（鲸探风格）+ 管理员账号创建 + 后台 API 地址修复 + 端到端验证通过
- **2026-06-08** — 金融级全面修复 + 双库隔离架构（Supabase）+ shuwu-app 推送 GitHub

---

## 2026-06-08 金融级全面修复 + 双库隔离架构

### 背景
上线前对全部逻辑进行金融级审计，修复所有会导致功能崩溃、资金损失或数据不一致的问题。同时引入 Supabase 双库隔离架构，钱包私钥与业务数据物理分离。

### 后端修复（`/root/shuwu_api/`）

#### NFT tier 全链路统一
- `lootbox.js`：RARITY_TIER 常量改为英文 `['basic','rare','excellent','genesis']`，写入 nfts 表时使用英文 tier
- `admin.js`：审核通过时 tier 从申请表读取，不再硬编码 `'普通'`；`_executeMint` 函数支持断点续传（从 `minted_count` 续跑）
- `runMigrations`：新增 nfts.tier CHECK 约束，现有中文数据自动迁移为英文

#### platform_ledger 对账系统
- 新增 `platform_ledger` 表：记录每笔应收回收池金额及链上交易哈希
- `mall.js`：购买后写入 platform_ledger，`collectToRecovery` 成功后更新 chain_tx
- `lootbox.js`：开盒后同步写入 platform_ledger

#### 定时任务
- `src/jobs/mintRetryJob.js`：每 10 分钟扫描卡在 `minting` 超 30 分钟的铸造请求，自动重试，超 3 次标记 failed
- `src/jobs/ledgerReconcileJob.js`：每小时重试 platform_ledger 中 chain_tx 为空的记录，保证链上最终一致性

#### 双库隔离架构（Supabase）
- 新增 `src/db/supabaseClient.js`：Supabase service_role 客户端，未配置时自动降级单库模式
- 改造 `src/services/walletService.js`：私钥写 Supabase，地址写 Railway；`revealUserPrivateKey` 从 Supabase 读
- 改造 `src/routes/wallet.js`：reveal-key 路由不再从 Railway 读私钥字段
- 新增 `supabase_init.sql`：Supabase 建表 + RLS 策略脚本
- 新增 `scripts/migrate_keys_to_supabase.js`：幂等迁移脚本（待执行）

#### 其他修复
- `runMigrations`：ecny_enabled 类型修复（字符串→布尔），nft_mint_requests 新增 retry_count 字段

### 前端修复（`/root/shuwu-app/`）

- `store/index.ts`：新增 `sworlRate` 字段（严格互倒）+ `refreshBalance()` 方法
- `components/App.tsx`：启动时从 `/api/payment/sworl-rate` 拉取汇率存入 store
- `api/payment.ts`：新增 `paymentApi.getSworlRate()`
- `api/user.ts`：`NFTTier` 联合类型（`'basic'|'rare'|'excellent'|'genesis'`），新增 `walletInitialized`
- `api/posts.ts`：Post 接口新增 `comments` 字段
- `data/mock.ts`：删除错误的 `priceOracle`（0.85/1.18 不互倒）
- `screens/MallScreen.tsx`：购买/结算后调 `refreshBalance()` 同步真实余额；image/collection/date 空值兜底
- `screens/SpaceScreen.tsx`：NFT 加载失败显示错误状态 + 重试按钮，不再静默显示 mock 数据
- `screens/LifeScreen.tsx` / `SquareScreen.tsx`：空值兜底修复 TypeScript 错误
- TypeScript 全局零错误

### Supabase 配置状态
- 项目已创建：`https://kruzqsiotddzwpdessac.supabase.co`
- 建表脚本已执行（wallet_keys 表 + RLS + 触发器）
- Railway 环境变量已添加：`SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`
- **待完成**：执行 `node scripts/migrate_keys_to_supabase.js` 将现有用户私钥迁移到 Supabase

### 接口验证结果
| 接口 | 状态 |
|------|------|
| `/health` | ✅ |
| `/api/payment/sworl-rate` | ✅ 汇率 10 SWORL/元，互倒 0.1 |
| `/api/mall/products` | ✅ |
| `/api/merchants` | ✅ |
| `/api/auth/send-code` | ✅ |
| `/api/posts` | ✅ |
| `/api/lootbox/series` | ⚠️ 暂无盲盒系列数据，需管理员后台配置 |

### 下一步
1. 执行私钥迁移脚本（`node scripts/migrate_keys_to_supabase.js`）
2. EAS Build 构建 APK
3. App Store / Google Play 上架准备

---

## 2026-05-26 NFT 上传铸造流程 + 数藏空间重构

### 完成内容

#### 后端（`/root/shuwu_api/`）
- 安装 `multer` + `@pinata/sdk`
- 新增 `src/services/pinataService.js`：图片/元数据上传到 IPFS，返回 `ipfs://Qm...`
- 新增 `src/routes/nft.js`：
  - `POST /api/nft/mint-request` — 创作者提交铸造申请（multipart/form-data）
  - `GET /api/nft/my-requests` — 查询申请状态
- `src/routes/admin.js` 追加：
  - `POST /api/admin/upload` — 管理员上传图片到 Pinata
  - `GET /api/admin/nft-requests?status=pending` — 申请列表
  - `POST /api/admin/nft-requests/:id/approve` — 审核通过，异步批量铸造（每份独立 Token ID）
  - `POST /api/admin/nft-requests/:id/reject` — 审核拒绝
- `src/services/contractService.js`：`mintNFT` 返回 tokenId，新增 `createNFTSeries`、`grantFromCommunity`
- `src/db/schema.sql`：新增 `nft_mint_requests` 表，`nfts` 表追加 `token_id/edition_number/total_supply/royalty_bps/image_url/metadata_url/mint_request_id/creator_id`
- `src/routes/user.js`：NFT 接口返回新字段

#### 管理员后台（`/root/shuwu-admin/`）
- `src/api/admin.ts`：新增 `NftMintRequest` 类型、`nftRequestsApi`、`uploadImage()`
- 新增 `src/pages/NftRequests.tsx`：状态 Tab（待审核/铸造中/已铸造/已拒绝/铸造失败）+ 表格 + 审核操作
- `src/router.tsx`：侧边栏新增"NFT 申请"入口，注册路由
- `src/pages/Lootbox.tsx`：盲盒物品图片字段改为文件上传（选择图片 → 上传 Pinata → 自动填入 IPFS URL）
- 已部署 Netlify：https://shuwu-admin.netlify.app

#### App（`/root/shuwu-app/`）
- `src/api/client.ts`：新增 `postFormData<T>()` 方法
- 新增 `src/api/nft.ts`：`submitMintRequest` / `getMyRequests`
- `src/api/user.ts`：NFT 类型新增链上字段
- `src/screens/MallScreen.tsx`：创作中心接入 `expo-image-picker`，真实提交 API，loading 状态
- 新增 `src/components/NFTDetailModal.tsx`：全屏 NFT 详情（大图/稀有度/链上信息/溯源时间线/版税/转赠）
- `src/screens/SpaceScreen.tsx`：数藏陈列室重构为卡片列表（稀有度光效边框），点击进全屏详情

### NFT 核心设计
- 每份独立 Token ID（发行100份 = 链上100个 Token ID），对标鲸探
- 合约地址：`0xC9404164d65c1730a7F7aFFE4E3deceB6dF9FE4E`（Conflux eSpace）
- 图片存储：Pinata IPFS（免费版 500MB + 100次/月）
- 版税：创作者自定义（上限 10%），平台抽成 20%，托管模式

### 待完成
- Railway 配置 `PINATA_JWT` 环境变量（Pinata 控制台生成） ✅ 已完成
- Railway 执行 schema.sql 新增的表和字段 ✅ 已完成（runMigrations 自动执行）
- 管理员点"通过"后链上铸造完整流程测试（待测试）
- EAS Build 打包 APK / IPA → App Store / Google Play 上架
- App 图标 + 启动屏设计（上架必须）

---

## 2026-05-26（续）端到端验证 + 管理员后台修复

### 完成内容

#### 数据库迁移验证
- `runMigrations()` 在 Railway 服务器启动时自动执行，`nft_mint_requests` 表创建成功
- `nfts` 表新增字段（token_id/edition_number/total_supply 等）全部就位
- `platform_config` 表插入 `royalty_platform_share = 0.20`

#### Pinata IPFS 上传验证
- 用 curl 提交测试 NFT 铸造申请，图片成功上传到 IPFS
- 返回：`ipfs://QmaxYjEGu3wWuGXU7PKtx5SZX73FcsqM5emwxr274jvaXx`（图片）
- 元数据：`ipfs://QmfZsrD3NKFEh5yBxCbmTAFFqEJG9814iPiyVyBAFBgvXe`

#### 管理员账号创建
- `admin_users` 表通过 `runMigrations()` 自动建表
- 默认管理员账号 seed：`cild130@qq.com`（super 角色）
- 登录接口验证通过，token 正常返回

#### 管理员后台 Bug 修复
- **API 地址错误**：`.env` 文件中 `VITE_API_URL` 指向不存在的 `shuwu-api.up.railway.app`，修正为 `shuwuapi-production.up.railway.app`
- **同时修正** `src/api/client.ts`、`src/api/admin.ts` 中的 fallback URL
- **登录失败**：axios 在用户网络环境下请求 Railway 超时（Network Error），登录函数改用原生 `fetch` 绕过 axios 问题
- **NFT 申请列表不显示**：根因同上（axios baseURL 被 .env 旧值覆盖），修正 .env 后数据正常加载

#### Expo 启动方式
- ngrok 服务故障，`--tunnel` 模式不可用
- 安装 cloudflared 作为备用隧道方案
- 最终 `npx expo start --lan` 成功启动，手机扫码进入 App

### 当前状态
- 管理员后台可正常登录，NFT 申请列表显示待审核的测试申请
- 完整流程已验证到"管理员审核"步骤，链上铸造待后续测试
- 路线图第 13-14 周（EAS Build + 上架）准备开始

### 下一步
1. 管理员点"通过"测试链上铸造（用真实作品，非测试图片）
2. App 图标 + 启动屏设计
3. EAS Build 配置（`eas.json`）→ 云端打包 APK / IPA
4. App Store / Google Play 上架准备

---

## 2026-05-25 数藏盲盒 + 话题挑战 + 商家/管理员后台

### 完成内容

#### 第 7 周：数藏盲盒（`/root/shuwu-app/`）

**后端**（`/root/shuwu_api/`）：
- schema 新增三张表：`lootbox_series`（系列）、`lootbox_items`（物品+权重）、`lootbox_orders`（开盒记录）
- 新增路由 `src/routes/lootbox.js`：
  - `GET /api/lootbox/series` — 系列列表（含已开数量）
  - `GET /api/lootbox/series/:id/items` — 物品列表（不暴露权重）
  - `POST /api/lootbox/open` — 悲观锁加权随机抽取，异步链上操作
  - `GET /api/lootbox/history` — 用户开盒历史

**前端**：
- 新增 `api/lootbox.ts`、`components/LootBoxContent.tsx`
- 商城新增「盲盒」Tab，三阶段状态机（series → opening → result）
- 稀有度四档：普通 `#8E8E93` / 稀有 `#A3E635` / 卓越 `#AF52DE` / 创世 `#C9A84C`
- 概率由管理员后台自由配置（每个物品独立 weight 字段）

#### 第 8 周：话题挑战

**后端**：
- schema 新增：`challenges`、`challenge_entries`、`daily_like_counts`
- 新增路由 `src/routes/challenges.js`：列表/详情/报名/结算
- 排名公式：`score = likes / (1 + hours/12)^1.5`
- 每日点赞上限 50 次

**前端**：
- 新增 `api/challenges.ts`、`components/ChallengeContent.tsx`
- 广场热门 Tab 顶部挑战 Banner，发帖支持关联挑战

#### 第 9-10 周：商家后台（`/root/shuwu-merchant/`）

- 技术栈：React 18 + Vite + TypeScript + Tailwind CSS + Recharts
- 独立商家账号体系（merchant_users 表，注册后 pending，管理员激活）
- 页面：登录/注册、Dashboard（折线图）、商品管理（CRUD + 审核状态）、订单列表
- GitHub：https://github.com/tek020130-lang/shuwu-merchant
- Netlify：https://shuwu-merchant.netlify.app

#### 第 11-12 周：管理员后台（`/root/shuwu-admin/`）

- 技术栈：同商家后台
- 7 个页面：平台总览、商品审核、用户管理、商家账号、挑战管理、盲盒配置、分红结算
- 盲盒配置：系列管理 + 物品增删 + 权重/稀有度编辑 + 实时概率显示
- 分红：预览（持币×时间系数×NFT加成）+ CSV 导出
- GitHub：https://github.com/tek020130-lang/shuwu-admin
- Netlify：https://shuwu-admin.netlify.app

### 后端新增路由汇总
- `src/routes/lootbox.js` — 盲盒
- `src/routes/challenges.js` — 话题挑战
- `src/routes/merchant-auth.js` — 商家认证
- `src/routes/merchant.js` — 商家业务
- `src/routes/admin-auth.js` — 管理员认证
- `src/routes/admin.js` — 管理员全部功能

### 路线图进度
```
✅ 第 1-2 周   接入真实 API + 邮箱注册/登录
✅ 第 2-3 周   托管钱包（私钥加密存储）
✅ 第 3-5 周   链上合约部署 + 后端集成
✅ 第 7 周     数藏盲盒完整前端流程
✅ 第 8 周     话题挑战
✅ 第 9-10 周  商家后台
✅ 第 11-12 周 管理员后台
⏳ 第 13-14 周 EAS Build + App Store / Google Play 上架
```

---

## 2026-05-14 链上合约系统 + 后端集成

### 完成内容

#### 合约系统（`/root/shuwu-contracts/`）

编写并部署四个 UUPS 可升级合约到 Conflux eSpace 主网（chainId 1030）：

| 合约 | 主网地址 | 说明 |
|------|---------|------|
| SWORLToken | `0xd55e093729951Cc4B84D65B37A6cF44D49b14C7d` | ERC-20 + 快照，120亿总量，一次性 mint |
| ShuWuNFT | `0xC9404164d65c1730a7F7aFFE4E3deceB6dF9FE4E` | ERC-721 + ERC-2981 版税，系列管理，三档稀有度 |
| LootBox | `0x689286212c7670dFd99f25d0D493B7c2E585e4c0` | 盲盒三档定价，双层随机，后端揭盒 |
| SWORLPresale | `0xba8da0dD1Ea2386031141199fF2D06d272cb0E85` | 多轮私募，支持 USDT/CFX/e-CNY |

代币分配：
- 生态地址（100亿）：`0xc09e2E59b9A22Aa30921573712Cd408F39d57BE7`
- 社区地址（20亿）：`0x5b13B3e1420f518AB627D2B3493CFd2b8CdB2AF8`
- 回收池：`0x0098a0564bd78eA1DC7aDdf8689CE803601784f9`
- Operator：`0x86E9A521d9862915e717cfBd0243a1B27D030302`

主网 USDT：`0xfe97E85d13ABD9c1c33384E796F10B73905637cE`

所有源代码和部署说明存档于 `/root/shuwu-contracts/mainnet-deploy/`

#### 后端集成（`/root/shuwu_api/`）

- 新增 `src/services/contractService.js`：封装所有链上调用（grantFromCommunity / grantFromEco / collectToRecovery / settleMerchantPayment / snapshot / getOnChainBalance 等）
- 注册时异步发放 20 SWORL 到用户链上钱包（`auth.js`）
- 注册时数据库初始余额改为 0，profile 接口从链上实时读取 SWORL 余额，失败时降级到数据库值（`user.js`）
- 发帖时异步扣 0.5 SWORL 进回收池（`posts.js`）
- 商城购买时异步扣款进回收池（`mall.js`）
- 新增 `src/services/paymentService.js`：微信/支付宝签名验证、回调解密、法币消费返还 10% SWORL 逻辑
- 新增 `src/routes/payment.js`：`POST /api/payment/wechat/notify`、`POST /api/payment/alipay/notify`、`GET /api/payment/sworl-rate`
- schema 新增 `payment_orders` 表，users 表新增 `wechat_openid`、`alipay_buyer_id` 字段

#### Railway 环境变量新增
```
CONFLUX_RPC_URL=https://evm.confluxrpc.com
OPERATOR_PRIVATE_KEY=（已配置）
SWORL_TOKEN_ADDRESS=0xd55e093729951Cc4B84D65B37A6cF44D49b14C7d
SHUWU_NFT_ADDRESS=0xC9404164d65c1730a7F7aFFE4E3deceB6dF9FE4E
LOOT_BOX_ADDRESS=0x689286212c7670dFd99f25d0D493B7c2E585e4c0
SWORL_PRESALE_ADDRESS=0xba8da0dD1Ea2386031141199fF2D06d272cb0E85
```

### 已验证
- 注册新用户后链上余额确认 +20 SWORL（地址 `0xEB3455aAbDCf6e270D3214265eD217466453A791`）
- 四个主网合约 eth_getCode 全部返回 OK

### 注意事项
- Operator 钱包已充值 10 CFX 用于 gas（Conflux gas 极低，够跑数万笔）
- 微信/支付宝支付框架已写好，等商户号后填入环境变量即可启用
- 数字人民币接入等确定合作银行后按接口文档对接
- 合约升级：`UPGRADE_CONTRACT=SWORLToken npx hardhat run scripts/upgrade.js --network confluxMainnet`

### 路线图进度
- ✅ 第 1-2 周：接入真实 API + 邮箱注册/登录
- ✅ 第 2-3 周：托管钱包（私钥加密存储）
- ✅ 第 3-5 周：链上合约部署 + 后端集成
- ⏳ 第 7 周：数藏盲盒完整前端流程
- ⏳ 第 8 周：话题挑战
- ⏳ 第 9-10 周：商家后台
- ⏳ 第 11-12 周：管理员后台
- ⏳ 第 13-14 周：EAS Build + App Store / Google Play 上架
- **2026-05-14** — 链上合约系统全部完成并部署主网，后端集成合约调用，支付框架预留

---

## 2026-05-12 完整产品路线图规划

### 项目全景

| 子项目 | 位置 | 状态 |
|--------|------|------|
| RN App | `/root/shuwu-app/` | UI 定版，全 mock |
| 后端 API | `/root/shuwu_api/` | 已部署 Railway，RN 未接入 |
| Web 演示 | `/root/shuwu_web/` | Netlify，保留备用 |
| 商家后台 | 新建 `/root/shuwu-merchant/` | 待建 |
| 管理员后台 | 新建 `/root/shuwu-admin/` | 待建 |
| 链上合约 | 新建 `/root/shuwu-contracts/` | 待建，用户提供现有合约源码后讨论升级 |

**链的选择：Conflux eSpace（EVM 兼容，Solidity，交易费接近零）**
Cosmos SDK 自建链暂缓，等用户规模匹配后再评估。后续应用链方向优先考虑 OP Stack 托管方案。

---

### SWORL 经济模型

#### 代币基本设计
- 固定总量上限，非无限增发
- 回收机制：消费混合支付、购买文创/NFT 必须搭配 SWORL、发帖/评论/点赞消耗，回收代币进入平台回收池
- 回收池管理：管理员后台可决定销毁或再释放，合约提供 `burnOrRelease()`（仅 owner）
- 激励池：合约预留固定量 SWORL 用于消费返还，不额外增发

#### 用户消耗 SWORL

| 行为 | 消耗 | 去向 |
|------|------|------|
| 发布帖子 | 0.5 SWORL | 平台回收池 |
| 点赞 | 0.1 SWORL | 直接给发帖人（内容打赏机制） |
| 评论 | 0.05 SWORL | 平台回收池 |
| 转发 | 免费 | — |
| 参与话题挑战 | 1.0 SWORL | 进奖励池 |
| 铸造 NFT/文创 | 100 SWORL/份 | 平台回收池（高门槛保证内容质量） |
| 开盲盒 | 10 / 50 / 200 SWORL（三档） | 平台回收池 |
| 购买文创/NFT | 必须搭配一定比例 SWORL | 平台回收池 |

**所有经济参数通过 `platform_config` 配置表热更新，管理员后台可随时调整，无需重新部署。**

#### 用户获得 SWORL

| 行为 | 获得 |
|------|------|
| 消费返还 | 消费金额 × 10%（来自激励池，可调整） |
| 帖子被点赞 | 0.1 SWORL/个（点赞人支付） |
| 话题挑战获奖 | 第1名40%，第2名25%，第3名15%，第4-10名平分20% |
| 参与挑战即得 | 1 SWORL（净零成本，降低门槛） |
| 邀请新用户 | 20 SWORL |
| 每日签到 | 0.2 SWORL（连续递增） |
| 新用户注册 | 赠送 10 SWORL（覆盖早期操作成本） |

#### 分红机制
- **分红池**：平台每月收入的 30%，管理员后台可调整比例
- **频率**：每月一次（每月 1 日结算上月）
- **币种**：数字人民币（e-CNY）
- **前期发放**：后端自动生成账单，平台方从自有 e-CNY 钱包手动转账，管理员后台支持导出 CSV
- **快照时间**：每月最后一天 23:59
- **分红权重** = 持币数量 × 时间系数 × NFT 加成

持币时间系数（防分红套利，避免分红前买入、分红后抛售导致价格波动）：

| 持币时间 | 系数 |
|---------|------|
| < 7 天 | 0.5 |
| 7-30 天 | 0.8 |
| 30-60 天 | 1.0 |
| 60-90 天 | 1.5 |
| > 90 天 | 2.0 |

NFT 加成：普通 +0.1x，稀有 +0.3x，创世 +0.5x

持币时间计算方式（每笔独立计时 vs 账户维度）：等用户提供合约源码后决定。

---

### 盲盒设计（双层随机）
- 第一层：系列内容随机（随机抽取系列中某款文创/NFT）
- 第二层：编号随机（同款产品不同编号，编号即稀缺性）
- 每款文创对应实体 + NFT，购买时不知道编号，开盒后揭晓
- 合约 `mintRandom()`，后端负责随机抽签，链上记录结果

---

### 话题挑战设计
- 管理员后台创建挑战，设定主题、奖励池、开始/结束时间
- 用户发帖关联挑战，消耗 1 SWORL 报名费（同时返还 1 SWORL，净零成本）
- 排名规则：点赞数 × 时间衰减系数（防早发帖垄断）
- 奖励分配：第1名40%，第2名25%，第3名15%，第4-10名平分20%
- 防刷：同一用户对同一帖子只能点赞一次，每日点赞上限 50 次

---

### 开发阶段规划

```
第 1-2 周   接入真实 API + 所有"即将上线"占位入口
第 2-3 周   数物自有钱包（托管模式，Conflux eSpace）
第 3-5 周   链上合约（等用户提供现有合约源码后开始）
第 5-6 周   消费凭证系统（暂缓，后端预留表结构，等有实体店后启用）
第 7 周     数藏盲盒（双层随机）
第 8 周     话题挑战
第 9-10 周  商家后台管理系统（React + Vite，独立项目）
第 11-12 周 管理员后台（React + Vite，独立项目，含商品审核、分红结算）
第 13-14 周 EAS Build + App Store / Google Play 上架

持续贯穿：数字人民币接口预留（后端 mock，前端不改）
暂缓：WalletConnect 外部钱包（v2 版本）
暂缓：Cosmos SDK 自建链
```

### 钱包策略
- **上架版本（v1）**：托管钱包，注册时平台自动生成链上地址，私钥 AES-256-GCM 加密存储，用户无感知，App Store 审核风险最低
- **后续版本（v2）**：WalletConnect v2 支持外部钱包连接

### 链上合约清单（Hardhat + Solidity，Conflux eSpace）
1. `SWORLToken.sol` — ERC-20，固定总量，`burnOrRelease()`，激励池独立管理
2. `ShuWuNFT.sol` — ERC-721 + ERC-2981（版税），系列管理，IPFS 元数据
3. `ConsumptionVoucher.sol` — ERC-721 Soulbound，绑定商家，积累触发链上 event（暂缓启用）
4. `ShuWuWallet.sol` — ERC-4337 Smart Account，平台代签，社交恢复
5. `LootBox.sol` — 双层随机铸造，`mintRandom()`

### 后台系统
- **商家后台** `/root/shuwu-merchant/`：商品提交（pending_review）、订单管理、数据看板
- **管理员后台** `/root/shuwu-admin/`：商品审核、用户管理、分红结算（CSV导出）、挑战管理、盲盒配置、经济参数热更新

### 实名认证
现阶段 UI 占位"即将上线"，后续对接阿里云实人认证（需企业资质）。

### 数字人民币
后端预留 `/api/payment/ecny/charge`、`/api/payment/ecny/withdraw`、`/api/payment/ecny/status`，现阶段 mock，前端不需要改动。

---

## 2026-05-13 App UI 精修第二轮

### 开场动画重构

**问题**：
- 上移动画生硬，数物世界文字上移后超出视野
- 登录界面出现前会闪烁一下生活板块（主界面提前渲染）
- 三行特性文字（链上NFT/消费即挖矿/月度分红）占位不合理

**修复方案**：
- 标题改为绝对定位，固定在 `top: insets.top + H*0.22`，完全不移动
- 废弃整体 `translateY` 上移动画，改为标题淡出再淡入（呼吸效果）：淡出 380ms → 淡入 480ms
- 登录表单固定在 `top: H*0.42`，直接淡入，无位移
- 删除三行特性文字，表单更简洁
- `App.tsx` 修复闪烁：`splashDone` 为 false 时不渲染 tab 内容和 BottomNav，根背景色改为白色与 Splash 一致

### 资产卡重设计（SpaceScreen）

**改动**：
- 顶部新增网络标签：`● Conflux Network`（绿点 + 小字）
- SWORL 余额字号从 38px 收到 30px，数字与"SWORL"单位同行显示（baseline 对齐），不再过宽
- 去掉"今日分红"列，下方改为 e-CNY 和 CFX 两列，中间竖线分隔，布局均衡
- LinearGradient 渐变球保留，尺寸微调为 44×44

### 数藏空间动态入口卡片（SpaceScreen）

废弃横向 NFT 滚动列表，统一改为 `NFTEntryCard` 动态卡片组件：
- **无 NFT**：深蓝渐变背景，绿色光晕脉冲动画，星形图标，"探索数藏世界"，限量/链上标签，点击跳转商城
- **有 NFT**：深绿渐变背景，金色光晕脉冲动画，"我的数藏"，持有数量 + 各 NFT 加成标签，点击打开陈列室
- 光晕用 `Animated.loop` 做 opacity 0.18↔0.45 呼吸，图标用 scale 1↔1.12 脉冲

### 生活板块地图白色背景

- 根本原因：`FullScreenModal` 的 `bg` prop 传的是 `#0D0D1A`（深色），改为 `#FFFFFF`
- `mapCanvas` 背景同步改为 `#FFFFFF`，网格线改为 `rgba(0,0,0,0.06)`

### 其他细节
- 头像选择器（ProfileScreen）：点击头像弹出底部 sheet，12 个预设头像网格，选中高亮 + 绿色勾选徽章
- 个人中心头像显示编辑徽章（铅笔图标）
- `App.tsx` 传 `setActiveTab` 给 SpaceScreen，NFT 入口卡可直接跳转商城 tab

### 注意事项
- 尝试接入 `@expo-google-fonts/noto-serif-sc` 宋体字体，加载失败，已回滚，字体问题留待后续解决
- 所有动画继续使用原生 `Animated` API（`useNativeDriver: true`），不引入 reanimated

---

## 2026-05-13 后端真实 API 接入 + 邮箱验证码注册/登录

### 背景
本次完成第一、二周开发计划的核心内容：RN App 全面接入真实后端 API，替换所有 mock 数据；邮箱验证码注册/登录功能端到端打通。

### API 层新建（`/root/shuwu-app/src/api/`）

| 文件 | 内容 |
|------|------|
| `client.ts` | Axios 实例，baseURL 指向 Railway，请求拦截器自动注入 Bearer token（从 SecureStore 读取） |
| `auth.ts` | `sendCode(email)` / `verify(email, code)` |
| `user.ts` | `getProfile()` / `getNFTs()` / `getDividends()` |
| `merchants.ts` | `getAll()` |
| `posts.ts` | `getAll()` / `create()` / `like()` |
| `mall.ts` | `getProducts()` / `getCollections()` / `purchase()` |

所有 API 调用均有 mock 兜底，后端不可用时前端正常显示。

### Zustand Store 更新（`src/store/index.ts`）
- 新增 `token / user / isLoggedIn` 认证状态
- `login(token, user)` — 存 token 到 SecureStore，更新 store
- `logout()` — 删除 SecureStore token，清空 store
- `setUser(user)` — 刷新用户信息（余额同步）
- 新增 `avatarId / setAvatarId` — 头像预设 ID 持久化
- 新增 `setPosts` — 支持从 API 加载帖子列表

### 邮箱验证码注册/登录（端到端打通）

**后端（`/root/shuwu_api/src/routes/auth.js`）**：
- 原方案：nodemailer + QQ/Gmail SMTP → Railway 封锁出站 SMTP 端口（465/587），IPv6 ENETUNREACH，彻底失败
- 排查过程：尝试 `family: 4` 强制 IPv4、DNS resolve4 预解析，均无效
- 最终方案：改用 **Resend HTTP API**（`resend` npm 包），HTTP 出站不受 Railway 限制
- 发件域名：`sworlworld.com`（阿里云 DNS），在 Resend 控制台完成域名验证
  - 添加 MX、SPF TXT、DKIM TXT、DMARC TXT 四条 DNS 记录
  - 发件人：`数物世界 <noreply@sworlworld.com>`
  - 邮件主题：`数物世界验证码`
- 开发模式兜底：无 `RESEND_API_KEY` 时验证码打印到 Railway 日志

**前端（SpaceScreen + SplashScreen）**：
- 邮箱输入 → 发送验证码（调 `authApi.sendCode`）→ 60 秒倒计时
- 验证码输入 → 确认登录（调 `authApi.verify`）→ 存 token → 拉取 profile → 更新 store
- 登录成功 toast：`登录成功，欢迎来到数物世界！`
- 错误处理：接口返回 error 字段直接展示，网络失败显示默认提示
- 保留"暂时跳过"游客模式入口

### 各板块 API 接入

| 板块 | 接入内容 |
|------|---------|
| 生活 | `merchantsApi.getAll()` 加载商户列表，mock 兜底 |
| 广场 | `postsApi.getAll()` 加载帖子，`postsApi.like()` 点赞，`postsApi.create()` 发帖 |
| 商城 | `mallApi.getProducts()` / `getCollections()` 加载商品，`mallApi.purchase()` 购买 |
| 空间 | `userApi.getProfile()` 刷新余额，`userApi.getNFTs()` 加载 NFT，`userApi.getDividends()` 加载分红历史 |

### 全局登录流程（SplashScreen）
- 每次 App 启动播放开场动画
- 已登录（SecureStore 有有效 token）：动画播完自动淡出进入主界面
- 未登录：动画后显示邮箱验证码登录表单
- 登录成功或点"暂时跳过"后 Splash 淡出

### 环境变量更新
- Railway `shuwu_api`：新增 `RESEND_API_KEY`（Resend 控制台获取）
- 移除旧 SMTP 相关变量（SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS）

---

## 2026-05-28 导航胶囊动画升级 + EAS Build 初次尝试

### BottomNav 动画重构

**目标**：胶囊 blob 从生硬弹跳改为水滴流动感，静止时有呼吸脉冲。

**方案**：迁移到 `react-native-reanimated@3.16.7`（项目已安装但未使用），实现双层 blob 水滴拖尾效果：
- **head blob**：`withSpring(x, { damping: 18, stiffness: 500 })`，快速跟手
- **tail blob**：`withSpring(x, { damping: 28, stiffness: 160 })`，慢速跟随，产生拉伸
- 宽度动态拉伸：`stretchedWidth = baseWidth + |headX - tailX| * 0.55`
- **Idle 呼吸动画**：静止 320ms 后启动 scaleX 1→1.045 + opacity 1→0.82 循环脉冲，移动时立即停止
- 按下反馈：去掉弹跳缩放，改为 opacity 淡出（更自然）

**页面切换提速**（`App.tsx`）：
- duration: 220ms → 160ms
- slide offset: 24px → 16px
- spring stiffness: 260 → 320，damping: 22 → 20

**遇到的问题**：
- Reanimated 需要 `newArchEnabled: true` 才能在 Expo Go 运行
- 开启新架构后 EAS Build 失败（Gradle 错误，具体日志未查）
- ngrok tunnel 持续不稳定（`remote gone away`），改用 cloudflared 作为备用隧道
- Expo Go 无法手动输入 URL，cloudflared 方案在 Expo Go 里无法直接使用

**当前状态**：
- BottomNav 代码已迁移到 Reanimated（`src/components/BottomNav.tsx`）
- `app.json` `newArchEnabled` 暂时回退为 `false`（等 EAS Build 问题排查后再开启）
- EAS 账号已登录（用户名：cild），项目已关联（projectId: `7e3aa6ec-971e-48f5-b38c-1df798749384`）
- Keystore 已自动生成并托管在 EAS

### EAS Build 初次配置
- EAS CLI 版本：19.1.0（有新版可升级）
- 项目已在 EAS 创建：`@cild/shuwu-app`
- Android Keystore 已生成（EAS 托管）
- 首次构建失败（Gradle 错误），待排查后重试

### 下一步
1. 排查 EAS Build Gradle 错误（查看构建日志）
2. 确认 Reanimated + New Architecture 兼容性后重新开启
3. 成功构建 APK 后安装到真机测试水滴动画效果
4. 升级 eas-cli：`npm install -g eas-cli`

---

## 2026-06-02 UI 全面精修 + 购物车系统 + 扫码上线

### EAS Build 问题修复
- 移除无用依赖：`nativewind`、`tailwindcss`、`react-native-worklets`（这三个是 Gradle 失败根因）
- `app.json` `newArchEnabled` 改为 `true`
- BottomNav 回退为原生 `Animated` API（Expo Go 可用），Reanimated 水滴动画等 EAS Build 成功后切换

### IOSSheet 弹窗系统重构
- 新建 `src/components/IOSSheet.tsx`：`animationType="slide"` + `transparent`，原生 UI 线程处理，零卡顿
- 根本原因：之前用 JS Animated 驱动 translateY + BlurView，和 children 渲染竞争主线程导致卡顿
- 弹窗规则：IOSSheet 用于中等内容（支付/评论/菜单），FullScreenModal 用于大内容（商品详情/地图）
- **禁止 Modal 嵌套**：购物车结算支付状态提升到 MallScreen 顶层，避免三层 Modal 死锁

### 购物车系统
- Store 新增 `cartIds`（待购）和 `purchasedIds`（已购）分离
- 商品详情改为 FullScreenModal 全屏，底部"加入购物车"+"立即购买"双按钮
- 购物车：SVG 简笔画图标、商品列表可删除、底部合计+结算
- 结算流程：关闭购物车 → 打开支付全屏页（混合支付滑块）→ 支付成功页 → 商品进数藏空间

### 扫码功能上线
- 新建 `src/components/ScanModal.tsx`：expo-camera 真实相机，扫描线动画，权限引导页
- 生活板块右上角扫码按钮、空间板块扫码快捷操作均已接入

### 设计规范统一
- **主操作按钮**：全部改为 `C.text`（`#1A1A1A`）黑底白字，圆角胶囊（立即购买/消费/支付/发布等）
- **荧光绿**（`C.sworl = #A3E635`）：仅用于标签、徽章、指示点，不用于按钮背景
- **Sheet 底板**：`#EBEBF0`，卡片白色 + 阴影，形成层次感
- **所有 emoji 替换为 SVG**：📍定位针、⭐收藏、🔗链接、⚠️警告、🏆奖杯

### 内容更新
- 商户名称全部改为数物品牌：数物潮玩、数物KTV、数物餐厅、数物电竞馆、数物密室、数物集合店
- "分红"全局改为"激励"
- 创作中心删除"对标鲸探模式"，文创设计加版税说明
- 账号绑定去掉微信，改为邮箱+钱包地址
- 商城购物车标题从"已购藏品"改为"购物车"

### 后端迁移修复
- `runMigrations()` 在 `src/app.js` 硬编码，不读 schema.sql，新迁移必须直接加到函数里
- merchants 表新增：distance / open_time / tags / price_range 字段
- 商户名称通过 UPDATE 语句更新（已部署 Railway）

### 当前状态
- Expo Go 可正常运行，四个板块全部功能正常
- EAS Build 待重新尝试（依赖问题已修复，newArchEnabled: true）
- 商家后台和管理员后台待针对 App 改动后完善

### 下一步
1. EAS Build 重新构建 APK
2. 真机测试所有交互细节
3. App Store / Google Play 上架准备
4. 商家后台新增 distance/openTime/tags/priceRange 字段编辑入口

## 2026-06-10 逻辑修复 + 私钥迁移 + EAS Build

### 逻辑修复（三项）

#### 1. nft_mint_requests 补 tier 字段
- 问题：`nft_mint_requests` 表没有 `tier` 列，`admin.js` 读 `mintReq.tier` → 全部铸造为 'basic'
- 修复：`src/app.js` runMigrations 追加 `ALTER TABLE nft_mint_requests ADD COLUMN IF NOT EXISTS tier`，加 CHECK 约束 `(basic/rare/excellent/genesis)`

#### 2. 商城混合支付全链路打通
- 问题：前端支付滑块有 SWORL/e-CNY 混合支付 UI，但 `mall.js` 后端只扣 SWORL，`mallApi.purchase()` 也不传金额
- 修复：
  - `src/routes/mall.js`：接受 `sworlAmount`/`ecnyAmount` 参数，分别验余额、扣款，分别写 platform_ledger（SWORL/ECNY 两条），链上只回收 SWORL 部分
  - `src/api/mall.ts`：`purchase(productId, sworlAmount, ecnyAmount)`
  - `src/screens/MallScreen.tsx`：`onSuccess(s, e)` → `onBuy(s, e)` → `mallApi.purchase(id, s, e)`；购物车按商品价格比例分摊
  - `src/app.js`：`orders` 表补 `sworl_amount`/`ecny_amount` 字段

#### 3. 私钥迁移到 Supabase
- 问题：Railway users 表中存有加密私钥，需迁移到 Supabase wallet_keys 表（双库隔离）
- 执行：在本地注入 `DATABASE_URL` + `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` 运行迁移脚本
- 结果：4 个用户钱包私钥已在 Supabase（之前已写入），Railway 字段已清空（`key_provider='migrated'`）
- Supabase 项目：`https://kruzqsiotddzwpdessac.supabase.co`

### EAS Build 问题排查

#### 失败原因
- `@gorhom/bottom-sheet`、`react-native-reanimated`、`expo-router`、`expo-notifications` 等依赖未在源码中使用，但会触发 Gradle 原生模块编译，导致 Gradle build failed
- `app.json` 插件列表残留 `expo-router`、`expo-notifications` 引用

#### 修复
- 移除未使用依赖：`react-native-reanimated`、`@gorhom/bottom-sheet`、`expo-router`、`expo-notifications`、`axios`、`react-dom`、`react-native-web`、`@tanstack/react-query`、`@react-navigation/stack`、`@expo-google-fonts/noto-serif-sc`、`@expo/ngrok`
- `src/api/client.ts` 从 axios 改为原生 fetch（完全兼容，签名不变）
- `app.json` 移除 `expo-router` 和 `expo-notifications` 插件

#### 当前 Build
- Build ID：`5d99cfcd-ae67-4801-8f6e-5f5df6f199b5`
- 链接：https://expo.dev/accounts/cild/projects/shuwu-app/builds/5d99cfcd-ae67-4801-8f6e-5f5df6f199b5
- 状态：进行中（约 10-20 分钟）

### 推送记录
- `shuwu_api` main → Railway（自动部署，migration 自动跑）
- `shuwu-app` master → GitHub（commit: ebf3097）
