/**
 * Smart Components — Semantic building blocks that auto-size correctly.
 *
 * Templates use these instead of raw HTML + data attributes.
 * Each component knows its role and applies the right sizing rules.
 *
 * Usage:
 *   import { SmartHeadline, SmartBody, SmartTimeline } from '../engine/smart-components.js';
 *
 *   <SmartHeadline tag="h1" fontFamily={theme.fontSerif}>{slide.headline}</SmartHeadline>
 *   <SmartBody fontFamily={theme.fontSans}>{slide.definition}</SmartBody>
 *   <SmartTimeline>{events.map(...)}</SmartTimeline>
 */
import React from 'react';

/* ─── Role definitions ─── */

export interface SmartTextProps {
  children: React.ReactNode;
  fontFamily?: string;
  fontWeight?: number;
  fontStyle?: string;
  color?: string;
  lineHeight?: number;
  letterSpacing?: string;
  textAlign?: React.CSSProperties['textAlign'];
  maxWidth?: number | string;
  style?: React.CSSProperties;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div' | 'blockquote';
  className?: string;
}

/**
 * SmartHeadline — Main slide heading.
 * Auto-sizes to fill container width (single-line).
 * Range: 48–130px.
 */
export function SmartHeadline({
  children, fontFamily, fontWeight = 400, fontStyle,
  color, lineHeight = 1.1, letterSpacing = '-0.02em',
  textAlign, maxWidth, style, tag = 'h2', className,
}: SmartTextProps) {
  const Tag = tag as any;
  return (
    <Tag
      data-smart-fit="data-smart-fit"
      data-smart-fit-mode="width"
      data-smart-fit-min="48"
      data-smart-fit-max="130"
      className={className}
      style={{
        fontFamily, fontWeight, fontStyle, lineHeight, letterSpacing,
        color, textAlign, maxWidth, margin: 0, ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/**
 * SmartSubheadline — Secondary heading or subtitle.
 * Auto-sizes to fill container width (single-line).
 * Range: 24–48px.
 */
export function SmartSubheadline({
  children, fontFamily, fontWeight = 400, fontStyle,
  color, lineHeight = 1.3, letterSpacing,
  textAlign, maxWidth, style, tag = 'h3', className,
}: SmartTextProps) {
  const Tag = tag as any;
  return (
    <Tag
      data-smart-fit="data-smart-fit"
      data-smart-fit-mode="width"
      data-smart-fit-min="24"
      data-smart-fit-max="48"
      className={className}
      style={{
        fontFamily, fontWeight, fontStyle, lineHeight, letterSpacing,
        color, textAlign, maxWidth, margin: 0, ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/**
 * SmartBody — Body text / descriptions.
 * Auto-sizes to fit within a box (multiline).
 * Range: 18–32px.
 */
export function SmartBody({
  children, fontFamily, fontWeight = 300, fontStyle,
  color, lineHeight = 1.5, letterSpacing,
  textAlign, maxWidth, maxLines, style, tag = 'p', className,
}: SmartTextProps & { maxLines?: number }) {
  const Tag = tag as any;
  const attrs: Record<string, string> = {
    'data-smart-fit': 'data-smart-fit',
    'data-smart-fit-mode': 'box',
    'data-smart-fit-min': '18',
    'data-smart-fit-max': '32',
  };
  if (maxLines) attrs['data-smart-fit-max-lines'] = String(maxLines);
  return (
    <Tag
      {...attrs}
      className={className}
      style={{
        fontFamily, fontWeight, fontStyle, lineHeight, letterSpacing,
        color, textAlign, maxWidth, margin: 0, ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/**
 * SmartLabel — Small labels, dates, metadata.
 * Fixed size (no auto-sizing). Always readable at 20px.
 */
export function SmartLabel({
  children, fontFamily, fontWeight = 400,
  color, lineHeight = 1.4, letterSpacing,
  textAlign, maxWidth, style, tag = 'span', className,
}: SmartTextProps) {
  const Tag = tag as any;
  return (
    <Tag
      className={className}
      style={{
        fontFamily, fontSize: 20, fontWeight, lineHeight, letterSpacing,
        color, textAlign, maxWidth, ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/**
 * SmartStat — Stat/number values in telemetry grids.
 * Auto-sizes to fit cell width (single-line).
 * Range: 32–80px.
 */
export function SmartStat({
  children, fontFamily, fontWeight = 300, fontStyle,
  color, lineHeight = 1, letterSpacing,
  textAlign, maxWidth, style, tag = 'span', className,
}: SmartTextProps) {
  const Tag = tag as any;
  return (
    <Tag
      data-smart-stat="data-smart-stat"
      data-smart-stat-min="32"
      data-smart-stat-max="80"
      className={className}
      style={{
        fontFamily, fontWeight, fontStyle, lineHeight, letterSpacing,
        color, textAlign, maxWidth, display: 'block', ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/**
 * SmartEventTitle — Timeline/sequence event titles.
 * Auto-sizes to fill available width (single-line).
 * Range: 18–28px. NEVER larger than a headline.
 */
export function SmartEventTitle({
  children, fontFamily, fontWeight = 600,
  color, lineHeight = 1.2, letterSpacing,
  textAlign, maxWidth, style, tag = 'h4', className,
}: SmartTextProps) {
  const Tag = tag as any;
  return (
    <Tag
      data-smart-fit="data-smart-fit"
      data-smart-fit-mode="width"
      data-smart-fit-min="18"
      data-smart-fit-max="28"
      className={className}
      style={{
        fontFamily, fontWeight, lineHeight, letterSpacing,
        color, textAlign, maxWidth, margin: 0, ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/**
 * SmartEventDesc — Timeline/sequence event descriptions.
 * Auto-sizes to fit within a box (multiline).
 * Range: 16–24px.
 */
export function SmartEventDesc({
  children, fontFamily, fontWeight = 300,
  color, lineHeight = 1.4, letterSpacing,
  textAlign, maxWidth, style, tag = 'p', className,
}: SmartTextProps) {
  const Tag = tag as any;
  return (
    <Tag
      data-smart-fit="data-smart-fit"
      data-smart-fit-mode="box"
      data-smart-fit-min="16"
      data-smart-fit-max="24"
      data-smart-fit-max-lines="3"
      className={className}
      style={{
        fontFamily, fontWeight, lineHeight, letterSpacing,
        color, textAlign, maxWidth, margin: 0, ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/* ─── Layout containers ─── */

export interface SmartTimelineProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  gap?: number;
}

/**
 * SmartTimeline — Container for timeline items.
 * Auto-distributes items vertically, scales fonts if overflowing.
 */
export function SmartTimeline({ children, style, className, gap = 24 }: SmartTimelineProps) {
  return (
    <div
      data-smart-timeline="data-smart-timeline"
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap,
        position: 'relative',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export interface SmartTimelineItemProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * SmartTimelineItem — Individual timeline event.
 */
export function SmartTimelineItem({ children, style, className }: SmartTimelineItemProps) {
  return (
    <div
      data-smart-timeline-item="data-smart-timeline-item"
      className={className}
      style={style}
    >
      {children}
    </div>
  );
}

export interface SmartGridProps {
  children: React.ReactNode;
  columns: number;
  gap?: number;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * SmartGrid — Auto-sizing grid for telemetry stats.
 * Automatically sizes rows based on tallest cell.
 */
export function SmartGrid({ children, columns, gap = 40, style, className }: SmartGridProps) {
  return (
    <div
      data-smart-grid="data-smart-grid"
      data-smart-grid-cols={String(columns)}
      data-smart-grid-gap={String(gap)}
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export interface SmartTableProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * SmartTable — Auto-sizing table.
 * Scales fonts if body overflows available height.
 */
export function SmartTable({ children, style, className }: SmartTableProps) {
  return (
    <div
      data-smart-table-container="data-smart-table-container"
      className={className}
      style={{ flex: 1, display: 'flex', flexDirection: 'column', ...style }}
    >
      {children}
    </div>
  );
}

/**
 * SmartTableBody — Table body with auto-sizing rows.
 */
export function SmartTableBody({ children, style, className }: SmartTableProps) {
  return (
    <div
      data-smart-table="data-smart-table"
      className={className}
      style={{ flex: 1, display: 'flex', flexDirection: 'column', ...style }}
    >
      {children}
    </div>
  );
}

/**
 * SmartTableCell — Table cell with auto-fitting text.
 */
export function SmartTableCell({
  children, fontFamily, fontWeight = 400,
  color, style, className,
}: {
  children: React.ReactNode;
  fontFamily?: string;
  fontWeight?: number;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <span
      data-smart-fit="data-smart-fit"
      data-smart-fit-mode="box"
      data-smart-fit-min="16"
      data-smart-fit-max="24"
      className={className}
      style={{ fontFamily, fontWeight, color, display: 'block', ...style }}
    >
      {children}
    </span>
  );
}
