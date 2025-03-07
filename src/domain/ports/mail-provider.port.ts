import { IMail } from "../interfaces/IMail";

export interface MailProviderPort {
    send(mail: IMail): Promise<void>;
  }
  