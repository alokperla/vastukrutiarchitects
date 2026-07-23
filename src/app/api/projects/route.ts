import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  year: z.string().default("2024"),
  location: z.string().default("India"),
  area: z.string().default("N/A"),
  coverImage: z.string().min(1, "Cover image is required"),
  gallery: z.array(z.string()).default([]),
  scope: z.array(z.string()).default([]),
  published: z.boolean().default(true),
});

export async function GET() {
  try {
    const projects = await prisma.projectEntry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(projects);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = projectSchema.parse(body);
    const project = await prisma.projectEntry.create({ data });
    return NextResponse.json(project, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}