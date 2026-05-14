import MountainLandscape from "@/components/MountainLandscape";
import ContentSection from "@/components/ContentSection";
import TechSection from "@/components/TechSection";
import ProjectsSection from "@/components/ProjectsSection";
import MusicSection from "@/components/MusicSection";

export default function Home() {
  return (
    <main>
      <MountainLandscape />
      <ContentSection />
      <TechSection />
      <ProjectsSection />
      <MusicSection />
    </main>
  );
}
