import mongoose, { Schema, Model } from 'mongoose';
import { IExperience } from '../types/index.js';

const experienceSchema = new Schema<IExperience>({
  company: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  period: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  achievements: [{
    type: String
  }],
  contact: {
    name: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  order: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

experienceSchema.index({ order: 1 });

const Experience: Model<IExperience> = mongoose.model<IExperience>('Experience', experienceSchema);

export default Experience;
