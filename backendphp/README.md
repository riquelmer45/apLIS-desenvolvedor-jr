# Backend PHP

Backend responsável pelo cadastro e listagem de médicos.

## Stack utilizada

- PHP 8.3
- PDO
- vlucas/phpdotenv
- Composer
- Servidor embutido do PHP para desenvolvimento
- Arquitetura MVC com front controller, controller, service e model

## Requisitos

- PHP 8.3 ou superior
- Composer instalado
- MySQL disponível
- Banco `aplis_db` criado e com a tabela de médicos

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do diretório `backendphp` com valores semelhantes a:

- `APP_ENV=local`
- `APP_PORT=3002`
- `DB_HOST=localhost`
- `DB_PORT=3306`
- `DB_DATABASE=aplis_db`
- `DB_USER=root`
- `DB_PASSWORD=123456`

## Instalação

Execute dentro da pasta `backendphp`:

```bash
composer install
```

## Inicialização

O projeto possui um atalho de start configurado no Composer. Para iniciar o servidor:

```bash
composer start
```

Esse comando usa a porta definida em `APP_PORT` no `.env`.

Se preferir, também é possível iniciar diretamente com:

```bash
php start.php
```

## Endpoints

- `GET /api/v1/medicos`
- `POST /api/v1/medicos`

## Estrutura principal

- `Public/index.php` atua como front controller para as rotas
- `src/Config/Database.php` cria a conexão PDO
- `src/Model/MedicoModel.php` faz o acesso ao banco
- `src/Service/MedicosService.php` concentra validações e regras de negócio
- `src/Controller/MedicosController.php` trata as requisições HTTP e respostas JSON
