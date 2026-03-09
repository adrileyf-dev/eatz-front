# 🍽️ EATZ

**EATZ** é uma plataforma **SaaS moderna para gestão de pedidos e
usuários**, projetada com foco em **performance, escalabilidade e
arquitetura orientada a eventos**.

A aplicação utiliza **Next.js no frontend**, **Node.js no backend**,
**Prisma + PostgreSQL** para persistência de dados e **Apache Kafka**
para comunicação assíncrona entre serviços.

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

## Event Streaming

- Apache Kafka
- Kafka UI

Kafka é utilizado para comunicação assíncrona baseada em eventos entre
os serviços.

## Infraestrutura

- Docker
- Docker Compose

## Serviços Externos

- Cloudinary (upload de imagens)

---

# 🧱 Arquitetura do Sistema

O EATZ segue uma arquitetura moderna baseada em **API + Event
Streaming**.

            ┌───────────────┐
            │   Next.js UI  │
            │   Frontend    │
            └───────┬───────┘
                    │
                    │ HTTP API
                    ▼
            ┌───────────────┐
            │  Node Backend │
            │  REST API     │
            └───────┬───────┘
                    │
            ┌───────▼────────┐
            │   Apache Kafka  │
            │ Event Streaming │
            └───────┬────────┘
                    │
         ┌──────────┴──────────┐
         ▼                     ▼
    ┌─────────────┐     ┌─────────────┐
    │  Consumers  │     │  Workers    │
    │  Services   │     │  Async Jobs │
    └──────┬──────┘     └──────┬──────┘
           │                   │
           └─────────┬─────────┘
                     ▼
              ┌───────────────┐
              │ PostgreSQL DB │
              │ Prisma ORM    │
              └───────────────┘

---

# 📡 Arquitetura de Eventos (Kafka)

Kafka permite que o sistema processe eventos de forma escalável.

Fluxo de eventos:

    Client Request
          │
          ▼
    Backend API
          │
          ▼
    Kafka Producer
          │
          ▼
    Kafka Broker
          │
          ▼
    Kafka Consumer
          │
          ▼
    Background Processing / Services

Exemplos de eventos:

- user.created
- order.created
- order.updated
- notification.send

---

# 📁 Estrutura do Projeto

    eatz/
    │
    ├── eatz-front/
    │   ├── src
    │   │   ├── app
    │   │   ├── components
    │   │   ├── actions
    │   │   ├── services
    │   │   └── styles
    │
    ├── eatz-backend/
    │   ├── src
    │   │   ├── controllers
    │   │   ├── services
    │   │   ├── prisma
    │   │   ├── routes
    │   │   ├── kafka
    │   │   └── middlewares
    │
    ├── docker
    │
    └── docker-compose.yml

---

# 🐳 Infraestrutura Docker

Serviços utilizados no ambiente de desenvolvimento:

    PostgreSQL
    Backend Node
    Apache Kafka
    Kafka UI
    Frontend Next.js

Arquitetura Docker:

            Docker Network
     ┌───────────────────────────┐
     │                           │
     │  Next.js Frontend         │
     │        │                  │
     │        ▼                  │
     │    Node Backend           │
     │        │                  │
     │        ▼                  │
     │     Apache Kafka          │
     │        │                  │
     │        ▼                  │
     │      Consumers            │
     │        │                  │
     │        ▼                  │
     │     PostgreSQL            │
     │                           │
     └───────────────────────────┘

---

# ⚙️ Instalação do Projeto

## Clonar repositório

```bash
git clone https://github.com/seu-usuario/eatz.git
cd eatz
```

---

# 🐳 Rodar com Docker

    docker-compose up -d

---

# 🗄️ Configuração do Backend

    cd eatz-backend
    npm install

Criar `.env`

    DATABASE_URL=postgresql://admin:admin@localhost:5436/dev
    JWT_SECRET=your_secret
    PORT=3333

    CLOUDINARY_CLOUD_NAME=your_cloud
    CLOUDINARY_API_KEY=your_key
    CLOUDINARY_API_SECRET=your_secret

---

# 🧬 Prisma

Gerar client:

    npx prisma generate

Rodar migrations:

    npx prisma migrate dev

---

# ▶️ Iniciar Backend

    npm run dev

Servidor:

    http://localhost:3333

---

# 💻 Frontend

    cd eatz-front
    npm install
    npm run dev

Aplicação:

    http://localhost:3000

---

# 🔐 Autenticação

Autenticação baseada em **JWT**.

Header:

    Authorization: Bearer TOKEN

---

# 👥 Sistema de Roles

Controle de acesso baseado em roles.

Exemplo:

    ADMIN
    USER
    MANAGER

---

# 📦 Upload de Arquivos

Upload realizado via **Cloudinary**.

Usado para:

- Avatar de usuários
- Imagens de produtos
- Mídia

---

# 📊 Roadmap

- Sistema completo de pedidos
- Dashboard administrativo
- Sistema de notificações
- Integração com microserviços
- Observabilidade
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
