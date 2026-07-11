import { Project } from 'src/modules/projects/domain/project.entity';
import { ProjectRepository } from 'src/modules/projects/domain/project.repository';

export class ListProjectsUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  execute(): Promise<Project[]> {
    return this.projectRepository.findAll();
  }
}
