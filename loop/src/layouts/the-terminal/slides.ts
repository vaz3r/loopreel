import type { TheTerminalContract } from './schema';

const slides: TheTerminalContract = {
  slides: [
    {
      id: 'tt-cover-1', type: 'cover',
      tag: 'MARKET_DATA', reportId: '994-A',
      headline: 'The Liquidity Vacuum.',
      subheadline: 'An empirical analysis of quantitative tightening, shrinking balance sheets, and the impending institutional scramble for tier-one collateral.',
      authorName: 'J. Stevens', authorRole: 'Macro Strategy',
      footerLeft: 'MARKET_DATA', footerRight: 'PAGE 01',
    },
    {
      id: 'tt-seq-1', type: 'sequence',
      tag: 'EXEC_BRIEF', headline: 'Execution Parameters',
      items: [
        { num: '01', title: 'Shadow Banking Stress', desc: 'Private credit markets are masking insolvencies. Non-bank lenders are extending durations to avoid realizing catastrophic mark-to-market losses.' },
        { num: '02', title: 'Treasury Volatility', desc: 'The ultimate safe haven is acting like a risk asset. Swings in the 10-year yield are breaking algorithmic parity models.' },
        { num: '03', title: 'The Dollar Wrecking Ball', desc: 'Relentless USD strength is forcing emerging markets to burn through foreign exchange reserves at the fastest pace since 2008.' },
      ],
      footerLeft: 'EXEC_BRIEF', footerRight: 'PAGE 02',
    },
    {
      id: 'tt-img-1', type: 'image-split',
      tag: 'DISPATCH', headline: 'Asian Markets Diverge',
      bodyText: 'While western central banks aggressively tighten, the PBOC is injecting record liquidity in a desperate bid to stabilize the property sector. This policy divergence is creating generational arbitrage opportunities.',
      imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1080&auto=format&fit=crop',
      credit: 'VISUAL_DATA: HK_EXCHANGE',
      footerLeft: 'DISPATCH', footerRight: 'PAGE 03',
    },
    {
      id: 'tt-telem-1', type: 'telemetry',
      tag: 'DATA_SET', headline: 'Real-Time Telemetry',
      stats: [
        { value: '4.8', unit: '%', label: 'U.S. Core CPI (YoY). Consensus: 4.6% (Miss).', color: 'green' },
        { value: '124', unit: '', label: 'Corp Defaults (Q3). Highest since pandemic onset.', color: 'red' },
        { value: '7.4', unit: 'T', label: 'Fed Balance Sheet. - $1.5T reduction from peak.', color: 'amber' },
        { value: '-42', unit: '%', label: 'Venture Funding. YoY decline in Series B+ rounds.', color: 'blue' },
      ],
      footerLeft: 'TELEMETRY', footerRight: 'PAGE 04',
    },
    {
      id: 'tt-interview-1', type: 'interview',
      tag: 'INTERVIEW', headline: 'Interrogation Log',
      question: 'Is the commercial real estate collapse fully priced into regional bank equities?',
      answer: 'Not even close. The banks are engaging in "extend and pretend"—refinancing toxic office debt to avoid realizing the losses. When the maturity wall hits in 2026, we will see a wave of forced liquidations that the market modelers are currently ignoring.',
      respondentName: 'Marcus Vane', respondentRole: 'Head of Risk',
      footerLeft: 'INTERVIEW', footerRight: 'PAGE 05',
    },
    {
      id: 'tt-quad-1', type: 'quadrant',
      tag: 'MATRIX', headline: 'Risk Matrix',
      topLeft: { title: 'Private Equity', desc: 'High expected returns, but illiquid and currently facing severe exit bottlenecks.' },
      topRight: { title: 'Tech Equities', desc: 'Supreme volatility. AI-driven mega-caps offer the only true liquidity pool.' },
      bottomLeft: { title: 'Treasuries', desc: 'Risk-free return base, currently inverted. Defensive positioning only.' },
      bottomRight: { title: 'Corp Bonds', desc: 'Low yield for the underlying default risk. The worst risk-adjusted quadrant.' },
      topLabel: 'High Yield', bottomLabel: 'Low Yield',
      leftLabel: 'Low Volatility', rightLabel: 'High Volatility',
      highlight: 'topRight',
      footerLeft: 'MATRIX', footerRight: 'PAGE 06',
    },
    {
      id: 'tt-cs-1', type: 'case-study',
      tag: 'SYS_LOG', headline: 'System Log',
      stages: [
        { label: 'ERR_01', title: 'Commingled Funds', desc: 'Customer deposits were illegally transferred to cover massive speculative trading losses.' },
        { label: 'ACT_02', title: 'The Bank Run', desc: 'A rival CEO tweeted intentions to liquidate tokens, triggering a $6 billion withdrawal request in 72 hours.' },
        { label: 'RES_03', title: 'Insolvency', desc: 'Complete structural collapse. $8 billion shortfall revealed, leading to Chapter 11 bankruptcy.', highlighted: true },
      ],
      footerLeft: 'SYS_LOG', footerRight: 'PAGE 07',
    },
    {
      id: 'tt-myth-1', type: 'myth-fact',
      tag: 'DEBUG', headline: 'Data Validation',
      myth: 'Cryptocurrency serves as a decentralized hedge against traditional market inflation.',
      fact: 'Crypto assets currently trade as high-beta tech equities. They are hyper-correlated to NASDAQ liquidity cycles, not inflation metrics.',
      footerLeft: 'DEBUG', footerRight: 'PAGE 08',
    },
    {
      id: 'tt-res-1', type: 'resource-grid',
      tag: 'TOOLS', headline: 'Analysis Tools',
      items: [
        { title: 'Bloomberg Terminal', desc: 'The undisputed heavyweight for real-time macroeconomic data and financial instruments.' },
        { title: 'Glassnode', desc: 'Essential for deep on-chain analytics, tracking exchange flows, and wallet cohort behavior.' },
        { title: 'TradingView', desc: 'Cloud-based charting platform standard for technical analysis and custom Pine Script indicators.' },
        { title: 'Fred (St. Louis)', desc: 'The ultimate open-source database for U.S. economic time-series data and monetary policy.' },
      ],
      footerLeft: 'TOOLS', footerRight: 'PAGE 09',
    },
    {
      id: 'tt-tl-1', type: 'timeline',
      tag: 'TIMELINE', headline: 'Event Sequence',
      events: [
        { date: '2022-03-16', title: 'The Pivot', desc: 'Fed enacts first rate hike, ending the zero-interest-rate era. Markets assume a brief tightening cycle.' },
        { date: '2023-05-03', title: 'The Acceleration', desc: 'Rates hit 5.25%. Long-duration assets collapse. SVB and Signature Bank fail.' },
        { date: '2026-07-22', title: 'The Plateau', desc: 'Rates hold at elevated levels. Commercial real estate refinancings trigger widespread tier-2 bank insolvency.', highlight: true },
      ],
      footerLeft: 'TIMELINE', footerRight: 'PAGE 10',
    },
    {
      id: 'tt-quote-1', type: 'quote',
      tag: 'INSIGHT',
      quote: 'Liquidity is a coward. It disappears at the exact moment you need it most. Models assume continuous trading; markets deliver discontinuous gaps.',
      author: 'Nassim Taleb', role: 'Quantitative Analyst / Author',
      footerLeft: 'INSIGHT', footerRight: 'PAGE 11',
    },
    {
      id: 'tt-cta-1', type: 'cta',
      tag: 'AUTH_REQ', headline: 'Terminal Access Granted.',
      subtext: 'Receive unfiltered macro-economic data feeds and algorithmic trade analyses weekly.',
      actionLabel: '> INITIALIZE_SUB', socialHandle: 'CONNECT: @THETERMINAL_HQ',
      footerLeft: 'SUBSCRIPTION', footerRight: 'PAGE 12',
    },
  ],
};

export default slides;
