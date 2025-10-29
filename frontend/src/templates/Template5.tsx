import React from 'react';
import type { ResumeData } from '../types/resume';
import { Linkedin, Globe } from 'lucide-react';

interface Template5Props {
  data: ResumeData;
}

const Template5: React.FC<Template5Props> = ({ data }) => {
  const SkillBar: React.FC<{ name: string; level: string }> = ({ name, level }) => {
    const getPercentage = (skillLevel: string) => {
      switch (skillLevel) {
        case 'Expert': return 100;
        case 'Advanced': return 80;
        case 'Intermediate': return 60;
        case 'Beginner': return 40;
        default: return 60;
      }
    };

    return (
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white text-sm font-medium">{name}</span>
          <span className="text-white text-xs">{level}</span>
        </div>
        <div className="w-full bg-slate-600 rounded-full h-2">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${getPercentage(level)}%` }}
          />
        </div>
      </div>
    );
  };

  const LanguageBar: React.FC<{ name: string }> = ({ name }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white text-sm font-medium">{name}</span>
      </div>
      <div className="w-full bg-slate-600 rounded-full h-2">
        <div className="bg-white h-2 rounded-full w-[80%]" />
      </div>
    </div>
  );

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return dateString;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl overflow-hidden">
        <div className="flex">
          {/* Main Content */}
          <div className="w-2/3 p-12 bg-white">
            {/* Header */}
            <div className="mb-10">
              <h1 className="text-4xl font-light text-gray-900 mb-2">{data.personalInfo.fullName}</h1>
              <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">Professional</p>
            </div>

            {/* Profile */}
            <section className="mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Profile</h2>
              <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
            </section>

            {/* Employment History */}
            <section className="mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">Employment History</h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {exp.position}, {exp.company}, {exp.location}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </p>
                  <p className="text-sm text-gray-700">{exp.description}</p>
                </div>
              ))}
            </section>

            {/* Education */}
            <section className="mb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">Education</h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {edu.degree} in {edu.field}, {edu.institution}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                  </p>
                  {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </section>

            {/* Projects */}
            {data.projects.length > 0 && (
              <section className="mb-12">
                <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">Projects</h2>
                {data.projects.map((project, index) => (
                  <div key={index} className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{project.name}</h3>
                    <p className="text-sm text-gray-700 mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.url && (
                      <a href={project.url} className="text-slate-600 text-sm hover:underline">
                        View Project
                      </a>
                    )}
                  </div>
                ))}
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-1/3 bg-slate-700 p-8 text-white">
            <div className="mb-10">
              <h2 className="text-xl font-semibold mb-6 text-white uppercase tracking-wider">Personal Details</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-300 mb-1 uppercase tracking-wider text-xs">Address</p>
                  <p className="text-white">{data.personalInfo.location}</p>
                </div>
                <div>
                  <p className="text-gray-300 mb-1 uppercase tracking-wider text-xs">Phone</p>
                  <p className="text-white">{data.personalInfo.phone}</p>
                </div>
                <div>
                  <p className="text-gray-300 mb-1 uppercase tracking-wider text-xs">Email</p>
                  <p className="text-white break-all">{data.personalInfo.email}</p>
                </div>
              </div>
            </div>

            {(data.personalInfo.linkedin || data.personalInfo.website) && (
              <div className="mb-10">
                <h2 className="text-xl font-semibold mb-6 text-white uppercase tracking-wider">Links</h2>
                <div className="space-y-3 text-sm">
                  {data.personalInfo.linkedin && (
                    <div className="flex items-center">
                      <Linkedin className="w-4 h-4 mr-2 text-gray-300" />
                      <span className="text-white">LinkedIn</span>
                    </div>
                  )}
                  {data.personalInfo.website && (
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-2 text-gray-300" />
                      <span className="text-white">Website</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {data.skills.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl font-semibold mb-6 text-white uppercase tracking-wider">Skills</h2>
                <div>
                  {data.skills.map((skill, index) => (
                    <SkillBar key={index} name={skill.name} level={skill.level} />
                  ))}
                </div>
              </div>
            )}

            {data.languages.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl font-semibold mb-6 text-white uppercase tracking-wider">Languages</h2>
                <div>
                  {data.languages.map((language, index) => (
                    <LanguageBar key={index} name={language} />
                  ))}
                </div>
              </div>
            )}

            {data.certifications.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-6 text-white uppercase tracking-wider">Certifications</h2>
                <div className="space-y-2">
                  {data.certifications.map((cert, index) => (
                    <p key={index} className="text-white text-sm">{cert}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template5;