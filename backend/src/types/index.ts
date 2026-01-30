import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IProject {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  status: 'In Development' | 'Completed' | 'Archived';
  gradient: string;
  features: string[];
  period: string;
  githubUrl: string | null;
  liveUrl: string | null;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IExperience {
  _id: string;
  company: string;
  position: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  contact: {
    name: string;
    role: string;
    email: string;
    phone: string;
  };
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICertificate {
  _id: string;
  title: string;
  issuer: string;
  type: string | null;
  event: string | null;
  period: string;
  description: string;
  category: string;
  gradient: string;
  credentialUrl: string | null;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITechStack {
  _id: string;
  name: string;
  category: 'languages' | 'frameworks' | 'tools';
  level: number;
  icon: string;
  description: string;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAbout {
  _id: string;
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

export interface IHero {
  _id: string;
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

export interface IContact {
  _id: string;
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

export interface AuthRequest extends Request {
  user?: JwtPayload & {
    id: string;
    role: string;
  };
}
