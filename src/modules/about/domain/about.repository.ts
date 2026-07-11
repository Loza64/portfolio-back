import { About } from 'src/modules/about/domain/about.entity';

export interface AboutRepository {
  findAll(): Promise<About[]>;
  findById(id: string): Promise<About | null>;
  existsByTitle(title: string): Promise<boolean>;
  save(about: About): Promise<About>;
}

export const ABOUT_REPOSITORY = Symbol('ABOUT_REPOSITORY');
