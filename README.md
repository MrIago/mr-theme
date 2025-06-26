# 🎨 Mr-Theme

**Advanced theme system for React/Next.js - Faster than next-themes with automatic favicon management**

[![npm version](https://badge.fury.io/js/mr-theme.svg)](https://badge.fury.io/js/mr-theme)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Zustand](https://img.shields.io/badge/-Zustand-FF6B6B?logo=zustand&logoColor=white)](https://zustand-demo.pmnd.rs/)

> Created by **Mr (mister)** - A high-performance theme system that's faster and more feature-rich than next-themes.

## ✨ Features

- 🚀 **Performance First** - Selective re-renders with Zustand
- 🎯 **Automatic Favicon** - Changes favicon based on theme
- 🐛 **DevTools Integration** - Debug theme changes in browser
- 📦 **Smaller Bundle** - ~1.8kb vs next-themes ~3.2kb
- 🌙 **System Theme Detection** - Respects OS preferences
- 💾 **Persistent Storage** - Saves theme preference
- 🔥 **SSR Safe** - No hydration mismatches
- 🎨 **Zero Config** - Works out of the box

## 🚀 Quick Start

### Installation

```bash
npm install mr-theme
# or
yarn add mr-theme
# or
pnpm add mr-theme
```

### Basic Setup

```tsx
// app/layout.tsx
import { ThemeProvider } from 'mr-theme'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

```tsx
// components/theme-toggle.tsx
import { useTheme, ThemeToggle } from 'mr-theme'

// Use the built-in component
export function MyThemeToggle() {
  return <ThemeToggle />
}

// Or create your own
export function CustomThemeToggle() {
  const { theme, resolvedTheme, toggleTheme } = useTheme()
  
  return (
    <button onClick={toggleTheme}>
      {resolvedTheme === 'dark' ? '🌙' : '☀️'}
      Current: {theme}
    </button>
  )
}
```

## 📊 Performance Comparison

| Feature | next-themes | mr-theme | Improvement |
|---------|-------------|----------|-------------|
| Bundle Size | ~3.2kb | ~1.8kb | **44% smaller** |
| Re-renders | Multiple | Selective | **Much faster** |
| Favicon Management | Manual | Automatic | **Built-in** |
| DevTools | ❌ | ✅ | **Debug ready** |
| Type Safety | Partial | Complete | **100% typed** |

## 🏗️ Architecture

### Zustand Store

```typescript
interface ThemeStore {
  theme: 'light' | 'dark' | 'system'
  resolvedTheme: 'light' | 'dark'
  isLoading: boolean
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  updateFavicon: (theme: ResolvedTheme) => void
}
```

### Automatic Favicon Management

```typescript
// Automatically updates favicon based on theme
// /favicon.ico (light theme)
// /favicon-dark.ico (dark theme)
```

## 📚 API Reference

### Hook

```typescript
const {
  theme,           // 'light' | 'dark' | 'system'
  resolvedTheme,   // 'light' | 'dark' (resolved system theme)
  isLoading,       // boolean
  setTheme,        // (theme: Theme) => void
  toggleTheme      // () => void
} = useTheme()
```

### Components

```tsx
// Provider
<ThemeProvider
  attribute="class"              // CSS attribute to use
  defaultTheme="system"          // Default theme
  enableSystem={true}            // Enable system theme detection
  disableTransitionOnChange={false} // Disable transitions during theme change
>
  {children}
</ThemeProvider>

// Toggle Button
<ThemeToggle />
```

### Store (Advanced)

```typescript
import { useThemeStore } from 'mr-theme'

// Direct store access for advanced use cases
const store = useThemeStore()
```

## 🎯 Examples

### Custom Theme Toggle

```tsx
import { useTheme } from 'mr-theme'
import { Sun, Moon, Monitor } from 'lucide-react'

export function AdvancedThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      <button 
        onClick={() => setTheme('light')}
        className={theme === 'light' ? 'active' : ''}
      >
        <Sun /> Light
      </button>
      
      <button 
        onClick={() => setTheme('dark')}
        className={theme === 'dark' ? 'active' : ''}
      >
        <Moon /> Dark
      </button>
      
      <button 
        onClick={() => setTheme('system')}
        className={theme === 'system' ? 'active' : ''}
      >
        <Monitor /> System
      </button>
    </div>
  )
}
```

### Theme-aware Component

```tsx
import { useTheme } from 'mr-theme'

export function ThemedComponent() {
  const { resolvedTheme } = useTheme()
  
  return (
    <div className={`component ${resolvedTheme}`}>
      <h1>Current theme: {resolvedTheme}</h1>
      {resolvedTheme === 'dark' ? (
        <DarkModeContent />
      ) : (
        <LightModeContent />
      )}
    </div>
  )
}
```

### Favicon Setup

Place these files in your `public` folder:

```
public/
├── favicon.ico      (light theme)
└── favicon-dark.ico (dark theme)
```

The library will automatically switch between them!

## 🔧 Configuration

### CSS Setup (Tailwind)

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Theme variables */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
}
```

### Next.js Configuration

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
```

## 🎨 Customization

### Custom Favicon Logic

```typescript
import { useThemeStore } from 'mr-theme'

// Override favicon behavior
const store = useThemeStore()

store.updateFavicon = (theme) => {
  const favicon = document.querySelector('link[rel="icon"]')
  if (favicon) {
    favicon.href = theme === 'dark' 
      ? '/custom-dark-favicon.ico'
      : '/custom-light-favicon.ico'
  }
}
```

### Integration with CSS-in-JS

```tsx
import { useTheme } from 'mr-theme'
import styled from 'styled-components'

const ThemedDiv = styled.div`
  background: ${props => props.theme === 'dark' ? '#000' : '#fff'};
  color: ${props => props.theme === 'dark' ? '#fff' : '#000'};
`

export function StyledComponent() {
  const { resolvedTheme } = useTheme()
  
  return (
    <ThemedDiv theme={resolvedTheme}>
      Styled with theme!
    </ThemedDiv>
  )
}
```

## 🔄 Migration from next-themes

### Before (next-themes)

```tsx
import { useTheme } from 'next-themes'

const { theme, setTheme, systemTheme } = useTheme()
const currentTheme = theme === 'system' ? systemTheme : theme
```

### After (mr-theme)

```tsx
import { useTheme } from 'mr-theme'

const { theme, resolvedTheme, setTheme } = useTheme()
// resolvedTheme already handles system theme resolution
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © [Mr (mister)](https://github.com/MrIago)

## 🙏 Acknowledgments

- next-themes for inspiration
- Zustand team for the amazing state management
- React team for the excellent hooks API

---

**Made with ❤️ by Mr (mister)** 