import PacientesModel from "./../Model/PacientesModel.js";

export default class PacientesService {
  static async listarPacientes() {
    return PacientesModel.getAllPacientes();
  }

  static async criarPaciente(paciente) {
    const { nome, dataNascimento, carteirinha, cpf } = paciente;

    if (!nome || !carteirinha || !cpf) {
      const error = new Error("Nome, carteirinha e CPF são obrigatórios.");
      error.status = 400;
      throw error;
    }

    const cpfLimpo = String(cpf).replace(/\D/g, "");

    if (cpfLimpo.length !== 11) {
      const error = new Error("CPF deve conter 11 digitos.");
      error.status = 400;
      throw error;
    }

    return PacientesModel.create({
      nome,
      dataNascimento,
      carteirinha,
      cpf: cpfLimpo,
    });
  }

  static async atualizarPaciente(id, paciente) {
    const { nome, dataNascimento, carteirinha, cpf } = paciente;

    if (!Number.isInteger(id) || id <= 0) {
      const error = new Error("Id invalido.");
      error.status = 400;
      throw error;
    }

    if (!nome || !carteirinha || !cpf) {
      const error = new Error("Nome, carteirinha e CPF sao obrigatorios.");
      error.status = 400;
      throw error;
    }

    const cpfLimpo = String(cpf).replace(/\D/g, "");

    if (cpfLimpo.length !== 11) {
      const error = new Error("CPF deve conter 11 digitos.");
      error.status = 400;
      throw error;
    }

    return PacientesModel.updateById(id, {
      nome,
      dataNascimento,
      carteirinha,
      cpf: cpfLimpo,
    });
  }

  static async deletarPaciente(id) {
    if (!Number.isInteger(id) || id <= 0) {
      const error = new Error("Id invalido.");
      error.status = 400;
      throw error;
    }

    return PacientesModel.deleteById(id);
  }
}
