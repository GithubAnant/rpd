import { initTRPC } from "@trpc/server";
import superjson from "superjson";

/**
 * Context for tRPC procedures
 */
export type Context = {
  // auth removed
};

/**
 * Create context for each request
 */
export const createContext = async (): Promise<Context> => {
  return {};
};

/**
 * Initialize tRPC with superjson transformer for proper serialization
 */
const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

/**
 * Router and procedure exports
 */
export const router = t.router;
export const createCallerFactory = t.createCallerFactory;

/**
 * Public procedure - anyone can call
 */
export const publicProcedure = t.procedure;

/**
 * Protected procedure - formerly required authenticated session
 * Now aliased to publicProcedure as auth is removed.
 * TODO: Rename or remove if strictly not needed.
 */
export const protectedProcedure = publicProcedure;

/**
 * Premium procedure - placeholder for future premium features
 * Currently same as protected, will add premium checks later
 */
// export const premiumProcedure = protectedProcedure.use(async ({ ctx, next }) => {
//   // TODO: Add premium subscription check
//   // if (!ctx.auth?.user?.isPremium) {
//   //   throw new TRPCError({
//   //     code: "FORBIDDEN",
//   //     message: "This feature requires a premium subscription"
//   //   });
//   // }
//   return next({ ctx });
// });
