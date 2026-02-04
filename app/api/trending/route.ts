import { NextRequest, NextResponse } from "next/server";
import { getTrendingPapers } from "@/lib/huggingface";

export async function GET(req: NextRequest) {
  try {
    const papers = await getTrendingPapers();

    // Pagination simulation (HF returns all ~50 trending papers at once)
    // We can just return them all or slice them if needed.
    // For now, let's return all since 50 is a reasonable page size.

    return NextResponse.json({
      papers,
      totalResults: papers.length,
      startIndex: 0,
      hasMore: false, // HF daily is a static list for the day usually
    });
  } catch (error) {
    console.error("Trending API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch trending papers" },
      { status: 500 },
    );
  }
}
