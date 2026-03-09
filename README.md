# 🍽️ EATZ

**EATZ** é uma plataforma **SaaS moderna para gestão de pedidos e
usuários**, desenvolvida com foco em performance, escalabilidade e
experiência de usuário.

O projeto utiliza **Next.js no frontend**, **Node.js no backend**,
**Prisma + PostgreSQL** para persistência de dados e **Docker** para
facilitar o ambiente de desenvolvimento.

---

# 🚀 Tecnologias Utilizadas

## Frontend

- Next.js (App Router)
- React
- TypeScript
- CSS Modules
- Lucide Icons

## Backend

- Node.js
- TypeScript
- JWT Authentication

## Banco de Dados

- PostgreSQL
- Prisma ORM

## Infraestrutura

- Docker
- Docker Compose

## Serviços Externos

- Cloudinary (upload de imagens)

---

# 📁 Estrutura do Projeto

    eatz/
    │
    ├── eatz-front/           # Frontend Next.js
    │   ├── src
    │   │   ├── app
    │   │   ├── components
    │   │   ├── actions
    │   │   ├── services
    │   │   └── styles
    │   │
    │   └── public
    │
    ├── eatz-backend/         # Backend Node.js
    │   ├── src
    │   │   ├── controllers
    │   │   ├── services
    │   │   ├── prisma
    │   │   ├── routes
    │   │   └── middlewares
    │
    ├── docker
    │
    └── docker-compose.yml

---

# ⚙️ Instalação do Projeto

## 1️⃣ Clonar o repositório

```bash
git clone https://github.com/seu-usuario/eatz.git
cd eatz
```

---

# 🐳 Rodando com Docker

Subir todos os serviços:

```bash
docker-compose up -d
```

---

# 🗄️ Configuração do Backend

```bash
cd eatz-backend
npm install
```

Criar arquivo `.env`:

    DATABASE_URL=postgresql://admin:admin@localhost:5436/dev
    JWT_SECRET=your_secret
    PORT=3333
    CLOUDINARY_CLOUD_NAME=your_cloud
    CLOUDINARY_API_KEY=your_key
    CLOUDINARY_API_SECRET=your_secret

---

# 🧬 Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

---

# ▶️ Iniciar Backend

```bash
npm run dev
```

Servidor:

    http://localhost:3333

---

# 💻 Configuração do Frontend

```bash
cd eatz-front
npm install
npm run dev
```

Aplicação:

    http://localhost:3000

---

# 🔐 Autenticação

O sistema utiliza **JWT**.

Header utilizado:

    Authorization: Bearer TOKEN

---

# 👥 Sistema de Roles

Exemplo:

    ADMIN
    USER
    MANAGER

---

# 📦 Upload de Imagens

Upload realizado com **Cloudinary**.

Usado para:

- Avatar de usuários
- Imagens de produtos
- Arquivos de mídia

---

# 🎨 Design

Padrões do frontend:

- Light Theme
- UI moderna
- CSS Modules
- Separação entre **TSX e CSS**

Exemplo:

    login.tsx
    login.module.css

---

# 📊 Futuras Funcionalidades

- Sistema de pedidos
- Dashboard administrativo
- Notificações
- Integração com filas (Kafka)
- Relatórios
- API pública

---

# 🤝 Contribuição

    git checkout -b feature/nova-feature
    git commit -m "feat: nova feature"
    git push origin feature/nova-feature

---

# 📄 Licença

MIT

---

# 👨‍💻 Autor

**Adriley Francisco**
