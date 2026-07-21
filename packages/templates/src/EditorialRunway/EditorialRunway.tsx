import { clampFontSize } from '@loopreel/design';
import { editorialRunwayTokens as t } from './tokens.js';
import {
  EditorialRunwayRenderContractSchema,
  type EditorialRunwayRenderContract,
  type PostMeta,
} from './contract.js';
import {
  SpineTab, RunningHead, CreditFooter,
  HookBody, ContentBody, ListBody, QuoteBody, StatBody, CtaBody,
} from './blocks.js';

export type SlideFormat = 'square' | 'portrait' | 'story' | 'landscape';

const FORMAT_DIMENSIONS: Record<SlideFormat, { width: number; height: number; formatClass: 'tall' | 'wide' }> = {
  square: { width: 1080, height: 1080, formatClass: 'tall' },
  portrait: { width: 1080, height: 1350, formatClass: 'tall' },
  story: { width: 1080, height: 1920, formatClass: 'tall' },
  landscape: { width: 1200, height: 627, formatClass: 'wide' },
};

interface Slide {
  index: number;
  type: 'hook' | 'content' | 'list' | 'quote' | 'stat' | 'cta';
  heading?: string;
  body?: string;
  kicker?: string;
  items?: string[];
  quote?: string;
  attribution?: string;
  value?: string;
  label?: string;
  ctaLabel?: string;
}

interface Props {
  content: EditorialRunwayRenderContract;
  slideIndex: number;
  format?: SlideFormat;
}

function toSlides(content: EditorialRunwayRenderContract): Slide[] {
  return [
    { index: 0, type: 'hook', heading: content.hook.heading, kicker: content.hook.kicker },
    ...content.slides.map((s, i) => ({ index: i + 1, ...s })),
    { index: content.slides.length + 1, type: 'cta', heading: content.cta.heading, ctaLabel: content.cta.ctaLabel },
  ];
}

export function EditorialRunway({ content, slideIndex, format = 'portrait' }: Props) {
  if (process.env.NODE_ENV !== 'production') {
    const check = EditorialRunwayRenderContractSchema.safeParse(content);
    if (!check.success) {
      throw new Error(`EditorialRunway received an invalid contract: ${check.error.message}`);
    }
  }

  const { width, height, formatClass } = FORMAT_DIMENSIONS[format];
  if (formatClass === 'wide') {
    console.warn('EditorialRunway: "landscape" format uses an unaudited scaled layout, not a dedicated composition.');
  }

  const scale = height / 1080;
  const slides = toSlides(content);
  const slide = slides.find(s => s.index === slideIndex) ?? slides[0]!;
  const meta: PostMeta = content.meta;

  const isDark = slide.type === 'hook' || slide.type === 'cta';
  const bg = isDark ? t.colors.ink : t.colors.paper;
  const fg = isDark ? t.colors.paper : t.colors.ink;
  const mutedFg = isDark ? 'rgba(231,228,217,0.55)' : 'rgba(21,19,15,0.5)';

  const category = content.hook.kicker;
  const pageMark = `${String(slide.index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  const spineWidth = Math.round(t.spacing.spineWidth * scale);

  const headingSize = clampFontSize((slide.heading ?? '').length, {
    min: (slide.type === 'hook' ? t.type.hookHeadingMin : t.type.contentHeadingMin) * scale,
    max: (slide.type === 'hook' ? t.type.hookHeadingMax : t.type.contentHeadingMax) * scale,
    pivot: 32,
  });
  const bodySize = clampFontSize((slide.body ?? '').length, {
    min: t.type.bodyMin * scale, max: t.type.bodyMax * scale, pivot: 220,
  });

  return (
    <div
      data-slide-type={slide.type}
      style={{
        boxSizing: 'border-box', width, height, backgroundColor: bg, color: fg,
        position: 'relative', display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        gridTemplateAreas: `"head" "body" "foot"`,
        fontFamily: t.fonts.utility, overflow: 'hidden',
      }}
    >
      <SpineTab width={spineWidth} label={`${meta.seriesName.toUpperCase()} · LOOK ${String(slide.index + 1).padStart(2, '0')}`} />

      <div style={{ gridArea: 'head', minWidth: 0, marginLeft: spineWidth, padding: `${t.spacing.framePadding * scale}px ${t.spacing.framePadding * scale}px 0` }}>
        <RunningHead
          left={isDark ? meta.seriesName : category}
          leftColor={isDark ? mutedFg : t.colors.accent}
          right={isDark && slide.type === 'hook' ? `VOL. ${new Date().getFullYear()}` : pageMark}
          mutedColor={mutedFg}
          scale={scale}
        />
      </div>

      <div style={{ gridArea: 'body', minHeight: 0, marginLeft: spineWidth, padding: `0 ${t.spacing.framePadding * scale}px`, display: 'flex', overflow: 'hidden' }}>
        {slide.type === 'hook' && <HookBody kicker={slide.kicker!} heading={slide.heading!} headingSize={headingSize} fg={fg} scale={scale} />}
        {slide.type === 'content' && <ContentBody heading={slide.heading!} body={slide.body!} headingSize={headingSize} bodySize={bodySize} fg={fg} scale={scale} />}
        {slide.type === 'list' && <ListBody heading={slide.heading!} headingSize={headingSize} items={slide.items!} fg={fg} scale={scale} />}
        {slide.type === 'quote' && <QuoteBody quote={slide.quote!} attribution={slide.attribution!} fg={fg} scale={scale} />}
        {slide.type === 'stat' && <StatBody value={slide.value!} label={slide.label!} body={slide.body} fg={fg} scale={scale} />}
        {slide.type === 'cta' && <CtaBody heading={slide.heading!} ctaLabel={slide.ctaLabel!} fg={fg} scale={scale} />}
      </div>

      <div style={{ gridArea: 'foot', minWidth: 0, marginLeft: spineWidth, padding: `0 ${t.spacing.framePadding * scale}px ${t.spacing.framePadding * scale}px` }}>
        <CreditFooter meta={meta} align={slide.type === 'cta' ? 'center' : 'left'} fg={fg} mutedFg={mutedFg} scale={scale} />
      </div>
    </div>
  );
}
