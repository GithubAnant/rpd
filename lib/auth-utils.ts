import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

/**
 * Server-side auth utilities for route guards
 */

/**
 * Get current session - returns null if not authenticated
 */
export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

/**
 * Require authentication - redirects to landing page if not authenticated
 * Use in server components/pages that require login
 */
export async function requireAuth(redirectTo = "/") {
  const session = await getSession();
  if (!session?.user) {
    redirect(redirectTo);
  }
  return session;
}

/**
 * Require unauthenticated - redirects to home if already authenticated
 * Use in login/signup pages
 */
export async function requireUnauth(redirectTo = "/home") {
  const session = await getSession();
  if (session?.user) {
    redirect(redirectTo);
  }
}

/**
 * Check if user is a guest (using localStorage flag, checked client-side)
 * For server-side, absence of session indicates guest mode
 */
export function isGuest(session: Awaited<ReturnType<typeof getSession>>) {
  return !session?.user;
}
