<?php

declare(strict_types=1);

namespace App\Model;

use PDO;

class MedicoModel
{
    public function __construct(private PDO $pdo)
    {
    }

    public function getAll(): array
    {
        $sql = "
            SELECT
                id,
                nome,
                CRM,
                UFCRM
            FROM medicos
            ORDER BY id ASC
        ";

        $stmt = $this->pdo->query($sql);

        return $stmt->fetchAll();
    }

    public function create(string $nome, string $CRM, string $UFCRM): int
    {
        $sql = "
            INSERT INTO medicos (nome, CRM, UFCRM)
            VALUES (:nome, :CRM, :UFCRM)
        ";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ':nome' => $nome,
            ':CRM' => $CRM,
            ':UFCRM' => $UFCRM,
        ]);

        return (int) $this->pdo->lastInsertId();
    }

    public function updateById(int $id, string $nome, string $CRM, string $UFCRM): bool
    {
        $sql = "
            UPDATE medicos
            SET nome = :nome, CRM = :CRM, UFCRM = :UFCRM
            WHERE id = :id
        ";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ':nome' => $nome,
            ':CRM' => $CRM,
            ':UFCRM' => $UFCRM,
            ':id' => $id,
        ]);

        return $stmt->rowCount() > 0;
    }

    public function deleteById(int $id): bool
    {
        $stmt = $this->pdo->prepare('DELETE FROM medicos WHERE id = :id');
        $stmt->execute([':id' => $id]);

        return $stmt->rowCount() > 0;
    }
}