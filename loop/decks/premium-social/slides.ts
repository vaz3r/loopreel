import type { VoidContract } from '../../schema';

const contract: VoidContract = {
  slides: [
    {
      id: "ps-cover-1",
      type: "cover",
      tag: "CONTENT PLAYBOOK // 01",
      headline: "STOP POSTING. START BUILDING.",
      subheadline: "The difference between noise and a movement — how tier-1 creators win.",
      metadata: "",
      footerLeft: "ATTENTION ECONOMY",
      footerRight: "PAGE 01"
    },
    {
      id: "ps-def-1",
      type: "definition",
      tag: "TERM // 01",
      term: "Attention Arbitrage",
      phonetic: "/ˌätənˈtēSH(ə)n ˈärbəˌträZH/",
      definition: "The systematic process of capturing high-intent audience attention by repackaging proven concepts in a premium visual format that demands engagement.",
      example: "e.g., Taking a Twitter thread and turning it into a 10-slide Instagram carousel with custom visuals.",
      footerLeft: "NOMENCLATURE",
      footerRight: "PAGE 02"
    },
    {
      id: "ps-dichotomy-1",
      type: "dichotomy",
      tag: "FRAMEWORK",
      headline: "Scrollers vs. Followers",
      left: { title: "Scrollers", desc: "View once, forget, move on. No emotional connection. No action taken." },
      right: { title: "Followers", desc: "Save, share, come back. Trust is built. They buy when you launch." },
      footerLeft: "COMPARATIVE",
      footerRight: "PAGE 03"
    },
    {
      id: "ps-timeline-1",
      type: "timeline",
      tag: "THE ARC",
      headline: "The Creator Timeline",
      events: [
        { date: "WEEK 1", title: "Find Your Niche", desc: "Identify the intersection of passion, skill, and market demand." },
        { date: "WEEK 4", title: "Content System", desc: "Build a repeatable creation workflow. Templates save sanity." },
        { date: "MONTH 3", title: "Audience Fit", desc: "Your content finds its people. Engagement patterns emerge." },
        { date: "MONTH 6", title: "Monetize", desc: "Launch your first offer to a warm, trusting audience." }
      ],
      footerLeft: "PROGRESSION",
      footerRight: "PAGE 04"
    },
    {
      id: "ps-quote-1",
      type: "quote",
      tag: "WISDOM",
      quote: "The best marketing doesn't feel like marketing. It feels like value. It feels like transformation. It feels like the answer to a question they've been asking.",
      author: "Alex Hormozi",
      role: "100M+ Revenue",
      footerLeft: "INDUSTRY INSIGHT",
      footerRight: "PAGE 05"
    },
    {
      id: "ps-telemetry-1",
      type: "telemetry",
      tag: "METRICS",
      headline: "The Growth Stack",
      stats: [
        { value: "3.2x", label: "Higher Engagement" },
        { value: "47%", label: "Save Rate" },
        { value: "12min", label: "Avg Study Time" },
        { value: "89%", label: "Completion" }
      ],
      footerLeft: "DATA SET",
      footerRight: "PAGE 06"
    },
    {
      id: "ps-table-1",
      type: "table",
      tag: "COMPARISON",
      headline: "Platform Performance",
      headers: ["Platform", "Reach", "Conversion", "Best For"],
      rows: [
        ["Instagram", "1.2M/mo", "3.4%", "Visual Brand"],
        ["LinkedIn", "450K/mo", "5.1%", "Thought Leader"],
        ["Twitter/X", "780K/mo", "2.1%", "Real-time Ideas"],
        ["YouTube", "350K/mo", "7.8%", "Deep Content"]
      ],
      footerLeft: "ANALYSIS",
      footerRight: "PAGE 07"
    },
    {
      id: "ps-cta-1",
      type: "cta",
      tag: "FINALE",
      headline: "Your First Post Is Waiting.",
      subtext: "Stop consuming. Start creating. The algorithm rewards consistency, not perfection.",
      actionLabel: "START CREATING →",
      socialHandle: "@buildwithloop",
      footerLeft: "END OF TRANSMISSION",
      footerRight: "PAGE 08"
    }
  ]
};

export default contract;
