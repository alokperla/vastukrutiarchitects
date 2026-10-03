import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import ProjectsPreview from "@/components/ProjectsPreview";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { Project } from "@/lib/projects";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Vastukruti Architects – Architecture & Interior Design",
  description: "Explore the architectural portfolio of Vastukruti Architects. Residential and commercial design across India.",
};

export default async function Home() {
  let featuredProjects: Project[] = [];

  try {
    const dbFeatured = await prisma.projectEntry.findMany({
      where: {
        published: true,
        isFeatured: true,
      },
      orderBy: { createdAt: "desc" },
    });

    if (dbFeatured.length > 0) {
      featuredProjects = dbFeatured.map((p) => ({
        slug: p.slug,
        src: p.coverImage,
        gallery: p.gallery && p.gallery.length > 0 ? p.gallery : [p.coverImage],
        title: p.title,
        category: p.category,
        desc: p.description,
        year: p.year,
        location: p.location,
        area: p.area,
        scope: p.scope || [],
        coverCaption: p.coverCaption || "",
        videoUrl: p.videoUrl || "",
        isFeatured: p.isFeatured,
      }));
    } else {
      // Fallback only to published DB projects added by the admin
      const anyDbProjects = await prisma.projectEntry.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
        take: 6,
      });

      featuredProjects = anyDbProjects.map((p) => ({
        slug: p.slug,
        src: p.coverImage,
        gallery: p.gallery && p.gallery.length > 0 ? p.gallery : [p.coverImage],
        title: p.title,
        category: p.category,
        desc: p.description,
        year: p.year,
        location: p.location,
        area: p.area,
        scope: p.scope || [],
        coverCaption: p.coverCaption || "",
        videoUrl: p.videoUrl || "",
        isFeatured: p.isFeatured,
      }));
    }
  } catch (err) {
    console.error("Error loading featured projects for homepage:", err);
  }

  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <ProcessSection />
      <ProjectsPreview initialProjects={featuredProjects} />
      <TestimonialsSection />
      <ContactCTA />
      <Footer />
    </>
  );
}