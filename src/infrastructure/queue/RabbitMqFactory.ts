import { SendNotification } from "../../application/use-cases/SendNotification";
import { IMessageQueue } from "../../domain/queues/IMessageQueue";
import { RabbitMQConnection } from "../config/rabbitMQConnection";
import { EmailService } from "../email/EmailService";


export class RabbitMQFactory implements IMessageQueue {

  constructor(){
    
  }

  

  async on(data: DataInput): Promise<void> {
    try {      
      await this.consume(data); 
    } catch (error) {
      console.error('Error starting the consumer:', error);
      process.exit(1); 
    }
  }

  async consume(data: DataInput): Promise<void> {
    try {
      const connection = await RabbitMQConnection();
      const channel = await connection.createChannel();
      
      await channel.assertExchange(data.exchange, 'direct', { durable: true });
      await channel.assertQueue(data.queue, { durable: true });
      await channel.bindQueue(data.queue, data.exchange, data.routingKey);

      console.log(`Waiting for messages in queue: ${data.queue}`);
      
      channel.consume(
        data.queue,
        async (msg) => {
          if (msg) {
            const messageContent = msg.content.toString();
            console.log(`${new Date().toLocaleString()}  Message received:`, messageContent);
          
            try {
              const parsedMessage = JSON.parse(messageContent); 
             
              if(parsedMessage){ 
                const emailService = new EmailService();  
                const sendNotification = new SendNotification(emailService);
                               
                sendNotification.execute(
                  parsedMessage.email,
                  parsedMessage.subject,
                  parsedMessage.message
                )
              }
              

              await this.processMessage(parsedMessage);              
              channel.ack(msg);
            } catch (error) {
              console.error('Error processing message:', error);              
              channel.nack(msg, false, false);
            }
          }
        },
        { noAck: false } 
      );
    } catch (error) {
      console.error('Error consuming messages from RabbitMQ:', error);
      throw error;
    }    
  }


  private async processMessage(message: any): Promise<void> {    
    console.log('Processing message:', message);    
    if (!message) {
      throw new Error('Message does not contain a valid amount.');
    }
    console.log(`Payment of ${JSON.stringify( message )} processed successfully.`);
  }

}


type DataInput = {
  exchange:string
  queue:string
  routingKey:string  
}