export class Notification {
  constructor(
    public recipient: string,
    public subject: string,
    public message: string
  ) {}

  validate() {
    if (!this.recipient || !this.subject || !this.message) {
      throw new Error("Todos os campos são obrigatórios.");
    }
  }
}
