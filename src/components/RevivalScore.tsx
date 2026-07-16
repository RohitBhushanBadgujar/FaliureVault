import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface RevivalScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
}

export default function RevivalScore({ score, size = 'md', showLabel = true, animated = true }: RevivalScoreProps) {
  const [displayScore, setDisplayScore] = useState(animated ? 0 : score);

  useEffect(() => {
    if (!animated) {
      setDisplayScore(score);
      return;
    }

    let start = 0;
    const end = score;
    if (start === end) return;

    const duration = 1200; // 1.2 seconds animation
    const startTime = performance.now();

    const animateCount = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // Ease out quad
      const easeProgress = progress * (2 - progress);
      const current = Math.round(easeProgress * (end - start) + start);
      
      setDisplayScore(current);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setDisplayScore(end);
      }
    };

    requestAnimationFrame(animateCount);
  }, [score, animated]);

  // Color intelligence rules:
  // High Score (70-100): Soft green/teal
  // Medium Score (40-69): Soft amber/gold
  // Low Score (0-39): Soft red/rose
  const getTheme = () => {
    if (score >= 70) {
      return {
        glow: 'shadow-[0_0_20px_rgba(20,184,166,0.12)] group-hover:shadow-[0_0_30px_rgba(20,184,166,0.22)] border border-teal-500/20 bg-teal-500/5',
        gradient: 'from-teal-400 to-emerald-400',
        text: 'text-teal-400',
        ring: 'border-teal-500/20 bg-teal-500/5',
        dot: 'bg-emerald-400'
      };
    } else if (score >= 40) {
      return {
        glow: 'shadow-[0_0_20px_rgba(245,158,11,0.10)] group-hover:shadow-[0_0_30px_rgba(245,158,11,0.20)] border border-amber-500/20 bg-amber-500/5',
        gradient: 'from-amber-400 to-amber-500',
        text: 'text-amber-400',
        ring: 'border-amber-500/15 bg-amber-500/5',
        dot: 'bg-amber-400'
      };
    } else {
      return {
        glow: 'shadow-[0_0_20px_rgba(239,68,68,0.10)] group-hover:shadow-[0_0_30px_rgba(239,68,68,0.20)] border border-rose-500/20 bg-rose-500/5',
        gradient: 'from-rose-400 to-red-400',
        text: 'text-rose-400',
        ring: 'border-rose-500/15 bg-rose-500/5',
        dot: 'bg-rose-400'
      };
    }
  };

  const theme = getTheme();

  // Size styling maps
  const sizeClasses = {
    sm: {
      wrap: 'px-3 py-1.5 rounded-xl gap-2',
      num: 'text-lg font-black font-sans tracking-tight',
      label: 'text-[9px] font-mono tracking-wider',
      ringSize: 'w-2 h-2',
    },
    md: {
      wrap: 'p-4 rounded-2xl gap-3',
      num: 'text-3xl font-black font-sans tracking-tighter',
      label: 'text-[10px] font-sans tracking-widest uppercase font-semibold text-text-secondary',
      ringSize: 'w-3 h-3',
    },
    lg: {
      wrap: 'p-6 rounded-3xl gap-4',
      num: 'text-5xl font-black font-sans tracking-tighter',
      label: 'text-xs font-sans tracking-widest uppercase font-semibold text-text-secondary',
      ringSize: 'w-4 h-4',
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`relative inline-flex items-center justify-between ${theme.glow} ${currentSize.wrap} backdrop-blur-md transition-all duration-300 z-10 overflow-hidden`}
    >
      {/* Dynamic pulse gradient overlay in the background */}
      <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-5 blur-[40px] animate-pulse`} />

      <div className="flex flex-col items-start text-left relative z-10">
        {showLabel && (
          <span className={`${currentSize.label} text-text-muted mb-1 flex items-center gap-1.5`}>
            <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse shrink-0" />
            Revival Score
          </span>
        )}
        <div className="flex items-baseline gap-0.5">
          <span className={`${currentSize.num} bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent font-sans tracking-tight font-black`}>
            {displayScore}
          </span>
          <span className={`text-sm font-sans font-medium ${theme.text}`}>%</span>
        </div>
      </div>

      {/* Subtle pulsing outer ring structure around indicator dot */}
      <div className="flex items-center justify-center relative z-10 ml-4 shrink-0">
        <span className={`absolute inline-flex h-3 w-3 rounded-full animate-ping opacity-40 ${theme.dot}`} />
        <span className={`relative inline-flex rounded-full h-2 w-2 ${theme.dot}`} />
      </div>
    </motion.div>
  );
}
