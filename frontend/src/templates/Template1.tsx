import React from 'react';
import type { ResumeData } from '../types/resume';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Briefcase,
  GraduationCap,
  Hammer,
  Languages,
  BadgeCheck,
  FolderGit2
} from 'lucide-react';

interface Template1Props {
  data: ResumeData;
}

const Template1: React.FC<Template1Props> = ({ data }) => {
  const blackBox = { backgroundColor: '#000000' };

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto text-gray-800 leading-relaxed">
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b-2 border-gray-300">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{data.personalInfo.fullName}</h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Mail className="w-4 h-4" />
            {data.personalInfo.email}
          </div>
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            {data.personalInfo.phone}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {data.personalInfo.location}
          </div>
          {data.personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              {data.personalInfo.website}
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              {data.personalInfo.linkedin}
            </div>
          )}
          {data.personalInfo.github && (
            <div className="flex items-center gap-1">
              <Github className="w-4 h-4" />
              {data.personalInfo.github}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3 flex items-center gap-3 uppercase tracking-wide">
            <div className="w-7 h-7 rounded flex items-center justify-center" style={blackBox}>
              <Mail className="w-4 h-4 text-white" />
            </div>
            Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          <hr className="mt-6 border-gray-300" />
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3 uppercase tracking-wide">
            <div className="w-7 h-7 rounded flex items-center justify-center" style={blackBox}>
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="border-l-4 border-gray-300 pl-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-600 font-medium">{exp.company} • {exp.location}</p>
                  </div>
                  <p className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
          <hr className="mt-6 border-gray-300" />
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3 uppercase tracking-wide">
            <div className="w-7 h-7 rounded flex items-center justify-center" style={blackBox}>
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="border-l-4 border-gray-300 pl-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                    <p className="text-gray-600 font-medium">{edu.institution}</p>
                    {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                  </div>
                  <p className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <hr className="mt-6 border-gray-300" />
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3 uppercase tracking-wide">
            <div className="w-7 h-7 rounded flex items-center justify-center" style={blackBox}>
              <Hammer className="w-4 h-4 text-white" />
            </div>
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {data.skills.map((skill) => (
              <div key={skill.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-gray-800 font-medium">{skill.name}</span>
                <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">{skill.level}</span>
              </div>
            ))}
          </div>
          <hr className="mt-6 border-gray-300" />
        </div>
      )}

      {/* Languages & Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.languages.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3 uppercase tracking-wide">
              <div className="w-7 h-7 rounded flex items-center justify-center" style={blackBox}>
                <Languages className="w-4 h-4 text-white" />
              </div>
              Languages
            </h2>
            <ul className="space-y-2 list-disc list-inside">
              {data.languages.map((lang, index) => (
                <li key={index} className="text-gray-700 bg-gray-50 p-2 rounded">{lang}</li>
              ))}
            </ul>
          </div>
        )}

        {data.certifications.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3 uppercase tracking-wide">
              <div className="w-7 h-7 rounded flex items-center justify-center" style={blackBox}>
                <BadgeCheck className="w-4 h-4 text-white" />
              </div>
              Certifications
            </h2>
            <ul className="space-y-2 list-disc list-inside">
              {data.certifications.map((cert, index) => (
                <li key={index} className="text-gray-700 bg-gray-50 p-2 rounded">{cert}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3 uppercase tracking-wide">
            <div className="w-7 h-7 rounded flex items-center justify-center" style={blackBox}>
              <FolderGit2 className="w-4 h-4 text-white" />
            </div>
            Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((project) => (
              <div key={project.id} className="border-l-4 border-gray-300 pl-6">
                <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                <p className="text-gray-700 mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.url && (
                  <a href={project.url} className="text-blue-600 text-sm hover:underline">
                    View Project
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Template1;
