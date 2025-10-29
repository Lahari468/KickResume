import React from 'react';
import { templates } from '../data/template';
import { Sparkles, Star, Zap } from 'lucide-react';
import TemplateCard from '../components/TemplateCard';
import Navbar from '../components/Navbar';

const TemplatesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] via-white to-[#E9ECEF] dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 pt-0 transition-colors duration-500">
      
      {/* Navbar */}
      <Navbar />

      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-[#00C9A7]" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] bg-clip-text text-transparent">
              Choose Your Resume Template
            </h1>
            <Star className="w-8 h-8 text-[#FF6B6B]" />
          </div>
          <p className="text-xl text-[#6C757D] dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Select from our collection of professionally designed resume templates that help you stand out from the crowd
          </p>
          <div className="flex justify-center items-center gap-2 mt-4">
            <Zap className="w-5 h-5 text-[#00C9A7]" />
            <span className="text-sm font-medium text-[#6C757D] dark:text-gray-400">
              {templates.length} Premium Templates Available
            </span>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 place-items-center max-w-7xl mx-auto">
          {templates.map((template) => (
            <div key={template.id} className="w-full max-w-sm">
              <TemplateCard template={template} />
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="text-center mt-16 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-[#E9ECEF] dark:border-gray-700 transition-colors duration-300">
          <h3 className="text-2xl font-bold text-[#2F3C7E] dark:text-white mb-4">Ready to Build Your Perfect Resume?</h3>
          <p className="text-[#6C757D] dark:text-gray-300 mb-6">
            Choose any template above and start creating your professional resume in minutes
          </p>
          <div className="flex justify-center items-center gap-6 text-sm text-[#6C757D] dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#00C9A7] rounded-full"></div>
              <span>Easy to customize</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#2F3C7E] rounded-full"></div>
              <span>Professional designs</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#FF6B6B] rounded-full"></div>
              <span>ATS-friendly</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;