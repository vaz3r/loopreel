import React from 'react';
import type { LayoutProps } from '../../shared/types';
import styles from './styles.module.css';

export default function PaperOfRecordMythFact({ slide }: LayoutProps) {
  const s = slide as any;
  const kicker = (s.kicker && s.kicker.toLowerCase() !== (s.tag || '').toLowerCase())
    ? s.kicker
    : 'FACT CHECK & INTELLIGENCE';

  return (
    <div className={styles.mythFact}>
      <div className={styles.header}>
        <div className={styles.kicker}>{kicker}</div>
        <h2 className={styles.headline}>{s.headline}</h2>
      </div>

      <div className={styles.cardsContainer}>
        {/* Myth / The Claim */}
        <div className={styles.mythCard}>
          <div className={styles.cardHeader}>
            <span className={styles.badgeLabel}>THE CLAIM</span>
            <span className={styles.badgeStatus}>UNVERIFIED</span>
          </div>
          <p className={styles.mythText}>{s.myth}</p>
          <div className={styles.cardFooter}>
            <span className={styles.footerTag}>STATUS: REFUTED BY REPORTING</span>
          </div>
        </div>

        {/* Fact / The Record */}
        <div className={styles.factCard}>
          <div className={styles.cardHeader}>
            <span className={styles.badgeLabelFact}>THE RECORD</span>
            <span className={styles.badgeStatusFact}>DOCUMENTED</span>
          </div>
          <p className={styles.factText}>{s.fact}</p>
          <div className={styles.cardFooter}>
            <span className={styles.footerTagFact}>VERIFIED OPERATIONAL REALITY</span>
          </div>
        </div>
      </div>
    </div>
  );
}
