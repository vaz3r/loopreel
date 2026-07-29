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
        <div className="space-y-2">
          <Label className="text-xs">Background</Label>
          <div className="flex gap-2">
            <input
              type="color"
              value={value.bg ?? '#000000'}
              onChange={(e) => update('bg', e.target.value)}
              className="h-9 w-9 shrink-0 cursor-pointer rounded border bg-transparent"
            />
            <Input
              value={value.bg ?? ''}
              onChange={(e) => update('bg', e.target.value)}
              placeholder="#000000"
              className="h-9 text-xs"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Text</Label>
          <div className="flex gap-2">
            <input
              type="color"
              value={value.text ?? '#ffffff'}
              onChange={(e) => update('text', e.target.value)}
              className="h-9 w-9 shrink-0 cursor-pointer rounded border bg-transparent"
            />
            <Input
              value={value.text ?? ''}
              onChange={(e) => update('text', e.target.value)}
              placeholder="#ffffff"
              className="h-9 text-xs"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Accent</Label>
          <div className="flex gap-2">
            <input
              type="color"
              value={value.accent ?? '#6366f1'}
              onChange={(e) => update('accent', e.target.value)}
              className="h-9 w-9 shrink-0 cursor-pointer rounded border bg-transparent"
            />
            <Input
              value={value.accent ?? ''}
              onChange={(e) => update('accent', e.target.value)}
              placeholder="#6366f1"
              className="h-9 text-xs"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label className="text-xs">Serif Font</Label>
          <Input
            value={value.fontSerif ?? ''}
            onChange={(e) => update('fontSerif', e.target.value)}
            placeholder="e.g. Playfair Display"
            className="h-9 text-xs"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Sans Font</Label>
          <Input
            value={value.fontSans ?? ''}
            onChange={(e) => update('fontSans', e.target.value)}
            placeholder="e.g. Inter"
            className="h-9 text-xs"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label className="text-xs">Logo URL</Label>
        <Input
          value={value.logoUrl ?? ''}
          onChange={(e) => update('logoUrl', e.target.value)}
          placeholder="https://example.com/logo.png"
          className="h-9 text-xs"
        />
      </div>
    </div>
  );
}


