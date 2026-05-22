import { useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Myinfo() {
  const { infoTexts: texts, triggerInfo } = usePortfolio();
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          triggerInfo();
        }
      },
      { threshold: 0.2 } // Trigger when 20% visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [triggerInfo]);

  return (
    <div ref={sectionRef} className="flex flex-col text-sm sm:text-lg md:text-xl lg:text-[2vw] bg-gray-700 text-green-400 w-full h-fit p-2 sm:p-4 font-mono">
      {/* Line 1: const myInformation = { */}
      <div className="flex gap-1 sm:gap-2 flex-wrap">
        <span className="text-red-400">{texts[0]}</span>
        <span className="text-purple-400">{texts[1]}</span>
        <span className="text-white">{texts[2]}</span>
        <span className="text-pink-400">{texts[3]}</span>
      </div>

      {/* Line 2: Name: "..." */}
      <div className="flex gap-1 sm:gap-2 ml-4 sm:ml-8 flex-wrap">
        <span className="text-white">{texts[4]}</span>
        <span>{texts[5]}</span>
        <span className="text-green-300 break-all">{texts[6]}</span>
        <span className="text-white">{texts[7]}</span>
      </div>

      {/* Line 3: Role: "..." */}
      <div className="flex gap-1 sm:gap-2 ml-4 sm:ml-8 flex-wrap">
        <span className="text-white">{texts[8]}</span>
        <span>{texts[9]}</span>
        <span className="text-green-300 break-all">{texts[10]}</span>
        <span className="text-white">{texts[11]}</span>
      </div>

      {/* Line 4: Tech_stack: [...] */}
      <div className="flex gap-1 sm:gap-2 ml-4 sm:ml-8 flex-wrap">
        <span className="text-white">{texts[12]}</span>
        <span>{texts[13]}</span>
        <span className="text-blue-300 break-all">{texts[14]}</span>
      </div>

      {/* Line 5: } */}
      <div className="text-pink-400">
        {texts[15]}
      </div>
    </div>
  );
}
