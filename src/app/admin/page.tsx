"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getYouTubeEmbedUrl } from "@/lib/projects";

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
  coverCaption?: string;
  videoUrl?: string;
  gallery: string[];
  scope: string[];
  published: boolean;
  createdAt: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  photo: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

interface SiteSettings {
  whatsapp: string;
  email: string;
  instagram: string;
  aboutText: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"enquiries" | "projects" | "team" | "settings">("enquiries");
  
  // Enquiries
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(true);
  const [enquiryFilter, setEnquiryFilter] = useState<string>("all");

  // Projects
  const [projects, setProjects] = useState<ProjectEntry[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectEntry | null>(null);

  // Team
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loadingTeam, setLoadingTeam] = useState(true);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  // Settings
  const [settings, setSettings] = useState<SiteSettings>({
    whatsapp: "",
    email: "",
    instagram: "",
    aboutText: "",
  });
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState("");

  // Project Form
  const [formProject, setFormProject] = useState({
    title: "",
    slug: "",
    category: "Interior",
    description: "",
    year: "2024",
    location: "India",
    area: "1,500 sq ft",
    coverImage: "",
    coverCaption: "",
    videoUrl: "",
    gallery: [] as string[],
    scope: "Space Planning, Interior Design",
    published: true,
  });

  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [savingProject, setSavingProject] = useState(false);

