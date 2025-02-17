import cors from 'cors';
import dotenv from "dotenv";
import express from 'express';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import { RabbitMQFactory } from './infrastructure/queue/RabbitMqFactory';
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

const rabbitOn = new RabbitMQFactory()
rabbitOn.on({
  exchange:'notification',
  queue:'file_progress',
  routingKey:'file_progress',  
})
export default app;