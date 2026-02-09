import React, { useEffect, useRef, useState } from 'react';

interface Skill {
  id: string;
  name: string;
  category: string;
  icon: string;
  image?: string;
  level: number;
}

interface SkillsProps {
  skills: Skill[];
}

const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setInView(true);
        });
      },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`bg-gray-800 rounded-lg p-4 shadow-md transition-all duration-500 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      } hover:shadow-lg`}
    >
      <div className="flex items-center mb-3">
        {skill.image ? (
          <img src={skill.image} alt={skill.name} className="w-8 h-8 mr-3 rounded object-contain" />
        ) : (
          <span className="text-2xl mr-3">{skill.icon}</span>
        )}
        <h4 className="text-base font-semibold text-white">{skill.name}</h4>
      </div>
      <div className="relative pt-1">
        <div className="flex mb-1 items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold inline-block py-0.5 px-1.5 uppercase rounded-full text-blue-200 bg-blue-700">
              Proficiency
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-semibold inline-block text-blue-200">{skill.level}%</span>
          </div>
        </div>
        <div className="overflow-hidden h-1.5 mb-2 text-xs flex rounded bg-blue-900">
          <div
            style={{ width: `${skill.level}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-700 ease-out"
          />
        </div>
      </div>
    </div>
  );
};

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Technical Skills
          </h2>
          <p className="text-base text-gray-300 max-w-2xl mx-auto">
            Technologies and tools I work with to build amazing applications
          </p>
        </div>

        <div className="space-y-8">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <div key={category} className="">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {categorySkills.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
