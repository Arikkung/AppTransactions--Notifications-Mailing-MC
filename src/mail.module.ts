import { Module } from '@nestjs/common';
import { SendMailUseCase } from 'src/application/use-cases/send-mail.use-case';
import { MailService } from './infrastructure/services/mail.service';
import { MailTemplateService } from './infrastructure/services/mail-template.service';
import { MailController } from './infrastructure/controllers/mail.controller';
import { NodemailerService } from './infrastructure/services/nodemailer.service';
import { RedisService } from './infrastructure/services/redis.service';

@Module({
  controllers: [MailController],
  providers: [
    MailService,
    MailTemplateService,
    NodemailerService, 
    RedisService,
    {
      provide: SendMailUseCase,
      useFactory: (mailService: MailService) => new SendMailUseCase(mailService),
      inject: [MailService],
    },
  ],
  exports: [MailService],
})
export class MailModule {}