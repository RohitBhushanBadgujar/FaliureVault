import { Project } from './types';

export const PRESEEDED_PROJECTS: Project[] = [
  {
    "id": "stayzilla",
    "name": "Stayzilla",
    "tagline": "India's largest homestay network and alternative stay aggregator.",
    "industry": "Travel & Hospitality",
    "foundedYear": 2005,
    "failedYear": 2017,
    "failureStage": "Growth",
    "teamSize": 200,
    "founder": "Yogendra Vasupal, Sachit Singhi, Rupal Yogendra",
    "fundingRaised": "$34M",
    "employeeCount": 200,
    "avatarEmoji": "🏠",
    "primaryFailureReason": "Aggressive discounting to match deep-pocketed competitors led to negative margins and cash flow issues.",
    "potentialScore": 85,
    "revivalPossibility": 70,
    "companyStatus": "Shut Down",
    "aiConfidence": 94,
    "description": "Stayzilla initially started as Inasra, pivoting to homestays to differentiate from standard hotel aggregators like OYO and MakeMyTrip. Despite being an early mover in the homestay segment, intense competition forced unsustainable discounting.",
    "timeline": [
      {
        "year": "2005",
        "event": "Launched as Inasra to aggregate budget hotels.",
        "status": "good"
      },
      {
        "year": "2010",
        "event": "Rebranded as Stayzilla with a focus on homestays.",
        "status": "good"
      },
      {
        "year": "2015",
        "event": "Raised $20M Series C, battling OYO and MMT.",
        "status": "good"
      },
      {
        "year": "2017",
        "event": "Ran out of capital due to heavy discounting and high customer acquisition costs. Shut down operations.",
        "status": "bad"
      }
    ],
    "aiAnalysis": {
      "summary": "Stayzilla built a strong early network but fell into the trap of matching competitor discounts in a heavily funded market. Their core homestay offering was solid, but unit economics were sacrificed for GMV growth.",
      "keyMistakes": [
        "Engaged in a price war with heavily funded competitors (OYO, MakeMyTrip).",
        "High cash burn on customer acquisition and marketing.",
        "Failure to secure follow-on funding before runway expired."
      ],
      "rootCauses": {
        "funding": "Unable to raise Series D while burning cash rapidly.",
        "product": "The core product was good, but lacked differentiation to justify a premium without discounts.",
        "market": "Travel aggregation became a winner-takes-all market fueled by massive capital.",
        "execution": "Management prioritized top-line growth over sustainable unit economics.",
        "timing": "The funding winter of 2016-2017 hit just as they needed a lifeline."
      },
      "failureDNA": [
        "Unsustainable discounting model.",
        "High Customer Acquisition Cost (CAC).",
        "Intense competition from unicorns.",
        "Capital drought at critical growth phase."
      ],
      "revivalProbability": 70,
      "marketOpportunity": "A premium, niche homestay platform focusing on authentic experiences rather than budget pricing could work today (similar to Airbnb's success in India).",
      "newRisks": [
        "Airbnb dominates the premium homestay market.",
        "Regulatory hurdles for short-term rentals in various Indian states."
      ],
      "modernAlternatives": [
        "Curated boutique homestays with verified quality and unique local experiences.",
        "B2B SaaS for homestay owners to manage bookings across platforms."
      ],
      "suggestedImprovements": [
        "Focus strictly on profitable unit economics from day one.",
        "Avoid competing on price; compete on unique supply and experience."
      ],
      "advisoryAnswers": {
        "whatToAvoid": "Do not play the discount game against competitors with 10x your funding.",
        "whatToImprove": "Build a moat through exclusive host relationships and standardized quality.",
        "modernTechToLeverage": "AI for dynamic pricing, automated host onboarding, and personalized recommendations.",
        "changedMarketConditions": "Consumers are now willing to pay a premium for verified, clean, and unique stays.",
        "v2ProductVision": "Stayzilla v2: An invite-only network of verified, premium Indian homestays focusing on experiential travel and high host margins."
      }
    },
    "workspace": {
      "projectId": "stayzilla",
      "progress": 0,
      "tasks": [],
      "notes": [],
      "contributors": [],
      "riskMonitor": {
        "execution": 70,
        "market": 40,
        "funding": 80
      }
    }
  },
  {
    "id": "tinyowl",
    "name": "TinyOwl",
    "tagline": "Hyper-local food delivery startup focused on single-app ordering.",
    "industry": "FoodTech",
    "foundedYear": 2014,
    "failedYear": 2016,
    "failureStage": "Early Traction",
    "teamSize": 1000,
    "founder": "Harshvardhan Mandad, Saurabh Goyal, Shikhar Paliwal, Tanuj Khandelwal, Gaurav Choudhary",
    "fundingRaised": "$27M",
    "employeeCount": 1000,
    "avatarEmoji": "🦉",
    "primaryFailureReason": "Premature geographical expansion and high operational burn rate without a solid underlying unit economic model.",
    "potentialScore": 60,
    "revivalPossibility": 30,
    "companyStatus": "Acquired (Distress)",
    "aiConfidence": 95,
    "description": "TinyOwl was a darling of the early Indian food-tech boom. It offered a clean interface and deep discounts. However, it expanded to 11 cities too quickly, leading to massive operational chaos, high burn, and eventual distress sale to Runnr.",
    "timeline": [
      {
        "year": "2014",
        "event": "Founded by IIT Bombay alumni, gaining rapid popularity in Mumbai.",
        "status": "good"
      },
      {
        "year": "2015",
        "event": "Raised massive funding and rapidly expanded to 11 cities.",
        "status": "good"
      },
      {
        "year": "2015",
        "event": "Cash burn spirals out of control; mass layoffs lead to hostage situation in Pune office.",
        "status": "bad"
      },
      {
        "year": "2016",
        "event": "Distress merged into logistics startup Runnr (later acquired by Zomato).",
        "status": "bad"
      }
    ],
    "aiAnalysis": {
      "summary": "TinyOwl is a classic case of premature scaling. Flush with VC money, they expanded across India before figuring out how to make a single city profitable, leading to operational breakdown and massive cash burn.",
      "keyMistakes": [
        "Expanded to 11 cities before achieving product-market fit or profitability in the home city.",
        "Over-hiring followed by brutal mass layoffs damaging brand and morale.",
        "Heavy reliance on discounts to drive order volume."
      ],
      "rootCauses": {
        "funding": "Excess capital encouraged reckless expansion rather than disciplined growth.",
        "product": "The app was good, but the backend logistics and restaurant integration were poor.",
        "market": "The market was crowded with Zomato, Swiggy, and Foodpanda offering similar discounts.",
        "execution": "Poor operational controls and lack of local market understanding in new cities.",
        "timing": "The funding environment cooled down in late 2015, leaving them stranded."
      },
      "failureDNA": [
        "Premature geographical scaling.",
        "Negative unit economics masked by VC funding.",
        "Operational mismanagement and PR disaster during layoffs.",
        "Commoditized service offering."
      ],
      "revivalProbability": 30,
      "marketOpportunity": "The horizontal food delivery market is a duopoly (Zomato/Swiggy). Revival would require a strict niche focus, such as healthy meals or subscription-based cloud kitchens.",
      "newRisks": [
        "Impossible to compete with the duopoly on horizontal delivery.",
        "Logistics costs remain high."
      ],
      "modernAlternatives": [
        "Subscription-based daily meal delivery targeting corporate workers.",
        "B2B delivery logistics API for independent restaurants."
      ],
      "suggestedImprovements": [
        "Achieve profitability in one micro-market before expanding.",
        "Control delivery costs through clustered operations rather than point-to-point."
      ],
      "advisoryAnswers": {
        "whatToAvoid": "Do not scale operations geographically until unit economics are positive.",
        "whatToImprove": "Focus on supply-side exclusivity and logistics efficiency rather than just consumer UI.",
        "modernTechToLeverage": "Predictive batching for deliveries, AI-driven demand forecasting.",
        "changedMarketConditions": "Consumers value reliability and speed over deep discounts now.",
        "v2ProductVision": "TinyOwl v2: A highly localized, subscription-based meal delivery service focusing strictly on high-density corporate parks with positive unit economics from day one."
      }
    },
    "workspace": {
      "projectId": "tinyowl",
      "progress": 0,
      "tasks": [],
      "notes": [],
      "contributors": [],
      "riskMonitor": {
        "execution": 90,
        "market": 85,
        "funding": 60
      }
    }
  },
  {
    "id": "peppertap",
    "name": "PepperTap",
    "tagline": "On-demand grocery delivery service.",
    "industry": "Hyperlocal Delivery",
    "foundedYear": 2014,
    "failedYear": 2016,
    "failureStage": "Growth",
    "teamSize": 2500,
    "founder": "Navneet Singh, Milind Sharma",
    "fundingRaised": "$51M",
    "employeeCount": 2500,
    "avatarEmoji": "🛒",
    "primaryFailureReason": "High customer acquisition costs, deeply negative margins on each order, and poor integration with unorganized retail inventory.",
    "potentialScore": 75,
    "revivalPossibility": 50,
    "companyStatus": "Shut Down",
    "aiConfidence": 96,
    "description": "PepperTap aimed to revolutionize grocery shopping with two-hour delivery. Backed by Sequoia and Snapdeal, it aggressively expanded but found that delivering low-margin groceries with high logistics costs and deep discounts was fundamentally unsustainable.",
    "timeline": [
      {
        "year": "2014",
        "event": "Launched to offer on-demand hyperlocal grocery delivery.",
        "status": "good"
      },
      {
        "year": "2015",
        "event": "Raised $36M Series B, expanded to 17 cities aggressively.",
        "status": "good"
      },
      {
        "year": "2016",
        "event": "Realized every order lost money; unable to fix unit economics. Shut down delivery operations.",
        "status": "bad"
      },
      {
        "year": "2016",
        "event": "Pivoted completely to a logistics company (NuvoEx).",
        "status": "bad"
      }
    ],
    "aiAnalysis": {
      "summary": "PepperTap scaled a fundamentally flawed business model. They relied on local mom-and-pop stores that had poor inventory visibility, leading to high cancellation rates. Combined with steep discounts and high delivery costs, they lost money on every transaction.",
      "keyMistakes": [
        "Scaled rapidly without fixing the core issue of inventory sync with local retailers.",
        "Relied heavily on discounts to change consumer behavior.",
        "High cost of last-mile delivery outstripped the low margins on groceries."
      ],
      "rootCauses": {
        "funding": "Raised significant capital but burned it subsidizing unprofitable deliveries.",
        "product": "The app showed items that were often out of stock at partner stores, leading to poor UX.",
        "market": "Grocery is a notoriously low-margin business.",
        "execution": "Failed to build an efficient picking and packing process at the store level.",
        "timing": "Entered the market before dark store (q-commerce) models were proven viable."
      },
      "failureDNA": [
        "Negative unit economics.",
        "Inventory sync failures with unorganized retail.",
        "High last-mile logistics costs.",
        "Unsustainable discounting."
      ],
      "revivalProbability": 50,
      "marketOpportunity": "The model has evolved into Quick Commerce (Zepto, Blinkit). A revival would require a fully controlled dark-store model rather than relying on unorganized retail.",
      "newRisks": [
        "Quick commerce is highly capital intensive and dominated by well-funded players.",
        "Profitability in grocery delivery remains challenging."
      ],
      "modernAlternatives": [
        "Dark store q-commerce with high-margin private label products.",
        "B2B supply chain SaaS for local grocery stores to manage digital inventory."
      ],
      "suggestedImprovements": [
        "Control the inventory through dark stores to ensure 100% fill rates.",
        "Charge for delivery and prioritize basket size over sheer order volume."
      ],
      "advisoryAnswers": {
        "whatToAvoid": "Do not rely on real-time inventory syncing with unorganized local stores; it will fail.",
        "whatToImprove": "Implement a dark store model to control inventory, picking speed, and margins.",
        "modernTechToLeverage": "Warehouse management systems, AI for predictive inventory stocking.",
        "changedMarketConditions": "Consumers are now accustomed to 10-minute deliveries via dark stores (Zepto/Blinkit).",
        "v2ProductVision": "PepperTap v2: A specialized quick-commerce player focusing strictly on high-margin organic and premium groceries through owned dark stores."
      }
    },
    "workspace": {
      "projectId": "peppertap",
      "progress": 0,
      "tasks": [],
      "notes": [],
      "contributors": [],
      "riskMonitor": {
        "execution": 85,
        "market": 90,
        "funding": 75
      }
    }
  },
  {
    "id": "localbanya",
    "name": "LocalBanya",
    "tagline": "Mumbai's first online supermarket.",
    "industry": "E-commerce (Grocery)",
    "foundedYear": 2012,
    "failedYear": 2015,
    "failureStage": "Growth",
    "teamSize": 300,
    "founder": "Karan Mehrotra, Amit Naik, Rashi Choudhary",
    "fundingRaised": "$20M+",
    "employeeCount": 300,
    "avatarEmoji": "🧺",
    "primaryFailureReason": "Asset-heavy warehousing model combined with high logistics costs and thin margins led to severe cash flow crunch.",
    "potentialScore": 70,
    "revivalPossibility": 40,
    "companyStatus": "Shut Down",
    "aiConfidence": 92,
    "description": "LocalBanya was a pioneer in online grocery in Mumbai. Unlike hyperlocal players, it operated its own warehouses. While it saw early success, the heavy CapEx requirement, high supply chain costs, and aggressive competition from BigBasket proved fatal.",
    "timeline": [
      {
        "year": "2012",
        "event": "Launched as an online supermarket in Mumbai.",
        "status": "good"
      },
      {
        "year": "2014",
        "event": "Raised funding and expanded to Pune, Hyderabad, and Delhi.",
        "status": "good"
      },
      {
        "year": "2015",
        "event": "Faced severe cash crunch, unable to raise follow-on rounds. Suspended operations temporarily.",
        "status": "bad"
      },
      {
        "year": "2015",
        "event": "Failed to find a buyer or secure funding; shut down permanently.",
        "status": "bad"
      }
    ],
    "aiAnalysis": {
      "summary": "LocalBanya struggled because the inventory-led grocery model is incredibly capital intensive. They lacked the massive funding required to build out a robust supply chain to compete with BigBasket, leading to operational inefficiencies and cash depletion.",
      "keyMistakes": [
        "Expanded to new cities before optimizing the warehousing and supply chain in Mumbai.",
        "High marketing spend without corresponding retention or positive unit margins.",
        "Underestimated the capital required to run an inventory-led grocery business."
      ],
      "rootCauses": {
        "funding": "Failed to secure the massive capital needed for an asset-heavy model.",
        "product": "Customer experience suffered due to late deliveries and out-of-stock items as cash dwindled.",
        "market": "Grocery margins are too thin to cover inefficient logistics.",
        "execution": "Supply chain mismanagement and high wastage rates in warehouses.",
        "timing": "Competed directly with BigBasket which had secured significantly more funding."
      },
      "failureDNA": [
        "Capital-intensive inventory model.",
        "Inefficient supply chain operations.",
        "Inability to raise follow-on capital.",
        "Thin margins eaten by logistics."
      ],
      "revivalProbability": 40,
      "marketOpportunity": "The market has moved to q-commerce and established giants (BigBasket). A revival would need to focus on a very specific, high-margin category (e.g., exclusively organic or imported goods).",
      "newRisks": [
        "Massive consolidation in the grocery delivery space.",
        "High customer expectations for delivery speed."
      ],
      "modernAlternatives": [
        "Niche online supermarket for specialized diets (vegan, keto, gluten-free).",
        "Direct-to-consumer farm-to-table supply chain."
      ],
      "suggestedImprovements": [
        "Focus on high-margin private labels early on.",
        "Optimize warehouse routing algorithms to drastically cut logistics costs."
      ],
      "advisoryAnswers": {
        "whatToAvoid": "Do not attempt an inventory-led, broad-category grocery model without deep pockets.",
        "whatToImprove": "Focus on supply chain technology to minimize wastage and optimize delivery routes.",
        "modernTechToLeverage": "Automated warehouse picking, AI route optimization.",
        "changedMarketConditions": "Consumers expect fast delivery; scheduled delivery only works for bulk monthly staples.",
        "v2ProductVision": "LocalBanya v2: A specialized platform for bulk-buying household staples on a strict subscription model, optimizing supply chain predictability."
      }
    },
    "workspace": {
      "projectId": "localbanya",
      "progress": 0,
      "tasks": [],
      "notes": [],
      "contributors": [],
      "riskMonitor": {
        "execution": 75,
        "market": 85,
        "funding": 90
      }
    }
  },
  {
    "id": "askme",
    "name": "AskMe",
    "tagline": "Hyperlocal search, classifieds, and e-commerce platform.",
    "industry": "E-commerce & Search",
    "foundedYear": 2010,
    "failedYear": 2016,
    "failureStage": "Late Stage",
    "teamSize": 4000,
    "founder": "VSS Mani (originally JustDial), later spun off to Getit",
    "fundingRaised": "$300M+",
    "employeeCount": 4000,
    "avatarEmoji": "🔍",
    "primaryFailureReason": "Aggressive marketing burn, lack of focus across too many verticals, and a severe conflict with their primary investor.",
    "potentialScore": 50,
    "revivalPossibility": 20,
    "companyStatus": "Shut Down",
    "aiConfidence": 98,
    "description": "AskMe tried to be a super-app—combining search, classifieds, grocery (AskMeBazaar), and payment. Despite huge celebrity endorsements and massive ad spend, it burned cash rapidly and collapsed due to a bitter dispute with its principal investor, Astro Holdings.",
    "timeline": [
      {
        "year": "2010",
        "event": "Acquired by Getit Infoservices.",
        "status": "good"
      },
      {
        "year": "2014",
        "event": "Launched AskMeBazaar to pivot into e-commerce.",
        "status": "good"
      },
      {
        "year": "2015",
        "event": "Massive ad campaigns featuring Bollywood celebrities; expanded into grocery and furniture.",
        "status": "good"
      },
      {
        "year": "2016",
        "event": "Principal investor Astro Holdings refused further funding. Operations halted, thousands laid off without pay.",
        "status": "bad"
      }
    ],
    "aiAnalysis": {
      "summary": "AskMe is a stark example of hubris and investor-founder conflict. They spent hundreds of millions on marketing across multiple disparate verticals (search, ecommerce, grocery) without building a sustainable moat in any of them.",
      "keyMistakes": [
        "Lack of focus: Tried to build JustDial, Flipkart, and BigBasket simultaneously.",
        "Astronomical marketing spend on celebrity endorsements with poor ROI.",
        "Complete breakdown of relationship and trust with the primary financial backer."
      ],
      "rootCauses": {
        "funding": "Over-reliant on a single investor who suddenly pulled the plug.",
        "product": "The platform was a confusing mix of services without a clear core value proposition.",
        "market": "Faced specialized, well-funded competitors in every vertical they entered.",
        "execution": "Poor financial controls, leading to unpaid vendors and employees.",
        "timing": "Attempted a super-app model before the market or their own tech stack was ready."
      },
      "failureDNA": [
        "Lack of strategic focus (Super-app delusion).",
        "Reckless marketing expenditure.",
        "Single-investor dependency and conflict.",
        "Poor financial governance."
      ],
      "revivalProbability": 20,
      "marketOpportunity": "The horizontal classifieds/search market is mature. A revival of this specific model is highly unlikely in today's specialized ecosystem.",
      "newRisks": [
        "Google dominates local search.",
        "Amazon/Flipkart dominate e-commerce."
      ],
      "modernAlternatives": [
        "Highly specialized, niche vertical classifieds (e.g., only for construction equipment).",
        "Community-driven local discovery platforms."
      ],
      "suggestedImprovements": [
        "Focus on dominating one single vertical before expanding.",
        "Diversify the investor base to reduce risk."
      ],
      "advisoryAnswers": {
        "whatToAvoid": "Do not attempt to build a super-app from day one; it dilutes focus and capital.",
        "whatToImprove": "Implement strict financial governance and ROI metrics on marketing spend.",
        "modernTechToLeverage": "None specifically; the failure was strategic and financial, not technological.",
        "changedMarketConditions": "Users prefer specialized apps for shopping, food, and search rather than clunky super-apps.",
        "v2ProductVision": "AskMe v2: A B2B platform helping offline SMEs digitize their catalogs for hyper-local WhatsApp commerce."
      }
    },
    "workspace": {
      "projectId": "askme",
      "progress": 0,
      "tasks": [],
      "notes": [],
      "contributors": [],
      "riskMonitor": {
        "execution": 95,
        "market": 90,
        "funding": 100
      }
    }
  },
  {
    "id": "fashionara",
    "name": "Fashionara",
    "tagline": "Premium fashion e-commerce portal.",
    "industry": "E-commerce (Fashion)",
    "foundedYear": 2012,
    "failedYear": 2016,
    "failureStage": "Growth",
    "teamSize": 150,
    "founder": "Arun Sirdeshmukh, Darpan Munjal",
    "fundingRaised": "$4M",
    "employeeCount": 150,
    "avatarEmoji": "👗",
    "primaryFailureReason": "Inability to compete with the massive discount-driven models of Myntra and Jabong, leading to failure in raising follow-on funding.",
    "potentialScore": 65,
    "revivalPossibility": 45,
    "companyStatus": "Shut Down",
    "aiConfidence": 91,
    "description": "Fashionara positioned itself as a premium fashion portal, avoiding the deep-discounting model. However, the Indian e-commerce market was heavily driven by discounts. Unable to match the marketing spend and pricing of giants like Myntra, they lost traction and funding.",
    "timeline": [
      {
        "year": "2012",
        "event": "Founded by former Reliance Trends CEO.",
        "status": "good"
      },
      {
        "year": "2012",
        "event": "Raised $4M from Lightspeed and Helion.",
        "status": "good"
      },
      {
        "year": "2015",
        "event": "Pivoted to a flash-sales model to drive traffic, but struggled with customer acquisition.",
        "status": "bad"
      },
      {
        "year": "2016",
        "event": "Website went offline, operations quietly shut down due to lack of funds.",
        "status": "bad"
      }
    ],
    "aiAnalysis": {
      "summary": "Fashionara tried to build a premium, non-discounted fashion business in a market that was being trained by competitors to expect deep discounts. They were out-funded and out-marketed by players willing to bleed cash for market share.",
      "keyMistakes": [
        "Misjudged the Indian consumer's willingness to pay full price online during the early e-commerce boom.",
        "Late pivot to flash sales alienated premium brand partners.",
        "Inability to raise capital to compete with Myntra/Jabong."
      ],
      "rootCauses": {
        "funding": "Starved of capital compared to heavily backed competitors.",
        "product": "User experience was good, but pricing lacked competitiveness.",
        "market": "The market was consolidating heavily around a few big players.",
        "execution": "Failed to build a loyal niche audience before pivoting strategies.",
        "timing": "Launched exactly when Myntra and Jabong were aggressively acquiring customers with VC money."
      },
      "failureDNA": [
        "Premium pricing in a discount-driven market.",
        "Under-capitalization.",
        "Market consolidation.",
        "Inconsistent pivoting (Premium to Flash Sales)."
      ],
      "revivalProbability": 45,
      "marketOpportunity": "The premium/luxury fashion market online (like Ajio Luxe or Tata Cliq Luxury) is now viable as the market has matured.",
      "newRisks": [
        "Established players now have strong luxury verticals.",
        "Customer acquisition for premium brands is expensive."
      ],
      "modernAlternatives": [
        "Curated marketplace for sustainable, slow-fashion D2C brands.",
        "AI-driven personal styling and subscription boxes for premium wear."
      ],
      "suggestedImprovements": [
        "Focus on exclusive D2C brands rather than reselling standard premium brands available elsewhere.",
        "Build community and content around fashion rather than just being a catalog."
      ],
      "advisoryAnswers": {
        "whatToAvoid": "Do not compete on catalog breadth against horizontal giants; compete on curation.",
        "whatToImprove": "Integrate strong social commerce and influencer-driven discovery.",
        "modernTechToLeverage": "Virtual try-ons, AI sizing recommendations to reduce return rates.",
        "changedMarketConditions": "Consumers are now more willing to buy premium D2C brands without deep discounts.",
        "v2ProductVision": "Fashionara v2: A creator-led social commerce platform for emerging, high-end sustainable Indian designers."
      }
    },
    "workspace": {
      "projectId": "fashionara",
      "progress": 0,
      "tasks": [],
      "notes": [],
      "contributors": [],
      "riskMonitor": {
        "execution": 60,
        "market": 85,
        "funding": 80
      }
    }
  },
  {
    "id": "franklyme",
    "name": "Frankly.me",
    "tagline": "Video blogging and Q&A platform connecting fans with celebrities.",
    "industry": "Social Media & Entertainment",
    "foundedYear": 2014,
    "failedYear": 2016,
    "failureStage": "Early Traction",
    "teamSize": 40,
    "founder": "Nikunj Jain, Abhishek Anand",
    "fundingRaised": "$600k",
    "employeeCount": 40,
    "avatarEmoji": "🎥",
    "primaryFailureReason": "Failed to achieve sustainable product-market fit and user retention despite early hype and celebrity onboarding.",
    "potentialScore": 75,
    "revivalPossibility": 65,
    "companyStatus": "Shut Down",
    "aiConfidence": 89,
    "description": "Frankly.me allowed users to ask questions to celebrities and public figures, who would reply via video selfies. Despite onboarding politicians and Bollywood stars, regular user retention was abysmal, and the platform failed to find a sustainable engagement hook.",
    "timeline": [
      {
        "year": "2014",
        "event": "Launched as a video Q&A platform.",
        "status": "good"
      },
      {
        "year": "2015",
        "event": "Raised seed funding from Matrix Partners; onboarded Arvind Kejriwal and other VIPs.",
        "status": "good"
      },
      {
        "year": "2016",
        "event": "Realized poor user retention and lack of PMF. Shut down operations.",
        "status": "bad"
      }
    ],
    "aiAnalysis": {
      "summary": "Frankly.me was an innovative concept (similar to Cameo, but free and Q&A focused) that suffered from the \"empty restaurant\" syndrome. Users asked questions, but if celebrities didn't reply quickly, users churned. The friction for creators to generate video replies was too high.",
      "keyMistakes": [
        "Relied entirely on celebrities for content creation, creating a severe supply bottleneck.",
        "Failed to build a network effect among regular users.",
        "Did not monetize the celebrity access (unlike Cameo)."
      ],
      "rootCauses": {
        "funding": "Seed funding wasn't enough to sustain the long runway needed for a social network.",
        "product": "High friction for content creators (shooting video replies takes effort).",
        "market": "Video consumption was growing, but creation was still nascent.",
        "execution": "Focused too much on PR acquisitions of VIPs rather than core user retention loops.",
        "timing": "Launched before short-form video (TikTok/Reels) normalized selfie-video creation."
      },
      "failureDNA": [
        "Supply-side content bottleneck.",
        "Poor user retention.",
        "Lack of monetization model.",
        "High friction content creation."
      ],
      "revivalProbability": 65,
      "marketOpportunity": "A monetized version of this (like Cameo) is highly viable. Alternatively, AI-generated celebrity avatars answering fan questions could remove the supply bottleneck.",
      "newRisks": [
        "Celebrities now use Instagram AMAs directly.",
        "Fad-like nature of paid shoutout apps."
      ],
      "modernAlternatives": [
        "Paid video shoutouts/consultations (Cameo model).",
        "AI digital twins of influencers for scalable fan interaction."
      ],
      "suggestedImprovements": [
        "Introduce a monetization model immediately to incentivize creators.",
        "Lower the barrier to entry for content creation (allow audio or text replies)."
      ],
      "advisoryAnswers": {
        "whatToAvoid": "Do not build a social network where 99% of the value relies on 1% of users doing high-friction tasks for free.",
        "whatToImprove": "Implement clear financial incentives for creators.",
        "modernTechToLeverage": "Generative AI for draft responses, automated video editing.",
        "changedMarketConditions": "Creators now expect to monetize their audience directly.",
        "v2ProductVision": "Frankly.me v2: A micro-consulting platform where experts and creators charge for personalized video responses to specific user questions."
      }
    },
    "workspace": {
      "projectId": "franklyme",
      "progress": 0,
      "tasks": [],
      "notes": [],
      "contributors": [],
      "riskMonitor": {
        "execution": 70,
        "market": 50,
        "funding": 60
      }
    }
  },
  {
    "id": "overcart",
    "name": "Overcart",
    "tagline": "Marketplace for unboxed, refurbished, and pre-owned electronics.",
    "industry": "E-commerce (Recommerce)",
    "foundedYear": 2012,
    "failedYear": 2017,
    "failureStage": "Growth",
    "teamSize": 80,
    "founder": "Saptarshi Nath, Alex Souter",
    "fundingRaised": "$3M",
    "employeeCount": 80,
    "avatarEmoji": "📱",
    "primaryFailureReason": "Struggled with supply chain scalability, quality control issues, and increasing competition from Amazon/Flipkart entering the refurbished space.",
    "potentialScore": 80,
    "revivalPossibility": 75,
    "companyStatus": "Shut Down",
    "aiConfidence": 93,
    "description": "Overcart was an early mover in the recommerce space in India, helping brands liquidate unboxed and refurbished goods. However, managing reverse logistics, ensuring consistent quality, and competing when major e-commerce players started their own refurbished verticals proved too difficult.",
    "timeline": [
      {
        "year": "2012",
        "event": "Founded to address the returns/unboxed electronics market.",
        "status": "good"
      },
      {
        "year": "2014",
        "event": "Raised funding; partnered with major smartphone brands for liquidation.",
        "status": "good"
      },
      {
        "year": "2016",
        "event": "Faced scaling issues with quality assurance and reverse logistics.",
        "status": "bad"
      },
      {
        "year": "2017",
        "event": "Unable to raise further funding amidst heavy competition; shut down.",
        "status": "bad"
      }
    ],
    "aiAnalysis": {
      "summary": "Overcart correctly identified a massive problem (electronics returns and excess inventory) but struggled with the operational nightmare of recommerce. Quality control at scale is incredibly hard, and when Amazon and Flipkart launched their own refurbished programs, Overcart lost its edge.",
      "keyMistakes": [
        "Failed to standardize the grading and refurbishment process at scale.",
        "High operational costs associated with reverse logistics and manual quality checks.",
        "Did not build a strong enough consumer brand to withstand marketplace giants."
      ],
      "rootCauses": {
        "funding": "Recommerce requires significant capital for logistics and tech, which they lacked.",
        "product": "Inconsistent product quality led to high consumer return rates.",
        "market": "Amazon and Flipkart entering the space squeezed their margins and supply.",
        "execution": "Manual operational bottlenecks hindered rapid scaling.",
        "timing": "Early to the market, but too early for automated diagnostic tech to save costs."
      },
      "failureDNA": [
        "Reverse logistics complexity.",
        "Quality control inconsistency.",
        "Giant competitors entering the niche.",
        "Low margin operations."
      ],
      "revivalProbability": 75,
      "marketOpportunity": "The refurbished market is booming (e.g., Cashify). A specialized platform focusing strictly on high-end diagnostics and certified warranties is highly viable.",
      "newRisks": [
        "Intense competition from Cashify, Amazon Renewed.",
        "OEMs heavily pushing trade-in programs themselves."
      ],
      "modernAlternatives": [
        "B2B SaaS platform for brands to manage their own reverse logistics and grading.",
        "Specialized refurbished marketplace for a specific niche (e.g., only Apple products or high-end cameras)."
      ],
      "suggestedImprovements": [
        "Automate the diagnostic and grading process using software to eliminate human error.",
        "Focus on B2B liquidation rather than B2C retail to simplify operations."
      ],
      "advisoryAnswers": {
        "whatToAvoid": "Do not attempt B2C recommerce without ironclad, automated quality control.",
        "whatToImprove": "Build proprietary diagnostic software to standardize grading instantly.",
        "modernTechToLeverage": "AI-driven hardware diagnostics, automated pricing algorithms.",
        "changedMarketConditions": "Consumers are much more open to buying refurbished electronics if backed by strong warranties.",
        "v2ProductVision": "Overcart v2: An AI-powered B2B reverse logistics and automated grading API for major electronics retailers."
      }
    },
    "workspace": {
      "projectId": "overcart",
      "progress": 0,
      "tasks": [],
      "notes": [],
      "contributors": [],
      "riskMonitor": {
        "execution": 80,
        "market": 60,
        "funding": 70
      }
    }
  },
  {
    "id": "dazo",
    "name": "Dazo",
    "tagline": "Curated meals on demand.",
    "industry": "FoodTech",
    "foundedYear": 2014,
    "failedYear": 2015,
    "failureStage": "Early Traction",
    "teamSize": 30,
    "founder": "Shashank Singhal, Monica Rastogi",
    "fundingRaised": "Seed",
    "employeeCount": 30,
    "avatarEmoji": "🍱",
    "primaryFailureReason": "Lack of sustainable unit economics in the internet-first kitchen aggregator model.",
    "potentialScore": 50,
    "revivalPossibility": 30,
    "companyStatus": "Shut Down",
    "aiConfidence": 88,
    "description": "Initially started as TapCibo, an internet-first kitchen, Dazo pivoted to aggregate curated meals from partners. Despite backing from prominent angels, the unit economics of food delivery and poor margins led to a quick shutdown within a year.",
    "timeline": [
      {
        "year": "2014",
        "event": "Launched as TapCibo.",
        "status": "good"
      },
      {
        "year": "2015",
        "event": "Rebranded to Dazo, raised seed funding from Google/Amazon execs.",
        "status": "good"
      },
      {
        "year": "2015",
        "event": "Shut down due to lack of follow-on funding and poor margins.",
        "status": "bad"
      }
    ],
    "aiAnalysis": {
      "summary": "Dazo was caught in the first wave of food-tech hype. They pivoted quickly but found that delivering curated meals without massive scale or premium pricing resulted in negative margins.",
      "keyMistakes": [
        "Pivoted away from controlling the food quality to aggregating.",
        "High logistics costs."
      ],
      "rootCauses": {
        "funding": "Failed to raise Series A.",
        "product": "Low margins.",
        "market": "Hyper-competitive.",
        "execution": "Fast burn.",
        "timing": "Market consolidation."
      },
      "failureDNA": [
        "Negative unit economics",
        "Hyper-competitive market"
      ],
      "revivalProbability": 30,
      "marketOpportunity": "Cloud kitchens have evolved, but standalone aggregators are obsolete.",
      "newRisks": [
        "Swiggy/Zomato dominance."
      ],
      "modernAlternatives": [
        "B2B catering."
      ],
      "suggestedImprovements": [
        "Focus on subscription models."
      ],
      "advisoryAnswers": {
        "whatToAvoid": "B2C food delivery without massive capital.",
        "whatToImprove": "Subscription revenue.",
        "modernTechToLeverage": "Predictive routing.",
        "changedMarketConditions": "Duopoly market.",
        "v2ProductVision": "Corporate meal subscription."
      }
    },
    "workspace": {
      "projectId": "dazo",
      "progress": 0,
      "tasks": [],
      "notes": [],
      "contributors": [],
      "riskMonitor": {
        "execution": 70,
        "market": 90,
        "funding": 80
      }
    }
  },
  {
    "id": "dialchef",
    "name": "DialChef",
    "tagline": "Marketplace for home-cooked food.",
    "industry": "FoodTech",
    "foundedYear": 2015,
    "failedYear": 2016,
    "failureStage": "Seed",
    "teamSize": 15,
    "founder": "Anurag Mishra",
    "fundingRaised": "Bootstrapped",
    "employeeCount": 15,
    "avatarEmoji": "🍲",
    "primaryFailureReason": "Unable to scale supply quality reliably and solve the logistics problem for decentralized home kitchens.",
    "potentialScore": 60,
    "revivalPossibility": 40,
    "companyStatus": "Shut Down",
    "aiConfidence": 85,
    "description": "DialChef aimed to connect consumers with home chefs. While the concept appealed to those seeking healthy, home-cooked food, standardizing hygiene, ensuring timely delivery from residential areas, and scaling supply proved impossible.",
    "timeline": [
      {
        "year": "2015",
        "event": "Platform launched in localized areas.",
        "status": "good"
      },
      {
        "year": "2016",
        "event": "Operational issues with decentralized logistics and quality control. Shut down.",
        "status": "bad"
      }
    ],
    "aiAnalysis": {
      "summary": "Home-cooked food marketplaces suffer from massive fragmentation. Quality control is near impossible, and logistics routing to residential homes for pickup destroys any profit margin.",
      "keyMistakes": [
        "Underestimated reverse logistics.",
        "No standardization of packaging."
      ],
      "rootCauses": {
        "funding": "Bootstrapped.",
        "product": "Inconsistent quality.",
        "market": "Niche.",
        "execution": "Logistics nightmare.",
        "timing": "Too early."
      },
      "failureDNA": [
        "Supply fragmentation",
        "Logistics failure"
      ],
      "revivalProbability": 40,
      "marketOpportunity": "Hyper-local community models (apartment complexes) might work.",
      "newRisks": [
        "FSSAI regulations for home chefs."
      ],
      "modernAlternatives": [
        "Community WhatsApp group commerce."
      ],
      "suggestedImprovements": [
        "Limit to intra-community delivery to cut logistics."
      ],
      "advisoryAnswers": {
        "whatToAvoid": "City-wide decentralized pickup.",
        "whatToImprove": "Hyper-local clustering.",
        "modernTechToLeverage": "Community SaaS.",
        "changedMarketConditions": "Stringent health codes.",
        "v2ProductVision": "SaaS for community-based home chefs."
      }
    },
    "workspace": {
      "projectId": "dialchef",
      "progress": 0,
      "tasks": [],
      "notes": [],
      "contributors": [],
      "riskMonitor": {
        "execution": 90,
        "market": 80,
        "funding": 60
      }
    }
  },
  {
    "id": "scootsy",
    "name": "Scootsy",
    "tagline": "Premium hyperlocal delivery (food, fashion, gifting).",
    "industry": "Hyperlocal Delivery",
    "foundedYear": 2015,
    "failedYear": 2020,
    "failureStage": "Acquired / Sunset",
    "teamSize": 200,
    "founder": "Sandeep Dalmia, Rishi Khiani",
    "fundingRaised": "$3.6M",
    "employeeCount": 200,
    "avatarEmoji": "🛵",
    "primaryFailureReason": "Struggled to scale the premium niche outside South Mumbai; acquired by Swiggy and eventually merged and sunsetted.",
    "potentialScore": 85,
    "revivalPossibility": 60,
    "companyStatus": "Acquired (Sunset)",
    "aiConfidence": 94,
    "description": "Scootsy carved a niche delivering premium restaurant food and boutique items in Mumbai. It was acquired by Swiggy in 2018 for ~50 Cr. Post-acquisition, Swiggy absorbed the premium catalog into its main app and sunset the Scootsy brand in 2020.",
    "timeline": [
      {
        "year": "2015",
        "event": "Launched in Mumbai focusing on premium deliveries.",
        "status": "good"
      },
      {
        "year": "2018",
        "event": "Acquired by Swiggy.",
        "status": "good"
      },
      {
        "year": "2020",
        "event": "Brand sunsetted; operations merged into Swiggy.",
        "status": "bad"
      }
    ],
    "aiAnalysis": {
      "summary": "Scootsy built a great brand and achieved positive unit economics in a tight geographic niche (South Mumbai). However, premium delivery is difficult to scale pan-India, leading to an acquisition and eventual brand sunset.",
      "keyMistakes": [
        "Highly localized to one premium demographic.",
        "Difficult to replicate supply in other cities."
      ],
      "rootCauses": {
        "funding": "Acquired for strategic value.",
        "product": "Excellent but unscalable.",
        "market": "Premium niche is small.",
        "execution": "Great execution, limited scope.",
        "timing": "Acquired at the right time."
      },
      "failureDNA": [
        "Niche scalability limits",
        "Post-acquisition integration"
      ],
      "revivalProbability": 60,
      "marketOpportunity": "Premium luxury concierge delivery still has a place in metro cities.",
      "newRisks": [
        "Swiggy Gourmet and Zomato Legends already cover this."
      ],
      "modernAlternatives": [
        "Luxury gifting concierge."
      ],
      "suggestedImprovements": [
        "Focus purely on high-margin luxury gifting."
      ],
      "advisoryAnswers": {
        "whatToAvoid": "Competing with horizontals on standard food.",
        "whatToImprove": "Curation and white-glove service.",
        "modernTechToLeverage": "CRM.",
        "changedMarketConditions": "Horizontals now do premium well.",
        "v2ProductVision": "A white-glove B2B corporate gifting concierge."
      }
    },
    "workspace": {
      "projectId": "scootsy",
      "progress": 0,
      "tasks": [],
      "notes": [],
      "contributors": [],
      "riskMonitor": {
        "execution": 50,
        "market": 70,
        "funding": 40
      }
    }
  },
  {
    "id": "cardback",
    "name": "CardBack",
    "tagline": "Credit card recommendation and tracking app.",
    "industry": "FinTech",
    "foundedYear": 2012,
    "failedYear": 2017,
    "failureStage": "Seed",
    "teamSize": 20,
    "founder": "Nidhi Gurnani, Nikhil Wason",
    "fundingRaised": "$170K",
    "employeeCount": 20,
    "avatarEmoji": "💳",
    "primaryFailureReason": "Failed to monetize user recommendations effectively and lacked deep API integrations with banks.",
    "potentialScore": 75,
    "revivalPossibility": 85,
    "companyStatus": "Shut Down",
    "aiConfidence": 90,
    "description": "CardBack helped users identify which of their credit cards provided the best offers/cashback at a specific merchant. While useful, the startup struggled with monetization and keeping bank offer data updated via scraping instead of APIs.",
    "timeline": [
      {
        "year": "2012",
        "event": "Launched to solve credit card offer discovery.",
        "status": "good"
      },
      {
        "year": "2014",
        "event": "Raised funding from Let's Venture.",
        "status": "good"
      },
      {
        "year": "2017",
        "event": "Unable to find a sustainable revenue model; operations ceased.",
        "status": "bad"
      }
    ],
    "aiAnalysis": {
      "summary": "CardBack built a highly useful consumer utility but failed to build a business. Scraping bank data was unreliable, and they couldn't effectively monetize the user base through card referrals before running out of cash.",
      "keyMistakes": [
        "Relied on manual/scraped data updates.",
        "Failed to establish B2B affiliate revenue early."
      ],
      "rootCauses": {
        "funding": "Underfunded.",
        "product": "Data reliability issues.",
        "market": "Credit card penetration was low then.",
        "execution": "Monetization failure.",
        "timing": "Ahead of its time."
      },
      "failureDNA": [
        "Monetization failure",
        "Data integration barriers"
      ],
      "revivalProbability": 85,
      "marketOpportunity": "With the explosion of credit cards and UPI, companies like Cred successfully executed a similar concept by focusing on bill payment first.",
      "newRisks": [
        "Cred and Cheq dominate card management."
      ],
      "modernAlternatives": [
        "AI-driven financial advisor for maximizing reward points."
      ],
      "suggestedImprovements": [
        "Use Account Aggregator frameworks for secure data access."
      ],
      "advisoryAnswers": {
        "whatToAvoid": "Screen scraping bank data.",
        "whatToImprove": "Focus on affiliate revenue and bill payments.",
        "modernTechToLeverage": "Account Aggregator APIs.",
        "changedMarketConditions": "Credit card usage has exploded.",
        "v2ProductVision": "AI agent that automatically optimizes rewards and routes payments to the best card via UPI."
      }
    },
    "workspace": {
      "projectId": "cardback",
      "progress": 0,
      "tasks": [],
      "notes": [],
      "contributors": [],
      "riskMonitor": {
        "execution": 60,
        "market": 40,
        "funding": 80
      }
    }
  },
  {
    "id": "roder",
    "name": "Roder",
    "tagline": "Outstation cab aggregator.",
    "industry": "Mobility",
    "foundedYear": 2014,
    "failedYear": 2017,
    "failureStage": "Seed",
    "teamSize": 25,
    "founder": "Abhishek Negi, Ashish Sharma, Siddhant Matre",
    "fundingRaised": "$250K",
    "employeeCount": 25,
    "avatarEmoji": "🚕",
    "primaryFailureReason": "Unable to compete with Ola and Uber entering the outstation category with massive capital.",
    "potentialScore": 65,
    "revivalPossibility": 50,
    "companyStatus": "Shut Down",
    "aiConfidence": 91,
    "description": "Roder aimed to organize the outstation taxi market by optimizing return journeys to lower costs. They gained early traction but were crushed when Ola (Ola Outstation) and Uber launched their own intercity services with heavy subsidies.",
    "timeline": [
      {
        "year": "2014",
        "event": "Launched as InstaCabs, rebranded to Roder.",
        "status": "good"
      },
      {
        "year": "2016",
        "event": "Ola and Uber aggressively push into outstation travel.",
        "status": "bad"
      },
      {
        "year": "2017",
        "event": "Shut down due to inability to raise funds against giants.",
        "status": "bad"
      }
    ],
    "aiAnalysis": {
      "summary": "Roder identified a clear inefficiency (empty return trips for taxis). However, in the ride-hailing space, capital is a moat. Once the giants decided to enter their niche, Roder's pricing advantage evaporated.",
      "keyMistakes": [
        "Competed in a capital-intensive space without deep pockets."
      ],
      "rootCauses": {
        "funding": "Starved of capital.",
        "product": "Solid utility.",
        "market": "Monopolized by giants.",
        "execution": "Good, but outmatched.",
        "timing": "Unlucky competitive overlap."
      },
      "failureDNA": [
        "Giant competitor entry",
        "Capital starvation"
      ],
      "revivalProbability": 50,
      "marketOpportunity": "Intercity mobility is now dominated by MakeMyTrip, Ola, and BlaBlaCar.",
      "newRisks": [
        "Heavy competition, low margins."
      ],
      "modernAlternatives": [
        "EV-only intercity fleet for corporates."
      ],
      "suggestedImprovements": [
        "Focus on B2B employee transport instead of B2C."
      ],
      "advisoryAnswers": {
        "whatToAvoid": "B2C mobility without massive funding.",
        "whatToImprove": "B2B contracts for guaranteed revenue.",
        "modernTechToLeverage": "EV fleet management.",
        "changedMarketConditions": "Market is consolidated.",
        "v2ProductVision": "An intercity EV fleet management platform for sustainable corporate travel."
      }
    },
    "workspace": {
      "projectId": "roder",
      "progress": 0,
      "tasks": [],
      "notes": [],
      "contributors": [],
      "riskMonitor": {
        "execution": 70,
        "market": 95,
        "funding": 90
      }
    }
  },
  {
    "id": "gozoomo",
    "name": "GoZoomo",
    "tagline": "Peer-to-peer used car marketplace with verified listings.",
    "industry": "Automotive / E-commerce",
    "foundedYear": 2014,
    "failedYear": 2016,
    "failureStage": "Series A",
    "teamSize": 150,
    "founder": "Rohan Malhotra, Arnav Kumar, Himangshu Hazarika",
    "fundingRaised": "$7M",
    "employeeCount": 150,
    "avatarEmoji": "🚗",
    "primaryFailureReason": "Returned investor money; founders realized the unit economics were unsustainable due to a broken trust model and high customer acquisition cost.",
    "potentialScore": 85,
    "revivalPossibility": 70,
    "companyStatus": "Voluntary Shutdown",
    "aiConfidence": 96,
    "description": "GoZoomo was an honest failure. They built a C2C used car marketplace. Despite raising $7M, the founders realized the market was plagued with broker fraud and building trust was too expensive. They famously returned the remaining capital to investors rather than burning it.",
    "timeline": [
      {
        "year": "2014",
        "event": "Launched to remove brokers from used car sales.",
        "status": "good"
      },
      {
        "year": "2015",
        "event": "Raised $5M Series A from SAIF Partners.",
        "status": "good"
      },
      {
        "year": "2016",
        "event": "Realized poor unit economics; voluntarily shut down and returned capital.",
        "status": "bad"
      }
    ],
    "aiAnalysis": {
      "summary": "GoZoomo is highly respected for its ethical shutdown. They found that the C2C market was dominated by disguised brokers, making standardization impossible. The CAC was too high to justify the margins.",
      "keyMistakes": [
        "Assumed C2C could be isolated from broker interference.",
        "High cost of physical car inspections."
      ],
      "rootCauses": {
        "funding": "Well-funded, but chose not to burn.",
        "product": "Inspection process was unscalable.",
        "market": "Low trust, high fraud.",
        "execution": "Ethical and data-driven shutdown.",
        "timing": "Before Spinny/Cars24 proved the inventory model."
      },
      "failureDNA": [
        "Unsustainable unit economics",
        "Market trust deficit"
      ],
      "revivalProbability": 70,
      "marketOpportunity": "The market shifted from C2C to inventory-led B2C (Spinny, Cars24) to control quality.",
      "newRisks": [
        "Heavy CapEx required for inventory models."
      ],
      "modernAlternatives": [
        "B2B SaaS for dealership inventory management."
      ],
      "suggestedImprovements": [
        "Shift to a B2C inventory model to guarantee quality."
      ],
      "advisoryAnswers": {
        "whatToAvoid": "Pure C2C marketplaces in high-ticket, low-trust categories.",
        "whatToImprove": "Control the inventory to guarantee trust.",
        "modernTechToLeverage": "AI diagnostics.",
        "changedMarketConditions": "B2C inventory models are now the standard.",
        "v2ProductVision": "AI-driven pricing and diagnostic engine for existing used car dealerships."
      }
    },
    "workspace": {
      "projectId": "gozoomo",
      "progress": 0,
      "tasks": [],
      "notes": [],
      "contributors": [],
      "riskMonitor": {
        "execution": 50,
        "market": 85,
        "funding": 40
      }
    }
  }
];
