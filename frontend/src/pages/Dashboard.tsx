/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus, FileText, Palette, Download, Trash2, TrendingUp, Award, ChevronLeft,
  ChevronRight, Lightbulb, Target, Zap, CheckCircle, Star, ArrowUpRight, Sparkles, Rocket
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import Navbar from '../components/Navbar';
import RecentWork from '../components/RecentWork';
import { downloadResume, getAllResumes } from '../api/resumeApi';

interface Resume {
  downloads: number;
  id: string;
  title: string;
  template: string;
  createdAt: string;
  updatedAt: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  color: string;
  rating: number;
  downloads: string;
}

const Dashboard: React.FC = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const userName = user?.name || localStorage.getItem('userName') || 'Guest';

  const templates: Template[] = [
    {
      id: 'template-1',
      name: 'Classic Professional',
      description: 'Clean design perfect for corporate roles and business professionals',
      image: 'https://cdn-images.zety.com/templates/zety/iconic-9-classic-silver-dark-276@1x.png',
      category: 'Professional',
      color: '#2F3C7E',
      rating: 4.9,
      downloads: '15K+',
    },
    {
      id: 'template-9',
      name: 'Teaching Stylish',
      description: 'Bold design for creative professionals and designers',
      image: 'https://cdn.create.microsoft.com/catalog-assets/en-us/a32a147f-1f69-4fd5-8a39-c25b2a0093e8/thumbnails/616/stylish-teaching-resume-red-modern-simple-2-1-86dfc2cb0037.webp',
      category: 'Creative',
      color: '#00C9A7',
      rating: 4.8,
      downloads: '12K+',
    },
    {
      id: 'template-10',
      name: 'Santiago Elegant',
      description: 'Simple elegance that highlights your content beautifully',
      image: 'https://s3.resume.io/cdn-cgi/image/width=380,format=auto/uploads/local_template_image/image/383/persistent-resource/santiago-resume-templates.jpg?v=1656070649',
      category: 'Minimal',
      color: '#FF6B6B',
      rating: 4.9,
      downloads: '18K+',
    },
    {
      id: 'template-5',
      name: 'Executive Classic',
      description: 'Perfect for developers and IT professionals',
      image: 'https://instaresume.io/template-preview/200kb/OceanPreview_200kb.png',
      category: 'Technical',
      color: '#2F3C7E',
      rating: 4.7,
      downloads: '9K+',
    },
  ];

  const resumeTips = [
    {
      icon: Target,
      title: 'Use Quantified Achievements',
      description: 'Include numbers and percentages to show impact (e.g., "Increased sales by 25%")',
      color: '#2F3C7E',
    },
    {
      icon: Zap,
      title: 'Tailor Resume to Job',
      description: 'Customize your resume for each application using relevant keywords',
      color: '#00C9A7',
    },
    {
      icon: TrendingUp,
      title: 'Start with Action Verbs',
      description: 'Use powerful verbs like "Led", "Built", "Improved", "Achieved"',
      color: '#FF6B6B',
    },
    {
      icon: FileText,
      title: 'Keep it One Page',
      description: 'Unless you have 10+ years experience, stick to one page',
      color: '#2F3C7E',
    },
    {
      icon: CheckCircle,
      title: 'Use Clean Formatting',
      description: 'Consistent fonts, spacing, and bullet points for readability',
      color: '#00C9A7',
    },
    {
      icon: Award,
      title: 'Highlight Key Skills',
      description: 'Place your most relevant skills prominently at the top',
      color: '#FF6B6B',
    },
  ];

  // ✅ Create new resume
  const createNewResume = () => {
  const count = resumes.length + 1;

  const newResume: Resume = {
    id: Date.now().toString(),
    title: `Resume ${count}`,
    template: 'template-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    downloads: 0,
  };

  const updatedResumes = [...resumes, newResume];
  setResumes(updatedResumes);
  localStorage.setItem('resumes', JSON.stringify(updatedResumes));

  showToast(`Created "${newResume.title}"`, 'success');
  navigate(`/editor/${newResume.id}`);
};


  // ✅ Delete resume
  const deleteResume = (id: string) => {
  if (window.confirm('Are you sure you want to delete this resume?')) {
    const updatedResumes = resumes.filter((r) => r.id !== id);
    setResumes(updatedResumes);
    localStorage.setItem('resumes', JSON.stringify(updatedResumes));
    showToast('Resume deleted successfully!', 'success');
  }
};

  // ✅ Load resumes
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const data = await getAllResumes();
        const fixed = data.map((r: any) => ({
          ...r,
          createdAt: r.createdAt || new Date().toISOString(),
          updatedAt: r.updatedAt || new Date().toISOString(),
        }));
        setResumes(fixed);
      } catch (err) {
        console.error('Failed to load resumes:', err);
        showToast('Error fetching resumes. Using local data.', 'error');

        const savedResumes = localStorage.getItem('resumes');
        if (savedResumes) {
          const parsed = JSON.parse(savedResumes).map((r: any) => ({
            ...r,
            createdAt: r.createdAt || new Date().toISOString(),
            updatedAt: r.updatedAt || new Date().toISOString(),
          }));
          setResumes(parsed);
          localStorage.setItem('resumes', JSON.stringify(parsed));
        }
      }
    };

    fetchResumes();
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleDownload = async (id: string) => {
    try {
      await downloadResume(id);
      const updated = await getAllResumes();
      setResumes(updated);
    } catch (err) {
      console.error(err);
    }
  };

  const nextTemplate = () => {
    setCurrentTemplateIndex((prev) => (prev + 1) % templates.length);
  };

  const prevTemplate = () => {
    setCurrentTemplateIndex((prev) => (prev - 1 + templates.length) % templates.length);
  };

  const stats = {
    resumesCreated: resumes.length,
    templatesUsed: new Set(resumes.map((r) => r.template)).size,
    pdfDownloads: resumes.reduce((sum, r) => sum + (r.downloads || 0), 0),
  };

  return (
    <div className="min-h-screen bg-[#FAFBFC] dark:bg-gray-900 transition-colors duration-300">
     <Navbar />
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#2F3C7E]/5 dark:bg-[#2F3C7E]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-[#00C9A7]/5 dark:bg-[#00C9A7]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-[#FF6B6B]/5 dark:bg-[#FF6B6B]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Welcome Header with Left-Right Layout */}
        <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-between">
            {/* Left Side - Hello Message */}
            <div className="flex-1">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#2F3C7E]/10 to-[#00C9A7]/10 px-6 py-3 rounded-full mb-6 border border-[#2F3C7E]/20">
                <Sparkles size={20} className="text-[#2F3C7E] dark:text-white" />
                <span className="text-[#2F3C7E] dark:text-white font-semibold">Welcome to your workspace</span>
              </div>
              <h1 className="text-5xl font-black text-[#212529] dark:text-white mb-4 tracking-tight">
              </h1><h1 className="text-5xl font-bold mb-2">
  Hello,{" "}
  <span className="bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] bg-clip-text text-transparent">
    {(user?.name || localStorage.getItem('userName') || 'Guest').trim()}
  </span>
  ! 👋
</h1>
              <p className="text-lg text-[#6C757D] dark:text-gray-300 max-w-xl leading-relaxed">
                Ready to craft your next career-defining resume? Let's build something amazing together.
              </p>
            </div>

            {/* Right Side - Launch Career CTA */}
            <div className="flex-1 flex justify-end">
              <div className="relative max-w-md">
                <div className="absolute inset-0 bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] rounded-3xl transform rotate-1"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border-4 border-white dark:border-gray-700 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                  <div className="text-center">
                    <div className="inline-flex items-center space-x-3 mb-4">
                      <div className="p-3 bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] rounded-2xl">
                        <Rocket size={24} className="text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#212529] dark:text-white">Launch Career</h2>
                    </div>
                    <p className="text-[#6C757D] dark:text-gray-300 mb-6 leading-relaxed">
                      Create a professional resume that stands out and lands interviews.
                    </p>
                    <button
                      onClick={createNewResume}
                      className="group relative inline-flex items-center space-x-2 bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                      <span>Create Resume</span>
                      <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards with Neumorphism */}
        <div className={`grid md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="group relative">
            <div className="bg-[#FAFBFC] dark:bg-gray-800 p-8 rounded-3xl shadow-[20px_20px_60px_#d1d9e6,-20px_-20px_60px_#ffffff] dark:shadow-[20px_20px_60px_#1a1a1a,-20px_-20px_60px_#2a2a2a] hover:shadow-[25px_25px_70px_#d1d9e6,-25px_-25px_70px_#ffffff] dark:hover:shadow-[25px_25px_70px_#1a1a1a,-25px_-25px_70px_#2a2a2a] transition-all duration-500 border border-white/50 dark:border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 bg-gradient-to-br from-[#2F3C7E]/10 to-[#2F3C7E]/5 rounded-2xl shadow-[inset_8px_8px_16px_#d1d9e6,inset_-8px_-8px_16px_#ffffff] dark:shadow-[inset_8px_8px_16px_#1a1a1a,inset_-8px_-8px_16px_#2a2a2a]">
                  <FileText size={32} className="text-[#2F3C7E] dark:text-white" />
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-[#2F3C7E] dark:text-white mb-1">{stats.resumesCreated}</div>
                  <div className="text-[#6C757D] dark:text-gray-300 text-sm font-semibold uppercase tracking-wider">Created</div>
                </div>
              </div>
              <div className="border-t border-[#E9ECEF] dark:border-gray-700 pt-4">
                <p className="text-[#212529] dark:text-white font-bold mb-2">Resumes Built</p>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-green-600 dark:text-green-400 text-sm font-semibold">Active & Ready</span>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="bg-[#FAFBFC] dark:bg-gray-800 p-8 rounded-3xl shadow-[20px_20px_60px_#d1d9e6,-20px_-20px_60px_#ffffff] dark:shadow-[20px_20px_60px_#1a1a1a,-20px_-20px_60px_#2a2a2a] hover:shadow-[25px_25px_70px_#d1d9e6,-25px_-25px_70px_#ffffff] dark:hover:shadow-[25px_25px_70px_#1a1a1a,-25px_-25px_70px_#2a2a2a] transition-all duration-500 border border-white/50 dark:border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 bg-gradient-to-br from-[#00C9A7]/10 to-[#00C9A7]/5 rounded-2xl shadow-[inset_8px_8px_16px_#d1d9e6,inset_-8px_-8px_16px_#ffffff] dark:shadow-[inset_8px_8px_16px_#1a1a1a,inset_-8px_-8px_16px_#2a2a2a]">
                  <Palette size={32} className="text-[#00C9A7] dark:text-white" />
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-[#00C9A7] dark:text-white mb-1">{stats.templatesUsed}</div>
                  <div className="text-[#6C757D] dark:text-gray-300 text-sm font-semibold uppercase tracking-wider">Styles</div>
                </div>
              </div>
              <div className="border-t border-[#E9ECEF] dark:border-gray-700 pt-4">
                <p className="text-[#212529] dark:text-white font-bold mb-2">Templates Used</p>
                <div className="flex items-center">
                  <Star size={16} className="text-yellow-400 mr-2 fill-current" />
                  <span className="text-yellow-600 dark:text-yellow-400 text-sm font-semibold">Exploring Variety</span>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="bg-[#FAFBFC] dark:bg-gray-800 p-8 rounded-3xl shadow-[20px_20px_60px_#d1d9e6,-20px_-20px_60px_#ffffff] dark:shadow-[20px_20px_60px_#1a1a1a,-20px_-20px_60px_#2a2a2a] hover:shadow-[25px_25px_70px_#d1d9e6,-25px_-25px_70px_#ffffff] dark:hover:shadow-[25px_25px_70px_#1a1a1a,-25px_-25px_70px_#2a2a2a] transition-all duration-500 border border-white/50 dark:border-gray-700/50">
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF6B6B]/5 rounded-2xl shadow-[inset_8px_8px_16px_#d1d9e6,inset_-8px_-8px_16px_#ffffff] dark:shadow-[inset_8px_8px_16px_#1a1a1a,inset_-8px_-8px_16px_#2a2a2a]">
                  <Download size={32} className="text-[#FF6B6B] dark:text-white" />
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-[#FF6B6B] dark:text-white mb-1">{stats.pdfDownloads}</div>
                  <div className="text-[#6C757D] dark:text-gray-300 text-sm font-semibold uppercase tracking-wider">Downloads</div>
                </div>
              </div>
              <div className="border-t border-[#E9ECEF] dark:border-gray-700 pt-4">
                <p className="text-[#212529] dark:text-white font-bold mb-2">PDF Exports</p>
                <div className="flex items-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  <span className="text-green-600 dark:text-green-400 text-sm font-semibold">Job Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Recent Work Component */}
            <RecentWork 
              resumes={resumes}
              onDelete={deleteResume}
              onCreateNew={createNewResume}
              isVisible={isVisible}
              onDownload={handleDownload}
            />

            {/* Template Carousel with Floating Cards */}
            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-[20px_20px_60px_#d1d9e6,-20px_-20px_60px_#ffffff] dark:shadow-[20px_20px_60px_#1a1a1a,-20px_-20px_60px_#2a2a2a] p-10 border border-white/50 dark:border-gray-700/50">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-3xl font-black text-[#212529] dark:text-white mb-2">Featured Templates</h2>
                    <p className="text-[#6C757D] dark:text-gray-300 font-medium">Professional designs for every industry</p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={prevTemplate}
                      className="p-3 bg-[#FAFBFC] dark:bg-gray-700 rounded-xl shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#1a1a1a,-8px_-8px_16px_#2a2a2a] hover:shadow-[12px_12px_24px_#d1d9e6,-12px_-12px_24px_#ffffff] dark:hover:shadow-[12px_12px_24px_#1a1a1a,-12px_-12px_24px_#2a2a2a] transition-all duration-300 transform hover:scale-110"
                    >
                      <ChevronLeft size={20} className="text-[#6C757D] dark:text-gray-300" />
                    </button>
                    <button
                      onClick={nextTemplate}
                      className="p-3 bg-[#FAFBFC] dark:bg-gray-700 rounded-xl shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#1a1a1a,-8px_-8px_16px_#2a2a2a] hover:shadow-[12px_12px_24px_#d1d9e6,-12px_-12px_24px_#ffffff] dark:hover:shadow-[12px_12px_24px_#1a1a1a,-12px_-12px_24px_#2a2a2a] transition-all duration-300 transform hover:scale-110"
                    >
                      <ChevronRight size={20} className="text-[#6C757D] dark:text-gray-300" />
                    </button>
                  </div>
                </div>

              <div className="overflow-hidden rounded-2xl">
  <div
    className="flex transition-transform duration-500 ease-out"
    style={{ transform: `translateX(-${currentTemplateIndex * 100}%)` }}
  >
    {templates.map((template) => (
      <div key={template.id} className="w-full flex-shrink-0 px-3">
        <div className="bg-[#FAFBFC] dark:bg-gray-700 rounded-2xl p-8 shadow-[15px_15px_30px_#d1d9e6,-15px_-15px_30px_#ffffff] dark:shadow-[15px_15px_30px_#1a1a1a,-15px_-15px_30px_#2a2a2a] hover:shadow-[20px_20px_40px_#d1d9e6,-20px_-20px_40px_#ffffff] dark:hover:shadow-[20px_20px_40px_#1a1a1a,-20px_-20px_40px_#2a2a2a] transition-all duration-500 border border-white/50 dark:border-gray-600/50 group">
          <div className="flex items-center space-x-6">
            {/* Template Preview */}
            <div className="w-32 h-40 bg-white dark:bg-gray-600 rounded-xl shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff] dark:shadow-[10px_10px_20px_#1a1a1a,-10px_-10px_20px_#2a2a2a] p-3 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#FAFBFC] dark:bg-gray-500 rounded-lg flex items-center justify-center relative overflow-hidden shadow-[inset_5px_5px_10px_#d1d9e6,inset_-5px_-5px_10px_#ffffff] dark:shadow-[inset_5px_5px_10px_#1a1a1a,inset_-5px_-5px_10px_#2a2a2a]">
                <img
                  src={template.image}
                  alt={`${template.name} preview`}
                  className="w-25 h-45 object-cover rounded shadow-lg border-2"
                  style={{ borderColor: `${template.color}20` }}
                />
                <div className="space-y-1.5 absolute bottom-2 left-2">
                  <div
                    className="h-2.5 rounded w-3/4 shadow-sm"
                    style={{ backgroundColor: template.color }}
                  ></div>
                  <div className="h-1.5 bg-gray-200 dark:bg-gray-400 rounded w-1/2 shadow-sm"></div>
                  <div className="space-y-1 mt-3">
                    <div className="h-1 bg-gray-200 dark:bg-gray-400 rounded w-full shadow-sm"></div>
                    <div className="h-1 bg-gray-200 dark:bg-gray-400 rounded w-4/5 shadow-sm"></div>
                    <div className="h-1 bg-gray-200 dark:bg-gray-400 rounded w-3/5 shadow-sm"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Template Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <h3 className="text-2xl font-black text-[#212529] dark:text-white">
                  {template.name}
                </h3>
                <div className="flex items-center space-x-1">
                  <Star size={16} className="text-yellow-400 fill-current" />
                  <span className="text-sm font-bold text-[#6C757D] dark:text-gray-300">
                    {template.rating}
                  </span>
                </div>
              </div>
              <p className="text-[#6C757D] dark:text-gray-300 mb-4 leading-relaxed font-medium">
                {template.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span
                    className="text-xs font-bold px-3 py-2 rounded-full shadow-sm"
                    style={{
                      backgroundColor: `${template.color}15`,
                      color: template.color,
                    }}
                  >
                    {template.category}
                  </span>
                  <span className="text-xs text-[#6C757D] dark:text-gray-300 font-semibold">
                    {template.downloads} downloads
                  </span>
                </div>

                {/* Updated Use Template Button */}
              <button    
        onClick={() => navigate(`/editor?templateId=${template.id}`)}
      className="bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-bold transform hover:scale-105"
        >Use Template </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


                <div className="flex justify-center mt-8 space-x-3">
                  {templates.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTemplateIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 shadow-sm ${
                        index === currentTemplateIndex 
                          ? 'bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] scale-125 shadow-lg' 
                          : 'bg-[#E9ECEF] dark:bg-gray-600 hover:bg-[#2F3C7E]/30 dark:hover:bg-[#2F3C7E]/30 shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff] dark:shadow-[inset_2px_2px_4px_#1a1a1a,inset_-2px_-2px_4px_#2a2a2a]'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Tips with Floating Effect */}
          <div className="lg:col-span-1">
            <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-[20px_20px_60px_#d1d9e6,-20px_-20px_60px_#ffffff] dark:shadow-[20px_20px_60px_#1a1a1a,-20px_-20px_60px_#2a2a2a] p-8 sticky top-24 border border-white/50 dark:border-gray-700/50">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="p-3 bg-gradient-to-br from-[#00C9A7]/10 to-[#00C9A7]/5 rounded-2xl shadow-[inset_8px_8px_16px_#d1d9e6,inset_-8px_-8px_16px_#ffffff] dark:shadow-[inset_8px_8px_16px_#1a1a1a,inset_-8px_-8px_16px_#2a2a2a]">
                    <Lightbulb size={24} className="text-[#00C9A7] dark:text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-[#212529] dark:text-white">Pro Tips</h2>
                    <p className="text-[#6C757D] dark:text-gray-300 text-sm font-semibold">Expert advice</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {resumeTips.map((tip, index) => {
                    const Icon = tip.icon;
                    return (
                      <div key={index} className="group relative">
                        <div className="p-5 bg-[#FAFBFC] dark:bg-gray-700 rounded-xl shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff] dark:shadow-[10px_10px_20px_#1a1a1a,-10px_-10px_20px_#2a2a2a] hover:shadow-[15px_15px_30px_#d1d9e6,-15px_-15px_30px_#ffffff] dark:hover:shadow-[15px_15px_30px_#1a1a1a,-15px_-15px_30px_#2a2a2a] transition-all duration-300 border border-white/50 dark:border-gray-600/50">
                          <div className="flex items-start space-x-4">
                            <div 
                              className="p-3 rounded-xl shadow-[inset_5px_5px_10px_#d1d9e6,inset_-5px_-5px_10px_#ffffff] dark:shadow-[inset_5px_5px_10px_#1a1a1a,inset_-5px_-5px_10px_#2a2a2a] flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                              style={{ backgroundColor: `${tip.color}15` }}
                            >
                              <Icon size={18} style={{ color: tip.color }} />
                            </div>
                            <div>
                              <h3 className="font-bold text-[#212529] dark:text-white mb-2">{tip.title}</h3>
                              <p className="text-[#6C757D] dark:text-gray-300 text-sm leading-relaxed">{tip.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 p-6 bg-[#FAFBFC] dark:bg-gray-700 rounded-2xl shadow-[inset_15px_15px_30px_#d1d9e6,inset_-15px_-15px_30px_#ffffff] dark:shadow-[inset_15px_15px_30px_#1a1a1a,inset_-15px_-15px_30px_#2a2a2a] border border-white/50 dark:border-gray-600/50">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] rounded-lg shadow-lg">
                      <Star size={16} className="text-white" />
                    </div>
                    <h3 className="font-black text-[#212529] dark:text-white">💡 Pro Tip</h3>
                  </div>
                  <p className="text-[#6C757D] dark:text-gray-300 leading-relaxed font-medium">
                    Customize your resume for each job application. Use keywords from the job description to increase your chances of passing ATS systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;