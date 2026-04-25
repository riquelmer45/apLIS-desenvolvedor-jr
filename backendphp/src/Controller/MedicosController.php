<?php

declare(strict_types=1);

namespace App\Controller;

use App\Service\MedicosService;
use InvalidArgumentException;
use PDOException;
use Throwable;

class MedicosController
{
    public function __construct(private MedicosService $medicosService)
    {
    }

    public function listarMedicos(): void
    {
        try {
            http_response_code(200);
            echo json_encode($this->medicosService->listarMedicos(), JSON_UNESCAPED_UNICODE);
        } catch (Throwable $e) {
            http_response_code(500);
            echo json_encode(['mensagem' => 'Erro ao listar os médicos', 'error' => $e->getMessage()]);
        }
    }

    public function criarMedico(): void
    {
        try {
            $data = json_decode((string) file_get_contents('php://input'), true);

            if (!is_array($data)) {
                http_response_code(400);
                echo json_encode(['mensagem' => 'JSON inválido']);

                return;
            }

            $this->medicosService->criarMedico($data);

            http_response_code(201);
            echo json_encode(['mensagem' => 'Médico criado com sucesso']);
        } catch (InvalidArgumentException $e) {
            http_response_code(400);
            echo json_encode(['mensagem' => $e->getMessage()]);
        } catch (PDOException $e) {
            if ($e->getCode() === '23000' || str_contains($e->getMessage(), 'Duplicate')) {
                http_response_code(409);
                echo json_encode(['mensagem' => 'CRM já cadastrado']);

                return;
            }

            http_response_code(500);
            echo json_encode(['mensagem' => 'Erro ao criar médico']);
        } catch (Throwable $e) {
            http_response_code(500);
            echo json_encode(['mensagem' => 'Erro ao criar médico']);
        }
    }

    public function atualizarMedico(int $id): void
    {
        try {
            $data = json_decode((string) file_get_contents('php://input'), true);

            if (!is_array($data)) {
                http_response_code(400);
                echo json_encode(['mensagem' => 'JSON inválido']);

                return;
            }

            $updated = $this->medicosService->atualizarMedico($id, $data);

            if (!$updated) {
                http_response_code(404);
                echo json_encode(['mensagem' => 'Médico não encontrado']);

                return;
            }

            http_response_code(200);
            echo json_encode(['mensagem' => 'Médico atualizado com sucesso']);
        } catch (InvalidArgumentException $e) {
            http_response_code(400);
            echo json_encode(['mensagem' => $e->getMessage()]);
        } catch (PDOException $e) {
            if ($e->getCode() === '23000' || str_contains($e->getMessage(), 'Duplicate')) {
                http_response_code(409);
                echo json_encode(['mensagem' => 'CRM já cadastrado']);

                return;
            }

            http_response_code(500);
            echo json_encode(['mensagem' => 'Erro ao atualizar médico']);
        } catch (Throwable $e) {
            http_response_code(500);
            echo json_encode(['mensagem' => 'Erro ao atualizar médico']);
        }
    }

    public function deletarMedico(int $id): void
    {
        try {
            $deleted = $this->medicosService->deletarMedico($id);

            if (!$deleted) {
                http_response_code(404);
                echo json_encode(['mensagem' => 'Médico não encontrado']);

                return;
            }

            http_response_code(200);
            echo json_encode(['mensagem' => 'Médico removido com sucesso']);
        } catch (Throwable $e) {
            http_response_code(500);
            echo json_encode(['mensagem' => 'Erro ao remover médico']);
        }
    }
}