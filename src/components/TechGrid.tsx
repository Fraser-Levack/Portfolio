"use client";

import React from "react";
import { Unbounded } from "next/font/google";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, 
  SiPython, SiDjango, SiPostgresql, SiFirebase, SiCplusplus, 
  SiThreedotjs, SiGit, SiDocker, SiLinux, SiFigma, SiJira, 
  SiHaskell, SiOpengl, SiDeno, SiHtml5, SiCss3, SiVite, SiRust
} from "react-icons/si";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["900"],
});

const TECH_STACK = [
  
  { name: "TypeScript", ring: 1, icon: SiTypescript, color: "text-[#3178C6]" },
  { name: "Python", ring: 1, icon: SiPython, color: "text-[#3776AB]" },
  { name: "HTML5", ring: 1, icon: SiHtml5, color: "text-[#E34F26]" },
  { name: "CSS3", ring: 1, icon: SiCss3, color: "text-[#1572B6]" },
  { name: "C++", ring: 1, icon: SiCplusplus, color: "text-[#00599C]" },
  { name: "Haskell", ring: 1, icon: SiHaskell, color: "text-[#5D4F85]" },
  { name: "Rust", ring: 1, icon: SiRust, color: "text-[#FF6600]" },

  { name: "React", ring: 2, icon: SiReact, color: "text-[#61DAFB]" },
  { name: "Vite", ring: 2, icon: SiVite, color: "text-[#646CFF]" },
  { name: "Next.js", ring: 2, icon: SiNextdotjs, color: "text-black" },
  { name: "Tailwind", ring: 2, icon: SiTailwindcss, color: "text-[#06B6D4]" },
  { name: "Node.js", ring: 2, icon: SiNodedotjs, color: "text-[#339933]" },
  { name: "Django", ring: 2, icon: SiDjango, color: "text-[#092E20]" },
  { name: "PostgreSQL", ring: 2, icon: SiPostgresql, color: "text-[#4169E1]" },
  { name: "Firebase", ring: 2, icon: SiFirebase, color: "text-[#FFCA28]" },
  { name: "Three.js", ring: 2, icon: SiThreedotjs, color: "text-black" },
  { name: "OpenGL", ring: 2, icon: SiOpengl, color: "text-[#5586A4]" },
  

  { name: "Git", ring: 3, icon: SiGit, color: "text-[#F05032]" },
  { name: "Docker", ring: 3, icon: SiDocker, color: "text-[#2496ED]" },
  { name: "Figma", ring: 3, icon: SiFigma, color: "text-[#F24E1E]" },
  { name: "Jira", ring: 3, icon: SiJira, color: "text-[#0052CC]" },
  { name: "Linux", ring: 3, icon: SiLinux, color: "text-black" },

  
];

const CATEGORIES = [
  { id: 1, title: "Languages" },
  { id: 2, title: "Frameworks/Libraries" },
  { id: 3, title: "Tools & Others" },
];

const TechGrid = () => {
  return (
    <div 
      className={`w-full h-full p-4 md:p-8 bg-white/40 backdrop-blur-sm rounded-[1.25rem] border border-slate-100 
        overflow-y-auto lg:overflow-hidden flex flex-col ${unbounded.variable} scrollbar-hide`}
    >
      {/* This inner wrapper uses 'my-auto' to vertically center itself 
          on desktop when there is extra space. 
      */}
      <div className="flex flex-col gap-6 md:gap-10 my-auto py-10 md:py-0">
        {CATEGORIES.map((category) => (
          <div key={category.id} className="space-y-3 md:space-y-4">
            
            {/* Minimalist Header */}
            <div className="flex items-center gap-3">
              <h3 
                className="text-[0.6rem] md:text-[0.75rem] uppercase tracking-[0.3em] text-slate-400 font-black"
                style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
              >
                {category.title}
              </h3>
              <div className="flex-1 h-[1px] bg-slate-200/50" />
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3">
              {TECH_STACK.filter((tech) => tech.ring === category.id).map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.name}
                    className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-white/80 rounded-lg border border-slate-100 shadow-sm group hover:border-slate-300 transition-all duration-300"
                  >
                    <div className="flex-shrink-0">
                      <Icon 
                        className={`${item.color} transition-transform group-hover:scale-110`}
                        style={{ fontSize: "1.1rem" }} 
                      />
                    </div>
                    <span 
                      className="font-bold uppercase tracking-tight text-slate-600 group-hover:text-slate-900 transition-colors truncate"
                      style={{ fontSize: "0.6rem" }}
                    >
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechGrid;