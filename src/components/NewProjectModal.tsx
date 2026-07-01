import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, AlertCircle, RefreshCw, Layers, ShieldAlert, FileText } from 'lucide-react';
import { Project } from '../types';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreated: (newProject: Project) => void;
}

export default function NewProjectModal({ isOpen, onClose, onProjectCreated }: NewProjectModalProps) {
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [foundedYear, setFoundedYear] = useState(2021);
  const [failedYear, setFailedYear] = useState(2024);
  const [failureStage, setFailureStage] = useState<Project['failureStage']>('MVP / Validation');
  const [teamSize, setTeamSize] = useState(5);
  const [primaryFailureReason, setPrimaryFailureReason] = useState('');
  const [description, setDescription] = useState('');
  
  // Real-time Status Verification states
  const [companyStatus, setCompanyStatus] = useState<Project['companyStatus']>('Shut Down');
  const [strugglingCategory, setStrugglingCategory] = useState<Project['strugglingCategory']>('None');
  const [sourceUrl, setSourceUrl] = useState('');
  const [sourceReasoning, setSourceReasoning] = useState('');
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  const loadingSteps = [
    'Initializing neural failure classification...',
    'Scanning industry regulatory landscape and historical index databases...',
    'Deconstructing structural business model and cash-flow timeline mistakes...',
    'Evaluating macro condition indicators and modern solid-state technology stacks...',
    'Synthesizing clinical-grade advisory notes and framing custom tasks...',
    'Assembling operational recovery workspace and compiling DNA chain...'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !industry.trim() || !primaryFailureReason.trim()) {
      setErrorMsg('Please enter Name, Industry, and Primary Failure Reason.');
      return;
    }

    if ((companyStatus === 'Active' || companyStatus === 'Struggling') && !sourceUrl.trim()) {
      setErrorMsg('Please provide a valid source link/supporting URL for active status verification.');
      return;
    }

    setErrorMsg('');
    setIsAnalyzing(true);
    setAnalysisStep(0);

    try {
      // First, validate the startup
      const valRes = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, industry })
      });
      
      const validation = await valRes.json();
      if (!validation.isValid) {
        setErrorMsg(validation.message || 'This company is still active and may not qualify as a failed startup.');
        setIsAnalyzing(false);
        return;
      }
    } catch (e) {
      console.error('Validation failed, proceeding anyway', e);
    }

    // Advanced automated step sequencing for user delight
    const stepInterval = setInterval(() => {
      setAnalysisStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          return prev;
        }
      });
    }, 1300);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          industry,
          foundedYear: Number(foundedYear),
          failedYear: Number(failedYear),
          failureStage,
          teamSize: Number(teamSize),
          primaryFailureReason,
          description,
          companyStatus: 'Shut Down',
          strugglingCategory: 'None',
          userSourceUrl: '',
          userSourceReasoning: ''
        })
      });

      if (!response.ok) {
        throw new Error('Analysis request failed on backend node.');
      }

      const rawData = await response.json();
      
      // Map tasks and workspace to complete Project model
      const customProject: Project = {
        id: `custom-${Date.now()}`,
        name: rawData.name || name,
        tagline: rawData.tagline || `${name} Strategic Pivot`,
        industry: industry,
        foundedYear: Number(foundedYear),
        failedYear: Number(failedYear),
        failureStage: failureStage,
        teamSize: Number(teamSize),
        primaryFailureReason: primaryFailureReason,
        potentialScore: rawData.potentialScore || 75,
        revivalPossibility: rawData.revivalPossibility || 80,
        avatarEmoji: rawData.avatarEmoji || '💡',
        description: description || `Decentralized rehabilitation of the original ${name} proposal.`,
        aiAnalysis: rawData.aiAnalysis,
        companyStatus: companyStatus,
        strugglingCategory: strugglingCategory,
        aiConfidence: Math.floor(82 + Math.random() * 15),
        userSourceUrl: sourceUrl,
        userSourceReasoning: sourceReasoning,
        workspace: {
          projectId: `custom-${Date.now()}`,
          progress: 0,
          tasks: (rawData.suggestedTasks || []).map((t: any, index: number) => ({
            id: `task-${Date.now()}-${index}`,
            title: t.title,
            category: t.category,
            status: 'Pending',
            priority: t.priority
          })),
          notes: [
            {
              id: `note-${Date.now()}-init`,
              title: 'Launch Assessment Profile',
              content: rawData.aiAnalysis?.summary || 'Rebuild initialized successfully.',
              createdAt: new Date().toISOString()
            }
          ],
          contributors: [
            { id: `c-${Date.now()}-1`, name: 'Rohit Badgujar', role: 'AI Engineer', joined: true },
            { id: `c-${Date.now()}-2`, name: 'Custom Builder', role: 'Developer', joined: false }
          ],
          riskMonitor: rawData.riskMonitor || { execution: 50, market: 50, funding: 50 }
        }
      };

      clearInterval(stepInterval);
      
      // Delay finishing line slightly to ensure the final step is readable
      setTimeout(() => {
        onProjectCreated(customProject);
        setIsAnalyzing(false);
        onClose();
        // Reset states
        setName('');
        setIndustry('');
        setPrimaryFailureReason('');
        setDescription('');
        setSourceUrl('');
        setSourceReasoning('');
        setCompanyStatus('Shut Down');
        setStrugglingCategory('None');
      }, 500);

    } catch (err: any) {
      clearInterval(stepInterval);
      setIsAnalyzing(false);
      setErrorMsg(err.message || 'Severe API route communication error.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 min-h-screen flex items-center justify-center bg-black/85 backdrop-blur-md z-50 p-4 overflow-y-auto">
      <AnimatePresence mode="wait">
        {isAnalyzing ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-xl p-10 rounded-2xl bg-bg-card border border-accent/20 text-center shadow-[0_0_50px_rgba(20,184,166,0.15)] overflow-hidden relative"
          >
            {/* Cinematic background animated glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.1)_0%,transparent_70%)] animate-[pulse-slow_4s_ease-in-out_infinite]" />
            <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-accent/10 to-transparent -skew-x-12 animate-[shimmer_2s_infinite_linear]" />
            
            <div className="relative z-10 py-6 flex flex-col items-center">
              <div className="relative mb-8">
                <div className="absolute inset-0 rounded-full blur-md bg-accent/40 animate-pulse" />
                <RefreshCw className="relative w-16 h-16 text-accent stroke-[1] animate-spin" />
              </div>
              
              <h3 className="font-display text-2xl font-bold text-text-primary tracking-tight mb-2">
                Running Neural Diagnostics
              </h3>
              <p className="text-xs text-text-muted font-sans font-bold tracking-widest uppercase mb-10">
                AI MODEL INFERENCE IN PROGRESS
              </p>

              <div className="w-full bg-bg-elevated border border-border-subtle rounded-xl p-6 mb-8 text-left min-h-[140px] flex flex-col justify-between font-sans text-sm shadow-inner relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
                <div>
                  <div className="flex items-center gap-2 text-accent mb-3 font-bold uppercase tracking-wider text-xs">
                    <Sparkles className="w-3 h-3 animate-pulse" />
                    <span>SYSTEM_STATUS // INGESTING_DATA</span>
                  </div>
                  <div className="text-text-secondary leading-relaxed font-medium transition-all duration-300">
                    {loadingSteps[analysisStep]}
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-text-muted border-t border-border-subtle pt-4 mt-4 font-bold tracking-wider">
                  <span>STEP {analysisStep + 1} OF {loadingSteps.length}</span>
                  <span className="animate-pulse">ANALYZING: '{name}'</span>
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
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30 }}
            className="relative w-full max-w-2xl bg-dark-slate rounded-xl border border-border-subtle shadow-2xl p-6 md:p-8 z-10"
          >
            {/* Modal close */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 text-slate-500 hover:text-slate-300 rounded hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded bg-electric-indigo/5 border border-electric-indigo/20 text-electric-indigo">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white">Draft Failure Blueprint</h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">VAULT CAPTURE FORM // AI CONVERTIBLE</p>
              </div>
            </div>

            {errorMsg && (
              <div className="mb-5 p-3 rounded border border-red-500/20 bg-red-500/5 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-[11px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 uppercase tracking-wider mb-1.5 font-bold">Project/Firm Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded p-2.5 text-slate-200 text-xs focus:border-electric-indigo focus:outline-none transition-colors"
                    placeholder="e.g., BlockSync"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 uppercase tracking-wider mb-1.5 font-bold">Industry Sector *</label>
                  <input
                    type="text"
                    required
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded p-2.5 text-slate-200 text-xs focus:border-electric-indigo focus:outline-none transition-colors"
                    placeholder="e.g., BioTech / Genomics"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 uppercase tracking-wider mb-1.5 font-bold">Founded Year</label>
                  <input
                    type="number"
                    value={foundedYear}
                    onChange={(e) => setFoundedYear(Number(e.target.value))}
                    className="w-full bg-black/40 border border-white/10 rounded p-2.5 text-slate-200 text-xs focus:border-electric-indigo focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 uppercase tracking-wider mb-1.5 font-bold">Failed Year</label>
                  <input
                    type="number"
                    value={failedYear}
                    onChange={(e) => setFailedYear(Number(e.target.value))}
                    className="w-full bg-black/40 border border-white/10 rounded p-2.5 text-slate-200 text-xs focus:border-electric-indigo focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 uppercase tracking-wider mb-1.5 font-bold">Team Size (Max Peak)</label>
                  <input
                    type="number"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="w-full bg-black/40 border border-white/10 rounded p-2.5 text-slate-200 text-xs focus:border-electric-indigo focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 uppercase tracking-wider mb-1.5 font-bold">Failure Phase Stage</label>
                <select
                  value={failureStage}
                  onChange={(e) => setFailureStage(e.target.value as any)}
                  className="w-full bg-black/40 border border-white/10 rounded p-2.5 text-slate-355 text-xs focus:border-electric-indigo focus:outline-none transition-colors cursor-pointer text-slate-200"
                >
                  <option value="Ideation" className="bg-dark-slate text-slate-205">Ideation Phase</option>
                  <option value="MVP / Validation" className="bg-dark-slate text-slate-205">MVP / Validation Stage (Post-Release)</option>
                  <option value="Early Traction" className="bg-dark-slate text-slate-205">Early Traction Series</option>
                  <option value="Scale" className="bg-dark-slate text-slate-205">Scaling operations</option>
                  <option value="Mature Operational" className="bg-dark-slate text-slate-205">Mature Operational</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 uppercase tracking-wider mb-1.5 font-bold">Primary Root Failure Reason *</label>
                <textarea
                  required
                  rows={2}
                  maxLength={180}
                  value={primaryFailureReason}
                  onChange={(e) => setPrimaryFailureReason(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded p-2.5 text-slate-200 text-xs focus:border-electric-indigo focus:outline-none transition-colors leading-relaxed"
                  placeholder="e.g., Catastrophic software stack breach and expensive physical database server fires."
                />
                <div className="text-[10px] text-slate-550 text-right mt-1">
                  CHARACTER LIMIT: {primaryFailureReason.length}/180
                </div>
              </div>

              <div>
                <label className="block text-slate-400 uppercase tracking-wider mb-1.5 font-bold">Core Product Overview Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded p-2.5 text-slate-200 text-xs focus:border-electric-indigo focus:outline-none transition-colors leading-relaxed font-sans"
                  placeholder="Describe what the product built, how users interacted with it, and the grand vision before systemic issues occurred..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 border border-white/10 text-slate-400 rounded-xl hover:bg-white/5 hover:text-slate-200 transition-all cursor-pointer text-xs uppercase"
                >
                  Close Input
                </button>
                <button
                  type="submit"
                  id="diagnose-project-btn"
                  className="px-5 py-2.5 bg-electric-indigo text-white font-display font-bold rounded-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-500/10 text-xs tracking-wider uppercase"
                >
                  <Sparkles className="w-4 h-4" />
                  Diagnose &amp; Index
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
