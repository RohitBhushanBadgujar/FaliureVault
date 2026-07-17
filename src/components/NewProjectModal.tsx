import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Sparkles, AlertCircle, RefreshCw, Check, ChevronDown, 
  ArrowRight, ArrowLeft, HelpCircle, ShieldAlert,
  Search, Info, ShieldCheck, Building, AlertTriangle, ListFilter
} from 'lucide-react';
import { Project } from '../types';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreated: (newProject: Project) => void;
}

const SECTORS = [
  "Artificial Intelligence (AI)",
  "FinTech (Financial Technology)",
  "EdTech (Educational Technology)",
  "ClimateTech & Sustainability",
  "Web3, Blockchain & Crypto",
  "SaaS (Software as a Service)",
  "E-Commerce & Retail Tech",
  "BioTech & Genomics",
  "HealthTech & Digital Health",
  "DeepTech & Quantum Computing",
  "Developer Tools & Infra",
  "Cybersecurity",
  "PropTech (Property Technology)",
  "AgriTech & FoodTech",
  "AdTech & Marketing Tech",
  "Logistics & Supply Chain",
  "Mobility & Autonomous Vehicles",
  "MedTech (Medical Devices)",
  "SpaceTech & Aerospace",
  "Entertainment & Gaming Tech",
  "Social Networks & Messaging"
];

const STATUS_OPTIONS = [
  "Failed",
  "Acquired",
  "Bankrupt",
  "Pivoted",
  "Closed",
  "Still Operating"
];

