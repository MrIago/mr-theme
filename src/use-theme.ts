import { useEffect } from 'react'
import { useThemeStore } from './theme-store'

/**
 * Hook para gerenciamento de tema
 * 
 * Substitui useTheme do next-themes com melhor performance usando Zustand.
 * Gerencia automaticamente favicon, persistência e detecção do sistema.
 * 
 * @example
 * ```tsx
 * const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme()
 * 
 * return (
 *   <button onClick={toggleTheme}>
 *     {resolvedTheme === 'dark' ? '🌙' : '☀️'}
 *   </button>
 * )
 * ```
 */
export function useTheme() {
    const store = useThemeStore()

    // Inicializa tema apenas uma vez no cliente
    useEffect(() => {
        if (typeof window !== 'undefined' && store.isLoading) {
            const cleanup = store.initializeTheme()
            return cleanup
        }
    }, [store.isLoading, store.initializeTheme])

    return {
        theme: store.theme,
        resolvedTheme: store.resolvedTheme,
        isLoading: store.isLoading,
        setTheme: store.setTheme,
        toggleTheme: store.toggleTheme
    }
} 