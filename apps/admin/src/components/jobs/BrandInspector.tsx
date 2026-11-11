import { useEffect, useState } from 'react';
import { Palette, Type, Sparkles, Copy, Check, BookmarkPlus, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { saveBrandPreset } from '@/lib/brand-presets';
import type { BespokeBrand } from '@/api/client';

export function BrandInspector({ brand }: { brand?: BespokeBrand }) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  // Invalidate and inject google fonts link if provided
  useEffect(() => {
    if (!brand?.typography?.googleFontsUrl) return;
    const existing = document.getElementById('bespoke-brand-fonts');
    if (existing) {
      existing.setAttribute('href', brand.typography.googleFontsUrl);
    } else {
      const link = document.createElement('link');
      link.id = 'bespoke-brand-fonts';
      link.rel = 'stylesheet';
      link.href = brand.typography.googleFontsUrl;
      document.head.appendChild(link);
    }
  }, [brand?.typography?.googleFontsUrl]);

  if (!brand) return null;

  async function copyToClipboard(key: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      toast.success(`Copied ${value} (${key}) to clipboard`);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      toast.error('Failed to copy to clipboard');
    }
  }

  const paletteEntries = Object.entries(brand.palette || {}).filter(
    ([, val]) => typeof val === 'string' && val.startsWith('#')
  );

  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-text-primary">
              {brand.name}
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-2 text-text-tertiary border border-border">
              {brand.slug}
            </span>
            {brand.motif && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/40 text-emerald-300 border border-emerald-800/40">
                motif: {brand.motif}
              </span>
            )}
          </div>
          <p className="text-[12px] text-text-quaternary mt-0.5">{brand.domain}</p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {brand.wordmark && (
            <div className="flex items-center gap-2 bg-surface-2 px-3 py-1.5 rounded-md border border-border">
              <span className="text-[10px] uppercase font-mono tracking-wider text-text-quaternary">
                Wordmark:
              </span>
              <span className="text-[13px] font-bold tracking-wider text-text-primary">
                {brand.wordmark}
              </span>
            </div>
          )}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              saveBrandPreset(brand);
              setIsSaved(true);
              toast.success(`Saved "${brand.name}" to your Brand Kits!`);
              setTimeout(() => setIsSaved(false), 3000);
            }}
            className="h-8 text-[12px] gap-1.5 border-border bg-surface-2 hover:bg-surface-3 text-text-secondary hover:text-text-primary"
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="h-3.5 w-3.5 text-emerald-400" />
                Saved Preset
              </>
            ) : (
              <>
                <BookmarkPlus className="h-3.5 w-3.5 text-emerald-400" />
                Save as Brand Preset
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Brand Vibe / Art Direction Brief */}
      {brand.vibe && (
        <div className="bg-surface-2/60 rounded-md p-3.5 border border-border/60">
          <div className="flex items-center gap-1.5 mb-1 text-[11px] font-medium uppercase tracking-[0.05em] text-text-tertiary">
            <Sparkles className="h-3 w-3 text-emerald-400" />
            Editorial Vibe & Aesthetic Direction
          </div>
          <p className="text-[13px] text-text-secondary leading-relaxed italic">
            "{brand.vibe}"
          </p>
        </div>
      )}

      {/* Palette & Typography 2-Col Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
        {/* Color Palette */}
        <div>
          <div className="flex items-center gap-1.5 mb-3">
            <Palette className="h-3.5 w-3.5 text-text-tertiary" />
            <h4 className="text-[11px] font-medium uppercase tracking-[0.05em] text-text-quaternary">
              Curated Color Palette
            </h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {paletteEntries.map(([key, hex]) => {
              const isCopied = copiedKey === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => copyToClipboard(key, hex)}
                  title={`Click to copy ${hex}`}
                  className="group relative flex items-center gap-2.5 p-2 rounded-lg border border-border bg-surface-2 hover:border-border-secondary transition-all text-left"
                >
                  <span
                    className="h-7 w-7 rounded-md shrink-0 border border-black/10 shadow-sm"
                    style={{ backgroundColor: hex }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase tracking-wider text-text-quaternary truncate">
                      {key}
                    </p>
                    <p className="text-[11px] font-mono font-medium text-text-primary truncate">
                      {hex}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity pr-1 text-text-quaternary">
                    {isCopied ? (
                      <Check className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Typography */}
        <div>
          <div className="flex items-center gap-1.5 mb-3">
            <Type className="h-3.5 w-3.5 text-text-tertiary" />
            <h4 className="text-[11px] font-medium uppercase tracking-[0.05em] text-text-quaternary">
              Typography System
            </h4>
          </div>

          <div className="space-y-2.5">
            {brand.typography?.headlineFont && (
              <div className="p-3 rounded-lg border border-border bg-surface-2">
                <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-wider text-text-quaternary mb-1">
                  <span>Headline</span>
                  <span>{brand.typography.headlineFont}</span>
                </div>
                <p
                  className="text-[17px] font-bold text-text-primary tracking-tight truncate"
                  style={{ fontFamily: brand.typography.headlineFont }}
                >
                  {brand.name}: Editorial Standard
                </p>
              </div>
            )}

            {brand.typography?.bodyFont && (
              <div className="p-3 rounded-lg border border-border bg-surface-2">
                <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-wider text-text-quaternary mb-1">
                  <span>Body</span>
                  <span>{brand.typography.bodyFont}</span>
                </div>
                <p
                  className="text-[13px] text-text-secondary leading-snug truncate"
                  style={{ fontFamily: brand.typography.bodyFont }}
                >
                  High-signal editorial reporting engineered for clarity and visual authority.
                </p>
              </div>
            )}

            {brand.typography?.monoFont && (
              <div className="p-3 rounded-lg border border-border bg-surface-2">
                <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-wider text-text-quaternary mb-1">
                  <span>Telemetry & Mono</span>
                  <span>{brand.typography.monoFont}</span>
                </div>
                <p
                  className="text-[12px] font-mono text-emerald-400 tracking-wider truncate"
                  style={{ fontFamily: brand.typography.monoFont }}
                >
                  $1,250 • +38.4% YOY • LATENCY 14MS
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
