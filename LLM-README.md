# mr-theme - Technical Documentation for LLMs

**mr-theme** is a copy-paste React theme management system built and tested on Next.js 15 with React 19, featuring zero configuration, SSR support, and automatic favicon updates.

This documentation provides comprehensive technical details for Large Language Models to understand, implement, and customize the theme switching functionality in Next.js applications with React 19 compatibility.

## Table of Contents
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [How to use](#how-to-use)

## Dependencies

### Required Dependencies
```json
{
  "react": "^19.x.x",
  "next": "^15.x.x", 
  "zustand": "^4.x.x",
  "lucide-react": "^0.x.x"
}
```

### Compatibility
- **Tested environment**: React 19 + Next.js 15
- **Compatible with**: React 18+ and Next.js 13+

### Optional Dependencies
- `@types/react` for TypeScript projects
- Any CSS framework or design system for button styling

## Configuration

### Basic Setup
1. **Install dependencies**: `npm install zustand lucide-react`
2. **Copy files**: Place the `mr-theme` folder in your project
3. **Import types**: All TypeScript types are exported from the main index

### Theme Configuration Options
```typescript
interface ThemeConfig {
  attribute: string      // 'class' | 'data-theme' | custom attribute
  defaultTheme: Theme   // 'light' | 'dark' | 'system'
  enableSystem: boolean // Enable/disable system theme detection
}
```

### Default Configuration
```typescript
{
  attribute: 'class',        // Applies theme as CSS class
  defaultTheme: 'system',    // Uses OS preference
  enableSystem: true        // Allows system theme detection
}
```

## How to use

### Basic Implementation

#### 1. Wrap Application with ThemeProvider (Next.js App Router)
```typescript
// app/layout.tsx
import { ThemeProvider } from './mr-theme'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My App',
  description: 'Built with React 19, Next.js 15 and mr-theme',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"          // Optional: 'class' | 'data-theme'
          defaultTheme="system"      // Optional: 'light' | 'dark' | 'system'
          enableSystem={true}        // Optional: boolean
          disableTransitionOnChange={false} // Optional: prevents flash
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

#### 2. Add Theme Toggle Button
```typescript
import { ThemeToggle } from './mr-theme'

export function Header() {
  return (
    <header>
      <ThemeToggle 
        size="icon"           // Optional: 'sm' | 'icon' | 'lg'
        variant="outline"     // Optional: 'outline' | 'ghost' | 'secondary'
        showText={false}      // Optional: shows text alongside icon
        className="custom-class" // Optional: additional CSS classes
      />
    </header>
  )
}
```

### Advanced Usage

#### Custom Theme Hook
```typescript
import { useThemeStore } from './mr-theme'

function CustomComponent() {
  const { 
    theme,           // Current theme: 'light' | 'dark' | 'system'
    resolvedTheme,   // Actual theme: 'light' | 'dark' (never 'system')
    isLoading,       // Loading state during initialization
    setTheme,        // Function to set specific theme
    toggleTheme,     // Function to toggle between light/dark
    config          // Current configuration
  } = useThemeStore()

  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Resolved theme: {resolvedTheme}</p>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('system')}>System</button>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  )
}
```

#### Simple Toggle (No UI Dependencies)
```typescript
import { SimpleThemeToggle } from './mr-theme'

export function MinimalHeader() {
  return (
    <header>
      <SimpleThemeToggle className="my-custom-class" />
    </header>
  )
}
```

### Configuration Use Cases

#### Use Case 1: Data Attribute Instead of CSS Classes
```typescript
<ThemeProvider attribute="theme">
  {/* Results in <html data-theme="dark"> instead of <html class="dark"> */}
</ThemeProvider>
```

#### Use Case 2: Disable System Theme Detection
```typescript
<ThemeProvider 
  enableSystem={false}
  defaultTheme="light"
>
  {/* Only allows manual light/dark switching */}
