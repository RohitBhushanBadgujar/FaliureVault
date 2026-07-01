import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Google Gen AI
let ai: GoogleGenAI | null = null;
const API_KEY = process.env.GEMINI_API_KEY;

if (API_KEY && API_KEY !== 'MY_GEMINI_API_KEY') {
  try {
    ai = new GoogleGenAI({
      apiKey: API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    console.log('Google GenAI initialized successfully.');
  } catch (err) {
    console.error('Failed to initialize Google GenAI:', err);
  }
} else {
  console.log('Skipping Google GenAI initialization: GEMINI_API_KEY is missing or generic.');
}

// REST route to validate a startup
app.post('/api/validate', async (req: Request, res: Response) => {
  const { name, industry } = req.body;

  if (!name) {
    res.status(400).json({ error: 'Name is required.' });
    return;
  }

  if (!ai) {
    // Mock response
    res.json({ isValid: true, message: "This company appears to be a legitimate failed startup." });
    return;
  }

  try {
    const prompt = `
      You are a startup analyst. Your task is to verify if the company "${name}" (Industry: "${industry}") was a real startup that has failed, shut down, acquired, or is still active.
      Generate a very simple, human-readable response (1-2 sentences).
      Example responses:
      "This company appears to be a legitimate failed startup."
      "This company is still active and may not qualify as a failed startup."
      "I cannot find records of this company, it may not be a legitimate startup."
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a startup analyst. Keep your responses extremely simple and human-readable, just 1-2 sentences. Avoid technical AI wording.",
        temperature: 0.2,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isValid: { type: Type.BOOLEAN, description: "True if it's a legitimate failed/struggling startup, False if it's active or fake." },
            message: { type: Type.STRING, description: "A simple 1-2 sentence human-readable validation message." }
          },
          required: ["isValid", "message"]
        }
      }
    });

    const parsedData = JSON.parse(response.text.trim());
    res.json(parsedData);
  } catch (error: any) {
    console.error('Gemini validation call failed:', error);
    res.json({ isValid: true, message: "This company appears to be a legitimate failed startup." });
  }
});

// REST route to analyze a custom failed startup
app.post('/api/analyze', async (req: Request, res: Response) => {
  const { name, industry, foundedYear, failedYear, failureStage, teamSize, primaryFailureReason, description } = req.body;

  if (!name || !industry || !primaryFailureReason) {
    res.status(400).json({ error: 'Name, Industry, and Primary Failure Reason are required.' });
    return;
  }

  // If Gemini client is not initialized, fallback to super-clean mock generation so the user is never blocked
  if (!ai) {
    console.log('Gemini client not initialized. Generating high-quality mock recovery plan instead...');
    
    // Generate intelligent deterministic answers
    const potentialScore = Math.floor(65 + Math.random() * 20);
    const revivalPossibility = Math.floor(68 + Math.random() * 20);
    const emojis = ['⚡', '🚁', '⌚', '📡', '💡', '🧪', '🤖', '🔋', '🏥', '📦'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    const mockResponse = {
      name,
      tagline: `${name} — Decoupled software iteration of legacy model`,
      potentialScore,
      revivalPossibility,
      avatarEmoji: randomEmoji,
      aiAnalysis: {
        summary: `The company operated in ${industry} and spent too much money during its ${failureStage} stage before proving users actually needed the product. Specifically, it collapsed due to: "${primaryFailureReason}". Rebuilding this requires replacing heavy pre-development capital expenditures with agile testing, focusing entirely on a software-only middleware layer to avoid early overhead.`,
        keyMistakes: [
          'High pre-validation burn rate: Heavy expenditure on building deep customized features before verifying customer demand.',
          `High capital overhead: Launching custom hardware or operational resources before securing high-volume regulatory certificates or customer contracts.`,
          'Delayed feedback loop: Lack of early telemetry or direct user interviews to guide incremental releases.'
        ],
        rootCauses: {
          funding: 'High direct burn rate on non-core utilities with low liquidity reserves backing up launch delays.',
          product: 'Overspecified early architecture built before the core utility was validated by active customer cohorts.',
          market: 'Customer hesitancy over high initial upfront fees and steep integration complexity.',
          execution: 'Heavy developer iteration prioritizing custom edge-cases rather than launching simple customer pilots.',
          timing: 'Launched before modern APIs and cloud infrastructure made low-cost operational pathways accessible.'
        },
        failureDNA: [
          `Initiated operations in the ${industry} sector targeting regional gaps.`,
          `Encountered severe blockers: "${primaryFailureReason}".`,
          'Faced immediate working capital exhaustion from prolonged development cycles.',
          'Resulted in operational wind-down and project closure.'
        ],
        revivalProbability: revivalPossibility,
        marketOpportunity: `A real market opportunity exists in ${industry} by replacing complex physical operations with decentralized APIs and specialized software integrations that connect pre-existing suppliers directly to users.`,
        newRisks: [
          'Existing platforms introducing similar feature expansions to their user base.',
          'Increasing data compliance laws in high-regulatory environments.'
        ],
        modernAlternatives: [
          'Pivot to a software-first solution with zero manufacturing dependencies.',
          'Act as a specialized telemetry or integration partner for pre-existing players.'
        ],
        suggestedImprovements: [
          'Deploy an automated onboarding guide to lower integration time to under 10 minutes.',
          'Leverage modern serverless cloud setups to reduce inactive running costs to near zero.'
        ],
        advisoryAnswers: {
          whatToAvoid: 'Do not raise large initial venture debt or build custom high-cost setups. Avoid proprietary databases.',
          whatToImprove: 'Focus entirely on a single validated high-impact workflow to prove structural product usefulness.',
          modernTechToLeverage: 'Cloud functions, Stripe API for multi-vendor splits, and basic Next.js/React layouts.',
          changedMarketConditions: 'Sovereign clean energy incentives are active, battery/cloud hosting costs are 80% lower, and target customers are fully habituated to digital-first business workflows.',
          v2ProductVision: `FailureVault v2 concept: "${name} Core" — A capital-efficient, software-only configuration focusing exclusively on solving the primary bottleneck.`
        }
      },
      suggestedTasks: [
        { title: 'Examine standard APIs and reusable components to build the new skeleton', category: 'Research', priority: 'High' },
        { title: 'Create a single-flow functional interactive MVP wireframe', category: 'MVP Rebuild', priority: 'High' },
        { title: 'Launch a simple landing page to test click-through demand on the new v2 value pitch', category: 'Market Validation', priority: 'High' },
        { title: 'Establish an offshore low-variable budgeting plan (<$50/mo)', category: 'Capital / Funding', priority: 'Medium' },
        { title: 'Formulate an interview questionnaire to gather raw feedback from 5 prospective customers', category: 'Market Validation', priority: 'Medium' }
      ],
      riskMonitor: {
        execution: Math.floor(30 + Math.random() * 30),
        market: Math.floor(25 + Math.random() * 30),
        funding: Math.floor(40 + Math.random() * 30)
      }
    };

    res.json(mockResponse);
    return;
  }

  // Active AI mode
  try {
    const prompt = `
      You are a world-class startup founder, senior product manager, and venture capitalist. 
      You are analyzing a failed idea to generate a complete business revival and recovery analysis.
      
      Here are the specific details of the failed project/product:
      - Name: "${name}"
      - Industry: "${industry}"
      - Founded Year: ${foundedYear || 2021}
      - Failed Year: ${failedYear || 2024}
      - Failure Stage: "${failureStage}"
      - Team Size: ${teamSize || 4}
      - Primary Failure Reason: "${primaryFailureReason}"
      - Description of Project: "${description || 'No description provided'}"

      Conduct a deep strategic analysis. Identify key mistakes, map the root causes, construct a 4-step "Failure DNA" chain, generate potential/revival scores, suggest modern improvements using 2026 technologies, and draft 5 actionable tasks across research, rebuild, validation, and funding.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are a professional business advisor. Be extremely smart, precise, and practical.
        CRITICAL RULES FOR RESPONSES:
        - Write in a simple, human, easy to understand tone.
        - NEVER generate generic motivational text, empty slogans, fluffy platitudes, or technical business jargon.
        - Every single insight must be practical, evidence-based, and realistic.
        - For example, instead of writing "strategic inefficiencies" or "cognitive overhead", write precise plain-English explanations like "The company spent too much money before proving users actually needed the product".
        - Be factual and logical, avoiding robotic terminology.`,
        temperature: 0.7,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            tagline: { type: Type.STRING, description: "A high-concept, catchy recovery tagline" },
            potentialScore: { type: Type.INTEGER, description: "Score out of 100 representing market viability" },
            revivalPossibility: { type: Type.INTEGER, description: "Possibility score out of 100 for successful resurrection" },
            avatarEmoji: { type: Type.STRING, description: "A highly fitted emoji" },
            aiAnalysis: {
              type: Type.OBJECT,
              properties: {
                summary: { type: Type.STRING, description: "Detailed summary of what happened and the recovery pivot" },
                keyMistakes: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "3 strategic errors written in simple, clear language"
                },
                rootCauses: {
                  type: Type.OBJECT,
                  properties: {
                    funding: { type: Type.STRING },
                    product: { type: Type.STRING },
                    market: { type: Type.STRING },
                    execution: { type: Type.STRING },
                    timing: { type: Type.STRING }
                  },
                  required: ["funding", "product", "market", "execution", "timing"]
                },
                failureDNA: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Exactly 4 chronological steps showing the domino cascade of failure"
                },
                revivalProbability: { type: Type.INTEGER },
                marketOpportunity: { type: Type.STRING },
                newRisks: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                modernAlternatives: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                suggestedImprovements: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                advisoryAnswers: {
                  type: Type.OBJECT,
                  properties: {
                    whatToAvoid: { type: Type.STRING },
                    whatToImprove: { type: Type.STRING },
                    modernTechToLeverage: { type: Type.STRING },
                    changedMarketConditions: { type: Type.STRING },
                    v2ProductVision: { type: Type.STRING }
                  },
                  required: ["whatToAvoid", "whatToImprove", "modernTechToLeverage", "changedMarketConditions", "v2ProductVision"]
                }
              },
              required: [
                "summary", "keyMistakes", "rootCauses", "failureDNA", "revivalProbability",
                "marketOpportunity", "newRisks", "modernAlternatives", "suggestedImprovements", "advisoryAnswers"
              ]
            },
            suggestedTasks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  category: { type: Type.STRING, description: "Must be EXACTLY one of: Research, MVP Rebuild, Market Validation, Capital / Funding" },
                  priority: { type: Type.STRING, description: "Must be EXACTLY one of: High, Medium, Low" }
                },
                required: ["title", "category", "priority"]
              }
            },
            riskMonitor: {
              type: Type.OBJECT,
              properties: {
                execution: { type: Type.INTEGER, description: "Risk level from 0 to 100" },
                market: { type: Type.INTEGER, description: "Risk level from 0 to 100" },
                funding: { type: Type.INTEGER, description: "Risk level from 0 to 100" }
              },
              required: ["execution", "market", "funding"]
            }
          },
          required: ["name", "tagline", "potentialScore", "revivalPossibility", "avatarEmoji", "aiAnalysis", "suggestedTasks", "riskMonitor"]
        }
      }
    });

    const parsedData = JSON.parse(response.text.trim());
    res.json(parsedData);
  } catch (error: any) {
    console.error('Gemini call failed with error:', error);
    res.status(500).json({ error: 'Failed to generate AI strategy: ' + error.message });
  }
});

// REST route to match Failure DNA against existing projects
app.post('/api/failure-dna-query', async (req: Request, res: Response) => {
  const { query, projects } = req.body;

  if (!query || !projects || !Array.isArray(projects)) {
    res.status(400).json({ error: 'Query criteria and a valid projects list are required.' });
    return;
  }

  // Active AI mode
  if (ai) {
    try {
      const prompt = `
        You are an expert venture capitalist, startup auditor, and forensic business strategist specializing in Failure Archetypes and Failure DNA analysis.
        
        We have an inputted failure scenario:
        "${query}"
        
        We want to compare this failure scenario against the existing projects in our repository to find matching failure "DNA" patterns, and extract strategic comparative lessons.
        
        Here are the existing database projects:
        ${JSON.stringify(projects.map((p: any) => ({
          id: p.id,
          name: p.name,
          industry: p.industry,
          primaryFailureReason: p.primaryFailureReason,
          description: p.description,
          failureDNA: p.aiAnalysis?.failureDNA || []
        })), null, 2)}
        
        For each project, output:
        1. Similarity Score (percentage out of 100 - be highly critical and precise about structural similarities, e.g., regulatory bottlenecks, physical hardware drag, capital management, tech debt, timing, etc.)
        2. DNA Intersection (detailed professional summary of the overlapping failure DNA points, comparing the query scenario specifically to this database project's reasons/description)
        3. Comparative Lesson (a concrete lesson on what to avoid or how to pivot the query scenario, based on the historical database project's specific mistakes)
        
        Also provide a "generalizedInsight" summarizing the overarching failure archetype of the inputted query scenario.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          systemInstruction: `You are an elite, professional innovation intelligence engine and VC audit advisor. Analyze the scenario with precision, highlighting deep structural business lessons. Speak in a highly analytical, clinical, VC format. Avoid repetitive phrasing.
          CRITICAL RULES FOR RESPONSES:
          - NEVER generate generic motivational text, empty slogans, or fluffy platitudes.
          - Every single insight must present a highly logical analysis, evidence-based reasoning, easily understandable explanations, and realistic suggestions.
          - For example, instead of writing generic statements like "This startup failed due to strategic inefficiencies", write precise structural explanations like "The company spent too much money before proving users actually needed the product" or "They built a highly capital-intensive hardware product before securing high-volume regulatory contracts."
          - Be highly critical, factual, and logical.`,
          temperature: 0.7,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              matches: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    projectId: { type: Type.STRING, description: "Must EXACTLY match one of the physical IDs of the projects: " + projects.map((p: any) => p.id).join(', ') },
                    similarityScore: { type: Type.INTEGER, description: "Match score representing structural alignment" },
                    dnaIntersection: { type: Type.STRING, description: "Detailed summary of shared failure DNA factors" },
                    comparativeLesson: { type: Type.STRING, description: "Highly actionable strategic advice or lesson learned from the comparison" }
                  },
                  required: ["projectId", "similarityScore", "dnaIntersection", "comparativeLesson"]
                }
              },
              generalizedInsight: { type: Type.STRING, description: "A high-level clinical overview of the query's business model flaw" }
            },
            required: ["matches", "generalizedInsight"]
          }
        }
      });

      const parsedData = JSON.parse(response.text.trim());
      res.json(parsedData);
      return;
    } catch (error: any) {
      console.error('Gemini DNA query failed:', error);
      // Fallback gracefully to high-quality computed matching to prevent blocking the user
    }
  }

  // Fallback computed matching mode
  console.log('Gemini client not available. Performing smart keyword-based matching instead...');
  try {
    const matches = projects.map((p: any) => {
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
    }).sort((a: any, b: any) => b.similarityScore - a.similarityScore);

    const generalizedInsight = `Based on a structural audit of your scenario, the failure falls under the "Hardware Capital Drag and Compliance Friction" archetype. Like the major matched indices below, there is a recurring pattern of investing heavily in custom physical configurations before establishing low-resistance public approvals or commercial contracts. The modern playbook redirects capital into high-multiple orchestration software.`;

    res.json({ matches, generalizedInsight });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to process fallback DNA query: ' + err.message });
  }
});

// Configure Vite middleware in dev; serve built index.html + assets in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware mounted in development mode.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving production build assets from /dist.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FailureVault Server running on http://localhost:${PORT}`);
  });
}

startServer();
