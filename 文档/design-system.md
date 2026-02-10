# Design System: Web3 Adventure

## Core Concept
**Theme**: Cyberpunk / Neo-Futuristic
**Primary Style**: Glassmorphism with neon accents
**Mode**: Dark Mode Only

## Color Palette

### Primary (Neon Accents)
- **Primary**: `#00F0FF` (Cyber Blue)
- **Secondary**: `#7000FF` (Electric Purple)
- **Accent**: `#FF003C` (Neon Red)

### Backgrounds
- **Bg-Base**: `#050510` (Deep Space)
- **Bg-Card**: `rgba(20, 20, 40, 0.6)` (Glass)
- **Bg-Overlay**: `rgba(0, 240, 255, 0.1)`

### Typography
- **Headings**: `Orbitron` (Futuristic Sans)
- **Body**: `Rajdhani` or `Inter` (Tech Sans)
- **Code**: `JetBrains Mono`

## UI Component Styles

### Cards (Glassmorphism)
```css
.card-glass {
  background: rgba(20, 20, 40, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 240, 255, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
}
```

### Buttons (Neon Glow)
```css
.btn-neon {
  background: linear-gradient(90deg, #00F0FF, #7000FF);
  color: #000;
  font-weight: bold;
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.5);
  border: none;
}
.btn-neon:hover {
  box-shadow: 0 0 25px rgba(0, 240, 255, 0.8);
}
```

### Map Nodes
- **Locked**: Opacity 0.3, Grayscale.
- **Active**: Pulsing Neon Border (`#00F0FF`).
- **Completed**: Gold/Green Glow.

## Layout Principles
- **Grid**: 12-column fluid grid.
- **Spacing**: Generous padding (breathable interface).
- **Decorations**: Abstract geometric shapes, glowing mesh gradients in background.
