import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="h-3 w-3 shrink-0 bg-[var(--accent)]"
        />
        <p className="font-[var(--font-mono)] text-[22px] leading-none tracking-[0.14em]">
          {slide.kicker}
        </p>
      </div>

      <h1 className="mt-10 font-[var(--font-headline)] text-[68px] font-bold leading-[1.06] tracking-[-0.045em]">
        <span className="block">More Power.</span>
        <span className="block text-[var(--accent)]">
          Less Obvious Value.
        </span>
      </h1>

      <div className="mt-7 grid grid-cols-[6px_1fr] gap-6">
        <div aria-hidden="true" className="bg-[var(--accent)]" />
        <p className="max-w-[780px] font-[var(--font-body)] text-[28px] leading-[1.4] tracking-[-0.015em]">
          {slide.subheadline}
        </p>
      </div>

      <div className="mt-10 flex min-h-0 flex-1 items-center border-t border-[var(--border)] pt-6">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 952 530"
          className="block h-full max-h-[530px] w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Quiet drafting marks frame the familiar enclosure. */}
          <g stroke="var(--border)" strokeWidth="2">
            <path d="M24 76H62M43 57V95" />
            <path d="M890 76H928M909 57V95" />
            <path d="M24 458H62M43 439V477" />
            <path d="M890 458H928M909 439V477" />
            <path d="M95 490H857" />
          </g>

          {/* Lid and display: deliberately restrained industrial geometry. */}
          <path
            d="M199 48H753C765 48 773 56 775 69L815 351H137L177 69C179 56 187 48 199 48Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M205 67H747C751 67 754 70 755 75L791 331H161L197 75C198 70 201 67 205 67Z"
            fill="var(--paper, #F5F5F7)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M440 67H512V78C512 82 509 85 505 85H447C443 85 440 82 440 78V67Z"
            fill="var(--ink)"
          />

          {/* Circuit traces concentrate attention on the silicon. */}
          <g
            stroke="var(--border)"
            strokeWidth="2"
            strokeLinecap="square"
          >
            <path d="M403 154H330L298 122H228" />
            <path d="M403 181H282L250 213H188" />
            <path d="M403 208H319L276 251H196" />
            <path d="M403 235H352L307 280H222" />

            <path d="M549 154H622L654 122H724" />
            <path d="M549 181H670L702 213H764" />
            <path d="M549 208H633L676 251H756" />
            <path d="M549 235H600L645 280H730" />

            <path d="M438 121V101H382" />
            <path d="M465 121V96" />
            <path d="M492 121V96" />
            <path d="M519 121V101H575" />

            <path d="M438 267V294H382" />
            <path d="M465 267V310" />
            <path d="M492 267V310" />
            <path d="M519 267V294H575" />
          </g>

          <g fill="var(--paper, #F5F5F7)" stroke="var(--border)" strokeWidth="2">
            <circle cx="228" cy="122" r="5" />
            <circle cx="222" cy="280" r="5" />
            <circle cx="724" cy="122" r="5" />
            <circle cx="730" cy="280" r="5" />
          </g>

          {/* The only saturated object: the upgrade inside. */}
          <path
            d="M403 121H549V267H403Z"
            fill="var(--accent)"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <g stroke="var(--paper, #F5F5F7)" strokeWidth="2">
            <path d="M422 140H530V248H422Z" />
            <path d="M435 153H486V204H435Z" />
            <path d="M499 153H517V176H499Z" />
            <path d="M499 187H517V210H499Z" />
            <path d="M435 220H455V235H435Z" />
            <path d="M466 220H486V235H466Z" />
            <path d="M497 220H517V235H497Z" />
          </g>

          {/* Keyboard deck and broad front lip. */}
          <path
            d="M137 351H815L904 424H48L137 351Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M48 424H904L882 444C878 448 873 450 867 450H85C79 450 74 448 70 444L48 424Z"
            fill="var(--paper, #F5F5F7)"
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M190 362H762L791 386H161L190 362Z"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <g stroke="var(--border)" strokeWidth="2">
            <path d="M183 370H770M173 378H781" />
            <path d="M240 362L223 386M302 362L289 386" />
            <path d="M364 362L355 386M426 362L422 386" />
            <path d="M488 362V386M550 362L554 386" />
            <path d="M612 362L621 386M674 362L687 386" />
            <path d="M736 362L753 386" />
          </g>
          <path
            d="M390 395H562L579 413H373L390 395Z"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M419 424H533L525 432H427L419 424Z"
            fill="var(--border)"
          />
        </svg>
      </div>
    </section>
  );
}