/**
 * Single source of truth for the CV website.
 *
 * Every visible string is bilingual: `{ en: '...', da: '...' }`.
 * Edit this file, commit, push — the site rebuilds automatically.
 *
 * Lines marked TODO are placeholders waiting for real text.
 */

export type L = { en: string; da: string };

export const person = {
  name: 'Phillip Christopher Nøhr Færch',
  shortName: 'Christopher Færch',
  tagline: {
    en: 'Robotics engineer · Control, embedded systems & simulation',
    da: 'Robotingeniør · Regulering, embedded systemer & simulation',
  } as L,
  city: { en: 'Odense, Denmark', da: 'Odense, Danmark' } as L,
  email: 'christopherfaerch@gmail.com',
  phone: '+45 22 18 77 00',
  phoneHref: 'tel:+4522187700',
  github: 'https://github.com/Toasting-Snowdragon-9999',
  githubLabel: 'Toasting-Snowdragon-9999',
  // TODO: add LinkedIn URL or leave empty string to hide the link.
  linkedin: '',
  cvFile: {
    en: '/Phillip_Christopher_Faerch_CV.docx',
    da: '/Phillip_Christopher_Faerch_CV_DA.docx',
  },
  born: '2002-01-15',
};

export const profile: { summary: L; highlights: L[] } = {
  // TODO: confirm or rewrite this draft profile text.
  summary: {
    en: 'Robotics engineer with a BSc in Robot Systems from the University of Southern Denmark, now studying for the industrial MSc in Robotics in Odense while working as a software developer at 4X-Robots. I like working across the whole stack: from control loops running on microcontrollers and FPGAs, to physics simulation, control theory and learning-based methods. My bachelor project built a bio-inspired locomotion controller that makes a quadruped robot walk, trot and gallop in MuJoCo.',
    da: 'Robotingeniør med en bachelor i robotteknologi fra Syddansk Universitet, nu i gang med erhvervskandidaten i robotteknologi i Odense ved siden af et job som softwareudvikler hos 4X-Robots. Jeg arbejder gerne på tværs af hele stakken: fra reguleringssløjfer på mikrocontrollere og FPGA’er til fysiksimulation, reguleringsteori og læringsbaserede metoder. Mit bachelorprojekt byggede en bio-inspireret gangkontroller, der får en firbenet robot til at gå, trave og galoppere i MuJoCo.',
  },
  highlights: [
    { en: 'BSc Robot Systems, SDU (2026)', da: 'BSc i robotteknologi, SDU (2026)' },
    { en: 'MSc Robotics, industrial master’s (2026–)', da: 'Erhvervskandidat i robotteknologi (2026–)' },
    { en: 'Associate Software Developer at 4X-Robots (2024–)', da: 'Associate Software Developer hos 4X-Robots (2024–)' },
  ],
};

export type Experience = {
  role: L;
  company: string;
  place: string;
  from: string; // YYYY-MM
  to: string | null; // null = present
  description: L;
};

