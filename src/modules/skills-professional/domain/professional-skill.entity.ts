export class ProfessionalSkill {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly icon: string,
    public readonly createdAt: Date = new Date(),
  ) { }

  toPublic() {
    return {
      id: this.id,
      name: this.name,
      icon: this.icon,
      createdAt: this.createdAt,
    };
  }
}
