import cors from 'cors';
import dotenv from "dotenv";
import express from 'express';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import notificacaoRoutes from './routes/notificacao.routes';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', notificacaoRoutes);
app.use(
  "/api",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
      swaggerOptions: { persistAuthorization: true },
  }),
)
export default app;