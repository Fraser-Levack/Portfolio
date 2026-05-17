"use client";

// Swap this with whichever image you want to use for the contact square!
const contactImage = "/content/surf.jpg"; 

export default function ContactSection() {
  const contactLinks = [
    { text: 'EMAIL', url: 'mailto:flevack28@gmail.com', external: false },
    { text: 'LINKEDIN', url: 'https://www.linkedin.com/in/fraser-levack', external: true },
    { text: 'RESUME', url: '/Fraser_W_Levack_CV_2026.pdf', external: true }
  ];

  return (
    // Added id="contact" so you can link directly to this section if needed
    <section id="contact" className="relative w-full bg-[#f8faf9] pt-24 overflow-hidden z-[60]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* The Grid: 1 col on mobile, 2 cols on Large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side: The "CONTACT" Square */}
          <div className="relative group overflow-hidden rounded-lg z-[61] aspect-square w-full">
            <img
              src={contactImage}
              alt="Contact background"
              className="w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 flex items-start p-2 md:p-6 z-10">
              <h2 className="text-[#f8faf9] font-black text-[clamp(3rem,6vw,6rem)] tracking-tighter leading-[1.1]"
                  style={{ fontFamily: "var(--font-unbounded), sans-serif" }}>
                CONTACT
              </h2>
            </div>
          </div>

          {/* Right Side: Links */}
          <div className="flex flex-col items-start gap-8 pt-2 md:pl-8">

            {/* About description*/}
            <p className=" text-[clamp(1.2rem,5vw,1.5rem)] text-[#549CE6] font-bold tracking-tight">
              I'm always open to new colaborations and opportunities, so feel free to reach out! Check out my resume for a more detailed view of my experiance too.
            </p>

            <nav className="flex flex-col gap-4">
              {contactLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  // mailto: links should be _self so they don't leave a blank tab open
                  target={link.external ? "_blank" : "_self"}
                  rel={link.external ? "noopener noreferrer" : ""}
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
                  {link.text}
                  {/* The hover arrow effect */}
                  <span className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#549CE6]">
                    ↗
                  </span>
                </a>
              ))}
            </nav>

          </div>
        </div>
      </div>
    </section>
  );
}