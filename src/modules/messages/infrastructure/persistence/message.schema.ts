import { Schema, model, Document } from 'mongoose';

export interface MessageDocument extends Document {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
  createdAt: Date;
}

const messageSchema = new Schema<MessageDocument>(
  {
    firstName: { type: String, required: true, maxlength: 100 },
    lastName: { type: String, required: true, maxlength: 100 },
    phone: { type: String, required: true, maxlength: 100 },
    email: { type: String, required: true, maxlength: 100 },
    message: { type: String, required: true, maxlength: 500 },
    createdAt: { type: Date, default: () => new Date() },
  },
  { versionKey: false },
);

export const MessageModel = model<MessageDocument>('Message', messageSchema);
