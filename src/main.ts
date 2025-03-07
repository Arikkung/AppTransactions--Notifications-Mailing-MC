import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupRabbitMQ } from './config/rabbitmq.config';
import { consumeMailQueue } from './infrastructure/consumers/mail.consumer';
import { MailService } from './infrastructure/services/mail.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await setupRabbitMQ();
  await consumeMailQueue(app.get(MailService));

  await app.listen(3000);
  console.log('🚀 Servidor corriendo en http://localhost:3000');
}
bootstrap();