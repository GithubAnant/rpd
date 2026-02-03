export interface Paper {
  id: string;
  title: string;
  abstract: string;
  authors: string[];
  publishedDate: string;
  updatedDate: string;
  categories: string[];
  primaryCategory: string;
  pdfUrl: string;
  arxivUrl: string;
}

export interface PapersResponse {
  papers: Paper[];
  totalResults: number;
  startIndex: number;
  hasMore: boolean;
}
