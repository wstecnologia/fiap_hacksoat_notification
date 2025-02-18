# API de Envio de Notificações via E-mail

Esta API é responsável por enviar notificações via e-mail para os usuários. Ela consome as solicitações de envio de e-mails a partir de uma fila criada no **RabbitMQ**. Cada mensagem na fila contém os dados necessários para a notificação, como o destinatário, assunto, e conteúdo do e-mail.

## Tecnologias

- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework para a criação da API
- **Nodemailer** - Biblioteca para envio de e-mails
- **RabbitMQ** - Broker de mensagens para gerenciamento da fila
- **AMQP** - Protocolo de mensageria utilizado para interação com RabbitMQ

## Funcionalidade

A API realiza as seguintes funções:

1. **Consumir mensagens da fila RabbitMQ**: A API escuta a fila do RabbitMQ para novas mensagens que contenham informações sobre o envio de e-mails.
2. **Envio de e-mails**: Utilizando a biblioteca Nodemailer, a API envia e-mails para os destinatários definidos nas mensagens.
3. **Respostas e Logs**: Após o envio do e-mail, a API registra o sucesso ou falha do envio e retorna uma resposta.


### Pré-requisitos

- Node.js (versão 18 ou superior)
- RabbitMQ configurado e rodando



## Instalação.
**Comandos para iniciar**: 
 1. Npm install
 2. Npm run build
 3. Npm start
   
OBS.: Para utilização e necessario renomear o arquivo .env_exemplo para .env 
E adicionar os valores de cada parametro.
  

## Utilização do Cognito com terraform 
**Comandos uteis** 
  


## Utilizar Imagem do docker
docker-compose down && docker-compose pull && docker-compose up -d

## Verificar o log do container 
docker logs -f fiap_hacksoat_notification
