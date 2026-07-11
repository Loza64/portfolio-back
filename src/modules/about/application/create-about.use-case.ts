import { AppError } from 'src/shared/errors/AppError';
import { About } from 'src/modules/about/domain/about.entity';
import { AboutRepository } from 'src/modules/about/domain/about.repository';
import { CreateAboutDto } from 'src/modules/about/application/create-about.dto';

export class CreateAboutUseCase {
  constructor(private readonly aboutRepository: AboutRepository) {}

  async execute(input: CreateAboutDto): Promise<About> {
    const alreadyExists = await this.aboutRepository.existsByTitle(input.title);

    if (alreadyExists) {
      throw new AppError('Ya existe un registro de about con ese titulo', 409);
    }

    const about = new About(crypto.randomUUID(), input.date, input.title, input.description);

    return this.aboutRepository.save(about);
  }
}
