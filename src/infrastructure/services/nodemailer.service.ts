import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { IMail } from '../../domain/interfaces/IMail';
import { MailProviderPort } from 'src/domain/ports/mail-provider.port';
import { MailTemplateService } from './mail-template.service';

@Injectable()
export class NodemailerService implements MailProviderPort {
    constructor(private readonly templateService: MailTemplateService){}
   async send(mail: IMail): Promise<void> {
    try {
        console.log(`✉️ Enviando correo a ${mail.to}...`);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const htmlContent = mail.html;

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: mail.to,
            subject: mail.subject,
            html: htmlContent,
        });

    } catch (error) {
        console.error('❌ Error al enviar el correo:', error);
    }
  }
}