import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { SendMailUseCase } from 'src/application/use-cases/send-mail.use-case';
import { IMail } from 'src/domain/interfaces/IMail';
import { RedisService } from '../services/redis.service';

@Controller('mail')
export class MailController {
  constructor(private readonly sendMailUseCase: SendMailUseCase, private readonly redisService: RedisService) {}

  @Post('send')
  async sendMail(@Body() mail: IMail): Promise<void> {
    console.log('📩 Recibida petición en /mail/send con:', mail); // 👈 Log para ver si entra
    await this.sendMailUseCase.execute(mail);
  }

  @Get('notifications/:email')
  async getNotifications(@Param('email') email: string): Promise<object | null> {
    return this.redisService.getNotification(`notification:${email}`);
  }
}