import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import MobileNavBar from './components/layout/MobileNavBar';
import Toast from './components/common/Toast';

// Modals
import EnrollModal from './components/modals/EnrollModal';
import AttemptDetailsModal from './components/modals/AttemptDetailsModal';
import CertificateModal from './components/modals/CertificateModal';
import ResourcePreviewModal from './components/modals/ResourcePreviewModal';

// Pages
import LoginPage from './components/pages/LoginPage';
import ExaminationListPage from './components/pages/ExaminationListPage';
import UpcomingExamsPage from './components/pages/UpcomingExamsPage';
import ExamHistoryPage from './components/pages/ExamHistoryPage';
import BrowseEnrollPage from './components/pages/BrowseEnrollPage';
import MyPerformancePage from './components/pages/MyPerformancePage';
import CertificatesPage from './components/pages/CertificatesPage';
import TeacherCoursesPage from './components/pages/TeacherCoursesPage';
import StudyResourcesPage from './components/pages/StudyResourcesPage';
import ExamPathDirectoryPage from './components/pages/ExamPathDirectoryPage';
import TimelineDeadlinesPage from './components/pages/TimelineDeadlinesPage';
import CareerCompassPage from './components/pages/CareerCompassPage';
import ExamTrackerPage from './components/pages/ExamTrackerPage';
import AccountSettingsPage from './components/pages/AccountSettingsPage';
import TakeExamPage from './components/pages/TakeExamPage';
import CompletedExamsPage from './components/pages/CompletedExamsPage';
import ScheduledExamsPage from './components/pages/ScheduledExamsPage';
import LiveExamPage from './components/pages/LiveExamPage';

// Mock Data
import {
  currentUser as initialUser,
  initialAttempts,
  initialExamList,
  browseEnrollExams,
  directoryExams as initialDirectory,
  teacherCourses as initialCourses,
  studyResources,
  scheduledExams,
  initialCertificates,
  availableExamsForTaking,
  careerCompassQuestions
} from './data/mockData';

