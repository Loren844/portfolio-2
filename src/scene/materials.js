import * as THREE from "three";
import { COLORS } from "./layout.js";

export const standard = (color, options = {}) =>
  new THREE.MeshStandardMaterial({ color, roughness: 0.5, metalness: 0.1, ...options });

/** Matériaux partagés par tous les composants. */
export function createMaterials() {
  return {
    gold: standard(COLORS.gold, { metalness: 1, roughness: 0.28 }),
    silver: standard(COLORS.silver, { metalness: 1, roughness: 0.22 }),
    chip: standard(COLORS.chip, { roughness: 0.62 }),
    dark: standard(0x0c0914, { roughness: 0.8 }),
    white: standard(0xeeeae0, { roughness: 0.6 }),
  };
}

export const box = (w, h, d, material) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);

/** Place un maillage dans son parent ; les ombres sont actives sauf mention contraire. */
export function place(mesh, parent, x, y, z, shadow = true) {
  mesh.position.set(x, y, z);
  mesh.castShadow = shadow;
  mesh.receiveShadow = shadow;
  parent.add(mesh);
  return mesh;
}
