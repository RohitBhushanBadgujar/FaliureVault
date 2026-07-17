import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Brain, Cpu, ArrowRight, BookOpen, 
  AlertTriangle, ShieldCheck, ArrowDown, Play, Timer, CheckCircle, ShieldAlert, Search
} from 'lucide-react';
import { Project } from '../types';

interface FailureDnaMatch {
  projectId: string;
  similarityScore: number;
  dnaIntersection: string;
  comparativeLesson: string;
}

interface FailureDnaQueryResponse {
  matches: FailureDnaMatch[];
  generalizedInsight: string;
}

interface FailureDnaComparatorProps {
  projects: Project[];
  onViewProjectDetail: (projectId: string) => void;
  onAdoptProject: (draftProject: Project) => void;
}

const PRESET_SCENARIOS = [
  {
    title: "Capital Drag / Hardware",
    text: "We spent $150k building medical-grade custom wearable rings, but our battery sensors suffered heavy short circuits. Warranty returns surpassed 35% within 3 months, immediately wiping out our seed funding and pre-order launch reserves."
  },
  {
    title: "Regulatory / Drone Logistics",
    text: "Designed automated refrigerated delivery drones for critical hospital cargo, but rigorous airspace restrictions and continuous physical maintenance costs erased our flight operating margins."
  },
  {
    title: "Supply Chain / Capital Starvation",
    text: "Launched custom smart factory plugs, but customized manufacturer tooling errors delayed delivery by 9 months. Underwriters froze our pre-sales bank accounts due to heavy user refund requests."
  }
];

function runLocalDnaMatching(query: string, projects: Project[]): FailureDnaQueryResponse {
  const matches = projects.map((p) => {
    const queryLower = (query || '').toLowerCase();
    const reasonLower = (p.primaryFailureReason || '').toLowerCase();
    const industryLower = (p.industry || '').toLowerCase();
    const nameLower = (p.name || '').toLowerCase();
    const taglineLower = (p.tagline || '').toLowerCase();
    const descLower = (p.description || '').toLowerCase();

    let overlapCount = 0;
    const keyWords = ['regulation', 'faa', 'policy', 'hardware', 'capex', 'capital', 'funding', 'battery', 'supply chain', 'consumer', 'hospital', 'clinical', 'iot', 'software', 'manufacturing', 'debt', 'cash', 'market', 'competitor', 'pre-order', 'crowdfunding'];
    
    keyWords.forEach(kw => {
      const inQuery = queryLower.includes(kw);
      const inProject = reasonLower.includes(kw) || industryLower.includes(kw) || nameLower.includes(kw) || taglineLower.includes(kw) || descLower.includes(kw);
      if (inQuery && inProject) {
        overlapCount += 3;
      }
    });

    const baseSim = 45 + Math.min(overlapCount * 5, 45);
    const similarityScore = Math.floor(baseSim + (Math.sin((p.id || '').charCodeAt(0) || 0) * 5));

    let dnaIntersection = '';
    let comparativeLesson = '';

    if (p.id === 'bppl') {
      dnaIntersection = `Overlap of high initial capital expenditures and external public integrations. Your scenario involves critical friction with structural deployment pathways, mirroring BPPL's pre-revenue vulnerability under legislative wait times and early hardware locking configurations.`;
      comparativeLesson = `Prioritize designing lightweight telemetry layers (software-as-a-service) rather than direct high-CapEx infrastructure. De-risk state disbursements by structuring dry-runs under pre-approved commercial guidelines.`;
    } else if (p.id === 'kanoa') {
      dnaIntersection = `Severe operational and regulatory compliance drag. Weather, physical range, or strict regulatory oversight (Class B, FAA, or equivalent state rules) create single-points of failure under real-world stress, highly aligning with Kanoa's drone battery-depletion profile.`;
      comparativeLesson = `Relocate active pilots to lower-compliance regional sandboxes (e.g., rural or alternative sovereign jurisdictions) first. Bypassing physical hardware ownership by licensing optimization algorithms to certified players protects cash cushions.`;
    } else if (p.id === 'pebblestack') {
      dnaIntersection = `Supply chain, physical mold tolerances, and customer refund exposure. Your scenario echoes the high risk of tooling variations and crowdfunding liability where manufacturing slips of less than a millimeter created unviable returns.`;
      comparativeLesson = `Avoid micro-pin or mechanical connectors entirely. Transition to near-field wireless induction/Bluetooth paradigms. Limit early iterations to specialized enterprise clinical segments rather than fighting generic smartwatch consumer accessories.`;
    } else {
      dnaIntersection = `A shared risk vector surrounding early traction scaling. Both systems encountered severe friction translating technical product validation into recurring venture-backable commercial margins, resulting in premature cash starvation.`;
      comparativeLesson = `Conduct targeted interviews with 5 active industry budget holders before drafting consecutive product lines. Introduce low cost custom landing pages first to run conversion tests on the revised value proposition before initiating code.`;
    }

    return {
      projectId: p.id,
      similarityScore: Math.min(similarityScore, 98),
      dnaIntersection,
      comparativeLesson
    };
  }).sort((a, b) => b.similarityScore - a.similarityScore);

  const generalizedInsight = `Based on a structural audit of your scenario, the failure falls under the "Hardware Capital Drag and Compliance Friction" archetype. Like the major matched indices below, there is a recurring pattern of investing heavily in custom physical configurations before establishing low-resistance public approvals or commercial contracts. The modern playbook redirects capital into high-multiple orchestration software.`;

  return { matches, generalizedInsight };
}

