import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ArxivLogo } from "@/components/ui/arxiv-logo";
import { EnterButton } from "@/components/enter-button";

export default async function LandingPage() {
  const cookieStore = await cookies();
  const hasVisited = cookieStore.get("visited");

  if (hasVisited) {
    redirect("/home");
  }

  return (
    <main className="min-h-screen bg-black flex">
      {/* Left side - branding */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-black text-[#e7e9ea]">
        <ArxivLogo size="2xl" />
      </div>

      {/* Right side - auth (now content) */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 max-w-150">
        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <ArxivLogo size="xl" className="!w-20 !h-20" />
        </div>

        <h1 className="text-[40px] lg:text-[64px] font-bold text-[#e7e9ea] leading-tight mb-12">
          Research papers,<br />happening now
        </h1>

        <p className="text-[31px] font-bold text-[#e7e9ea] mb-8">
          Join today.
        </p>

        {/* Enter button */}
        <div className="flex flex-col gap-4 max-w-75">
          <EnterButton />
        </div>

        {/* Terms */}
        <p className="text-[11px] text-[#71767b] mt-4 max-w-75">
          By entering, you agree to consume pure science. No distractions.
        </p>
      </div>
    </main>
  );
}
