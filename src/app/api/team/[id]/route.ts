import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fallbackTeamMembers } from "@/lib/team";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const memberId = parseInt(id);

    try {
      const member = await prisma.teamMember.findUnique({
        where: { id: memberId },
      });
      if (member) {
        return NextResponse.json(member);
      }
    } catch (dbErr) {
      console.warn("DB lookup failed for team member, checking fallback:", dbErr);
    }

    // Check fallback team members
    const fallbackMatch = fallbackTeamMembers.find((m) => m.id === memberId);
    if (fallbackMatch) {
      return NextResponse.json(fallbackMatch);
    }

    return NextResponse.json({ error: "Team member not found" }, { status: 404 });
  } catch (err) {
    console.error("Failed to fetch team member:", err);
    return NextResponse.json({ error: "Failed to fetch team member" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const member = await prisma.teamMember.update({
      where: { id: parseInt(id) },
      data: body,
    });
    return NextResponse.json(member);
  } catch (err) {
    console.error("Failed to update team member:", err);
    return NextResponse.json({ error: "Failed to update team member" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.teamMember.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to delete team member:", err);
    return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 });
  }
}
