import React from 'react';
import type { LayoutProps } from '../shared/types';

export function Cover({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', gap: 32 }}>
      {s.tag && (
        <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-color, #38bdf8)' }}>
          {s.tag}
        </span>
      )}
      <h1 style={{ fontSize: 'clamp(72px, 8.5vw, 96px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', margin: 0, textWrap: 'balance' }}>
        {s.headline}
      </h1>
      {s.subheadline && (
        <h2 style={{ fontSize: 'clamp(26px, 3.2vw, 34px)', fontWeight: 400, opacity: 0.85, lineHeight: 1.4, margin: 0, maxWidth: '90%' }}>
          {s.subheadline}
        </h2>
      )}
      {(s.authorName || s.authorRole) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255, 255, 255, 0.15)', width: '70%' }}>
          {s.authorName && <span style={{ fontWeight: 700, fontSize: 20 }}>{s.authorName}</span>}
          {s.authorRole && <span style={{ opacity: 0.65, fontSize: 18 }}>• {s.authorRole}</span>}
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
        <h2 style={{ fontSize: 52, fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
          {s.title || s.headline}
        </h2>
        {s.description && (
          <p style={{ fontSize: 24, opacity: 0.75, marginTop: 10, margin: 0 }}>{s.description}</p>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1, justifyContent: 'space-between' }}>
        {steps.map((step: any, idx: number) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              padding: '24px 28px',
              borderRadius: 14,
              background: 'var(--surface-color, rgba(255, 255, 255, 0.05))',
              flex: 1,
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                borderRadius: 10,
                background: 'var(--accent-color, #38bdf8)',
                color: '#000',
                fontWeight: 800,
                fontSize: 18,
                flexShrink: 0,
              }}
            >
              {idx + 1}
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 24, fontWeight: 700 }}>{step.label || step.title || step}</div>
              {step.detail && <div style={{ fontSize: 18, opacity: 0.75, marginTop: 4 }}>{step.detail}</div>}
              {step.desc && <div style={{ fontSize: 18, opacity: 0.75, marginTop: 4 }}>{step.desc}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Telemetry({ slide }: LayoutProps) {
  const s = slide as any;
  const metrics = s.stats?.map((st: any) => ({
    label: st.label,
    value: st.unit ? `${st.value} ${st.unit}` : st.value,
  })) || s.metrics || s.variables || [
    { label: s.variableA_label || 'Metric 1', value: s.variableA_value || '94%' },
    { label: s.variableB_label || 'Metric 2', value: s.variableB_value || '3.2x' },
    { label: s.variableC_label || 'Metric 3', value: s.variableC_value || '$10M' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 32 }}>
      <div>
        <h2 style={{ fontSize: 52, fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
          {s.headline || s.title}
        </h2>
        {s.subheadline && <p style={{ fontSize: 24, opacity: 0.75, marginTop: 10, margin: 0 }}>{s.subheadline}</p>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 1, justifyContent: 'space-between' }}>
        {metrics.map((m: any, idx: number) => (
          <div
            key={idx}
            style={{
              padding: metrics.length <= 2 ? '40px 48px' : '28px 36px',
              borderRadius: 16,
              background: 'var(--surface-color, rgba(255, 255, 255, 0.05))',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flex: 1,
            }}
          >
            <span style={{ fontSize: metrics.length <= 2 ? 28 : 22, fontWeight: 600, opacity: 0.9, maxWidth: '65%' }}>{m.label}</span>
            <span style={{ fontSize: metrics.length <= 2 ? 72 : 54, fontWeight: 800, color: 'var(--accent-color, #38bdf8)', letterSpacing: '-0.03em' }}>
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
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', gap: 36 }}>
      <span style={{ fontSize: 96, fontWeight: 900, color: 'var(--accent-color, #38bdf8)', lineHeight: 0.5 }}>
        &ldquo;
      </span>
      <blockquote style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', fontWeight: 700, lineHeight: 1.3, margin: 0 }}>
        {s.quote || s.headline}
      </blockquote>
      <div style={{ borderTop: '3px solid var(--accent-color, #38bdf8)', paddingTop: 20, width: 100 }} />
      <div>
        <div style={{ fontSize: 24, fontWeight: 700 }}>{s.author || s.attribution}</div>
        {s.role && <div style={{ fontSize: 18, opacity: 0.65, marginTop: 6 }}>{s.role}</div>}
      </div>
    </div>
  );
}

export function Cta({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', gap: 32 }}>
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 36,
          background: 'var(--accent-color, #38bdf8)',
          color: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 32,
          fontWeight: 800,
        }}
      >
        ✦
      </div>
      <h2 style={{ fontSize: 'clamp(52px, 6.5vw, 68px)', fontWeight: 800, letterSpacing: '-0.02em', margin: 0, maxWidth: 880, textWrap: 'balance' }}>
        {s.headline || 'Ready to Dive Deeper?'}
      </h2>
      <p style={{ fontSize: 26, opacity: 0.85, margin: 0, maxWidth: 720, lineHeight: 1.45 }}>
        {s.subtext || s.description || 'Follow for daily insights and frameworks.'}
      </p>
      {(s.action || s.actionLabel) && (
        <div
          style={{
            marginTop: 16,
            padding: '20px 52px',
            borderRadius: 36,
            background: 'var(--accent-color, #38bdf8)',
            color: '#000',
            fontWeight: 800,
            fontSize: 22,
          }}
        >
          {s.action || s.actionLabel}
        </div>
      )}
    </div>
  );
}

export function MythFact({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 32 }}>
      <div>
        {s.tag && (
          <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-color, #38bdf8)' }}>
            {s.tag}
          </span>
        )}
        <h2 style={{ fontSize: 50, fontWeight: 800, letterSpacing: '-0.02em', margin: '8px 0 0' }}>
          {s.headline}
        </h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 1, justifyContent: 'space-between' }}>
        <div style={{ padding: '36px 40px', borderRadius: 18, background: 'rgba(239, 68, 68, 0.1)', borderLeft: '6px solid #ef4444', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#ef4444', marginBottom: 12 }}>
            The Common Myth
          </div>
          <div style={{ fontSize: 26, opacity: 0.9, lineHeight: 1.45 }}>
            {s.myth}
          </div>
        </div>
        <div style={{ padding: '36px 40px', borderRadius: 18, background: 'rgba(56, 189, 248, 0.12)', borderLeft: '6px solid var(--accent-color, #38bdf8)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-color, #38bdf8)', marginBottom: 12 }}>
            The Reality
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.45 }}>
            {s.fact}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Timeline({ slide }: LayoutProps) {
  const s = slide as any;
  const events = s.events || [];
  const isSingle = events.length === 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: isSingle ? 'center' : 'flex-start', gap: isSingle ? 40 : 28 }}>
      <div>
        {s.tag && (
          <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-color, #38bdf8)' }}>
            {s.tag}
          </span>
        )}
        <h2 style={{ fontSize: isSingle ? 58 : 50, fontWeight: 800, letterSpacing: '-0.02em', margin: '8px 0 0' }}>
          {s.headline}
        </h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: isSingle ? '0 0 auto' : 1, justifyContent: 'space-between' }}>
        {events.map((evt: any, idx: number) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              flexDirection: isSingle ? 'column' : 'row',
              justifyContent: 'center',
              gap: isSingle ? 24 : 28,
              padding: isSingle ? '52px 48px' : '24px 28px',
              borderRadius: 18,
              background: evt.highlight ? 'rgba(56, 189, 248, 0.12)' : 'var(--surface-color, rgba(255, 255, 255, 0.05))',
              borderLeft: evt.highlight ? '8px solid var(--accent-color, #38bdf8)' : '8px solid transparent',
              alignItems: isSingle ? 'flex-start' : 'center',
            }}
          >
            {(evt.date || evt.time || evt.phase) && (
              <span style={{ fontSize: isSingle ? 26 : 16, fontWeight: 800, color: 'var(--accent-color, #38bdf8)', minWidth: isSingle ? 'auto' : 100 }}>
                {evt.date || evt.time || evt.phase}
              </span>
            )}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: isSingle ? 36 : 22, fontWeight: 700, lineHeight: 1.25 }}>{evt.title || evt.label}</div>
              {evt.desc && <div style={{ fontSize: isSingle ? 26 : 18, opacity: 0.85, marginTop: 14, lineHeight: 1.5 }}>{evt.desc}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ImageSplit({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 24 }}>
      <div>
        {s.tag && (
          <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-color, #38bdf8)' }}>
            {s.tag}
          </span>
        )}
        <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.02em', margin: '8px 0 0' }}>
          {s.headline}
        </h2>
      </div>
      {s.imageUrl && (
        <div style={{ flex: 1, borderRadius: 16, overflow: 'hidden', position: 'relative' }}>
          <img src={s.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {s.credit && (
            <span style={{ position: 'absolute', bottom: 12, right: 12, fontSize: 12, opacity: 0.6, background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: 4 }}>
              {s.credit}
            </span>
          )}
        </div>
      )}
      {s.bodyText && (
        <p style={{ fontSize: 20, opacity: 0.85, lineHeight: 1.45, margin: 0 }}>
          {s.bodyText}
        </p>
      )}
    </div>
  );
}