export default function App() {
  const [user, setUser] = useState(initialUser);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [subPage, setSubPage] = useState(null);

  // Core dynamic datasets
  const [examList, setExamList] = useState(initialExamList);
  const [availableExams, setAvailableExams] = useState(availableExamsForTaking || initialExamList);
  const [attempts, setAttempts] = useState(initialAttempts);
  const [directoryList, setDirectoryList] = useState(initialDirectory);
  const [courses, setCourses] = useState(initialCourses);
  const [certificates, setCertificates] = useState(initialCertificates);

  // Modal states
  const [activeEnrollExam, setActiveEnrollExam] = useState(null);
  const [activeAttemptModal, setActiveAttemptModal] = useState(null);
  const [activeCertModal, setActiveCertModal] = useState(null);
  const [activeResourceModal, setActiveResourceModal] = useState(null);
  const [currentTakingExam, setCurrentTakingExam] = useState(null);

  // Sidebar collapse state: on desktop (>=1024px) defaults to open; on mobile (<1024px) defaults to closed
  const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 1024;
  const [sidebarOpen, setSidebarOpen] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);
  const [savedSidebarState, setSavedSidebarState] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);

  // Toast state
  const [toast, setToast] = useState(null);

  const showToast = (toastObj) => {
    setToast(toastObj);
  };

  const handleNavigate = (page, sub = null) => {
    // If leaving live exam, restore previous sidebar state
    if (activePage === 'live-exam' && page !== 'live-exam') {
      setSidebarOpen(savedSidebarState);
    }
    setActivePage(page);
    setSubPage(sub);

    // MOBILE BEHAVIOR:
    if (isMobile()) {
      setSidebarOpen(false);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Launch live exam
  const handleLaunchExam = (exam) => {
    const matched = availableExams.find(e => e.id === exam?.id || e.name === exam?.name) || exam || availableExams[0];
    setCurrentTakingExam(matched);
    setSavedSidebarState(sidebarOpen);
    setSidebarOpen(false);
    setActivePage('live-exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Complete exam handler
  const handleCompleteExam = (newAttempt) => {
    setAttempts(prev => [newAttempt, ...prev]);
    setSidebarOpen(savedSidebarState);
    showToast({
      title: 'Exam Submitted',
      message: `Score: ${newAttempt.score} (${newAttempt.percentage}%). Result saved to history.`,
      type: 'success'
    });

    setAvailableExams(prev => prev.map(ex => {
      if (ex.name === newAttempt.exam) {
        return {
          ...ex,
          attemptsUsed: Math.min(ex.attemptsAllowed, ex.attemptsUsed + 1)
        };
      }
      return ex;
    }));

    setExamList(prev => prev.map(ex => {
      if (ex.name === newAttempt.exam) {
        return {
          ...ex,
          status: 'Done',
          attempts: '2/3'
        };
      }
      return ex;
    }));

    if (newAttempt.result === 'Pass') {
      const newCert = {
        id: `CERT-BDK-2026-${Math.floor(100 + Math.random() * 900)}`,
        title: "Certificate of Successful Competency",
        examName: newAttempt.exam,
        recipientName: user.name,
        studentId: user.id,
        issueDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
        score: `${newAttempt.scorePercent}%`,
        grade: "Distinction",
        verificationCode: `BDK-VRF-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
        signedBy: "Academic Director, Bodhika Examinations",
        status: "Verified & Active"
      };
      setCertificates(prev => [newCert, ...prev]);
    }
  };

  const handleConfirmEnroll = (exam) => {
    setActiveEnrollExam(null);
    const newExamItem = {
      id: `ex-${Date.now()}`,
      name: exam.name,
      category: exam.subject,
      grade: exam.type,
      subject: exam.subject,
      lang: "EN",
      questions: 45,
      passPercent: "60%",
      timeMin: 60,
      status: "Upcoming",
      due: "30 Sep 2026",
      access: "Enrolled",
      attempts: "0/3",
      retakeAllowed: false,
      price: exam.price,
      isFree: false
    };
    setExamList(prev => [newExamItem, ...prev]);
    showToast({
      title: 'Enrollment Confirmed!',
      message: `You now have full access to ${exam.name}. Check Upcoming Exams.`,
      type: 'success'
    });
  };

  const handleUpdateExamTrackerStatus = (id, newStatus) => {
    setDirectoryList(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  // Handle Login Screen View
  if (!isAuthenticated || showLoginModal) {
    return (
      <div className="relative">
        {showLoginModal && (
          <button
            onClick={() => setShowLoginModal(false)}
            className="fixed top-4 right-4 z-50 px-4 py-2 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-black transition-all shadow-md flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
            <span>Back to Dashboard</span>
          </button>
        )}
        <LoginPage
          onLoginSuccess={(userData) => {
            if (userData?.name) setUser(prev => ({ ...prev, name: userData.name }));
            setIsAuthenticated(true);
            setShowLoginModal(false);
            showToast({
              title: 'Welcome Back!',
              message: 'Signed in successfully to Bodhika Learning.',
              type: 'success'
            });
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg font-sans text-on-background flex flex-col">
      {/* Top Header */}
      <Header
        user={user}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(prev => !prev)}
        onSearchSelect={(item) => handleNavigate(item.page, item.sub)}
        onNavigate={handleNavigate}
        onOpenLoginModal={() => setShowLoginModal(true)}
        onLogout={() => {
          setIsAuthenticated(false);
          showToast({ title: 'Logged Out', message: 'Session terminated securely.', type: 'info' });
        }}
      />

      {/* Left Collapsible Navigation Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={handleNavigate}
        activePage={activePage}
        subPage={subPage}
      />

      {/* Main Content Workspace */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'lg:pl-[270px]' : 'pl-0'
      }`}>
        <main className="pt-24 sm:pt-28 px-4 sm:px-6 lg:px-10 pb-24 lg:pb-16 flex-1 w-full max-w-full overflow-x-hidden animate-in fade-in duration-200">
          {/* Dashboard (Exclusive Hero Banner view) */}
          {activePage === 'dashboard' && (
            <ExaminationListPage
              exams={examList}
              onTakeExam={(exam) => {
                if (exam) {
                  const matched = availableExams.find(e => e.name === exam.name) || exam;
                  handleLaunchExam(matched);
                } else {
                  handleNavigate('take-exam');
                }
              }}
              onViewHistory={(subj) => {
                setActivePage('history');
                setSubPage(null);
              }}
              onToast={showToast}
            />
          )}

          {/* Upcoming Exams Page (Dedicated unpaired view) */}
          {(activePage === 'upcoming-exams' || (activePage === 'exams' && subPage === 'upcoming')) && (
            <UpcomingExamsPage
              exams={examList.filter(e => e.status !== 'Done')}
              onTakeExam={(exam) => {
                if (exam) {
                  const matched = availableExams.find(e => e.name === exam.name) || exam;
                  handleLaunchExam(matched);
                } else {
                  handleNavigate('take-exam');
                }
              }}
              onViewHistory={(subj) => {
                setActivePage('history');
                setSubPage(null);
              }}
              onToast={showToast}
            />
          )}

          {/* Completed Exams Page */}
          {(activePage === 'completed-exams' || (activePage === 'exams' && subPage === 'completed')) && (
            <CompletedExamsPage
              attempts={attempts}
              onViewResult={(att) => setActiveAttemptModal(att)}
              onRetakeExam={(att) => {
                const matched = availableExams.find(e => e.name === att.exam);
                if (matched) {
                  handleLaunchExam(matched);
                } else {
                  handleNavigate('take-exam');
                }
              }}
              onBackToDashboard={() => handleNavigate('dashboard')}
            />
          )}

          {/* Scheduled Exams Page */}
          {(activePage === 'scheduled-exams' || (activePage === 'exams' && subPage === 'scheduled')) && (
            <ScheduledExamsPage
              scheduledList={scheduledExams}
              onStartExam={(exam) => {
                const matched = availableExams.find(e => e.name === exam.name) || exam;
                handleLaunchExam(matched);
              }}
              onToast={showToast}
            />
          )}

          {/* Take Exam Page */}
          {activePage === 'take-exam' && (
            <TakeExamPage
              availableExams={availableExams}
              onStartExam={(exam) => {
                handleLaunchExam(exam);
              }}
              onToast={showToast}
            />
          )}

          {/* Exam History */}
          {activePage === 'history' && (
            <ExamHistoryPage
              attempts={attempts}
              onBackToExams={() => handleNavigate('dashboard')}
              onViewAttempt={(att) => setActiveAttemptModal(att)}
              onRetakeExam={(att) => {
                const matched = availableExams.find(e => e.name === att.exam);
                if (matched) {
                  handleLaunchExam(matched);
                } else {
                  handleNavigate('take-exam');
                }
              }}
            />
          )}

          {/* Browse & Enroll */}
          {activePage === 'browse-enroll' && (
            <BrowseEnrollPage
              catalog={browseEnrollExams}
              onEnroll={(exam) => setActiveEnrollExam(exam)}
              onBackToMyExams={() => handleNavigate('dashboard')}
            />
          )}

          {/* My Performance */}
          {activePage === 'performance' && (
            <MyPerformancePage
              onNavigateToHistory={(subj) => {
                setActivePage('history');
                setSubPage('chart');
              }}
            />
          )}

          {/* My Certificates */}
          {activePage === 'certificates' && (
            <CertificatesPage
              certificates={certificates}
              onViewCertificate={(cert) => setActiveCertModal(cert)}
            />
          )}

          {/* Teacher Courses */}
          {activePage === 'teacher-courses' && (
            <TeacherCoursesPage
              courses={courses}
              onToast={showToast}
            />
          )}

          {/* Study Resources */}
          {activePage === 'study-resources' && (
            <StudyResourcesPage
              resources={studyResources}
              initialCategory={subPage || 'all'}
              onOpenResource={(res) => setActiveResourceModal(res)}
              onToast={showToast}
            />
          )}

          {/* ExamPath Directory */}
          {activePage === 'exampath-directory' && (
            <ExamPathDirectoryPage
              directoryList={directoryList}
              onTrackExam={handleUpdateExamTrackerStatus}
              onToast={showToast}
            />
          )}

          {/* Timeline & Deadlines */}
          {activePage === 'timeline-deadlines' && (
            <TimelineDeadlinesPage
              onToast={showToast}
            />
          )}

          {/* Career Compass */}
          {activePage === 'career-compass' && (
            <CareerCompassPage
              questions={careerCompassQuestions}
              onNavigateToExam={() => handleNavigate('exampath-directory')}
              onToast={showToast}
            />
          )}

          {/* My Exam Tracker */}
          {activePage === 'exam-tracker' && (
            <ExamTrackerPage
              directoryList={directoryList}
              onUpdateStatus={handleUpdateExamTrackerStatus}
              onToast={showToast}
            />
          )}

          {/* Account Settings */}
          {activePage === 'settings' && (
            <AccountSettingsPage
              user={user}
              initialTab={subPage === 'password' ? 'password' : 'profile'}
              onUpdateUser={setUser}
              onToast={showToast}
            />
          )}

          {/* Live Exam Simulator */}
          {activePage === 'live-exam' && (
            <LiveExamPage
              exam={currentTakingExam || availableExams[0]}
              onCompleteExam={handleCompleteExam}
              onExitExam={() => handleNavigate('take-exam')}
              onToast={showToast}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (refff.jpg style) */}
      <MobileNavBar activePage={activePage} onNavigate={handleNavigate} />

      {/* Global Modals */}
      <EnrollModal
        exam={activeEnrollExam}
        onClose={() => setActiveEnrollExam(null)}
        onConfirm={handleConfirmEnroll}
      />

      <AttemptDetailsModal
        attempt={activeAttemptModal}
        onClose={() => setActiveAttemptModal(null)}
        onRetake={(att) => {
          const matched = availableExams.find(e => e.name === att.exam);
          if (matched) {
            handleLaunchExam(matched);
          } else {
            handleNavigate('take-exam');
          }
        }}
      />

      <CertificateModal
        certificate={activeCertModal}
        onClose={() => setActiveCertModal(null)}
      />

      <ResourcePreviewModal
        resource={activeResourceModal}
        onClose={() => setActiveResourceModal(null)}
      />

      {/* Global Toast Notification */}
      <Toast
        toast={toast}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
