import { CreateAboutUseCase } from 'src/modules/about/application/create-about.use-case';
import { AboutRepository } from 'src/modules/about/domain/about.repository';
import { About } from 'src/modules/about/domain/about.entity';

describe('CreateAboutUseCase', () => {
  const buildRepo = (): jest.Mocked<AboutRepository> => ({
    findAll: jest.fn(),
    findById: jest.fn(),
    existsByTitle: jest.fn(),
    save: jest.fn(),
  });

  it('crea un about cuando el titulo no existe', async () => {
    const repo = buildRepo();
    repo.existsByTitle.mockResolvedValue(false);
    repo.save.mockImplementation((about) => Promise.resolve(about));

    const useCase = new CreateAboutUseCase(repo);
    const result = await useCase.execute({
      date: '2024-01-01',
      title: 'Sobre mi',
      description: 'Descripcion de mas de diez caracteres.',
    });

    expect(result).toBeInstanceOf(About);
    expect(repo.save).toHaveBeenCalledTimes(1);
  });

  it('rechaza con 409 cuando el titulo ya existe', async () => {
    const repo = buildRepo();
    repo.existsByTitle.mockResolvedValue(true);

    const useCase = new CreateAboutUseCase(repo);

    await expect(
      useCase.execute({ date: '2024-01-01', title: 'Repetido', description: 'Descripcion valida aqui.' }),
    ).rejects.toMatchObject({ statusCode: 409 });
  });
});
