import { POSES } from "./layout.js";

/**
 * Cadrage de la visite guidée à l'arrêt `i` : écrit la position de la caméra dans `position`
 * et le point visé dans `target`. Sur écran étroit, la caméra recule pour garder le composant entier.
 */
export function tourPose(i, aspect, position, target) {
  const [x, z, distance, azimuth] = POSES[i];
  const narrow = Math.max(0, 1.25 - aspect);
  const d = distance * (1 + narrow * (i === 0 ? 1.25 : 0.5));
  target.set(x, 0, z);
  position.set(x + Math.sin(azimuth) * d * 0.62, d * 0.72, z + Math.cos(azimuth) * d * 0.62);
}

/**
 * Décalage de l'image en pixels, pour que le composant ne soit pas caché par le panneau de texte :
 * vers la droite sur grand écran, vers le haut sur mobile.
 */
export function tourViewShift(width, height) {
  return width > 820 ? [-Math.min(width * 0.2, 300), 0] : [0, height * 0.2];
}
