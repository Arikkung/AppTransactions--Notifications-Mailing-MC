import { IMail } from "../interfaces/IMail";

export interface MailServicePort {
    sendMail(mail: IMail): Promise<void>;
}