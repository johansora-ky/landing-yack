import { Slide, type SlideMeta, useDeck } from "../components/SlideDeck";

type Props = {
  meta: SlideMeta;
  active?: boolean;
};

const YACK_IMAGE_SRC =
  "https://www.krediya.com/hubfs/Yack/ChatGPT_Image_4_jun_2026__12_16_02-removebg-preview.png";

export function Hero({ meta, active }: Props) {
  const { goNext, heroRevealed, heroRevealEpoch } = useDeck();
  const revealed = Boolean(active && heroRevealed);

  return (
    <Slide meta={meta} active={active}>
      <div
        className="s s-hero"
        data-revealed={revealed ? "true" : "false"}
        data-reveal-epoch={heroRevealEpoch}
      >
        <div className="hero-bg" aria-hidden="true" />

        <div className="s-inner hero-inner" key={heroRevealEpoch}>
          <figure className="hero-yack relative">
            <img
              src={YACK_IMAGE_SRC}
              alt="YACK saludando"
              className="absolute bottom-0 left-0"
              width={640}
              height={640}
              decoding="async"
              fetchPriority="high"
            />
          </figure>

          <div className="hero-copy">
            <span className="eyebrow hero-reveal-item">01 · Hola</span>
            <h1 id={`${meta.id}-title`} className="h-display hero-reveal-item">
              Soy <strong>YACK</strong>, tu nuevo compañero en KrediYA.
            </h1>
            <p className="hero-reveal-item">
              Estoy aquí para acompañarte, orientarte y hacer que tus finanzas
              sean mucho más fáciles de entender.
            </p>
            <div className="hero-actions hero-reveal-item">
              <button
                type="button"
                className="cta cta--ghost"
                onClick={goNext}
              >
                Conoce mi historia
                <span className="cta-arrow" aria-hidden="true">
                  ↓
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