  // Team Member Form
  const [formMember, setFormMember] = useState({
    name: "",
    role: "",
    bio: "",
    photo: "",
    order: 0,
  });
  const [uploadingMemberPhoto, setUploadingMemberPhoto] = useState(false);
  const [savingMember, setSavingMember] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status, router]);

  const fetchEnquiries = async () => {
    setLoadingEnquiries(true);
    try {
      const res = await fetch("/api/enquiry");
      if (res.ok) setEnquiries(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingEnquiries(false);
    }
  };

  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const res = await fetch("/api/projects");
      if (res.ok) setProjects(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingProjects(false);
    }
  };

  const fetchTeamMembers = async () => {
    setLoadingTeam(true);
    try {
      const res = await fetch("/api/team");
      if (res.ok) setTeamMembers(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingTeam(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) setSettings(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchEnquiries();
      fetchProjects();
      fetchTeamMembers();
      fetchSettings();
    }
  }, [status]);

  const uploadImageFile = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        return data.url;
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Image upload failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error during image upload.");
    }
    return null;
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploadingCover(true);
    const url = await uploadImageFile(files[0]);
    setUploadingCover(false);
    if (url) {
      setFormProject((prev) => ({ ...prev, coverImage: url }));
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploadingGallery(true);
    const uploadedUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const url = await uploadImageFile(files[i]);
      if (url) uploadedUrls.push(url);
    }
    setUploadingGallery(false);
    if (uploadedUrls.length > 0) {
      setFormProject((prev) => ({ ...prev, gallery: [...prev.gallery, ...uploadedUrls] }));
    }
  };

  const removeGalleryImage = (index: number) => {
    setFormProject((prev) => ({ ...prev, gallery: prev.gallery.filter((_, i) => i !== index) }));
  };

  const openNewProjectModal = () => {
    setEditingProject(null);
    setFormProject({
      title: "",
      slug: "",
      category: "Interior",
      description: "",
      year: "2024",
      location: "India",
      area: "1,500 sq ft",
      coverImage: "",
      coverCaption: "",
      videoUrl: "",
      gallery: [],
      scope: "Space Planning, Interior Design",
      published: true,
    });
    setShowProjectModal(true);
  };

  const openEditProjectModal = (p: ProjectEntry) => {
    setEditingProject(p);
    setFormProject({
      title: p.title,
      slug: p.slug,
      category: p.category,
      description: p.description,
      year: p.year,
      location: p.location,
      area: p.area,
      coverImage: p.coverImage,
      coverCaption: p.coverCaption || "",
      videoUrl: p.videoUrl || "",
      gallery: p.gallery || [],
      scope: (p.scope || []).join(", "),
      published: p.published,
    });
    setShowProjectModal(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formProject.coverImage) {
      alert("Please upload or select a Cover Photo.");
      return;
    }
    setSavingProject(true);
    const payload = {
      ...formProject,
      scope: formProject.scope.split(",").map((s) => s.trim()).filter(Boolean),
    };
    try {
      const url = editingProject ? `/api/projects/${editingProject.id}` : "/api/projects";
      const method = editingProject ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setShowProjectModal(false);
        fetchProjects();
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.error ? JSON.stringify(err.error) : "Failed to save project.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving project.");
    } finally {
      setSavingProject(false);
    }
  };

  const toggleProjectPublished = async (id: number, currentPublished: boolean) => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !currentPublished }),
      });
      if (res.ok) setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, published: !currentPublished } : p)));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Team Member Handlers
  const openNewMemberModal = () => {
    setEditingMember(null);
    setFormMember({
      name: "",
      role: "",
      bio: "",
      photo: "",
      order: teamMembers.length + 1,
    });
    setShowTeamModal(true);
  };

  const openEditMemberModal = (m: TeamMember) => {
    setEditingMember(m);
    setFormMember({
      name: m.name,
      role: m.role,
      bio: m.bio,
      photo: m.photo,
      order: m.order || 0,
    });
    setShowTeamModal(true);
  };

  const handleMemberPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploadingMemberPhoto(true);
    const url = await uploadImageFile(files[0]);
    setUploadingMemberPhoto(false);
    if (url) {
      setFormMember((prev) => ({ ...prev, photo: url }));
    }
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formMember.photo) {
      alert("Please upload a photo for the team member.");
      return;
    }
    setSavingMember(true);
    try {
      const url = editingMember ? `/api/team/${editingMember.id}` : "/api/team";
      const method = editingMember ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formMember,
          order: Number(formMember.order) || 0,
        }),
      });
      if (res.ok) {
        setShowTeamModal(false);
        fetchTeamMembers();
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Failed to save team member.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving team member.");
    } finally {
      setSavingMember(false);
    }
  };

  const deleteTeamMember = async (id: number) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    try {
      const res = await fetch(`/api/team/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTeamMembers((prev) => prev.filter((m) => m.id !== id));
      } else {
        alert("Failed to delete team member.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateEnquiryStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/enquiry/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status: newStatus as Enquiry["status"] } : e)));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteEnquiry = async (id: number) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const res = await fetch(`/api/enquiry/${id}`, { method: "DELETE" });
      if (res.ok) setEnquiries((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsMsg("");
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) setSettingsMsg("Site settings saved successfully!");
    } catch (err) {
      setSettingsMsg("Failed to save settings.");
    } finally {
      setSavingSettings(false);
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

  const filteredEnquiries = enquiryFilter === "all" ? enquiries : enquiries.filter((e) => e.status === enquiryFilter);
  const newCount = enquiries.filter((e) => e.status === "new").length;
  const projectYouTubeEmbed = getYouTubeEmbedUrl(formProject.videoUrl);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      <header className="border-b border-gray-800 bg-gray-900 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Image src="/brand/vastukruti%20logo.jpeg" alt="Logo" width={36} height={36} className="rounded-full object-cover" />
          <span className="font-bold text-lg text-white">Vastukruti Admin CMS</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" target="_blank" className="text-xs text-gray-400 hover:text-white transition-colors">
            View Live Site ↗
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-xs bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 font-medium px-4 py-2 rounded-xl transition-all"
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl w-full mx-auto px-6 py-8 flex-1">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-xs text-gray-400 uppercase tracking-widest">Client Enquiries</p>
            <div className="text-3xl font-bold text-white mt-2">{enquiries.length}</div>
            {newCount > 0 && (
              <span className="inline-block mt-2 text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2.5 py-0.5 rounded-full font-medium">
                {newCount} New Messages
              </span>
            )}
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-xs text-gray-400 uppercase tracking-widest">Database Projects</p>
            <div className="text-3xl font-bold text-white mt-2">{projects.length}</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-xs text-gray-400 uppercase tracking-widest">Firm Team Members</p>
            <div className="text-3xl font-bold text-white mt-2">{teamMembers.length}</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-xs text-gray-400 uppercase tracking-widest">Storage & Media</p>
            <div className="text-sm font-semibold text-green-400 mt-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              Device Upload Ready
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-6 border-b border-gray-800 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("enquiries")}
            className={`pb-4 text-sm font-semibold transition-all relative whitespace-nowrap ${
              activeTab === "enquiries"
                ? "text-blue-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Enquiries ({enquiries.length})
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`pb-4 text-sm font-semibold transition-all relative whitespace-nowrap ${
              activeTab === "projects"
                ? "text-blue-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Projects Management ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab("team")}
            className={`pb-4 text-sm font-semibold transition-all relative whitespace-nowrap ${
              activeTab === "team"
                ? "text-blue-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Firm Team ({teamMembers.length})
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`pb-4 text-sm font-semibold transition-all relative whitespace-nowrap ${
              activeTab === "settings"
                ? "text-blue-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Site Settings
          </button>
        </div>

        {/* ENQUIRIES TAB */}
        {activeTab === "enquiries" && (
          <div>
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
                      e.status === "new" ? "border-blue-500/50 bg-blue-950/10" : "border-gray-800 opacity-90"
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

        {/* PROJECTS TAB */}
        {activeTab === "projects" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Project Entries</h2>
              <button
                onClick={openNewProjectModal}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-2.5 px-5 rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2"
              >
                <span>+</span> Add Project & Upload Photos
              </button>
            </div>

            {loadingProjects ? (
              <div className="text-center py-12 text-gray-500">Loading projects...</div>
            ) : projects.length === 0 ? (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center text-gray-400">
                No database projects yet. Add your first project photo from your PC or Mobile phone!
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
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-blue-400 uppercase tracking-widest font-semibold">{p.category}</span>
                          {p.videoUrl && (
                            <span className="text-[11px] bg-red-950/60 border border-red-800/60 text-red-400 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                              ▶ Video
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-white text-base mt-1">{p.title}</h3>
                        <p className="text-xs text-gray-400 mt-1">{p.location} &bull; {p.year}</p>
                        {p.coverCaption && (
                          <p className="text-xs text-terracotta-400 italic mt-1.5 line-clamp-1">
                            Caption: &ldquo;{p.coverCaption}&rdquo;
                          </p>
                        )}
                        <p className="text-xs text-gray-300 mt-2 line-clamp-2">{p.description}</p>
                      </div>
                      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-800">
                        <button
                          onClick={() => openEditProjectModal(p)}
                          className="flex-1 bg-blue-950/60 hover:bg-blue-900 border border-blue-800/60 text-xs text-blue-300 py-2 rounded-xl transition-all"
                        >
                          Edit
                        </button>
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

        {/* FIRM TEAM TAB */}
        {activeTab === "team" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">Firm Team Members</h2>
                <p className="text-xs text-gray-400 mt-0.5">Manage leadership, architects, and studio team displayed on the /firm page</p>
              </div>
              <button
                onClick={openNewMemberModal}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-2.5 px-5 rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2"
              >
                <span>+</span> Add Team Member
              </button>
            </div>

            {loadingTeam ? (
              <div className="text-center py-12 text-gray-500">Loading team members...</div>
            ) : teamMembers.length === 0 ? (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center text-gray-400">
                No team members found. Click &quot;Add Team Member&quot; to upload member photos and bios!
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((m) => (
                  <div key={m.id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden flex flex-col">
                    <div className="relative w-full aspect-[4/5] bg-gray-950 flex items-center justify-center p-2">
                      <Image
                        src={m.photo}
                        alt={m.name}
                        fill
                        className="object-contain p-2"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                      <span className="absolute top-3 right-3 bg-gray-900/80 backdrop-blur-sm text-gray-300 text-xs px-2 py-0.5 rounded-full border border-gray-700">
                        Order: {m.order ?? 0}
                      </span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-xs text-blue-400 font-semibold tracking-wide uppercase">{m.role}</span>
                        <h3 className="font-bold text-white text-lg mt-0.5">{m.name}</h3>
                        <p className="text-xs text-gray-300 mt-2 line-clamp-3 leading-relaxed">{m.bio}</p>
                      </div>
                      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-800">
                        <button
                          onClick={() => openEditMemberModal(m)}
                          className="flex-1 bg-blue-950/60 hover:bg-blue-900 border border-blue-800/60 text-xs text-blue-300 py-2 rounded-xl transition-all"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTeamMember(m.id)}
                          className="bg-red-950/50 hover:bg-red-900 border border-red-800/80 text-red-400 text-xs px-4 py-2 rounded-xl transition-all"
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

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
          <div className="max-w-2xl bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-6">Global Site Contact & Settings</h2>
            {settingsMsg && (
              <div className="mb-6 p-4 rounded-xl text-sm bg-blue-950/50 border border-blue-800 text-blue-300">
                {settingsMsg}
              </div>
            )}
            <form onSubmit={handleSaveSettings} className="space-y-5">
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-widest mb-2">WhatsApp Phone Number</label>
                <input
                  type="text" value={settings.whatsapp}
                  onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                  placeholder="919100010573"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-widest mb-2">Contact Email</label>
                <input
                  type="email" value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  placeholder="vastukrutiarchitects@gmail.com"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-widest mb-2">Instagram Profile URL</label>
                <input
                  type="text" value={settings.instagram}
                  onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                  placeholder="https://www.instagram.com/vastu_kruti24"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-widest mb-2">About Section Intro</label>
                <textarea
                  rows={4} value={settings.aboutText}
                  onChange={(e) => setSettings({ ...settings, aboutText: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>
              <button
                type="submit" disabled={savingSettings}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-900/30"
              >
                {savingSettings ? "Saving Settings..." : "Save Site Settings"}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* PROJECT MODAL */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">
                {editingProject ? "Edit Project" : "Add Project & Upload Photos"}
              </h3>
              <button onClick={() => setShowProjectModal(false)} className="text-gray-400 hover:text-white text-lg">✕</button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-5">
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1">Project Title *</label>
                <input
                  type="text" required value={formProject.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = editingProject ? formProject.slug : title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                    setFormProject({ ...formProject, title, slug });
                  }}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Luxury Penthouse Villa"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1">Slug URL *</label>
                <input
                  type="text" required value={formProject.slug}
                  onChange={(e) => setFormProject({ ...formProject, slug: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* DEDICATED COVER PHOTO SECTION */}
              <div className="bg-gray-950 border border-gray-800 rounded-2xl p-4 space-y-4">
                <div>
                  <label className="block text-xs text-gray-300 uppercase tracking-widest font-semibold mb-1">
                    📷 Primary Cover Photo * (From PC / Mobile)
                  </label>
                  <p className="text-[11px] text-gray-400 mb-3">
                    Featured as the main project hero visual and thumbnail across portfolio galleries.
                  </p>
                </div>
                
                {formProject.coverImage ? (
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-gray-800 mb-2">
                    <Image src={formProject.coverImage} alt="Cover Preview" fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => setFormProject({ ...formProject, coverImage: "" })}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full px-2.5 py-1 text-xs hover:bg-red-500 shadow-md"
                    >
                      ✕ Remove
                    </button>
                  </div>
                ) : null}

                <div className="flex items-center gap-3">
                  <label className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-md">
                    {uploadingCover ? "Uploading Image..." : "Choose Cover Photo from Device"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      disabled={uploadingCover}
                      className="hidden"
                    />
                  </label>
                </div>
                {uploadingCover && <p className="text-xs text-blue-400">Uploading cover image...</p>}

                {/* COVER PHOTO CAPTION */}
                <div className="pt-2 border-t border-gray-900">
                  <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1.5">
                    Cover Photo Caption / Short Description
                  </label>
                  <input
                    type="text"
                    value={formProject.coverCaption}
                    onChange={(e) => setFormProject({ ...formProject, coverCaption: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                    placeholder="e.g. Living lounge designed with warm teak paneling, double-height glazing, and custom fluted limestone"
                  />
                  <p className="text-[11px] text-gray-500 mt-1">
                    This caption is displayed directly underneath the cover photo on the project detail page.
                  </p>
                </div>
              </div>

              {/* REMAINING GALLERY PHOTOS */}
              <div className="bg-gray-950 border border-gray-800 rounded-2xl p-4">
                <label className="block text-xs text-gray-300 uppercase tracking-widest font-semibold mb-1">
                  🖼️ Photo Gallery (Remaining Project Photos)
                </label>
                <p className="text-[11px] text-gray-400 mb-3">
                  Displayed in an adaptive responsive grid below the cover photo section.
                </p>

                {formProject.gallery.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {formProject.gallery.map((url, i) => (
                      <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-gray-800 group">
                        <Image src={url} alt={`Gallery ${i}`} fill className="object-cover" />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(i)}
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-90 hover:opacity-100"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <label className="cursor-pointer bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all inline-block border border-gray-700">
                  {uploadingGallery ? "Uploading Gallery Images..." : "+ Add Gallery Photos from Device"}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryUpload}
                    disabled={uploadingGallery}
                    className="hidden"
                  />
                </label>
                {uploadingGallery && <p className="text-xs text-blue-400 mt-2">Uploading gallery photos...</p>}
              </div>

              {/* OPTIONAL YOUTUBE VIDEO URL */}
              <div className="bg-gray-950 border border-gray-800 rounded-2xl p-4">
                <label className="block text-xs text-gray-300 uppercase tracking-widest font-semibold mb-1">
                  🎥 Embedded YouTube Video (Optional)
                </label>
                <p className="text-[11px] text-gray-400 mb-2">
                  Paste any YouTube URL (watch, youtu.be, embed, or shorts). It will be embedded responsively on the project detail page.
                </p>
                <input
                  type="text"
                  value={formProject.videoUrl}
                  onChange={(e) => setFormProject({ ...formProject, videoUrl: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                />
                {formProject.videoUrl && (
                  <div className="mt-2 text-xs">
                    {projectYouTubeEmbed ? (
                      <span className="text-green-400 font-medium">✓ Valid YouTube link detected (ready to embed)</span>
                    ) : (
                      <span className="text-yellow-400 font-medium">⚠ Please check the link format (e.g. https://www.youtube.com/watch?v=...)</span>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1">Category</label>
                  <select
                    value={formProject.category}
                    onChange={(e) => setFormProject({ ...formProject, category: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="Interior">Interior</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Commercial">Commercial</option>
                    <option value="3D visualization">3D visualization</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1">Year</label>
                  <input
                    type="text" value={formProject.year}
                    onChange={(e) => setFormProject({ ...formProject, year: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1">Location</label>
                  <input
                    type="text" value={formProject.location}
                    onChange={(e) => setFormProject({ ...formProject, location: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1">Area</label>
                  <input
                    type="text" value={formProject.area}
                    onChange={(e) => setFormProject({ ...formProject, area: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1">Description *</label>
                <textarea
                  rows={3} required value={formProject.description}
                  onChange={(e) => setFormProject({ ...formProject, description: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1">Scope Tags (comma-separated)</label>
                <input
                  type="text" value={formProject.scope}
                  onChange={(e) => setFormProject({ ...formProject, scope: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Interior Design, Space Planning, Lighting"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-800">
                <button
                  type="button" onClick={() => setShowProjectModal(false)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-semibold py-3 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit" disabled={savingProject || uploadingCover || uploadingGallery}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-900/30"
                >
                  {savingProject ? "Saving..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TEAM MEMBER MODAL */}
      {showTeamModal && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">
                {editingMember ? "Edit Team Member" : "Add Firm Team Member"}
              </h3>
              <button onClick={() => setShowTeamModal(false)} className="text-gray-400 hover:text-white text-lg">✕</button>
            </div>

            <form onSubmit={handleSaveMember} className="space-y-5">
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1">Full Name *</label>
                <input
                  type="text" required value={formMember.name}
                  onChange={(e) => setFormMember({ ...formMember, name: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Ar. Rajesh Sharma"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1">Role / Designation *</label>
                <input
                  type="text" required value={formMember.role}
                  onChange={(e) => setFormMember({ ...formMember, role: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Founder & Principal Architect"
                />
              </div>

              {/* MEMBER PHOTO UPLOAD */}
              <div className="bg-gray-950 border border-gray-800 rounded-2xl p-4">
                <label className="block text-xs text-gray-300 uppercase tracking-widest font-semibold mb-2">
                  👤 Member Photo * (From PC / Mobile)
                </label>
                <p className="text-[11px] text-gray-400 mb-3">
                  Upload portrait or studio photo. The /firm page preserves the natural aspect ratio without distortion.
                </p>

                {formMember.photo ? (
                  <div className="relative w-40 h-48 rounded-xl overflow-hidden border border-gray-800 mb-3 bg-gray-900 mx-auto">
                    <Image src={formMember.photo} alt="Member Preview" fill className="object-contain" />
                    <button
                      type="button"
                      onClick={() => setFormMember({ ...formMember, photo: "" })}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full px-2 py-0.5 text-xs hover:bg-red-500 shadow-md"
                    >
                      ✕ Remove
                    </button>
                  </div>
                ) : null}

                <div className="flex items-center gap-3">
                  <label className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-md">
                    {uploadingMemberPhoto ? "Uploading Photo..." : "Upload Photo from Device"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleMemberPhotoUpload}
                      disabled={uploadingMemberPhoto}
                      className="hidden"
                    />
                  </label>
                </div>
                {uploadingMemberPhoto && <p className="text-xs text-blue-400 mt-2">Uploading member photo...</p>}
              </div>

              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1">Display Order</label>
                <input
                  type="number" value={formMember.order}
                  onChange={(e) => setFormMember({ ...formMember, order: parseInt(e.target.value) || 0 })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder="1"
                />
                <p className="text-[11px] text-gray-500 mt-1">Lower numbers appear first on the team page.</p>
              </div>

              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1">Bio / Description *</label>
                <textarea
                  rows={4} required value={formMember.bio}
                  onChange={(e) => setFormMember({ ...formMember, bio: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                  placeholder="Brief architectural background, design ethos, and leadership contributions..."
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-800">
                <button
                  type="button" onClick={() => setShowTeamModal(false)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-semibold py-3 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit" disabled={savingMember || uploadingMemberPhoto}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-900/30"
                >
                  {savingMember ? "Saving..." : "Save Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}