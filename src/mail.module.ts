import { Module } from '@nestjs/common';
import { MailController } from './infrastructure/controllers/mail.controller';
import { MailService } from './infrastructure/services/mail.service';
import { SendMailUseCase } from './application/use-cases/send-mail.use-case';


@Module({
  controllers: [MailController],
  providers: [
    MailService,
    {
      provide: SendMailUseCase,
      useFactory: (mailService: MailService) => new SendMailUseCase(mailService),
      inject: [MailService],
    },
  ],
})
export class MailModule {}