export class About {
  constructor(
    public readonly id: string,
    public readonly date: string,
    public readonly title: string,
    public readonly description: string,
    public readonly createdAt: Date = new Date(),
  ) {}

  toPublic() {
    return {
      id: this.id,
      date: this.date,
      title: this.title,
      description: this.description,
      createdAt: this.createdAt,
    };
  }
}
