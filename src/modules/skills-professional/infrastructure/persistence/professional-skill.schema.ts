import { Schema, model, Document } from 'mongoose';

export interface ProfessionalSkillDocument extends Document {
  name: string;
  percentage: number;
  createdAt: Date;
}

const professionalSkillSchema = new Schema<ProfessionalSkillDocument>(
  {
    name: { type: String, required: true, unique: true, maxlength: 100 },
    percentage: { type: Number, required: true, min: 0, max: 100 },
    createdAt: { type: Date, default: () => new Date() },
  },
  { versionKey: false },
);

export const ProfessionalSkillModel = model<ProfessionalSkillDocument>(
  'ProfessionalSkill',
  professionalSkillSchema,
);
