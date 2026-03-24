/**
 * ShuWu Wallet Core - V1.95 (终极修复版)
 * 解决问题：加载顺序竞争、按钮绑定失效、Buffer 缺失保护
 */
import { Conflux } from 'js-conflux-sdk';

// 初始化区块链连接
const cfx = new Conflux({
    url: 'https://evm.confluxrpc.com',
    networkId: 1030,
});

const ShuWuWallet = {
    currentAccount: null,

    // 初始化方法
    init() {
        console.log("%c>>> 数物大脑 | 神经连接激活成功", "color: #A3E635; font-weight: bold;");
        this.bindUIActions();
    },

    // 绑定交互：采用事件代理模式，彻底解决点不动的问题
    bindUIActions() {
        document.body.addEventListener('click', (e) => {
            // 向上寻找最近的按钮容器
            const btn = e.target.closest('.action-item');
            if (!btn) return;

            this.vibrate();

            // 获取点击的按钮在网格中的索引 (0:转账, 1:收款, 2:扫码, 3:兑换)
            const allBtns = Array.from(document.querySelectorAll('.action-item'));
            const index = allBtns.indexOf(btn);

            console.log("点击了功能按钮索引:", index);

            switch(index) {
                case 0: alert("【数物转账】模块准备中...\n功能：发送 SWORL 或元资产。"); break;
                case 1: this.generateNewWallet(); break; // 收款核心功能
                case 2: alert("【数物扫码】模块准备中...\n功能：识别线下商户收款码。"); break;
                case 3: alert("【数物兑换】模块准备中...\n功能：SWORL ↔ 元 实时汇率兑换。"); break;
            }
        });

        // 绑定地址栏点击复制
        const addrEl = document.getElementById('userAddress');
        if (addrEl) {
            addrEl.addEventListener('click', () => {
                if (this.currentAccount) {
                    navigator.clipboard.writeText(this.currentAccount.address);
                    alert("地址已复制到剪贴板");
                }
            });
        }
    },

    // 核心逻辑：生成钱包
    generateNewWallet() {
        console.log("正在通过 SDK 生成新账户...");
        try {
            // 检查 Buffer 环境（如果 polyfills 没配置好，这里会报错并跳入 catch）
            const account = cfx.wallet.addRandom();
            
            this.currentAccount = {
                address: account.address,
                privateKey: account.privateKey
            };

            this.syncDisplay();
            
        } catch (error) {
            console.error("生成失败，详细错误:", error);
            alert("加密环境异常！\n请确认：\n1. 运行了 npm install vite-plugin-node-polyfills\n2. vite.config.js 配置了 globals");
        }
    },

    // 同步 UI 数据
    syncDisplay() {
        if (!this.currentAccount) return;

        // 1. 更新地址 (截断显示)
        const addrEl = document.getElementById('userAddress');
        if (addrEl) {
            const a = this.currentAccount.address;
            addrEl.innerText = `${a.substring(0, 8)}...${a.substring(a.length - 6)}`;
            addrEl.style.color = "var(--active-green)";
            addrEl.style.opacity = "1";
        }

        // 2. 余额清零（针对新账户）
        const sworlEl = document.getElementById('sworlBalance');
        const cnyEl = document.getElementById('cnyBalance');
        if (sworlEl) sworlEl.innerHTML = `0<span>SWORL</span>`;
        if (cnyEl) cnyEl.innerHTML = `0.00<span style="color:var(--ecny-red)">元</span>`;

        // 3. 卡片视觉反馈
        const card = document.querySelector('.grand-asset-card');
        if (card) {
            card.style.transition = "border 0.3s";
            card.style.border = "2px solid var(--active-green)";
            setTimeout(() => card.style.border = "1px solid rgba(0,0,0,0.02)", 1000);
        }
    },

    vibrate() {
        if (navigator.vibrate) navigator.vibrate(12);
    }
};

// 启动引擎
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ShuWuWallet.init());
} else {
    ShuWuWallet.init();
}
