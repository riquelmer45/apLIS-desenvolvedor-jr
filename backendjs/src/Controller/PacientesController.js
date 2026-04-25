import PacientesService from "./../Service/PacientesService.js";

export default class PacientesController {
  static async listarPacientes(req, res) {
    try {
      const pacientes = await PacientesService.listarPacientes();
      return res.status(200).json(pacientes);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao listar pacientes." });
    }
  }

  static async criarPaciente(req, res) {
    try {
      await PacientesService.criarPaciente(req.body);
      return res.status(201).json({ mensagem: "Paciente criado com sucesso." });
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        return res
          .status(409)
          .json({ mensagem: "CPF ou carteirinha ja cadastrados." });
      }

      const status = error.status || 500;
      const mensagem =
        status === 400 ? error.message : "Erro ao criar paciente.";

      return res.status(status).json({ mensagem });
    }
  }

  static async atualizarPaciente(req, res) {
    try {
      const id = Number(req.params.id);
      const updated = await PacientesService.atualizarPaciente(id, req.body);

      if (!updated) {
        return res.status(404).json({ mensagem: "Paciente nao encontrado." });
      }

      return res
        .status(200)
        .json({ mensagem: "Paciente atualizado com sucesso." });
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        return res
          .status(409)
          .json({ mensagem: "CPF ou carteirinha ja cadastrados." });
      }

      const status = error.status || 500;
      const mensagem =
        status === 400 ? error.message : "Erro ao atualizar paciente.";

      return res.status(status).json({ mensagem });
    }
  }

  static async deletarPaciente(req, res) {
    try {
      const id = Number(req.params.id);
      const deleted = await PacientesService.deletarPaciente(id);

      if (!deleted) {
        return res.status(404).json({ mensagem: "Paciente nao encontrado." });
      }

      return res
        .status(200)
        .json({ mensagem: "Paciente removido com sucesso." });
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao remover paciente." });
    }
  }
}
