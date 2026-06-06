import { useCallback, useEffect, useRef, useState } from "react";
import { INTRO_GATE_BG_SRC, INTRO_VIDEO_SRC, KREDIYA_LOGO_SRC } from "../lib/introVideo";
import "./IntroVideo.css";

type Phase = "gate" | "main" | "exiting";

type Props = {
  open: boolean;
  /** Skip the gate screen (e.g. navbar replay) */
  skipGate?: boolean;
  onComplete: () => void;
};

export function IntroVideo({ open, skipGate = false, onComplete }: Props) {
  const bgRef = useRef<HTMLVideoElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>(() => (skipGate ? "main" : "gate"));
  const [gateExiting, setGateExiting] = useState(false);
  const [needsPlay, setNeedsPlay] = useState(false);

  const finishIntro = useCallback(() => {
    setPhase("gate");
    setGateExiting(false);
    onComplete();
  }, [onComplete]);

  const handleEnded = useCallback(() => {
    setPhase("exiting");
    window.setTimeout(finishIntro, 520);
  }, [finishIntro]);

  const tryPlayMain = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    setNeedsPlay(false);
    try {
      await video.play();
    } catch {
      setNeedsPlay(true);
    }
  }, []);

  const tryPlayBg = useCallback(async () => {
    const video = bgRef.current;
    if (!video) return;
    try {
      await video.play();
    } catch {
      /* autoplay may be blocked; gate still shows button */
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    const startPhase: Phase = skipGate ? "main" : "gate";
    setPhase(startPhase);
    setGateExiting(false);
    setNeedsPlay(false);

    if (startPhase === "gate") {
      const bg = bgRef.current;
      if (bg) {
        bg.currentTime = 0;
        tryPlayBg();
      }
    }
  }, [open, skipGate, tryPlayBg]);

  useEffect(() => {
    if (!open || phase !== "main") return;

    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    tryPlayMain();
  }, [open, phase, tryPlayMain]);

  const handleGateStart = useCallback(() => {
    setGateExiting(true);
    window.setTimeout(() => {
      setPhase("main");
      setGateExiting(false);
    }, 640);
  }, []);

  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") return;
      e.stopPropagation();
    }

    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [open]);

  if (!open) return null;

  const showGate = phase === "gate";
  const showMain = phase === "main" || phase === "exiting";

  return (
    <div
      className={`intro-video${phase === "exiting" ? " intro-video--exiting" : ""}${gateExiting ? " intro-video--gate-exiting" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Presentación YACK"
    >
      <div className="intro-video__backdrop" aria-hidden="true" />

      {showGate ? (
        <div className="intro-video__gate">
          <video
            ref={bgRef}
            className="intro-video__gate-bg"
            src={INTRO_GATE_BG_SRC}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            aria-hidden="true"
          />
          <div className="intro-video__gate-scrim" aria-hidden="true" />

          <div className="intro-video__gate-content">
            <img
              className="intro-video__gate-logo"
              src={KREDIYA_LOGO_SRC}
              alt="KrediYA"
              width={220}
              height={64}
              decoding="async"
              fetchPriority="high"
            />

            <button
              type="button"
              className="intro-video__gate-cta"
              onClick={handleGateStart}
              disabled={gateExiting}
            >
              ¿Estás listo para conocer a <strong>YACK</strong>?
            </button>
          </div>
        </div>
      ) : null}

      {showMain ? (
        <div className="intro-video__frame">
          <video
            ref={videoRef}
            className="intro-video__media"
            src={INTRO_VIDEO_SRC}
            playsInline
            preload="auto"
            onEnded={handleEnded}
            onClick={needsPlay ? tryPlayMain : undefined}
          />

          {needsPlay && phase === "main" ? (
            <button
              type="button"
              className="intro-video__play"
              onClick={tryPlayMain}
              aria-label="Reproducir video de presentación"
            >
              <span className="intro-video__play-icon" aria-hidden="true">
                ▶
              </span>
              <span>Reproducir presentación</span>
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
