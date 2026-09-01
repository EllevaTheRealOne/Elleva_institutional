import React, { useEffect, useRef } from "react";
import { HERO_LOOP, LIVE, STILL } from "./scenes";

interface SectionBackdropProps {
  /** The section number in the page order. Odd sits still, even moves. */
  index: number;
  children: React.ReactNode;
}

/**
 * Puts a drawn backdrop behind a section without touching the section itself.
 *
 * The sections paint their own solid background, so the wrapper clears it in
 * CSS rather than editing twenty-one components: the illustrations and the copy
 * stay exactly as they are, and only what is behind them changes.
 *
 * Odd sections hold still and even sections move, so no two neighbours are
 * animating at once. A still backdrop is drawn a single time and never enters
 * the animation loop; a live one runs only while its section is on screen.
 */
export const SectionBackdrop: React.FC<SectionBackdropProps> = ({ index, children }) => {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  // The hero is the exception to the alternation: its illustration IS the
  // claim the page makes — a continuous operational cycle — so it runs. Every
  // other odd section holds still.
  const isHero = index === 1;
  const still = index % 2 === 1 && !isHero;

  useEffect(() => {
    const c = canvas.current;
    const box = host.current;
    if (!c || !box) return;
    const x = c.getContext("2d");
    if (!x) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // A still scene reads every pixel back for the grain pass, so it renders at
    // a lower ratio: it never moves, and the difference does not show.
    const dpr = Math.min(window.devicePixelRatio || 1, still ? 1.5 : 2);
    // One scene per section, in page order: sections 1,3,5… take STILL 0,1,2…
    // and 2,4,6… take LIVE 0,1,2…. Nothing repeats down the page.
    const draw = isHero
      ? HERO_LOOP
      : still
        ? STILL[(index - 1) / 2]
        : LIVE[index / 2 - 1];

    if (!draw) return;

    let frame = 0;
    let onScreen = false;

    const paint = (t: number) => {
      x.clearRect(0, 0, c.width, c.height);
      if (still) (draw as (x: CanvasRenderingContext2D, w: number, h: number) => void)(x, c.width, c.height);
      else (draw as (x: CanvasRenderingContext2D, w: number, h: number, t: number, d: number) => void)(x, c.width, c.height, t, dpr);
    };

    const fit = () => {
      const w = Math.max(1, Math.round(box.offsetWidth * dpr));
      const h = Math.max(1, Math.round(box.offsetHeight * dpr));
      if (w === c.width && h === c.height) return;
      c.width = w;
      c.height = h;
      paint(0);
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);

    let io: IntersectionObserver | undefined;
    if (!still && !reduce) {
      const tick = (t: number) => {
        if (onScreen) paint(t);
        frame = requestAnimationFrame(tick);
      };
      io = new IntersectionObserver(
        (entries) => entries.forEach((e) => (onScreen = e.isIntersecting)),
        { rootMargin: "120px" }
      );
      io.observe(box);
      frame = requestAnimationFrame(tick);
    }

    return () => {
      ro.disconnect();
      io?.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [index, still]);

  return (
    <div
      ref={host}
      className={`el-backdrop relative isolate ${still ? "el-backdrop--still" : "el-backdrop--live"}`}
    >
      <canvas
        ref={canvas}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
      {children}
    </div>
  );
};
