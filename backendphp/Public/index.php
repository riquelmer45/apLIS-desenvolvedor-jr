<?php

declare(strict_types=1);

require_once __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;
use App\Config\Database;
use App\Controller\MedicosController;
use App\Model\MedicoModel;
use App\Service\MedicosService;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->safeLoad();

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/';

if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function criarMedicosController(): MedicosController
{
    $pdo = Database::getConnection();
    $medicoModel = new MedicoModel($pdo);
    $medicosService = new MedicosService($medicoModel);

    return new MedicosController($medicosService);
}

if ($method === 'GET' && $path === '/api/v1/medicos') {
    criarMedicosController()->listarMedicos();
    exit;
}

if ($method === 'POST' && $path === '/api/v1/medicos') {
    criarMedicosController()->criarMedico();
    exit;
}

if ($method === 'PUT' && str_starts_with($path, '/api/v1/medicos/')) {
    $id = (int) basename($path);
    criarMedicosController()->atualizarMedico($id);
    exit;
}

if ($method === 'DELETE' && str_starts_with($path, '/api/v1/medicos/')) {
    $id = (int) basename($path);
    criarMedicosController()->deletarMedico($id);
    exit;
}

http_response_code(404);
echo json_encode(['mensagem' => 'Rota não encontrada']);