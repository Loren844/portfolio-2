// Interface de la vue libre : bouton de bascule, aide, fiche du composant, zoom.
import { DESIGNATORS } from "../content/index.js";

const $ = (id) => document.getElementById(id);
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

let focused = null; // { stop, project } du composant sélectionné, ou null

function dockHtml(t) {
  if (!focused) {
    return `<h2>${esc(t.free.title)}</h2><ul>${t.free.hints.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>`;
  }
  const { stop, project } = focused;
  const title = project !== undefined ? t.projects[project].title : t.nav[stop];
  const text = project !== undefined ? t.projects[project].text : t.captions[stop];
  const des = project !== undefined ? `D${project + 1}` : DESIGNATORS[stop];
  return `<h2>${esc(title)}</h2><p><span class="des">${des}</span>${esc(text)}</p>
    <button class="btn" data-go="${stop}">${esc(t.free.open)}</button>`;
}

/** Met à jour les libellés (langue, état) de toute l'interface de la vue libre. */
export function renderFreeUi(t, active) {
  const toggle = $("free-toggle");
  toggle.textContent = active ? t.free.exit : t.free.enter;
  toggle.setAttribute("aria-pressed", String(active));
  $("free-ui").hidden = !active;
  $("free-dock").innerHTML = dockHtml(t);
  $("zoom-in").setAttribute("aria-label", t.free.zoomIn);
  $("zoom-out").setAttribute("aria-label", t.free.zoomOut);
  $("zoom-reset").textContent = t.free.reset;
}

/** Affiche la fiche d'un composant (ou revient à l'aide si `target` est null). */
export function focusComponent(target, t) {
  focused = target;
  $("free-dock").innerHTML = dockHtml(t);
}
