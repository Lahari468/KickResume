import React from 'react';
import type { ResumeData } from '../types/resume';
import { Mail, Phone, Linkedin } from 'lucide-react';

interface Template3Props {
  data: ResumeData;
}

const Template3: React.FC<Template3Props> = ({ data }) => {
  return (
    <div className="w-[850px] mx-auto flex font-sans text-sm border shadow-md">
      {/* Left Side */}
      <div className="w-[30%] bg-[#E49B0F] text-white p-6 flex flex-col gap-6">
        {/* Name */}
        <div className="text-2xl font-bold uppercase">{data.personalInfo.fullName}</div>

        {/* Contact Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Phone size={16} /> <span>{data.personalInfo.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} /> <span className="break-all">{data.personalInfo.email}</span>
          </div>
          {data.personalInfo.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin size={16} /> <span className="break-all">{data.personalInfo.linkedin}</span>
            </div>
          )}
        </div>

        {/* Education */}
        {data.education.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold border-b border-white mb-2">Education</h2>
            <div className="space-y-2">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <p className="font-semibold">{edu.degree} in {edu.field}</p>
                  <p>{edu.institution}</p>
                  <p className="text-sm">{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold border-b border-white mb-2">Skills</h2>
            <ul className="list-disc list-inside space-y-1">
              {data.skills.map(skill => (
                <li key={skill.id}>{skill.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className="w-[70%] bg-white p-8 text-black space-y-6">
        {/* Summary */}
        {data.summary && (
          <div>
            <h2 className="text-xl font-bold border-b pb-1 mb-2">Summary</h2>
            <p>{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div>
            <h2 className="text-xl font-bold border-b pb-1 mb-2">Experience</h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold">{exp.position}</p>
                      <p className="text-sm text-gray-600">{exp.company} • {exp.location}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </p>
                  </div>
                  <p>{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div>
            <h2 className="text-xl font-bold border-b pb-1 mb-2">Languages</h2>
            <div className="space-y-3">
              {data.languages.map((lang, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{lang}</span>
                  <div className="w-40 h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-[#FFBF00] rounded-full w-[80%]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div>
            <h2 className="text-xl font-bold border-b pb-1 mb-2">Projects</h2>
            <div className="space-y-4">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <p className="font-semibold">{project.name}</p>
                  <p className="text-sm text-gray-600">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="text-xs bg-[#E49B0F] text-white px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.url && (
                    <a href={project.url} className="text-[#E49B0F] text-sm hover:underline">
                      View Project
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <div>
            <h2 className="text-xl font-bold border-b pb-1 mb-2">Certifications</h2>
            <ul className="list-disc list-inside space-y-1">
              {data.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Template3;
