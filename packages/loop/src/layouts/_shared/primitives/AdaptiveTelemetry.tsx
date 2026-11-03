import React from 'react';
import { type DensityProfile, getStatItemStyle } from '../density-engine.js';
import styles from '../density.module.css';

export interface TelemetryStat {
  value: string;
  unit?: string;
  label: string;
}

export interface AdaptiveTelemetryProps {
  headline: string;
  stats: TelemetryStat[];
  density?: DensityProfile;
  renderHeader?: (headline: string) => React.ReactNode;
  renderStat?: (stat: TelemetryStat, index: number, total: number) => React.ReactNode;
  className?: string;
  headerClassName?: string;
  headlineClassName?: string;
  gridClassName?: string;
  cardClassName?: string;
  valueClassName?: string;
  unitClassName?: string;
  labelClassName?: string;
  barClassName?: string;
}

export function AdaptiveTelemetry({
  headline,
  stats = [],
  density,
  renderHeader,
  renderStat,
  className,
  headerClassName,
  headlineClassName,
  gridClassName,
  cardClassName,
  valueClassName,
  unitClassName,
  labelClassName,
  barClassName,
}: AdaptiveTelemetryProps) {
  const isLandscape = Boolean(density?.isLandscape);

  return (
    <div className={`${styles.container} ${className || ''}`}>
      {renderHeader ? (
        renderHeader(headline)
      ) : (
        <div className={headerClassName} style={{ flexShrink: 0 }}>
          <h2 className={headlineClassName} style={{ fontSize: 'var(--density-headline-size, 64px)' }}>
            {headline}
          </h2>
        </div>
      )}

      <div className={`${styles.adaptiveGrid} ${gridClassName || ''}`}>
        {stats.map((stat, idx) => {
          if (renderStat) {
            return renderStat(stat, idx, stats.length);
          }
          const itemStyle = getStatItemStyle(idx, stats.length, isLandscape);

          return (
            <div
              key={idx}
              className={`${styles.adaptiveStatCard} ${cardClassName || ''}`}
              style={itemStyle as React.CSSProperties}
            >
              <div
                className={valueClassName}
                style={{ fontSize: 'var(--density-stat-value-size, 110px)' }}
              >
                {stat.value}
                {stat.unit && (
                  <span
                    className={unitClassName}
                    style={{ fontSize: 'var(--density-stat-unit-size, 55px)' }}
                  >
                    {stat.unit}
                  </span>
                )}
              </div>
              {barClassName && <div className={barClassName} />}
              <div
                className={labelClassName}
                style={{ fontSize: 'var(--density-stat-label-size, 24px)' }}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdaptiveTelemetry;
