// English content.
export default {
  nav: ["Home", "About", "Experience", "Projects", "Skills", "Education", "Contact"],
  role: "Embedded software engineer. Software-defined vehicles and robotics.",
  goal: "Looking for a full-time role in Paris from September 2027.",
  cv: "View my resume",
  start: "Follow the signal",
  hint: "Scroll down, or click a component on the board.",
  captions: [
    "",
    "The microcontroller, the brain of the board.",
    "Three chips, one per position.",
    "Eight LEDs, one per project.",
    "Five capacitors, one per field.",
    "The crystal, keeping time since the start.",
    "The antenna, to get in touch.",
  ],
  about: [
    "I am Lorenzo Baladier, a final-year engineering student at Polytech Nice Sophia (IoT & CPS track) and an embedded & SDV software engineering apprentice at Ampere Software Technology (Renault Group).",
    "I work on the software-defined vehicle: bring-up on Raspberry Pi and Cuttlefish, service-oriented communication (SOME/IP, Protobuf), CI/CD and Rust tooling. During an internship in Vietnam (DNIIT), I built visual servoing for a SCARA robot arm with ROS 2, MoveIt 2 and YOLO.",
    "Languages: Rust, C, C++, Python, Java. I am looking for a full-time role in Paris from September 2027 in embedded systems, automotive or robotics.",
  ],
  experience: [
    {
      title: "Embedded & SDV Software Engineer (apprentice)",
      company: "Ampere Software Technology (Renault Group), Biot",
      dates: "September 2024 – present",
      points: [
        "Designed and benchmarked CarOS, an automotive development platform built on Google's Software-Defined Vehicle environment.",
        "Brought the platform up on Raspberry Pi hardware and on Cuttlefish virtual devices; set up the CI/CD pipelines.",
        "Built end-to-end use cases covering service-oriented communication, vehicle diagnostics and data processing.",
        "Rewrote a Python prototype into a modular Rust CLI/TUI tool generating SOME/IP, Protobuf and GraphQL test commands, unit-tested with mocks and integrated into GitLab CI.",
      ],
    },
    {
      title: "Robotics & Computer Vision Intern",
      company: "DNIIT, Da Nang, Vietnam",
      dates: "May 2026 – August 2026",
      points: [
        "Implemented closed-loop visual servoing of an industrial SCARA arm for dynamic pick-and-place of moving targets.",
        "Integrated real-time YOLO object detection and pose estimation with ROS 2 and MoveIt 2.",
        "Validated kinematics and PID control in MATLAB and Gazebo before deploying on the physical robot.",
      ],
    },
    {
      title: "Software Developer (apprentice)",
      company: "European Systems Integration, Le Cannet",
      dates: "September 2022 – July 2024",
      points: [
        "Developed a Java application exporting data from a remote database to JSON.",
        "Automated end-to-end tests with Selenium/TestNG, then led their migration to TypeScript/Cypress.",
      ],
    },
  ],
  projects: [
    {
      title: "SCARA robot visual servoing",
      text: "ROS 2, YOLO, MoveIt 2. DNIIT internship, 2026.",
    },
    {
      title: "CHIP-8 emulator in Rust",
      text: "Rust, SDL2, 2025. Fetch-decode-execute loop, memory, registers, timers, display and keypad.",
    },
    {
      title: "MotiOS",
      text: "iOS assistant for Pokémon GO: OCR and IV computation.",
    },
    {
      title: "Go-Biking",
      text: "C#, SOAP/REST, ActiveMQ. Service-oriented route planner combining bike-sharing and routing APIs, with a caching proxy and asynchronous messaging. School project.",
    },
    {
      title: "Interactive portfolio",
      text: "A terminal-style portfolio available in French and English.",
    },
    {
      title: "Android mobile app",
      text: "Java. CS Bachelor, semester 4.",
    },
    {
      title: "FISK",
      text: "Java game, a Risk variant. CS Bachelor, semester 2.",
    },
    {
      title: "Bingo game in C",
      text: "CS Bachelor, semester 1.",
    },
  ],
  skillGroups: ["Languages", "Embedded and automotive", "Robotics and vision", "Tools", "Spoken languages"],
  spokenLanguages: ["French, native", "Italian, fluent (EsaBac)", "English, TOEIC 955/990"],
  education: [
    {
      dates: "2024 – 2027",
      title: "MSc-level Engineering Degree in Computer Science, IoT & CPS, apprenticeship",
      school: "Polytech Nice Sophia, Université Côte d'Azur",
    },
    {
      dates: "2022 – 2024",
      title: "University Diploma in Computer Science (DUT), apprenticeship",
      school: "IUT Nice Côte d'Azur, Sophia Antipolis",
    },
    {
      dates: "2019 – 2022",
      title: "French Baccalaureate, EsaBac (French-Italian dual diploma), Highest Honors",
      school: "Lycée Pierre et Marie Curie, Menton",
    },
  ],
  contactIntro: "You can reach me through any of the following.",
  contactLabels: ["Email", "LinkedIn", "GitHub", "Website"],
  footer: "Board drawn and routed in JavaScript with three.js.",
  free: {
    enter: "Free view",
    exit: "Back to the tour",
    hero: "Explore the board",
    open: "Open the section",
    reset: "Recenter",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    title: "Free view",
    hints: [
      "Drag to rotate the board",
      "Scroll or pinch to zoom",
      "Click a spot to move closer",
      "Right-click or two fingers to pan",
    ],
  },
};
