import { Slide, type SlideMeta } from "../components/SlideDeck";

type Props = {
  meta: SlideMeta;
  active?: boolean;
};

const YACK_FINAL_SRC =
  "https://www.krediya.com/hubfs/Yack/Yack%20Final.png";

export function CtaFinal({ meta, active }: Props) {
  return (
    <Slide meta={meta} active={active}>
      <div
        className="s s-final"
        data-active={active ? "true" : "false"}
      >
        <figure className="final-yack" aria-hidden="true">
          <img
            src={YACK_FINAL_SRC}
            alt=""
            width={1920}
            height={480}
            decoding="async"
            loading="lazy"
          />
        </figure>

        <div className="s-inner">
          <span className="final-foot" style={{ alignSelf: "start" }}>
            06 · Empecemos
          </span>

          <div className="final-block">
            <h2 id={`${meta.id}-title`}>
              ¿Listo para empezar nuestro camino juntos?
            </h2>
            <p>
              Descarga la app de KrediYA y descubre cómo puedo ayudarte a manejar
              tus finanzas con confianza.
            </p>
            <div className="final-actions">
              <a
                href="#"
                className="cta cta--final-app"
                onClick={(e) => e.preventDefault()}
              >
                Ir a la app
                <span className="cta-arrow" aria-hidden="true">
                  →
                </span>
              </a>
              <a
                href="#"
                className="cta cta--final-white"
                onClick={(e) => e.preventDefault()}
              >
                Habla con nosotros
              </a>
            </div>
          </div>

          <span className="final-foot">YACK · Brand Mascot · KrediYA</span>
        </div>
      </div>
    </Slide>
  );
}
