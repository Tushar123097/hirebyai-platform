export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  skills: string[];
  experience: {
    min: number;
    max: number;
    unit: "years" | "months";
  };
  education: {
    degree: string;
    field: string;
    required: boolean;
  };
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  postedDate: string;
  applicationDeadline: string;
  workMode: "onsite" | "remote" | "hybrid";
  companyInfo: {
    size: string;
    industry: string;
    website: string;
    about: string;
  };
}

export const DUMMY_JOBS: Job[] = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "Microsoft India",
    location: "Bangalore, India",
    type: "Full-time",
    salary: "₹25L - ₹35L per annum",
    description:
      "We are looking for an experienced React developer to join our team. You will be responsible for building user interfaces and implementing new features.",
    skills: [
      "React",
      "TypeScript",
      "Redux",
      "Next.js",
      "GraphQL",
      "Jest",
      "CI/CD",
    ],
    experience: {
      min: 4,
      max: 8,
      unit: "years",
    },
    education: {
      degree: "Bachelor's",
      field: "Computer Science or related field",
      required: true,
    },
    responsibilities: [
      "Design and implement user interface components using React.js",
      "Build reusable components and libraries for future use",
      "Optimize applications for maximum speed and scalability",
      "Collaborate with backend developers to integrate APIs",
      "Write clean, maintainable, and well-documented code",
      "Participate in code reviews and technical discussions",
    ],
    requirements: [
      "Strong proficiency in JavaScript/TypeScript",
      "Experience with React.js and its core principles",
      "Familiarity with state management libraries (Redux, MobX)",
      "Experience with testing frameworks (Jest, React Testing Library)",
      "Understanding of RESTful APIs and GraphQL",
      "Knowledge of modern authorization mechanisms",
    ],
    benefits: [
      "Competitive salary and benefits package",
      "Flexible work hours and remote work options",
      "Health insurance coverage",
      "Professional development budget",
      "Regular team events and activities",
      "Modern office space with latest equipment",
    ],
    postedDate: "2024-03-15",
    applicationDeadline: "2024-04-15",
    workMode: "hybrid",
    companyInfo: {
      size: "10,000+ employees",
      industry: "Technology",
      website: "https://microsoft.com/en-in",
      about:
        "Microsoft India is a leading technology company empowering every person and organization on the planet to achieve more through innovative software solutions.",
    },
  },
  {
    id: 2,
    title: "Node.js Backend Developer",
    company: "Google India",
    location: "Hyderabad, India",
    type: "Full-time",
    salary: "₹20L - ₹30L per annum",
    description:
      "Join our backend team to build scalable and efficient server-side applications using Node.js and related technologies.",
    skills: [
      "Node.js",
      "Express",
      "MongoDB",
      "AWS",
      "Docker",
      "Redis",
      "Microservices",
    ],
    experience: {
      min: 3,
      max: 6,
      unit: "years",
    },
    education: {
      degree: "Bachelor's",
      field: "Computer Science or related field",
      required: true,
    },
    responsibilities: [
      "Design and implement scalable backend services",
      "Develop RESTful APIs and microservices",
      "Optimize database queries and performance",
      "Implement security best practices",
      "Write unit tests and integration tests",
      "Participate in system architecture discussions",
    ],
    requirements: [
      "Strong experience with Node.js and Express",
      "Proficiency in MongoDB and database design",
      "Experience with cloud platforms (AWS/GCP)",
      "Knowledge of microservices architecture",
      "Understanding of CI/CD pipelines",
      "Experience with Docker and containerization",
    ],
    benefits: [
      "Competitive compensation package",
      "Work from home flexibility",
      "Comprehensive health coverage",
      "Learning and development opportunities",
      "Performance bonuses",
      "Employee stock options",
    ],
    postedDate: "2024-03-14",
    applicationDeadline: "2024-04-14",
    workMode: "remote",
    companyInfo: {
      size: "10,000+ employees",
      industry: "Technology",
      website: "https://careers.google.com/locations/india/",
      about:
        "Google India is focused on building products that help billions of users connect, explore, and interact with information and one another.",
    },
  },
  {
    id: 3,
    title: "GenAI Developer",
    company: "OpenAI",
    location: "Mumbai, India",
    type: "Full-time",
    salary: "₹30L - ₹45L per annum",
    description:
      "Work on cutting-edge AI projects, implementing and optimizing large language models and AI solutions.",
    skills: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "LLMs",
      "NLP",
      "Machine Learning",
      "Deep Learning",
    ],
    experience: {
      min: 2,
      max: 5,
      unit: "years",
    },
    education: {
      degree: "Master's",
      field: "Computer Science, AI, or related field",
      required: true,
    },
    responsibilities: [
      "Develop and implement AI/ML models",
      "Work with large language models and NLP",
      "Optimize model performance and efficiency",
      "Collaborate with research teams",
      "Document technical solutions",
      "Stay updated with AI advancements",
    ],
    requirements: [
      "Strong background in machine learning",
      "Experience with deep learning frameworks",
      "Knowledge of NLP and LLMs",
      "Proficiency in Python",
      "Understanding of model deployment",
      "Research experience is a plus",
    ],
    benefits: [
      "Attractive salary package",
      "Research and development opportunities",
      "Conference attendance support",
      "Health and wellness benefits",
      "Flexible work arrangements",
      "Access to latest AI resources",
    ],
    postedDate: "2024-03-13",
    applicationDeadline: "2024-04-13",
    workMode: "hybrid",
    companyInfo: {
      size: "500+ employees",
      industry: "Artificial Intelligence",
      website: "https://openai.com",
      about:
        "OpenAI is an AI research and deployment company dedicated to ensuring that artificial general intelligence benefits all of humanity.",
    },
  },
  {
    id: 4,
    title: "Full Stack Developer",
    company: "Amazon India",
    location: "Delhi, India",
    type: "Full-time",
    salary: "₹28L - ₹40L per annum",
    description:
      "Looking for a full stack developer to work on end-to-end development of web applications.",
    skills: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "AWS",
      "GraphQL",
      "TypeScript",
    ],
    experience: {
      min: 3,
      max: 7,
      unit: "years",
    },
    education: {
      degree: "Bachelor's",
      field: "Computer Science or related field",
      required: true,
    },
    responsibilities: [
      "Develop full-stack web applications",
      "Design and implement database schemas",
      "Create RESTful APIs and GraphQL endpoints",
      "Implement frontend features and UI components",
      "Write automated tests",
      "Deploy and maintain applications",
    ],
    requirements: [
      "Proficiency in React and Node.js",
      "Experience with PostgreSQL or similar databases",
      "Knowledge of Docker and containerization",
      "Understanding of AWS services",
      "Experience with GraphQL",
      "Strong problem-solving skills",
    ],
    benefits: [
      "Competitive salary package",
      "Flexible work environment",
      "Health insurance coverage",
      "Professional development support",
      "Team building activities",
      "Modern tech stack",
    ],
    postedDate: "2024-03-12",
    applicationDeadline: "2024-04-12",
    workMode: "onsite",
    companyInfo: {
      size: "10,000+ employees",
      industry: "E-commerce & Cloud Computing",
      website: "https://amazon.jobs/en/locations/india",
      about:
        "Amazon India is committed to being Earth's Most Customer-Centric Company, offering innovative technology solutions and services.",
    },
  },
];

