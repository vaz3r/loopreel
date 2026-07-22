import React, { useState, useEffect, useMemo } from 'react';
import { SCHEMES, injectFonts, Engine, chunkArray } from './engine-utils';
import { SlideRenderer } from './SlideRenderer';
import { PLATFORMS, type PlatformId } from './platforms';

const PAPER_OF_RECORD_SLIDES = [
  { id: 'por-cover-1', type: 'cover', tag: 'INVESTIGATION', headline: 'The Silent Collapse of the Global Attention Economy.', subheadline: 'How algorithms engineered to maximize engagement have inadvertently destroyed the human capacity for deep work.', authorName: 'Sarah K. Kingsley', authorRole: 'Reporting from San Francisco', footerLeft: 'TECHNOLOGY', footerRight: 'PAGE 01' },
  { id: 'por-quote-1', type: 'quote', tag: 'OPINION', quote: "We didn't build a product. We built a slot machine that operates on human psychological vulnerabilities.", author: 'Dr. Arthur Vance', role: 'Former Director of Behavioral Engineering', footerLeft: 'THE DAILY', footerRight: 'PAGE 02' },
  { id: 'por-def-1', type: 'definition', tag: 'GLOSSARY', term: 'Algorithmic Decay.', phonetic: '[al-gə-ˈriTH-mik di-ˈkā]', definition: 'The gradual degradation of platform utility caused by optimization models prioritizing short-term outrage over long-term informational value.', example: 'Note: First identified by researchers at MIT in late 2023.', footerLeft: 'CONTEXT', footerRight: 'PAGE 03' },
  { id: 'por-seq-1', type: 'sequence', tag: 'THE BRIEFING', headline: 'What You Need to Know', items: [{ num: '1.', title: 'The Dopamine Deficit', desc: 'Users are experiencing measurable chemical exhaustion after 45 minutes of continuous short-form video consumption.' }, { num: '2.', title: 'The Pivot to Private', desc: 'High-net-worth individuals are increasingly abandoning public social squares in favor of encrypted, invite-only micro-communities.' }, { num: '3.', title: 'Regulatory Looming', desc: 'The EU is drafting legislation to classify algorithmic feeds as "addictive substances" requiring strict age gating.' }], footerLeft: 'THE BRIEFING', footerRight: 'PAGE 04' },
  { id: 'por-dich-1', type: 'dichotomy', tag: 'PERSPECTIVES', headline: 'The Great Divide', left: { title: '"Connecting the World"', desc: 'Executives argue that their models merely reflect human nature, serving people exactly what they engage with most.' }, right: { title: '"Exploiting the Mind"', desc: 'Academics counter that the systems bypass rational thought, targeting the brain stem.' }, footerLeft: 'ANALYSIS', footerRight: 'PAGE 05' },
  { id: 'por-telem-1', type: 'telemetry', tag: 'STATISTICS', headline: 'By the Numbers', stats: [{ value: '4.2', unit: 'B', label: 'Hours lost daily to algorithmic scrolling.' }, { value: '78', unit: '%', label: 'Increase in teen anxiety disorders.' }, { value: '$11', unit: 'T', label: 'Estimated global economic impact.' }, { value: '12', unit: 'sec', label: 'Average attention span of Gen-Z.' }], footerLeft: 'DATA SET', footerRight: 'PAGE 06' },
  { id: 'por-tl-1', type: 'timeline', tag: 'TIMELINE', headline: 'How We Got Here', events: [{ date: '2009', title: 'The "Like" Button', desc: 'First quantifiable metric of social approval.' }, { date: '2016', title: 'The Algorithmic Feed', desc: 'Chronological feeds are abandoned.' }, { date: '2026', title: 'The Saturation Point', desc: 'AI-generated content floods the feeds.', highlight: true }], footerLeft: 'CHRONOLOGY', footerRight: 'PAGE 07' },
  { id: 'por-img-1', type: 'image-split', tag: 'PHOTO ESSAY', headline: 'The Hardware Inside', bodyText: 'Server farms in Northern Virginia process petabytes of behavioral data daily.', imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1080&auto=format&fit=crop', credit: 'Photograph by Unsplash / NYT', footerLeft: 'PHOTOJOURNALISM', footerRight: 'PAGE 08' },
  { id: 'por-tbl-1', type: 'table', tag: 'DATA DESK', headline: 'Platform Toxicity Index', headers: ['Platform', 'Daily Min', 'Stress Spike', 'Verdict'], rows: [['VideoFeed', '112m', '+45%', 'Severe'], ['TextSquare', '45m', '+68%', 'Critical'], ['PhotoGrid', '58m', '+22%', 'Moderate'], ['ReadingApp', '25m', '-12%', 'Healthy']], highlightRow: 3, footerLeft: 'ANALYSIS', footerRight: 'PAGE 09' },
  { id: 'por-analysis-1', type: 'analysis', tag: 'ANALYSIS', headline: 'Analysis: The Opt-Out', bodyText: 'There is a growing movement among the technological elite to entirely disconnect their children from the very systems they built.', footerLeft: 'DEEP READ', footerRight: 'PAGE 10' },
  { id: 'por-profile-1', type: 'profile', tag: 'Case Study', headline: 'The Digital Hermit', portraitUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop', personName: 'Marcus Vance, 42', personRole: 'Former Tech Executive', quote: "I spent ten years optimizing notifications to ensure users checked their phones 150 times a day.", footerLeft: 'PROFILE', footerRight: 'PAGE 11' },
  { id: 'por-cta-1', type: 'cta', tag: 'THE DAILY', headline: 'Understand the forces shaping our world.', subtext: 'Read the full investigative report.', actionLabel: 'Subscribe for Access', socialHandle: 'Link in Bio', footerLeft: 'SUBSCRIPTION', footerRight: 'PAGE 12' },
];

const THE_GLOBALIST_SLIDES = [
  { id: 'tg-cover-1', type: 'cover', tag: 'SPECIAL REPORT', headline: 'The End of Cheap Capital.', subheadline: 'How the sudden shift to high-interest regimes is forcing legacy conglomerates to restructure, liquidate, or perish entirely.', authorName: 'Julian Sterling', authorRole: 'Reporting from Frankfurt', footerLeft: 'MACRO-ECONOMICS', footerRight: 'PAGE 01' },
  { id: 'tg-seq-1', type: 'sequence', tag: 'THE BRIEFING', headline: 'The Executive Briefing', items: [{ num: '1', title: 'Zombie Companies Collapse', desc: 'Enterprises kept alive purely by refinancing debt at near-zero rates are facing immediate insolvency.' }, { num: '2', title: 'M&A Activity Freezes', desc: 'Without cheap leverage, mega-mergers have completely stalled.' }, { num: '3', title: 'The Profitability Mandate', desc: 'Venture capital has abandoned the "growth at all costs" mantra.' }], footerLeft: 'THE BRIEFING', footerRight: 'PAGE 02' },
  { id: 'tg-img-1', type: 'image-split', tag: 'DISPATCH', headline: 'The ECB Holds Firm', bodyText: 'Despite immense pressure from southern European economies, the central bank refuses to blink.', imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1080&auto=format&fit=crop', credit: 'Fig. 01 — Frankfurt', footerLeft: 'DISPATCH', footerRight: 'PAGE 03' },
  { id: 'tg-telem-1', type: 'telemetry', tag: 'Q3 DATA SET', headline: 'Global Telemetry', stats: [{ value: '5.25', unit: '%', label: 'Current baseline interest rate, marking a 22-year high.' }, { value: '1.4', unit: 'T', label: 'Estimated volume of corporate debt maturing within 18 months.' }, { value: '-18', unit: '%', label: 'Decline in commercial real estate valuations.' }, { value: '600', unit: 'k', label: 'White-collar roles eliminated since the tightening cycle began.' }], footerLeft: 'TELEMETRY', footerRight: 'PAGE 04' },
  { id: 'tg-interview-1', type: 'interview', tag: 'INTERVIEW', headline: 'The Interview', question: 'Is the era of hyper-growth permanently dead, or is this merely a cyclical pause before rates drop?', answer: 'It is structurally dead. The last ten years were a historical anomaly fueled by massive quantitative easing.', respondentName: 'Dr. Elena Rostova', respondentRole: 'Chief Economist', footerLeft: 'INTERVIEW', footerRight: 'PAGE 05' },
  { id: 'tg-quad-1', type: 'quadrant', tag: 'STRATEGY', headline: 'Strategic Positioning', topLeft: { title: 'The Vulnerable', desc: 'Commodity services charging a premium.' }, topRight: { title: 'The Monopolist', desc: 'Irreplaceable IP combined with supreme pricing power.' }, bottomLeft: { title: 'The Grinder', desc: 'Competing purely on volume and price.' }, bottomRight: { title: 'The Utility', desc: 'Necessary infrastructure but unable to extract premium profits.' }, topLabel: 'High Margin', bottomLabel: 'Low Margin', leftLabel: 'Low Moat', rightLabel: 'High Moat', highlight: 'topRight', footerLeft: 'STRATEGY', footerRight: 'PAGE 06' },
  { id: 'tg-cs-1', type: 'case-study', tag: 'CASE STUDY', headline: "TechCorp's Pivot", stages: [{ label: 'Context', title: 'Bloated Infrastructure', desc: 'Headcount expanded 40% while core revenue remained flat.' }, { label: 'Action', title: 'The Flattening', desc: 'Eliminated middle management entirely.' }, { label: 'Result', title: 'Margin Expansion', desc: 'Net profit margin surged from 12% to 28%.', highlighted: true }], footerLeft: 'CASE STUDY', footerRight: 'PAGE 07' },
  { id: 'tg-myth-1', type: 'myth-fact', tag: 'ANALYSIS', headline: 'Correcting the Record', myth: 'Companies must always choose between aggressive growth and sustainable profitability.', fact: 'True operational leverage allows for compounding growth while expanding margins.', footerLeft: 'ANALYSIS', footerRight: 'PAGE 08' },
  { id: 'tg-res-1', type: 'resource-grid', tag: 'TOOLKIT', headline: "The Strategist's Toolkit", items: [{ title: 'Bloomberg Terminal', desc: 'Real-time macroeconomic data, news, and complex financial instruments.' }, { title: 'Capital IQ', desc: 'Deep fundamental analysis, M&A tracking.' }, { title: 'The Economist', desc: 'Weekly synthesis of global affairs.' }, { title: 'Stratfor', desc: 'Geopolitical intelligence platform.' }], footerLeft: 'TOOLKIT', footerRight: 'PAGE 09' },
  { id: 'tg-tl-1', type: 'timeline', tag: 'CHRONOLOGY', headline: 'Historical Precedent', events: [{ date: '1970s', title: 'The Inflation Shock', desc: 'Oil embargoes trigger stagflation.' }, { date: '1981', title: 'The Volcker Shock', desc: 'Interest rates pushed to 20%.' }, { date: '2026', title: 'The Modern Echo', desc: 'Policy makers attempt to engineer a soft landing.', highlight: true }], footerLeft: 'CHRONOLOGY', footerRight: 'PAGE 10' },
  { id: 'tg-quote-1', type: 'quote', tag: 'PERSPECTIVE', quote: 'In a low-rate environment, anyone can look like a genius. High rates reveal who actually has a sustainable business model.', author: 'Warren Buffett', role: 'Chairman, Berkshire Hathaway', footerLeft: 'PERSPECTIVE', footerRight: 'PAGE 11' },
  { id: 'tg-cta-1', type: 'cta', tag: 'INTELLIGENCE', headline: 'Master the Global Economy.', subtext: 'Macro-economic analysis delivered to executives weekly.', actionLabel: 'Subscribe Now', socialHandle: 'Read more at TheGlobalist.com', footerLeft: 'SUBSCRIPTION', footerRight: 'PAGE 12' },
];

const THE_TERMINAL_SLIDES = [
  { id: 'tt-cover-1', type: 'cover', tag: 'MARKET_DATA', reportId: '994-A', headline: 'The Liquidity Vacuum.', subheadline: 'An empirical analysis of quantitative tightening, shrinking balance sheets, and the impending institutional scramble for tier-one collateral.', authorName: 'J. Stevens', authorRole: 'Macro Strategy', footerLeft: 'MARKET_DATA', footerRight: 'PAGE 01' },
  { id: 'tt-seq-1', type: 'sequence', tag: 'EXEC_BRIEF', headline: 'Execution Parameters', items: [{ num: '01', title: 'Shadow Banking Stress', desc: 'Private credit markets are masking insolvencies.' }, { num: '02', title: 'Treasury Volatility', desc: 'The ultimate safe haven is acting like a risk asset.' }, { num: '03', title: 'The Dollar Wrecking Ball', desc: 'Relentless USD strength is forcing EM to burn reserves.' }], footerLeft: 'EXEC_BRIEF', footerRight: 'PAGE 02' },
  { id: 'tt-img-1', type: 'image-split', tag: 'DISPATCH', headline: 'Asian Markets Diverge', bodyText: 'While western central banks aggressively tighten, the PBOC is injecting record liquidity.', imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1080&auto=format&fit=crop', credit: 'VISUAL_DATA: HK_EXCHANGE', footerLeft: 'DISPATCH', footerRight: 'PAGE 03' },
  { id: 'tt-telem-1', type: 'telemetry', tag: 'DATA_SET', headline: 'Real-Time Telemetry', stats: [{ value: '4.8', unit: '%', label: 'U.S. Core CPI (YoY).', color: 'green' }, { value: '124', unit: '', label: 'Corp Defaults (Q3).', color: 'red' }, { value: '7.4', unit: 'T', label: 'Fed Balance Sheet.', color: 'amber' }, { value: '-42', unit: '%', label: 'Venture Funding YoY.', color: 'blue' }], footerLeft: 'TELEMETRY', footerRight: 'PAGE 04' },
  { id: 'tt-interview-1', type: 'interview', tag: 'INTERVIEW', headline: 'Interrogation Log', question: 'Is the commercial real estate collapse fully priced into regional bank equities?', answer: 'Not even close. The banks are engaging in "extend and pretend."', respondentName: 'Marcus Vane', respondentRole: 'Head of Risk', footerLeft: 'INTERVIEW', footerRight: 'PAGE 05' },
  { id: 'tt-quad-1', type: 'quadrant', tag: 'MATRIX', headline: 'Risk Matrix', topLeft: { title: 'Private Equity', desc: 'High expected returns, but illiquid.' }, topRight: { title: 'Tech Equities', desc: 'Supreme volatility. AI-driven mega-caps.' }, bottomLeft: { title: 'Treasuries', desc: 'Risk-free return base, currently inverted.' }, bottomRight: { title: 'Corp Bonds', desc: 'Low yield for the underlying default risk.' }, topLabel: 'High Yield', bottomLabel: 'Low Yield', leftLabel: 'Low Volatility', rightLabel: 'High Volatility', highlight: 'topRight', footerLeft: 'MATRIX', footerRight: 'PAGE 06' },
  { id: 'tt-cs-1', type: 'case-study', tag: 'SYS_LOG', headline: 'System Log', stages: [{ label: 'ERR_01', title: 'Commingled Funds', desc: 'Customer deposits illegally transferred.' }, { label: 'ACT_02', title: 'The Bank Run', desc: '$6 billion withdrawal request in 72 hours.' }, { label: 'RES_03', title: 'Insolvency', desc: '$8 billion shortfall. Chapter 11.', highlighted: true }], footerLeft: 'SYS_LOG', footerRight: 'PAGE 07' },
  { id: 'tt-myth-1', type: 'myth-fact', tag: 'DEBUG', headline: 'Data Validation', myth: 'Cryptocurrency serves as a decentralized hedge against inflation.', fact: 'Crypto assets currently trade as high-beta tech equities.', footerLeft: 'DEBUG', footerRight: 'PAGE 08' },
  { id: 'tt-res-1', type: 'resource-grid', tag: 'TOOLS', headline: 'Analysis Tools', items: [{ title: 'Bloomberg Terminal', desc: 'Real-time macroeconomic data.' }, { title: 'Glassnode', desc: 'On-chain analytics.' }, { title: 'TradingView', desc: 'Technical analysis platform.' }, { title: 'Fred (St. Louis)', desc: 'U.S. economic time-series data.' }], footerLeft: 'TOOLS', footerRight: 'PAGE 09' },
  { id: 'tt-tl-1', type: 'timeline', tag: 'TIMELINE', headline: 'Event Sequence', events: [{ date: '2022-03-16', title: 'The Pivot', desc: 'Fed enacts first rate hike.' }, { date: '2023-05-03', title: 'The Acceleration', desc: 'Rates hit 5.25%. SVB fails.' }, { date: '2026-07-22', title: 'The Plateau', desc: 'Rates hold. CRE triggers insolvency.', highlight: true }], footerLeft: 'TIMELINE', footerRight: 'PAGE 10' },
  { id: 'tt-quote-1', type: 'quote', tag: 'INSIGHT', quote: 'Liquidity is a coward. It disappears at the exact moment you need it most.', author: 'Nassim Taleb', role: 'Quantitative Analyst / Author', footerLeft: 'INSIGHT', footerRight: 'PAGE 11' },
  { id: 'tt-cta-1', type: 'cta', tag: 'AUTH_REQ', headline: 'Terminal Access Granted.', subtext: 'Receive unfiltered macro-economic data feeds weekly.', actionLabel: '> INITIALIZE_SUB', socialHandle: 'CONNECT: @THETERMINAL_HQ', footerLeft: 'SUBSCRIPTION', footerRight: 'PAGE 12' },
];

const THE_CURATOR_SLIDES = [
  { id: 'tc-cover-1', type: 'cover', tag: 'EXHIBITION 01', headline: 'The Space Between.', subheadline: 'An architectural study of negative space, invisible constraints, and the immense power of omitting the unnecessary.', pullQuote: 'True luxury is never loud. It is the quiet confidence of knowing exactly what to leave out.', footerLeft: 'ARCHIVE REF: CURATOR.STUDIO', footerRight: 'PAGE 01' },
  { id: 'tc-seq-1', type: 'sequence', tag: 'THE CATALOG', headline: 'The Principles.', items: [{ num: 'I.', title: 'Omission as Design', desc: 'The removal of non-essential elements until only the structural truth of the object remains.' }, { num: 'II.', title: 'Material Integrity', desc: 'Refusing to disguise the underlying materials. Concrete must look like concrete; wood must breathe.' }, { num: 'III.', title: 'Asymmetric Balance', desc: 'Creating visual tension by placing heavy elements off-center, balanced entirely by vast negative space.' }], footerLeft: 'ARCHIVE REF: CURATOR.STUDIO', footerRight: 'PAGE 02' },
  { id: 'tc-img-1', type: 'image-split', tag: 'THE GALLERY', headline: 'Form & Function.', bodyText: 'The Bauhaus movement taught us that utility should dictate shape. When applied to digital strategy, this means stripping away decorative marketing.', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1080&auto=format&fit=crop', credit: 'FIG. 01 — ARCHITECTURE', footerLeft: 'ARCHIVE REF: CURATOR.STUDIO', footerRight: 'PAGE 03' },
  { id: 'tc-telem-1', type: 'telemetry', tag: 'METRICS', headline: 'The Metrics.', stats: [{ value: '68', unit: '%', label: 'Cognitive Load Reduction' }, { value: '3.2', unit: 'x', label: 'Premium Price Multiplier' }, { value: '-45', unit: '%', label: 'Decision Fatigue' }, { value: '90', unit: '%', label: 'Information Retention' }], footerLeft: 'ARCHIVE REF: CURATOR.STUDIO', footerRight: 'PAGE 04' },
  { id: 'tc-hero-1', type: 'hero-metric', tag: 'HERO METRIC', value: '99', unit: '%', headline: 'The Signal to Noise Ratio', bodyText: 'Most modern communication is entirely disposable. True luxury is found in the one percent that shifts perspective.', footerLeft: 'ARCHIVE REF: CURATOR.STUDIO', footerRight: 'PAGE 05' },
  { id: 'tc-method-1', type: 'methodology', tag: 'METHODOLOGY', headline: 'The Methodology.', steps: [{ num: '01', title: 'Isolation', desc: 'Remove the subject from all contextual noise.' }, { num: '02', title: 'Proportion', desc: 'Scale the essential elements to absolute maximum visibility.' }, { num: '03', title: 'Execution', desc: 'Publish with uncompromising discipline.', highlighted: true }], footerLeft: 'ARCHIVE REF: CURATOR.STUDIO', footerRight: 'PAGE 06' },
  { id: 'tc-juxta-1', type: 'juxtaposition', tag: 'AESTHETICS', headline: 'Aesthetic Code.', donts: ['Drop shadows and gradients.', 'Centering all text alignment.', 'Filling every pixel of space.'], dos: ['Absolute stark contrast.', 'Asymmetrical tension.', 'Aggressive negative space.'], footerLeft: 'ARCHIVE REF: CURATOR.STUDIO', footerRight: 'PAGE 07' },
  { id: 'tc-check-1', type: 'checklist', tag: 'INVENTORY', headline: 'The Inventory.', items: [{ text: 'Is the typographic hierarchy immediately obvious?', checked: true }, { text: 'Have all decorative elements been removed?' }, { text: 'Does the negative space actively support the central object?' }], footerLeft: 'ARCHIVE REF: CURATOR.STUDIO', footerRight: 'PAGE 08' },
  { id: 'tc-break-1', type: 'breakdown', tag: 'ANATOMY', headline: 'Anatomy of Form.', centerLabel: 'The Object', items: [{ num: '01', title: 'Structure', desc: 'The underlying grid.' }, { num: '02', title: 'Negative Space', desc: 'The intentional void.' }, { num: '03', title: 'Typography', desc: 'The voice of the object.' }, { num: '04', title: 'Material', desc: 'The unvarnished truth.' }], footerLeft: 'ARCHIVE REF: CURATOR.STUDIO', footerRight: 'PAGE 09' },
  { id: 'tc-quote-1', type: 'quote', tag: 'STATEMENT', quote: 'Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.', author: 'Antoine de St. Exupéry', role: 'Aviator & Writer', footerLeft: 'ARCHIVE REF: CURATOR.STUDIO', footerRight: 'PAGE 10' },
  { id: 'tc-cta-1', type: 'cta', tag: 'ACQUISITION', headline: 'Enter the Gallery.', subtext: 'A private collection of architectural strategy.', actionLabel: 'Acquire Access', socialHandle: 'EXHIBITION: @CURATOR.STUDIO', footerLeft: 'ARCHIVE REF: CURATOR.STUDIO', footerRight: 'PAGE 11' },
];

const TEMPLATE_MAP: Record<string, { schemeId: string; slides: any[] }> = {
  'paper-of-record': { schemeId: 'archive_paper', slides: PAPER_OF_RECORD_SLIDES },
  'the-globalist': { schemeId: 'globalist_editorial', slides: THE_GLOBALIST_SLIDES },
  'the-terminal': { schemeId: 'terminal_dark', slides: THE_TERMINAL_SLIDES },
  'the-curator': { schemeId: 'curator_gallery', slides: THE_CURATOR_SLIDES },
};

export default function App() {
  const [activeTemplate, setActiveTemplate] = useState('paper-of-record');
  const [baseSlides, setBaseSlides] = useState(PAPER_OF_RECORD_SLIDES);
  const [activePaginatedIndex, setActivePaginatedIndex] = useState(0);
  const [activeSchemeId, setActiveSchemeId] = useState('archive_paper');
  const [activePlatformId, setActivePlatformId] = useState<PlatformId>('instagram-feed' as PlatformId);
  const [exportMode, setExportMode] = useState(false);

  const [brandKit, setBrandKit] = useState({
    bg: '#0F172A', text: '#F8FAFC', accent: '#38BDF8',
    fontSerif: 'Playfair Display', fontSans: 'Inter',
    logoUrl: ''
  });

  const switchTemplate = (templateId: string) => {
    setActiveTemplate(templateId);
    setBaseSlides(TEMPLATE_MAP[templateId].slides);
    setActiveSchemeId(TEMPLATE_MAP[templateId].schemeId);
    setActivePaginatedIndex(0);
  };

  const paginatedSlides = useMemo(() => {
    let virtualSlides = [];
    baseSlides.forEach((slide, originalIndex) => {
      if (slide.type === 'sequence' && slide.items && slide.items.length > 4) {
        const taggedItems = slide.items.map((item, idx) => ({ ...item, _absoluteIndex: idx }));
        const chunks = chunkArray(taggedItems, 4);
        chunks.forEach((chunk, chunkIdx) => {
          virtualSlides.push({ ...slide, _virtualId: `${slide.id}-part-${chunkIdx + 1}`, _originalIndex: originalIndex, items: chunk, tag: `${slide.tag} [${chunkIdx + 1}/${chunks.length}]`, footerRight: `${slide.footerRight} (${chunkIdx + 1}/${chunks.length})` });
        });
      } else if (slide.type === 'telemetry' && slide.stats && slide.stats.length > 4) {
        const taggedStats = slide.stats.map((stat, idx) => ({ ...stat, _absoluteIndex: idx }));
        const chunks = chunkArray(taggedStats, 4);
        chunks.forEach((chunk, chunkIdx) => {
          virtualSlides.push({ ...slide, _virtualId: `${slide.id}-part-${chunkIdx + 1}`, _originalIndex: originalIndex, stats: chunk, tag: `${slide.tag} [${chunkIdx + 1}/${chunks.length}]` });
        });
      } else if (slide.type === 'table' && slide.rows && slide.rows.length > 5) {
        const taggedRows = slide.rows.map((row, idx) => ({ data: row, _absoluteIndex: idx }));
        const chunks = chunkArray(taggedRows, 5);
        chunks.forEach((chunk, chunkIdx) => {
          virtualSlides.push({ ...slide, _virtualId: `${slide.id}-part-${chunkIdx + 1}`, _originalIndex: originalIndex, rows: chunk.map(c => c.data), tag: `${slide.tag} [${chunkIdx + 1}/${chunks.length}]` });
        });
      } else if (slide.type === 'timeline' && slide.events && slide.events.length > 4) {
        const taggedEvents = slide.events.map((event, idx) => ({ ...event, _absoluteIndex: idx }));
        const chunks = chunkArray(taggedEvents, 4);
        chunks.forEach((chunk, chunkIdx) => {
          virtualSlides.push({ ...slide, _virtualId: `${slide.id}-part-${chunkIdx + 1}`, _originalIndex: originalIndex, events: chunk, tag: `${slide.tag} [${chunkIdx + 1}/${chunks.length}]` });
        });
      } else {
        let processedSlide = { ...slide, _virtualId: slide.id, _originalIndex: originalIndex };
        if (processedSlide.items) processedSlide.items = processedSlide.items.map((item, idx) => ({ ...item, _absoluteIndex: idx }));
        virtualSlides.push(processedSlide);
      }
    });
    return virtualSlides;
  }, [baseSlides]);

  useEffect(() => {
    if (activePaginatedIndex >= paginatedSlides.length) setActivePaginatedIndex(Math.max(0, paginatedSlides.length - 1));
  }, [paginatedSlides.length, activePaginatedIndex]);

  const activeData = paginatedSlides[activePaginatedIndex] || {};

  const currentScheme = useMemo(() => {
    if (activeSchemeId === 'custom_brand') {
      return { ...SCHEMES.custom_brand, bg: brandKit.bg, text: brandKit.text, accent: brandKit.accent, fontSerif: brandKit.fontSerif, fontSans: brandKit.fontSans, border: `${brandKit.text}33`, gridBorder: `${brandKit.text}1A` };
    }
    return SCHEMES[activeSchemeId];
  }, [activeSchemeId, brandKit]);

  useEffect(() => {
    if (activeSchemeId === 'custom_brand') injectFonts([brandKit.fontSerif, brandKit.fontSans]);
    else injectFonts();
  }, [activeSchemeId, brandKit.fontSerif, brandKit.fontSans]);

  const updateSlideField = (field, value) => {
    const updated = [...baseSlides];
    updated[activeData._originalIndex][field] = value || '';
    setBaseSlides(updated);
  };

  const updateArrayItem = (arrayName, absoluteItemIndex, field, value) => {
    const updated = [...baseSlides];
    const originalIndex = activeData._originalIndex;
    if (updated[originalIndex][arrayName] && updated[originalIndex][arrayName][absoluteItemIndex]) {
      updated[originalIndex][arrayName][absoluteItemIndex][field] = value || '';
      setBaseSlides(updated);
    }
  };

  const updateNestedField = (parent, field, value) => {
    const updated = [...baseSlides];
    const originalIndex = activeData._originalIndex;
    if (!updated[originalIndex][parent]) updated[originalIndex][parent] = {};
    updated[originalIndex][parent][field] = value || '';
    setBaseSlides(updated);
  };

  const addArrayItem = (arrayName) => {
    const updated = [...baseSlides];
    const originalIndex = activeData._originalIndex;
    if (!updated[originalIndex][arrayName]) updated[originalIndex][arrayName] = [];
    if (arrayName === 'items') updated[originalIndex][arrayName].push({ num: "XX", title: "New Item", desc: "Description here." });
    else if (arrayName === 'stats') updated[originalIndex][arrayName].push({ value: "0", unit: "", label: "NEW METRIC" });
    else if (arrayName === 'events') updated[originalIndex][arrayName].push({ date: "NEW PHASE", title: "Milestone", desc: "Detailed description." });
    setBaseSlides(updated);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E5E5E5] font-sans flex flex-col lg:flex-row overflow-x-hidden">
      <div className="w-full lg:w-[480px] shrink-0 border-r border-[#222] bg-[#121212] p-6 overflow-y-auto flex flex-col justify-between max-h-screen shadow-2xl z-20 relative">
        <div>
          <div className="mb-6 border-b border-[#222] pb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="font-mono text-xs tracking-[0.2em] text-[#E63946] uppercase font-bold">AGENCY_ENGINE // V3</h1>
              <span className="bg-[#222] text-[10px] text-green-400 px-2 py-0.5 rounded font-mono border border-green-900">AUTO-PAGINATION ACTIVE</span>
            </div>
          </div>

          <div className="space-y-6 mb-8 border-b border-[#222] pb-6">
            {/* Template Selector */}
            <div>
              <label className="block text-[10px] font-mono tracking-widest uppercase text-neutral-500 mb-2">Template</label>
              <div className="grid grid-cols-4 gap-2">
                {Object.keys(TEMPLATE_MAP).map(tid => (
                  <button key={tid} onClick={() => switchTemplate(tid)}
                    className={`py-2 px-1 border text-[10px] font-mono uppercase transition-all ${activeTemplate === tid ? 'border-blue-500 bg-blue-500/10 text-blue-400 font-bold' : 'border-[#333] text-neutral-500 hover:border-[#555]'}`}>
                    {tid === 'paper-of-record' ? 'Paper of Record' : tid === 'the-globalist' ? 'The Globalist' : tid === 'the-terminal' ? 'The Terminal' : 'The Curator'}
                  </button>
                ))}
              </div>
            </div>

            {/* Scheme Selector */}
            <div>
              <label className="block text-[10px] font-mono tracking-widest uppercase text-neutral-500 mb-2">Color Scheme</label>
              <div className="grid grid-cols-3 gap-2">
                {Object.values(SCHEMES).map(scheme => (
                  <button key={scheme.id} onClick={() => setActiveSchemeId(scheme.id)}
                    className={`py-2 px-1 border text-[10px] font-mono uppercase transition-all ${activeSchemeId === scheme.id ? 'border-[#E63946] bg-[#E63946]/10 text-[#E63946] font-bold' : 'border-[#333] text-neutral-500 hover:border-[#555]'}`}>
                    {scheme.name}
                  </button>
                ))}
              </div>
            </div>

            {activeSchemeId === 'custom_brand' && (
              <div className="bg-[#1A1A1A] p-4 rounded border border-[#333] space-y-4">
                <h4 className="font-mono text-[10px] text-amber-500 uppercase tracking-widest">Brand Kit Injection</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Background</label><input type="color" value={brandKit.bg} onChange={(e) => setBrandKit({...brandKit, bg: e.target.value})} className="w-full h-8 bg-transparent border border-[#333] cursor-pointer" /></div>
                  <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Text Fill</label><input type="color" value={brandKit.text} onChange={(e) => setBrandKit({...brandKit, text: e.target.value})} className="w-full h-8 bg-transparent border border-[#333] cursor-pointer" /></div>
                  <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Accent</label><input type="color" value={brandKit.accent} onChange={(e) => setBrandKit({...brandKit, accent: e.target.value})} className="w-full h-8 bg-transparent border border-[#333] cursor-pointer" /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Serif Font</label><input value={brandKit.fontSerif} onChange={(e) => setBrandKit({...brandKit, fontSerif: e.target.value})} className="w-full bg-black border border-[#333] rounded px-2 py-1.5 text-xs text-white focus:border-amber-500 font-mono" /></div>
                  <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Sans Font</label><input value={brandKit.fontSans} onChange={(e) => setBrandKit({...brandKit, fontSans: e.target.value})} className="w-full bg-black border border-[#333] rounded px-2 py-1.5 text-xs text-white focus:border-amber-500 font-mono" /></div>
                </div>
                <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Logo URL</label><input placeholder="https://..." value={brandKit.logoUrl} onChange={(e) => setBrandKit({...brandKit, logoUrl: e.target.value})} className="w-full bg-black border border-[#333] rounded px-2 py-1.5 text-xs text-white focus:border-amber-500 font-mono" /></div>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-mono tracking-widest uppercase text-neutral-500 mb-2">Platform</label>
              <div className="grid grid-cols-3 gap-1.5">
                {Object.values(PLATFORMS).map(p => (
                  <button key={p.id} onClick={() => setActivePlatformId(p.id)}
                    className={`py-1.5 px-1 border text-[9px] font-mono transition-all ${activePlatformId === p.id ? 'border-white bg-white text-black font-bold' : 'border-[#333] text-neutral-500 hover:border-[#555]'}`}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono tracking-widest uppercase text-neutral-500 mb-2">Viewport Mode</label>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setExportMode(false)} className={`py-2 px-3 border text-xs font-mono uppercase transition-all ${!exportMode ? 'border-white bg-white text-black font-bold' : 'border-[#333] text-neutral-500'}`}>Fitted Preview</button>
                <button onClick={() => setExportMode(true)} className={`py-2 px-3 border text-xs font-mono uppercase transition-all ${exportMode ? 'border-white bg-white text-black font-bold' : 'border-[#333] text-neutral-500'}`}>Raw</button>
              </div>
            </div>
          </div>

          <div className="mb-6 border-b border-[#222] pb-6">
            <label className="block text-[10px] font-mono tracking-widest uppercase text-neutral-500 mb-2 flex justify-between">
              <span>Virtual Buffer</span><span className="text-amber-500">{paginatedSlides.length} Frames</span>
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {paginatedSlides.map((slide, idx) => (
                <button key={slide._virtualId} onClick={() => setActivePaginatedIndex(idx)}
                  className={`py-1.5 text-xs font-mono transition-all border ${activePaginatedIndex === idx ? 'bg-amber-500 text-[#000] border-amber-500 font-bold' : 'border-[#2D2D2D] text-neutral-500 hover:bg-[#1A1A1A]'}`} title={slide.tag}>
                  {String(idx + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
          </div>

          {/* Content Forms */}
          <div className="space-y-4">
            <h3 className="font-mono text-[11px] tracking-widest text-amber-500 uppercase font-bold flex justify-between">
              <span>{activeData.type?.toUpperCase()} // DATA</span>
              <span className="text-neutral-600">IDX: {activeData._originalIndex}</span>
            </h3>

            <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Tag</label>
              <input value={baseSlides[activeData._originalIndex]?.tag || ''} onChange={(e) => updateSlideField('tag', e.target.value)} className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none font-mono" /></div>

            {activeData.imageUrl !== undefined && <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Image URL</label><input value={activeData.imageUrl} onChange={(e) => updateSlideField('imageUrl', e.target.value)} className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-white font-mono" placeholder="https://..." /></div>}

            {activeData.headline !== undefined && <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Headline ({activeData.headline?.length || 0})</label><textarea value={activeData.headline} onChange={(e) => updateSlideField('headline', e.target.value)} rows={3} className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none" /></div>}

            {activeData.subheadline !== undefined && <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Subheadline</label><textarea value={activeData.subheadline} onChange={(e) => updateSlideField('subheadline', e.target.value)} rows={3} className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-white" /></div>}

            {activeData.bodyText !== undefined && <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Body Text</label><textarea value={activeData.bodyText} onChange={(e) => updateSlideField('bodyText', e.target.value)} rows={4} className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-white" /></div>}

            {activeData.subtext !== undefined && <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Subtext</label><textarea value={activeData.subtext} onChange={(e) => updateSlideField('subtext', e.target.value)} rows={2} className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-white" /></div>}

            {activeData.term !== undefined && <div className="mt-4 pt-4 border-t border-[#333] space-y-3">
              <div className="grid grid-cols-2 gap-3"><div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Term</label><input value={activeData.term} onChange={(e) => updateSlideField('term', e.target.value)} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div><div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Phonetic</label><input value={activeData.phonetic} onChange={(e) => updateSlideField('phonetic', e.target.value)} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div></div>
              <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Definition</label><textarea value={activeData.definition} onChange={(e) => updateSlideField('definition', e.target.value)} rows={3} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div>
              <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Example</label><input value={activeData.example} onChange={(e) => updateSlideField('example', e.target.value)} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div>
            </div>}

            {activeData.left !== undefined && activeData.right !== undefined && <div className="mt-4 pt-4 border-t border-[#333] space-y-4">
              <div className="p-3 border border-[#333] bg-[#151515] rounded"><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-2">Left Side</label><input value={activeData.left.title} onChange={(e) => updateNestedField('left', 'title', e.target.value)} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white mb-2" /><textarea value={activeData.left.desc} onChange={(e) => updateNestedField('left', 'desc', e.target.value)} rows={2} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div>
              <div className="p-3 border border-amber-900/30 bg-[#151515] rounded"><label className="block text-[9px] font-mono uppercase text-amber-500 mb-2">Right Side</label><input value={activeData.right.title} onChange={(e) => updateNestedField('right', 'title', e.target.value)} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white mb-2" /><textarea value={activeData.right.desc} onChange={(e) => updateNestedField('right', 'desc', e.target.value)} rows={2} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div>
            </div>}

            {activeData.items !== undefined && <div className="mt-4 pt-4 border-t border-[#333]">
              <div className="flex justify-between items-center mb-2"><label className="block text-[9px] font-mono uppercase text-neutral-500">Items</label><button onClick={() => addArrayItem('items')} className="text-[9px] bg-[#222] px-2 py-1 rounded text-white hover:bg-amber-500 uppercase">+ Add</button></div>
              {activeData.items.map((item, idx) => <div key={idx} className="mb-3 pl-3 border-l-2 border-[#333] space-y-2"><input value={item.title} onChange={(e) => updateArrayItem('items', item._absoluteIndex, 'title', e.target.value)} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /><textarea value={item.desc} onChange={(e) => updateArrayItem('items', item._absoluteIndex, 'desc', e.target.value)} rows={2} className="w-full bg-black border border-[#222] rounded px-2 py-1 text-xs text-white" /></div>)}
            </div>}

            {activeData.quote !== undefined && <div className="mt-4 pt-4 border-t border-[#333]">
              <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Quote</label><textarea value={activeData.quote} onChange={(e) => updateSlideField('quote', e.target.value)} rows={4} className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-white" /></div>
              <div className="grid grid-cols-2 gap-3 mt-3"><div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Author</label><input value={activeData.author} onChange={(e) => updateSlideField('author', e.target.value)} className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-white" /></div><div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Role</label><input value={activeData.role} onChange={(e) => updateSlideField('role', e.target.value)} className="w-full bg-[#1A1A1A] border border-[#333] rounded px-3 py-2 text-xs text-white" /></div></div>
            </div>}

            {activeData.question !== undefined && <div className="mt-4 pt-4 border-t border-[#333] space-y-3">
              <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Question</label><textarea value={activeData.question} onChange={(e) => updateSlideField('question', e.target.value)} rows={3} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div>
              <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Answer</label><textarea value={activeData.answer} onChange={(e) => updateSlideField('answer', e.target.value)} rows={4} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div>
              <div className="grid grid-cols-2 gap-3"><div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Respondent</label><input value={activeData.respondentName} onChange={(e) => updateSlideField('respondentName', e.target.value)} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div><div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Role</label><input value={activeData.respondentRole} onChange={(e) => updateSlideField('respondentRole', e.target.value)} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div></div>
            </div>}

            {activeData.myth !== undefined && <div className="mt-4 pt-4 border-t border-[#333] space-y-3">
              <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Myth</label><textarea value={activeData.myth} onChange={(e) => updateSlideField('myth', e.target.value)} rows={3} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div>
              <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Fact</label><textarea value={activeData.fact} onChange={(e) => updateSlideField('fact', e.target.value)} rows={3} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div>
            </div>}

            {activeData.events !== undefined && <div className="mt-4 pt-4 border-t border-[#333]">
              <div className="flex justify-between items-center mb-2"><label className="block text-[9px] font-mono uppercase text-neutral-500">Events</label><button onClick={() => addArrayItem('events')} className="text-[9px] bg-[#222] px-2 py-1 rounded text-white hover:bg-amber-500 uppercase">+ Add</button></div>
              {activeData.events.map((event, idx) => <div key={idx} className="mb-3 pl-3 border-l-2 border-[#333] space-y-2"><div className="grid grid-cols-3 gap-2"><input value={event.date} onChange={(e) => updateArrayItem('events', event._absoluteIndex, 'date', e.target.value)} className="w-full col-span-1 bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" placeholder="Date" /><input value={event.title} onChange={(e) => updateArrayItem('events', event._absoluteIndex, 'title', e.target.value)} className="w-full col-span-2 bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" placeholder="Title" /></div><textarea value={event.desc} onChange={(e) => updateArrayItem('events', event._absoluteIndex, 'desc', e.target.value)} rows={2} className="w-full bg-black border border-[#222] rounded px-2 py-1 text-xs text-white" /></div>)}
            </div>}

            {activeData.actionLabel !== undefined && <div className="mt-4 pt-4 border-t border-[#333] space-y-3">
              <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Action Label</label><input value={activeData.actionLabel} onChange={(e) => updateSlideField('actionLabel', e.target.value)} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div>
              <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Social Handle</label><input value={activeData.socialHandle} onChange={(e) => updateSlideField('socialHandle', e.target.value)} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div>
            </div>}

            {activeData.personName !== undefined && <div className="mt-4 pt-4 border-t border-[#333] space-y-3">
              <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Person Name</label><input value={activeData.personName} onChange={(e) => updateSlideField('personName', e.target.value)} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div>
              <div><label className="block text-[9px] font-mono uppercase text-neutral-500 mb-1">Person Role</label><input value={activeData.personRole} onChange={(e) => updateSlideField('personRole', e.target.value)} className="w-full bg-black border border-[#222] rounded px-2 py-1.5 text-xs text-white" /></div>
            </div>}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-[#050505] overflow-auto relative design-grid-background">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="relative transition-all duration-300 flex-shrink-0"
          style={exportMode ? { width: PLATFORMS[activePlatformId].width, height: PLATFORMS[activePlatformId].height } : { width: PLATFORMS[activePlatformId].width, height: PLATFORMS[activePlatformId].height, transform: `scale(${Math.min(0.55, 600 / Math.max(PLATFORMS[activePlatformId].width, PLATFORMS[activePlatformId].height))})`, transformOrigin: 'center center', margin: '-300px 0' }}>
          <SlideRenderer slide={activeData as any} scheme={currentScheme} templateId={activeTemplate} brandKit={activeSchemeId === 'custom_brand' ? brandKit : undefined} size={{ width: PLATFORMS[activePlatformId].width, height: PLATFORMS[activePlatformId].height }} />
        </div>
      </div>
    </div>
  );
}
