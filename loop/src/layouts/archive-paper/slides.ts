import type { VoidContract } from '../../../schema';

const contract: VoidContract = {
  slides: [
    {
      id: "ap-cover-1",
      type: "cover",
      tag: "DIGITAL FRONTIER // 01",
      headline: "THE SINGULARITY PLAYBOOK",
      subheadline: "A tactical field guide to navigating the convergence of artificial intelligence, quantum computing, and decentralized systems.",
      metadata: "VOL. 12 — FUTURE TECH",
      footerLeft: "NEXUS LABS",
      footerRight: "PAGE 01"
    },
    {
      id: "ap-timeline-1",
      type: "timeline",
      tag: "TECHNOLOGY ROADMAP",
      headline: "Convergence Timeline",
      events: [
        { date: "2024 Q1", title: "LLM Saturation", desc: "Foundation models reach commodity status. Differentiation shifts from model size to application layer innovation." },
        { date: "2024 Q3", title: "Edge AI Deployment", desc: "On-device inference becomes viable for real-time applications. Privacy-first architectures gain traction." },
        { date: "2025 Q1", title: "Quantum Advantage", desc: "First commercial quantum systems demonstrate practical advantage in drug discovery and materials science." },
        { date: "2025 Q3", title: "Neural Interface", desc: "Brain-computer interfaces enter clinical trials for cognitive enhancement and accessibility applications." },
        { date: "2026 Q1", title: "Autonomous Systems", desc: "Full-stack autonomous agents capable of multi-step reasoning and tool use become mainstream." }
      ],
      footerLeft: "HORIZON SCAN",
      footerRight: "PAGE 02"
    },
    {
      id: "ap-sequence-1",
      type: "sequence",
      tag: "IMPLEMENTATION PROTOCOL",
      headline: "The Seven Layers of AI Integration.",
      items: [
        { num: "01", title: "Data Infrastructure", desc: "Build the foundation: pipelines, warehouses, and governance frameworks." },
        { num: "02", title: "Model Selection", desc: "Choose the right architecture for your domain and latency requirements." },
        { num: "03", title: "Fine-Tuning", desc: "Adapt base models to your specific use case with curated datasets." },
        { num: "04", title: "Evaluation Framework", desc: "Establish metrics, benchmarks, and automated testing pipelines." },
        { num: "05", title: "Deployment Strategy", desc: "Edge vs cloud, serverless vs dedicated, real-time vs batch." },
        { num: "06", title: "Monitoring & Observability", desc: "Track model drift, latency, and cost in production environments." },
        { num: "07", title: "Iterative Improvement", desc: "Close the loop with user feedback and continuous learning pipelines." }
      ],
      footerLeft: "ENGINEERING",
      footerRight: "PAGE 03"
    },
    {
      id: "ap-image-split-1",
      type: "image-split",
      tag: "VISUAL EXPLORATION",
      headline: "The Neural Aesthetic.",
      bodyText: "As algorithms become more sophisticated, the visual language of technology evolves. Generative art, procedural design, and AI-assisted creativity are redefining what we consider beautiful.",
      imageUrl: "https://picsum.photos/seed/neural/800/1000",
      footerLeft: "CREATIVE ENGINE",
      footerRight: "PAGE 04"
    },
    {
      id: "ap-telemetry-1",
      type: "telemetry",
      tag: "PERFORMANCE METRICS",
      headline: "AI Adoption Velocity.",
      stats: [
        { value: "87%", label: "Enterprise Adoption" },
        { value: "14x", label: "ROI Multiplier" },
        { value: "340ms", label: "Avg Latency" },
        { value: "99.7%", label: "Uptime SLA" }
      ],
      footerLeft: "BENCHMARK 04",
      footerRight: "PAGE 05"
    },
    {
      id: "ap-def-1",
      type: "definition",
      tag: "TERM // 01",
      term: "Hallucination",
      phonetic: "/ˌhæl.əˈsɪn.eɪ.ʃən/",
      definition: "A phenomenon where a large language model generates plausible-sounding but factually incorrect or fabricated information. Often indistinguishable from accurate outputs without domain expertise.",
      example: "e.g., Citing a research paper that does not exist with a convincing DOI number.",
      footerLeft: "GLOSSARY",
      footerRight: "PAGE 06"
    },
    {
      id: "ap-cta-1",
      type: "cta",
      tag: "DEPLOY NOW",
      headline: "Join the Vanguard.",
      subtext: "Early access to our AI integration framework. Limited slots for organizations ready to transform.",
      actionLabel: "REQUEST ACCESS",
      socialHandle: "@nexuslabs",
      footerLeft: "END TRANSMISSION",
      footerRight: "PAGE 07"
    }
  ]
};

export default contract;