export const DUMMY_RESUME = {
  personalInfo: {
    name: "Harshit",
    title: "Frontend Developer",
    email: "harshit@example.com",
    phone: "+91 9876543210",
    location: "Bangalore, India",
    linkedin: "linkedin.com/in/harshit",
    github: "github.com/harshit",
  },
  summary:
    "Frontend developer with 3 years of experience in building responsive and performant web applications using React, TypeScript, and modern web technologies. Passionate about creating intuitive user interfaces and delivering exceptional user experiences.",
  experience: [
    {
      company: "TechCorp India",
      position: "Frontend Developer",
      duration: "Jan 2022 - Present",
      responsibilities: [
        "Developed and maintained multiple React-based web applications",
        "Implemented responsive designs and ensured cross-browser compatibility",
        "Optimized application performance and reduced load times by 40%",
        "Collaborated with UX designers to implement pixel-perfect interfaces",
        "Mentored junior developers and conducted code reviews",
      ],
    },
    {
      company: "Digital Solutions",
      position: "Junior Frontend Developer",
      duration: "Jun 2021 - Dec 2021",
      responsibilities: [
        "Built reusable UI components using React and TypeScript",
        "Worked on implementing new features and fixing bugs",
        "Participated in daily stand-ups and sprint planning",
        "Wrote unit tests using Jest and React Testing Library",
      ],
    },
  ],
  skills: {
    technical: [
      "React",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3/SASS",
      "Redux",
      "Next.js",
      "Jest",
      "Git",
      "Webpack",
    ],
    soft: [
      "Problem Solving",
      "Team Collaboration",
      "Communication",
      "Time Management",
      "Attention to Detail",
    ],
  },
  education: {
    degree: "Bachelor of Technology",
    field: "Computer Science",
    university: "Indian Institute of Technology",
    graduationYear: "2021",
    achievements: [
      "Graduated with First Class Distinction",
      "Participated in multiple hackathons",
      "Led the college web development club",
    ],
  },
  projects: [
    {
      name: "E-commerce Platform",
      description:
        "Built a full-featured e-commerce platform using React, Redux, and Node.js",
      technologies: ["React", "Redux", "Node.js", "MongoDB", "Express"],
      highlights: [
        "Implemented real-time cart updates",
        "Integrated payment gateway",
        "Built responsive product catalog",
      ],
    },
    {
      name: "Task Management App",
      description: "Developed a collaborative task management application",
      technologies: ["React", "TypeScript", "Firebase", "Material-UI"],
      highlights: [
        "Real-time updates using Firebase",
        "Drag-and-drop task organization",
        "Team collaboration features",
      ],
    },
  ],
  certifications: [
    {
      name: "Advanced React and Redux",
      issuer: "Udemy",
      date: "2022",
    },
    {
      name: "TypeScript Masterclass",
      issuer: "Frontend Masters",
      date: "2023",
    },
  ],
  languages: [
    {
      name: "English",
      proficiency: "Professional",
    },
    {
      name: "Hindi",
      proficiency: "Native",
    },
  ],
};

