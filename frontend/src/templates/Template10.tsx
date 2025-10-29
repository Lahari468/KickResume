import React from 'react';
import { Phone, Mail, MapPin, Briefcase, GraduationCap, Award } from 'lucide-react';
import type { ResumeData } from '../types/resume';

interface Template10Props {
  data: ResumeData;
}

const Template10: React.FC<Template10Props> = ({ data }) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto min-h-[120vh] bg-white shadow-lg">
        {/* Header */}
        <div className="text-center py-8 px-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{data.personalInfo.fullName.toUpperCase()}</h1>
          <p className="text-xl text-gray-600 mb-4">Professional</p>
          <p className="text-sm text-gray-600 mb-2">{data.personalInfo.location}</p>
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="w-4 h-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-gray-100 px-8 py-6 mx-8 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">PROFILE</h2>
          <p className="text-sm text-gray-700 leading-relaxed text-justify">
            {data.summary || 'Experienced and innovative professional with a passion and dedication to excellence. Highly organized, and skilled in communication. Bringing forth a proven track record of achieving favorable outcomes. Adept in preparing for challenges, reviewing requirements, and effectively presenting solutions. A strong leader who works well under pressure, and understands the complexities of modern business.'}
          </p>
        </div>

        {/* Work Experience Section */}
        <div className="px-8 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-6 text-center">WORK EXPERIENCE</h2>
          
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Briefcase className="w-4 h-4 text-gray-600" />
                    <h3 className="font-bold text-gray-800">{exp.position}, {exp.company}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{exp.location}</p>
                  <p className="text-sm text-gray-700">{exp.description}</p>
                </div>
                <div className="text-right text-sm text-gray-600 ml-4">
                  <p className="font-semibold">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</p>
                  <p>{exp.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="px-8 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-6 text-center">EDUCATION</h2>
          
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <GraduationCap className="w-4 h-4 text-gray-600" />
                    <h3 className="font-bold text-gray-800">{edu.institution}</h3>
                  </div>
                  <p className="text-sm text-gray-600 italic">{edu.degree} in {edu.field}</p>
                </div>
                <div className="text-right text-sm text-gray-600 ml-4">
                  <p className="font-semibold">{edu.startDate} – {edu.current ? 'Present' : edu.endDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-gray-100 px-8 py-6 mx-8 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-6 text-center">SKILLS</h2>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              {data.skills.slice(0, Math.ceil(data.skills.length / 2)).map((skill) => (
                <div key={skill.id} className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {data.skills.slice(Math.ceil(data.skills.length / 2)).map((skill) => (
                <div key={skill.id} className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="px-8 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-6 text-center">CERTIFICATIONS</h2>
          
          <div className="space-y-4">
            {data.certifications.map((cert, index) => (
              <div key={index} className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Award className="w-4 h-4 text-gray-600" />
                    <h3 className="font-bold text-gray-800">{cert}</h3>
                  </div>
                  <p className="text-sm text-gray-600 italic">Professional Certification</p>
                </div>
                <div className="text-right text-sm text-gray-600 ml-4">
                  <p className="font-semibold">Current</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Languages Section */}
        {data.languages.length > 0 && (
          <div className="bg-gray-100 px-8 py-6 mx-8 mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-6 text-center">LANGUAGES</h2>
            <div className="grid grid-cols-2 gap-4">
              {data.languages.map((lang, index) => (
                <div key={index} className="text-center">
                  <span className="text-sm font-medium text-gray-700">{lang}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {data.projects.length > 0 && (
          <div className="px-8 mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-6 text-center">PROJECTS</h2>
            <div className="space-y-6">
              {data.projects.map((project) => (
                <div key={project.id} className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Briefcase className="w-4 h-4 text-gray-600" />
                      <h3 className="font-bold text-gray-800">{project.name}</h3>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.url && (
                      <a href={project.url} className="text-gray-600 text-sm hover:underline mt-2 block">
                        View Project
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Template10;