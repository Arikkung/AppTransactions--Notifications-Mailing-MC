import { IMail } from '../interfaces/IMail';

export interface MailConsumerPort {
  processMail(mail: IMail): Promise<void>;
}