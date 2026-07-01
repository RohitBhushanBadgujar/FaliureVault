import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import * as d3 from 'd3';
import { 
  TrendingUp, Compass, Sliders, ShieldCheck, 
  Database, LineChart, Play, HelpCircle, Building2, Terminal
} from 'lucide-react';
import { Project } from '../types';

interface SuccessMetricsDashboardProps {
  project: Project;
}

interface PivotStrategy {
  id: string;
  name: string;
  description: string;
  baseCapExSavings: number; // percentage
  baseMarketSpeedMultiplier: number; // e.g. 1.5x
  baseFundingStabilityMultiplier: number; // multiplier
  actionPoints: string[];
}

export default function SuccessMetricsDashboard({ project }: SuccessMetricsDashboardProps) {
  // SVG ref for D3.js chart
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Available pivot strategies custom generated based on project characteristics (e.g. physical vs digital)
  const isHardwareHeavy = 
    project.id === 'kanoa' || 
    project.id === 'pebblestack' || 
    project.id === 'bppl' || 
    project.industry.toLowerCase().includes('hardware') || 
    project.industry.toLowerCase().includes('device') || 
    project.industry.toLowerCase().includes('autonomous');

  const pivotStrategies: PivotStrategy[] = isHardwareHeavy ? [
    {
      id: 'software-orchestration',
      name: 'Software-Only Orchestration Pivot',
      description: 'Abandon custom physical tool fabrication. License software controls and telemetry algorithms to pre-existing verified hardware distributors.',
      baseCapExSavings: 85,
      baseMarketSpeedMultiplier: 1.8,
      baseFundingStabilityMultiplier: 1.6,
      actionPoints: [
        'Halt high-tonnage physical injection molding contracts.',
        'Package telemetry capture libraries as a cross-platform REST SDK.',
        'Target third-party wearable manufacturers for strategic partnerships.'
      ]
    },
    {
      id: 'b2b-presales',
      name: 'Enterprise SLA & Pre-sales Capture',
      description: 'Pivot away from mass-consumer crowdfunding pre-orders. Sign high-value commitments and dry-run SLAs with 5 core enterprise players.',
      baseCapExSavings: 45,
      baseMarketSpeedMultiplier: 1.2,
      baseFundingStabilityMultiplier: 2.2,
      actionPoints: [
        'Mandate $25K non-refundable discovery fees from business pilots.',
        'Align quality tolerance matrices with legacy underwriter guidelines.',
        'Transition from high-churn consumer marketing to direct target sales.'
      ]
    },
    {
      id: 'phased-rollout',
      name: 'Incremental Phased Validation',
      description: 'Avoid a massive blanket release. Prove utility and deep engagement with a small, localized cohort or community group first before expanding.',
      baseCapExSavings: 60,
      baseMarketSpeedMultiplier: 2.1,
      baseFundingStabilityMultiplier: 1.4,
      actionPoints: [
        'Engage directly with 10 passionate local power-users for early testing.',
        'Run small-scale operations manually to save infrastructure overhead.',
        'Avoid high cloud or operations scale and defer broad scaling steps.'
      ]
    }
  ] : [
    {
      id: 'plg-optimization',
      name: 'Product-Led Growth (PLG) Loop',
      description: 'Serrate CAC expenditure entirely. Build viral coefficient mechanics directly into the core user login onboarding loops.',
      baseCapExSavings: 90,
      baseMarketSpeedMultiplier: 1.5,
      baseFundingStabilityMultiplier: 1.5,
      actionPoints: [
        'Expose free project templates with immediate utility before signup.',
        'Integrate automatic multi-tenant workspace sharing widgets.',
        'Repurpose enterprise outbound budget into seamless user telemetry.'
      ]
    },
    {
      id: 'api-first-licensing',
      name: 'API-First developer infrastructure',
      description: 'Transition from specialized dashboard GUIs to dedicated robust headless API routing. Sell raw AI models directly.',
      baseCapExSavings: 75,
      baseMarketSpeedMultiplier: 2.0,
      baseFundingStabilityMultiplier: 1.8,
      actionPoints: [
        'Deprecate resource-heavy React dashboard maintenance workflows.',
        'Host project API portals detailing comprehensive Swagger definitions.',
        'Introduce pay-as-you-go micro-transactions aligned with computational spikes.'
      ]
    },
    {
      id: 'enterprise-custom-channels',
      name: 'Strategic Channel Partnership Distribution',
      description: 'Partner with established software platforms holding high customer overlap. Embed our features directly into their app directories.',
      baseCapExSavings: 50,
      baseMarketSpeedMultiplier: 1.3,
      baseFundingStabilityMultiplier: 2.4,
      actionPoints: [
        'Secure co-sell agreements with market directories (e.g. SalesForce, Shopify).',
        'Leverage existant client compliance certifications (HIPAA, SOC2).',
        'Establish flat 25% revenue bounty kickbacks to reseller partners.'
      ]
    }
  ];

  const [activeStrategyId, setActiveStrategyId] = useState<string>(pivotStrategies[0].id);
  const activeStrategy = pivotStrategies.find(s => s.id === activeStrategyId) || pivotStrategies[0];

  // Simulator Sliders (with defaults reacting to selected template base capabilities)
  const [capexSavings, setCapexSavings] = useState<number>(activeStrategy.baseCapExSavings);
  const [marketSpeed, setMarketSpeed] = useState<number>(100); // percentage (100% is typical base)
  const [fundingStability, setFundingStability] = useState<number>(100); // percentage

  // Reset sliders when strategy changes
  useEffect(() => {
    setCapexSavings(activeStrategy.baseCapExSavings);
    setMarketSpeed(Math.round(activeStrategy.baseMarketSpeedMultiplier * 100));
    setFundingStability(Math.round(activeStrategy.baseFundingStabilityMultiplier * 100));
  }, [activeStrategyId]);

  // Dynamic calculations reflecting simulator metrics
  const survivalMonthsStatusQuo = 4.2; // Historical standard crash point for un-pivoted DNA
  const projectedSurvivalMonths = Math.round((survivalMonthsStatusQuo * (1 + (capexSavings / 100) * 1.5) * (fundingStability / 100)) * 10) / 10;
  const runwayMultiplier = Math.round((projectedSurvivalMonths / survivalMonthsStatusQuo) * 10) / 10;
  const pivotSafetyScore = Math.min(98, Math.round(30 + (capexSavings * 0.35) + (marketSpeed * 0.15) + (fundingStability * 0.2)));
  const estimatedCapitalEfficiency = Math.round((capexSavings * 1.2 + (fundingStability / 100) * 20));

  // Redraw D3 Chart upon dependency change
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    // Get parent bounds for full responsiveness
    const containerWidth = containerRef.current.getBoundingClientRect().width;
    const width = Math.max(340, containerWidth);
    const height = 300;
    const margin = { top: 30, right: 30, bottom: 40, left: 55 };

    // Clear previous elements
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('style', 'max-width: 100%; height: auto;');

    // 1. Prepare dynamic simulator data over 12 months
    const months = Array.from({ length: 13 }, (_, i) => i); // Month 0 to 12

    // Benchmark failure trajectory (declines fast, crashes by month 4)
    const benchmarkData = months.map(m => {
      // parabolic decline simulating cash depletion
      const value = m <= 4 ? 100 - (m * m * 6.25) : 0;
      return { month: m, value: Math.max(0, value) };
    });

    // Status quo curve (fades somewhat slower but dead by month 6)
    const statusQuoData = months.map(m => {
      const value = m <= 6 ? 100 - (m * 16.6) : 0;
      return { month: m, value: Math.max(0, value) };
    });

    // Projected Pivot trajectory (morphs dynamically based on slider values!)
    const pivotData = months.map(m => {
      // Morph formula reacting to adjustments
      let value = 100;
      const initialBurnFactor = Math.max(0.1, 1 - (capexSavings / 100));
      const speedFactor = marketSpeed / 100;
      const fundFactor = fundingStability / 100;

      if (m === 0) {
        value = 100;
      } else if (m <= 3) {
        // initial adjustment period, small investment dip
        value = 100 - (m * 12 * initialBurnFactor);
      } else {
        // turning point based on pivot strategy execution
        const dipPoint = 100 - (3 * 12 * initialBurnFactor);
        const growthStep = m - 3;
        // growth speed is amplified by speed/funding multiplier
        const rate = 8.5 * speedFactor * fundFactor;
        value = dipPoint + (growthStep * rate);
      }

      return { month: m, value: Math.min(160, Math.max(5, value)) };
    });

    // 2. Set up axes domains
    const xScale = d3.scaleLinear()
      .domain([0, 12])
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([0, 160]) // 0% to 160% of baseline survival capital strength
      .range([height - margin.bottom, margin.top]);

    // 3. Gridlines
    svg.append('g')
      .attr('class', 'grid-lines opacity-10')
      .attr('stroke', '#E2E8F0')
      .selectAll('line')
      .data(yScale.ticks(5))
      .enter()
      .append('line')
      .attr('x1', margin.left)
      .attr('x2', width - margin.right)
      .attr('y1', d => yScale(d))
      .attr('y2', d => yScale(d))
      .attr('stroke-width', 1);

    svg.append('g')
      .attr('class', 'grid-lines-vertical opacity-10')
      .attr('stroke', '#E2E8F0')
      .selectAll('line')
      .data(xScale.ticks(12))
      .enter()
      .append('line')
      .attr('x1', d => xScale(d))
      .attr('x2', d => xScale(d))
      .attr('y1', margin.top)
      .attr('y2', height - margin.bottom)
      .attr('stroke-width', 1);

    // 4. Draw axes
    const xAxis = d3.axisBottom(xScale)
      .ticks(12)
      .tickFormat(d => `M${d}`);

    const yAxis = d3.axisLeft(yScale)
      .ticks(6)
      .tickFormat(d => `${d}%`);

    svg.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .attr('class', 'axis text-slate-500 font-mono text-[9px]')
      .call(xAxis)
      .call(g => g.select('.domain').attr('stroke', 'rgba(255,255,255,0.15)'))
      .call(g => g.selectAll('.tick line').attr('stroke', 'rgba(255,255,255,0.15)'));

    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .attr('class', 'axis text-slate-500 font-mono text-[9px]')
      .call(yAxis)
      .call(g => g.select('.domain').attr('stroke', 'rgba(255,255,255,0.15)'))
      .call(g => g.selectAll('.tick line').attr('stroke', 'rgba(255,255,255,0.15)'));

    // 5. Line and Area generators
    const lineGenerator = d3.line<{ month: number; value: number }>()
      .x(d => xScale(d.month))
      .y(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    const areaGenerator = d3.area<{ month: number; value: number }>()
      .x(d => xScale(d.month))
      .y0(height - margin.bottom)
      .y1(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // Gradients
    const defs = svg.append('defs');

    // Pivot success area gradient
    const successGrad = defs.append('linearGradient')
      .attr('id', 'success-gradient')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%');
    successGrad.append('stop').attr('offset', '0%').attr('stop-color', '#22c55e').attr('stop-opacity', '0.25');
    successGrad.append('stop').attr('offset', '100%').attr('stop-color', '#22c55e').attr('stop-opacity', '0.0');

    // Historical failure area gradient
    const failGrad = defs.append('linearGradient')
      .attr('id', 'fail-gradient')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%');
    failGrad.append('stop').attr('offset', '0%').attr('stop-color', '#F43F5E').attr('stop-opacity', '0.15');
    failGrad.append('stop').attr('offset', '100%').attr('stop-color', '#F43F5E').attr('stop-opacity', '0.0');

    // 6. Draw Areas
    svg.append('path')
      .datum(pivotData)
      .attr('d', areaGenerator)
      .attr('fill', 'url(#success-gradient)');

    svg.append('path')
      .datum(benchmarkData)
      .attr('d', areaGenerator)
      .attr('fill', 'url(#fail-gradient)');

    // 7. Draw Lines
    // Historical Benchmark DNA Line
    svg.append('path')
      .datum(benchmarkData)
      .attr('fill', 'none')
      .attr('stroke', '#F43F5E')
      .attr('stroke-width', 2.2)
      .attr('stroke-dasharray', '1 2')
      .attr('d', lineGenerator);

    // Status quo Line
    svg.append('path')
      .datum(statusQuoData)
      .attr('fill', 'none')
      .attr('stroke', '#64748B')
      .attr('stroke-width', 1.8)
      .attr('stroke-dasharray', '5 4')
      .attr('d', lineGenerator);

    // Projected Pivot Success Line
    svg.append('path')
      .datum(pivotData)
      .attr('fill', 'none')
      .attr('stroke', '#22c55e')
      .attr('stroke-width', 3)
      .attr('d', lineGenerator)
      .style('filter', 'drop-shadow(0px 2px 4px rgba(34, 197, 94, 0.2))');

    // 8. Add points of critical crash/pivot
    // Highlight historical point of depletion (Month 4.2)
    svg.append('circle')
      .attr('cx', xScale(4.2))
      .attr('cy', yScale(0))
      .attr('r', 5)
      .attr('fill', '#F43F5E')
      .attr('stroke', '#0F0F11')
      .attr('stroke-width', 1.5)
      .append('title').text('Historical failure reference crash point');

    // Add marker text labels
    svg.append('text')
      .attr('x', xScale(4.3))
      .attr('y', yScale(10))
      .attr('fill', '#F43F5E')
      .attr('font-size', '8px')
      .attr('font-family', 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace')
      .text('BENCHMARK FAILURE CRASH');

    // 9. Interactive tooltips on hover
    const hoverLine = svg.append('line')
      .attr('y1', margin.top)
      .attr('y2', height - margin.bottom)
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', 0.8)
      .attr('stroke-dasharray', '2 2')
      .style('opacity', 0);

    const tooltipGroup = svg.append('g')
      .style('opacity', 0);

    const tooltipBg = tooltipGroup.append('rect')
      .attr('width', 135)
      .attr('height', 55)
      .attr('rx', 3)
      .attr('fill', '#0F0F11')
      .attr('stroke', 'rgba(255,255,255,0.15)')
      .attr('stroke-width', 1);

    const tooltipMonth = tooltipGroup.append('text')
      .attr('x', 8)
      .attr('y', 14)
      .attr('fill', '#FFFFFF')
      .attr('font-weight', 'bold')
      .attr('font-size', '9px')
      .attr('font-family', 'sans-serif');

    const tooltipPivot = tooltipGroup.append('text')
      .attr('x', 8)
      .attr('y', 28)
      .attr('fill', '#22c55e')
      .attr('font-size', '8.5px')
      .attr('font-family', 'ui-monospace, monospace');

    const tooltipFail = tooltipGroup.append('text')
      .attr('x', 8)
      .attr('y', 41)
      .attr('fill', '#F43F5E')
      .attr('font-size', '8.5px')
      .attr('font-family', 'ui-monospace, monospace');

    // Invisible overlay for capturing mouse moves
    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'transparent')
      .style('pointer-events', 'all')
      .on('mouseover', () => {
        hoverLine.style('opacity', 1);
        tooltipGroup.style('opacity', 1);
      })
      .on('mouseout', () => {
        hoverLine.style('opacity', 0);
        tooltipGroup.style('opacity', 0);
      })
      .on('mousemove', (event) => {
        const [mouseX] = d3.pointer(event);
        // Find corresponding month index (0-12)
        const monthX = xScale.invert(mouseX);
        const roundedMonth = Math.max(0, Math.min(12, Math.round(monthX)));

        const pivotYVal = pivotData[roundedMonth].value;
        const failYVal = benchmarkData[roundedMonth]?.value || 0;

        // Position indicators
        hoverLine.attr('x1', xScale(roundedMonth)).attr('x2', xScale(roundedMonth));

        // Tooltip placement logic to keep it within bounds
        const tooltipX = roundedMonth > 6 ? xScale(roundedMonth) - 145 : xScale(roundedMonth) + 10;
        const tooltipY = Math.min(height - margin.bottom - 70, Math.max(margin.top + 5, yScale(pivotYVal) - 25));

        tooltipGroup.attr('transform', `translate(${tooltipX}, ${tooltipY})`);
        tooltipMonth.text(`Month ${roundedMonth} Outlook`);
        tooltipPivot.text(`V2 Trajectory: ${Math.round(pivotYVal)}%`);
        tooltipFail.text(`Historical Crash: ${Math.round(failYVal)}%`);
      });

  }, [activeStrategyId, capexSavings, marketSpeed, fundingStability]);

  return (
    <div className="p-6 rounded-lg bg-[#0F0F11] border border-white/10 font-sans" ref={containerRef}>
      
      {/* Tab bar inside metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-6">
        <div>
          <h3 className="font-display font-bold text-base text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-500" strokeWidth={2.5} />
            Survival Capital & Scale Predictor
          </h3>
          <p className="text-[9px] text-slate-500 font-mono tracking-widest mt-0.5">D3 INTEL TRAJECTORY SIMULATOR</p>
        </div>

        {/* Strategy Selector */}
        <div className="flex gap-1.5 p-1 bg-black/45 rounded-lg border border-white/10 overflow-x-auto max-w-full">
          {pivotStrategies.map(strategy => (
            <button
              key={strategy.id}
              onClick={() => setActiveStrategyId(strategy.id)}
              className={`px-3 py-1.5 text-[9px] font-mono tracking-wider font-semibold rounded uppercase whitespace-nowrap cursor-pointer transition-all ${
                activeStrategyId === strategy.id 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : 'bg-transparent text-slate-400 hover:text-white border border-transparent'
              }`}
            >
              {strategy.name.split(' ')[0]} Pivot
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COMPONENT: Simulation settings and controls */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-4 rounded bg-black/35 border border-white/10">
            <span className="text-[10px] font-mono text-emerald-400 block mb-1 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5" />
              ACTIVE FORMULA
            </span>
            <h4 className="text-xs font-bold text-slate-200">{activeStrategy.name}</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed font-sans font-light mt-1.5">
              {activeStrategy.description}
            </p>
          </div>

          {/* Interactive Parameters Adjusters */}
          <div className="space-y-4 p-5 rounded-xl bg-bg-card border border-border-subtle font-sans">
            <span className="text-xs text-text-muted font-bold block tracking-widest uppercase mb-3 flex items-center gap-1.5">
              <Sliders className="w-4 h-4" />
              Calibration Controls
            </span>

            {/* Slider 1: CapEx reduction */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-text-secondary font-medium">CapEx Reduction Ratio</span>
                <span className="text-accent font-bold">{capexSavings}%</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="95" 
                value={capexSavings}
                onChange={(e) => setCapexSavings(parseInt(e.target.value))}
                className="w-full accent-accent bg-bg-elevated h-1.5 rounded-full overflow-hidden cursor-pointer" 
              />
              <span className="text-xs text-text-muted font-medium mt-1.5 block">Lowers early run-rate burns</span>
            </div>

            {/* Slider 2: Action speed */}
            <div className="pt-2">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-text-secondary font-medium">Market Speed Index</span>
                <span className="text-accent font-bold">{marketSpeed}%</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="220" 
                value={marketSpeed}
                onChange={(e) => setMarketSpeed(parseInt(e.target.value))}
                className="w-full accent-accent bg-bg-elevated h-1.5 rounded-full overflow-hidden cursor-pointer" 
              />
              <span className="text-xs text-text-muted font-medium mt-1.5 block">Speeds up conversion rate validation</span>
            </div>

            {/* Slider 3: Capital stability */}
            <div className="pt-2">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-text-secondary font-medium">Funding Stability Lockup</span>
                <span className="text-accent font-bold">{fundingStability}%</span>
              </div>
              <input 
                type="range" 
                min="40" 
                max="250" 
                value={fundingStability}
                onChange={(e) => setFundingStability(parseInt(e.target.value))}
                className="w-full accent-accent bg-bg-elevated h-1.5 rounded-full overflow-hidden cursor-pointer" 
              />
              <span className="text-xs text-text-muted font-medium mt-1.5 block">Reduces capitalization vulnerabilities</span>
            </div>
          </div>

          {/* Action points checklist */}
          <div className="p-4 rounded border border-white/5 bg-black/25">
            <span className="text-[9px] font-mono text-slate-500 block mb-2 uppercase tracking-widest">
              Pivot Immediate Action Deck
            </span>
            <ul className="space-y-1.5 text-[11px] text-slate-350">
              {activeStrategy.actionPoints.map((pt, idx) => (
                <li key={idx} className="flex gap-2 items-start font-sans leading-relaxed">
                  <span className="text-emerald-500 mt-0.5">✔</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT COMPONENT: Interactive SVG D3 Plot */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full bg-[#070A0F] border border-white/5 rounded p-4 relative">
          <div className="absolute top-2 right-4 flex items-center gap-3 text-[8.5px] font-mono select-none">
            <span className="flex items-center gap-1"><span className="w-2.5 h-0.5 bg-[#F43F5E] inline-block dash-dot" /> Historical Journey</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-0.5 bg-slate-500 inline-block dash-thick" /> Status Quo</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-1.5 bg-[#22c55e] inline-block rounded-xs" /> Sim Pivot Outlook</span>
          </div>

          <div className="w-full mt-4">
            <svg ref={svgRef} className="mx-auto" />
          </div>

          <div className="text-[10px] font-sans text-text-muted text-center select-none border-t border-border-subtle pt-3 flex items-center justify-center gap-1.5 uppercase tracking-wider">
            <LineChart className="w-3.5 h-3.5" />
            <span>Hover over plot to see financial outlook</span>
          </div>
        </div>
      </div>

      {/* FOOTER: Rebuild Outlook Readout metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6 border-t border-border-subtle pt-6 text-center text-sm">
        
        {/* Metric 1 */}
        <div className="p-5 bg-bg-card rounded-xl border border-border-subtle font-sans shadow-lg flex flex-col items-center justify-center">
          <span className="text-xs text-text-muted font-medium block uppercase tracking-wider">Historical Survival</span>
          <span className="text-xl text-danger font-bold mt-2 block">
            {survivalMonthsStatusQuo} months
          </span>
          <span className="text-xs text-text-muted block text-center mt-1">Average time before crash</span>
        </div>

        {/* Metric 2 */}
        <div className="p-5 bg-bg-card rounded-xl border border-border-subtle font-sans shadow-lg flex flex-col items-center justify-center">
          <span className="text-xs text-text-muted font-medium block uppercase tracking-wider">Projected Runway</span>
          <span className="text-xl text-success font-bold mt-2 block">
            {projectedSurvivalMonths} months
          </span>
          <span className="text-xs text-text-muted block mt-1 text-center">Estimated time with V2 plan</span>
        </div>

        {/* Metric 3 */}
        <div className="p-5 bg-bg-card rounded-xl border border-border-subtle font-sans shadow-lg flex flex-col items-center justify-center">
          <span className="text-xs text-text-muted font-medium block uppercase tracking-wider">Runway Extension</span>
          <span className="text-xl text-success font-bold mt-2 block">
            +{runwayMultiplier}x
          </span>
          <span className="text-xs text-text-muted block mt-1 text-center">Capital stretch multiplier</span>
        </div>

        {/* Metric 4 */}
        <div className="p-5 bg-bg-card rounded-xl border border-border-subtle font-sans shadow-lg flex flex-col items-center justify-center">
          <span className="text-xs text-text-muted font-medium block uppercase tracking-wider">Success Potential</span>
          <span className="text-xl text-warning font-bold mt-2 block">
            {pivotSafetyScore}%
          </span>
          <span className="text-xs text-text-muted block mt-1 text-center">Estimated viability index</span>
        </div>

      </div>

    </div>
  );
}
