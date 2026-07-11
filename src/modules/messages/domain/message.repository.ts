import { ContactMessage } from 'src/modules/messages/domain/message.entity';

export interface MessageRepository {
  findAll(): Promise<ContactMessage[]>;
  save(message: ContactMessage): Promise<ContactMessage>;
}

export const MESSAGE_REPOSITORY = Symbol('MESSAGE_REPOSITORY');
