// Rendu HTML des sections à partir du contenu. Tout le texte passe par `esc`.
import { DESIGNATORS, LINKS, PROJECT_LINKS, SECTION_IDS, SKILLS, cvUrl } from "../content/index.js";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const $ = (id) => document.getElementById(id);
const external = 'target="_blank" rel="noopener"';

/** Titre de section + repère du composant correspondant sur la carte. */
const heading = (i, t) =>
  `<h2>${esc(t.nav[i])}</h2><p class="ref"><span class="des">${DESIGNATORS[i]}</span>${esc(t.captions[i])}</p>`;

function home(t, lang) {
  return `
    <h1>Lorenzo<br>Baladier</h1>
    <p class="role">${esc(t.role)}</p>
    <p class="goal">${esc(t.goal)}</p>
    <div class="cta">
      <button class="btn" data-go="1">${esc(t.start)}</button>
      <button class="btn ghost" data-free="on">${esc(t.free.hero)}</button>
      <a class="btn ghost" href="${cvUrl(lang)}" ${external}>${esc(t.cv)}</a>
    </div>
    <p class="hint"><i></i>${esc(t.hint)}</p>`;
}

const about = (t) => heading(1, t) + t.about.map((p) => `<p>${esc(p)}</p>`).join("");

const experience = (t) =>
  heading(2, t) +
  t.experience
    .map(
      (x, i) => `
    <article class="entry" data-hl="chip${i}">
      <span class="when">${esc(x.dates)}</span>
      <h3><span class="pd">U${i + 2}</span>${esc(x.title)}</h3>
      <p class="meta">${esc(x.company)}</p>
      <ul>${x.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
    </article>`,
    )
    .join("");

const projects = (t) =>
  heading(3, t) +
  `<ul class="projects">` +
  t.projects
    .map((p, i) => {
      const link = PROJECT_LINKS[i];
      const title = link ? `<a href="${link}" ${external}>${esc(p.title)}</a>` : esc(p.title);
      return `<li data-hl="led${i}"><h3><span class="pd">D${i + 1}</span>${title}</h3><p>${esc(p.text)}</p></li>`;
    })
    .join("") +
  `</ul>`;

const skills = (t) =>
  heading(4, t) +
  [...SKILLS, t.spokenLanguages]
    .map(
      (group, i) => `
    <div class="skill" data-hl="cap${i}">
      <h3><span class="pd">C${i + 1}</span>${esc(t.skillGroups[i])}</h3>
      <ul class="tags">${group.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
    </div>`,
    )
    .join("");

const education = (t) =>
  heading(5, t) +
  t.education
    .map(
      (e) => `
    <article class="entry">
      <span class="when">${e.dates}</span>
      <h3>${esc(e.title)}</h3>
      <p class="meta">${esc(e.school)}</p>
    </article>`,
    )
    .join("");

function contact(t, lang) {
  const [mail, linkedin, github, site] = t.contactLabels;
  return (
    heading(6, t) +
    `<p>${esc(t.contactIntro)}</p>
    <ul class="contact">
      <li><span>${mail}</span><a href="mailto:${LINKS.mail}">${LINKS.mail}</a></li>
      <li><span>${linkedin}</span><a href="${LINKS.linkedin}" ${external}>linkedin.com/in/lorenzo-baladier</a></li>
      <li><span>${github}</span><a href="${LINKS.github}" ${external}>github.com/Loren844</a></li>
      <li><span>${site}</span><a href="${LINKS.site}" ${external}>lorenzo-baladier.fr</a></li>
    </ul>
    <div class="cta"><a class="btn" href="${cvUrl(lang)}" ${external}>${esc(t.cv)}</a></div>
    <p class="foot">${esc(t.footer)}</p>`
  );
}

export function renderSections(t, lang) {
  document.documentElement.lang = lang;
  $("nav").innerHTML = SECTION_IDS.slice(1)
    .map((id, i) => `<a href="#${id}" data-go="${i + 1}">${esc(t.nav[i + 1])}</a>`)
    .join("");
  document
    .querySelectorAll(".langs button")
    .forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));

  $("s-home").innerHTML = home(t, lang);
  $("s-about").innerHTML = about(t);
  $("s-experience").innerHTML = experience(t);
  $("s-projects").innerHTML = projects(t);
  $("s-skills").innerHTML = skills(t);
  $("s-education").innerHTML = education(t);
  $("s-contact").innerHTML = contact(t, lang);
}
