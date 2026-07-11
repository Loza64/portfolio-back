import { ProfessionalSkill } from 'src/modules/skills-professional/domain/professional-skill.entity';
import { ProfessionalSkillRepository } from 'src/modules/skills-professional/domain/professional-skill.repository';

export class ListProfessionalSkillsUseCase {
  constructor(private readonly skillRepository: ProfessionalSkillRepository) {}

  execute(): Promise<ProfessionalSkill[]> {
    return this.skillRepository.findAll();
  }
}
