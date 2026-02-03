import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

/**
 * Context for tRPC procedures
 */
export type Context = {
  auth?: typeof auth.$Infer.Session;
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
 * Protected procedure - requires authenticated session
 * Verifies authentication server-side using better-auth
 */
export const protectedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to perform this action",
    });
  }

  return next({
    ctx: {
      ...ctx,
      auth: session,
    },
  });
});

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
