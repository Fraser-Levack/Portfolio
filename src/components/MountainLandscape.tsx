"use client";

import { useEffect, useRef , useState} from "react";
import SnowOverlay from "./SnowOverlay";

const imgZLevel1 = "/mountainLandscape/Z_level_1.svg";
const imgZLevel2 = "/mountainLandscape/Z_level_2.svg";
const imgZLevel3 = "/mountainLandscape/Z_level_3.svg";
const imgZLevel4 = "/mountainLandscape/Z_level_4.svg";
const imgZLevel5 = "/mountainLandscape/Z_level_5.svg";
const imgZLevel6 = "/mountainLandscape/Z_level_6.svg";
const imgZLevel7 = "/mountainLandscape/Z_level_7.svg";
const imgZLevel8 = "/mountainLandscape/Z_level_8.svg";
// Ensure this path matches your file structure exactly
const imgTitle = "/mountainLandscape/FRASER W LEVACK.svg";

export default function MountainLandscape() {
  // 1. Create Refs
  const refLayer1 = useRef<HTMLDivElement>(null);
  const refLayer2 = useRef<HTMLDivElement>(null);
  const refLayer3 = useRef<HTMLDivElement>(null);
  const refTitle = useRef<HTMLDivElement>(null); // NEW: Ref for the Title
  const refLayer4 = useRef<HTMLDivElement>(null);
  const refLayer5 = useRef<HTMLDivElement>(null);
  const refLayer6 = useRef<HTMLDivElement>(null);
  const refLayer7 = useRef<HTMLDivElement>(null);

  const [showSnow, setShowSnow] = useState(false);

  useEffect(() => {
    // Track where the user actually is (target) vs where the animation is (current)
    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;
    let animationFrameId: number;

    // 1. Scroll event ONLY updates the target destination
    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    const handleResize = () => {
          setShowSnow(window.innerWidth >= 768);
        };
    
    handleResize(); // Check immediately on mount
    window.addEventListener("resize", handleResize, { passive: true });

    // 2. The render loop constantly eases the current position toward the target
    const renderLoop = () => {
      // Check if we are on a mobile device (under 768px)
      // Mobile gets a snappier 0.18, Desktop keeps the floaty 0.08
      const ease = window.innerWidth < 768 ? 0.18 : 0.08; 
      
      currentScrollY += (targetScrollY - currentScrollY) * ease;
      const y = currentScrollY;

      if (refLayer1.current) refLayer1.current.style.transform = `translate3d(0, ${y * 0.6}px, 0)`;
      if (refLayer2.current) refLayer2.current.style.transform = `translate3d(0, ${y * 0.55}px, 0)`;
      if (refLayer3.current) refLayer3.current.style.transform = `translate3d(0, ${y * 0.5}px, 0)`;
      
      if (refTitle.current) refTitle.current.style.transform = `translate3d(0, ${y * 0.85}px, 0)`;

      if (refLayer4.current) refLayer4.current.style.transform = `translate3d(0, ${y * 0.4}px, 0)`;
      if (refLayer5.current) refLayer5.current.style.transform = `translate3d(0, ${y * 0.3}px, 0)`;
      if (refLayer6.current) refLayer6.current.style.transform = `translate3d(0, ${y * 0.2}px, 0)`;
      if (refLayer7.current) refLayer7.current.style.transform = `translate3d(0, ${y * 0.15}px, 0)`;

      // Loop to next frame
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    renderLoop(); // Kick off the loop

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize); // Clean up the new listener
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const containerClasses = "w-full min-w-full h-full md:h-auto md:aspect-[1728/1117] translate-y-[15.2%]";
  const layerClasses = "absolute left-[-0.1%] w-[99.9%] will-change-transform ease-out";

  return (
    <div className="bg-gradient-to-b from-[#529AE4] to-[79.327%] to-white via-[#99D2F0] via-[67.788%] relative h-[60vh] md:h-screen w-screen overflow-hidden flex items-end justify-center">
      
      {/* Conditionally render the snow ONLY on desktop */}
      {showSnow && (
      <div className="fixed top-0 left-0 w-screen h-screen pointer-events-none max-md:z-[100] md:z-[60]">
         <SnowOverlay />
      </div>
      )}

      {/* BACKGROUND GROUP */}
      <div className={`relative z-0 ${containerClasses}`}>
        
        {/* Layer 1 */}
        <div ref={refLayer1} className={`${layerClasses} h-[66.3%] top-[18.1%] z-0`}>
          <img alt="" className="block h-full w-full object-cover object-bottom" src={imgZLevel1} />
        </div>

        {/* Layer 2 */}
        <div ref={refLayer2} className={`${layerClasses} h-[81.6%] top-[2.9%] w-[100%] z-10`}>
          <img alt="" className="block h-full w-full object-cover object-bottom" src={imgZLevel2} />
        </div>

        {/* Layer 3 */}
        <div ref={refLayer3} className={`${layerClasses} h-[80.5%] top-[4.1%] z-20`}>
          <img alt="" className="block h-full w-full object-cover object-bottom" src={imgZLevel3} />
        </div>

        {/* --- NEW TITLE LAYER --- */}
        <div 
            ref={refTitle} 
            // Optional: You can tweak the 'top' percentage if making it wider pushes it too far down
            className={`${layerClasses} z-[25] flex justify-center items-start top-[5%] md:top-[7%] h-auto`}
        >
            <img 
              alt="Fraser W Levack" 
              // Mobile: 98% width | Desktop: 85% width | Large Desktop: 75% width
              className="w-[98%] md:w-[85%] lg:w-[75%] object-contain" 
              src={imgTitle} 
            />
        </div>
        {/* ----------------------- */}

        {/* Layer 4 */}
        <div ref={refLayer4} className={`${layerClasses} h-[70.9%] left-0 top-[13.6%] w-[99.8%] z-30`}>
          <img alt="" className="block h-full w-full object-cover object-bottom" src={imgZLevel4} />
        </div>

        {/* Layer 5 */}
        <div ref={refLayer5} className={`${layerClasses} h-[54.4%] left-[21.2%] top-[30%] w-[78.8%] z-40`}>
          <img alt="" className="block h-full w-full object-cover object-bottom" src={imgZLevel5} />
        </div>

        {/* Layer 6 */}
        <div ref={refLayer6} className={`${layerClasses} h-[43.9%] left-[35.5%] top-[40.6%] w-[64.5%] z-50`}>
          <img alt="" className="block h-full w-full object-cover object-bottom" src={imgZLevel6} />
        </div>

        {/* Layer 7 */}
        <div ref={refLayer7} className={`${layerClasses} h-[33.1%] top-[51.7%] w-[100%] z-[55]`}>
          <img alt="" className="block h-full w-full object-cover object-bottom" src={imgZLevel7} />
        </div>
      </div>

      {/* FOREGROUND GROUP */}
      <div className={`absolute bottom-0 z-[70] pointer-events-none ${containerClasses}`}>
        <div className="absolute h-[75.5%] left-0 top-[9.4%] w-full">
          <img alt="" className="block h-full w-full object-cover object-bottom" src={imgZLevel8} />
        </div>
      </div>

    </div>
  );
}