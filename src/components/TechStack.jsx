import { useEffect, useRef, useState } from 'react';
import { TECH_STACK } from '../assets/techStack';

export default function TechStack() {
  const [visibleCategories, setVisibleCategories] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
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
          setSelectedSkill(null);
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
    <div ref={sectionRef} className="h-full flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h2 className="text-3xl font-bold text-green-400">Tech Stack</h2>
        <span className="text-xs text-gray-400 italic">Click an icon to learn more</span>
      </div>
      
      {/* Description Panel (Animated) */}
      <div 
        className={`mb-6 p-4 rounded-xl border border-green-500/30 bg-gray-800/60 transition-all duration-500 overflow-hidden ${
          selectedSkill ? 'max-h-40 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        {selectedSkill && (
          <div className="flex items-start gap-4">
            <img src={selectedSkill.icon} alt={selectedSkill.name} className="w-12 h-12" />
            <div>
              <h4 className="text-lg font-bold text-green-400">{selectedSkill.name}</h4>
              <p className="text-gray-300 text-sm leading-relaxed">{selectedSkill.description}</p>
            </div>
            <button 
              onClick={() => setSelectedSkill(null)}
              className="ml-auto text-gray-500 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Scrollable container */}
      <div className="flex-1 overflow-y-auto pb-8 projects-container flex flex-col gap-10">
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
                <button 
                  key={skill.name}
                  onClick={() => setSelectedSkill(selectedSkill?.name === skill.name ? null : skill)}
                  className={`flex flex-col items-center p-4 rounded-xl border transition-all duration-300 group ${
                    selectedSkill?.name === skill.name 
                      ? 'bg-green-500/10 border-green-400 shadow-[0_0_15px_rgba(74,222,128,0.2)]' 
                      : 'bg-gray-800/40 border-gray-700 hover:border-green-500/50 hover:bg-gray-800/60'
                  }`}
                >
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mb-3 transition-transform duration-300 ${
                      selectedSkill?.name === skill.name ? 'scale-110' : 'group-hover:scale-110'
                    }`}
                  />
                  <span className={`font-medium text-center text-xs sm:text-sm lg:text-base transition-colors ${
                    selectedSkill?.name === skill.name ? 'text-green-300' : 'text-gray-300 group-hover:text-green-300'
                  }`}>
                    {skill.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
