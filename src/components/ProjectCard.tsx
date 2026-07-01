import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  key?: string;
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.div
      onClick={onClick}
      id={`project-card-${project.id}`}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="group relative flex flex-col justify-between p-6 rounded-2xl cursor-pointer transition-all duration-300 glass-panel hover:border-accent/50 hover:shadow-[0_8px_30px_rgba(20,184,166,0.15)] bg-bg-card overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="space-y-4 text-left relative z-10">
        {/* Startup Name & Revival Score */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl select-none">{project.avatarEmoji}</span>
              <h4 className="text-xl font-display font-semibold tracking-tight text-text-primary group-hover:text-accent transition-colors">
                {project.name}
              </h4>
            </div>
            
            {/* Industry & Failed Year */}
            <div className="flex items-center gap-2 text-xs font-sans text-text-secondary mt-2">
              <span className="font-medium text-text-primary">{project.industry}</span>
              <span className="text-border-strong">•</span>
              <span>Failed {project.failedYear}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end text-right">
            <span className="text-[10px] font-sans uppercase tracking-wider text-text-muted mb-0.5">Revival Score</span>
            <span className="text-xl font-display font-bold text-success">
              {project.revivalPossibility}%
            </span>
          </div>
        </div>

        {/* Why It Failed */}
        <div className="pt-2">
          <span className="text-[10px] font-sans uppercase tracking-wider text-text-muted block mb-1">Main Reason It Failed</span>
          <p className="text-sm text-text-secondary leading-relaxed font-sans line-clamp-2">
            {project.primaryFailureReason}
          </p>
        </div>

        {/* Short AI insight */}
        <div className="bg-success/5 border border-success/10 p-3 rounded-xl">
          <span className="flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-wider text-success font-semibold mb-1">
            <Sparkles className="w-3 h-3" />
            AI Insight
          </span>
          <p className="text-xs text-text-primary leading-relaxed font-sans line-clamp-2">
            {project.aiAnalysis?.summary || "A modern version can succeed by leveraging new validation frameworks."}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end pt-5 mt-5 border-t border-border-subtle">
        <span className="flex items-center gap-1.5 text-xs font-sans font-medium text-accent group-hover:text-accent-hover transition-colors">
          View Full Analysis
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </motion.div>
  );
}
