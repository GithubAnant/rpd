import { Paper } from "@/types/paper";

interface HFPaper {
  paper: {
    id: string;
    title: string;
    summary: string;
    authors: { name: string }[];
    publishedAt: string;
    url: string; // The HF page URL
  };
  thumbnail: string; // The social image URL
  numComments: number;
  upvotes: number;
}

export async function getTrendingPapers(): Promise<Paper[]> {
  try {
    const res = await fetch("https://huggingface.co/api/daily_papers", {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      console.error("Failed to fetch HF papers:", res.statusText);
      return [];
    }

    const data: HFPaper[] = await res.json();

    return data.map((item) => {
      // The API structure can be inconsistent.
      // Sometimes 'paper' is nested, sometimes fields are at root if it was a direct fetch.
      // We assume the standard response format: { paper: { ... }, thumbnail: ... }

      const p = item.paper;
      const arxivId = p.id;

      return {
        id: arxivId,
        title: p.title,
        abstract: p.summary,
        authors: p.authors.map((a) => a.name),
        publishedDate: p.publishedAt,
        updatedDate: p.publishedAt,
        categories: ["cs.AI"], // Default to AI for HF papers as they are curated ML papers
        primaryCategory: "cs.AI",
        pdfUrl: `https://arxiv.org/pdf/${arxivId}.pdf`,
        arxivUrl: `https://arxiv.org/abs/${arxivId}`,
        thumbnail: item.thumbnail,
      };
    });
  } catch (error) {
    console.error("Error fetching trending papers:", error);
    return [];
  }
}
