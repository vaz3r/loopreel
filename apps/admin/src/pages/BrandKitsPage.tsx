import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Palette,
  Plus,
  Trash2,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  Globe,
  Sliders,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import {
  getBrandPresets,
  saveBrandPreset,
  deleteBrandPreset,
} from '@/lib/brand-presets';
import type { BespokeBrand } from '@/api/client';

export function BrandKitsPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(() => getBrandPresets());
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // New Brand Kit form state
  const [formData, setFormData] = useState<Partial<BespokeBrand>>({
    name: '',
    slug: '',
    domain: '',
    vibe: '',
    wordmark: '',
    wordmarkStyle: 'sans',
    handle: '',
    texture: 'none',
    motif: 'none',
    palette: {
      paper: '#0D0E12',
      ink: '#F1F3F9',
      accent: '#FF4D00',
      surface: '#161820',
      border: '#2A2D3A',
      subtle: '#8E93A6',
    },
    typography: {
      headlineFont: 'Syne',
      bodyFont: 'Inter',
      monoFont: 'JetBrains Mono',
      googleFontsUrl: '',
    },
  });

  function refresh() {
    setData(getBrandPresets());
  }

  function handleCopy(key: string, value: string) {
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
    toast.success(`Copied ${value}`);
    setTimeout(() => setCopiedKey(null), 2000);
  }

  function handleDelete(slug: string, name: string) {
    if (confirm(`Delete custom brand preset "${name}"?`)) {
      deleteBrandPreset(slug);
      toast.success(`Deleted ${name}`);
      refresh();
    }
  }

  function handleSaveNewBrand(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name) {
      toast.error('Brand name is required');
      return;
    }

    const slug =
      formData.slug?.trim() ||
      formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const headlineFont = formData.typography?.headlineFont || 'Syne';
    const bodyFont = formData.typography?.bodyFont || 'Inter';
    const monoFont = formData.typography?.monoFont || 'JetBrains Mono';

    const fonts = [headlineFont, bodyFont, monoFont].filter((v, i, a) => a.indexOf(v) === i);
    const googleFontsUrl = `https://fonts.googleapis.com/css2?${fonts
      .map((f) => `family=${encodeURIComponent(f)}:wght@400;500;600;700;800`)
      .join('&')}&display=swap`;

    const newBrand: BespokeBrand = {
      name: formData.name,
      slug,
      vibe: formData.vibe || 'Curated Editorial Publication',
      domain: formData.domain || `${slug}.pub`,
      wordmark: formData.wordmark || formData.name.toUpperCase(),
      wordmarkStyle: formData.wordmarkStyle || 'sans',
      handle: formData.handle || `@${slug.replace(/-/g, '')}`,
      texture: (formData.texture as any) || 'none',
      motif: (formData.motif as any) || 'none',
      palette: {
        paper: formData.palette?.paper || '#0D0E12',
        ink: formData.palette?.ink || '#F1F3F9',
        accent: formData.palette?.accent || '#FF4D00',
        surface: formData.palette?.surface || '#161820',
        border: formData.palette?.border || '#2A2D3A',
        subtle: formData.palette?.subtle || '#8E93A6',
      },
      typography: {
        headlineFont,
        bodyFont,
        monoFont,
        googleFontsUrl,
      },
    };

    saveBrandPreset(newBrand);
    toast.success(`Created brand kit "${newBrand.name}"`);
    setIsCreateOpen(false);
    refresh();
  }

  function useInNewJob(brand: BespokeBrand) {
    navigate(`/create?brandPreset=${encodeURIComponent(brand.slug)}`);
  }

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-[20px] font-semibold tracking-[-0.02em] text-text-primary">
              Brand Kits Hub
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/40 text-emerald-300 border border-emerald-800/40">
              {data.custom.length + data.curated.length} Presets
            </span>
          </div>
          <p className="text-[13px] text-text-tertiary mt-1">
            Art direction systems, color tokens, and typography kits for consistent publication identity across all stories.
          </p>
        </div>

        <Button
          onClick={() => setIsCreateOpen(true)}
          className="h-9 gap-1.5 bg-text-primary text-background hover:bg-text-secondary text-[13px] font-medium"
        >
          <Plus className="h-4 w-4" />
          Create Custom Brand Kit
        </Button>
      </div>

      {/* User Custom Brands Section */}
      {data.custom.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[12px] font-medium uppercase tracking-[0.05em] text-text-quaternary flex items-center gap-2">
              <Sliders className="h-3.5 w-3.5 text-emerald-400" />
              Your Custom Brand Kits ({data.custom.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {data.custom.map((b) => (
              <BrandPresetCard
                key={b.slug}
                brand={b}
                isCustom={true}
                copiedKey={copiedKey}
                onCopy={handleCopy}
                onDelete={() => handleDelete(b.slug, b.name)}
                onUse={() => useInNewJob(b)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Curated Editorial Standards Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[12px] font-medium uppercase tracking-[0.05em] text-text-quaternary flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            Curated Publication Archetypes ({data.curated.length})
          </h2>
          <span className="text-[11px] text-text-quaternary">
            Handcrafted for high-signal editorial storytelling
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {data.curated.map((b) => (
            <BrandPresetCard
              key={b.slug}
              brand={b}
              isCustom={false}
              copiedKey={copiedKey}
              onCopy={handleCopy}
              onUse={() => useInNewJob(b)}
            />
          ))}
        </div>
      </div>

      {/* Create Modal Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl bg-background border-border max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[16px] font-semibold text-text-primary flex items-center gap-2">
              <Palette className="h-4 w-4 text-emerald-400" />
              Define New Brand Kit
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSaveNewBrand} className="space-y-6 pt-2">
            {/* Identity */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[11px] font-medium uppercase tracking-wider text-text-quaternary">
                  Publication Name *
                </Label>
                <Input
                  required
                  placeholder="e.g. The Quantum Journal"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-8.5 bg-surface-2 border-border text-[13px]"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[11px] font-medium uppercase tracking-wider text-text-quaternary">
                  Domain / URL
                </Label>
                <Input
                  placeholder="e.g. quantumjournal.dev"
                  value={formData.domain || ''}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  className="h-8.5 bg-surface-2 border-border text-[13px]"
                />
              </div>
            </div>

            {/* Wordmark & Handle */}
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[11px] font-medium uppercase tracking-wider text-text-quaternary">
                  Typographic Wordmark
                </Label>
                <Input
                  placeholder="e.g. QUANTUM JOURNAL"
                  value={formData.wordmark || ''}
                  onChange={(e) => setFormData({ ...formData, wordmark: e.target.value })}
                  className="h-8.5 bg-surface-2 border-border text-[13px]"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[11px] font-medium uppercase tracking-wider text-text-quaternary">
                  Wordmark Style
                </Label>
                <select
                  value={formData.wordmarkStyle || 'sans'}
                  onChange={(e) => setFormData({ ...formData, wordmarkStyle: e.target.value as any })}
                  className="h-8.5 w-full rounded-md border border-border bg-surface-2 px-3 text-[12px] text-text-secondary"
                >
                  <option value="sans">Bold Sans-Serif</option>
                  <option value="serif">Italic Serif</option>
                  <option value="small-caps">Tracked Small Caps</option>
                  <option value="mono">Telemetry Mono</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[11px] font-medium uppercase tracking-wider text-text-quaternary">
                  Social Handle
                </Label>
                <Input
                  placeholder="e.g. @quantumjournal"
                  value={formData.handle || ''}
                  onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                  className="h-8.5 bg-surface-2 border-border text-[13px]"
                />
              </div>
            </div>

            {/* Vibe */}
            <div className="space-y-1.5">
              <Label className="text-[11px] font-medium uppercase tracking-wider text-text-quaternary">
                Editorial Vibe & Aesthetic Philosophy
              </Label>
              <Input
                placeholder="e.g. High-density theoretical physics, dark cybernetics, and crisp geometric data telemetry."
                value={formData.vibe || ''}
                onChange={(e) => setFormData({ ...formData, vibe: e.target.value })}
                className="h-8.5 bg-surface-2 border-border text-[13px]"
              />
            </div>

            {/* Color Palette */}
            <div className="space-y-2">
              <Label className="text-[11px] font-medium uppercase tracking-wider text-text-quaternary">
                Core Color Palette (Hex)
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { key: 'paper', label: 'Paper (Canvas)', def: '#0D0E12' },
                  { key: 'ink', label: 'Ink (Primary Text)', def: '#F1F3F9' },
                  { key: 'accent', label: 'Accent (Highlight)', def: '#FF4D00' },
                  { key: 'surface', label: 'Surface (Cards)', def: '#161820' },
                  { key: 'border', label: 'Border (Hairlines)', def: '#2A2D3A' },
                  { key: 'subtle', label: 'Subtle (Muted Text)', def: '#8E93A6' },
                ].map(({ key, label, def }) => (
                  <div key={key} className="space-y-1 p-2 rounded-md bg-surface-2 border border-border">
                    <span className="text-[10px] text-text-quaternary block uppercase font-mono">
                      {label}
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={(formData.palette as any)?.[key] || def}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            palette: {
                              ...formData.palette!,
                              [key]: e.target.value,
                            },
                          })
                        }
                        className="h-6 w-6 rounded border border-border bg-transparent cursor-pointer shrink-0"
                      />
                      <Input
                        value={(formData.palette as any)?.[key] || def}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            palette: {
                              ...formData.palette!,
                              [key]: e.target.value,
                            },
                          })
                        }
                        className="h-7 font-mono text-[11px] bg-background border-border uppercase"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[11px] font-medium uppercase tracking-wider text-text-quaternary">
                  Headline Font (Google Font)
                </Label>
                <Input
                  placeholder="e.g. Syne, Cinzel, Fraunces"
                  value={formData.typography?.headlineFont || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      typography: {
                        ...formData.typography!,
                        headlineFont: e.target.value,
                      },
                    })
                  }
                  className="h-8.5 bg-surface-2 border-border text-[12px]"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[11px] font-medium uppercase tracking-wider text-text-quaternary">
                  Body Font (Google Font)
                </Label>
                <Input
                  placeholder="e.g. Inter, Plus Jakarta Sans"
                  value={formData.typography?.bodyFont || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      typography: {
                        ...formData.typography!,
                        bodyFont: e.target.value,
                      },
                    })
                  }
                  className="h-8.5 bg-surface-2 border-border text-[12px]"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[11px] font-medium uppercase tracking-wider text-text-quaternary">
                  Mono Font (Google Font)
                </Label>
                <Input
                  placeholder="e.g. JetBrains Mono, Space Mono"
                  value={formData.typography?.monoFont || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      typography: {
                        ...formData.typography!,
                        monoFont: e.target.value,
                      },
                    })
                  }
                  className="h-8.5 bg-surface-2 border-border text-[12px]"
                />
              </div>
            </div>

            {/* Motif & Texture */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[11px] font-medium uppercase tracking-wider text-text-quaternary">
                  Editorial Motif
                </Label>
                <select
                  value={formData.motif || 'crosshair'}
                  onChange={(e) => setFormData({ ...formData, motif: e.target.value as any })}
                  className="h-8.5 w-full rounded-md border border-border bg-surface-2 px-3 text-[12px] text-text-secondary"
                >
                  <option value="crosshair">✛ Crosshair Reticle</option>
                  <option value="seal">印 Japanese Red Seal</option>
                  <option value="coord">Coordinate Telemetry Badge</option>
                  <option value="bracket">[ SYS_01 ] Bracket Code</option>
                  <option value="none">None (Clean Minimal)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[11px] font-medium uppercase tracking-wider text-text-quaternary">
                  Canvas Texture
                </Label>
                <select
                  value={formData.texture || 'grid'}
                  onChange={(e) => setFormData({ ...formData, texture: e.target.value as any })}
                  className="h-8.5 w-full rounded-md border border-border bg-surface-2 px-3 text-[12px] text-text-secondary"
                >
                  <option value="grid">Subtle Technical Grid</option>
                  <option value="blueprint">Engineering Blueprint</option>
                  <option value="dots">Dotted Matrix</option>
                  <option value="washi">Artisanal Washi Fiber</option>
                  <option value="none">Flat Solid Surface</option>
                </select>
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsCreateOpen(false)}
                className="h-8.5 text-[12px]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-8.5 bg-text-primary text-background hover:bg-text-secondary text-[12px] font-semibold"
              >
                Save Brand Kit Preset
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function BrandPresetCard({
  brand,
  isCustom,
  copiedKey,
  onCopy,
  onDelete,
  onUse,
}: {
  brand: BespokeBrand;
  isCustom: boolean;
  copiedKey: string | null;
  onCopy: (key: string, value: string) => void;
  onDelete?: () => void;
  onUse: () => void;
}) {
  const paletteEntries = Object.entries(brand.palette || {}).filter(
    ([, val]) => typeof val === 'string' && val.startsWith('#')
  );

  return (
    <div className="rounded-xl border border-border bg-card p-6 flex flex-col justify-between space-y-5 hover:border-border-secondary transition-all shadow-xs">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[16px] font-semibold text-text-primary tracking-tight">
                {brand.name}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-2 text-text-tertiary border border-border">
                {brand.slug}
              </span>
              {brand.motif && brand.motif !== 'none' && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-800/40">
                  {brand.motif}
                </span>
              )}
            </div>

            <p className="text-[12px] text-text-quaternary mt-0.5 flex items-center gap-1.5">
              <Globe className="h-3 w-3" />
              {brand.domain}
              {brand.handle && <span className="opacity-60">• {brand.handle}</span>}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isCustom && onDelete && (
              <button
                type="button"
                onClick={onDelete}
                title="Delete preset"
                className="p-1.5 rounded-md text-text-quaternary hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}

            <Button
              size="sm"
              onClick={onUse}
              className="h-7 text-[11px] gap-1 bg-surface-3 hover:bg-surface-4 text-text-primary border border-border"
            >
              Use in Job
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Wordmark Pill */}
        {brand.wordmark && (
          <div className="mt-3 flex items-center justify-between bg-surface-2 px-3 py-1.5 rounded-md border border-border">
            <span className="text-[10px] uppercase font-mono tracking-wider text-text-quaternary">
              Typographic Wordmark:
            </span>
            <span className="text-[12px] font-bold tracking-wider text-text-primary font-mono">
              {brand.wordmark}
            </span>
          </div>
        )}

        {/* Vibe description */}
        {brand.vibe && (
          <p className="mt-3 text-[12px] text-text-tertiary leading-relaxed italic bg-surface-2/40 p-2.5 rounded-md border border-border/40">
            "{brand.vibe}"
          </p>
        )}

        {/* Color Palette Chips */}
        <div className="mt-4">
          <span className="text-[10px] uppercase font-mono tracking-wider text-text-quaternary block mb-2">
            Palette Tokens:
          </span>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {paletteEntries.map(([key, hex]) => {
              const isCopied = copiedKey === `${brand.slug}-${key}`;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onCopy(`${brand.slug}-${key}`, hex)}
                  title={`Click to copy ${hex}`}
                  className="group flex flex-col items-center p-1.5 rounded-md border border-border bg-surface-2 hover:border-border-secondary transition-all text-center"
                >
                  <span
                    className="h-5 w-full rounded border border-black/10 shadow-xs"
                    style={{ backgroundColor: hex }}
                  />
                  <span className="text-[9px] uppercase tracking-wider text-text-quaternary mt-1 truncate w-full">
                    {key}
                  </span>
                  <span className="text-[9px] font-mono text-text-primary flex items-center gap-0.5">
                    {isCopied ? <Check className="h-2.5 w-2.5 text-emerald-400" /> : hex.slice(0, 7)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Typography Badges */}
        <div className="mt-4 pt-3 border-t border-border/60 flex flex-wrap items-center gap-2">
          <span className="text-[10px] uppercase font-mono text-text-quaternary">Type System:</span>
          {brand.typography?.headlineFont && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-surface-2 border border-border text-text-secondary">
              Headline: <strong className="text-text-primary">{brand.typography.headlineFont}</strong>
            </span>
          )}
          {brand.typography?.bodyFont && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-surface-2 border border-border text-text-secondary">
              Body: <strong className="text-text-primary">{brand.typography.bodyFont}</strong>
            </span>
          )}
          {brand.typography?.monoFont && (
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-2 border border-border text-emerald-400">
              {brand.typography.monoFont}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
