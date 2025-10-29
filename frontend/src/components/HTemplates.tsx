import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Download, Star, Briefcase, Palette, Minimize, Code } from 'lucide-react';

const Templates: React.FC = () => {
  const [visibleTemplates, setVisibleTemplates] = useState<number[]>([]);
  const templatesRef = useRef<HTMLDivElement>(null);

  const templates = [
    {
      name: 'Executive Pro',
      category: 'Formal & Corporate',
      rating: 4.9,
      downloads: '5,000+',
      image: 'https://cdn.create.microsoft.com/catalog-assets/en-us/a32a147f-1f69-4fd5-8a39-c25b2a0093e8/thumbnails/616/stylish-teaching-resume-red-modern-simple-2-1-86dfc2cb0037.webp',
      color: '#2F3C7E',
      icon: Briefcase,
      emoji: '📁'
    },
    {
      name: 'Creative Edge',
      category: 'Bold & Visual',
      rating: 4.8,
      downloads: '3,500+',
      image: 'https://cdn.create.microsoft.com/catalog-assets/en-us/33449d14-b590-4c13-929a-4931b797f8f9/thumbnails/616/attorney-resume-green-modern-simple-2-1-e1ac26061abc.webp',
      color: '#00C9A7',
      icon: Palette,
      emoji: '🎨'
    },
    {
      name: 'Modern Minimal',
      category: 'Simple & Sleek',
      rating: 4.9,
      downloads: '4,000+',
      image: 'https://s3.resume.io/cdn-cgi/image/width=380,format=auto/uploads/local_template_image/image/383/persistent-resource/santiago-resume-templates.jpg?v=1656070649',
      color: '#FF6B6B',
      icon: Minimize,
      emoji: '✏️'
    },
    {
      name: 'Tech Specialist',
      category: 'Developer & IT Friendly',
      rating: 4.7,
      downloads: '7,000+',
      image: 'https://instaresume.io/template-preview/200kb/OceanPreview_200kb.png',
      color: '#2F3C7E',
      icon: Code,
      emoji: '👨‍💻'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleTemplates(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = templatesRef.current?.querySelectorAll('.template-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, template: any) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
    const parent = target.parentElement;
    if (parent) {
      parent.style.background = `linear-gradient(135deg, ${template.color}20, ${template.color}10)`;
      parent.innerHTML += `
        <div class="flex items-center justify-center h-64">
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-4 rounded-lg flex items-center justify-center" style="background-color: ${template.color}20">
              <span class="text-2xl">${template.emoji}</span>
            </div>
            <p class="text-gray-500 font-medium">${template.name}</p>
            <p class="text-gray-400 text-sm">Template Preview</p>
          </div>
        </div>
      `;
    }
  };

  return (
    <section id="templates" ref={templatesRef} className="py-20 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#212529] mb-4">
            🖼️ Professional Resume Templates
          </h2>
          <p className="text-xl text-[#6C757D] max-w-3xl mx-auto">
            Each of our templates is designed to highlight your skills with clarity, elegance, and professionalism.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((template, index) => {
            const isVisible = visibleTemplates.includes(index);
           
            
            return (
              <div
                key={index}
                data-index={index}
                className={`template-card group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={template.image} 
                    alt={template.name}
                    className="w-full h-64 object-cover object-top group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => handleImageError(e, template)}
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200">
                      <Eye size={20} className="text-white" />
                    </button>
                    <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-200">
                      <Download size={20} className="text-white" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{template.emoji}</span>
                      <h3 className="text-lg font-semibold text-[#212529]">
                        {template.name}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-[#6C757D]">{template.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-[#6C757D] mb-3">
                    Style: {template.category}
                  </p>
                  
                  <p className="text-sm font-medium text-[#2F3C7E]">
                   {template.downloads} Downloads
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/login"
            className="bg-[#2F3C7E] text-white px-8 py-4 rounded-lg hover:bg-[#00C9A7] transition-colors duration-200 font-semibold"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Templates;