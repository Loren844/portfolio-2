import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { BOARD } from "./layout.js";

const MIN_DISTANCE = 5;
const MAX_DISTANCE = 80;

/**
 * Vue libre : on tourne autour de la carte, on zoome à la molette (vers le pointeur)
 * et un clic rapproche la caméra du point visé.
 */
export function createFreeView(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);
  controls.enabled = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.09;
  controls.zoomToCursor = true;
  controls.minDistance = MIN_DISTANCE;
  controls.maxDistance = MAX_DISTANCE;
  controls.maxPolarAngle = 1.45; // on ne passe jamais sous la carte
  controls.screenSpacePanning = false; // le déplacement suit le plan de la carte

  let flight = null; // { position, target } visés par un déplacement animé
  controls.addEventListener("start", () => (flight = null));

  const offset = new THREE.Vector3();

  /** Anime la caméra vers `target`, à `distance`, en gardant l'angle de vue actuel. */
  function flyTo(target, distance) {
    offset.copy(camera.position).sub(controls.target);
    const d = THREE.MathUtils.clamp(distance ?? offset.length(), MIN_DISTANCE, MAX_DISTANCE);
    offset.setLength(d);
    flight = { target: target.clone().setY(0), position: target.clone().setY(0).add(offset) };
  }

  return {
    get active() {
      return controls.enabled;
    },
    get target() {
      return controls.target;
    },
    distance: () => camera.position.distanceTo(controls.target),

    /** Reprend la main à partir du cadrage courant de la visite. */
    enter(currentTarget) {
      controls.target.copy(currentTarget);
      controls.enabled = true;
      flight = null;
    },
    exit() {
      controls.enabled = false;
      flight = null;
    },
    flyTo,
    /** factor < 1 rapproche, > 1 éloigne. */
    zoom(factor) {
      flyTo(flight?.target ?? controls.target, this.distance() * factor);
    },
    /** Vue d'ensemble de la carte. */
    reset() {
      flight = { target: new THREE.Vector3(0, 0, 0), position: new THREE.Vector3(14, 34, 30) };
    },

    update(dt, instant) {
      if (flight) {
        const k = instant ? 1 : 1 - Math.exp(-dt * 4.5);
        controls.target.lerp(flight.target, k);
        camera.position.lerp(flight.position, k);
        if (camera.position.distanceTo(flight.position) < 0.03) flight = null;
      }
      // La cible reste au-dessus de la carte : impossible de se perdre dans le vide.
      controls.target.x = THREE.MathUtils.clamp(controls.target.x, -BOARD.width / 2, BOARD.width / 2);
      controls.target.z = THREE.MathUtils.clamp(controls.target.z, -BOARD.depth / 2, BOARD.depth / 2);
      controls.target.y = 0;
      controls.update();
    },
  };
}
