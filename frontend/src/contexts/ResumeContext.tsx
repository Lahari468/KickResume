// src/contexts/ResumeContext.tsx
import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { ResumeData, Template } from '../types/resume';

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '(555) 123-4567',
    location: 'New York, NY',
    website: 'www.johndoe.com',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    nationality: undefined,
    address: undefined,
    title: undefined
  },
  summary: 'Experienced professional with a proven track record...',
  experience: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
  projects: [],
  template: ''
};

interface ResumeContextType {
  resumeData: ResumeData;
  selectedTemplate: Template | null;
  recentResumes: { id: string; title: string; updatedAt: string }[];
  resumeId: string | null;
  setResumeId: (id: string) => void;
  setResumeData: (data: ResumeData) => void;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  updateSummary: (summary: string) => void;
  updateExperience: (experience: ResumeData['experience']) => void;
  updateEducation: (education: ResumeData['education']) => void;
  updateSkills: (skills: ResumeData['skills']) => void;
  updateLanguages: (languages: string[]) => void;
  updateCertifications: (certifications: string[]) => void;
  updateProjects: (projects: ResumeData['projects']) => void;
  setSelectedTemplate: (template: Template) => void;
  updateRecentResume: (id: string, updatedFields: Partial<{ title: string; updatedAt: string }>) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [recentResumes, setRecentResumes] = useState<{ id: string; title: string; updatedAt: string }[]>([]);
  const [resumeId, setResumeId] = useState<string | null>(null);

  const updatePersonalInfo = (info: Partial<ResumeData['personalInfo']>) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info }
    }));
  };

  const updateSummary = (summary: string) => {
    setResumeData(prev => ({ ...prev, summary }));
  };

  const updateExperience = (experience: ResumeData['experience']) => {
    setResumeData(prev => ({ ...prev, experience }));
  };

  const updateEducation = (education: ResumeData['education']) => {
    setResumeData(prev => ({ ...prev, education }));
  };

  const updateSkills = (skills: ResumeData['skills']) => {
    setResumeData(prev => ({ ...prev, skills }));
  };

  const updateLanguages = (languages: string[]) => {
    setResumeData(prev => ({ ...prev, languages }));
  };

  const updateCertifications = (certifications: string[]) => {
    setResumeData(prev => ({ ...prev, certifications }));
  };

  const updateProjects = (projects: ResumeData['projects']) => {
    setResumeData(prev => ({ ...prev, projects }));
  };

  const updateRecentResume = (id: string, updatedFields: Partial<{ title: string; updatedAt: string }>) => {
    setRecentResumes(prev =>
      prev.map(resume =>
        resume.id === id ? { ...resume, ...updatedFields } : resume
      )
    );
  };

  return (
    <ResumeContext.Provider value={{
      resumeData,
      selectedTemplate,
      recentResumes,
      resumeId,
      setResumeId,
      setResumeData,
      updatePersonalInfo,
      updateSummary,
      updateExperience,
      updateEducation,
      updateSkills,
      updateLanguages,
      updateCertifications,
      updateProjects,
      setSelectedTemplate,
      updateRecentResume
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
