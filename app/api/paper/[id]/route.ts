import { NextRequest, NextResponse } from "next/server";
import { fetchPaperById } from "@/lib/arxiv";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const paper = await fetchPaperById(id);

    if (!paper) {
      return NextResponse.json({ error: "Paper not found" }, { status: 404 });
    }

    return NextResponse.json(paper, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Paper API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch paper" },
      { status: 500 },
    );
  }
}
