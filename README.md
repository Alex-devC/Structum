# STRUCTUM — Plataforma Empresarial Modular

> **Desenvolvedor:** Alex Fabiano Longo  
> **Versão:** 3.4.2  
> **Arquitetura:** Frontend React 19 + TypeScript (Aparência Windows Desktop / Avalonia UI / Fluent Ribbon) & Backend Independente Node.js + TypeScript (Fastify + Zod + Prisma ORM)

---

## 1. Visão Geral da Arquitetura

O **STRUCTUM** foi concebido com uma estrita separação entre frontend e backend, permitindo que a API atenda tanto a interface web desktop quanto futuros clientes móveis (como aplicativos Android) ou integrações corporativas.

```
structum/
├── backend/                      # Backend independente da plataforma
│   ├── prisma/
│   │   └── schema.prisma         # Definição do Prisma ORM (MySQL inicial / PostgreSQL futuro)
│   ├── src/
│   │   ├── config/
│   │   │   └── env.ts            # Validação centralizada de variáveis de ambiente (Zod)
│   │   ├── plugins/
│   │   │   ├── errorHandler.ts   # Tratador centralizado de erros (RFC 7807)
│   │   │   └── logger.ts         # Logging estruturado sanitizado (Pino/Fastify)
│   │   ├── routes/
│   │   │   └── health.ts         # Endpoint seguro GET /api/health
│   │   ├── db/
│   │   │   └── prisma.ts         # Instância única do PrismaClient com tratamento defensivo
│   │   ├── app.ts                # Fábrica da aplicação Fastify com CORS e rotas
│   │   └── server.ts             # Ponto de entrada do backend para execução standalone
│   ├── .env.example              # Modelo seguro de variáveis do backend
│   └── tsconfig.json
├── src/                          # Frontend React 19 + TypeScript (Vite + Tailwind CSS v4)
│   ├── components/
│   │   ├── LoginView.tsx         # Tela de autenticação nativa estilo Avalonia / Windows 11
│   │   ├── WorkspaceView.tsx     # Área de trabalho ERP com Fluent Ribbon e WPF DataGrid
│   │   └── BackendHealthModal.tsx# Ferramenta interativa de diagnóstico da API
│   ├── App.tsx                   # Coordenador de telas e integração com o backend
│   ├── main.tsx
│   └── index.css                 # Efeitos Mica, Acrylic e geometria Windows Desktop
├── server.ts                     # Runtime unificado fullstack para desenvolvimento/produção
├── .env.example                  # Template geral de variáveis sem segredos
├── .gitignore                    # Regras de segurança para bloqueio de .env e credenciais
└── package.json
```

---

## 2. Tecnologias Utilizadas

- **Runtime & Linguagem:** Node.js 22+ com TypeScript.
- **Backend API:** Fastify 5 (alta performance e baixo overhead).
- **Validação de Dados:** Zod (validação estrita de schema de ambiente e requisições).
- **Acesso ao Banco de Dados:** Prisma ORM v6.
- **Frontend:** React 19 + TypeScript, Vite 8, Tailwind CSS v4, Lucide React.
- **Design System:** Baseado nas especificações Windows 11 Fluent Ribbon e Avalonia UI (alta densidade de informação, geometria 0px, controles docked).

---

## 3. Banco de Dados e Guia de Migração (MySQL ➔ PostgreSQL)

### 3.1. Estado Atual (Fase de Fundação)
Nesta etapa de fundação:
- O schema está configurado com `provider = "mysql"`.
- **Nenhuma tabela de negócio nem migration de produção foi criada**, conforme orientações de validação da infraestrutura básica.
- O endpoint `GET /api/health` opera de modo defensivo: se o banco ainda não estiver provisionado, a API reporta `"status": "standby_foundation_ready"` sem quebrar a execução.

### 3.2. Orientações Críticas para Migração Futura (PostgreSQL)
A migração de MySQL para PostgreSQL **não consiste apenas em alterar a string de conexão**. Ao migrar para PostgreSQL em servidor próprio, observe:

