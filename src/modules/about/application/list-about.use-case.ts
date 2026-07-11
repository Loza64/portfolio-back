import { About } from 'src/modules/about/domain/about.entity';
import { AboutRepository } from 'src/modules/about/domain/about.repository';

export class ListAboutUseCase {
  constructor(private readonly aboutRepository: AboutRepository) {}

  execute(): Promise<About[]> {
    return this.aboutRepository.findAll();
  }
}
