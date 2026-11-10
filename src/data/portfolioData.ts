export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'ml' | 'web' | 'iot' | 'data';
  description: string;
  longDescription: string;
  problem: string;
  solution: string;
  image: string;
  tags: string[];
  features: string[];
  architecture: string[];
  metrics: { label: string; value: string }[];
  githubUrl: string;
  demoUrl?: string;
  hasInteractiveDemo?: boolean;
}

export interface SkillItem {
  name: string;
  levelDescription?: string;
  highlight?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  title: string;
  organization: string;
  location: string;
  type: 'internship' | 'project';
  description: string;
  highlights: string[];
  skills: string[];
}

export interface EducationItem {
  id: string;
  period: string;
  degree: string;
  institution: string;
  score: string;
  scoreType: string;
  description: string;
  highlights: string[];
}

export interface HackathonMedia {
  id: string;
  url: string;
  caption: string;
  type: 'certificate' | 'photo' | 'simulation' | 'email';
}

export interface HackathonItem {
  id: string;
  name: string;
  badge: string;
  edition: string;
  organizer: string;
  institution: string;
  representedInstitution: string;
  dates: string;
  recognition: string;
  teamName: string;
  teammates: string[];
  mentor?: string;
  projectTitle: string;
  domain: string;
  description: string;
  keyHighlights: string[];
  accentTheme: 'purple' | 'tricolor';
  linkedinUrl: string;
  certificateImage: string;
  gallery: HackathonMedia[];
  verifiedStage: string;
  verifiedDetails: string;
  stats: { label: string; value: string }[];
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  metric?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  category: string;
}

export const PERSONAL_INFO = {
  name: 'DINESH H',
  title: 'Software Developer | ML Engineer',
  tagline: 'Building intelligent applications that connect AI, software, and real-world engineering.',
  shortBio:
    'Passionate about building intelligent, user-focused applications. My experience spans software development, machine learning, computer vision, embedded systems, and IoT.',
  aboutIntroduction:
    'I am an Electronics and Communication Engineering student at Saveetha Engineering College, passionate about building intelligent, user-focused applications. My experience spans software development, machine learning, computer vision, embedded systems, and IoT. I enjoy transforming technical ideas into practical solutions through experimentation, problem-solving, and continuous learning.',
  hardwareSoftwarePhilosophy:
    'I bridge hardware and software with equal passion—writing low-latency firmware for microcontrollers and sensors on one end, and architecting AI-powered computer vision models and modern web platforms on the other.',
  email: 'dineshhariraman2004@gmail.com',
  phone: '+91 90251 19360',
  github: 'https://github.com/dinesh19-04',
  linkedin: 'https://www.linkedin.com/in/dinesh-hariraman',
  location: 'Ranipet, Tamil Nadu, India',
  avatar: '/assets/aistudio/Futuristic_Neon_Tech_Portrait_bf6037d1.png',
  roles: [
    'Software Developer',
    'ML Engineer',
    'Computer Vision Developer',
    'Embedded & IoT Engineer',
    'Full-Stack Developer',
  ],
  stats: [
    { value: '6', label: 'Featured Projects' },
    { value: '2', label: 'National Hackathons' },
    { value: 'Top 10', label: 'Mini Project Finalist (160 Teams)' },
    { value: '6', label: 'Industry Certifications' },
  ],
};

