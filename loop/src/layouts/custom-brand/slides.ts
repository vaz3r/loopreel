import type { VoidContract } from '../../../schema';

const contract: VoidContract = {
  slides: [
    {
      id: "cb-cover-1",
      type: "cover",
      tag: "RESEARCH BRIEF // 01",
      headline: "THE DATA FIRESIDE CHAT",
      subheadline: "How empirical evidence replaces intuition in the age of algorithmic decision-making.",
      metadata: "VOL. 09 — DATA SCIENCE",
      footerLeft: "PRISM ANALYTICS",
      footerRight: "PAGE 01"
    },
    {
      id: "cb-telemetry-1",
      type: "telemetry",
      tag: "RESEARCH METRICS",
      headline: "Data Point Density.",
      stats: [
        { value: "2.5B", label: "Data Points Daily" },
        { value: "99.4%", label: "Model Accuracy" },
        { value: "12ms", label: "Inference Speed" },
        { value: "340TB", label: "Training Corpus" },
        { value: "847", label: "Active Experiments" },
        { value: "15x", label: "Year-over-Year" }
      ],
      footerLeft: "DATASET 07",
      footerRight: "PAGE 02"
    },
    {
      id: "cb-def-1",
      type: "definition",
      tag: "TERM // 01",
      term: "Entropy",
      phonetic: "/ˈen.trə.pi/",
      definition: "A measure of disorder or randomness in a system. In information theory, it quantifies the uncertainty associated with a random variable. Higher entropy indicates greater unpredictability.",
      example: "e.g., A fair coin has 1 bit of entropy. A loaded coin has less.",
      footerLeft: "FUNDAMENTALS",
      footerRight: "PAGE 03"
    },
    {
      id: "cb-table-1",
      type: "table",
      tag: "MODEL BENCHMARKS",
      headline: "Performance Comparison",
      headers: ["Model", "Accuracy", "Speed", "Cost"],
      rows: [
        ["Transformer-XL", "94.2%", "45ms", "$0.12/1K"],
        ["GPT-NeoX", "91.8%", "32ms", "$0.08/1K"],
        ["BERT-Large", "89.5%", "18ms", "$0.05/1K"],
        ["T5-XXL", "93.1%", "55ms", "$0.15/1K"],
        ["PaLM-540B", "96.3%", "120ms", "$0.45/1K"],
        ["Claude-3", "95.7%", "85ms", "$0.25/1K"],
        ["Llama-3-70B", "92.4%", "38ms", "$0.10/1K"]
      ],
      footerLeft: "BENCHMARK",
      footerRight: "PAGE 04"
    },
    {
      id: "cb-timeline-1",
      type: "timeline",
      tag: "DISCOVERY CHRONOLOGY",
      headline: "Breakthrough Timeline",
      events: [
        { date: "2017", title: "Attention Mechanism", desc: "Transformer architecture revolutionizes natural language processing." },
        { date: "2020", title: "Scaling Laws", desc: "Bigger models consistently outperform smaller ones on benchmarks." },
        { date: "2022", title: "Instruction Tuning", desc: "RLHF makes language models genuinely useful for end users." },
        { date: "2024", title: "Multimodal Fusion", desc: "Text, image, audio, and video converge in unified architectures." }
      ],
      footerLeft: "HISTORY",
      footerRight: "PAGE 05"
    },
    {
      id: "cb-quote-1",
      type: "quote",
      tag: "DATA PHILOSOPHY",
      quote: "Without data, you are just another person with an opinion.",
      author: "W. Edwards Deming",
      role: "Statistician",
      footerLeft: "AXIOMS",
      footerRight: "PAGE 06"
    },
    {
      id: "cb-image-split-1",
      type: "image-split",
      tag: "VISUALIZATION",
      headline: "Patterns in the Noise.",
      bodyText: "Data visualization is not decoration. It is the process of revealing hidden structures, correlations, and anomalies that raw numbers cannot convey.",
      imageUrl: "https://picsum.photos/seed/dataviz/800/1000",
      footerLeft: "VISUAL ENGINE",
      footerRight: "PAGE 07"
    },
    {
      id: "cb-cta-1",
      type: "cta",
      tag: "ACCESS DATA",
      headline: "Explore the Dataset.",
      subtext: "Full access to our research corpus and benchmarking tools. Available for institutional partners.",
      actionLabel: "REQUEST ACCESS",
      socialHandle: "@prismanalytics",
      footerLeft: "END OF REPORT",
      footerRight: "PAGE 08"
    }
  ]
};

export default contract;
