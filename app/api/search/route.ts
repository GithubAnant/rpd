import { NextRequest, NextResponse } from "next/server";
import { searchPapers } from "@/lib/arxiv";
import { PapersResponse } from "@/types/paper";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");
    const page = parseInt(searchParams.get("page") || "0", 10);
    const pageSize = 10;

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 },
      );
    }

    const start = page * pageSize;
    const { papers, total } = await searchPapers(query.trim(), start, pageSize);

    const response: PapersResponse = {
      papers,
      totalResults: total,
      startIndex: start,
      hasMore: start + papers.length < total,
    };

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Failed to search papers" },
      { status: 500 },
    );
  }
}
