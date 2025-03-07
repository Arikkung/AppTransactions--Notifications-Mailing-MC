import { connect, Channel, Connection } from 'amqplib';
import * as dotenv from 'dotenv';

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL;
const EXCHANGE_NAME = 'mail_exchange';
const QUEUE_NAME = 'mail_queue';

let channel: Channel;

const setupRabbitMQ = async () => {
  try {
    const connection: Connection = await connect(RABBITMQ_URL);
    channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true });
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, '');

    console.log('✅ Conectado a RabbitMQ en la nube');
  } catch (error) {
    console.error('❌ Error conectando a RabbitMQ:', error);
  }
};

export { setupRabbitMQ, channel, QUEUE_NAME };