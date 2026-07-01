import { Project } from './types';

export const PRESEEDED_PROJECTS: Project[] = [
  {
    id: 'quibi',
    name: 'Quibi',
    tagline: 'Quick-bite premium mobile entertainment service designed for on-the-go viewing.',
    industry: 'Media & Entertainment',
    foundedYear: 2018,
    failedYear: 2020,
    failureStage: 'Early Traction',
    teamSize: 250,
    founder: 'Jeffrey Katzenberg & Meg Whitman',
    fundingRaised: '$1.75B',
    employeeCount: 250,
    avatarEmoji: '📱',
    primaryFailureReason: 'Insistence on high-cost proprietary content with strict mobile-only screen viewing restrictions during a lockdown-era home environment.',
    potentialScore: 45,
    revivalPossibility: 55,
    companyStatus: 'Shut Down',
    aiConfidence: 98,
    description: 'Quibi aimed to revolutionize social content by offering $100k-per-minute blockbuster video chapters restricted to vertical or horizontal smartphone orientations, launching just as global lockdowns shifted all viewing to home televisions.',
    timeline: [
      { year: '2018', event: 'Jeffrey Katzenberg raises $1B from major Disney, NBCUniversal, and Warner Bros studios.', status: 'good' },
      { year: '2019', event: 'Secures high-profile directors like Spielberg and Whitman joins as CEO.', status: 'good' },
      { year: '2020', event: 'Launches during initial COVID wave; strict mobile limits prevent TV casting or social media sharing.', status: 'bad' },
      { year: '2020', event: 'Subscribers crash after free trial period ends; liquidates assets and sells content library to Roku.', status: 'bad' }
    ],
    aiAnalysis: {
      summary: 'Quibi failed by trying to manually force consumer behavior rather than adapting to it. Rather than enabling screenshots, casting to smart televisions, or social organic distribution, they sued anyone who copy-shared content. High production costs and timing collision with home lockdown made the product immediately obsolete.',
      keyMistakes: [
        'Strictly locked down screenshotting, social clips, and native smart-TV web integrations.',
        'High CapEx model spending up to $6M per hour on Hollywood stars instead of scalable user-generated creator formats.',
        'Extremely rigid Turnstyle rotation feature that increased engineering difficulty with little customer utility.'
      ],
      rootCauses: {
         funding: 'Overcapitalization created massive scaling pressure without validating basic organic PMF first.',
         product: 'Turnstyle camera tech was a structural gimmick; users preferred sharing and casting to televisions.',
         market: 'On-the-go transit commuting disappeared overnight in March 2020, removing the core user micro-session.',
         execution: 'Traditional Hollywood style top-down leadership completely misunderstood Reddit, TikTok, and modern meme density.',
         timing: 'Launched precisely as global lockdowns kept viewers stationary with massive TV setups.'
      },
      failureDNA: [
        'Hollywood production funding raised at a premium valuation loop.',
        'Strict legal blockades on any browser casting or social sharing.',
        'Timing crash with remote lockdowns.',
        'Zero integration on modern television sets leading to instant churn.'
      ],
      revivalProbability: 55,
      marketOpportunity: 'Quibi style narrative formats could succeed today if repackaged as vertical gamified interactive feeds natively inside YouTube Shorts or TikTok directly bypassing custom app hurdles.',
      newRisks: [
        'Massive saturation of existing social networks with high-fidelity free AI and creator content.',
        'Extremely low consumer attention spans for independent subscription services.'
      ],
      modernAlternatives: [
        'Embed video storytelling as a programmatic API for gamified micro-channels directly in messaging interfaces.',
        'Pivot toward interactive visual AI stories where the community co-votes development of episodic content.'
      ],
      suggestedImprovements: [
        'Enable user-generated creative remixes and reaction tools from day one.',
        'Adopt a dual distribution strategy partnering directly with smart TVs and physical commuter setups.'
      ],
      advisoryAnswers: {
        whatToAvoid: 'Do not build a proprietary mobile video player app requiring custom subscription logins. Avoid prohibiting social shares or blocking screenshot pipelines.',
        whatToImprove: 'Deliver direct social distribution models that utilize TikTok or Instagram as native discovery endpoints and monetize through micro-paywalls.',
        modernTechToLeverage: 'Vertical interactive streams, modern media pipelines, and dynamic client-side video composition layers.',
        changedMarketConditions: 'Casting strategies are standard and social distribution is now the sole reliable driver of digital retention indexes.',
        v2ProductVision: 'FailureVault v2 concept: "Quibi Creator Platform" — an interactive micro-episode portal hosting independent directors with real-time feedback and viewer co-ownership.'
      }
    },
    workspace: {
      projectId: 'quibi',
      progress: 0,
      tasks: [
        { id: 'quibi-t1', title: 'Plan interactive TikTok embedded mini-story proof of concept', category: 'Research', status: 'Pending', priority: 'High' },
        { id: 'quibi-t2', title: 'Map average retention curves of episodic drama series across social hubs', category: 'Market Validation', status: 'Pending', priority: 'Medium' }
      ],
      notes: [
        { id: 'quibi-n1', title: 'Turnstyle Concept Replacement', content: 'Instead of forcing a rotation mechanic, use standard dual-stream feeds where horizontal views hold the action and vertical holds character backstories.', createdAt: '2026-06-20T08:00:00Z' }
      ],
      contributors: [
        { id: 'quibi-c1', name: 'Rohit Badgujar', role: 'AI Engineer', joined: true }
      ],
      riskMonitor: { execution: 55, market: 80, funding: 75 }
    }
  },
  {
    id: 'vine',
    name: 'Vine',
    tagline: 'Pioneering 6-second short-form looping video application.',
    industry: 'Social Media',
    foundedYear: 2012,
    failedYear: 2016,
    failureStage: 'Early Traction',
    teamSize: 50,
    founder: 'Dom Hofmann, Rus Yusupov, Colin Kroll',
    fundingRaised: '$40M',
    employeeCount: 50,
    avatarEmoji: '🌱',
    primaryFailureReason: 'Failure to provide monetization models for hyper-creators and lack of product iterations while being cannibalized by Instagram Video.',
    potentialScore: 91,
    revivalPossibility: 95,
    companyStatus: 'Shut Down',
    aiConfidence: 99,
    description: 'Vine captured global youth culture with its 6-second repeating loop style, but Twitter acquired and subsequently starved it of independence, failing to deploy ad-revenue shares before the top 50 creators left.',
    timeline: [
      { year: '2012', event: 'Vine is founded and acquired by Twitter prior to official release for $30M.', status: 'good' },
      { year: '2013', event: 'Launches globally, scaling to become the most downloaded free app in the iOS store.', status: 'good' },
      { year: '2014', event: 'Competitors like Instagram launch video features with longer durations.', status: 'neutral' },
      { year: '2015', event: 'Top creators write a collaborative letter requesting product changes and safety monetization; Twitter refuses.', status: 'bad' },
      { year: '2016', event: 'Twitter officially discontinues the uploading feature, converting Vine to an archive.', status: 'bad' }
    ],
    aiAnalysis: {
      summary: 'Vine was a historic product ahead of its timing that pioneered the algorithmic short-form boom. However, parent-company Twitter starves the engineering team, treats creators as free content engines, and reacts too slowly when Instagram added 15-second videos and direct messaging.',
      keyMistakes: [
        'Zero monetization system or advertising revenue shares for elite content makers.',
        'Overly rigid product limits keeping the video loop length at 6 seconds for too long.',
        'Delayed discovery or community tooling additions like messaging or remixing.'
      ],
      rootCauses: {
         funding: 'Twitter starved the sub-organization of engineering flexibility and standalone capital.',
         product: 'Refused to integrate direct monetization or live-streaming capacities until creators walked away.',
         market: 'Rapid competitive counter-maneuvers from Instagram and early ByteDance (musical.ly) models.',
         execution: 'Poor integration within parent company leading to core team exits.',
         timing: 'Slightly early for programmatic micro-insertion ads that make TikTok hyper-profitable.'
      },
      failureDNA: [
        'Acquisition before launch limiting product independence.',
        'Rise of major digital content stars without monetization solutions.',
        'Instagram launches competitive video tools.',
        'Creator exodus and Twitter-mandated shutdown.'
      ],
      revivalProbability: 95,
      marketOpportunity: 'Revisiting short looping video formats with immediate zero-take-rate micro-payments or physical commerce layers in localized communities is highly viable.',
      newRisks: [
        'Incredible platform locking power exerted by TikTok and YouTube Shorts algorithms.',
        'Extremely expensive video bandwidth and CDN hosting requirements at high scale.'
      ],
      modernAlternatives: [
        'Establish an open-platform video network hosting smart-contracts for immediate creator revenue splitting.',
        'Pivot to decentralized visual feeds centered around niche physical events or urban directories.'
      ],
      suggestedImprovements: [
        'Build direct wallet tipping and algorithmic transparency models.',
        'Support native multi-track reactive music and sound libraries.'
      ],
      advisoryAnswers: {
        whatToAvoid: 'Do not ignore the economic baseline of your primary creative class. Avoid corporate parent dependencies with slower product cycles.',
        whatToImprove: 'Provide automated creator dashboard suites with deep viewer retention indicators and ad revenue sharing.',
        modernTechToLeverage: 'Decentralized distributed content delivery networks like IPFS with smart reward loops.',
        changedMarketConditions: 'The creator economy is now a recognized multi-billion dollar vertical with mature programmatic ad networks.',
        v2ProductVision: 'FailureVault v2 concept: "Vine Concept" — a low-latency, open-sourced looping stream powered by community curation nodes.'
      }
    },
    workspace: {
      projectId: 'vine',
      progress: 0,
      tasks: [
        { id: 'vine-t1', title: 'Design decentralized smart-contract revenue split structure', category: 'Research', status: 'Pending', priority: 'High' },
        { id: 'vine-t2', title: 'Prototype a local-first looping audio sync mechanism', category: 'MVP Rebuild', status: 'Pending', priority: 'Medium' }
      ],
      notes: [
        { id: 'vine-n1', title: 'Monetization Mechanics', content: 'In v2 we target zero-middleman tipping loops using lightning or instant ledger rails for micro-cents on views.', createdAt: '2026-06-20T10:00:00Z' }
      ],
      contributors: [],
      riskMonitor: { execution: 30, market: 90, funding: 40 }
    }
  },
  {
    id: 'google-glass',
    name: 'Google Glass',
    tagline: 'Pioneering optical head-mounted smart eyewear.',
    industry: 'Augmented Reality & Hardware',
    foundedYear: 2011,
    failedYear: 2015,
    failureStage: 'MVP / Validation',
    teamSize: 300,
    founder: 'Sergey Brin & Astro Teller',
    fundingRaised: '$150M',
    employeeCount: 300,
    avatarEmoji: '👓',
    primaryFailureReason: 'Catastrophic privacy concerns regarding the front-facing camera, lack of clear consumer use cases, and awkward head-worn aesthetics.',
    potentialScore: 82,
    revivalPossibility: 88,
    companyStatus: 'Shut Down',
    aiConfidence: 97,
    description: 'Google Glass introduced wearable hardware to the masses via an elite $1,500 "Explorer" program, but immediate bans in cafes, movie theaters, and casinos due to dynamic recording capabilities made it a social liability.',
    timeline: [
      { year: '2012', event: 'Sergey Brin demos Google Glass via a high-altitude skydive live stream.', status: 'good' },
      { year: '2013', event: 'Glass Explorer edition ships to selected developers for $1,500; triggers immediate consumer friction.', status: 'good' },
      { year: '2014', event: 'Bars and restaurants post "No Glass" signs; term "Glasshole" enters cultural lexicon.', status: 'bad' },
      { year: '2015', event: 'Google halts sales of the consumer edition, restructuring the project in isolation.', status: 'bad' }
    ],
    aiAnalysis: {
      summary: 'Google Glass was a brilliant piece of optical engineering that failed completely at social design. By placing an unshielded, un-notified active surveillance camera directly on a users face, it turned wearers into walking privacy threats, creating immense peer friction.',
      keyMistakes: [
        'Including an active photo/video recording module without a hard physical shutter or bright signaling LED.',
        'Extremely high price tag coupled with near-zero practical applications for non-technical users.',
        'Aggressive lifestyle marketing on high-fashion runways that looked disconnected from the hardware.'
      ],
      rootCauses: {
         funding: 'Abundant parent company cash insulated the team from real customer testing loops.',
         product: 'Terrible battery layout, excessive heat generation on the temple, and awkward UI controls.',
         market: 'Social rejection of perpetual automated recording devices in private public-private spaces.',
         execution: 'Overhyping an early developer preview as a production fashion accessory.',
         timing: 'Launched before AI spatial understanding, modern low-power edge chips and AR gestures.'
      },
      failureDNA: [
        'Sci-fi concept launched without a primary target audience.',
        'Vocal pushback from local restaurants and privacy advocacy groups.',
        'Social exclusion of the client founder.',
        'Consolidated retreat to closed industrial enterprise sectors.'
      ],
      revivalProbability: 88,
      marketOpportunity: 'AR eyewear has high potential now with modern AI, where glasses act as smart eyes that hear, see, and guide the wearer without a screen, using discrete physical form-factors.',
      newRisks: [
        'Fierce ecosystem wars with Meta Ray-Bans and Apple Vision Pro setups.',
        'Skepticism over persistent local data and AI sensory captures.'
      ],
      modernAlternatives: [
        'Eschew the visual screen component; design audio-only intelligence glasses with a hidden micro-camera that only triggers on explicit verbal requests.',
        'Develop closed industrial heads-up-displays specifically for warehouse and medical diagnostics.'
      ],
      suggestedImprovements: [
        'Integrate a mechanical physics lens-cap that physical targets can see closed.',
        'Build real-time low-latency visual captioning tools for hard-of-hearing populations.'
      ],
      advisoryAnswers: {
        whatToAvoid: 'Do not release smart headgear without clear visual tell-tale lights indicating active recording. Avoid vague generic consumer productivity use cases.',
        whatToImprove: 'Focus initially on voice-driven assistant integrations and hands-free manual workflows (e.g. medical, warehouse, mechanics).',
        modernTechToLeverage: 'Large Multimodal AI Models (LMMs), high-efficiency spatial sound, and bone-conduction panels.',
        changedMarketConditions: 'Meta Smart Glasses demonstrate that consumers accept headwear when it is styled normally and focuses on audio and point-of-view sharing.',
        v2ProductVision: 'FailureVault v2 concept: "Glass AI Lite" — normal-looking frames hosting local LLMs with audio-first bone conduction and private optical sensory chips.'
      }
    },
    workspace: {
      projectId: 'google-glass',
      progress: 0,
      tasks: [
        { id: 'gg-t1', title: 'Compare Metas audio assistant triggers with optical capturing rules', category: 'Research', status: 'Pending', priority: 'High' },
        { id: 'gg-t2', title: 'Design stylish frames that cleverly conceal the signaling LED array', category: 'MVP Rebuild', status: 'Pending', priority: 'Medium' }
      ],
      notes: [],
      contributors: [],
      riskMonitor: { execution: 50, market: 70, funding: 50 }
    }
  },
  {
    id: 'jawbone',
    name: 'Jawbone',
    tagline: 'Pioneering smart fitness bands and premium audio hardware.',
    industry: 'Wearable Technology',
    foundedYear: 1999,
    failedYear: 2017,
    failureStage: 'Scale',
    teamSize: 450,
    founder: 'Hosain Rahman',
    fundingRaised: '$930M',
    employeeCount: 450,
    avatarEmoji: '⌚',
    primaryFailureReason: 'Overcapitalization leading to severe product quality control errors, ballooning warrant operations, and intense competition from Fitbit.',
    potentialScore: 75,
    revivalPossibility: 80,
    companyStatus: 'Shut Down',
    aiConfidence: 96,
    description: 'Jawbone transitioned from military grade headsets to slick wrist-worn "UP" fitness trackers, raising massive capital but falling victim to catastrophic waterproof failures that caused hundreds of thousands of warranty returns.',
    timeline: [
      { year: '2011', event: 'Launches the Jawbone UP fitness tracker; recalled within weeks due to instant bricking.', status: 'bad' },
      { year: '2013', event: 'Raises massive debt and equity valuations, valuing the firm at over $3B.', status: 'good' },
      { year: '2015', event: 'Facing severe customer feedback; struggling to pay vendor partners for hardware supplies.', status: 'bad' },
      { year: '2017', event: 'Fails to secure supplementary capital; enters liquidation process to recover debts.', status: 'bad' }
    ],
    aiAnalysis: {
      summary: 'Jawbone represents the classic pattern of raising too much venture capital, driving an unrealistic valuation that forced them to ship unvetted hardware. The device was beautifully designed but lacked basic mechanical resilience, resulting in crippling warranty liabilities.',
      keyMistakes: [
        'Shipping the original UP band without adequate environmental testing, causing massive immediate recalls.',
        'Using expensive custom flexible logic boards that fractured during standard daily wrist movements.',
        'Over-reliance on commercial debt to finance non-scalable manufacturing cycles.'
      ],
      rootCauses: {
         funding: 'Raised massive structural venture capital that blocked acquisition exits and forced desperate scaling.',
         product: 'Catastrophic engineering defects under heavy movement; poor waterproofing seals.',
         market: 'Fitness trackers quickly became feature commodities integrated directly into Apple Watch or cheap Xiaomi competitors.',
         execution: 'Uncontrolled product timelines and multi-year legal litigation loops with Fitbit.',
         timing: 'Pre-dates the current clinical-health revolution, sitting strictly in the basic steps-tracker gimmick era.'
      },
      failureDNA: [
        'Aggressive venture debt injection at Peak Valuation.',
        'Hardware component defects causing high return rates.',
        'Intense pricing battles from Fitbit and Apple Watch.',
        'Inability to pivot to a software data play and foreclosure.'
      ],
      revivalProbability: 80,
      marketOpportunity: 'Rebuilding Jawbone today means focusing entirely on software-only biomarkers or micro physical health tools (like smart rings) utilizing passive tracking with medical-grade accuracy.',
      newRisks: [
        'Dominance of Google-Fitbit, Apple Watch, and Oura Ring ecosystems.',
        'Dense medical class certification barriers.'
      ],
      modernAlternatives: [
        'Skip wrist trackers entirely; develop biometric audio profiles for ear-worn sleep trackers.',
        'Pivot toward enterprise health data platforms analyzing ambient stress for critical corporate workbases.'
      ],
      suggestedImprovements: [
        'Leverage fully outsourced contract-manufacturers with pre-certified off-the-shelf reference designs.',
        'Build a lightweight, screenless luxury accessory focusing strictly on sleep diagnostics.'
      ],
      advisoryAnswers: {
        whatToAvoid: 'Do not compete on low-margin wrist step counters. Avoid internal production ownership; use agile contract partners.',
        whatToImprove: 'Invest deeply in secure health software metrics and continuous cardiovascular anomalies warning tools.',
        modernTechToLeverage: 'Advanced PPG sensors, edge machine learning models, and low-power Bluetooth 5.4 channels.',
        changedMarketConditions: 'Consumers now pay subscriptions for actionable healthcare data (Oura, Whoop), not just passive step metrics.',
        v2ProductVision: 'FailureVault v2 concept: "Jawbone Core" — screenless luxury performance band syncing data directly to generative AI coaches.'
      }
    },
    workspace: {
      projectId: 'jawbone',
      progress: 0,
      tasks: [
        { id: 'jb-t1', title: 'Compile battery lifetime models for Bluetooth constant stress sensors', category: 'Research', status: 'Pending', priority: 'High' }
      ],
      notes: [],
      contributors: [],
      riskMonitor: { execution: 60, market: 70, funding: 80 }
    }
  },
  {
    id: 'orkut',
    name: 'Orkut',
    tagline: 'Popular early social network that dominated Brazil and India.',
    industry: 'Social Networking',
    foundedYear: 2004,
    failedYear: 2014,
    failureStage: 'Mature Operational',
    teamSize: 120,
    founder: 'Orkut Büyükkökten',
    fundingRaised: '$50M',
    employeeCount: 120,
    avatarEmoji: '👥',
    primaryFailureReason: 'Severe loading latencies, poor UX iterations under Google control, and the rapid rise of Facebooks clean fast platform.',
    potentialScore: 70,
    revivalPossibility: 72,
    companyStatus: 'Shut Down',
    aiConfidence: 99,
    description: 'Orkut was Googles first major social media foray, capturing massive markets in Brazil and India through close-knit communities, but rigid loading blocks and poor photo sharing limits let Facebook swallow the user base.',
    timeline: [
      { year: '2004', event: 'Orkut launched as an internal Googlers side-project; scales heavily in emerging markets.', status: 'good' },
      { year: '2008', event: 'Ownership moves fully to Google Brazil as localized traction accelerates to 90% market share.', status: 'good' },
      { year: '2011', event: 'Facebook optimizes for low-bandwidth mobile devices; Orkut active counts plunge by 50%.', status: 'bad' },
      { year: '2014', event: 'Google officially terminates Orkut, shifting resources to Google+.', status: 'bad' }
    ],
    aiAnalysis: {
      summary: 'Orkut was a community powerhouse that choked on its own engineering architecture. Managed as a side experiment in Google, it had slow loading times, complicated photo-upload constraints, and failed to transition to the mobile application era when Facebook was iterating weekly.',
      keyMistakes: [
        'Ignoring low-bandwidth mobile web performance optimization for emerging countries.',
        'Refusing to allow custom simple layouts, keeping a cluttered desktop forum structure.',
        'Failing to implement robust anti-spam filters, allowing forums to be overrun with fake accounts.'
      ],
      rootCauses: {
         funding: 'Funding was secure, but corporate attention was split across multiple failed social experiments.',
         product: 'Heavy Java applet structures that loaded slowly on standard developing country connections.',
         market: 'Facebook optimized a blazing-fast, lightweight wall-based UI that was easy to scan.',
         execution: 'Too many corporate approval layers within Google to release simple features like albums.',
         timing: 'Predates the mobile smartphone explosion where mobile application efficiency decided survival.'
      },
      failureDNA: [
        'Rapid viral adoption in non-US markets.',
        'Extreme system loading latencies and page timeout errors.',
        'Facebook deploys tailored features for low-bandwidth networks.',
        'User migration away from classic forums to interactive feeds.'
      ],
      revivalProbability: 72,
      marketOpportunity: 'In a saturated algorithmic social media world, there is a distinct revival point for private, interest-based social clubs that focus on authentic relationships and refuse surveillance mechanics.',
      newRisks: [
        'Extreme user fatigue across any new social network logins.',
        'Complex network effect cold-start hurdles.'
      ],
      modernAlternatives: [
        'Build highly localized, geographical-specific social directories managed on local edge devices.',
        'Design private, interest-based messaging circles powered by end-to-end encryption with no surveillance ads.'
      ],
      suggestedImprovements: [
        'Use local-first database sync algorithms for instant, offline social interactions.',
        'Emphasize community moderation tools where users possess structural ownership.'
      ],
      advisoryAnswers: {
        whatToAvoid: 'Do not chase generic global social loops. Do not depend on centralized algorithmic feed manipulations.',
        whatToImprove: 'Deliver private micro-communities with robust built-in chat pools and rapid visual sharing workflows.',
        modernTechToLeverage: 'Local-first databases, fast client-side indexing frameworks, and decentralized federated platforms.',
        changedMarketConditions: 'Users are increasingly walking away from empty public media feeds in favor of private Discord circles and group chats.',
        v2ProductVision: 'FailureVault v2 concept: "Orkut Circles" — a federated, extremely fast, private social ring for tight enthusiast communities.'
      }
    },
    workspace: {
      projectId: 'orkut',
      progress: 0,
      tasks: [
        { id: 'orkut-t1', title: 'Compare federated social platforms (ActivityPub, Bluesky AT)', category: 'Research', status: 'Pending', priority: 'Medium' }
      ],
      notes: [],
      contributors: [],
      riskMonitor: { execution: 30, market: 85, funding: 30 }
    }
  },
  {
    id: 'segway',
    name: 'Segway',
    tagline: 'Pioneering two-wheeled self-balancing personal transporters.',
    industry: 'Urban Mobility & Transportation',
    foundedYear: 1999,
    failedYear: 2020,
    failureStage: 'Mature Operational',
    teamSize: 200,
    founder: 'Dean Kamen',
    fundingRaised: '$120M',
    employeeCount: 200,
    avatarEmoji: '🛴',
    primaryFailureReason: 'Exorbitant initial consumer cost ($5k), weight and battery limitations, social and regulatory sidewalk bans, and poor positioning.',
    potentialScore: 88,
    revivalPossibility: 90,
    companyStatus: 'Acquired',
    aiConfidence: 91,
    description: 'Segway launched with massive hype as the future of cities, but its high price ($5k), bulky footprint, and sidewalk regulations kept it relegated to tourist tours, before electric kick-scooters captured the micro-mobility boom.',
    timeline: [
      { year: '2001', event: 'Dean Kamen unveils Segway on Good Morning America; promises it will make cars obsolete.', status: 'good' },
      { year: '2002', event: 'Ships for $4,950; sales fail to meet 1% of the optimistic projections.', status: 'bad' },
      { year: '2003', event: 'Cities ban the high-speed heavy machinery from public sidewalks due to pedestrian risks.', status: 'bad' },
      { year: '2015', event: 'Ninebot (Chinese mobility company) acquires Segway in its entirety.', status: 'neutral' },
      { year: '2020', event: 'Ninebot officially retires the original balance-wheel machinery to focus on kick scooters.', status: 'bad' }
    ],
    aiAnalysis: {
      summary: 'Segway created incredibly complex self-balancing gyro hardware but failed at pricing, social positioning, and design agility. Instead of an elegant, cheap commuter asset, it was a heavy 100-pound gold-plated device that cost as much as a used car, forcing a consumer retreat.',
      keyMistakes: [
        'Extremely high price point ($4,950 in 2001) that shut out the average middle-class commuter.',
        'Massive chassis weight and bulky structural frame that could not be carried up apartment stairwells.',
        'Neglecting the simple, lightweight kick scooter form-factor which ended up winning micro-mobility.'
      ],
      rootCauses: {
         funding: 'Abundant venture backing insulated the engineers from designing a simple commercial product.',
         product: 'Over-engineered self-balancing mechanical gyros; lacked simple folding mechanisms.',
         market: 'Sidewalk bans and safety liabilities combined with zero bike-lane infrastructure support in 2001.',
         execution: 'Excessive PR hype before revealing the product, creating massive anti-climactic customer disappointment.',
         timing: 'Too early. Lithium-ion tech was immature, making batteries heavy and extremely hazardous.'
      },
      failureDNA: [
        'Over-hyped mysterious technology reveals.',
        'High retail price limits volume scaling.',
        'Sidewalk exclusions from major municipal bureaus.',
        'Market disruption by ultra-lightweight dockless kick e-scooters.'
      ],
      revivalProbability: 90,
      marketOpportunity: 'Micro-mobility is a massive industry now. The focus has moved to modular, dockless, easily swappable urban electric scooters and utility cargo bikes backed by city integrations.',
      newRisks: [
        'Intense hardware pricing wars with massive Chinese industrial manufacturers.',
        'Municipal parking regulations and heavy physical abuse of public vehicles.'
      ],
      modernAlternatives: [
        'Design modular swappable battery systems for fleets of electric cargo-delivery bicycles.',
        'Create localized folding smart kick scooters optimized entirely for ultra-lightweight composite materials.'
      ],
      suggestedImprovements: [
        'Transition entirely to lightweight, folding hub-motor designs with zero proprietary gyroscope complexity.',
        'Target business-to-business warehouse and airport staff logistics natively.'
      ],
      advisoryAnswers: {
        whatToAvoid: 'Do not build proprietary self-balancing configurations where simple wheels and a handlebar suffice. Avoid retail prices higher than $1,500 for lightweight personal commuter devices.',
        whatToImprove: 'Focus on easy portability, folding locks, lightweight architectures, and modern digital fleet tracking integrations.',
        modernTechToLeverage: 'High-density lightweight LFP batteries, brushless in-wheel hub motors, and cellular IoT fleet managers.',
        changedMarketConditions: 'Urban zones worldwide now feature dedicated bike lanes, micro-mobility corridors, and digital rental setups (Bird, Lime).',
        v2ProductVision: 'FailureVault v2 concept: "Segway Air" — an ultra-light carbon-composite folding scooter weighs under 15 lbs with swappable batteries.'
      }
    },
    workspace: {
      projectId: 'segway',
      progress: 0,
      tasks: [
        { id: 'segway-t1', title: 'Model hub-motor electric power consumption on steady incline grades', category: 'Research', status: 'Pending', priority: 'Medium' }
      ],
      notes: [],
      contributors: [],
      riskMonitor: { execution: 40, market: 60, funding: 50 }
    }
  },
  {
    id: 'theranos',
    name: 'Theranos',
    tagline: 'Disastrous health technology firm promising miniature blood diagnostics.',
    industry: 'HealthTech & Diagnostics',
    foundedYear: 2003,
    failedYear: 2018,
    failureStage: 'Mature Operational',
    teamSize: 800,
    founder: 'Elizabeth Holmes',
    fundingRaised: '$700M',
    employeeCount: 800,
    avatarEmoji: '🩸',
    primaryFailureReason: 'Fraud, systemic scientific falsification, severe microfluidics engineering barriers, and lack of peer review validation.',
    potentialScore: 4,
    revivalPossibility: 5,
    companyStatus: 'Shut Down',
    aiConfidence: 0.99,
    description: 'Theranos promised to run hundreds of clinical lab tests from a single pinprick of finger blood using its proprietary "Edison" analyzer, but secretly ran tests on commercial Siemens machines while falsifying test outcomes.',
    timeline: [
      { year: '2003', event: 'Elizabeth Holmes drops out of Stanford at 19 to invent customizable blood-testing hardware.', status: 'good' },
      { year: '2013', event: 'Partners with Walgreens to launch wellness centers; validation reports are classified.', status: 'good' },
      { year: '2014', event: 'Valued at $9B with high-profile board members including Henry Kissinger.', status: 'good' },
      { year: '2015', event: 'John Carreyrou publishes blockbuster Wall Street Journal expose proving scientific fraud.', status: 'bad' },
      { year: '2518', event: 'Theranos is formally dissolved; Holmes and Balwani are convicted of federal wire fraud wire.', status: 'bad' }
    ],
    aiAnalysis: {
      summary: 'Theranos attempted to bypass the absolute rules of fluid physics and clinical validation through aggressive marketing, legal intimidation, and corporate secrecy. You cannot "fake it till you make it" in healthcare diagnostics, and ignoring peer review results in catastrophic threat to human life.',
      keyMistakes: [
        'Falsifying active healthcare diagnostics reports, relying on raw manipulation to maintain valuation loops.',
        'Threatening internal whistleblowers and journalists with career-destroying litigation.',
        'Neglecting peer-reviewed scientific testing in favor of high-profile political board validation.'
      ],
      rootCauses: {
         funding: 'Silicon Valley FOMO allowed massive funding rounds with zero deep scientific due diligence.',
         product: 'Fails basic fluid mechanics: drawing finger blood hemolyzes cells, making low-volume accurate testing scientifically impossible with their tech.',
         market: 'Strict medical regulatory frameworks were ignored or actively bypassed.',
         execution: 'Toxic culture of compartmentalization, intense fear, and technical gaslighting.',
         timing: 'N/A — the fundamental underlying scientific value proposition remains a physical impossibility with fingerprint samples.'
      },
      failureDNA: [
        'Charismatic founder narrative captures premier tech investors.',
        'Product development hits insurmountable physical boundaries.',
        'Systematic falsification of test datasets.',
        'Regulatory audits, federal indictments, and total bankruptcy.'
      ],
      revivalProbability: 4,
      marketOpportunity: 'Zero support for any literal Edison replication. Legitimate companies now focus on high-volume venous blood processing with fully transparent, open clinical data sets and peer-reviewed automation.',
      newRisks: [
        'Total loss of scientific trust in single-sample multiple-indicator tests.',
        'Extremely high ongoing regulatory liability.'
      ],
      modernAlternatives: [
        'Focus on non-invasive continuous biomarker monitoring (like sweat-based glucose or spatial acoustic tracking), completely avoiding blood extractions.',
        'Develop open-source microfluidic labs specifically targeting remote animal-health diagnostics.'
      ],
      suggestedImprovements: [
        'Publish all clinical research in open-access scientific journals with independent peer review.',
        'Operate solely within pre-certified medical testing guidelines.'
      ],
      advisoryAnswers: {
        whatToAvoid: 'Never bypass clinical validation loops or falsify technical results under any circumstances. Avoid toxic cultures that prohibit scientific dissent.',
        whatToImprove: 'Rebuild through radical transparency, independent laboratory benchmarking, and open validation repositories.',
        modernTechToLeverage: 'Modular high-throughput mass spectroscopy, open-source microfluidics libraries, and automated AI data verification indices.',
        changedMarketConditions: 'FDA and medical governance bureaus have drastically escalated scrutiny of non-typical blood testing devices following the collapse.',
        v2ProductVision: 'FailureVault v2 concept: "PhysioLabs Open" — a completely open-source veterinary capillary blood diagnostics platform with public validation data.'
      }
    },
    workspace: {
      projectId: 'theranos',
      progress: 0,
      tasks: [
        { id: 'theranos-t1', title: 'Audit FDA guidance for Class II medical diagnostics devices', category: 'Research', status: 'Pending', priority: 'High' }
      ],
      notes: [],
      contributors: [],
      riskMonitor: { execution: 95, market: 99, funding: 99 }
    }
  },
  {
    id: 'better-place',
    name: 'Better Place',
    tagline: 'Ambitious electric vehicle charging & dynamic battery-swapping network.',
    industry: 'Clean Energy & EV Infrastructure',
    foundedYear: 2007,
    failedYear: 2013,
    failureStage: 'Scale',
    teamSize: 400,
    founder: 'Shai Agassi',
    fundingRaised: '$850M',
    employeeCount: 400,
    avatarEmoji: '🔋',
    primaryFailureReason: 'Exorbitant capital expenditure for mechanical automated swap stations ($2M each), lack of manufacturer alignment, and poor consumer adoption.',
    potentialScore: 88,
    revivalPossibility: 90,
    companyStatus: 'Shut Down',
    aiConfidence: 95,
    description: 'Better Place envisioned a world where EV drivers did not wait for battery charges: they instead drove into robotic tunnels that swapped a depleted pack for a full one in 60 seconds, burning $850M before automakers refused standard battery mounts.',
    timeline: [
      { year: '2007', event: 'Shai Agassi launches Better Place; partners with Israel and Renault to pilot battery swapping.', status: 'good' },
      { year: '2010', event: 'Demonstrates robotic swapping tunnel; obtains massive infrastructure credit rounds.', status: 'good' },
      { year: '2012', event: 'Only Renault adopts the swap design; other major manufacturers choose proprietary enclosed platforms.', status: 'bad' },
      { year: '2013', event: 'Total units sold are under 1,000; the organization runs out of cash and declares bankruptcy.', status: 'bad' }
    ],
    aiAnalysis: {
      summary: 'Better Place was culturally correct on EVs but catastrophically wrong on standardization. They spent hundreds of millions building massive mechanical swap structures before securing standard battery form agreements from leaders like BMW, Audi, or Tesla, trapping them with high CapEx and one customer (Renault).',
      keyMistakes: [
        'Building $2M robotic stations before securing battery form standardization across global manufacturers.',
        'Focusing on high-overhead mechanical stations instead of scaling cheap DC fast charging boards.',
        'Over-promising quick national rollouts to governments before proving simple local unit-economics.'
      ],
      rootCauses: {
         funding: 'Massive early capital allowed them to pursue high-CapEx infrastructure projects without real constraints.',
         product: 'The mechanics of robotic swapping worked perfectly but were expensive and complex to maintain in dirt/snow.',
         market: 'Automobile companies viewed battery design as their core intellectual property and refused standardized swappable pods.',
         execution: 'Unrealistic demand models assumed 100,000 active EVs on roads by 2011.',
         timing: 'Too early. High-efficiency fast charging (like Teslas Superchargers) emerged shortly after, making swaps obsolete for standard sedan consumers.'
      },
      failureDNA: [
        'Massive capital raised for infrastructure deployment.',
        'Failure to establish cross-industry battery design standards.',
        'High real-estate and operational upkeep liabilities.',
        'Unsold inventory, lack of partner backing, and total liquidation.'
      ],
      revivalProbability: 90,
      marketOpportunity: 'Battery swapping is actively succeeding today in focused, high-use niches: two-wheeled electric mopeds (Gogoro in Taiwan) and premium heavy logistics fleets (NIO in China).',
      newRisks: [
        'Tesla-style extreme high-speed megawatt charging systems removing the speed argument.',
        'High weight and thermal challenges in modern heavy lithium-pack architectures.'
      ],
      modernAlternatives: [
        'Develop swappable battery systems specifically targetting electric urban delivery two-wheelers.',
        'Design local neighborhood micro-grid battery buffers that charge via solar and output DC super-power.'
      ],
      suggestedImprovements: [
        'Partner exclusively on micro-mobility where batteries are light, manual-swappable, and require no robotic tunnels.',
        'Establish direct shared utility models on delivery moped fleets.'
      ],
      advisoryAnswers: {
        whatToAvoid: 'Do not build mechanical replacement systems requiring complex, multi-million dollar robotic hardware. Do not lock yourself with one vehicle manufacturer.',
        whatToImprove: 'Focus on manual swappable modular batteries, open API specifications, and low-CapEx neighborhood swap lockers.',
        modernTechToLeverage: 'Advanced high-cycle LFP cells, automated IoT locker connectivity, and dynamic rental subscription software.',
        changedMarketConditions: 'EV adoption is mainstream, and commercial delivery riders require instant 30-second refuel systems to maintain transit margins.',
        v2ProductVision: 'FailureVault v2 concept: "Better Place Micro" — an automated battery rental locker system for electric moped logistics fleets.'
      }
    },
    workspace: {
      projectId: 'better-place',
      progress: 0,
      tasks: [
        { id: 'bp-t1', title: 'Compare commercial unit economics of fast-chargers vs battery rental lockers', category: 'Research', status: 'Pending', priority: 'High' }
      ],
      notes: [],
      contributors: [],
      riskMonitor: { execution: 50, market: 50, funding: 80 }
    }
  },
  {
    id: 'webvan',
    name: 'Webvan',
    tagline: 'The legendary dot-com casualty of automated home grocery delivery.',
    industry: 'E-Commerce & Grocery',
    foundedYear: 1996,
    failedYear: 2001,
    failureStage: 'Scale',
    teamSize: 2000,
    founder: 'Louis Borders',
    fundingRaised: '$800M',
    employeeCount: 2000,
    avatarEmoji: '🛒',
    primaryFailureReason: 'Insane capital expenditure on massive automated warehouses before proof of regional consumer demand, causing instant cash burn.',
    potentialScore: 88,
    revivalPossibility: 90,
    companyStatus: 'Shut Down',
    aiConfidence: 99,
    description: 'Webvan aimed to bring groceries to doors within 30 minutes, investing $1B building automated warehouses with custom robotics, burning through its total capital reserves before average basket sizes could cover basic delivery costs.',
    timeline: [
      { year: '1999', event: 'Webvan raises massive IPO; stock surges and expands delivery to 26 cities.', status: 'good' },
      { year: '2000', event: 'Deploys massive custom automated distribution hubs in San Francisco and Chicago.', status: 'good' },
      { year: '2001', event: 'Average order margins fail to cover warehouse CapEx and route maintenance.', status: 'bad' },
      { year: '2001', event: 'Declares bankruptcy, laying off 2,000 employees; physical warehouse assets sold for scrap.', status: 'bad' }
    ],
    aiAnalysis: {
      summary: 'Webvan fell victim to the "Get Big Fast" mania of the dot-com bubble. By investing in massive custom automated warehouses before confirming the consumer online-buying habit even existed, they built a massive physical machine with zero underlying customer demand to feed it.',
      keyMistakes: [
        'Buying massive high-overhead, custom warehouses instead of starting with manual, localized picking grids.',
        'Extremely aggressive multi-city expansion before proving sustainable unit economics in a single market.',
        'Underestimating the massive friction of online credit card usage and home internet speeds in 2000.'
      ],
      rootCauses: {
         funding: 'Abundant capital decoupled management from real operational cash-flow sanity.',
         product: 'The website and warehouses worked perfectly, but order densities were too low to cover massive fixed assets.',
         market: 'Unready consumers preferred picking their own produce; slow home internet speeds.',
         execution: 'Led by a group of consultants who prioritized massive scale-out volume over localized density metrics.',
         timing: 'Too early. Pre-dates modern mobile apps, GPS-optimized routing algorithms, and ubiquitous digital credit cards.'
      },
      failureDNA: [
        'Aggressive capital raised on a dot-com narrative loop.',
        'Simultaneous 10-city launch with custom high-CapEx warehouses.',
        'Average order margins fall below delivery driver operational costs.',
        'Dot-com stock crash, drying up credit, and total liquidation.'
      ],
      revivalProbability: 92,
      marketOpportunity: 'Online groceries are highly mature now (Instacart, Amazon Fresh). Rebuilding means leveraging existing dark stores, automated micro-fulfillment centers (MFCs), or manual gig-economy labor to scale with zero warehouse CapEx.',
      newRisks: [
        'Extremely low net grocery margins and fierce price wars with Walmart, Target, and Kroger.',
        'Unsafe driver overhead liability and insurance costs.'
      ],
      modernAlternatives: [
        'Build automated micro-fulfillment SaaS integrations inside existing local organic supermarkets.',
        'Establish direct-to-consumer agricultural networks bypassing standard retail middlemen entirely.'
      ],
      suggestedImprovements: [
        'Start with a capital-light asset model, manually picking groceries from existing stores.',
        'Incorporate dynamic route grouping algorithms to ensure delivery density exceeds 3 orders per route-hour.'
      ],
      advisoryAnswers: {
        whatToAvoid: 'Do not build single-purpose, multi-million dollar regional warehouses until local customer density is proven. Avoid low-density delivery zones.',
        whatToImprove: 'Leverage gig-economy drivers, dynamic density pricing, micro-fulfillment centers, and high-frequency weekly subscription setups.',
        modernTechToLeverage: 'GPS routing APIs, AI-driven inventory prediction indices, and mobile-first frictionless payments.',
        changedMarketConditions: 'Consumers are fully accustomed to purchasing everything online via mobile devices with automated door drop-off expectations.',
        v2ProductVision: 'FailureVault v2 concept: "Webvan Edge" — zero-CapEx local grocery routing software matching local grocers with gig drivers in microzones.'
      }
    },
    workspace: {
      projectId: 'webvan',
      progress: 0,
      tasks: [
        { id: 'wv-t1', title: 'Compare regional delivery unit economics of independent drivers vs third-party systems', category: 'Research', status: 'Pending', priority: 'High' }
      ],
      notes: [],
      contributors: [],
      riskMonitor: { execution: 30, market: 40, funding: 50 }
    }
  },
  {
    id: 'pebble',
    name: 'Pebble',
    tagline: 'Pioneering e-paper customizable smartwatches.',
    industry: 'Consumer Electronics & Wearables',
    foundedYear: 2012,
    failedYear: 2016,
    failureStage: 'Scale',
    teamSize: 150,
    founder: 'Eric Migicovsky',
    fundingRaised: '$45M',
    employeeCount: 150,
    avatarEmoji: '⌚',
    primaryFailureReason: 'Competitive pressure from Apple Watch, lack of capital to scale next-gen displays, and inventory over-purchase.',
    potentialScore: 84,
    revivalPossibility: 91,
    companyStatus: 'Acquired',
    aiConfidence: 0.96,
    description: 'Pebble pioneered smartwatches via an historic $10M Kickstarter campaign, but failed to survive when Apple arrived with massive marketing power, leaving Pebble with unsold inventory and mounting debts.',
    timeline: [
      { year: '2012', event: 'Failing to secure VC support, Pebble launches on Kickstarter; raises $10M in weeks.', status: 'good' },
      { year: '2013', event: 'Ships the original Pebble with low-power e-paper display and 7-day battery life.', status: 'good' },
      { year: '2015', event: 'Launches Pebble Time on Kickstarter setting a record $20M; Apple Watch launches.', status: 'neutral' },
      { year: '2016', event: 'Struggling with overstock and debt; Pebble dissolves, selling software assets to Fitbit.', status: 'bad' }
    ],
    aiAnalysis: {
      summary: 'Pebble was a highly loved, efficient smartwatch that fell due to inventory mismatches and aggressive ecosystem pressure from Apple and Samsung. By projecting huge standard retail sales that dried up, they over-purchased physical components, draining their cash reserves.',
      keyMistakes: [
        'Over-purchasing hardware components based on optimistic retail sales projections.',
        'Expanding product variants too quickly (Pebble, Steel, Time, Round) instead of refining a single core asset.',
        'Trying to compete head-on with multi-billion dollar smartphone networks in general-purpose apps.'
      ],
      rootCauses: {
         funding: 'Locked out of major late-stage venture rounds because Silicon Valley assumed Apple would dominate.',
         product: 'E-paper was highly legible and had amazing 7-day limits, but consumers began preferring high-fidelity color OLED screens.',
         market: 'Immediate consumer market saturation from Apple Watch and low-cost Android wearable boards.',
         execution: 'Poor inventory control with massive capital locked up in unsold physical smartwatch boxes.',
         timing: 'Pre-dates mature SDK wearable tooling and independent wellness tracking APIs.'
      },
      failureDNA: [
        'Record-breaking crowdfunding campaigns validate early consumer adoption.',
        'Launch of heavy competitive alternative by platform gatekeeper (Apple).',
        'Over-committed inventory cycles leading to immediate working capital shock.',
        'Exempt acquisition of patent assets by Fitbit and brand shutdown.'
      ],
      revivalProbability: 91,
      marketOpportunity: 'There is a highly active, growing niche for simple, focused, screen-light wearables: people want to de-clutter their digital lives with low-power, single-purpose smartwatches focusing on text and health with 15-day batteries.',
      newRisks: [
        'Ecosystem lock-in where Apple and Google limit third-party wearable Bluetooth background connection features.',
        'High development costs of custom hardware.'
      ],
      modernAlternatives: [
        'Build open-source hackable e-paper watches for the hardware enthusiast community.',
        'Design sleek wearable smart rings specializing strictly in tactile micro-vibrations for filtered messages.'
      ],
      suggestedImprovements: [
        'Operate strictly on a build-to-order manufacturing model bypassing traditional retail distribution.',
        'Focus on extreme integration with open-source wellness SDKs.'
      ],
      advisoryAnswers: {
        whatToAvoid: 'Do not compete on visual gaming or color app screens. Avoid holding massive warehouse stock reserves; utilize direct-to-consumer pipelines.',
        whatToImprove: 'Leverage focused e-paper, ultra-long battery life, tactile control buttons, and open hackable APIs.',
        modernTechToLeverage: 'Desaturate low-power e-ink displays, ultra-efficient Bluetooth Low Energy (BLE), and localized companion apps.',
        changedMarketConditions: 'Consumers are feeling deeply burnt out by constant high-vibe screen notifications and welcome low-vibe desaturated options.',
        v2ProductVision: 'FailureVault v2 concept: "Pebble Lite" — a minimalist desaturated e-ink watch with 14-day battery life, optimized for digital detox.'
      }
    },
    workspace: {
      projectId: 'pebble',
      progress: 0,
      tasks: [
        { id: 'pebble-t1', title: 'Compare e-paper refresh rate power targets over standard BLE standards', category: 'Research', status: 'Pending', priority: 'Medium' }
      ],
      notes: [],
      contributors: [],
      riskMonitor: { execution: 30, market: 55, funding: 60 }
    }
  },
  {
    id: 'juicero',
    name: 'Juicero',
    tagline: 'The infamous luxury connected home cold-press juicer.',
    industry: 'FoodTech & Smart Appliance',
    foundedYear: 2013,
    failedYear: 2017,
    failureStage: 'MVP / Validation',
    teamSize: 100,
    founder: 'Doug Evans',
    fundingRaised: '$120M',
    employeeCount: 100,
    avatarEmoji: '🍊',
    primaryFailureReason: 'Catastrophic design over-engineering and the discovery that proprietary juice packs could be squeezed manually with human hands with equal efficiency.',
    potentialScore: 10,
    revivalPossibility: 15,
    companyStatus: 'Shut Down',
    aiConfidence: 0.99,
    description: 'Juicero constructed a $700 connected cold-press machine that squeezed proprietary vacuum-sealed packets of chopped fruits, but shut down after a Bloomberg viral video proved that users could squeeze the packs just as fast using bare hands.',
    timeline: [
      { year: '2013', event: 'Juicero is founded; raises $120M from elite VCs including Google Ventures.', status: 'good' },
      { year: '2016', event: 'Launches press for $699; requires internet connection to scan QR codes on pods.', status: 'good' },
      { year: '2017', event: 'Slashes price to $399; Bloomberg prints a column showing hand-squeezed packets operate perfectly.', status: 'bad' },
      { year: '2017', event: 'Offers instant refunds to all buyers and halts operations, liquidating assets.', status: 'bad' }
    ],
    aiAnalysis: {
      summary: 'Juicero is the definitive case study of over-engineering a product looking for a problem. By spending millions designing custom high-pressure structural steel presses that could crush stones, they forgot to ask if the core mechanism provided any benefits over simple manual force, leading to visual ridicule.',
      keyMistakes: [
        'Over-engineering a basic kitchen process to justify an aggressive, unnecessary venture capital valuation.',
        'Locking the machine with internet connectivity requirements to prevent users from pressing non-official pods.',
        'High premium pricing ($700) that ignored standard household kitchen economics.'
      ],
      rootCauses: {
         funding: 'Abundant venture funding created an echo-chamber of high-tech hardware solutions.',
         product: 'The press was beautiful but incredibly complex (containing gears, custom motors, Wi-Fi chips, and aluminum frames).',
         market: 'Zero real consumer demand for a massive counter-top machine that only executed one locked action.',
         execution: 'Terrible PR handling of the Bloomberg reveal; inability to pivot to a simple packaging-only model.',
         timing: 'Launched when tech bubbles celebrated "smart home" IoT hardware without considering long-term customer value.'
      },
      failureDNA: [
        'Venture capitalists fund high-tech connected hardware mockup.',
        'Aggressive pricing and mandatory internet scanning locking.',
        'Bloomberg visual hand-pressing video goes viral.',
        'Instant brand death and refunds.'
      ],
      revivalProbability: 15,
      marketOpportunity: 'Food-tech returns sit in circular sustainable packaging or organic raw ingredient delivery loops, entirely omitting complex IoT hardware boxes.',
      newRisks: [
        'Global consumer aversion to kitchen appliances that require WiFi/internet to operate.'
      ],
      modernAlternatives: [
        'Design biodegradable cold-press concentrate pods that mix directly with household water without any machinery.',
        'Develop simple, non-electric manual leverage steel presses for local juice shops.'
      ],
      suggestedImprovements: [
        'Eliminate all Wi-Fi, gears, and motors; build simple manual tools.',
        'Sell raw organic pulp packages directly to general-store buyers.'
      ],
      advisoryAnswers: {
        whatToAvoid: 'Do not build IoT hardware locks that block the user from manually handling the underlying ingredient. Avoid over-engineering basic physical processes.',
        whatToImprove: 'Focus strictly on packaging, organic supply chains, simple mechanical tools, and high-frequency recurring subscription logic.',
        modernTechToLeverage: 'Fully compostable bio-plastics and agile logistics optimization software.',
        changedMarketConditions: 'Skepticism over redundant "smart household appliances" has reached historic highs; users favor high-utility tools.',
        v2ProductVision: 'FailureVault v2 concept: "Juicero Bio-Fresh" — direct delivery of organic, completely cold-pressed concentrates packaged in compostable paper pods.'
      }
    },
    workspace: {
      projectId: 'juicero',
      progress: 0,
      tasks: [
        { id: 'j-t1', title: 'Plan biodegradable concentrate delivery pouch material tests', category: 'Research', status: 'Pending', priority: 'Medium' }
      ],
      notes: [],
      contributors: [],
      riskMonitor: { execution: 70, market: 95, funding: 85 }
    }
  },
  {
    id: 'kodak',
    name: 'Kodak',
    tagline: 'The historic photographic film giant that missed the digital wave.',
    industry: 'Photography & Film',
    foundedYear: 1888,
    failedYear: 2012,
    failureStage: 'Mature Operational',
    teamSize: 140000,
    founder: 'George Eastman',
    fundingRaised: '$2.5B',
    employeeCount: 140000,
    avatarEmoji: '📷',
    primaryFailureReason: 'Fear of cannibalizing their highly profitable chemical film and paper print business, allowing digital competitors to capture the market.',
    potentialScore: 65,
    revivalPossibility: 70,
    companyStatus: 'Shut Down',
    aiConfidence: 0.99,
    description: 'Kodak invented the world’s first digital camera in 1975, but executives buried the breakthrough to protect lucrative film roll sales, paving the way for Sony, Canon, and smartphones to render physical film obsolete.',
    timeline: [
      { year: '1975', event: 'Steve Sasson at Kodak invents the first portable digital camera sensor.', status: 'good' },
      { year: '1996', event: 'Kodak sales peak, dominating 90% of US physical film markets.', status: 'good' },
      { year: '2001', event: 'Consumers transition rapidly to digital cameras; Kodak film orders drop dramatically.', status: 'bad' },
      { year: '2012', event: 'Kodak declares Chapter 11 bankruptcy, restructuring to survive as an intellectual property firm.', status: 'bad' }
    ],
    aiAnalysis: {
      summary: 'Kodak represents the ultimate case study of corporate innovator’s dilemma. They possessed the core engineering technology but lacked the strategic courage to cannibalize their existing high-margin print supply chains, letting external rivals capture the digital photography shift.',
      keyMistakes: [
        'Treating digital photography as a temporary fade rather than a paradigm shift.',
        'Over-protecting high-margin legacy chemical roll assets at the expense of next-gen sensor investments.',
        'Failing to capture the software sharing ecosystem (missing the Instagram pivot).'
      ],
      rootCauses: {
         funding: 'Abundant legacy profits created a false sense of security, delaying structural pivot actions.',
         product: 'Excellent physical paper print tech, but poor web-sharing software solutions.',
         market: 'Rapid, exponential move to consumer file sharing and digital displays.',
         execution: 'Corporate bureaucracy and siloed executive teams refused to re-allocate manufacturing budgets to web tech.',
         timing: 'Buried digital solutions for over 15 years, wasting their massive technical head start.'
      },
      failureDNA: [
        'Internal invention of disruptive digital tech is suppressed.',
        'Legacy high-margin asset sales begin slow structural decline.',
        'Competitors capture the digital sensor consumer scale.',
        'Total collapse of film rolls, Chapter 11 filing, and IP fire sales.'
      ],
      revivalProbability: 70,
      marketOpportunity: 'There is a high-margin renaissance of physical retro film aesthetics among Gen Z creators today. Rebuilding involves elite, high-end retro physical cameras paired directly with seamless mobile-cloud digital scanning.',
      newRisks: [
        'Fierce digital saturation and lack of chemical manufacturing facilities globally.'
      ],
      modernAlternatives: [
        'Build a premium retro physical camera brand focused on tactile mechanical dials and instant smart-sync to mobile phone rolls.',
        'Design advanced optical filters and software pipelines mimicking classic Kodak chrome emulsion profiles.'
      ],
      suggestedImprovements: [
        'Emphasize the physical emotional-tactile experience of print/film rolls as premium artistic assets.',
        'Establish close-knit developer APIs for digital-film scanning lockers.'
      ],
      advisoryAnswers: {
        whatToAvoid: 'Never deprioritize a disruptive internal technological breakthrough to protect legacy high-margin cash cows.',
        whatToImprove: 'Rebuild centered completely on high-end nostalgic tactile items and instant, wireless digital processing networks.',
        modernTechToLeverage: 'High-speed wireless cloud synchronization, high-fidelity light sensors, and custom software simulation algorithms.',
        changedMarketConditions: 'Analog photography has returned as an elite, premium, anti-digital-fatigue trend globally.',
        v2ProductVision: 'FailureVault v2 concept: "Kodak Emulsion" — a premium hybrid mechanical camera that prints physical film while auto-syncing RAW digital copies to social layers.'
      }
    },
    workspace: {
      projectId: 'kodak',
      progress: 0,
      tasks: [
        { id: 'k-t1', title: 'Model current consumer willingness-to-pay margins for premium retro cameras', category: 'Research', status: 'Pending', priority: 'High' }
      ],
      notes: [],
      contributors: [],
      riskMonitor: { execution: 30, market: 40, funding: 50 }
    }
  },
  {
    id: 'nokia',
    name: 'Nokia Smartphone Decline',
    tagline: 'The dramatic decline of the mobile hardware king pin.',
    industry: 'Consumer Electronics',
    foundedYear: 1865,
    failedYear: 2014,
    failureStage: 'Mature Operational',
    teamSize: 100000,
    founder: 'Fredrik Idestam',
    fundingRaised: '$5B',
    employeeCount: 100000,
    avatarEmoji: '📱',
    primaryFailureReason: 'Insistence on the clunky Symbian/MeeGo OS, underestimating the iOS touch revolution, and a late desperate transition to Windows Phone.',
    potentialScore: 78,
    revivalPossibility: 82,
    companyStatus: 'Acquired',
    aiConfidence: 0.99,
    description: 'Nokia controlled over 40% of the global mobile phone market in 2007, but ignored the software-ecosystem transition, letting Apple’s iOS and Google’s Android render Symbian obsolete before selling its phone business for a fraction of its Peak value.',
    timeline: [
      { year: '2007', event: 'Nokia dominates 50% of the mobile profit pool; Apple unveils the capacitive-touch iPhone.', status: 'good' },
      { year: '2010', event: 'Symbian OS is widely criticized as complex for touch apps; Stephen Elop hired as CEO.', status: 'neutral' },
      { year: '2011', event: 'Elop prints "Burning Platform" memo; switches Nokia entirely to Windows Phone OS.', status: 'bad' },
      { year: '2013', event: 'Windows Phone fails to capture 5% market share; Microsoft buys Nokias phone division for $7.2B.', status: 'bad' }
    ],
    aiAnalysis: {
      summary: 'Nokia failed by viewing smartphones as a hardware-first problem instead of a software-ecosystem race. They built extremely durable, military-grade hardware shells but packaged them with fragmented operating systems (Symbian), underestimating how third-party app stores would lock in consumers.',
      keyMistakes: [
        'Failing to build a modern, scalable touch operating system, stubbornly sticking to legacy non-touch architecture.',
        'Transitioning exclusively to Windows Phone, which lacked developer adoption, instead of adopting Android.',
        'A toxic executive culture that penalized engineers who reported real software development delays.'
      ],
      rootCauses: {
         funding: 'Abundant hardware sales delayed restructuring decisions for five critical years.',
         product: 'Hardware was pristine (amazing cameras, battery life), but the software UX was buggy and slow.',
         market: 'App stores scaled aggressively, creating developer lock-in that bypassed Nokia.',
         execution: 'Internal political divisions between Symbian, MeeGo, and hardware engineering departments.',
         timing: 'Underestimated the pace of capacitive-touch glass and mobile data bandwidth improvements.'
      },
      failureDNA: [
        'Unrivaled global mobile phone distribution leadership.',
        'Launch of a touch-driven smartphone competitor with an ecosystem.',
        'Refusal to adopt Google Android, choosing Windows Phone instead.',
        'Sales of devices drop to zero, ending in an asset sale to Microsoft.'
      ],
      revivalProbability: 82,
      marketOpportunity: 'Nokia as a brand holds legendary nostalgic trust. Rebuilding today involves creating highly secure, repairable minimalist "dumbphones" styled elegantly with long-life modern batteries.',
      newRisks: [
        'Intense hardware commoditization from Apple, Samsung, and Chinese OEMs like Xiaomi.'
      ],
      modernAlternatives: [
        'Develop open-source, easily repairable modern modular phones (like Fairphone) branded under legendary Nokia reliability.',
        'Design minimalist companion devices focusing entirely on calling, SMS, and long-range GPS without digital distractions.'
      ],
      suggestedImprovements: [
        'Target the growing offline-minimalist consumer wave with beautiful, tactile non-touch devices.',
        'Partner directly with open wellness platforms for simple diagnostic companion screens.'
      ],
      advisoryAnswers: {
        whatToAvoid: 'Never compete head-on with iOS or Android general-purpose app marketplaces. Avoid proprietary operating systems without backing from third-party developers.',
        whatToImprove: 'Leverage nostalgic industrial design, repairability, ultra durable materials, and long-life batteries.',
        modernTechToLeverage: 'Modular hardware component structures, low-power desaturated displays, and highly secure secure-enclave processors.',
        changedMarketConditions: 'Digital wellness trends have made beautiful minimalist distraction-free phones highly attractive to premium buyers.',
        v2ProductVision: 'FailureVault v2 concept: "Nokia Brick Pro" — a luxurious physical device styled after classic designs, running an off-grid system with 14-day battery life.'
      }
    },
    workspace: {
      projectId: 'nokia',
      progress: 0,
      tasks: [
        { id: 'n-t1', title: 'Map current digital-detox market demographics and hardware preferences', category: 'Research', status: 'Pending', priority: 'High' }
      ],
      notes: [],
      contributors: [],
      riskMonitor: { execution: 50, market: 55, funding: 50 }
    }
  },
  {
    id: 'myspace',
    name: 'MySpace',
    tagline: 'The original global social media project that lost the speed war.',
    industry: 'Social Media',
    foundedYear: 2003,
    failedYear: 2011,
    failureStage: 'Mature Operational',
    teamSize: 1600,
    founder: 'Chris DeWolfe & Tom Anderson',
    fundingRaised: '$20M',
    employeeCount: 1600,
    avatarEmoji: '👥',
    primaryFailureReason: 'Overcrowded advertising layouts mandated by parent company News Corp, slow product iterations, and Facebooks clean structured design.',
    potentialScore: 68,
    revivalPossibility: 75,
    companyStatus: 'Shut Down',
    aiConfidence: 0.99,
    description: 'MySpace was the internet’s culture center in 2006, allowing users to customize HTML backgrounds and host audio players, but a $580M acquisition by Rupert Murdoch’s News Corp forced aggressive ad density that bogged down loading times and drove users to Facebook.',
    timeline: [
      { year: '2005', event: 'News Corp acquires Myspace parent company Intermix Media for $580M.', status: 'good' },
      { year: '2006', event: 'Surpasses Google as the most visited website in the United States; signs massive $900M search ad contract.', status: 'good' },
      { year: '2008', event: 'Heavy banner ads slow performance; Facebook introduces a clean feed and simple layout.', status: 'bad' },
      { year: '2011', event: 'MySpace loses 50 million monthly visitors; sold to Specific Media for a fractional $35M collapse.', status: 'bad' }
    ],
    aiAnalysis: {
      summary: 'MySpace’s fall was driven by a classic corporatization failure. Squeezed by News Corp to hit short-term ad revenue milestones, the engineering team was forced to crowd pages with massive blinking banner ads, causing page lag and breaking the organic social culture.',
      keyMistakes: [
        'Prioritizing heavy corporate ad placements over page weight, layout quality, and loading speeds.',
        'Failing to innovate on basic social tools, keeping a scattered, difficult-to-search profile layout.',
        'Letting spam profiles and bad code widgets run wildly across user pages with zero moderation.'
      ],
      rootCauses: {
         funding: 'Corporate acquisition decoupled the product from agile venture iteration frameworks.',
         product: 'Cluttered UX/UI containing fragmented HTML widgets compared to Facebook’s standardized, clean interface.',
         market: 'Facebook scaled globally by prioritizing real-name identity verification and fast loading times.',
         execution: 'Divided corporate silos that prioritized immediate monetization over long-term platform health.',
         timing: 'Launched when web design was highly fragmented; failed to transition to mobile app standards.'
      },
      failureDNA: [
        'Social network captures youth culture and indie music scenes.',
        'Corporate acquisition leads to aggressive ad monetization requirements.',
        'Spam profiles, layout lag, and broken HTML widgets slow pages.',
        'Massive user migration to clean, unified networks.'
      ],
      revivalProbability: 75,
      marketOpportunity: 'There is high nostalgic love for a customizable social canvas. Rebuilding today involves creating an aesthetic indie creator-focused social media network (like continuous-loop music, art, and custom layouts) that respects data privacy and avoids intrusive ads.',
      newRisks: [
        'Extremely high acquisition cost of consumer users and fierce competition from Instagram/TikTok.'
      ],
      modernAlternatives: [
        'Build a bespoke portfolio-sharing network for digital artists featuring customizable digital room spaces.',
        'Design private social circles for indie bands to coordinate tours, merch sales, and direct ticketing.'
      ],
      suggestedImprovements: [
        'Charge a low subscription fee to completely avoid user monetization via invasive surveillance trackers.',
        'Introduce easy-to-use modern CSS layout customizers that load instantly on mobile.'
      ],
      advisoryAnswers: {
        whatToAvoid: 'Never let revenue-focused corporate parents dictate critical platform performance and loading budgets. Avoid unmoderated widget and search spam.',
        whatToImprove: 'Emphasize artistic customization, local-first performance, music integration, and data privacy.',
        modernTechToLeverage: 'Fast client-side rendering engines, modern modular CSS modules, and secure decentralized file locker systems.',
        changedMarketConditions: 'Creators are deeply frustrated by major social platforms (Instagram, Twitter) burying content under pay-to-play algorithms.',
        v2ProductVision: 'FailureVault v2 concept: "MySpace Retro" — a beautiful subscription social network for indie musicians and artists with custom HTML blocks and zero tracking ads.'
      }
    },
    workspace: {
      projectId: 'myspace',
      progress: 0,
      tasks: [
        { id: 'm-t1', title: 'Compare user retention margins on ad-based vs subscription social engines', category: 'Research', status: 'Pending', priority: 'Medium' }
      ],
      notes: [],
      contributors: [],
      riskMonitor: { execution: 30, market: 80, funding: 40 }
    }
  },
  {
    id: 'blockbuster',
    name: 'Blockbuster',
    tagline: 'The legendary brick-and-mortar home movie rental giant.',
    industry: 'Entertainment & Retail',
    foundedYear: 1985,
    failedYear: 2010,
    failureStage: 'Mature Operational',
    teamSize: 84000,
    founder: 'David Cook',
    fundingRaised: '$1.2B',
    employeeCount: 84000,
    avatarEmoji: '📼',
    primaryFailureReason: 'Insistence on maintaining concrete high-overhead retail space, underestimating Netflix, and a deep reliance on late fee revenues.',
    potentialScore: 72,
    revivalPossibility: 78,
    companyStatus: 'Shut Down',
    aiConfidence: 0.99,
    description: 'Blockbuster dominated movie night with over 9,000 retail stores, but ignored Netflix’s subscription mail and streaming models, clinging to its physical real-estate footprint and profitable "Late Fee" model before sliding into Chapter 11.',
    timeline: [
      { year: '2000', event: 'Netflix founder Reed Hastings offers to sell Netflix to Blockbuster for $50M; Blockbuster laughs him out of the room.', status: 'bad' },
      { year: '2004', event: 'Launches Blockbuster Online to match Netflix, but retail overhead drains cash reserves.', status: 'neutral' },
      { year: '2008', event: 'Financial crash increases real-estate debt pressure while Netflix moves to digital streaming with zero stores.', status: 'bad' },
      { year: '2010', event: 'Blockbuster declares Chapter 11 bankruptcy, closing its remaining physical storefront locations.', status: 'bad' }
    ],
    aiAnalysis: {
      summary: 'Blockbuster’s demise is the textbook example of a company trapped by its own physical assets and revenue engines. Because over 15% of their total profits came from punishing customers with "Late Fees", they delayed adopting a frictionless monthly subscription model, letting Netflix disrupt them.',
      keyMistakes: [
        'Relying on "Late Fees" which actively alienated their customer base instead of creating positive-loyalty loops.',
        'Underestimating Netflix twice, refusing to purchase the upstart or match their early subscription models.',
        'Clinging to high-overhead physical store leases instead of scaling digital streaming and mailing lines from day one.'
      ],
      rootCauses: {
         funding: 'Enormous legacy store lease obligations created crushing debt loads during the 2008 crash.',
         product: 'The physical customer experience (driving, choosing, returning) was crushed by Netflix’s mailbox delivery and instant web stream.',
         market: 'Rapid consumer shift from physical DVD cassettes to instant high-speed broadband digital video.',
         execution: 'Fierce boardroom divisions that fired the CEO who tried to cancel late-fees and launch digital services.',
         timing: 'Underestimated how fast US residential broadband connection speeds would scale to make SD video streaming reliable.'
      },
      failureDNA: [
        'Retail dominance of physical movie rental markets.',
        'High-margin but customer-hostile "Late Fee" monetization policies.',
        'Refusal of early digital subscription acquisition offers.',
        'Crushing real-estate lease debts and total liquidation.'
      ],
      revivalProbability: 78,
      marketOpportunity: 'While streaming is dominated by Netflix and Disney, Blockbuster remains a beloved pop-cultural brand. Rebuilding means pivoting into retro physical video arcades or cinematic experience venues hosting elite indie titles and physical collectibles.',
      newRisks: [
        'High physical real-estate lease overhead and saturation of mature digital streaming platforms.'
      ],
      modernAlternatives: [
        'Build a premium physical retro-arcade and indie film theater chain, hosting community cinema circles and pop culture merchandise.',
        'Design a curated, community-moderated boutique streaming server hosting hard-to-find indie classics and historical films.'
      ],
      suggestedImprovements: [
        'Leverage the iconic blue-and-yellow color branding to scale nostalgic physical merch and collectible physical items.',
        'Emphasize intimate, physical, social cinematic experiences over flat solo-screen home viewing.'
      ],
      advisoryAnswers: {
        whatToAvoid: 'Never build low-margin retail rental setups. Avoid user monetization systems that actively punish the buyer (like hidden late fees).',
        whatToImprove: 'Deliver high-end community experiences, cultural events, premium physical merch, and curated boutique titles.',
        modernTechToLeverage: 'Sleek localized digital ticketing networks, smart automated rental lockers, and online community portals.',
        changedMarketConditions: 'Consumers are feeling deeply of flat algorithmic home streaming fatigue and welcome social, physical movie-night clubs.',
        v2ProductVision: 'FailureVault v2 concept: "Blockbuster Club" — a nationwide boutique movie lounge chain uniting curated cinematic libraries with artisanal popcorn and retro mechanical video game cabinets.'
      }
    },
    workspace: {
      projectId: 'blockbuster',
      progress: 0,
      tasks: [
        { id: 'b-t1', title: 'Plan physical micro-theater lease modeling and beverage margin profiles', category: 'Research', status: 'Pending', priority: 'High' }
      ],
      notes: [],
      contributors: [],
      riskMonitor: { execution: 50, market: 45, funding: 75 }
    }
  }
];
