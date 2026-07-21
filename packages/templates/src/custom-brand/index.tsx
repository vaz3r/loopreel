import type { Slide } from './schema.js';
import { getHeadlineStyle, getBodyStyle, getThemeColors, getOverflowStyles, getImageCoverStyles, getImageSplitStyles, type BrandKit } from './engine.js';
import {
  RegMarks as EngineRegMarks,
  MicroHeader as EngineMicroHeader,
  MicroFooter as EngineMicroFooter,
  SafeArea as EngineSafeArea,
} from '../engine/components.js';
import {
  SmartHeadline, SmartBody, SmartStat,
  SmartEventDesc,
  SmartTimeline, SmartTimelineItem,
  SmartGrid, SmartTable, SmartTableBody, SmartTableCell,
} from '../engine/smart-components.js';

interface CustomBrandProps {
  slides: Slide[];
  platform?: string;
  brandKit?: BrandKit;
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/* ─── Theme-aware wrapper components ─── */

const RegMarks: React.FC<{ theme: ReturnType<typeof getThemeColors> }> = ({ theme }) => (
  <EngineRegMarks color={theme.border} />
);

const SafeArea: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  compact?: boolean;
  dataSmartCenter?: boolean;
}> = ({ children, style, compact, dataSmartCenter }) => (
  <EngineSafeArea
    compact={compact}
    top={compact ? 60 : undefined}
    bottom={compact ? 60 : 160}
    zIndex={10}
    style={style}
  >
    {dataSmartCenter ? (
      <div data-smart-center="data-smart-center" style={{ display: 'contents' }}>
        {children}
      </div>
    ) : children}
  </EngineSafeArea>
);

const MicroHeader: React.FC<{
  tag: string;
  theme: ReturnType<typeof getThemeColors>;
}> = ({ tag, theme }) => (
  <EngineMicroHeader
    tag={tag}
    color={hexToRgba(theme.text, 0.5)}
    accentColor={theme.accent}
    fontFamily={theme.fontSans}
    fontSize={22}
    gap={14}
  />
);

const MicroFooter: React.FC<{
  footerLeft: string;
  footerRight: string;
  theme: ReturnType<typeof getThemeColors>;
}> = ({ footerLeft, footerRight, theme }) => (
  <EngineMicroFooter
    footerLeft={footerLeft}
    footerRight={footerRight}
    color={hexToRgba(theme.text, 0.4)}
    fontFamily={theme.fontSans}
    fontSize={20}
    fontWeight={500}
    letterSpacing="0.05em"
  />
);

/* ─── Slide Layouts (11 types) ─── */

const CoverLayout: React.FC<{
  data: Extract<Slide, { type: 'cover' }>;
  theme: ReturnType<typeof getThemeColors>;
}> = ({ data, theme }) => {
  const headlineStyle = getHeadlineStyle(data.headline);
  return (
    <SafeArea compact style={{ justifyContent: 'center' }}>
      <SmartHeadline
        tag="h1"
        fontFamily={theme.fontSerif}
        style={{
          ...headlineStyle, ...getOverflowStyles(),
          letterSpacing: '-0.02em',
          color: theme.text,
        }}
      >
        {data.headline}
      </SmartHeadline>
      {data.subheadline && (
        <SmartBody
          fontFamily={theme.fontSans}
          style={{
            fontSize: '32px',
            fontWeight: '300',
            lineHeight: 1.4,
            marginTop: 40,
            color: hexToRgba(theme.text, 0.7),
            maxWidth: 700,
          }}
        >
          {data.subheadline}
        </SmartBody>
      )}
      {data.metadata && (
        <div
          style={{
            marginTop: 60,
            paddingTop: 24,
            borderTop: `1px solid ${theme.border}`,
            fontFamily: theme.fontSans,
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: hexToRgba(theme.text, 0.5),
          }}
        >
          {data.metadata}
        </div>
      )}
    </SafeArea>
  );
};