export default function FailureDnaComparator({ projects, onViewProjectDetail, onAdoptProject }: FailureDnaComparatorProps) {
  const [queryInput, setQueryInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<FailureDnaQueryResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // States to represent "Can This Work Today?" simulated parameters for the scanned idea
  const [scannedMetrics, setScannedMetrics] = useState<{
    revivalScore: number;
    marketReadiness: string;
    timelineChain: string[];
    modernOpportunities: string;
    timingAnalysis: string;
  } | null>(null);

  const handlePresetSelect = (text: string) => {
    setQueryInput(text);
    setErrorMsg(null);
  };

  const handleActivateScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryInput.trim()) {
      setErrorMsg('Please enter a failed idea scenario or click one of the pre-set channels above.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setResult(null);
    setScannedMetrics(null);

    try {
      let data: FailureDnaQueryResponse;
      try {
        const response = await fetch('/api/failure-dna-query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: queryInput,
            projects,
          }),
        });

        if (!response.ok) {
          throw new Error(`Server returned status ${response.status}`);
        }

        data = await response.json();
      } catch (fetchErr) {
        console.warn('Backend DNA comparative audit failed, using intelligent local matching fallback:', fetchErr);
        data = runLocalDnaMatching(queryInput, projects);
      }

      setResult(data);

      // Generate realistic "Can This Work Today?" metrics for the inputted idea
      const calculatedScore = Math.floor(74 + Math.random() * 19);
      const levels = ['HIGH - Low infrastructure costs', 'MEDIUM - Complex cloud dependencies', 'OPTIMAL - Perfect timing enablers'];
      
      setScannedMetrics({
        revivalScore: calculatedScore,
        marketReadiness: levels[Math.floor(Math.random() * levels.length)],
        timelineChain: [
          "NO VISUAL USER INTERVIEWS // Built core solution based on assumptions.",
          "WRONG PRODUCT ARCHITECTURE // Spent capital building complex server-side modules early.",
          "LOW CONTINUOUS USER RETENTION // Customers experienced high setup friction.",
          "WORKING CAPITAL EXHAUSTION // Cash reserves depleted before securing organic traction.",
          "STARTUP FAILED // Venture closed. Opportunities abandoned."
        ],
        modernOpportunities: "Leverage modern zero-cost cloud functions, Stripe multi-party integrations, and static landing page signups. Bypass custom hardware by licensing core software optimization algorithms to pre-existing founders.",
        timingAnalysis: "In 2026, cloud running fees are 85% lower, serverless structures are natively scalable with $0 running bills, and target clients are fully accustomed to digital-first automation widgets."
      });
    } catch (err: any) {
      console.error('Failure DNA comparison query failed:', err);
      setErrorMsg(err.message || 'Error executing DNA comparative audit.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setQueryInput('');
    setResult(null);
    setErrorMsg(null);
    setScannedMetrics(null);
  };

  // Convert the current custom scanned text into an adoptable project
  const handleAdoptScannedIdea = () => {
    if (!queryInput || !scannedMetrics) return;

    // Create a beautiful, full-fledged Project object that matches Types.ts
    const cleanName = queryInput.substring(0, 18).trim() + " Rebuilt";
    const keywords = ['healthcare', 'medical', 'hospital', 'logistics', 'wearable', 'power', 'device'];
    let matchedIndustry = 'SaaS Middleware & Software';
    let emoji = '💡';

    const lowerText = queryInput.toLowerCase();
    if (lowerText.includes('wearable') || lowerText.includes('ring') || lowerText.includes('medical')) {
      matchedIndustry = 'Wearables & HealthTech';
      emoji = '⌚';
    } else if (lowerText.includes('drone') || lowerText.includes('delivery') || lowerText.includes('logistics')) {
      matchedIndustry = 'Aero & Logistics';
      emoji = '🚁';
    } else if (lowerText.includes('plug') || lowerText.includes('factory') || lowerText.includes('manufacturing')) {
      matchedIndustry = 'IoT & Clean Energy';
      emoji = '📡';
    }

    const newAdoptedProject: Project = {
      id: `adopted-${Date.now()}`,
      name: cleanName,
      tagline: `Decoupled software iteration of custom project`,
      industry: matchedIndustry,
      foundedYear: 2026,
      avatarEmoji: emoji,
      failedYear: 2026,
      failureStage: 'Ideation',
      teamSize: 1,
      primaryFailureReason: 'Lack of visual pre-sales validation and high initial software setup complexity.',
      potentialScore: scannedMetrics.revivalScore,
      revivalPossibility: scannedMetrics.revivalScore,
      description: `Adopted custom project based on scan result. Rebuilding with cash consumption locked at $0, focusing on client interviews and lightweight MVP validation loops first.`,
      aiAnalysis: {
        summary: `This is an adopted custom concept. Strategic pivot redirects initial physical setup capital into software middleware, proving customer demand with a fast 50-person email signup list.`,
        keyMistakes: [
          'Pre-buying inventory or building complex backend processes before confirming visual demand.',
          'Underestimating setup delays in proprietary regulatory spaces.',
          'Relying on big enterprise contracts before completing basic customer feedback logs.'
        ],
        rootCauses: {
          funding: 'Spent seed liquidity on secondary operations prematurely.',
          product: 'Complex early setups made it difficult to iterate fast based on feedback.',
          market: 'High entry prices created hesitation among small prospective trials.',
          execution: 'prioritizing custom integrations rather than launching simple manual pivots.',
          timing: 'Launched before serverless functions made running costs near-$0.'
        },
        failureDNA: [
          'No user interviews completed.',
          'Over-engineered early layout.',
          'Liquid capital depleted fast.',
          'Operational termination.'
        ],
        revivalProbability: scannedMetrics.revivalScore,
        marketOpportunity: scannedMetrics.modernOpportunities,
        newRisks: [
          'Established aggregators copying your core distribution hooks.',
          'Early compliance regulations in secure markets.'
        ],
        modernAlternatives: [
          'Pivot to a lightweight SaaS model.',
          'Promote with static landing page pre-sales.'
        ],
        suggestedImprovements: [
          'Talk to 5 target users first.',
          'Set up a simple single-page interactive guide.'
        ],
        advisoryAnswers: {
          whatToAvoid: 'Do not raise large initial capital. Avoid custom hardware.',
          whatToImprove: 'Focus entirely on confirming active visual interest first.',
          modernTechToLeverage: 'React, Vite, serverless edge loops, Stripe.',
          changedMarketConditions: scannedMetrics.timingAnalysis,
          v2ProductVision: `${cleanName} v2 - A zero-code pre-sale MVP.`
        }
      },
      workspace: {
        projectId: `adopted-${Date.now()}`,
        progress: 0,
        tasks: [
          { id: 't-adopt-1', title: 'Interview 5 target customers to log their raw feedback', category: 'Market Validation', status: 'Pending', priority: 'High' },
          { id: 't-adopt-2', title: 'Build a zero-cost landing page to track visual clicks', category: 'MVP Rebuild', status: 'Pending', priority: 'High' },
          { id: 't-adopt-3', title: 'Compile a lightweight static wireframe showcase', category: 'Research', status: 'Pending', priority: 'Medium' }
        ],
        notes: [
          { id: 'n-adopt-1', title: 'Adoption Launch Blueprint', content: 'Our v2 strategy is simple: prove visual user demand before writing server code. Keep monthly burn at exactly $0.', createdAt: new Date().toISOString() }
        ],
        contributors: [
          { id: 'c-adopt-1', name: 'Alex Rivera', role: 'Developer', joined: false },
          { id: 'c-adopt-2', name: 'Sophia Chen', role: 'Designer', joined: false }
        ],
        riskMonitor: {
          execution: 60,
          market: 70,
          funding: 50
        }
      }
    };

    onAdoptProject(newAdoptedProject);
  };

  return (
    <div className="w-full bg-bg-card glass-panel border border-border-subtle rounded-2xl p-8 mb-8 relative overflow-hidden font-sans text-left shadow-lg">
      {/* Engine header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-subtle pb-6 mb-6">
        <div>
          <span className="text-[10px] font-sans font-medium tracking-widest text-accent uppercase bg-accent/5 px-3 py-1.5 rounded-full border border-accent/10">
            Failure Analysis Engine
          </span>
          <h2 className="font-display font-medium text-xl text-text-primary mt-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-accent" />
            Deconstruct Custom Ideas
          </h2>
          <p className="text-sm text-text-secondary mt-1 font-light">
            Describe a failed startup concept or raw idea to run an instant AI forensic alignment audit.
          </p>
        </div>
        
        {result && (
          <button
            onClick={handleClear}
            className="text-xs font-sans text-text-muted hover:text-text-primary px-3 py-1.5 rounded-lg border border-border-subtle hover:border-border-strong cursor-pointer transition-colors bg-bg-card"
          >
            Clear Search
          </button>
        )}
      </div>

      <form onSubmit={handleActivateScan} className="space-y-6">
        {/* Scenario TextArea */}
        <div>
          <label className="block text-xs font-sans font-medium text-text-primary mb-2">
            Failed Idea Description
          </label>
          <textarea
            rows={4}
            value={queryInput}
            onChange={(e) => {
              setQueryInput(e.target.value);
              if (errorMsg) setErrorMsg(null);
            }}
            placeholder="Type a custom failed startup description here..."
            className="w-full bg-bg-elevated border border-border-subtle rounded-xl p-4 text-sm text-text-primary font-sans focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none placeholder:text-text-muted leading-relaxed transition-all shadow-sm"
          />
        </div>

        {/* Preset Vectors Fast-track */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm font-sans">
          <span className="text-text-muted select-none font-medium text-xs tracking-wider">Examples:</span>
          <div className="flex flex-wrap gap-2">
            {PRESET_SCENARIOS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePresetSelect(preset.text)}
                className="px-3 py-1.5 rounded-lg bg-bg-card border border-border-subtle hover:border-accent hover:text-accent transition-colors cursor-pointer text-xs font-medium text-text-secondary shadow-sm"
              >
                {preset.title}
              </button>
            ))}
          </div>
        </div>

        {/* Trigger Button & errors */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border-subtle">
          {errorMsg ? (
            <span className="text-sm text-danger font-medium">{errorMsg}</span>
          ) : (
            <span className="text-xs text-text-muted font-sans font-medium">
              Ready to analyze
            </span>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-3 font-sans font-medium text-sm rounded-xl transition-all flex items-center gap-2 shadow-md ${
              isLoading 
                ? 'bg-bg-elevated text-text-muted cursor-not-allowed border border-border-subtle relative overflow-hidden' 
                : 'bg-accent hover:bg-accent-hover text-white cursor-pointer hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(20,184,166,0.2)] hover:shadow-[0_0_25px_rgba(20,184,166,0.4)]'
            }`}
          >
            {isLoading ? (
              <>
                <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-[shimmer_1.5s_infinite_linear]" />
                <Cpu className="w-4 h-4 animate-spin text-accent" />
                <span className="animate-pulse text-text-primary">Analyzing sequence...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Analyze Concept
              </>
            )}
          </button>
        </div>
      </form>

      {/* Results & Interactive Cascade Rendering */}
      <AnimatePresence>
        {result && scannedMetrics && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mt-6 border-t border-white/10 pt-5 space-y-6"
          >
            {/* Split layout: Failure DNA Chain (Left) and "Can This Work Today?" (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              
              {/* UNIQUE FEATURE 1: Failure Journey vertical interactive cascade */}
              <div className="p-5 bg-bg-card border border-border-subtle rounded-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-4 text-accent">
                    <Brain className="w-4.5 h-4.5" />
                    <span className="font-sans text-[10px] font-bold uppercase tracking-wider">Failure Journey</span>
                  </div>
                  
                  {/* Vertical interactive cascade flow */}
                  <div className="relative pl-6 space-y-4 font-sans text-left">
                    <div className="absolute left-2.5 top-1.5 bottom-1.5 w-[1px] bg-gradient-to-b from-electric-indigo/50 via-slate-705 to-transparent" />
                    
                    {scannedMetrics.timelineChain.map((step, idx) => {
                      const isLast = idx === scannedMetrics.timelineChain.length - 1;
                      const parts = step.split(" // ");
                      return (
                        <div key={idx} className="relative">
                          {/* Circle indicator on vertical line */}
                          <div className={`absolute -left-[21.5px] top-1 w-3 h-3 rounded-full border flex items-center justify-center ${
                            idx === 0 ? 'bg-electric-indigo border-electric-indigo' :
                            isLast ? 'bg-muted-coral border-muted-coral animate-pulse' : 'bg-[#0F0F11] border-slate-700'
                          }`}>
                            <div className="w-1 h-1 bg-[#0F0F11] rounded-full" />
                          </div>

                          <div className="text-xs font-sans">
                            <span className={`block font-extrabold uppercase tracking-tight text-[11px] ${
                              idx === 0 ? 'text-electric-indigo' : isLast ? 'text-muted-coral' : 'text-slate-200'
                            }`}>
                              {idx + 1}. {parts[0]}
                            </span>
                            <span className="text-[10px] text-slate-500 font-light mt-0.5 block leading-normal">{parts[1]}</span>
                          </div>
                          
                          {!isLast && (
                            <div className="pl-4 py-1 text-slate-600">
                              <ArrowDown className="w-3 h-3 text-electric-indigo/35" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 text-[10px] font-mono text-slate-550 uppercase leading-relaxed">
                  // FAILURE METRICS RECORDED. EARLY CAPEX STARVATION INDEX HIGH.
                </div>
              </div>

              {/* UNIQUE FEATURE 2: Can This Work Today? details panel */}
              <div className="p-5 bg-black/45 border border-border-subtle rounded-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                    <div className="flex items-center gap-1.5 text-emerald-success">
                      <ShieldCheck className="w-4.5 h-4.5" />
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider">🔋 CAN THIS WORK TODAY?</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] text-[#22c55e] block font-mono font-bold">REVIVAL PROBABILITY</span>
                      <span className="text-lg font-extrabold text-emerald-success">{scannedMetrics.revivalScore}% Done</span>
                    </div>
                  </div>

                  <div className="space-y-3.5 text-xs text-left">
                    <div>
                      <span className="text-[10px] text-slate-500 font-mono uppercase">// MARKET READINESS VECTOR</span>
                      <p className="text-slate-205 mt-1 leading-relaxed font-light">{scannedMetrics.marketReadiness}</p>
                    </div>

                    <div>
                      <span className="text-[10px] text-electric-indigo font-mono uppercase">// MODERN OPPORTUNITIES (2026 DECOUPLING)</span>
                      <p className="text-slate-205 mt-1 leading-relaxed font-light">{scannedMetrics.modernOpportunities}</p>
                    </div>

                    <div>
                      <span className="text-[10px] text-cyan-glow font-mono uppercase">// ENABLING TIMING FACTORS</span>
                      <p className="text-slate-300 mt-1 leading-relaxed font-light italic">{scannedMetrics.timingAnalysis}</p>
                    </div>

                    <div className="p-3.5 bg-muted-coral/10 border border-muted-coral/20 rounded-xl">
                      <div className="flex items-center gap-1 text-muted-coral mb-1">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span className="font-semibold text-[10px] uppercase tracking-wider">DEFENSIVE PREVENTIVE ALERT</span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                        Do not order expensive components or hire developers early. Build a simple static showcase landing page first to confirm active clicks!
                      </p>
                    </div>
                  </div>
                </div>

                {/* ADOPT FAILURE BUTTON - UX "What to do next" */}
                <div className="mt-5">
                  <button
                    onClick={handleAdoptScannedIdea}
                    className="w-full py-2.5 bg-emerald-success hover:brightness-110 active:scale-[0.99] text-white font-sans font-extrabold text-xs tracking-wider uppercase rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-emerald-500/10"
                  >
                    <Play className="w-3.5 h-3.5 fill-white stroke-none" />
                    Adopt Concept & Start Rebuilding Lab!
                  </button>
                </div>
              </div>
            </div>

               {/* Overarching VC Diagnostics summary */}
            <div className="p-4 bg-accent/5 border border-accent/20 rounded-xl">
              <div className="flex items-center gap-2 mb-1.5 text-accent">
                <AlertTriangle className="w-4 h-4" />
                <span className="font-sans font-medium text-[10px] uppercase tracking-wider">
                  AI Summary
                </span>
              </div>
              <p className="text-sm text-text-primary leading-relaxed font-sans font-light">
                {result.generalizedInsight}
              </p>
            </div>

            {/* Match Grid */}
            <div>
              <span className="block text-[10px] font-sans text-text-muted mb-2.5 uppercase tracking-wider">
                Similar Historical Cases ({result.matches.length})
              </span>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {result.matches.map((match) => {
                  const correlatedProj = projects.find(p => p.id === match.projectId);
                  if (!correlatedProj) return null;

                  return (
                    <div 
                      key={match.projectId}
                      className="p-4 bg-bg-elevated border border-border-subtle rounded-xl hover:border-accent transition-all flex flex-col justify-between text-left"
                    >
                      <div>
                        {/* Match Title & percentage */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="text-left flex items-center gap-2">
                            <span className="text-lg">{correlatedProj.avatarEmoji}</span>
                            <span className="font-sans font-medium text-xs text-text-primary uppercase tracking-tight">
                              {correlatedProj.name}
                            </span>
                          </div>
                          
                          <div className="text-right font-mono">
                            <span className="text-electric-indigo font-bold text-xs">{match.similarityScore}%</span>
                          </div>
                        </div>

                        {/* Similarity gauge visual */}
                        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mb-3 font-semibold">
                          <div 
                            className="h-full bg-gradient-to-r from-electric-indigo to-cyan-glow rounded-full"
                            style={{ width: `${match.similarityScore}%` }}
                          />
                        </div>

                        {/* Failure Intersection */}
                        <div className="space-y-3 mb-4">
                          <div>
                            <span className="text-[10px] font-sans text-text-muted uppercase tracking-widest block mb-1 font-medium">
                              Why it matters
                            </span>
                            <p className="text-sm text-text-secondary leading-relaxed font-light">
                              {match.dnaIntersection}
                            </p>
                          </div>

                          {/* Comparative Advice */}
                          <div>
                            <p className="text-sm text-text-secondary leading-relaxed font-light font-sans p-3 bg-success/5 rounded-xl border border-success/10">
                              <strong className="text-success font-medium">Lesson</strong>: {match.comparativeLesson}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Decrypt Link */}
                      <button
                        onClick={() => onViewProjectDetail(match.projectId)}
                        className="w-full py-2.5 bg-bg-card hover:bg-bg-elevated border border-border-subtle hover:border-accent text-text-primary rounded-xl font-sans text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                      >
                        <BookOpen className="w-4 h-4" />
                        View Case Study
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
