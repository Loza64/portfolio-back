import { AppError } from 'src/shared/errors/AppError';
import { ProfessionalSkill } from 'src/modules/skills-professional/domain/professional-skill.entity';
import { ProfessionalSkillRepository } from 'src/modules/skills-professional/domain/professional-skill.repository';
import { CreateProfessionalSkillDto } from 'src/modules/skills-professional/application/create-professional-skill.dto';

export class CreateProfessionalSkillUseCase {
  constructor(private readonly skillRepository: ProfessionalSkillRepository) {}

  async execute(input: CreateProfessionalSkillDto): Promise<ProfessionalSkill> {
    const alreadyExists = await this.skillRepository.existsByName(input.name);
    if (alreadyExists) {
      throw new AppError('Ya existe una habilidad profesional con ese nombre', 409);
    }

    const skill = new ProfessionalSkill(crypto.randomUUID(), input.name, input.percentage);

    return this.skillRepository.save(skill);
  }
}
