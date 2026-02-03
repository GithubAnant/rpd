import { Paper } from "@/types/paper";
import { DOMParser } from "@xmldom/xmldom";

const ARXIV_API_BASE = "https://export.arxiv.org/api/query";

// Simple in-memory cache
const cache = new Map<
  string,
  { data: Paper[]; timestamp: number; total: number }
>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getElementText(parent: Element, tagName: string): string {
  const els = parent.getElementsByTagName(tagName);
  if (els.length > 0 && els[0].textContent) {
    return els[0].textContent.trim();
  }
  return "";
}

function parseArxivEntry(entry: Element): Paper {
  const getAuthors = (): string[] => {
    const authors: string[] = [];
    const authorEls = entry.getElementsByTagName("author");
    for (let i = 0; i < authorEls.length; i++) {
      const nameEls = authorEls[i].getElementsByTagName("name");
      if (nameEls.length > 0 && nameEls[0].textContent) {
        authors.push(nameEls[0].textContent.trim());
      }
    }
    return authors;
  };

  const getCategories = (): string[] => {
    const cats: string[] = [];
    const catEls = entry.getElementsByTagName("category");
    for (let i = 0; i < catEls.length; i++) {
      const term = catEls[i].getAttribute("term");
      if (term) cats.push(term);
    }
    return cats;
  };

  const getPrimaryCategory = (): string => {
    const primaryEls = entry.getElementsByTagNameNS(
      "http://arxiv.org/schemas/atom",
      "primary_category",
    );
    if (primaryEls.length > 0) {
      const term = primaryEls[0].getAttribute("term");
      if (term) return term;
    }
    const cats = getCategories();
    return cats[0] || "";
  };

  const idText = getElementText(entry, "id");
  const id = idText.split("/abs/").pop()?.split("v")[0] || idText;
  const categories = getCategories();

  return {
    id,
    title: getElementText(entry, "title").replace(/\s+/g, " "),
    abstract: getElementText(entry, "summary").replace(/\s+/g, " "),
    authors: getAuthors(),
    publishedDate: getElementText(entry, "published"),
    updatedDate: getElementText(entry, "updated"),
    categories,
    primaryCategory: getPrimaryCategory(),
    pdfUrl: `https://arxiv.org/pdf/${id}.pdf`,
    arxivUrl: `https://arxiv.org/abs/${id}`,
  };
}

/**
 * Fetch paginated papers from arXiv API
 */
export async function fetchPapers(
  category: string = "cs.AI",
  start: number = 0,
  maxResults: number = 10,
): Promise<{ papers: Paper[]; total: number }> {
  const cacheKey = `${category}-${start}-${maxResults}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return { papers: cached.data, total: cached.total };
  }

  const searchQuery = `cat:${category}`;
  const url = `${ARXIV_API_BASE}?search_query=${encodeURIComponent(searchQuery)}&start=${start}&max_results=${maxResults}&sortBy=submittedDate&sortOrder=descending`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "ArxivDoomscroller/1.0 (Research Paper Reader)",
    },
  });

  if (!response.ok) {
    throw new Error(`arXiv API error: ${response.status}`);
  }

  const xmlText = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, "text/xml");

  const entries = doc.getElementsByTagName("entry");
  const papers: Paper[] = [];

  for (let i = 0; i < entries.length; i++) {
    papers.push(parseArxivEntry(entries[i] as Element));
  }

  const totalEls = doc.getElementsByTagNameNS(
    "http://a9.com/-/spec/opensearch/1.1/",
    "totalResults",
  );
  let total = 0;
  if (totalEls.length > 0 && totalEls[0].textContent) {
    total = parseInt(totalEls[0].textContent, 10);
  }

  cache.set(cacheKey, { data: papers, timestamp: Date.now(), total });

  return { papers, total };
}

/**
 * Fetch a single paper by ID
 */
const paperCache = new Map<string, { data: Paper; timestamp: number }>();

export async function fetchPaperById(id: string): Promise<Paper | null> {
  const cached = paperCache.get(id);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const url = `${ARXIV_API_BASE}?id_list=${encodeURIComponent(id)}`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "ArxivDoomscroller/1.0 (Research Paper Reader)",
    },
  });

  if (!response.ok) {
    throw new Error(`arXiv API error: ${response.status}`);
  }

  const xmlText = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, "text/xml");

  const entries = doc.getElementsByTagName("entry");

  if (entries.length === 0) {
    return null;
  }

  const paper = parseArxivEntry(entries[0] as Element);
  paperCache.set(id, { data: paper, timestamp: Date.now() });

  return paper;
}

/**
 * Search papers by query string
 */
export async function searchPapers(
  query: string,
  start: number = 0,
  maxResults: number = 10,
): Promise<{ papers: Paper[]; total: number }> {
  const searchQuery = `all:${query}`;
  const url = `${ARXIV_API_BASE}?search_query=${encodeURIComponent(searchQuery)}&start=${start}&max_results=${maxResults}&sortBy=relevance&sortOrder=descending`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "ArxivDoomscroller/1.0 (Research Paper Reader)",
    },
  });

  if (!response.ok) {
    throw new Error(`arXiv API error: ${response.status}`);
  }

  const xmlText = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, "text/xml");

  const entries = doc.getElementsByTagName("entry");
  const papers: Paper[] = [];

  for (let i = 0; i < entries.length; i++) {
    papers.push(parseArxivEntry(entries[i] as Element));
  }

  const totalEls = doc.getElementsByTagNameNS(
    "http://a9.com/-/spec/opensearch/1.1/",
    "totalResults",
  );
  let total = 0;
  if (totalEls.length > 0 && totalEls[0].textContent) {
    total = parseInt(totalEls[0].textContent, 10);
  }

  return { papers, total };
}

/**
 * Available arXiv categories
 */
export const ARXIV_CATEGORIES = [
  { id: "cs.AI", name: "Artificial Intelligence" },
  { id: "cs.LG", name: "Machine Learning" },
  { id: "cs.CL", name: "Computation & Language" },
  { id: "cs.CV", name: "Computer Vision" },
  { id: "cs.NE", name: "Neural & Evolutionary" },
  { id: "cs.RO", name: "Robotics" },
  { id: "stat.ML", name: "Statistics ML" },
  { id: "cs.SE", name: "Software Engineering" },
  { id: "cs.CR", name: "Cryptography" },
  { id: "cs.DC", name: "Distributed Computing" },
] as const;
