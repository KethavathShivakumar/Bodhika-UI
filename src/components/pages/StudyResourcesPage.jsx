import React, { useState, useEffect } from 'react';

export default function StudyResourcesPage({ resources, onOpenResource, initialCategory = 'all', onToast }) {
  const [activeTab, setActiveTab] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');

  useEffect(() => {
    if (initialCategory) {
      setActiveTab(initialCategory);
    }
  }, [initialCategory]);

  const categories = [
    { id: 'all', label: 'All References', icon: 'auto_stories', color: 'bg-gradient-to-r from-[#0a4b56] to-[#109c90] text-white shadow-md' },
    { id: 'books', label: 'Textbooks & PDFs', icon: 'menu_book', color: 'bg-gradient-to-r from-[#ff6551] to-[#e04e3b] text-white shadow-md' },
    { id: 'videos', label: 'Video Lectures', icon: 'smart_display', color: 'bg-gradient-to-r from-[#f4ad42] to-[#d9911e] text-slate-900 shadow-md' },
    { id: 'interview-mcq', label: 'Interview Q - MCQ', icon: 'quiz', color: 'bg-gradient-to-r from-[#00c853] to-[#009624] text-white shadow-md' },
    { id: 'interview-tech', label: 'Technical Prep', icon: 'terminal', color: 'bg-gradient-to-r from-[#1d273e] to-[#2d3748] text-white shadow-md' }
  ];

  const filteredResources = resources.filter(res => {
    if (searchQuery && !res.title.toLowerCase().includes(searchQuery.toLowerCase()) && !res.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedSubject !== 'All' && res.category !== selectedSubject) return false;
    if (activeTab === 'books' && res.type !== 'Books') return false;
    if (activeTab === 'videos' && res.type !== 'Videos') return false;
    if (activeTab === 'interview-mcq' && res.type !== 'Interview Q - MCQ') return false;
    if (activeTab === 'interview-tech' && res.type !== 'Interview Q - Technical') return false;
    return true;
  });

  const cardColorPalettes = [
    {
      bg: "bg-gradient-to-br from-[#0a4b56] via-[#0f766e] to-[#14b8a6] text-white border-teal-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      iconBg: "bg-white/20 text-white backdrop-blur-md",
      metaBg: "bg-black/20 backdrop-blur-md text-teal-100 border border-white/10",
      subText: "text-teal-100/90 font-medium",
      btn: "bg-white text-[#0a4b56] hover:bg-teal-50 font-black shadow-md"
    },
    {
      bg: "bg-gradient-to-br from-[#1e1b4b] via-[#3730a3] to-[#4338ca] text-white border-indigo-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      iconBg: "bg-white/20 text-white backdrop-blur-md",
      metaBg: "bg-black/20 backdrop-blur-md text-indigo-100 border border-white/10",
      subText: "text-indigo-100/90 font-medium",
      btn: "bg-white text-[#1e1b4b] hover:bg-indigo-50 font-black shadow-md"
    },
    {
      bg: "bg-gradient-to-br from-[#7c2d12] via-[#c2410c] to-[#ea580c] text-white border-orange-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      iconBg: "bg-white/20 text-white backdrop-blur-md",
      metaBg: "bg-black/20 backdrop-blur-md text-orange-100 border border-white/10",
      subText: "text-orange-100/90 font-medium",
      btn: "bg-white text-[#7c2d12] hover:bg-orange-50 font-black shadow-md"
    },
    {
      bg: "bg-gradient-to-br from-[#4c1d95] via-[#6d28d9] to-[#8b5cf6] text-white border-purple-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      iconBg: "bg-white/20 text-white backdrop-blur-md",
      metaBg: "bg-black/20 backdrop-blur-md text-purple-100 border border-white/10",
      subText: "text-purple-100/90 font-medium",
      btn: "bg-white text-[#4c1d95] hover:bg-purple-50 font-black shadow-md"
    },
    {
      bg: "bg-gradient-to-br from-[#064e3b] via-[#047857] to-[#10b981] text-white border-emerald-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      iconBg: "bg-white/20 text-white backdrop-blur-md",
      metaBg: "bg-black/20 backdrop-blur-md text-emerald-100 border border-white/10",
      subText: "text-emerald-100/90 font-medium",
      btn: "bg-white text-[#064e3b] hover:bg-emerald-50 font-black shadow-md"
    }
  ];

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-8 pb-20 animate-fade-in">
      
      {/* PAGE HERO HEADER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0a4b56] via-[#109c90] to-[#1d273e] p-8 text-white shadow-2xl border border-white/10">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-amber-300 text-xs font-bold border border-white/20">
              <span className="material-symbols-outlined text-[16px]">folder_open</span>
              <span>Curated Knowledge Hub</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white drop-shadow-sm">
              Study Resources & Reference Vault
            </h1>
            <p className="text-sm text-teal-100/90 font-medium leading-relaxed">
              Explore faculty-verified textbooks, lecture video streaming archives, and technical interview question banks designed for exam mastery.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
              <div className="text-2xl font-black text-amber-300">{resources.length}</div>
              <div className="text-[11px] font-bold text-white/80 uppercase tracking-wider">Total Items</div>
            </div>
          </div>
        </div>
      </div>

      {/* 1. METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0a4b56] to-[#109c90] text-white shadow-soft-card flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-teal-300/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal-100">Total Archives</span>
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
              <span className="material-symbols-outlined text-[20px]">auto_stories</span>
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-black tracking-tight">{resources.length} Archives</div>
            <div className="text-xs text-teal-100/90 font-medium">Verified materials</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-between text-xs font-bold border border-white/10">
            <span>Verified Knowledge</span>
            <span className="px-2 py-0.5 rounded-full bg-white/30 text-[10px] font-extrabold">100%</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#ff6551] to-[#e04e3b] text-white shadow-soft-card flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-rose-300/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-rose-100">Textbooks & PDFs</span>
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
              <span className="material-symbols-outlined text-[20px]">menu_book</span>
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-black tracking-tight">
              {resources.filter(r => r.type === 'Books').length} Books
            </div>
            <div className="text-xs text-rose-100/90 font-medium">Digital E-Books</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-between text-xs font-bold border border-white/10">
            <span>Instant Download</span>
            <span className="px-2 py-0.5 rounded-full bg-white/30 text-[10px] font-extrabold">PDF</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#f4ad42] to-[#d9911e] text-slate-950 shadow-soft-card flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-amber-300/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900/80">Faculty Lectures</span>
            <div className="w-10 h-10 rounded-2xl bg-black/10 flex items-center justify-center text-slate-950 backdrop-blur-sm">
              <span className="material-symbols-outlined text-[20px]">smart_display</span>
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-black tracking-tight">
              {resources.filter(r => r.type === 'Videos').length} Lectures
            </div>
            <div className="text-xs text-slate-900/80 font-medium">Video Sessions</div>
          </div>
          <div className="p-3 rounded-2xl bg-black/10 backdrop-blur-md flex items-center justify-between text-xs font-bold border border-black/10">
            <span>HD Video Stream</span>
            <span className="px-2 py-0.5 rounded-full bg-black/20 text-[10px] font-extrabold text-slate-950">1080p</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1d273e] to-[#2d3748] text-white shadow-soft-card flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-600/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300">Recruitment Qs</span>
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white backdrop-blur-sm">
              <span className="material-symbols-outlined text-[20px]">terminal</span>
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-black tracking-tight">Tech & MCQs</div>
            <div className="text-xs text-slate-300 font-medium">TCS, Infosys & Wipro</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-between text-xs font-bold border border-white/10">
            <span>Interview Bank</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 text-[10px] font-extrabold">Solutions</span>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY TABS & SEARCH BAR */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0a4b56] to-[#109c90] text-white rounded-3xl p-5 shadow-soft-card border border-white/10 space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-[#0a4b56] shadow-md scale-[1.02]'
                  : 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-4 text-white/70 text-[20px]">search</span>
          <input
            type="text"
            placeholder="Search study resources by title, topic, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl text-xs font-semibold text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
          />
        </div>
      </div>

      {/* 3. RESOURCE ITEMS FULLY-COLORED CARDS GRID */}
      {filteredResources.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center shadow-soft-card border border-slate-100">
          <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">folder_off</span>
          <h3 className="text-base font-bold text-slate-800">No resources matched your search</h3>
          <p className="text-xs text-slate-500 mt-1">Try tweaking your search term or switching tabs.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res, idx) => {
            const theme = cardColorPalettes[idx % cardColorPalettes.length];

            return (
              <div 
                key={res.id}
                className={`${theme.bg} rounded-3xl p-6 shadow-soft-card hover:shadow-hover-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden border`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${theme.iconBg} flex items-center justify-center font-bold shadow-sm border border-white/20`}>
                      <span className="material-symbols-outlined text-[24px]">
                        {res.type === 'Books' ? 'menu_book' : res.type === 'Videos' ? 'smart_display' : 'quiz'}
                      </span>
                    </div>

                    <span className={`text-[10px] font-black px-3 py-1 rounded-full ${theme.badge}`}>
                      {res.type}
                    </span>
                  </div>

                  <h3 className="font-black text-lg text-white leading-snug mb-2 drop-shadow-sm">
                    {res.title}
                  </h3>
                  <p className={`${theme.subText} text-xs font-medium line-clamp-3 mb-5 leading-relaxed`}>
                    {res.description}
                  </p>

                  <div className={`${theme.metaBg} rounded-2xl p-3.5 flex items-center justify-between text-xs font-bold mb-5`}>
                    <span>Topic: <strong className="text-white font-black">{res.category}</strong></span>
                    <span className="text-white/40">•</span>
                    <span>By: <strong className="text-white font-black">{res.author || 'Faculty Team'}</strong></span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenResource(res)}
                  className={`w-full h-11 rounded-2xl ${theme.btn} active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer`}
                >
                  <span>{res.type === 'Videos' ? 'Watch Video Lecture' : 'Access Reference Resource'}</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
