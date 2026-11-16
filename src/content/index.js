// Données du portfolio. Pour mettre le site à jour, il suffit en général
// de modifier ce dossier : les textes par langue (fr.js, en.js)
// et, ici, tout ce qui ne se traduit pas.
import fr from "./fr.js";
import en from "./en.js";

export const CONTENT = { fr, en };
export const DEFAULT_LANG = "fr";

// Une section = un arrêt de la visite = un composant sur la carte.
export const SECTION_IDS = ["home", "about", "experience", "projects", "skills", "education", "contact"];

// Repères sérigraphiés à côté de chaque composant (convention des schémas électroniques).
export const DESIGNATORS = ["J1", "U1", "U2–U4", "D1–D8", "C1–C5", "Y1", "ANT1"];

export const LINKS = {
  mail: "contact@lorenzo-baladier.fr",
  linkedin: "https://www.linkedin.com/in/lorenzo-baladier/",
  github: "https://github.com/Loren844",
  site: "https://lorenzo-baladier.fr",
};

export const cvUrl = (lang) => `https://loren844.github.io/cv/${lang}.pdf`;

// Même ordre que `projects` dans les fichiers de langue (null = pas de lien public).
export const PROJECT_LINKS = [
  "https://github.com/Loren844/scara-visual-servoing",
  "https://github.com/Loren844/rust-chip-8",
  "https://github.com/Loren844/MotiOS",
  null,
  "https://github.com/Loren844/portfolio",
  "https://github.com/Loren844/filrouge",
  "https://loren844.github.io/FISK/",
  "https://github.com/Loren844/LOTO-SAE",
];

// Même ordre que `skillGroups` ; le dernier groupe (langues parlées) vient des fichiers de langue.
export const SKILLS = [
  ["Rust", "C", "C++", "Python", "Java", "TypeScript", "Bash"],
  ["Linux", "Raspberry Pi", "Cuttlefish", "Software-Defined Vehicle", "SOA", "SOME/IP", "Protobuf"],
  ["ROS 2", "MoveIt 2", "YOLO", "MATLAB", "Gazebo"],
  ["Git", "GitLab CI/CD", "Cypress", "Selenium", "GraphQL"],
];
