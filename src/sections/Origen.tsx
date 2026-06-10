import { Slide, type SlideMeta } from "../components/SlideDeck";

type Props = {
  meta: SlideMeta;
  active?: boolean;
};

const YACK_RUNNING_SRC =
  "https://www.krediya.com/hubfs/Yack/Mundial/magnific_using-img1-as-the-primary_8vATJWUIrU.webp";

const TRAITS = [
  {
    tag: "Identidad LATAM",
    text: "El felino más representativo del continente — conecto contigo desde nuestras raíces.",
  },
  {
    tag: "Protección y guía",
    text: "Protejo tu tranquilidad financiera y te acompaño en cada paso con KrediYA.",
  },
  {
    tag: "Agilidad",
    text: "Represento la rapidez y eficiencia con la que queremos resolverte.",
  },
] as const;

export function Origen({ meta, active }: Props) {
  return (
    <Slide meta={meta} active={active}>
      <div
        className="s s-origen"
        data-active={active ? "true" : "false"}
      >
        <div className="origen-bg" aria-hidden="true" />

        <div className="s-inner origen-inner">
          <div className="origen-visual">
            <div className="origen-speed" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            <figure className="origen-yack">
              <img
                src={YACK_RUNNING_SRC}
                alt="YACK corriendo con su hoodie fucsia"
                width={720}
                height={720}
                decoding="async"
                loading="lazy"
              />
            </figure>

            <ul
              className="origen-traits"
              aria-label="Atributos de YACK"
            >
              {TRAITS.map((trait, i) => (
                <li
                  key={trait.tag}
                  className={`origen-trait origen-trait--${i + 1} origen-reveal`}
                >
                  <span className="origen-trait__tag">{trait.tag}</span>
                  <p>{trait.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <header className="origen-copy">
            <span className="eyebrow origen-reveal">02 · Origen</span>

            <ul
              className="origen-badges origen-reveal"
              aria-label="Atributos del jaguar"
            >
              <li>Latam</li>
              <li>Felis onca</li>
              <li>Protección</li>
            </ul>

            <h2 id={`${meta.id}-title`} className="h-section origen-reveal">
              Fuerte, ágil y siempre <em>a tu lado</em>.
            </h2>

            <p className="lead origen-reveal">
              ¿Por qué un jaguar? Es el felino más poderoso de América — un
              símbolo de protección y liderazgo desde nuestras culturas
              precolombinas.
            </p>
          </header>
        </div>
      </div>
    </Slide>
  );
}
