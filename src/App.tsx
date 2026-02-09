import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './components/Nav';
import Banner from './components/Banner';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Empty from './components/Empty';

interface Profile {
  name: string;
  title: string;
  quote: string;
  photo: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
}

interface Skill {
  id: string;
  name: string;
  category: string;
  icon: string;
  image?: string;
  level: number;
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string;
  image: string;
  featured: boolean;
}

function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [resumeData, setResumeData] = useState<any>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPortfolioData();
    
    // Set up scroll spy
    const handleScroll = () => {
      const sections = ['home', 'skills', 'projects', 'resume', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const tryGet = async (url: string) => {
        try {
          const res = await axios.get(url);
          return res.status >= 200 && res.status < 300 ? res.data : null;
        } catch {
          return null;
        }
      };
      const isProjectsValid = (data: any) => Array.isArray(data);
      const isSkillsValid = (data: any) =>
        Array.isArray(data) &&
        data.every(
          (s: any) =>
            typeof s.id === 'string' &&
            typeof s.name === 'string' &&
            typeof s.category === 'string' &&
            (typeof s.image === 'string' || s.image === undefined) &&
            typeof s.level === 'number'
        );
      const isResumeValid = (data: any) =>
        data &&
        typeof data.name === 'string' &&
        data.skills &&
        Array.isArray(data.skills.frontend) &&
        Array.isArray(data.skills.backend) &&
        Array.isArray(data.skills.databases) &&
        Array.isArray(data.skills.tools) &&
        Array.isArray(data.experience) &&
        Array.isArray(data.education);
      const buildProjectsFromResume = (resume: any): Project[] | null => {
        if (!resume || !Array.isArray(resume.projects)) return null;
        return resume.projects.map((p: any, i: number) => ({
          id: p.id ?? `resume-${i}`,
          title: p.title ?? `Project ${i + 1}`,
          description: p.description ?? '',
          technologies: Array.isArray(p.technologies) ? p.technologies : [],
          github: p.github ?? '#',
          demo: p.demo ?? '#',
          image: p.image ?? '',
          featured: typeof p.featured === 'boolean' ? p.featured : i < 2
        }));
      };
      const deriveSkills = (resume: any): Skill[] | null => {
        if (!resume || !resume.skills) return null;
        
        const skillMetadata: Record<string, { image?: string; level: number }> = {
          "React JS": { image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", level: 90 },
          "JavaScript": { image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", level: 90 },
          "TypeScript": { image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", level: 75 },
          "HTML": { image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", level: 95 },
          "CSS": { image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", level: 95 },
          "Tailwind CSS": { image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", level: 85 },
          "Bootstrap": { image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", level: 75 },
          "Canva": { image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg", level: 85 },
          "Node JS": { image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", level: 70 },
          "Express.js": { image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", level: 70 },
          "PHP": { image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", level: 70 },
          "Laravel": { image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg", level: 65 },
          "MongoDB": { image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", level: 80 },
          "Git": { image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", level: 85 },
          "GitHub": { image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", level: 85 },
          "C++": { image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", level: 90 },
          "Python": { image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", level: 85 },
        };

        const icons: Record<string, string> = {
          Frontend: '💻',
          Backend: '🧩',
          Databases: '🗄️',
          Tools: '🛠️',
        };
        const out: Skill[] = [];
        const pushCat = (catKey: keyof typeof resume.skills, label: string) => {
          const arr = resume.skills[catKey];
          if (Array.isArray(arr)) {
            arr.forEach((name: string, i: number) => {
              const meta = skillMetadata[name] || { level: 85 };
              out.push({
                id: `${label}-${i}-${name}`,
                name,
                category: label,
                icon: icons[label] || '🔹',
                image: meta.image,
                level: meta.level,
              });
            });
          }
        };
        pushCat('frontend', 'Frontend');
        pushCat('backend', 'Backend');
        pushCat('databases', 'Databases');
        pushCat('tools', 'Tools');
        return out;
      };
      const bust = { headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' }, params: { t: Date.now() } };
      const [profileRes, skillsRes, apiProjectsRes, apiResumeRes, projectsOverride, resumeOverride, skillsOverride] =
        await Promise.all([
          axios.get('/api/portfolio/profile', bust),
          axios.get('/api/portfolio/skills', bust),
          axios.get('/api/portfolio/projects', bust),
          axios.get('/api/portfolio/resume-data', bust),
          tryGet('/projects.json'),
          tryGet('/resume.json'),
          tryGet('/skills.json'),
        ]);

      const fallbackProfile: Profile | null = resumeOverride ? {
        name: resumeOverride.name,
        title: resumeOverride.title,
        quote: "Turning ideas into reality through code.",
        photo: "/yash-main-Image.png",
        email: resumeOverride.email,
        phone: resumeOverride.phone,
        location: resumeOverride.location,
        bio: resumeOverride.summary
      } : null;

      // Prioritize resume.json if available (fallbackProfile), otherwise use API
      const profileFinal = fallbackProfile ?? profileRes?.data ?? null;
      setProfile(profileFinal);
      const resumeFinal = isResumeValid(resumeOverride) ? resumeOverride : apiResumeRes?.data ?? null;
      const skillsFinal =
        deriveSkills(resumeFinal) ?? skillsRes?.data ?? [];
      setSkills(skillsFinal);
      const resumeProjects = buildProjectsFromResume(resumeFinal);
      const projectsSource = resumeProjects ?? (isProjectsValid(projectsOverride) ? projectsOverride : apiProjectsRes?.data ?? []);
      setProjects(Array.isArray(projectsSource) ? projectsSource.slice(0, 2) : []);
      setResumeData(resumeFinal);
    } catch (err) {
      setError('Failed to load portfolio data');
      console.error('Error fetching portfolio data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = async (data: { name: string; email: string; subject: string; message: string }) => {
    try {
      const response = await axios.post('/api/portfolio/contact', data);
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to send message');
      }
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to send message');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-center">
          <p className="text-xl mb-4">Error loading portfolio</p>
          <button
            onClick={fetchPortfolioData}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Nav onNavigate={handleNavigate} activeSection={activeSection} userName={profile.name} />
      
      <main>
        <section id="home">
          <Banner 
            profile={profile} 
            onScrollToNext={() => handleNavigate('skills')} 
          />
        </section>
        
        <section id="skills">
          <Skills skills={skills} />
        </section>
        
        <section id="projects">
          <Projects projects={projects} />
        </section>
        
        <section id="resume">
          {resumeData ? (
            <Resume resumeData={resumeData} />
          ) : (
            <Empty />
          )}
        </section>
        
        <section id="contact">
          <Contact onSubmit={handleContactSubmit} profile={profile ? { email: profile.email, location: profile.location, phone: profile.phone } : undefined} />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="mb-4">
            © 2026 {profile.name}. Built with React, TypeScript, and Three.js.
          </p>
          <div className="flex justify-center gap-6">
            <a 
              href={`mailto:${profile.email}`} 
              className="hover:text-blue-400 transition-colors"
            >
              Email
            </a>
            <a 
              href="https://www.linkedin.com/in/yashshrivastav/" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com/yash51924Shrivastav" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
