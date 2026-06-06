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
              <p className="text-gray-300 leading-relaxed wrap-break-words mb-4">{project.description}</p>
              <div className="flex gap-4">
                {project.url && (
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 transition-colors font-semibold flex items-center gap-1"
                  >
                    <span>Live Demo</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a22 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors font-semibold flex items-center gap-1"
                  >
                    <span>GitHub Repo</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
