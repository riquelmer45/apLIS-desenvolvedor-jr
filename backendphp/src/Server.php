<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(dirname(__DIR__));
$dotenv->safeLoad();

$host = 'localhost';
$port = (string) ($_ENV['APP_PORT'] ?? '8000');
$publicDir = dirname(__DIR__) . '/Public';

echo "Iniciando servidor PHP em http://{$host}:{$port}\n";

passthru(PHP_BINARY . " -S {$host}:{$port} -t {$publicDir}");