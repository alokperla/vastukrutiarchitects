"use client";

const steps = [
  {
    number: "01",
    title: "Discovery",
    desc: "We start by listening. A deep consultation to understand your vision, lifestyle, needs, and aesthetic preferences.",
  },
  {
    number: "02",
    title: "Concept Design",
    desc: "Our team translates your brief into sketches, mood boards, and spatial plans — exploring ideas before committing to a direction.",
  },
  {
    number: "03",
    title: "Design Development",
    desc: "Selected concepts are refined into detailed drawings, 3D visualisations, and material specifications.",
  },
  {
    number: "04",
    title: "Execution",
    desc: "We oversee every phase of construction and fit-out, ensuring craftsmanship matches the design intent, on time and on budget.",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 px-6 bg-plum-950 relative overflow-hidden">
      {/* subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "linear-gradient(#ffffff 1px,transparent 1px),linear-gradient(90deg,#ffffff 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-terracotta-400 font-semibold mb-3">How We Work</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Our Process</h2>
        </div>

        <div className="grid gap-0 md:grid-cols-4 relative">
          {/* connector line */}
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-terracotta-600/50 to-transparent" />

          {steps.map((s) => (
            <div key={s.number} className="flex flex-col items-center text-center p-6 relative">
              <div className="w-20 h-20 rounded-full bg-terracotta-600/20 border border-terracotta-500/50 flex items-center justify-center mb-6 relative z-10 shadow-lg shadow-terracotta-950/50">
                <span className="text-terracotta-400 font-bold text-lg tracking-wider">{s.number}</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-3">{s.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}