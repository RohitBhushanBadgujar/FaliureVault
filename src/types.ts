export interface Project {
  id: string;
  name: string;
  tagline: string;
  industry: string;
  foundedYear: number;
  failedYear: number;
  failureStage: string;
  teamSize: number;
  primaryFailureReason: string;
  potentialScore: number;
  revivalPossibility: number;
  avatarEmoji: string;
  description: string;
  aiAnalysis?: AIAnalysis;
  workspace?: Workspace;
  
  // New Case Study detail fields
  founder?: string;
  fundingRaised?: string;
  employeeCount?: number;
  timeline?: { year: string; event: string; status: 'good' | 'neutral' | 'bad' }[];

  // Real-time Status Verification fields
  companyStatus?: string;
  strugglingCategory?: 'Struggling' | 'Pivoting' | 'Declining' | 'Losing Users' | 'Funding Issues' | 'Market Problems' | 'None';
  aiConfidence?: number;
  userSourceUrl?: string;
  userSourceReasoning?: string;
}

export interface AIAnalysis {
  summary: string;
  keyMistakes: string[];
  rootCauses: {
    funding: string;
    product: string;
    market: string;
    execution: string;
    timing: string;
  };
  failureDNA: string[]; // Chain of failure steps
  revivalProbability: number;
  marketOpportunity: string;
  newRisks: string[];
  modernAlternatives: string[];
  suggestedImprovements: string[];
  advisoryAnswers: {
    whatToAvoid: string;
    whatToImprove: string;
    modernTechToLeverage: string;
    changedMarketConditions: string;
    v2ProductVision: string;
  };
}

export interface Task {
  id: string;
  title: string;
  category: 'Research' | 'MVP Rebuild' | 'Market Validation' | 'Capital / Funding';
  status: 'Pending' | 'In Progress' | 'Completed';
  priority: 'High' | 'Medium' | 'Low';
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface Contributor {
  id: string;
  name: string;
  role: 'Developer' | 'Designer' | 'Marketer' | 'Researcher' | 'AI Engineer';
  joined: boolean;
}

export interface Workspace {
  projectId: string;
  progress: number;
  tasks: Task[];
  notes: Note[];
  contributors: Contributor[];
  riskMonitor: {
    execution: number;
    market: number;
    funding: number;
  };
}
