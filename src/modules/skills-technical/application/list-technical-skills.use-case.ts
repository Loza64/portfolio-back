import { TechnicalSkill } from 'src/modules/skills-technical/domain/technical-skill.entity';
import { TechnicalSkillRepository } from 'src/modules/skills-technical/domain/technical-skill.repository';

export class ListTechnicalSkillsUseCase {
  constructor(private readonly skillRepository: TechnicalSkillRepository) {}

  execute(): Promise<TechnicalSkill[]> {
    return this.skillRepository.findAll();
  }
}
