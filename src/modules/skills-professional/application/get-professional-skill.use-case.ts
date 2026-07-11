import { AppError } from 'src/shared/errors/AppError';
import { ProfessionalSkill } from 'src/modules/skills-professional/domain/professional-skill.entity';
import { ProfessionalSkillRepository } from 'src/modules/skills-professional/domain/professional-skill.repository';

export class GetProfessionalSkillUseCase {
  constructor(private readonly skillRepository: ProfessionalSkillRepository) {}

  async execute(id: string): Promise<ProfessionalSkill> {
    const skill = await this.skillRepository.findById(id);

    if (!skill) {
      throw new AppError('Habilidad profesional no encontrada', 404);
    }

    return skill;
  }
}
