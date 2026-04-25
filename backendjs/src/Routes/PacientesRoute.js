import { Router } from "express";
import PacientesController from "../Controller/PacientesController.js";

const router = Router();

router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

router.get("/", PacientesController.listarPacientes);
router.post("/", PacientesController.criarPaciente);
router.put("/:id", PacientesController.atualizarPaciente);
router.delete("/:id", PacientesController.deletarPaciente);

export default router;
