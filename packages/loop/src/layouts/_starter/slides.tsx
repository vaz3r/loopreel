import React from 'react';
import type { LayoutProps } from '../shared/types';

export function Cover({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', gap: 24 }}>
      {s.tag && (
        <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-color, #38bdf8)' }}>
          {s.tag}
        </span>
      )}
      <h1 style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', margin: 0 }}>
        {s.headline}
      </h1>
      {s.subheadline && (
        <h2 style={{ fontSize: 24, fontWeight: 400, opacity: 0.8, lineHeight: 1.4, margin: 0 }}>
          {s.subheadline}
        </h2>
      )}
      {(s.authorName || s.authorRole) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16 }}>
          {s.authorName && <span style={{ fontWeight: 600, fontSize: 18 }}>{s.authorName}</span>}
          {s.authorRole && <span style={{ opacity: 0.6, fontSize: 16 }}>• {s.authorRole}</span>}
        </div>
      )}
    </div>
  );
}

export function Sequence({ slide }: LayoutProps) {
  const s = slide as any;
  const steps = s.steps || s.items || [];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 32 }}>
      <div>
        <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
          {s.title || s.headline}
        </h2>
        {s.description && (
          <p style={{ fontSize: 20, opacity: 0.75, marginTop: 8, margin: 0 }}>{s.description}</p>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, justifyContent: 'center' }}>
        {steps.map((step: any, idx: number) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 20,
              padding: '20px 24px',
              borderRadius: 12,
              background: 'var(--surface-color, rgba(255, 255, 255, 0.05))',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: 8,
                background: 'var(--accent-color, #38bdf8)',
                color: '#000',
                fontWeight: 800,
                fontSize: 16,
                flexShrink: 0,
              }}
            >
              {idx + 1}
            </span>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{step.label || step.title || step}</div>
              {step.detail && <div style={{ fontSize: 16, opacity: 0.75, marginTop: 4 }}>{step.detail}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Telemetry({ slide }: LayoutProps) {
  const s = slide as any;
  const metrics = s.metrics || s.variables || [
    { label: s.variableA_label || 'Metric 1', value: s.variableA_value || '94%' },
    { label: s.variableB_label || 'Metric 2', value: s.variableB_value || '3.2x' },
    { label: s.variableC_label || 'Metric 3', value: s.variableC_value || '$10M' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 32 }}>
      <div>
        <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
          {s.headline || s.title}
        </h2>
        {s.subheadline && <p style={{ fontSize: 20, opacity: 0.75, marginTop: 8, margin: 0 }}>{s.subheadline}</p>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1, justifyContent: 'center' }}>
        {metrics.map((m: any, idx: number) => (
          <div
            key={idx}
            style={{
              padding: '28px 32px',
              borderRadius: 16,
              background: 'var(--surface-color, rgba(255, 255, 255, 0.05))',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: 20, fontWeight: 600, opacity: 0.85 }}>{m.label}</span>
            <span style={{ fontSize: 48, fontWeight: 800, color: 'var(--accent-color, #38bdf8)', letterSpacing: '-0.03em' }}>
              {m.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Quote({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', gap: 32 }}>
      <span style={{ fontSize: 72, fontWeight: 900, color: 'var(--accent-color, #38bdf8)', lineHeight: 0.5 }}>
        &ldquo;
      </span>
      <blockquote style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.35, margin: 0 }}>
        {s.quote || s.headline}
      </blockquote>
      <div style={{ borderTop: '2px solid var(--accent-color, #38bdf8)', paddingTop: 16, width: 80 }} />
      <div>
        <div style={{ fontSize: 20, fontWeight: 700 }}>{s.author || s.attribution}</div>
        {s.role && <div style={{ fontSize: 16, opacity: 0.65, marginTop: 4 }}>{s.role}</div>}
      </div>
    </div>
  );
}

export function Cta({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', gap: 24 }}>
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          background: 'var(--accent-color, #38bdf8)',
          color: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
          fontWeight: 800,
        }}
      >
        ✦
      </div>
      <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.02em', margin: 0, maxWidth: 800 }}>
        {s.headline || 'Ready to Dive Deeper?'}
      </h2>
      <p style={{ fontSize: 22, opacity: 0.8, margin: 0, maxWidth: 650, lineHeight: 1.4 }}>
        {s.subtext || s.description || 'Follow for daily insights and frameworks.'}
      </p>
      {s.action && (
        <div
          style={{
            marginTop: 12,
            padding: '16px 36px',
            borderRadius: 30,
            background: 'var(--accent-color, #38bdf8)',
            color: '#000',
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          {s.action}
        </div>
      )}
    </div>
  );
}
