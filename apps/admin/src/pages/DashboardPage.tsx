import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Plus,
  Sparkles,
  LayoutGrid,
  List as ListIcon,
  Search,
  ArrowUpRight,
  ExternalLink,
  Layers,
  Smartphone,
  Square,
  BookOpen,
  Palette,
  CheckCircle2,
  Clock,
  Activity,
  Cpu,
  Sliders,
} from 'lucide-react';
import { useStats, useJobs, useTemplates, useCreateJob } from '@/api/hooks';
import { StatusBadge } from '@/components/StatusBadge';
import { PLATFORM_LABELS } from '@/lib/constants';
import { getAllBrandPresets } from '@/lib/brand-presets';
import type { CreateJobInput } from '@/api/client';

const DEMO_STORIES = [
  {
    name: 'Ring Drones',
    publisher: 'Ars Technica',
    url: 'https://arstechnica.com/ai/2026/11/ring-cameras-go-mobile-as-amazon-debuts-ai-powered-security-drone-and-robot/',
  },
  {
    name: 'Frontier AI Moats',
    publisher: 'Google News / Tech',
    url: 'https://news.google.com/rss/articles/CBMinwFBVV95cUxPc0xncmpQRnRNV3labGNBOE15RFpFWlYzclM1VmVEX3BQQm10c3dJTFJqQm5vbkdXMHZoUGRaY241M0Nvam14Rm5wTDAwSzRxdHdrTnFEd3hyeXcwMUR6bjA3eHJLVTF5c2NYT1BaTFdaLWRYMDVVaC1jZkhFcjJEaW5HQ3U3cnhRdnV2QzhVd1NYWENVOFN6T3MtMkdQQlE?oc=5',
  },
  {
    name: 'Tipaza Ancient Ruins',
    publisher: 'Wikipedia / History',
    url: 'https://en.wikipedia.org/wiki/Tipaza',
  },
];

const NARRATIVE_PRESETS = [
  { id: 'storytelling', name: 'Storytelling' },
  { id: 'news-reporting', name: 'News Briefing' },
  { id: 'deep-dive', name: 'Deep Dive' },
  { id: 'financial-analysis', name: 'Financial' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'case-study', name: 'Case Study' },
  { id: 'mythbuster', name: 'Mythbuster' },
  { id: 'playbook', name: 'Playbook' },
];

const CLASSIC_TEMPLATES = ['paper-of-record', 'the-globalist', 'the-curator', 'the-academic', 'the-signal', 'the-field-notes'];

