import React, { useState } from 'react';
import AnimatedCharacter from '../common/AnimatedCharacter';

export default function LoginPage({ onLoginSuccess }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('student@bodhika.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Focus states for character animations
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setErrorMsg('Please enter your username or email');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);
    setIsSuccess(false);

    // Simulate smooth login request
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess({
            name: username.split('@')[0] ? username.split('@')[0].toUpperCase() : 'MADHU',
            email: username,
            id: 'BDK-2026-88',
            avatar: '/user-avatar.png'
          });
        }
      }, 900);
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full bg-slate-900/95 flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans selection:bg-amber-300 selection:text-slate-900 animate-fade-in">
      {/* Main Container Window */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col lg:flex-row min-h-[640px]">
        
        {/* LEFT COLUMN: Login Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 md:p-14 flex flex-col justify-between">
          <div>
            {/* Top Brand Logo - Centered in Circle */}
            <div className="flex flex-col items-center justify-center mb-6 text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-black p-1.5 border-2 border-[#109c90]/40 shadow-md overflow-hidden flex items-center justify-center hover:scale-105 transition-transform duration-300">
                <img 
                  src="/bodhika-logo.png" 
                  alt="Bodhika Logo" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            {/* Header Text */}
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
                {isRegistering ? 'Create Account' : 'Welcome Back'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto font-medium leading-relaxed">
                {isRegistering 
                  ? 'Join thousands of students and track your academic assessment journey with Bodhika.' 
                  : 'Sign in to access your proctored exams, performance metrics, and study resources.'
                }
              </p>
            </div>

            {/* Error Banner */}
            {errorMsg && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
              {/* Username Input */}
              <div className="space-y-1">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                    person
                  </span>
                  <input
                    type="text"
                    placeholder="Username or Email Address"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => setIsUsernameFocused(true)}
                    onBlur={() => setIsUsernameFocused(false)}
                    className="w-full h-12 pl-12 pr-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-[#0a4b56] focus:ring-2 focus:ring-[#0a4b56]/20 transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                    lock
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                    className="w-full h-12 pl-12 pr-12 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-[#0a4b56] focus:ring-2 focus:ring-[#0a4b56]/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              {!isRegistering && (
                <div className="flex justify-end pt-0.5">
                  <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-xs font-bold text-[#0a4b56] hover:underline transition-colors">
                    Forgot Password?
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || isSuccess}
                className="w-full h-12 mt-2 rounded-2xl bg-gradient-to-r from-[#0a4b56] to-[#109c90] text-white font-extrabold text-xs hover:shadow-lg hover:shadow-[#0a4b56]/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-80"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] text-emerald-300">check_circle</span>
                    <span>Authenticated! Opening Portal...</span>
                  </>
                ) : (
                  <span>{isRegistering ? 'Create Student Account' : 'Sign In to Portal'}</span>
                )}
              </button>
            </form>

            {/* Social Divider */}
            <div className="relative my-6 max-w-md flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <span className="relative px-4 bg-white text-xs font-bold text-slate-400">
                or sign in with
              </span>
            </div>

            {/* Quick Demo Sign In */}
            <div className="flex items-center justify-center gap-3 max-w-md">
              <button 
                onClick={() => handleSubmit({ preventDefault: () => {} })}
                className="flex-1 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 font-extrabold text-xs hover:bg-slate-100 hover:border-slate-300 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px] text-amber-500">key</span>
                <span>Student Demo Access</span>
              </button>
            </div>
          </div>

          {/* Footer Toggle */}
          <div className="mt-8 text-center text-xs text-slate-500 font-medium">
            {isRegistering ? 'Already have an account?' : 'New to Bodhika Portal?'}{' '}
            <button
              onClick={() => {
                setIsRegistering(!isRegistering);
                setErrorMsg('');
              }}
              className="font-extrabold text-[#0a4b56] hover:underline transition-all cursor-pointer"
            >
              {isRegistering ? 'Sign In Now' : 'Create an Account'}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Hero Accent Card with Animated Mascot */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-[#0a4b56] via-[#109c90] to-[#1d273e] p-8 sm:p-12 flex flex-col items-center justify-between relative overflow-hidden rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none text-white">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />

          {/* Mascot Canvas */}
          <div className="w-full flex-1 flex items-center justify-center py-6">
            <AnimatedCharacter
              isUsernameFocused={isUsernameFocused}
              isPasswordFocused={isPasswordFocused}
              showPassword={showPassword}
              isSuccess={isSuccess}
              usernameValue={username}
            />
          </div>

          {/* Motivational Caption */}
          <div className="w-full text-center space-y-3 pt-4 z-10">
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-200" />
              <span className="w-6 h-2 rounded-full bg-amber-300" />
              <span className="w-2 h-2 rounded-full bg-teal-200" />
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight max-w-xs mx-auto leading-snug">
              Proctored AI Examinations & <span className="text-amber-300">Academic Analytics</span>
            </h2>
            <p className="text-xs text-teal-100/90 font-medium max-w-sm mx-auto">
              Empowering students with real-time feedback, detailed performance metrics, and verified certifications.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

