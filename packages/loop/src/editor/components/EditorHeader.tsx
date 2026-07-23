import React from 'react';
import { PLATFORMS, type PlatformId } from '../../platforms.js';

interface EditorHeaderProps {
  activeTemplate: string;
  onSwitchTemplate: (id: string) => void;
  activePlatformId: PlatformId;
  onSelectPlatform: (id: PlatformId) => void;
  exportMode: boolean;
  onToggleExportMode: (enabled: boolean) => void;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  activeTemplate,
  onSwitchTemplate,
  activePlatformId,
  onSelectPlatform,
  exportMode,
  onToggleExportMode,
}) => {
  return (
    <header style={{ background: '#0F172A', borderBottom: '1px solid #1E293B', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <h1 style={{ color: '#F8FAFC', fontSize: 18, fontWeight: 700, margin: 0 }}>LoopReel Studio</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { id: 'paper-of-record', label: 'Paper of Record' },
            { id: 'the-globalist', label: 'The Globalist' },
            { id: 'the-terminal', label: 'The Terminal' },
            { id: 'the-curator', label: 'The Curator' },
            { id: 'the-academic', label: 'The Academic' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => onSwitchTemplate(t.id)}
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                border: 'none',
                background: activeTemplate === t.id ? '#38BDF8' : '#1E293B',
                color: activeTemplate === t.id ? '#0F172A' : '#94A3B8',
                fontWeight: 600,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <select
          value={activePlatformId}
          onChange={(e) => onSelectPlatform(e.target.value as PlatformId)}
          style={{ background: '#1E293B', color: '#F8FAFC', border: '1px solid #334155', borderRadius: 6, padding: '6px 12px', fontSize: 13 }}
        >
          {Object.entries(PLATFORMS).map(([id, platform]) => (
            <option key={id} value={id}>
              {platform.name} ({platform.aspectRatio})
            </option>
          ))}
        </select>

        <button
          onClick={() => onToggleExportMode(!exportMode)}
          style={{
            padding: '6px 16px',
            borderRadius: 6,
            border: 'none',
            background: exportMode ? '#EF4444' : '#10B981',
            color: '#FFF',
            fontWeight: 600,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          {exportMode ? 'Exit Export' : 'Export Mode'}
        </button>
      </div>
    </header>
  );
};
