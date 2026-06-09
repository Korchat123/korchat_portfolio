import { useEffect, useRef, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export default function MyProjects() {
  const { projects, triggerProjects, resetProjects } = usePortfolio();
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Drag-to-scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragHasMoved, setDragHasMoved] = useState(false);

  // Intersection Observer to trigger project loading
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

  // Truly Seamless Auto-scroll logic
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isPaused || isDragging || projects.length === 0 || selectedProject) return;

    const step = 0.8; 
    let animationId;

    const scroll = () => {
      if (isPaused || isDragging || selectedProject) return;

      scrollContainer.scrollLeft += step;

      const setWidth = scrollContainer.scrollWidth / 2;
      if (scrollContainer.scrollLeft >= setWidth) {
        scrollContainer.scrollLeft -= setWidth;
      }
      
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused, isDragging, projects.length, selectedProject]);

  const handleScrollSync = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    const setWidth = scrollContainer.scrollWidth / 2;
    if (scrollContainer.scrollLeft >= setWidth) {
      scrollContainer.scrollLeft -= setWidth;
    } else if (scrollContainer.scrollLeft <= 0) {
      scrollContainer.scrollLeft += setWidth;
    }
  };

  // Drag Handlers
  const handleMouseDown = (e) => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    setIsDragging(true);
    setDragHasMoved(false);
    setStartX(e.pageX - scrollContainer.offsetLeft);
    setScrollLeft(scrollContainer.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || selectedProject) return;
    e.preventDefault();
    
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    
    if (Math.abs(walk) > 5) {
      setDragHasMoved(true);
    }
    
    scrollContainer.scrollLeft = scrollLeft - walk;
    handleScrollSync();
  };

  const handleProjectClick = (project) => {
    // Only open popup if the user wasn't dragging
    if (!dragHasMoved) {
      setSelectedProject(project);
    }
  };

  // Duplicate projects for seamless looping
  const duplicatedProjects = [...projects, ...projects];

  return (
    <div ref={sectionRef} className="h-full flex flex-col overflow-hidden relative select-none">
      <h2 className="text-3xl font-bold text-green-400 mb-6 shrink-0">My Projects</h2>
      
      {/* Horizontal scrollable container */}
      <div 
        ref={scrollRef}
        onScroll={handleScrollSync}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseLeave={handleMouseLeaveOrUp}
        className={`flex-1 overflow-x-auto overflow-y-hidden flex items-center gap-6 pb-8 projects-scrollbar cursor-grab active:cursor-grabbing ${isDragging ? 'scroll-smooth-none' : ''}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={(e) => {
          setIsPaused(false);
          handleMouseLeaveOrUp();
        }}
      >
        {duplicatedProjects.map((project, index) => (
          <div 
            key={`${project.id}-${index}`} 
            onClick={() => handleProjectClick(project)}
            className="flex-none w-[350px] sm:w-[400px] bg-gray-800/50 rounded-lg border border-gray-600 overflow-hidden flex flex-col h-[480px] transition-all duration-300 hover:border-green-500/50 hover:shadow-[0_0_20px_rgba(74,222,128,0.1)] pointer-events-auto"
          >
            {/* Project Image */}
            <div className="h-48 w-full overflow-hidden bg-gray-900 pointer-events-none">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>

            <div className="p-6 flex flex-col flex-1 pointer-events-none">
              <h3 className="text-xl font-bold text-green-400 mb-1">{project.label}:</h3>
              <h4 className="text-lg font-semibold text-white mb-3">{project.title}</h4>
              <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">
                {project.description}
              </p>
              <div className="mt-auto text-green-400/50 text-xs font-semibold uppercase tracking-wider">
                Click to explore →
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Link Popup / Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div 
            className="bg-gray-900 border border-green-500/50 p-8 rounded-2xl max-w-md w-full shadow-[0_0_50px_rgba(34,197,94,0.2)] animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{selectedProject.title}</h3>
                <p className="text-green-400 font-semibold">{selectedProject.label}</p>
              </div>
              <button 
                onClick={() => setSelectedProject(null)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {selectedProject.url && (
                <a 
                  href={selectedProject.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 p-4 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition-all transform hover:scale-[1.02]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a22 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Visit Live Website</span>
                </a>
              )}
              {selectedProject.github && (
                <a 
                  href={selectedProject.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 p-4 bg-gray-800 text-white font-bold rounded-xl border border-gray-600 hover:bg-gray-700 transition-all transform hover:scale-[1.02]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>View Source Code</span>
                </a>
              )}
            </div>
            
            <button 
              onClick={() => setSelectedProject(null)}
              className="mt-6 w-full text-gray-400 hover:text-white text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
