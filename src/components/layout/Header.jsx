import React, { useState } from 'react';

export default function Header({ 
  user, 
  sidebarOpen, 
  onToggleSidebar, 
  onSearchSelect, 
  onLogout, 
  onNavigate,
  onOpenLoginModal
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: "Exam Assigned", message: "DP-900: Azure Data Fundamentals Practice Test 1 is ready.", time: "10m ago", read: false },
    { id: 2, title: "Registration Warning", message: "SAT 2026-27 registration closes in 33 days.", time: "2h ago", read: false },
    { id: 3, title: "Certificate Generated", message: "Certificate for International Cricket Legends is available.", time: "1d ago", read: true },
  ];

  const searchResults = [
    { type: 'Exam', title: 'DP-900: Azure Data Fundamentals', page: 'exams', sub: 'upcoming' },
    { type: 'Exam', title: 'SAT 2026-27', page: 'exampath-directory', sub: 'all' },
    { type: 'Exam', title: 'JEE Main 2027', page: 'exampath-directory', sub: 'all' },
    { type: 'Resource', title: 'TCS MCQ Questions PDF', page: 'study-resources', sub: 'interview-mcq' },
    { type: 'Course', title: 'System Architecture & Scalable Cloud', page: 'teacher-courses', sub: null },
    { type: 'Directory', title: 'Career Compass Diagnostic', page: 'career-compass', sub: null },
  ].filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-xl z-40 flex items-center justify-between px-4 sm:px-8 border-b border-slate-200/60 shadow-sm">
      
      {/* LEFT: Logo & Hamburger Toggle */}
      <div className="flex items-center gap-4 shrink-0">
        <button
          onClick={onToggleSidebar}
          className="w-10 h-10 rounded-2xl bg-white hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-all border border-slate-200 shadow-sm cursor-pointer hover:border-[#0a4b56]/40"
          title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          aria-label="Toggle navigation sidebar"
        >
          <span className="material-symbols-outlined text-[22px]">menu</span>
        </button>

        {/* Brand Logo - Preserved Logo Image */}
        <div 
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-sm border border-slate-200 flex items-center justify-center bg-black shrink-0 group-hover:scale-105 transition-transform">
            <img src="/bodhika-logo.png" alt="Bodhika Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-tight text-slate-900 leading-tight group-hover:text-[#0a4b56] transition-colors">Bodhika</span>
            <span className="text-[9px] font-black text-[#109c90] uppercase tracking-wider hidden sm:block">ASSESSMENT SUITE</span>
          </div>
        </div>
      </div>

      {/* CENTER: Search Bar */}
      <div className="relative hidden md:block flex-1 max-w-md mx-6">
        <div className="h-11 w-full bg-slate-50/80 rounded-full flex items-center px-4 gap-2.5 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0a4b56] shadow-soft-card border border-slate-200/80">
          <span className="material-symbols-outlined text-slate-400 text-[20px]">search</span>
          <input
            type="text"
            placeholder="Search for tests, courses, or topics..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            className="bg-transparent border-none outline-none text-xs sm:text-sm w-full text-slate-800 placeholder:text-slate-400 font-semibold"
          />
          {searchQuery && (
            <button 
              onClick={() => { setSearchQuery(''); setIsSearchOpen(false); }}
              className="text-slate-400 hover:text-slate-700"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        {/* Instant Search Dropdown */}
        {isSearchOpen && searchQuery.trim().length > 0 && (
          <div className="absolute top-14 left-0 w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-float border border-slate-100 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-5 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400">Quick Suggestions</div>
            {searchResults.length > 0 ? (
              searchResults.map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    onNavigate(item.page, item.sub);
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="w-full px-5 py-2.5 flex items-center justify-between hover:bg-teal-50/50 transition-colors text-left"
                >
                  <span className="text-xs font-bold text-slate-800">{item.title}</span>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-teal-100/80 text-[#0a4b56]">
                    {item.type}
                  </span>
                </button>
              ))
            ) : (
              <div className="px-5 py-3 text-xs text-slate-400 text-center font-medium">No matching items found</div>
            )}
          </div>
        )}
      </div>

      {/* RIGHT: Mail, Bell, and User Profile Badge */}
      <div className="flex items-center gap-3 sm:gap-4">
        
        {/* Mail Icon Button */}
        <button
          onClick={() => onNavigate('study-resources', 'all')}
          className="w-10 h-10 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-all border border-slate-200/80 shadow-soft-card hover:border-teal-300"
          title="Study Resources"
        >
          <span className="material-symbols-outlined text-[20px]">mail</span>
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-all border border-slate-200/80 shadow-soft-card relative hover:border-teal-300"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#ff6551] ring-2 ring-white animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-xl rounded-3xl shadow-float border border-slate-100 py-3 z-50 animate-in fade-in duration-150">
              <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                <span className="font-extrabold text-xs text-slate-900">Notifications</span>
                <span className="text-[11px] text-[#109c90] font-bold cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className="p-3.5 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold text-slate-800">{n.title}</span>
                      <span className="text-[10px] text-slate-400 font-semibold">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium line-clamp-2">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Text-Based User Identity Badge */}
        <div 
          onClick={() => onNavigate('settings', 'profile')}
          className="flex flex-col text-right px-4 py-1.5 rounded-full bg-gradient-to-r from-teal-50 to-slate-50 border border-teal-100 shadow-soft-card hover:shadow-hover-card transition-all cursor-pointer"
        >
          <div className="font-extrabold text-xs text-slate-900 leading-tight">Kethavath</div>
          <div className="text-[10px] text-[#0a4b56] font-bold tracking-tight">Student Candidate</div>
        </div>

        {/* Logout Option Button */}
        <button
          onClick={onLogout || onOpenLoginModal}
          className="w-10 h-10 rounded-full bg-slate-900 text-white hover:bg-rose-600 transition-all flex items-center justify-center shadow-md cursor-pointer group"
          title="Logout"
          aria-label="Logout"
        >
          <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">logout</span>
        </button>

      </div>
    </header>
  );
}

