"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/hooks/use-theme"

import { Button } from "@/components/ui/button"

/**
 * Botão para alternar tema
 * 
 * Usa Zustand store para melhor performance.
 * Gerencia automaticamente favicon e persistência.
 */
export function ThemeToggle() {
    const { theme, resolvedTheme, toggleTheme, isLoading } = useTheme()

    const getIcon = () => {
        return resolvedTheme === "light" ?
            <Sun className="h-[1.2rem] w-[1.2rem]" /> :
            <Moon className="h-[1.2rem] w-[1.2rem]" />
    }

    const getThemeLabel = () => {
        return resolvedTheme === "light" ? "Tema Claro" : "Tema Escuro"
    }

    // Evita hidratação mismatch mostrando um placeholder até carregar
    if (isLoading) {
        return (
            <Button
                variant="outline"
                size="icon"
                disabled
                className="cursor-pointer"
            >
                <Sun className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Carregando tema...</span>
            </Button>
        )
    }

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            title={getThemeLabel()}
            className="cursor-pointer"
        >
            {getIcon()}
            <span className="sr-only">{getThemeLabel()}</span>
        </Button>
    )
}
