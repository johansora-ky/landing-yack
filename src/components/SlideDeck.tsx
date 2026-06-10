import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { IntroVideo } from "./IntroVideo";
import { hasSeenIntroVideo, markIntroVideoSeen } from "../lib/introVideo";
import "./SlideDeck.css";

type DeckApi = {
  index: number;
  total: number;
  goTo: (i: number) => void;
  goNext: () => void;
  goPrev: () => void;
  /** Hero copy + mascot visible and animating in */
  heroRevealed: boolean;
  /** Bumps on each intro completion to retrigger hero entrance */
  heroRevealEpoch: number;
};

const DeckContext = createContext<DeckApi | null>(null);

export function useDeck(): DeckApi {
  const ctx = useContext(DeckContext);
  if (!ctx) throw new Error("useDeck must be used inside <SlideDeck />");
  return ctx;
}

const KREDIYA_LOGO_COLOR =
  "https://www.krediya.com/hs-fs/hubfs/krdya_new_color_full.png?width=180&height=50&name=krdya_new_color_full.png";
const KREDIYA_LOGO_WHITE =
  "https://www.krediya.com/hubfs/sourceweb/Logos_Krdya/KrediYA_White_WEBP.webp?width=180&height=50";

const NAV_LOCK_MS = 600;
const WHEEL_THRESHOLD = 24;
const TOUCH_THRESHOLD = 56;

export type SlideMeta = {
  id: string;
  label: string;
  /** Topbar / indicator color scheme. Dark slides need white logo + light text. */
  scheme?: "light" | "dark";
};

type SlideProps = {
  meta: SlideMeta;
  children: ReactNode;
  active?: boolean;
};

/**
 * Wrapper for a single slide. Visual styling lives inside `children`.
 * The deck handles fade lifecycle and aria-hidden / inert for inactive slides.
 */
export function Slide({ meta, children, active }: SlideProps) {
  return (
    <section
      className="deck-slide"
      data-active={active ? "true" : "false"}
      data-scheme={meta.scheme ?? "light"}
      aria-labelledby={`${meta.id}-title`}
      aria-hidden={!active}
      // `inert` is widely supported (Baseline 2024); blocks focus + interaction
      // for inactive slides.
      // @ts-expect-error inert is valid HTML attribute, types still catching up
      inert={!active ? "" : undefined}
      id={meta.id}
    >
      {children}
    </section>
  );
}

type SlideDeckProps = {
  slides: SlideMeta[];
  children: ReactNode;
};

