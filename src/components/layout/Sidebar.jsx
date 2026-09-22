import React, { useState } from 'react';

export default function Sidebar({ 
  isOpen = true, 
  onClose, 
  onNavigate, 
  activePage, 
  setActivePage, 
  subPage, 
  setSubPage 
}) {
  const [academicExpanded, setAcademicExpanded] = useState({
    myExams: true,
    studyResources: true,
    examPath: true,
  });

  const toggleSubmenu = (menu) => {
    setAcademicExpanded(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleNavClick = (page, sub = null) => {
    if (onNavigate) {
      onNavigate(page, sub);
    } else {
      if (setActivePage) setActivePage(page);
      if (setSubPage) setSubPage(sub);
    }
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      if (onClose) onClose();
    }
  };

  const navItemClass = (pageKey, subKey = null) => {
    const isCurrent = subKey 
      ? activePage === pageKey && subPage === subKey
      : activePage === pageKey && (!subKey || subPage === null);

    if (isCurrent) {
      return "flex items-center px-4 py-2.5 rounded-full bg-gradient-to-r from-[#0a4b56] to-[#109c90] text-white font-extrabold shadow-md transition-all scale-[1.01]";
    }
    return "flex items-center px-4 py-2.5 rounded-full text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 transition-all font-semibold group text-xs sm:text-sm";
  };

  const subNavItemClass = (pageKey, subKey) => {
    const isCurrent = activePage === pageKey && subPage === subKey;
    if (isCurrent) {
      return "flex items-center pl-7 pr-3.5 py-2 rounded-xl text-xs bg-teal-50 text-[#0a4b56] font-extrabold border-l-2 border-[#0a4b56]";
    }
    return "flex items-center pl-7 pr-3.5 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-900 hover:bg-slate-100/70 font-semibold transition-all";
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/30 z-40 lg:hidden transition-opacity duration-300 ease-in-out"
          aria-label="Close sidebar overlay"
        />
      )}

      {/* Sidebar Drawer */}
      <aside 
        className={`fixed left-0 top-20 bottom-0 w-[270px] max-w-[85vw] bg-white z-50 lg:z-30 flex flex-col border-r border-slate-200/70 shadow-2xl lg:shadow-sidebar overflow-y-auto transition-transform duration-300 ease-in-out select-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile-only close bar */}
        <div className="flex lg:hidden items-center justify-end p-3 border-b border-slate-100 shrink-0">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors"
            aria-label="Close sidebar"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          
          {/* GROUP 1: EXAMINATION */}
          <div className="pt-2 pb-2 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0a4b56]"></span>
            <span>EXAMINATION</span>
          </div>

          <button
            onClick={() => handleNavClick('dashboard')}
            className={`w-full text-left ${navItemClass('dashboard')}`}
          >
            <span className="material-symbols-outlined mr-3 text-[20px]">grid_view</span>
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => handleNavClick('exams', 'upcoming')}
            className={`w-full text-left ${navItemClass('exams', 'upcoming')}`}
          >
            <span className="material-symbols-outlined mr-3 text-[20px]">assignment</span>
            <span>Upcoming Exams</span>
          </button>

          <button
            onClick={() => handleNavClick('completed-exams')}
            className={`w-full text-left ${navItemClass('completed-exams')}`}
          >
            <span className="material-symbols-outlined mr-3 text-[20px]">task_alt</span>
            <span>Completed Exams</span>
          </button>

          <button
            onClick={() => handleNavClick('browse-enroll')}
            className={`w-full text-left ${navItemClass('browse-enroll')}`}
          >
            <span className="material-symbols-outlined mr-3 text-[20px]">shopping_cart</span>
            <span>Browse & Enroll</span>
          </button>

          <button
            onClick={() => handleNavClick('history', 'chart')}
            className={`w-full text-left ${navItemClass('history')}`}
          >
            <span className="material-symbols-outlined mr-3 text-[20px]">history_edu</span>
            <span>Recent Results</span>
          </button>

          <button
            onClick={() => handleNavClick('performance')}
            className={`w-full text-left ${navItemClass('performance')}`}
          >
            <span className="material-symbols-outlined mr-3 text-[20px]">monitoring</span>
            <span>My Performance</span>
          </button>

          <button
            onClick={() => handleNavClick('certificates')}
            className={`w-full text-left ${navItemClass('certificates')}`}
          >
            <span className="material-symbols-outlined mr-3 text-[20px]">workspace_premium</span>
            <span>Certificates</span>
          </button>


          {/* GROUP 2: ACADEMIC */}
          <div className="pt-6 pb-2 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f4ad42]"></span>
            <span>ACADEMIC</span>
          </div>

          {/* My Exams Dropdown */}
          <div>
            <button
              onClick={() => toggleSubmenu('myExams')}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-full text-slate-600 hover:bg-slate-100/80 transition-all text-left text-xs sm:text-sm font-semibold"
            >
              <div className="flex items-center">
                <span className="material-symbols-outlined mr-3 text-[20px]">clinical_notes</span>
                <span>My Exams</span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-slate-400 transition-transform duration-200" style={{ transform: academicExpanded.myExams ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                expand_more
              </span>
            </button>
            {academicExpanded.myExams && (
              <div className="space-y-1 mt-1 pl-2 ml-4 border-l border-slate-200/80">
                <button onClick={() => handleNavClick('exams', 'upcoming')} className={`w-full text-left ${subNavItemClass('exams', 'upcoming')}`}>
                  Available
                </button>
                <button onClick={() => handleNavClick('scheduled-exams')} className={`w-full text-left ${subNavItemClass('scheduled-exams', null)}`}>
                  Scheduled
                </button>
                <button onClick={() => handleNavClick('take-exam')} className={`w-full text-left ${subNavItemClass('take-exam', null)}`}>
                  Take Exam
                </button>
                <button onClick={() => handleNavClick('teacher-courses')} className={`w-full text-left ${subNavItemClass('teacher-courses', null)}`}>
                  Teacher Courses
                </button>
              </div>
            )}
          </div>

          {/* Study Resources Dropdown */}
          <div>
            <button
              onClick={() => toggleSubmenu('studyResources')}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-full text-slate-600 hover:bg-slate-100/80 transition-all text-left text-xs sm:text-sm font-semibold"
            >
              <div className="flex items-center">
                <span className="material-symbols-outlined mr-3 text-[20px]">library_books</span>
                <span>Study Resources</span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-slate-400 transition-transform duration-200" style={{ transform: academicExpanded.studyResources ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                expand_more
              </span>
            </button>
            {academicExpanded.studyResources && (
              <div className="space-y-1 mt-1 pl-2 ml-4 border-l border-slate-200/80">
                <button onClick={() => handleNavClick('study-resources', 'all')} className={`w-full text-left ${subNavItemClass('study-resources', 'all')}`}>
                  All References
                </button>
                <button onClick={() => handleNavClick('study-resources', 'books')} className={`w-full text-left ${subNavItemClass('study-resources', 'books')}`}>
                  Books
                </button>
                <button onClick={() => handleNavClick('study-resources', 'videos')} className={`w-full text-left ${subNavItemClass('study-resources', 'videos')}`}>
                  Videos
                </button>
                <button onClick={() => handleNavClick('study-resources', 'interview-mcq')} className={`w-full text-left ${subNavItemClass('study-resources', 'interview-mcq')}`}>
                  Interview Q - MCQ
                </button>
                <button onClick={() => handleNavClick('study-resources', 'interview-tech')} className={`w-full text-left ${subNavItemClass('study-resources', 'interview-tech')}`}>
                  Interview Q - Technical
                </button>
              </div>
            )}
          </div>

          {/* ExamPath Directory Dropdown */}
          <div>
            <button
              onClick={() => toggleSubmenu('examPath')}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-full text-slate-600 hover:bg-slate-100/80 transition-all text-left text-xs sm:text-sm font-semibold"
            >
              <div className="flex items-center">
                <span className="material-symbols-outlined mr-3 text-[20px]">explore</span>
                <span>ExamPath Directory</span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-slate-400 transition-transform duration-200" style={{ transform: academicExpanded.examPath ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                expand_more
              </span>
            </button>
            {academicExpanded.examPath && (
              <div className="space-y-1 mt-1 pl-2 ml-4 border-l border-slate-200/80">
                <button onClick={() => handleNavClick('exampath-directory')} className={`w-full text-left ${subNavItemClass('exampath-directory', null)}`}>
                  All Exams & Colleges
                </button>
                <button onClick={() => handleNavClick('timeline-deadlines')} className={`w-full text-left ${subNavItemClass('timeline-deadlines', null)}`}>
                  Timeline & Deadlines
                </button>
                <button onClick={() => handleNavClick('career-compass')} className={`w-full text-left ${subNavItemClass('career-compass', null)}`}>
                  Career Compass
                </button>
                <button onClick={() => handleNavClick('exam-tracker')} className={`w-full text-left ${subNavItemClass('exam-tracker', null)}`}>
                  My Exam Tracker
                </button>
              </div>
            )}
          </div>


          {/* GROUP 3: PREFERENCES */}
          <div className="pt-6 pb-2 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1d273e]"></span>
            <span>PREFERENCES</span>
          </div>

          <button
            onClick={() => handleNavClick('settings', 'profile')}
            className={`w-full text-left ${navItemClass('settings', 'profile')}`}
          >
            <span className="material-symbols-outlined mr-3 text-[20px]">settings</span>
            <span>Account Settings</span>
          </button>

          <button
            onClick={() => handleNavClick('settings', 'password')}
            className={`w-full text-left ${navItemClass('settings', 'password')}`}
          >
            <span className="material-symbols-outlined mr-3 text-[20px]">lock_reset</span>
            <span>Change Password</span>
          </button>

        </nav>

        {/* Footer */}
        <div className="p-4 mt-auto border-t border-slate-100 text-[11px] text-slate-400 font-semibold text-center bg-slate-50/50">
          © 2026 Riyatrix Systems Private Limited
        </div>
      </aside>
    </>
  );
}

