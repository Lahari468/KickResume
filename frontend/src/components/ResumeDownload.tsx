// src/components/ResumeDownload.tsx
import React from 'react';
import html2pdf from 'html2pdf.js';

const ResumeDownload: React.FC = () => {
  const handleDownload = () => {
    const element = document.getElementById('resume-preview');
    if (!element) {
      alert('Resume content not found');
      return;
    }

    const options = {
      margin:       0.5,
      filename:     'my_resume.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="p-4">
      <div
        id="resume-preview"
        className="bg-white p-6 rounded shadow-md w-full max-w-[800px] mx-auto"
      >
        <h1 className="text-3xl font-bold">John Doe</h1>
        <p className="mt-2">Frontend Developer</p>
        <p>Email: john@example.com</p>
        <p>Location: Hyderabad, India</p>
        {/* Add more resume fields here */}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleDownload}
          className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default ResumeDownload;