1. **Alteração do Schema Prisma:**
   Em `backend/prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql" // Alterar de "mysql" para "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. **Diferenças de Tipagem:**
   - **Booleanos:** MySQL trata booleanos como `TINYINT(1)`, enquanto PostgreSQL possui o tipo primitivo nativo `BOOLEAN`.
   - **JSON:** MySQL utiliza `JSON` genérico; PostgreSQL oferece `JSONB` com suporte a indexação GIN.
   - **Enums:** PostgreSQL suporta tipos `ENUM` nativos no catálogo do banco, enquanto MySQL os define na coluna da tabela.
   - **Strings e Textos:** Diferenças no tratamento de `TEXT` e limites de comprimento (`VARCHAR(n)`).
3. **Collation e Sensibilidade a Caixa (Case-Sensitivity):**
   - MySQL geralmente opera com collation *case-insensitive* (`utf8mb4_unicode_ci`).
   - PostgreSQL é estritamente *case-sensitive* por padrão (`ILIKE` vs `LIKE`, `CITEXT` extension).
4. **Sequências e Identificadores:**
   - MySQL utiliza `AUTO_INCREMENT`.
   - PostgreSQL utiliza `IDENTITY` ou objetos `SEQUENCE` dedicados.
5. **Procedimento de Regeneração:**
   Após a alteração do provider e da variável `DATABASE_URL`:
   ```bash
   npm run prisma:generate
   ```

---

## 4. Configuração de Variáveis de Ambiente e Segurança

### 4.1. Regras de Segurança Aplicadas
- **Nenhum segredo** (chaves, senhas ou strings com credenciais) está embutido no código-fonte.
- Arquivos `.env`, `.env.local`, `.env.production` e `.env.development` estão estritamente listados no `.gitignore`.
- Foi criado o arquivo `.env.example` contendo apenas referências e valores fictícios para setup local.
- O endpoint `/api/health` e os logs estruturados **não expõem senhas, tokens ou URLs sensíveis** (mecanismo de *redaction* ativo no Pino/Fastify).

### 4.2. Preparando os Ambientes

Copie o modelo de ambiente para seu ambiente de desenvolvimento:
```bash
cp .env.example .env
```

Configurações disponíveis:
| Variável | Descrição | Padrão | Obrigatório? |
| :--- | :--- | :--- | :--- |
| `NODE_ENV` | Modo de execução (`development`, `production`, `test`) | `development` | Opcional |
| `PORT` | Porta HTTP da aplicação | `3000` | Opcional |
| `HOST` | Interface de rede para binding (aceita `0.0.0.0`) | `0.0.0.0` | Opcional |
| `LOG_LEVEL` | Nível de log (aceita `info`, `debug`, `warn`, `error`) | `info` | Opcional |
| `CORS_ORIGIN` | Origens autorizadas (se omitido, reflete dinamicamente a origem real do frontend, incluindo `APP_URL`) | Dinâmico | Opcional |
| `DATABASE_URL` | String de conexão MySQL ou PostgreSQL | Opcional em dev | Apenas em produção |

> **Desenvolvimento Sem Banco de Dados:**
> Em desenvolvimento, a variável `DATABASE_URL` **não é obrigatória**. Se não for informada, o servidor Fastify e o frontend iniciam normalmente, e o endpoint `GET /api/health` reporta `"status": "nao_configurado"` e `"connected": false`, sem gerar falhas nem simular conexão inexistente.
> Em produção, qualquer módulo que dependa de persistência executa a validação estrita via `assertDatabaseConfigured()`.

---

## 5. Como Executar e Testar

### 5.1. Instalação das Dependências
```bash
npm install
```

### 5.2. Gerando o Prisma Client
```bash
npm run prisma:generate
```

### 5.3. Executando em Desenvolvimento (Fullstack Unificado)
Inicia o backend Fastify integrado ao frontend Vite na porta `3000`:
```bash
npm run dev
```
Acesse no navegador:
- Interface Desktop STRUCTUM: `http://localhost:3000`
- Endpoint de Saúde: `http://localhost:3000/api/health`

### 5.4. Executando Apenas o Backend Standalone
Para rodar exclusivamente a API Fastify independente (ex: para testes de microsserviço ou desenvolvimento isolado):
```bash
npm run start:backend
```

### 5.5. Testando o Endpoint de Saúde (Health Check)
Você pode testar via cURL no terminal:
```bash
curl -i http://localhost:3000/api/health
```

Exemplo de resposta retornada (`HTTP 200 OK`):
```json
{
  "status": "ok",
  "service": "STRUCTUM-Backend-Core",
  "version": "3.4.2",
  "timestamp": "2026-10-21T00:32:02.574Z",
  "uptimeSeconds": 15,
  "environment": "development",
  "database": {
    "driver": "mysql",
    "connected": false,
    "status": "standby_foundation_ready"
  }
}
```

Na interface web do STRUCTUM, você também pode clicar no indicador de conexão no rodapé (`🟢 Conectado ao SQL Server` ou `Serviço de Autenticação Online`) ou no botão `API Fastify: OK` na barra de título para abrir o **modal de diagnóstico em tempo real**.

---

## 6. Próximos Passos (Evolução Incremental)

Conforme estabelecido no planejamento:
1. Validação da fundação arquitetural atual (Fastify + Zod + Prisma + Layout Desktop).
2. Modelagem inicial das entidades relacionais (Empresas, Usuários, Permissões/RBAC).
3. Implementação de autenticação real com JWT seguro e sessões corporativas.
4. Módulos de negócio: Laudos Técnicos, Clientes, Ativos Fabris e Pareceres.
