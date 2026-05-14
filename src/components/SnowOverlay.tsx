"use client";

import { useEffect, useRef } from "react";

export default function SnowOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Set canvas size
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener("resize", resize);
    resize(); // Init size

    // Snowflake settings
    const flakeCount = 150; // Adjust for density
    const flakes: { x: number; y: number; r: number; d: number; opacity: number }[] = [];

    // Create flakes
    for (let i = 0; i < flakeCount; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 1, // Radius between 1px and 3px
        d: Math.random() * flakeCount, // Density factor for movement
        opacity: Math.random() * 0.5 + 0.3, // Random opacity
      });
    }

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Gradient for snow (optional, plain white works too)
      ctx.fillStyle = "#F8FAF9";
      ctx.beginPath();

      for (let i = 0; i < flakeCount; i++) {
        const f = flakes[i];

        // Move flake
        f.y += Math.cos(f.d) + 1 + f.r / 2; // Vertical speed based on radius
        f.x += Math.sin(f.d) * 2; // Horizontal drift

        // Reset if off screen
        if (f.x > width + 5 || f.x < -5 || f.y > height) {
          if (i % 3 > 0) {
            // 66% chance to reappear at top
            flakes[i] = { x: Math.random() * width, y: -10, r: f.r, d: f.d, opacity: f.opacity };
          } else {
            // 33% chance to reappear coming from sides (simulates wind)
            if (Math.sin(f.d) > 0) {
              flakes[i] = { x: -5, y: Math.random() * height, r: f.r, d: f.d, opacity: f.opacity };
            } else {
              flakes[i] = { x: width + 5, y: Math.random() * height, r: f.r, d: f.d, opacity: f.opacity };
            }
          }
        }

        // Draw flake
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
      }
      
      ctx.fill();
      requestAnimationFrame(draw);
    };

    const animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-[60]"
    />
  );
}