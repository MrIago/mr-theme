// Main exports
export { ThemeProvider, useTheme, useThemeStore } from './provider'
export { createThemeStore } from './store'
export { ThemeToggle } from './toggle'

// Types
export type {
    Theme,
    ResolvedTheme,
    ThemeStore,
    ThemeProviderProps,
    ThemeConfig,
    UseThemeReturn
} from './types'

export type { ThemeToggleProps } from './toggle'

// Default store (conveniente para uso simples)
export { useThemeStore as useDefaultThemeStore } from './store' 