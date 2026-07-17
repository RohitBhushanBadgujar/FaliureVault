import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Brain, Archive, ChevronDown, Rocket, Shield, 
  Activity, Users, Lightbulb, Linkedin, Sparkles, Map, 
  FileText, BarChart3, GraduationCap, Zap, Cpu, Terminal,
  Lock, Mail, ShieldCheck, AlertCircle, LogIn
} from 'lucide-react';

// Social link configuration - easy to edit later
const LINKEDIN_URL = "https://www.linkedin.com/in/rohit-b-badgujar-1510421aa";

interface WelcomeScreenProps {
  onEnter: () => void;
  onContinue: () => void;
  userProfile?: { name: string; email: string } | null;
  firebaseUser?: any;
  onLogin?: (email: string, pass: string) => Promise<any>;
  onSignUp?: (email: string, pass: string, name: string) => Promise<any>;
  onGoogleSignIn?: () => Promise<any>;
  onAdminClick?: () => void;
  isAdminMode?: boolean;
}

/**
 * Premium Constellation & Grid Canvas Background
 */
function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    
    const points: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const numPoints = Math.min(Math.floor((width * height) / 14000), 70);
    
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
      });
    }
    
    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        width = canvas.width = entry.contentRect.width;
        height = canvas.height = entry.contentRect.height;
      }
    });
    resizeObserver.observe(canvas);
    
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw grid blueprint background
      ctx.strokeStyle = 'rgba(20, 184, 166, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      
      // Update and draw points
      points.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        
        ctx.fillStyle = 'rgba(20, 184, 166, 0.25)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Connect points with thin gradient lines
      ctx.lineWidth = 0.8;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const pi = points[i];
          const pj = points[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.12;
            ctx.strokeStyle = `rgba(20, 184, 166, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.stroke();
          }
        }
        
        // Connect points to mouse cursor proximity
        if (mouse.x > 0) {
          const pi = points[i];
          const dx = pi.x - mouse.x;
          const dy = pi.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.3;
            ctx.strokeStyle = `rgba(20, 184, 166, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
    };
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto z-0 opacity-80" />;
}

/**
 * Animated Stat Counter Component
 */
