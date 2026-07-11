import { Schema, model, Document } from 'mongoose';

export interface TechnicalSkillDocument extends Document {
  name: string;
  type: string;
  percentage: number;
  image: { url: string; publicId: string };
  createdAt: Date;
}

const technicalSkillSchema = new Schema<TechnicalSkillDocument>(
  {
    name: { type: String, required: true, unique: true, maxlength: 100 },
    type: { type: String, required: true, maxlength: 100 },
    percentage: { type: Number, required: true, min: 0, max: 100 },
    image: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
      _id: false,
    },
    createdAt: { type: Date, default: () => new Date() },
  },
  { versionKey: false },
);

export const TechnicalSkillModel = model<TechnicalSkillDocument>('TechnicalSkill', technicalSkillSchema);
