import type { VoidContract } from '../../schema';

const contract: VoidContract = {
  slides: [
    {
      id: "mc-cover-1",
      type: "cover",
      tag: "DESIGN SYSTEM // 01",
      headline: "Clean Modern Design",
      subheadline: "Principles of minimalist digital interfaces",
      metadata: "VOL. 01 — UI",
      footerLeft: "MODERN CLEAN",
      footerRight: "PAGE 01"
    },
    {
      id: "mc-def-1",
      type: "definition",
      tag: "TERM // 01",
      term: "Whitespace",
      phonetic: "/ˈwaɪtˌspeɪs/",
      definition: "The deliberate use of empty space to create visual breathing room and establish hierarchy in interface design.",
      example: "e.g., A 120px gap between hero section and content body.",
      footerLeft: "LEXICON",
      footerRight: "PAGE 02"
    },
    {
      id: "mc-dichotomy-1",
      type: "dichotomy",
      tag: "PRINCIPLE",
      headline: "Simplicity vs. Minimalism",
      left: { title: "Simplicity", desc: "Removing the obvious, reducing friction" },
      right: { title: "Minimalism", desc: "Removing the essential, reducing to pure form" },
      footerLeft: "COMPARATIVE",
      footerRight: "PAGE 03"
    },
    {
      id: "mc-timeline-1",
      type: "timeline",
      tag: "EVOLUTION",
      headline: "Web Design Timeline",
      events: [
        { date: "2013", title: "Flat Design", desc: "Apple and Microsoft abandon skeuomorphism for clean flat interfaces" },
        { date: "2014", title: "Material Design", desc: "Google introduces layered depth and motion as design principles" },
        { date: "2017", title: "Minimal UX", desc: "Content-first approach eliminates chrome and decorative elements" },
        { date: "2020", title: "Neumorphism", desc: "Soft UI trend blends skeuomorphic tactility with flat minimalism" },
        { date: "2023", title: "AI-Assisted", desc: "Generative tools reshape workflows and accelerate iteration cycles" }
      ],
      footerLeft: "HISTORY",
      footerRight: "PAGE 04"
    },
    {
      id: "mc-quote-1",
      type: "quote",
      tag: "WISDOM",
      quote: "Design is not just what it looks like and feels like. Design is how it works.",
      author: "Steve Jobs",
      role: "Co-founder, Apple",
      footerLeft: "PRINCIPLES",
      footerRight: "PAGE 05"
    },
    {
      id: "mc-telemetry-1",
      type: "telemetry",
      tag: "METRICS",
      headline: "Design Impact",
      stats: [
        { value: "47% Faster", label: "Page Load Time" },
        { value: "3.2x Higher", label: "Engagement Rate" },
        { value: "89%", label: "User Retention" },
        { value: "2.1M", label: "Active Users" }
      ],
      footerLeft: "DATA SET",
      footerRight: "PAGE 06"
    },
    {
      id: "mc-table-1",
      type: "table",
      tag: "COMPARISON",
      headline: "Framework Comparison",
      headers: ["Framework", "Bundle", "Popularity", "Learning"],
      rows: [
        ["React", "139 kB", "Very High", "Moderate"],
        ["Vue", "58 kB", "High", "Easy"],
        ["Svelte", "2 kB", "Growing", "Easy"],
        ["Solid", "7 kB", "Emerging", "Moderate"]
      ],
      footerLeft: "ANALYSIS",
      footerRight: "PAGE 07"
    },
    {
      id: "mc-cta-1",
      type: "cta",
      tag: "FINALE",
      headline: "Build Something Beautiful.",
      subtext: "Start your design journey with modern principles.",
      actionLabel: "GET STARTED",
      socialHandle: "@moderndesign",
      footerLeft: "MODERN CLEAN",
      footerRight: "PAGE 08"
    }
  ]
};

export default contract;
