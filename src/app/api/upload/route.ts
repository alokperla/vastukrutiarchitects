import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
]);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.has(file.type) && !file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Invalid file type. Only image files (JPG, PNG, WEBP, AVIF, GIF) are allowed." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds 10MB limit." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 1. Try Cloudinary upload if Cloudinary credentials are valid
    try {
      const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
      const apiKey = process.env.CLOUDINARY_API_KEY;
      const apiSecret = process.env.CLOUDINARY_API_SECRET;
      if (cloudName && apiKey && apiSecret && cloudName !== "vastukrutiarchitects") {
        const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "vastukruti_uploads" },
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
      console.warn("Cloudinary upload skipped or failed:", cErr);
    }

    // 2. Try Local File System Upload (works on local development / Node servers)
    try {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await fs.mkdir(uploadsDir, { recursive: true });

      const ext = path.extname(file.name) || ".jpg";
      const sanitizeName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_").toLowerCase();
      const fileName = `img_${Date.now()}_${sanitizeName}${ext}`;
      const filePath = path.join(uploadsDir, fileName);

      await fs.writeFile(filePath, buffer);
      return NextResponse.json({ url: `/uploads/${fileName}` }, { status: 200 });
    } catch (fsErr) {
      console.warn("Local filesystem upload failed or read-only (serverless fallback applied):", fsErr);
    }

    // 3. Fallback: Base64 Data URI
    const mimeType = file.type || "image/jpeg";
    const base64Data = buffer.toString("base64");
    const dataUri = `data:${mimeType};base64,${base64Data}`;

    return NextResponse.json({ url: dataUri }, { status: 200 });
  } catch (err) {
    console.error("Upload handler error:", err);
    return NextResponse.json({ error: "Failed to process photo upload" }, { status: 500 });
  }
}