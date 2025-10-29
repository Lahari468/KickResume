import React, { useState } from 'react';
import { useResume } from '../contexts/ResumeContext';
import type {  Experience, Education, Skill } from '../types/resume';
import { Plus, X, User, Briefcase, GraduationCap, Award, Languages, FileText, Code, Mail, Phone, MapPin, Globe, Github } from 'lucide-react';
import {
  Building2,
  CalendarDays,
  CheckCircle,
  AlignLeft
} from 'lucide-react';
import {
  
  School,
  BookOpenText,
  
  Star,
  
  
} from 'lucide-react';
import {
    BadgeCheck,
  BarChart3
} from 'lucide-react';
import {
  LampDesk,
  Link2,
} from 'lucide-react';
import {  Medal } from 'lucide-react';




const ResumeForm: React.FC = () => {
  const { 
    resumeData, 
    updatePersonalInfo, 
    updateSummary, 
    updateExperience, 
    updateEducation, 
    updateSkills,
    updateLanguages,
    updateCertifications,
    updateProjects
  } = useResume();
  
  const [activeTab, setActiveTab] = useState('personal');
  const [loadingSummary, setLoadingSummary] = useState(false);

const handleGenerateSummary = async () => {
  try {
    setLoadingSummary(true);
    const response = await fetch("http://localhost:5000/api/ai/generate-summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        personalInfo: resumeData.personalInfo,
        skills: resumeData.skills,
        experience: resumeData.experience,
        education: resumeData.education,
      }),
    });

    const data = await response.json();
    if (data.summary) {
      updateSummary(data.summary);
      alert("✅ Summary generated successfully!");
    } else {
      alert("⚠️ Failed to generate summary. Try again.");
    }
  } catch (error) {
    console.error("Error generating summary:", error);
    alert("❌ Backend or OpenAI error. Please check your server.");
  } finally {
    setLoadingSummary(false);
  }
};


  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'summary', label: 'Summary', icon: FileText },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'additional', label: 'Additional', icon: Languages }
  ];

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      location: ''
    };
    updateExperience([...resumeData.experience, newExp]);
  };

  const updateExperienceItem = (id: string, field: keyof Experience, value: any) => {
    const updated = resumeData.experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    updateExperience(updated);
  };

  const removeExperience = (id: string) => {
    updateExperience(resumeData.experience.filter(exp => exp.id !== id));
  };

  const addEducation = () => {
    const newEdu: Education = {
        id: Date.now().toString(),
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        current: false,
        gpa: '',
        location: ''
    };
    updateEducation([...resumeData.education, newEdu]);
  };

  const updateEducationItem = (id: string, field: keyof Education, value: any) => {
    const updated = resumeData.education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    updateEducation(updated);
  };

  const removeEducation = (id: string) => {
    updateEducation(resumeData.education.filter(edu => edu.id !== id));
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'Beginner'
    };
    updateSkills([...resumeData.skills, newSkill]);
  };

  const updateSkillItem = (id: string, field: keyof Skill, value: any) => {
    const updated = resumeData.skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    );
    updateSkills(updated);
  };

  const removeSkill = (id: string) => {
    updateSkills(resumeData.skills.filter(skill => skill.id !== id));
  };

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      url: ''
    };
    updateProjects([...resumeData.projects, newProject]);
  };

  const updateProjectItem = (id: string, field: string, value: any) => {
    const updated = resumeData.projects.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    );
    updateProjects(updated);
  };

  const removeProject = (id: string) => {
    updateProjects(resumeData.projects.filter(project => project.id !== id));
  };

  const addLanguage = () => {
    updateLanguages([...resumeData.languages, '']);
  };

  const updateLanguageItem = (index: number, value: string) => {
    const updated = [...resumeData.languages];
    updated[index] = value;
    updateLanguages(updated);
  };

  const removeLanguage = (index: number) => {
    updateLanguages(resumeData.languages.filter((_, i) => i !== index));
  };

  const addCertification = () => {
    updateCertifications([...resumeData.certifications, '']);
  };

  const updateCertificationItem = (index: number, value: string) => {
    const updated = [...resumeData.certifications];
    updated[index] = value;
    updateCertifications(updated);
  };

  const removeCertification = (index: number) => {
    updateCertifications(resumeData.certifications.filter((_, i) => i !== index));
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Full Name */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-[#212529] mb-3">
          <User className="w-4 h-4 text-[#2F3C7E]" />
          Full Name
        </label>
        <input
          type="text"
          value={resumeData.personalInfo.fullName}
          onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
          className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F3C7E]"
        />
      </div>

        <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-[#212529] mb-3">
          <Mail className="w-4 h-4 text-[#2F3C7E]" />
          Email
        </label>
        <input
          type="email"
          value={resumeData.personalInfo.email}
          onChange={(e) => updatePersonalInfo({ email: e.target.value })}
          className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F3C7E]"
        />
      </div>
        <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-[#212529] mb-3">
          <Phone className="w-4 h-4 text-[#2F3C7E]" />
          Phone
        </label>
        <input
          type="tel"
          value={resumeData.personalInfo.phone}
          onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
          className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F3C7E]"
        />
      </div>
        <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-[#212529] mb-3">
          <MapPin className="w-4 h-4 text-[#2F3C7E]" />
          Location
        </label>
        <input
          type="text"
          value={resumeData.personalInfo.location}
          onChange={(e) => updatePersonalInfo({ location: e.target.value })}
          className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F3C7E]"
        />
      </div>
       <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-[#212529] mb-3">
          <Globe className="w-4 h-4 text-[#2F3C7E]" />
          Website
        </label>
        <input
          type="url"
          value={resumeData.personalInfo.website || ''}
          onChange={(e) => updatePersonalInfo({ website: e.target.value })}
          className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F3C7E]"
        />
      </div>
       
       <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-[#212529] mb-3">
          <Github className="w-4 h-4 text-[#2F3C7E]" />
          GitHub
        </label>
        <input
          type="url"
          value={resumeData.personalInfo.github || ''}
          onChange={(e) => updatePersonalInfo({ github: e.target.value })}
          className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F3C7E]"
        />
      </div>
      </div>
    </div>
  );

