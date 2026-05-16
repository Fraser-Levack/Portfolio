"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiGithub } from "react-icons/si";

interface ProjectCardProps {
  title: string;
  titleColor?: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  externalUrl?: string;
}

export default function ProjectCard({ title, titleColor, description, imageUrl, githubUrl, externalUrl }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Detect clicks outside the card to collapse it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div 
      ref={cardRef}
      // FIX 1: Toggle the state on every click
      onClick={() => setIsExpanded(!isExpanded)}
      className={`relative overflow-hidden rounded-lg z-[61] aspect-square w-full border border-slate-100 shadow-sm transition-all duration-500 ${
        // FIX 2: Keep cursor-pointer on both states
        isExpanded ? 'cursor-pointer ring-2 ring-white/20' : 'cursor-pointer group hover:shadow-md'
      }`}
    >
      {/* Background Image: Blurs and darkens when expanded */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <img
        src={imageUrl}
        alt={title}
        className={`w-full h-full object-cover transition-all duration-700 ease-out ${
          isExpanded 
            ? "scale-105 blur-md brightness-[0.3]" // Matches the hover scale perfectly
            : "scale-100 group-hover:scale-105"    // Explicit base scale added for stability
        }`}
      />
      </div>
      
      {/* 
        CONTENT CONTAINER 
        justify-end forces everything to the bottom. 
      */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10">
        
        {/* The wrapper for Title and Text */}
        <motion.div layout className="flex flex-col">
          
          {/* Title */}
          <motion.h3 
            layout
            className={`
              ${isExpanded ? 'text-[#f8faf9]' : (titleColor || 'text-[#f8faf9]')} 
              transition-colors duration-500 font-black text-[clamp(1.5rem,3vw,2.5rem)] tracking-tight leading-[1.1]
            `}
            style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
          >
            {title}
          </motion.h3>

          {/* DETAILS TEXT & ICONS: Animates height to push the title up */}
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }} // Smooth ease-out
                className="overflow-hidden"
              >
                {/* Inner container to slide the text up slightly for a parallax effect */}
                <motion.div 
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  exit={{ y: 20 }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                  className="flex flex-col pt-4 pb-1"
                >
                  <p className="text-slate-200 text-sm md:text-base font-medium">
                    {description}
                  </p>
                  
                  {/* Action Icons */}
                  <div className="mt-4 flex items-center gap-4">
                    {githubUrl && (
                      <a 
                        href={githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()} 
                        className="text-white hover:text-[#529AE4] transition-colors p-2 -ml-2 rounded-full"
                        title="View GitHub Repository"
                      >
                        <SiGithub size={26} />
                      </a>
                    )}
                    
                    {externalUrl && (
                      <a 
                        href={externalUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-white hover:text-[#529AE4] transition-colors p-2 rounded-full"
                        title="Visit Live Site"
                      >
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
        </motion.div>
      </div>
    </div>
  );
}