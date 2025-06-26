import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { Theme, ResolvedTheme, ThemeStore, ThemeConfig } from './types'

const DEFAULT_CONFIG: ThemeConfig = {
    storageKey: 'mr-theme',
    defaultTheme: 'system',
    enableSystem: true,
    favicons: {
        light: '/favicon.ico',
        dark: '/favicon-dark.ico'
    }
}

/**
 * Cria store Zustand para gerenciamento de tema
 * 
 * @param config - Configuração opcional do tema
 * @returns Store configurado
 * 
 * @example
 * ```tsx
 * const useThemeStore = createThemeStore({
 *   storageKey: 'my-app-theme',
 *   defaultTheme: 'dark',
 *   favicons: {
 *     light: '/light-icon.png',
 *     dark: '/dark-icon.png'
 *   }
 * })
 * ```
 */
export function createThemeStore(config: Partial<ThemeConfig> = {}) {
    const finalConfig: ThemeConfig = { ...DEFAULT_CONFIG, ...config }

    return create<ThemeStore>()(
        devtools(
            persist(
                (set, get) => ({
                    // Estado inicial
                    theme: finalConfig.defaultTheme,
                    resolvedTheme: 'light' as ResolvedTheme,
                    isLoading: true,

                    // Seta tema e atualiza favicon
                    setTheme: (theme: Theme) => {
                        set({ theme }, false, 'setTheme')

                        // Aplica tema no documento
                        const root = document.documentElement
                        root.classList.remove('light', 'dark')

                        let resolvedTheme: ResolvedTheme

                        if (theme === 'system' && finalConfig.enableSystem) {
                            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
                            resolvedTheme = systemTheme
                            root.classList.add(systemTheme)
                        } else {
                            resolvedTheme = theme as ResolvedTheme
                            root.classList.add(theme)
                        }

                        // Atualiza estado resolvido e favicon
                        get().updateResolvedTheme(resolvedTheme)
                        get().updateFavicon(resolvedTheme)
                    },

                    // Alterna entre light/dark (ignora system)
                    toggleTheme: () => {
                        const { theme, resolvedTheme } = get()
                        const newTheme = theme === 'system'
                            ? (resolvedTheme === 'light' ? 'dark' : 'light')
                            : (theme === 'light' ? 'dark' : 'light')

                        get().setTheme(newTheme)
                    },

                    // Atualiza tema resolvido (usado internamente)
                    updateResolvedTheme: (resolved: ResolvedTheme) => {
                        set({ resolvedTheme: resolved }, false, 'updateResolvedTheme')
                    },

                    // Atualiza favicon baseado no tema
                    updateFavicon: (theme: ResolvedTheme) => {
                        // Remove favicons existentes
                        const existingFavicons = document.querySelectorAll('link[rel="icon"]')
                        existingFavicons.forEach(favicon => favicon.remove())

                        // Adiciona favicon correto
                        const favicon = document.createElement('link')
                        favicon.rel = 'icon'
                        favicon.type = 'image/x-icon'
                        favicon.href = finalConfig.favicons[theme]
                        favicon.href += `?v=${Date.now()}` // Cache bust

                        document.head.appendChild(favicon)
                    },

                    // Inicialização (detecta tema do sistema, aplica classes)
                    initializeTheme: () => {
                        const { theme } = get()

                        // Detecta preferência do sistema
                        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
                        const systemTheme = mediaQuery.matches ? 'dark' : 'light'

                        // Resolve tema atual
                        const resolvedTheme = theme === 'system' && finalConfig.enableSystem
                            ? systemTheme
                            : theme as ResolvedTheme

                        // Aplica classes CSS
                        const root = document.documentElement
                        root.classList.remove('light', 'dark')
                        root.classList.add(resolvedTheme)

                        // Atualiza estado
                        set({
                            resolvedTheme,
                            isLoading: false
                        }, false, 'initializeTheme')

                        // Atualiza favicon
                        get().updateFavicon(resolvedTheme)

                        // Escuta mudanças no tema do sistema
                        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
                            if (get().theme === 'system' && finalConfig.enableSystem) {
                                const newSystemTheme = e.matches ? 'dark' : 'light'
                                root.classList.remove('light', 'dark')
                                root.classList.add(newSystemTheme)
                                get().updateResolvedTheme(newSystemTheme)
                                get().updateFavicon(newSystemTheme)
                            }
                        }

                        if (finalConfig.enableSystem) {
                            mediaQuery.addEventListener('change', handleSystemThemeChange)
                        }

                        // Cleanup function
                        return () => {
                            if (finalConfig.enableSystem) {
                                mediaQuery.removeEventListener('change', handleSystemThemeChange)
                            }
                        }
                    }
                }),
                {
                    name: finalConfig.storageKey,
                    partialize: (state) => ({ theme: state.theme })
                }
            ),
            {
                name: finalConfig.storageKey
            }
        )
    )
}

// Store padrão para uso direto
export const useThemeStore = createThemeStore() 