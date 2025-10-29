import React from 'react';
import ResumePreview from '../components/ResumePreview';
import { Download, Printer, ArrowLeft } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { useNavigate } from 'react-router-dom';

const FinalPreviewPage: React.FC = () => {
  const navigate = useNavigate();

  const handleDownload = () => {
    const resumeElement = document.getElementById('resume-download-target');
    if (!resumeElement) return;

    const options = {
      margin: 0.5,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().set(options).from(resumeElement).save();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    navigate('/editor'); // Change to your editing page route
  };

  return (
    <div className="p-6 bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] min-h-screen">
      <div className="flex justify-between items-center mb-6 animate-fade-in-up">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 bg-[#2F3C7E] text-white rounded-lg hover:bg-[#1e2b5c] transition-all shadow-lg"
        >
          <ArrowLeft size={16} />
          Back to Editing
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 text-[#2F3C7E] border border-[#2F3C7E] hover:bg-[#2F3C7E] hover:text-white rounded-lg transition-all shadow-md"
          >
            <Printer size={16} />
            Print
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] text-white rounded-lg hover:from-[#00C9A7] hover:to-[#2F3C7E] transition-all font-semibold shadow-lg transform hover:-translate-y-0.5"
          >
            <Download size={16} />
            Download PDF
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto animate-fade-in-up">
        <ResumePreview />
      </div>
    </div>
  );
};

export default FinalPreviewPage;
