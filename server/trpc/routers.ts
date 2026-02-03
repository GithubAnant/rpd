import { router } from "./init";
import { papersRouter } from "@/features/papers/server/router";

/**
 * Main app router - merges all feature routers
 */
export const appRouter = router({
  papers: papersRouter,
});

/**
 * Export type definition for client-side usage
 */
export type AppRouter = typeof appRouter;
