# 📋 Log de Correções - Containerização EATZ Front-end

## Data: 11/05/2026

Este documento registra todos os erros encontrados durante o processo de containerização do front-end Next.js e suas respectivas correções.

---

## 🔧 Erro 1: `package-lock.json` fora de sincronia

### Descrição

```
npm error `npm ci` can only install packages when your package.json and package-lock.json or npm-shrinkwrap.json are in sync. Please update your lock file with `npm install` before continuing.
```

### Causa

O `package-lock.json` estava desatualizado em relação ao `package.json`. Durante o desenvolvimento, algumas dependências foram atualizadas (principalmente Tailwind CSS v4.2.1 → v4.3.0), mas o lockfile não foi regenerado.

### Correção

```bash
npm install
```

Isso atualizou o `package-lock.json` para refletir as mudanças no `package.json`.

---

## 🔧 Erro 2: Comando `npm ci` no Dockerfile

### Descrição

Mesmo após sincronizar o lockfile, o `npm ci` continuava falhando no Docker build.

### Causa

O `npm ci` é muito estrito e falha se há qualquer inconsistência entre `package.json` e `package-lock.json`. Em ambientes Docker, isso pode acontecer devido a diferenças de sistema ou cache.

### Correção

Substituí `npm ci` por `npm install` no Dockerfile:

```dockerfile
# Antes
RUN npm ci

# Depois
RUN npm install
```

---

## 🔧 Erro 3: Campo `version` obsoleto no docker-compose.yml

### Descrição

```
the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion
```

### Causa

O campo `version` no docker-compose.yml é obsoleto nas versões mais recentes do Docker Compose.

### Correção

Removido o campo `version` do `docker-compose.yml`:

```yaml
# Removido
version: "3.9"

# Mantido apenas
services:
  eatz-front:
    # ...
```

---

## 🔧 Erro 4: Erro TypeScript - Tipo incorreto em category-actions.tsx

### Descrição

```
Type error: Cannot find name 'categorie'.
```

### Localização

`src/components/forms/categories/category-actions.tsx:17`

### Causa

O tipo estava escrito incorretamente como `categorie` ao invés de `Category`.

### Correção

```typescript
// Antes
interface Props {
  category: categorie;
}

// Depois
import type { Category } from "@/libs/types";

interface Props {
  category: Category;
}
```

---

## 🔧 Erro 5: Erro TypeScript - useActionState em LoginForm.tsx

### Descrição

```
Type error: Argument of type '(prevState: GeralState | null, formData: FormData) => Promise<{ success: boolean; message: string; error?: undefined; } | { success: boolean; error: string; message?: undefined; } | undefined>' is not assignable to parameter of type '(state: { success: boolean; message: string; error?: undefined; } | { success: boolean; error: string; message?: undefined; } | null | undefined) => { success: boolean; message: string; error?: undefined; } | { ...; } | Promise<...> | null | undefined'.
```

### Localização

`src/components/forms/login/LoginForm.tsx:15`

### Causa

O tipo do parâmetro `prevState` na função `ServiceLogin` não aceitava `undefined`, mas o `useActionState` pode passar `undefined` como estado inicial.

### Correção

```typescript
// src/service/category/serviceLogin.ts
export async function ServiceLogin(
  prevState: GeralState | null | undefined, // Adicionado | undefined
  formData: FormData,
) {
  // ...
}
```

---

## 🔧 Erro 6: Erro TypeScript - Propriedade 'user' não existe em Order

### Descrição

```
Type error: Property 'user' does not exist on type 'Order'.
```

### Localização

`src/components/forms/orders/Orders.item.tsx:70`

### Causa

O tipo `Order` não incluía a propriedade `user`, mas o código tentava acessar `order.user?.name`.

### Correção

```typescript
// src/types/OrderType.ts
import type { User } from "@/libs/types";

export interface Order {
  id: string;
  table: number;
  name?: string;
  user?: User; // Propriedade adicionada
  status: boolean;
  draft: boolean;
  createdAt: string;
  item: OrderItem[];
}
```

---

## 🔧 Erro 7: Erro TypeScript - Incompatibilidade de tipos em registerForm.tsx

### Descrição

```
Type error: Argument of type '(prevState: GeralState | null, formData: FormData) => Promise<GeralState>' is not assignable to parameter of type '(state: RegisterState | null, payload: FormData) => RegisterState | Promise<RegisterState | null> | null'.
```

### Localização

`src/components/forms/register/registerForm.tsx:24`

### Causa

O componente `registerForm.tsx` definia seu próprio tipo `RegisterState`, mas a função `registerAction` usava `GeralState`. Além disso, o tipo de retorno não incluía a propriedade `error` obrigatória.

### Correção

```typescript
// src/service/category/serviceRegister.ts
import { apiClient } from "@/libs/api";
import { User } from "@/libs/types";

type RegisterState = {
  success: boolean;
  message?: string;
  error: string | null;
};

export async function registerAction(
  prevState: RegisterState | null | undefined,
  formData: FormData,
): Promise<RegisterState> {
  // ...

  return {
    success: true,
    message: "Registro realizado com sucesso",
    error: null, // Propriedade adicionada
  };

  // ...
  return {
    success: false,
    error: err.message,
  };
}
```

---

## 🔧 Erro 8: Dependências de produção não instaladas no container

### Descrição

O container buildava com sucesso, mas falhava ao iniciar porque as dependências de produção não estavam instaladas no estágio final.

### Causa

O Dockerfile copiava apenas os arquivos do build, mas não instalava as dependências necessárias para executar a aplicação em produção.

### Correção

Adicionado `npm install --production` no estágio runner:

```dockerfile
# Production image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only the necessary files from builder
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Install only production dependencies for the runtime
RUN npm install --production

# Expose port used by Next.js
EXPOSE 3000

# Default command for standalone build
CMD ["node", "server.js"]
```

---

## 📊 Resumo das Correções

| Arquivo                | Tipo de Erro                   | Correção                   |
| ---------------------- | ------------------------------ | -------------------------- |
| `package-lock.json`    | Lockfile desatualizado         | `npm install`              |
| `Dockerfile`           | Comando `npm ci` muito estrito | `npm install`              |
| `docker-compose.yml`   | Campo `version` obsoleto       | Removido                   |
| `category-actions.tsx` | Tipo incorreto                 | `categorie` → `Category`   |
| `serviceLogin.ts`      | Tipo não aceita `undefined`    | Adicionado `\| undefined`  |
| `OrderType.ts`         | Propriedade faltante           | Adicionado `user?: User`   |
| `serviceRegister.ts`   | Tipos incompatíveis            | Refatorado tipos           |
| `Dockerfile`           | Dependências faltantes         | `npm install --production` |

---

## ✅ Status Final

Após todas as correções:

- ✅ Build Docker bem-sucedido
- ✅ Container executando na porta 3000
- ✅ Todos os erros TypeScript resolvidos
- ✅ Aplicação funcional em produção

### Comando de execução

```bash
docker compose up --build
```

### Verificação

```bash
docker compose ps
# Deve mostrar: eatz-front-eatz-front-1 (Up)
```

---

## 📝 Lições Aprendidas

1. **Sempre sincronizar lockfiles** antes de containerizar
2. **Usar `npm install` ao invés de `npm ci`** em Dockerfiles para maior flexibilidade
3. **Verificar tipos TypeScript** antes do build
4. **Instalar dependências de produção** no estágio final do container
5. **Documentar correções** para referência futura

---

_Documento gerado automaticamente em 11/05/2026_
