import { Fragment } from "react";
import { Slide, type SlideMeta } from "../components/SlideDeck";

type Props = {
  meta: SlideMeta;
  active?: boolean;
};

const YACK_S_SRC = "https://www.krediya.com/hubfs/Yack/Yack%20S.webp";

const PILLARS = [
  {
    num: "01",
    icon: "🗣",
    tag: "Claridad",
    title: "Te hablo claro",
    body:
      "Sin palabras enredadas. Te explico cada proceso de forma sencilla, paso a paso.",
  },
  {
    num: "02",
    icon: "🤝",
    tag: "Acompañamiento",
    title: "Te acompaño, no te vendo",
    body:
      "No estoy aquí para promociones. Te ayudo a organizarte y comparto tips útiles.",
  },
  {
    num: "03",
    icon: "💡",
    tag: "Soporte",
    title: "Resuelvo tus dudas",
    body:
      "En atención al cliente soy la cara amable que te acompaña a encontrar soluciones.",
  },
  {
    num: "04",
    icon: "🛡",
    tag: "Confianza",
    title: "Genero confianza",
    body:
      "Valido tus preocupaciones sin juzgarte y te oriento con seguridad y calma.",
  },
] as const;

export function Mision({ meta, active }: Props) {
  return (
    <Slide meta={meta} active={active}>
      <div
        className="s s-mision"
        data-active={active ? "true" : "false"}
      >
        <figure className="mision-yack" aria-hidden="true">
          <img
            src={YACK_S_SRC}
            alt=""
            width={640}
            height={960}
            decoding="async"
            loading="lazy"
          />
        </figure>

        <div className="s-inner">
          <header className="mision-head">
            <div>
              <span className="eyebrow">03 · Mi misión contigo</span>
              <h2 id={`${meta.id}-title`} className="h-section">
                Educo, acompaño <br />y resuelvo.
              </h2>
            </div>
            <details
              className="mision-lead mision-lead--v2 mision-reveal"
              aria-label="Rol de YACK"
            >
              <summary className="mision-lead-v2__summary">
                <div className="mision-lead-v2__hero">
                  <span className="mision-lead-v2__role">Guía empático</span>
                  <span className="mision-lead-v2__contrast">no vendedor</span>
                </div>
                <span className="mision-lead-v2__chevron" aria-hidden="true" />
              </summary>

              <div className="mision-lead-v2__panel">
                <p className="mision-lead-v2__copy">
                  Mi rol es claro. Te acompaño en cada paso para que avances
                  con{" "}
                  <span className="mision-lead-v2__highlight">confianza</span>.
                </p>

                <ul
                  className="mision-lead-v2__areas"
                  aria-label="Áreas de acompañamiento"
                >
                  <li>
                    <span className="mision-lead-v2__dot" aria-hidden="true" />
                    Onboarding
                  </li>
                  <li>
                    <span className="mision-lead-v2__dot" aria-hidden="true" />
                    Soporte
                  </li>
                  <li>
                    <span className="mision-lead-v2__dot" aria-hidden="true" />
                    Educación financiera
                  </li>
                </ul>
              </div>
            </details>
          </header>

          <div className="mision-grid">
            {PILLARS.map((p) => (
              <Fragment key={p.num}>
                <details
                  className="mision-card mision-card--mobile"
                  data-num={p.num}
                >
                  <summary className="mision-card__summary">
                    <div className="icon" aria-hidden="true">
                      {p.icon}
                    </div>
                    <div className="mision-card__head">
                      <span className="tag">{p.tag}</span>
                      <h3>{p.title}</h3>
                    </div>
                    <span className="mision-card__chevron" aria-hidden="true" />
                  </summary>
                  <div className="mision-card__panel">
                    <p>{p.body}</p>
                  </div>
                </details>

                <article
                  className="mision-card mision-card--desktop"
                  data-num={p.num}
                >
                  <div className="icon" aria-hidden="true">
                    {p.icon}
                  </div>
                  <div>
                    <span className="tag">{p.tag}</span>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                </article>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}
