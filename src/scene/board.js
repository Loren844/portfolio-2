import * as THREE from "three";
import { BOARD, rng } from "./layout.js";
import { box, place, standard } from "./materials.js";

const { width: W, depth: D } = BOARD;

/**
 * Le circuit nu. Le dessus est une texture dessinée au canvas :
 * plan de masse hachuré, pistes décoratives, vias, trous de fixation et sérigraphie.
 * `labels()` renvoie les textes de la langue courante.
 */
export function createBoard(renderer, parent, materials, labels) {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = Math.round((2048 * D) / W);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

  // Conversion coordonnées de la carte -> pixels de la texture
  const scale = canvas.width / W;
  const px = (x) => (x + W / 2) * scale;
  const pz = (z) => (z + D / 2) * scale;

  function redraw() {
    const g = canvas.getContext("2d");
    const random = rng(7);
    const t = labels();

    g.fillStyle = "#2a1856";
    g.fillRect(0, 0, canvas.width, canvas.height);

    // Plan de masse hachuré
    g.strokeStyle = "rgba(75,47,143,.28)";
    g.lineWidth = 1.5;
    for (let i = -canvas.height; i < canvas.width; i += 18) {
      g.beginPath();
      g.moveTo(i, 0);
      g.lineTo(i + canvas.height, canvas.height);
      g.stroke();
    }

    // Pistes décoratives, terminées par des vias
    g.lineCap = g.lineJoin = "round";
    const vias = [];
    const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    const clampX = (x) => Math.max(-W / 2 + 1.5, Math.min(W / 2 - 1.5, x));
    const clampZ = (z) => Math.max(-D / 2 + 1.5, Math.min(D / 2 - 1.5, z));
    for (let i = 0; i < 120; i++) {
      let x = Math.round((random() - 0.5) * (W - 4));
      let z = Math.round((random() - 0.5) * (D - 4));
      g.strokeStyle = "#4b2f8f";
      g.lineWidth = 3 + random() * 3;
      g.beginPath();
      g.moveTo(px(x), pz(z));
      vias.push([x, z]);
      const count = 2 + Math.floor(random() * 3);
      let dir = Math.floor(random() * 4);
      for (let k = 0; k < count; k++) {
        const length = 1.5 + random() * 6;
        const [ux, uz] = directions[dir];
        const diagonal = k % 2 === 1;
        const dx = diagonal ? (ux || (random() < 0.5 ? 1 : -1)) * length * 0.6 : ux * length;
        const dz = diagonal ? (uz || (random() < 0.5 ? 1 : -1)) * length * 0.6 : uz * length;
        x = clampX(x + dx);
        z = clampZ(z + dz);
        g.lineTo(px(x), pz(z));
        if (random() < 0.3) dir = (dir + 1) % 4;
      }
      g.stroke();
      vias.push([x, z]);
    }
    const disc = (x, y, r, color) => {
      g.fillStyle = color;
      g.beginPath();
      g.arc(x, y, r, 0, Math.PI * 2);
      g.fill();
    };
    for (const [x, z] of vias) {
      disc(px(x), pz(z), 7, "#c79a45");
      disc(px(x), pz(z), 3, "#150b2e");
    }

    // Trous de fixation
    for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
      const x = px(sx * (W / 2 - 1.8));
      const z = pz(sz * (D / 2 - 1.8));
      disc(x, z, 40, "#d8ab4f");
      disc(x, z, 22, "#0b0618");
    }

    // Sérigraphie : contours des empreintes, repères et noms des sections
    g.strokeStyle = g.fillStyle = "#f4efe4";
    g.lineWidth = 4;
    const outline = (x, z, w, d) => g.strokeRect(px(x - w / 2), pz(z - d / 2), w * scale, d * scale);
    outline(-11, 0, 7.6, 7.6);
    for (const x of [-3, 2, 7]) outline(x, -8, 4.3, 3.6);
    outline(16, -5, 9.4, 5.6);
    outline(10.3, 2, 10, 4.2);
    outline(-3.5, 7, 7.4, 2.6);

    const mono = (size) => `600 ${size}px 'Martian Mono',monospace`;
    const label = (designator, name, x, z, align = "left") => {
      g.textAlign = align;
      g.font = mono(34);
      g.fillText(designator, px(x), pz(z));
      const offset = g.measureText(designator).width + 18;
      g.font = "600 44px 'Instrument Sans',sans-serif";
      g.fillText(name, px(x) + (align === "right" ? -offset : offset), pz(z));
    };
    label("U1", t.nav[1], -14.8, 5.4);
    label("U2–U4", t.nav[2], -5.1, -11);
    label("D1–D8", t.nav[3], 11.3, -9.2);
    label("C1–C5", t.nav[4], 5.3, -1.2);
    label("Y1", t.nav[5], -7.2, 4.9);
    label("ANT1", t.nav[6], 24, 7.6, "right");
    g.textAlign = "left";
    g.font = mono(30);
    g.fillText("J1  5V", px(-24.4), pz(5.6));
    g.fillText("LB-PORTFOLIO  REV 2  2026", px(9), pz(15.6));

    texture.needsUpdate = true;
  }

  redraw();
  // Les polices web arrivent après le premier dessin : on redessine la sérigraphie avec.
  document.fonts?.ready.then(redraw);

  place(box(W, 0.8, D, standard(0x2b1a55, { roughness: 0.6 })), parent, 0, -0.41, 0).castShadow = false;
  place(box(W + 0.02, 0.06, D + 0.02, materials.gold), parent, 0, -0.45, 0, false);

  const top = new THREE.Mesh(
    new THREE.PlaneGeometry(W, D),
    new THREE.MeshStandardMaterial({ map: texture, roughness: 0.42, metalness: 0.15 }),
  );
  top.rotation.x = -Math.PI / 2;
  top.receiveShadow = true;
  parent.add(top);

  return { top, redraw };
}
