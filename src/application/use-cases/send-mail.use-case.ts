import { IMail } from "../../domain/interfaces/IMail";
import { MailServicePort } from "../../domain/ports/mail-service.port";

export class SendMailUseCase {
  constructor(private readonly mailService: MailServicePort) {}

  async execute(mail: IMail): Promise<void> {
    await this.mailService.sendMail(mail);
  }
}