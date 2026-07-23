"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: string;
}

interface ProjectEntry {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  year: string;
  location: string;
  area: string;
  coverImage: string;
  scope: string[];
  published: boolean;
  createdAt: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"enquiries" | "projects">("enquiries");
  
  // Enquiries state
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(true);
  const [enquiryFilter, setEnquiryFilter] = useState<string>("all");

  // Projects state
  const [projects, setProjects] = useState<ProjectEntry[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  // New project form state
  const [newProject, setNewProject] = useState({
    title: "",
    slug: "",
    category: "Interior",
    description: "",
    year: "2024",
    location: "India",
    area: "1,500 sq ft",
    coverImage: "/projects/residentail interior 1.2.png",
    scope: "Space Planning, Interior Design",
  });
  const [savingProject, setSavingProject] = useState(false);

  // Auth redirect check
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  // Fetch enquiries
  const fetchEnquiries = async () => {
    setLoadingEnquiries(true);
    try {
      const res = await fetch("/api/enquiry");
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data);
      }
    } catch (e) {
      console.error("Failed to load enquiries", e);
    } finally {
      setLoadingEnquiries(false);
    }
  };

  // Fetch projects
  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (e) {
      console.error("Failed to load projects", e);
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchEnquiries();
      fetchProjects();
    }
  }, [status]);

  // Update enquiry status
  const updateEnquiryStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/enquiry/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus as Enquiry["status"] } : e))
        );
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  // Delete enquiry
  const deleteEnquiry = async (id: number) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const res = await fetch(`/api/enquiry/${id}`, { method: "DELETE" });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete enquiry", err);
    }
  };

  // Handle Add Project
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProject(true);
    try {
      const payload = {
        ...newProject,
        scope: newProject.scope.split(",").map((s) => s.trim()),
      };
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setShowAddProjectModal(false);
        setNewProject({
          title: "",
          slug: "",
          category: "Interior",
          description: "",
          year: "2024",
          location: "India",
          area: "1,500 sq ft",
          coverImage: "/projects/residentail interior 1.2.png",
          scope: "Space Planning, Interior Design",
        });
        fetchProjects();
      }
    } catch (err) {
      console.error("Failed to create project", err);
    } finally {
      setSavingProject(false);
    }
  };

  // Toggle project publish
  const toggleProjectPublished = async (id: number, currentPublished: boolean) => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !currentPublished }),
      });
      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, published: !currentPublished } : p))
        );
      }
    } catch (err) {
      console.error("Failed to toggle publish", err);
    }
  };

  // Delete project
  const deleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete project", err);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500" />
      </div>
    );
  }

  if (!session) return null;

  const filteredEnquiries = enquiryFilter === "all"
    ? enquiries
    : enquiries.filter((e) => e.status === enquiryFilter);

  const newCount = enquiries.filter((e) => e.status === "new").length;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      {/* Top Bar */}
      <header className="border-b border-gray-800 bg-gray-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/brand/vastukruti%20logo.jpeg" alt="Logo" width={36} height={36} className="rounded-full" />
          <span className="font-bold text-lg text-white">Vastukruti Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" target="_blank" className="text-xs text-gray-400 hover:text-white transition-colors">
            View Live Site ↗
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="text-xs bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 font-medium px-4 py-2 rounded-xl transition-all"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl w-full mx-auto px-6 py-8 flex-1">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-xs text-gray-400 uppercase tracking-widest">Total Enquiries</p>
            <div className="text-3xl font-bold text-white mt-2">{enquiries.length}</div>
            {newCount > 0 && (
              <span className="inline-block mt-2 text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2.5 py-0.5 rounded-full font-medium">
                {newCount} New
              </span>
            )}
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-xs text-gray-400 uppercase tracking-widest">Database Projects</p>
            <div className="text-3xl font-bold text-white mt-2">{projects.length}</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-xs text-gray-400 uppercase tracking-widest">Logged In As</p>
            <div className="text-sm font-semibold text-white mt-2">{session.user?.email}</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 border-b border-gray-800 mb-8">
          <button
            onClick={() => setActiveTab("enquiries")}
            className={`pb-4 text-sm font-semibold transition-all relative ${
              activeTab === "enquiries"
                ? "text-blue-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Enquiries Management ({enquiries.length})
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`pb-4 text-sm font-semibold transition-all relative ${
              activeTab === "projects"
                ? "text-blue-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Project Management ({projects.length})
          </button>
        </div>

        {/* TAB 1: ENQUIRIES */}
        {activeTab === "enquiries" && (
          <div>
            {/* Filter Sub-bar */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {["all", "new", "read", "replied"].map((f) => (
                <button
                  key={f}
                  onClick={() => setEnquiryFilter(f)}
                  className={`capitalize px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    enquiryFilter === f
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-gray-900 border-gray-800 text-gray-400 hover:text-white"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {loadingEnquiries ? (
              <div className="text-center py-12 text-gray-500">Loading enquiries...</div>
            ) : filteredEnquiries.length === 0 ? (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center text-gray-400">
                No enquiries found.
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredEnquiries.map((e) => (
                  <div
                    key={e.id}
                    className={`bg-gray-900 border rounded-2xl p-6 transition-all ${
                      e.status === "new"
                        ? "border-blue-500/50 bg-blue-950/10"
                        : "border-gray-800 opacity-90"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-bold text-white text-lg">{e.name}</h3>
                          <span
                            className={`text-xs px-2.5 py-0.5 rounded-full font-medium capitalize ${
                              e.status === "new"
                                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                : e.status === "replied"
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : "bg-gray-800 text-gray-400"
                            }`}
                          >
                            {e.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mt-1">
                          <span>📧 {e.email}</span>
                          {e.phone && <span>📞 {e.phone}</span>}
                          <span>📅 {new Date(e.createdAt).toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Action Dropdown / Controls */}
                      <div className="flex items-center gap-2">
                        <select
                          value={e.status}
                          onChange={(evt) => updateEnquiryStatus(e.id, evt.target.value)}
                          className="bg-gray-800 border border-gray-700 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="new">Mark New</option>
                          <option value="read">Mark Read</option>
                          <option value="replied">Mark Replied</option>
                        </select>

                        <button
                          onClick={() => deleteEnquiry(e.id)}
                          className="text-xs bg-red-950/40 border border-red-800/60 hover:bg-red-900 text-red-400 px-3 py-2 rounded-xl transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-950/60 border border-gray-800/80 rounded-xl p-4 text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {e.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PROJECTS MANAGEMENT */}
        {activeTab === "projects" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Project Entries</h2>
              <button
                onClick={() => setShowAddProjectModal(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-2.5 px-5 rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2"
              >
                <span>+</span> Add New Project
              </button>
            </div>

            {loadingProjects ? (
              <div className="text-center py-12 text-gray-500">Loading projects...</div>
            ) : projects.length === 0 ? (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center text-gray-400">
                No database projects yet. Add one above!
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((p) => (
                  <div key={p.id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden flex flex-col">
                    <div className="relative aspect-[4/3] bg-gray-950">
                      <Image src={p.coverImage} alt={p.title} fill className="object-cover" />
                      <div className="absolute top-3 right-3 flex gap-2">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${p.published ? "bg-green-500/80 text-white" : "bg-gray-800/80 text-gray-300"}`}>
                          {p.published ? "Published" : "Draft"}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-xs text-blue-400 uppercase tracking-widest font-semibold">{p.category}</span>
                        <h3 className="font-bold text-white text-base mt-1">{p.title}</h3>
                        <p className="text-xs text-gray-400 mt-1">{p.location} &bull; {p.year}</p>
                        <p className="text-xs text-gray-300 mt-2 line-clamp-2">{p.description}</p>
                      </div>
                      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-800">
                        <button
                          onClick={() => toggleProjectPublished(p.id, p.published)}
                          className="flex-1 bg-gray-800 hover:bg-gray-700 text-xs text-gray-300 py-2 rounded-xl transition-all"
                        >
                          {p.published ? "Unpublish" : "Publish"}
                        </button>
                        <button
                          onClick={() => deleteProject(p.id)}
                          className="bg-red-950/50 hover:bg-red-900 border border-red-800/80 text-red-400 text-xs px-3 py-2 rounded-xl transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Project Modal */}
      {showAddProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Add New Project Entry</h3>
              <button onClick={() => setShowAddProjectModal(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1">Title *</label>
                <input
                  type="text" required value={newProject.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                    setNewProject({ ...newProject, title, slug });
                  }}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Modern Villa Interior"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1">Slug *</label>
                <input
                  type="text" required value={newProject.slug}
                  onChange={(e) => setNewProject({ ...newProject, slug: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1">Category</label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="Interior">Interior</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1">Year</label>
                  <input
                    type="text" value={newProject.year}
                    onChange={(e) => setNewProject({ ...newProject, year: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1">Location</label>
                  <input
                    type="text" value={newProject.location}
                    onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1">Area</label>
                  <input
                    type="text" value={newProject.area}
                    onChange={(e) => setNewProject({ ...newProject, area: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1">Cover Image Path *</label>
                <input
                  type="text" required value={newProject.coverImage}
                  onChange={(e) => setNewProject({ ...newProject, coverImage: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder="/projects/residentail project 2.jpg"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1">Description *</label>
                <textarea
                  rows={3} required value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1">Scope Tags (comma-separated)</label>
                <input
                  type="text" value={newProject.scope}
                  onChange={(e) => setNewProject({ ...newProject, scope: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Interior Design, Space Planning, Lighting"
                />
              </div>
              <div className="flex gap-3 pt-4 border-t border-gray-800">
                <button
                  type="button" onClick={() => setShowAddProjectModal(false)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-semibold py-3 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit" disabled={savingProject}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-900/30"
                >
                  {savingProject ? "Saving..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}