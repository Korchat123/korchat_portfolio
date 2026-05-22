import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const NAV_ITEMS = [
  { label: "my Portfolio", id: "portfolio" },
  { label: "my Projects", id: "projects" },
  { label: "tech stack", id: "tech-stack" },
  { label: "education", id: "education" },
  { label: "work experience", id: "work-experience" },
  { label: "contact", id: "contact" }
];

export default function SideBar() {
  const { triggerProjects } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    // If user clicks projects, start the animation immediately
    if (id === 'projects') {
      triggerProjects();
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile, visible from lg up */}
      <nav className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-gray-800 text-white p-6 border-r border-gray-600 shrink-0">
        <h2 className="text-xl font-bold mb-8 text-green-400 font-mono tracking-tighter">Navigation</h2>
        <ul className="space-y-2">
          {NAV_ITEMS.map((item) => (
            <li 
              key={item.id} 
              onClick={() => scrollToSection(item.id)}
              className="hover:bg-gray-700 p-2 rounded transition-colors cursor-pointer font-mono"
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Floating Button - Visible only on smaller screens */}
      <div className="lg:hidden fixed bottom-8 right-8 z-50 group">
        {/* The Menu (Reveals on button click or group hover) */}
        <div className={`absolute bottom-full right-0 mb-4 bg-gray-800 border border-gray-600 rounded-xl p-4 w-48 shadow-2xl transition-all duration-300 origin-bottom-right ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none lg:group-hover:opacity-100 lg:group-hover:scale-100 lg:group-hover:pointer-events-auto'
        }`}>
          <div className="text-xs font-bold text-green-500 mb-4 uppercase tracking-widest border-b border-gray-700 pb-2">
            Navigate
          </div>
          <ul className="space-y-3">
            {NAV_ITEMS.map((item) => (
              <li 
                key={item.id} 
                onClick={() => scrollToSection(item.id)}
                className="text-gray-300 hover:text-green-400 cursor-pointer transition-colors text-sm font-mono border-b border-gray-700/50 pb-2 last:border-0"
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* The Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-500 text-gray-900 w-14 h-14 rounded-full shadow-lg flex items-center justify-center font-bold text-2xl hover:scale-110 active:scale-95 transition-all duration-200"
          aria-label="Toggle navigation"
        >
          {isOpen ? (
            <span className="animate-in fade-in rotate-in duration-300">×</span>
          ) : (
            <span className="animate-in fade-in rotate-in duration-300">☰</span>
          )}
        </button>
      </div>
    </>
  );
}
