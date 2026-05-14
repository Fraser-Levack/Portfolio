'use client';

const imgImage3 = "/content/ski.png";

export default function ContentSection() {
  const navItems = [
    { text: 'PROJECTS', url: '#' },
    { text: 'LINKED IN', url: 'https://www.linkedin.com/in/fraser-levack' },
    { text: 'GIT HUB', url: 'https://github.com/Fraser-Levack' },
    { text: 'CONTACT', url: '#' }
  ];

  return (
    <section className="relative w-full bg-[#f8faf9] pt-12 md:pt-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Grid: 1 col on mobile, 2 cols on Large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side: Image and "SOFTWARE" */}
          <div className="relative group overflow-hidden rounded-lg z-[61]">
            <img
              src={imgImage3}
              alt="Mountain"
              className="w-full h-[300px] md:h-[600px] object-cover transition-transform duration-700"
            />
            <div className="absolute inset-0 flex items-start p-6">
              <h2 className="text-[#f8faf9] font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter">
                SOFTWARE
              </h2>
            </div>
          </div>

          {/* Right Side: Navigation & "ENGINEER" */}
          <div className="flex flex-col gap-3">
            {/* Engineer Text - Masked (Only visible on LG) */}
            <h2 className="hidden lg:block font-black text-8xl tracking-tighter"
                style={{ 
                  backgroundImage: 'linear-gradient(180deg, #549CE6 0%, #67B1EE 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: 'cover'
                }}>
              ENGINEER
            </h2>

            {/* Nav Links */}
            <nav className="flex flex-col gap-3.5 py-6">
              {navItems.map((item, i) => (
                <a
                  key={i}
                  href={item.url || "#"}
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
              ))}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
