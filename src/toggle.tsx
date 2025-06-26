"use client"

import * as React from "react"
import { useTheme } from './provider'

export interface ThemeToggleProps {
    /**
     * Conteúdo do botão (ícones, texto, etc.)
     */
    children: React.ReactNode

    /**
     * Props adicionais para o botão
     */
    [key: string]: any
}

/**
 * Botão para alternar tema
 * 
 * Componente simples que envolve children e escuta clicks para alternar o tema.
 * O estilo e conteúdo do botão são completamente definidos pelo usuário via children.
 * 
 * @example
 * ```tsx
 * // Com botão customizado
 * <ThemeToggle>
 *   <button className="meu-botao">
 *     {theme === 'light' ? '🌙' : '☀️'}
 *   </button>
 * </ThemeToggle>
 * 
 * // Com componente de UI library
 * <ThemeToggle>
 *   <Button variant="outline" size="icon">
 *     <SunMoon className="h-4 w-4" />
 *   </Button>
 * </ThemeToggle>
 * 
 * // Simples
 * <ThemeToggle>
 *   <span>🌙</span>
 * </ThemeToggle>
 * ```
 */
export function ThemeToggle({ children, ...props }: ThemeToggleProps) {
    const { toggleTheme, isLoading } = useTheme()

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        if (!isLoading) {
            toggleTheme()
        }
    }

    return (
        <div
            onClick={handleClick}
            style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
            {...props}
        >
            {children}
        </div>
    )
} 