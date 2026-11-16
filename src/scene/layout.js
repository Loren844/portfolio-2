// Géométrie de la carte. Unités : 1 ≈ 1 mm. x vers la droite, z vers le bas vu de dessus.
export const BOARD = { width: 52, depth: 34 };

export const COLORS = {
  deep: 0x120a26,
  gold: 0xe6b450,
  silk: 0xf4efe4,
  led: 0x6ff2c4,
  chip: 0x16131f,
  silver: 0xc9ccd6,
};

// Position [x, z] du composant de chaque section (même ordre que SECTION_IDS).
export const STOPS = [
  [-23, 8], // J1    alimentation   (accueil)
  [-11, 0], // U1    microcontrôleur (à propos)
  [2, -8], // U2-U4 puces           (expériences)
  [16, -5], // D1-D8 LED             (projets)
  [10, 3], // C1-C5 condensateurs   (compétences)
  [-3.5, 8], // Y1    quartz          (formation)
  [20, 10.5], // ANT1  antenne         (contact)
];

// Tracé de la piste dorée, routée en segments droits et à 45° comme sur une vraie carte.
export const WAYPOINTS = [
  [-23, 8], [-16, 8], [-11, 3], [-11, 0], [-11, -4], [-7, -8], [2, -8], [11, -8],
  [14, -5], [16, -5], [20, -5], [21, -4], [21, 1], [18, 4], [10, 4], [4, 4],
  [-1, 9], [-3, 9], [-6, 9], [-8, 11], [-6, 13], [14, 13], [17, 10], [19, 10],
];

// Indice, dans WAYPOINTS, du point où le signal s'arrête pour chaque section.
export const STOP_WAYPOINT = [0, 3, 6, 9, 14, 17, 23];

// Cadrage de la caméra à chaque arrêt : [cibleX, cibleZ, distance, azimut en radians].
export const POSES = [
  [0, 0, 50, 0.32],
  [-11, 0, 19, 0.5],
  [2, -8, 22, -0.32],
  [16, -5, 17, 0.55],
  [10.3, 2.4, 18, -0.5],
  [-3.5, 7.5, 15, 0.38],
  [20.5, 10.5, 16, -0.42],
];

/** Générateur pseudo-aléatoire déterministe : la carte est identique à chaque visite. */
export function rng(seed) {
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}
