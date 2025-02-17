import { SendNotification } from "@/application/use-cases/SendNotification";
import { NotificationController } from "@/controllers/notificacaoController";
import { EmailService } from "../email/EmailService";

// Injeta dependências
const emailService = new EmailService();
const sendNotification = new SendNotification(emailService);
const notificationController = new NotificationController(sendNotification);

export { notificationController };

