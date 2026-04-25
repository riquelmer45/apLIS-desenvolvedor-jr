# Frontend React

Interface para visualizar e cadastrar pacientes e medicos. Consome os dois backends (Node e PHP).

## Stack utilizada

- React + Vite
- JavaScript
- Fetch API
- CSS puro

## Requisitos

- Node.js instalado
- Backends rodando (Node e PHP)

## Variaveis de ambiente

Crie um arquivo `.env` na raiz do diretoria `app` com variaveis semelhantes a:

- `VITE_PATIENTS_API=`
- `VITE_DOCTORS_API=`

E aloque as urls dos backends

## Instalacao

Dentro da pasta `app`:

```bash
npm install
```

## Inicializacao

```bash
npm run dev
```

O frontend fica disponivel em `http://localhost:5173`.

## Funcionalidades

- Sidebar com navegacao
- Lista de pacientes e medicos
- Modal para cadastro com POST nos backends
