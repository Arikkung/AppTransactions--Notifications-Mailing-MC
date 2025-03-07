
import { channel, QUEUE_NAME } from 'src/config/rabbitmq.config';
import { MailService } from '../services/mail.service';

export const consumeMailQueue = async (mailService: MailService) => {
  if (!channel) {
    console.error('❌ Error: RabbitMQ no está disponible');
    return;
  }

  await channel.consume(
    QUEUE_NAME,
    async (message) => {
      if (message) {
        const mailData = JSON.parse(message.content.toString());
        console.log('📩 Procesando correo:', mailData);
        console.log('📩 Mensaje recibido de RabbitMQ:', mailData);

        await mailService.processMail(mailData);

        channel.ack(message);
      }
    },
    { noAck: false }
  );

  console.log('🔄 Consumidor de RabbitMQ activo...');
};