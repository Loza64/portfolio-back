import { Schema, model, Document } from 'mongoose';

export interface AboutDocument extends Document {
  date: string;
  title: string;
  description: string;
  createdAt: Date;
}

const aboutSchema = new Schema<AboutDocument>(
  {
    date: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: () => new Date() },
  },
  { versionKey: false },
);

export const AboutModel = model<AboutDocument>('About', aboutSchema);
