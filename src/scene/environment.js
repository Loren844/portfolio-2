import * as THREE from "three";
import { COLORS } from "./layout.js";

/** Fond, brouillard, éclairage et reflets. */
export function setupEnvironment(renderer, scene) {
  scene.background = new THREE.Color(COLORS.deep);
  scene.fog = new THREE.FogExp2(COLORS.deep, 0.011);

  // Petit « studio » rendu une fois en texture d'environnement :
  // sans lui, l'or et l'étain paraîtraient noirs.
  const studio = new THREE.Scene();
  studio.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(50, 16, 8),
      new THREE.MeshBasicMaterial({ color: 0x1d1238, side: THREE.BackSide }),
    ),
  );
  const softboxes = [
    [0, 30, 0, 40, 0xffffff],
    [-35, 12, 10, 18, 0xb9a6ff],
    [30, 10, -25, 16, 0xffe2ad],
  ];
  for (const [x, y, z, size, color] of softboxes) {
    const panel = new THREE.Mesh(new THREE.BoxGeometry(size, 1, size), new THREE.MeshBasicMaterial({ color }));
    panel.position.set(x, y, z);
    panel.lookAt(0, 0, 0);
    panel.rotateX(Math.PI / 2);
    studio.add(panel);
  }
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(studio, 0.04).texture;
  pmrem.dispose();
  scene.environmentIntensity = 2.4;

  scene.add(new THREE.HemisphereLight(0xcfc4ff, 0x1a0f33, 1.5));

  const sun = new THREE.DirectionalLight(0xfff1dc, 3.4);
  sun.position.set(-18, 34, 16);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -32, right: 32, top: 24, bottom: -24, near: 5, far: 90 });
  sun.shadow.bias = -0.0006;
  sun.shadow.radius = 3;
  scene.add(sun);
}
