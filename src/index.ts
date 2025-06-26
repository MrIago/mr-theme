// 🎨 Mr-Theme - Advanced Theme System for React/Next.js
// Created by Mr (mister)
// Faster than next-themes with automatic favicon management

// Store
export { useThemeStore } from './theme-store'

// Hook
export { useTheme } from './use-theme'

// Components
export { ThemeProvider } from './theme-provider'
export { ThemeToggle } from './theme-toggle'

// Types
export type Theme = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

export interface ThemeStore {
    theme: Theme
    resolvedTheme: ResolvedTheme
    isLoading: boolean
    setTheme: (theme: Theme) => void
    toggleTheme: () => void
    updateResolvedTheme: (resolved: ResolvedTheme) => void
    updateFavicon: (theme: ResolvedTheme) => void
    initializeTheme: () => void
}

export interface ThemeProviderProps {
    children: React.ReactNode
    attribute?: string
    defaultTheme?: string
    enableSystem?: boolean
    disableTransitionOnChange?: boolean
}

// Version
export const version = '1.0.0' 