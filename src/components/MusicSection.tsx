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
    <section className="relative w-full bg-[#f8faf9] py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side: Image Background with Metadata */}
          <div className="relative group overflow-hidden rounded-lg z-[61] order-2 lg:order-1">
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
                <h3 className="text-[#1ed760] font-bold tracking-widest text-sm uppercase">
                  {song?.isPlaying ? "● Currently Spinning" : "○ Last Played"}
                </h3>
              </div>
              
              <div className="flex flex-col gap-1">
                <p className="text-1xl md:text-2xl font-bold text-[#f8faf9] line-clamp-1"
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
          <div className="relative flex justify-center items-center order-1 lg:order-1 z-60">
            
            {/* The Record (Slide-out effect) */}
            <div className="absolute left-[35%] md:left-[45%] w-[260px] h-[260px] md:w-[380px] md:h-[380px]">
              <div className="w-full h-full bg-[#121212] rounded-full shadow-2xl flex items-center justify-center animate-spin-slow border-[12px] border-[#181818]">
                {/* Vinyl Grooves Texture */}
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_transparent_30%,_rgba(255,255,255,0.03)_50%,_transparent_70%)] opacity-50"></div>
                
                {/* Center Label */}
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#121212] z-65 shadow-xl">
                  {song.albumImageUrl && (
                    <img 
                      src={song.albumImageUrl} 
                      alt="Label" 
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                
                {/* The Pin Hole */}
                <div className="absolute w-3 h-3 bg-[#f8faf9] rounded-full z-70 shadow-inner"></div>
              </div>
            </div>

            {/* The Sleeve (Album Art) - Stays on top */}
            <div className="relative z-60 mr-[14rem] w-[280px] h-[280px] md:w-[400px] md:h-[400px] shadow-[20px_20px_60px_rgba(0,0,0,0.2)] rounded-sm overflow-hidden bg-white">
              {song.albumImageUrl && (
                <img 
                  src={song.albumImageUrl} 
                  alt="Album Cover" 
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/10 pointer-events-none"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}