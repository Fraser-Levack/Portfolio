'use client';

const imgImage3 = "/content/ski.png";

export default function ContentSection() {
  const navItems = [
    { text: 'PROJECTS', url: '#projects' },
    { text: 'LINKED IN', url: 'https://www.linkedin.com/in/fraser-levack' },
    { text: 'GIT HUB', url: 'https://github.com/Fraser-Levack' },
    { text: 'CONTACT', url: '#contact' }
  ];

  return (
    <section className="relative w-full bg-[#f8faf9] pt-12 md:pt-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Grid: 1 col on mobile, 2 cols on Large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Side: Image and "SOFTWARE" */}
          <div className="relative group overflow-hidden rounded-lg z-[61]">
            <img
              src={imgImage3}
              alt="Mountain"
              className="w-full h-[300px] md:h-[600px] object-cover transition-transform duration-700"
            />
            <div className="absolute inset-0 flex items-start p-2">
              <h2 
                // Added flex, flex-wrap, and gap-x-3 to control horizontal spacing safely
                className="flex flex-wrap gap-x-3 md:gap-x-5 text-[#f8faf9] font-black text-[clamp(3rem,6vw,5rem)] tracking-tighter leading-[1.1]"
                style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
              >
                <span>SOFTWARE</span> 
                <span className="lg:hidden">ENGINEER</span>
              </h2>
            </div>
          </div>

          {/* Right Side: Navigation & "ENGINEER" */}
          {/* FIX 1: Added pt-2 to match the p-2 (padding) from the left side's absolute container */}
          <div className="flex flex-col items-start gap-4 pt-2 z-[61]">
            
            {/* FIX 2: Added leading-[1.1] so the text bounding box matches SOFTWARE */}
            <h2 className="hidden lg:block font-black text-[clamp(2rem,6vw,5rem)] tracking-tighter leading-[1.1]"
                style={{ 
                  fontFamily: "var(--font-unbounded), sans-serif",
                  backgroundImage: 'linear-gradient(180deg, #549CE6 0%, #67B1EE 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: 'cover'
                }}>
              ENGINEER
            </h2>

            {/* About description*/}
            <p className=" text-[clamp(1.2rem,5vw,1.5rem)] text-[#549CE6] font-bold tracking-tight">
              Hi, I'm Fraser! I'm a SWE @ NCR Atleos in Scotland.
            </p>

            {/* Nav Links */}
        <nav className="flex flex-col gap-3.5 pb-6 pt-2">
          {navItems.map((item, i) => {
            // 2. Check if the URL starts with '#' (meaning it's an internal page jump)
            const isInternal = item.url.startsWith('#');

            return (
              <a
                key={i}
                href={item.url || "#"}
                // 3. Only use _blank for external links, use _self for page jumps
                target={isInternal ? "_self" : "_blank"}
                rel={isInternal ? "" : "noopener noreferrer"}
                className="font-black text-4xl md:text-6xl lg:text-7xl hover:pl-4 transition-all duration-300 py-2"
                style={{ 
                  fontFamily: "var(--font-unbounded), sans-serif",
                  backgroundImage: 'linear-gradient(180deg, #549CE6 0%, #67B1EE 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: 'cover'
                }}
              >
                {item.text}
              </a>
            );
          })}
        </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
