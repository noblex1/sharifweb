import mongoose, { Schema, Model } from 'mongoose';
import { ICertificate } from '../types/index.js';

const certificateSchema = new Schema<ICertificate>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  issuer: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: null
  },
  event: {
    type: String,
    default: null
  },
  period: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  gradient: {
    type: String,
    default: 'from-blue-500 to-cyan-500'
  },
  credentialUrl: {
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

certificateSchema.index({ order: 1 });

const Certificate: Model<ICertificate> = mongoose.model<ICertificate>('Certificate', certificateSchema);

export default Certificate;