const DefinitionLayout: React.FC<{
  data: Extract<Slide, { type: 'definition' }>;
  theme: ReturnType<typeof getThemeColors>;
}> = ({ data, theme }) => (
  <SafeArea style={{ justifyContent: 'center' }}>
    <div
      style={{
        fontFamily: theme.fontSans,
        fontSize: 20,
        fontWeight: 600,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: theme.accent,
        marginBottom: 20,
      }}
    >
      Definition
    </div>
    <SmartHeadline
      tag="h2"
      fontFamily={theme.fontSerif}
      style={{
        fontSize: '72px',
        fontWeight: '300',
        fontStyle: 'italic',
        lineHeight: 1,
        margin: '0 0 8px 0',
        color: theme.text,
      }}
    >
      {data.term}
    </SmartHeadline>
    {data.phonetic && (
      <div
        style={{
          fontFamily: theme.fontMono,
          fontSize: '22px',
          fontWeight: '400',
          color: hexToRgba(theme.text, 0.5),
          marginBottom: 40,
        }}
      >
        {data.phonetic}
      </div>
    )}
    <div
      style={{
        width: 40,
        height: 2,
        background: theme.accent,
        marginBottom: 40,
      }}
    />
    <SmartBody
      fontFamily={theme.fontSans}
      style={{
        ...getBodyStyle(data.definition),
        lineHeight: 1.5,
        margin: 0,
        color: hexToRgba(theme.text, 0.85),
        maxWidth: 700,
      }}
    >
      {data.definition}
    </SmartBody>
    {data.example && (
      <SmartBody
        tag="div"
        fontFamily={theme.fontSerif}
        style={{
          marginTop: 40,
          padding: '20px 24px',
          borderLeft: `3px solid ${theme.accent}`,
          fontSize: '24px',
          fontWeight: '300',
          fontStyle: 'italic',
          lineHeight: 1.4,
          color: hexToRgba(theme.text, 0.6),
          maxWidth: 650,
        }}
      >
        {data.example}
      </SmartBody>
    )}
  </SafeArea>
);

const DichotomyLayout: React.FC<{
  data: Extract<Slide, { type: 'dichotomy' }>;
  theme: ReturnType<typeof getThemeColors>;
}> = ({ data, theme }) => {
  const headlineStyle = getHeadlineStyle(data.headline);
  return (
    <SafeArea style={{ justifyContent: 'space-between' }}>
      <SmartHeadline
        tag="h2"
        fontFamily={theme.fontSerif}
        style={{
          ...headlineStyle, ...getOverflowStyles(),
          letterSpacing: '-0.02em',
          margin: 0,
          color: theme.text,
        }}
      >
        {data.headline}
      </SmartHeadline>
      <div
        style={{
          display: 'flex',
          gap: 40,
          flex: 1,
          alignItems: 'center',
        }}
      >
        {(['left', 'right'] as const).map((side) => (
          <div
            key={side}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <div
              style={{
                width: '100%',
                height: 2,
                background: side === 'left' ? theme.accent : hexToRgba(theme.text, 0.15),
              }}
            />
            <h3
              style={{
                fontFamily: theme.fontSans,
                fontSize: '24px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                margin: 0,
                color: theme.text,
              }}
            >
              {data[side].title}
            </h3>
            <SmartBody
              fontFamily={theme.fontSans}
              style={{
                ...getBodyStyle(data[side].desc),
                lineHeight: 1.4,
                margin: 0,
                color: hexToRgba(theme.text, 0.7),
              }}
            >
              {data[side].desc}
            </SmartBody>
          </div>
        ))}
      </div>
    </SafeArea>
  );
};

