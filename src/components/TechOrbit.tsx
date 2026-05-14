"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, 
  SiPython, SiDjango, SiPostgresql, SiFirebase, SiCplusplus, 
  SiHtml5, SiCss3, SiThreedotjs, SiVite, SiGit, SiDocker, 
  SiFigma, SiJira, SiLinux, SiHaskell, SiOpengl, SiRust 
} from "react-icons/si";

const TECH_STACK = [
  // Ring 1: Core
  { name: "React", ring: 1, icon: SiReact, color: "text-[#61DAFB]" },
  { name: "Next.js", ring: 1, icon: SiNextdotjs, color: "text-black" },
  { name: "TypeScript", ring: 1, icon: SiTypescript, color: "text-[#3178C6]" },
  { name: "Tailwind", ring: 1, icon: SiTailwindcss, color: "text-[#06B6D4]" },
  { name: "Node.js", ring: 1, icon: SiNodedotjs, color: "text-[#339933]" },
  { name: "Python", ring: 1, icon: SiPython, color: "text-[#3776AB]" },
  { name: "Vite", ring: 1, icon: SiVite, color: "text-[#646CFF]" },

  // Ring 2: Backend 
  { name: "Django", ring: 2, icon: SiDjango, color: "text-[#092E20]" },
  { name: "PostgreSQL", ring: 2, icon: SiPostgresql, color: "text-[#4169E1]" },
  { name: "Firebase", ring: 2, icon: SiFirebase, color: "text-[#FFCA28]" },
  { name: "C++", ring: 2, icon: SiCplusplus, color: "text-[#00599C]" },
  { name: "HTML5", ring: 2, icon: SiHtml5, color: "text-[#E34F26]" },
  { name: "CSS3", ring: 2, icon: SiCss3, color: "text-[#1572B6]" },
  { name: "Three.js", ring: 2, icon: SiThreedotjs, color: "text-black" },

  // Ring 3: Tools
  { name: "Git", ring: 3, icon: SiGit, color: "text-[#F05032]" },
  { name: "Docker", ring: 3, icon: SiDocker, color: "text-[#2496ED]" },
  { name: "Figma", ring: 3, icon: SiFigma, color: "text-[#F24E1E]" },
  { name: "Jira", ring: 3, icon: SiJira, color: "text-[#0052CC]" },
  { name: "Linux", ring: 3, icon: SiLinux, color: "text-black" },
  { name: "Haskell", ring: 3, icon: SiHaskell, color: "text-[#5D4F85]" },
  { name: "OpenGL", ring: 3, icon: SiOpengl, color: "text-[#5586A4]" },
  { name: "Rust", ring: 3, icon: SiRust, color: "text-[#FF6600]" },
];

const ORBIT_CONFIGS = {
  1: { radius: 220, speed: 0.5, tiltX: 75, tiltZ: 0 },   // Reduced radius slightly to fit side-by-side
  2: { radius: 220, speed: 0.4, tiltX: 75, tiltZ: 60 },
  3: { radius: 220, speed: 0.6, tiltX: 75, tiltZ: -60 },
};

const TechOrbit = () => {
  const [time, setTime] = useState(0);
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const animate = (timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    setTime(elapsed * 0.0005); 
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const itemsWithPosition = useMemo(() => {
    return TECH_STACK.map((item, index) => {
      const config = ORBIT_CONFIGS[item.ring as keyof typeof ORBIT_CONFIGS];
      const ringItems = TECH_STACK.filter(i => i.ring === item.ring);
      const itemIndexInRing = ringItems.indexOf(item);
      const angleStep = 360 / ringItems.length;
      const baseAngle = itemIndexInRing * angleStep;
      return { ...item, config, baseAngle };
    });
  }, []);

  return (
    // CHANGED: No longer h-screen or absolute. 
    // It takes full width/height of its parent container.
    <div className="relative flex items-center justify-center w-full h-full min-h-[500px] pointer-events-none transform-style-3d">
      
      <div className="relative flex items-center justify-center w-[500px] h-[500px]">
        {itemsWithPosition.map((item, index) => {
          const { config, baseAngle } = item;
          const { radius, speed, tiltX, tiltZ } = config;

          const currentAngle = baseAngle + (time * speed * 100); 
          const rad = (currentAngle * Math.PI) / 180;
          const tiltXRad = (tiltX * Math.PI) / 180;
          const tiltZRad = (tiltZ * Math.PI) / 180;

          let x = radius * Math.cos(rad);
          let y = radius * Math.sin(rad);
          let z = 0;

          const y1 = y * Math.cos(tiltXRad) - z * Math.sin(tiltXRad);
          const z1 = y * Math.sin(tiltXRad) + z * Math.cos(tiltXRad);

          const xFinal = x * Math.cos(tiltZRad) - y1 * Math.sin(tiltZRad);
          const yFinal = x * Math.sin(tiltZRad) + y1 * Math.cos(tiltZRad);
          const zFinal = z1;

          const range = radius * 2;
          const normalizedZ = (zFinal + radius) / range; 
          const scale = 1 + (normalizedZ * 0.7);
          const opacity = 0.4 + (normalizedZ * 0.7);
          const blur = Math.max(0, (1 - normalizedZ) * 1.5); 
          const zIndex = Math.round(zFinal);

          const Icon = item.icon;

          return (
            <div
              key={item.name}
              className="absolute top-1/2 left-1/2 will-change-transform pointer-events-auto"
              style={{
                transform: `translate3d(${xFinal}px, ${yFinal}px, ${zFinal}px) translate(-50%, -50%) scale(${scale})`,
                opacity,
                filter: `blur(${blur}px)`,
                zIndex,
              }}
            >
              <div className="group relative flex items-center justify-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-125 hover:shadow-xl hover:bg-white cursor-pointer">
                  <Icon className={`text-3xl ${item.color}`} />
                </div>
                <div className="absolute top-full mt-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-[1000]">
                  {item.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechOrbit;