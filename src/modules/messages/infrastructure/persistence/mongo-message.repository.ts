import { ContactMessage } from 'src/modules/messages/domain/message.entity';
import { MessageRepository } from 'src/modules/messages/domain/message.repository';
import { MessageModel, MessageDocument } from 'src/modules/messages/infrastructure/persistence/message.schema';

const toDomain = (doc: MessageDocument): ContactMessage =>
  new ContactMessage(
    doc.id as string,
    doc.firstName,
    doc.lastName,
    doc.phone,
    doc.email,
    doc.message,
    doc.createdAt,
  );

export class MongoMessageRepository implements MessageRepository {
  async findAll(): Promise<ContactMessage[]> {
    const docs = await MessageModel.find().sort({ createdAt: -1 });
    return docs.map(toDomain);
  }

  async save(message: ContactMessage): Promise<ContactMessage> {
    const doc = await MessageModel.create({
      firstName: message.firstName,
      lastName: message.lastName,
      phone: message.phone,
      email: message.email,
      message: message.message,
      createdAt: message.createdAt,
    });

    return toDomain(doc);
  }
}
