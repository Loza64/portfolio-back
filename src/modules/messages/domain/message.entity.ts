export class ContactMessage {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly phone: string,
    public readonly email: string,
    public readonly message: string,
    public readonly createdAt: Date = new Date(),
  ) {}

  toPublic() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      email: this.email,
      message: this.message,
      createdAt: this.createdAt,
    };
  }
}
