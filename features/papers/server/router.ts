import { z } from "zod";
import { router, publicProcedure } from "@/server/trpc/init";
import {
  fetchPapers,
  fetchPaperById,
  searchPapers,
  ARXIV_CATEGORIES,
} from "./service";

/**
 * Papers router - handles all paper-related API endpoints
 */
export const papersRouter = router({
  /**
   * List papers with pagination and category filter
   */
  list: publicProcedure
    .input(
      z.object({
        page: z.number().min(0).default(0),
        category: z.string().default("cs.AI"),
        pageSize: z.number().min(1).max(50).default(10),
      }),
    )
    .query(async ({ input }) => {
      const { page, category, pageSize } = input;

      // Validate category
      const validCategory = ARXIV_CATEGORIES.find((c) => c.id === category);
      if (!validCategory) {
        throw new Error("Invalid category");
      }

      const start = page * pageSize;
      const { papers, total } = await fetchPapers(category, start, pageSize);

      return {
        papers,
        totalResults: total,
        startIndex: start,
        hasMore: start + papers.length < total,
      };
    }),

  /**
   * Get a single paper by ID
   */
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const paper = await fetchPaperById(input.id);
      if (!paper) {
        throw new Error("Paper not found");
      }
      return paper;
    }),

  /**
   * Search papers by query
   */
  search: publicProcedure
    .input(
      z.object({
        query: z.string().min(1),
        page: z.number().min(0).default(0),
        pageSize: z.number().min(1).max(50).default(10),
      }),
    )
    .query(async ({ input }) => {
      const { query, page, pageSize } = input;
      const start = page * pageSize;
      const { papers, total } = await searchPapers(query, start, pageSize);

      return {
        papers,
        totalResults: total,
        startIndex: start,
        hasMore: start + papers.length < total,
      };
    }),

  /**
   * Get available categories
   */
  categories: publicProcedure.query(() => {
    return ARXIV_CATEGORIES;
  }),
});
