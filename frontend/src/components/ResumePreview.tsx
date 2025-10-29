import React, { useEffect } from 'react';
import { useResume } from '../contexts/ResumeContext';
import { Eye } from 'lucide-react';

const ResumePreview: React.FC = () => {
  const { resumeData, selectedTemplate, updateRecentResume } = useResume();

  useEffect(() => {
    if (!selectedTemplate) return;
    updateRecentResume("1", {
      title: resumeData.personalInfo.fullName + "'s Resume",
      updatedAt: new Date().toISOString(),
    });
  }, [resumeData]);

  if (!selectedTemplate) {
    return (
      <div className="bg-white h-full flex items-center justify-center">
        <div className="text-center text-gray-500">
          <Eye className="w-16 h-16 mx-auto mb-4" />
          <p className="text-lg text-[#6C757D]">Select a template to see your resume preview</p>
        </div>
      </div>
    );
  }

  const TemplateComponent = selectedTemplate.component;

  return (
    <div id="resume-download-target" className="bg-white p-6 shadow rounded">
      <TemplateComponent data={resumeData} />
    </div>
  );
};

export default ResumePreview;
