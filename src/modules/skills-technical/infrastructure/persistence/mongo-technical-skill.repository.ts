import { TechnicalSkill } from 'src/modules/skills-technical/domain/technical-skill.entity';
import { TechnicalSkillRepository } from 'src/modules/skills-technical/domain/technical-skill.repository';
import { TechnicalSkillModel, TechnicalSkillDocument } from 'src/modules/skills-technical/infrastructure/persistence/technical-skill.schema';

const toDomain = (doc: TechnicalSkillDocument): TechnicalSkill =>
  new TechnicalSkill(
    doc.id as string,
    doc.name,
    doc.type,
    doc.percentage,
    { url: doc.image.url, publicId: doc.image.publicId },
    doc.createdAt,
  );

export class MongoTechnicalSkillRepository implements TechnicalSkillRepository {
  async findAll(): Promise<TechnicalSkill[]> {
    const docs = await TechnicalSkillModel.find().sort({ createdAt: -1 });
    return docs.map(toDomain);
  }

  async findById(id: string): Promise<TechnicalSkill | null> {
    const doc = await TechnicalSkillModel.findById(id);
    return doc ? toDomain(doc) : null;
  }

  async existsByName(name: string): Promise<boolean> {
    const doc = await TechnicalSkillModel.exists({ name });
    return !!doc;
  }

  async save(skill: TechnicalSkill): Promise<TechnicalSkill> {
    const doc = await TechnicalSkillModel.create({
      name: skill.name,
      type: skill.type,
      percentage: skill.percentage,
      image: skill.image,
      createdAt: skill.createdAt,
    });

    return toDomain(doc);
  }
}
