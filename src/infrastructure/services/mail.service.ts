import { Injectable } from '@nestjs/common';
import { MailServicePort } from '../../domain/ports/mail-service.port';
import { IMail } from '../../domain/interfaces/IMail';
import { MailTemplateService } from '../services/mail-template.service';
import { channel, QUEUE_NAME } from '../../config/rabbitmq.config';
import { NodemailerService } from './nodemailer.service';
import { MailConsumerPort } from 'src/domain/ports/mail-monsumer.port';

@Injectable()
export class MailService implements MailServicePort, MailConsumerPort {
  constructor(
    private readonly templateService: MailTemplateService,
    private readonly nodemailerService: NodemailerService, // 👈 Inyectamos correctamente
  ) {}

  async sendMail(mail: IMail): Promise<void> {
    const { template, payload } = mail;
    const htmlContent = this.templateService.renderTemplate(template, payload);

    const enrichedMail = { ...mail, html: htmlContent };

    if (channel) {
      channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(enrichedMail)), { persistent: true });
      console.log('📩 Correo encolado en RabbitMQ:', enrichedMail);
    } else {
      console.error('❌ Error: RabbitMQ no está disponible');
    }
  }

  async processMail(mail: IMail): Promise<void> {
    try {      
      if (typeof mail.payload !== 'string') {
        mail.payload = JSON.stringify(mail.payload, null, 2);    
        console.log('📩 Payload recibido:', mail.payload);
    
      }
      await this.nodemailerService.send(mail);
      console.log('✅ Correo enviado correctamente.');
    } catch (error) {
      console.error('❌ Error al enviar el correo:', error);
    }
  }
}