"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-plum-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/brand/vastukruti_logo_light.png"
              alt="Vastukruti Architects"
              width={180}
              height={48}
              style={{ width: "auto" }}
              className="h-10 w-auto object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-gray-400 text-sm mt-1">Sign in to manage your website</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 space-y-4 shadow-2xl">
          {error && (
            <div className="bg-red-900/30 border border-red-800 text-red-300 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}
          <div>
            <label className="block text-xs text-gray-300 uppercase tracking-widest mb-2">Email</label>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-sm"
              placeholder="admin@vastukrutiarchitects.com"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-300 uppercase tracking-widest mb-2">Password</label>
            <input
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-sm"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-terracotta-600 hover:bg-terracotta-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all mt-2 shadow-lg shadow-terracotta-900/30 active:scale-98">
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
        <p className="text-center text-gray-400 text-xs mt-6">
          <a href="/" className="hover:text-terracotta-400 transition-colors">← Back to website</a>
        </p>
      </div>
    </div>
  );
}