export const experience: Experience[] = [
  {
    role: { en: 'Associate Software Developer (student worker)', da: 'Associate Software Developer (studentermedhjælper)' },
    company: '4X-Robots',
    place: 'Odense',
    from: '2024-04',
    to: null,
    description: {
      en: 'Built a production-line application that flashes every board in the robot and supports testing and setup of a new robot. Implemented backend support for the conveyor-tracking feature, plus logging and other smaller features.',
      da: 'Byggede en applikation til produktionslinjen, der flasher alle boards i robotten og understøtter test og opsætning af en ny robot. Implementerede backend-understøttelse af conveyor tracking samt logging og andre mindre features.',
    },
  },
  {
    role: { en: 'Substitute teacher and pedagogue (on call)', da: 'Tilkaldevikar, lærer og pædagog' },
    company: 'Katrinedalskolen, afd. Tuse',
    place: 'Holbæk',
    from: '2022-08',
    to: '2023-07',
    description: {
      en: 'Covered classes and after-school care at short notice across all primary-school years.',
      da: 'Dækkede undervisning og SFO med kort varsel på tværs af alle klassetrin.',
    },
  },
  {
    role: { en: 'Service assistant, reception and cleaning', da: 'Servicemedarbejder, reception og rengøring' },
    company: 'Museum Vestsjælland, Malergården',
    place: 'Kirke Såby',
    from: '2022-06',
    to: '2022-09',
    description: {
      en: 'Front desk, ticketing and guest service at a museum during the summer season.',
      da: 'Reception, billetsalg og gæsteservice på et museum i sommersæsonen.',
    },
  },
  {
    role: { en: 'Gym staff and service assistant', da: 'Gym staff og servicemedarbejder' },
    company: 'Fitness World / PureGym',
    place: 'Holbæk',
    from: '2020-11',
    to: '2023-08',
    description: {
      en: 'Member service, opening and closing, and upkeep of the gym over almost three years alongside school and university.',
      da: 'Medlemsservice, åbning og lukning samt vedligehold af centret i næsten tre år ved siden af gymnasium og universitet.',
    },
  },
  {
    role: { en: 'Service and checkout assistant', da: 'Service- og kassemedarbejder' },
    company: 'Rema 1000',
    place: 'Holbæk',
    from: '2019-07',
    to: '2020-01',
    description: {
      en: 'Checkout, restocking and customer service.',
      da: 'Kasse, varepåfyldning og kundeservice.',
    },
  },
  {
    role: { en: 'Bread stall attendant and kitchen assistant', da: 'Betjening af brødvogn og køkkenmedhjælper' },
    company: 'Gourmethuset Store Børs',
    place: 'Roskilde',
    from: '2016-05',
    to: '2019-09',
    description: {
      en: 'Ran the bread stall on Stændertorvet and helped in the bakery and kitchen.',
      da: 'Betjente brødvognen på Stændertorvet og hjalp til i bageri og køkken.',
    },
  },
  {
    role: { en: 'Newspaper carrier', da: 'Avisbud' },
    company: 'NordVestNyt',
    place: 'Holbæk',
    from: '2015-03',
    to: '2016-09',
    description: {
      en: 'Fixed delivery route twice a week.',
      da: 'Fast rute to gange om ugen.',
    },
  },
];

export type Course = {
  title: L;
  ects: number;
  code?: string;
  kind?: 'project' | 'elective' | 'firstYearExam';
  note?: L;
};

export type Semester = { label: L; term: string; courses: Course[] };

