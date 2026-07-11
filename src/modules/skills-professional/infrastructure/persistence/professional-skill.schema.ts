import { Schema, model, Document } from 'mongoose';

export interface ProfessionalSkillDocument extends Document {
  name: string;
  icon: string,
  createdAt: Date;
}

const professionalSkillSchema = new Schema<ProfessionalSkillDocument>(
  {
    name: { type: String, required: true, unique: true, maxlength: 100 },
    icon: { type: String, required: true, unique: false },
    createdAt: { type: Date, default: () => new Date() },
  },
  { versionKey: false },
);

export const ProfessionalSkillModel = model<ProfessionalSkillDocument>(
  'ProfessionalSkill',
  professionalSkillSchema,
);
