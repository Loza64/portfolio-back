import { ContactMessage } from 'src/modules/messages/domain/message.entity';

export interface MailSender {
  sendContactNotification(message: ContactMessage): Promise<void>;
}

export const MAIL_SENDER = Symbol('MAIL_SENDER');
