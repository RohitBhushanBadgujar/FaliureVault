import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ArrowLeft, X, LayoutGrid, Brain, Activity, FileText, Compass, CheckCircle } from 'lucide-react';

interface TutorialStep {
  title: string;
  description: string;
  targetTab?: 'vault' | 'analyze' | 'rebuild' | 'reports' | 'profile';
  highlightId?: string;
  icon: React.ComponentType<any>;
  badgeColor: string;
  badgeText: string;
}

interface InteractiveTutorialProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'vault' | 'analyze' | 'rebuild' | 'reports' | 'profile';
  setNavTab: (tab: 'vault' | 'analyze' | 'rebuild' | 'reports' | 'profile') => void;
}

export default function InteractiveTutorial({
  isOpen,
  onClose,
  activeTab,
  setNavTab
}: InteractiveTutorialProps) {
  const [currentStep, setCurrentStep] = React.useState(0);

  const steps: TutorialStep[] = [
    {
      title: "Welcome to FailureVault",
      description: "FailureVault helps you learn from the past to build the future. We break down the exact reasons why startups failed so you don't repeat the same mistakes.",
      icon: Compass,
      badgeColor: "bg-accent/10 text-accent border-accent/20",
      badgeText: "GETTING STARTED"
    },
    {
      title: "The Vault (Tab 1)",
      description: "This is the primary repository. You can search across failed startups, sort by sector, or filter by failure phase. Pick a case study to view its detailed breakdown.",
      targetTab: 'vault',
      highlightId: 'persistent-nav-tabbar',
      icon: LayoutGrid,
      badgeColor: "bg-bg-elevated text-text-primary border-border-subtle",
      badgeText: "TAB 01 // EXPLORE"
    },
    {
      title: "Analyze An Idea (Tab 2)",
      description: "Have a startup idea? Paste it in the Analyze portal. Our AI engine will instantly compare it against historical failures, highlight potential risks, and outline how to make it work today.",
      targetTab: 'analyze',
      icon: Brain,
      badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      badgeText: "TAB 02 // ANALYZE"
    },
    {
      title: "The Rebuild Workspace (Tab 3)",
      description: "Adopt a concept to start rebuilding it. Add tasks, write notes, and simulate validation milestones to lower risks and document your strategic pivot steps.",
      targetTab: 'rebuild',
      icon: Activity,
      badgeColor: "bg-success/10 text-success border-success/20",
      badgeText: "TAB 03 // SIMULATOR LAB"
    },
    {
      title: "VC-Grade Strategic Blue-Books (Tab 4)",
      description: "Download professional PDF reports summarizing the failure journey and key lessons for each startup. Generate beautifully structured reports complete with root causes, failure journeys, and modern pivot guides.",
      targetTab: 'reports',
      icon: FileText,
      badgeColor: "bg-cyan-500/10 text-cyan-glow border-cyan-glow/20",
      badgeText: "TAB 04 // dossier downloads"
    },
    {
      title: "Ready to Initiate Decryption?",
      description: "Failures are not dead ends — they are simply variables that failed under previous timing. Adjust the variables, leverage 2026 tech, and build smarter. Click Start to complete onboarding and run your first case study scan!",
      icon: Sparkles,
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      badgeText: "INTELLIGENT REBUILD COOP"
    }
  ];

  // Auto-switch tabs to show corresponding pages as steps proceed
  useEffect(() => {
    if (isOpen) {
      const stepConfig = steps[currentStep];
      if (stepConfig && stepConfig.targetTab) {
        setNavTab(stepConfig.targetTab);
      }
    }
  }, [currentStep, isOpen]);

  // Handle skip / dismiss
  const handleComplete = () => {
    localStorage.setItem('failurevault_tutorial_completed', 'true');
    onClose();
  };

  if (!isOpen) return null;

  const currentStepData = steps[currentStep];
  const StepIcon = currentStepData.icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        
        {/* Animated Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg overflow-hidden bg-dark-slate/95 border border-border-subtle rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-left"
        >
          {/* Top header glow segment */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-electric-indigo via-cyan-glow to-purple-500" />
          
          <div className="p-6 md:p-8 space-y-6">
            
            {/* Top Close Row */}
            <div className="flex items-center justify-between">
              <span className={`px-2.5 py-0.5 border text-[9px] font-mono uppercase tracking-widest rounded-xl ${currentStepData.badgeColor}`}>
                {currentStepData.badgeText}
              </span>
              <button
                onClick={handleComplete}
                className="p-1 px-2.5 text-[10px] font-mono text-slate-500 hover:text-white uppercase transition-colors hover:bg-white/5 border border-transparent hover:border-white/5 rounded-xl cursor-pointer"
                title="Skip entire tutorial onboarding sequence"
              >
                Skip Tour
              </button>
            </div>

            {/* Step Icon, Title & Narrative Description */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-black/40 border border-white/5 rounded-xl shrink-0 text-electric-indigo">
                  <StepIcon className="w-6 h-6 stroke-[1.25] text-electric-indigo animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display font-medium text-lg text-slate-100 tracking-tight leading-snug">
                    {currentStepData.title}
                  </h3>
                  <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                    STAGE GUIDE // NODE STEP {currentStep + 1} OF {steps.length}
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-350 leading-relaxed font-sans font-light">
                {currentStepData.description}
              </p>
            </div>

            {/* Progress Bar & Indicators */}
            <div className="space-y-3">
              <div className="flex gap-1.5 justify-start">
                {steps.map((_, idx) => (
                  <div
                    key={`step-dot-${idx}`}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      idx === currentStep ? 'w-8 bg-electric-indigo' : idx < currentStep ? 'w-2.5 bg-[#ffffff30]' : 'w-2 bg-[#ffffff10]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Actions Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <button
                disabled={currentStep === 0}
                onClick={() => setCurrentStep(prev => prev - 1)}
                className={`flex items-center gap-2 px-3.5 py-2 font-mono text-[10px] uppercase tracking-wider rounded-xl border border-white/5 transition-all ${
                  currentStep === 0 
                  ? 'text-slate-700 border-transparent cursor-not-allowed' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="px-4 py-2 bg-electric-indigo text-white font-mono text-[10px] uppercase tracking-wider rounded-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_20px_rgba(108,99,255,0.2)]"
                >
                  Next Step
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleComplete}
                  className="px-5 py-2 bg-gradient-to-r from-electric-indigo to-cyan-glow text-white font-mono text-[10px] uppercase tracking-wider font-bold rounded-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_20px_rgba(108,99,255,0.35)]"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  Initiate Scan
                </button>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
