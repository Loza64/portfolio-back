import { Project } from 'src/modules/projects/domain/project.entity';

export interface ProjectRepository {
  findAll(): Promise<Project[]>;
  findById(id: string): Promise<Project | null>;
  existsByTitle(title: string): Promise<boolean>;
  save(project: Project): Promise<Project>;
}

export const PROJECT_REPOSITORY = Symbol('PROJECT_REPOSITORY');
