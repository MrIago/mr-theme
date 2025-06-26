export type Theme = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

export interface ThemeStore {
    // Estado
    theme: Theme
    resolvedTheme: ResolvedTheme
    isLoading: boolean

    // Actions
    setTheme: (theme: Theme) => void
    toggleTheme: () => void
    updateResolvedTheme: (resolved: ResolvedTheme) => void
    updateFavicon: (theme: ResolvedTheme) => void
    initializeTheme: () => () => void
}

export interface ThemeProviderProps {
    children: React.ReactNode
    attribute?: string
    defaultTheme?: Theme
    enableSystem?: boolean
    disableTransitionOnChange?: boolean
    storageKey?: string
    favicons?: {
        light: string
        dark: string
    }
}

export interface ThemeConfig {
    storageKey: string
    defaultTheme: Theme
    enableSystem: boolean
    favicons: {
        light: string
        dark: string
    }
}

export interface UseThemeReturn {
    theme: Theme
    resolvedTheme: ResolvedTheme
    isLoading: boolean
    setTheme: (theme: Theme) => void
    toggleTheme: () => void
} 