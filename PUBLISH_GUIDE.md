# 🚀 Guia de Publicação - Mr-Auth & Mr-Theme

Guia passo a passo para publicar suas bibliotecas no NPM e GitHub.

## 📋 Pré-requisitos

1. **Conta no NPM**: https://www.npmjs.com/signup
2. **Conta no GitHub**: ✅ Já tem (MrIago)
3. **Node.js instalado**: ✅ 
4. **Git configurado**: ✅

## 🎯 Passo 1: Preparar Repositórios no GitHub

### 1.1 Criar Repositórios

Acesse https://github.com/new e crie:

1. **mr-auth**
   - Repository name: `mr-auth`
   - Description: `🎩 Enterprise-grade Firebase authentication library with 3-tier security system`
   - Public ✅
   - Add README ❌ (já temos)

2. **mr-theme**
   - Repository name: `mr-theme`
   - Description: `🎨 Advanced theme system for React/Next.js - Faster than next-themes`
   - Public ✅
   - Add README ❌ (já temos)

### 1.2 Copiar Arquivos

```bash
# Criar diretórios temporários
mkdir -p ~/temp-repos/mr-auth
mkdir -p ~/temp-repos/mr-theme

# Copiar mr-auth
cp -r libs/mr-auth/* ~/temp-repos/mr-auth/

# Copiar mr-theme  
cp -r libs/mr-theme/* ~/temp-repos/mr-theme/
```

### 1.3 Inicializar Git

```bash
# Mr-Auth
cd ~/temp-repos/mr-auth
git init
git add .
git commit -m "🎩 Initial release of Mr-Auth v1.0.0

✨ Features:
- 3-tier security system (2ms/100ms/150ms)
- Enterprise RBAC with Firebase
- SSR/CSR compatible
- Ready-to-use components
- Zustand store with DevTools
- TypeScript first"

git branch -M main
git remote add origin https://github.com/MrIago/mr-auth.git
git push -u origin main

# Mr-Theme
cd ~/temp-repos/mr-theme
git init
git add .
git commit -m "🎨 Initial release of Mr-Theme v1.0.0

✨ Features:
- 44% smaller than next-themes
- Automatic favicon management
- Zustand-powered performance
- SSR safe with no hydration issues
- DevTools integration
- TypeScript first"

git branch -M main
git remote add origin https://github.com/MrIago/mr-theme.git
git push -u origin main
```

## 📦 Passo 2: Build e Test

### 2.1 Instalar Dependências

```bash
# Mr-Auth
cd ~/temp-repos/mr-auth
npm install

# Mr-Theme
cd ~/temp-repos/mr-theme
npm install
```

### 2.2 Build das Bibliotecas

```bash
# Mr-Auth
cd ~/temp-repos/mr-auth
npm run build

# Verificar se criou dist/
ls -la dist/

# Mr-Theme
cd ~/temp-repos/mr-theme
npm run build

# Verificar se criou dist/
ls -la dist/
```

### 2.3 Test Local (Opcional)

```bash
# Test mr-auth
cd ~/temp-repos/mr-auth
npm pack
# Isso cria mr-auth-1.0.0.tgz

# Test mr-theme
cd ~/temp-repos/mr-theme
npm pack
# Isso cria mr-theme-1.0.0.tgz
```

## 🌐 Passo 3: Publicar no NPM

### 3.1 Login no NPM

```bash
npm login
# Digite suas credenciais do NPM
```

### 3.2 Verificar Nomes Disponíveis

```bash
# Verificar se os nomes estão disponíveis
npm view mr-auth
npm view mr-theme

# Se retornar erro 404, os nomes estão livres! 🎉
```

### 3.3 Publicar

```bash
# Publicar Mr-Auth
cd ~/temp-repos/mr-auth
npm publish

# Publicar Mr-Theme
cd ~/temp-repos/mr-theme
npm publish
```

## 🎉 Passo 4: Verificar Publicação

### 4.1 Verificar no NPM

- https://www.npmjs.com/package/mr-auth
- https://www.npmjs.com/package/mr-theme

### 4.2 Testar Instalação

