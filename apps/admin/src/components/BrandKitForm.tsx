import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BrandKitValues {
  bg?: string;
  text?: string;
  accent?: string;
  fontSerif?: string;
  fontSans?: string;
  logoUrl?: string;
}

export function BrandKitForm({ value, onChange }: { value: BrandKitValues; onChange: (v: BrandKitValues) => void }) {
  function update(key: keyof BrandKitValues, val: string) {
    onChange({ ...value, [key]: val || undefined });
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {[
          { key: 'bg' as const, label: 'Background', placeholder: '#000000' },
          { key: 'text' as const, label: 'Text', placeholder: '#ffffff' },
          { key: 'accent' as const, label: 'Accent', placeholder: '#6366f1' },
        ].map(({ key, label, placeholder }) => (
          <div key={key} className="space-y-1.5">
            <Label className="text-[11px] font-medium text-text-tertiary">{label}</Label>
            <div className="flex gap-1.5">
              <input
                type="color"
                value={value[key] ?? placeholder}
                onChange={(e) => update(key, e.target.value)}
                className="h-8 w-8 shrink-0 cursor-pointer rounded border border-border bg-surface-2"
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
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-[11px] font-medium text-text-tertiary">Serif Font</Label>
          <Input
            value={value.fontSerif ?? ''}
            onChange={(e) => update('fontSerif', e.target.value)}
            placeholder="e.g. Playfair Display"
            className="h-8 text-[12px] bg-surface-2 border-border text-text-secondary"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-[11px] font-medium text-text-tertiary">Sans Font</Label>
          <Input
            value={value.fontSans ?? ''}
            onChange={(e) => update('fontSans', e.target.value)}
            placeholder="e.g. Inter"
            className="h-8 text-[12px] bg-surface-2 border-border text-text-secondary"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label className="text-[11px] font-medium text-text-tertiary">Logo URL</Label>
        <Input
          value={value.logoUrl ?? ''}
          onChange={(e) => update('logoUrl', e.target.value)}
          placeholder="https://example.com/logo.png"
          className="h-8 text-[12px] bg-surface-2 border-border text-text-secondary"
        />
      </div>
    </div>
  );
}
