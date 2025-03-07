import { Controller, Post, Body } from '@nestjs/common';
import { SendMailUseCase } from 'src/application/use-cases/send-mail.use-case';
import { IMail } from 'src/domain/interfaces/IMail';

@Controller('mail')
export class MailController {
  constructor(private readonly sendMailUseCase: SendMailUseCase) {}

  @Post('send')
  async sendMail(@Body() mail: IMail): Promise<void> {
    console.log('📩 Recibida petición en /mail/send con:', mail); // 👈 Log para ver si entra
    await this.sendMailUseCase.execute(mail);
  }
}