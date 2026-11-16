import "./styles/index.css";
import { getLang, onLangChange, setLang, t } from "./i18n.js";
import { renderSections } from "./ui/sections.js";
import { goTo, markNav, travel, reduceMotion } from "./ui/tour.js";
import { focusComponent, renderFreeUi } from "./ui/freeDock.js";
import { createScene } from "./scene/index.js";

let free = false;
let scene = null;

function render() {
  renderSections(t(), getLang());
  renderFreeUi(t(), free);
  markNav();
  scene?.redrawBoard();
}

function setFree(on) {
  if (!scene || on === free) return;
  free = on;
  document.body.classList.toggle("free", free);
  focusComponent(null, t());
  renderFreeUi(t(), free);
  scene.setFreeView(free);
}

render();

scene = createScene({
  canvas: document.getElementById("scene"),
  labels: () => t(),
  travel,
  reduceMotion,
  // Clic sur un composant pendant la visite : on défile jusqu'à sa section.
  onNavigate: goTo,
  // Clic sur un composant en vue libre : on affiche sa fiche.
  onFocus: (target) => focusComponent(target, t()),
});

if (!scene) {
  document.body.classList.add("no3d");
  document.getElementById("free-toggle").hidden = true;
  document.querySelectorAll("[data-free]").forEach((b) => (b.hidden = true));
}

onLangChange(render);
addEventListener("scroll", markNav, { passive: true });

document.addEventListener("click", (e) => {
  const go = e.target.closest("[data-go]");
  if (go) {
    e.preventDefault();
    setFree(false);
    goTo(Number(go.dataset.go));
    return;
  }
  const lang = e.target.closest("[data-lang]");
  if (lang) return setLang(lang.dataset.lang);
  if (e.target.closest("[data-free]")) return setFree(true);
  if (e.target.closest("#free-toggle")) return setFree(!free);
  if (e.target.closest("#zoom-in")) return scene?.zoom(0.65);
  if (e.target.closest("#zoom-out")) return scene?.zoom(1.5);
  if (e.target.closest("#zoom-reset")) {
    focusComponent(null, t());
    scene?.resetView();
  }
});

addEventListener("keydown", (e) => {
  if (e.key === "Escape") setFree(false);
});

// Survol ou focus d'un élément de contenu : son composant s'illumine sur la carte.
const highlightFrom = (e) => scene?.highlight(e.target.closest?.("[data-hl]")?.dataset.hl ?? null);
document.addEventListener("pointerover", highlightFrom);
document.addEventListener("focusin", highlightFrom);