export function DashboardPage() {
  const navigate = useNavigate();
  const { data: stats, isLoading: statsLoading } = useStats();
  const { data: jobsData, isLoading: jobsLoading } = useJobs({ limit: 20 });
  const { data: templatesData } = useTemplates();
  const createJob = useCreateJob();

  // Quick Dispatcher state
  const [quickUrl, setQuickUrl] = useState('');
  const [quickPreset, setQuickPreset] = useState('storytelling');
  const [quickSlideCount, setQuickSlideCount] = useState(7);
  const [quickPlatform, setQuickPlatform] = useState('instagram-stories');

  // Filter & View State
  const [statusFilter, setStatusFilter] = useState<'all' | 'complete' | 'processing' | 'failed'>('all');
  const [viewMode, setViewMode] = useState<'gallery' | 'table'>('gallery');
  const [searchQuery, setSearchQuery] = useState('');

  const brandPresets = useMemo(() => getAllBrandPresets().slice(0, 3), []);
  const templates = templatesData?.templates ?? [];
  const latestTemplate = templates[0];

  const jobs = jobsData?.jobs ?? [];

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (statusFilter === 'complete' && job.status !== 'complete') return false;
      if (statusFilter === 'processing' && !['queued', 'ingesting', 'transcribing', 'structuring', 'rendering'].includes(job.status)) return false;
      if (statusFilter === 'failed' && !['failed', 'needs_review'].includes(job.status)) return false;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          job.sourceUrl.toLowerCase().includes(q) ||
          job.templateId.toLowerCase().includes(q) ||
          job.id.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [jobs, statusFilter, searchQuery]);

  // Aggregate slide count
  const totalSlidesPublished = useMemo(() => {
    return jobs.reduce((sum, j) => sum + (j.slideCount || 0), 0);
  }, [jobs]);

  function handleQuickDispatch(e: React.FormEvent) {
    e.preventDefault();
    if (!quickUrl) return;
    const sourceUrl = quickUrl.startsWith('http') ? quickUrl : `https://${quickUrl}`;
    const input: CreateJobInput = {
      sourceUrl,
      platform: quickPlatform,
      engine: 'bespoke',
      templateId: 'bespoke',
      narrativePreset: quickPreset,
      targetSlideCount: quickSlideCount,
    };
    createJob.mutate(input, {
      onSuccess: (data) => navigate(`/jobs/${data.jobId}`),
    });
  }

  function handleSelectDemo(demoUrl: string) {
    setQuickUrl(demoUrl);
  }

  const successRate = stats?.total && stats.total > 0
    ? Math.round(((stats.complete || 0) / stats.total) * 100)
    : 100;

  return (
    <div className="space-y-8 pb-16">
      {/* 1. EDITORIAL OPERATIONS HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-[22px] font-semibold tracking-[-0.02em] text-text-primary">
              Editorial Operations
            </h1>
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-[11px] font-mono text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Engine Online
            </span>
          </div>
          <p className="text-[13px] text-text-tertiary">
            Autonomous multi-pass AI publishing engine, bespoke React slides & visual audits.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            asChild
            variant="outline"
            className="h-8 rounded-md border-border bg-surface-2 text-text-secondary hover:text-text-primary hover:bg-surface-3 px-3 text-[12px] font-medium gap-1.5"
          >
            <Link to="/studio">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              Open Studio
            </Link>
          </Button>

          <Button
            asChild
            className="h-8 rounded-md bg-text-primary text-background hover:bg-text-secondary px-3.5 text-[12px] font-semibold gap-1.5 shadow-xs"
          >
            <Link to="/create">
              <Plus className="h-3.5 w-3.5" />
              New Publication
            </Link>
          </Button>
        </div>
      </div>

      {/* 2. CONSOLIDATED KPI RIBBON */}
      <div className="rounded-xl border border-border bg-surface-2/60 backdrop-blur-xs p-1 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
          {/* KPI 1: Publications Crafted */}
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-[0.05em] text-text-quaternary font-mono">
                Publications Crafted
              </span>
              <span className="text-[10px] font-mono font-medium px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/30">
                {successRate}% Success
              </span>
            </div>
            <div className="text-[28px] font-bold tracking-tight text-text-primary mt-1.5">
              {statsLoading ? <Skeleton className="h-8 w-12 bg-surface-3" /> : stats?.total ?? 0}
            </div>
            <p className="text-[11px] text-text-tertiary mt-0.5">
              {stats?.complete ?? 0} completed · {stats?.failed ?? 0} failed
            </p>
          </div>

          {/* KPI 2: Live Production Pipeline */}
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-[0.05em] text-text-quaternary font-mono">
                Active In-Flight
              </span>
              <Activity className="h-3.5 w-3.5 text-text-quaternary" />
            </div>
            <div className="flex items-center gap-2 text-[28px] font-bold tracking-tight text-text-primary mt-1.5">
              {statsLoading ? (
                <Skeleton className="h-8 w-12 bg-surface-3" />
              ) : (
                <>
                  <span>{(stats?.processing ?? 0) + (stats?.queued ?? 0)}</span>
                  {(stats?.processing ?? 0) > 0 && (
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                  )}
                </>
              )}
            </div>
            <p className="text-[11px] text-text-tertiary mt-0.5">
              {(stats?.processing ?? 0) > 0 ? 'Structuring & Visual Audit running' : 'Queue idle · Ready for story'}
            </p>
          </div>

          {/* KPI 3: Total Slides Volume */}
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-[0.05em] text-text-quaternary font-mono">
                Editorial Slides
              </span>
              <Layers className="h-3.5 w-3.5 text-text-quaternary" />
            </div>
            <div className="text-[28px] font-bold tracking-tight text-text-primary mt-1.5">
              {jobsLoading ? <Skeleton className="h-8 w-12 bg-surface-3" /> : totalSlidesPublished}
            </div>
            <p className="text-[11px] text-text-tertiary mt-0.5">
              Art-directed React slide decks
            </p>
          </div>

          {/* KPI 4: Enterprise Capacity */}
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-[0.05em] text-text-quaternary font-mono">
                LLM Capacity
              </span>
              <Cpu className="h-3.5 w-3.5 text-emerald-400" />
            </div>
            <div className="text-[28px] font-bold tracking-tight text-text-primary mt-1.5">
              Direct-Line
            </div>
            <p className="text-[11px] text-emerald-400/90 font-mono mt-0.5">
              Enterprise Pack ($0.00 / tenant)
            </p>
          </div>
        </div>
      </div>

      {/* 3. QUICK STORY DISPATCHER TRAY */}
      <div className="rounded-xl border border-border bg-surface p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <h2 className="text-[13px] font-semibold text-text-primary uppercase tracking-[0.04em]">
              Quick Story Dispatcher
            </h2>
          </div>
          <span className="text-[11px] text-text-quaternary font-mono">
            Directly author & audit social carousel
          </span>
        </div>

        <form onSubmit={handleQuickDispatch} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              type="url"
              required
              placeholder="Paste article or news URL (e.g. https://arstechnica.com/...)"
              value={quickUrl}
              onChange={(e) => setQuickUrl(e.target.value)}
              className="flex-1 h-9 bg-surface-2 border-border text-[13px] text-text-secondary placeholder:text-text-quaternary"
            />

            {/* Platform Canvas */}
            <select
              value={quickPlatform}
              onChange={(e) => setQuickPlatform(e.target.value)}
              className="h-9 rounded-md border border-border bg-surface-2 px-2.5 text-[12px] font-medium text-text-primary"
            >
              <option value="instagram-stories">9:16 Stories</option>
              <option value="instagram-feed">4:5 Feed</option>
              <option value="instagram-square">1:1 Square</option>
            </select>

            {/* Narrative Preset */}
            <select
              value={quickPreset}
              onChange={(e) => setQuickPreset(e.target.value)}
              className="h-9 rounded-md border border-border bg-surface-2 px-2.5 text-[12px] font-medium text-text-primary"
            >
              {NARRATIVE_PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            {/* Slide Count */}
            <select
              value={quickSlideCount}
              onChange={(e) => setQuickSlideCount(Number(e.target.value))}
              className="h-9 rounded-md border border-border bg-surface-2 px-2.5 text-[12px] font-medium text-text-primary"
            >
              <option value={5}>5 Slides</option>
              <option value={7}>7 Slides (Optimal)</option>
              <option value={10}>10 Slides</option>
            </select>

            <Button
              type="submit"
              disabled={createJob.isPending || !quickUrl}
              className="h-9 px-4 rounded-md bg-text-primary text-background hover:bg-text-secondary text-[13px] font-semibold shrink-0 gap-1"
            >
              {createJob.isPending ? 'Dispatching...' : 'Dispatch ⚡'}
            </Button>
          </div>

          {/* Quick Demo Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[10px] font-mono uppercase text-text-quaternary mr-1">
              Sample Prompts:
            </span>
            {DEMO_STORIES.map((demo) => (
              <button
                key={demo.name}
                type="button"
                onClick={() => handleSelectDemo(demo.url)}
                className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full border border-border bg-surface-2 hover:border-emerald-700/60 hover:bg-emerald-950/20 text-text-tertiary hover:text-emerald-300 transition-all font-mono"
              >
                <BookOpen className="h-2.5 w-2.5 text-emerald-400" />
                <span>{demo.name}</span>
              </button>
            ))}
          </div>
        </form>
      </div>

      {/* 4. MAIN WORKSPACE: PUBLICATIONS HUB + OPERATIONS RAIL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: PUBLICATIONS SHOWCASE (2 COLS) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filter Bar & View Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/50 pb-3">
            {/* Status Tabs */}
            <div className="flex items-center gap-1 bg-surface-2 p-0.5 rounded-lg border border-border text-[11px]">
              {[
                { id: 'all', label: 'All', count: stats?.total ?? 0 },
                { id: 'complete', label: 'Completed', count: stats?.complete ?? 0 },
                { id: 'processing', label: 'In-Flight', count: (stats?.processing ?? 0) + (stats?.queued ?? 0) },
                { id: 'failed', label: 'Failed', count: stats?.failed ?? 0 },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setStatusFilter(tab.id as any)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    statusFilter === tab.id
                      ? 'bg-surface-4 text-text-primary shadow-xs font-semibold'
                      : 'text-text-tertiary hover:text-text-primary'
                  }`}
                >
                  {tab.label} <span className="opacity-60 text-[10px] font-mono">({tab.count})</span>
                </button>
              ))}
            </div>

            {/* Search & View Toggle */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-text-quaternary" />
                <Input
                  placeholder="Filter stories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-7 w-40 pl-7 text-[12px] bg-surface-2 border-border"
                />
              </div>

              <div className="flex items-center rounded-md border border-border bg-surface-2 p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode('gallery')}
                  title="Cover Gallery View"
                  className={`p-1 rounded transition-colors ${
                    viewMode === 'gallery' ? 'bg-surface-4 text-text-primary' : 'text-text-quaternary hover:text-text-primary'
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  title="Table Ledger View"
                  className={`p-1 rounded transition-colors ${
                    viewMode === 'table' ? 'bg-surface-4 text-text-primary' : 'text-text-quaternary hover:text-text-primary'
                  }`}
                >
                  <ListIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* PUBLICATIONS CONTENT */}
          {jobsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-border bg-surface p-4 space-y-3">
                  <Skeleton className="h-44 w-full rounded-lg bg-surface-2" />
                  <Skeleton className="h-4 w-3/4 bg-surface-2" />
                </div>
              ))}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-surface p-12 text-center">
              <p className="text-[13px] text-text-secondary font-medium">No publications match filter.</p>
              <p className="text-[11px] text-text-quaternary mt-1">Try another filter or dispatch a new story.</p>
            </div>
          ) : viewMode === 'gallery' ? (
            /* VIEW A: VISUAL CAROUSEL GALLERY */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredJobs.map((job) => {
                const isBespoke = !CLASSIC_TEMPLATES.includes(job.templateId) && job.templateId !== 'auto';
                const hasCover = job.status === 'complete' && (job.slideCount ?? 0) > 0;
                let domain = '';
                try {
                  domain = new URL(job.sourceUrl).hostname.replace(/^www\./, '');
                } catch {
                  domain = job.sourceUrl;
                }

                return (
                  <div
                    key={job.id}
                    className="group rounded-xl border border-border bg-surface hover:border-border-secondary hover:bg-surface-hover/50 transition-all overflow-hidden flex flex-col justify-between"
                  >
                    {/* Cover Preview Frame */}
                    <Link to={`/jobs/${job.id}`} className="block relative bg-zinc-950/80 aspect-4/3 overflow-hidden border-b border-border/60">
                      {hasCover ? (
                        <img
                          src={`/api/slides/slides/${job.id}/0.png`}
                          alt="Cover slide"
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-102"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
                          <Layers className="h-8 w-8 text-text-quaternary mb-2" />
                          <span className="text-[11px] font-mono text-text-tertiary">
                            {job.status === 'complete' ? 'Slide Deck Ready' : 'In Production...'}
                          </span>
                        </div>
                      )}

                      {/* Top Badges Overlay */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                        <StatusBadge status={job.status} size="sm" />
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-950/80 backdrop-blur-xs text-zinc-300 border border-white/10 font-medium">
                          {job.slideCount ? `${job.slideCount} slides` : '—'}
                        </span>
                      </div>
                    </Link>

                    {/* Card Meta & Controls */}
                    <div className="p-3.5 space-y-2.5">
                      <div>
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-text-quaternary">
                          <span>{domain}</span>
                          <span>•</span>
                          <span>{PLATFORM_LABELS[job.platform] ?? job.platform}</span>
                        </div>
                        <Link
                          to={`/jobs/${job.id}`}
                          className="text-[13px] font-semibold text-text-primary hover:text-emerald-400 transition-colors line-clamp-1 mt-0.5"
                          title={job.sourceUrl}
                        >
                          {job.sourceUrl.replace(/^https?:\/\//, '')}
                        </Link>
                      </div>

                      {/* Action Bar */}
                      <div className="flex items-center justify-between pt-2 border-t border-border/50">
                        {isBespoke ? (
                          <span className="flex items-center gap-1 text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                            <Sparkles className="h-2.5 w-2.5" />
                            {job.templateId}
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-text-quaternary">
                            {job.templateId}
                          </span>
                        )}

                        <div className="flex items-center gap-2">
                          {isBespoke && job.status === 'complete' && (
                            <Link
                              to={`/studio?template=${job.templateId}`}
                              className="text-[11px] font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                            >
                              Studio ⚡
                            </Link>
                          )}
                          <Link
                            to={`/jobs/${job.id}`}
                            className="text-[11px] font-medium text-text-tertiary hover:text-text-primary flex items-center gap-0.5 transition-colors"
                          >
                            Inspect <ArrowUpRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* VIEW B: TABLE LEDGER VIEW */
            <div className="rounded-xl border border-border bg-surface overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border bg-surface-2/60 text-[11px] font-mono uppercase tracking-[0.05em] text-text-quaternary">
                    <th className="py-2.5 px-3.5">Status</th>
                    <th className="py-2.5 px-3.5">Story / Source</th>
                    <th className="py-2.5 px-3.5">Platform</th>
                    <th className="py-2.5 px-3.5">Template</th>
                    <th className="py-2.5 px-3.5">Slides</th>
                    <th className="py-2.5 px-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-[12px]">
                  {filteredJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-surface-hover/60 transition-colors">
                      <td className="py-2.5 px-3.5">
                        <StatusBadge status={job.status} size="sm" />
                      </td>
                      <td className="py-2.5 px-3.5 max-w-[280px]">
                        <Link to={`/jobs/${job.id}`} className="truncate block font-medium text-text-primary hover:text-emerald-400">
                          {job.sourceUrl}
                        </Link>
                      </td>
                      <td className="py-2.5 px-3.5 text-text-tertiary font-mono text-[11px]">
                        {PLATFORM_LABELS[job.platform] ?? job.platform}
                      </td>
                      <td className="py-2.5 px-3.5 text-text-tertiary font-mono text-[11px]">
                        {job.templateId}
                      </td>
                      <td className="py-2.5 px-3.5 text-text-tertiary font-mono text-[11px]">
                        {job.slideCount ?? '—'}
                      </td>
                      <td className="py-2.5 px-3.5 text-right">
                        <Link
                          to={`/jobs/${job.id}`}
                          className="inline-flex items-center gap-1 text-[11px] text-text-secondary hover:text-text-primary font-medium"
                        >
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: OPERATIONS RAIL (1 COL) */}
        <div className="space-y-6">
          {/* STUDIO QUICK-LAUNCH CARD */}
          <div className="rounded-xl border border-emerald-800/40 bg-gradient-to-b from-emerald-950/30 to-surface p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-semibold text-emerald-400 uppercase tracking-[0.05em] flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                Studio Quick-Launch
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/50 font-bold">
                Live Engine
              </span>
            </div>

            {latestTemplate ? (
              <div className="space-y-2">
                <p className="text-[13px] font-semibold text-text-primary">
                  {latestTemplate.name}
                </p>
                <div className="flex items-center gap-2 text-[11px] font-mono text-text-tertiary">
                  <span>{latestTemplate.slideCount} slides</span>
                  <span>•</span>
                  <span>{latestTemplate.platform}</span>
                </div>
                <Button
                  asChild
                  className="w-full h-8 rounded-md bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-[12px] gap-1.5 shadow-xs"
                >
                  <Link to={`/studio?template=${latestTemplate.slug}`}>
                    Launch in Studio →
                  </Link>
                </Button>
              </div>
            ) : (
              <p className="text-[12px] text-text-tertiary">
                No templates generated yet. Create a job to test the Studio.
              </p>
            )}
          </div>

          {/* ACTIVE BRAND ARCHETYPES CARD */}
          <div className="rounded-xl border border-border bg-surface p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-semibold text-text-secondary uppercase tracking-[0.05em] flex items-center gap-1.5">
                <Palette className="h-3.5 w-3.5 text-text-quaternary" />
                Brand Archetypes
              </span>
              <Link to="/brand-kits" className="text-[11px] text-emerald-400 hover:text-emerald-300">
                Manage →
              </Link>
            </div>

            <div className="space-y-2">
              {brandPresets.map((b) => (
                <div key={b.slug} className="flex items-center justify-between py-1 border-b border-border/40 last:border-b-0">
                  <div>
                    <span className="text-[12px] font-medium text-text-primary block">
                      {b.name}
                    </span>
                    <span className="text-[10px] font-mono text-text-quaternary">
                      {b.typography.headlineFont.split(',')[0]}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {Object.values(b.palette || {}).slice(0, 3).map((hex, i) => (
                      <span
                        key={i}
                        className="h-3 w-3 rounded-full border border-black/20"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PIPELINE WORKERS STATUS */}
          <div className="rounded-xl border border-border bg-surface p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-semibold text-text-secondary uppercase tracking-[0.05em] flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 text-text-quaternary" />
                Pipeline Workers
              </span>
              <Link to="/maintenance" className="text-[11px] text-text-quaternary hover:text-text-primary">
                Logs →
              </Link>
            </div>

            <div className="space-y-1.5 text-[11px] font-mono">
              {[
                { name: 'Worker Ingest (URL fetcher)', port: 'Port 3000', status: 'Online' },
                { name: 'Worker Structure (Bespoke AI)', port: 'PM2 #4', status: 'Online' },
                { name: 'Worker Render (Playwright/PNG)', port: 'PM2 #5', status: 'Online' },
                { name: 'Template Studio Engine', port: 'Port 5174', status: 'Online' },
              ].map((w) => (
                <div key={w.name} className="flex items-center justify-between py-1">
                  <span className="text-text-tertiary">{w.name}</span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {w.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
