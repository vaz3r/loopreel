import React from "react";
import type { Slide } from "./schema.js";
import {
  getHeadlineStyle,
  getBodyStyle,
  getThemeColors,
} from "./engine.js";

const theme = getThemeColors();

const WIDTH = 1080;
const HEIGHT = 1350;

// ─── RegMarks ────────────────────────────────────────────────

function RegMarks() {
  const mark = (
    <div
      style={{
        position: "absolute",
        width: 30,
        height: 30,
        border: `2px solid rgba(17,17,17,0.20)`,
      }}
    />
  );
  return (
    <>
      <div style={{ position: "absolute", top: 20, left: 20 }}>{mark}</div>
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          transform: "scaleX(-1)",
        }}
      >
        {mark}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          transform: "scaleY(-1)",
        }}
      >
        {mark}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          transform: "scale(-1,-1)",
        }}
      >
        {mark}
      </div>
    </>
  );
}

// ─── Crosshairs ──────────────────────────────────────────────

function Crosshairs() {
  const lineH = (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: 60,
        right: 60,
        height: 1,
        backgroundColor: "rgba(17,17,17,0.12)",
        transform: "translateY(-50%)",
      }}
    />
  );
  const lineV = (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 60,
        bottom: 60,
        width: 1,
        backgroundColor: "rgba(17,17,17,0.12)",
        transform: "translateX(-50%)",
      }}
    />
  );
  return (
    <>
      {lineH}
      {lineV}
    </>
  );
}

// ─── SafeArea ────────────────────────────────────────────────

function SafeArea({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 80,
        left: 80,
        right: 80,
        bottom: 80,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  );
}

// ─── MicroHeader ─────────────────────────────────────────────

function MicroHeader({ tag }: { tag: string }) {
  return (
    <div
      style={{
        fontFamily: theme.fontSans,
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: theme.text,
        opacity: 0.6,
        marginBottom: 8,
      }}
    >
      {tag}
    </div>
  );
}

// ─── MicroFooter ─────────────────────────────────────────────

function MicroFooter({
  footerLeft,
  footerRight,
}: {
  footerLeft: string;
  footerRight: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 36,
        left: 80,
        right: 80,
        display: "flex",
        justifyContent: "space-between",
        fontFamily: theme.fontSans,
        fontSize: 13,
        color: theme.text,
        opacity: 0.5,
      }}
    >
      <span>{footerLeft}</span>
      <span>{footerRight}</span>
    </div>
  );
}

// ─── Slide Layouts ───────────────────────────────────────────

function CoverSlide({ slide }: { slide: Extract<Slide, { type: "cover" }> }) {
  const hs = getHeadlineStyle(slide.headline);
  return (
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: theme.bg,
        position: "relative",
        overflow: "hidden",
        color: theme.text,
      }}
    >
      <RegMarks />
      <Crosshairs />
      <SafeArea>
        <MicroHeader tag={slide.tag} />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              fontFamily: theme.fontSerif,
              fontSize: Number(hs.fontSize),
              fontWeight: hs.fontWeight,
              fontStyle: hs.fontStyle,
              lineHeight: 1.05,
            }}
          >
            {slide.headline}
          </div>
          <div
            style={{
              fontFamily: theme.fontSans,
              fontSize: 28,
              fontWeight: 300,
              lineHeight: 1.5,
              maxWidth: 700,
              color: theme.text,
              opacity: 0.7,
            }}
          >
            {slide.subheadline}
          </div>
          {slide.metadata && (
            <div
              style={{
                fontFamily: theme.fontMono,
                fontSize: 14,
                color: theme.accent,
                marginTop: 16,
                letterSpacing: "0.05em",
              }}
            >
              {slide.metadata}
            </div>
          )}
        </div>
      </SafeArea>
      <MicroFooter
        footerLeft={slide.footerLeft}
        footerRight={slide.footerRight}
      />
    </div>
  );
}

