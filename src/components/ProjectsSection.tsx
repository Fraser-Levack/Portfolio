"use client";

import ProjectCard from "./ProjectCard";

const glenImage = "/content/Glen.jpeg";
// Placeholder images using ones you already have
const proj1 = "/content/IronSmithLogo.png"; 
const proj2 = "/content/PrismGameLogo.png";
const proj3 = "/content/designfordisplacement.png";

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative w-full bg-[#f8faf9] pt-12 md:pt-24 z-[60]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* The Grid: 1 col on mobile, 2 cols on Large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* ITEM 1: The Title Block */}
          <div className="relative group overflow-hidden rounded-lg z-[61] aspect-square w-full">
            <img
              src={glenImage}
              alt="Mountain"
              className="w-full h-full object-cover transition-transform duration-700"
            />
            {/* Using the same padding logic you applied to the Software section */}
            <div className="absolute inset-0 flex items-start p-2 md:p-6">
              <h2 className="text-[#f8faf9] font-black text-[clamp(3rem,6vw,5rem)] tracking-tighter leading-[1.1]"
                  style={{ fontFamily: "var(--font-unbounded), sans-serif" }}>
                PROJECTS
              </h2>
            </div>
          </div>

          {/* ITEM 2: First Project */}
          <ProjectCard 
            title="Iron Smith" 
            description="A Terminal-based 3D modeling scripting language. 
            It allows you to build complex 3D shapes using code (Constructive Solid Geometry) 
            and view the results instantly via a custom GPU-accelerated raymarching engine. 
            Written in both Rust and Haskell. Current Work in progress."
            imageUrl={proj1}
            githubUrl="https://github.com/Fraser-Levack/IronSmith"
          />

          {/* ITEM 3: Second Project */}
          <ProjectCard 
            title="Prism Games" 
            description="PRISM Games is an interactive, 
            web-based educational platform designed to teach 
            the principles of probabilistic model checking and formal verification. 
            Built with React 19, TypeScript, Vite, and Three.js, the project abstracts 
            complex mathematical structures (like Labelled Transition Systems and Markov Decision Processes) 
            into intuitive 3D isometric puzzles."
            imageUrl={proj2}
            githubUrl="https://github.com/Fraser-Levack/PRISM-Games"
            externalUrl="https://prism-games.vercel.app/"
          />

          {/* ITEM 4: Third Project */}
          <ProjectCard 
            title="Design for Displacement" 
            titleColor="text-[#4b4b4b]"
            description="A modern stylistic website, with in built Content Management System (CMS). Made using
                        Typescript  and React with a real time
                        database management system using Firebase and Cloudinary for
                        images and other media."
            imageUrl={proj3}
            externalUrl="https://designfordisplacement.info/"
          />

        </div>
      </div>
    </section>
  );
}