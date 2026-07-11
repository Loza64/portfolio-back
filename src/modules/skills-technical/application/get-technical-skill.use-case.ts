import { AppError } from 'src/shared/errors/AppError';
import { TechnicalSkill } from 'src/modules/skills-technical/domain/technical-skill.entity';
import { TechnicalSkillRepository } from 'src/modules/skills-technical/domain/technical-skill.repository';

export class GetTechnicalSkillUseCase {
  constructor(private readonly skillRepository: TechnicalSkillRepository) {}

  async execute(id: string): Promise<TechnicalSkill> {
    const skill = await this.skillRepository.findById(id);

    if (!skill) {
      throw new AppError('Habilidad tecnica no encontrada', 404);
    }

    return skill;
  }
}
