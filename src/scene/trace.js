import * as THREE from "three";
import { STOP_WAYPOINT, WAYPOINTS } from "./layout.js";

/**
 * La piste dorée qui relie tous les composants, et le signal qui la parcourt.
 * Chaque segment existe en double : une version éteinte, et une version lumineuse
 * dont la longueur suit la progression du signal.
 */
export function createTrace(parent, materials) {
  const geometry = new THREE.BoxGeometry(1, 0.05, 0.36);
  geometry.translate(0.5, 0, 0); // origine au début du segment : il suffit de l'étirer en x
  const litMaterial = new THREE.MeshStandardMaterial({
    color: 0xf5b942,
    emissive: 0xe08a10,
    emissiveIntensity: 0.9,
    roughness: 0.45,
  });
  const joint = new THREE.CylinderGeometry(0.18, 0.18, 0.05, 12);

  const segments = [];
  const cumulative = [0];
  let total = 0;
  for (let i = 0; i < WAYPOINTS.length - 1; i++) {
    const a = WAYPOINTS[i];
    const b = WAYPOINTS[i + 1];
    const dx = b[0] - a[0];
    const dz = b[1] - a[1];
    const length = Math.hypot(dx, dz);
    const angle = Math.atan2(-dz, dx);

    const base = new THREE.Mesh(geometry, materials.gold);
    base.position.set(a[0], 0.03, a[1]);
    base.rotation.y = angle;
    base.scale.x = length;
    base.receiveShadow = true;

    const lit = new THREE.Mesh(geometry, litMaterial);
    lit.position.set(a[0], 0.045, a[1]);
    lit.rotation.y = angle;
    lit.visible = false;

    const corner = new THREE.Mesh(joint, materials.gold);
    corner.position.set(b[0], 0.03, b[1]);

    parent.add(base, lit, corner);
    segments.push({ a, b, length, lit, start: total });
    total += length;
    cumulative.push(total);
  }

  // Le signal : une bille lumineuse qui éclaire la carte autour d'elle
  const pulse = new THREE.Mesh(
    new THREE.SphereGeometry(0.24, 20, 14),
    new THREE.MeshBasicMaterial({ color: 0xffd98a }),
  );
  const glow = new THREE.PointLight(0xffc95e, 18, 11, 2);
  pulse.add(glow);
  parent.add(pulse);

  /** Abscisse curviligne du signal à chaque arrêt de la visite. */
  const stopDistance = STOP_WAYPOINT.map((i) => cumulative[i]);

  /** Place le signal à la distance `s` du départ et allume la piste déjà parcourue. */
  function update(s, beat) {
    s = Math.max(0, Math.min(total, s));
    for (const seg of segments) {
      const fill = Math.max(0, Math.min(1, (s - seg.start) / seg.length));
      seg.lit.visible = fill > 0.001;
      seg.lit.scale.x = Math.max(0.001, seg.length * fill);
      if (s >= seg.start && s <= seg.start + seg.length + 1e-6) {
        pulse.position.set(seg.a[0] + (seg.b[0] - seg.a[0]) * fill, 0.4, seg.a[1] + (seg.b[1] - seg.a[1]) * fill);
      }
    }
    pulse.scale.setScalar(beat);
    glow.intensity = 18 * beat;
  }

  /** Distance d'un point [x, z] à la piste (pour ne rien poser dessus). */
  function distanceTo(x, z) {
    let best = Infinity;
    for (const { a, b, length } of segments) {
      const vx = b[0] - a[0];
      const vz = b[1] - a[1];
      const f = Math.max(0, Math.min(1, ((x - a[0]) * vx + (z - a[1]) * vz) / (length * length)));
      best = Math.min(best, Math.hypot(a[0] + vx * f - x, a[1] + vz * f - z));
    }
    return best;
  }

  return { stopDistance, update, distanceTo };
}
