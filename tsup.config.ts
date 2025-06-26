import { defineConfig } from 'tsup'

export default defineConfig({
    entry: {
        index: 'src/index.ts',
        store: 'src/store.ts',
        provider: 'src/provider.tsx',
        toggle: 'src/toggle.tsx'
    },
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    external: ['react', 'react-dom', 'zustand'],
    treeshake: true,
    minify: true
}) 