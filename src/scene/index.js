import * as THREE from "three";
import { POSES } from "./layout.js";
import { createMaterials } from "./materials.js";
import { setupEnvironment } from "./environment.js";
import { createBoard } from "./board.js";
import { createTrace } from "./trace.js";
import { createComponents } from "./components.js";
import { tourPose, tourViewShift } from "./tourCamera.js";
import { createFreeView } from "./freeView.js";

/**
 * Monte la scène 3D et lance la boucle de rendu.
 * Renvoie null si WebGL n'est pas disponible (le site reste alors lisible sans la 3D).
 *
 * @param {object} options
 * @param {HTMLCanvasElement} options.canvas
 * @param {() => object} options.labels      textes de la langue courante (sérigraphie, infobulles)
 * @param {() => number} options.travel      position de voyage, voir ui/tour.js
 * @param {boolean} options.reduceMotion
 * @param {(stop: number) => void} options.onNavigate  clic sur un composant pendant la visite
 * @param {(target: {stop: number, project?: number}) => void} options.onFocus  clic en vue libre
 */
export function createScene({ canvas, labels, travel, reduceMotion, onNavigate, onFocus }) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  } catch {
    canvas.remove();
    return null;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 300);
  setupEnvironment(renderer, scene);

  const world = new THREE.Group();
  scene.add(world);
  const materials = createMaterials();
  const board = createBoard(renderer, world, materials, labels);
  const trace = createTrace(world, materials);
  const components = createComponents(world, materials, trace);
  const freeView = createFreeView(camera, canvas);

  /* ---- Taille et décalage de l'image ---- */
  const shift = { x: 0, y: 0 };
  let width = 1;
  let height = 1;
  function resize() {
    width = innerWidth;
    height = innerHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
  }
  addEventListener("resize", resize);
  resize();

  /* ---- Survol et clic sur les composants ---- */
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const tip = document.getElementById("tip");
  let hovered = null;

  function castFrom(event, objects) {
    pointer.set((event.clientX / width) * 2 - 1, -(event.clientY / height) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    return raycaster.intersectObjects(objects, true)[0] ?? null;
  }
  function componentAt(event) {
    if (event.target !== canvas) return null;
    let object = castFrom(event, components.pickables)?.object;
    while (object && object.userData.stop === undefined) object = object.parent;
    return object ?? null;
  }
  const describe = (object) => ({ stop: object.userData.stop, project: object.userData.project });

  addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;
    const object = componentAt(event);
    if (object !== hovered) {
      hovered?.scale.setScalar(1);
      hovered = object;
      hovered?.scale.setScalar(1.06);
    }
    canvas.style.cursor = object ? "pointer" : "";
    tip.classList.toggle("show", Boolean(object));
    if (object) {
      const t = labels();
      const { stop, project } = describe(object);
      tip.textContent = project !== undefined ? t.projects[project].title : t.nav[stop];
      tip.style.left = `${event.clientX}px`;
      tip.style.top = `${event.clientY}px`;
    }
  });

  // Un clic = pointeur relâché presque au même endroit (sinon c'est une rotation de la vue).
  let press = null;
  canvas.addEventListener("pointerdown", (e) => (press = { x: e.clientX, y: e.clientY }));
  canvas.addEventListener("pointerup", (event) => {
    if (!press) return;
    const moved = Math.hypot(event.clientX - press.x, event.clientY - press.y);
    press = null;
    if (moved > 6 || event.button !== 0) return;

    const object = componentAt(event);
    tip.classList.remove("show");
    if (!freeView.active) {
      if (object) onNavigate(object.userData.stop);
      return;
    }
    if (object) {
      freeView.flyTo(object.position, Math.min(freeView.distance(), 13));
      onFocus(describe(object));
      return;
    }
    const hit = castFrom(event, [board.top]);
    if (hit) {
      freeView.flyTo(hit.point, Math.max(8, freeView.distance() * 0.55));
      onFocus(null);
    }
  });

  /* ---- Éléments de contenu <-> composants ---- */
  let highlighted = null;
  function highlight(key) {
    if (key === highlighted) return;
    components.highlights[highlighted]?.(false);
    highlighted = key;
    components.highlights[key]?.(true);
  }

  /* ---- Boucle de rendu ---- */
  const position = new THREE.Vector3();
  const target = new THREE.Vector3();
  const fromPos = new THREE.Vector3();
  const fromTgt = new THREE.Vector3();
  const toPos = new THREE.Vector3();
  const toTgt = new THREE.Vector3();
  let first = true;
  let last = performance.now();
  let signal = 0;

  function frame(now) {
    requestAnimationFrame(frame);
    if (document.hidden) return;
    const dt = Math.min(0.25, (now - last) / 1000);
    last = now;
    const ease = first || reduceMotion ? 1 : 1 - Math.exp(-dt * 5);

    // Où en est la visite : entre l'arrêt i et l'arrêt i + 1
    const t = travel();
    const i = Math.min(POSES.length - 2, Math.floor(t));
    const f = t - i;

    if (freeView.active) {
      freeView.update(dt, reduceMotion);
      position.copy(camera.position);
      target.copy(freeView.target);
    } else {
      tourPose(i, camera.aspect, fromPos, fromTgt);
      tourPose(i + 1, camera.aspect, toPos, toTgt);
      toPos.lerpVectors(fromPos, toPos, f);
      toTgt.lerpVectors(fromTgt, toTgt, f);
      if (!reduceMotion) {
        // légère respiration de la caméra
        toPos.x += Math.sin(now / 2600) * 0.35;
        toPos.y += Math.sin(now / 3400) * 0.2;
      }
      position.lerp(toPos, ease);
      target.lerp(toTgt, ease);
      camera.position.copy(position);
      camera.lookAt(target);
    }

    // En vue libre l'image est centrée ; pendant la visite elle laisse la place au texte.
    const [sx, sy] = freeView.active ? [0, 0] : tourViewShift(width, height);
    shift.x += (sx - shift.x) * ease;
    shift.y += (sy - shift.y) * ease;
    camera.setViewOffset(width, height, shift.x, shift.y, width, height);

    const goal = trace.stopDistance[i] + (trace.stopDistance[i + 1] - trace.stopDistance[i]) * f;
    signal += (goal - signal) * ease;
    trace.update(signal, reduceMotion ? 1 : 1 + Math.sin(now / 260) * 0.12);
    components.update(dt, signal >= trace.stopDistance[3] - 2.5);

    renderer.render(scene, camera);
    first = false;
  }
  requestAnimationFrame(frame);

  return {
    redrawBoard: board.redraw,
    highlight,
    setFreeView(on) {
      if (on) freeView.enter(target);
      else freeView.exit();
    },
    zoom: (factor) => freeView.zoom(factor),
    resetView: () => freeView.reset(),
  };
}
