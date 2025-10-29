import React from 'react';
import type { ResumeData } from '../types/resume';

interface Template9Props {
  data: ResumeData;
}

const Template9: React.FC<Template9Props> = ({ data }) => {
  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="max-w-3xl mx-auto bg-white min-h-[130vh]" style={{
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        border: '1px solid #e0e0e0'
      }}>
        {/* Header */}
        <div className="px-10 py-10" style={{
          backgroundColor: '#fafafa',
          borderBottom: '1px solid #e0e0e0'
        }}>
          <h1 className="text-8xl font-bold text-emerald-600 leading-tight">
            {data.personalInfo.fullName.split(' ')[0]}<br />
            {data.personalInfo.fullName.split(' ')[1] || ''}
          </h1>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-1 px-10 py-10" style={{
            backgroundColor: '#f0f4f1',
            borderRight: '1px solid #e0e0e0'
          }}>
            {/* Objective */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">OBJECTIVE</h2>
              <p className="text-base text-gray-600 leading-relaxed">
                {data.summary || 'My primary objective is to provide a safe and nurturing environment for children that encourages student growth and development. I aim to facilitate engaging and challenging instruction that fosters a love for learning, critical thinking, and problem-solving skills.'}
              </p>
            </div>

            {/* References */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">REFERENCES</h2>
              <p className="text-base text-gray-600">Available upon request</p>
            </div>

            {/* Address */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">ADDRESS</h2>
              <div className="text-base text-gray-600">
                <p>{data.personalInfo.location}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">PHONE</h2>
              <p className="text-base text-gray-600">{data.personalInfo.phone}</p>
            </div>

            {/* Email */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">EMAIL</h2>
              <p className="text-base text-gray-600">{data.personalInfo.email}</p>
            </div>

            {/* Website */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">WEBSITE</h2>
              <p className="text-base text-gray-600">{data.personalInfo.website || 'www.interestingsite.com'}</p>
            </div>

            {/* Languages */}
            {data.languages.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">LANGUAGES</h2>
                {data.languages.map((lang, index) => (
                  <p key={index} className="text-base text-gray-600">{lang}</p>
                ))}
              </div>
            )}

            {/* Certifications */}
            {data.certifications.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">CERTIFICATIONS</h2>
                {data.certifications.map((cert, index) => (
                  <p key={index} className="text-base text-gray-600">{cert}</p>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 px-10 py-10">
            {/* Experience */}
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-bold text-emerald-600 mr-4">EXPERIENCE</h2>
                <div className="flex-1 h-px bg-emerald-600"></div>
              </div>
 
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-base font-semibold text-gray-800">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-base text-emerald-600 mb-2">
                      {exp.position} | {exp.company} | {exp.location}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-base text-gray-600 mt-4 leading-relaxed">
                Key responsibilities: planning and delivering effective instruction across various subjects and grade levels, assessing and monitoring student progress, and providing individualized support and intervention as needed.
              </p>
            </div>

            {/* Education */}
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-bold text-emerald-600 mr-4">EDUCATION</h2>
                <div className="flex-1 h-px bg-emerald-600"></div>
              </div>
 
              <div className="space-y-2">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <p className="text-base text-gray-600">{edu.institution} | {edu.location || 'Location'}</p>
                    <p className="text-base text-gray-600">{edu.degree} in {edu.field}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Communication */}
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-bold text-emerald-600 mr-4">COMMUNICATION</h2>
                <div className="flex-1 h-px bg-emerald-600"></div>
              </div>
 
              <p className="text-base text-gray-600 leading-relaxed">
                Collaborating with colleagues, parents, and community members to support student learning and achievement is an essential responsibility of an elementary school teacher.
              </p>
            </div>

            {/* Leadership */}
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-bold text-emerald-600 mr-4">LEADERSHIP</h2>
                <div className="flex-1 h-px bg-emerald-600"></div>
              </div>
 
              <p className="text-base text-gray-600 leading-relaxed">
                As a teacher, I maintain a positive classroom environment that promotes student engagement, behavior management, and social-emotional development.
              </p>
            </div>

            {/* Projects */}
            {data.projects.length > 0 && (
              <div className="mb-10">
                <div className="flex items-center mb-4">
                  <h2 className="text-xl font-bold text-emerald-600 mr-4">PROJECTS</h2>
                  <div className="flex-1 h-px bg-emerald-600"></div>
                </div>
                <div className="space-y-4">
                  {data.projects.map((project) => (
                    <div key={project.id}>
                      <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
                      <p className="text-base text-gray-600 mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                      {project.url && (
                        <a href={project.url} className="text-emerald-600 text-sm hover:underline">
                          View Project
                        </a>
                      )}
                    </div>
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

export default Template9;