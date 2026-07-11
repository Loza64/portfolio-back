import { SocketNotificationPublisher } from 'src/shared/realtime/websocket/socket-notification.publisher';
import { NotifyAllUseCase } from 'src/modules/notification/application/notify-all.use-case';
import { NotificationController } from 'src/modules/notification/infrastructure/http/notification.controller';
import { CloudinaryImageUploader } from 'src/shared/infrastructure/cloudinary/cloudinary-image-uploader';

// --- Modulo about ---
import { MongoAboutRepository } from 'src/modules/about/infrastructure/persistence/mongo-about.repository';
import { CreateAboutUseCase } from 'src/modules/about/application/create-about.use-case';
import { ListAboutUseCase } from 'src/modules/about/application/list-about.use-case';
import { GetAboutUseCase } from 'src/modules/about/application/get-about.use-case';
import { AboutController } from 'src/modules/about/infrastructure/http/about.controller';

// --- Modulo messages ---
import { MongoMessageRepository } from 'src/modules/messages/infrastructure/persistence/mongo-message.repository';
import { NodemailerMailSender } from 'src/shared/infrastructure/mail/sender/nodemailer-mail.sender';
import { CreateMessageUseCase } from 'src/modules/messages/application/create-message.use-case';
import { MessageController } from 'src/modules/messages/infrastructure/http/message.controller';

// --- Modulo projects ---
import { MongoProjectRepository } from 'src/modules/projects/infrastructure/persistence/mongo-project.repository';
import { CreateProjectUseCase } from 'src/modules/projects/application/create-project.use-case';
import { ListProjectsUseCase } from 'src/modules/projects/application/list-projects.use-case';
import { GetProjectUseCase } from 'src/modules/projects/application/get-project.use-case';
import { ProjectController } from 'src/modules/projects/infrastructure/http/project.controller';

// --- Modulo skills/technical ---
import { MongoTechnicalSkillRepository } from 'src/modules/skills-technical/infrastructure/persistence/mongo-technical-skill.repository';
import { CreateTechnicalSkillUseCase } from 'src/modules/skills-technical/application/create-technical-skill.use-case';
import { ListTechnicalSkillsUseCase } from 'src/modules/skills-technical/application/list-technical-skills.use-case';
import { GetTechnicalSkillUseCase } from 'src/modules/skills-technical/application/get-technical-skill.use-case';
import { TechnicalSkillController } from 'src/modules/skills-technical/infrastructure/http/technical-skill.controller';

// --- Modulo skills/professional ---
import { MongoProfessionalSkillRepository } from 'src/modules/skills-professional/infrastructure/persistence/mongo-professional-skill.repository';
import { CreateProfessionalSkillUseCase } from 'src/modules/skills-professional/application/create-professional-skill.use-case';
import { ListProfessionalSkillsUseCase } from 'src/modules/skills-professional/application/list-professional-skills.use-case';
import { GetProfessionalSkillUseCase } from 'src/modules/skills-professional/application/get-professional-skill.use-case';
import { ProfessionalSkillController } from 'src/modules/skills-professional/infrastructure/http/professional-skill.controller';

export const buildContainer = () => {

  // --- Puerto de tiempo real (shared), una sola instancia compartida ---
  const notificationPublisher = new SocketNotificationPublisher();

  // --- Modulo notification ---
  const notifyAllUseCase = new NotifyAllUseCase(notificationPublisher);
  const notificationController = new NotificationController(notifyAllUseCase);

  // --- Puerto de subida de imagenes (shared), una sola instancia compartida ---
  const imageUploader = new CloudinaryImageUploader();

  // --- Modulo about ---
  const aboutRepository = new MongoAboutRepository();
  const aboutController = new AboutController(
    new CreateAboutUseCase(aboutRepository),
    new ListAboutUseCase(aboutRepository),
    new GetAboutUseCase(aboutRepository),
  );

  // --- Modulo messages ---
  const messageRepository = new MongoMessageRepository();
  const mailSender = new NodemailerMailSender();
  const messageController = new MessageController(new CreateMessageUseCase(messageRepository, mailSender));

  // --- Modulo projects ---
  const projectRepository = new MongoProjectRepository();
  const projectController = new ProjectController(
    new CreateProjectUseCase(projectRepository, imageUploader),
    new ListProjectsUseCase(projectRepository),
    new GetProjectUseCase(projectRepository),
  );

  // --- Modulo skills/technical ---
  const technicalSkillRepository = new MongoTechnicalSkillRepository();
  const technicalSkillController = new TechnicalSkillController(
    new CreateTechnicalSkillUseCase(technicalSkillRepository, imageUploader),
    new ListTechnicalSkillsUseCase(technicalSkillRepository),
    new GetTechnicalSkillUseCase(technicalSkillRepository),
  );

  // --- Modulo skills/professional ---
  const professionalSkillRepository = new MongoProfessionalSkillRepository();
  const professionalSkillController = new ProfessionalSkillController(
    new CreateProfessionalSkillUseCase(professionalSkillRepository),
    new ListProfessionalSkillsUseCase(professionalSkillRepository),
    new GetProfessionalSkillUseCase(professionalSkillRepository),
  );

  return {
    notificationController,
    aboutController,
    messageController,
    projectController,
    technicalSkillController,
    professionalSkillController,
  };
};

export type Container = ReturnType<typeof buildContainer>;
