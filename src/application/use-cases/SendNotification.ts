import { INotificationService } from "../../domain/interfaces/INotificationService";
import { Notification } from "../../domain/Notification";

export class SendNotification {
  constructor(private notificationService: INotificationService) {}

  async execute(recipient: string, subject: string, message: string): Promise<void> {
    const notification = new Notification(recipient, subject, message);
    await this.notificationService.send(notification);
  }
}