function DefinitionSlide({
  slide,
}: {
  slide: Extract<Slide, { type: "definition" }>;
}) {
  return (
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: theme.bg,
        position: "relative",
        overflow: "hidden",
        color: theme.text,
      }}
    >
      <RegMarks />
      <Crosshairs />
      <SafeArea>
        <MicroHeader tag={slide.tag} />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              fontFamily: theme.fontSerif,
              fontSize: 72,
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1.1,
            }}
          >
            {slide.term}
          </div>
          {slide.phonetic && (
            <div
              style={{
                fontFamily: theme.fontMono,
                fontSize: 20,
                color: theme.accent,
                opacity: 0.7,
              }}
            >
              {slide.phonetic}
            </div>
          )}
          <div
            style={{
              width: 60,
              height: 2,
              backgroundColor: theme.accent,
              margin: "12px 0",
            }}
          />
          <div
            style={{
              fontFamily: theme.fontSans,
              fontSize: 28,
              fontWeight: 300,
              lineHeight: 1.6,
              maxWidth: 800,
            }}
          >
            {slide.definition}
          </div>
          {slide.example && (
            <div
              style={{
                fontFamily: theme.fontSans,
                fontSize: 20,
                fontWeight: 400,
                fontStyle: "italic",
                color: theme.text,
                opacity: 0.6,
                marginTop: 8,
                paddingLeft: 16,
                borderLeft: `3px solid ${theme.accent}`,
              }}
            >
              {slide.example}
            </div>
          )}
        </div>
      </SafeArea>
      <MicroFooter
        footerLeft={slide.footerLeft}
        footerRight={slide.footerRight}
      />
    </div>
  );
}

function DichotomySlide({
  slide,
}: {
  slide: Extract<Slide, { type: "dichotomy" }>;
}) {
  return (
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: theme.bg,
        position: "relative",
        overflow: "hidden",
        color: theme.text,
      }}
    >
      <RegMarks />
      <Crosshairs />
      <SafeArea>
        <MicroHeader tag={slide.tag} />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 40,
          }}
        >
          <div
            style={{
              fontFamily: theme.fontSerif,
              fontSize: 54,
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1.1,
            }}
          >
            {slide.headline}
          </div>
          <div style={{ display: "flex", gap: 40 }}>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: theme.fontSans,
                  fontSize: 16,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: theme.accent,
                  marginBottom: 12,
                }}
              >
                {slide.left.title}
              </div>
              <div
                style={{
                  fontFamily: theme.fontSans,
                  fontSize: 22,
                  fontWeight: 300,
                  lineHeight: 1.5,
                }}
              >
                {slide.left.desc}
              </div>
            </div>
            <div
              style={{
                width: 1,
                backgroundColor: theme.border,
                alignSelf: "stretch",
              }}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: theme.fontSans,
                  fontSize: 16,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: theme.accent,
                  marginBottom: 12,
                }}
              >
                {slide.right.title}
              </div>
              <div
                style={{
                  fontFamily: theme.fontSans,
                  fontSize: 22,
                  fontWeight: 300,
                  lineHeight: 1.5,
                }}
              >
                {slide.right.desc}
              </div>
            </div>
          </div>
        </div>
      </SafeArea>
      <MicroFooter
        footerLeft={slide.footerLeft}
        footerRight={slide.footerRight}
      />
    </div>
  );
}

