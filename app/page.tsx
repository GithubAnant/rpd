import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { SignInButton, GuestButton } from '@/components/AuthButtons';

export default async function LandingPage() {
  const session = await getServerSession();

  if (session?.user) {
    redirect('/home');
  }

  return (
    <main className="min-h-screen bg-black flex">
      {/* Left side - branding */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-black">
        <svg className="w-80 h-80 text-[#e7e9ea]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.5 3h-15A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zM12 17.5a5.5 5.5 0 110-11 5.5 5.5 0 010 11z" />
        </svg>
      </div>

      {/* Right side - auth */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 max-w-[600px]">
        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <svg className="w-12 h-12 text-[#e7e9ea]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.5 3h-15A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zM12 17.5a5.5 5.5 0 110-11 5.5 5.5 0 010 11z" />
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
