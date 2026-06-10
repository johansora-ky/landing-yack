import { SlideDeck, type SlideMeta } from "./components/SlideDeck";
import { Hero } from "./sections/Hero";
import { Origen } from "./sections/Origen";
import { Mision } from "./sections/Mision";
import { Personalidad } from "./sections/Personalidad";
import { Goodies } from "./sections/Goodies";
import { CtaFinal } from "./sections/CtaFinal";
import "./sections/sections.css";

const SLIDES: SlideMeta[] = [
  { id: "hero", label: "Hola, soy YACK", scheme: "dark" },
  { id: "origen", label: "Origen", scheme: "dark" },
  { id: "mision", label: "Misión", scheme: "light" },
  { id: "personalidad", label: "Personalidad", scheme: "light" },
  { id: "goodies", label: "Descargables", scheme: "light" },
  { id: "cta", label: "Contacto", scheme: "dark" },
];

function App() {
  return (
    <SlideDeck slides={SLIDES}>
      <Hero meta={SLIDES[0]} />
      <Origen meta={SLIDES[1]} />
      <Mision meta={SLIDES[2]} />
      <Personalidad meta={SLIDES[3]} />
      <Goodies meta={SLIDES[4]} />
      <CtaFinal meta={SLIDES[5]} />
    </SlideDeck>
  );
}

export default App;
