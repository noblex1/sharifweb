import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  location: string;
  email: string;
  phone: string;
  portfolio: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    facebook: string;
  };
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    location: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    portfolio: {
      type: String,
      required: true,
    },
    socialLinks: {
      github: {
        type: String,
        required: true,
      },
      linkedin: {
        type: String,
        required: true,
      },
      twitter: {
        type: String,
        required: true,
      },
      facebook: {
        type: String,
        required: true,
      },
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IContact>('Contact', ContactSchema);
