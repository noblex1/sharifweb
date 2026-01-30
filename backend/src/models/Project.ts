import mongoose, { Schema, Model } from 'mongoose';
import { IProject } from '../types/index.js';

const projectSchema = new Schema<IProject>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  technologies: [{
    type: String,
    required: true
  }],
  category: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['In Development', 'Completed', 'Archived'],
    default: 'In Development'
  },
  gradient: {
    type: String,
    default: 'from-blue-500 to-cyan-500'
  },
  features: [{
    type: String
  }],
  period: {
    type: String,
    required: true
  },
  githubUrl: {
    type: String,
    default: null
  },
  liveUrl: {
    type: String,
    default: null
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

// Index for ordering
projectSchema.index({ order: 1 });

const Project: Model<IProject> = mongoose.model<IProject>('Project', projectSchema);

export default Project;
