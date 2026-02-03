import { NextRequest, NextResponse } from "next/server";
import { fetchPapersFromArxiv, ARXIV_CATEGORIES } from "@/lib/arxiv";
import { PapersResponse } from "@/types/paper";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "0", 10);
    const category = searchParams.get("category") || "cs.AI";
    const pageSize = 10;

    // Validate category
    const validCategory = ARXIV_CATEGORIES.find((c) => c.id === category);
    if (!validCategory) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    const start = page * pageSize;
    const { papers, total } = await fetchPapersFromArxiv(
      category,
      start,
      pageSize,
    );

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
    console.error("Papers API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch papers" },
      { status: 500 },
    );
  }
}
