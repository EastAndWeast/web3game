# Web3 学习路线图 - 关卡 4 (交易集市) 实施计划

## 目标
实现 "Marketplace" (交易集市) 关卡，教用户如何进行 Token Swap (代币兑换)。

## 交互设计
1. **任务目标**: 将少量 ETH 兑换为游戏代币 "Web3 Adventure Token" (W3A)。
2. **操作流程**:
   - 用户进入关卡。
   - 显示 Swap 界面 (类似 Uniswap)。
   - 输入 ETH 金额 (如 0.0001)。
   - 自动计算可获得的 W3A (汇率: 1 ETH = 1000 W3A)。
   - 点击 "Swap" 按钮。
   - 唤起钱包签名 (发送 ETH 到模拟的 DEX 池子地址)。
   - 交易成功后，显示 "You received 0.1 W3A"，关卡完成。

## 技术方案
1. **模拟 DEX**: 
   - 不部署真实合约，而是向一个固定的 "DEX Pool Address" 发送 ETH。
   - 前端计算汇率展示。
2. **UI 组件**:
   - 输入框 (From/To)。
   - 汇率显示。
   - 交互按钮。

## 拟议变更
### 1. 新增组件
- [NEW] `src/components/games/SwapGame.tsx`
    - 双向绑定输入框 (虽然只有 ETH -> W3A 单向操作)。
    - 汇率逻辑。

### 2. 路由与配置
- [MODIFY] `src/app/[locale]/level/[id]/page.tsx`
    - 注册 `swap` 路由。

### 3. 多语言
- [MODIFY] `src/messages/en.json` & `zh.json`
    - 添加 Swap 关卡文案。

## 验证计划
- 进入关卡 4。
- 输入金额，确认汇率计算正确。
- 点击 Swap，确认钱包交互。
- 确认通关状态。
