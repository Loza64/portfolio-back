import { ProfessionalSkill } from 'src/modules/skills-professional/domain/professional-skill.entity';
import { ProfessionalSkillRepository } from 'src/modules/skills-professional/domain/professional-skill.repository';
import { ProfessionalSkillModel, ProfessionalSkillDocument } from 'src/modules/skills-professional/infrastructure/persistence/professional-skill.schema';

const toDomain = (doc: ProfessionalSkillDocument): ProfessionalSkill =>
  new ProfessionalSkill(doc.id as string, doc.name, doc.percentage, doc.createdAt);

export class MongoProfessionalSkillRepository implements ProfessionalSkillRepository {
  async findAll(): Promise<ProfessionalSkill[]> {
    const docs = await ProfessionalSkillModel.find().sort({ createdAt: -1 });
    return docs.map(toDomain);
  }

  async findById(id: string): Promise<ProfessionalSkill | null> {
    const doc = await ProfessionalSkillModel.findById(id);
    return doc ? toDomain(doc) : null;
  }

  async existsByName(name: string): Promise<boolean> {
    const doc = await ProfessionalSkillModel.exists({ name });
    return !!doc;
  }

  async save(skill: ProfessionalSkill): Promise<ProfessionalSkill> {
    const doc = await ProfessionalSkillModel.create({
      name: skill.name,
      percentage: skill.percentage,
      createdAt: skill.createdAt,
    });

    return toDomain(doc);
  }
}
