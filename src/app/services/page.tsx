import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore the full range of architectural and interior design services offered by Vastukruti Architects.",
};

const services = [
  {
    title: "Residential Design",
    subtitle: "Your home, reimagined",
    desc: "From concept to completion, we design homes that reflect your personality and lifestyle. Every detail — from spatial planning to material selection — is considered with care. We work with you at every stage to ensure the final result exceeds expectations.",
    features: ["Site Analysis", "Space Planning", "3D Visualisation", "Material & Finish Specification", "Construction Oversight", "Post-Completion Support"],
    img: "/projects/residentail interior 1.2.png",
    imgAlt: "Residential interior design",
  },
  {
    title: "Commercial Spaces",
    subtitle: "Spaces that mean business",
    desc: "We design workplaces, retail environments, and hospitality spaces that drive results. Our commercial projects balance brand identity, operational efficiency, and the human experience of the space.",
    features: ["Brand Alignment", "Workflow Optimisation", "Ergonomic Planning", "Lighting Design", "Signage & Wayfinding", "Phased Implementation"],
    img: "/projects/residentail project 2.jpg",
    imgAlt: "Commercial architecture",
  },
  {
    title: "Interior Styling",
    subtitle: "The art of the detail",
    desc: "For spaces that need a refresh rather than a rebuild, our interior styling service brings cohesion and beauty through furniture selection, colour consulting, art curation, and accessorising.",
    features: ["Colour Consultation", "Furniture Selection", "Art & Accessory Curation", "Soft Furnishings", "Declutter & Reorganise", "Photography Ready"],
    img: "/projects/residentail interior 1.6.jpg",
    imgAlt: "Interior styling",
  },
  {
    title: "Architecture & Structure",
    subtitle: "Buildings that endure",
    desc: "Our architectural services cover everything from initial feasibility to final completion — including structural design, regulatory approvals, and project management throughout the build.",
    features: ["Feasibility Studies", "Architectural Drawings", "Structural Coordination", "Regulatory Approvals", "Contractor Management", "Quality Assurance"],
    img: "/projects/residentail project 2.1.jpg",
    imgAlt: "Architecture and structure",
  },
];

export default function ServicesPage() {
  return (
    <>
      <main className="min-h-screen bg-white dark:bg-gray-950 pt-20">
        {/* Banner */}
        <div className="bg-gray-950 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-blue-400 font-medium mb-3">What We Offer</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white">Our Services</h1>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
            From concept sketches to completed spaces, we offer a full range of architectural and interior design services.
          </p>
        </div>

        {/* Services list */}
        <div className="max-w-6xl mx-auto px-6 py-20 space-y-24">
          {services.map((s, i) => (
            <div key={s.title} className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "md:grid-flow-col-dense" : ""}`}>
              <div className={i % 2 === 1 ? "md:col-start-2" : ""}>
                <p className="text-sm uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 font-medium mb-2">{s.subtitle}</p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-5">{s.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{s.desc}</p>
                <ul className="grid grid-cols-2 gap-2 mb-8">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-full transition-all hover:scale-105">
                  Get a Quote
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden ${i % 2 === 1 ? "md:col-start-1" : ""}`}>
                <Image src={s.img} alt={s.imgAlt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gray-950 py-20 px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Not sure where to start?</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">Every project starts with a conversation. Get in touch and we will help you figure out what you need.</p>
          <Link href="/contact" className="inline-block bg-white hover:bg-gray-100 text-gray-900 font-semibold py-4 px-8 rounded-full transition-all hover:scale-105">
            Start a Conversation
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}