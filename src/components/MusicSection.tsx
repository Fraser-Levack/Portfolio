"use client";

import { useEffect, useState } from 'react';

const skyImage = "/content/sky.jpeg";

export default function MusicSection() {
  const [song, setSong] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/spotify')
      .then((res) => res.json())
      .then((data) => {
        setSong(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="h-96 flex items-center justify-center">Loading Vibes...</div>;

  return (
    <section className="relative w-full bg-[#f8faf9] pt-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side: Image Background with Metadata */}
          <div className="relative group overflow-hidden rounded-lg z-[61] order-1 lg:order-1">
            <img
              src={skyImage}
              alt="Sky Background"
              className="w-full h-[300px] md:h-[600px] object-cover transition-transform duration-700"
            />
            <div className="absolute inset-0 flex flex-col gap-6 p-6 md:p-12 justify-start">
              <div className="space-y-2">
                
                <h2 className="text-[#f8faf9] font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-none"
                style={{ fontFamily: "var(--font-unbounded), sans-serif" }}>
                  ON REPEAT
                </h2>
                <h3 className="text-[#f8faf9] font-bold tracking-widest text-sm uppercase">
                  {song?.isPlaying ? "● Currently Spinning" : "○ Last Played"}
                </h3>
              </div>
              
              <div className="flex flex-col gap-1">
                <p className="text-1xl md:text-2xl font-bold text-black line-clamp-1"
                style={{ fontFamily: "var(--font-unbounded), sans-serif" }}>
                  {song?.title} <span className="text-1xl md:text-2xl font-normal"> -  {song?.artist} </span>
                </p>
                
              </div>

              <a 
                href={song?.songUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 w-max bg-black text-white rounded-full font-bold hover:scale-105 transition-transform"
              >
                Listen on Spotify
              </a>
            </div>
          </div>

          {/* Right Side: The Vinyl Visual */}
          <div className="relative flex justify-center items-center order-2 lg:order-2 z-60 w-full py-10 pr-2 md:py-0">
            
            {/* 
              1. OVERALL SIZE BUMP: 
              Increased percentages and bumped max-w from 400px to 450px.
              Increased mr (margin-right) slightly to make room for the further slide-out.
            */}
            <div className="relative w-[65%] md:w-[60%] lg:w-[70%] max-w-[420px] aspect-square mr-[20%] md:mr-[25%]">
              
              {/* 
                2 & 3. DISK SCALE & SLIDE OUT:
                - translate-x-[55%] pulls it further out to the right.
                - scale-[0.97] makes the disk 3% smaller than the sleeve.
              */}
              <div className="absolute inset-0 translate-x-[55%] scale-[0.97] z-[50]">
                
                <div className="w-full h-full bg-[#121212] rounded-full shadow-2xl flex items-center justify-center animate-spin-slow border-[clamp(6px,1vw,12px)] border-[#181818]">
                  {/* Vinyl Grooves Texture */}
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_transparent_30%,_rgba(255,255,255,0.03)_50%,_transparent_70%)] opacity-50"></div>
                  
                  {/* Center Label */}
                  <div className="w-[33%] h-[33%] rounded-full overflow-hidden border-[clamp(2px,0.5vw,4px)] border-[#121212] z-[65] shadow-xl">
                    {song.albumImageUrl && (
                      <img 
                        src={song.albumImageUrl} 
                        alt="Label" 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  
                  {/* The Pin Hole */}
                  <div className="absolute w-[4%] h-[4%] bg-[#f8faf9] rounded-full z-[70] shadow-inner"></div>
                </div>
              </div>

              {/* The Sleeve (Album Art) */}
              <div className="absolute inset-0 z-[60] rounded-sm overflow-hidden bg-white">
                {song.albumImageUrl && (
                  <img 
                    src={song.albumImageUrl} 
                    alt="Album Cover" 
                    className="w-full h-full object-cover aspect-square"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/10 pointer-events-none"></div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}