import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import indexRouter from "./routes/index.js";

import dotenv from "dotenv";
dotenv.config();

const { DB_URL, APP_PORT, APP_URI } = process.env;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((_) => {
    console.log("MongoDB conectado com sucesso.");

    const app = express();
    app.use(express.json());
    app.use(cors());

    app.use("/", indexRouter);

    app.listen(APP_PORT, () => {
      console.log(`Servidor rodando: ${APP_URI}:${APP_PORT}`);
    });
  })
  .catch((e) => {
    console.log("Erro ao inicializar servidor:\n", e);
  });