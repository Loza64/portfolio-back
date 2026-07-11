import { AppError } from 'src/shared/errors/AppError';
import { ImageUploader } from 'src/shared/ports/image-uploader.port';
import { TechnicalSkill } from 'src/modules/skills-technical/domain/technical-skill.entity';
import { TechnicalSkillRepository } from 'src/modules/skills-technical/domain/technical-skill.repository';
import { CreateTechnicalSkillDto } from 'src/modules/skills-technical/application/create-technical-skill.dto';

const CLOUDINARY_FOLDER = 'PORTFOLIO/skills/technical';

export class CreateTechnicalSkillUseCase {
  constructor(
    private readonly skillRepository: TechnicalSkillRepository,
    private readonly imageUploader: ImageUploader,
  ) {}

  async execute(input: CreateTechnicalSkillDto, image?: Express.Multer.File): Promise<TechnicalSkill> {
    if (!image) {
      throw new AppError('La imagen de la habilidad es requerida', 400);
    }

    const alreadyExists = await this.skillRepository.existsByName(input.name);
    if (alreadyExists) {
      throw new AppError('Ya existe una habilidad tecnica con ese nombre', 409);
    }

    const uploaded = await this.imageUploader.upload(image, CLOUDINARY_FOLDER);

    const skill = new TechnicalSkill(crypto.randomUUID(), input.name, input.type, input.percentage, {
      url: uploaded.url,
      publicId: uploaded.publicId,
    });

    return this.skillRepository.save(skill);
  }
}
