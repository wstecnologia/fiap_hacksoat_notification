import { notificationController } from "@/infrastructure/config/Container";
import { Router } from "express";

const router = Router();

router.post("/notificar", (req, res) => notificationController.send(req, res));

export default router;
