import { useEffect, useRef, useState } from 'react';
import { TECH_STACK } from '../assets/techStack';

export default function TechStack() {
  const [visibleCategories, setVisibleCategories] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          TECH_STACK.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCategories(prev => [...new Set([...prev, index])]);
            }, index * 200);
          });
        } else {
          setVisibleCategories([]);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="flex flex-col">
      <h2 className="text-3xl font-bold text-green-400 mb-6 shrink-0">Tech Stack</h2>
      
      <div className="pb-8 flex flex-col gap-10">
        {TECH_STACK.map((category, idx) => (
          <div 
            key={category.category}
            className={`w-full transition-all duration-700 h-fit ${
              visibleCategories.includes(idx) 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h3 className="text-xl lg:text-2xl font-semibold text-white mb-6 border-b border-gray-600 pb-2">
              {category.category}
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {category.skills.map((skill) => (
                <div 
                  key={skill.name}
                  className="flex flex-col items-center p-4 bg-gray-800/40 rounded-xl border border-gray-700 transition-all hover:border-green-500/50 hover:bg-gray-800/60 group"
                >
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mb-3 transition-transform group-hover:scale-110 duration-300"
                  />
                  <span className="text-gray-300 font-medium text-center text-xs sm:text-sm lg:text-base group-hover:text-green-300 transition-colors">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
