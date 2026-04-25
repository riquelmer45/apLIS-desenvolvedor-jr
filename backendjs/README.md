# Backend Node.js

Backend responsável pelo cadastro e listagem de pacientes.

## Stack utilizada

- Node.js
- Express
- mysql2 com Promise API
- dotenv
- JavaScript em módulo ES

## Requisitos

- Node.js instalado
- MySQL disponível
- Banco `aplis_db` criado e com a tabela de pacientes

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do diretório `backendjs` com variaveis semelhantes a:

- `DB_HOST=`
- `DB_PORT=`
- `DB_USER=`
- `DB_PASSWORD=`
- `DB_NAME=`
- `APP_PORT=`

## Instalação

Execute dentro da pasta `backendjs`:

```bash
npm install
```

## Inicialização

Para iniciar o servidor:

```bash
npm start
```

O servidor sobe na porta definida em `APP_PORT`.

## Endpoints

- `GET /api/v1/pacientes`
- `POST /api/v1/pacientes`

## Estrutura principal

- `src/server.js` inicia o servidor
- `src/Config/db.js` configura a conexão com o banco
- `src/Model/PacientesModel.js` contém o acesso aos dados
- `src/Service/PacientesService.js` concentra regras de negócio
- `src/Controller/PacientesController.js` trata as requisições HTTP
- `src/Routes/PacientesRoute.js` define as rotas
