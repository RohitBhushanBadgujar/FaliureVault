import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Folder, Users, Activity, FileText, ArrowUp, ArrowDown, CornerDownLeft, Sparkles, AlertCircle } from 'lucide-react';
import { Project } from '../types';

interface GlobalSearchSpotlightProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onSelectProject: (projectId: string) => void;
  onSelectTab: (tabId: 'vault' | 'analyze' | 'rebuild' | 'reports' | 'profile') => void;
}

const SEARCH_SUGGESTIONS = [
  "BPPL solar grid failure",
  "Kanoa FAA drone regulation",
  "PebbleStack modular watch strap",
  "Zero-CapEx hardware alternatives",
  "Sovereign green credit enablers 2026",
  "Solid state battery timing"
];

interface SearchResultItem {
  id: string;
  type: 'startup' | 'rebuild' | 'member' | 'report';
  title: string;
  subtitle: string;
  badge?: string;
  badgeColor?: string;
  payload: any;
}

export default function GlobalSearchSpotlight({
  isOpen,
  onClose,
  projects,
  onSelectProject,
  onSelectTab
}: GlobalSearchSpotlightProps) {
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Startups' | 'Workspaces' | 'Members'>('All');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Focus input when spotlight opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // General keyboard listener for global Cmd+K, Ctrl+K or "/"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen) {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, filteredResults.length - 1));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (filteredResults[selectedIndex]) {
            handleSelectItem(filteredResults[selectedIndex]);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, query, selectedIndex, categoryFilter]);

  // Compile search results from projects, tasks, contributors, etc.
  const getAllResults = (): SearchResultItem[] => {
    const items: SearchResultItem[] = [];

    projects.forEach((p) => {
      // 1. Startup Failures
      items.push({
        id: `startup-${p.id}`,
        type: 'startup',
        title: p.name,
        subtitle: `${p.tagline} • Sector: ${p.industry}`,
        badge: p.companyStatus || 'Shut Down',
        badgeColor: p.companyStatus === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                    p.companyStatus === 'Struggling' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20',
        payload: { projectId: p.id, action: 'detail' }
      });

      // 2. Active Rebuild entries
      if (p.workspace) {
        p.workspace.tasks.forEach((t) => {
          items.push({
            id: `task-${p.id}-${t.id}`,
            type: 'rebuild',
            title: `Rebuild Task: ${t.title}`,
            subtitle: `Assigned under ${p.name} Blueprint Workspace • Category: ${t.category}`,
            badge: `${t.priority} Priority`,
            badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
            payload: { projectId: p.id, action: 'rebuild' }
          });
        });

        // 3. Team contributors
        p.workspace.contributors.forEach((c) => {
          items.push({
            id: `contributor-${p.id}-${c.id}`,
            type: 'member',
            title: c.name,
            subtitle: `Team Member • ${c.role} on ${p.name} Rebuild Hub`,
            badge: c.joined ? 'Active' : 'Offline',
            badgeColor: c.joined ? 'bg-success/10 text-success border-success/20' : 'bg-slate-500/10 text-slate-400 border-slate-500/20',
            payload: { projectId: p.id, action: 'profile' }
          });
        });
      }

      // 4. Strategic reports
      items.push({
        id: `report-${p.id}`,
        type: 'report',
        title: `Strategic Report: ${p.name}`,
        subtitle: `Key lessons regarding legacy failures of ${p.name}.`,
        badge: 'PDF Ready',
        badgeColor: 'bg-danger/10 text-danger border-danger/20',
        payload: { projectId: p.id, action: 'reports' }
      });
    });

    return items;
  };

  const resultsPool = getAllResults();

  // Filter based on matching queries and categories
  const filteredResults = resultsPool.filter((item) => {
    // Matches category selector
    if (categoryFilter === 'Startups' && item.type !== 'startup') return false;
    if (categoryFilter === 'Workspaces' && item.type !== 'rebuild') return false;
    if (categoryFilter === 'Members' && item.type !== 'member') return false;

    if (!query.trim()) return true; // Show all relevant when empty or suggestions active

    const queryLower = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(queryLower) ||
      item.subtitle.toLowerCase().includes(queryLower) ||
      (item.badge && item.badge.toLowerCase().includes(queryLower))
    );
  });

  // Handle clicked item or pressing Enter
  const handleSelectItem = (item: SearchResultItem) => {
    onClose();
    if (item.payload.action === 'detail') {
      onSelectProject(item.payload.projectId);
    } else if (item.payload.action === 'rebuild') {
      onSelectProject(item.payload.projectId);
      onSelectTab('rebuild');
    } else if (item.payload.action === 'reports') {
      onSelectProject(item.payload.projectId);
      onSelectTab('reports');
    } else if (item.payload.action === 'profile') {
      onSelectTab('profile');
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector('[data-selected="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 min-h-screen bg-black/85 backdrop-blur-md z-[100] flex items-start justify-center pt-[10vh] p-4 text-left">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: -10 }}
          transition={{ duration: 0.15 }}
          className="w-full max-w-2xl bg-bg-elevated border border-border-subtle rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[75vh]"
        >
          {/* Header Spotlight Search Input */}
          <div className="p-4 border-b border-border-subtle flex items-center gap-3 bg-bg-card">
            <Search className="w-5 h-5 text-accent shrink-0 select-none animate-pulse" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              className="flex-1 bg-transparent text-text-primary placeholder:text-text-muted focus:outline-none font-sans text-sm"
              placeholder="Search failures, custom blueprints, team members, task lists, lessons..."
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="p-1 px-1.5 rounded border border-white/5 hover:bg-white/5 font-mono text-[9px] uppercase text-slate-500 cursor-pointer text-slate-400"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 text-slate-500 hover:text-white hover:bg-white/5 rounded transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Filtering Toggles */}
          <div className="flex border-b border-white/5 bg-black/40 px-3 py-1.5 gap-1 select-none flex-wrap text-slate-400">
            {(['All', 'Startups', 'Workspaces', 'Members'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategoryFilter(cat);
                  setSelectedIndex(0);
                }}
                className={`px-3 py-1 rounded text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                  categoryFilter === cat 
                    ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20 font-bold' 
                    : 'hover:text-white text-slate-400 border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Core scrollable listings */}
          <div 
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto p-2 space-y-1 max-h-[45vh]"
          >
            {/* Search Suggestions list if query is empty */}
            {!query.trim() && (
              <div className="p-3 select-none pb-2 border-b border-white/5">
                <span className="block font-mono text-[9px] text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-teal-400" />
                  Trending Venture Intel Queries
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                  {SEARCH_SUGGESTIONS.map((sug) => (
                    <button
                      key={sug}
                      onClick={() => {
                        setQuery(sug);
                        inputRef.current?.focus();
                      }}
                      className="p-2 bg-black/40 hover:bg-white/5 border border-white/5 rounded-lg text-xs hover:text-teal-400 transition-all font-light text-slate-400 text-left truncate cursor-pointer flex items-center gap-2"
                    >
                      <span className="text-teal-500 font-mono text-[9px] shrink-0">#</span>
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {filteredResults.length > 0 ? (
              <div className="pt-2">
                <span className="block font-mono text-[9px] text-slate-500 uppercase tracking-widest mb-1.5 px-2 select-none">
                  MATCHED REGISTRY DOSSIERS ({filteredResults.length})
                </span>
                
                {filteredResults.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  const Icon = item.type === 'startup' ? Folder :
                               item.type === 'rebuild' ? Activity :
                               item.type === 'member' ? Users : FileText;

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectItem(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      data-selected={isSelected}
                      className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-teal-500/5 border-teal-500/30' 
                          : 'bg-transparent border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-4">
                        <div className={`p-2 rounded shrink-0 relative ${
                          isSelected ? 'bg-teal-500/10 text-teal-400' : 'bg-white/5 text-slate-400'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 text-left">
                          <span className={`text-xs font-medium block truncate ${
                            isSelected ? 'text-teal-400 font-semibold' : 'text-slate-200'
                          }`}>
                            {item.title}
                          </span>
                          <span className="text-[10px] text-slate-400 block truncate font-light mt-0.5 leading-tight font-sans">
                            {item.subtitle}
                          </span>
                        </div>
                      </div>

                      {item.badge && (
                        <span className={`px-2 py-0.5 rounded text-[8.5px] font-mono leading-none tracking-wider shrink-0 uppercase border ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500">
                <AlertCircle className="w-8 h-8 mx-auto text-slate-700 animate-pulse mb-3" />
                <p className="text-xs font-display font-medium text-slate-400">No Venture Dossiers Matched</p>
                <p className="text-[10px] font-mono text-slate-600 mt-1">Try optimizing filters or exploring trending metrics</p>
              </div>
            )}
          </div>

          {/* Keyboard Navigation Footer bar hint instructions */}
          <div className="p-3 border-t border-white/10 bg-[#0B0B0D] flex items-center justify-between select-none text-[9px] font-mono text-slate-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <ArrowUp className="w-3 h-3 text-slate-400 bg-white/5 p-0.5 rounded border border-white/5" />
                <ArrowDown className="w-3 h-3 text-slate-400 bg-white/5 p-0.5 rounded border border-white/5" />
                Move
              </span>
              <span className="flex items-center gap-1">
                <CornerDownLeft className="w-3 h-3 text-slate-400 bg-white/5 p-0.5 rounded border border-white/5" />
                Select
              </span>
              <span className="flex items-center gap-1">
                <span className="p-0.5 px-1 bg-white/5 rounded border border-white/5 text-[8px] text-slate-400">ESC</span>
                Close
              </span>
            </div>
            <div className="text-[8px] uppercase font-bold text-teal-500">
              ⚡ FAILUREVAULT VENTURE TELEMETRY
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
