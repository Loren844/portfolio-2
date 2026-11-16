import * as THREE from "three";
import { BOARD, COLORS, STOPS, rng } from "./layout.js";
import { box, place, standard } from "./materials.js";

/** Marquage laser sur le dessus d'une puce. */
function markingTexture(lines, width, height, size) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const g = canvas.getContext("2d");
  g.fillStyle = "#16131f";
  g.fillRect(0, 0, width, height);
  g.fillStyle = "#cfc8bb";
  g.textAlign = "center";
  g.textBaseline = "middle";
  lines.forEach((line, i) => {
    g.font = `${i ? 400 : 700} ${i ? size * 0.55 : size}px Arial,sans-serif`;
    g.fillText(line, width / 2, height / 2 + (i - (lines.length - 1) / 2) * size * 1.05);
  });
  g.beginPath(); // repère de la broche 1
  g.arc(width * 0.09, height * 0.84, height * 0.045, 0, Math.PI * 2);
  g.fill();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

/**
 * Pose tous les composants sur la carte.
 * Renvoie :
 *  - `pickables` : les groupes cliquables (userData.stop = section, userData.project = n° de projet) ;
 *  - `highlights` : fonctions on/off par clé (`chip0`, `led3`, `cap1`…) pour illuminer un composant ;
 *  - `update(dt, powered)` : animation des LED.
 */
export function createComponents(parent, materials, trace) {
  const pickables = [];
  const highlights = {};

  function component(stop, x, z) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.userData.stop = stop;
    parent.add(group);
    pickables.push(group);
    return group;
  }

  /** Boîtier noir à broches : `pinsX` broches sur les côtés avant/arrière, `pinsZ` sur les flancs. */
  function chip(group, w, d, h, pinsX, pinsZ, marking) {
    const body = materials.chip.clone();
    place(box(w, h, d, body), group, 0, h / 2 + 0.18, 0);
    const top = new THREE.Mesh(
      new THREE.PlaneGeometry(w * 0.94, d * 0.94),
      new THREE.MeshStandardMaterial({
        map: markingTexture(marking, 512, Math.round((512 * d) / w), w > 4 ? 74 : 92),
        roughness: 0.6,
      }),
    );
    top.rotation.x = -Math.PI / 2;
    top.position.y = h + 0.185;
    group.add(top);

    const pin = new THREE.BoxGeometry(0.24, 0.14, 0.7);
    const addPin = (x, z, turned) => {
      const mesh = new THREE.Mesh(pin, materials.silver);
      mesh.position.set(x, 0.1, z);
      if (turned) mesh.rotation.y = Math.PI / 2;
      mesh.castShadow = true;
      group.add(mesh);
    };
    const spread = (i, n, span) => (i - (n - 1) / 2) * ((span * 0.86) / Math.max(n - 1, 1));
    for (let i = 0; i < pinsX; i++) for (const s of [-1, 1]) addPin(spread(i, pinsX, w), s * (d / 2 + 0.22), false);
    for (let i = 0; i < pinsZ; i++) for (const s of [-1, 1]) addPin(s * (w / 2 + 0.22), spread(i, pinsZ, d), true);
    return body;
  }

  // J1 : connecteur USB-C, et son voyant d'alimentation
  const usb = component(0, -24.6, 8);
  place(box(3, 1.1, 2.6, materials.silver), usb, 0, 0.56, 0);
  place(box(0.2, 0.6, 1.9, materials.dark), usb, -1.45, 0.6, 0, false);
  place(
    new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 8), new THREE.MeshBasicMaterial({ color: COLORS.led })),
    parent, -21.5, 0.2, 6.3, false,
  );

  // U1 : microcontrôleur
  chip(component(1, -11, 0), 5.6, 5.6, 0.7, 11, 11, ["LORENZO", "BALADIER", "LB-MCU 2027"]);

  // U2-U4 : une puce par expérience
  [["AMPERE", "2024–"], ["DNIIT", "2026"], ["ESI", "2022–24"]].forEach((marking, i) => {
    const body = chip(component(2, [-3, 2, 7][i], -8), 3.3, 2.3, 0.6, 6, 0, marking);
    body.emissive = new THREE.Color(COLORS.gold);
    body.emissiveIntensity = 0;
    highlights[`chip${i}`] = (on) => (body.emissiveIntensity = on ? 0.55 : 0);
  });

  // D1-D8 : une LED par projet
  const leds = [];
  for (let i = 0; i < 8; i++) {
    const group = component(3, 13 + (i % 4) * 2, i < 4 ? -6.3 : -3.7);
    group.userData.project = i;
    place(box(1.15, 0.28, 0.8, materials.white), group, 0, 0.14, 0);
    place(box(0.2, 0.3, 0.82, materials.gold), group, -0.6, 0.15, 0, false);
    place(box(0.2, 0.3, 0.82, materials.gold), group, 0.6, 0.15, 0, false);
    const color = i % 2 ? 0xff9a1f : 0x14c98c;
    const material = new THREE.MeshStandardMaterial({
      color, emissive: color, emissiveIntensity: 0.15, roughness: 0.25, transparent: true, opacity: 0.92,
    });
    const dome = place(
      new THREE.Mesh(new THREE.SphereGeometry(0.36, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), material),
      group, 0, 0.28, 0, false,
    );
    const led = { material, dome, level: 0, hot: false };
    leds.push(led);
    highlights[`led${i}`] = (on) => (led.hot = on);
  }

  // C1-C5 : un condensateur par domaine de compétences — [x, z, rayon, hauteur]
  [[6.6, 1.9, 0.75, 1.9], [8.6, 2.1, 0.6, 1.4], [10.5, 1.9, 0.85, 2.3], [12.5, 2.1, 0.6, 1.6], [14.1, 1.9, 0.5, 1.1]]
    .forEach(([x, z, r, h], i) => {
      const group = component(4, x, z);
      const can = standard(0x2a2548, { roughness: 0.35, metalness: 0.3 });
      can.emissive = new THREE.Color(COLORS.led);
      can.emissiveIntensity = 0;
      place(new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 28), can), group, 0, h / 2 + 0.1, 0);
      place(new THREE.Mesh(new THREE.CylinderGeometry(r * 0.93, r * 0.93, 0.06, 28), materials.silver), group, 0, h + 0.12, 0, false);
      place(box(r * 2.3, 0.1, r * 2.3, materials.dark), group, 0, 0.05, 0, false);
      // bande de polarité
      place(
        new THREE.Mesh(new THREE.CylinderGeometry(r + 0.01, r + 0.01, h * 0.8, 28, 1, true, -0.5, 1), standard(COLORS.silk, { roughness: 0.6 })),
        group, 0, h / 2 + 0.1, 0, false,
      );
      highlights[`cap${i}`] = (on) => (can.emissiveIntensity = on ? 0.5 : 0);
    });

  // Y1 : quartz et ses deux condensateurs de charge
  const crystal = component(5, -3.5, 7);
  place(new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.75, 28), materials.silver), crystal, 0, 0.5, 0).scale.x = 2.6;
  place(box(5, 0.14, 2, materials.dark), crystal, 0, 0.07, 0, false);
  for (const x of [-2.9, 2.9]) place(box(0.9, 0.4, 0.55, standard(0xb99a6b)), crystal, x, 0.2, 0);

  // ANT1 : module radio, blindage et antenne en méandre
  const radio = component(6, 20.5, 10.5);
  place(box(7, 0.3, 4.6, standard(0x1a1430, { roughness: 0.5 })), radio, 0, 0.15, 0);
  place(box(3.4, 0.8, 3.4, materials.silver), radio, -1.4, 0.7, 0);
  for (let i = 0; i < 5; i++) {
    place(box(0.16, 0.06, 3, materials.gold), radio, 1 + i * 0.55, 0.33, 0, false);
    place(box(0.55, 0.06, 0.16, materials.gold), radio, 1.27 + i * 0.55, 0.33, i % 2 ? 1.42 : -1.42, false);
  }

  scatterPassives(parent, materials, trace);

  /** Les LED s'allument en cascade quand le signal les atteint ; survolées, elles brillent plus fort. */
  function update(dt, powered) {
    leds.forEach((led, n) => {
      const goal = led.hot ? 3.2 : powered ? 1.25 : 0.15;
      led.level += (goal - led.level) * Math.min(1, dt * (6 - n * 0.35));
      led.material.emissiveIntensity = led.level;
      led.dome.scale.setScalar(led.hot ? 1.25 : 1);
    });
  }

  return { pickables, highlights, update };
}

