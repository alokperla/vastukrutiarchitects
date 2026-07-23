import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 1. Try Cloudinary upload if Cloudinary is configured
    try {
      const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
      if (cloudName && cloudName !== "vastukrutiarchitects") {
        const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "vastukruti_projects" },
            (error, result) => {
              if (error || !result) reject(error);
              else resolve(result);
            }
          );
          stream.end(buffer);
        });
        return NextResponse.json({ url: uploadResult.secure_url }, { status: 200 });
      }
    } catch (cErr) {
      console.warn("Cloudinary upload failed:", cErr);
    }

    // 2. Try Local File System Upload (works on local dev machine)
    try {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await fs.mkdir(uploadsDir, { recursive: true });

      const ext = path.extname(file.name) || ".jpg";
      const sanitizeName = file.name.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
      const fileName = `img_${Date.now()}_${sanitizeName}${ext}`;
      const filePath = path.join(uploadsDir, fileName);

      await fs.writeFile(filePath, buffer);
      return NextResponse.json({ url: `/uploads/${fileName}` }, { status: 200 });
    } catch (fsErr) {
      console.warn("Local filesystem is read-only (Vercel serverless environment), using Base64 Data URI fallback.");
    }

    // 3. Vercel Serverless Fallback: Convert to Base64 Data URI
    const mimeType = file.type || "image/jpeg";
    const base64Data = buffer.toString("base64");
    const dataUri = `data:${mimeType};base64,${base64Data}`;

    return NextResponse.json({ url: dataUri }, { status: 200 });
  } catch (err) {
    console.error("Upload handler error:", err);
    return NextResponse.json({ error: "Failed to process photo upload" }, { status: 500 });
  }
}