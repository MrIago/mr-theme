import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface ThemeStore {
    // Estado
    theme: Theme
    resolvedTheme: 'light' | 'dark'
    isLoading: boolean

    // Actions
    setTheme: (theme: Theme) => void
    toggleTheme: () => void
    updateResolvedTheme: (resolved: 'light' | 'dark') => void
    updateFavicon: (theme: 'light' | 'dark') => void
    initializeTheme: () => void
}

/**
 * Store Zustand para gerenciamento de tema
 * 
 * Gerencia tema, favicon automático e persistência no localStorage.
 * Substitui next-themes com melhor performance e controle.
 */
export const useThemeStore = create<ThemeStore>()(
    devtools(
        persist(
            (set, get) => ({
                // Estado inicial
                theme: 'system' as Theme,
                resolvedTheme: 'light' as 'light' | 'dark',
                isLoading: true,

                // Seta tema e atualiza favicon
                setTheme: (theme: Theme) => {
                    set({ theme }, false, 'setTheme')

                    // Aplica tema no documento
                    const root = document.documentElement
                    root.classList.remove('light', 'dark')

                    let resolvedTheme: 'light' | 'dark'

                    if (theme === 'system') {
                        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
                        resolvedTheme = systemTheme
                        root.classList.add(systemTheme)
                    } else {
                        resolvedTheme = theme
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
                updateResolvedTheme: (resolved: 'light' | 'dark') => {
                    set({ resolvedTheme: resolved }, false, 'updateResolvedTheme')
                },

                // Atualiza favicon baseado no tema
                updateFavicon: (theme: 'light' | 'dark') => {
                    // Remove favicons existentes
                    const existingFavicons = document.querySelectorAll('link[rel="icon"]')
                    existingFavicons.forEach(favicon => favicon.remove())

                    // Adiciona favicon correto
                    const favicon = document.createElement('link')
                    favicon.rel = 'icon'
                    favicon.type = 'image/x-icon'
                    favicon.href = theme === 'dark' ? '/favicon-dark.ico' : '/favicon.ico'
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
                    const resolvedTheme = theme === 'system' ? systemTheme : theme

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
                        if (get().theme === 'system') {
                            const newSystemTheme = e.matches ? 'dark' : 'light'
                            root.classList.remove('light', 'dark')
                            root.classList.add(newSystemTheme)
                            get().updateResolvedTheme(newSystemTheme)
                            get().updateFavicon(newSystemTheme)
                        }
                    }

                    mediaQuery.addEventListener('change', handleSystemThemeChange)

                    // Cleanup function (será chamada quando componente desmontar)
                    return () => {
                        mediaQuery.removeEventListener('change', handleSystemThemeChange)
                    }
                }
            }),
            {
                name: 'theme-store',
                partialize: (state) => ({ theme: state.theme }) // Persiste apenas o tema
            }
        ),
        {
            name: 'theme-store'
        }
    )
) 