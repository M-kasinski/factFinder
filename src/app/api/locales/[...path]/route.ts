import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "locales",
      ...params.path
    );
    
    const fileContent = await fs.readFile(filePath, "utf8");
    
    return new NextResponse(fileContent, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error serving locale file:", error);
    return new NextResponse(JSON.stringify({ error: "File not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
} 