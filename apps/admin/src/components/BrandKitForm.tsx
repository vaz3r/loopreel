import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Bookmark, Download, Check } from 'lucide-react';

export interface BrandKitValues {
  bg?: string;
  text?: string;
  accent?: string;
  surface?: string;
  fontSerif?: string;
  fontSans?: string;
  fontMono?: string;
  wordmark?: string;
  handle?: string;
  wordmarkStyle?: 'serif' | 'sans' | 'mono' | 'small-caps';
  logoUrl?: string;
}

export function BrandKitForm({
  value,
  onChange,
}: {
  value: BrandKitValues;
  onChange: (v: BrandKitValues) => void;
}) {
  const [savedSuccess, setSavedSuccess] = useState(false);

  function update(key: keyof BrandKitValues, val: string) {
    onChange({ ...value, [key]: val || undefined });
  }

  function handleSavePreset() {
    try {
      localStorage.setItem('loopreel_saved_brandkit', JSON.stringify(value));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    } catch {
      // ignore storage errors
    }
  }

  function handleLoadPreset() {
    try {
      const saved = localStorage.getItem('loopreel_saved_brandkit');
      if (saved) {
        onChange(JSON.parse(saved));
      }
    } catch {
      // ignore storage errors
    }
  }

  const hasSavedPreset = typeof window !== 'undefined' && Boolean(localStorage.getItem('loopreel_saved_brandkit'));

  return (
    <div className="space-y-4">
      {/* Preset Action Header */}
      <div className="flex items-center justify-between pb-2 border-b border-border">
        <span className="text-[11px] font-semibold uppercase tracking-[0.05em] text-text-tertiary">
          Brand Identity &amp; Colors
        </span>
        <div className="flex items-center gap-2">
          {hasSavedPreset && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleLoadPreset}
              className="h-7 text-[11px] px-2.5 gap-1 border-border text-text-secondary hover:text-text-primary"
            >
              <Download className="h-3 w-3" />
              Load Preset
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSavePreset}
            className="h-7 text-[11px] px-2.5 gap-1 border-border text-text-secondary hover:text-text-primary"
          >
            {savedSuccess ? <Check className="h-3 w-3 text-emerald-400" /> : <Bookmark className="h-3 w-3" />}
            {savedSuccess ? 'Saved!' : 'Save Preset'}
          </Button>
        </div>
      </div>

      {/* Typographic Identity Section */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-[11px] font-medium text-text-tertiary">Publication Wordmark</Label>
          <Input
            value={value.wordmark ?? ''}
            onChange={(e) => update('wordmark', e.target.value)}
            placeholder="e.g. THE DAILY DISPATCH"
            className="h-8 text-[12px] bg-surface-2 border-border text-text-secondary placeholder:text-text-quaternary"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-[11px] font-medium text-text-tertiary">Social Handle</Label>
          <Input
            value={value.handle ?? ''}
            onChange={(e) => update('handle', e.target.value)}
            placeholder="e.g. @dailydispatch"
            className="h-8 text-[12px] bg-surface-2 border-border text-text-secondary placeholder:text-text-quaternary"
          />
        </div>
      </div>

      {/* Colors Section */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { key: 'bg' as const, label: 'Background', placeholder: '#0F172A' },
          { key: 'text' as const, label: 'Text', placeholder: '#F8FAFC' },
          { key: 'accent' as const, label: 'Accent', placeholder: '#38BDF8' },
        ].map(({ key, label, placeholder }) => (
          <div key={key} className="space-y-1.5">
            <Label className="text-[11px] font-medium text-text-tertiary">{label}</Label>
            <div className="flex gap-1.5">
              <input
                type="color"
                value={value[key] ?? placeholder}
                onChange={(e) => update(key, e.target.value)}
                className="h-8 w-8 shrink-0 cursor-pointer rounded border border-border bg-surface-2 p-0"
              />
              <Input
                value={value[key] ?? ''}
                onChange={(e) => update(key, e.target.value)}
                placeholder={placeholder}
                className="h-8 text-[12px] bg-surface-2 border-border font-mono text-text-secondary"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Fonts Section */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-[11px] font-medium text-text-tertiary">Headline Font</Label>
          <Input
            value={value.fontSerif ?? ''}
            onChange={(e) => update('fontSerif', e.target.value)}
            placeholder="e.g. Playfair Display / Geist"
            className="h-8 text-[12px] bg-surface-2 border-border text-text-secondary placeholder:text-text-quaternary"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-[11px] font-medium text-text-tertiary">Body / UI Font</Label>
          <Input
            value={value.fontSans ?? ''}
            onChange={(e) => update('fontSans', e.target.value)}
            placeholder="e.g. Inter"
            className="h-8 text-[12px] bg-surface-2 border-border text-text-secondary placeholder:text-text-quaternary"
          />
        </div>
      </div>
    </div>
  );
}
