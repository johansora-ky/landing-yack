import { type CSSProperties } from "react";
import { Slide, type SlideMeta } from "../components/SlideDeck";

type Props = {
  meta: SlideMeta;
  active?: boolean;
};

const YACK_IMAGE_SRC =
  "https://www.krediya.com/hubfs/Yack/ChatGPT%20Image%205%20jun%202026%2c%2016_39_56.png";

const TRAITS = [
  {
    key: "estilo",
    label: "Estilo",
    text: "Relajado pero seguro. Hoodie fucsia siempre puesto.",
    accent: "magenta",
  },
  {
    key: "actitud",
    label: "Actitud",
    text: "Positiva, empática y amigable.",
    accent: "blue",
  },
  {
    key: "megusta",
    label: "Me gusta",
    text: "Tips breves y accionables · usar emojis con moderación 😉",
    accent: "gold",
  },
  {
    key: "evito",
    label: "Evito",
    text: "Discursos comerciales · tono autoritario · presiones.",
    accent: "ink",
  },
] as const;

export function Personalidad({ meta, active }: Props) {
  return (
    <Slide meta={meta} active={active}>
      <div
        className="s s-personalidad"
        data-active={active ? "true" : "false"}
      >
        <div className="s-inner">
          <aside className="yack-card" aria-label="Ficha de personaje de YACK">
            <span className="yack-card__badge">ID · 001</span>

            <header className="yack-card__head yack-reveal">
              <div className="yack-card__photo">
                <figure className="yack-card__hero">
                  <img
                    src={YACK_IMAGE_SRC}
                    alt="YACK sonriendo y saludando con su mano"
                    width={640}
                    height={640}
                    decoding="async"
                    loading="lazy"
                  />
                </figure>
              </div>

              <div className="yack-card__identity">
                <span className="yack-card__role">Brand Mascot · KrediYA</span>
                <h3 className="yack-card__name">YACK</h3>
                <span className="yack-card__species">
                  Jaguar · Latam · Empático
                </span>
              </div>
            </header>

            <ul className="yack-card__traits" aria-label="Características de YACK">
              {TRAITS.map((trait, i) => (
                <li
                  key={trait.key}
                  className={`yack-card__trait yack-card__trait--${trait.accent} yack-reveal`}
                  style={{ "--trait-i": i } as CSSProperties}
                >
                  <span className="yack-card__trait-label">{trait.label}</span>
                  <p>{trait.text}</p>
                </li>
              ))}
            </ul>

            <blockquote className="yack-card__quote yack-reveal">
              “Vamos paso a paso, tú no estás solo.”
            </blockquote>
          </aside>

          <div className="personalidad-copy">
            <span className="eyebrow yack-reveal">04 · Personalidad</span>
            <h2 id={`${meta.id}-title`} className="h-section yack-reveal">
              Un <em>amigo experto</em> que sabe de finanzas.
            </h2>
            <p className="yack-reveal">
              Mi tono es sencillo, cercano y positivo. Si uso un término técnico,
              lo explico al instante. Hablo de tú, propongo soluciones y celebro
              tus logros.
            </p>
            <div className="persona-tags yack-reveal">
              <span>Empático</span>
              <span>Paciente</span>
              <span>Claro</span>
              <span>Optimista</span>
              <span>Confiable</span>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
