import { AppError } from 'src/shared/errors/AppError';
import { Project } from 'src/modules/projects/domain/project.entity';
import { ProjectRepository } from 'src/modules/projects/domain/project.repository';

export class GetProjectUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(id: string): Promise<Project> {
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new AppError('Proyecto no encontrado', 404);
    }

    return project;
  }
}
