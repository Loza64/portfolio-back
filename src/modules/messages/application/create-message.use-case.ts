import { ContactMessage } from 'src/modules/messages/domain/message.entity';
import { MessageRepository } from 'src/modules/messages/domain/message.repository';
import { MailSender } from 'src/shared/infrastructure/mail/domain/mail-sender.port';
import { CreateMessageDto } from 'src/modules/messages/application/create-message.dto';
import { errorLog } from 'src/shared/logger/logger';

export class CreateMessageUseCase {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly mailSender: MailSender,
  ) { }

  async execute(input: CreateMessageDto): Promise<ContactMessage> {
    const message = new ContactMessage(
      crypto.randomUUID(),
      input.firstName,
      input.lastName,
      input.phone,
      input.email,
      input.message,
    );

    const saved = await this.messageRepository.save(message);

    // El correo es una notificacion secundaria: si falla, no debe tumbar
    // la creacion del mensaje (que ya quedo persistido).
    try {
      await this.mailSender.sendContactNotification(saved);
    } catch (err) {
      errorLog('No se pudo enviar el correo de notificacion: %O', err);
    }

    return saved;
  }
}
