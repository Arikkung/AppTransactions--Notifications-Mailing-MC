import { Injectable } from '@nestjs/common';
import { MailServicePort } from '../../domain/ports/mail-service.port';
import { IMail } from '../../domain/interfaces/IMail';
import client from '../../config/redis.config';
import { MailTemplateService } from '../services/mail-template.service';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService implements MailServicePort {
  private templateService = new MailTemplateService();

  async sendMail(mail: IMail): Promise<void> {
    const { template, payload } = mail;
    const htmlContent = await this.templateService.renderTemplate(template, payload);
  
    // Agregar el contenido HTML al correo
    const enrichedMail = { ...mail, html: htmlContent };
  
    await client.publish('mail_channel', JSON.stringify(enrichedMail));
  
    await this.processMail(enrichedMail);
  }  

  private async processMail(mail: IMail): Promise<void> {
    try {
        console.log(`✉️ Enviando correo a ${mail.to}...`);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const htmlContent = this.templateService.renderTemplate(mail.template, mail.payload);

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: mail.to,
            subject: mail.subject,
            html: htmlContent,
        });

        console.log('✅ Correo enviado:', info.messageId);
    } catch (error) {
        console.error('❌ Error al enviar el correo:', error);
    }
  }
}