import React, { createContext, useContext, useState, useEffect } from 'react';
import { INFO_SEGMENTS } from '../assets/profile.js';
import  {PROJECT_DATA}  from '../assets/projecs.js';



const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  // Typing Effect State (Myinfo)
  const [infoTexts, setInfoTexts] = useState(() => Array(INFO_SEGMENTS.length).fill(""));
  const [isInfoStarted, setIsInfoStarted] = useState(false);
  const [isInfoFinished, setIsInfoFinished] = useState(false);

  // Sequential Display State (MyProjects)
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [isProjectsStarted, setIsProjectsStarted] = useState(false);

  // 1. Logic for Typing Effect (Starts when isInfoStarted is true)
  useEffect(() => {
    if (!isInfoStarted || isInfoFinished) return;

    let segmentIndex = 0;
    let charIndex = 0;

    const interval = setInterval(() => {
      if (segmentIndex >= INFO_SEGMENTS.length) {
        clearInterval(interval);
        setIsInfoFinished(true);
        return;
      }

      const currentFullText = INFO_SEGMENTS[segmentIndex];

      if (charIndex < currentFullText.length) {
        setInfoTexts(prev => {
          const next = [...prev];
          next[segmentIndex] = currentFullText.slice(0, charIndex + 1);
          return next;
        });
        charIndex++;
      } else {
        charIndex = 0;
        segmentIndex++;
      }
    }, 25);

    return () => clearInterval(interval);
  }, [isInfoStarted, isInfoFinished]);

  // 2. Logic for Sequential Projects (Starts when isProjectsStarted is true)
  useEffect(() => {
    if (!isProjectsStarted || displayedProjects.length >= PROJECT_DATA.length) return;

    const timer = setTimeout(() => {
      setDisplayedProjects(prev => {
        if (prev.length < PROJECT_DATA.length) {
          return [...prev, PROJECT_DATA[prev.length]];
        }
        return prev;
      });
    }, 200);

    return () => clearTimeout(timer);
  }, [isProjectsStarted, displayedProjects.length]);

  const triggerInfo = () => setIsInfoStarted(true);
  const triggerProjects = () => setIsProjectsStarted(true);
  const resetProjects = () => {
    setIsProjectsStarted(false);
    setDisplayedProjects([]);
  };

  const value = {
    infoTexts,
    isInfoFinished,
    projects: displayedProjects,
    triggerInfo,
    triggerProjects,
    resetProjects
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
