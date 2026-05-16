"use client";

export default function Footer() {
  const scrollToTop = () => {
    // This hooks perfectly into the "scroll-smooth" class we added to the HTML tag earlier
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#f8faf9] border-t mt-24 border-slate-200 relative z-[60]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6 flex justify-between items-center">
        
        {/* Copyright Info */}
        <p className="text-slate-500 text-xs md:text-sm font-medium">
          &copy; {new Date().getFullYear()} Fraser W Levack. All rights reserved.
        </p>
        
        {/* Back to Top Button */}
        <button 
          onClick={scrollToTop}
          className="text-slate-400 hover:text-[#549CE6] transition-colors p-2 -mr-2 group flex items-center justify-center"
          aria-label="Back to top"
        >
          {/* The arrow SVG with a slight upward bump on hover */}
          <svg 
            className="w-5 h-5 transform group-hover:-translate-y-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            viewBox="0 0 24 24"
          >
            <path d="M12 19V5"></path>
            <polyline points="5 12 12 5 19 12"></polyline>
          </svg>
        </button>

      </div>
    </footer>
  );
}