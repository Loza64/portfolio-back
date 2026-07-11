export class ProfessionalSkill {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly percentage: number,
    public readonly createdAt: Date = new Date(),
  ) {}

  toPublic() {
    return {
      id: this.id,
      name: this.name,
      percentage: this.percentage,
      createdAt: this.createdAt,
    };
  }
}
