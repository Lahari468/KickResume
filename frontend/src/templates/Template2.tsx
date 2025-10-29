import React from 'react';
import type { ResumeData } from '../types/resume';

interface Template2Props {
  data: ResumeData;
}

const Template2: React.FC<Template2Props> = ({ data }) => {
  return (
    <div className="w-[850px] mx-auto text-black border shadow-md font-[Times_New_Roman]">
      {/* Header */}
      <div className="bg-[#F2D2BD] py-6 px-10 text-center">
        <h1 className="text-5xl font-bold tracking-wide uppercase font-serif text-left">
          {data.personalInfo.fullName}
        </h1>
      </div>

      {/* Thin horizontal line */}
      <div className="border-t border-gray-400 my-1" />

      {/* Main Content: Two Columns */}
      <div className="flex">
        {/* Left Column */}
        <div className="w-[35%] border-r border-gray-300 p-6 space-y-6">
          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-bold underline mb-2 font-serif">Contact</h2>
            <p>{data.personalInfo.address}</p>
            <p>{data.personalInfo.location}</p>
            <p>{data.personalInfo.phone}</p>
            <p>{data.personalInfo.email}</p>
            <p>{data.personalInfo.nationality}</p>
          </div>

          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <h2 className="text-lg font-bold underline mb-2 font-serif">Education</h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <p className="font-semibold">{edu.degree} in {edu.field}</p>
                  <p>{edu.institution}</p>
                  <p className="text-sm">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-lg font-bold underline mb-2 font-serif">Skills</h2>
              <ul className="list-disc list-inside">
                {data.skills.map((skill) => (
                  <li key={skill.id}>{skill.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <div>
              <h2 className="text-lg font-bold underline mb-2 font-serif">Languages</h2>
              {data.languages.map((lang, index) => (
                <p key={index}>{lang}</p>
              ))}
            </div>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <div>
              <h2 className="text-lg font-bold underline mb-2 font-serif">Certifications</h2>
              {data.certifications.map((cert, index) => (
                <p key={index}>{cert}</p>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="w-[65%] p-6 space-y-6">
          {/* Profile */}
          {data.summary && (
            <div>
              <h2 className="text-lg font-bold underline mb-2 font-serif">Profile</h2>
              <p>{data.summary}</p>
            </div>
          )}

          {/* Horizontal line */}
          <div className="border-t border-gray-400" />

          {/* Experience */}
          {data.experience.length > 0 && (
            <div>
              <h2 className="text-lg font-bold underline mb-2 font-serif">Experience</h2>
              {data.experience.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <p className="font-semibold">{exp.position}</p>
                  <p>{exp.company} | {exp.startDate} – {exp.current ? 'Present' : exp.endDate}</p>
                  <ul className="list-disc list-inside mt-1">
                    {exp.description?.split('\n').map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div>
              <h2 className="text-lg font-bold underline mb-2 font-serif">Projects</h2>
              {data.projects.map((project) => (
                <div key={project.id} className="mb-4">
                  <p className="font-semibold">{project.name}</p>
                  <p>{project.description}</p>
                  <p className="text-sm">Technologies: {project.technologies.join(', ')}</p>
                  {project.url && (
                    <p className="text-sm">
                      <a href={project.url} className="underline">View Project</a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template2;
