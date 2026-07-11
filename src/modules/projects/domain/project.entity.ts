export interface ProjectLinks {
  github?: string | null;
  app?: string | null;
}

export interface ProjectImage {
  url: string;
  publicId: string;
}

export class Project {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly image: ProjectImage,
    public readonly links: ProjectLinks,
    public readonly createdAt: Date = new Date(),
  ) {}

  toPublic() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      image: this.image,
      links: this.links,
      createdAt: this.createdAt,
    };
  }
}
