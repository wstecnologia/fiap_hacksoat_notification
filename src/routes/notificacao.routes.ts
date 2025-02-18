import { Router } from "express";
import { notificationController } from "../infrastructure/config/Container";

const router = Router();

router.post("/notificar", (req, res) => notificationController.send(req, res));

export default router;