export const bscSemesters: Semester[] = [
  {
    label: { en: 'Semester 1', da: '1. semester' },
    term: 'E23',
    courses: [
      { title: { en: 'Mathematics for Robotics', da: 'Robotteknologisk matematik' }, ects: 11, code: 'T540036101', kind: 'firstYearExam' },
      { title: { en: 'Mathematical Methods in Programming', da: 'Matematiske metoder i programmering' }, ects: 4, code: 'T540037101', kind: 'firstYearExam' },
      { title: { en: 'Basic Electronics', da: 'Grundlæggende elektronik' }, ects: 5, code: 'T540040101', kind: 'firstYearExam' },
      { title: { en: 'Physics of Robots', da: 'Robotters fysik' }, ects: 5, code: 'T540039101', kind: 'firstYearExam' },
      { title: { en: 'Semester project: Basic Robot Control', da: 'Semesterprojekt i grundlæggende styring af robotter' }, ects: 5, code: 'T540032101', kind: 'project' },
    ],
  },
  {
    label: { en: 'Semester 2', da: '2. semester' },
    term: 'F24',
    courses: [
      { title: { en: 'Computer Engineering', da: 'Datateknik' }, ects: 5, code: 'T540050101' },
      { title: { en: 'Robot Kinematics', da: 'Robotkinematik' }, ects: 5, code: 'T530038101' },
      { title: { en: 'Introduction to C++', da: 'Introduktion til C++' }, ects: 5, code: 'T540049101' },
      { title: { en: 'Software Development', da: 'Softwareudvikling' }, ects: 5, code: 'T530037101' },
      { title: { en: 'Semester project: Autonomous Robots', da: 'Semesterprojekt i autonome robotter' }, ects: 10, code: 'T540035101', kind: 'project' },
    ],
  },
  {
    label: { en: 'Semester 3', da: '3. semester' },
    term: 'E24',
    courses: [
      { title: { en: 'Multivariate Mathematics for Robotics', da: 'Multivariat matematik for robotteknologi' }, ects: 5, code: 'T540047101' },
      { title: { en: 'Signal Processing', da: 'Signalbehandling' }, ects: 5, code: 'T540038101' },
      { title: { en: 'Computer Architecture and Operating Systems', da: 'Computerarkitektur og operativsystemer' }, ects: 5, code: 'T540042101' },
      { title: { en: 'Industrial Data Communication', da: 'Industriel datakommunikation' }, ects: 5, code: 'T540043101' },
      { title: { en: 'Semester project: Mobile Robot Systems', da: 'Semesterprojekt i mobile robotsystemer' }, ects: 10, code: 'T540020101', kind: 'project' },
    ],
  },
  {
    label: { en: 'Semester 4', da: '4. semester' },
    term: 'F25',
    courses: [
      { title: { en: 'Digital Programmable Electronics', da: 'Digital programmerbar elektronik' }, ects: 5, code: 'T540053101' },
      { title: { en: 'Control Engineering', da: 'Reguleringsteknik' }, ects: 5, code: 'T540055101' },
      { title: { en: 'Embedded Programming', da: 'Embedded programming' }, ects: 5, code: 'T540051101' },
      { title: { en: 'Amplifier Techniques and Error Analysis', da: 'Forstærkerteknik og fejlberegninger' }, ects: 5, code: 'T540056101' },
      { title: { en: 'Semester project: Control and Regulation of Robot Systems', da: 'Semesterprojekt i kontrol og regulering af robotsystemer' }, ects: 10, code: 'T540006101', kind: 'project' },
    ],
  },
  {
    label: { en: 'Semester 5', da: '5. semester' },
    term: 'E25',
    courses: [
      { title: { en: 'Statistics', da: 'Statistik' }, ects: 5, code: 'T460013101' },
      { title: { en: 'Drones for Computer Vision Applications (summer school)', da: 'Drones for Computer Vision Applications (sommerskole)' }, ects: 5, kind: 'elective' },
      { title: { en: 'Algorithms and Data Structures', da: 'Algoritmer og datastrukturer' }, ects: 5, code: 'T540019101' },
      { title: { en: 'Introduction to Robotics', da: 'Introduction to Robotics' }, ects: 7.5, code: 'T540045101' },
      { title: { en: 'Introduction to Artificial Intelligence', da: 'Introduction to Artificial Intelligence' }, ects: 7.5, code: 'T540044101' },
    ],
  },
  {
    label: { en: 'Semester 6', da: '6. semester' },
    term: 'F26',
    courses: [
      { title: { en: 'Numerical Methods', da: 'Numerical Methods' }, ects: 7, code: 'T540009101' },
      { title: { en: 'Philosophy of Science in Engineering', da: 'Ingeniørfagets videnskabsteori' }, ects: 3, code: 'T540008101' },
      { title: { en: 'Underactuated Robotics', da: 'Underactuated Robotics' }, ects: 5, kind: 'elective' },
      { title: { en: 'Bachelor project', da: 'Bachelorprojekt' }, ects: 15, code: 'T540007101', kind: 'project' },
    ],
  },
];

export type Education = {
  degree: L;
  institution: L;
  place: string;
  from: string;
  to: string | null;
  description?: L;
  link?: string;
  semesters?: Semester[];
};

