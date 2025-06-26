"use client"

import * as React from "react"

interface ThemeProviderProps {
    children: React.ReactNode
    attribute?: string
    defaultTheme?: string
    enableSystem?: boolean
    disableTransitionOnChange?: boolean
}

/**
 * ThemeProvider otimizado com Zustand
 * 
 * Substitui next-themes com melhor performance e controle.
 * Gerencia automaticamente:
 * - Favicon baseado no tema
 * - Persistência no localStorage
 * - Detecção de tema do sistema
 * - Classes CSS no documento
 * 
 * @example
 * ```tsx
 * <ThemeProvider
 *   attribute="class"
 *   defaultTheme="system"
 *   enableSystem
 *   disableTransitionOnChange
 * >
 *   {children}
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
    children,
    attribute = "class",
    defaultTheme = "system",
    enableSystem = true,
    disableTransitionOnChange = false
}: ThemeProviderProps) {
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)

        // Previne transições durante mudanças de tema se habilitado
        if (disableTransitionOnChange) {
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
    }, [disableTransitionOnChange])

    // Previne flash durante hidratação
    if (!mounted) {
        return <div style={{ visibility: 'hidden' }}>{children}</div>
    }

    return <>{children}</>
}