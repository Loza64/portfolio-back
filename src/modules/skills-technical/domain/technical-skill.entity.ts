export interface SkillImage {
  url: string;
  publicId: string;
}

export class TechnicalSkill {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly type: string,
    public readonly percentage: number,
    public readonly image: SkillImage,
    public readonly createdAt: Date = new Date(),
  ) {}

  toPublic() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      percentage: this.percentage,
      image: this.image,
      createdAt: this.createdAt,
    };
  }
}