export const education: Education[] = [
  {
    degree: { en: 'MSc in Robotics, Industrial Master’s Programme', da: 'Erhvervskandidat i robotteknologi (cand.polyt.)' },
    institution: { en: 'University of Southern Denmark (SDU)', da: 'Syddansk Universitet (SDU)' },
    place: 'Odense',
    from: '2026-09',
    to: null,
    link: 'https://www.sdu.dk/da/uddannelse/kandidat/erhvervskandidat/robotteknologi',
    description: {
      en: 'Three-year industrial master’s: first year full-time, then part-time study combined with at least 25 hours a week of engineering work. Focus on AI, computer vision, machine learning, robot design and autonomous systems. Taught in English.',
      da: 'Treårig erhvervskandidat: første år på fuld tid, derefter deltidsstudie kombineret med mindst 25 timers ingeniørarbejde om ugen. Fokus på AI, computer vision, machine learning, robotdesign og autonome systemer. Undervisning på engelsk.',
    },
  },
  {
    degree: { en: 'BSc in Engineering, Robot Systems', da: 'Bachelor i robotteknologi (diplomingeniør-forberedende BSc)' },
    institution: { en: 'University of Southern Denmark (SDU)', da: 'Syddansk Universitet (SDU)' },
    place: 'Odense',
    from: '2023-09',
    to: '2026-06',
    description: {
      en: '180 ECTS across mathematics, electronics, embedded programming, control engineering, signal processing, robotics and AI, with a hands-on semester project every semester.',
      da: '180 ECTS på tværs af matematik, elektronik, embedded programmering, reguleringsteknik, signalbehandling, robotteknologi og AI, med et praktisk semesterprojekt hvert semester.',
    },
    semesters: bscSemesters,
  },
  {
    degree: { en: 'Upper secondary school (STX)', da: 'Studentereksamen (STX)' },
    institution: { en: 'Stenhus Gymnasium', da: 'Stenhus Gymnasium' },
    place: 'Holbæk',
    from: '2019-08',
    to: '2022-06',
  },
  {
    degree: { en: 'Pre-IB, international programme', da: 'Pre-IB, international linje' },
    institution: { en: 'Stenhus Gymnasium', da: 'Stenhus Gymnasium' },
    place: 'Holbæk',
    from: '2018-08',
    to: '2019-06',
  },
  {
    degree: { en: 'Lower secondary school, years 5–9', da: 'Grundskole, 5.–9. klasse' },
    institution: { en: 'Stenhus Kostskole', da: 'Stenhus Kostskole' },
    place: 'Holbæk',
    from: '2013-08',
    to: '2018-06',
  },
  {
    degree: { en: 'Primary school, years 0–4', da: 'Grundskole, 0.–4. klasse' },
    institution: { en: 'Tuse Skole', da: 'Tuse Skole' },
    place: 'Holbæk',
    from: '2008-08',
    to: '2013-06',
  },
];

export type Project = {
  id: string;
  title: L;
  context: L; // e.g. "Bachelor project, SDU, spring 2026"
  summary: L;
  details?: L[]; // bullet points
  tags: string[];
  repo?: string;
  video?: string; // path under /public
  image?: string; // path under /public
  imageAlt?: L;
  featured?: boolean;
  todo?: boolean; // shows a subtle "text pending" note while placeholder
};

