import {
  TypographyH2,
  TypographyH4,
  TypographyLarge,
  TypographyMuted,
  TypographyP,
} from "@/components/shared/typography";
import BackgroundPattern from "@/components/ui/background-pattern";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowUpRightIcon,
  Building2Icon,
  CircleDollarSignIcon,
  HandHeartIcon,
  UsersRoundIcon,
} from "lucide-react";
import Link from "next/link";

const roles = [
  {
    icon: HandHeartIcon,
    title: "User",
    subtitle: "Start your journey",
    desc: "Sign up as a User to request help, connect with supporters, and explore the Ummah Care community.",
  },
  {
    icon: CircleDollarSignIcon,
    title: "Donor",
    subtitle: "Empower through giving",
    desc: "Provide financial aid to those in need and track your contributions transparently.",
  },
  {
    icon: UsersRoundIcon,
    title: "Volunteer",
    subtitle: "Hands-on support",
    desc: "Offer your skills and time to support requests in your area, making a direct impact.",
  },
  {
    icon: Building2Icon,
    title: "Organization",
    subtitle: "Lead and scale",
    desc: "Manage campaigns, assign volunteers, and coordinate large-scale efforts effectively.",
  },
];

const delays = ["delay-100", "delay-200", "delay-300", "delay-500"];

export function RoleSystem() {
  return (
    <div className="bg-primary/4">
      <section className="max-w-(--breakpoint-xl) mx-auto px-6 text-center py-24">
        <strong className="font-semibold text-muted-foreground">
          Powerful Role System
        </strong>
        <TypographyH2 className="mt-5 max-w-4xl mx-auto text-4xl sm:text-5xl leading-[1.1 text-balance">
          Everyone plays a <span className="text-primary">role</span> — together
          we create real impact
        </TypographyH2>
        <TypographyMuted className="mt-3 max-w-2xl mx-auto text-lg">
          Sign up as a <strong>User</strong> first, then unlock additional roles
          after onboarding.
        </TypographyMuted>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 justify-items-center">
          {roles.map((role, i) => (
            <div
              key={role.title}
              className={cn(
                "rounded-lg border bg-muted p-1 w-full sm:max-w-xs",
                "transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary/50",
                "animate-in fade-in slide-in-from-bottom-4",
                delays[i],
              )}
            >
              <div className="relative px-6 py-10 bg-card rounded-md border h-full overflow-hidden flex flex-col items-center gap-4">
                <BackgroundPattern />
                <role.icon
                  className="size-14 text-primary transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={1.75}
                />
                <TypographyH4>{role.title}</TypographyH4>
                <TypographyLarge className="text-muted-foreground">
                  {role.subtitle}
                </TypographyLarge>
                <TypographyP className="text-center  not-first:mt-0">
                  {role.desc}
                </TypographyP>
                <Button asChild size="sm">
                  <Link href="/sign-up">
                    {role.title === "User" ? "Sign Up" : "Join"}
                    <ArrowUpRightIcon className="size-4" />
                  </Link>
                </Button>
                <PatternDashedTop />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const PatternDashedTop = () => {
  return (
    <div
      className="absolute inset-0 -top-px -left-px z-0"
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
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
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
            radial-gradient(ellipse 70% 50% at 50% 0%, #000 60%, transparent 100%)
      `,
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    />
  );
};
