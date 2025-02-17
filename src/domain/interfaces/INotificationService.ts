import { Notification } from "../Notification";

export interface INotificationService {
  send(notification: Notification): Promise<void>;
}
