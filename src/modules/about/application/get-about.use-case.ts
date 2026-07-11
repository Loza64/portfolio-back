import { AppError } from 'src/shared/errors/AppError';
import { About } from 'src/modules/about/domain/about.entity';
import { AboutRepository } from 'src/modules/about/domain/about.repository';

export class GetAboutUseCase {
  constructor(private readonly aboutRepository: AboutRepository) {}

  async execute(id: string): Promise<About> {
    const about = await this.aboutRepository.findById(id);

    if (!about) {
      throw new AppError('Registro de about no encontrado', 404);
    }

    return about;
  }
}
