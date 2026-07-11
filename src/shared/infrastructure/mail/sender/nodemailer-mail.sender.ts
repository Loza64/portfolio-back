import nodemailer, { Transporter } from 'nodemailer';
import { env } from 'src/shared/config/env';
import { MailSender } from 'src/shared/infrastructure/mail/domain/mail-sender.port';
import { ContactMessage } from 'src/modules/messages/domain/message.entity';

export class NodemailerMailSender implements MailSender {
  private readonly transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.MAIL_HOST,
      port: env.MAIL_PORT,
      secure: true,
      auth: { user: env.MAIL_USER, pass: env.MAIL_PASS },
    });
  }

  async sendContactNotification(message: ContactMessage): Promise<void> {
    await this.transporter.sendMail({
      from: '"Portfolio Web" <noreply@example.com>',
      to: env.MAIL_TO,
      replyTo: message.email,
      subject: 'Nuevo mensaje de contacto desde el portfolio web',
      html: this.buildTemplate(message),
    });
  }

  private buildTemplate(message: ContactMessage): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background:#0f0f0f;color:#9f0;padding:20px;text-align:center;border-radius:8px 8px 0 0;">
          <h2 style="margin:0;">Nuevo mensaje de contacto</h2>
        </div>
        <div style="background:#fff;padding:24px;border-radius:0 0 8px 8px;">
          <p style="background:#f5f5f5;border-left:4px solid #000;padding:10px;font-style:italic;">
            ${message.message}
          </p>
          <ul>
            <li><strong>Nombre:</strong> ${message.firstName} ${message.lastName}</li>
            <li><strong>Email:</strong> ${message.email}</li>
            <li><strong>Telefono:</strong> ${message.phone}</li>
          </ul>
        </div>
      </div>
    `;
  }
}
