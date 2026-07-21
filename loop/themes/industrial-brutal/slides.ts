import type { VoidContract } from '../../schema';

const contract: VoidContract = {
  slides: [
    {
      id: "ib-cover-1",
      type: "cover",
      tag: "MANIFESTO // 01",
      headline: "FORM FOLLOWS FRICTION",
      subheadline: "Why the most enduring designs emerge from constraint, resistance, and the deliberate rejection of convenience.",
      metadata: "VOL. 07 — AESTHETICS",
      footerLeft: "BRUTAL STUDIO",
      footerRight: "PAGE 01"
    },
    {
      id: "ib-quote-1",
      type: "quote",
      tag: "FOUNDING PRINCIPLE",
      quote: "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.",
      author: "A. de Saint-Exupery",
      role: "Aviator & Writer",
      footerLeft: "AXIOMS",
      footerRight: "PAGE 02"
    },
    {
      id: "ib-image-cover-1",
      type: "image-cover",
      tag: "ENVIRONMENT",
      headline: "Negative Space.",
      subtext: "The void between elements is not emptiness. It is the structure that gives form its meaning.",
      imageUrl: "https://picsum.photos/seed/negative/1080/1350",
      footerLeft: "SPATIAL THEORY",
      footerRight: "PAGE 03"
    },
    {
      id: "ib-dichotomy-1",
      type: "dichotomy",
      tag: "AESTHETIC POLARITY",
      headline: "The Two Schools",
      left: { title: "Maximalist", desc: "Layered ornamentation. Every surface decorated. Visual richness through accumulation and complexity." },
      right: { title: "Minimalist", desc: "Radical reduction. Only essential elements survive. Beauty through restraint and precision." },
      footerLeft: "COMPARISON",
      footerRight: "PAGE 04"
    },
    {
      id: "ib-sequence-1",
      type: "sequence",
      tag: "DESIGN PROTOCOL",
      headline: "Five Pillars of Brutal Design.",
      items: [
        { num: "01", title: "Raw Materials", desc: "Expose the structure. Let concrete be concrete, steel be steel." },
        { num: "02", title: "Geometric Rigor", desc: "Every angle intentional. Every proportion calculated." },
        { num: "03", title: "Monochrome Palette", desc: "Color is a crutch. True form needs only light and shadow." },
        { num: "04", title: "Asymmetric Balance", desc: "Perfect symmetry is sterile. Tension creates interest." },
        { num: "05", title: "Functional Beauty", desc: "If it does not serve a purpose, it does not exist." }
      ],
      footerLeft: "EXECUTION",
      footerRight: "PAGE 05"
    },
    {
      id: "ib-table-1",
      type: "table",
      tag: "MATERIAL ANALYSIS",
      headline: "Material Properties Matrix",
      headers: ["Material", "Durability", "Cost", "Aesthetic"],
      rows: [
        ["Raw Concrete", "High", "Low", "Brutalist"],
        ["Brushed Steel", "Very High", "Medium", "Industrial"],
        ["Weathered Oak", "Medium", "Medium", "Organic"],
        ["Matte Black Glass", "Medium", "High", "Minimal"],
        ["Oxidized Copper", "High", "High", "Patina"],
        ["Exposed Brick", "Very High", "Low", "Heritage"]
      ],
      footerLeft: "SPEC SHEET",
      footerRight: "PAGE 06"
    },
    {
      id: "ib-telemetry-1",
      type: "telemetry",
      tag: "MARKET DATA",
      headline: "Brutalist Design Adoption.",
      stats: [
        { value: "73%", label: "Studio Preference" },
        { value: "2.1x", label: "Premium Justified" },
        { value: "45%", label: "Less Revision" },
        { value: "89%", label: "Client Satisfaction" }
      ],
      footerLeft: "SURVEY 2024",
      footerRight: "PAGE 07"
    },
    {
      id: "ib-image-split-1",
      type: "image-split",
      tag: "VISUAL STUDY",
      headline: "Texture as Language.",
      bodyText: "Surface treatment communicates intent. Rough concrete speaks of honesty. Polished marble whispers of aspiration. The designer chooses the vocabulary.",
      imageUrl: "https://picsum.photos/seed/texture/800/1000",
      footerLeft: "MATERIAL STUDY",
      footerRight: "PAGE 08"
    },
    {
      id: "ib-cta-1",
      type: "cta",
      tag: "JOIN THE MOVEMENT",
      headline: "Embrace the Void.",
      subtext: "Enter the brutalist design collective. Where restraint is rebellion and reduction is revolution.",
      actionLabel: "ENTER STUDIO",
      socialHandle: "@brutalstudio",
      footerLeft: "END MANIFESTO",
      footerRight: "PAGE 09"
    }
  ]
};

export default contract;
