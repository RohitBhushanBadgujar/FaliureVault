import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Search, SlidersHorizontal, LogOut, Terminal, 
  Lightbulb, Compass, HelpCircle, Activity, LayoutGrid, Sparkles, 
  BookOpen, AlertTriangle, ShieldCheck, ArrowRight, ChevronDown, 
  Brain, FileText, Users, Award, Briefcase, Play, ArrowDown, HelpCircle as HelpIcon,
  Sun, Moon, Zap, Home
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { Project } from './types';
import { PRESEEDED_PROJECTS } from './data';
import RevivalScore from './components/RevivalScore';
import WelcomeScreen from './components/WelcomeScreen';
import ProjectCard from './components/ProjectCard';
import ProjectDetail from './components/ProjectDetail';
import ProjectWorkspace from './components/ProjectWorkspace';
import NewProjectModal from './components/NewProjectModal';
import FailureDnaComparator from './components/FailureDnaComparator';
import InteractiveTutorial from './components/InteractiveTutorial';
import GlobalSearchSpotlight from './components/GlobalSearchSpotlight';
import ErrorBoundary from './components/ErrorBoundary';
import AdminAccessModal from './components/AdminAccessModal';
import { 
  subscribeToAuth, 
  logoutUser, 
  loginUser, 
  signUpUser, 
  signInWithGoogle, 
  saveFirebaseUserProfile, 
  getFirebaseUserProfile, 
  saveFirebaseProject, 
  getFirebaseUserProjects, 
  uploadProjectsBatch,
  deleteFirebaseProject,
  FirebaseUserProfile 
} from './lib/firebaseService';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

