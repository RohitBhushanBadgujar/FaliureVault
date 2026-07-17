import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldAlert, Trash2, Lock, Unlock, Search, Key, CheckCircle, Skull } from 'lucide-react';
import { Project } from '../types';

interface AdminAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdminMode: boolean;
  setIsAdminMode: (active: boolean) => void;
  projects: Project[];
  onDeleteProject: (projectId: string) => void;
}

export default function AdminAccessModal({
  isOpen,
  onClose,
  isAdminMode,
  setIsAdminMode,
  projects,
  onDeleteProject
}: AdminAccessModalProps) {
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin123' || passwordInput === 'failurevaultadmin') {
      setIsAdminMode(true);
      localStorage.setItem('failurevault_admin_mode', 'true');
      setPasswordInput('');
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid admin credential. Hint: Try using "admin123"');
    }
  };

  const handleLogout = () => {
    setIsAdminMode(false);
    localStorage.setItem('failurevault_admin_mode', 'false');
    setConfirmDeleteId(null);
  };

  const filteredProjects = projects.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="bg-[#0b0c0e] border border-border-subtle rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-[0_0_50px_rgba(20,184,166,0.1)] text-left"
        >
          {/* Header */}
          <div className="p-6 border-b border-border-subtle flex items-center justify-between shrink-0 bg-bg-card">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-accent/10 border border-accent/20 rounded-lg">
                <ShieldAlert className="w-5 h-5 text-accent animate-pulse" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-text-primary text-lg leading-tight">Admin Security Console</h3>
                <p className="text-xs text-text-muted font-sans mt-0.5">Manage and prune case studies in the global repository.</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body Scroll Container */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 scrollbar-thin">
            {!isAdminMode ? (
              /* Authentication Form */
              <div className="max-w-md mx-auto py-8 space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-border-subtle/40 border border-border-subtle flex items-center justify-center mx-auto mb-3">
                    <Lock className="w-5 h-5 text-text-secondary" />
                  </div>
                  <h4 className="font-display font-medium text-text-primary">Unlock Administrator Privileges</h4>
                  <p className="text-sm text-text-muted">Enter the master security credential to proceed with moderation tasks.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold uppercase text-text-secondary tracking-wider block">Admin Key / Passphrase</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                        <Key className="w-4 h-4" />
                      </span>
                      <input
                        type="password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-bg-card border border-border-subtle rounded-lg py-2.5 pl-9 pr-4 text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
                        autoFocus
                      />
                    </div>
                    <div className="p-2.5 bg-accent/5 border border-accent/10 rounded-lg text-xs text-accent font-sans mt-2">
                      <span className="font-semibold uppercase tracking-wider block mb-0.5 text-[9px]">Demo Authorization:</span>
                      To authorize administrative control, input the master passphrase <strong className="underline">admin123</strong>.
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-lg flex items-center gap-2">
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <Unlock className="w-4 h-4" />
                    Authorize Session
                  </button>
                </form>
              </div>
            ) : (
              /* Authorized Admin Management Console */
              <div className="space-y-6">
                {/* Active Info Banner */}
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-semibold text-emerald-400 block">Session Authenticated Successfully</span>
                      <span className="text-xs text-text-secondary mt-1 block">You currently have full read/write privileges. Hover over cards in the main Vault to delete them directly, or moderate them via the directory list below.</span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Deauthorize
                  </button>
                </div>

                {/* Database Search & List */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="font-display font-medium text-text-primary text-sm uppercase tracking-wider">Venture Case Studies Directory</h4>
                    <span className="text-xs font-mono text-text-muted">{projects.length} Total records</span>
                  </div>

                  {/* Search and Filters */}
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                      <Search className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search directory records..."
                      className="w-full bg-bg-card border border-border-subtle rounded-lg py-2 pl-9 pr-4 text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors text-sm"
                    />
                  </div>

                  {/* Records Table/List */}
                  <div className="border border-border-subtle rounded-xl overflow-hidden bg-bg-card max-h-[300px] overflow-y-auto scrollbar-thin">
                    {filteredProjects.length === 0 ? (
                      <p className="text-sm text-text-muted text-center py-10 font-sans">No matching records found.</p>
                    ) : (
                      <div className="divide-y divide-border-subtle">
                        {filteredProjects.map((p) => (
                          <div key={p.id} className="p-3.5 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                            <div className="flex items-center gap-3 truncate">
                              <span className="text-xl p-1.5 bg-bg-elevated border border-border-subtle rounded-lg leading-none shrink-0">{p.avatarEmoji}</span>
                              <div className="truncate">
                                <span className="text-sm font-medium text-text-primary block truncate">{p.name}</span>
                                <span className="text-xs text-text-muted block truncate mt-0.5">{p.industry} • Failed {p.failedYear}</span>
                              </div>
                            </div>

                            {/* Deletion confirmation states */}
                            <div className="shrink-0">
                              {confirmDeleteId !== p.id ? (
                                <button
                                  onClick={() => setConfirmDeleteId(p.id)}
                                  className="p-2 rounded-lg text-text-muted hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                                  title="Delete Project Study"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              ) : (
                                <div className="flex items-center gap-1.5 bg-rose-500/15 border border-rose-500/30 p-1 rounded-md animate-pulse">
                                  <span className="text-[10px] text-rose-300 font-semibold px-1.5">Confirm?</span>
                                  <button
                                    onClick={() => {
                                      onDeleteProject(p.id);
                                      setConfirmDeleteId(null);
                                    }}
                                    className="px-2 py-0.5 bg-rose-600 hover:bg-rose-700 text-white rounded text-[10px] font-bold cursor-pointer transition-colors"
                                  >
                                    Yes
                                  </button>
                                  <button
                                    onClick={() => setConfirmDeleteId(null)}
                                    className="px-2 py-0.5 bg-white/10 hover:bg-white/10 text-slate-300 rounded text-[10px] cursor-pointer transition-colors"
                                  >
                                    No
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
