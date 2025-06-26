# 📦 Guia de Publicação - Mr. Theme

## 🚀 Preparação para Publicação

### 1. Instalar dependências de build

```bash
cd packages/mr-theme
npm install tsup typescript -D
```

### 2. Build da biblioteca

```bash
npm run build
```

### 3. Testar localmente

```bash
# Link local
npm link

# No projeto que vai usar
npm link mr-theme
```

## 📋 Checklist de Publicação

- [ ] ✅ Versão atualizada no `package.json`
- [ ] ✅ `README.md` completo e atualizado
- [ ] ✅ Build funcionando (`npm run build`)
- [ ] ✅ Tipos TypeScript corretos
- [ ] ✅ Testes passando (se houver)
- [ ] ✅ Licença definida
- [ ] ✅ Repository URL configurado

## 🌐 Publicar no NPM

### 1. Login no NPM

```bash
npm login
```

### 2. Verificar arquivos que serão publicados

```bash
npm pack --dry-run
```

### 3. Publicar

```bash
# Primeira publicação
npm publish

# Versão específica
npm publish --tag beta
```

### 4. Verificar publicação

```bash
npm info mr-theme
```

## 📝 Versionamento

```bash
# Patch (bugfix) - 1.0.0 → 1.0.1
npm version patch

# Minor (feature) - 1.0.0 → 1.1.0
npm version minor

# Major (breaking) - 1.0.0 → 2.0.0
npm version major
```

## 🔧 Configurações Avançadas

### NPM Registry personalizado

```bash
# Configurar registry
npm config set registry https://seu-registry.com

# Ou usar .npmrc
echo "registry=https://seu-registry.com" > .npmrc
```

### Scoped package

```json
{
  "name": "@sua-empresa/mr-theme",
  "publishConfig": {
    "access": "public"
  }
}
```

## 📚 Após Publicação

### 1. Criar release no GitHub

```bash
git tag v1.0.0
git push origin v1.0.0
```

### 2. Atualizar documentação

- [ ] Atualizar versão nos exemplos
- [ ] Adicionar changelog
- [ ] Atualizar badges

### 3. Instalar em projetos

```bash
npm install mr-theme
# ou
yarn add mr-theme
# ou
pnpm add mr-theme
```

## 🎯 Exemplo de Uso Após Publicação

```tsx
// Instalar: npm install mr-theme zustand
import { ThemeProvider, ThemeToggle, useTheme } from 'mr-theme'

function App() {
  return (
    <ThemeProvider>
      <header>
        <ThemeToggle />
      </header>
      <main>
        <MyComponent />
      </main>
    </ThemeProvider>
  )
}

function MyComponent() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <div>
      <p>Tema atual: {theme}</p>
      <button onClick={toggleTheme}>
        Alternar tema
      </button>
    </div>
  )
}
```

## 🔄 Atualizações

Para atualizar a biblioteca:

1. Fazer mudanças no código
2. Atualizar versão: `npm version patch/minor/major`
3. Build: `npm run build`
4. Publicar: `npm publish`
5. Comunicar mudanças via changelog

---

**🎨 Mr. Theme - Sistema de temas moderno para React** 