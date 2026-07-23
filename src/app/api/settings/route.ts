import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    let settings = await prisma.siteSettings.findFirst();
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          id: 1,
          whatsapp: "919100010573",
          email: "vastukrutiarchitects@gmail.com",
          instagram: "https://www.instagram.com/vastu_kruti24",
          aboutText: "Vastukruti Architects crafts inspiring residential and commercial spaces that blend timeless tradition with modern innovation.",
        },
      });
    }
    return NextResponse.json(settings);
  } catch (err) {
    return NextResponse.json({ error: "Failed to load settings" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const settings = await prisma.siteSettings.upsert({
      where: { id: 1 },
      update: body,
      create: { id: 1, ...body },
    });
    return NextResponse.json(settings);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}