function TimelineSlide({
  slide,
}: {
  slide: Extract<Slide, { type: "timeline" }>;
}) {
  return (
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: theme.bg,
        position: "relative",
        overflow: "hidden",
        color: theme.text,
      }}
    >
      <RegMarks />
      <Crosshairs />
      <SafeArea>
        <MicroHeader tag={slide.tag} />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 32,
          }}
        >
          <div
            style={{
              fontFamily: theme.fontSerif,
              fontSize: 54,
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1.1,
            }}
          >
            {slide.headline}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              position: "relative",
              paddingLeft: 32,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 8,
                top: 8,
                bottom: 8,
                width: 1,
                backgroundColor: theme.accent,
                opacity: 0.3,
              }}
            />
            {slide.events.map((ev: { date: string; title: string; desc: string }, i: number) => (
              <div key={i} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div
                  style={{
                    position: "absolute",
                    left: 3,
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: theme.accent,
                    top: 8 + i * 80,
                  }}
                />
                <div style={{ minWidth: 120 }}>
                  <div
                    style={{
                      fontFamily: theme.fontMono,
                      fontSize: 14,
                      color: theme.accent,
                      opacity: 0.8,
                    }}
                  >
                    {ev.date}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: theme.fontSerif,
                      fontSize: 24,
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  >
                    {ev.title}
                  </div>
                  <div
                    style={{
                      fontFamily: theme.fontSans,
                      fontSize: 18,
                      fontWeight: 300,
                      color: theme.text,
                      opacity: 0.7,
                    }}
                  >
                    {ev.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SafeArea>
      <MicroFooter
        footerLeft={slide.footerLeft}
        footerRight={slide.footerRight}
      />
    </div>
  );
}

function QuoteSlide({
  slide,
}: {
  slide: Extract<Slide, { type: "quote" }>;
}) {
  return (
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: theme.bg,
        position: "relative",
        overflow: "hidden",
        color: theme.text,
      }}
    >
      <RegMarks />
      <Crosshairs />
      <SafeArea>
        <MicroHeader tag={slide.tag} />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 32,
          }}
        >
          <div
            style={{
              fontFamily: theme.fontSerif,
              fontSize: 180,
              lineHeight: 0.6,
              color: theme.accent,
              opacity: 0.2,
              fontWeight: 300,
            }}
          >
            &#8220;
          </div>
          <div
            style={{
              fontFamily: theme.fontSerif,
              fontSize: 36,
              fontWeight: 400,
              fontStyle: "italic",
              lineHeight: 1.5,
              maxWidth: 800,
              marginTop: -40,
            }}
          >
            {slide.quote}
          </div>
          <div>
            <div
              style={{
                fontFamily: theme.fontSans,
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              {slide.author}
            </div>
            {slide.role && (
              <div
                style={{
                  fontFamily: theme.fontSans,
                  fontSize: 16,
                  fontWeight: 300,
                  color: theme.text,
                  opacity: 0.6,
                  marginTop: 4,
                }}
              >
                {slide.role}
              </div>
            )}
          </div>
        </div>
      </SafeArea>
      <MicroFooter
        footerLeft={slide.footerLeft}
        footerRight={slide.footerRight}
      />
    </div>
  );
}

function SequenceSlide({
  slide,
}: {
  slide: Extract<Slide, { type: "sequence" }>;
}) {
  return (
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: theme.bg,
        position: "relative",
        overflow: "hidden",
        color: theme.text,
      }}
    >
      <RegMarks />
      <Crosshairs />
      <SafeArea>
        <MicroHeader tag={slide.tag} />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 28,
          }}
        >
          <div
            style={{
              fontFamily: theme.fontSerif,
              fontSize: 54,
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1.1,
            }}
          >
            {slide.headline}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {slide.items.map((item: { num: number; title: string; desc: string }, i: number) => (
              <div
                key={i}
                style={{ display: "flex", gap: 20, alignItems: "flex-start" }}
              >
                <div
                  style={{
                    fontFamily: theme.fontMono,
                    fontSize: 48,
                    fontWeight: 300,
                    color: theme.accent,
                    opacity: 0.4,
                    minWidth: 70,
                    lineHeight: 1,
                  }}
                >
                  {String(item.num).padStart(2, "0")}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: theme.fontSerif,
                      fontSize: 26,
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontFamily: theme.fontSans,
                      fontSize: 18,
                      fontWeight: 300,
                      color: theme.text,
                      opacity: 0.7,
                    }}
                  >
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SafeArea>
      <MicroFooter
        footerLeft={slide.footerLeft}
        footerRight={slide.footerRight}
      />
    </div>
  );
}