export const DUMMY_FEEDBACK = {
  rating: 4,
  feedback: `Overall, the candidate demonstrated strong technical knowledge and problem-solving abilities. Their understanding of React and TypeScript was particularly impressive, with clear explanations of complex concepts like hooks, state management, and type safety.

The candidate showed good communication skills, explaining their thought process clearly during the coding challenges. They were able to break down problems into manageable steps and provided well-structured solutions.

Areas of strength:
- Solid understanding of React fundamentals and best practices
- Good grasp of TypeScript and type systems
- Strong problem-solving approach
- Clear communication and explanation of solutions

Areas for improvement:
- Could provide more real-world examples from past projects
- System design knowledge could be enhanced
- Could elaborate more on testing strategies
- More focus on performance optimization techniques

The candidate would be a good fit for the role, particularly for frontend development tasks. With some mentoring in system design and performance optimization, they could quickly grow into a senior role.`,
  keyTakeaways: [
    "Strong technical knowledge in React and TypeScript",
    "Excellent problem-solving and analytical skills",
    "Clear and effective communication",
    "Good understanding of modern web development practices",
    "Solid experience with state management and hooks",
    "Could improve system design knowledge",
    "Testing strategies need more depth",
    "Performance optimization could be enhanced",
    "Good team collaboration potential",
    "Strong potential for growth with proper mentoring",
  ],
};
