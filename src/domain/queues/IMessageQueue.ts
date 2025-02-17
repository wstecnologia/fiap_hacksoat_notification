export interface IMessageQueue {
  
  on(data: DataInput):Promise<void>
  consume(data:DataInput):Promise<void>
}

type DataInput = {
  exchange:string
  queue:string
  routingKey:string  
}