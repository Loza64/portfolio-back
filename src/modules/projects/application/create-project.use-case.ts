import { AppError } from 'src/shared/errors/AppError';
import { ImageUploader } from 'src/shared/ports/image-uploader.port';
import { Project } from 'src/modules/projects/domain/project.entity';
import { ProjectRepository } from 'src/modules/projects/domain/project.repository';
import { CreateProjectDto } from 'src/modules/projects/application/create-project.dto';

const CLOUDINARY_FOLDER = 'PORTFOLIO/projects';

export class CreateProjectUseCase {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly imageUploader: ImageUploader,
  ) {}

  async execute(input: CreateProjectDto, image?: Express.Multer.File): Promise<Project> {
    if (!image) {
      throw new AppError('La imagen del proyecto es requerida', 400);
    }

    const alreadyExists = await this.projectRepository.existsByTitle(input.title);
    if (alreadyExists) {
      throw new AppError('Ya existe un proyecto con ese titulo', 409);
    }

    const uploaded = await this.imageUploader.upload(image, CLOUDINARY_FOLDER);

    const project = new Project(
      crypto.randomUUID(),
      input.title,
      input.description,
      { url: uploaded.url, publicId: uploaded.publicId },
      { github: input.links.github ?? null, app: input.links.app ?? null },
    );

    return this.projectRepository.save(project);
  }
}
