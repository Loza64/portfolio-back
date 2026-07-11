import { TechnicalSkill } from 'src/modules/skills-technical/domain/technical-skill.entity';

export interface TechnicalSkillRepository {
  findAll(): Promise<TechnicalSkill[]>;
  findById(id: string): Promise<TechnicalSkill | null>;
  existsByName(name: string): Promise<boolean>;
  save(skill: TechnicalSkill): Promise<TechnicalSkill>;
}

export const TECHNICAL_SKILL_REPOSITORY = Symbol('TECHNICAL_SKILL_REPOSITORY');
