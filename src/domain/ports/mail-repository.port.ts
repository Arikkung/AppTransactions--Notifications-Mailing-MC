import { IMail } from "../interfaces/IMail";

export interface MailRepositoryPort {
    saveMail(mail: IMail): Promise<void>;
}