// Contenuto in italiano.
export default {
  nav: ["Home", "Chi sono", "Esperienze", "Progetti", "Competenze", "Formazione", "Contatti"],
  role: "Ingegnere software embedded. Veicolo definito dal software e robotica.",
  goal: "Cerco un contratto a tempo indeterminato a Parigi da settembre 2027.",
  cv: "Apri il mio CV",
  start: "Segui il segnale",
  hint: "Scorri la pagina, oppure clicca un componente della scheda.",
  captions: [
    "",
    "Il microcontrollore, cervello della scheda.",
    "Tre chip, uno per esperienza.",
    "Otto LED, uno per progetto.",
    "Cinque condensatori, uno per ambito.",
    "Il quarzo, che dà il ritmo dall'inizio.",
    "L'antenna, per entrare in contatto.",
  ],
  about: [
    "Sono Lorenzo Baladier, studente di ingegneria all'ultimo anno al Polytech Nice Sophia (indirizzo IoT & CPS) e ingegnere software embedded & SDV in apprendistato presso Ampere Software Technology (Gruppo Renault).",
    "Lavoro sul veicolo definito dal software: bring-up su Raspberry Pi e Cuttlefish, comunicazione orientata ai servizi (SOME/IP, Protobuf), CI/CD e strumenti in Rust. Durante un tirocinio in Vietnam (DNIIT), ho realizzato il visual servoing di un braccio robotico SCARA con ROS 2, MoveIt 2 e YOLO.",
    "Linguaggi: Rust, C, C++, Python, Java. Cerco un contratto a tempo indeterminato a Parigi da settembre 2027 nei sistemi embedded, nell'automotive o nella robotica.",
  ],
  experience: [
    {
      title: "Ingegnere software embedded & SDV (apprendistato)",
      company: "Ampere Software Technology (Gruppo Renault), Biot",
      dates: "Settembre 2024 – oggi",
      points: [
        "Progettazione e benchmark di CarOS, una piattaforma di sviluppo automotive basata sull'ambiente Software-Defined Vehicle di Google.",
        "Bring-up della piattaforma su Raspberry Pi e su dispositivi virtuali Cuttlefish; realizzazione delle pipeline CI/CD.",
        "Sviluppo di casi d'uso end-to-end: comunicazione orientata ai servizi, diagnostica del veicolo ed elaborazione dei dati.",
        "Riscrittura di un prototipo Python in uno strumento CLI/TUI modulare in Rust che genera comandi di test SOME/IP, Protobuf e GraphQL, testato con mock e integrato in GitLab CI.",
      ],
    },
    {
      title: "Tirocinio robotica e visione artificiale",
      company: "DNIIT, Da Nang, Vietnam",
      dates: "Maggio 2026 – agosto 2026",
      points: [
        "Visual servoing ad anello chiuso di un braccio industriale SCARA per il pick-and-place di bersagli in movimento.",
        "Rilevamento oggetti e stima della posa in tempo reale con YOLO, integrati con ROS 2 e MoveIt 2.",
        "Validazione della cinematica e del controllo PID in MATLAB e Gazebo prima del deploy sul robot reale.",
      ],
    },
    {
      title: "Sviluppatore software (apprendistato)",
      company: "European Systems Integration, Le Cannet",
      dates: "Settembre 2022 – luglio 2024",
      points: [
        "Sviluppo di un'applicazione Java per l'esportazione in JSON di dati da un database remoto.",
        "Automazione dei test end-to-end con Selenium/TestNG, poi migrazione verso TypeScript/Cypress.",
      ],
    },
  ],
  projects: [
    {
      title: "Visual servoing di un robot SCARA",
      text: "ROS 2, YOLO, MoveIt 2. Tirocinio DNIIT, 2026.",
    },
    {
      title: "Emulatore CHIP-8 in Rust",
      text: "Rust, SDL2, 2025. Ciclo fetch-decode-execute, memoria, registri, timer, display e tastiera.",
    },
    {
      title: "MotiOS",
      text: "Assistente iOS per Pokémon GO: OCR e calcolo IV.",
    },
    {
      title: "Go-Biking",
      text: "C#, SOAP/REST, ActiveMQ. Calcolatore di itinerari orientato ai servizi, che combina API di bike sharing e di routing, con proxy di cache e messaggistica asincrona. Progetto scolastico.",
    },
    {
      title: "Portfolio interattivo",
      text: "Un portfolio a forma di terminale, in francese, inglese e italiano.",
    },
    {
      title: "Applicazione mobile Android",
      text: "Java. Laurea in Informatica, semestre 4.",
    },
    {
      title: "FISK",
      text: "Gioco in Java, variante di Risk. Laurea in Informatica, semestre 2.",
    },
    {
      title: "Gioco del loto in C",
      text: "Laurea in Informatica, semestre 1.",
    },
  ],
  skillGroups: ["Linguaggi", "Embedded e automotive", "Robotica e visione", "Strumenti", "Lingue"],
  spokenLanguages: ["Francese, madrelingua", "Italiano, fluente (EsaBac)", "Inglese, TOEIC 955/990"],
  education: [
    {
      dates: "2024 – 2027",
      title: "Laurea in Ingegneria Informatica (livello magistrale), IoT & CPS, in apprendistato",
      school: "Polytech Nice Sophia, Université Côte d'Azur",
    },
    {
      dates: "2022 – 2024",
      title: "Diploma universitario in Informatica (DUT), in apprendistato",
      school: "IUT Nice Côte d'Azur, Sophia Antipolis",
    },
    {
      dates: "2019 – 2022",
      title: "Baccalaureato francese, EsaBac (doppio diploma italo-francese), Lode",
      school: "Lycée Pierre et Marie Curie, Menton",
    },
  ],
  contactIntro: "Puoi contattarmi tramite i mezzi qui sotto.",
  contactLabels: ["Email", "LinkedIn", "GitHub", "Sito"],
  footer: "Scheda disegnata e sbrogliata in JavaScript con three.js.",
  free: {
    enter: "Vista libera",
    exit: "Riprendi la visita",
    hero: "Esplora la scheda",
    open: "Apri la sezione",
    reset: "Ricentra",
    zoomIn: "Ingrandisci",
    zoomOut: "Riduci",
    title: "Vista libera",
    hints: [
      "Trascina per ruotare la scheda",
      "Rotellina o pizzico per lo zoom",
      "Clicca un punto per avvicinarti",
      "Clic destro o due dita per spostare",
    ],
  },
};
