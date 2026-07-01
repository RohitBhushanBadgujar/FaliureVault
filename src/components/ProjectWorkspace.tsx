import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Cpu, Plus, CheckCircle, Circle, 
  Trash2, ShieldAlert, Sparkles, Send, FileText, 
  UserPlus, UserCheck, Save, ClipboardList, LineChart, MessageSquare, BookOpen, Layers, Users, Zap, Search, AlertTriangle
} from 'lucide-react';
import { Project, Task, Note, Contributor, Workspace } from '../types';

interface ProjectWorkspaceProps {
  project: Project;
  onBackToVault: () => void;
  onUpdateWorkspace: (workspace: Workspace) => void;
}

export default function ProjectWorkspace({ project, onBackToVault, onUpdateWorkspace }: ProjectWorkspaceProps) {
  const [tasks, setTasks] = useState<Task[]>(project.workspace?.tasks || []);
  const [notes, setNotes] = useState<Note[]>(project.workspace?.notes || []);
  const [contributors, setContributors] = useState<Contributor[]>(() => {
    // Ensure we pre-populate the 4 key roles: Developer, Designer, Marketer, Researcher
    const existing = project.workspace?.contributors || [];
    const standardRoles: Contributor[] = [
      { id: 'role-dev', name: 'Alex Rivera', role: 'Developer', joined: false },
      { id: 'role-des', name: 'Sophia Chen', role: 'Designer', joined: false },
      { id: 'role-mkt', name: 'Liam Davies', role: 'Marketer', joined: false },
      { id: 'role-res', name: 'Nisha Patil', role: 'Researcher', joined: false }
    ];
    
    // Merge or keep existing
    if (existing.length === 0) return standardRoles;
    return existing;
  });
  
  // Clean, simple 5-section tabs state as requested: AI Advice, Tasks, Notes, Progress, Team
  const [activeTab, setActiveTab] = useState<'ai-advice' | 'tasks' | 'notes' | 'progress' | 'team'>('ai-advice');

  // Input states
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<Task['category']>('Research');
  const [newTaskPriority, setNewTaskPriority] = useState<Task['priority']>('High');

  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  // AI interactive strategist (AI Investigator Mode)
  const [aiMessageInput, setAiMessageInput] = useState('');
  const [advisorLogs, setAdvisorLogs] = useState<Array<{ sender: 'ai' | 'user'; text: string; time: string; isInvestigatorSignal?: boolean }>>([
    { 
      sender: 'ai', 
      text: `Hi! I'm your AI advisor. Let's explore how to rebuild "${project.name}" smarter. Ask me about strategic mistakes, hidden product risks, or rapid validation experiments.`, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }
  ]);
  const [isAiAnswering, setIsAiAnswering] = useState(false);

  // Recalculate dynamic progress
  const completedCount = tasks.filter(t => t.status === 'Completed').length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  // Track dynamic risk values
  const getCategoryRiskValue = (category: Task['category'], initialRisk: number) => {
    const categoryTasks = tasks.filter(t => t.category === category);
    if (categoryTasks.length === 0) return initialRisk;
    const completedCatCount = categoryTasks.filter(t => t.status === 'Completed').length;
    const reductionAmount = completedCatCount / categoryTasks.length;
    const finalRisk = Math.round(initialRisk - (initialRisk * 0.75 * reductionAmount));
    return Math.max(12, finalRisk);
  };

  const initialExec = project.workspace?.riskMonitor.execution || 70;
  const initialMarket = project.workspace?.riskMonitor.market || 65;
  const initialFunding = project.workspace?.riskMonitor.funding || 80;

  const currentExecutionRisk = getCategoryRiskValue('MVP Rebuild', initialExec);
  const currentMarketRisk = getCategoryRiskValue('Market Validation', initialMarket);
  const currentFundingRisk = getCategoryRiskValue('Capital / Funding', initialFunding);

  // Sync workspace back to parent cleanly using references
  const updateCallbackRef = React.useRef(onUpdateWorkspace);
  useEffect(() => {
    updateCallbackRef.current = onUpdateWorkspace;
  }, [onUpdateWorkspace]);

  const syncStateKey = JSON.stringify({
    tasks: tasks.map(t => t.id + t.status),
    notes: notes.map(n => n.id + n.title + n.content),
    contributors: contributors.map(c => c.id + String(c.joined))
  });

  useEffect(() => {
    updateCallbackRef.current({
      projectId: project.id,
      progress: progressPercent,
      tasks,
      notes,
      contributors,
      riskMonitor: {
        execution: currentExecutionRisk,
        market: currentMarketRisk,
        funding: currentFundingRisk
      }
    });
  }, [syncStateKey, progressPercent, currentExecutionRisk, currentMarketRisk, currentFundingRisk, project.id]);

  // Tasks actions
  const handleToggleTaskStatus = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' };
      }
      return t;
    }));
  };

  const handleAddNewTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      status: 'Pending',
      priority: newTaskPriority
    };

    setTasks(prev => [newTask, ...prev]);
    setNewTaskTitle('');

    // Instant reassuring feedback post-mortems advice
    setTimeout(() => {
      setAdvisorLogs(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `💡 **Tip**: To safely tackle "${newTask.title}", avoid heavy engineering or spending capital early. Try to validate with a simple landing page or wireframe first.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  const handleDeleteTaskItem = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // Notes actions
  const handleSaveWorkspaceNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;

    const newNote: Note = {
      id: `note-${Date.now()}`,
      title: newNoteTitle.trim(),
      content: newNoteContent.trim(),
      createdAt: new Date().toISOString()
    };

    setNotes(prev => [newNote, ...prev]);
    setNewNoteTitle('');
    setNewNoteContent('');
  };

  const handleDeleteWorkspaceNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  // Recruiting action
  const handleToggleRecruitContributor = (id: string) => {
    setContributors(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, joined: !c.joined };
      }
      return c;
    }));
  };

  // Dedicated Investigator prompt launcher
  const handleLaunchInvestigatorScan = async (focusArea: 'mistakes' | 'risk' | 'timeline' | 'timing') => {
    setIsAiAnswering(true);
    let userPrompt = '';
    let visualTag = '';
    
    if (focusArea === 'mistakes') {
      userPrompt = 'What were the primary mistakes and hidden oversights? Focus on customer validation.';
      visualTag = 'MISTAKES';
    } else if (focusArea === 'risk') {
      userPrompt = 'What are the biggest risks? What did they completely miss?';
      visualTag = 'RISKS';
    } else if (focusArea === 'timeline') {
      userPrompt = 'Can you reconstruct the failure timeline showing the steps of this project?';
      visualTag = 'TIMELINE';
    } else {
      userPrompt = 'Can this succeed today? What technology or market conditions have changed?';
      visualTag = 'OPPORTUNITY';
    }

    setAdvisorLogs(prev => [
      ...prev,
      {
        sender: 'user',
        text: userPrompt,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: project.name,
          industry: project.industry,
          primaryFailureReason: project.primaryFailureReason,
          description: userPrompt
        })
      });

      if (!response.ok) throw new Error();
      const resData = await response.json();
      
      let reply = '';
      if (focusArea === 'mistakes') {
        reply = `💡 **[AI SUGGESTION: CORE MISTAKES]**\n\n` +
                `* **Hidden Mistake 1**: ${resData.aiAnalysis?.keyMistakes?.[0] || 'High upfront development burn on untested interfaces.'}\n` +
                `* **Hidden Mistake 2**: ${resData.aiAnalysis?.keyMistakes?.[1] || 'Spending capital on operations before product market validation.'}\n` +
                `* **What They Missed**: They lacked early user interviews. They assumed customers would tolerate steep setup costs instead of building a software middleware loop.\n\n` +
                `👉 **What Should Have Happened**: They should have validated interest with a 50-person email pre-sign list before ordering or renting custom gear.`;
      } else if (focusArea === 'risk') {
        reply = `⚠️ **[AI SUGGESTION: RISK EVALUATION]**\n\n` +
                `* **Biggest Risk Factor**: ${resData.aiAnalysis?.newRisks?.[0] || 'Proprietary hosting setup and compliance bottlenecks'}\n` +
                `* **What Went Wrong**: ${resData.aiAnalysis?.summary || 'The venture spent pre-sales revenue too fast on secondary processes'}\n` +
                `* **Modern Risk Warning**: If you rebuild this today, your biggest danger is feature cloning by existing heavy aggregators. Keep your MVP lean.`;
      } else if (focusArea === 'timeline') {
        reply = `⏳ **[AI SUGGESTION: FAILURE TIMELINE]**\n\n` +
                `* **Week 1**: Strong excitement. The founders conceptualized the deep stack.\n` +
                `* **Week 4 (The Drift)**: Core development initiated. 0 prospective user interviews completed.\n` +
                `* **Week 12 (High Burn)**: Prototype created. High capital/setup cost. No actual client traction.\n` +
                `* **Week 16 (The Collapse)**: Blockers materialized: "${project.primaryFailureReason.substring(0, 80)}...". Cash depleted, operations terminated.`;
      } else {
        reply = `🔋 **[AI SUGGESTION: WHY V2 CAN WORK]**\n\n` +
                `* **Market Pivot**: ${resData.aiAnalysis?.marketOpportunity || 'High software integrations opportunity.'}\n` +
                `* **Timing triggers**: ${resData.aiAnalysis?.advisoryAnswers?.changedMarketConditions || 'Low cloud cost and modern cloud tools.'}\n` +
                `* **The V2 Vision**: ${resData.aiAnalysis?.advisoryAnswers?.v2ProductVision || 'A modular software service with near-$0 running bills.'}`;
      }

      setAdvisorLogs(prev => [
        ...prev,
        {
          sender: 'ai',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isInvestigatorSignal: true
        }
      ]);
    } catch {
      setAdvisorLogs(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `💡 **[AI SUGGESTION]**\n\nFor ${project.name}, the root cause was high cash burning rate and early custom software overhead. To rebuild this safely, replace custom servers with serverless functions and pre-sell your concept using an interactive wireframe.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isInvestigatorSignal: true
        }
      ]);
    } finally {
      setIsAiAnswering(false);
    }
  };

  // Custom chat message
  const handleSendCustomAiMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiMessageInput.trim()) return;

    const queryText = aiMessageInput.trim();
    setAdvisorLogs(prev => [
      ...prev,
      {
        sender: 'user',
        text: queryText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setAiMessageInput('');
    setIsAiAnswering(true);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: project.name,
          industry: project.industry,
          primaryFailureReason: project.primaryFailureReason,
          description: queryText
        })
      });

      if (!response.ok) throw new Error();
      const responseJson = await response.json();
      
      const advice = responseJson.aiAnalysis?.summary || 
                     `I suggest focusing on customer interviewing. Keep the database configuration standard and offline in local storage first.`;

      const styledAdvice = `💡 **[AI SUGGESTION]**\n\n${advice}\n\n* **Suggested Prevention**: Avoid pre-buying physical components or renting large server nodes until 5 users request mock reports.`;

      setAdvisorLogs(prev => [
        ...prev,
        {
          sender: 'ai',
          text: styledAdvice,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch {
      setAdvisorLogs(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `💡 **[AI SUGGESTION]**: That approach holds value for ${project.name}. However, make sure you don't build anything more than a clean, static showcase landing page first to register client clicks. Keep cash consumption at $0.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsAiAnswering(false);
    }
  };

  return (
    <div id="rebuild-mode-canvas" className="w-full max-w-5xl mx-auto font-sans">
      
      {/* Workspace top-bar */}
      <div id="rebuild-canvas-top-bar" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <button
          onClick={onBackToVault}
          className="group inline-flex items-center gap-2 px-4 py-2 border border-border-subtle bg-bg-elevated hover:bg-bg-card rounded-lg text-xs font-medium text-text-secondary hover:text-text-primary transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Vault
        </button>

        <div className="flex items-center gap-2 text-xs font-sans text-text-muted bg-bg-elevated px-4 py-2 rounded-lg border border-border-subtle uppercase tracking-widest font-medium">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span>Project Workspace</span>
        </div>
      </div>

      {/* Main Mini Dashboard Banner */}
      <div id="rebuild-mode-banner" className="p-6 md:p-8 rounded-2xl glass-panel bg-bg-card border border-border-subtle shadow-lg mb-8 relative overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-left">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-3xl p-2 bg-bg-elevated rounded-xl border border-border-subtle">{project.avatarEmoji}</span>
              <div>
                <h2 className="font-display font-bold text-2xl text-text-primary tracking-tight">
                  {project.name}
                </h2>
                <p className="text-xs text-text-secondary mt-1 line-clamp-1 italic">{project.tagline}</p>
              </div>
            </div>
          </div>

          <div id="rebuild-banner-progress">
            <div className="flex justify-between items-end text-xs font-sans text-text-secondary font-medium mb-2">
              <span>WORKSPACE PROGRESS</span>
              <span className="text-accent font-bold">{progressPercent}%</span>
            </div>
            
            <div className="w-full bg-bg-elevated h-2 rounded-full overflow-hidden border border-border-subtle">
              <div 
                className="h-full bg-accent rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(var(--accent-primary-rgb),0.5)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-around border-t md:border-t-0 md:border-l border-border-subtle pt-4 md:pt-0 pl-0 md:pl-8 text-center">
            <div>
              <span className="text-[10px] font-sans text-text-muted uppercase block font-medium">Monthly Burn</span>
              <span className="text-lg font-bold text-text-primary mt-1 block">$0</span>
              <span className="text-[9px] text-success font-sans bg-success/10 border border-success/20 px-1.5 py-0.5 rounded-md mt-1 inline-block font-bold uppercase tracking-wider">BOOTSTRAPPED</span>
            </div>
            <div className="border-l border-border-subtle pl-8">
              <span className="text-[10px] font-sans text-text-muted uppercase block font-medium">Team Load</span>
              <span className="text-lg font-bold text-accent mt-1 block">
                {contributors.filter(c => c.joined).length} / 4
              </span>
              <span className="text-[9px] text-text-secondary font-sans mt-1 block uppercase tracking-wider">Collaborators</span>
            </div>
          </div>
        </div>
      </div>

      {/* "YOU MAY REPEAT THIS FAILURE" Prevention Module Banner if any risk exceeds 50% */}
      {(currentExecutionRisk > 50 || currentMarketRisk > 50 || currentFundingRisk > 50) && (
        <div id="repeat-failure-warning" className="p-5 mb-8 bg-danger/10 border border-danger/20 rounded-2xl text-left flex items-start gap-4 shadow-sm">
          <AlertTriangle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="font-sans font-bold text-danger uppercase tracking-wide block mb-1.5">⚠️ Warning: High Risk of Failure</span>
            <p className="text-text-secondary font-sans leading-relaxed">
              Based on your current progress, you are repeating the same mistakes. Startups in <strong className="text-text-primary font-bold">{project.industry}</strong> collapse 92% of the time due to <strong className="text-text-primary font-bold">weak customer validation</strong>. Ensure you check off the "validation" tasks first before enlisting a designer or writing custom code!
            </p>
          </div>
        </div>
      )}

      {/* Standardized 5-section tabs selector */}
      <div id="rebuild-section-tabs" className="flex border-b border-border-subtle mb-8 overflow-x-auto text-sm whitespace-nowrap gap-2">
        {[
          { id: 'ai-advice', label: 'AI Advice', icon: MessageSquare, color: 'text-accent' },
          { id: 'tasks', label: 'Tasks', icon: ClipboardList, color: 'text-accent' },
          { id: 'notes', label: 'Notes', icon: FileText, color: 'text-accent' },
          { id: 'progress', label: 'Risks', icon: LineChart, color: 'text-accent' },
          { id: 'team', label: 'Team', icon: Users, color: 'text-accent' }
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-4 border-b-2 font-sans font-medium transition-all cursor-pointer ${
                isSelected 
                  ? 'border-accent text-text-primary bg-bg-elevated' 
                  : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-card'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? tab.color : 'text-text-muted'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT AREA */}
      <div id="workspace-subtab-viewer" className="text-left">
        <AnimatePresence mode="wait">
          
        {/* TAB 1: AI Advice */}
        {activeTab === 'ai-advice' && (
          <motion.div 
            key="ai-advice"
            initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
            transition={{ duration: 0.3 }}
            id="tab-ai-advice" 
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Chat container */}
            <div className="lg:col-span-2 p-6 bg-bg-card border border-border-subtle rounded-2xl flex flex-col justify-between min-h-[420px] relative shadow-sm">
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 bg-accent/10 border border-accent/20 text-accent font-sans font-medium text-xs uppercase rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                AI Advisor
              </div>

              <div>
                <span className="block font-sans text-xs text-text-muted font-bold uppercase tracking-widest mb-3">// ADVISORY LOGS</span>
                
                <div className="space-y-4 max-h-[360px] overflow-y-auto bg-bg-elevated border border-border-subtle rounded-xl p-4 mb-4 scrollbar">
                  {advisorLogs.map((log, index) => (
                    <div key={index} className={`flex flex-col ${log.sender === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`p-4 rounded-2xl max-w-[90%] text-sm leading-relaxed shadow-sm ${
                        log.sender === 'user' 
                          ? 'bg-accent text-white font-medium' 
                          : 'bg-bg-card border border-border-subtle text-text-primary'
                      }`}>
                        <div className="whitespace-pre-wrap">{log.text}</div>
                        <span className="block text-[10px] opacity-70 mt-2 font-mono text-right uppercase tracking-wider">
                          {log.sender === 'user' ? 'YOU' : 'AI ADVISOR'} • {log.time}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {isAiAnswering && (
                    <div className="flex flex-col items-start p-4 bg-bg-card border border-accent/20 shadow-[0_0_15px_rgba(20,184,166,0.1)] rounded-2xl max-w-[80%] relative overflow-hidden">
                      <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-accent/10 to-transparent -skew-x-12 animate-[shimmer_1.5s_infinite_linear]" />
                      <div className="flex items-center gap-2 mb-3">
                        <Cpu className="w-4 h-4 text-accent animate-pulse" />
                        <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-accent animate-pulse">
                          Strategist Generating Analysis
                        </span>
                      </div>
                      <div className="w-full space-y-2.5">
                        <div className="h-2 bg-bg-elevated rounded animate-pulse w-3/4"></div>
                        <div className="h-2 bg-bg-elevated rounded animate-pulse w-5/6"></div>
                        <div className="h-2 bg-bg-elevated rounded animate-pulse w-1/2"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendCustomAiMessage} className="flex gap-3 pt-2">
                <input
                  type="text"
                  required
                  value={aiMessageInput}
                  onChange={(e) => setAiMessageInput(e.target.value)}
                  className="w-full bg-bg-elevated border border-border-subtle rounded-xl p-3.5 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
                  placeholder="Ask for advice (e.g. 'How do we pre-sell this without coding?')..."
                />
                <button
                  type="submit"
                  disabled={isAiAnswering}
                  className="px-6 py-3 bg-bg-elevated hover:bg-bg-card text-accent border border-border-subtle hover:border-accent/40 rounded-xl font-sans font-bold text-sm uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  Ask
                </button>
              </form>
            </div>

            {/* AI Investigator Shortcuts sidebar */}
            <div className="p-6 bg-bg-card border border-border-subtle rounded-2xl space-y-5 shadow-sm">
              <span className="block font-sans text-xs text-text-muted font-bold uppercase tracking-widest">// EXPLORE</span>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleLaunchInvestigatorScan('mistakes')}
                  className="w-full text-left p-4 rounded-xl bg-bg-elevated hover:bg-bg-card border border-border-subtle hover:border-accent text-sm transition-all cursor-pointer group flex items-start gap-3 shadow-sm hover:shadow-md"
                >
                  <Search className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-text-primary block">Diagnose Hidden Mistakes</span>
                    <p className="text-xs text-text-secondary mt-1">Why they failed and where we pivot.</p>
                  </div>
                </button>

                <button
                  onClick={() => handleLaunchInvestigatorScan('risk')}
                  className="w-full text-left p-4 rounded-xl bg-bg-elevated hover:bg-bg-card border border-border-subtle hover:border-warning text-sm transition-all cursor-pointer group flex items-start gap-3 shadow-sm hover:shadow-md"
                >
                  <ShieldAlert className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-text-primary block">Map Major Risks</span>
                    <p className="text-xs text-text-secondary mt-1">Identify factors they completely missed.</p>
                  </div>
                </button>

                <button
                  onClick={() => handleLaunchInvestigatorScan('timeline')}
                  className="w-full text-left p-4 rounded-xl bg-bg-elevated hover:bg-bg-card border border-border-subtle hover:border-accent text-sm transition-all cursor-pointer group flex items-start gap-3 shadow-sm hover:shadow-md"
                >
                  <Zap className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-text-primary block">Reconstruct Timeline</span>
                    <p className="text-xs text-text-secondary mt-1">Chronological failure tracking.</p>
                  </div>
                </button>

                <button
                  onClick={() => handleLaunchInvestigatorScan('timing')}
                  className="w-full text-left p-4 rounded-xl bg-bg-elevated hover:bg-bg-card border border-border-subtle hover:border-success text-sm transition-all cursor-pointer group flex items-start gap-3 shadow-sm hover:shadow-md"
                >
                  <Sparkles className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-text-primary block">Why This Works Today?</span>
                    <p className="text-xs text-text-secondary mt-1">Explore 2026 market opportunities.</p>
                  </div>
                </button>
              </div>

              <div className="p-4 bg-bg-elevated rounded-xl border border-border-subtle text-xs leading-relaxed text-text-secondary font-medium shadow-inner">
                💡 Ask the AI Advisor about: <strong className="text-text-primary">"How to find my first 5 customers without writing code"</strong> or <strong className="text-text-primary">"Easiest ways to validate this idea"</strong>.
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: Tasks */}
        {activeTab === 'tasks' && (
          <motion.div 
            key="tasks"
            initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
            transition={{ duration: 0.3 }}
            id="tab-tasks" 
            className="p-6 bg-bg-card border border-border-subtle rounded-2xl space-y-6 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-b border-border-subtle pb-5">
              <div>
                <span className="font-sans text-xs text-text-muted font-bold uppercase tracking-widest block mb-1">// TASKS</span>
                <h3 className="font-display font-bold text-text-primary text-lg">Project Tasks</h3>
              </div>

              {/* Mini form to add custom checks */}
              <form onSubmit={handleAddNewTaskSubmit} className="flex flex-wrap gap-3 items-center">
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="bg-bg-elevated border border-border-subtle rounded-xl px-4 py-2.5 text-sm text-text-primary w-full sm:w-64 focus:border-accent focus:outline-none transition-colors"
                  placeholder="Task description..."
                />
                
                <select
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value as any)}
                  className="bg-bg-elevated border border-border-subtle rounded-xl px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary focus:outline-none cursor-pointer transition-colors"
                >
                  <option value="Research">Research</option>
                  <option value="MVP Rebuild">MVP Rebuild</option>
                  <option value="Market Validation">Validation</option>
                  <option value="Capital / Funding">Capital / Funding</option>
                </select>

                <button
                  type="submit"
                  className="p-2.5 bg-accent text-white hover:brightness-110 rounded-xl cursor-pointer font-bold flex items-center justify-center transition-all shadow-sm"
                >
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                </button>
              </form>
            </div>

            {/* Task list container */}
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar">
              {tasks.length === 0 ? (
                <div className="text-center py-12 text-text-muted font-sans text-sm font-medium">
                  No tasks yet. Create one to get started.
                </div>
              ) : (
                tasks.map((task) => {
                  const isDone = task.status === 'Completed';
                  return (
                    <div 
                      key={task.id} 
                      className={`p-4 rounded-xl flex items-center justify-between gap-4 border transition-all shadow-sm ${
                        isDone 
                          ? 'bg-bg-elevated border-success/20 text-text-muted' 
                          : 'bg-bg-card border-border-subtle text-text-primary hover:border-text-muted hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleToggleTaskStatus(task.id)}
                          className="text-text-muted hover:text-accent transition-colors cursor-pointer shrink-0"
                        >
                          {isDone ? (
                            <CheckCircle className="w-6 h-6 text-success fill-success/10" />
                          ) : (
                            <Circle className="w-6 h-6" />
                          )}
                        </button>
                        
                        <div>
                          <span className={`${isDone ? 'line-through opacity-70 font-light' : 'font-medium'} text-sm block mb-1.5`}>
                            {task.title}
                          </span>
                          
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-sans font-bold uppercase px-2 py-0.5 rounded-md border tracking-wider ${
                              task.category === 'Research' ? 'bg-accent/10 text-accent border-accent/20' :
                              task.category === 'MVP Rebuild' ? 'bg-accent/10 text-accent border-accent/20' :
                              task.category === 'Market Validation' ? 'bg-success/10 text-success border-success/20' :
                              'bg-warning/10 text-warning border-warning/20'
                            }`}>
                              {task.category}
                            </span>

                            <span className={`text-[10px] font-sans font-bold uppercase tracking-wider ${
                              task.priority === 'High' ? 'text-danger' : 'text-text-muted'
                            }`}>
                              {task.priority} Priority
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteTaskItem(task.id)}
                        className="text-text-muted hover:text-danger p-2 transition-colors cursor-pointer rounded-lg hover:bg-danger/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 3: Notes */}
        {activeTab === 'notes' && (
          <motion.div 
            key="notes"
            initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
            transition={{ duration: 0.3 }}
            id="tab-notes" 
            className="space-y-6"
          >
            <div className="p-6 bg-bg-card border border-border-subtle rounded-2xl shadow-sm">
              <span className="block font-sans text-xs text-text-muted font-bold uppercase tracking-widest mb-4">// PROJECT NOTES</span>
              
              <form onSubmit={handleSaveWorkspaceNote} className="space-y-4">
                <input
                  type="text"
                  required
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  className="w-full bg-bg-elevated border border-border-subtle rounded-xl p-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
                  placeholder="Note Title (e.g. 'Customer Interview Feedback 1')"
                />
                
                <textarea
                  required
                  rows={4}
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  className="w-full bg-bg-elevated border border-border-subtle rounded-xl p-4 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none leading-relaxed transition-colors resize-none"
                  placeholder="Write down startup ideas, validation metrics, lessons, or alternative tech stacks here..."
                />

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-accent text-white hover:brightness-110 text-sm font-sans font-bold rounded-xl tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                  >
                    <Save className="w-4 h-4 stroke-[2.5]" />
                    Save Note
                  </button>
                </div>
              </form>
            </div>

            {/* Notes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {notes.length === 0 ? (
                <div className="md:col-span-2 text-center py-12 bg-bg-card border border-border-subtle rounded-2xl text-text-muted font-sans text-sm font-medium shadow-sm">
                  No notes yet. Add a note above.
                </div>
              ) : (
                notes.map((note) => (
                  <div key={note.id} className="p-5 bg-bg-card border border-border-subtle rounded-2xl flex flex-col justify-between group relative shadow-sm hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex items-center justify-between border-b border-border-subtle pb-3 mb-3">
                        <span className="text-sm font-bold text-text-primary block truncate pr-8">{note.title}</span>
                        <button
                          onClick={() => handleDeleteWorkspaceNote(note.id)}
                          className="text-text-muted hover:text-danger p-1.5 rounded-lg transition-colors cursor-pointer shrink-0 absolute top-3 right-3 hover:bg-danger/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <p className="text-sm text-text-secondary font-sans leading-relaxed whitespace-pre-wrap">{note.content}</p>
                    </div>

                    <div className="text-[10px] font-sans font-bold text-text-muted mt-4 pt-3 border-t border-border-subtle uppercase tracking-widest">
                      Created • {new Date(note.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 4: Progress */}
        {activeTab === 'progress' && (
          <motion.div 
            key="progress"
            initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
            transition={{ duration: 0.3 }}
            id="tab-progress" 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            
            {/* Risk Levels Gauge */}
            <div className="md:col-span-2 p-6 bg-bg-card border border-border-subtle rounded-2xl space-y-6 shadow-sm">
              <div>
                <span className="font-sans text-xs text-text-muted font-bold uppercase tracking-widest block mb-1">// VULNERABILITY</span>
                <h3 className="font-display font-bold text-text-primary text-lg">Risk Scores</h3>
                <p className="text-sm text-text-secondary mt-1 font-sans leading-relaxed">
                  Every checkbox marked under the corresponding categories reduces startup collapse risk in the simulation dashboard below.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Build Risk */}
                <div className="p-5 bg-bg-elevated border border-border-subtle rounded-xl shadow-inner">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-text-primary">Build Risk</span>
                    <span className={`text-sm font-bold ${currentExecutionRisk > 45 ? 'text-danger' : 'text-success'}`}>
                      {currentExecutionRisk}%
                    </span>
                  </div>
                  <div className="w-full bg-bg-card h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${currentExecutionRisk > 45 ? 'bg-danger' : 'bg-success'} transition-all duration-500`}
                      style={{ width: `${currentExecutionRisk}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mt-4">Reduced by building simpler software first.</p>
                </div>

                {/* Market Risk */}
                <div className="p-5 bg-bg-elevated border border-border-subtle rounded-xl shadow-inner">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-text-primary">Customer Risk</span>
                    <span className={`text-sm font-bold ${currentMarketRisk > 45 ? 'text-danger' : 'text-success'}`}>
                      {currentMarketRisk}%
                    </span>
                  </div>
                  <div className="w-full bg-bg-card h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${currentMarketRisk > 45 ? 'bg-danger' : 'bg-success'} transition-all duration-500`}
                      style={{ width: `${currentMarketRisk}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mt-4">Reduced by interviewing real customers.</p>
                </div>

                {/* Money Risk */}
                <div className="p-5 bg-bg-elevated border border-border-subtle rounded-xl shadow-inner">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-text-primary">Money Risk</span>
                    <span className={`text-sm font-bold ${currentFundingRisk > 45 ? 'text-danger' : 'text-success'}`}>
                      {currentFundingRisk}%
                    </span>
                  </div>
                  <div className="w-full bg-bg-card h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${currentFundingRisk > 45 ? 'bg-danger' : 'bg-success'} transition-all duration-500`}
                      style={{ width: `${currentFundingRisk}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold mt-4">Reduced by starting with $0 boot-strap capital.</p>
                </div>
              </div>

              {/* Recovery stats dashboard overview */}
              <div className="p-5 bg-bg-elevated border border-border-subtle rounded-xl text-sm space-y-3">
                <span className="font-sans text-[10px] font-bold text-success uppercase tracking-wider block">💡 CAPITAL EFFICIENCY RULES</span>
                <div className="grid grid-cols-2 gap-3 font-sans font-medium text-text-secondary">
                  <div className="flex items-center gap-2">
                    <span className="text-success font-bold select-none">✓</span>
                    <span>No raw warehouse stack orders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-success font-bold select-none">✓</span>
                    <span>No complex licensing setup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-success font-bold select-none">✓</span>
                    <span>1 week maximum build timeline</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-success font-bold select-none">✓</span>
                    <span>100% cloud-free server tiers</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Circular Gauge */}
            <div className="p-6 bg-bg-card border border-border-subtle rounded-2xl flex flex-col justify-between items-center text-center shadow-sm">
              <div>
                <span className="font-sans text-xs text-text-muted font-bold uppercase tracking-widest block mb-1">// PROGRESS</span>
                <h4 className="font-display font-bold text-text-primary text-lg mt-1">Workspace Completed</h4>
              </div>

              {/* Beautiful custom visual circle */}
              <div className="relative w-32 h-32 my-6 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="54"
                    className="stroke-bg-elevated fill-transparent"
                    strokeWidth="8"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="54"
                    className="stroke-accent fill-transparent transition-all duration-700"
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 54}
                    strokeDashoffset={2 * Math.PI * 54 * (1 - progressPercent / 100)}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-bold text-text-primary">{progressPercent}%</span>
                  <span className="text-[10px] font-sans font-bold text-text-muted uppercase tracking-widest mt-1">done</span>
                </div>
              </div>

              <div className="text-sm text-text-secondary font-sans leading-relaxed mt-4">
                You have completed <strong className="text-text-primary">{completedCount} of {tasks.length}</strong> planned validation gates successfully here.
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 5: Team */}
        {activeTab === 'team' && (
          <motion.div 
            key="team"
            initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
            transition={{ duration: 0.3 }}
            id="tab-team" 
            className="p-6 bg-bg-card border border-border-subtle rounded-2xl space-y-6 shadow-sm"
          >
            <div>
              <span className="font-sans text-xs text-text-muted font-bold uppercase tracking-widest block mb-1">// COLLABORATORS</span>
              <h3 className="font-display font-bold text-text-primary text-lg">Team Members</h3>
              <p className="text-sm text-text-secondary mt-2 font-sans leading-relaxed">
                Helpers stay idle until requested. Recruiting too many members too early increases project focus complexity. Keep it lean!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {contributors.map((c) => (
                <div 
                  key={c.id} 
                  className={`p-5 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                    c.joined 
                      ? 'bg-accent/5 border-accent/20 shadow-sm' 
                      : 'bg-bg-elevated border-border-subtle hover:border-text-muted hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-text-primary">{c.name}</span>
                      <span className={`text-[10px] font-sans font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                        c.joined ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-bg-card border border-border-subtle text-text-muted'
                      }`}>
                        {c.joined ? 'ACTIVE' : 'IDLE'}
                      </span>
                    </div>
                    
                    <span className="text-sm font-sans text-text-secondary block font-medium mt-0.5">{c.role}</span>
                    <p className="text-xs text-text-secondary font-sans mt-2 leading-relaxed">
                      {c.role === 'Developer' ? 'Compiles lightning-fast static showcases and landing pages.' :
                       c.role === 'Designer' ? 'Creates clean display banners and responsive asset flows.' :
                       c.role === 'Researcher' ? 'Collects offline telemetry results and analyzes competitors.' :
                       'Optimizes distribution angles and schedules search validations.'}
                    </p>
                  </div>

                  <button
                    onClick={() => handleToggleRecruitContributor(c.id)}
                    className={`px-4 py-2 rounded-xl transition-all font-sans font-bold text-xs uppercase tracking-wider shrink-0 cursor-pointer shadow-sm ${
                      c.joined 
                        ? 'bg-accent hover:brightness-110 text-white border border-accent' 
                        : 'bg-bg-card hover:bg-bg-elevated border border-border-subtle hover:border-text-muted text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {c.joined ? (
                      <span className="flex items-center gap-1.5 font-bold">
                        <UserCheck className="w-4 h-4 text-white" />
                        Helping
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <UserPlus className="w-4 h-4" />
                        Recruit
                      </span>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
}
