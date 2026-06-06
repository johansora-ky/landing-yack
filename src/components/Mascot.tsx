import "./Mascot.css";

type MascotProps = {
  /** "hero" — large centerpiece. "card" — square framed for ID card. "spot" — small inline */
  variant?: "hero" | "card" | "spot";
  /** Optional label override; defaults to "YA" wordmark */
  label?: string;
};

/**
 * YACK placeholder.
 *
 * Stand-in for the official 3D render. Designed as an intentional brand-ish
 * marker (magenta gradient orb + "YA" hoodie wordmark + halo) so the layout
 * reads cleanly while real renders are in production.
 */
export function Mascot({ variant = "hero", label = "YA" }: MascotProps) {
  return (
    <div className={`mascot mascot--${variant}`} role="img" aria-label="YACK · Brand Mascot de KrediYA (placeholder)">
      <div className="mascot-halo" aria-hidden="true" />
      <div className="mascot-orb">
        <div className="mascot-grain" aria-hidden="true" />
        <div className="mascot-ears" aria-hidden="true">
          <span className="ear ear--l" />
          <span className="ear ear--r" />
        </div>
        <div className="mascot-face" aria-hidden="true">
          <span className="eye eye--l" />
          <span className="eye eye--r" />
          <span className="snout">
            <span className="nose" />
            <span className="smile" />
          </span>
        </div>
        <div className="mascot-hoodie" aria-hidden="true">
          <span className="wordmark">{label}</span>
        </div>
      </div>
      <span className="mascot-tag" aria-hidden="true">
        Render 3D · próximamente
      </span>
    </div>
  );
}