/** Résistances et condensateurs CMS décoratifs, loin des composants et de la piste dorée. */
function scatterPassives(parent, materials, trace) {
  const random = rng(21);
  const count = 70;
  const bodies = new THREE.InstancedMesh(new THREE.BoxGeometry(0.7, 0.3, 0.4), standard(0x231d30, { roughness: 0.5 }), count);
  const caps = new THREE.InstancedMesh(new THREE.BoxGeometry(0.16, 0.32, 0.42), materials.silver, count * 2);
  const dummy = new THREE.Object3D();
  let placed = 0;
  for (let tries = 0; placed < count && tries < 2000; tries++) {
    const x = (random() - 0.5) * (BOARD.width - 5);
    const z = (random() - 0.5) * (BOARD.depth - 5);
    if (STOPS.some(([sx, sz]) => Math.hypot(sx - x, (sz - z) * 1.4) < 6.4)) continue;
    if (trace.distanceTo(x, z) < 0.9) continue;
    const turned = random() < 0.5;
    dummy.rotation.set(0, turned ? Math.PI / 2 : 0, 0);
    dummy.position.set(x, 0.15, z);
    dummy.updateMatrix();
    bodies.setMatrixAt(placed, dummy.matrix);
    [-1, 1].forEach((side, j) => {
      dummy.position.set(x + (turned ? 0 : side * 0.36), 0.15, z + (turned ? -side * 0.36 : 0));
      dummy.updateMatrix();
      caps.setMatrixAt(placed * 2 + j, dummy.matrix);
    });
    placed++;
  }
  bodies.count = placed;
  caps.count = placed * 2;
  bodies.castShadow = true;
  parent.add(bodies, caps);
}
