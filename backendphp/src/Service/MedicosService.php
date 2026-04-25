<?php

declare(strict_types=1);

namespace App\Service;

use App\Model\MedicoModel;
use InvalidArgumentException;

class MedicosService
{
    public function __construct(private MedicoModel $medicoModel)
    {
    }

    public function listarMedicos(): array
    {
        return $this->medicoModel->getAll();
    }

    public function criarMedico(array $dados): int
    {
        $nome = trim((string) ($dados['nome'] ?? ''));
        $crm = trim((string) ($dados['CRM'] ?? ''));
        $ufcrm = trim((string) ($dados['UFCRM'] ?? ''));

        if ($nome === '' || $crm === '' || $ufcrm === '') {
            throw new InvalidArgumentException('Nome, CRM e UFCRM são obrigatórios.');
        }

        return $this->medicoModel->create($nome, $crm, $ufcrm);
    }

    public function atualizarMedico(int $id, array $dados): bool
    {
        $nome = trim((string) ($dados['nome'] ?? ''));
        $crm = trim((string) ($dados['CRM'] ?? ''));
        $ufcrm = trim((string) ($dados['UFCRM'] ?? ''));

        if ($id <= 0) {
            throw new InvalidArgumentException('Id inválido.');
        }

        if ($nome === '' || $crm === '' || $ufcrm === '') {
            throw new InvalidArgumentException('Nome, CRM e UFCRM são obrigatórios.');
        }

        return $this->medicoModel->updateById($id, $nome, $crm, $ufcrm);
    }

    public function deletarMedico(int $id): bool
    {
        if ($id <= 0) {
            throw new InvalidArgumentException('Id inválido.');
        }

        return $this->medicoModel->deleteById($id);
    }
}