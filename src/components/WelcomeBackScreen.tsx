import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, LogIn, ArrowRight, Clock, HelpCircle, Activity, Lightbulb, Sparkles, AlertCircle } from 'lucide-react';
import { Project } from '../types';

interface WelcomeBackScreenProps {
  userProfile: { name: string; email: string };
  onContinue: () => void;
  onSwitchAccount: () => void;
  projectsList: Project[];
  onContinueProject: (projectId: string) => void;
}

const AI_GREETINGS = [
  "Ready to rebuild ideas?",
  "Let’s continue your work.",
  "Your vault is waiting.",
  "Ready to decode structural failures?"
];

export default function WelcomeBackScreen({
  userProfile,
  onContinue,
  onSwitchAccount,
  projectsList,
  onContinueProject
}: WelcomeBackScreenProps) {
  // Select a greeting once on mount
  const [greeting, setGreeting] = useState('');
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * AI_GREETINGS.length);
    setGreeting(AI_GREETINGS[randomIndex]);
  }, []);

  // Retrieve last active project details from localStorage if they exist
  const [lastActiveProject, setLastActiveProject] = useState<Project | null>(null);
  const [lastOpenedTimeFormatted, setLastOpenedTimeFormatted] = useState('Recently');

  useEffect(() => {
    const lastActiveId = localStorage.getItem('failurevault_last_project_id');
    const lastOpenedTime = localStorage.getItem('failurevault_last_opened');

    if (lastActiveId) {
      const found = projectsList.find(p => p.id === lastActiveId);
      if (found) {
        setLastActiveProject(found);
      }
    }

    if (lastOpenedTime) {
      try {
        const openedDate = new Date(lastOpenedTime);
        const now = new Date();
        const diffMs = now.getTime() - openedDate.getTime();
        const diffMin = Math.floor(diffMs / (1000 * 60));
        const diffHr = Math.floor(diffMs / (1000 * 60 * 60));

        if (diffMin < 1) {
          setLastOpenedTimeFormatted('just now');
        } else if (diffMin < 60) {
          setLastOpenedTimeFormatted(`${diffMin}m ago`);
        } else if (diffHr < 24) {
          setLastOpenedTimeFormatted(`${diffHr} ${diffHr === 1 ? 'hour' : 'hours'} ago`);
        } else {
          setLastOpenedTimeFormatted(openedDate.toLocaleDateString());
        }
      } catch {
        setLastOpenedTimeFormatted('recently');
      }
    }
  }, [projectsList]);

  const currentStyle = {
    background: 'bg-bg-primary',
    card: 'bg-bg-card glass-panel border border-border-subtle shadow-2xl',
    accentText: 'text-accent',
    primaryButton: 'bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/20 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]',
    secondaryButton: 'bg-bg-elevated border border-border-subtle text-text-primary hover:bg-bg-card hover:border-border-strong rounded-xl shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]',
    glow: 'bg-accent/10 blur-[120px]',
    label: 'text-text-muted font-sans',
    title: 'text-text-primary font-display',
    tag: 'text-text-muted border-border-subtle bg-bg-elevated font-sans'
  };

  return (
    <div className={`relative min-h-screen flex items-center justify-center ${currentStyle.background} font-sans text-soft-white p-4 transition-all duration-300`}>
      {/* Dynamic Theme Glow Backgrounds */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full ${currentStyle.glow} pointer-events-none transition-all duration-300`} />

      {/* Futuristic Grids */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(108,99,255,0.05)_0%,transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`relative w-full max-w-lg p-8 md:p-10 rounded-xl ${currentStyle.card} z-10`}
      >
        {/* Profile Card Area with Beautiful Ambient Glow */}
        <div className="text-center mb-8 relative">
          <div className="relative inline-block mb-5">
            <div className={`absolute inset-0 rounded-full scale-125 blur-md bg-accent/20 animate-pulse`} />
            <div className="relative w-20 h-20 rounded-full border border-border-subtle bg-bg-elevated shadow-inner flex items-center justify-center overflow-hidden">
              <span className="text-3xl">👤</span>
            </div>
          </div>

          <p className={`text-xs uppercase tracking-widest font-sans font-bold mt-1 ${currentStyle.accentText}`}>
            Session Authenticated
          </p>

          <h2 className={`text-2xl mt-2 tracking-tight font-extrabold ${currentStyle.title}`}>
            Welcome back, {userProfile.name} 👋
          </h2>

          <p className="text-base text-text-secondary mt-2 font-medium italic min-h-[20px]">
            "{greeting}"
          </p>
        </div>

        {/* Recently Active Workspace Card (Takeover Flow) */}
        {lastActiveProject && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`border border-border-subtle bg-bg-elevated rounded-xl p-6 mb-8 hover:bg-bg-card transition-colors relative group`}
          >
            <div className="absolute top-4 right-4 text-[10px] text-text-muted font-sans font-medium flex items-center gap-1.5 bg-bg-primary py-1 px-2.5 rounded border border-border-subtle select-none animate-fade-in">
              <Clock className="w-3 h-3 text-text-muted" />
              <span>Visited {lastOpenedTimeFormatted}</span>
            </div>

            <span className={`text-[10px] font-sans font-bold uppercase tracking-wider block mb-2 ${currentStyle.accentText}`}>
              Active Recovery Workspace
            </span>

            <h3 className="text-lg font-semibold text-text-primary tracking-tight flex items-center gap-2 group-hover:text-accent transition-colors">
              <span className="text-xl">{lastActiveProject.avatarEmoji || '💡'}</span>
              {lastActiveProject.name}
            </h3>

            <p className="text-sm text-text-secondary mt-1.5 line-clamp-1">
              {lastActiveProject.tagline}
            </p>

            <div className="mt-5 pt-5 border-t border-border-subtle flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              {/* Progress metrics */}
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs text-text-secondary font-medium mb-1.5">
                  <span>Rebuild Checklist Progress</span>
                  <span className="font-sans text-text-primary font-bold">{lastActiveProject.workspace?.progress || 0}%</span>
                </div>
                <div className="w-full bg-bg-primary h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 bg-accent`}
                    style={{ width: `${lastActiveProject.workspace?.progress || 0}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => onContinueProject(lastActiveProject.id)}
                id="welcome-continue-rebuild-btn"
                className={`cursor-pointer px-5 py-2.5 text-sm font-semibold rounded-lg ${currentStyle.primaryButton} flex items-center justify-center gap-2 whitespace-nowrap hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(20,184,166,0.2)] hover:shadow-[0_0_25px_rgba(20,184,166,0.4)]`}
              >
                <span>Continue Rebuilding</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Primary Action Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={onContinue}
            id="welcome-continue-as-user-btn"
            className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm ${
              lastActiveProject 
                ? currentStyle.secondaryButton 
                : `${currentStyle.primaryButton} shadow-[0_0_20px_rgba(20,184,166,0.2)] hover:shadow-[0_0_30px_rgba(20,184,166,0.4)]`
            }`}
          >
            <span>Enter Innovation Vault</span>
            {!lastActiveProject && <ArrowRight className="w-5 h-5 stroke-[2.5]" />}
          </button>

          <button
            onClick={onSwitchAccount}
            id="welcome-switch-account-btn"
            className={`w-full py-3.5 text-sm border border-border-subtle text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer font-medium`}
          >
            <span>Disconnect Session ({userProfile.email})</span>
          </button>
        </div>

        {/* Security Node stamp */}
        <div className="mt-8 text-center border-t border-border-subtle pt-6 text-xs text-text-muted font-sans font-medium tracking-wide">
          FailureVault Secure Auth System // ID: {userProfile.email.slice(0, 4)}••••@gmail.com
        </div>
      </motion.div>
    </div>
  );
}
