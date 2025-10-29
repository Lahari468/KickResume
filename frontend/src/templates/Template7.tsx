import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import type { ResumeData } from '../types/resume';

interface Template7Props {
  data: ResumeData;
}

const Template7: React.FC<Template7Props> = ({ data }) => {
  return (
    <div className="bg-white text-gray-800 font-sans max-w-5xl mx-auto p-10 text-sm">
      
      {/* ===== Header Name ===== */}
      <header className="mb-8">
        <h1 className="text-4xl font-semibold uppercase tracking-wider">
          {data.personalInfo.fullName}
        </h1>
        <hr className="mt-2 border-t-2 border-gray-600 w-full" />
      </header>

      <div className="flex flex-col md:flex-row gap-8">

        {/* ===== Left Sidebar ===== */}
        <aside className="w-full md:w-1/3 border-r border-gray-300 pr-6 space-y-8">

          {/* --- DETAILS --- */}
          <section>
            <h2 className="uppercase font-semibold text-gray-700 border-b-[3px] border-gray-600 w-1/2 mb-3">
              Details
            </h2>
            <div className="space-y-2 text-gray-600">
              {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
              {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
              {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
              {data.personalInfo.nationality && <p>{data.personalInfo.nationality}</p>}
            </div>
          </section>

          {/* --- SKILLS --- */}
          {data.skills.length > 0 && (
            <section>
              <h2 className="uppercase font-semibold text-gray-700 border-b-[3px] border-gray-600 w-1/2 mb-3">
                Skills
              </h2>
              <div className="space-y-4">
                {data.skills.map(skill => (
                  <div key={skill.id}>
                    <p className="text-gray-700">{skill.name}</p>
                    <div className="w-full h-2 bg-gray-200 rounded">
                      <div
                        className="h-2 bg-gray-800 rounded"
                        style={{
                          width:
                            skill.level === 'Expert' ? '100%' :
                            skill.level === 'Advanced' ? '80%' :
                            skill.level === 'Intermediate' ? '60%' : '40%'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* --- LANGUAGES --- */}
          {data.languages.length > 0 && (
            <section>
              <h2 className="uppercase font-semibold text-gray-700 border-b-[3px] border-gray-600 w-1/2 mb-3">
                Languages
              </h2>
              <div className="space-y-4">
                {data.languages.map((lang, index) => (
                  <div key={index}>
                    <p className="text-gray-700">{lang}</p>
                    <div className="w-full h-2 bg-gray-200 rounded">
                      <div className="h-2 bg-gray-800 rounded w-[80%]" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* --- CERTIFICATIONS --- */}
          {data.certifications.length > 0 && (
            <section>
              <h2 className="uppercase font-semibold text-gray-700 border-b-[3px] border-gray-600 w-1/2 mb-3">
                Certifications
              </h2>
              <div className="space-y-2">
                {data.certifications.map((cert, index) => (
                  <p key={index} className="text-gray-700">{cert}</p>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* ===== Right Main Section ===== */}
        <main className="w-full md:w-2/3 pl-0 md:pl-6 space-y-10">

          {/* --- PROFILE --- */}
          {data.summary && (
            <section>
              <h2 className="uppercase font-semibold text-gray-700 border-b-[3px] border-gray-600 w-1/2 mb-3">
                Profile
              </h2>
              <p className="text-gray-700">{data.summary}</p>
            </section>
          )}

          <hr className="border-t-2 border-gray-600" />

          {/* --- EMPLOYMENT HISTORY --- */}
          {data.experience.length > 0 && (
            <section>
              <h2 className="uppercase font-semibold text-gray-700 border-b-[3px] border-gray-600 w-1/2 mb-3">
                Employment History
              </h2>
              {data.experience.map(exp => (
                <div key={exp.id} className="mb-6">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold">{exp.position}</p>
                      <p className="text-gray-500">{exp.company} • {exp.location}</p>
                    </div>
                    <p className="text-gray-500 text-sm">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                  </div>
                  <p className="text-gray-700 mt-1">{exp.description}</p>
                </div>
              ))}
            </section>
          )}

          <hr className="border-t-2 border-gray-600" />

          {/* --- EDUCATION --- */}
          {data.education.length > 0 && (
            <section>
              <h2 className="uppercase font-semibold text-gray-700 border-b-[3px] border-gray-600 w-1/2 mb-3">
                Education
              </h2>
              {data.education.map(edu => (
                <div key={edu.id} className="mb-6">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold">{edu.degree}, {edu.field}</p>
                      <p className="text-gray-500">{edu.institution}</p>
                      {edu.gpa && <p className="text-gray-500 text-sm">GPA: {edu.gpa}</p>}
                    </div>
                    <p className="text-gray-500 text-sm">{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</p>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* --- PROJECTS --- */}
          {data.projects.length > 0 && (
            <section>
              <h2 className="uppercase font-semibold text-gray-700 border-b-[3px] border-gray-600 w-1/2 mb-3">
                Projects
              </h2>
              {data.projects.map(project => (
                <div key={project.id} className="mb-6">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold">{project.name}</p>
                      <p className="text-gray-500">{project.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.url && (
                    <a href={project.url} className="text-gray-600 text-sm hover:underline mt-1 block">
                      View Project
                    </a>
                  )}
                </div>
              ))}
            </section>
          )}

        </main>
      </div>
    </div>
  );
};

export default Template7;
