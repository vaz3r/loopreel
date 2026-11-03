import React from 'react';
import type { DensityProfile } from '../density-engine.js';
import styles from '../density.module.css';

export interface SequenceItem {
  num: string | number;
  title: string;
  desc: string;
}

export interface AdaptiveSequenceProps {
  headline: string;
  items: SequenceItem[];
  density?: DensityProfile;
  renderHeader?: (headline: string) => React.ReactNode;
  renderItem?: (item: SequenceItem, index: number, isLast: boolean) => React.ReactNode;
  className?: string;
  headerClassName?: string;
  headlineClassName?: string;
  listClassName?: string;
  itemClassName?: string;
  numClassName?: string;
  titleClassName?: string;
  descClassName?: string;
}

export function AdaptiveSequence({
  headline,
  items = [],
  renderHeader,
  renderItem,
  className,
  headerClassName,
  headlineClassName,
  listClassName,
  itemClassName,
  numClassName,
  titleClassName,
  descClassName,
}: AdaptiveSequenceProps) {
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

      <div className={`${styles.fillList} ${listClassName || ''}`}>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          if (renderItem) {
            return renderItem(item, idx, isLast);
          }
          return (
            <div key={idx} className={`${styles.fillItem} ${itemClassName || ''}`}>
              <div className={numClassName}>{item.num}</div>
              <div style={{ flex: 1 }}>
                <h3 className={titleClassName}>{item.title}</h3>
                <p className={descClassName} style={{ fontSize: 'var(--density-body-size, 24px)', lineHeight: 'var(--density-line-height, 1.4)' }}>
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdaptiveSequence;
