# Web3 学习路线图 - 关卡 5 (艺术画廊) 实施计划

## 目标
实现 "Art Gallery" (艺术画廊) 关卡，教用户如何铸造 (Mint) 第一个 NFT。

## 交互设计
1. **任务目标**: 铸造 "Web3 Explorer Badge" NFT。
2. **操作流程**:
   - 用户进入关卡。
   - 展示一个未铸造的 NFT 占位符 (Mystery Box)。
   - 点击 "Mint" 按钮 (Cost: 0.0001 ETH)。
   - 唤起钱包签名。
   - 交易成功后，播放开箱动画，展示精美的 NFT 图片。
   - 关卡完成，整个路线图通过 (All Clear)。

## 技术方案
1. **模拟 Mint**: 
   - 向 "NFT Contract Address" 发送 ETH。
   - 前端无需真实监听合约事件，仅通过交易回执确认。
2. **UI 组件**:
   - NFT Card (状态: Unminted -> Minting -> Revealed)。
   - 烟花庆祝。

## 拟议变更
### 1. 新增组件
- [NEW] `src/components/games/NftGame.tsx`
    - 展示 NFT 图片 (使用生成或现有 placeholder)。

### 2. 路由与配置
- [MODIFY] `src/app/[locale]/level/[id]/page.tsx`
    - 注册 `nft` 路由。

### 3. 多语言
- [MODIFY] `src/messages/en.json` & `zh.json`
    - 添加 NFT 关卡文案。

## 验证计划
- 进入关卡 5。
- 点击 Mint。
- 确认 NFT 展示成功。
- 确认全通关状态。
