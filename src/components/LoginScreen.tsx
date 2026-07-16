import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Shield, ArrowRight, UserCircle, AlertCircle, User as UserIcon } from 'lucide-react';
import { loginUser, signUpUser, signInWithGoogle } from '../lib/firebaseService';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  userEmail?: string;
}

export default function LoginScreen({ onLoginSuccess, userEmail = '' }: LoginScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState(userEmail);
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const validateSignUp = () => {
    if (!nameInput.trim()) return 'Full Name is required.';
    if (passwordInput.length < 6) return 'Password must be at least 6 characters.';
    if (passwordInput !== confirmPasswordInput) return 'Passwords do not match.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (isSignUp) {
      const validationError = validateSignUp();
      if (validationError) {
        setErrorMsg(validationError);
        return;
      }
    }

    setIsLoggingIn(true);
    
    try {
      if (isSignUp) {
        await signUpUser(emailInput, passwordInput, nameInput);
      } else {
        await loginUser(emailInput, passwordInput);
      }
      onLoginSuccess();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Authentication failed. Please check your details.');
      setIsLoggingIn(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoggingIn(true);
    setErrorMsg('');
    try {
      await signInWithGoogle();
      onLoginSuccess();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to authenticate with Google.');
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-bg-primary font-sans text-text-primary p-4 overflow-y-auto">
      {/* Glow Effects */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
      
      {/* Grid Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md p-8 rounded-xl bg-bg-card border border-border-subtle shadow-2xl z-10 my-8"
      >
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-full bg-accent/10 border border-accent/20 mb-4 text-accent">
            <UserCircle className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-text-primary">
            {isSignUp ? 'Create an Account' : 'Welcome Back'}
          </h2>
          <p className="text-sm text-text-secondary mt-2">
            {isSignUp ? 'Sign up to build your secure profile.' : 'Sign in below to continue to your dashboard.'}
          </p>
        </div>

        {isLoggingIn ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="relative w-12 h-12 mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-border-subtle" />
              <div className="absolute inset-0 rounded-full border-4 border-accent border-t-transparent animate-spin" />
            </div>
            <span className="text-sm text-accent font-sans font-medium animate-pulse">
              Authenticating session...
            </span>
            <p className="text-sm text-text-secondary mt-2">
              Preparing your workspace...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-error/10 border border-error/20 rounded-lg flex items-center gap-2 text-error text-sm font-medium">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{errorMsg}</p>
              </motion.div>
            )}

            <AnimatePresence mode="popLayout">
              {isSignUp && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                      <UserIcon className="w-5 h-5" />
                    </span>
                    <input
                      type="text"
                      required={isSignUp}
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="w-full bg-bg-elevated border border-border-subtle rounded-xl py-3 pl-11 pr-4 text-text-primary text-base focus:border-accent focus:outline-none transition-colors placeholder:text-text-muted"
                      placeholder="Jane Doe"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Email Address
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
                Password
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
                  className="w-full bg-bg-elevated border border-border-subtle rounded-xl py-3 pl-11 pr-4 text-text-primary text-base focus:border-accent focus:outline-none transition-colors placeholder:text-text-muted"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              {isSignUp && (
                <motion.div
                  key="confirm-password-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <label className="block text-sm font-medium text-text-secondary mb-2 mt-4">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                      <Shield className="w-5 h-5" />
                    </span>
                    <input
                      type="password"
                      required={isSignUp}
                      value={confirmPasswordInput}
                      onChange={(e) => setConfirmPasswordInput(e.target.value)}
                      className="w-full bg-bg-elevated border border-border-subtle rounded-xl py-3 pl-11 pr-4 text-text-primary text-base focus:border-accent focus:outline-none transition-colors placeholder:text-text-muted"
                      placeholder="Confirm password"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!isSignUp && (
              <div className="flex items-center justify-between text-sm pt-2">
                <label className="flex items-center gap-3 text-text-secondary cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 bg-bg-elevated border border-border-subtle rounded text-accent focus:ring-0"
                  />
                  Remember me
                </label>
              </div>
            )}

            <div className="flex flex-col gap-4 pt-4">
              <button
                type="submit"
                id="submit-login-btn"
                className="w-full py-4 rounded-xl bg-accent text-white font-semibold text-base shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSignUp ? 'Create Account' : 'Enter the Vault'}
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full py-3.5 text-sm border border-border-subtle text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer font-medium"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
            
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setErrorMsg('');
                }}
                className="text-sm text-accent hover:text-accent-hover font-medium transition-colors cursor-pointer"
              >
                {isSignUp ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
              </button>
            </div>
          </form>
        )}

        <div className="mt-8 text-center border-t border-border-subtle pt-6 text-xs text-text-muted font-sans font-medium">
          Your personal data is fully safe and persistent in the cloud.
        </div>
      </motion.div>
    </div>
  );
}
