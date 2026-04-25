import db from "../Config/db.js";

export default class PacientesModel {
  // Buscar todos os pacientes
  static async getAllPacientes() {
    const [rows] = await db.query(`
        SELECT
            id,
            nome,
            data_nascimento AS dataNascimento,
            carteirinha,
            cpf
        FROM Pacientes
        ORDER BY id ASC
    `);

    return rows.map((p) => {
      const paciente = {
        id: p.id,
        nome: p.nome,
      };

      if (p.dataNascimento) {
        paciente.dataNascimento = p.dataNascimento.toISOString().split("T")[0];
      }

      paciente.carteirinha = p.carteirinha;
      paciente.cpf = p.cpf;

      return paciente;
    });
  }

  // Criar um novo paciente
  static async create(paciente) {
    const { nome, dataNascimento, carteirinha, cpf } = paciente;
    const [result] = await db.query(
      "INSERT INTO Pacientes (nome, data_nascimento, carteirinha, cpf) VALUES (?, ?, ?, ?)",
      [nome, dataNascimento, carteirinha, cpf],
    );
    return result;
  }

  static async updateById(id, paciente) {
    const { nome, dataNascimento, carteirinha, cpf } = paciente;
    const [result] = await db.query(
      "UPDATE Pacientes SET nome = ?, data_nascimento = ?, carteirinha = ?, cpf = ? WHERE id = ?",
      [nome, dataNascimento, carteirinha, cpf, id],
    );

    return result.affectedRows > 0;
  }

  static async deleteById(id) {
    const [result] = await db.query("DELETE FROM Pacientes WHERE id = ?", [id]);

    return result.affectedRows > 0;
  }
}