</ThemeProvider>
```

#### Use Case 3: Prevent Transition Flash
```typescript
<ThemeProvider disableTransitionOnChange={true}>
  {/* Temporarily disables CSS transitions during theme changes */}
</ThemeProvider>
```

#### Use Case 4: Custom Favicon Path
Update `updateFavicon` function in `store.ts`:
```typescript
// Customize favicon paths
favicon.href = theme === 'dark' ? '/icons/favicon-dark.ico' : '/icons/favicon-light.ico'
```

#### Use Case 5: Custom Storage Key
Update `persist` configuration in `store.ts`:
```typescript
name: 'my-app-theme-store' // Change localStorage key
```

### Theme Application Methods

#### Method 1: CSS Classes (Default)
```typescript
// Configuration
<ThemeProvider attribute="class" />

// Resulting HTML
<html class="dark">
// or
<html class="light">
```

#### Method 2: Data Attributes
```typescript
// Configuration  
<ThemeProvider attribute="theme" />

// Resulting HTML
<html data-theme="dark">
// or  
<html data-theme="light">
```

#### Method 3: Custom Attribute
```typescript
// Configuration
<ThemeProvider attribute="color-scheme" />

// Resulting HTML
<html data-color-scheme="dark">
```

### CSS Integration Examples

#### With CSS Classes (Recommended)
```css
/* Global styles */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}
```

#### With Data Attributes
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
}

[data-theme="dark"] {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
}
```

### State Management Details

#### Store Structure
```typescript
interface ThemeStore {
  // Current State
  theme: 'light' | 'dark' | 'system'        // User's choice
  resolvedTheme: 'light' | 'dark'           // Actual applied theme
  isLoading: boolean                         // Initialization state
  config: ThemeConfig                        // Configuration options

  // Actions
  setTheme: (theme: Theme) => void           // Set specific theme
  toggleTheme: () => void                    // Toggle light/dark
  updateResolvedTheme: (resolved) => void    // Internal use
  updateFavicon: (theme) => void             // Updates favicon
  initializeTheme: () => void                // Initialization
  setThemeConfig: (config) => void           // Update configuration
}
```

#### Persistence
- Uses Zustand persist middleware
- Stores in localStorage with key `mr-theme-store`
- Persists only `theme` and `config` properties
- Automatically restores on page reload

#### SSR Compatibility
- Uses loading state to prevent hydration mismatches
- Hides content during theme initialization
- Optimized specifically for Next.js 13+ App Router
- Compatible with Next.js Pages Router and other SSR frameworks
- Includes `suppressHydrationWarning` attribute for Next.js HTML element

### Complete Next.js 15 Integration Example

```typescript
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from './mr-theme'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Next.js App',
  description: 'Built with React 19, Next.js 15 and mr-theme',
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
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

// components/header.tsx
import { ThemeToggle, useThemeStore } from '../mr-theme'

export function Header() {
  const { resolvedTheme } = useThemeStore()
  
  return (
    <header className={`header ${resolvedTheme}`}>
      <h1>My Next.js App</h1>
      <ThemeToggle 
        size="icon"
        variant="outline"
        showText={false}
      />
    </header>
  )
}

// app/page.tsx
import { Header } from '../components/header'

export default function Home() {
  return (
    <main>
      <Header />
      <div className="container mx-auto p-4">
        <h2>Welcome to my themed app!</h2>
      </div>
    </main>
  )
}

// app/globals.css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --border: 0 0% 89.8%;
  --primary: 221.2 83.2% 53.3%;
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  --border: 0 0% 14.9%;
  --primary: 217.2 91.2% 59.8%;
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  border-color: hsl(var(--border));
  transition: background-color 0.3s ease;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid hsl(var(--border));
}
```

### Next.js Pages Router Example

```typescript
// pages/_app.tsx
import type { AppProps } from 'next/app'
import { ThemeProvider } from '../mr-theme'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange={true}
    >
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

This system provides complete theme management with automatic persistence, SSR safety, system theme detection, and favicon updates. 