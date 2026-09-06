export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  photo: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export const fallbackTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Ar. Rajesh Sharma",
    role: "Founder & Principal Architect",
    bio: "With over 15 years of design leadership, Rajesh blends traditional Indian spatial philosophy with bold contemporary forms. He oversees design direction and master planning across our residential and cultural commissions.",
    photo: "/brand/vastukruti logo.jpeg",
    order: 1,
  },
  {
    id: 2,
    name: "Ar. Priya Patel",
    role: "Co-Founder & Design Director",
    bio: "Priya champions sensory architecture and contextual materiality. Her portfolio spans award-winning luxury residences and boutique workspaces, known for refined details and natural lighting orchestration.",
    photo: "/brand/vastukruti logo.jpeg",
    order: 2,
  },
  {
    id: 3,
    name: "Ar. Vikram Mehta",
    role: "Senior Project Architect",
    bio: "Vikram specializes in complex building engineering, sustainable facade systems, and precision detailing. He guides projects from conceptual engineering to turnkey site realization.",
    photo: "/brand/vastukruti logo.jpeg",
    order: 3,
  },
  {
    id: 4,
    name: "Sneha Deshmukh",
    role: "Head of Interior Architecture",
    bio: "Sneha brings bespoke spatial curation, artisan-crafted joinery, and intimate tactile palettes to every interior space. Her work emphasizes warmth, quiet luxury, and client personalization.",
    photo: "/brand/vastukruti logo.jpeg",
    order: 4,
  },
];
