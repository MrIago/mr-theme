# 🎨 mr-theme

A **zero-config** React theme management system built and tested on **Next.js 15** with **React 19**.

> **React 19 + Next.js 15** • **Copy-paste friendly** • **SSR safe** • **TypeScript ready** • **Auto favicon updates**

## ✨ Features

- 🚀 **React 19 ready** - Built and tested on React 19 + Next.js 15
- 🎯 **Copy-paste ready** - Drop into any Next.js project  
- 🌙 **System theme detection** - Respects OS preferences
- 💾 **Persistent state** - Remembers user choice across sessions
- ⚡ **App Router optimized** - Perfect for Next.js 13+ App Router
- 🎨 **Auto favicon updates** - Changes with theme automatically
- 📱 **SSR/SSG compatible** - No hydration mismatches
- 🔧 **Fully customizable** - Adapt to your design system

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install zustand lucide-react
```

### 2. Copy the theme system

Download or copy the `mr-theme` folder into your project.

### 3. Wrap your app (Next.js App Router)

```tsx
// app/layout.tsx
import { ThemeProvider } from './mr-theme'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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

### 4. Add a theme toggle

```tsx
// components/header.tsx
import { ThemeToggle } from '../mr-theme'

export function Header() {
  return (
    <header>
      <h1>My Next.js App</h1>
      <ThemeToggle />
    </header>
  )
}
```

### 5. Style your app

```css
/* app/globals.css */
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  transition: background-color 0.3s ease;
}
```

That's it! Your Next.js 15 + React 19 app now has a fully working theme system. 🎉

## 📖 Examples

### Basic Usage

```tsx
import { ThemeProvider, ThemeToggle } from './mr-theme'

function App() {
  return (
    <ThemeProvider>
      <div>
        <header>
          <h1>My App</h1>
          <ThemeToggle size="icon" variant="outline" />
        </header>
        <main>
          <p>Your content here...</p>
        </main>
      </div>
    </ThemeProvider>
  )
}
```

### Custom Hook Usage

```tsx
import { useThemeStore } from './mr-theme'

function ThemeStatus() {
  const { theme, resolvedTheme, toggleTheme } = useThemeStore()
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Resolved: {resolvedTheme}</p>
      <button onClick={toggleTheme}>
        Switch to {resolvedTheme === 'light' ? 'dark' : 'light'}
      </button>
    </div>
  )
}
```

### Simple Toggle (No Dependencies)

```tsx
import { SimpleThemeToggle } from './mr-theme'

function MinimalApp() {
  return (
    <div>
      <SimpleThemeToggle />
      <p>Clean, emoji-based theme toggle</p>
    </div>
  )
}
```

## ⚙️ Configuration

### ThemeProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `attribute` | `string` | `"class"` | How to apply theme (`"class"` or `"data-theme"`) |
| `defaultTheme` | `"light" \| "dark" \| "system"` | `"system"` | Default theme when no preference is saved |
| `enableSystem` | `boolean` | `true` | Enable system theme detection |
| `disableTransitionOnChange` | `boolean` | `false` | Disable transitions during theme changes |

### ThemeToggle Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "icon" \| "lg"` | `"icon"` | Button size |
| `variant` | `"outline" \| "ghost" \| "secondary"` | `"outline"` | Button style variant |
| `showText` | `boolean` | `false` | Show text alongside icon |
| `className` | `string` | `""` | Additional CSS classes |

### Examples

#### Use data attributes instead of classes

```tsx
<ThemeProvider attribute="theme">
  {/* Results in <html data-theme="dark"> */}
</ThemeProvider>
```

#### Disable system theme detection

```tsx
<ThemeProvider enableSystem={false} defaultTheme="light">
  {/* Only manual light/dark switching */}
</ThemeProvider>
```

#### Prevent transition flash

```tsx
<ThemeProvider disableTransitionOnChange={true}>
  {/* Smooth theme changes */}
</ThemeProvider>
```

## 🎨 CSS Integration

### With CSS Custom Properties (Recommended)

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --border: 214.3 31.8% 91.4%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  --border: 217.2 32.6% 17.5%;
}

/* Use in your components */
.card {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
}
```

### With Tailwind CSS

```css
/* tailwind.config.js */
module.exports = {
  darkMode: 'class', // or 'media'
  // ... rest of config
}
```

```tsx
function Card() {
  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
      Card content
    </div>
  )
}
```

## 🔧 Customization

### Custom Favicon Paths

Edit `mr-theme/store/store.ts`:

```typescript
// In updateFavicon function
favicon.href = theme === 'dark' 
  ? '/icons/favicon-dark.ico' 
  : '/icons/favicon-light.ico'
```

### Custom Storage Key

Edit `mr-theme/store/store.ts`:

```typescript
// In persist configuration
name: 'my-app-theme-preferences'
```

### Custom Theme Values

Extend the theme types in `mr-theme/types/types.ts`:

```typescript
export type Theme = 'light' | 'dark' | 'system' | 'auto' | 'blue'
```

## 🏗️ Framework Support

### Next.js 15 + App Router (Recommended)

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from './mr-theme'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My App',
  description: 'Built with Next.js 15 and mr-theme',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
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

### Next.js Pages Router

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app'
import { ThemeProvider } from '../mr-theme'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
```

### Vite + React

```tsx
// main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './mr-theme'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
```

## 🚨 Troubleshooting

### Hydration Mismatch (SSR)

The theme system handles this automatically by showing a loading state during hydration.

### Custom CSS Not Working

Make sure your CSS custom properties are defined in `:root` and `.dark` selectors:

```css
:root {
  --my-color: #000;
}

.dark {
  --my-color: #fff;
}
```

### Theme Not Persisting

Check that localStorage is available and not blocked. The theme is saved automatically.

## 📦 Dependencies

- **react** - React 19 (tested) | React 18+ (compatible)
- **next** - Next.js 15 (tested) | Next.js 13+ (compatible)
- **zustand** - State management
- **lucide-react** - Icons (only for ThemeToggle component)

## 📝 License

MIT - feel free to use in any project!

## 🤝 Contributing

This is a copy-paste theme system. Feel free to modify and adapt to your needs!

---

**Made with ❤️ for the React community** 