import { Project } from 'src/modules/projects/domain/project.entity';
import { ProjectRepository } from 'src/modules/projects/domain/project.repository';
import { ProjectModel, ProjectDocument } from 'src/modules/projects/infrastructure/persistence/project.schema';

const toDomain = (doc: ProjectDocument): Project =>
  new Project(
    doc.id as string,
    doc.title,
    doc.description,
    { url: doc.image.url, publicId: doc.image.publicId },
    { github: doc.links?.github ?? null, app: doc.links?.app ?? null },
    doc.createdAt,
  );

export class MongoProjectRepository implements ProjectRepository {
  async findAll(): Promise<Project[]> {
    const docs = await ProjectModel.find().sort({ createdAt: -1 });
    return docs.map(toDomain);
  }

  async findById(id: string): Promise<Project | null> {
    const doc = await ProjectModel.findById(id);
    return doc ? toDomain(doc) : null;
  }

  async existsByTitle(title: string): Promise<boolean> {
    const doc = await ProjectModel.exists({ title });
    return !!doc;
  }

  async save(project: Project): Promise<Project> {
    const doc = await ProjectModel.create({
      title: project.title,
      description: project.description,
      image: project.image,
      links: project.links,
      createdAt: project.createdAt,
    });

    return toDomain(doc);
  }
}
