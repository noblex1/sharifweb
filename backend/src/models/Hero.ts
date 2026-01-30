import mongoose, { Schema, Document } from 'mongoose';

export interface IHero extends Document {
  name: string;
  taglines: string[];
  subtitle: string;
  profileImage: string;
  cvUrl: string;
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

const HeroSchema = new Schema<IHero>(
  {
    name: {
      type: String,
      required: true,
    },
    taglines: [{
      type: String,
      required: true,
    }],
    subtitle: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    cvUrl: {
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

export default mongoose.model<IHero>('Hero', HeroSchema);
