import MountainLandscape from "@/components/MountainLandscape";
import ContentSection from "@/components/ContentSection";
import TechSection from "@/components/TechSection";
import ProjectsSection from "@/components/ProjectsSection";
import MusicSection from "@/components/MusicSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main>
      <MountainLandscape />
      <ContentSection />
      <TechSection />
      <ProjectsSection />
      <MusicSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
