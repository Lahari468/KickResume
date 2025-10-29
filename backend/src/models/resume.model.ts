import mongoose, { Schema, Document } from 'mongoose';

interface IResume extends Document {
  user: mongoose.Types.ObjectId;
  template: string;
  downloads: number;

  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    github?: string;
  };

  summary: string;

  experience: {
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    description: string;
  }[];

  education: {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate?: string;
    gpa?: string;
    current?: boolean;
  }[];

  skills: {
    name: string;
    level: string;
  }[];

  projects: {
    name: string;
    url?: string;
    description: string;
    technologies: string[];
  }[];

  languages: {
    name: string;
    level: string;
  }[];

  certifications: string[];
}

const resumeSchema = new Schema<IResume>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  template: { type: String, required: true },
  downloads: { type: Number, default: 0 }, 
  
  personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    location: String,
    website: String,
    github: String,
  },

  summary: { type: String },

  experience: [
    {
      jobTitle: String,
      company: String,
      location: String,
      startDate: String,
      endDate: String,
      current: Boolean,
      description: String,
    },
  ],

  education: [
    {
      institution: String,
      degree: String,
      fieldOfStudy: String,
      startDate: String,
      endDate: String,
      gpa: String,
      current: Boolean,
    },
  ],

  skills: [
    {
      name: String,
      level: String,
    },
  ],

  projects: [
    {
      name: String,
      url: String,
      description: String,
      technologies: [String],
    },
  ],

  languages: [
    {
      name: String,
      level: String,
    },
  ],

  certifications: [String],
});

export default mongoose.model<IResume>('Resume', resumeSchema);