```bash
# Criar projeto de teste
mkdir test-libs && cd test-libs
npm init -y
npm install mr-auth mr-theme

# Verificar se instalou
ls node_modules/
```

## 🏷️ Passo 5: Adicionar Tags e Releases

### 5.1 Criar Tags Git

```bash
# Mr-Auth
cd ~/temp-repos/mr-auth
git tag -a v1.0.0 -m "🎩 Mr-Auth v1.0.0 - Enterprise Firebase Authentication"
git push origin v1.0.0

# Mr-Theme
cd ~/temp-repos/mr-theme
git tag -a v1.0.0 -m "🎨 Mr-Theme v1.0.0 - Advanced Theme System"
git push origin v1.0.0
```

### 5.2 Criar Releases no GitHub

1. Acesse https://github.com/MrIago/mr-auth/releases/new
2. Tag: `v1.0.0`
3. Title: `🎩 Mr-Auth v1.0.0`
4. Description:
```markdown
## 🎩 Mr-Auth v1.0.0 - Enterprise Firebase Authentication

### ✨ Features
- 🔥 3-tier security system (Quick 2ms / Secure 100ms / Critical 150ms)
- ⚡ Performance-first with cookie-based auth
- 🎨 Ready-to-use components (LoginButton, UserProfile, AuthGuard)
- 🏪 Zustand store with DevTools integration
- 🛡️ Enterprise RBAC (Role-Based Access Control)
- 📱 SSR/CSR compatible with perfect hydration
- 🎯 100% TypeScript with excellent IntelliSense

### 📦 Installation
```bash
npm install mr-auth
```

### 🚀 Quick Start
```tsx
import { useAuth, LoginButton, UserProfile } from 'mr-auth'

export default function App() {
  const { user, isLoading } = useAuth()
  
  if (isLoading) return <div>Loading...</div>
  
  return user ? <UserProfile /> : <LoginButton />
}
```

**Made with ❤️ by Mr (mister)**
```

Repetir o mesmo para mr-theme.

## 📊 Passo 6: Adicionar Badges aos READMEs

Os badges já estão configurados e funcionarão automaticamente após a publicação:

- [![npm version](https://badge.fury.io/js/mr-auth.svg)](https://badge.fury.io/js/mr-auth)
- [![npm version](https://badge.fury.io/js/mr-theme.svg)](https://badge.fury.io/js/mr-theme)

## 🎯 Passo 7: Divulgação

### 7.1 Redes Sociais

```markdown
🎉 Acabei de lançar duas bibliotecas open source!

🎩 **Mr-Auth**: Sistema de autenticação Firebase enterprise com segurança de 3 níveis
📦 npm install mr-auth

🎨 **Mr-Theme**: Sistema de temas 44% menor que next-themes com favicon automático  
📦 npm install mr-theme

Ambas com TypeScript, Zustand e DevTools! 

#React #NextJS #TypeScript #OpenSource
```

### 7.2 Dev.to / Medium

Escrever artigos explicando:
- A arquitetura de 3 níveis de segurança
- Como otimizamos o next-themes
- Comparações de performance

## 🔄 Passo 8: Futuras Atualizações

### 8.1 Workflow para Updates

```bash
# 1. Fazer mudanças
# 2. Atualizar version no package.json
npm version patch  # 1.0.1
npm version minor  # 1.1.0  
npm version major  # 2.0.0

# 3. Build
npm run build

# 4. Commit e push
git add .
git commit -m "🔄 Update to v1.0.1"
git push

# 5. Publicar
npm publish

# 6. Criar tag
git tag -a v1.0.1 -m "Update v1.0.1"
git push origin v1.0.1
```

## 🎊 Parabéns!

Suas bibliotecas agora estão:
- ✅ Publicadas no NPM
- ✅ Disponíveis no GitHub
- ✅ Documentadas profissionalmente
- ✅ Prontas para a comunidade usar

**Links finais:**
- NPM: https://www.npmjs.com/package/mr-auth
- NPM: https://www.npmjs.com/package/mr-theme
- GitHub: https://github.com/MrIago/mr-auth
- GitHub: https://github.com/MrIago/mr-theme

---

**Made with ❤️ by Mr (mister)** 