export default function App() {
  // Navigation persistent tab state: 'vault' | 'analyze' | 'rebuild' | 'reports' | 'profile'
  const [navTab, setNavTab] = useState<'vault' | 'analyze' | 'rebuild' | 'reports' | 'profile'>('vault');

  // User Authentication (Local Profile Session)
  const [userProfile, setUserProfile] = useState<{ name: string; email: string }>(() => {
    const saved = localStorage.getItem('failurevault_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return { name: 'Innovator', email: 'innovator@failurevault.com' };
  });

  // User Expanded Bio
  const [userBio, setUserBio] = useState<string>(() => {
    return localStorage.getItem('failurevault_user_bio') || 'Strategic Auditor & Venture Analyst. Curating lessons from historically defunct tech blueprints to guide tomorrow\'s builds.';
  });

  // User Avatar Icon/Preset
  const [userAvatar, setUserAvatar] = useState<string>(() => {
    return localStorage.getItem('failurevault_user_avatar') || '🦊';
  });

  // Saved Startup Bookmarks
  const [savedProjectIds, setSavedProjectIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('failurevault_saved_projects');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Action log trackers
  const [activityLogs, setActivityLogs] = useState<{ id: string; action: string; time: string }[]>(() => {
    try {
      const saved = localStorage.getItem('failurevault_activity_logs');
      return saved ? JSON.parse(saved) : [
        { id: 'act-1', action: 'Initiated FailureVault session.', time: 'Just now' },
        { id: 'act-2', action: 'Synchronized with preseeded venture database (15 case studies loaded).', time: '5 mins ago' }
      ];
    } catch {
      return [
        { id: 'act-1', action: 'Initiated FailureVault session.', time: 'Just now' }
      ];
    }
  });

  // Helper method to add a custom action to activity logs
  const logActivity = (actionText: string) => {
    setActivityLogs(prev => {
      const updated = [{ id: `act-${Date.now()}`, action: actionText, time: 'Just now' }, ...prev.slice(0, 14)];
      localStorage.setItem('failurevault_activity_logs', JSON.stringify(updated));
      if (firebaseUser) {
        saveFirebaseUserProfile(firebaseUser.uid, { activityLogs: updated });
      }
      return updated;
    });
  };

  // Helper method to toggle bookmarking
  const toggleSaveProject = (projectId: string) => {
    setSavedProjectIds(prev => {
      const next = prev.includes(projectId) 
        ? prev.filter(id => id !== projectId) 
        : [...prev, projectId];
      localStorage.setItem('failurevault_saved_projects', JSON.stringify(next));
      logActivity(prev.includes(projectId) ? `Removed venture ${projectId} from Bookmarks.` : `Saved venture ${projectId} inside Bookmarks repository.`);
      if (firebaseUser) {
        saveFirebaseUserProfile(firebaseUser.uid, { savedProjectIds: next });
      }
      return next;
    });
  };

  // Basic screen state router to handle Welcome vs logged-in areas
  const [screenState, setScreenState] = useState<'welcome' | 'vault' | 'project-detail' | 'workspace'>('welcome');
  const [isAuthInitializing, setIsAuthInitializing] = useState(false);

  // Projects store with standard localStorage persistence
  const [projectsList, setProjectsList] = useState<Project[]>(() => {
    const saved = localStorage.getItem('failurevault_projects');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Project[];
        const combined = [...PRESEEDED_PROJECTS];
        
        parsed.forEach(proj => {
          const existsInPreseeded = PRESEEDED_PROJECTS.some(p => p.id === proj.id);
          if (!existsInPreseeded) {
            combined.push(proj);
          } else {
            const index = combined.findIndex(p => p.id === proj.id);
            if (index !== -1) {
              combined[index] = {
                ...combined[index],
                ...proj,
                name: combined[index].name || proj.name,
                industry: combined[index].industry || proj.industry,
                failedYear: combined[index].failedYear || proj.failedYear,
                tagline: combined[index].tagline || proj.tagline,
                primaryFailureReason: combined[index].primaryFailureReason || proj.primaryFailureReason,
                revivalPossibility: combined[index].revivalPossibility || proj.revivalPossibility,
                aiAnalysis: combined[index].aiAnalysis || proj.aiAnalysis,
              };
            }
          }
        });
        return combined;
      } catch {
        return PRESEEDED_PROJECTS;
      }
    }
    return PRESEEDED_PROJECTS;
  });

  // Selected state
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(PRESEEDED_PROJECTS[0]?.id || null);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<any>(null);

  // Admin Mode state variables
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    return localStorage.getItem('failurevault_admin_mode') === 'true';
  });
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);

  // Admin Project Deletion Handler
  const handleDeleteProject = async (projectId: string) => {
    // 1. Remove project locally from state and localStorage
    setProjectsList(prev => {
      const next = prev.filter(p => p.id !== projectId);
      const customOnly = next.filter(p => !PRESEEDED_PROJECTS.some(pre => pre.id === p.id));
      localStorage.setItem('failurevault_projects', JSON.stringify(customOnly));
      return next;
    });

    // 2. Clear selected project ID if it was deleted
    if (selectedProjectId === projectId) {
      setSelectedProjectId(null);
      setScreenState('vault');
    }

    // 3. Remove from Saved/Bookmarks if bookmarked
    if (savedProjectIds.includes(projectId)) {
      setSavedProjectIds(prev => {
        const next = prev.filter(id => id !== projectId);
        localStorage.setItem('failurevault_saved_projects', JSON.stringify(next));
        return next;
      });
    }

    // 4. Log the activity
    logActivity(`Permanently deleted project study: ${projectId}.`);

    // 5. Delete from Firebase Firestore if user is authenticated
    if (firebaseUser) {
      try {
        await deleteFirebaseProject(firebaseUser.uid, projectId);
      } catch (error) {
        console.error("Error deleting from firestore:", error);
      }
    }
  };

  // Admin Project Update Handler (Approve, Reject, Request Info, Edit, etc)
  const handleUpdateProject = async (updatedProject: Project) => {
    // 1. Update project locally in state and localStorage
    setProjectsList(prev => {
      const next = prev.map(p => p.id === updatedProject.id ? updatedProject : p);
      const customOnly = next.filter(p => !PRESEEDED_PROJECTS.some(pre => pre.id === p.id));
      localStorage.setItem('failurevault_projects', JSON.stringify(customOnly));
      return next;
    });

    // 2. Log the activity
    logActivity(`Admin updated project study "${updatedProject.name}" (Status: ${updatedProject.approvalStatus || 'Approved'}).`);

    // 3. Save to Firebase Firestore if user is authenticated
    if (firebaseUser) {
      try {
        await saveFirebaseProject(firebaseUser.uid, updatedProject);
      } catch (error) {
        console.error("Error saving updated project to firestore:", error);
      }
    }
  };

  // Subscribe to Firebase Auth
  useEffect(() => {
    setIsAuthInitializing(true);
    const unsubscribe = subscribeToAuth(async (user) => {
      if (user) {
        setFirebaseUser(user);
        try {
          // Fetch user profile from Firestore
          const profile = await getFirebaseUserProfile(user.uid);
          if (profile) {
            setUserProfile({ name: profile.name, email: profile.email });
            if (profile.bio) setUserBio(profile.bio);
            if (profile.avatar) setUserAvatar(profile.avatar);
            if (profile.savedProjectIds) setSavedProjectIds(profile.savedProjectIds);
            if (profile.activityLogs) setActivityLogs(profile.activityLogs);
          } else {
            // Profile does not exist yet (maybe created via other flow), create one
            const newProfile: FirebaseUserProfile = {
              name: user.displayName || user.email?.split('@')[0] || 'Innovator',
              email: user.email || '',
              bio: userBio,
              avatar: userAvatar,
              savedProjectIds: savedProjectIds,
              activityLogs: activityLogs,
            };
            await saveFirebaseUserProfile(user.uid, newProfile);
            setUserProfile({ name: newProfile.name, email: newProfile.email });
          }

          // Fetch user projects from Firestore
          const dbProjects = await getFirebaseUserProjects(user.uid);
          if (dbProjects && dbProjects.length > 0) {
            // Merge with PRESEEDED_PROJECTS so any default ones are present, but user modifications override them
            setProjectsList(prev => {
              const combined = [...PRESEEDED_PROJECTS];
              dbProjects.forEach(dbProj => {
                const index = combined.findIndex(p => p.id === dbProj.id);
                if (index !== -1) {
                  combined[index] = { ...combined[index], ...dbProj };
                } else {
                  combined.push(dbProj);
                }
              });
              return combined;
            });
          } else {
            // No custom projects in Firestore yet, batch upload the local ones to initiate database
            await uploadProjectsBatch(user.uid, PRESEEDED_PROJECTS);
          }
        } catch (err) {
          console.error("Error synchronizing with Firestore:", err);
        }
      } else {
        setFirebaseUser(null);
      }
      setIsAuthInitializing(false);
    });

    return () => unsubscribe();
  }, []);
  
  const handleLogout = async () => {
    try {
      await logoutUser();
      setFirebaseUser(null);
      setUserProfile({ name: 'Innovator', email: 'innovator@failurevault.com' });
      setUserBio('Strategic Auditor & Venture Analyst. Curating lessons from historically defunct tech blueprints to guide tomorrow\'s builds.');
      setUserAvatar('🦊');
      setSavedProjectIds([]);
      setProjectsList(PRESEEDED_PROJECTS);
      setScreenState('welcome');
      logActivity("Logged out from Firebase security session.");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  const handleRestoreDatabase = () => {
    setProjectsList(PRESEEDED_PROJECTS);
    localStorage.setItem('failurevault_projects', JSON.stringify(PRESEEDED_PROJECTS));
    logActivity("Re-synchronized entire FailureVault database with 15 clean master dossiers.");
    setSyncStatus("Local database reset successfully.");
    setTimeout(() => {
      setSyncStatus(null);
    }, 4000);
  };
  
  // Custom dialog additions
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Onboarding Status
  const [isOnboardingDismissed, setIsOnboardingDismissed] = useState<boolean>(() => {
    return localStorage.getItem('failurevault_onboarding_dismissed') === 'true';
  });

  // Interactive Product 6-Step Onboarding Tutorial Status
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(() => {
    return localStorage.getItem('failurevault_tutorial_completed') !== 'true';
  });

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Trigger Spotlight search on Cmd+K, Ctrl+K or / key globally
  useEffect(() => {
    const handleGlobalSearchKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalSearchKey);
    return () => window.removeEventListener('keydown', handleGlobalSearchKey);
  }, []);
  const [selectedIndustryFilter, setSelectedIndustryFilter] = useState<string>('All');
  const [selectedStageFilter, setSelectedStageFilter] = useState<string>('All');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);



  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem('failurevault_projects', JSON.stringify(projectsList));
  }, [projectsList]);

  // Track active project workspace entries
  useEffect(() => {
    if (selectedProjectId) {
      localStorage.setItem('failurevault_last_project_id', selectedProjectId);
      localStorage.setItem('failurevault_last_opened', new Date().toISOString());
    }
  }, [selectedProjectId]);



  // Create new custom blueprint
  const handleProjectCreated = (newProject: Project) => {
    setProjectsList(prev => [newProject, ...prev]);
    setSelectedProjectId(newProject.id);
    setScreenState('project-detail');
    setNavTab('vault');
    logActivity(`Drafted and added a custom failure blueprint case: "${newProject.name}".`);
    if (firebaseUser) {
      saveFirebaseProject(firebaseUser.uid, newProject);
    }
  };

  // Re-build trigger from project detail page to redirect to Rebuild Tab
  const handleEngageRebuild = (projectId: string) => {
    setSelectedProjectId(projectId);
    setScreenState('vault'); // Reset main route to render headers
    setNavTab('rebuild');
    const targetProj = projectsList.find(p => p.id === projectId);
    if (targetProj) {
      logActivity(`Started rebuild on "${targetProj.name}".`);
    }
  };

  // Adopt Scanned Idea helper from Analyze screen
  const handleAdoptScannedIdea = (draftProject: Project) => {
    const exists = projectsList.some(p => p.name.toLowerCase() === draftProject.name.toLowerCase());
    if (exists) {
      const existingProj = projectsList.find(p => p.name.toLowerCase() === draftProject.name.toLowerCase());
      if (existingProj) {
        setSelectedProjectId(existingProj.id);
      }
    } else {
      setProjectsList(prev => [draftProject, ...prev]);
      setSelectedProjectId(draftProject.id);
      if (firebaseUser) {
        saveFirebaseProject(firebaseUser.uid, draftProject);
      }
    }
    setScreenState('vault');
    setNavTab('rebuild');
    logActivity(`Adopted a scanned AI analysis and committed it to rebuilding focus.`);
  };

  // Get active focused project reference
  const activeProject = projectsList.find(p => p.id === selectedProjectId) || projectsList[0];

  // Fetch unique sectors for main filter bar
  const uniqueIndustries: string[] = ['All'];
  projectsList.forEach(p => {
    let sector = p.industry;
    if (p.industry.includes('Clean Energy')) sector = 'Clean Energy & Infrastructure';
    else if (p.industry.includes('HealthTech') || p.industry.includes('Logistics')) sector = 'Aero & HealthTech';
    else if (p.industry.includes('Consumer')) sector = 'Consumer Hardware';
    if (!uniqueIndustries.includes(sector)) {
      uniqueIndustries.push(sector);
    }
  });

  // Map filters beautifully
  const filteredProjects = projectsList.filter(p => {
    // Only show approved startups unless in admin mode
    const isApproved = !p.approvalStatus || p.approvalStatus === 'Approved';
    const isVisible = isApproved || isAdminMode;
    if (!isVisible) return false;

    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.primaryFailureReason.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesIndustry = true;
    if (selectedIndustryFilter !== 'All') {
      if (selectedIndustryFilter === 'Clean Energy & Infrastructure') {
        matchesIndustry = p.industry.includes('Clean Energy');
      } else if (selectedIndustryFilter === 'Aero & HealthTech') {
        matchesIndustry = p.industry.includes('HealthTech') || p.industry.includes('Logistics');
      } else if (selectedIndustryFilter === 'Consumer Hardware') {
        matchesIndustry = p.industry.includes('Consumer') || p.industry.includes('Wearables');
      } else {
        matchesIndustry = p.industry === selectedIndustryFilter;
      }
    }

    const matchesStage = selectedStageFilter === 'All' || p.failureStage === selectedStageFilter;
    return matchesSearch && matchesIndustry && matchesStage;
  });

  // Dynamic metrics calculation
  const totalFailuresCount = projectsList.length;

  const activeRebuildsCount = projectsList.filter(p => 
    p.workspace && (
      p.workspace.progress > 0 || 
      p.workspace.tasks.some(t => t.status === 'Completed') ||
      p.workspace.notes.length > 0 ||
      p.workspace.contributors.some(c => c.joined)
    )
  ).length;

  const rebuildingProjects = projectsList.filter(p => 
    p.workspace && (
      p.workspace.progress > 0 || 
      p.workspace.tasks.length > 0 || 
      p.workspace.notes.length > 0 || 
      p.workspace.contributors.some(c => c.joined)
    )
  );

  const totalLessonsCount = projectsList.reduce((sum, p) => {
    if (p.aiAnalysis) {
      const mistakes = p.aiAnalysis.keyMistakes?.length || 0;
      const improvements = p.aiAnalysis.suggestedImprovements?.length || 0;
      return sum + mistakes + improvements;
    }
    return sum;
  }, 0) + projectsList.reduce((sum, p) => sum + (p.workspace?.notes.length || 0), 0);

  const avgRevivalScore = projectsList.length > 0 
    ? Math.round(projectsList.reduce((sum, p) => sum + p.revivalPossibility, 0) / projectsList.length) 
    : 78;

  // PREMIUM direct PDF strategic handbook compiler in Reports tab
  const handleCompileDirectReportPdf = (project: Project) => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const primaryColor = [15, 15, 17]; // #0F0F11
      const brandIndigo = [99, 102, 241];  // #6366F1
      const accentGreen = [16, 185, 129]; // #10B981
      const softBg = [248, 249, 250];  // Light gray

      // ==========================================
      // PAGE 1 — COVER (Dark Slate Aesthetic)
      // ==========================================
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, 0, 210, 297, 'F');

      // Brand color bar on left
      doc.setFillColor(brandIndigo[0], brandIndigo[1], brandIndigo[2]);
      doc.rect(0, 0, 7, 297, 'F');

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(brandIndigo[0], brandIndigo[1], brandIndigo[2]);
      doc.text("FAILUREVAULT // STRATEGIC ADVISORY CONSOLE", 25, 35);

      doc.setDrawColor(brandIndigo[0], brandIndigo[1], brandIndigo[2]);
      doc.setLineWidth(0.4);
      doc.line(25, 40, 185, 40);

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(28);
      doc.setTextColor(255, 255, 255);
      doc.text("VENTURE", 25, 65);
      doc.setFont("Helvetica", "normal");
      doc.text("DECONSTRUCTION", 25, 78);
      doc.text("DOSSIER", 25, 91);

      doc.setFontSize(10);
      doc.setTextColor(140, 140, 140);
      doc.text("A Premium Capital-Efficiency Audit and Workspace v2 Concept Handbook", 25, 104);

      // Dossier card
      doc.setFillColor(25, 25, 29);
      doc.rect(25, 120, 160, 105, 'F');
      doc.setDrawColor(50, 50, 55);
      doc.rect(25, 120, 160, 105, 'D');

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(brandIndigo[0], brandIndigo[1], brandIndigo[2]);
      doc.text("CLASSIFIED ASSET FILE", 35, 134);

      doc.setFontSize(22);
      doc.setTextColor(255, 255, 255);
      doc.text(project.name.toUpperCase(), 35, 147);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(160, 160, 160);
      const tagTextLines = doc.splitTextToSize(project.tagline || '', 140);
      doc.text(tagTextLines, 35, 155);

      // Specs bullet roster
      doc.setTextColor(130, 130, 130);
      doc.text("Target Sector:", 35, 175);
      doc.setTextColor(255, 255, 255);
      doc.text(project.industry, 68, 175);

      doc.setTextColor(130, 130, 130);
      doc.text("Operation Period:", 35, 182);
      doc.setTextColor(255, 255, 255);
      doc.text(`${project.foundedYear} - ${project.failedYear}`, 68, 182);

      doc.setTextColor(130, 130, 130);
      doc.text("Revival Index:", 35, 189);
      doc.setTextColor(accentGreen[0], accentGreen[1], accentGreen[2]);
      doc.setFont("Helvetica", "bold");
      doc.text(`${project.revivalPossibility}% Viability`, 68, 189);

      doc.setFont("Helvetica", "normal");
      doc.setTextColor(130, 130, 130);
      doc.text("Primary Bottleneck:", 35, 196);
      doc.setTextColor(239, 68, 68);
      const wrapBot = doc.splitTextToSize(project.primaryFailureReason, 110);
      doc.text(wrapBot, 68, 196);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text("CONFIDENTIAL  |  GENERATED ON-DEMAND FROM INTEL.OS ACTIVE NODE ENVIRONMENT", 25, 270);
      doc.text("REPAIR SYSTEMS ENGAGED // FAILUREVAULT INC.", 25, 275);

      // ==========================================
      // PAGE 2 — FORENSIC DEEP-DIVE (Clinical Overview)
      // ==========================================
      doc.addPage();
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, 0, 210, 14, 'F');
      doc.setFillColor(brandIndigo[0], brandIndigo[1], brandIndigo[2]);
      doc.rect(0, 14, 210, 1, 'F');

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(160, 160, 160);
      doc.text("FAILUREVAULT CASE STUDIES REPORT  //  SECTION II", 20, 9);

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text("II. WHY THE MODEL COLLAPSED", 20, 32);

      doc.setDrawColor(brandIndigo[0], brandIndigo[1], brandIndigo[2]);
      doc.setLineWidth(0.4);
      doc.line(20, 36, 190, 36);

      // Description Box
      doc.setFillColor(softBg[0], softBg[1], softBg[2]);
      doc.rect(20, 44, 170, 30, 'F');
      doc.setDrawColor(220, 220, 225);
      doc.rect(20, 44, 170, 30, 'D');

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text("ORIGINAL PROJECT BRIEF", 25, 50);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(70, 70, 70);
      const wrappedDesc = doc.splitTextToSize(project.description || 'No description recorded.', 160);
      doc.text(wrappedDesc, 25, 57);

      // Core Strategic Errors list
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(brandIndigo[0], brandIndigo[1], brandIndigo[2]);
      doc.text("CRITICAL FORENSIC POST-MORTEM ERRORS", 20, 90);

      let currentY = 100;
      const mistakes = project.aiAnalysis?.keyMistakes || [
        "Unvalidated early product assumptions leading to heavy development loops.",
        "High continuous operating expenditures exhausting resource reserves prematurely.",
        "Delayed customer feedback loops causing misalignment with actual target needs."
      ];

      mistakes.forEach((mistake, idx) => {
        doc.setFillColor(250, 240, 240);
        doc.rect(20, currentY, 170, 14, 'F');
        doc.setDrawColor(240, 200, 200);
        doc.rect(20, currentY, 170, 14, 'D');
        doc.setFillColor(239, 68, 68);
        doc.rect(20, currentY, 2, 14, 'F');

        doc.setFont("Helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(220, 50, 50);
        doc.text(`ERROR 0${idx + 1}:`, 26, currentY + 9);

        doc.setFont("Helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(50, 50, 50);
        const wMistStr = doc.splitTextToSize(mistake, 128);
        doc.text(wMistStr, 48, currentY + 9);

        currentY += 19;
      });

      // Root Cause Matrix grid header
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text("FAILURE COMPONENT BREAKDOWN", 20, 170);

      const rootCauses = project.aiAnalysis?.rootCauses || {
        funding: "Liquid reserves dry up during heavy structural delays.",
        product: "Over-engineered systems built before solving simple client needs.",
        market: "Users decline adoption due to high custom entry friction.",
        execution: "prioritizing custom features rather than fast customer launches.",
        timing: "Launched before serverless functions made running costs near-$0."
      };

      const itemsGrid = [
        { label: "FINANCIAL VULNERABILITY", text: rootCauses.funding },
        { label: "PRODUCT OVER-DEVELOPMENT", text: rootCauses.product },
        { label: "MARKET INTERACTION DEPLETION", text: rootCauses.market },
        { label: "STRATEGIC EXECUTION FRICTION", text: rootCauses.execution }
      ];

      let gx = 20;
      let gy = 180;
      itemsGrid.forEach((item, index) => {
        const xPos = index % 2 === 0 ? 20 : 108;
        const yPos = index < 2 ? 180 : 215;

        doc.setFillColor(248, 249, 250);
        doc.rect(xPos, yPos, 82, 28, 'F');
        doc.setDrawColor(220, 222, 226);
        doc.rect(xPos, yPos, 82, 28, 'D');

        doc.setFont("Helvetica", "bold");
        doc.setFontSize(8.5);
        doc.setTextColor(brandIndigo[0], brandIndigo[1], brandIndigo[2]);
        doc.text(item.label, xPos + 5, yPos + 6);

        doc.setFont("Helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(80, 80, 80);
        const wTxtStr = doc.splitTextToSize(item.text, 72);
        doc.text(wTxtStr, xPos + 5, yPos + 12);
      });

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(`Strategic Report booklet for ${project.name}  |  CONFIDENTIAL`, 20, 282);

      // ==========================================
      // PAGE 3 — HOW TO REBUILD IT SMARTER (The V2 Guide)
      // ==========================================
      doc.addPage();
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, 0, 210, 14, 'F');
      doc.setFillColor(brandIndigo[0], brandIndigo[1], brandIndigo[2]);
      doc.rect(0, 14, 210, 1, 'F');

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(160, 160, 160);
      doc.text("FAILUREVAULT CASE STUDIES REBUILD  //  SECTION III", 20, 9);

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text("III. THE REBUILD V2 ACTION PLAN", 20, 32);

      doc.setDrawColor(accentGreen[0], accentGreen[1], accentGreen[2]);
      doc.setLineWidth(0.4);
      doc.line(20, 36, 190, 36);

      // Opportunity review box
      doc.setFillColor(240, 253, 244);
      doc.rect(20, 44, 170, 32, 'F');
      doc.setDrawColor(200, 240, 210);
      doc.rect(20, 44, 170, 32, 'D');
      doc.setFillColor(accentGreen[0], accentGreen[1], accentGreen[2]);
      doc.rect(20, 44, 2, 32, 'F');

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(22, 101, 52);
      doc.text("MARKET ATTRACTION RE-ALIGNMENT // THE 2026 ROADMAP", 25, 51);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(30, 41, 59);
      const oppTxt = project.aiAnalysis?.marketOpportunity || 'High software integrations opportunity exists today.';
      const wrapOpp = doc.splitTextToSize(oppTxt, 160);
      doc.text(wrapOpp, 25, 57);

      // What to avoid & What to do
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text("STRATEGIC PREVENTATIVE DISCIPLINE (WHAT TO AVOID)", 20, 94);

      doc.setFillColor(248, 250, 252);
      doc.rect(20, 100, 170, 36, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.rect(20, 100, 170, 36, 'D');

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(239, 68, 68);
      doc.text("CRITICAL FORBIDDEN VECTOR:", 25, 107);
      doc.setFont("Helvetica", "normal");
      doc.setTextColor(50, 50, 50);
      const avTxt = project.aiAnalysis?.advisoryAnswers?.whatToAvoid || 'Do not raise large initial capital. Do not pre-buy inventory.';
      const wrapAv = doc.splitTextToSize(avTxt, 158);
      doc.text(wrapAv, 25, 113);

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text("RECOVERY TASK INSTRUCTIONS", 20, 154);

      const tasksList = project.workspace?.tasks || [
        { title: "Interview 5 prospective target clients to outline main hurdles." },
        { title: "Launch a clean zero-cost landing page to confirm visual interest." },
        { title: "Build a single-flow mockup interactive static walkthrough." }
      ];

      let taskY = 162;
      tasksList.slice(0, 4).forEach((taskItem, id) => {
        doc.setFillColor(240, 242, 245);
        doc.rect(20, taskY, 170, 12, 'F');
        doc.setDrawColor(220, 222, 225);
        doc.rect(20, taskY, 170, 12, 'D');

        doc.setFont("Helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text(`STEP 0${id + 1}`, 25, taskY + 8.2);

        doc.setFont("Helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(80, 80, 80);
        doc.text(taskItem.title.substring(0, 90), 50, taskY + 8.2);

        taskY += 15;
      });

      // 2026 Technical Enablers list
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(brandIndigo[0], brandIndigo[1], brandIndigo[2]);
      doc.text("2026 REBUILDING TECHNOLOGY ENABLERS", 20, 235);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(70, 70, 70);
      const enablerTxt = project.aiAnalysis?.advisoryAnswers?.changedMarketConditions || 'Low zero-cost cloud functions, multi-tenant databases, Stripe.';
      const wrapEnabler = doc.splitTextToSize(enablerTxt, 168);
      doc.text(wrapEnabler, 20, 242);

      // Save PDF
      doc.save(`FailureVault_Report_${project.name.replace(/\s+/g, '_')}.pdf`);
    } catch (pdfErr) {
      console.error("PDF Compiling Error:", pdfErr);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#E0E0E0] font-sans relative antialiased selection:bg-accent/35 selection:text-white">
      
      {/* Absolute top border neon strip */}
      <div className="h-[2px] w-full bg-gradient-to-r from-accent via-accent-hover to-accent shadow-[0_1px_15px_rgba(20,184,166,0.4)] z-40 relative" />

      {/* Global Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[120px] animate-[pulse-slow_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-accent-hover/5 rounded-full blur-[100px] animate-[pulse-slow_8s_ease-in-out_infinite] delay-1000" />
      </div>

      <div className="relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
        
        {/* Auth Initializing state */}
        {isAuthInitializing && (
          <motion.div
            key="auth-loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-screen flex flex-col items-center justify-center bg-bg-primary"
          >
            <div className="w-8 h-8 border-4 border-border-subtle border-t-accent rounded-full animate-spin mb-4" />
            <p className="text-text-muted font-mono text-sm tracking-wider uppercase">Initializing Vault</p>
          </motion.div>
        )}

        {/* welcome screen router */}
        {!isAuthInitializing && screenState === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <WelcomeScreen 
              onEnter={() => {
                setScreenState('vault');
                setNavTab('vault');
              }} 
              onContinue={() => {
                setScreenState('vault');
                setNavTab('vault');
              }}
              userProfile={firebaseUser ? userProfile : null}
              firebaseUser={firebaseUser}
              onLogin={loginUser}
              onSignUp={signUpUser}
              onGoogleSignIn={signInWithGoogle}
              onAdminClick={() => setIsAdminModalOpen(true)}
              isAdminMode={isAdminMode}
            />
          </motion.div>
        )}

        {/* MAIN INTEGRATED APP FRAMEWORK (VAULT PLATORM) */}
        {screenState === 'vault' && userProfile && (
          <motion.div
            key="main-platform"
            initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.98 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.02 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8"
          >
            
            {/* Vault platform top toolbar header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between border-b border-border-subtle pb-6 mb-8 gap-6 text-left">
              <div>
                <h1 className="font-display text-3xl tracking-tight text-text-primary flex items-center gap-2">
                  <span className="font-bold">Failure</span>
                  <span className="text-accent font-medium">Vault</span>
                </h1>
                <p className="text-sm text-text-secondary font-sans mt-1">
                  Startup post-mortem archives and strategic pivot logs.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Back to Home Button */}
                <button
                  onClick={() => setScreenState('welcome')}
                  className="cursor-pointer px-4 py-2.5 glass-panel hover:bg-bg-card border-border-subtle hover:border-border-strong text-text-secondary hover:text-text-primary font-sans text-xs font-semibold rounded-xl transition-all flex items-center gap-2"
                  title="Return to Landing Page"
                >
                  <Home className="w-4 h-4 text-accent" />
                  <span>Back to Home</span>
                </button>

                {/* Tour */}
                <button
                  onClick={() => setIsTutorialOpen(true)}
                  className="cursor-pointer px-3 py-2.5 glass-panel hover:bg-bg-card border-border-subtle hover:border-border-strong text-text-secondary hover:text-text-primary font-sans text-xs font-medium rounded-lg transition-all flex items-center gap-2"
                >
                  <Compass className="w-4 h-4" />
                </button>

                {/* Submit Failed Startup */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  id="draft-blueprint-btn"
                  className="cursor-pointer px-5 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-sans font-medium text-xs transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(20,184,166,0.2)] hover:shadow-[0_0_25px_rgba(20,184,166,0.4)] hover:scale-105 active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  Submit Failed Startup
                </button>
              </div>
            </header>

            {/* PERSISTENT 5-SECTION NAVBAR BUTTONS LINK */}
            <div id="persistent-nav-tabbar" className="flex border-b border-border-subtle mb-6 text-sm font-sans justify-start sm:justify-start overflow-x-auto whitespace-nowrap gap-2">
              {[
                { id: 'vault', label: 'Vault', icon: LayoutGrid, color: 'text-accent' },
                { id: 'analyze', label: 'Analyze', icon: Brain, color: 'text-accent' },
                { id: 'rebuild', label: 'Rebuild', icon: Activity, color: 'text-accent' },
                { id: 'reports', label: 'Reports', icon: FileText, color: 'text-accent' },
                { id: 'profile', label: 'My Profile', icon: Users, color: 'text-accent' }
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = navTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setNavTab(tab.id as any)}
                    className={`flex items-center gap-2 px-5 py-3.5 border-b-2 text-sm font-medium transition-all cursor-pointer ${
                      isSelected 
                        ? 'border-accent text-text-primary bg-bg-card' 
                        : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? tab.color : 'text-text-muted'}`} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENTS CONTAINER RENDER */}
            <AnimatePresence mode="wait">
              
              {/* TAB 1: VAULT */}
              {navTab === 'vault' && (
                <motion.div
                  key="tab-vault-view"
                  initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="space-y-8"
                >
                  {/* Premium Hero Search Bar */}
                  <div className="relative max-w-2xl mx-auto my-8 group focus-within:max-w-3xl transition-all duration-500">
                    <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="relative flex items-center glass-panel bg-bg-elevated border border-border-subtle rounded-2xl overflow-hidden focus-within:border-accent focus-within:shadow-[0_0_30px_rgba(20,184,166,0.3)] transition-all duration-500">
                      <div className="pl-6 pr-4">
                        <Search className="w-5 h-5 text-text-muted group-focus-within:text-accent transition-colors duration-500" />
                      </div>
                      <input 
                        type="text" 
                        onClick={() => setIsSearchOpen(true)}
                        placeholder="Search failed startups, reasons, or tech enablers..."
                        className="w-full py-5 bg-transparent border-none text-text-primary placeholder:text-text-muted font-sans text-lg focus:outline-none focus:ring-0 cursor-text"
                      />
                      <div className="pr-6 pl-4 flex items-center gap-2">
                        <kbd className="hidden sm:inline-flex items-center gap-1 text-[10px] text-text-muted font-sans font-medium px-2 py-1 rounded bg-bg-card border border-border-subtle">
                          <span className="text-xs">⌘</span>K
                        </kbd>
                      </div>
                    </div>
                  </div>

                  {/* Strategic Onboarding Banner Guide */}
                  {!isOnboardingDismissed ? (
                    <motion.div 
                      id="onboarding-guide-card"
                      className="flex flex-col md:flex-row gap-5 p-8 rounded-2xl glass-panel border border-border-subtle text-left relative overflow-hidden bg-bg-card"
                    >
                      <button 
                        onClick={() => {
                          setIsOnboardingDismissed(true);
                          localStorage.setItem('failurevault_onboarding_dismissed', 'true');
                        }}
                        className="absolute top-4 right-4 text-[10px] font-sans font-medium text-text-muted hover:text-text-primary px-3 py-1.5 rounded-md cursor-pointer transition-colors"
                      >
                        Dismiss
                      </button>

                      <div className="flex-1 space-y-5 font-sans">
                        <div>
                          <h2 className="font-display font-medium text-lg text-text-primary tracking-tight">
                            Navigating FailureVault
                          </h2>
                          <p className="text-sm text-text-secondary mt-1 max-w-2xl">
                            Learn how to find structural learnings in defunct projects, minimize capital risks, and construct validation experiment workflows.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-sm leading-normal font-sans">
                          <div className="space-y-1">
                            <h4 className="font-medium text-text-primary">1. Study Defunct Post-Mortems</h4>
                            <p className="text-text-secondary font-light">
                              Select any failed startup below to view its clinical failure cascade and Revival potentials.
                            </p>
                          </div>
                          
                          <div className="space-y-1">
                            <h4 className="font-medium text-text-primary">2. Deconstruct Custom Ideas</h4>
                            <p className="text-text-secondary font-light">
                              Open the "Analyze" tab and use AI to understand potential failure points before building.
                            </p>
                          </div>

                          <div className="space-y-1">
                            <h4 className="font-medium text-text-primary">3. Launch Active Blueprints</h4>
                            <p className="text-text-secondary font-light">
                              Construct validation workflows to reduce market risks and track strategic pivots over time.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex justify-end -mt-3 text-right">
                      <button
                        onClick={() => {
                          setIsOnboardingDismissed(false);
                          localStorage.removeItem('failurevault_onboarding_dismissed');
                        }}
                        className="text-xs font-sans font-medium text-accent hover:text-accent-hover flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <BookOpen className="w-4 h-4" />
                        Show Onboarding Guide
                      </button>
                    </div>
                  )}

                  {/* Minimal, high-contrast overview counters */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-8 border-b border-border-subtle mb-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-text-muted font-sans text-xs uppercase tracking-wider font-medium">Failures Studied</span>
                      <span className="text-3xl font-display font-medium text-text-primary">{totalFailuresCount}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-text-muted font-sans text-xs uppercase tracking-wider font-medium">Active Blueprints</span>
                      <span className="text-3xl font-display font-medium text-accent">{activeRebuildsCount}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-text-muted font-sans text-xs uppercase tracking-wider font-medium">Key Guidelines</span>
                      <span className="text-3xl font-display font-medium text-text-primary">{totalLessonsCount}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-text-muted font-sans text-xs uppercase tracking-wider font-medium">Average Viability</span>
                      <span className="text-3xl font-display font-medium text-success">{avgRevivalScore}%</span>
                    </div>
                  </div>

                  {/* Layout Grid search/filters and listing cards */}
                  <div className="space-y-6">
                    {/* Filter controllers bar */}
                    <div className="flex flex-col gap-4 text-sm">
                      <div className="flex items-center gap-3 w-full">
                        <div className="relative flex-1 md:w-96 md:flex-none">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                            <Search className="w-4 h-4" />
                          </span>
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-bg-card border border-border-subtle rounded-lg py-2 pl-9 pr-4 text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors shadow-sm"
                            placeholder="Filter archives..."
                          />
                        </div>
                        <button 
                          onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                          className={`px-4 py-2 rounded-lg border font-medium font-sans text-xs flex items-center gap-2 transition-colors cursor-pointer ${
                            isFilterPanelOpen || selectedIndustryFilter !== 'All' || selectedStageFilter !== 'All'
                              ? 'bg-accent/10 border-accent/20 text-accent'
                              : 'bg-bg-card border-border-subtle text-text-secondary hover:text-text-primary'
                          }`}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                          </svg>
                          Filters
                        </button>
                      </div>

                      {/* Collapsible Filter Panel */}
                      <AnimatePresence>
                        {isFilterPanelOpen && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-5 bg-bg-card border border-border-subtle rounded-xl flex flex-col gap-5 mt-2">
                              
                              <div className="space-y-3">
                                <span className="text-text-primary font-sans text-xs uppercase tracking-wider font-bold">Sector</span>
                                <div className="flex flex-wrap gap-2">
                                  {uniqueIndustries.map((ind) => (
                                    <button
                                      key={ind}
                                      onClick={() => setSelectedIndustryFilter(ind)}
                                      className={`px-3 py-1.5 rounded-md font-sans text-xs transition-all cursor-pointer font-medium ${
                                        selectedIndustryFilter === ind 
                                          ? 'bg-accent text-white shadow-md' 
                                          : 'bg-bg-elevated text-text-secondary border border-border-subtle hover:text-text-primary'
                                      }`}
                                    >
                                      {ind === 'All' ? 'All Sectors' : ind.replace(' Clean Energy & Infrastructure', '').replace(' Aero & HealthTech', '').replace(' Hardware', '')}
                                    </button>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="h-px w-full bg-border-subtle" />
                              
                              <div className="space-y-3">
                                <span className="text-text-primary font-sans text-xs uppercase tracking-wider font-bold">Failure Phase</span>
                                <div className="flex flex-wrap gap-2">
                                  {['All', 'Ideation', 'MVP / Validation', 'Early Traction', 'Scale'].map((stg) => (
                                    <button
                                      key={stg}
                                      onClick={() => setSelectedStageFilter(stg)}
                                      className={`px-3 py-1.5 rounded-md font-sans text-xs transition-all cursor-pointer font-medium ${
                                        selectedStageFilter === stg 
                                          ? 'bg-success text-white shadow-md' 
                                          : 'bg-bg-elevated text-text-secondary border border-border-subtle hover:text-text-primary'
                                      }`}
                                    >
                                      {stg === 'All' ? 'All Phases' : stg}
                                    </button>
                                  ))}
                                </div>
                              </div>

                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Cards grid list with staggering entry animation */}
                    {filteredProjects.length === 0 ? (
                      <div className="p-16 glass-panel border border-border-subtle bg-bg-card text-center rounded-2xl max-w-xl mx-auto my-12 flex flex-col items-center">
                        <Compass className="w-10 h-10 text-text-muted mb-4 stroke-[1.25]" />
                        <h3 className="font-display font-medium text-text-primary text-lg">No Venture Blueprints Mapped</h3>
                        <p className="text-sm text-text-secondary font-light mt-2 leading-relaxed">
                          No results match your search configuration setup. Create a custom blueprint to initiate a new case study.
                        </p>
                      </div>
                    ) : (
                      <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left"
                      >
                        {filteredProjects.map((p) => (
                          <motion.div 
                            key={p.id} 
                            className="h-full cursor-pointer"
                            variants={itemVariants}
                            onClick={() => {
                              setSelectedProjectId(p.id);
                              setScreenState('project-detail');
                            }}
                            whileHover={{ y: -2 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ProjectCard
                              project={p}
                              onClick={() => {
                                setSelectedProjectId(p.id);
                                setScreenState('project-detail');
                              }}
                              isAdmin={false}
                              onDelete={() => handleDeleteProject(p.id)}
                            />
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* TAB 2: ANALYZE CUSTOM IDEA SCANNER */}
              {navTab === 'analyze' && (
                <motion.div
                  key="tab-analyze-view"
                  initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <FailureDnaComparator
                    projects={projectsList}
                    onViewProjectDetail={(projId) => {
                      setSelectedProjectId(projId);
                      setScreenState('project-detail');
                    }}
                    onAdoptProject={handleAdoptScannedIdea}
                  />
                </motion.div>
              )}

              {/* TAB 3: REBUILD WORKSPACES */}
              {navTab === 'rebuild' && (
                <motion.div
                  key="tab-rebuild-view"
                  initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {rebuildingProjects.length === 0 ? (
                    <div className="p-16 glass-panel border border-border-subtle bg-bg-card text-center rounded-2xl max-w-lg mx-auto my-12 flex flex-col items-center">
                      <Activity className="w-12 h-12 text-text-muted mb-4 stroke-[1.25]" />
                      <h3 className="font-display font-medium text-text-primary text-lg">No Active Blueprints Engaged</h3>
                      <p className="text-sm text-text-secondary font-light mt-2 leading-relaxed">
                        Active blueprints allow you to configure pre-seeded cases or scanned custom ideas under capital-efficient software-only layers. 
                        Go to <strong className="text-text-primary font-medium">Vault</strong> or <strong className="text-text-primary font-medium">Analyze</strong> first, select any venture study file, and click <strong className="text-text-primary font-medium">&apos;Adopt Concept / Rebuild&apos;</strong> to launch!
                      </p>
                      
                      <button
                        onClick={() => setNavTab('vault')}
                        className="mt-8 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-sans font-medium text-sm rounded-xl cursor-pointer transition-colors shadow-md"
                      >
                        Explore Vault post-mortems
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col lg:flex-row gap-6 items-start text-left">
                      {/* Sidebar list to switch active projects when building multiple */}
                      <aside className="w-full lg:w-72 shrink-0 glass-panel bg-bg-card border border-border-subtle rounded-2xl p-6 font-sans text-left space-y-6">
                        <div className="flex items-center justify-between border-b border-border-subtle pb-4">
                          <h4 className="font-display font-medium text-text-primary uppercase tracking-wider text-xs flex items-center gap-2">
                            <Activity className="w-4 h-4 text-accent" />
                            Active Blueprints
                          </h4>
                          <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full border border-accent/20 font-bold">{rebuildingProjects.length}</span>
                        </div>
                        
                        <p className="text-sm text-text-secondary leading-relaxed font-light">
                          Select any active blueprint to load its validation lists and strategist logs.
                        </p>

                        <div className="space-y-3">
                          {rebuildingProjects.map((p) => {
                            const isFocused = selectedProjectId === p.id;
                            const compTasks = p.workspace?.tasks.filter(t => t.status === 'Completed').length || 0;
                            const totTasks = p.workspace?.tasks.length || 0;
                            return (
                              <button
                                key={p.id}
                                onClick={() => setSelectedProjectId(p.id)}
                                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                                  isFocused 
                                    ? 'bg-accent/10 border-accent text-text-primary shadow-sm' 
                                    : 'bg-bg-elevated border-border-subtle hover:border-text-muted hover:bg-bg-card text-text-secondary'
                                }`}
                              >
                                <div className="truncate flex-1">
                                  <span className="block truncate font-medium text-sm flex items-center gap-2">
                                    <span className="text-lg">{p.avatarEmoji}</span>
                                    {p.name}
                                  </span>
                                  <span className="text-xs font-sans text-text-muted mt-1 block truncate">
                                    {p.industry.replace(' Clean Energy & Infrastructure', '').replace(' Aero & HealthTech', '').replace(' Hardware', '')}
                                  </span>
                                </div>
                                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${isFocused ? 'bg-accent text-white' : 'bg-success/10 text-success'}`}>
                                  {p.workspace?.progress || 0}%
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </aside>

                      {/* Main active subtab workspace */}
                      <div className="flex-1 w-full bg-transparent border-none">
                        {activeProject && (
                          <ErrorBoundary fallbackMessage="The workspace for this project failed to load. Please try selecting another project.">
                            <ProjectWorkspace
                              project={activeProject}
                              onBackToVault={() => setNavTab('vault')}
                              onUpdateWorkspace={(upWS) => {
                                const updatedProj = { ...activeProject, workspace: upWS };
                                setProjectsList(prev => prev.map(pr => 
                                  pr.id === activeProject.id ? updatedProj : pr
                                ));
                                if (firebaseUser) {
                                  saveFirebaseProject(firebaseUser.uid, updatedProj);
                                }
                              }}
                            />
                          </ErrorBoundary>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* TAB 4: REPORTS */}
              {navTab === 'reports' && (
                <motion.div
                  key="tab-reports-view"
                  initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="space-y-6"
                >
                  <div className="text-left max-w-2xl">
                    <h2 className="font-display font-medium text-text-primary text-xl tracking-tight">Generated Reports</h2>
                    <p className="text-sm text-text-secondary mt-2 font-light leading-relaxed">
                      Download professional PDF reports summarizing the failure journey and key lessons for each startup.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                    {projectsList.map((p) => {
                      return (
                        <div 
                          key={`report-${p.id}`} 
                          className="p-6 rounded-2xl glass-panel bg-bg-card border border-border-subtle hover:border-border-strong transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center gap-3 border-b border-border-subtle pb-4 mb-4">
                              <span className="text-3xl shrink-0 select-none">{p.avatarEmoji}</span>
                              <div className="truncate">
                                <h3 className="font-display font-medium text-text-primary text-base truncate">{p.name}</h3>
                                <span className="text-xs font-sans text-text-muted block truncate font-medium">{p.industry}</span>
                              </div>
                            </div>

                            <p className="text-sm text-text-secondary leading-relaxed font-light mb-6 line-clamp-2">
                              {p.description}
                            </p>

                            <div className="space-y-3 text-sm font-sans text-text-secondary mb-6 text-left">
                              <div className="flex justify-between border-b border-border-subtle pb-2">
                                <span>Timeline:</span>
                                <span className="text-text-primary font-medium">{p.foundedYear} - {p.failedYear}</span>
                              </div>
                              <div className="flex justify-between items-center border-b border-border-subtle pb-2">
                                <span>Revival Score:</span>
                                <RevivalScore score={p.revivalPossibility} size="sm" showLabel={false} />
                              </div>
                              <div className="flex justify-between pb-1">
                                <span>Status:</span>
                                <span className="text-accent font-medium">
                                  {p.workspace && p.workspace.progress > 0 ? `Rebuilding (${p.workspace.progress}%)` : 'Saved'}
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleCompileDirectReportPdf(p)}
                            className="w-full py-3 bg-bg-elevated hover:bg-bg-card border border-border-subtle hover:border-accent text-text-primary hover:text-accent font-sans font-medium text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                          >
                            <FileText className="w-4 h-4" />
                            Download Report
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* TAB 5: PROFILE PAGE */}
              {navTab === 'profile' && userProfile && (
                <motion.div
                  key="tab-profile-view"
                  initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left"
                >
                  
                  {/* Profile Card */}
                  <div className="p-8 glass-panel bg-bg-card border border-border-subtle rounded-2xl space-y-8">
                    <div>
                      <h3 className="font-display font-medium text-text-primary text-xl">My Profile</h3>
                    </div>

                    {/* Interactive Avatar Preset Selector */}
                    <div className="p-5 bg-bg-elevated border border-border-subtle rounded-xl">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                          <span className="text-4xl p-3 bg-bg-card border border-border-subtle rounded-2xl leading-none block shrink-0 select-none shadow-sm">{userAvatar}</span>
                          <div className="flex-1">
                            <label className="text-xs font-sans text-text-muted font-medium block mb-2">Choose Avatar</label>
                            <div className="flex gap-2 flex-wrap">
                              {['🦊', '🧬', '🛡️', '🚀', '🔮', '🤖', '👑', '💼'].map(emoji => (
                                <button
                                  key={emoji}
                                  onClick={() => {
                                    setUserAvatar(emoji);
                                    localStorage.setItem('failurevault_user_avatar', emoji);
                                    logActivity(`Updated avatar to "${emoji}".`);
                                  }}
                                  className={`text-lg p-2 rounded-xl transition-all cursor-pointer ${userAvatar === emoji ? 'bg-accent/10 border border-accent/20' : 'border border-transparent hover:bg-bg-card'}`}
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Editable name & email */}
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-sans text-text-muted font-medium block mb-1.5">Name</label>
                        <input
                          type="text"
                          value={userProfile.name}
                          onChange={(e) => {
                            const updated = { ...userProfile, name: e.target.value };
                            setUserProfile(updated);
                            localStorage.setItem('failurevault_user', JSON.stringify(updated));
                          }}
                          className="w-full bg-bg-elevated border border-border-subtle text-sm px-4 py-3 rounded-xl text-text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all shadow-sm"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-sans text-text-muted font-medium block mb-1.5">Email</label>
                        <input
                          type="text"
                          disabled
                          value={userProfile.email}
                          className="w-full bg-bg-card opacity-70 border border-border-subtle text-sm px-4 py-3 rounded-xl text-text-secondary cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-sans text-text-muted font-medium block mb-1.5">Bio</label>
                        <textarea
                          rows={3}
                          value={userBio}
                          onChange={(e) => {
                            setUserBio(e.target.value);
                            localStorage.setItem('failurevault_user_bio', e.target.value);
                          }}
                          className="w-full bg-bg-elevated border border-border-subtle text-sm px-4 py-3 rounded-xl text-text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all leading-relaxed resize-none shadow-sm"
                        />
                      </div>
                    </div>

                    {/* FORCE SYNC OPTION FOR SEEDED DOSSIERS */}
                    <div className="pt-6 border-t border-border-subtle space-y-4">
                      <button
                        onClick={handleRestoreDatabase}
                        className="w-full py-3 bg-bg-elevated hover:bg-bg-card border border-border-subtle hover:border-text-primary text-text-primary font-sans text-sm font-medium rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                      >
                        <Zap className="w-4 h-4" />
                        Reload Sample Data
                      </button>
                      <p className="text-xs text-text-secondary font-light leading-relaxed text-center">
                        Reload all sample startup cases (Juicero, Theranos, Pebble, etc.).
                      </p>
                      
                      {syncStatus && (
                        <div className="mt-3 text-center py-2 bg-success/10 text-success rounded-xl border border-success/20 text-sm font-sans font-medium">
                          {syncStatus}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Badges, Saved Projects, and activities history maps */}
                  <div className="lg:col-span-2 space-y-8">
                    
                    {/* SAVED STARTUPS REPOSITORY */}
                    <div className="p-8 glass-panel bg-bg-card border border-border-subtle rounded-2xl space-y-6">
                      <div>
                        <h4 className="font-display font-medium text-text-primary text-lg">Saved Startups ({savedProjectIds.length})</h4>
                      </div>

                      {savedProjectIds.length === 0 ? (
                        <p className="text-sm text-text-secondary font-light py-6 text-center bg-bg-elevated rounded-xl border border-border-subtle border-dashed">No saved startups yet. Explore the vault to save failed blueprints here.</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {projectsList
                            .filter(p => savedProjectIds.includes(p.id))
                            .map(p => (
                              <div 
                                key={p.id}
                                onClick={() => {
                                  setSelectedProjectId(p.id);
                                  setScreenState('project-detail');
                                }}
                                className="p-4 bg-bg-elevated border border-border-subtle hover:border-accent hover:shadow-md rounded-xl cursor-pointer transition-all flex items-center justify-between gap-4 group"
                              >
                                <div className="flex items-center gap-3 truncate">
                                  <span className="text-2xl p-2 bg-bg-card border border-border-subtle rounded-lg leading-none shadow-sm">{p.avatarEmoji}</span>
                                  <div className="truncate">
                                    <span className="text-sm font-medium text-text-primary block group-hover:text-accent transition-colors truncate">{p.name}</span>
                                    <span className="text-xs font-sans font-medium text-text-muted block truncate mt-0.5">{p.industry}</span>
                                  </div>
                                </div>
                                <div className="text-right shrink-0 flex flex-col gap-0.5">
                                  <span className="text-sm font-medium text-success">{p.revivalPossibility}%</span>
                                  <span className="text-[10px] font-sans font-medium text-text-muted uppercase tracking-wider">Score</span>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>

                    {/* REBUILD PROJECTS */}
                    <div className="p-8 glass-panel bg-bg-card border border-border-subtle rounded-2xl space-y-6">
                      <div>
                        <h4 className="font-display font-medium text-text-primary text-lg">Rebuild Projects</h4>
                      </div>

                      {projectsList.filter(p => p.workspace && p.workspace.progress > 0).length === 0 ? (
                        <p className="text-sm text-text-secondary font-light py-6 text-center bg-bg-elevated rounded-xl border border-border-subtle border-dashed">No active rebuild projects.</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {projectsList
                            .filter(p => p.workspace && p.workspace.progress > 0)
                            .map(p => (
                              <div 
                                key={p.id}
                                onClick={() => {
                                  setSelectedProjectId(p.id);
                                  setNavTab('rebuild');
                                }}
                                className="p-4 bg-bg-elevated border border-border-subtle hover:border-accent hover:shadow-md rounded-xl cursor-pointer transition-all flex items-center justify-between gap-4 group"
                              >
                                <div className="flex items-center gap-3 truncate">
                                  <span className="text-2xl p-2 bg-bg-card border border-border-subtle rounded-lg leading-none shadow-sm">{p.avatarEmoji}</span>
                                  <div className="truncate">
                                    <span className="text-sm font-medium text-text-primary block group-hover:text-accent transition-colors truncate">{p.name}</span>
                                    <span className="text-xs font-sans font-medium text-text-muted block truncate mt-0.5">Progress: {p.workspace?.progress}%</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>

                    {/* GENERATED REPORTS */}
                    <div className="p-8 glass-panel bg-bg-card border border-border-subtle rounded-2xl space-y-6">
                      <div>
                        <h4 className="font-display font-medium text-text-primary text-lg">Generated Reports</h4>
                      </div>
                      <p className="text-sm text-text-secondary font-light py-6 text-center bg-bg-elevated rounded-xl border border-border-subtle border-dashed">No reports generated yet.</p>
                    </div>

                    {/* RECENT ACTIVITY HISTORY LOGS */}
                    <div className="p-8 glass-panel bg-bg-card border border-border-subtle rounded-2xl space-y-6">
                      <div>
                        <h4 className="font-display font-medium text-text-primary text-lg">Recent Activity</h4>
                      </div>

                      <div className="max-h-[160px] overflow-y-auto space-y-4 pr-2 font-sans scrollbar-thin">
                        {activityLogs.map((log) => (
                          <div key={log.id} className="text-sm flex items-start gap-3 border-b border-border-subtle pb-4 last:border-0 last:pb-0">
                            <span className="text-accent shrink-0 select-none">→</span>
                            <div className="flex-1 text-text-secondary leading-relaxed">
                              {log.action}
                            </div>
                            <span className="text-xs text-text-muted shrink-0 font-medium whitespace-nowrap">
                              {log.time}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Main vault footer */}
            <footer className="mt-16 border-t border-border-subtle pt-8 pb-4 text-center text-xs text-text-muted font-sans flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
                <span>FailureVault &copy; {new Date().getFullYear()} — Learn from the past to build the future.</span>
                <button
                  onClick={() => setIsAdminModalOpen(true)}
                  className="text-text-muted hover:text-accent font-mono text-xs cursor-pointer transition-colors flex items-center gap-1.5 bg-transparent border-none outline-none"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                  <span>{isAdminMode ? "Admin Console (Active)" : "Admin Portal"}</span>
                </button>
              </div>
              <div className="font-sans font-medium text-text-muted text-[10px] tracking-wider">v2.1.0 • Secure Connection</div>
            </footer>

          </motion.div>
        )}

        {/* project details takeover overlay screen route */}
        {screenState === 'project-detail' && activeProject && (
          <motion.div
            key="project-detail"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="w-full h-full"
          >
            <ProjectDetail
              project={activeProject}
              onBack={() => setScreenState('vault')}
              onMakeActiveProject={handleEngageRebuild}
              isSaved={savedProjectIds.includes(activeProject.id)}
              onToggleSave={() => toggleSaveProject(activeProject.id)}
              isAdmin={isAdminMode}
              onDelete={() => handleDeleteProject(activeProject.id)}
            />
          </motion.div>
        )}

      </AnimatePresence>

      {/* Draft Custom Blueprint Dialog modal */}
      <NewProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProjectCreated={handleProjectCreated}
      />

      {/* Interactive Step-by-Step Onboarding guide tour */}
      <InteractiveTutorial
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
        activeTab={navTab}
        setNavTab={setNavTab}
      />

      {/* Intelligent Global Spotlight floating search console */}
      <GlobalSearchSpotlight
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        projects={projectsList}
        onSelectProject={(projId) => {
          setSelectedProjectId(projId);
          setScreenState('project-detail');
        }}
        onSelectTab={(tabId) => {
          setNavTab(tabId);
        }}
      />

      {/* Admin Access & Moderation Modal */}
      <AdminAccessModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        isAdminMode={isAdminMode}
        setIsAdminMode={setIsAdminMode}
        projects={projectsList}
        onDeleteProject={handleDeleteProject}
        onUpdateProject={handleUpdateProject}
      />
      </div>
    </div>
  );
}
