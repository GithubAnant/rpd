"use client";

import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/server/trpc/routers";

/**
 * tRPC React hooks for client-side usage
 */
export const trpc = createTRPCReact<AppRouter>();
