CREATE DATABASE IF NOT EXISTS aplis_db;

USE aplis_db;

CREATE TABLE IF NOT EXISTS Pacientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data_nascimento DATE NULL,
    carteirinha VARCHAR(30) UNIQUE NOT NULL,
    cpf CHAR(11) UNIQUE NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO Pacientes (id, nome, data_nascimento, carteirinha, cpf)
VALUES
    (1, 'João da Silva', '2026-01-01', '123456', '12345678909'),
    (2, 'Francisco Pereira', NULL, '876543', '12345678901');

CREATE TABLE IF NOT EXISTS medicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    CRM VARCHAR(20) NOT NULL,
    UFCRM CHAR(2) NOT NULL
);

INSERT INTO medicos (id, nome, CRM, UFCRM)
VALUES
    (1, 'João da Silva', '123456', 'CE'),
    (2, 'Francisco Pereira', '876543', 'CE');