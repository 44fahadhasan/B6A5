import {
  TypographyH2,
  TypographyLarge,
  TypographyMuted,
  TypographyP,
} from "@/components/shared/typography";
import { cn } from "@/lib/utils";
import {
  CircleDollarSign,
  Package,
  PackageX,
  ShieldPlus,
  Users,
  Waypoints,
} from "lucide-react";

const faqs = [
  {
    question: "What is Ummah Care?",
    answer:
      "Ummah Care is a community-driven platform where people can request help and others can respond by donating, volunteering, or organizing support.",
    icon: Users,
  },
  {
    question: "Who can request help?",
    answer:
      "Any registered user can post a help request. You can specify your need, urgency, and location to get the right support.",
    icon: Waypoints,
  },
  {
    question: "How does the help process work?",
    answer:
      "Users create requests → donors or volunteers respond → organizations can manage and assign tasks → the request is completed and verified.",
    icon: Package,
  },
  {
    question: "What roles are available on the platform?",
    answer:
      "There are four main roles: Users (request help), Donors (provide money), Volunteers (provide physical help), and Organizations (manage large-scale support).",
    icon: Users,
  },
  {
    question: "How are donations tracked?",
    answer:
      "All donations follow a transparent flow: Pledged → Sent → Confirmed. This ensures accountability and trust for everyone involved.",
    icon: CircleDollarSign,
  },
  {
    question: "Can organizations manage volunteers?",
    answer:
      "Yes. Organizations can assign volunteers to specific tasks, monitor progress, and ensure help is delivered efficiently.",
    icon: ShieldPlus,
  },
  {
    question: "Is my information secure?",
    answer:
      "Yes. We use secure authentication and data protection practices to keep your personal and activity data safe.",
    icon: ShieldPlus,
  },
  {
    question: "How do I know if a request is genuine?",
    answer:
      "Requests can be verified by organizations and community feedback. Transparency and tracking help ensure trust.",
    icon: PackageX,
  },
  {
    question: "Can I cancel or update my request?",
    answer:
      "Yes, you can edit or cancel your request before it is fully assigned or completed.",
    icon: PackageX,
  },
  {
    question: "Is there real-time communication?",
    answer:
      "Yes. Users, donors, volunteers, and organizations can communicate through built-in messaging for coordination.",
    icon: Waypoints,
  },
];

export function FAQ() {
  return (
    <section className="bg-secondary/40">
      <div className="max-w-(--breakpoint-xl) mx-auto px-6 text-center py-24">
        <TypographyH2 className="mt-5 max-w-4xl mx-auto text-4xl sm:text-5xl leading-[1.1] font-semibold tracking-tighter text-balance">
          Frequently Asked Questions
        </TypographyH2>
        <TypographyMuted className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
          Find answers about how Ummah Care works, how to request help, and how
          you can support others.
        </TypographyMuted>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={cn(
                "relative p-6 border bg-card -ms-px -mt-px text-start overflow-hidden",
                "first:rounded-t-lg md:first:rounded-tr-none md:nth-[2]:rounded-tr-lg md:nth-last-[2]:rounded-bl-lg last:rounded-b-lg md:last:rounded-bl-none",
              )}
            >
              <div
                className="absolute inset-0 -ms-px -mt-0.5 z-0"
                style={{
                  backgroundImage: `
        linear-gradient(to right, oklch(from var(--card-foreground) l c h / 0.07) 1px, transparent 1px),
        linear-gradient(to bottom, oklch(from var(--card-foreground) l c h / 0.07) 1px, transparent 1px)
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
            radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)
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
            radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)
      `,
                  maskComposite: "intersect",
                  WebkitMaskComposite: "source-in",
                }}
              />
              <div className="isolate">
                <TypographyLarge className="flex items-center gap-2">
                  <faq.icon className="text-primary mr-2.5 size-5 shrink-0" />
                  {faq.question}
                </TypographyLarge>
                <TypographyP className="mt-2 pl-10 text-base text-start text-muted-foreground">
                  {faq.answer}
                </TypographyP>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
