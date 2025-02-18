import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { INotificationService } from "../../domain/interfaces/INotificationService";
import { Notification } from "../../domain/Notification";

dotenv.config();

export class EmailService implements INotificationService {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  async send(notification: Notification): Promise<void> {
    try {
      notification.validate();

      await this.transporter.sendMail({
        from: `"Notificação API" <${process.env.SMTP_USER}>`,
        to: notification.recipient,
        subject: notification.subject,
        text: notification.message,
      });

      console.log(`📩 Email enviado para ${notification.recipient}`);
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      throw new Error("Falha ao enviar notificação.");
    }
  }
}
