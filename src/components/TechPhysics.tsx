"use client";

import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, 
  SiPython, SiDjango, SiPostgresql, SiFirebase, SiCplusplus, 
  SiThreedotjs, SiGit, SiDocker, SiLinux, SiFigma, SiJira, 
  SiHaskell, SiOpengl, SiRust, SiHtml5, SiCss3, SiVite
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

const TechPhysics = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<any[]>([]);
  const [radius, setRadius] = useState(25);

  useEffect(() => {
    if (!containerRef.current) return;

    const engine = Matter.Engine.create();
    let frameId: number;

    const init = () => {
      const container = containerRef.current!;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      const dynamicRadius = Math.max(18, Math.min(width / 12, 70));
      setRadius(dynamicRadius);

      const thickness = 100;
      const walls = [
        Matter.Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, { isStatic: true }),
        Matter.Bodies.rectangle(-thickness / 2, height / 2, thickness, height, { isStatic: true }),
        Matter.Bodies.rectangle(width + thickness / 2, height / 2, thickness, height, { isStatic: true }),
        Matter.Bodies.rectangle(width / 2, -thickness / 2, width, thickness, { isStatic: true })
      ];

      const bodiesWithData = TECH_STACK.map((tech) => {
        const body = Matter.Bodies.circle(
          Math.random() * (width - dynamicRadius * 2) + dynamicRadius,
          Math.random() * (height / 2),
          dynamicRadius,
          { 
            restitution: 0.6, 
            friction: 0.1,
            frictionAir: 0.02
          }
        );
        return { tech, body };
      });

      // --- ADD MOUSE INTERACTION ---
      const mouse = Matter.Mouse.create(container);
      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false }
        }
      });

      // Fix for scrolling: allow mouse events to pass through to the page 
      // unless we are actually dragging a ball.
      mouseConstraint.mouse.element.removeEventListener("mousewheel", (mouse as any).mousewheel);
      mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", (mouse as any).mousewheel);

      Matter.Composite.add(engine.world, [
        ...walls, 
        ...bodiesWithData.map(b => b.body),
        mouseConstraint
      ]);

      const update = () => {
        Matter.Engine.update(engine, 1000 / 60);
        setItems(bodiesWithData.map(b => ({
          ...b.tech,
          x: b.body.position.x,
          y: b.body.position.y,
          angle: b.body.angle
        })));
        frameId = requestAnimationFrame(update);
      };

      update();
    };

    const observer = new ResizeObserver(() => {
      if (containerRef.current?.clientWidth) {
        init();
        observer.disconnect();
      }
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
      Matter.Engine.clear(engine);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full min-h-[400px] overflow-hidden bg-transparent touch-none"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const size = radius * 2;
        
        return (
          <div
            key={item.name}
            className="absolute flex items-center justify-center will-change-transform select-none cursor-grab active:cursor-grabbing"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: 0,
              top: 0,
              transform: `translate3d(${item.x - radius}px, ${item.y - radius}px, 0) rotate(${item.angle}rad)`,
              zIndex: 10,
            }}
          >
            <Icon 
              className={item.color} 
              style={{ fontSize: `${radius * 1.5}px` }} 
            />
          </div>
        );
      })}
    </div>
  );
};

export default TechPhysics;