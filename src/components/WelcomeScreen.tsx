import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Brain, Archive, ArrowRight, Activity, Cpu, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onEnter: () => void;
}

export default function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary overflow-hidden relative flex flex-col items-center justify-center font-sans">
      
      {/* Dynamic Cursor Glow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 z-0 mix-blend-screen"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20, mass: 0.5 }}
      />

      {/* Background Animated Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/20 to-bg-primary z-0" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] mix-blend-screen animate-pulse pointer-events-none" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] mix-blend-screen animate-pulse pointer-events-none" style={{ animationDuration: '10s' }} />

      {/* Floating Particles/Cards Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-30">
        {[
          { icon: Search, top: '20%', left: '15%', delay: 0 },
          { icon: Brain, top: '70%', left: '10%', delay: 2 },
          { icon: Archive, top: '30%', left: '85%', delay: 1 },
          { icon: Activity, top: '80%', left: '80%', delay: 3 },
          { icon: Cpu, top: '10%', left: '50%', delay: 4 },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              className="absolute p-4 rounded-2xl bg-bg-elevated/50 backdrop-blur-xl border border-border-subtle text-text-muted shadow-2xl"
              style={{ top: item.top, left: item.left }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ 
                y: [0, -30, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                delay: item.delay,
                ease: "easeInOut"
              }}
            >
              <Icon className="w-8 h-8 opacity-50" />
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>Premium Startup Intelligence</span>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-text-primary mb-6 leading-tight">
            Some Ideas Failed<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-hover italic">Too Early.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-text-secondary font-medium max-w-2xl leading-relaxed mb-12">
            Explore startup failures and rebuild smarter ideas with AI.
          </p>

          <motion.button
            onClick={onEnter}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 rounded-2xl bg-text-primary text-bg-primary font-sans font-bold text-lg transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)] cursor-pointer overflow-hidden flex items-center gap-3"
          >
            <span className="relative z-10 flex items-center gap-2">
              Enter FailureVault
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity z-0" />
          </motion.button>
        </motion.div>
      </div>

    </div>
  );
}
