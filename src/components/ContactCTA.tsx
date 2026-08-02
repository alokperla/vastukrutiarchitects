"use client";

import { useState } from "react";

export default function ContactCTA() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        const data = await res.json();
        setError(data.error || "Failed to send message. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-plum-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-terracotta-900/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-terracotta-400 font-semibold mb-3">Contact Us</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Let's Build Something{" "}
            <span className="block italic font-light text-terracotta-400">Beautiful Together</span>
          </h2>
          <p className="text-gray-300 leading-relaxed mb-8">
            Whether you have a specific project in mind or simply want to explore the possibilities, our team is ready to listen and bring your vision to life.
          </p>
          <div className="flex flex-col gap-3 text-sm text-gray-300">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-terracotta-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              vastukrutiarchitects@gmail.com
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-terracotta-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              India
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
          {sent ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-xl mb-2">Message Sent!</h3>
              <p className="text-gray-300 text-sm">We will get back to you within 24 hours.</p>
              <button onClick={() => setSent(false)} className="mt-6 text-terracotta-400 text-sm hover:underline">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && <div className="text-red-400 text-xs bg-red-950/50 border border-red-800 p-3 rounded-xl">{error}</div>}
              <div>
                <label className="block text-xs text-gray-300 uppercase tracking-widest mb-2">Name *</label>
                <input
                  type="text" name="name" value={form.name} onChange={handleChange} required
                  placeholder="Your full name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-terracotta-500 transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-300 uppercase tracking-widest mb-2">Email *</label>
                <input
                  type="email" name="email" value={form.email} onChange={handleChange} required
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-terracotta-500 transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-300 uppercase tracking-widest mb-2">Phone</label>
                <input
                  type="tel" name="phone" value={form.phone} onChange={handleChange}
                  placeholder="+91 00000 00000"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-terracotta-500 transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-300 uppercase tracking-widest mb-2">Message *</label>
                <textarea
                  name="message" rows={4} value={form.message} onChange={handleChange} required
                  placeholder="Tell us about your project..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-terracotta-500 transition-colors text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-terracotta-600 hover:bg-terracotta-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-terracotta-900/40 mt-2 active:scale-95"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}