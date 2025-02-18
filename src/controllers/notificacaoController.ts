import { Request, Response } from "express";
import { SendNotification } from "../application/use-cases/SendNotification";

export class NotificationController {
  constructor(private sendNotification: SendNotification) {}

  async send(req: Request, res: Response) {
    try {
      const { email, subject, message } = req.body;
      await this.sendNotification.execute(email, subject, message);
      res.json({ message: "Notificação enviada com sucesso!" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