const renderSummary = () => (
  <div className="space-y-6">
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-[#212529] mb-3">
        <FileText className="w-4 h-4 text-[#2F3C7E]" />
        Professional Summary
      </label>

      <textarea
        value={resumeData.summary}
        onChange={(e) => updateSummary(e.target.value)}
        rows={6}
        className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F3C7E] focus:border-transparent transition-all duration-200"
        placeholder="Write or generate your professional summary..."
      />

      <button
        type="button"
        onClick={handleGenerateSummary}
        disabled={loadingSummary}
        className={`mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] text-white px-5 py-3 rounded-lg font-semibold shadow-md transition-all duration-300 ${
          loadingSummary
            ? 'opacity-70 cursor-not-allowed'
            : 'hover:from-[#00C9A7] hover:to-[#2F3C7E]'
        }`}
      >
        {loadingSummary ? '⏳ Generating Summary...' : ' Generate AI Summary'}
      </button>
    </div>
  </div>
);


  const renderExperience = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-bold text-[#212529]">Work Experience</h3>
      <button
        onClick={addExperience}
        className="flex items-center gap-2 bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] text-white px-5 py-3 rounded-lg hover:from-[#00C9A7] hover:to-[#2F3C7E] transition-all duration-300 font-semibold shadow-lg transform hover:-translate-y-0.5"
      >
        <Plus className="w-4 h-4" />
        Add Experience
      </button>
    </div>

    {resumeData.experience.map((exp) => (
      <div key={exp.id} className="bg-[#F8F9FA] p-6 rounded-xl relative border border-[#E9ECEF] shadow-sm">
        <button
          onClick={() => removeExperience(exp.id)}
          className="absolute top-4 right-4 text-[#FF6B6B] hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#212529] mb-2">
              <Briefcase className="w-4 h-4 text-[#2F3C7E]" />
              Job Title
            </label>
            <input
              type="text"
              value={exp.position}
              onChange={(e) => updateExperienceItem(exp.id, 'position', e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F3C7E] focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#212529] mb-2">
              <Building2 className="w-4 h-4 text-[#2F3C7E]" />
              Company
            </label>
            <input
              type="text"
              value={exp.company}
              onChange={(e) => updateExperienceItem(exp.id, 'company', e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F3C7E] focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#212529] mb-2">
              <MapPin className="w-4 h-4 text-[#2F3C7E]" />
              Location
            </label>
            <input
              type="text"
              value={exp.location}
              onChange={(e) => updateExperienceItem(exp.id, 'location', e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F3C7E] focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#212529] mb-2">
              <CalendarDays className="w-4 h-4 text-[#2F3C7E]" />
              Start Date
            </label>
            <input
              type="text"
              value={exp.startDate}
              onChange={(e) => updateExperienceItem(exp.id, 'startDate', e.target.value)}
              placeholder="MM/YYYY"
              className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F3C7E] focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#212529] mb-2">
              <CalendarDays className="w-4 h-4 text-[#2F3C7E]" />
              End Date
            </label>
            <input
              type="text"
              value={exp.endDate}
              onChange={(e) => updateExperienceItem(exp.id, 'endDate', e.target.value)}
              placeholder="MM/YYYY"
              disabled={exp.current}
              className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F3C7E] focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={exp.current}
              onChange={(e) => updateExperienceItem(exp.id, 'current', e.target.checked)}
              className="mr-3 w-4 h-4 text-[#2F3C7E] rounded focus:ring-[#2F3C7E]"
            />
            <label className="flex items-center gap-1 text-sm font-medium text-[#212529]">
              <CheckCircle className="w-4 h-4 text-[#2F3C7E]" />
              Current Position
            </label>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-[#212529] mb-2">
            <AlignLeft className="w-4 h-4 text-[#2F3C7E]" />
            Description
          </label>
          <textarea
            value={exp.description}
            onChange={(e) => updateExperienceItem(exp.id, 'description', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F3C7E] focus:border-transparent transition-all duration-200"
            placeholder="Describe your responsibilities and achievements..."
          />
        </div>
      </div>
    ))}
  </div>
);


  const renderEducation = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-bold text-[#212529]">Education</h3>
      <button
        onClick={addEducation}
        className="flex items-center gap-2 bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] text-white px-5 py-3 rounded-lg hover:from-[#00C9A7] hover:to-[#2F3C7E] transition-all duration-300 font-semibold shadow-lg transform hover:-translate-y-0.5"
      >
        <Plus className="w-4 h-4" />
        Add Education
      </button>
    </div>

    {resumeData.education.map((edu) => (
      <div key={edu.id} className="bg-[#F8F9FA] p-6 rounded-xl relative border border-[#E9ECEF] shadow-sm">
        <button
          onClick={() => removeEducation(edu.id)}
          className="absolute top-4 right-4 text-[#FF6B6B] hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#212529] mb-2">
              <School className="w-4 h-4 text-[#2F3C7E]" />
              Institution
            </label>
            <input
              type="text"
              value={edu.institution}
              onChange={(e) => updateEducationItem(edu.id, 'institution', e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F3C7E] focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#212529] mb-2">
              <BookOpenText className="w-4 h-4 text-[#2F3C7E]" />
              Degree
            </label>
            <input
              type="text"
              value={edu.degree}
              onChange={(e) => updateEducationItem(edu.id, 'degree', e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F3C7E] focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#212529] mb-2">
              <GraduationCap className="w-4 h-4 text-[#2F3C7E]" />
              Field of Study
            </label>
            <input
              type="text"
              value={edu.field}
              onChange={(e) => updateEducationItem(edu.id, 'field', e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F3C7E] focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#212529] mb-2">
              <Star className="w-4 h-4 text-[#2F3C7E]" />
              GPA (Optional)
            </label>
            <input
              type="text"
              value={edu.gpa || ''}
              onChange={(e) => updateEducationItem(edu.id, 'gpa', e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F3C7E] focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#212529] mb-2">
              <CalendarDays className="w-4 h-4 text-[#2F3C7E]" />
              Start Date
            </label>
            <input
              type="text"
              value={edu.startDate}
              onChange={(e) => updateEducationItem(edu.id, 'startDate', e.target.value)}
              placeholder="MM/YYYY"
              className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F3C7E] focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#212529] mb-2">
              <CalendarDays className="w-4 h-4 text-[#2F3C7E]" />
              End Date
            </label>
            <input
              type="text"
              value={edu.endDate}
              onChange={(e) => updateEducationItem(edu.id, 'endDate', e.target.value)}
              placeholder="MM/YYYY"
              disabled={edu.current}
              className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F3C7E] focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={edu.current}
              onChange={(e) => updateEducationItem(edu.id, 'current', e.target.checked)}
              className="mr-3 w-4 h-4 text-[#2F3C7E] rounded focus:ring-[#2F3C7E]"
            />
            <label className="flex items-center gap-1 text-sm font-medium text-[#212529]">
              <CheckCircle className="w-4 h-4 text-[#2F3C7E]" />
              Currently Studying
            </label>
          </div>
        </div>
      </div>
    ))}
  </div>
);

  const renderSkills = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-bold text-[#212529]">Skills</h3>
      <button
        onClick={addSkill}
        className="flex items-center gap-2 bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] text-white px-5 py-3 rounded-lg hover:from-[#00C9A7] hover:to-[#2F3C7E] transition-all duration-300 font-semibold shadow-lg transform hover:-translate-y-0.5"
      >
        <Plus className="w-4 h-4" />
        Add Skill
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {resumeData.skills.map((skill) => (
        <div key={skill.id} className="bg-[#F8F9FA] p-6 rounded-xl relative border border-[#E9ECEF] shadow-sm">
          <button
            onClick={() => removeSkill(skill.id)}
            className="absolute top-4 right-4 text-[#FF6B6B] hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-[#212529] mb-2">
                <BadgeCheck className="w-4 h-4 text-[#2F3C7E]" />
                Skill Name
              </label>
              <input
                type="text"
                value={skill.name}
                onChange={(e) => updateSkillItem(skill.id, 'name', e.target.value)}
                className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F3C7E] focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-[#212529] mb-2">
                <BarChart3 className="w-4 h-4 text-[#2F3C7E]" />
                Level
              </label>
              <select
                value={skill.level}
                onChange={(e) => updateSkillItem(skill.id, 'level', e.target.value)}
                className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F3C7E] focus:border-transparent transition-all duration-200"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);


 const renderProjects = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-bold text-[#212529]">Projects</h3>
      <button
        onClick={addProject}
        className="flex items-center gap-2 bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] text-white px-5 py-3 rounded-lg hover:from-[#00C9A7] hover:to-[#2F3C7E] transition-all duration-300 font-semibold shadow-lg transform hover:-translate-y-0.5"
      >
        <Plus className="w-4 h-4" />
        Add Project
      </button>
    </div>

    {resumeData.projects.map((project) => (
      <div key={project.id} className="bg-[#F8F9FA] p-6 rounded-xl relative border border-[#E9ECEF] shadow-sm">
        <button
          onClick={() => removeProject(project.id)}
          className="absolute top-4 right-4 text-[#FF6B6B] hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#212529] mb-2">
              <LampDesk className="w-4 h-4 text-[#2F3C7E]" />
              Project Name
            </label>
            <input
              type="text"
              value={project.name}
              onChange={(e) => updateProjectItem(project.id, 'name', e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F3C7E] focus:border-transparent transition-all duration-200"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#212529] mb-2">
              <Link2 className="w-4 h-4 text-[#2F3C7E]" />
              Project URL (Optional)
            </label>
            <input
              type="url"
              value={project.url || ''}
              onChange={(e) => updateProjectItem(project.id, 'url', e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F3C7E] focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-[#212529] mb-2">
            <FileText className="w-4 h-4 text-[#2F3C7E]" />
            Description
          </label>
          <textarea
            value={project.description}
            onChange={(e) => updateProjectItem(project.id, 'description', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F3C7E] focus:border-transparent transition-all duration-200"
            placeholder="Describe your project and its impact..."
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-[#212529] mb-2">
            <Code className="w-4 h-4 text-[#2F3C7E]" />
            Technologies (comma-separated)
          </label>
          <input
            type="text"
            value={project.technologies.join(', ')}
            onChange={(e) =>
              updateProjectItem(project.id, 'technologies', e.target.value.split(', ').filter(t => t.trim()))
            }
            className="w-full px-4 py-3 border-2 border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F3C7E] focus:border-transparent transition-all duration-200"
            placeholder="React, Node.js, MongoDB, etc."
          />
        </div>
      </div>
    ))}
  </div>
);


  const renderAdditional = () => (
  <div className="space-y-8">
    {/* Languages */}
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-[#212529]">Languages</h3>
        <button
          onClick={addLanguage}
          className="flex items-center gap-2 bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] text-white px-5 py-3 rounded-lg hover:from-[#00C9A7] hover:to-[#2F3C7E] transition-all duration-300 font-semibold shadow-lg transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          Add Language
        </button>
      </div>

      {resumeData.languages.map((lang, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="flex items-center gap-2 w-full">
            <Languages className="w-5 h-5 text-[#2F3C7E]" />
            <input
              type="text"
              value={lang}
              onChange={(e) => updateLanguageItem(index, e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F3C7E] focus:border-transparent transition-all duration-200"
              placeholder="e.g., English (Native), Spanish (Fluent)"
            />
          </div>
          <button
            onClick={() => removeLanguage(index)}
            className="text-[#FF6B6B] hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>

    {/* Certifications */}
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-[#212529]">Certifications</h3>
        <button
          onClick={addCertification}
          className="flex items-center gap-2 bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] text-white px-5 py-3 rounded-lg hover:from-[#00C9A7] hover:to-[#2F3C7E] transition-all duration-300 font-semibold shadow-lg transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          Add Certification
        </button>
      </div>

      {resumeData.certifications.map((cert, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="flex items-center gap-2 w-full">
            <Medal className="w-5 h-5 text-[#2F3C7E]" />
            <input
              type="text"
              value={cert}
              onChange={(e) => updateCertificationItem(index, e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F3C7E] focus:border-transparent transition-all duration-200"
              placeholder="e.g., AWS Certified Developer"
            />
          </div>
          <button
            onClick={() => removeCertification(index)}
            className="text-[#FF6B6B] hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  </div>
);


  const renderContent = () => {
    switch (activeTab) {
      case 'personal':
        return renderPersonalInfo();
      case 'summary':
        return renderSummary();
      case 'experience':
        return renderExperience();
      case 'education':
        return renderEducation();
      case 'skills':
        return renderSkills();
      case 'projects':
        return renderProjects();
      case 'additional':
        return renderAdditional();
      default:
        return null;
    }
  };

  return (
    <div className="bg-white h-full flex flex-col">
      {/* Enhanced Tab Navigation */}
      <div className="border-b border-[#E9ECEF] px-6 py-4 bg-gradient-to-r from-[#F8F9FA] to-white">
        <div className="flex space-x-2 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition-all duration-300 transform ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] text-white shadow-lg scale-105'
                    : 'text-[#6C757D] hover:text-[#2F3C7E] hover:bg-[#E9ECEF] hover:scale-105'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-white to-[#F8F9FA]">
        {renderContent()}
      </div>
    </div>
  );
};
export default ResumeForm;