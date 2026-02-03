import Link from "next/link";
import { redirect } from "next/navigation";
import { SignInButton, GuestButton } from "@/features/auth";
import { ArxivLogo } from "@/components/ui/arxiv-logo";
import { getSession } from "@/lib/auth-utils";

export default async function LandingPage() {
  const session = await getSession();

  if (session?.user) {
    redirect("/home");
  }

  return (
    <main className="min-h-screen bg-black flex">
      {/* Left side - branding */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-black text-[#e7e9ea]">
        <ArxivLogo size="xl" />
      </div>

      {/* Right side - auth */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 max-w-[600px]">
        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none">
            <line x1="75" y1="15" x2="25" y2="85" stroke="#e7e9ea" strokeWidth="14" strokeLinecap="round" />
            <line x1="25" y1="15" x2="75" y2="85" stroke="#e7e9ea" strokeWidth="14" strokeLinecap="round" />
            <line x1="25" y1="15" x2="75" y2="85" stroke="black" strokeWidth="8" strokeLinecap="round" />
          </svg>
        </div>

        <h1 className="text-[40px] lg:text-[64px] font-bold text-[#e7e9ea] leading-tight mb-12">
          Research papers,<br />happening now
        </h1>

        <p className="text-[31px] font-bold text-[#e7e9ea] mb-8">
          Join today.
        </p>

        {/* Auth buttons */}
        <div className="flex flex-col gap-4 max-w-[300px]">
          <SignInButton />

          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-[#2f3336]" />
            <span className="text-[#71767b] text-sm">or</span>
            <div className="flex-1 h-px bg-[#2f3336]" />
          </div>

          <GuestButton />
        </div>

        {/* Terms */}
        <p className="text-[11px] text-[#71767b] mt-4 max-w-[300px]">
          By signing up, you agree to the Terms of Service and Privacy Policy.
        </p>

        {/* Sign in link */}
        <p className="text-[17px] text-[#e7e9ea] mt-16">
          Already have an account?{' '}
          <Link href="/api/auth/signin" className="text-[#1d9bf0] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
