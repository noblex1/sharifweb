import mongoose, { Schema, Model } from 'mongoose';
import { ITechStack } from '../types/index.js';

const techStackSchema = new Schema<ITechStack>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['languages', 'frameworks', 'tools'],
    required: true
  },
  level: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  icon: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
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

techStackSchema.index({ category: 1, order: 1 });

const TechStack: Model<ITechStack> = mongoose.model<ITechStack>('TechStack', techStackSchema);

export default TechStack;
