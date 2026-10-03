export type Project = {
  slug: string;
  src: string;
  gallery: string[];
  title: string;
  category: string;
  desc: string;
  year: string;
  location: string;
  area: string;
  scope: string[];
  coverCaption?: string;
  videoUrl?: string;
  isFeatured?: boolean;
};

export function getYouTubeEmbedUrl(url?: string | null): string | null {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = trimmed.match(regExp);
  if (match && match[1]) {
    return `https://www.youtube-nocookie.com/embed/${match[1]}`;
  }
  return null;
}


export const projects: Project[] = [];