import { Slide, type SlideMeta } from "../components/SlideDeck";

type Props = {
  meta: SlideMeta;
  active?: boolean;
};

const PHONE_IMAGE_SRC =
  "https://www.krediya.com/hubfs/Yack/Dise%C3%B1o%20sin%20t%C3%ADtulo%20(1).webp";

export function Goodies({ meta, active }: Props) {
  return (
    <Slide meta={meta} active={active}>
      <div
        className="s s-goodies"
        data-active={active ? "true" : "false"}
      >
        <div className="s-inner">
          <div className="goodies-copy">
            <span className="eyebrow goodies-reveal">05 · Descargables</span>
            <h2 id={`${meta.id}-title`} className="goodies-reveal">
              ¡Llévame contigo!
            </h2>
            <p className="lead goodies-reveal">
              Descarga mis stickers para WhatsApp, fondos de pantalla y más.
              Quiero acompañarte también fuera de la app.
            </p>
            <div className="goodies-actions goodies-reveal">
              <a
                href="#"
                className="cta cta--magenta"
                onClick={(e) => e.preventDefault()}
              >
                Descargar stickers
                <span className="cta-arrow" aria-hidden="true">
                  ↓
                </span>
              </a>
              <a
                href="#"
                className="cta cta--blue"
                onClick={(e) => e.preventDefault()}
              >
                Descargar wallpapers
                <span className="cta-arrow" aria-hidden="true">
                  ↓
                </span>
              </a>
            </div>
          </div>

          <div className="goodies-stage">
            <span className="goodies-orbit goodies-orbit--a" aria-hidden="true" />
            <span className="goodies-orbit goodies-orbit--b" aria-hidden="true" />
            <figure className="goodies-phone">
              <img
                src={PHONE_IMAGE_SRC}
                alt="Chat de WhatsApp con YACK mostrando un sticker"
                width={320}
                height={680}
                decoding="async"
                loading="lazy"
              />
            </figure>
          </div>
        </div>
      </div>
    </Slide>
  );
}
