import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Vastukruti Architects – our story, philosophy, and the team behind our award-winning designs.",
};

const values = [
  { title: "Craftsmanship", desc: "We believe every detail matters. Our designs are executed with precision, care, and a relentless commitment to quality." },
  { title: "Authenticity", desc: "Rooted in Indian architectural heritage, we create spaces that feel genuine — never generic." },
  { title: "Collaboration", desc: "The best outcomes emerge when clients, architects, and craftsmen work as a single team with a shared vision." },
  { title: "Sustainability", desc: "We design for longevity — materials, layouts, and systems chosen to endure beautifully over time." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 pt-20">
      {/* Hero banner */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <Image
          src="/projects/residentail interior 1.2.png"
          alt="About Vastukruti Architects"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-blue-400 font-medium mb-3">Our Story</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white">About Us</h1>
          </div>
        </div>
      </div>

      {/* Story */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-3">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 font-medium mb-4">Who We Are</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Architects who care about more than buildings
            </h2>
            <div className="prose prose-gray dark:prose-invert text-gray-600 dark:text-gray-400 space-y-4 leading-relaxed">
              <p>
                Vastukruti Architects was founded on a singular belief: that great architecture has the power to transform daily life. Grounded in the rich design traditions of India and informed by contemporary practice, we create spaces that are as meaningful as they are beautiful.
              </p>
              <p>
                Our studio works across residential and commercial scales — from intimate apartment interiors to large-format developments — always bringing the same level of care and curiosity to each brief.
              </p>
              <p>
                Every project is a collaboration. We listen first, then design. The result is always a space that feels deeply personal, perfectly functional, and visually extraordinary.
              </p>
            </div>
          </div>
          <div className="md:col-span-2 grid gap-4">
            {[
              { v: "50+", l: "Projects Completed" },
              { v: "8+",  l: "Years of Experience" },
              { v: "2",   l: "Design Disciplines" },
              { v: "100%",l: "Client Satisfaction" },
            ].map((s) => (
              <div key={s.l} className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{s.v}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 font-medium mb-4">What Guides Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Our Values</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div key={v.title} className="bg-white dark:bg-gray-950 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm mb-5">
                  0{i + 1}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">{v.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center bg-white dark:bg-gray-950">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Ready to start a project?
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
          We would love to hear your vision. Get in touch and let us bring it to life.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/contact" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-900/20">
            Get in Touch
          </Link>
          <Link href="/projects" className="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-900 dark:hover:border-gray-400 font-medium py-4 px-8 rounded-full transition-all">
            View Projects
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}