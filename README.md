# apLIS - Teste Pratico (Fullstack)

## Visao geral

Aplicacao fullstack com:

- Frontend React (SPA)
- Backend PHP para medicos
- Backend Node.js para pacientes
- Banco MySQL compartilhado

O objetivo e permitir o cadastro e a listagem de medicos e pacientes em telas separadas, com integracao ponta a ponta entre frontend, APIs e banco de dados.

## O que foi realizado

- CRUD completo para medicos (PHP) e pacientes (Node.js)
- Padrao MVC nos dois backends
- Integracao do frontend com as duas APIs
- Sidebar com navegacao entre Medicos e Pacientes
- Formularios com modal de criacao/edicao
- Confirmacao de exclusao
- Toast de sucesso/erro
- Tratamento basico de erros e mensagens amigaveis

## Observacao sobre IDs

Os IDs sao gerados automaticamente pelo banco (AUTO_INCREMENT). Assim, o backend ignora o campo `id` enviado no body e utiliza o valor gerado pelo MySQL.

## Estrutura do projeto

- app/: frontend React
- backendjs/: API Node.js (pacientes)
- backendphp/: API PHP (medicos)
- DB/: scripts do banco utilizado para testar.

## Banco de dados

A pasta DB contem o schema utilizado no projeto:

- DB/schema.sql

Use este arquivo para criar as tabelas no MySQL antes de rodar as APIs.

## Endpoints principais

### PHP (medicos)

- GET /api/v1/medicos
- POST /api/v1/medicos
- PUT /api/v1/medicos/{id}
- DELETE /api/v1/medicos/{id}

### Node.js (pacientes)

- GET /api/v1/pacientes
- POST /api/v1/pacientes
- PUT /api/v1/pacientes/{id}
- DELETE /api/v1/pacientes/{id}

## Como executar (resumo)

1. Configure o MySQL usando DB/schema.sql.
2. Suba o backend PHP (composer start).
3. Suba o backend Node (npm start).
4. Suba o frontend (npm run dev).

Os enderecos base das aplicações devem ser configurados no frontend e backends via .env.
