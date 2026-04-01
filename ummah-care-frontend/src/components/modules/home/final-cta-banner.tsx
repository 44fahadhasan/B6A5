import {
  TypographyBlockquote,
  TypographyH1,
} from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function FinalCtaBanner({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative rounded-lg text-foreground py-20 px-10 overflow-hidden",
        className,
      )}
      {...props}
    >
      <div className="relative z-10 text-center max-w-3xl mx-auto px-4 sm:px-0">
        <TypographyH1 className="text-4xl sm:text-5xl font-semibold leading-tight">
          Grow Your <strong className="text-primary">Akhirat</strong> by Serving
          the Ummah
        </TypographyH1>
        <TypographyBlockquote className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed">
          Join as a <span className="font-semibold text-foreground">donor</span>{" "}
          or <span className="font-semibold text-foreground">volunteer</span>{" "}
          and make a{" "}
          <span className="text-primary font-medium">lasting impact</span>.
          Every act of giving—whether your{" "}
          <span className="text-primary">time</span> or{" "}
          <span className="text-primary">contributions</span>—
          <span className="font-medium text-primary">
            brightens the lives of the needy, fortifies the Ummah, and brings
            rewards that echo in the Akhirat
          </span>
          . Take action today and leave a{" "}
          <span className="font-semibold text-foreground">
            legacy of goodness
          </span>{" "}
          that lasts beyond this life.
        </TypographyBlockquote>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <Button asChild size="sm" variant="outline">
            <Link href="/sign-up">Join as Volunteer</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/sign-up">Join as Donor</Link>
          </Button>
        </div>
      </div>
      <div
        className="absolute inset-0 -top-4 -left-px z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, oklch(from var(--foreground) l c h / 0.1) 1px, transparent 1px),
        linear-gradient(to bottom, oklch(from var(--foreground) l c h / 0.1) 1px, transparent 1px)
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
        )
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
        )
      `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
    </div>
  );
}
