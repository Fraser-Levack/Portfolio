"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"
import TechOrbit from "@/components/TechOrbit";
import TechPhysics from "./TechPhysics";
import TechGrid from "./TechGrid";

const uni_image = '/content/G_uni.jpeg';
type ViewMode = 'orbit' | 'physics' | 'grid';

const TechSection = () => {
  const [view, setView] = useState<ViewMode>('grid');

  return (
    <section className="relative w-full bg-[#f8faf9] py-12 md:py-4 z-[60]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* The Grid: 1 col on mobile, 2 on lg screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* RIGHT SIDE (Image) - Forced to Top on Mobile */}
          <div className="relative group overflow-hidden rounded-lg order-1 lg:order-2">
            <img 
              src={uni_image} 
              alt="University" 
              className="w-full h-[300px] md:h-[600px] object-cover" 
            />
            <div className="absolute inset-0 flex items-start p-6 pointer-events-none">
              <p 
                className="font-black leading-tight text-[#f8faf9] uppercase text-[clamp(2.5rem,8vw,108px)] tracking-tighter"
                style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
              >
                TECH
              </p>
            </div>
          </div>

          {/* LEFT SIDE (Interactive Content) - Forced to Bottom on Mobile */}
          <div className="relative w-full h-[450px] md:h-[600px] bg-slate-50 rounded-lg overflow-hidden border border-slate-100 shadow-inner order-2 lg:order-1">
            
            {/* --- COMPACT MORPHING SEGMENTED CONTROL --- */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 z-50 flex bg-white/60 backdrop-blur-xl p-1 rounded-full border border-white/20 shadow-lg">
              {(['orbit', 'physics', 'grid'] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setView(mode)}
                  className={`relative px-4 py-1 text-[10px] cursor-pointer font-bold uppercase tracking-widest transition-colors duration-300 ${
                    view === mode ? "text-white" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <span className="relative z-10">{mode}</span>
                  {view === mode && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-slate-900 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Content Area with Fade Transition */}
            <div className="w-full h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={view}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  {view === 'orbit' && (
                    <div className="scale-75 md:scale-100 items-center justify-center w-full h-full flex">
                      <TechOrbit />
                    </div>
                  )}
                  {view === 'physics' && <TechPhysics />}
                  {view === 'grid' && <TechGrid />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default TechSection;