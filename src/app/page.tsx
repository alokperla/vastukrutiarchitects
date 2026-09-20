import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import ProjectsPreview from "@/components/ProjectsPreview";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Vastukruti Architects – Architecture & Interior Design",
  description: "Explore the architectural portfolio of Vastukruti Architects. Residential and commercial design across India.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <ProcessSection />
      <ProjectsPreview />
      <TestimonialsSection />
      <ContactCTA />
      <Footer />
    </>
  );
}