const TimelineLayout: React.FC<{
  data: Extract<Slide, { type: 'timeline' }>;
  theme: ReturnType<typeof getThemeColors>;
}> = ({ data, theme }) => {
  const headlineStyle = getHeadlineStyle(data.headline);
  return (
    <SafeArea>
      <SmartHeadline
        tag="h2"
        fontFamily={theme.fontSerif}
        style={{
          ...headlineStyle, ...getOverflowStyles(),
          letterSpacing: '-0.02em',
          margin: '0 0 40px 0',
          color: theme.text,
          flexShrink: 0,
        }}
      >
        {data.headline}
      </SmartHeadline>
      <SmartTimeline style={{ flex: 1, overflow: 'hidden' }}>
        {data.events.map((event, idx) => (
          <SmartTimelineItem
            key={idx}
            style={{
              display: 'flex',
              gap: 24,
              flex: 1,
              minHeight: 0,
              alignItems: 'flex-start',
              borderTop: idx === 0 ? `1px solid ${theme.border}` : 'none',
              borderBottom: `1px solid ${theme.border}`,
              padding: '12px 0',
              overflow: 'hidden',
            }}
          >
            <span
              style={{
                fontFamily: theme.fontMono,
                fontSize: '20px',
                fontWeight: '400',
                color: theme.accent,
                minWidth: 120,
                flexShrink: 0,
                paddingTop: 4,
              }}
            >
              {event.date}
            </span>
            <div style={{ flex: 1 }}>
              <h4
                style={{
                  fontFamily: theme.fontSans,
                  fontSize: '22px',
                  fontWeight: '700',
                  margin: '0 0 4px 0',
                  color: theme.text,
                }}
              >
                {event.title}
              </h4>
              <SmartEventDesc
                fontFamily={theme.fontSans}
                style={{
                  fontSize: '20px',
                  fontWeight: '300',
                  lineHeight: 1.3,
                  color: hexToRgba(theme.text, 0.65),
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {event.desc}
              </SmartEventDesc>
            </div>
          </SmartTimelineItem>
        ))}
      </SmartTimeline>
    </SafeArea>
  );
};

const QuoteLayout: React.FC<{
  data: Extract<Slide, { type: 'quote' }>;
  theme: ReturnType<typeof getThemeColors>;
}> = ({ data, theme }) => (
  <SafeArea style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
    <div style={{ position: 'relative', width: '100%' }}>
      <div
        style={{
          width: 2,
          height: 100,
          background: theme.accent,
          margin: '0 auto 48px',
        }}
      />
      <SmartBody
        tag="blockquote"
        fontFamily={theme.fontSerif}
        style={{
          fontSize: '60px',
          fontWeight: '300',
          fontStyle: 'italic',
          lineHeight: 1.15,
          letterSpacing: '-0.01em',
          margin: '0 0 48px 0',
          color: theme.text,
        }}
      >
        &ldquo;{data.quote}&rdquo;
      </SmartBody>
      <div
        style={{
          fontFamily: theme.fontSans,
          fontSize: '20px',
          fontWeight: '600',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: hexToRgba(theme.text, 0.6),
        }}
      >
        {data.author}
        {data.role && (
          <span
            style={{
              fontWeight: '400',
              letterSpacing: '0.05em',
              color: hexToRgba(theme.text, 0.4),
            }}
          >
            {' '}&middot; {data.role}
          </span>
        )}
      </div>
    </div>
  </SafeArea>
);

const SequenceLayout: React.FC<{
  data: Extract<Slide, { type: 'sequence' }>;
  theme: ReturnType<typeof getThemeColors>;
}> = ({ data, theme }) => {
  const headlineStyle = getHeadlineStyle(data.headline);
  return (
    <SafeArea>
      <SmartHeadline
        tag="h2"
        fontFamily={theme.fontSerif}
        style={{
          ...headlineStyle, ...getOverflowStyles(),
          letterSpacing: '-0.02em',
          margin: '0 0 40px 0',
          color: theme.text,
          flexShrink: 0,
        }}
      >
        {data.headline}
      </SmartHeadline>
      <SmartTimeline style={{ flex: 1, overflow: 'hidden' }}>
        {data.items.map((item, idx) => (
          <SmartTimelineItem
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 24,
              flex: 1,
              minHeight: 0,
              borderTop: idx === 0 ? `1px solid ${theme.border}` : 'none',
              borderBottom: `1px solid ${theme.border}`,
              padding: '12px 0',
              overflow: 'hidden',
            }}
          >
            <span
              style={{
                fontFamily: theme.fontMono,
                fontSize: '28px',
                fontWeight: '400',
                color: theme.accent,
                minWidth: 50,
                flexShrink: 0,
              }}
            >
              {String(item.num).padStart(2, '0')}
            </span>
            <div style={{ flex: 1 }}>
              <h4
                style={{
                  fontFamily: theme.fontSans,
                  fontSize: '22px',
                  fontWeight: '700',
                  margin: '0 0 4px 0',
                  color: theme.text,
                }}
              >
                {item.title}
              </h4>
              <SmartEventDesc
                fontFamily={theme.fontSans}
                style={{
                  fontSize: '20px',
                  fontWeight: '300',
                  lineHeight: 1.3,
                  color: hexToRgba(theme.text, 0.65),
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {item.desc}
              </SmartEventDesc>
            </div>
          </SmartTimelineItem>
        ))}
      </SmartTimeline>
    </SafeArea>
  );
};

const TelemetryLayout: React.FC<{
  data: Extract<Slide, { type: 'telemetry' }>;
  theme: ReturnType<typeof getThemeColors>;
}> = ({ data, theme }) => {
  const headlineStyle = getHeadlineStyle(data.headline);
  return (
    <SafeArea style={{ justifyContent: 'space-between' }}>
      <SmartHeadline
        tag="h2"
        fontFamily={theme.fontSerif}
        style={{
          ...headlineStyle, ...getOverflowStyles(),
          letterSpacing: '-0.02em',
          margin: '0 0 40px 0',
          color: theme.text,
          flexShrink: 0,
        }}
      >
        {data.headline}
      </SmartHeadline>
      <SmartGrid columns={data.stats.length <= 4 ? 2 : 3} gap={40} style={{ flex: 1, alignItems: 'center' }}>
        {data.stats.map((stat, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
            <SmartStat
              fontFamily={theme.fontSans}
              style={{
                fontSize: '80px',
                fontWeight: '700',
                lineHeight: 0.85,
                letterSpacing: '-0.03em',
                color: theme.text,
              }}
            >
              {stat.value}
            </SmartStat>
            <span
              style={{
                fontFamily: theme.fontSans,
                fontSize: '20px',
                fontWeight: '500',
                letterSpacing: '0.05em',
                marginTop: 12,
                color: hexToRgba(theme.text, 0.55),
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </SmartGrid>
    </SafeArea>
  );
};

const TableLayout: React.FC<{
  data: Extract<Slide, { type: 'table' }>;
  theme: ReturnType<typeof getThemeColors>;
}> = ({ data, theme }) => {
  const headlineStyle = getHeadlineStyle(data.headline);
  return (
    <SafeArea>
      <SmartHeadline
        tag="h2"
        fontFamily={theme.fontSerif}
        style={{
          ...headlineStyle, ...getOverflowStyles(),
          letterSpacing: '-0.02em',
          margin: '0 0 40px 0',
          color: theme.text,
          flexShrink: 0,
        }}
      >
        {data.headline}
      </SmartHeadline>
      <SmartTable style={{ overflow: 'hidden' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${data.headers.length}, 1fr)`,
            borderBottom: `2px solid ${theme.text}`,
            paddingBottom: 12,
            marginBottom: 8,
          }}
        >
          {data.headers.map((h, i) => (
            <span
              key={i}
              style={{
                fontFamily: theme.fontSans,
                fontSize: '20px',
                fontWeight: '700',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: theme.text,
              }}
            >
              {h}
            </span>
          ))}
        </div>
        <SmartTableBody style={{ overflow: 'hidden' }}>
          {data.rows.map((row, rowIdx) => (
            <div
              key={rowIdx}
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${data.headers.length}, 1fr)`,
                borderBottom: `1px solid ${theme.gridBorder}`,
                padding: '14px 0',
                flex: 1,
                minHeight: 0,
                alignItems: 'center',
              }}
            >
              {row.map((cell, cellIdx) => (
                <SmartTableCell
                  key={cellIdx}
                  fontFamily={theme.fontSans}
                  fontWeight={cellIdx === 0 ? 600 : 400}
                  color={theme.text}
                  style={{
                    fontSize: '20px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {cell}
                </SmartTableCell>
              ))}
            </div>
          ))}
        </SmartTableBody>
      </SmartTable>
    </SafeArea>
  );
};

const ImageSplitLayout: React.FC<{
  data: Extract<Slide, { type: 'image-split' }>;
  theme: ReturnType<typeof getThemeColors>;
}> = ({ data, theme }) => {
  const headlineStyle = getHeadlineStyle(data.headline);
  return (
    <SafeArea>
      <div style={{ display: 'flex', gap: 40, flex: 1, alignItems: 'center' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <SmartHeadline
            tag="h2"
            fontFamily={theme.fontSerif}
            style={{
              ...headlineStyle, ...getOverflowStyles(),
              letterSpacing: '-0.02em',
              margin: '0 0 24px 0',
              color: theme.text,
            }}
          >
            {data.headline}
          </SmartHeadline>
          <SmartBody
            fontFamily={theme.fontSans}
            style={{
              ...getBodyStyle(data.bodyText),
              ...getOverflowStyles({ maxLines: 6 }),
              margin: 0,
              color: hexToRgba(theme.text, 0.75),
            }}
          >
            {data.bodyText}
          </SmartBody>
        </div>
        <div
          style={{
            flex: 1,
            aspectRatio: '4/5',
            borderRadius: 12,
            background: hexToRgba(theme.text, 0.06),
            border: `1px solid ${theme.gridBorder}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {data.imageUrl ? (
            <img
              src={data.imageUrl}
              alt={data.imageKeywords ?? ''}
              style={getImageSplitStyles('dark').image}
            />
          ) : (
            <span
              style={{
                fontFamily: theme.fontSans,
                fontSize: 20,
                color: hexToRgba(theme.text, 0.3),
                textAlign: 'center',
                padding: 20,
              }}
            >
              {data.imageKeywords ?? 'Image'}
            </span>
          )}
        </div>
      </div>
    </SafeArea>
  );
};

const ImageCoverLayout: React.FC<{
  data: Extract<Slide, { type: 'image-cover' }>;
  theme: ReturnType<typeof getThemeColors>;
}> = ({ data, theme }) => {
  const headlineStyle = getHeadlineStyle(data.headline);
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: hexToRgba(theme.text, 0.06),
        }}
      >
        {data.imageUrl ? (
          <img
            src={data.imageUrl}
            alt={data.imageKeywords ?? ''}
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: getImageCoverStyles('dark').image.filter }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: theme.fontSans,
              fontSize: 20,
              color: hexToRgba(theme.text, 0.2),
            }}
          >
            {data.imageKeywords ?? 'Image'}
          </div>
        )}
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(to top, ${theme.bg} 0%, ${hexToRgba(theme.bg, 0.8)} 40%, transparent 100%)`,
        }}
      />
      <SafeArea style={{ justifyContent: 'flex-end' }}>
        <SmartHeadline
          tag="h2"
          fontFamily={theme.fontSerif}
          style={{
            ...headlineStyle, ...getOverflowStyles(),
            letterSpacing: '-0.02em',
            margin: '0 0 16px 0',
            color: theme.text,
          }}
        >
          {data.headline}
        </SmartHeadline>
        <SmartBody
          fontFamily={theme.fontSans}
          style={{
            ...getBodyStyle(data.subtext),
            lineHeight: 1.4,
            margin: 0,
            color: hexToRgba(theme.text, 0.75),
            maxWidth: 600,
          }}
        >
          {data.subtext}
        </SmartBody>
      </SafeArea>
    </div>
  );
};

const CtaLayout: React.FC<{
  data: Extract<Slide, { type: 'cta' }>;
  theme: ReturnType<typeof getThemeColors>;
}> = ({ data, theme }) => {
  const headlineStyle = getHeadlineStyle(data.headline);
  return (
    <SafeArea compact dataSmartCenter style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <SmartHeadline
        tag="h2"
        fontFamily={theme.fontSerif}
        style={{
          ...headlineStyle, ...getOverflowStyles(),
          letterSpacing: '-0.02em',
          margin: '0 0 24px 0',
          color: theme.text,
        }}
      >
        {data.headline}
      </SmartHeadline>
      {data.subtext && (
        <SmartBody
          fontFamily={theme.fontSans}
          style={{
            fontSize: '24px',
            fontWeight: '300',
            lineHeight: 1.4,
            margin: '0 0 48px 0',
            color: hexToRgba(theme.text, 0.6),
            maxWidth: 500,
          }}
        >
          {data.subtext}
        </SmartBody>
      )}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          padding: '20px 48px',
          borderRadius: 200,
          background: theme.accent,
          color: '#FFFFFF',
          fontFamily: theme.fontSans,
          fontSize: '20px',
          fontWeight: '700',
          letterSpacing: '0.04em',
        }}
      >
        {data.actionLabel}
        <span style={{ fontSize: 24, lineHeight: 1 }}>&rarr;</span>
      </div>
      {data.socialHandle && (
        <div
          style={{
            marginTop: 32,
            fontFamily: theme.fontSans,
            fontSize: '20px',
            fontWeight: '500',
            color: hexToRgba(theme.text, 0.4),
          }}
        >
          {data.socialHandle}
        </div>
      )}
    </SafeArea>
  );
};

/* ─── Slide Registry ─── */

const SLIDE_LAYOUTS: Record<string, React.FC<{ data: any; theme: ReturnType<typeof getThemeColors> }>> = {
  cover: CoverLayout,
  definition: DefinitionLayout,
  dichotomy: DichotomyLayout,
  timeline: TimelineLayout,
  quote: QuoteLayout,
  sequence: SequenceLayout,
  telemetry: TelemetryLayout,
  table: TableLayout,
  'image-split': ImageSplitLayout,
  'image-cover': ImageCoverLayout,
  cta: CtaLayout,
};

/* ─── Main Component ─── */

function CustomBrandTemplate({ slides, brandKit }: CustomBrandProps) {
  const theme = getThemeColors(brandKit);

  return (
    <div
      style={{
        position: 'relative',
        width: 1080,
        height: 1350,
        overflow: 'hidden',
        background: theme.bg,
        color: theme.text,
        fontFamily: theme.fontSans,
      }}
    >
      {slides.map((slide, idx) => {
        const Layout = (SLIDE_LAYOUTS[slide.type] ?? CoverLayout) as React.FC<{ data: Slide; theme: ReturnType<typeof getThemeColors> }>;
        return (
          <div
            key={idx}
            style={{
              position: 'relative',
              width: 1080,
              height: 1350,
              overflow: 'hidden',
              background: theme.bg,
              pageBreakAfter: 'always',
            }}
          >
            <RegMarks theme={theme} />
            <MicroHeader tag={slide.tag} theme={theme} />
            <Layout data={slide} theme={theme} />
            <MicroFooter
              footerLeft={slide.footerLeft}
              footerRight={slide.footerRight}
              theme={theme}
            />
          </div>
        );
      })}
    </div>
  );
}

export function CustomBrandSingle({
  slide,
  brandKit,
}: {
  slide: Slide;
  brandKit?: BrandKit;
}) {
  const theme = getThemeColors(brandKit);
  const Layout = (SLIDE_LAYOUTS[slide.type] ?? CoverLayout) as React.FC<{ data: Slide; theme: ReturnType<typeof getThemeColors> }>;

  return (
    <div
      style={{
        position: 'relative',
        width: 1080,
        height: 1350,
        overflow: 'hidden',
        background: theme.bg,
        color: theme.text,
        fontFamily: theme.fontSans,
      }}
    >
      <RegMarks theme={theme} />
      <MicroHeader tag={slide.tag} theme={theme} />
      <Layout data={slide} theme={theme} />
      <MicroFooter
        footerLeft={slide.footerLeft}
        footerRight={slide.footerRight}
        theme={theme}
      />
    </div>
  );
}

export default CustomBrandTemplate;
