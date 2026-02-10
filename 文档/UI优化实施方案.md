# Web3 学习路线图 - UI/UX 优化实施计划

## 目标
基于 `ui-ux-pro-max` 生成的 "Web3 Adventure" 设计系统，将现有 UI 升级为赛博朋克/未来主义风格。

## 设计系统概览
- **风格**: Cyberpunk Glassmorphism
- **核心色板**: Deep Space (`#050510`), Cyber Blue (`#00F0FF`), Electric Purple (`#7000FF`)
- **字体**: Orbitron (标题), Rajdhani/Inter (正文)

## 拟议变更

### 1. 基础配置更新
- [NEW] **Tailwind Config**:
    - 扩展颜色配置：添加 `cyber-blue`, `electric-purple`, `deep-space`。
    - 配置字体：引入 `Orbitron` 和 `Rajdhani` Google Fonts。
- [MODIFY] **Global CSS**:
    - 设置全局背景色为 `#050510`。
    - 添加背景网格/光晕效果 (Mesh Gradients)。

### 2. 组件样式升级

#### LearningMap 组件
- **节点样式**: 使用 Neon Glow 效果替代简单的 Tailwind 颜色。
- **连接线**:实现发光线条效果。
- **背景**: 增加动态粒子或网格背景。

#### 通用 UI 组件
- **Button**: 实现 `btn-neon` 变体 (渐变背景 + 阴影)。
- **Card**: 实现 `card-glass` 变体 (磨砂玻璃效果 + 边框高亮)。
- **ConnectButton**: 自定义 RainbowKit 主题以匹配深色风格。

### 3. 页面布局优化
- **首页**:
    - 标题增加 Glitch 效果或渐变文字。
    - 调整布局间距，增加呼吸感。
- **游戏页**:
    - 统一使用 Glass 容器包裹游戏内容。

## 验证计划
- 视觉验证：确认颜色、字体、阴影效果与设计系统一致。
- 响应式验证：确保在移动端即使有复杂背景也能清晰阅读。
