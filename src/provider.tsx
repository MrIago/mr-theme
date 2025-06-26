"use client"

import * as React from "react"
import type { ThemeProviderProps } from './types'
import { createThemeStore } from './store'

/**
 * Context para compartilhar store entre componentes
 */
const ThemeStoreContext = React.createContext<ReturnType<typeof createThemeStore> | null>(null)

/**
 * Hook para acessar o store do contexto
 */
export function useThemeStore() {
    const store = React.useContext(ThemeStoreContext)
    if (!store) {
        throw new Error('useThemeStore deve ser usado dentro de um ThemeProvider')
    }
    return store()
}

/**
 * Hook para usar tema (API limpa)
 */
export function useTheme() {
    const { theme, resolvedTheme, isLoading, setTheme, toggleTheme } = useThemeStore()

    return {
        theme,
        resolvedTheme,
        isLoading,
        setTheme,
        toggleTheme
    }
}

/**
 * ThemeProvider otimizado com Zustand
 * 
 * Gerencia automaticamente:
 * - Favicon baseado no tema
 * - Persistência no localStorage
 * - Detecção de tema do sistema
 * - Classes CSS no documento
 * - Inicialização correta do tema
 * 
 * @example
 * ```tsx
 * <ThemeProvider
 *   defaultTheme="system"
 *   storageKey="my-app-theme"
 *   favicons={{
 *     light: "/light-icon.png",
 *     dark: "/dark-icon.png"
 *   }}
 * >
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
    children,
    attribute = "class",
    defaultTheme = "system",
    enableSystem = true,
    disableTransitionOnChange = false,
    storageKey = "mr-theme",
    favicons = {
        light: "/favicon.ico",
        dark: "/favicon-dark.ico"
    }
}: ThemeProviderProps) {
    const [mounted, setMounted] = React.useState(false)

    // Cria store com configuração
    const store = React.useMemo(() => createThemeStore({
        storageKey,
        defaultTheme,
        enableSystem,
        favicons
    }), [storageKey, defaultTheme, enableSystem, favicons])

    const { isLoading, initializeTheme } = store()

    React.useEffect(() => {
        setMounted(true)

        // Inicializa o tema no cliente
        if (typeof window !== 'undefined') {
            const cleanup = initializeTheme()
            return cleanup
        }
    }, [initializeTheme])

    React.useEffect(() => {
        // Previne transições durante mudanças de tema se habilitado
        if (disableTransitionOnChange && mounted) {
            const style = document.createElement('style')
            style.innerHTML = `
        *, *::before, *::after {
          transition: none !important;
          animation: none !important;
        }
      `
            document.head.appendChild(style)

            // Remove após um frame para permitir transições normais
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    document.head.removeChild(style)
                })
            })
        }
    }, [disableTransitionOnChange, mounted])

    // Previne flash durante hidratação - mostra conteúdo apenas quando:
    // 1. Componente foi montado no cliente
    // 2. Tema foi inicializado (não está mais carregando)
    if (!mounted || isLoading) {
        return <div style={{ visibility: 'hidden' }}>{children}</div>
    }

    return (
        <ThemeStoreContext.Provider value={store}>
            {children}
        </ThemeStoreContext.Provider>
    )
} 