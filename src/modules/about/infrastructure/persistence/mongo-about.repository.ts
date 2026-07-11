import { About } from 'src/modules/about/domain/about.entity';
import { AboutRepository } from 'src/modules/about/domain/about.repository';
import { AboutModel, AboutDocument } from 'src/modules/about/infrastructure/persistence/about.schema';

const toDomain = (doc: AboutDocument): About =>
  new About(doc.id as string, doc.date, doc.title, doc.description, doc.createdAt);

export class MongoAboutRepository implements AboutRepository {
  async findAll(): Promise<About[]> {
    const docs = await AboutModel.find().sort({ createdAt: -1 });
    return docs.map(toDomain);
  }

  async findById(id: string): Promise<About | null> {
    const doc = await AboutModel.findById(id);
    return doc ? toDomain(doc) : null;
  }

  async existsByTitle(title: string): Promise<boolean> {
    const doc = await AboutModel.exists({ title });
    return !!doc;
  }

  async save(about: About): Promise<About> {
    const doc = await AboutModel.create({
      date: about.date,
      title: about.title,
      description: about.description,
      createdAt: about.createdAt,
    });

    return toDomain(doc);
  }
}
