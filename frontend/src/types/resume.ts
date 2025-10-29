import type { ReactNode } from "react";

export interface PersonalInfo {
  title: ReactNode;
  nationality: ReactNode;
  address: ReactNode;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  location: string;
}

export interface Education {
  location: string;
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface ResumeData {
  template: string;
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: string[];
  certifications: string[];
  projects: {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    url?: string;
  }[];
}

export interface Template {
  id: string;
  name: string;
  previewImg: string;
  component: React.ComponentType<{ data: ResumeData }>;
}