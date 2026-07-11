import { ProfessionalSkill } from 'src/modules/skills-professional/domain/professional-skill.entity';

export interface ProfessionalSkillRepository {
  findAll(): Promise<ProfessionalSkill[]>;
  findById(id: string): Promise<ProfessionalSkill | null>;
  existsByName(name: string): Promise<boolean>;
  save(skill: ProfessionalSkill): Promise<ProfessionalSkill>;
}

export const PROFESSIONAL_SKILL_REPOSITORY = Symbol('PROFESSIONAL_SKILL_REPOSITORY');
