import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import connectionDB from "./Config/db.js";
import routes from "./Routes/PacientesRoute.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

// Rotas
app.use("/api/v1/pacientes", routes);
app.get("/", (req, res) => {
  res.send("Olá, mundo!");
});

// Iniciar o servidor
async function startServer() {
  try {
    await connectionDB.getConnection();
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }

  const PORT = Number(process.env.APP_PORT) || 3003;

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

startServer();