export const projects: Project[] = [
  {
    id: 'quadruped',
    featured: true,
    title: {
      en: 'Bio-inspired muscle control of quadruped locomotion',
      da: 'Bio-inspireret muskelstyring af firbenet gang',
    },
    context: {
      en: 'Bachelor project · SDU Robotics · Spring 2026 · with Sarah Harring Rousing · Supervisor Xiaofeng Xiong',
      da: 'Bachelorprojekt · SDU Robotics · Forår 2026 · med Sarah Harring Rousing · Vejleder Xiaofeng Xiong',
    },
    summary: {
      en: 'A locomotion controller for the Unitree Go2 quadruped in the MuJoCo physics simulator, built without a full-body dynamic model. Four coupled Kuramoto oscillators form a central pattern generator that sets the gait rhythm, foot trajectories are solved with Levenberg–Marquardt inverse kinematics, and joints are driven by a muscle-like adaptive impedance controller (OIAC). Gait parameters are tuned with PPO and CMA-ES.',
      da: 'En gangkontroller til Unitree Go2-robotten i fysiksimulatoren MuJoCo, bygget uden en fuld dynamisk model. Fire koblede Kuramoto-oscillatorer udgør en central pattern generator, der sætter gangrytmen, fodbaner løses med Levenberg–Marquardt invers kinematik, og leddene drives af en muskellignende adaptiv impedansregulator (OIAC). Gangparametre tunes med PPO og CMA-ES.',
    },
    details: [
      { en: 'Five gaits: walk, trot, amble, canter and gallop, switchable at runtime.', da: 'Fem gangarter: walk, trot, amble, canter og gallop, som kan skiftes under kørsel.' },
      { en: 'OIAC compared against a classic PD controller on cost of transport and tracking error.', da: 'OIAC sammenlignet med en klassisk PD-regulator på cost of transport og følgefejl.' },
      { en: 'Gymnasium environment with Stable-Baselines3 and CMA-ES for automatic gait tuning.', da: 'Gymnasium-miljø med Stable-Baselines3 og CMA-ES til automatisk tuning af gangarter.' },
    ],
    tags: ['Python', 'MuJoCo', 'Control', 'CPG', 'Reinforcement learning', 'NumPy/SciPy'],
    repo: 'https://github.com/Toasting-Snowdragon-9999/bio_inspired_muscle',
    video: '/projects/quadruped.mp4',
    image: '/projects/go2.jpg',
    imageAlt: { en: 'Unitree Go2 quadruped in the MuJoCo simulator', da: 'Unitree Go2-robot i MuJoCo-simulatoren' },
  },
  {
    id: 'pantilt',
    title: { en: 'Pan-tilt control system with ball tracking', da: 'Pan-tilt-reguleringssystem med boldtracking' },
    context: { en: 'Semester project · 4th semester · Spring 2025', da: 'Semesterprojekt · 4. semester · Forår 2025' },
    summary: {
      en: 'Closed-loop control of a two-axis pan-tilt camera platform. A Tiva TM4C123 microcontroller running FreeRTOS executes the control loops and talks over SPI to a PYNQ-Z2 FPGA, where VHDL modules generate motor PWM and decode the encoders. An OpenCV pipeline in C++ detects a tennis ball and feeds its position to the controller so the platform follows it.',
      da: 'Lukket-sløjfe-regulering af en to-akset pan-tilt-kameraplatform. En Tiva TM4C123-mikrocontroller med FreeRTOS kører reguleringssløjferne og taler over SPI med en PYNQ-Z2 FPGA, hvor VHDL-moduler genererer motor-PWM og afkoder enkoderne. En OpenCV-pipeline i C++ detekterer en tennisbold og sender dens position til regulatoren, så platformen følger den.',
    },
    tags: ['C', 'FreeRTOS', 'VHDL', 'FPGA', 'SPI', 'OpenCV', 'C++', 'Control'],
    repo: 'https://github.com/Toasting-Snowdragon-9999/pan_tilt_control_system',
  },
  {
    id: 'exoskeleton',
    title: { en: 'EMG-driven finger exoskeleton for tremor suppression', da: 'EMG-styret finger-exoskelet til tremordæmpning' },
    context: { en: 'Ongoing personal research project · 2026', da: 'Igangværende personligt forskningsprojekt · 2026' },
    summary: {
      en: 'A 2-DOF thumb–index hand exoskeleton concept for Parkinsonian tremor. Surface EMG is processed in Python to separate voluntary grasp intent from tremor-band muscle activity, so that adaptive stiffness or damping is applied only while tremor is present and natural movement is preserved.',
      da: 'Et 2-DOF tommel–pegefinger-exoskelet-koncept til parkinsontremor. Overflade-EMG behandles i Python for at adskille viljestyret gribeintention fra muskelaktivitet i tremorbåndet, så adaptiv stivhed eller dæmpning kun påføres, mens der er tremor, og naturlig bevægelse bevares.',
    },
    tags: ['Python', 'Signal processing', 'EMG', 'Biomechatronics'],
  },
  {
    id: 'drones',
    title: { en: 'Drones for computer vision applications', da: 'Droner til computer vision-anvendelser' },
    context: { en: 'Summer school elective · 5th semester · Autumn 2025', da: 'Sommerskole-valgfag · 5. semester · Efterår 2025' },
    summary: {
      en: 'TODO: two to four lines about what you built or flew during the summer school.',
      da: 'TODO: to til fire linjer om hvad du byggede eller fløj på sommerskolen.',
    },
    tags: ['Drones', 'Computer vision'],
    todo: true,
  },
  {
    id: 's4',
    title: { en: 'Control and regulation of robot systems', da: 'Kontrol og regulering af robotsystemer' },
    context: { en: 'Semester project · 4th semester · Spring 2025', da: 'Semesterprojekt · 4. semester · Forår 2025' },
    summary: {
      en: 'TODO: this is the same semester as the pan-tilt project. If they are the same project, delete this entry.',
      da: 'TODO: samme semester som pan-tilt-projektet. Hvis det er samme projekt, slet denne post.',
    },
    tags: ['Control'],
    todo: true,
  },
  {
    id: 's3',
    title: { en: 'Mobile robot systems', da: 'Mobile robotsystemer' },
    context: { en: 'Semester project · 3rd semester · Autumn 2024', da: 'Semesterprojekt · 3. semester · Efterår 2024' },
    summary: {
      en: 'TODO: two to four lines about the mobile robot project (platform, sensors, navigation, what worked).',
      da: 'TODO: to til fire linjer om mobilrobot-projektet (platform, sensorer, navigation, hvad der virkede).',
    },
    tags: ['Mobile robots'],
    todo: true,
  },
  {
    id: 's2',
    title: { en: 'Autonomous robots', da: 'Autonome robotter' },
    context: { en: 'Semester project · 2nd semester · Spring 2024', da: 'Semesterprojekt · 2. semester · Forår 2024' },
    summary: {
      en: 'TODO: two to four lines about the autonomous robot project.',
      da: 'TODO: to til fire linjer om projektet i autonome robotter.',
    },
    tags: ['Autonomous robots'],
    todo: true,
  },
  {
    id: 's1',
    title: { en: 'Basic robot control', da: 'Grundlæggende styring af robotter' },
    context: { en: 'Semester project · 1st semester · Autumn 2023', da: 'Semesterprojekt · 1. semester · Efterår 2023' },
    summary: {
      en: 'TODO: two to four lines about the first-semester robot control project.',
      da: 'TODO: to til fire linjer om projektet i grundlæggende styring af robotter.',
    },
    tags: ['Robot control'],
    todo: true,
  },
];

