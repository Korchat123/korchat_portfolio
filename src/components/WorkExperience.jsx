import { WORK_EXPERIENCE } from '../assets/workExperience';

export default function WorkExperience() {
  return (
<<<<<<< HEAD
    <div className="flex flex-col">
      <h2 className="text-3xl font-bold text-green-400 mb-6 shrink-0">Work Experience</h2>
      
      <div className="flex flex-col gap-8 pb-12">
        {WORK_EXPERIENCE.map((item, index) => (
          <div 
            key={index} 
            className="bg-gray-800/40 p-4 sm:p-6 rounded-xl border border-gray-700 animate-in fade-in slide-in-from-bottom duration-700 break-words"
            style={{ animationDelay: `${index * 200}ms`, fillMode: 'both' }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
              <h3 className="text-xl sm:text-2xl font-semibold text-white leading-tight">{item.company}</h3>
              <span className="text-green-300 font-mono text-sm sm:text-base shrink-0">{item.period}</span>
            </div>
            <p className="text-lg sm:text-xl text-blue-300 mb-4 leading-tight">{item.role}</p>
            <ul className="list-disc list-inside flex flex-col gap-2">
              {item.responsibilities.map((resp, idx) => (
                <li key={idx} className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  {resp}
                </li>
              ))}
            </ul>
          </div>
        ))}
=======
    <div className="h-full flex flex-col">
      <h2 className="text-3xl font-bold text-green-400 mb-6 shrink-0">Work Experience</h2>
      
      {/* Scrollable container similar to MyProjects */}
      <div className="flex-1 overflow-y-auto pr-4 projects-container">
        <div className="flex flex-col gap-8 pb-12">
          {WORK_EXPERIENCE.map((item, index) => (
            <div 
              key={index} 
              className="bg-gray-800/40 p-4 sm:p-6 rounded-xl border border-gray-700 animate-in fade-in slide-in-from-bottom duration-700 break-words"
              style={{ animationDelay: `${index * 200}ms`, fillMode: 'both' }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                <h3 className="text-xl sm:text-2xl font-semibold text-white leading-tight">{item.company}</h3>
                <span className="text-green-300 font-mono text-sm sm:text-base shrink-0">{item.period}</span>
              </div>
              <p className="text-lg sm:text-xl text-blue-300 mb-4 leading-tight">{item.role}</p>
              <ul className="list-disc list-inside flex flex-col gap-2">
                {item.responsibilities.map((resp, idx) => (
                  <li key={idx} className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
>>>>>>> f84da0678d83e3f67da7aa4c919dd3a7efef01c3
      </div>
    </div>
  );
}
