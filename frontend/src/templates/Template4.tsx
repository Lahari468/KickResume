import React from 'react';
import { Phone, Mail, MapPin, User, Briefcase, GraduationCap } from 'lucide-react';
import type { ResumeData } from '../types/resume';

interface Template4Props {
  data: ResumeData;
}

const Template4: React.FC<Template4Props> = ({ data }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto min-h-[120vh] bg-white shadow-lg">
        {/* Header Section */}
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-light text-gray-800 mb-2">{data.personalInfo.fullName}</h1>
              <p className="text-lg text-gray-600 font-light tracking-wide">PROFESSIONAL</p>
            </div>
            <div className="text-right space-y-2">
              <div className="flex items-center justify-end text-gray-600">
                <Phone className="w-4 h-4 mr-2 text-red-500" />
                <span className="text-sm">{data.personalInfo.phone}</span>
              </div>
              <div className="flex items-center justify-end text-gray-600">
                <Mail className="w-4 h-4 mr-2 text-red-500" />
                <span className="text-sm">{data.personalInfo.email}</span>
              </div>
              <div className="flex items-center justify-end text-gray-600">
                <MapPin className="w-4 h-4 mr-2 text-red-500" />
                <span className="text-sm">{data.personalInfo.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="flex items-center mb-4">
            <User className="w-5 h-5 mr-3 text-red-500" />
            <h2 className="text-lg font-light text-red-500 tracking-wide">PROFILE</h2>
          </div>
          <div className="text-gray-600 leading-relaxed">
            <p className="mb-4">
              {data.summary || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
            </p>
          </div>
        </div>

        {/* Experience Section */}
        <div className="px-8 py-6 border-b border-gray-100">
          <div className="flex items-center mb-6">
            <Briefcase className="w-5 h-5 mr-3 text-red-500" />
            <h2 className="text-lg font-light text-red-500 tracking-wide">EXPERIENCE</h2>
          </div>

          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-8">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-gray-800 font-medium">{exp.company}</h3>
                  <p className="text-gray-500 text-sm">{exp.startDate} {'>'} {exp.current ? 'Current' : exp.endDate}</p>
                </div>
                <div className="text-right">
                  <h4 className="text-gray-800 font-medium">{exp.position}</h4>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div className="px-8 py-6">
          <div className="flex items-center mb-6">
            <GraduationCap className="w-5 h-5 mr-3 text-red-500" />
            <h2 className="text-lg font-light text-red-500 tracking-wide">EDUCATION</h2>
          </div>

          {data.education.map((edu) => (
            <div key={edu.id} className="mb-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-gray-800 font-medium">{edu.institution}</h3>
                </div>
                <div className="text-right">
                  <h4 className="text-gray-800 font-medium">{edu.degree} in {edu.field}</h4>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
              </p>
            </div>
          ))}
                  {/* Skills Section */}
        {data.skills.length > 0 && (
          <div className="px-8 py-6 border-b border-gray-100">
            <div className="flex items-center mb-6">
              <User className="w-5 h-5 mr-3 text-red-500" />
              <h2 className="text-lg font-light text-red-500 tracking-wide">SKILLS</h2>
            </div>
            <div className="text-gray-600 space-y-2">
              {data.skills.map((skill) => (
                <p key={skill.id} className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full inline-block mr-3"></span>
                  {skill.name}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {data.projects.length > 0 && (
          <div className="px-8 py-6 border-b border-gray-100">
            <div className="flex items-center mb-6">
              <Briefcase className="w-5 h-5 mr-3 text-red-500" />
              <h2 className="text-lg font-light text-red-500 tracking-wide">PROJECTS</h2>
            </div>
            <div className="text-gray-600 space-y-6">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <div className="flex items-center mb-1">
                    <span className="w-2 h-2 bg-red-500 rounded-full inline-block mr-3"></span>
                    <h3 className="text-gray-800 font-medium">{project.name}</h3>
                  </div>
                  <p className="leading-relaxed text-gray-600">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.url && (
                    <a
                      href={project.url}
                      className="text-sm text-red-500 hover:underline mt-1 inline-block"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications Section */}
        {data.certifications.length > 0 && (
          <div className="px-8 py-6">
            <div className="flex items-center mb-6">
              <GraduationCap className="w-5 h-5 mr-3 text-red-500" />
              <h2 className="text-lg font-light text-red-500 tracking-wide">CERTIFICATIONS</h2>
            </div>
            <div className="text-gray-600 space-y-2">
              {data.certifications.map((cert, index) => (
                <p key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full inline-block mr-3"></span>
                  {cert}
                </p>
              ))}
            </div>
          </div>
        )}
          </div>
      </div>
    </div>
  );
};

export default Template4;