export type SkillGroup = { name: L; items: (string | L)[] };

export const skills: SkillGroup[] = [
  {
    name: { en: 'Robotics & control', da: 'Robotteknologi & regulering' },
    items: ['Control theory (PID, state space, sliding mode)', 'Robot kinematics & inverse kinematics', 'Central pattern generators', 'Path planning (A*, bug algorithms)', 'MuJoCo simulation', 'Underactuated systems'],
  },
  {
    name: { en: 'Embedded & hardware', da: 'Embedded & hardware' },
    items: ['C on ARM Cortex-M (Tiva TM4C123)', 'FreeRTOS', 'VHDL / FPGA (PYNQ-Z2)', 'SPI, UART, PWM, encoders', 'Basic analog & digital electronics', 'Raspberry Pi Pico'],
  },
  {
    name: { en: 'Software & AI', da: 'Software & AI' },
    items: ['Python (NumPy, SciPy, Gymnasium, Stable-Baselines3)', 'C++ (CMake)', 'MATLAB', 'OpenCV', 'Reinforcement learning (PPO, Q-learning)', 'Signal processing & EMG', 'Git, GitHub, LaTeX'],
  },
  {
    name: { en: 'Ways of working', da: 'Arbejdsform' },
    items: [
      { en: 'Project work in small teams every semester', da: 'Projektarbejde i små grupper hvert semester' },
      { en: 'Report writing and oral defence', da: 'Rapportskrivning og mundtligt forsvar' },
      { en: 'Curious, thorough, hands-on', da: 'Nysgerrig, grundig, praktisk anlagt' },
    ],
  },
];

export const languages: { name: L; level: L }[] = [
  { name: { en: 'Danish', da: 'Dansk' }, level: { en: 'Native', da: 'Modersmål' } },
  { name: { en: 'English', da: 'Engelsk' }, level: { en: 'Professional (studies taught in English)', da: 'Professionelt (undervisning på engelsk)' } },
];

export const ui = {
  nav: {
    profile: { en: 'Profile', da: 'Profil' },
    experience: { en: 'Experience', da: 'Erfaring' },
    education: { en: 'Education', da: 'Uddannelse' },
    projects: { en: 'Projects', da: 'Projekter' },
    skills: { en: 'Skills', da: 'Kompetencer' },
  },
  downloadCv: { en: 'Download CV (Word)', da: 'Hent CV (Word)' },
  present: { en: 'present', da: 'nu' },
  showAllExperience: { en: 'Show all experience', da: 'Vis al erfaring' },
  showLess: { en: 'Show less', da: 'Vis mindre' },
  viewCoursework: { en: 'View coursework', da: 'Se kurser' },
  ects: { en: 'ECTS', da: 'ECTS' },
  elective: { en: 'Elective', da: 'Valgfag' },
  project: { en: 'Project', da: 'Projekt' },
  firstYearExam: { en: 'First-year exam', da: '1. årsprøve' },
  viewRepo: { en: 'View repository', da: 'Se repository' },
  textPending: { en: 'Description coming soon', da: 'Beskrivelse følger' },
  languages: { en: 'Languages', da: 'Sprog' },
  contact: { en: 'Contact', da: 'Kontakt' },
  footer: { en: 'Last updated', da: 'Sidst opdateret' },
  bachelorHighlight: { en: 'Bachelor project', da: 'Bachelorprojekt' },
  seeProject: { en: 'See project', da: 'Se projekt' },
};

export const lastUpdated = '2026-09-30';
