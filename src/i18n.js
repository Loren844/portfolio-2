// Langue courante : mémorisée dans le navigateur, français par défaut.
import { CONTENT, DEFAULT_LANG } from "./content/index.js";

const KEY = "lb-lang";
const listeners = new Set();
let lang = DEFAULT_LANG;

try {
  const saved = localStorage.getItem(KEY);
  if (saved && CONTENT[saved]) lang = saved;
} catch {
  /* stockage indisponible : on garde la langue par défaut */
}

export const getLang = () => lang;

/** Textes de la langue courante. */
export const t = () => CONTENT[lang];

export function setLang(next) {
  if (!CONTENT[next] || next === lang) return;
  lang = next;
  try {
    localStorage.setItem(KEY, lang);
  } catch {
    /* sans importance */
  }
  listeners.forEach((fn) => fn(lang));
}

export const onLangChange = (fn) => listeners.add(fn);
