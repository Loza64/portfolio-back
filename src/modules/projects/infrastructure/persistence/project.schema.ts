import { Schema, model, Document } from 'mongoose';

export interface ProjectDocument extends Document {
  title: string;
  description: string;
  image: { url: string; publicId: string };
  links: { github?: string | null; app?: string | null };
  createdAt: Date;
}

const projectSchema = new Schema<ProjectDocument>(
  {
    title: { type: String, required: true, unique: true, maxlength: 100 },
    description: { type: String, required: true, maxlength: 500 },
    image: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
      _id: false,
    },
    links: {
      github: { type: String, default: null },
      app: { type: String, default: null },
      _id: false,
    },
    createdAt: { type: Date, default: () => new Date() },
  },
  { versionKey: false },
);

export const ProjectModel = model<ProjectDocument>('Project', projectSchema);
