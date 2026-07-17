import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ShieldAlert, Trash2, Lock, Unlock, Search, Key, 
  CheckCircle, Skull, Edit2, Save, HelpCircle, Check, AlertTriangle, ListFilter
} from 'lucide-react';
import { Project } from '../types';

interface AdminAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdminMode: boolean;
  setIsAdminMode: (active: boolean) => void;
  projects: Project[];
  onDeleteProject: (projectId: string) => void;
  onUpdateProject?: (project: Project) => void;
}

export default function AdminAccessModal({
  isOpen,
  onClose,
  isAdminMode,
  setIsAdminMode,
  projects,
  onDeleteProject,
  onUpdateProject
}: AdminAccessModalProps) {
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Sub-tabs in Authorized mode: 'pending' | 'directory'
  const [activeSubTab, setActiveSubTab] = useState<'pending' | 'directory'>('pending');

  // Inline Editing States for specific projects
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editFounders, setEditFounders] = useState('');
  const [editCountry, setEditCountry] = useState('');
  const [editIndustry, setEditIndustry] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editWhyFailed, setEditWhyFailed] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === '1234567891011') {
      setIsAdminMode(true);
      localStorage.setItem('failurevault_admin_mode', 'true');
      setPasswordInput('');
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid admin credential. Hint: Try using "1234567891011"');
    }
  };

  const handleLogout = () => {
    setIsAdminMode(false);
    localStorage.setItem('failurevault_admin_mode', 'false');
    setConfirmDeleteId(null);
    setEditingProjectId(null);
  };

  // Filter projects by sub-tab & search
  const pendingProjects = projects.filter(p => 
    p.approvalStatus && p.approvalStatus !== 'Approved'
  );

  const approvedProjects = projects.filter(p => 
    !p.approvalStatus || p.approvalStatus === 'Approved'
  );

  const displayProjects = activeSubTab === 'pending' ? pendingProjects : approvedProjects;

  const filteredProjects = displayProjects.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.founders && p.founders.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Status handlers
  const handleSetStatus = (project: Project, newStatus: 'Approved' | 'Rejected' | 'Needs Info') => {
    if (onUpdateProject) {
      const updated = { ...project, approvalStatus: newStatus };
      onUpdateProject(updated);
    }
  };

  // Editing actions
  const startEditing = (p: Project) => {
    setEditingProjectId(p.id);
    setEditName(p.name);
    setEditFounders(p.founders || p.founder || '');
    setEditCountry(p.country || '');
    setEditIndustry(p.industry);
    setEditDescription(p.description);
    setEditWhyFailed(p.primaryFailureReason || '');
  };

  const cancelEditing = () => {
    setEditingProjectId(null);
  };

  const saveEditedProject = (project: Project) => {
    if (onUpdateProject) {
      const updated: Project = {
        ...project,
        name: editName.trim(),
        founders: editFounders.trim(),
        country: editCountry.trim(),
        industry: editIndustry.trim(),
        description: editDescription.trim(),
        primaryFailureReason: editWhyFailed.trim()
      };
      onUpdateProject(updated);
      setEditingProjectId(null);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="bg-[#0b0c0e] border border-border-subtle rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-[0_0_50px_rgba(20,184,166,0.15)] text-left"
        >
          {/* Header */}
          <div className="p-6 border-b border-border-subtle flex items-center justify-between shrink-0 bg-bg-card">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-accent/10 border border-accent/20 rounded-lg">
                <ShieldAlert className="w-5 h-5 text-accent animate-pulse" />
              </div>
              <div>
                <h3 className="font-display font-bold text-text-primary text-lg leading-tight">Admin Moderation Console</h3>
                <p className="text-xs text-text-muted font-mono mt-0.5">MANAGE COMMUNITY SUBMISSIONS AND QUALITY AUDITS</p>
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
                  <h4 className="font-display font-semibold text-text-primary">Unlock Administrator Privileges</h4>
                  <p className="text-sm text-text-muted">Enter the master security credential to proceed with moderation tasks.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase text-text-secondary tracking-wider block">Admin Key / Passphrase</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                        <Key className="w-4 h-4" />
                      </span>
                      <input
                        type="password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-bg-card border border-border-subtle rounded-xl py-3 pl-10 pr-4 text-xs text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
                        autoFocus
                      />
                    </div>
                    <div className="p-3 bg-accent/5 border border-accent/10 rounded-xl text-xs text-accent font-sans mt-2">
                      <span className="font-semibold uppercase tracking-wider block mb-0.5 text-[9px]">Authorization Token Hint:</span>
                      Use the master admin password <strong className="underline">1234567891011</strong>.
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl flex items-center gap-2">
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-accent hover:bg-accent-hover text-white rounded-xl font-bold font-sans text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95"
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
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/25 rounded-2xl flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-semibold text-emerald-400 block">Session Authenticated Successfully</span>
                      <span className="text-xs text-text-secondary mt-1 block leading-relaxed">
                        You have full review, edit, and state moderation authorization. Moderate incoming community startups using the workspace tabs below.
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg text-[10px] font-bold font-sans uppercase tracking-wider cursor-pointer transition-colors"
                  >
                    Deauthorize
                  </button>
                </div>

                {/* Sub-Tabs Selector */}
                <div className="flex border-b border-border-subtle">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSubTab('pending');
                      setSearchQuery('');
                      setEditingProjectId(null);
                    }}
                    className={`px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                      activeSubTab === 'pending' 
                        ? 'border-accent text-accent' 
                        : 'border-transparent text-text-muted hover:text-text-secondary'
                    }`}
                  >
                    Pending Submissions ({pendingProjects.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSubTab('directory');
                      setSearchQuery('');
                      setEditingProjectId(null);
                    }}
                    className={`px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                      activeSubTab === 'directory' 
                        ? 'border-accent text-accent' 
                        : 'border-transparent text-text-muted hover:text-text-secondary'
                    }`}
                  >
                    Live Directory ({approvedProjects.length})
                  </button>
                </div>

                {/* Database Search & List */}
                <div className="space-y-4">
                  {/* Search and Filters */}
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                      <Search className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={activeSubTab === 'pending' ? "Search submissions by name, founders, industry..." : "Search live directory records..."}
                      className="w-full bg-bg-card border border-border-subtle rounded-xl py-2.5 pl-9 pr-4 text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors text-xs"
                    />
                  </div>

                  {/* Records Table/List */}
                  <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-thin pr-1">
                    {filteredProjects.length === 0 ? (
                      <p className="text-xs text-text-muted text-center py-10 font-sans font-medium">No projects found in this list.</p>
                    ) : (
                      filteredProjects.map((p) => {
                        const isEditing = editingProjectId === p.id;
                        return (
                          <div 
                            key={p.id} 
                            className="bg-bg-card/50 border border-border-subtle rounded-2xl p-4 space-y-4 hover:border-accent/20 transition-all"
                          >
                            {isEditing ? (
                              /* INLINE EDITOR FORM */
                              <div className="space-y-3.5 text-xs text-left">
                                <div className="border-b border-border-subtle/50 pb-2 flex items-center justify-between">
                                  <span className="font-bold text-accent uppercase tracking-wider font-mono text-[10px]">Editing: {p.name}</span>
                                  <span className="text-[10px] text-text-muted font-mono">{p.id}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="block text-text-muted font-bold text-[10px] uppercase mb-1">Name</label>
                                    <input 
                                      type="text" 
                                      value={editName}
                                      onChange={(e) => setEditName(e.target.value)}
                                      className="w-full bg-black/60 border border-border-subtle rounded-lg p-2 text-text-primary focus:border-accent focus:outline-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-text-muted font-bold text-[10px] uppercase mb-1">Founder(s)</label>
                                    <input 
                                      type="text" 
                                      value={editFounders}
                                      onChange={(e) => setEditFounders(e.target.value)}
                                      className="w-full bg-black/60 border border-border-subtle rounded-lg p-2 text-text-primary focus:border-accent focus:outline-none"
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="block text-text-muted font-bold text-[10px] uppercase mb-1">Country</label>
                                    <input 
                                      type="text" 
                                      value={editCountry}
                                      onChange={(e) => setEditCountry(e.target.value)}
                                      className="w-full bg-black/60 border border-border-subtle rounded-lg p-2 text-text-primary focus:border-accent focus:outline-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-text-muted font-bold text-[10px] uppercase mb-1">Industry</label>
                                    <input 
                                      type="text" 
                                      value={editIndustry}
                                      onChange={(e) => setEditIndustry(e.target.value)}
                                      className="w-full bg-black/60 border border-border-subtle rounded-lg p-2 text-text-primary focus:border-accent focus:outline-none"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-text-muted font-bold text-[10px] uppercase mb-1">Short Description</label>
                                  <textarea 
                                    rows={2}
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                    className="w-full bg-black/60 border border-border-subtle rounded-lg p-2 text-text-primary focus:border-accent focus:outline-none leading-relaxed"
                                  />
                                </div>
                                <div>
                                  <label className="block text-text-muted font-bold text-[10px] uppercase mb-1">Why did it fail?</label>
                                  <textarea 
                                    rows={2}
                                    value={editWhyFailed}
                                    onChange={(e) => setEditWhyFailed(e.target.value)}
                                    className="w-full bg-black/60 border border-border-subtle rounded-lg p-2 text-text-primary focus:border-accent focus:outline-none leading-relaxed"
                                  />
                                </div>
                                <div className="flex justify-end gap-2 pt-2">
                                  <button
                                    onClick={cancelEditing}
                                    className="px-3 py-1.5 border border-border-subtle text-text-secondary hover:text-text-primary rounded-lg transition-colors cursor-pointer text-[10px] font-bold"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => saveEditedProject(p)}
                                    className="px-3 py-1.5 bg-accent hover:brightness-110 text-white rounded-lg transition-colors cursor-pointer text-[10px] font-bold flex items-center gap-1"
                                  >
                                    <Save className="w-3.5 h-3.5" />
                                    Save Changes
                                  </button>
                                </div>
                              </div>
                            ) : (
                              /* STANDARD INFO ROW */
                              <div className="space-y-3.5">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex items-start gap-3">
                                    <span className="text-2xl p-2 bg-bg-elevated border border-border-subtle rounded-xl leading-none shrink-0 mt-0.5">{p.avatarEmoji || '📉'}</span>
                                    <div>
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-sm font-semibold text-text-primary">{p.name}</span>
                                        {p.approvalStatus && (
                                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                                            p.approvalStatus === 'Approved' 
                                              ? 'bg-success/15 text-success border border-success/20' 
                                              : p.approvalStatus === 'Rejected'
                                                ? 'bg-rose-500/15 text-rose-400 border border-rose-500/20'
                                                : 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20'
                                          }`}>
                                            {p.approvalStatus}
                                          </span>
                                        )}
                                      </div>
                                      <span className="text-[10px] text-text-muted block mt-1 font-mono uppercase tracking-wider">
                                        Founders: {p.founders || p.founder || 'Unknown'} • Industry: {p.industry} • Year: {p.foundedYear} - {p.failedYear || 'Defunct'}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Delete button (or confirmation) */}
                                  <div className="shrink-0 flex items-center gap-1.5">
                                    <button
                                      onClick={() => startEditing(p)}
                                      className="p-1.5 rounded-lg text-text-muted hover:text-accent hover:bg-accent/10 transition-colors cursor-pointer"
                                      title="Edit Record Parameters"
                                    >
                                      <Edit2 className="w-4 h-4" />
                                    </button>

                                    {confirmDeleteId !== p.id ? (
                                      <button
                                        onClick={() => setConfirmDeleteId(p.id)}
                                        className="p-1.5 rounded-lg text-text-muted hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                                        title="Delete Permanently"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    ) : (
                                      <div className="flex items-center gap-1 bg-rose-500/10 border border-rose-500/35 p-1 rounded-lg">
                                        <span className="text-[9px] text-rose-300 font-bold px-1.5">Confirm Delete?</span>
                                        <button
                                          onClick={() => {
                                            onDeleteProject(p.id);
                                            setConfirmDeleteId(null);
                                          }}
                                          className="px-2 py-0.5 bg-rose-600 hover:bg-rose-700 text-white rounded text-[9px] font-bold cursor-pointer transition-all"
                                        >
                                          Yes
                                        </button>
                                        <button
                                          onClick={() => setConfirmDeleteId(null)}
                                          className="px-2 py-0.5 bg-white/10 text-text-secondary hover:text-text-primary rounded text-[9px] cursor-pointer transition-all"
                                        >
                                          No
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Body Info Block */}
                                <div className="text-xs space-y-2 border-t border-border-subtle/40 pt-3 text-text-secondary leading-relaxed">
                                  <div>
                                    <span className="font-bold text-[10px] text-text-muted uppercase tracking-wider block mb-0.5">Description:</span>
                                    <p className="font-medium bg-black/20 p-2.5 rounded-xl border border-border-subtle/30">{p.description}</p>
                                  </div>
                                  <div>
                                    <span className="font-bold text-[10px] text-text-muted uppercase tracking-wider block mb-0.5">Primary Reason of Defunct State:</span>
                                    <p className="font-medium bg-black/20 p-2.5 rounded-xl border border-border-subtle/30 text-text-primary">{p.primaryFailureReason}</p>
                                  </div>
                                  {p.evidenceSource && (
                                    <div className="flex items-center gap-1 text-[10px] text-accent font-mono truncate">
                                      <span className="text-text-muted font-bold uppercase">Evidence:</span>
                                      <a href={p.evidenceSource} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">{p.evidenceSource}</a>
                                    </div>
                                  )}
                                  {p.verificationDetails && (
                                    <div className="p-2 bg-accent/5 border border-accent/10 rounded-xl text-[10px] text-text-muted leading-relaxed flex items-start gap-2">
                                      <AlertTriangle className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                                      <span>Verification Details: {p.verificationDetails} (Confidence: <strong>{p.verificationConfidence}</strong>)</span>
                                    </div>
                                  )}
                                </div>

                                {/* PENDING WORKFLOW DECISION BUTTONS */}
                                {activeSubTab === 'pending' && (
                                  <div className="flex items-center gap-2.5 border-t border-border-subtle/40 pt-3">
                                    <span className="text-[9px] font-mono font-bold text-text-muted uppercase mr-1">Moderator Decision:</span>
                                    <button
                                      onClick={() => handleSetStatus(p, 'Approved')}
                                      className="px-2.5 py-1.5 bg-success/15 hover:bg-success/25 text-success border border-success/30 rounded-lg text-[9px] font-bold uppercase tracking-wider cursor-pointer transition-colors flex items-center gap-1"
                                    >
                                      <Check className="w-3 h-3" />
                                      Approve
                                    </button>
                                    <button
                                      onClick={() => handleSetStatus(p, 'Needs Info')}
                                      className="px-2.5 py-1.5 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/20 rounded-lg text-[9px] font-bold uppercase tracking-wider cursor-pointer transition-colors flex items-center gap-1"
                                    >
                                      <HelpCircle className="w-3 h-3" />
                                      Needs Info
                                    </button>
                                    <button
                                      onClick={() => handleSetStatus(p, 'Rejected')}
                                      className="px-2.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg text-[9px] font-bold uppercase tracking-wider cursor-pointer transition-colors flex items-center gap-1"
                                    >
                                      <Skull className="w-3 h-3" />
                                      Reject
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })
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
