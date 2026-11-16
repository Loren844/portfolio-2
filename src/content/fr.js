// Contenu en français.
export default {
  nav: ["Accueil", "À propos", "Expériences", "Projets", "Compétences", "Formation", "Contact"],
  role: "Ingénieur logiciel embarqué.",
  goal: "Je recherche un CDI en région parisienne à partir de septembre 2027.",
  cv: "Voir mon CV",
  start: "Suivre le signal",
  hint: "Faites défiler la page, ou cliquez sur un composant de la carte.",
  captions: [
    "",
    "Le microcontrôleur, cerveau de la carte.",
    "Trois puces, une par expérience.",
    "Huit LED, une par projet.",
    "Cinq condensateurs, un par domaine.",
    "Le quartz, qui donne le rythme depuis le début.",
    "L'antenne, pour entrer en communication.",
  ],
  about: [
    "Je suis Lorenzo Baladier, élève ingénieur en dernière année à Polytech Nice Sophia (parcours IoT & CPS) et apprenti ingénieur logiciel embarqué & SDV chez Ampere Software Technology (Groupe Renault).",
    "Je travaille sur le véhicule défini par logiciel : bring-up sur Raspberry Pi et Cuttlefish, communication orientée services (SOME/IP, Protobuf), CI/CD et outillage en Rust. Lors d'un stage au Vietnam (DNIIT), j'ai réalisé l'asservissement visuel d'un bras robotique SCARA avec ROS 2, MoveIt 2 et YOLO.",
    "Langages : Rust, C, C++, Python, Java. Je recherche un CDI à Paris à partir de septembre 2027 dans l'embarqué, l'automobile ou la robotique.",
  ],
  experience: [
    {
      title: "Ingénieur logiciel embarqué & SDV (apprentissage)",
      company: "Ampere Software Technology (Groupe Renault), Biot",
      dates: "Septembre 2024 – aujourd'hui",
      points: [
        "Conception et benchmark de CarOS, une plateforme de développement automobile basée sur l'environnement Software-Defined Vehicle de Google.",
        "Bring-up de la plateforme sur Raspberry Pi et sur appareils virtuels Cuttlefish, mise en place des pipelines CI/CD.",
        "Réalisation de cas d'usage de bout en bout : communication orientée services, diagnostic véhicule et traitement de données.",
        "Réécriture d'un prototype Python en un outil CLI/TUI modulaire en Rust générant des commandes de test SOME/IP, Protobuf et GraphQL, testé avec des mocks et intégré à GitLab CI.",
      ],
    },
    {
      title: "Stage robotique & vision par ordinateur",
      company: "DNIIT, Da Nang, Vietnam",
      dates: "Mai 2026 – août 2026",
      points: [
        "Asservissement visuel en boucle fermée d'un bras industriel SCARA pour du pick-and-place de cibles en mouvement.",
        "Détection d'objets et estimation de pose en temps réel avec YOLO, intégrées à ROS 2 et MoveIt 2.",
        "Validation de la cinématique et de la commande PID sous MATLAB et Gazebo avant déploiement sur le robot réel.",
      ],
    },
    {
      title: "Développeur logiciel (apprentissage)",
      company: "European Systems Integration, Le Cannet",
      dates: "Septembre 2022 – juillet 2024",
      points: [
        "Développement d'une application Java d'export JSON de données depuis une base distante.",
        "Automatisation des tests de bout en bout avec Selenium/TestNG, puis migration vers TypeScript/Cypress.",
      ],
    },
  ],
  projects: [
    {
      title: "Asservissement visuel d'un robot SCARA",
      text: "ROS 2, YOLO, MoveIt 2. Stage DNIIT, 2026.",
    },
    {
      title: "Émulateur CHIP-8 en Rust",
      text: "Rust, SDL2, 2025. Boucle fetch-decode-execute, mémoire, registres, timers, affichage et clavier.",
    },
    {
      title: "MotiOS",
      text: "Assistant iOS pour Pokémon GO : OCR et calcul d'IV.",
    },
    {
      title: "Go-Biking",
      text: "C#, SOAP/REST, ActiveMQ. Calculateur d'itinéraires orienté services, combinant API de vélos en libre-service et de routage, avec proxy de cache et messagerie asynchrone. Projet d'école.",
    },
    {
      title: "Portfolio interactif",
      text: "Un portfolio en forme de terminal, disponible en français et en anglais.",
    },
    {
      title: "Application mobile Android",
      text: "Java. BUT Informatique, semestre 4.",
    },
    {
      title: "FISK",
      text: "Jeu en Java, variante de Risk. BUT Informatique, semestre 2.",
    },
    {
      title: "Jeu de loto en C",
      text: "BUT Informatique, semestre 1.",
    },
  ],
  skillGroups: ["Langages", "Embarqué et automobile", "Robotique et vision", "Outils", "Langues"],
  spokenLanguages: ["Français, natif", "Italien, courant (EsaBac)", "Anglais, TOEIC 955/990"],
  education: [
    {
      dates: "2024 – 2027",
      title: "Diplôme d'ingénieur en informatique, parcours IoT & CPS, en apprentissage",
      school: "Polytech Nice Sophia, Université Côte d'Azur",
    },
    {
      dates: "2022 – 2024",
      title: "DUT Informatique en alternance",
      school: "IUT Nice Côte d'Azur, Sophia Antipolis",
    },
    {
      dates: "2019 – 2022",
      title: "Baccalauréat général, section EsaBac (double diplôme franco-italien), mention Très Bien",
      school: "Lycée Pierre et Marie Curie, Menton",
    },
  ],
  contactIntro: "Vous pouvez me contacter par les moyens ci-dessous.",
  contactLabels: ["E-mail", "LinkedIn", "GitHub", "Site"],
  footer: "Carte dessinée et routée en JavaScript avec three.js.",
  free: {
    enter: "Vue libre",
    exit: "Reprendre la visite",
    hero: "Explorer la carte",
    open: "Ouvrir la section",
    reset: "Recentrer",
    zoomIn: "Zoomer",
    zoomOut: "Dézoomer",
    title: "Vue libre",
    hints: [
      "Glissez pour tourner la carte",
      "Molette ou pincement pour zoomer",
      "Cliquez un point pour vous en approcher",
      "Clic droit ou deux doigts pour déplacer",
    ],
  },
};
