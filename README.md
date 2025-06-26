# 🎨 Mr. Theme

Sistema de temas moderno com Zustand - Gerenciamento inteligente de tema, favicon automático e performance otimizada.

## ✨ Características

- 🚀 **Performance otimizada** com Zustand (sem Context API)
- 🎯 **Favicon automático** baseado no tema
- 💾 **Persistência** automática no localStorage
- 🌙 **Detecção do tema do sistema** 
- ⚡ **Zero flash** durante hidratação
- 🎨 **Flexível** - funciona com qualquer UI library
- 📱 **SSR/SSG friendly** com Next.js
- 🔧 **TypeScript** nativo
- 📦 **Tiny bundle** - apenas 2kb gzipped

## 📦 Instalação

```bash
npm install mr-theme zustand
# ou
yarn add mr-theme zustand
# ou
pnpm add mr-theme zustand
```

## 🚀 Uso Básico

### 1. Configurar o Provider

```tsx
// app/layout.tsx (Next.js)
import { ThemeProvider } from 'mr-theme'

export default function RootLayout({ children }) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### 2. Usar o tema nos componentes

```tsx
import { useTheme } from 'mr-theme'

function MyComponent() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme()

  return (
    <div>
      <p>Tema atual: {resolvedTheme}</p>
      <button onClick={toggleTheme}>
        Alternar tema
      </button>
    </div>
  )
}
```

### 3. Componente de toggle pronto

```tsx
import { ThemeToggle } from 'mr-theme'

// Básico
<ThemeToggle />

// Com shadcn/ui
import { Button } from '@/components/ui/button'
<ThemeToggle as={Button} variant="outline" size="icon" />

// Customizado
<ThemeToggle
  icons={{ light: <SunIcon />, dark: <MoonIcon /> }}
  showLabel
/>
```

## ⚙️ Configuração Avançada

### Provider com opções

```tsx
<ThemeProvider
  defaultTheme="system"
  storageKey="meu-app-tema"
  enableSystem={true}
  disableTransitionOnChange={false}
  favicons={{
    light: "/favicon-light.ico",
    dark: "/favicon-dark.ico"
  }}
>
  {children}
</ThemeProvider>
```

### Store customizado

```tsx
import { createThemeStore } from 'mr-theme/store'

const useCustomThemeStore = createThemeStore({
  storageKey: 'empresa-tema',
  defaultTheme: 'dark',
  favicons: {
    light: '/icons/light.png',
    dark: '/icons/dark.png'
  }
})
```

## 🎨 Integração com UI Libraries

### shadcn/ui

```tsx
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { ThemeToggle } from 'mr-theme'

<ThemeToggle
  as={Button}
  variant="outline"
  size="icon"
  icons={{
    light: <Sun className="h-4 w-4" />,
    dark: <Moon className="h-4 w-4" />
  }}
/>
```

### Material-UI

```tsx
import { IconButton } from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'

<ThemeToggle
  as={IconButton}
  icons={{
    light: <Brightness4 />,
    dark: <Brightness7 />
  }}
/>
```

### Chakra UI

```tsx
import { IconButton } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

<ThemeToggle
  as={IconButton}
  variant="ghost"
  icons={{
    light: <SunIcon />,
    dark: <MoonIcon />
  }}
/>
```

## 📚 API Reference

### ThemeProvider Props

```tsx
interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: string // 'class' (padrão)
  defaultTheme?: 'light' | 'dark' | 'system' // 'system'
  enableSystem?: boolean // true
  disableTransitionOnChange?: boolean // false
  storageKey?: string // 'mr-theme'
  favicons?: {
    light: string // '/favicon.ico'
    dark: string  // '/favicon-dark.ico'
  }
}
```

### useTheme Hook

```tsx
const {
  theme,         // 'light' | 'dark' | 'system'
  resolvedTheme, // 'light' | 'dark'
  isLoading,     // boolean
  setTheme,      // (theme: Theme) => void
  toggleTheme    // () => void
} = useTheme()
```

### ThemeToggle Props

```tsx
interface ThemeToggleProps {
  as?: React.ComponentType<any> // Componente customizado
  icons?: {
    light: React.ReactNode
    dark: React.ReactNode
  }
  labels?: {
    light: string
    dark: string
  }
  showIcon?: boolean // true
  showLabel?: boolean // false
  [key: string]: any // Props extras para o componente
}
```

## 🎯 Casos de Uso

### Acesso direto ao store

```tsx
import { useThemeStore } from 'mr-theme'

function AdvancedComponent() {
  const { theme, setTheme, resolvedTheme } = useThemeStore()
  
  // Lógica customizada...
}
```

### Múltiplos stores

```tsx
import { createThemeStore } from 'mr-theme/store'

// Store para tema principal
const useMainTheme = createThemeStore({
  storageKey: 'main-theme'
})

// Store para tema do dashboard
const useDashboardTheme = createThemeStore({
  storageKey: 'dashboard-theme',
  defaultTheme: 'dark'
})
```

### Favicon personalizado

```tsx
<ThemeProvider
  favicons={{
    light: "/icons/light-logo.svg",
    dark: "/icons/dark-logo.svg"
  }}
>
  {children}
</ThemeProvider>
```

## 🔧 CSS Setup

Adicione classes CSS para os temas:

```css
/* globals.css */
.light {
  --background: 255 255 255;
  --foreground: 0 0 0;
}

.dark {
  --background: 0 0 0;
  --foreground: 255 255 255;
}

/* ou com CSS variables nativas */
:root.light {
  color-scheme: light;
  --bg: white;
  --text: black;
}

:root.dark {
  color-scheme: dark;
  --bg: black;
  --text: white;
}
```

## 🚀 Performance

- **Bundle size**: ~2kb gzipped
- **Zero runtime overhead** com Zustand
- **No Context re-renders**
- **SSR optimizado**
- **Favicon cache-bust** automático

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, leia nosso guia de contribuição.

## 📄 Licença

MIT © Mr. Theme

---

**Feito com ❤️ para a comunidade React** 