export function Quadrant({ slide }: LayoutProps) {
  const s = slide as any;
  const highlight = s.highlight || 'topRight';
  const cells = [
    { key: 'topLeft', data: s.topLeft },
    { key: 'topRight', data: s.topRight },
    { key: 'bottomLeft', data: s.bottomLeft },
    { key: 'bottomRight', data: s.bottomRight },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 24 }}>
      <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
        {s.headline}
      </h2>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 16, position: 'relative' }}>
        {cells.map(({ key, data }) => {
          const isH = key === highlight;
          return (
            <div
              key={key}
              style={{
                padding: '24px',
                borderRadius: 16,
                background: isH ? 'rgba(56, 189, 248, 0.15)' : 'var(--surface-color, rgba(255, 255, 255, 0.05))',
                border: isH ? '2px solid var(--accent-color, #38bdf8)' : '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px 0', color: isH ? 'var(--accent-color, #38bdf8)' : 'inherit' }}>
                {data.title}
              </h3>
              <p style={{ fontSize: 16, opacity: 0.75, margin: 0, lineHeight: 1.4 }}>
                {data.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CaseStudy({ slide }: LayoutProps) {
  const s = slide as any;
  const stages = s.stages || [];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 24 }}>
      <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
        {s.headline}
      </h2>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'center' }}>
        {stages.map((st: any, idx: number) => (
          <div
            key={idx}
            style={{
              padding: '20px 24px',
              borderRadius: 14,
              background: st.highlighted ? 'rgba(56, 189, 248, 0.12)' : 'var(--surface-color, rgba(255, 255, 255, 0.05))',
              borderLeft: st.highlighted ? '4px solid var(--accent-color, #38bdf8)' : '4px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-color, #38bdf8)', marginBottom: 6 }}>
              {st.label}
            </div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{st.title}</div>
            <div style={{ fontSize: 16, opacity: 0.75, marginTop: 4 }}>{st.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Interview({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 32, justifyContent: 'center' }}>
      <h2 style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
        {s.headline}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', gap: 16 }}>
          <span style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent-color, #38bdf8)' }}>Q.</span>
          <p style={{ fontSize: 22, fontWeight: 600, margin: 0, lineHeight: 1.4 }}>{s.question}</p>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <span style={{ fontSize: 24, fontWeight: 800, opacity: 0.6 }}>A.</span>
          <div>
            <p style={{ fontSize: 20, opacity: 0.85, margin: '0 0 16px 0', lineHeight: 1.5 }}>{s.answer}</p>
            <div style={{ fontSize: 14, fontWeight: 700, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {s.respondentName} {s.respondentRole && `• ${s.respondentRole}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ResourceGrid({ slide }: LayoutProps) {
  const s = slide as any;
  const items = s.items || [];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 24 }}>
      <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
        {s.headline}
      </h2>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 16 }}>
        {items.map((it: any, idx: number) => (
          <div
            key={idx}
            style={{
              padding: '20px',
              borderRadius: 14,
              background: 'var(--surface-color, rgba(255, 255, 255, 0.05))',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--accent-color, #38bdf8)', marginBottom: 8 }}>
              {it.num || `0${idx + 1}`}
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{it.title}</div>
            <div style={{ fontSize: 15, opacity: 0.75, lineHeight: 1.4 }}>{it.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroMetric({ slide }: LayoutProps) {
  const s = slide as any;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', gap: 24 }}>
      {s.tag && (
        <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-color, #38bdf8)' }}>
          {s.tag}
        </span>
      )}
      <div style={{ fontSize: 130, fontWeight: 900, lineHeight: 1, color: 'var(--accent-color, #38bdf8)', letterSpacing: '-0.04em' }}>
        {s.value}
        {s.unit && <span style={{ fontSize: 48, fontWeight: 700, marginLeft: 8 }}>{s.unit}</span>}
      </div>
      <h3 style={{ fontSize: 32, fontWeight: 800, margin: 0, maxWidth: 700 }}>
        {s.headline}
      </h3>
      {s.bodyText && (
        <p style={{ fontSize: 20, opacity: 0.8, margin: 0, maxWidth: 650, lineHeight: 1.45 }}>
          {s.bodyText}
        </p>
      )}
    </div>
  );
}
