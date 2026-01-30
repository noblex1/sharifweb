import mongoose, { Schema, Document } from 'mongoose';

export interface IAbout extends Document {
  bio: string;
  location: string;
  skills: string[];
  achievements: Array<{
    icon: string;
    title: string;
    description: string;
    year: string;
    location: string;
  }>;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AboutSchema = new Schema<IAbout>(
  {
    bio: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    skills: [{
      type: String,
      required: true,
    }],
    achievements: [{
      icon: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      year: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
    }],
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IAbout>('About', AboutSchema);