function StatCounter({ value, label, prefix = '', suffix = '' }: { value: number; label: string; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);
  
  useEffect(() => {
    if (!hasAnimated) return;
    
    let start = 0;
    const end = value;
    const duration = 2000; 
    const stepTime = 16;
    const totalSteps = duration / stepTime;
    const increment = end / totalSteps;
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [value, hasAnimated]);
  
  return (
    <div ref={elementRef} className="flex flex-col items-center p-8 bg-bg-card/40 backdrop-blur-md border border-border-subtle rounded-2xl shadow-lg hover:shadow-2xl hover:border-accent/40 transition-all duration-300 group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <span className="text-4xl md:text-5xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent via-teal-400 to-emerald-400 mb-2 group-hover:scale-105 transition-transform duration-300 relative z-10">
        {prefix}{count.toLocaleString()}{suffix}
      </span>
      <span className="text-xs font-mono font-medium text-text-muted text-center tracking-widest uppercase relative z-10">
        {label}
      </span>
    </div>
  );
}

/**
 * Interactive Futuristic Digital Archive / Vault Containing Failure Insights
 */
function VaultArchiveVisual() {
  return (
    <div className="relative w-full h-[400px] md:h-[450px] flex items-center justify-center select-none overflow-hidden group">
      {/* Background radial soft neon glow */}
      <div className="absolute w-72 h-72 bg-accent/10 rounded-full blur-[100px] group-hover:bg-accent/20 transition-all duration-700" />
      
      {/* Network background grid or scanning lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-60" />

      {/* SVG Canvas for network diagrams & connections */}
      <svg viewBox="0 0 400 400" className="w-full h-full max-w-[380px] absolute z-10 filter drop-shadow-[0_0_20px_rgba(20,184,166,0.1)]">
        {/* Connection tracks */}
        <g opacity="0.2">
          <circle cx="200" cy="200" r="140" fill="none" stroke="#14b8a6" strokeWidth="1" strokeDasharray="3 6" />
          <circle cx="200" cy="200" r="90" fill="none" stroke="#14b8a6" strokeWidth="1" />
          <line x1="60" y1="200" x2="340" y2="200" stroke="#14b8a6" strokeWidth="0.8" />
          <line x1="200" y1="60" x2="200" y2="340" stroke="#14b8a6" strokeWidth="0.8" />
        </g>

        {/* Central Glowing Vault Core / AI Intelligence Unit */}
        <g className="origin-center">
          {/* Outer rotating ring */}
          <motion.circle
            cx="200"
            cy="200"
            r="38"
            fill="none"
            stroke="#14b8a6"
            strokeWidth="1.5"
            strokeDasharray="15 8 5 8"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          {/* Inner glowing core */}
          <motion.circle
            cx="200"
            cy="200"
            r="24"
            fill="url(#coreGradient)"
            stroke="#14b8a6"
            strokeWidth="1"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Core Symbol (AI/Database Node) */}
          <path
            d="M 194 196 C 194 191, 206 191, 206 196 C 206 199, 200 201, 200 204 L 200 205"
            fill="none"
            stroke="#0f172a"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="200" cy="208" r="1" fill="#0f172a" />
        </g>

        {/* Neural connection dots (animating along lines) */}
        <g>
          <motion.circle
            cx="200"
            cy="200"
            r="4"
            fill="#14b8a6"
            animate={{
              cx: [200, 290, 200],
              cy: [200, 200, 200],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="200"
            cy="200"
            r="4"
            fill="#2dd4bf"
            animate={{
              cx: [200, 136, 200],
              cy: [200, 136, 200],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </g>

        <defs>
          <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="70%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#0d9488" />
          </radialGradient>
        </defs>
      </svg>

      {/* Floating Glassmorphism Data Cards & Overlays */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-20">
        
        {/* Card 1: Juicero Report (Top Left) */}
        <motion.div
          initial={{ opacity: 0, x: -40, y: -60 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-8 left-4 md:left-8 bg-bg-card/75 backdrop-blur-md border border-rose-500/30 rounded-xl p-3.5 shadow-xl w-[170px] pointer-events-auto hover:-translate-y-1 transition-transform duration-300 group/widget"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-mono font-bold text-rose-400 tracking-wider">JUICERO INC.</span>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          </div>
          <div className="space-y-1 font-mono text-[9px]">
            <p className="text-text-secondary"><span className="text-text-muted">Burn Rate:</span> $12M/mo</p>
            <p className="text-text-secondary"><span className="text-text-muted">Core Error:</span> Over-engineered</p>
            <div className="w-full bg-white/5 h-1 rounded overflow-hidden mt-1">
              <div className="bg-rose-500 h-full w-[88%]" />
            </div>
            <p className="text-right text-[8px] text-rose-400/80 font-bold mt-1">REVIVAL SCORE: 12%</p>
          </div>
        </motion.div>

        {/* Card 2: Pebble Technology (Bottom Right) */}
        <motion.div
          initial={{ opacity: 0, x: 40, y: 60 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute bottom-8 right-4 md:right-8 bg-bg-card/75 backdrop-blur-md border border-accent/30 rounded-xl p-3.5 shadow-xl w-[180px] pointer-events-auto hover:-translate-y-1 transition-transform duration-300 group/widget"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-mono font-bold text-accent tracking-wider">PEBBLE SMARTWATCH</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          </div>
          <div className="space-y-1 font-mono text-[9px]">
            <p className="text-text-secondary"><span className="text-text-muted">Exit Value:</span> $23M</p>
            <p className="text-text-secondary"><span className="text-text-muted">Core Error:</span> Premature Scale</p>
            <div className="w-full bg-white/5 h-1 rounded overflow-hidden mt-1">
              <div className="bg-accent h-full w-[45%]" />
            </div>
            <p className="text-right text-[8px] text-accent/80 font-bold mt-1">REVIVAL SCORE: 45%</p>
          </div>
        </motion.div>

        {/* Card 3: AI Diagnostics Metrics Panel (Top Right) */}
        <motion.div
          initial={{ opacity: 0, x: 40, y: -40 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute top-12 right-2 md:right-10 bg-bg-card/75 backdrop-blur-md border border-teal-500/30 rounded-xl p-3 shadow-xl w-[160px] pointer-events-auto hover:-translate-y-1 transition-transform duration-300"
        >
          <div className="flex items-center gap-1.5 mb-1 text-teal-400">
            <Brain className="w-3.5 h-3.5 animate-pulse" />
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest">AI Diagnostics</span>
          </div>
          <div className="space-y-1 font-mono text-[8px] text-text-muted">
            <div className="flex justify-between">
              <span>Risk vectors:</span>
              <span className="text-text-primary font-bold">18 Detected</span>
            </div>
            <div className="flex justify-between">
              <span>Macro factors:</span>
              <span className="text-text-primary font-bold">92.4% Match</span>
            </div>
            <div className="flex justify-between text-teal-400">
              <span>Accuracy level:</span>
              <span className="font-bold">99.8%</span>
            </div>
          </div>
        </motion.div>

        {/* Floating Decrypting Console String (Bottom Left) */}
        <motion.div
          initial={{ opacity: 0, x: -30, y: 30 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-12 left-6 bg-slate-950/90 border border-border-subtle rounded-lg px-2.5 py-1.5 shadow-2xl pointer-events-auto hover:border-accent/40 transition-colors"
        >
          <div className="flex items-center gap-2 font-mono text-[8px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-emerald-400 font-bold">[DB_VAULT_DECRYPTED]</span>
            <span className="text-text-muted">v4.2-SECURE</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

/**
 * Beautiful Section Dividers
 */
function WaveDividerTop() {
  return (
    <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none translate-y-[-99%]">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[50px] md:h-[80px] fill-bg-primary">
        <path d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z" />
      </svg>
    </div>
  );
}

function WaveDividerBottom() {
  return (
    <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none translate-y-[99%]">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[50px] md:h-[80px] fill-bg-primary rotate-180">
        <path d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z" />
      </svg>
    </div>
  );
}

export default function WelcomeScreen({ 
  onEnter, 
  onContinue, 
  userProfile, 
  firebaseUser,
  onLogin,
  onSignUp,
  onGoogleSignIn,
  onAdminClick,
  isAdminMode
}: WelcomeScreenProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      setAuthError("Email and Password are required");
      return;
    }
    setAuthError('');
    setIsSubmitting(true);
    try {
      if (authTab === 'signin') {
        if (onLogin) {
          await onLogin(authEmail, authPassword);
          setIsAuthModalOpen(false);
          onContinue();
        }
      } else {
        if (!authName) {
          setAuthError("Name is required for registration");
          setIsSubmitting(false);
          return;
        }
        if (onSignUp) {
          await onSignUp(authEmail, authPassword, authName);
          setIsAuthModalOpen(false);
          onContinue();
        }
      }
    } catch (err: any) {
      setAuthError(err.message || "Authentication failed. Please verify credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = async () => {
    setAuthError('');
    setIsSubmitting(true);
    try {
      if (onGoogleSignIn) {
        await onGoogleSignIn();
        setIsAuthModalOpen(false);
        onContinue();
      }
    } catch (err: any) {
      setAuthError(err.message || "Google Sign-In failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  const [isAutoRedirecting, setIsAutoRedirecting] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setIsAutoRedirecting(true);
      const timer = setTimeout(() => {
        onContinue();
      }, 2300);
      return () => clearTimeout(timer);
    }
  }, [userProfile, onContinue]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } }
  };

  if (isAutoRedirecting && userProfile) {
    return (
      <div className="min-h-screen bg-bg-primary text-text-primary flex items-center justify-center font-sans relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.06)_0%,transparent_70%)] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center relative z-10"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-bg-card border border-border-subtle shadow-2xl mb-6 overflow-hidden">
              <span className="text-5xl animate-bounce">👋</span>
            </div>
            <h1 className="text-4xl font-display font-bold tracking-tight mb-2">Welcome back, {userProfile.name}</h1>
            <p className="text-text-secondary text-lg mb-8">Restoring FailureVault Secure Session...</p>
            
            <div className="w-56 h-1 bg-bg-card rounded-full mx-auto overflow-hidden border border-border-subtle">
              <motion.div 
                className="h-full bg-gradient-to-r from-accent to-teal-400"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-bg-primary text-text-primary min-h-screen font-sans overflow-x-hidden selection:bg-accent/30 selection:text-accent relative">
      
      {/* Interactive Neural Grid Background Canvas */}
      <div className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none z-0">
        <ConstellationCanvas />
      </div>

      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[60%] right-1/4 w-[500px] h-[500px] rounded-full bg-teal-500/5 blur-[150px] pointer-events-none" />

      {/* Top Header Navigation */}
      <nav className="fixed top-0 left-0 right-0 p-5 flex justify-between items-center z-50 backdrop-blur-lg bg-bg-primary/75 border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/10 border border-accent/20 rounded-xl">
            <Archive className="w-6 h-6 text-accent" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-text-primary to-text-muted">FailureVault</span>
        </div>
        <div>
          <button 
            onClick={onEnter}
            className="px-6 py-2.5 text-sm font-semibold rounded-full bg-accent text-white hover:bg-accent-hover active:scale-95 transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] cursor-pointer"
          >
            Access Vault
          </button>
        </div>
      </nav>

      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-12 overflow-hidden px-6">
        <motion.div style={{ y: yHero, opacity: opacityHero }} className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, ease: "easeOut" }} className="flex flex-col items-center">
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-mono uppercase tracking-widest mb-8"
            >
              <Cpu className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
              <span>AI-Powered Startup Blueprint Diagnostics</span>
            </motion.div>
            
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-text-primary mb-6 leading-none">
              Learn From Failed Startups.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-teal-400 to-emerald-400 italic">Build Smarter.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-text-secondary font-medium max-w-3xl leading-relaxed mb-12">
              Instead of chasing over-hyped unicorn stories, learn from why thousands of ambitious ideas failed. FailureVault dissects historical mistakes, giving you the ultimate blueprint of what not to build.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <motion.button
                onClick={onEnter}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="group px-8 py-4 rounded-full bg-accent text-white font-sans font-bold text-lg transition-all shadow-[0_0_30px_rgba(20,184,166,0.3)] hover:shadow-[0_0_50px_rgba(20,184,166,0.5)] cursor-pointer flex items-center gap-3 border border-accent/20"
              >
                Enter the Vault
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </motion.button>
              
              <a
                href="#story"
                className="px-8 py-4 rounded-full bg-bg-card/40 backdrop-blur-md border border-border-subtle hover:bg-bg-card text-text-primary font-bold text-lg hover:border-text-primary transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </motion.div>
        
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest font-mono text-text-muted mb-2">Scroll To Explore</span>
          <ChevronDown className="w-4 h-4 text-accent" />
        </div>
      </section>

      {/* SECTION 2: What is FailureVault & Storytelling */}
      <section id="story" className="py-32 px-6 relative z-10 bg-bg-primary border-t border-border-subtle">
        <WaveDividerTop />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
          >
            <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Story of FailureVault</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight">
                Intelligent Failure Diagnostics
              </h2>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
                FailureVault is a secure intelligence platform built to collect, structure, and visualize historically defunct tech startups. We study failure so that future builders can bypass predictable design, capital, and product-market mistakes.
              </p>
              <p className="text-base text-text-muted leading-relaxed">
                We aggregate exhaustive post-mortems, historical financials, and engineering decisions of startups like Juicero, Theranos, Pebble, and Segway. Our platform uses advanced algorithmic diagnostics to evaluate their structural errors, providing you with interactive simulations, risk journey maps, and Revival Score frameworks.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="lg:col-span-5 relative">
              <VaultArchiveVisual />
            </motion.div>
          </motion.div>
        </div>
        <WaveDividerBottom />
      </section>

      {/* SECTION 4: Why Most Startups Fail */}
      <section className="py-32 px-6 relative z-10 bg-bg-primary">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants} className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight mb-4">Why Most Startups Fail</h2>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">The precise structural traps that drain capital and talent.</p>
          </motion.div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { icon: '📉', title: "No Market Need", desc: "Developing a solution for a non-existent consumer problem.", color: "from-rose-500/10 to-transparent", border: "hover:border-rose-500/30" },
              { icon: '💸', title: "Poor Unit Economics", desc: "Running out of capital due to high burn rates and negative margins.", color: "from-amber-500/10 to-transparent", border: "hover:border-amber-500/30" },
              { icon: '⏱️', title: "Premature Timing", desc: "Launching before technical ecosystem readiness or user adaptation.", color: "from-teal-500/10 to-transparent", border: "hover:border-teal-500/30" },
              { icon: '🧩', title: "Flawed Business Model", desc: "Failing to build a repeatable, scalable monetization path.", color: "from-blue-500/10 to-transparent", border: "hover:border-blue-500/30" },
              { icon: '⚔️', title: "Severe Competition", desc: "Being out-marketed, out-priced, or out-engineered by agile competitors.", color: "from-purple-500/10 to-transparent", border: "hover:border-purple-500/30" },
              { icon: '🚀', title: "Scaling Too Early", desc: "Aggressively spending on sales & marketing before reaching product-market fit.", color: "from-emerald-500/10 to-transparent", border: "hover:border-emerald-500/30" }
            ].map((card, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants} 
                className={`bg-bg-card border border-border-subtle rounded-2xl p-8 hover:bg-bg-elevated transition-all duration-300 group hover:-translate-y-2 shadow-lg relative overflow-hidden ${card.border}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 origin-left">{card.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-text-primary">
                    {card.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed text-sm md:text-base">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: Platform Intelligence Grid */}
      <section className="py-32 px-6 relative z-10 bg-bg-secondary/40 border-t border-border-subtle">
        <WaveDividerTop />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants} className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono uppercase tracking-widest mb-4">
                <Terminal className="w-3.5 h-3.5" />
                <span>Feature Engine Specs</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight">Platform Intelligence</h2>
              <p className="text-lg md:text-xl text-text-secondary max-w-2xl mt-3">Algorithmic instruments explicitly designed to dissect, simulate, and upgrade failed plans.</p>
            </div>
            <motion.div variants={itemVariants}>
              <button onClick={onEnter} className="px-6 py-3 rounded-full bg-accent text-white font-semibold text-sm hover:bg-accent-hover transition-all duration-300 shadow-md">Open Client Workspace</button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { 
                icon: Brain, 
                title: "AI Startup Analysis", 
                desc: "Run contextual machine learning scans to trace why specific operations broke, and simulate correction blueprints.", 
                color: "text-purple-400", 
                bg: "bg-purple-400/10",
                svg: (
                  <svg className="w-full h-16 mt-4 text-purple-400/20" viewBox="0 0 100 40">
                    <circle cx="20" cy="20" r="4" fill="currentColor" />
                    <circle cx="50" cy="10" r="4" fill="currentColor" />
                    <circle cx="50" cy="30" r="4" fill="currentColor" />
                    <circle cx="80" cy="20" r="4" fill="currentColor" />
                    <line x1="24" y1="20" x2="46" y2="12" stroke="currentColor" strokeWidth="1" />
                    <line x1="24" y1="20" x2="46" y2="28" stroke="currentColor" strokeWidth="1" />
                    <line x1="54" y1="12" x2="76" y2="18" stroke="currentColor" strokeWidth="1" />
                    <line x1="54" y1="28" x2="76" y2="22" stroke="currentColor" strokeWidth="1" />
                  </svg>
                )
              },
              { 
                icon: BarChart3, 
                title: "Revival Score System", 
                desc: "Check real-time scoring metrics measuring viability under current macroeconomic, technological, and funding states.", 
                color: "text-accent", 
                bg: "bg-accent/10",
                svg: (
                  <svg className="w-full h-16 mt-4 text-accent/20" viewBox="0 0 100 40">
                    <path d="M 10 35 L 30 20 L 50 28 L 70 12 L 90 5" fill="none" stroke="currentColor" strokeWidth="2" />
                    <circle cx="90" cy="5" r="3" fill="#14b8a6" />
                  </svg>
                )
              },
              { 
                icon: Map, 
                title: "Chronological Risk Journeys", 
                desc: "Trace chronological events detailing execution steps, cash burn curves, pivot deviations, and final terminal events.", 
                color: "text-sky-400", 
                bg: "bg-sky-400/10",
                svg: (
                  <svg className="w-full h-16 mt-4 text-sky-400/20" viewBox="0 0 100 40" strokeDasharray="3 3">
                    <path d="M 10 20 C 30 5, 50 35, 90 20" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="10" cy="20" r="3" fill="currentColor" />
                    <circle cx="48" cy="20" r="3" fill="currentColor" />
                    <circle cx="90" cy="20" r="3" fill="currentColor" />
                  </svg>
                )
              },
              { 
                icon: Lightbulb, 
                title: "Modular Reconstruction Guide", 
                desc: "Synthesize clear, technical advice regarding codebases, pricing models, marketing, and pivot strategy corrections.", 
                color: "text-amber-400", 
                bg: "bg-amber-400/10",
                svg: (
                  <svg className="w-full h-16 mt-4 text-amber-400/20" viewBox="0 0 100 40">
                    <circle cx="50" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="50" y1="5" x2="50" y2="10" stroke="currentColor" strokeWidth="1" />
                    <line x1="50" y1="30" x2="50" y2="35" stroke="currentColor" strokeWidth="1" />
                    <line x1="35" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="1" />
                    <line x1="60" y1="20" x2="65" y2="20" stroke="currentColor" strokeWidth="1" />
                  </svg>
                )
              },
              { 
                icon: FileText, 
                title: "Sleek Executive PDF Reports", 
                desc: "Export modular, data-dense startup diagnostics directly to client PDF folders to share with research groups or venture firms.", 
                color: "text-emerald-400", 
                bg: "bg-emerald-400/10",
                svg: (
                  <svg className="w-full h-16 mt-4 text-emerald-400/20" viewBox="0 0 100 40">
                    <rect x="35" y="5" width="30" height="30" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="40" y1="12" x2="60" y2="12" stroke="currentColor" strokeWidth="1" />
                    <line x1="40" y1="18" x2="60" y2="18" stroke="currentColor" strokeWidth="1" />
                    <line x1="40" y1="24" x2="50" y2="24" stroke="currentColor" strokeWidth="1" />
                  </svg>
                )
              },
              { 
                icon: Activity, 
                title: "Live Interactive Sandbox", 
                desc: "Test what-if pivots directly in your web app by adjusting capital, engineering team size, pricing model, and target audience.", 
                color: "text-rose-400", 
                bg: "bg-rose-400/10",
                svg: (
                  <svg className="w-full h-16 mt-4 text-rose-400/20" viewBox="0 0 100 40">
                    <path d="M 5 20 L 25 20 L 35 5 L 45 35 L 55 15 L 65 25 L 75 20 L 95 20" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                )
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants} 
                className="bg-bg-card/60 backdrop-blur-md border border-border-subtle rounded-2xl p-8 hover:bg-bg-elevated transition-all duration-300 group hover:border-accent/40 shadow-sm hover:shadow-2xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-accent transition-colors duration-300">{feature.title}</h3>
                  <p className="text-text-secondary leading-relaxed text-sm mb-4">{feature.desc}</p>
                  {feature.svg}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <WaveDividerBottom />
      </section>

      {/* SECTION 6: About the Creator - Redesigned Premium Profile */}
      <section className="py-36 px-6 relative bg-bg-primary overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-4 h-4 animate-pulse" /> 
              <span>About the Creator</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight text-text-primary">
              The Vision Behind FailureVault
            </h2>
          </div>

          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }} 
            variants={containerVariants} 
            className="p-8 md:p-12 glass-panel bg-bg-card/40 backdrop-blur-xl border border-border-subtle rounded-3xl shadow-2xl relative overflow-hidden group max-w-3xl mx-auto"
          >
            {/* Ambient Background Glow in Card */}
            <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-accent/15 transition-colors duration-700" />
            <div className="absolute -left-32 -top-32 w-96 h-96 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-6">
                <div>
                  <h3 className="text-3xl md:text-4xl font-display font-black tracking-tight text-text-primary">
                    Rohit Bhushan Badgujar
                  </h3>
                  <p className="text-base font-mono font-bold text-accent tracking-wider uppercase mt-1">
                    Founder & Developer of FailureVault
                  </p>
                </div>
                
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-border-subtle text-xs font-mono text-text-secondary select-none self-start sm:self-center">
                  <Terminal className="w-3.5 h-3.5 text-accent animate-pulse" />
                  <span>AI & ML ENGINEER</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 p-4 bg-bg-elevated/40 border border-border-subtle rounded-2xl">
                <div className="flex items-start gap-3 text-sm text-text-secondary">
                  <GraduationCap className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-text-primary">Diploma in Electronics & Communication Engineering (AI & ML)</p>
                    <p className="text-xs text-text-muted mt-0.5">MIT World Peace University (MIT-WPU), Pune</p>
                  </div>
                </div>
              </div>

              <p className="text-base text-text-secondary leading-relaxed font-light">
                I am deeply passionate about Artificial Intelligence, startups, product development, and solving real-world problems through technology. FailureVault was inspired by a simple belief: <strong>every failed startup has incredibly valuable lessons to teach future innovators.</strong> My goal is to help founders, students, and researchers learn from historical friction points before repeating the same errors.
              </p>

              {/* Founder Vision Callout */}
              <div className="relative p-5 bg-accent/5 border-l-4 border-accent rounded-r-2xl">
                <span className="absolute right-4 top-2 text-7xl font-serif text-accent/10 pointer-events-none select-none">“</span>
                <p className="text-sm font-sans font-medium text-teal-300 italic relative z-10 leading-relaxed">
                  "Transform startup failures into the world's largest learning platform for future entrepreneurs."
                </p>
              </div>

              {/* Social Button (LinkedIn ONLY) */}
              <div className="pt-2 flex items-center justify-start">
                <a 
                  href={LINKEDIN_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-3 px-6 py-3.5 bg-bg-elevated hover:bg-[#0A66C2] text-text-primary hover:text-white border border-border-subtle hover:border-transparent rounded-full shadow-lg hover:shadow-[#0A66C2]/30 transition-all duration-300 hover:scale-105 group font-sans font-semibold text-sm cursor-pointer"
                >
                  <Linkedin className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: Footer CTA */}
      <section className="py-32 px-6 relative bg-bg-secondary/20 text-center border-t border-border-subtle">
        <WaveDividerTop />
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-display font-extrabold tracking-tight mb-4">
              Ready to learn from the past?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-text-secondary leading-relaxed mb-10 max-w-xl mx-auto">
              Start diagnosing startup blueprints with AI precision today. Turn other founders' mistakes into your structural moat.
            </motion.p>
            <motion.button
              onClick={onEnter}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 rounded-full bg-accent text-white font-bold text-lg shadow-[0_0_30px_rgba(20,184,166,0.3)] transition-all hover:shadow-[0_0_50px_rgba(20,184,166,0.5)] cursor-pointer"
            >
              Start Exploring Today
            </motion.button>
          </motion.div>
        </div>
      </section>



      {/* Global Footer */}
      <footer className="py-10 text-center border-t border-border-subtle bg-bg-primary relative z-10 flex flex-col items-center justify-center gap-4">
         <p className="text-text-muted font-sans text-sm font-medium">© {new Date().getFullYear()} FailureVault. All rights reserved.</p>
         {onAdminClick && (
           <button
             type="button"
             onClick={onAdminClick}
             className="text-text-muted hover:text-accent font-mono text-xs cursor-pointer transition-colors flex items-center gap-1.5 bg-transparent border-none outline-none"
           >
             <ShieldCheck className="w-4 h-4" />
             <span>{isAdminMode ? "Admin Console (Active)" : "Admin Portal"}</span>
           </button>
         )}
      </footer>

    </div>
  );
}