export function SlideDeck({ slides, children }: SlideDeckProps) {
  const [mandatoryIntroOpen, setMandatoryIntroOpen] = useState(
    () => !hasSeenIntroVideo(),
  );
  const [replayIntroOpen, setReplayIntroOpen] = useState(false);
  const introBlocking = mandatoryIntroOpen || replayIntroOpen;
  const [heroRevealed, setHeroRevealed] = useState(() => hasSeenIntroVideo());
  const [heroRevealEpoch, setHeroRevealEpoch] = useState(0);

  const [index, setIndex] = useState(() => {
    if (typeof window === "undefined") return 0;
    const fromHash = parseInt(window.location.hash.replace("#", ""), 10) - 1;
    return Number.isFinite(fromHash) && fromHash >= 0 && fromHash < slides.length
      ? fromHash
      : 0;
  });

  const lockUntilRef = useRef(0);
  // Mirror index in ref so wheel/touch handlers stay stable across re-renders
  const indexRef = useRef(index);
  const total = slides.length;

  const handleIntroComplete = useCallback(() => {
    if (mandatoryIntroOpen) {
      markIntroVideoSeen();
      setMandatoryIntroOpen(false);
    }
    setReplayIntroOpen(false);
    setHeroRevealed(true);
    setHeroRevealEpoch((n) => n + 1);
  }, [mandatoryIntroOpen]);

  const goTo = useCallback(
    (next: number) => {
      if (introBlocking) return;
      const now = performance.now();
      if (now < lockUntilRef.current) return;
      const clamped = Math.max(0, Math.min(total - 1, next));
      setIndex((current) => {
        if (current === clamped) return current;
        lockUntilRef.current = now + NAV_LOCK_MS;
        return clamped;
      });
    },
    [introBlocking, total],
  );

  const goNext = useCallback(() => goTo(indexRef.current + 1), [goTo]);
  const goPrev = useCallback(() => goTo(indexRef.current - 1), [goTo]);

  useEffect(() => {
    indexRef.current = index;
    if (typeof window !== "undefined") {
      const hash = `#${index + 1}`;
      if (window.location.hash !== hash) {
        window.history.replaceState(null, "", hash);
      }
    }
  }, [index]);

  // Keyboard navigation
  useEffect(() => {
    if (introBlocking) return;

    function onKey(e: KeyboardEvent) {
      // Don't hijack typing inside inputs
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
        case "ArrowRight":
        case " ":
        case "j":
          e.preventDefault();
          goNext();
          break;
        case "ArrowUp":
        case "PageUp":
        case "ArrowLeft":
        case "k":
          e.preventDefault();
          goPrev();
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          goTo(total - 1);
          break;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, goTo, introBlocking, total]);

  // Helpers: query active slide and detect scroll edges. We let users scroll
  // inside the slide naturally; only when they hit top / bottom does a further
  // wheel / swipe advance to the next or previous slide.
  function getActiveSlide(): HTMLElement | null {
    return document.querySelector<HTMLElement>(
      '.deck-slide[data-active="true"]',
    );
  }

  function scrollEdges(el: HTMLElement) {
    const max = el.scrollHeight - el.clientHeight;
    const atTop = el.scrollTop <= 2;
    const atBottom = max <= 2 || el.scrollTop >= max - 2;
    return { atTop, atBottom };
  }

  // Wheel navigation. Slide is overflow-y:auto, so native scroll runs first.
  // We only intercept once the user wheels past the edge.
  useEffect(() => {
    if (introBlocking) return;

    let lastTrigger = 0;
    function onWheel(e: WheelEvent) {
      const dy = e.deltaY;
      if (Math.abs(dy) < WHEEL_THRESHOLD) return;
      const slide = getActiveSlide();
      if (!slide) return;
      const { atTop, atBottom } = scrollEdges(slide);
      const now = performance.now();
      if (now - lastTrigger < NAV_LOCK_MS) return;
      if (dy > 0 && atBottom) {
        lastTrigger = now;
        goNext();
      } else if (dy < 0 && atTop) {
        lastTrigger = now;
        goPrev();
      }
    }
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [goNext, goPrev, introBlocking]);

  // Touch swipe. Only triggers slide nav if the user finishes a swipe while
  // the slide is at its top / bottom edge.
  useEffect(() => {
    if (introBlocking) return;

    let startY: number | null = null;
    let startTime = 0;
    function onTouchStart(e: TouchEvent) {
      startY = e.touches[0]?.clientY ?? null;
      startTime = performance.now();
    }
    function onTouchEnd(e: TouchEvent) {
      if (startY == null) return;
      const endY = e.changedTouches[0]?.clientY ?? startY;
      const dy = startY - endY;
      const dt = performance.now() - startTime;
      startY = null;
      if (Math.abs(dy) < TOUCH_THRESHOLD || dt > 800) return;
      const slide = getActiveSlide();
      if (!slide) return;
      const { atTop, atBottom } = scrollEdges(slide);
      if (dy > 0 && atBottom) goNext();
      else if (dy < 0 && atTop) goPrev();
    }
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [goNext, goPrev, introBlocking]);

  // Reset scroll position when active slide changes so each section starts
  // from its top. Use rAF so the new active slide has rendered.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const slide = getActiveSlide();
      if (slide) slide.scrollTop = 0;
    });
    return () => cancelAnimationFrame(id);
  }, [index]);

  // Sync from hash (back/forward buttons)
  useEffect(() => {
    if (introBlocking) return;

    function onHash() {
      const fromHash =
        parseInt(window.location.hash.replace("#", ""), 10) - 1;
      if (
        Number.isFinite(fromHash) &&
        fromHash >= 0 &&
        fromHash < total &&
        fromHash !== indexRef.current
      ) {
        setIndex(fromHash);
      }
    }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [introBlocking, total]);

  const childrenArray = useMemo(
    () => Children.toArray(children).filter(isValidElement),
    [children],
  );

  const api = useMemo<DeckApi>(
    () => ({ index, total, goTo, goNext, goPrev, heroRevealed, heroRevealEpoch }),
    [index, total, goTo, goNext, goPrev, heroRevealed, heroRevealEpoch],
  );

  const currentScheme = slides[index]?.scheme ?? "light";
  const logoSrc =
    currentScheme === "dark" ? KREDIYA_LOGO_WHITE : KREDIYA_LOGO_COLOR;
  const topbarColor = currentScheme === "dark" ? "#fff" : "var(--ink)";

  return (
    <DeckContext.Provider value={api}>
      <main
        className="deck"
        data-intro-blocking={introBlocking ? "true" : "false"}
        aria-roledescription="presentación interactiva"
      >
        <IntroVideo
          open={introBlocking}
          skipGate={replayIntroOpen && !mandatoryIntroOpen}
          onComplete={handleIntroComplete}
        />
        <span className="sr-only" aria-live="polite">
          Diapositiva {index + 1} de {total}: {slides[index]?.label}
        </span>

        <div
          className="deck-topbar"
          data-scheme={currentScheme}
          style={{ color: topbarColor }}
        >
          <a
            href="#1"
            className="deck-logo"
            onClick={(e) => {
              e.preventDefault();
              goTo(0);
            }}
            aria-label="Inicio · KrediYA"
          >
            <img
              src={logoSrc}
              alt="KrediYA"
              width="100"
              height="28"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </a>
          <div className="deck-topbar__actions">
            {!mandatoryIntroOpen ? (
              <button
                type="button"
                className="deck-replay"
                onClick={() => setReplayIntroOpen(true)}
                aria-label="Ver video de presentación"
              >
                <span className="deck-replay__icon" aria-hidden="true">
                  ▶
                </span>
                <span className="deck-replay__label">Ver video</span>
              </button>
            ) : null}
            <div className="deck-counter" aria-hidden="true">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </div>
          </div>
        </div>

        <div className="deck-stage">
          {childrenArray.map((child, i) => {
            const element = child as ReactElement<SlideProps>;
            return cloneElement(element, {
              key: slides[i]?.id ?? i,
              active: i === index,
            });
          })}
        </div>

        <ul
          className="deck-indicator"
          data-scheme={currentScheme}
          role="tablist"
          aria-label="Navegación de secciones"
          style={{ color: topbarColor }}
        >
          {slides.map((slide, i) => (
            <li key={slide.id}>
              <button
                type="button"
                role="tab"
                aria-current={i === index ? "true" : undefined}
                aria-selected={i === index}
                aria-controls={slide.id}
                onClick={() => goTo(i)}
              >
                <span className="dot" aria-hidden="true" />
                <span className="label">{slide.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="deck-hint" style={{ color: topbarColor }}>
          <span className="keys">
            <kbd>↑</kbd>
            <kbd>↓</kbd>
          </span>
          <span>Desliza · Rueda · Flechas</span>
        </div>
      </main>
    </DeckContext.Provider>
  );
}
