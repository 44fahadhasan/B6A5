import { TypographyH1, TypographyMuted } from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, RocketIcon } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <div className="relative">
      <div className="min-h-[calc(90svh-10rem)] max-w-5xl mx-auto text-center flex flex-col justify-center items-center px-6">
        <Link
          href="#how-it-works"
          className="group flex w-fit items-center gap-3 rounded-full border bg-card px-2 py-0.5 shadow-lg
                   fade-in slide-in-from-bottom animate-in fill-mode-backwards
                   transition-all delay-500 duration-500 ease-out"
        >
          <RocketIcon className="size-4 text-primary" />
          <TypographyMuted className="text-xs">
            Empower the Ummah — Help Anytime, Anywhere
          </TypographyMuted>
          <span className="block h-5 border-l border-muted-foreground" />
          <ArrowRightIcon className="size-4 transition-transform duration-150 ease-out group-hover:translate-x-1" />
        </Link>
        <TypographyH1
          className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight max-w-3xl mx-auto
                              fade-in slide-in-from-bottom animate-in fill-mode-backwards
                              delay-100 duration-500 ease-out text-balance"
        >
          Request Help, Donate & Volunteer
        </TypographyH1>
        <TypographyMuted
          className="mt-6 text-lg max-w-2xl mx-auto
                                  fade-in slide-in-from-bottom animate-in fill-mode-backwards
                                  delay-200 duration-500 ease-out"
        >
          Ummah Care connects Muslims to support each other efficiently — post
          requests, donate, or volunteer and make an impact today.
        </TypographyMuted>
        <div
          className="mt-10 flex gap-4 flex-wrap justify-center
                      fade-in slide-in-from-bottom animate-in fill-mode-backwards
                      delay-300 duration-500 ease-out"
        >
          <Button size="sm" asChild>
            <Link href="/dashboard/my-requests">Post a Help Request</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/volunteer/dashboard">Volunteer to Help</Link>
          </Button>
        </div>
      </div>
      <BackgroundPattern />
    </div>
  );
}

function BackgroundPattern() {
  return (
    <div
      className="absolute inset-0 -z-1"
      style={{
        backgroundImage: `
        linear-gradient(to right, var(--border) 1px, transparent 1px),
        linear-gradient(to bottom, var(--border) 1px, transparent 1px)
      `,
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 0 0",
        maskImage: `
       repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
          radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
      `,
        WebkitMaskImage: `
 repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
          radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
      `,
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    />
  );
}
