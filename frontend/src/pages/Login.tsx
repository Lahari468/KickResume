import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Eye, EyeOff, FileText, User, Briefcase, GraduationCap, Award, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { login, isLoading } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    try {
      const success = await login(email, password);
      if (success) {
        showToast('Login successful! Welcome back.', 'success');
        // Redirect after a short delay to show the success message
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        showToast('Invalid email or password. Please try again.', 'error');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showToast('An error occurred. Please try again.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2F3C7E] via-[#2F3C7E] to-[#1a2456] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Resume Builder Themed Background Animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Resume Cards */}
        <div className="absolute top-20 left-16 w-32 h-40 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 animate-float shadow-lg">
          <div className="p-3 space-y-2">
            <div className="w-8 h-8 bg-[#00C9A7]/30 rounded-full"></div>
            <div className="space-y-1">
              <div className="w-16 h-1 bg-white/20 rounded"></div>
              <div className="w-12 h-1 bg-white/15 rounded"></div>
            </div>
            <div className="space-y-1">
              <div className="w-20 h-1 bg-[#00C9A7]/20 rounded"></div>
              <div className="w-14 h-1 bg-white/10 rounded"></div>
            </div>
          </div>
        </div>

        <div className="absolute top-40 right-20 w-28 h-36 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 animate-float-delayed shadow-lg">
          <div className="p-3 space-y-2">
            <div className="w-6 h-6 bg-[#FF6B6B]/30 rounded-full"></div>
            <div className="space-y-1">
              <div className="w-14 h-1 bg-white/20 rounded"></div>
              <div className="w-10 h-1 bg-white/15 rounded"></div>
            </div>
            <div className="space-y-1">
              <div className="w-16 h-1 bg-[#FF6B6B]/20 rounded"></div>
              <div className="w-12 h-1 bg-white/10 rounded"></div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-32 left-24 w-36 h-44 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 animate-float-slow shadow-lg">
          <div className="p-3 space-y-2">
            <div className="w-10 h-10 bg-[#00C9A7]/30 rounded-full"></div>
            <div className="space-y-1">
              <div className="w-20 h-1 bg-white/20 rounded"></div>
              <div className="w-16 h-1 bg-white/15 rounded"></div>
            </div>
            <div className="space-y-1">
              <div className="w-24 h-1 bg-[#00C9A7]/20 rounded"></div>
              <div className="w-18 h-1 bg-white/10 rounded"></div>
            </div>
          </div>
        </div>

        {/* Floating Resume Icons */}
        <div className="absolute top-1/4 left-1/3 text-[#00C9A7]/20 animate-bounce">
          <FileText size={24} />
        </div>
        <div className="absolute top-1/3 right-1/4 text-white/15 animate-pulse" style={{ animationDelay: '1s' }}>
          <User size={20} />
        </div>
        <div className="absolute bottom-1/3 left-1/4 text-[#00C9A7]/25 animate-bounce" style={{ animationDelay: '2s' }}>
          <Briefcase size={22} />
        </div>
        <div className="absolute bottom-1/4 right-1/3 text-white/20 animate-pulse" style={{ animationDelay: '1.5s' }}>
          <GraduationCap size={26} />
        </div>
        <div className="absolute top-1/2 left-1/6 text-[#FF6B6B]/20 animate-bounce" style={{ animationDelay: '3s' }}>
          <Award size={18} />
        </div>
        <div className="absolute top-2/3 right-1/6 text-[#00C9A7]/15 animate-pulse" style={{ animationDelay: '2.5s' }}>
          <Star size={16} />
        </div>

        {/* Skill Progress Bars */}
        <div className="absolute top-1/2 right-12 space-y-2 animate-fade-in-out">
          <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-3/4 h-full bg-[#00C9A7]/30 rounded-full animate-progress"></div>
          </div>
          <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-2/3 h-full bg-[#FF6B6B]/30 rounded-full animate-progress" style={{ animationDelay: '0.5s' }}></div>
          </div>
          <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-4/5 h-full bg-white/20 rounded-full animate-progress" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Floating Text Elements */}
        <div className="absolute top-16 right-1/3 text-white/10 text-xs font-medium animate-float-text">
          Experience
        </div>
        <div className="absolute bottom-20 left-1/3 text-[#00C9A7]/15 text-xs font-medium animate-float-text" style={{ animationDelay: '2s' }}>
          Skills
        </div>
        <div className="absolute top-3/4 left-12 text-white/10 text-xs font-medium animate-float-text" style={{ animationDelay: '1s' }}>
          Education
        </div>

        {/* Connecting Lines */}
        <div className="absolute top-1/4 left-1/2 w-16 h-px bg-gradient-to-r from-transparent via-[#00C9A7]/20 to-transparent animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-20 h-px bg-gradient-to-l from-transparent via-white/15 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }}></div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-8 gap-12 h-full">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="border-r border-white/5 last:border-r-0"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-sm w-full relative z-10">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/20 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl">
          {/* Header */}
          <div className="text-center mb-6">
            <Link to="/" className="inline-block">
              <div className="w-14 h-14 bg-gradient-to-br from-[#2F3C7E] to-[#00C9A7] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg transform transition-transform duration-300 hover:rotate-6">
                <FileText className="text-white" size={24} />
              </div>
            </Link>
            <h2 className="text-2xl font-bold text-[#212529] mb-1">Welcome Back</h2>
            <p className="text-[#6C757D] text-sm">Continue building your perfect resume</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div className="group">
              <label className="block mb-1.5 text-[#212529] font-semibold text-sm">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Mail className="text-[#6C757D] group-focus-within:text-[#00C9A7] transition-colors duration-200" size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full border-2 border-[#E9ECEF] rounded-xl pl-10 pr-3 py-2.5 text-[#212529] placeholder-[#6C757D] outline-none focus:border-[#00C9A7] focus:ring-4 focus:ring-[#00C9A7]/10 transition-all duration-300 bg-white/90 backdrop-blur-sm hover:border-[#00C9A7]/50 relative z-0"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="group">
              <label className="block mb-1.5 text-[#212529] font-semibold text-sm">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Lock className="text-[#6C757D] group-focus-within:text-[#00C9A7] transition-colors duration-200" size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full border-2 border-[#E9ECEF] rounded-xl pl-10 pr-10 py-2.5 text-[#212529] placeholder-[#6C757D] outline-none focus:border-[#00C9A7] focus:ring-4 focus:ring-[#00C9A7]/10 transition-all duration-300 bg-white/90 backdrop-blur-sm hover:border-[#00C9A7]/50 relative z-0"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6C757D] hover:text-[#00C9A7] transition-colors duration-200 z-10 focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button type="button" className="text-[#00C9A7] hover:text-[#2F3C7E] text-sm font-medium transition-colors duration-200 hover:underline focus:outline-none">
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-full bg-gradient-to-r from-[#2F3C7E] to-[#00C9A7] text-white py-3 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none mt-6"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center">
                  Sign In to KickResume
                  <ArrowRight 
                    className={`ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} 
                    size={18} 
                  />
                </div>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-[#6C757D] text-sm mt-4">
            Don't have an account?{' '}
            <Link to="/register" className=" text-[#00C9A7] hover:text-[#2F3C7E] font-semibold transition-colors duration-200 hover:underline">
              Create Account
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-4">
          <p className="text-white/70 text-xs">
            By signing in, you agree to our{' '}
            <button className="text-[#00C9A7] hover:text-white transition-colors duration-200 hover:underline">
              Terms of Service
            </button>{' '}
            and{' '}
            <button className="text-[#00C9A7] hover:text-white transition-colors duration-200 hover:underline">
              Privacy Policy
            </button>
          </p>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-1deg); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(0.5deg); }
        }

        @keyframes float-text {
          0%, 100% { transform: translateY(0px); opacity: 0.6; }
          50% { transform: translateY(-5px); opacity: 1; }
        }

        @keyframes fade-in-out {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }

        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }

        .animate-float-text {
          animation: float-text 4s ease-in-out infinite;
        }

        .animate-fade-in-out {
          animation: fade-in-out 3s ease-in-out infinite;
        }

        .animate-progress {
          animation: progress 2s ease-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;