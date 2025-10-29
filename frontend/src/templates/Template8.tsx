import React from 'react';
import {
  Phone,
  Mail,
  Linkedin,
  Github,
  Briefcase,
  GraduationCap,
  Puzzle,
  Languages,
} from 'lucide-react';
import type { ResumeData } from '../types/resume';

interface Template8Props {
  data: ResumeData;
}

const FilledIcon = ({ icon }: { icon: React.ReactNode }) => (
  <div className="w-6 h-6 bg-[#2F3C7E] flex items-center justify-center rounded-sm">
    <div className="text-white">{icon}</div>
  </div>
);

const SectionHeader = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <div className="flex items-center gap-2 mt-6 mb-1">
    <FilledIcon icon={icon} />
    <h2 className="text-[#2F3C7E] text-lg font-bold">{title}</h2>
  </div>
);

const Template8: React.FC<Template8Props> = ({ data }) => {
  return (
    <div className="w-full p-8 bg-white font-sans text-gray-900">
      {/* Name */}
      <h1 className="text-4xl font-bold uppercase mb-4">{data.personalInfo.fullName}</h1>

      {/* Contact Info - stacked vertically */}
      <div className="flex flex-col gap-3 mb-4">
        <div className="flex items-center gap-2">
          <FilledIcon icon={<Phone size={14} />} />
          <span className="text-sm">{data.personalInfo.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <FilledIcon icon={<Mail size={14} />} />
          <span className="text-sm">{data.personalInfo.email}</span>
        </div>
        {data.personalInfo.linkedin && (
          <div className="flex items-center gap-2">
            <FilledIcon icon={<Linkedin size={14} />} />
            <span className="text-sm">{data.personalInfo.linkedin}</span>
          </div>
        )}
        {data.personalInfo.github && (
          <div className="flex items-center gap-2">
            <FilledIcon icon={<Github size={14} />} />
            <span className="text-sm">{data.personalInfo.github}</span>
          </div>
        )}
      </div>

      {/* Summary */}
      {data.summary && (
        <p className="text-sm text-gray-800 leading-relaxed mb-6">{data.summary}</p>
      )}

      {/* Employment */}
      {data.experience.length > 0 && (
        <div>
          <SectionHeader icon={<Briefcase size={16} />} title="Employment" />
          <hr className="border-t border-gray-400 mb-3" />
          <div className="space-y-3">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between text-sm font-semibold">
                  <span>{exp.position}</span>
                  <span className="text-gray-500">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-sm italic">{exp.company}</p>
                <p className="text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div>
          <SectionHeader icon={<GraduationCap size={16} />} title="Education" />
          <hr className="border-t border-gray-400 mb-3" />
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between text-sm font-semibold">
                  <span>{edu.institution}</span>
                  <span className="text-gray-500">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </span>
                </div>
                <p className="text-sm italic">{edu.degree}, {edu.field}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <SectionHeader icon={<Puzzle size={16} />} title="Skills" />
          <hr className="border-t border-gray-400 mb-3" />
          <div className="space-y-3">
            {data.skills.map((skill) => (
              <div key={skill.id}>
                <p className="text-sm font-medium">{skill.name}</p>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#2F3C7E] h-2"
                    style={{
                      width: skill.level === 'Expert' ? '100%' : 
                             skill.level === 'Advanced' ? '80%' : 
                             skill.level === 'Intermediate' ? '60%' : '40%'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <div>
          <SectionHeader icon={<Languages size={16} />} title="Languages" />
          <hr className="border-t border-gray-400 mb-3" />
          <div className="space-y-4">
            {data.languages.map((lang, index) => (
              <div key={index} className="flex items-center justify-between">
                <p className="text-sm font-medium">{lang}</p>
                <div className="flex gap-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className={`w-4 h-4 border ${i < 3 ? 'bg-[#2F3C7E]' : 'bg-white'}`}
                      ></div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div>
          <SectionHeader icon={<Briefcase size={16} />} title="Projects" />
          <hr className="border-t border-gray-400 mb-3" />
          <div className="space-y-3">
            {data.projects.map((project) => (
              <div key={project.id}>
                <p className="text-sm font-semibold">{project.name}</p>
                <p className="text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.url && (
                  <a href={project.url} className="text-[#2F3C7E] text-sm hover:underline">
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
          <SectionHeader icon={<Puzzle size={16} />} title="Certifications" />
          <hr className="border-t border-gray-400 mb-3" />
          <div className="space-y-2">
            {data.certifications.map((cert, index) => (
              <p key={index} className="text-sm">{cert}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Template8;