function TelemetrySlide({
  slide,
}: {
  slide: Extract<Slide, { type: "telemetry" }>;
}) {
  const cols = slide.stats.length <= 4 ? 2 : 3;
  return (
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: theme.bg,
        position: "relative",
        overflow: "hidden",
        color: theme.text,
      }}
    >
      <RegMarks />
      <Crosshairs />
      <SafeArea>
        <MicroHeader tag={slide.tag} />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 32,
          }}
        >
          <div
            style={{
              fontFamily: theme.fontSerif,
              fontSize: 54,
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1.1,
            }}
          >
            {slide.headline}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gap: 32,
            }}
          >
            {slide.stats.map((stat: { value: string; label: string }, i: number) => (
              <div key={i}>
                <div
                  style={{
                    fontFamily: theme.fontSerif,
                    fontSize: 56,
                    fontWeight: 300,
                    color: theme.accent,
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: theme.fontSans,
                    fontSize: 16,
                    fontWeight: 400,
                    color: theme.text,
                    opacity: 0.6,
                    marginTop: 8,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SafeArea>
      <MicroFooter
        footerLeft={slide.footerLeft}
        footerRight={slide.footerRight}
      />
    </div>
  );
}

function TableSlide({
  slide,
}: {
  slide: Extract<Slide, { type: "table" }>;
}) {
  return (
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: theme.bg,
        position: "relative",
        overflow: "hidden",
        color: theme.text,
      }}
    >
      <RegMarks />
      <Crosshairs />
      <SafeArea>
        <MicroHeader tag={slide.tag} />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              fontFamily: theme.fontSerif,
              fontSize: 48,
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1.1,
            }}
          >
            {slide.headline}
          </div>
          <div style={{ overflow: "hidden" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontFamily: theme.fontSans,
                fontSize: 18,
              }}
            >
              <thead>
                <tr>
                  {slide.headers.map((h: string, i: number) => (
                    <th
                      key={i}
                      style={{
                        textAlign: "left",
                        padding: "12px 16px",
                        borderBottom: `2px solid ${theme.accent}`,
                        fontWeight: 600,
                        fontSize: 14,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: theme.accent,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {slide.rows.map((row: string[], ri: number) => (
                  <tr key={ri}>
                    {row.map((cell: string, ci: number) => (
                      <td
                        key={ci}
                        style={{
                          padding: "12px 16px",
                          borderBottom: `1px solid ${theme.border}`,
                          fontWeight: 300,
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SafeArea>
      <MicroFooter
        footerLeft={slide.footerLeft}
        footerRight={slide.footerRight}
      />
    </div>
  );
}

function ImageSplitSlide({
  slide,
}: {
  slide: Extract<Slide, { type: "image-split" }>;
}) {
  const bs = getBodyStyle(slide.bodyText);
  return (
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: theme.bg,
        position: "relative",
        overflow: "hidden",
        color: theme.text,
      }}
    >
      <RegMarks />
      <Crosshairs />
      <SafeArea>
        <MicroHeader tag={slide.tag} />
        <div
          style={{
            flex: 1,
            display: "flex",
            gap: 40,
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                fontFamily: theme.fontSerif,
                fontSize: 48,
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: 1.1,
              }}
            >
              {slide.headline}
            </div>
            <div
              style={{
                fontFamily: theme.fontSans,
                fontSize: Number(bs.fontSize),
                fontWeight: bs.fontWeight === "300" ? 300 : 400,
                lineHeight: 1.6,
                color: theme.text,
                opacity: 0.8,
              }}
            >
              {slide.bodyText}
            </div>
          </div>
          <div
            style={{
              flex: 1,
              aspectRatio: "3/4",
              backgroundColor: "rgba(17,17,17,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: theme.fontSans,
              fontSize: 14,
              color: theme.text,
              opacity: 0.4,
              overflow: "hidden",
            }}
          >
            {slide.imageUrl ? (
              <img
                src={slide.imageUrl}
                alt={slide.headline}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span>{slide.imageKeywords || "image"}</span>
            )}
          </div>
        </div>
      </SafeArea>
      <MicroFooter
        footerLeft={slide.footerLeft}
        footerRight={slide.footerRight}
      />
    </div>
  );
}

function ImageCoverSlide({
  slide,
}: {
  slide: Extract<Slide, { type: "image-cover" }>;
}) {
  return (
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: theme.bg,
        position: "relative",
        overflow: "hidden",
        color: theme.text,
      }}
    >
      {slide.imageUrl && (
        <img
          src={slide.imageUrl}
          alt={slide.headline}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: slide.imageUrl
            ? "rgba(235,234,229,0.75)"
            : "rgba(17,17,17,0.04)",
        }}
      />
      <RegMarks />
      <Crosshairs />
      <SafeArea>
        <MicroHeader tag={slide.tag} />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              fontFamily: theme.fontSerif,
              fontSize: 64,
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1.1,
            }}
          >
            {slide.headline}
          </div>
          <div
            style={{
              fontFamily: theme.fontSans,
              fontSize: 24,
              fontWeight: 300,
              lineHeight: 1.6,
              maxWidth: 700,
              opacity: 0.8,
            }}
          >
            {slide.subtext}
          </div>
        </div>
      </SafeArea>
      <MicroFooter
        footerLeft={slide.footerLeft}
        footerRight={slide.footerRight}
      />
    </div>
  );
}

function CtaSlide({ slide }: { slide: Extract<Slide, { type: "cta" }> }) {
  return (
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: theme.bg,
        position: "relative",
        overflow: "hidden",
        color: theme.text,
      }}
    >
      <RegMarks />
      <Crosshairs />
      <SafeArea>
        <MicroHeader tag={slide.tag} />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: 28,
          }}
        >
          <div
            style={{
              fontFamily: theme.fontSerif,
              fontSize: 64,
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1.1,
            }}
          >
            {slide.headline}
          </div>
          <div
            style={{
              fontFamily: theme.fontSans,
              fontSize: 24,
              fontWeight: 300,
              lineHeight: 1.6,
              maxWidth: 600,
              opacity: 0.7,
            }}
          >
            {slide.subtext}
          </div>
          <div
            style={{
              marginTop: 16,
              padding: "18px 48px",
              backgroundColor: theme.accent,
              color: "#FFFFFF",
              fontFamily: theme.fontSans,
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {slide.actionLabel}
          </div>
          {slide.socialHandle && (
            <div
              style={{
                fontFamily: theme.fontMono,
                fontSize: 16,
                color: theme.accent,
                opacity: 0.6,
                marginTop: 8,
              }}
            >
              {slide.socialHandle}
            </div>
          )}
        </div>
      </SafeArea>
      <MicroFooter
        footerLeft={slide.footerLeft}
        footerRight={slide.footerRight}
      />
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────

function renderSlide(slide: Slide, index: number) {
  const key = `${slide.type}-${index}`;
  switch (slide.type) {
    case "cover":
      return <CoverSlide key={key} slide={slide} />;
    case "definition":
      return <DefinitionSlide key={key} slide={slide} />;
    case "dichotomy":
      return <DichotomySlide key={key} slide={slide} />;
    case "timeline":
      return <TimelineSlide key={key} slide={slide} />;
    case "quote":
      return <QuoteSlide key={key} slide={slide} />;
    case "sequence":
      return <SequenceSlide key={key} slide={slide} />;
    case "telemetry":
      return <TelemetrySlide key={key} slide={slide} />;
    case "table":
      return <TableSlide key={key} slide={slide} />;
    case "image-split":
      return <ImageSplitSlide key={key} slide={slide} />;
    case "image-cover":
      return <ImageCoverSlide key={key} slide={slide} />;
    case "cta":
      return <CtaSlide key={key} slide={slide} />;
    default:
      return null;
  }
}

export function ArchivePaperSingle({ slide }: { slide: Slide }) {
  return <>{renderSlide(slide, 0)}</>;
}

export default function ArchivePaper({
  slides,
}: {
  slides: Slide[];
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}
    >
      {slides.map((slide, i) => renderSlide(slide, i))}
    </div>
  );
}
