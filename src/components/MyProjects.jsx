import { useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export default function MyProjects() {
  const { projects, triggerProjects, resetProjects } = usePortfolio();
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          triggerProjects();
        } else {
          resetProjects();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [triggerProjects, resetProjects]);

  return (
    <div ref={sectionRef} className="h-full flex flex-col">
      <h2 className="text-3xl font-bold text-green-400 mb-6 shrink-0">My Projects</h2>
      
      {/* Scrollable container for projects */}
      <div className="flex-1 overflow-y-auto pr-4 projects-container">
        <div className="flex flex-col gap-6 pb-12">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="bg-gray-800/50 p-6 rounded-lg border border-gray-600 animate-in fade-in slide-in-from-left duration-500"
            >
              <h3 className="text-2xl font-bold text-green-400 mb-2">{project.label}:</h3>
              <h4 className="text-xl font-semibold text-white mb-2">{project.title}</h4>
              <p className="text-gray-300 leading-relaxed wrap-break-words">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
