import React, { useState } from 'react';

export default function TeacherCoursesPage({ courses, onToast }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [courseList, setCourseList] = useState(courses);

  const filteredCourses = courseList.filter(c => {
    if (searchQuery && !c.title.toLowerCase().includes(searchQuery.toLowerCase()) && !c.instructor.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filterType === 'Free' && !c.isFree) return false;
    if (filterType === 'Paid' && c.isFree) return false;
    return true;
  });

  const handleEnrollCourse = (id) => {
    setCourseList(prev => prev.map(c => c.id === id ? { ...c, enrolled: true } : c));
    if (onToast) {
      onToast({ title: 'Course Enrolled', message: 'You have been successfully registered in the masterclass portal.', type: 'success' });
    }
  };

  const cardColorPalettes = [
    {
      bg: "bg-gradient-to-br from-[#0a4b56] via-[#0f766e] to-[#14b8a6] text-white border-teal-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      metaBg: "bg-black/20 backdrop-blur-md text-teal-100 border border-white/10",
      subText: "text-teal-100/90 font-medium",
      btn: "bg-white text-[#0a4b56] hover:bg-teal-50 font-black shadow-md"
    },
    {
      bg: "bg-gradient-to-br from-[#1e1b4b] via-[#3730a3] to-[#4338ca] text-white border-indigo-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      metaBg: "bg-black/20 backdrop-blur-md text-indigo-100 border border-white/10",
      subText: "text-indigo-100/90 font-medium",
      btn: "bg-white text-[#1e1b4b] hover:bg-indigo-50 font-black shadow-md"
    },
    {
      bg: "bg-gradient-to-br from-[#7c2d12] via-[#c2410c] to-[#ea580c] text-white border-orange-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      metaBg: "bg-black/20 backdrop-blur-md text-orange-100 border border-white/10",
      subText: "text-orange-100/90 font-medium",
      btn: "bg-white text-[#7c2d12] hover:bg-orange-50 font-black shadow-md"
    },
    {
      bg: "bg-gradient-to-br from-[#4c1d95] via-[#6d28d9] to-[#8b5cf6] text-white border-purple-300/30",
      badge: "bg-white/20 backdrop-blur-md text-white border border-white/30 font-black",
      metaBg: "bg-black/20 backdrop-blur-md text-purple-100 border border-white/10",
      subText: "text-purple-100/90 font-medium",
      btn: "bg-white text-[#4c1d95] hover:bg-purple-50 font-black shadow-md"
    }
  ];

  const totalCount = courses.length;
  const freeCount = courses.filter(c => c.isFree).length;
  const enrolledCount = courseList.filter(c => c.enrolled).length;

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto space-y-8 pb-16 animate-in fade-in duration-300">
      
      {/* 1. TOP METRIC SUMMARY CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
        <div className="bg-gradient-to-br from-[#0a4b56] to-[#109c90] text-white rounded-3xl p-4 sm:p-6 shadow-soft-card flex items-center justify-between border border-teal-300/20">
          <div>
            <div className="text-[9px] sm:text-[11px] font-black uppercase tracking-wider text-teal-200">Total Masterclasses</div>
            <div className="text-xl sm:text-3xl font-black tracking-tight mt-0.5 sm:mt-1">{totalCount} Courses</div>
            <div className="text-[9px] sm:text-[11px] text-teal-100 font-semibold mt-1 sm:mt-2 flex items-center gap-1">
              <span className="truncate">Faculty Led</span>
              <span className="material-symbols-outlined text-[12px] sm:text-[14px]">arrow_forward</span>
            </div>
          </div>
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
            <span className="material-symbols-outlined text-[18px] sm:text-[24px]">school</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#f4ad42] to-[#d9911e] text-slate-900 rounded-3xl p-4 sm:p-6 shadow-soft-card flex items-center justify-between border border-amber-300/30">
          <div>
            <div className="text-[9px] sm:text-[11px] font-black uppercase tracking-wider text-slate-900/80">Free Lectures</div>
            <div className="text-xl sm:text-3xl font-black tracking-tight mt-0.5 sm:mt-1">{freeCount} Available</div>
            <div className="text-[9px] sm:text-[11px] text-slate-900 font-semibold mt-1 sm:mt-2 flex items-center gap-1">
              <span className="truncate">Zero Cost</span>
              <span className="material-symbols-outlined text-[12px] sm:text-[14px]">auto_awesome</span>
            </div>
          </div>
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-black/10 backdrop-blur-md flex items-center justify-center text-slate-900 shrink-0">
            <span className="material-symbols-outlined text-[18px] sm:text-[24px]">workspace_premium</span>
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-gradient-to-br from-[#1d273e] to-[#2d3748] text-white rounded-3xl p-4 sm:p-6 shadow-soft-card flex items-center justify-between border border-slate-600/30">
          <div>
            <div className="text-[9px] sm:text-[11px] font-black uppercase tracking-wider text-slate-300">My Registrations</div>
            <div className="text-xl sm:text-3xl font-black tracking-tight mt-0.5 sm:mt-1">{enrolledCount} Active</div>
            <div className="text-[9px] sm:text-[11px] text-slate-300 font-semibold mt-1 sm:mt-2 flex items-center gap-1">
              <span className="truncate">Enrolled Portal</span>
              <span className="material-symbols-outlined text-[12px] sm:text-[14px]">check_circle</span>
            </div>
          </div>
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white shrink-0">
            <span className="material-symbols-outlined text-[18px] sm:text-[24px]">verified</span>
          </div>
        </div>
      </div>

      {/* 2. HEADER & SEARCH TOOLBAR */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0a4b56] to-[#109c90] text-white rounded-3xl p-6 shadow-soft-card border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black text-white mb-1 border border-white/30">
            <span className="material-symbols-outlined text-[16px]">video_library</span>
            Faculty Masterclasses
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Teacher Online Courses</h1>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="w-full sm:w-72 bg-white/15 backdrop-blur-md rounded-2xl flex items-center px-4 h-11 gap-2 border border-white/20">
            <span className="material-symbols-outlined text-white/70 text-[18px]">search</span>
            <input
              type="text"
              placeholder="Search teacher or course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs w-full text-white placeholder:text-white/60 font-semibold"
            />
          </div>

          <div className="flex items-center gap-1 bg-white/15 p-1 rounded-2xl border border-white/20 backdrop-blur-md">
            {['All', 'Free', 'Paid'].map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  filterType === type
                    ? 'bg-white text-[#0a4b56] shadow-sm'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. COURSES FULLY-COLORED CARDS GRID */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {filteredCourses.map((course, idx) => {
            const theme = cardColorPalettes[idx % cardColorPalettes.length];

            return (
              <div
                key={course.id}
                className={`${theme.bg} rounded-3xl p-3.5 sm:p-6 shadow-soft-card hover:shadow-hover-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden border`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] truncate max-w-[90px] sm:max-w-none ${theme.badge}`}>
                      {course.category || 'Academic'}
                    </span>
                    <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[11px] shrink-0 ${theme.badge}`}>
                      {course.isFree ? 'FREE' : `₹${course.price}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2 mb-2 text-white/90 text-[10px] sm:text-xs font-extrabold">
                    <span className="material-symbols-outlined text-[14px] sm:text-[16px]">schedule</span>
                    <span>{course.duration}</span>
                  </div>

                  <h3 className="font-black text-xs sm:text-lg text-white leading-snug mb-2 drop-shadow-sm line-clamp-2">
                    {course.title}
                  </h3>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[10px] sm:text-xs text-white/90 mb-3 sm:mb-4 font-bold gap-0.5 sm:gap-0">
                    <div className="flex items-center gap-1 text-amber-300 font-black">
                      <span>★ {course.rating}</span>
                      <span className="text-white/70 font-semibold hidden sm:inline">({course.enrolledCount || 420})</span>
                    </div>
                    <span className="truncate max-w-full text-white/80">{course.institution}</span>
                  </div>

                  <div className={`${theme.metaBg} rounded-2xl p-2.5 sm:p-3.5 flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5`}>
                    <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/20 text-white flex items-center justify-center text-xs sm:text-sm font-black shrink-0 shadow-sm border border-white/20">
                      {course.instructor ? course.instructor[0] : 'T'}
                    </div>
                    <div className="truncate">
                      <div className="text-[10px] sm:text-xs font-black text-white truncate">{course.instructor}</div>
                      <div className="text-[8px] sm:text-[10px] font-bold text-white/70 truncate">Faculty Educator</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  {course.enrolled ? (
                    <button
                      disabled
                      className="w-full h-8 sm:h-11 rounded-xl sm:rounded-2xl bg-emerald-400 text-slate-900 text-[10px] sm:text-xs font-black flex items-center justify-center gap-1 sm:gap-2 cursor-default shadow-md"
                    >
                      <span className="material-symbols-outlined text-[15px] sm:text-[18px]">check_circle</span>
                      <span>Enrolled</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEnrollCourse(course.id)}
                      className={`w-full h-8 sm:h-11 rounded-xl sm:rounded-2xl ${theme.btn} text-[10px] sm:text-xs active:scale-95 transition-all shadow-md flex items-center justify-center gap-1 sm:gap-2 cursor-pointer`}
                    >
                      <span>Enroll in Course</span>
                      <span className="material-symbols-outlined text-[14px] sm:text-[16px]">arrow_forward</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center shadow-soft-card border border-slate-100">
          <p className="text-slate-500 font-bold">No masterclass courses found matching your query.</p>
        </div>
      )}

    </div>
  );
}
