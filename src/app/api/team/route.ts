import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { fallbackTeamMembers } from "@/lib/team";

const teamSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role/Designation is required"),
  bio: z.string().min(1, "Bio is required"),
  photo: z.string().min(1, "Photo is required"),
  order: z.number().optional().default(0),
});

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
    if (!members || members.length === 0) {
      return NextResponse.json(fallbackTeamMembers);
    }
    return NextResponse.json(members);
  } catch (err) {
    console.error("Failed to fetch team members:", err);
    // Return fallback members if DB error or table not yet migrated
    return NextResponse.json(fallbackTeamMembers);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = teamSchema.parse(body);
    const member = await prisma.teamMember.create({ data });
    return NextResponse.json(member, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    console.error("Failed to create team member:", err);
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 });
  }
}
