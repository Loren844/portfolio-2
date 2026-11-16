// La visite guidée : le défilement de la page est converti en « position de voyage »,
// un nombre décimal où 0 = accueil, 1 = à propos, 2.5 = à mi-chemin entre expériences et projets…
import { SECTION_IDS } from "../content/index.js";

export const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

const sections = SECTION_IDS.map((id) => document.getElementById(id));

/** Fait défiler jusqu'à la section `i`. */
export function goTo(i) {
  sections[i].scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
}

/**
 * Position de voyage courante. La caméra reste sur un composant tant qu'on lit
 * sa section, puis rejoint le suivant sur la dernière portion du défilement.
 */
export function travel() {
  const vh = innerHeight;
  const y = scrollY + vh / 2;
  const anchors = sections.map((s) => s.offsetTop + Math.min(s.offsetHeight, vh) / 2);
  if (y <= anchors[0]) return 0;
  for (let i = 0; i < anchors.length - 1; i++) {
    if (y < anchors[i + 1]) {
      const span = Math.min(anchors[i + 1] - anchors[i], vh * 0.85);
      const p = Math.max(0, Math.min(1, (y - (anchors[i + 1] - span)) / span));
      return i + p * p * (3 - 2 * p);
    }
  }
  return anchors.length - 1;
}

/** Met en évidence, dans le menu, la section en cours de lecture. */
export function markNav() {
  const active = Math.round(travel());
  document.querySelectorAll("#nav a").forEach((a) => a.classList.toggle("on", Number(a.dataset.go) === active));
}