export const PROJECTS: Project[] = [
  {
    id: 'sriram-farms',
    title: 'SRI RAM FARMS',
    subtitle: 'Farm Machinery Management & Planting Schedule System',
    category: 'web',
    description:
      'Engineered an agricultural machinery management and scheduling web application enabling farm owners and operators to register farmers, schedule planting machinery, calculate acreage pricing, and track payments.',
    longDescription:
      'SRI RAM FARMS is a specialized agriculture technology web platform designed to simplify farm machinery operations, planting calendar scheduling, farmer accounts, and payment tracking. Built with React 19, TypeScript, and Tailwind CSS, it enables farm owners and managers to coordinate equipment across villages, calculate automated acreage rental charges (₹40–₹45/cent), monitor payments, and export PDF agronomy reports with Dexie.js offline persistence and Firebase Cloud Firestore synchronization.',
    problem:
      'Agricultural machinery rental businesses and farming coordinators frequently rely on manual paper ledgers, causing machinery scheduling conflicts during critical planting seasons, unrecorded acreage jobs, delayed farmer communications, and missing payment ledgers.',
    solution:
      'Engineered a centralized digital farm platform with farmer/customer profiles, land village mapping, conflict-free machinery scheduling, automated cent-to-acre pricing formulas, Dexie.js offline persistence, and instant PDF invoice downloads.',
    image: '/assets/projects/sriram_farms_screenshot.png',
    tags: ['React.js', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Cloud Firestore', 'Dexie.js', 'Vite PWA', 'jsPDF'],
    features: [
      'Role-based Owner & Manager operational dashboard with separate authenticated profiles',
      'Farmer and customer registry storing contact numbers, village details, and service logs',
      'Planting schedule coordinator with conflict detection across machinery and date/time slots',
      'Cent-based agricultural machinery pricing calculator (₹45/cent small machine, ₹40/cent large machine; 1 acre = 100 cents)',
      'Payment management tracking amounts paid, pending balances, and transaction histories',
      'Downloadable PDF reports for customer invoices and seasonal agricultural activity summaries',
      'Dexie.js IndexedDB offline persistence paired with Cloud Firestore real-time synchronization',
    ],
    architecture: [
      'Client Tier: React 19 SPA with TypeScript and Vite PWA offline service workers',
      'Data Persistence: Dexie.js local IndexedDB with Cloud Firestore cloud synchronization',
      'Document Engine: jsPDF & jspdf-autotable client-side invoice and report generation',
    ],
    metrics: [
      { label: 'Machinery Pricing', value: '₹40–₹45 / Cent' },
      { label: 'Deployment', value: 'Live on Vercel' },
      { label: 'Data Sync', value: 'Firestore + Dexie' },
    ],
    demoUrl: 'https://sriram-farms.vercel.app',
    githubUrl: 'https://github.com/dinesh19-04/SRIRAM-FARMS',
    hasInteractiveDemo: true,
  },
  {
    id: 'farmsha',
    title: 'Farmsha – Farm Machinery Sharing & Rental Platform',
    subtitle: 'Smart Agricultural Machinery Sharing Platform (Uber for Farm Machinery)',
    category: 'web',
    description:
      'Architected a digital farm machinery sharing and rental marketplace connecting farmers with machinery owners and local agents for seamless equipment discovery, category-based booking (tractors, harvesters, planting machinery), and transparent rental management.',
    longDescription:
      'Farmsha is a comprehensive agricultural technology platform designed to eliminate machinery scarcity and high capital expenditure for smallholder farmers. Structured with role-tailored dashboards for Farmers, Machinery Owners, and Local Agents, the platform enables farmers to discover verified machinery within their village cluster via GPS, reserve equipment across categories (tractors, combine harvesters, seed drills, rotavators), monitor active rental dispatches in real-time, and make transparent bookings without exploitative middleman fees.',
    problem:
      'Smallholder and marginal farmers face prohibitive capital equipment purchase costs and struggle to secure rental tractors or harvesters during narrow harvest and planting windows, while equipment owners endure idle machinery downtime and lack organized local dispatch channels.',
    solution:
      'Engineered an Uber-style sharing economy web platform for farm machinery with role-tailored dashboards (Farmer, Machinery Owner, Agent), geographic discovery (State → District → Village + GPS proximity), verified equipment catalogs, transparent hourly/acreage pricing, and real-time dispatch tracking.',
    image: '/assets/projects/farmsha_preview.png',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'Machinery Rental', 'Vite', 'Lucide UI'],
    features: [
      'Farmer Module: Search, category filter, and book farm machinery with GPS proximity mapping',
      'Machinery Categories: Dedicated discovery for Tractors, Combine Harvesters, Rotavators, and Seed Drills',
      'Machinery Owner Module: List equipment with specs and photos, define hourly/daily rental rates, and track earnings',
      'Agent / Coordinator Module: Coordinate between rural farmers and owners, oversee local machinery clusters, resolve disputes',
      'Geospatial Hierarchy: Multi-level geographic filtering (State → District → Village) combined with GPS proximity',
      'Live Booking & Status Tracking: Real-time dispatch tracking and operational task completion verification',
      'Bilateral Ratings & Reviews: Farmer and machinery performance review system ensuring mutual accountability',
    ],
    architecture: [
      'Frontend Layer: React with TypeScript, Vite, Tailwind CSS, Lucide Icons, and responsive mobile-first UI',
      'Backend & Auth: Node.js, Express REST API with JWT authentication and rural OTP verification',
      'Domain Engine: Role-based access control (Farmer, Equipment Owner, Local Agent) with booking state machine',
    ],
    metrics: [
      { label: 'Machinery Categories', value: 'Tractor / Harvester / Seeder' },
      { label: 'User Roles', value: 'Farmer • Owner • Agent' },
      { label: 'Architecture', value: 'React + Node + Express' },
    ],
    githubUrl: 'https://github.com/dinesh19-04/FARMSHA',
    hasInteractiveDemo: true,
  },
  {
    id: 'alphareps-gym-partner',
    title: 'AlphaReps – Your Gym Partner',
    subtitle: 'AI-Powered Exercise Recognition & Repetition Counter',
    category: 'ml',
    description:
      'Built an AI-powered exercise recognition and repetition-counting system using deep learning and video analysis, with real-time tracking and analytics.',
    longDescription:
      'AlphaReps is an intelligent fitness tracking companion that processes live camera feeds to automatically identify exercise workouts, compute joint angular trajectories in real-time, and accurately count repetitions while providing immediate form-correction cues.',
    problem:
      'Athletes and gym beginners frequently perform compound exercises with improper posture, risking musculoskeletal injuries while lacking affordable real-time personal coaching.',
    solution:
      'Engineered an edge computer vision pipeline combining deep learning pose estimation with OpenCV kinematic analysis, calculating angular flexion/extension across frames to count valid reps and detect improper postures.',
    image: '/assets/projects/project_exercise_ml.png',
    tags: ['Python', 'Deep Learning', 'Computer Vision', 'OpenCV'],
    features: [
      'Real-time skeletal landmark tracking with 17 keypoint detection',
      'Joint angle trajectory computation evaluating exercise depth and full lockout',
      'Automated repetition counter with state-machine peak detection',
      'Live kinematic feedback highlighting improper curvature or joint deviations',
    ],
    architecture: [
      'Visual Pipeline: Real-time video frame ingest & preprocessing via OpenCV',
      'Inference Engine: Deep neural network for anatomical keypoint estimation',
      'Biomechanical State Machine: Angular peak-and-trough tracking for rep verification',
    ],
    metrics: [
      { label: 'Video Inference', value: '30+ FPS' },
      { label: 'Accuracy', value: 'High Precision' },
      { label: 'Exercises', value: 'Compound & Isolation' },
    ],
    githubUrl: 'https://github.com/dinesh19-04',
    hasInteractiveDemo: true,
  },
  {
    id: 'hariraman-builders',
    title: 'Hariraman Builders',
    subtitle: 'Full-Stack Construction Business & Project Management Platform',
    category: 'web',
    description:
      'Developed a responsive construction management and business website using React.js and modern frontend technologies to showcase building services, completed projects, and company information.',
    longDescription:
      'A production-deployed commercial web portal created for Hariraman Builders. The platform features high-resolution architectural project galleries, detailed civil engineering service breakdowns, customer consultation booking, and an intuitive responsive user experience.',
    problem:
      'Construction and contracting firms need a fast, credible digital presence to present residential portfolios, structural capabilities, and client inquiries seamlessly across all devices.',
    solution:
      'Architected a single-page application using React.js and Tailwind CSS with responsive project portfolios, optimized media loading, clear service offerings, and direct client consultation gateways.',
    image: '/assets/projects/project_hariraman_builders.png',
    tags: ['React.js', 'JavaScript', 'Tailwind CSS', 'Web Development', 'Responsive Design'],
    features: [
      'Interactive residential and commercial architectural project showcases',
      'Detailed civil services catalog covering construction, planning, and renovation',
      'Fully responsive fluid layouts tailored for smartphones, tablets, and desktop displays',
      'Direct client contact integration for quotation requests and consultations',
    ],
    architecture: [
      'Client Layer: React.js component architecture with modular UI sections',
      'Styling System: Utility-first Tailwind CSS with custom responsive breakpoints',
      'Deployment: Vercel CDN hosting with sub-second asset delivery',
    ],
    metrics: [
      { label: 'Deployment', value: 'Live on Vercel' },
      { label: 'Performance', value: 'Instant Load' },
      { label: 'Design', value: 'Fully Responsive' },
    ],
    demoUrl: 'https://hariramanbuilders.vercel.app/',
    githubUrl: 'https://github.com/dinesh19-04/HARIRAMAN-BUILDERS',
    hasInteractiveDemo: true,
  },
  {
    id: 'accident-alert-system',
    title: 'Vehicle Accident Alert System',
    subtitle: 'Embedded IoT Sensor Fusion & Automated GPS/GSM SOS Dispatch',
    category: 'iot',
    description:
      'Developed an IoT-based vehicle accident alert system using Arduino Nano, ADXL345 accelerometer, GPS, and GSM modules to detect accidents and automatically send emergency SMS alerts with vehicle location.',
    longDescription:
      'A life-saving embedded IoT safety hardware system. An Arduino Nano continuously monitors 3-axis motion vectors via an ADXL345 digital accelerometer. When impact G-forces or vehicle rollover angles cross safety thresholds, the system retrieves precise satellite coordinates from an onboard GPS module and triggers automated emergency SMS transmissions via GSM.',
    problem:
      'Highway accident fatalities are frequently caused by delayed medical response when victims are incapacitated and unable to communicate their geographic location.',
    solution:
      'Constructed an autonomous hardware unit that detects severe deceleration and vehicle rollover within milliseconds, generating and transmitting an emergency SMS with exact Google Maps coordinates to pre-configured emergency numbers.',
    image: '/assets/projects/project_accident_alert.png',
    tags: ['Arduino Nano', 'Embedded C', 'ADXL345', 'GPS', 'GSM', 'Sensors'],
    features: [
      'Real-time 3-axis acceleration and tilt monitoring via I2C ADXL345 sensor',
      'Calibrated impact threshold algorithm preventing false alarms from road bumps',
      'GPS satellite coordinate acquisition formatted with clickable navigation links',
      'Autonomous GSM SIM module AT-command sequence for reliable emergency SMS delivery',
    ],
    architecture: [
      'Microcontroller: Arduino Nano executing continuous sensor polling loops',
      'Motion Acquisition: ADXL345 3-axis accelerometer via I2C interface',
      'Telemetry Modem: GSM SIM800 series + GPS NEO-6M via UART serial',
    ],
    metrics: [
      { label: 'Impact Detection', value: '<25 ms' },
      { label: 'SMS Dispatch', value: '<5 s' },
      { label: 'Location Precision', value: 'GPS Coordinate' },
    ],
    githubUrl: 'https://github.com/dinesh19-04',
    hasInteractiveDemo: true,
  },
  {
    id: 'sales-analytics-dashboard',
    title: 'Sales Analytics Dashboard',
    subtitle: 'Interactive Multi-Metric Business Intelligence & Excel Analytics',
    category: 'data',
    description:
      'Developed a sales analytics dashboard in Microsoft Excel using Pivot Tables, Pivot Charts, and Excel formulas to analyze sales, profit, and customer performance.',
    longDescription:
      'A comprehensive business intelligence dashboard created to transform complex sales transaction logs into actionable strategic insights. Leveraging advanced Pivot Tables, dynamic slicers, and multi-dimensional Pivot Charts, it enables stakeholders to evaluate sales trends, profit margins, and regional customer segmentations instantly.',
    problem:
      'Raw commercial sales logs are voluminous and opaque, preventing business leaders from quickly pinpointing margin leakages, top customer segments, and seasonal trends.',
    solution:
      'Engineered an interactive analytics dashboard utilizing calculated fields, dynamic timeline filters, cross-regional pivot charts, and KPI summary indicators for clear business decision-making.',
    image: '/assets/projects/project_sales_analytics.png',
    tags: ['Microsoft Excel', 'Pivot Tables', 'Pivot Charts', 'Data Analysis', 'Formulas'],
    features: [
      'Dynamic Pivot Tables aggregating total revenue, gross profit, and unit volumes',
      'Interactive slicers filtering performance across product lines, regions, and dates',
      'Visual trend charts illustrating month-over-month growth and margin variance',
      'Customer performance breakdown highlighting key enterprise accounts',
    ],
    architecture: [
      'Data Model: Structured transactional dataset with normalized fields',
      'Calculation Engine: Excel analytical formulas, calculated measures, and lookups',
      'Visualization: Linked Pivot Charts, KPI cards, and dynamic slicer controls',
    ],
    metrics: [
      { label: 'Data Processing', value: 'Multi-Dimensional' },
      { label: 'Key KPIs', value: 'Sales, Profit, Margin' },
      { label: 'Filter Speed', value: 'Instant Interactive' },
    ],
    githubUrl: 'https://github.com/dinesh19-04',
    hasInteractiveDemo: true,
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'programming',
    title: 'Programming',
    description: 'Core languages for software engineering, algorithms, and systems',
    skills: [
      { name: 'Python', levelDescription: 'AI/ML algorithms, data science, automation, backend APIs' },
      { name: 'C', levelDescription: 'System programming, data structures, low-level algorithms' },
      { name: 'Embedded C', levelDescription: 'Microcontroller firmware, register-level I/O, device drivers' },
      { name: 'Java', levelDescription: 'Object-oriented programming, data structures, robust design' },
      { name: 'SQL', levelDescription: 'Relational database querying, joins, schema design' },
    ],
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Modern full-stack technologies, responsive frameworks, and APIs',
    skills: [
      { name: 'React.js', levelDescription: 'Modern component-driven UI, state hooks, responsive SPAs' },
      { name: 'Node.js', levelDescription: 'Event-driven server runtime, backend services' },
      { name: 'FastAPI', levelDescription: 'High-performance Python asynchronous API endpoints' },
      { name: 'Express.js', levelDescription: 'RESTful API routing, middleware architecture' },
      { name: 'HTML & CSS', levelDescription: 'Semantic structure, responsive modern styling, accessibility' },
    ],
  },
  {
    id: 'ml-cv',
    title: 'Machine Learning & Computer Vision',
    description: 'Deep neural networks, visual perception, and predictive modeling',
    skills: [
      { name: 'PyTorch', levelDescription: 'Deep learning model development, tensor computation' },
      { name: 'TensorFlow', levelDescription: 'Neural network training, model architecture implementation' },
      { name: 'OpenCV', levelDescription: 'Image filtering, video stream analysis, landmark tracking' },
    ],
  },
  {
    id: 'data-analytics',
    title: 'Data Analysis',
    description: 'Data transformation, statistical exploration, and business dashboards',
    skills: [
      { name: 'Pandas', levelDescription: 'DataFrames, data manipulation, cleaning, aggregation' },
      { name: 'NumPy', levelDescription: 'Multidimensional numerical array operations, linear algebra' },
      { name: 'Microsoft Excel', levelDescription: 'Pivot Tables, Pivot Charts, complex formulas, data modeling' },
      { name: 'Power BI', levelDescription: 'Interactive business dashboards, visual reporting' },
    ],
  },
  {
    id: 'embedded-iot',
    title: 'Embedded Systems & IoT',
    description: 'Microcontrollers, sensor networks, and physical computing',
    skills: [
      { name: 'Arduino (Nano / Uno)', levelDescription: 'Rapid embedded prototyping, sensor interfacing, firmware' },
      { name: 'ESP32', levelDescription: 'Dual-core MCU, Wi-Fi & Bluetooth IoT applications' },
      { name: 'Raspberry Pi', levelDescription: 'Single-board Linux computing, edge processing' },
      { name: 'Microcontrollers', levelDescription: 'Architecture, timers, interrupts, digital/analog I/O' },
      { name: 'Sensors & Actuators', levelDescription: 'Accelerometers (ADXL345), temperature, ultrasonic, relays' },
      { name: 'IoT Architecture', levelDescription: 'End-to-end connected sensor-to-cloud workflows' },
    ],
  },
  {
    id: 'protocols',
    title: 'Communication Protocols',
    description: 'Hardware communication standards, wireless telemetry, and bus interfaces',
    skills: [
      { name: 'UART', levelDescription: 'Universal asynchronous serial communication' },
      { name: 'SPI', levelDescription: 'High-speed synchronous peripheral interface' },
      { name: 'I2C', levelDescription: 'Two-wire multi-device sensor bus communication' },
      { name: 'GSM', levelDescription: 'Cellular network AT-commands, SMS transmission' },
      { name: 'GPS', levelDescription: 'Satellite NMEA sentence parsing, coordinate extraction' },
      { name: 'LoRa', levelDescription: 'Long-range low-power RF wireless communication' },
    ],
  },
  {
    id: 'tools-platforms',
    title: 'Tools & Platforms',
    description: 'Developer environments, hardware design tools, and version control',
    skills: [
      { name: 'Git & GitHub', levelDescription: 'Branch management, version control, project collaboration' },
      { name: 'VS Code', levelDescription: 'Primary coding environment, debugging, extensions' },
      { name: 'MATLAB', levelDescription: 'Mathematical modeling, algorithmic simulation' },
      { name: 'Keil', levelDescription: 'Embedded firmware compilation and simulation' },
      { name: 'LTspice', levelDescription: 'Electronic circuit schematic design and simulation' },
      { name: 'Vivado', levelDescription: 'FPGA design and hardware description development' },
    ],
  },
  {
    id: 'databases-cloud',
    title: 'Databases & Cloud',
    description: 'Structured data persistence, relational design, and cloud services',
    skills: [
      { name: 'MySQL', levelDescription: 'Relational database schema, indexing, querying' },
      { name: 'SQLite', levelDescription: 'Lightweight embedded and local database storage' },
      { name: 'Firebase', levelDescription: 'Real-time database, authentication, cloud storage' },
    ],
  },
];

export const INTERNSHIP_EXPERIENCE: ExperienceItem[] = [
  {
    id: 'svios-technology-intern',
    period: '2025',
    title: 'Embedded & IoT Intern',
    organization: 'Svios Technology',
    location: 'Tamil Nadu, India',
    type: 'internship',
    description:
      'Worked on embedded systems and IoT development using microcontrollers and sensors, supporting reliable hardware and software functionality.',
    highlights: [
      'Worked on embedded systems and IoT development using microcontrollers and sensors.',
      'Assisted in hardware/software design, testing, debugging, and integration.',
      'Collaborated with engineering teams to support reliable system functionality.',
      'Developed practical problem-solving, communication, teamwork, and leadership skills.',
    ],
    skills: ['Embedded C', 'Microcontrollers', 'Sensors', 'IoT', 'Hardware Testing', 'Debugging'],
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'saveetha-engineering-college',
    period: '2023 – 2027',
    degree: 'B.E. Electronics and Communication Engineering',
    institution: 'Saveetha Engineering College',
    score: '7.5 / 10',
    scoreType: 'CGPA',
    description:
      'Specializing in embedded systems, microcontrollers, communication protocols, machine learning, and computer vision with active hands-on engineering.',
    highlights: [
      'Rigorous academic training in electronics, hardware circuits, and signal processing',
      'Selected as Top 10 Finalist among 160 competing engineering teams in Mini Project Competition',
      'Actively bridging hardware design with software engineering and intelligent AI systems',
    ],
  },
  {
    id: 'sri-divya-chaitanya',
    period: '2023',
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Sri Divya Chaitanya Matric Hr. Sec. School',
    score: '88.3%',
    scoreType: 'Percentage',
    description:
      'Higher secondary education with focused coursework in Mathematics, Physics, Chemistry, and Computer Science.',
    highlights: [
      'Graduated with 88.3% distinction',
      'Strong foundational grounding in mathematics, analytical problem solving, and science',
    ],
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-top10-saveetha',
    title: 'Top 10 Finalist – Mini Project Competition',
    issuer: 'Saveetha Engineering College',
    date: '2024',
    description:
      'Recognized as one of the Top 10 Finalists among 160 engineering teams for innovative project execution and practical hardware/software integration.',
    metric: 'Top 10 of 160 Teams',
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-1',
    title: 'AWS Introduction to Machine Learning',
    issuer: 'Coursera',
    category: 'Cloud & AI',
  },
  {
    id: 'cert-2',
    title: 'AI and Machine Learning Specialization',
    issuer: 'Coursera',
    category: 'Machine Learning',
  },
  {
    id: 'cert-3',
    title: 'Introduction to Internet of Things',
    issuer: 'NPTEL',
    category: 'Embedded & IoT',
  },
  {
    id: 'cert-4',
    title: 'Sensors and Actuators',
    issuer: 'NPTEL',
    category: 'Hardware & Sensors',
  },
  {
    id: 'cert-5',
    title: 'Business Analytics with Excel',
    issuer: 'Simplilearn',
    category: 'Data Analytics',
  },
  {
    id: 'cert-6',
    title: 'SQL Query Optimization for Beginners',
    issuer: 'Simplilearn',
    category: 'Databases',
  },
];

export const HACKATHONS: HackathonItem[] = [
  {
    id: 'cicada-2025',
    name: "CICADA'25",
    badge: 'NATIONAL LEVEL HACKATHON',
    edition: '24-Hour National Hackathon',
    organizer:
      'KPRIET ACM Student Chapter & SPARKS Student Association, Department of Artificial Intelligence & Data Science',
    institution: 'KPR Institute of Engineering and Technology (KPRIET), Coimbatore',
    representedInstitution: 'Saveetha Engineering College',
    dates: 'October 31 – November 1, 2025',
    recognition: 'Certificate of Participation',
    teamName: '#MACROHARD',
    teammates: ['DINESH H', 'Prince Andrew A', 'Shivakumar H', 'LOHITH ABISHEKH. S'],
    projectTitle: 'Industrial COBOT: Seamless Human–Robot Collaboration',
    domain: 'Robotics, Embedded Systems, Computer Vision & Kinematics',
    description:
      'Engineered an intelligent Industrial COBOT (Collaborative Robot) hardware and software prototype designed for safe, seamless human–robot teamwork on industrial shop floors. Implemented real-time computer vision hand-landmark tracking and MATLAB kinematic simulations to govern multi-axis robotic servo actuations with low-latency motion synchronization.',
    keyHighlights: [
      '24-Hour continuous rapid prototyping, firmware debugging, and hardware assembly under tight clock pressure',
      'Real-time computer vision hand-landmark kinematic gesture control with OpenCV and camera telemetry',
      'MATLAB 3D kinematic modeling & spatial trajectory simulation for multi-joint robotic arm mechanics',
      'Multi-servo hardware actuation interfacing microcontrollers, breadboard circuitry, and feedback sensors',
    ],
    accentTheme: 'purple',
    linkedinUrl: 'https://lnkd.in/p/gs9VghJK',
    certificateImage: '/assets/hackathons/cicada25_certificate.svg',
    gallery: [
      {
        id: 'c-cert',
        url: '/assets/hackathons/cicada25_certificate.svg',
        caption: "Official Certificate of Participation – CICADA'25 (KPRIET ACM & SPARKS)",
        type: 'certificate',
      },
      {
        id: 'c-demo',
        url: '/assets/hackathons/cicada_img4.jpg',
        caption: 'Live COBOT Demo: Real-Time Hand Landmark Tracking & Robotic Servo Actuation',
        type: 'photo',
      },
      {
        id: 'c-mentor',
        url: '/assets/hackathons/cicada_img1.jpg',
        caption: 'Team #MACROHARD collaborating with mentor and technical evaluators at the workstation',
        type: 'photo',
      },
      {
        id: 'c-sprint',
        url: '/assets/hackathons/cicada_img2.jpg',
        caption: 'Late-night 24-Hour rapid prototyping sprint at team workstation CAD-48',
        type: 'photo',
      },
      {
        id: 'c-sim',
        url: '/assets/hackathons/cicada_img3.jpg',
        caption: 'MATLAB 3D Kinematic Spatial Simulation & Robotic Arm Joint Trajectory',
        type: 'simulation',
      },
    ],
    verifiedStage: '24-Hour National Hackathon Participant',
    verifiedDetails:
      'Grounded strictly in verified event record: built and demonstrated working Industrial COBOT prototype under 24-hour time constraint at KPRIET.',
    stats: [
      { label: 'Event Duration', value: '24 Hours' },
      { label: 'Team', value: '#MACROHARD (4 Members)' },
      { label: 'Representation', value: 'Saveetha Engineering College' },
    ],
  },
  {
    id: 'sih-2025',
    name: 'Smart India Hackathon 2025 (SIH 2025)',
    badge: 'GOVERNMENT OF INDIA INITIATIVE',
    edition: 'SIH 2025 Internal Hackathon (Two-Stage Selection)',
    organizer:
      "Ministry of Education's Innovation Cell (MIC) & AICTE, Government of India",
    institution: "MoE's Innovation Cell & AICTE",
    representedInstitution: 'Saveetha Engineering College',
    dates: 'September – October 2025',
    recognition: 'Qualified for Top 50 Out of 112 Teams (Internal Hackathon Selection)',
    teamName: 'Team Tide Techies',
    teammates: [
      'DINESH H',
      'Prawin M',
      'Surya Rajendran',
      'Bavankalyan P V',
      'PRIYADHARSHIKA L',
      'ANUVARSHINI S',
    ],
    mentor:
      'Mr. Dinesh Babu G L (Mentor) • Institutional Guidance: Principal Dr. Vijaya Chamundeeswari, Vice-Principal Dr. R. Senthil Kumar, Director Mr. Sengodan Rajesh, Hackathon Coordinator Dr. Karthika RN, Aj Heiner',
    projectTitle: 'OceanPulse: AI-Powered Crowdsourced Ocean Hazard Reporting & Social Media Insights',
    domain: 'AI, Coastal Disaster Safety & Crowdsourced Anomaly Telemetry',
    description:
      'Presented OceanPulse: an AI-powered crowdsourced ocean hazard reporting platform combining real-world hazard intelligence with NLP social media insights to address critical challenges in coastal safety, emergency response coordination, and marine disaster management.',
    keyHighlights: [
      'Qualified for Top 50 Out of 112 teams across an intense two-stage journey (pre-internal round to main internal hackathon)',
      'Engineered OceanPulse for coastal safety and disaster management using AI and crowdsourced hazard reporting',
      'Collaborated as Team Tide Techies alongside 6 engineering peers under guidance of mentor Mr. Dinesh Babu G L',
      'Only verified facts from the official selection email and milestone post—no unverified finalist or award claims',
    ],
    accentTheme: 'tricolor',
    linkedinUrl: 'https://lnkd.in/p/g2zcpEcN',
    certificateImage: '/assets/hackathons/sih_img4.jpg',
    gallery: [
      {
        id: 's-email',
        url: '/assets/hackathons/sih_img4.jpg',
        caption: 'Official Shortlist Confirmation from Hackathon Coordinator Dr. Karthika RN (Top 50 Teams)',
        type: 'email',
      },
      {
        id: 's-banner',
        url: '/assets/hackathons/sih_img3.jpg',
        caption: 'Team Tide Techies with official MoE Innovation Cell & AICTE SIH 2025 Banner at Saveetha Engineering College',
        type: 'photo',
      },
      {
        id: 's-ideation',
        url: '/assets/hackathons/sih_img1.jpg',
        caption: 'Team Tide Techies strategic ideation & system architecture session',
        type: 'photo',
      },
      {
        id: 's-deck',
        url: '/assets/hackathons/sih_img2.jpg',
        caption: 'OceanPulse technical presentation & solution deck review',
        type: 'photo',
      },
    ],
    verifiedStage: 'Internal Hackathon Top 50 of 112 Teams',
    verifiedDetails:
      'Grounded strictly in verified LinkedIn milestone and official institutional selection email: qualified for Top 50 out of 112 teams in the internal hackathon advancing towards national representation.',
    stats: [
      { label: 'Selection Milestone', value: 'Top 50 of 112 Teams' },
      { label: 'Team', value: 'Tide Techies (6 Members)' },
      { label: 'Institution', value: 'Saveetha Engineering College' },
    ],
  },
];

