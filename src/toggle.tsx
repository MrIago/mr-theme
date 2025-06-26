"use client"

import * as React from "react"
import { useTheme } from './provider'

export interface ThemeToggleProps {
    /**
     * Componente customizado para renderizar
     * Recebe props: onClick, title, children, disabled
     */
    as?: React.ComponentType<{
        onClick: () => void
        title: string
        children: React.ReactNode
        disabled?: boolean
        [key: string]: any
    }>

    /**
     * Props adicionais para o componente
     */
    [key: string]: any

    /**
     * Ícones customizados
     */
    icons?: {
        light: React.ReactNode
        dark: React.ReactNode
    }

    /**
     * Labels customizados
     */
    labels?: {
        light: string
        dark: string
    }

    /**
     * Mostrar apenas ícone ou apenas texto
     */
    showIcon?: boolean
    showLabel?: boolean
}

/**
 * Componente padrão para botão simples
 */
const DefaultButton = ({ onClick, title, children, disabled, ...props }: any) => (
    <button
        onClick={onClick}
        title={title}
        disabled={disabled}
        style={{
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '8px',
            background: 'transparent',
            cursor: disabled ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
        }}
        {...props}
    >
        {children}
    </button>
)

/**
 * Botão para alternar tema
 * 
 * Componente flexível que permite customização completa.
 * Funciona com qualquer biblioteca de UI (shadcn, MUI, Chakra, etc).
 * 
 * @example
 * ```tsx
 * // Básico
 * <ThemeToggle />
 * 
 * // Com shadcn/ui
 * <ThemeToggle as={Button} variant="outline" size="icon" />
 * 
 * // Customizado
 * <ThemeToggle
 *   icons={{
 *     light: <SunIcon />,
 *     dark: <MoonIcon />
 *   }}
 *   labels={{
 *     light: "Modo Claro",
 *     dark: "Modo Escuro"
 *   }}
 *   showLabel
 * />
 * ```
 */
export function ThemeToggle({
    as: Component = DefaultButton,
    icons = {
        light: '☀️',
        dark: '🌙'
    },
    labels = {
        light: 'Tema Claro',
        dark: 'Tema Escuro'
    },
    showIcon = true,
    showLabel = false,
    ...props
}: ThemeToggleProps) {
    const { resolvedTheme, toggleTheme, isLoading } = useTheme()

    const currentIcon = resolvedTheme === 'light' ? icons.dark : icons.light
    const currentLabel = resolvedTheme === 'light' ? labels.dark : labels.light

    const renderContent = () => (
        <>
            {showIcon && <span>{currentIcon}</span>}
            {showLabel && <span>{currentLabel}</span>}
            {!showIcon && !showLabel && <span>{currentIcon}</span>}
        </>
    )

    // Evita hidratação mismatch mostrando um placeholder até carregar
    if (isLoading) {
        return (
            <Component
                onClick={() => { }}
                title="Carregando tema..."
                disabled
                {...props}
            >
                {showIcon && <span>{icons.light}</span>}
                {showLabel && <span>Carregando...</span>}
                {!showIcon && !showLabel && <span>{icons.light}</span>}
            </Component>
        )
    }

    return (
        <Component
            onClick={toggleTheme}
            title={currentLabel}
            {...props}
        >
            {renderContent()}
        </Component>
    )
} 