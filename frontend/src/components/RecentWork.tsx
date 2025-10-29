import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Clock, ArrowUpRight, Trash2 } from 'lucide-react';
import { templates } from '../data/template';

interface Resume {
  id: string;
  title: string;
  template: string;
  createdAt: string;
  updatedAt: string;
}

interface RecentWorkProps {
  resumes: Resume[];
  onDelete: (id: string) => void;
  onCreateNew: () => void;
  onDownload: (id: string) => void;
  isVisible?: boolean;
}

const RecentWork: React.FC<RecentWorkProps> = ({ 
  resumes, 
  onDelete, 
  onCreateNew, 
  isVisible = true 
}) => {
  const formatDate = (dateString: string | undefined) => {
  if (!dateString || isNaN(Date.parse(dateString))) return '—';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const getTimeAgo = (dateString: string | undefined) => {
  if (!dateString || isNaN(Date.parse(dateString))) return '—';
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
  return formatDate(dateString);
};

  const recentResumes = resumes.slice(-3).reverse();

  return (
    <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-[20px_20px_60px_#d1d9e6,-20px_-20px_60px_#ffffff] dark:shadow-[20px_20px_60px_#1a1a1a,-20px_-20px_60px_#2a2a2a] p-10 border border-white/50 dark:border-gray-700/50">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-black text-[#212529] dark:text-white mb-2">Recent Work</h2>
            <p className="text-[#6C757D] dark:text-gray-300 font-medium">Your latest resume projects</p>
          </div>
          <Link
            to="/templates"
            className="group flex items-center space-x-2 text-[#2F3C7E] dark:text-white hover:text-[#00C9A7] dark:hover:text-[#00C9A7] font-bold transition-all duration-300 bg-[#2F3C7E]/5 dark:bg-gray-700 hover:bg-[#00C9A7]/10 dark:hover:bg-[#00C9A7]/10 px-6 py-3 rounded-2xl shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#1a1a1a,-8px_-8px_16px_#2a2a2a] hover:shadow-[12px_12px_24px_#d1d9e6,-12px_-12px_24px_#ffffff] dark:hover:shadow-[12px_12px_24px_#1a1a1a,-12px_-12px_24px_#2a2a2a]"
          >
            <span>View All</span>
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </Link>
        </div>

        {recentResumes.length === 0 ? (
          <div className="text-center py-16">
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-[#FAFBFC] dark:bg-gray-700 rounded-full shadow-[20px_20px_60px_#d1d9e6,-20px_-20px_60px_#ffffff] dark:shadow-[20px_20px_60px_#1a1a1a,-20px_-20px_60px_#2a2a2a] flex items-center justify-center mx-auto">
                <FileText size={48} className="text-[#2F3C7E] dark:text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-[#212529] dark:text-white mb-3">No resumes yet</h3>
            <p className="text-[#6C757D] dark:text-gray-300 mb-8 text-lg">Create your first professional resume to get started</p>
            <button
              onClick={onCreateNew}
              className="bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] text-white px-8 py-4 rounded-2xl hover:shadow-xl transition-all duration-300 font-bold text-lg transform hover:scale-105"
            >
              Create Your First Resume
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {recentResumes.map((resume, index) => (
              <div key={resume.id} className={`group relative transition-all duration-500 delay-${index * 100}`}>
                <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-[15px_15px_30px_#d1d9e6,-15px_-15px_30px_#ffffff] dark:shadow-[15px_15px_30px_#1a1a1a,-15px_-15px_30px_#2a2a2a] hover:shadow-[20px_20px_40px_#d1d9e6,-20px_-20px_40px_#ffffff] dark:hover:shadow-[20px_20px_40px_#1a1a1a,-20px_-20px_40px_#2a2a2a] transition-all duration-500 transform hover:-translate-y-2 border border-white/50 dark:border-gray-600/50 h-full flex flex-col">
                  {/* Resume Preview Section */}
                  <div className="h-44 bg-[#FAFBFC] dark:bg-gray-600 rounded-xl mb-6 p-4 relative overflow-hidden shadow-[inset_8px_8px_16px_#d1d9e6,inset_-8px_-8px_16px_#ffffff] dark:shadow-[inset_8px_8px_16px_#1a1a1a,inset_-8px_-8px_16px_#2a2a2a] flex-shrink-0">
                    <div className="absolute top-3 right-3 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gradient-to-r from-[#2F3C7E] to-[#2F3C7E]/80 rounded w-3/4 shadow-sm"></div>
                      <div className="h-2 bg-[#E9ECEF] dark:bg-gray-500 rounded w-1/2 shadow-sm"></div>
                      <div className="space-y-2 mt-4">
                        <div className="h-2 bg-[#E9ECEF] dark:bg-gray-500 rounded w-full shadow-sm"></div>
                        <div className="h-2 bg-[#E9ECEF] dark:bg-gray-500 rounded w-4/5 shadow-sm"></div>
                        <div className="h-2 bg-[#E9ECEF] dark:bg-gray-500 rounded w-3/5 shadow-sm"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Resume Info Section */}
                  <div className="flex-grow flex flex-col">
                    <h3 className="font-bold text-[#212529] dark:text-white mb-3 truncate text-lg">
                      {resume.title || 'Untitled Resume'}
                    </h3>
                    <div className="flex items-center text-sm text-[#6C757D] dark:text-gray-300 mb-6">
                      <Clock size={14} className="mr-2 flex-shrink-0" />
                      <span>{getTimeAgo(resume.updatedAt)}</span>
                    </div>
                    
                    {/* Action Buttons Section - Fixed at bottom */}
                    <div className="mt-auto">
                      <div className="flex flex-col sm:flex-row gap-3">
                        {/* Edit Button */}
                        <Link 
                          to={`/editor/${resume.id}`}
                          className="group flex-1 bg-gradient-to-r from-[#2F3C7E] to-[#2F3C7E]/90 text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-300 text-center font-bold transform hover:scale-105 hover:from-[#2F3C7E]/90 hover:to-[#2F3C7E] min-h-[48px] flex items-center justify-center"
                        >
                          <span className="group-hover:scale-110 transition-transform duration-300">Edit</span>
                        </Link>
                        
                        {/* Preview & Delete Row */}
                        <div className="flex gap-3 flex-1">
                          <Link
                            to={`/finalpreview/${resume.id}`}
                            className="group flex-1 bg-[#FAFBFC] dark:bg-gray-600 text-[#2F3C7E] dark:text-white py-3 px-4 rounded-xl shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#1a1a1a,-8px_-8px_16px_#2a2a2a] hover:shadow-[12px_12px_24px_#d1d9e6,-12px_-12px_24px_#ffffff] dark:hover:shadow-[12px_12px_24px_#1a1a1a,-12px_-12px_24px_#2a2a2a] transition-all duration-300 text-center font-bold transform hover:scale-105 hover:text-[#00C9A7] dark:hover:text-[#00C9A7] min-h-[48px] flex items-center justify-center"
                          >
                            <span className="group-hover:scale-110 transition-transform duration-300">Preview</span>
                          </Link>
                          
                          <button
                            onClick={() => onDelete(resume.id)}
                            className="group bg-[#FF6B6B] text-white py-3 px-3 rounded-xl hover:shadow-lg transition-all duration-300 font-bold transform hover:scale-105 hover:bg-[#FF5252] min-h-[48px] flex items-center justify-center space-x-2"
                            title="Delete Resume"
                          >
                            <Trash2 size={16} className="group-hover:scale-110 transition-transform duration-300" />
                            <span className="group-hover:scale-110 transition-transform duration-300">Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentWork;