import { ResourceItem } from "./types";

export const DOMAINS = [
  {
    id: "cs",
    name: "Computer Science",
    icon: "Monitor",
    techs: ["Python", "Java", "C++", "C#", "Rust", "Go", "Node.js", "Docker"],
    desc: "Algorithms, distributed computing, database optimization, and high-performance operating nodes."
  },
  {
    id: "ai",
    name: "Artificial Intelligence",
    icon: "BrainCircuit",
    techs: ["Python", "TensorFlow", "PyTorch", "HuggingFace", "Google GenAI API", "OpenCV"],
    desc: "Neural networks, natural language pipelines, computer vision, and expert reasoning models."
  },
  {
    id: "ml",
    name: "Machine Learning",
    icon: "Cpu",
    techs: ["Scikit-Learn", "XGBoost", "Pandas", "NumPy", "Keras", "Flask"],
    desc: "Predictive analytics, custom clustering models, classification pipelines, and feature selection."
  },
  {
    id: "ds",
    name: "Data Science",
    icon: "Database",
    techs: ["R Programming", "Pandas", "Matplotlib", "Seaborn", "PowerBI", "SQL", "Tableau"],
    desc: "Massive dataset ingestion, statistical modeling, visual metrics, and prediction engines."
  },
  {
    id: "cyber",
    name: "Cyber Security",
    icon: "ShieldAlert",
    techs: ["Wireshark", "Metasploit", "Python Scrapy", "Linux Shell", "Cryptography API", "Snort"],
    desc: "Intrusion warning devices, encryption handshakes, penetration analysis, and secure socket gateways."
  },
  {
    id: "ece",
    name: "Electronics & Communication",
    icon: "Radio",
    techs: ["MATLAB", "LabVIEW", "Verilog", "VHDL", "Arduino C", "Multisim"],
    desc: "Signal processing systems, circuit telemetry, wireless antenna loops, and microcircuit chips."
  },
  {
    id: "ee",
    name: "Electrical Engineering",
    icon: "Zap",
    techs: ["PowerSYS", "Simulink", "Revit", "ETAP", "PLC Ladder Logic", "EPLAN"],
    desc: "Smart grid controls, power converter metrics, transformer loads, and custom motor telemetry."
  },
  {
    id: "mech",
    name: "Mechanical Engineering",
    icon: "Settings",
    techs: ["SolidWorks", "ANSYS", "AutoCAD", "Fusion 360", "Python SciPy", "G-Code"],
    desc: "Thermal stresses, mechanical gear loops, structural flow analysis, and automated material tests."
  },
  {
    id: "civil",
    name: "Civil Engineering",
    icon: "Building",
    techs: ["AutoCAD Civil 3D", "STAAD Pro", "REVIT Structure", "ArcGIS", "EPANET"],
    desc: "Earthquake stress analytics, concrete load tolerances, smart urban layouts, and water pipes flow."
  },
  {
    id: "mba",
    name: "MBA & Business",
    icon: "Briefcase",
    techs: ["Excel Pro", "SPSS", "Python (Finance)", "R Studio", "Tableau Creator"],
    desc: "Market penetration audits, automated consumer funnels, resource planning systems, and financial portfolios."
  },
  {
    id: "biotech",
    name: "Biotechnology",
    icon: "Dna",
    techs: ["BioPython", "BLAST Tool", "PyMOL", "R Bioconductor", "Phylip"],
    desc: "Gene sequencing modeling, molecular synthetic structures, biological datasets, and clinical predictors."
  },
  {
    id: "iot",
    name: "IoT (Internet of Things)",
    icon: "Network",
    techs: ["Raspberry Pi", "Arduino C", "ESP32 WiFiNode", "Node-RED", "MQTT Protocol", "C++"],
    desc: "Connected sensor nodes, low-energy telemetry, environmental metrics dashboards, and home automation."
  },
  {
    id: "cloud",
    name: "Cloud Computing",
    icon: "Cloud",
    techs: ["AWS Suite", "Docker Containers", "Kubernetes", "Terraform", "Google Cloud", "Nginx"],
    desc: "Serverless lambda routes, microservice patterns, container flow logs, and scalable balancing networks."
  },
  {
    id: "web",
    name: "Web Development",
    icon: "Globe",
    techs: ["React.js", "Vite Engine", "Next.js", "Express.js", "Tailwind CSS", "TypeScript", "PostgreSQL"],
    desc: "Modern responsive web products, glassmorphism templates, real-time sync, and fluid UX dashboards."
  },
  {
    id: "mobile",
    name: "Mobile App Development",
    icon: "Smartphone",
    techs: ["React Native", "Flutter", "Swift UI", "Kotlin Jetpack Compose", "Firebase Core"],
    desc: "Cross-platform mobile apps, gesture telemetry, push notification servers, and offline state cache."
  },
  {
    id: "health",
    name: "Healthcare Projects",
    icon: "Heart",
    techs: ["Python HL7", "TensorFlow Medical", "Matplotlib", "SQL Healthcare Scheme"],
    desc: "Symptom diagnosis controllers, clinical task managers, health trends analyzers, and ECG metrics."
  },
  {
    id: "agri",
    name: "Agriculture Technology",
    icon: "Leaf",
    techs: ["Arduino SoilSensor", "Python OpenCV", "MQTT Broker", "Raspberry Pi Camera"],
    desc: "Soil humidity predictors, automated crop health checks, irrigation timers, and smart weather indicators."
  },
  {
    id: "robotics",
    name: "Robotics",
    icon: "Bot",
    techs: ["ROS (Robot OS)", "Arduino C++", "Python Control", "C++ Kinematics", "SolidWorks Kinematic"],
    desc: "Robotic arm joint kinematics, spatial obstacle prevention, servo loop controller, and sensor telemetry."
  },
  {
    id: "blockchain",
    name: "Blockchain",
    icon: "Layers",
    techs: ["Solidity", "Hardhat", "EtherJS", "Web3.js", "MetaMask APIs", "Rust Wasm"],
    desc: "Decentralized tokens, smart voting modules, audit flow chains, and client security hooks."
  },
  {
    id: "marketing",
    name: "Digital Marketing",
    icon: "Megaphone",
    techs: ["Google Analytics APIs", "Python SEO Scraper", "Meta Graph API", "Canva automation", "NLP Sentiment"],
    desc: "Automated social reach indicators, semantic content sentiment analyzers, custom SEO ranking loops."
  }
];

export const TRENDING_PROJECTS_2026 = [
  {
    title: "AI-Powered Adaptive Energy Grid Optimization",
    domain: "Machine Learning & Electrical Engineering",
    tech: "Python, TensorFlow, Arduino nodes, MQTT",
    reach: "Featured on IEEE SmartGrid Summit 2026",
    difficulty: "Advanced"
  },
  {
    title: "Dynamic Student Performance Analytics & Predictive Early-Alert System",
    domain: "Data Science & MBA",
    tech: "React, Express, LightGBM, Pandas, Recharts",
    reach: "Piloted at 14 International Academies",
    difficulty: "Medium"
  },
  {
    title: "Decentralized Academic Credential Verification Vault",
    domain: "Blockchain & Cyber Security",
    tech: "Solidity Smart Contracts, React Web3, IPFS",
    reach: "Winner of Web3 HackEdu 2026",
    difficulty: "Advanced"
  },
  {
    title: "Computer Vision & IoT Embedded Soil Nutrient Telemetry Node",
    domain: "Agriculture Technology & IoT",
    tech: "ESP32 Wifi, OpenCV, FastAPI, Python",
    reach: "Open-Source Campus Agri-Tech Star",
    difficulty: "Medium"
  }
];

export const STATIC_RESOURCES: ResourceItem[] = [
  {
    title: "UCI Machine Learning Repository",
    category: "Datasets",
    url: "https://archive.ics.uci.edu/",
    description: "The ultimate platform offering 600+ real-world vetted datasets for Machine Learning, Data Science, and Biotech classifications.",
    techKeywords: ["ml", "ds", "biotech"]
  },
  {
    title: "Kaggle Open Datasets Engine",
    category: "Datasets",
    url: "https://www.kaggle.com/datasets",
    description: "Search millions of structured metadata sheets in healthcare, agri-tech, finance, neural weights, and consumer funnels.",
    techKeywords: ["ds", "ml", "ai", "mkt"]
  },
  {
    title: "IEEE Computer Society Student Resources",
    category: "Research",
    url: "https://www.computer.org/",
    description: "Examine IEEE guidelines for formatting engineering papers, standard citations, and software review processes.",
    techKeywords: ["cs", "cyber", "web", "ece"]
  },
  {
    title: "arXiv.org Cornell University Repository",
    category: "Research",
    url: "https://arxiv.org/",
    description: "Access millions of non-paywalled, cutting-edge scholarly distributions covering deep learning, robotics, and physical models.",
    techKeywords: ["ai", "ml", "robotics", "blockchain"]
  },
  {
    title: "Awesome React Starter Boilerplate",
    category: "GitHub",
    url: "https://github.com/facebook/react",
    description: "Core reference models for responsive layouts, client route setups, and styled components.",
    techKeywords: ["web", "mobile"]
  },
  {
    title: "TensorFlow & PyTorch Core Tutorials",
    category: "Tutorials",
    url: "https://www.tensorflow.org/tutorials",
    description: "Step-by-step documentation for configuring tensor nodes, loading weights, and executing classification metrics.",
    techKeywords: ["ml", "ai"]
  },
  {
    title: "FreeCodeCamp Fullstack Dev Path",
    category: "YouTube",
    url: "https://www.youtube.com/@freecodecamp",
    description: "Extensive video seminars detailing Express, PostgreSQL, React, and general cybersecurity workflows.",
    techKeywords: ["web", "cyber", "cloud", "mobile"]
  }
];

export const FAQS = [
  {
    q: "Is ProjectPilot AI truly 100% free for students?",
    a: "Absolutely! ProjectPilot was created strictly as an academic helper. There are no credit-card logs, no locked boundaries, and absolutely zero paid subscription plans. All services—from thesis drafts to slides generation—remain indefinitely free."
  },
  {
    q: "How does the AI slide and report generator work under the hood?",
    a: "Our system combines your specified parameters with curated structural guidelines (such as standard IEEE layouts). In the background, it creates safe API calls to Google's highly performant Gemini AI to formulate tailored scientific text and custom presentation schemas securely without exposing raw secrets to the browser."
  },
  {
    q: "How can I export my report sheets or presentation slides?",
    a: "Every tool in ProjectPilot includes direct action prompts. You can trigger clean formatting layouts perfect for direct printing, download the text and slide decks, or copy the direct codes into your local text editors (like LaTeX or PowerPoint) with a single click."
  },
  {
    q: "Can I save my active tracker milestones and project drafts?",
    a: "Yes! ProjectPilot implements local cache serialization (LocalStorage). Your milestones, checklist logs, recently generated ideas, bookmarked links, and customized project settings are auto-saved locally on your device instantly as you work."
  },
  {
    q: "Can I use the boilerplate script generator for commercial deployment?",
    a: "Certainly. All code generated by ProjectPilot is licensed under the Apache 2.0 open-source standard, allowing you to build, expand, play, or package it for university or market deployment with no licensing fees."
  }
];

export const TESTIMONIALS = [
  {
    name: "Akash Sharma",
    college: "RV College of Engineering",
    domain: "Computer Science",
    quote: "ProjectPilot generated our entire literature survey citations in 10 seconds. The interactive mock viva scoring prepared me so well for the final external examiner board questions!"
  },
  {
    name: "Sarah Jenkins",
    college: "Georgia Institute of Technology",
    domain: "Machine Learning & Biotech",
    quote: "The visual presentation slides layouts are stunning! Having a dark cyber theme that corresponds exactly to our neural network target values was a lifesaver. Plus, it's 100% free and easy."
  },
  {
    name: "Carlos Mendez",
    college: "Monterrey Institute of Tech",
    domain: "IoT & Electronics",
    quote: "I bookmarked four datasets for my smart solar grid telemetry module within minutes. The task board kept our entire student group aligned on the thesis development timelines!"
  }
];
