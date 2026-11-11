import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Layers, Quote, Sparkles } from 'lucide-react';
import type { BespokeDeck, BespokeSlide } from '@/api/client';

export function StoryboardInspector({ deck }: { deck?: BespokeDeck }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (!deck || !deck.slides || deck.slides.length === 0) return null;

  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-emerald-400" />
          <h3 className="text-[13px] font-semibold text-text-primary">
            Editorial Storyboard & Copy Breakdown
          </h3>
        </div>
        <span className="text-[11px] font-mono text-text-quaternary">
          {deck.slides.length} slides authored
        </span>
      </div>

      {/* Editorial Hook & Core Conflict if present */}
      {deck.hook && (
        <div className="p-3.5 rounded-lg border border-border bg-surface-2">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider text-emerald-400 mb-1">
            <Sparkles className="h-3 w-3" />
            Scroll-Stopping Hook & Strategic Angle
          </div>
          <p className="text-[14px] font-medium text-text-primary">
            "{deck.hook}"
          </p>
        </div>
      )}

      {/* Slides Accordion / Cards List */}
      <div className="space-y-2">
        {deck.slides.map((slide: BespokeSlide, idx: number) => {
          const isExpanded = expandedIndex === idx;
          const slideNum = idx + 1;
          const archetype = slide.type || 'content';

          return (
            <div
              key={slide.id || idx}
              className="rounded-lg border border-border bg-surface-2 transition-colors overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className="w-full flex items-center justify-between p-3.5 text-left hover:bg-surface-hover transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 pr-4">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-surface-3 text-[11px] font-mono font-bold text-text-primary shrink-0 border border-border">
                    {slideNum}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-text-primary truncate">
                      {slide.title || slide.headline || `Slide ${slideNum}`}
                    </p>
                    <p className="text-[11px] text-text-quaternary truncate">
                      {slide.subtitle || (slide.cards?.[0]?.body ?? '')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-surface-3 text-text-tertiary border border-border">
                    {archetype}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-text-quaternary" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-text-quaternary" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="p-4 pt-1 border-t border-border/60 bg-background/50 space-y-3">
                  {slide.headline && slide.headline !== slide.title && (
                    <div>
                      <p className="text-[10px] uppercase font-mono tracking-wider text-text-quaternary">
                        Headline
                      </p>
                      <p className="text-[13px] text-text-primary font-medium mt-0.5">
                        {slide.headline}
                      </p>
                    </div>
                  )}

                  {slide.cards && slide.cards.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {slide.cards.map((card, cIdx) => (
                        <div key={cIdx} className="p-2.5 rounded border border-border bg-surface-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[12px] font-semibold text-text-primary">
                              {card.title}
                            </span>
                            {card.badge && (
                              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                                {card.badge}
                              </span>
                            )}
                          </div>
                          {card.body && (
                            <p className="text-[11px] text-text-secondary mt-1 leading-snug">
                              {card.body}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {slide.quote && (
                    <div className="flex items-start gap-2 p-3 rounded border border-border bg-surface-2 text-[12px]">
                      <Quote className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="italic text-text-secondary">"{slide.quote.text}"</p>
                        {slide.quote.author && (
                          <p className="text-[11px] font-medium text-text-tertiary mt-1">
                            — {slide.quote.author} {slide.quote.source ? `(${slide.quote.source})` : ''}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {slide.svgBlueprint && (
                    <div className="text-[11px] text-text-tertiary flex items-center gap-1.5 pt-1">
                      <Layers className="h-3 w-3 text-text-quaternary" />
                      <span className="font-mono text-text-quaternary">SVG Concept:</span>
                      <span className="truncate">{slide.svgBlueprint}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
