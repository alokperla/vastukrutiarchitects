"use client";

import { useState } from "react";
import Footer from "@/components/Footer";

export default function ContactPage() {
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

  const info = [
    {
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      label: "Email",
      value: "vastukrutiarchitects@gmail.com",
      href: "mailto:vastukrutiarchitects@gmail.com",
    },
    {
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
      label: "Location",
      value: "India",
      href: null,
    },
    {
      icon: "M4 6h16M4 12h16M4 18h7",
      label: "Instagram",
      value: "@vastu_kruti24",
      href: "https://www.instagram.com/vastu_kruti24",
    },
  ];

  return (
    <>
      <main className="min-h-screen bg-white dark:bg-gray-950 pt-20">
        <div className="bg-gray-950 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-blue-400 font-medium mb-3">Reach Out</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white">Contact Us</h1>
          <p className="text-gray-400 mt-4 max-w-md mx-auto text-sm">Have a project in mind? We would love to hear about it.</p>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-5 gap-16">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Get in Touch</h2>
            <div className="flex flex-col gap-8 mb-12">
              {info.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-gray-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-gray-800 dark:text-gray-200 font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                We typically respond within <strong className="text-gray-700 dark:text-gray-300">24-48 hours</strong>. For urgent enquiries, reach us on Instagram.
              </p>
            </div>
          </div>

          <div className="md:col-span-3">
            {sent ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Message Sent!</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8">Thank you for reaching out. We will be in touch shortly.</p>
                <button onClick={() => setSent(false)} className="text-blue-600 dark:text-blue-400 font-medium hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-6">
                {error && <div className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-950/50 p-4 rounded-xl border border-red-200 dark:border-red-900">{error}</div>}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Name *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your full name"
                      className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Email *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com"
                      className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Phone</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 00000 00000"
                    className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Message *</label>
                  <textarea name="message" rows={6} value={form.message} onChange={handleChange} required placeholder="Tell us about your project, timeline, and any specific requirements..."
                    className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm resize-none" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-4 rounded-xl transition-all hover:scale-[1.01] shadow-lg shadow-blue-900/20 text-base">
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}