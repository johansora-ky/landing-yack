export const INTRO_VIDEO_SRC =
  "https://22317019.fs1.hubspotusercontent-na1.net/hubfs/22317019/Yack/YACK%20-%20ENDOMARKETING%20(ESCENA%201%20Y%202)%20v2.mp4";

export const INTRO_GATE_BG_SRC =
  "https://22317019.fs1.hubspotusercontent-na1.net/hubfs/22317019/Yack/upload_img_45948138_06_05_2026_15_59_43_563529_1388191570177123687.mp4";

export const KREDIYA_LOGO_SRC =
  "https://www.krediya.com/hubfs/sourceweb/Logos_Krdya/logo_krdya_33.png";

const STORAGE_KEY = "yack-intro-video-seen";

export function hasSeenIntroVideo(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function markIntroVideoSeen(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, "true");
  } catch {
    /* quota / private mode */
  }
}
