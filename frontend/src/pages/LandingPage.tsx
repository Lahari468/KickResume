import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  FileText,
  MousePointer,
  FileText as FT,
  CheckCircle,
  Palette,
  Heart,
  Download
} from 'lucide-react';
import Templates from '../components/HTemplates';

const LandingPage: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const featuresRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: MousePointer,
      title: 'User-Friendly Resume Builder',
      description: 'Simple and guided form-based interface to create professional resumes.',
      color: '#2F3C7E'
    },
    {
      icon: FT,
      title: 'Cover Letter Companion Tool',
      description: 'Build a custom cover letter that matches your resume style.',
      badge: 'Coming Soon',
      color: '#00C9A7'
    },
    {
      icon: CheckCircle,
      title: 'ATS-Friendly Formatting',
      description: 'All templates are built to pass Applicant Tracking Systems used by companies.',
      color: '#FF6B6B'
    },
    {
      icon: Palette,
      title: 'Professionally Designed Templates',
      description: 'Choose from modern, creative, and clean designs built for real-world jobs.',
      color: '#2F3C7E'
    },
    {
      icon: Heart,
      title: 'Free Forever',
      description: 'No hidden fees. Start and finish your resume without payment.',
      color: '#00C9A7'
    },
    {
      icon: Download,
      title: 'Instant PDF Export',
      description: 'Download your resume as a high-quality PDF in just one click.',
      color: '#FF6B6B'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          setVisibleCards(prev => [...prev, index]);
        }
      });
    }, { threshold: 0.1 });

    const cards = featuresRef.current?.querySelectorAll('.feature-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-[#F8F9FA] to-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="transition-all duration-800 opacity-100 translate-x-0">
                <h1 className="text-4xl md:text-6xl font-bold text-[#212529] leading-tight mb-6">
                  Job-Winning
                  <span className="block text-[#2F3C7E]">Resume Templates</span>
                </h1>
                <p className="text-xl text-[#6C757D] mb-8 leading-relaxed">
                  Create a professional resume in minutes using recruiter-approved templates and a beginner-friendly builder — completely free to use.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/login" className="bg-[#2F3C7E] text-white px-8 py-4 rounded-lg hover:bg-[#00C9A7] transition-all duration-200 font-semibold flex items-center justify-center group">
                    Get Started
                    <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                  <a href="#templates" className="border-2 border-[#2F3C7E] text-[#2F3C7E] px-8 py-4 rounded-lg hover:bg-[#2F3C7E] hover:text-white transition-all duration-200 font-semibold flex items-center justify-center">
                    <FileText size={20} className="mr-2" />
                    Explore Templates
                  </a>
                </div>
              </div>
              {/* Right Content */}
              <div className="relative transition-all duration-800 delay-200 opacity-100 translate-x-0">
                <div className="relative">
                  <div className="absolute -top-4 -right-4 w-72 h-96 bg-gradient-to-br from-[#00C9A7]/20 to-[#2F3C7E]/20 rounded-2xl transform rotate-3"></div>
                  <div className="relative bg-white p-8 rounded-2xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-[#2F3C7E] rounded-full"></div>
                        <div>
                          <div className="h-4 bg-[#212529] rounded w-32 mb-2"></div>
                          <div className="h-3 bg-[#6C757D] rounded w-24"></div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-3 bg-[#E9ECEF] rounded w-full"></div>
                        <div className="h-3 bg-[#E9ECEF] rounded w-4/5"></div>
                        <div className="h-3 bg-[#E9ECEF] rounded w-3/4"></div>
                      </div>
                      <div className="pt-4">
                        <div className="h-4 bg-[#2F3C7E] rounded w-24 mb-3"></div>
                        <div className="space-y-2">
                          <div className="h-3 bg-[#E9ECEF] rounded w-full"></div>
                          <div className="h-3 bg-[#E9ECEF] rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" ref={featuresRef} className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#212529] mb-4">Why Choose Our Resume Builder?</h2>
              <p className="text-xl text-[#6C757D] max-w-3xl mx-auto">Everything you need to craft, design, and export the perfect resume — no complexity, no charges.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isVisible = visibleCards.includes(index);
                return (
                  <div
                    key={index}
                    data-index={index}
                    className={`feature-card bg-[#F8F9FA] p-8 rounded-2xl hover:shadow-lg transition-all duration-500 hover:-translate-y-2 relative ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {feature.badge && (
                      <div className="absolute -top-3 -right-3">
                        <span className="bg-[#00C9A7] text-white px-3 py-1 rounded-full text-xs font-medium">
                          {feature.badge}
                        </span>
                      </div>
                    )}
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${feature.color}15` }}>
                      <Icon size={32} style={{ color: feature.color }} />
                    </div>
                    <h3 className="text-xl font-semibold text-[#212529] mb-4">
                      ✅ {feature.title}
                    </h3>
                    <p className="text-[#6C757D] leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Templates */}
        <Templates />

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#2F3C7E] to-[#00C9A7] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center transition-all duration-800">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-8">
                <Heart size={16} className="mr-2" />
                🚀 Start Building Today – It's 100% Free!
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Don't let a boring resume hold you back.
              </h2>

              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
                Our builder is completely free — no sign-up or payment required to get started.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link
                  to="/login"
                  className="bg-white text-[#2F3C7E] px-8 py-4 rounded-lg hover:bg-[#F8F9FA] transition-all duration-200 font-semibold flex items-center group"
                >
                  Build My Resume
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/80">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#00C9A7] rounded-full mr-2"></div>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#00C9A7] rounded-full mr-2"></div>
                  <span>Free templates included</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#00C9A7] rounded-full mr-2"></div>
                  <span>Export to PDF instantly</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;