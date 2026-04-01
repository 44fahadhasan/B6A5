import {
  TypographyH2,
  TypographyH4,
  TypographyMuted,
} from "@/components/shared/typography";
import BackgroundPattern from "@/components/ui/background-pattern";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRightIcon,
  CheckCircle2Icon,
  HeartIcon,
  MapPinIcon,
  MessageCircleIcon,
  ShieldCheckIcon,
  UsersRoundIcon,
} from "lucide-react";

const featureHighlights = [
  {
    icon: MapPinIcon,
    title: "Smart Help Requests",
    description:
      "Post, filter, and track requests by urgency, category, and location.",
  },
  {
    icon: UsersRoundIcon,
    title: "Multi-Type Responses",
    description:
      "Donors, volunteers, and organizations respond with structured tracking.",
  },
  {
    icon: HeartIcon,
    title: "Volunteer Assignment",
    description: "Assign volunteers efficiently and track tasks in real time.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Trust & Verification",
    description: "Verified users with ratings, reviews, and trust scores.",
  },
  {
    icon: MessageCircleIcon,
    title: "Real-Time Messaging",
    description:
      "Coordinate instantly with secure and transparent conversations.",
  },
  {
    icon: CheckCircle2Icon,
    title: "Donation Tracking",
    description:
      "Track donations from pledge to confirmation with full transparency.",
  },
];

export function FeatureHighlights() {
  return (
    <section className="max-w-(--breakpoint-xl) mx-auto px-6 text-center py-24">
      <strong className="font-semibold text-muted-foreground">
        Feature Highlights
      </strong>
      <TypographyH2 className="mt-5 max-w-5xl mx-auto text-4xl sm:text-5xl leading-[1.1] font-semibold tracking-tighter text-balance">
        Empower the Ummah — Help <br />
        <span className="text-primary">Anytime, Anywhere</span>
      </TypographyH2>
      <TypographyMuted className="mt-5 text-lg max-w-2xl mx-auto">
        Request help, donate, or volunteer — securely with Ummah Care.
      </TypographyMuted>
      <div className="mt-14 flex flex-wrap gap-6 justify-center">
        {featureHighlights.map((feature) => (
          <div
            key={feature.title}
            className="relative isolate overflow-hidden border rounded-xl px-6 py-10 w-full sm:max-w-xs flex flex-col items-center gap-3 
            bg-linear-to-b from-primary/5 to-transparent 
            hover:from-primary/10 
            shadow-sm hover:shadow-xl 
            transition-all duration-300 hover:-translate-y-2"
          >
            <BackgroundPattern />
            <feature.icon className="size-14 stroke-[1.5px] text-primary transition-transform duration-300 group-hover:scale-110" />
            <TypographyH4 className="mt-6">{feature.title}</TypographyH4>
            <TypographyMuted className="text-base text-balance">
              {feature.description}
            </TypographyMuted>
            <Button
              size="sm"
              variant="ghost"
              className="mt-6 group items-center gap-2"
            >
              Learn More
              <ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
