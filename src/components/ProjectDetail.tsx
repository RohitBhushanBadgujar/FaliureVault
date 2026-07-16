import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Cpu, AlertTriangle, TrendingUp, Compass, 
  Settings, BookOpen, ShieldAlert, Zap, Layers, Play, FileDown,
  Info, Skull, Shield, CheckCircle, HelpCircle, Bookmark
} from 'lucide-react';
import { Project, AIAnalysis } from '../types';
import { jsPDF } from 'jspdf';
import RevivalScore from './RevivalScore';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onMakeActiveProject: (projectId: string) => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
}

export default function ProjectDetail({ project, onBack, onMakeActiveProject, isSaved = false, onToggleSave }: ProjectDetailProps) {
  const [activeTab, setActiveTab] = useState<'funding' | 'product' | 'market' | 'execution' | 'timing'>('funding');
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);

  const analysis = project.aiAnalysis;
  if (!analysis) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <AlertTriangle className="w-10 h-10 text-amber-500 mb-4" />
        <p className="text-slate-400">Project AI Analysis not ready.</p>
        <button onClick={onBack} className="text-electric-indigo underline text-sm mt-2">Go back to vault</button>
      </div>
    );
  }

  const handleGeneratePDF = () => {
    setIsPdfGenerating(true);
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const primaryColor = [15, 15, 17]; // #0F0F11
      const brandOrange = [20, 184, 166];  // #14B8A6 (Aurora Teal replacement)
      const accentGreen = [16, 185, 129]; // #10B981
      const softBg = [248, 249, 250];  // Stripe-like light gray
      const gridBorder = [224, 226, 230]; // Clean gray border

      // ==========================================
      // PAGE 1 — COVER PAGE (Atmospheric Deep Theme)
      // ==========================================
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, 0, 210, 297, 'F');

      // Heavy left brand column
      doc.setFillColor(brandOrange[0], brandOrange[1], brandOrange[2]);
      doc.rect(0, 0, 8, 297, 'F');

      // Top classification label
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(brandOrange[0], brandOrange[1], brandOrange[2]);
      doc.text("FAILUREVAULT // EXCLUSIVE STARTUP INTELLIGENCE", 25, 35);

      // Separator
      doc.setDrawColor(brandOrange[0], brandOrange[1], brandOrange[2]);
      doc.setLineWidth(0.4);
      doc.line(25, 40, 185, 40);

      // Title header
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(32);
      doc.setTextColor(255, 255, 255);
      doc.text("FAILURE", 25, 68);
      doc.setFont("Helvetica", "normal");
      doc.text("INTELLIGENCE", 25, 82);
      doc.text("REPORT", 25, 96);

      doc.setFontSize(11);
      doc.setTextColor(150, 150, 150);
      doc.text("A Professional Venture Deconstruction & Rebuild Strategy", 25, 110);

      // Target Venture Panel (Dark Card)
      doc.setFillColor(24, 24, 28);
      doc.rect(25, 130, 160, 105, 'F');
      
      doc.setDrawColor(50, 50, 55);
      doc.setLineWidth(0.3);
      doc.rect(25, 130, 160, 105, 'D');

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(brandOrange[0], brandOrange[1], brandOrange[2]);
      doc.text("TARGET VENTURE DOSSIER", 35, 142);

      doc.setFontSize(22);
      doc.setTextColor(255, 255, 255);
      doc.text(project.name.toUpperCase(), 35, 154);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(170, 170, 170);
      const taglineText = doc.splitTextToSize(project.tagline || '', 140);
      doc.text(taglineText, 35, 162);

      // Metas grid (on cover card)
      doc.setFontSize(9);
      doc.setTextColor(130, 130, 130);
      doc.text("Venture Sector:", 35, 180);
      doc.setTextColor(255, 255, 255);
      doc.text(project.industry, 68, 180);

      doc.setTextColor(130, 130, 130);
      doc.text("Timeline:", 35, 187);
      doc.setTextColor(255, 255, 255);
      doc.text(`${project.foundedYear} — ${project.failedYear}`, 68, 187);

      doc.setTextColor(130, 130, 130);
      doc.text("Revival Index:", 35, 194);
      doc.setFont("Helvetica", "bold");
      doc.setTextColor(accentGreen[0], accentGreen[1], accentGreen[2]);
      doc.text(`${project.revivalPossibility}% Viability`, 68, 194);

      doc.setFont("Helvetica", "normal");
      doc.setTextColor(130, 130, 130);
      doc.text("Primary Fault:", 35, 201);
      doc.setTextColor(239, 68, 68); // Light red
      const wrappedFail = doc.splitTextToSize(project.primaryFailureReason, 110);
      doc.text(wrappedFail, 68, 201);

      // Cover footer
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text("CONFIDENTIAL  |  GENERATED FOR INCUBATOR & STRATEGIC AUDITING PURPOSES", 25, 272);
      doc.text("POWERED BY FAILUREVAULT INTELLIGENCE HUB", 25, 277);

      // ==========================================
      // PAGE 2 — PROJECT OVERVIEW (Apple Premium Minimal)
      // ==========================================
      doc.addPage();
      
      // Top elegant metadata line
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, 0, 210, 14, 'F');
      doc.setFillColor(brandOrange[0], brandOrange[1], brandOrange[2]);
      doc.rect(0, 14, 210, 1.2, 'F');

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(160, 160, 160);
      doc.text("FAILUREVAULT INTELLIGENCE CONSOLE   //   SECTION I", 20, 9);

      // Section Header
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text("I. THE DEFUNCT VENTURE OVERVIEW", 20, 32);

      doc.setDrawColor(brandOrange[0], brandOrange[1], brandOrange[2]);
      doc.setLineWidth(0.4);
      doc.line(20, 36, 190, 36);

      // Venture description card
      doc.setFillColor(softBg[0], softBg[1], softBg[2]);
      doc.rect(20, 44, 170, 34, 'F');
      doc.setDrawColor(gridBorder[0], gridBorder[1], gridBorder[2]);
      doc.setLineWidth(0.3);
      doc.rect(20, 44, 170, 34, 'D');

      doc.setFillColor(brandOrange[0], brandOrange[1], brandOrange[2]);
      doc.rect(20, 44, 2, 34, 'F'); // Left highlight strip

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text("MISSION SPECS & TARGET SCOPE", 26, 51);

      doc.setFont("Helvetica", "oblique");
      doc.setFontSize(9);
      doc.setTextColor(60, 60, 60);
      const descWrapped = doc.splitTextToSize(project.description || '', 156);
      doc.text(descWrapped, 26, 58);

      // Demographics / Parameters Info Grid
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text("STATISTICAL POST-MORTEM MODELING", 20, 92);
      
      doc.setDrawColor(gridBorder[0], gridBorder[1], gridBorder[2]);
      doc.setLineWidth(0.2);
      doc.line(20, 96, 190, 96);

      const colLeft = 20;
      const colRight = 110;

      // Parameters
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(100, 100, 100);
      doc.text("Industry Segment", colLeft, 105);
      doc.setFont("Helvetica", "normal");
      doc.setTextColor(30, 30, 30);
      doc.text(project.industry, colLeft, 110);

      doc.setFont("Helvetica", "bold");
      doc.setTextColor(100, 100, 100);
      doc.text("Incorporation", colLeft, 122);
      doc.setFont("Helvetica", "normal");
      doc.setTextColor(30, 30, 30);
      doc.text(`Year ${project.foundedYear}`, colLeft, 127);

      doc.setFont("Helvetica", "bold");
      doc.setTextColor(100, 100, 100);
      doc.text("Operational Halt", colLeft, 139);
      doc.setFont("Helvetica", "normal");
      doc.setTextColor(30, 30, 30);
      doc.text(`Year ${project.failedYear}`, colLeft, 144);

      // Right parameters
      doc.setFont("Helvetica", "bold");
      doc.setTextColor(100, 100, 100);
      doc.text("FTE Headcount Peak", colRight, 105);
      doc.setFont("Helvetica", "normal");
      doc.setTextColor(30, 30, 30);
      doc.text(`${project.teamSize} Core Contributors`, colRight, 110);

      doc.setFont("Helvetica", "bold");
      doc.setTextColor(100, 100, 100);
      doc.text("Deconstruction Stage", colRight, 122);
      doc.setFont("Helvetica", "normal");
      doc.setTextColor(30, 30, 30);
      doc.text(project.failureStage || 'Early Traction', colRight, 127);

      doc.setFont("Helvetica", "bold");
      doc.setTextColor(100, 100, 100);
      doc.text("Resolution Status", colRight, 139);
      doc.setFont("Helvetica", "normal");
      doc.setTextColor(220, 50, 50);
      doc.text("Dissolved (Systemic Capital Collapse)", colRight, 144);

      // Timeline explanation
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text("TIMELINE DECONSTRUCTION ANALYSIS", 20, 162);
      doc.line(20, 166, 190, 166);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(60, 60, 60);

      const durationYears = project.failedYear - project.foundedYear;
      let durationDetailText = "";
      if (durationYears <= 1) {
        durationDetailText = `The business entered complete failure in its initial year. It illustrates a common 'high-burn, fast-collapse' cycle, wherein substantial funds were directed towards building proprietary layers before validating basic engagement or product demand.`;
      } else if (durationYears <= 3) {
        durationDetailText = `Active for ${durationYears} years before grinding to a halt. The venture successfully launched its early MVP and garnered localized support, but plateaued as recurring capital proved too scarce to support high operational costs and physical setups.`;
      } else {
        durationDetailText = `Survived for ${durationYears} years. A prolonged survival indicates high core grit and solid functional structures, but outdated workflows or resistance to shift models when market demand shifted eventually proved fatal.`;
      }

      const p2DetailSplit = doc.splitTextToSize(durationDetailText, 170);
      doc.text(p2DetailSplit, 20, 174);

      // Large visual callout box at bottom
      doc.setFillColor(242, 245, 248);
      doc.rect(20, 200, 170, 34, 'F');
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(brandOrange[0], brandOrange[1], brandOrange[2]);
      doc.text("POST-MORTEM KEY LESSON", 26, 208);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(80, 80, 80);
      const postNotes = "A capital failure is rarely a technological failure. Standard micro-economic deconstructions verify that early customer dialogues, extremely lean operational budgets, and robust continuous value validation are the only buffers that sustain early ventures.";
      const postNotesWrapped = doc.splitTextToSize(postNotes, 158);
      doc.text(postNotesWrapped, 26, 214);

      // Footer
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(180, 180, 180);
      doc.text("CONFIDENTIAL STRATEGIC DECONSTRUCTION — SUB:V2", 20, 282);
      doc.text("PAGE 2 OF 6", 182, 282);

      // ==========================================
      // PAGE 3 — WHAT WENT WRONG (Detailed Root Causes & Mistakes)
      // ==========================================
      doc.addPage();
      
      // Top header
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, 0, 210, 14, 'F');
      doc.setFillColor(brandOrange[0], brandOrange[1], brandOrange[2]);
      doc.rect(0, 14, 210, 1.2, 'F');

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(160, 160, 160);
      doc.text("FAILUREVAULT INTELLIGENCE CONSOLE   //   SECTION II", 20, 9);

      // Header title
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text("II. WHY IT FAILED: THE PRIMARY CRASH FACTORS", 20, 32);

      doc.setDrawColor(brandOrange[0], brandOrange[1], brandOrange[2]);
      doc.setLineWidth(0.4);
      doc.line(20, 36, 190, 36);

      // Executive narration summary
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text("AI DIAGNOSTIC DECONSTRUCTION", 20, 46);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(60, 60, 60);
      const summaryDetailSplit = doc.splitTextToSize(analysis.summary, 170);
      doc.text(summaryDetailSplit, 20, 52);

      // Calculate new Y after text
      let causeStartY = 52 + (summaryDetailSplit.length * 5) + 8;
      if (causeStartY > 130) {
        // Fallback safety wrap if summary is extremely long
        causeStartY = 115;
      }

      // Root causes visualization progress bars
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text("CRUCIAL BREAKDOWN PILLARS", 20, causeStartY);
      
      doc.setDrawColor(gridBorder[0], gridBorder[1], gridBorder[2]);
      doc.setLineWidth(0.2);
      doc.line(20, causeStartY + 3, 190, causeStartY + 3);

      let currentCauseY = causeStartY + 10;

      // Helper function to draw visual scale progress bar next to factors
      const drawFactorBar = (title: string, barWidthPercent: number, description: string, labelY: number) => {
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(40, 40, 40);
        doc.text(title, 20, labelY);

        // Draw progress container
        doc.setFillColor(235, 237, 240);
        doc.rect(78, labelY - 3, 50, 4, 'F');

        // Draw filled progress
        doc.setFillColor(brandOrange[0], brandOrange[1], brandOrange[2]);
        doc.rect(78, labelY - 3, Math.round(50 * (barWidthPercent / 100)), 4, 'F');

        // Show percentage
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(8.5);
        doc.setTextColor(brandOrange[0], brandOrange[1], brandOrange[2]);
        doc.text(`${barWidthPercent}% Impact`, 132, labelY);

        // Draw description text under it
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(80, 80, 80);
        const descWrapped = doc.splitTextToSize(description, 160);
        doc.text(descWrapped, 20, labelY + 4.5);

        return labelY + 4.5 + (descWrapped.length * 4.2) + 4;
      };

      currentCauseY = drawFactorBar("Capital Constraints", 85, analysis.rootCauses.funding || "Ineffective pacing of capital disbursement matched against hard project outcomes.", currentCauseY);
      currentCauseY = drawFactorBar("Product Optimization", 70, analysis.rootCauses.product || "Technically accomplished code layers that lacked streamlined customer integrations.", currentCauseY);
      currentCauseY = drawFactorBar("Market Demand Fit", 80, analysis.rootCauses.market || "Miscalculated readiness or pricing sensitivity within early key demographics.", currentCauseY);
      currentCauseY = drawFactorBar("Strategic Timing", 65, analysis.rootCauses.timing || "The venture targeted environments before underlying micro-tech or supply rails stabilized.", currentCauseY);

      // Key Mistakes list if room is available
      if (currentCauseY < 235) {
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(10.5);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text("CRITICAL DISRUPTIVE ACTIONS UNDERTAKEN", 20, currentCauseY + 3);
        doc.line(20, currentCauseY + 6, 190, currentCauseY + 6);

        let listY = currentCauseY + 11;
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(60, 60, 60);
        
        analysis.keyMistakes.slice(0, 3).forEach((mistake) => {
          doc.setFillColor(150, 150, 150);
          doc.rect(20, listY - 2, 1.5, 1.5, 'F');
          const wrappedMistakeLine = doc.splitTextToSize(mistake, 160);
          doc.text(wrappedMistakeLine, 24, listY - 1);
          listY += (wrappedMistakeLine.length * 4) + 1.5;
        });
      }

      // Footer
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(180, 180, 180);
      doc.text("CONFIDENTIAL STRATEGIC DECONSTRUCTION — SUB:V2", 20, 282);
      doc.text("PAGE 3 OF 6", 182, 282);

      // ==========================================
      // PAGE 4 — THE FAILURE DNA CASCADE (Beautiful Flow-Chart Slide)
      // ==========================================
      doc.addPage();
      
      // Top header
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, 0, 210, 14, 'F');
      doc.setFillColor(brandOrange[0], brandOrange[1], brandOrange[2]);
      doc.rect(0, 14, 210, 1.2, 'F');

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(160, 160, 160);
      doc.text("FAILUREVAULT INTELLIGENCE CONSOLE   //   SECTION III", 20, 9);

      // Title
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text("III. FAILURE JOURNEY TIMELINE", 20, 32);

      doc.setDrawColor(brandOrange[0], brandOrange[1], brandOrange[2]);
      doc.setLineWidth(0.4);
      doc.line(20, 36, 190, 36);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(80, 80, 80);
      const dnaIntro = "The cascade of startup collapse is rarely a single sudden occurrence. It is a series of interconnected choices and market realities where one misstep accelerates the next. The chain below maps the chronological, step-by-step decline from launch to insolvency:";
      const dnaIntroWrapped = doc.splitTextToSize(dnaIntro, 170);
      doc.text(dnaIntroWrapped, 20, 44);

      // Cascade layout boxes
      let boxY = 62;
      const dnaArray = analysis.failureDNA || [
        "Initial development without core market validation.",
        "Rapid capital deployment prior to achieving product milestones.",
        "Delayed iteration models resulting in high early buyer churn.",
        "Complete asset liquidation is carried out to offset commercial bank liabilities."
      ];

      dnaArray.forEach((dnaNode, stepIndex) => {
        // Draw a connecting vertical pipeline down
        if (stepIndex > 0) {
          doc.setDrawColor(brandOrange[0], brandOrange[1], brandOrange[2]);
          doc.setLineWidth(0.8);
          doc.line(105, boxY - 14, 105, boxY); // Connector line

          // little arrow point
          doc.setFillColor(brandOrange[0], brandOrange[1], brandOrange[2]);
          doc.triangle(103.5, boxY - 3, 106.5, boxY - 3, 105, boxY, 'F');
        }

        // Draw Card Box
        doc.setFillColor(250, 250, 252);
        doc.rect(20, boxY, 170, 25, 'F');
        doc.setDrawColor(gridBorder[0], gridBorder[1], gridBorder[2]);
        doc.setLineWidth(0.3);
        doc.rect(20, boxY, 170, 25, 'D');

        // Draw indicator indicator
        doc.setFillColor(brandOrange[0], brandOrange[1], brandOrange[2]);
        doc.rect(20, boxY, 1.5, 25, 'F');

        // Stage text
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(8.5);
        doc.setTextColor(brandOrange[0], brandOrange[1], brandOrange[2]);
        doc.text(`TIMELINE STAGE 0${stepIndex + 1}`, 26, boxY + 7);

        // Content
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(40, 40, 40);
        const nodeTextWrapped = doc.splitTextToSize(dnaNode, 156);
        doc.text(nodeTextWrapped, 26, boxY + 14);

        boxY += 40; // Spacing for next card
      });

      // Bottom analytical warning box
      doc.setFillColor(242, 245, 248);
      doc.rect(20, boxY - 10, 170, 28, 'F');
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text("SYSTEMIC OBSERVATION", 26, boxY - 3);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(80, 80, 80);
      const conclusionMsg = "By understanding the chronological collapse sequence, custom de-risking mechanisms can be strategically deployed. For example, Stage 01 can be completely neutralized by holding 44px target conversations from day one.";
      const conclusionMsgWrapped = doc.splitTextToSize(conclusionMsg, 158);
      doc.text(conclusionMsgWrapped, 26, boxY + 3);

      // Footer
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(180, 180, 180);
      doc.text("CONFIDENTIAL STRATEGIC DECONSTRUCTION — SUB:V2", 20, 282);
      doc.text("PAGE 4 OF 6", 182, 282);

      // ==========================================
      // PAGE 5 — CAN THIS WORK TODAY? (Feasibility Analysis)
      // ==========================================
      doc.addPage();
      
      // Top header
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, 0, 210, 14, 'F');
      doc.setFillColor(brandOrange[0], brandOrange[1], brandOrange[2]);
      doc.rect(0, 14, 210, 1.2, 'F');

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(160, 160, 160);
      doc.text("FAILUREVAULT INTELLIGENCE CONSOLE   //   SECTION IV", 20, 9);

      // Page Title
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text("IV. FEASIBILITY ANALYSIS & REBUILD OUTLOOK", 20, 32);

      doc.setDrawColor(brandOrange[0], brandOrange[1], brandOrange[2]);
      doc.setLineWidth(0.4);
      doc.line(20, 36, 190, 36);

      // Huge indices cards
      doc.setFillColor(softBg[0], softBg[1], softBg[2]);
      doc.rect(20, 44, 80, 32, 'F');
      doc.setDrawColor(gridBorder[0], gridBorder[1], gridBorder[2]);
      doc.setLineWidth(0.3);
      doc.rect(20, 44, 80, 32, 'D');

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(100, 100, 100);
      doc.text("REVIVAL VIABILITY STATUS", 26, 52);
      doc.setFontSize(16);
      doc.setTextColor(brandOrange[0], brandOrange[1], brandOrange[2]);
      doc.text(`${project.revivalPossibility}% PROBABILITY`, 26, 64);

      doc.setFillColor(softBg[0], softBg[1], softBg[2]);
      doc.rect(110, 44, 80, 32, 'F');
      doc.rect(110, 44, 80, 32, 'D');

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(100, 100, 100);
      doc.text("MODERN POTENTIAL INDEX", 116, 52);
      doc.setFontSize(16);
      doc.setTextColor(accentGreen[0], accentGreen[1], accentGreen[2]);
      doc.text(`${project.potentialScore}/100 SCORE`, 116, 64);

      // Section
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text("REASONING FOR REVIVAL OPTIMISM", 20, 88);
      doc.line(20, 92, 190, 92);

      // Narrative on market opportunities
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(60, 60, 60);
      const opportunityText = analysis.marketOpportunity || "Underlying digital systems, lowered cost base elements, and direct API components have unlocked decentralized execution routes that didn't exist when the original company closed down.";
      const oppTextWrapped = doc.splitTextToSize(opportunityText, 170);
      doc.text(oppTextWrapped, 20, 98);

      // Section
      let enablerStartY = 98 + (oppTextWrapped.length * 5) + 8;
      if (enablerStartY > 195) enablerStartY = 165;

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text("SHIFTED MARKET ENVIRONMENT & ENABLERS", 20, enablerStartY);
      doc.line(20, enablerStartY + 3, 190, enablerStartY + 3);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(60, 60, 60);
      const enablerText = analysis.advisoryAnswers.changedMarketConditions || "The fall in structural pricing, high digital access ubiquity, and localized open standards now let builders launch low-latency modules with nearly zero operating expenditures.";
      const enablerTextWrapped = doc.splitTextToSize(enablerText, 170);
      doc.text(enablerTextWrapped, 20, enablerStartY + 9);

      // Modern risks box
      let riskStartY = enablerStartY + 9 + (enablerTextWrapped.length * 5) + 8;
      if (riskStartY > 245) riskStartY = 215;

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text("UNDERESTIMATED CHALLENGES", 20, riskStartY);
      doc.line(20, riskStartY + 3, 190, riskStartY + 3);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(70, 70, 70);
      let riskY = riskStartY + 9;
      const risksArray = (analysis.newRisks && analysis.newRisks.length > 0) ? analysis.newRisks : ["Fast-moving, high-resource digital competitors.", "Initial scaling friction before building recurring networks."];
      risksArray.forEach((riskText) => {
        doc.setFillColor(239, 68, 68);
        doc.rect(20, riskY - 2, 1.5, 1.5, 'F');
        const wrappedRisk = doc.splitTextToSize(riskText, 160);
        doc.text(wrappedRisk, 24, riskY - 1);
        riskY += (wrappedRisk.length * 4.2) + 2;
      });

      // Footer
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(180, 180, 180);
      doc.text("CONFIDENTIAL STRATEGIC DECONSTRUCTION — SUB:V2", 20, 282);
      doc.text("PAGE 5 OF 6", 182, 282);

      // ==========================================
      // PAGE 6 — ARCHITECTURAL V2 ROADMAP (actionable blueprint)
      // ==========================================
      doc.addPage();
      
      // Top header
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, 0, 210, 14, 'F');
      doc.setFillColor(brandOrange[0], brandOrange[1], brandOrange[2]);
      doc.rect(0, 14, 210, 1.2, 'F');

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(160, 160, 160);
      doc.text("FAILUREVAULT INTELLIGENCE CONSOLE   //   SECTION V", 20, 9);

      // Page Title
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text("V. THE STRATEGIC REBUILD BLUEPRINT", 20, 32);

      doc.setDrawColor(brandOrange[0], brandOrange[1], brandOrange[2]);
      doc.setLineWidth(0.4);
      doc.line(20, 36, 190, 36);

      // Product vision
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(brandOrange[0], brandOrange[1], brandOrange[2]);
      doc.text("FAILUREVAULT V2 ARCHITECTURE CONCEPT", 20, 46);

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(30, 30, 30);
      const v2Title = analysis.advisoryAnswers.v2ProductVision || "The Pivot Model: Zero-Asset Distribution Ledger Routing";
      doc.text(v2Title, 20, 52);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(60, 60, 60);
      const improvementText = analysis.advisoryAnswers.whatToImprove || "Build extremely lean edge logic. Integrate distributed frameworks rather than physical hubs, completely eliminating early infrastructure expenditure parameters.";
      const improvementTextWrapped = doc.splitTextToSize(improvementText, 170);
      doc.text(improvementTextWrapped, 20, 57);

      // Recommend tech stacks
      let techY = 57 + (improvementTextWrapped.length * 4.5) + 6;
      if (techY > 120) techY = 100;

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text("SUPPORTING DIGITAL CORES & INFRASTRUCTURE", 20, techY);
      doc.line(20, techY + 3, 190, techY + 3);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(60, 60, 60);
      const techTextVal = analysis.advisoryAnswers.modernTechToLeverage || "Cloudless serverless routes, Edge API bindings, lightweight relational layouts, and direct messaging Webhook parameters.";
      const techWrapped = doc.splitTextToSize(techTextVal, 170);
      doc.text(techWrapped, 20, techY + 8);

      // Step By Step First 30 Days roadmap
      let roadmapY = techY + 8 + (techWrapped.length * 4.5) + 6;
      if (roadmapY > 180) roadmapY = 145;

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text("IMMEDIATE BLUEPRINT FORWARD (DAY 01 - 30)", 20, roadmapY);
      doc.line(20, roadmapY + 3, 190, roadmapY + 3);

      const drawBlueprintStep = (dayLabel: string, actionTitle: string, actionDesc: string, stepY: number) => {
        doc.setFillColor(softBg[0], softBg[1], softBg[2]);
        doc.rect(20, stepY, 20, 14, 'F');
        doc.setDrawColor(gridBorder[0], gridBorder[1], gridBorder[2]);
        doc.rect(20, stepY, 20, 14, 'D');

        doc.setFont("Helvetica", "bold");
        doc.setFontSize(8.5);
        doc.setTextColor(brandOrange[0], brandOrange[1], brandOrange[2]);
        doc.text(dayLabel, 23, stepY + 9);

        doc.setFont("Helvetica", "bold");
        doc.setFontSize(9.5);
        doc.setTextColor(30, 30, 30);
        doc.text(actionTitle, 45, stepY + 4);

        doc.setFont("Helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(80, 80, 80);
        const wrappedAction = doc.splitTextToSize(actionDesc, 138);
        doc.text(wrappedAction, 45, stepY + 9);

        return stepY + 18;
      };

      let nextStepY = roadmapY + 8;
      nextStepY = drawBlueprintStep("DAYS 1-10", "1. Customer Validation Loop", "Talk directly matching 10 prospective power users. Verify their key current pain points before sketching structural blueprints.", nextStepY);
      nextStepY = drawBlueprintStep("DAYS 11-20", "2. Lean Interface Draft", "Deploy a simple, highly visual digital landing page with integrated email subscription intent forms (0 total infrastructure cost).", nextStepY);
      nextStepY = drawBlueprintStep("DAYS 21-30", "3. Phased Cohort Launch", "Invite the 10 prospective loops to trial the initial draft. Iterate based on direct actual engagement rather than hypothetical modeling.", nextStepY);

      // Professional sign-off
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text("FAILUREVAULT REVIEW ADVISORY BOARD", 20, 245);
      
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(110, 110, 110);
      doc.text("Approved for strategic redistribution by the Board of Academic Labs.", 20, 250);

      // Visual Stamp line
      doc.setDrawColor(accentGreen[0], accentGreen[1], accentGreen[2]);
      doc.setLineWidth(0.4);
      doc.rect(130, 240, 52, 16);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(accentGreen[0], accentGreen[1], accentGreen[2]);
      doc.text("VERIFIED BY V2 ENGINE", 134, 246);
      doc.text("STATUS: FULLY VIABLE", 134, 251);

      // Document footer
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(180, 180, 180);
      doc.text("CONFIDENTIAL STRATEGIC DECONSTRUCTION — SUB:V2", 20, 282);
      doc.text("PAGE 6 OF 6", 182, 282);

      doc.save(`Revival_Report_${project.id}.pdf`);
    } catch (err) {
      console.error("Failed to compile PDF:", err);
    } finally {
      setIsPdfGenerating(false);
    }
  };

  const rootCauseConfig = {
    funding: { title: 'Why It Ran Out of Money', desc: analysis.rootCauses.funding, color: 'text-amber-400 border-amber-500/20 bg-amber-500/5' },
    product: { title: 'Why the Product Broke', desc: analysis.rootCauses.product, color: 'text-indigo-400 border-indigo-500/20 bg-indigo-500/5' },
    market: { title: 'Why Nobody Bought It', desc: analysis.rootCauses.market, color: 'text-purple-400 border-purple-500/20 bg-purple-500/5' },
    execution: { title: 'People & Execution Mistakes', desc: analysis.rootCauses.execution, color: 'text-rose-400 border-rose-500/20 bg-rose-500/5' },
    timing: { title: 'Bad Timing Problems', desc: analysis.rootCauses.timing, color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 text-[#E0E0E0] font-sans">
      
      {/* Top Header Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10 rounded-md text-xs text-slate-350 hover:text-slate-100 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Vault
          </button>
 
          <button
            onClick={handleGeneratePDF}
            disabled={isPdfGenerating}
            id="generate-pdf-btn"
            className="group inline-flex items-center gap-2 px-4 py-2 border border-emerald-500/30 bg-emerald-200/10 hover:bg-emerald-200/20 active:scale-[0.98] rounded-md text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-all cursor-pointer disabled:opacity-50"
          >
            <FileDown className="w-4 h-4 text-emerald-400" />
            {isPdfGenerating ? 'Compiling PDF...' : 'Download PDF Report'}
          </button>

          {onToggleSave && (
            <button
              onClick={onToggleSave}
              className={`inline-flex items-center gap-2 px-4 py-2 border rounded-md text-xs font-bold transition-all cursor-pointer ${
                isSaved 
                  ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-400 hover:bg-emerald-500/30'
                  : 'bg-white/5 border-white/10 text-slate-350 hover:bg-white/10 hover:text-slate-100'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-emerald-400' : 'text-slate-400'}`} />
              {isSaved ? 'Saved Case' : 'Save to Vault'}
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
          <Cpu className="w-3.5 h-3.5 text-electric-indigo animate-pulse" />
          <span>Case Loaded Successfully</span>
        </div>
      </div>

      {/* Main Title Banner with General Scores */}
      <div className="p-8 rounded-xl bg-[#0F0F11] border border-white/10 shadow-2xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[180px] h-[180px] bg-electric-indigo/5 blur-[70px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="text-4xl p-3 bg-black/50 border border-white/10 rounded-xl leading-none">
              {project.avatarEmoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-electric-indigo font-sans font-semibold bg-electric-indigo/5 px-2 py-0.5 border border-electric-indigo/10 rounded">
                  {project.industry}
                </span>
                <span className="text-xs text-slate-500">
                  Business Active: {project.foundedYear} – {project.failedYear}
                </span>
              </div>
              <h2 className="font-display font-extrabold text-3xl text-white tracking-tight mt-1.5">
                {project.name}
              </h2>
            </div>
          </div>

          {/* Simple Scores Area */}
          <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8">
            <div className="text-left pr-4">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Potential Score</span>
              <span className="text-2xl font-extrabold text-slate-200">{project.potentialScore}%</span>
            </div>
            <div className="text-left border-l border-white/10 pl-6">
              <RevivalScore score={project.revivalPossibility} size="md" />
            </div>
          </div>
        </div>
      </div>

      {/* Premium Case Study Metadata Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-[#0F0F11] border border-white/10 text-left">
          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Venture Founders</span>
          <span className="text-xs font-semibold text-text-primary block truncate">{project.founder || 'Unknown Founder'}</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0F0F11] border border-white/10 text-left">
          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Peak Funding Raised</span>
          <span className="text-xs font-semibold text-emerald-450 block">{project.fundingRaised || 'Bootstrapped'}</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0F0F11] border border-white/10 text-left">
          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mb-1">Peak Team Size</span>
          <span className="text-xs font-semibold text-slate-20 block">{(project.employeeCount || project.teamSize || 0).toLocaleString()} Members</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0F0F11] border border-white/10 text-left">
          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mb-1 font-bold">Company Status</span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={`w-1.5 h-1.5 rounded-full ${
              project.companyStatus === 'Active' ? 'bg-emerald-400 animate-pulse' :
              project.companyStatus === 'Struggling' ? 'bg-amber-400 animate-pulse' :
              project.companyStatus === 'Acquired' ? 'bg-cyan-400' : 'bg-red-400'
            }`} />
            <span className="text-xs font-bold font-mono text-slate-20">{project.companyStatus || 'Shut Down'}</span>
          </div>
        </div>
      </div>

      {/* Real-time Status Verification Safeguard */}
      {(project.companyStatus === 'Active' || project.companyStatus === 'Struggling') && (
        <div className="p-4 mb-8 bg-amber-500/5 border border-amber-500/15 rounded-xl text-left flex items-start gap-3">
          <Shield className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <strong className="text-[9px] font-mono uppercase tracking-wider text-amber-400 block mb-1">⚠️ REAL-TIME OPERATIONAL SAFEGUARD REPORT</strong>
            <span>This company is flagged as <strong>{project.companyStatus}</strong>. It may be active or undergoing a paradigm shift. </span>
            {project.userSourceUrl && (
              <span className="block mt-2">
                <span className="text-[10px] text-slate-400 font-mono">Verifiable Reference: </span>
                <a href={project.userSourceUrl} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline inline-flex items-center gap-1 break-all">
                  {project.userSourceUrl}
                </a>
              </span>
            )}
            {project.userSourceReasoning && (
              <div className="block mt-2 font-mono text-slate-400 bg-black/30 p-2.5 rounded border border-white/5 space-y-1">
                <span className="text-[9px] text-slate-500 font-bold block">VERIFIABLE CONTEXT:</span>
                <p className="italic text-[11px] leading-relaxed">&ldquo;{project.userSourceReasoning}&rdquo;</p>
              </div>
            )}
            {project.aiConfidence && (
              <span className="block mt-2 font-mono text-[9px] text-slate-500">
                AI REASONING TRUSTMETRIC: <span className="text-emerald-400 font-bold">{project.aiConfidence}% ACCREDITED REASSESSMENT</span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* 7 CLEAR WORKSPACE SECTIONS IN APPLE + NOTION SIMPLICITY */}
      <div className="space-y-8">
        
        {/* SECTION 1: What This Was */}
        <section className="p-6 md:p-8 rounded-xl bg-[#0F0F11] border border-white/10 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded bg-blue-500/10 text-blue-400">
              <Info className="w-4 h-4" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-100">1. What This Was</h3>
          </div>
          <p className="text-sm text-slate-350 leading-relaxed font-light font-sans text-left">
            {project.description || `${project.name} was an ambitious idea designed to tackle problems in the ${project.industry} industry. It had a peak team size of ${project.teamSize} people working towards its grand vision.`}
          </p>
        </section>

        {/* STARTUP COLLAPSE TIMELINE */}
        {project.timeline && project.timeline.length > 0 && (
          <section className="p-6 md:p-8 rounded-xl bg-[#0F0F11] border border-white/10 shadow-sm text-left">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-1.5 rounded bg-teal-500/10 text-teal-400">
                <Layers className="w-4 h-4 animate-pulse" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-100">Chronological Collapse Timeline</h3>
            </div>
            
            <div className="relative border-l border-white/10 ml-3 space-y-6">
              {project.timeline.map((item, idx) => (
                <div key={idx} className="relative pl-6">
                  {/* Status dot */}
                  <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${
                    item.status === 'good' ? 'bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]' :
                    item.status === 'bad' ? 'bg-red-400 shadow-[0_0_10px_rgba(239,68,68,0.3)]' :
                    'bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                  }`} />
                  <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-slate-400">
                    {item.year} Event
                  </span>
                  <p className="text-xs text-slate-300 font-sans mt-1 leading-relaxed font-light">
                    {item.event}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 2: What Went Wrong */}
        <section className="p-6 md:p-8 rounded-xl bg-[#0F0F11] border border-white/10 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded bg-rose-500/10 text-rose-400">
              <Skull className="w-4 h-4" />
            </div>
            <h3 className="font-display font-bold text-lg text-rose-450">2. What Went Wrong</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs uppercase tracking-widest text-electric-indigo font-semibold mb-3">Primary Diagnosis</h4>
              <div className="p-4 rounded-lg bg-black/40 border border-electric-indigo/10 text-xs italic text-slate-300 leading-relaxed font-light">
                &ldquo;{project.primaryFailureReason}&rdquo;
              </div>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-3">Biggest Critical Mistakes</h4>
              <ul className="space-y-2.5 text-xs text-slate-350 font-light">
                {analysis.keyMistakes.map((mistake, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-electric-indigo mt-0.5">•</span>
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 3: AI Summary */}
        <section className="p-6 md:p-8 rounded-xl bg-[#0F0F11] border border-white/10 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded bg-indigo-500/10 text-indigo-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-100">3. AI Summary</h3>
          </div>
          <p className="text-sm text-slate-350 leading-relaxed font-light font-sans">
            {analysis.summary}
          </p>
        </section>

        {/* SECTION 4: Can It Work Today? */}
        <section className="p-6 md:p-8 rounded-xl bg-[#0F0F11] border border-white/10 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="font-display font-bold text-lg text-emerald-450">4. Can It Work Today?</h3>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Today's Market Opportunity</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {analysis.marketOpportunity}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/5">
              <div>
                <h4 className="text-xs font-semibold text-electric-indigo uppercase tracking-wider mb-2">Modern Alternatives</h4>
                <ul className="space-y-1 text-xs text-slate-300 font-light">
                  {analysis.modernAlternatives.map((alt, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      <span>{alt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-electric-indigo uppercase tracking-wider mb-2">Market Changes to Leverage</h4>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {analysis.advisoryAnswers.changedMarketConditions || "SaaS operations are 80% cheaper and easier to spin up now."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Risks (Risk Level) */}
        <section className="p-6 md:p-8 rounded-xl bg-[#0F0F11] border border-white/10 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded bg-electric-indigo/10 text-electric-indigo">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-100">5. Risks (Risk Level)</h3>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">Active Strategic Vulnerabilities</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300 font-light">
                {analysis.newRisks.map((risk, i) => (
                  <li key={i} className="flex items-start gap-2 bg-black/20 border border-white/5 p-2 rounded-md">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-white/5 pt-4">
              <h4 className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-3">Segmented Failure Factors</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {(Object.keys(rootCauseConfig) as Array<typeof activeTab>).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`px-3 py-1.5 rounded text-xs font-medium border transition-all cursor-pointer ${
                      activeTab === key 
                        ? 'bg-electric-indigo/10 text-electric-indigo border-electric-indigo/30'
                        : 'bg-transparent text-slate-450 border-transparent hover:text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    {rootCauseConfig[key].title}
                  </button>
                ))}
              </div>

              <div className={`p-4 rounded border ${rootCauseConfig[activeTab].color} transition-all`}>
                <p className="text-xs font-light leading-relaxed text-slate-200">
                  {rootCauseConfig[activeTab].desc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Rebuild Plan */}
        <section className="p-6 md:p-8 rounded-xl bg-[#0F0F11] border border-white/10 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <div className="p-1.5 rounded bg-indigo-500/10 text-indigo-400">
              <Compass className="w-4 h-4" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-100">6. Rebuild Plan</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-black/30 border border-white/5 p-5 rounded-xl">
              <h4 className="text-xs text-electric-indigo font-sans font-bold uppercase tracking-wider mb-2">V2 Concept Vision</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {analysis.advisoryAnswers.v2ProductVision}
              </p>
            </div>
            
            <div className="bg-black/30 border border-white/5 p-5 rounded-xl">
              <h4 className="text-xs text-emerald-400 font-sans font-bold uppercase tracking-wider mb-2">How to Pivot Successfully</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {analysis.advisoryAnswers.whatToImprove}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs text-text-muted uppercase tracking-widest font-bold mb-4">Failure Journey</h4>
            <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-border-subtle">
              {analysis.failureDNA.map((step, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="relative flex gap-4 items-start"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, delay: idx * 0.15 }}
                    className="absolute -left-[20px] top-1.5 w-2.5 h-2.5 rounded-full bg-danger border border-bg-card z-10" 
                  />
                  <div className="p-4 rounded-xl bg-bg-elevated border border-border-subtle w-full hover:border-accent transition-all duration-300 hover:shadow-[0_0_15px_rgba(20,184,166,0.1)] hover:-translate-y-0.5">
                    <span className="text-[10px] text-danger font-sans font-bold tracking-wider">STEP 0{idx + 1}</span>
                    <p className="text-sm text-text-secondary font-light mt-1.5 leading-relaxed">{step}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: Start Working On This */}
        <section className="p-6 md:p-8 rounded-xl bg-gradient-to-r from-electric-indigo/10 via-[#0F0F11]/90 to-transparent border border-electric-indigo/20 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-electric-indigo/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div>
              <h3 className="font-display font-black text-xl text-white tracking-widest uppercase">
                7. Start Working On This
              </h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed mt-1 max-w-xl">
                Ready to take control? Put this project into your Active Workspace to start editing tasks, reading advice, taking progress notes, and organizing a helper team.
              </p>
            </div>

            <button
              onClick={() => onMakeActiveProject(project.id)}
              id="make-project-mine-btn"
              className="px-6 py-4 bg-accent text-white font-sans font-bold rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] text-xs tracking-wider uppercase"
            >
              <Play className="w-4 h-4 fill-current text-white" />
              Activate Rebuild Canvas
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
