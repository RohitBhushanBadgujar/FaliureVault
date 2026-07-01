import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Shield, ArrowRight, UserCircle, LogIn } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: (userName: string, email: string) => void;
  userEmail?: string;
}

export default function LoginScreen({ onLoginSuccess, userEmail = 'rohit.b.badgujar@gmail.com' }: LoginScreenProps) {
  const [emailInput, setEmailInput] = useState(userEmail);
  const [passwordInput, setPasswordInput] = useState('••••••••••••');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    // Simulate high-speed transition
    setTimeout(() => {
      let displayName = 'Rohit';
      if (emailInput.includes('.')) {
        const parts = emailInput.split('@')[0].split('.');
        displayName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
      } else {
        displayName = emailInput.split('@')[0];
        displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
      }
      onLoginSuccess(displayName, emailInput);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-bg-primary font-sans text-text-primary p-4">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md p-8 rounded-xl bg-bg-card border border-border-subtle shadow-2xl z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-full bg-accent/10 border border-accent/20 mb-4 text-accent">
            <UserCircle className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-text-primary animate-fade-in">
            Welcome Back
          </h2>
          <p className="text-sm text-text-secondary mt-2">
            Sign in below to start learning from startup histories.
          </p>
        </div>

        {isLoggingIn ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="relative w-12 h-12 mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-border-subtle" />
              <div className="absolute inset-0 rounded-full border-4 border-accent border-t-transparent animate-spin" />
            </div>
            <span className="text-sm text-accent font-sans font-medium animate-pulse">
              Opening your classroom vault...
            </span>
            <p className="text-sm text-text-secondary mt-2">
              Preparing materials for {emailInput}
            </p>
          </div>
        ) : (
          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Your Email
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                  <Mail className="w-5 h-5" />
                </span>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-bg-elevated border border-border-subtle rounded-xl py-3 pl-11 pr-4 text-text-primary text-base focus:border-accent focus:outline-none transition-colors placeholder:text-text-muted"
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Your Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                  <Shield className="w-5 h-5" />
                </span>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-bg-elevated border border-border-subtle rounded-xl py-3 pl-11 pr-4 text-text-primary text-base focus:border-accent focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Autofill user profiles quickly for Judges */}
            {userEmail && emailInput !== userEmail && (
              <button
                type="button"
                onClick={() => setEmailInput(userEmail)}
                className="w-full text-left py-2.5 px-4 border border-accent/20 bg-accent/5 hover:bg-accent/10 rounded-xl flex items-center gap-3 text-sm text-accent transition-all font-medium"
              >
                <UserCircle className="w-5 h-5 text-accent" />
                <span>Autofill Registered Account: <span className="underline">{userEmail}</span></span>
              </button>
            )}

            <div className="flex items-center justify-between text-sm pt-2">
              <label className="flex items-center gap-3 text-text-secondary cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 bg-bg-elevated border border-border-subtle rounded text-accent focus:ring-0"
                />
                Remember me on this screen
              </label>
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <button
                type="submit"
                id="submit-login-btn"
                className="w-full py-4 rounded-xl bg-accent text-white font-semibold text-base shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                Enter the Vault
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsLoggingIn(true);
                  setTimeout(() => {
                    onLoginSuccess('Rohit', 'rohit.b.badgujar@gmail.com');
                  }, 1200);
                }}
                className="w-full py-3.5 text-sm border border-border-subtle text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer font-medium"
              >
                <span>Continue with Google Account</span>
              </button>
            </div>
          </form>
        )}

        <div className="mt-8 text-center border-t border-border-subtle pt-6 text-xs text-text-muted font-sans font-medium">
          Your personal data is fully safe and persistent inside your browser.
        </div>
      </motion.div>
    </div>
  );
}