export default function NewProjectModal({ isOpen, onClose, onProjectCreated }: NewProjectModalProps) {
  // Wizard steps: 0 = Basics, 1 = Operations & History, 2 = AI Verification Report
  const [currentStep, setCurrentStep] = useState(0);
  
  // Form Field States
  const [name, setName] = useState('');
  const [founders, setFounders] = useState('');
  const [country, setCountry] = useState('');
  const [industry, setIndustry] = useState('');
  const [foundedYear, setFoundedYear] = useState('');
  const [failedYear, setFailedYear] = useState('');
  const [currentStatus, setCurrentStatus] = useState('Failed');
  const [teamSize, setTeamSize] = useState('');
  const [fundingRaised, setFundingRaised] = useState('');
  const [description, setDescription] = useState('');
  const [whyFailed, setWhyFailed] = useState('');
  const [majorMistakes, setMajorMistakes] = useState('');
  const [evidenceSource, setEvidenceSource] = useState('');

  // Search dropdown states for Industry
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Verification & Review States
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);

  // Declaration Checkboxes (required if verification is low/medium confidence or needs_declaration)
  const [declAccuracy, setDeclAccuracy] = useState(false);
  const [declUnverified, setDeclUnverified] = useState(false);
  const [declResponsibility, setDeclResponsibility] = useState(false);

  const loadingSteps = [
    'Initializing secure failure verification channel...',
    'Analyzing submitted operational timeline consistency...',
    'Performing public record and cross-registry search...',
    'Evaluating provided market sector and failure context...',
    'Formulating post-mortem error analysis and DNA profile...',
    'Preparing final validation assessment and peer-review dossier...'
  ];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSectors = SECTORS.filter(s => 
    s.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSectorSelect = (sector: string) => {
    setIndustry(sector);
    setSearchQuery(sector);
    setDropdownOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!dropdownOpen) {
      if (e.key === 'ArrowDown') {
        setDropdownOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev + 1) % filteredSectors.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev - 1 + filteredSectors.length) % filteredSectors.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredSectors[activeIndex]) {
        handleSectorSelect(filteredSectors[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setDropdownOpen(false);
    }
  };

  const validateStep0 = () => {
    setErrorMsg('');
    if (!name.trim()) return 'Startup Name is required.';
    if (!founders.trim()) return 'Founder(s) information is required.';
    if (!country.trim()) return 'Country / Market is required.';
    if (!industry.trim()) return 'Industry Sector is required.';
    if (!foundedYear.trim()) return 'Founded Year is required.';
    
    const fYear = parseInt(foundedYear);
    if (isNaN(fYear) || fYear < 1900 || fYear > new Date().getFullYear()) {
      return `Please enter a valid Founded Year between 1900 and ${new Date().getFullYear()}.`;
    }

    if (failedYear.trim()) {
      const failY = parseInt(failedYear);
      if (isNaN(failY) || failY < fYear) {
        return `Failure Year cannot be earlier than Founded Year (${fYear}).`;
      }
    }
    return '';
  };

  const validateStep1 = () => {
    setErrorMsg('');
    if (!description.trim()) return 'Startup Description is required.';
    if (description.trim().length < 20) return 'Description must be at least 20 characters long.';
    if (!whyFailed.trim()) return 'Please explain why the startup failed.';
    if (whyFailed.trim().length < 20) return 'The "Why it failed" explanation must be at least 20 characters long.';
    if (!majorMistakes.trim()) return 'Major Mistakes are required.';
    return '';
  };

  const handleNext = () => {
    if (currentStep === 0) {
      const err = validateStep0();
      if (err) {
        setErrorMsg(err);
        return;
      }
      setCurrentStep(1);
    }
  };

  const handleBack = () => {
    setErrorMsg('');
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  // Run AI Verification API
  const handleVerifyWithAI = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateStep1();
    if (err) {
      setErrorMsg(err);
      return;
    }

    setErrorMsg('');
    setIsAnalyzing(true);
    setAnalysisStep(0);
    setVerificationResult(null);

    // Stagger loading indicators
    const stepInterval = setInterval(() => {
      setAnalysisStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          return prev;
        }
      });
    }, 1100);

    try {
      const response = await fetch('/api/startup/validate-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          founders: founders.trim(),
          country: country.trim(),
          industry: industry.trim(),
          foundedYear: parseInt(foundedYear),
          failedYear: failedYear.trim() ? parseInt(failedYear) : null,
          currentStatus,
          teamSize: teamSize.trim() ? parseInt(teamSize) : null,
          fundingRaised: fundingRaised.trim() || null,
          description: description.trim(),
          whyFailed: whyFailed.trim(),
          majorMistakes: majorMistakes.trim(),
          evidenceSource: evidenceSource.trim() || null
        })
      });

      clearInterval(stepInterval);

      let errorDetail = '';
      if (!response.ok) {
        try {
          const errData = await response.json();
          errorDetail = errData.error || errData.message || '';
        } catch (e) {
          // ignore parsing error
        }
        throw new Error(errorDetail || `Verification API responded with status code ${response.status}`);
      }

      const resData = await response.json();
      setIsAnalyzing(false);

      if (resData.status === 'error') {
        setErrorMsg(resData.error || 'A verification error occurred.');
        return;
      }

      setVerificationResult(resData);
      setCurrentStep(2); // Go to Verification Report screen
    } catch (err: any) {
      clearInterval(stepInterval);
      setIsAnalyzing(false);
      setErrorMsg(err.message || 'Communication error with validation server.');
    }
  };

  // Commit the validated project to state/database
  const handleFinalSubmit = () => {
    if (!verificationResult || !verificationResult.report) return;

    // If declaration is needed (unavailable public verification or low/medium confidence), check them
    const needsDeclaration = verificationResult.status === 'needs_declaration' || 
                             verificationResult.verificationConfidence !== 'High';
    
    if (needsDeclaration && (!declAccuracy || !declUnverified || !declResponsibility)) {
      setErrorMsg('You must agree to all declaration terms before submitting this unverified case study.');
      return;
    }

    const { report } = verificationResult;

    // Create the final robust Project record
    const newProject: Project = {
      id: `project-contrib-${Date.now()}`,
      name: name.trim(),
      tagline: report.tagline || `${name.trim()} — Defunct ${industry} venture in ${country}`,
      industry: industry.trim(),
      foundedYear: parseInt(foundedYear),
      failedYear: failedYear.trim() ? parseInt(failedYear) : parseInt(foundedYear) + 3,
      failureStage: currentStatus,
      teamSize: teamSize.trim() ? parseInt(teamSize) : 5,
      primaryFailureReason: report.primaryFailureReason || whyFailed.trim(),
      potentialScore: report.potentialScore || 35,
      revivalPossibility: report.revivalPossibility || 45,
      avatarEmoji: report.avatarEmoji || '📉',
      description: description.trim(),
      companyStatus: currentStatus,
      strugglingCategory: 'None',
      isAIValidatedIdea: false,

      // New Submit Failed Startup fields
      founders: founders.trim(),
      majorMistakes: report.keyMistakes || majorMistakes.split('\n').map(m => m.trim()).filter(Boolean),
      evidenceSource: evidenceSource.trim() || undefined,
      approvalStatus: 'Pending', // Starts pending admin approval!
      verificationConfidence: verificationResult.verificationConfidence,
      verificationDetails: verificationResult.verificationDetails,
      evidenceStatus: verificationResult.evidenceStatus,

      aiAnalysis: {
        summary: report.description || description.trim(),
        keyMistakes: report.keyMistakes || majorMistakes.split('\n').map(m => m.trim()).filter(Boolean),
        rootCauses: report.rootCauses || {
          funding: 'Capital exhaustion during premature scaling.',
          product: 'Feature-heavy architecture without validated usage frequency.',
          market: 'Overestimating direct consumer market pain magnitude.',
          execution: 'Operational complexity dragging down profit margins.',
          timing: 'Ecosystem timing mismatches and heavy burn rates.'
        },
        failureDNA: report.failureDNA || [
          `Founded by ${founders} in ${foundedYear} under ${industry} space.`,
          `Struggled to gain sustainable units economics on high structural cost.`,
          `Faced terminal operational headwinds matching ${whyFailed.substring(0, 40)}...`,
          `Closed down with status "${currentStatus}" in ${failedYear || 'recent years'}.`
        ],
        revivalProbability: report.revivalPossibility || 45,
        marketOpportunity: "Redesigning the model using highly automated, low-asset modern architecture.",
        newRisks: report.suggestedImprovements ? report.suggestedImprovements.slice(0, 2) : ["Acquisition friction", "Regulatory compliance"],
        modernAlternatives: report.suggestedImprovements || ["Construct API-first low overhead workflow"],
        suggestedImprovements: report.suggestedImprovements || ["Pivot to thin SaaS model"],
        advisoryAnswers: {
          whatToAvoid: report.keyMistakes?.[0] || 'High pre-revenue payroll drag.',
          whatToImprove: report.suggestedImprovements?.[0] || 'Customer-led feature rollouts.',
          modernTechToLeverage: 'Cloud serverless microservices, automated marketing pipelines, Stripe Billing.',
          changedMarketConditions: 'Ubiquitous low-cost cloud infrastructure reduces initial asset cost to near-$0.',
          v2ProductVision: report.primaryFailureReason || 'Lean B2B middleware orchestration.'
        }
      },

      workspace: {
        projectId: `project-contrib-${Date.now()}`,
        progress: 0,
        tasks: [
          {
            id: `task-revival-1-${Date.now()}`,
            title: `Conduct core post-mortem verification on why ${name} dissolved`,
            category: 'Research',
            status: 'Pending',
            priority: 'High'
          },
          {
            id: `task-revival-2-${Date.now()}`,
            title: `Draft a lean B2B alternative validating customer purchase commitment`,
            category: 'Market Validation',
            status: 'Pending',
            priority: 'Medium'
          }
        ],
        notes: [
          {
            id: `note-contrib-${Date.now()}`,
            title: 'Submitted Case Study Core Insights',
            content: `### Original Post-Mortem Description\n${description}\n\n### Primary Failure Causes\n${whyFailed}\n\n### Audit Notes\n- Verified Status: **${verificationResult.evidenceStatus}**\n- Trust Level: **${verificationResult.verificationConfidence}**\n- Confidence Details: *${verificationResult.verificationDetails}*`,
            createdAt: new Date().toISOString()
          }
        ],
        contributors: [
          { id: `cnt-1-${Date.now()}`, name: 'Community Contributor', role: 'Researcher', joined: true },
          { id: `cnt-2-${Date.now()}`, name: 'AI Auditor', role: 'AI Engineer', joined: true }
        ],
        riskMonitor: { execution: 50, market: 60, funding: 55 }
      }
    };

    onProjectCreated(newProject);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setCurrentStep(0);
    setName('');
    setFounders('');
    setCountry('');
    setIndustry('');
    setFoundedYear('');
    setFailedYear('');
    setCurrentStatus('Failed');
    setTeamSize('');
    setFundingRaised('');
    setDescription('');
    setWhyFailed('');
    setMajorMistakes('');
    setEvidenceSource('');
    setErrorMsg('');
    setVerificationResult(null);
    setDeclAccuracy(false);
    setDeclUnverified(false);
    setDeclResponsibility(false);
  };

  if (!isOpen) return null;

  return (
    <div id="failed-startup-modal" className="fixed inset-0 min-h-screen flex items-center justify-center bg-black/90 backdrop-blur-md z-50 p-4 overflow-y-auto">
      <AnimatePresence mode="wait">
        
        {/* VIEW 1: AI VERIFICATION IN PROGRESS */}
        {isAnalyzing ? (
          <motion.div
            key="analyzing-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-xl p-10 rounded-3xl bg-bg-card border border-accent/20 text-center shadow-[0_0_50px_rgba(20,184,166,0.15)] overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.1)_0%,transparent_70%)] animate-[pulse-slow_4s_ease-in-out_infinite]" />
            <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-accent/10 to-transparent -skew-x-12 animate-[shimmer_2s_infinite_linear]" />
            
            <div className="relative z-10 py-6 flex flex-col items-center">
              <div className="relative mb-8">
                <div className="absolute inset-0 rounded-full blur-md bg-accent/40 animate-pulse" />
                <RefreshCw className="relative w-16 h-16 text-accent stroke-[1.5] animate-spin" />
              </div>
              
              <h3 className="font-display text-2xl font-bold text-text-primary tracking-tight mb-2">
                Running Trustworthy Verification
              </h3>
              <p className="text-xs text-text-muted font-sans font-bold tracking-widest uppercase mb-10">
                GEMINI 3.5 FLASH AUDIT ENGINE
              </p>

              <div className="w-full bg-bg-elevated border border-border-subtle rounded-2xl p-6 mb-8 text-left min-h-[140px] flex flex-col justify-between font-sans text-sm shadow-inner relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
                <div>
                  <div className="flex items-center gap-2 text-accent mb-3 font-bold uppercase tracking-wider text-xs">
                    <Sparkles className="w-3 h-3 animate-pulse" />
                    <span>VERIFICATION // AUDITING_SUBMISSION</span>
                  </div>
                  <div className="text-text-secondary leading-relaxed font-medium transition-all duration-300">
                    {loadingSteps[analysisStep]}
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-text-muted border-t border-border-subtle pt-4 mt-4 font-bold tracking-wider">
                  <span>CROSS-CHECK STEP {analysisStep + 1} OF {loadingSteps.length}</span>
                  <span className="animate-pulse font-mono">INTEGRITY_OK</span>
                </div>
              </div>

              <div className="w-full bg-bg-elevated h-2 rounded-full overflow-hidden border border-border-subtle relative">
                <div className="absolute inset-0 bg-accent/10 animate-pulse" />
                <motion.div
                  className="bg-accent h-full rounded-full shadow-[0_0_10px_rgba(20,184,166,0.8)]"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((analysisStep + 1) / loadingSteps.length) * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          
          /* VIEW 2: GUIDED FORM & REPORT CARD */
          <motion.div
            key="wizard-state"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30 }}
            className="relative w-full max-w-2xl bg-bg-card rounded-3xl border border-border-subtle shadow-2xl p-6 md:p-8 z-10 overflow-visible"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 blur-3xl rounded-full pointer-events-none" />
            
            <button
              onClick={onClose}
              className="absolute right-5 top-5 p-2 text-text-muted hover:text-text-primary rounded-xl hover:bg-bg-elevated transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title Block */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/20 text-accent">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white">Submit a Failed Startup</h3>
                <p className="text-xs text-text-muted font-mono mt-0.5">CONTRIBUTE TO COGNITIVE FAILUREVAULT REPOSITORY</p>
              </div>
            </div>

            {/* Progress Indicators */}
            <div className="flex items-center gap-2 mb-8 bg-bg-elevated/40 border border-border-subtle/50 p-2.5 rounded-xl">
              {[
                { label: 'Company Profile' },
                { label: 'Failure Story' },
                { label: 'AI Review & Submit' }
              ].map((step, idx) => {
                const isActive = idx === currentStep;
                const isCompleted = idx < currentStep;
                return (
                  <React.Fragment key={idx}>
                    {idx > 0 && (
                      <div className={`h-[1px] flex-1 ${idx <= currentStep ? 'bg-accent/40' : 'bg-border-subtle'}`} />
                    )}
                    <div className="flex items-center gap-2 px-2 py-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold font-mono transition-all ${
                        isActive 
                          ? 'bg-accent text-white ring-4 ring-accent/20' 
                          : isCompleted 
                            ? 'bg-accent/20 text-accent border border-accent/30' 
                            : 'bg-bg-elevated text-text-muted border border-border-subtle'
                      }`}>
                        {isCompleted ? <Check className="w-3 h-3" /> : idx + 1}
                      </div>
                      <span className={`text-[10px] font-sans font-bold uppercase tracking-wider hidden sm:inline ${
                        isActive ? 'text-text-primary' : 'text-text-muted'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-xs flex items-start gap-3">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed font-medium">{errorMsg}</span>
              </div>
            )}

            {/* STEP 0: BASIC COMPANY PROFILE */}
            {currentStep === 0 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div>
                    <label className="block text-text-secondary uppercase tracking-widest text-[10px] font-bold mb-1.5">Startup Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-black/40 border border-border-subtle rounded-xl p-3 text-text-primary text-xs focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-text-muted"
                      placeholder="e.g., Juicero"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-text-secondary uppercase tracking-widest text-[10px] font-bold mb-1.5">Founder(s) *</label>
                    <input
                      type="text"
                      required
                      value={founders}
                      onChange={(e) => setFounders(e.target.value)}
                      className="w-full bg-black/40 border border-border-subtle rounded-xl p-3 text-text-primary text-xs focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-text-muted"
                      placeholder="e.g., Doug Evans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div>
                    <label className="block text-text-secondary uppercase tracking-widest text-[10px] font-bold mb-1.5">Country / Market *</label>
                    <input
                      type="text"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-black/40 border border-border-subtle rounded-xl p-3 text-text-primary text-xs focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-text-muted"
                      placeholder="e.g., United States"
                    />
                  </div>

                  {/* SEARCHABLE INDUSTRY DROPDOWN */}
                  <div className="relative text-left" ref={dropdownRef}>
                    <label className="block text-text-secondary uppercase tracking-widest text-[10px] font-bold mb-1.5">Industry Sector *</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={industry}
                        onChange={(e) => {
                          setIndustry(e.target.value);
                          setSearchQuery(e.target.value);
                          setDropdownOpen(true);
                        }}
                        onFocus={() => {
                          setDropdownOpen(true);
                          setSearchQuery(industry);
                        }}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-black/40 border border-border-subtle rounded-xl p-3 pl-10 pr-10 text-text-primary text-xs focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-text-muted"
                        placeholder="Search sector (e.g. AI, ClimateTech...)"
                      />
                      <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-text-muted" />
                      <button
                        type="button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="absolute right-3 top-3 p-1 hover:bg-bg-elevated rounded-lg text-text-muted hover:text-text-primary transition-all"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Dropdown Card */}
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute w-full mt-2 bg-bg-card border border-border-subtle rounded-xl shadow-2xl z-20 max-h-52 overflow-y-auto overflow-x-hidden font-sans text-xs scrollbar-thin text-left"
                        >
                          {filteredSectors.length > 0 ? (
                            filteredSectors.map((sector, idx) => (
                              <button
                                key={sector}
                                type="button"
                                onClick={() => handleSectorSelect(sector)}
                                className={`w-full text-left px-4 py-3 hover:bg-accent/10 hover:text-accent transition-all flex items-center justify-between border-b border-border-subtle/40 last:border-0 ${
                                  idx === activeIndex ? 'bg-accent/10 text-accent font-semibold' : 'text-text-secondary'
                                }`}
                              >
                                <span>{sector}</span>
                                {industry === sector && <Check className="w-3.5 h-3.5 text-accent" />}
                              </button>
                            ))
                          ) : (
                            <div className="p-4 text-center text-text-muted font-medium">
                              No predefined industry matches. Press Enter to use "{searchQuery}"
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                  <div>
                    <label className="block text-text-secondary uppercase tracking-widest text-[10px] font-bold mb-1.5">Founded Year *</label>
                    <input
                      type="number"
                      required
                      value={foundedYear}
                      onChange={(e) => setFoundedYear(e.target.value)}
                      className="w-full bg-black/40 border border-border-subtle rounded-xl p-3 text-text-primary text-xs focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-text-muted"
                      placeholder="e.g., 2013"
                    />
                  </div>

                  <div>
                    <label className="block text-text-secondary uppercase tracking-widest text-[10px] font-bold mb-1.5">Failure Year <span className="text-text-muted font-normal">(Optional)</span></label>
                    <input
                      type="number"
                      value={failedYear}
                      onChange={(e) => setFailedYear(e.target.value)}
                      className="w-full bg-black/40 border border-border-subtle rounded-xl p-3 text-text-primary text-xs focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-text-muted"
                      placeholder="e.g., 2017"
                    />
                  </div>

                  <div>
                    <label className="block text-text-secondary uppercase tracking-widest text-[10px] font-bold mb-1.5">Current Status *</label>
                    <div className="relative">
                      <select
                        value={currentStatus}
                        onChange={(e) => setCurrentStatus(e.target.value)}
                        className="w-full bg-black/40 border border-border-subtle rounded-xl p-3 text-text-primary text-xs focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all appearance-none cursor-pointer pr-10"
                      >
                        {STATUS_OPTIONS.map(opt => (
                          <option key={opt} value={opt} className="bg-bg-card text-text-primary">{opt}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-text-muted pointer-events-none" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 1: OPERATIONS & FAILURE STORY */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4 text-left"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-text-secondary uppercase tracking-widest text-[10px] font-bold mb-1.5">Team Size <span className="text-text-muted font-normal">(Optional)</span></label>
                    <input
                      type="number"
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className="w-full bg-black/40 border border-border-subtle rounded-xl p-3 text-text-primary text-xs focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-text-muted"
                      placeholder="e.g., 250"
                    />
                  </div>

                  <div>
                    <label className="block text-text-secondary uppercase tracking-widest text-[10px] font-bold mb-1.5">Funding Raised <span className="text-text-muted font-normal">(Optional)</span></label>
                    <input
                      type="text"
                      value={fundingRaised}
                      onChange={(e) => setFundingRaised(e.target.value)}
                      className="w-full bg-black/40 border border-border-subtle rounded-xl p-3 text-text-primary text-xs focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-text-muted"
                      placeholder="e.g., $118M"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-text-secondary uppercase tracking-widest text-[10px] font-bold mb-1.5">Short Startup Description *</label>
                  <textarea
                    required
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-black/40 border border-border-subtle rounded-xl p-3 text-text-primary text-xs focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all leading-relaxed placeholder:text-text-muted"
                    placeholder="Provide a clean summary of what the company did, its value proposition, and intended scale..."
                  />
                </div>

                <div>
                  <label className="block text-text-secondary uppercase tracking-widest text-[10px] font-bold mb-1.5">Why did it fail? *</label>
                  <textarea
                    required
                    rows={2}
                    value={whyFailed}
                    onChange={(e) => setWhyFailed(e.target.value)}
                    className="w-full bg-black/40 border border-border-subtle rounded-xl p-3 text-text-primary text-xs focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all leading-relaxed placeholder:text-text-muted"
                    placeholder="e.g., High hardware manufacturing cost, over-engineering, and consumers discovering they could squeeze juice packs with bare hands..."
                  />
                </div>

                <div>
                  <label className="block text-text-secondary uppercase tracking-widest text-[10px] font-bold mb-1.5">Major Mistakes * <span className="text-text-muted font-normal uppercase">(One per line)</span></label>
                  <textarea
                    required
                    rows={2}
                    value={majorMistakes}
                    onChange={(e) => setMajorMistakes(e.target.value)}
                    className="w-full bg-black/40 border border-border-subtle rounded-xl p-3 text-text-primary text-xs focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all leading-relaxed placeholder:text-text-muted font-sans"
                    placeholder="Manufacturing custom parts before validation.&#10;Fixing high retail pricing ($699).&#10;Arrogant marketing response to complaints."
                  />
                </div>

                <div>
                  <label className="block text-text-secondary uppercase tracking-widest text-[10px] font-bold mb-1.5">Sources / Evidence URL <span className="text-text-muted font-normal">(Optional)</span></label>
                  <input
                    type="text"
                    value={evidenceSource}
                    onChange={(e) => setEvidenceSource(e.target.value)}
                    className="w-full bg-black/40 border border-border-subtle rounded-xl p-3 text-text-primary text-xs focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-text-muted"
                    placeholder="e.g., https://www.bloomberg.com/news/articles/2017-04-19/juicero-machine"
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 2: AI REVIEW, AUDITING REPORT & DECLARATIONS */}
            {currentStep === 2 && verificationResult && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-4 text-left font-sans"
              >
                {/* 1. If Inconsistent: show blocking banner */}
                {verificationResult.status === 'inconsistent' ? (
                  <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-xs flex gap-3">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                    <div className="space-y-1.5">
                      <span className="font-bold">Inconsistent Submission Blocked:</span>
                      <p className="text-text-secondary leading-relaxed font-medium">
                        {verificationResult.errorMessage || 'This company appears to still be operating. Please verify whether you are referring to the entire company or a specific product/service.'}
                      </p>
                      <p className="text-text-muted text-[10px]">
                        Reasoning: {verificationResult.verificationDetails}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Trust audit card info */}
                    <div className="p-5 bg-bg-elevated/40 border border-border-subtle rounded-2xl space-y-3.5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />
                      
                      <div className="flex items-center justify-between border-b border-border-subtle/50 pb-3">
                        <h4 className="text-xs font-bold text-text-primary flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-accent" />
                          AI TRUSTWORTHINESS REPORT
                        </h4>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-text-muted">CONFIDENCE:</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase ${
                            verificationResult.verificationConfidence === 'High' 
                              ? 'bg-success/10 text-success border border-success/20' 
                              : verificationResult.verificationConfidence === 'Medium'
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          }`}>
                            {verificationResult.verificationConfidence}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between items-center text-text-secondary">
                          <span>Evidence Status:</span>
                          <span className="font-bold text-text-primary">{verificationResult.evidenceStatus}</span>
                        </div>
                        <p className="text-text-muted leading-relaxed font-medium bg-black/30 p-3 rounded-xl border border-border-subtle/50">
                          {verificationResult.verificationDetails}
                        </p>
                      </div>
                    </div>

                    {/* Report Preview */}
                    <div className="border border-border-subtle rounded-2xl overflow-hidden bg-black/20">
                      <div className="bg-bg-elevated/60 px-4 py-3 border-b border-border-subtle flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-text-muted">BLUEPRINT PREVIEW DOSSIER</span>
                        <span className="text-xs">{verificationResult.report.avatarEmoji || '📉'}</span>
                      </div>
                      <div className="p-4 space-y-3 text-xs">
                        <div>
                          <h5 className="font-bold text-text-primary text-sm">{name}</h5>
                          <p className="text-text-secondary text-[11px] italic mt-0.5">{verificationResult.report.tagline}</p>
                        </div>
                        <div>
                          <span className="text-text-muted font-bold text-[10px] uppercase tracking-wider block mb-0.5">Primary Bottleneck:</span>
                          <p className="text-text-secondary leading-relaxed font-medium bg-bg-card/40 px-3 py-2 border border-border-subtle/40 rounded-lg">{verificationResult.report.primaryFailureReason}</p>
                        </div>
                      </div>
                    </div>

                    {/* Show declarations if confidence isn't High or status is needs_declaration */}
                    {(verificationResult.status === 'needs_declaration' || verificationResult.verificationConfidence !== 'High') && (
                      <div className="bg-yellow-500/5 border border-yellow-500/20 p-4 rounded-xl space-y-3">
                        <h4 className="text-xs font-bold text-yellow-400 flex items-center gap-1.5 border-b border-yellow-500/10 pb-2 mb-2">
                          <AlertTriangle className="w-4 h-4" />
                          UNVERIFIED SUBMISSION DECLARATIONS REQUIRED
                        </h4>

                        <label className="flex items-start gap-3 cursor-pointer group select-none">
                          <div className="relative flex items-center mt-0.5">
                            <input
                              type="checkbox"
                              checked={declAccuracy}
                              onChange={(e) => setDeclAccuracy(e.target.checked)}
                              className="sr-only"
                            />
                            <div className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${
                              declAccuracy 
                                ? 'bg-accent border-accent text-white' 
                                : 'bg-black/40 border-border-subtle group-hover:border-accent/60'
                            }`}>
                              {declAccuracy && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                          </div>
                          <span className="text-[11px] text-text-secondary leading-relaxed font-medium transition-colors group-hover:text-text-primary">
                            I confirm that the information I provided is accurate to the best of my knowledge.
                          </span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group select-none">
                          <div className="relative flex items-center mt-0.5">
                            <input
                              type="checkbox"
                              checked={declUnverified}
                              onChange={(e) => setDeclUnverified(e.target.checked)}
                              className="sr-only"
                            />
                            <div className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${
                              declUnverified 
                                ? 'bg-accent border-accent text-white' 
                                : 'bg-black/40 border-border-subtle group-hover:border-accent/60'
                            }`}>
                              {declUnverified && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                          </div>
                          <span className="text-[11px] text-text-secondary leading-relaxed font-medium transition-colors group-hover:text-text-primary">
                            I understand that some details could not be independently verified.
                          </span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group select-none">
                          <div className="relative flex items-center mt-0.5">
                            <input
                              type="checkbox"
                              checked={declResponsibility}
                              onChange={(e) => setDeclResponsibility(e.target.checked)}
                              className="sr-only"
                            />
                            <div className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${
                              declResponsibility 
                                ? 'bg-accent border-accent text-white' 
                                : 'bg-black/40 border-border-subtle group-hover:border-accent/60'
                            }`}>
                              {declResponsibility && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                          </div>
                          <span className="text-[11px] text-text-secondary leading-relaxed font-medium transition-colors group-hover:text-text-primary">
                            I accept responsibility for the information submitted and understand it will undergo admin review.
                          </span>
                        </label>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            )}

            {/* ACTION BUTTONS FOOTER */}
            <div className="flex justify-between items-center pt-4 border-t border-border-subtle mt-6">
              <div>
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-4 py-2.5 border border-border-subtle text-text-secondary rounded-xl hover:bg-bg-elevated hover:text-text-primary transition-all cursor-pointer text-xs font-semibold flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back
                  </button>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 border border-transparent text-text-secondary rounded-xl hover:bg-bg-elevated hover:text-text-primary transition-all cursor-pointer text-xs font-semibold"
                >
                  Cancel
                </button>

                {currentStep === 0 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white font-sans font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer text-xs active:scale-[0.98]"
                  >
                    Next Step
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : currentStep === 1 ? (
                  <button
                    type="button"
                    onClick={handleVerifyWithAI}
                    className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white font-sans font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer text-xs active:scale-[0.98] shadow-lg shadow-accent/20"
                  >
                    <Sparkles className="w-4 h-4" />
                    Verify with AI Mentor
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    disabled={
                      verificationResult.status === 'inconsistent' ||
                      ((verificationResult.status === 'needs_declaration' || verificationResult.verificationConfidence !== 'High') && 
                       (!declAccuracy || !declUnverified || !declResponsibility))
                    }
                    className={`px-5 py-2.5 font-sans font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer text-xs ${
                      (verificationResult.status !== 'inconsistent' && 
                       ((verificationResult.status !== 'needs_declaration' && verificationResult.verificationConfidence === 'High') || 
                        (declAccuracy && declUnverified && declResponsibility)))
                        ? 'bg-accent text-white hover:brightness-110 shadow-lg shadow-accent/20 active:scale-[0.98]'
                        : 'bg-border-subtle text-text-muted cursor-not-allowed opacity-60'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Submit to FailureVault
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
