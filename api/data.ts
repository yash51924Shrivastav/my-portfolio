export interface Profile {
  name: string;
  title: string;
  quote: string;
  photo: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon: string;
  level: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string;
  image: string;
  featured: boolean;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  url: string;
  tags: string[];
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const profileData: Profile = {
  name: "Yash Shrivastav",
  title: "Full Stack Developer",
  quote: "Code is like humor. When you have to explain it, it's bad.",
  photo: "/yash-main-Image.png",
  email: "yash@example.com",
  phone: "+91 00000 00000",
  location: "India",
  bio: "Passionate full-stack developer with expertise in modern web technologies."
};

export const skillsData: Skill[] = [
  { id: "1", name: "React", category: "Frontend", icon: "⚛️", level: 95 },
  { id: "2", name: "TypeScript", category: "Frontend", icon: "📘", level: 80 },
  { id: "3", name: "Node.js", category: "Backend", icon: "🟢", level: 85 },
  { id: "4", name: "Express", category: "Backend", icon: "🚀", level: 80 },
  { id: "5", name: "MongoDB", category: "Database", icon: "🍃", level: 75 },
  { id: "6", name: "PostgreSQL", category: "Database", icon: "🐘", level: 70 },
  { id: "7", name: "Three.js", category: "3D Graphics", icon: "🎨", level: 65 },
  { id: "8", name: "Docker", category: "DevOps", icon: "🐳", level: 60 }
];

export const projectsData: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with payment integration and inventory management.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    github: "https://github.com/johndoe/ecommerce",
    demo: "https://ecommerce-demo.com",
    image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern+e-commerce+website+interface+with+shopping+cart+and+products&image_size=landscape_16_9",
    featured: true
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team features.",
    technologies: ["Vue.js", "Express", "PostgreSQL", "Socket.io"],
    github: "https://github.com/johndoe/taskmanager",
    demo: "https://taskmanager-demo.com",
    image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=task+management+dashboard+with+charts+and+team+collaboration&image_size=landscape_16_9",
    featured: true
  },
  {
    id: "3",
    title: "Weather Dashboard",
    description: "A beautiful weather dashboard with 3D visualizations and detailed forecasts.",
    technologies: ["Three.js", "React", "Weather API", "Chart.js"],
    github: "https://github.com/johndoe/weather",
    demo: "https://weather-demo.com",
    image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=weather+dashboard+with+3D+graphics+and+charts&image_size=landscape_16_9",
    featured: false
  }
];

export const blogsData: Blog[] = [
  {
    id: "1",
    title: "Building Scalable React Applications",
    excerpt: "Best practices and patterns for building large-scale React applications.",
    date: "2024-01-15",
    url: "https://blog.example.com/scalable-react",
    tags: ["React", "Architecture", "Best Practices"]
  },
  {
    id: "2",
    title: "Understanding Three.js Fundamentals",
    excerpt: "A comprehensive guide to getting started with 3D web development using Three.js.",
    date: "2024-02-01",
    url: "https://blog.example.com/threejs-fundamentals",
    tags: ["Three.js", "3D Graphics", "WebGL"]
  },
  {
    id: "3",
    title: "Modern Full-Stack Development",
    excerpt: "Exploring the latest trends and technologies in full-stack development.",
    date: "2024-02-20",
    url: "https://blog.example.com/modern-fullstack",
    tags: ["Full-Stack", "Trends", "Technology"]
  }
];

export const resumeLatex = `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage{amsmath}
\\usepackage{amsfonts}
\\usepackage{amssymb}
\\usepackage{graphicx}

\\title{John Doe - Resume}
\\author{John Doe}
\\date{January 2024}

\\begin{document}

\\maketitle

\\section*{Contact Information}
\\begin{itemize}
    \\item Email: john.doe@example.com
    \\item Phone: +1 (555) 123-4567
    \\item Location: San Francisco, CA
    \\item LinkedIn: linkedin.com/in/johndoe
\\end{itemize}

\\section*{Professional Summary}
Experienced full-stack developer with 5+ years of experience building scalable web applications.
Specialized in React, Node.js, and modern web technologies.

\\section*{Technical Skills}
\\textbf{Frontend:} React, TypeScript, Vue.js, HTML5, CSS3, Tailwind CSS\\
\\textbf{Backend:} Node.js, Express, Python, REST APIs\\
\\textbf{Databases:} MongoDB, PostgreSQL, Redis\\
\\textbf{Tools:} Git, Docker, AWS, CI/CD

\\section*{Experience}
\\textbf{Senior Full-Stack Developer} \\\\ ABC Tech Inc. \\\\ January 2022 - Present
\\begin{itemize}
    \\item Led development of customer-facing web applications
    \\item Improved application performance by 40% through optimization
    \\item Mentored junior developers and conducted code reviews
\\end{itemize}

\\textbf{Full-Stack Developer} \\\\ XYZ Solutions \\\\ June 2020 - December 2021
\\begin{itemize}
    \\item Built and maintained multiple client projects
    \\item Implemented RESTful APIs and microservices
    \\item Collaborated with design team on UI/UX improvements
\\end{itemize}

\\section*{Education}
\\textbf{Bachelor of Science in Computer Science} \\\\ University of Technology \\\\ 2016 - 2020

\\end{document}`;

export const resumeData = {
  name: "Yash Shrivastav",
  title: "Full Stack Developer",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  linkedin: "linkedin.com/in/johndoe",
  summary: "Experienced full-stack developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and modern web technologies.",
  skills: {
    frontend: ["React", "TypeScript", "Vue.js", "HTML5", "CSS3", "Tailwind CSS"],
    backend: ["Node.js", "Express", "Python", "REST APIs"],
    databases: ["MongoDB", "PostgreSQL", "Redis"],
    tools: ["Git", "Docker", "AWS", "CI/CD"]
  },
  experience: [
    {
      title: "Senior Full-Stack Developer",
      company: "ABC Tech Inc.",
      period: "January 2022 - Present",
      achievements: [
        "Led development of customer-facing web applications",
        "Improved application performance by 40% through optimization",
        "Mentored junior developers and conducted code reviews"
      ]
    },
    {
      title: "Full Stack Developer",
      company: "XYZ Solutions",
      period: "June 2020 - December 2021",
      achievements: [
        "Built and maintained multiple client projects",
        "Implemented RESTful APIs and microservices",
        "Collaborated with design team on UI/UX improvements"
      ]
    }
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      period: "2016 - 2020"
    }
  ]
};
