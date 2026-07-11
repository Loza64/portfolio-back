import { CreateMessageUseCase } from 'src/modules/messages/application/create-message.use-case';
import { MessageRepository } from 'src/modules/messages/domain/message.repository';
import { MailSender } from 'src/shared/infrastructure/mail/domain/mail-sender.port';

describe('CreateMessageUseCase', () => {
  const dto = {
    firstName: 'Roberto',
    lastName: 'Loza',
    email: 'roberto@example.com',
    phone: '+50370000000',
    message: 'Este es un mensaje de prueba con suficiente longitud.',
  };

  it('guarda el mensaje y notifica por correo', async () => {
    const repo: jest.Mocked<MessageRepository> = {
      findAll: jest.fn(),
      save: jest.fn().mockImplementation((m) => Promise.resolve(m)),
    };
    const mailSender: jest.Mocked<MailSender> = { sendContactNotification: jest.fn().mockResolvedValue(undefined) };

    const useCase = new CreateMessageUseCase(repo, mailSender);
    const result = await useCase.execute(dto);

    expect(repo.save).toHaveBeenCalledTimes(1);
    expect(mailSender.sendContactNotification).toHaveBeenCalledWith(result);
  });

  it('no falla si el envio de correo falla (el mensaje ya quedo guardado)', async () => {
    const repo: jest.Mocked<MessageRepository> = {
      findAll: jest.fn(),
      save: jest.fn().mockImplementation((m) => Promise.resolve(m)),
    };
    const mailSender: jest.Mocked<MailSender> = {
      sendContactNotification: jest.fn().mockRejectedValue(new Error('SMTP caido')),
    };

    const useCase = new CreateMessageUseCase(repo, mailSender);

    await expect(useCase.execute(dto)).resolves.toBeDefined();
  });
});
