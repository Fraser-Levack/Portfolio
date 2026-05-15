
const glenImage = "/content/Glen.jpeg";

export default function ProjectsSection() {

return (
<section className="relative w-full bg-[#f8faf9] py-12 md:py-4 z-[60]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Grid: 1 col on mobile, 2 cols on Large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side: Image and "SOFTWARE" */}
          <div className="relative group overflow-hidden rounded-lg z-[61]">
            <img
              src={glenImage}
              alt="Mountain"
              className="w-full h-[300px] md:h-[600px] object-cover transition-transform duration-700"
            />
            <div className="absolute inset-0 flex items-start p-2">
              <h2 className="text-[#f8faf9] font-black text-[clamp(3rem,6vw,6rem)] tracking-tighter"
              style={{ fontFamily: "var(--font-unbounded), sans-serif" }}>
                PROJECTS
              </h2>
            </div>
          </div>
          <div className="flex flex-col gap-3">
          </div>
        </div>
      </div>
    </section>
  );
}