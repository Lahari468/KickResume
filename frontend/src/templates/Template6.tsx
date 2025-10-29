import React from 'react';
import type { ResumeData } from '../types/resume';
import {
  Mail,
  Phone,
  MapPin,
  Hammer,
  Languages,
  Linkedin
} from 'lucide-react';

interface Template6Props {
  data: ResumeData;
}

const Template6: React.FC<Template6Props> = ({ data }) => {
  return (
    <div className="grid grid-cols-3 font-serif min-h-screen">
      
      {/* Sidebar */}
<aside
  className="col-span-1 text-black px-8 py-10 flex flex-col justify-start"
  style={{ backgroundColor: '#E8D7CC' }}
>
  {/* Contact Info */}
  <section className="space-y-4 text-sm mt-2">
    <div className="flex items-center gap-2 mb-2">
      <Phone className="w-5 h-5 text-[#4A2C30]" />
      <h3 className="uppercase font-semibold text-sm" style={{ color: '#4A2C30' }}>Contact</h3>
    </div>
    <div className="flex flex-col gap-2 pl-1 text-sm">
      <div className="flex items-center gap-2">
        <Phone className="w-4 h-4 text-black" />
        <span>{data.personalInfo.phone}</span>
      </div>
      <div className="flex items-center gap-2">
        <Mail className="w-4 h-4 text-black" />
        <span>{data.personalInfo.email}</span>
      </div>
      <div className="flex items-center gap-2">
        <Linkedin className="w-4 h-4 text-black" />
        <span>{data.personalInfo.linkedin}</span>
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-black" />
        <span>{data.personalInfo.location}</span>
      </div>
    </div>
    <hr className="border-t border-[#75414D] mt-4" />
  </section>

  {/* Skills */}
  {data.skills.length > 0 && (
    <section className="text-sm space-y-2 mt-10">
      <div className="flex items-center gap-2 mb-2">
        <Hammer className="w-5 h-5 text-[#4A2C30]" />
        <h3 className="uppercase font-semibold text-sm" style={{ color: '#4A2C30' }}>Skills</h3>
      </div>
      <ul className="list-disc pl-5 space-y-1">
        {data.skills.map(skill => (
          <li key={skill.id}>{skill.name}</li>
        ))}
      </ul>
      <hr className="border-t border-[#75414D] mt-4" />
    </section>
  )}

  {/* Languages */}
  {data.languages.length > 0 && (
    <section className="text-sm space-y-2 mt-10">
      <div className="flex items-center gap-2 mb-2">
        <Languages className="w-5 h-5 text-[#4A2C30]" />
        <h3 className="uppercase font-semibold text-sm" style={{ color: '#4A2C30' }}>Languages</h3>
      </div>
      <ul className="list-disc pl-5 space-y-1">
        {data.languages.map((lang, idx) => (
          <li key={idx}>{lang}</li>
        ))}
      </ul>
      <hr className="border-t border-[#75414D] mt-4" />
    </section>
  )}
</aside>



      {/* Main Content */}
      <main className="col-span-2 p-10 space-y-10 text-white" style={{ backgroundColor: '#75414D' }}>
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold uppercase tracking-wide text-white">
            {data.personalInfo.fullName}
          </h1>
          <p className="text-lg font-medium mt-1 uppercase" style={{ color: '#E8D7CC' }}>
            {data.personalInfo.title}
          </p>
        </div>

        {/* Summary */}
        {data.summary && (
          <section>
            <h2 className="text-xl font-semibold uppercase mb-2 border-b pb-1" style={{ borderColor: '#E8D7CC', color: '#FFFFFF' }}>
              Professional Summary
            </h2>
            <p className="text-sm leading-relaxed text-white">{data.summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {data.experience.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold uppercase mb-2 border-b pb-1" style={{ borderColor: '#E8D7CC', color: '#FFFFFF' }}>
              Work Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-base text-white">{exp.position}</h3>
                      <p className="text-sm italic text-[#E8D7CC]">{exp.company} • {exp.location}</p>
                    </div>
                    <span className="text-xs" style={{ color: '#E8D7CC' }}>
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm mt-1 text-white">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold uppercase mb-2 border-b pb-1" style={{ borderColor: '#E8D7CC', color: '#FFFFFF' }}>
              Education
            </h2>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-white">
                        {edu.degree} in {edu.field}
                      </h3>
                      <p className="text-sm text-[#E8D7CC]">{edu.institution}</p>
                      {edu.gpa && <p className="text-xs text-[#F5E7E0]">GPA: {edu.gpa}</p>}
                    </div>
                    <span className="text-xs" style={{ color: '#E8D7CC' }}>
                      {edu.startDate} – {edu.current ? 'Present' : edu.endDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold uppercase mb-2 border-b pb-1" style={{ borderColor: '#E8D7CC', color: '#FFFFFF' }}>
              Projects
            </h2>
            <div className="space-y-6">
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="text-base font-bold text-white">{proj.name}</h3>
                  <p className="text-sm text-[#F8EBE7] mb-1">{proj.description}</p>
                  <div className="flex flex-wrap gap-2 mb-1">
                    {proj.technologies.map((tech, index) => (
                      <span key={index} className="bg-[#E8D7CC] text-[#75414D] text-xs px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {proj.url && (
                    <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-sm text-[#E8D7CC] hover:underline">
                      View Project
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold uppercase mb-2 border-b pb-1" style={{ borderColor: '#E8D7CC', color: '#FFFFFF' }}>
              Certifications
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-white">
              {data.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
};

export default Template6;
