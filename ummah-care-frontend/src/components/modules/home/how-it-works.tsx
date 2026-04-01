import { TypographyH2, TypographyMuted } from "@/components/shared/typography";
import BackgroundPattern from "@/components/ui/background-pattern";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  CheckCircleIcon,
  FileTextIcon,
  MessageCircleIcon,
  UsersIcon,
} from "lucide-react";

const steps = [
  {
    icon: FileTextIcon,
    title: "Post Request",
    desc: "Submit your need quickly with a simple form.",
  },
  {
    icon: UsersIcon,
    title: "Get Support",
    desc: "Donors, volunteers & organizations respond.",
  },
  {
    icon: MessageCircleIcon,
    title: "Coordinate",
    desc: "Chat and organize the help efficiently.",
  },
  {
    icon: CheckCircleIcon,
    title: "Deliver & Complete",
    desc: "Help is delivered and marked complete.",
  },
];

const delays = ["delay-100", "delay-200", "delay-300", "delay-500"];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="max-w-5xl mx-auto px-6 py-20">
      <div className="text-center mb-14 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <TypographyH2 className="mt-5 max-w-4xl mx-auto text-4xl sm:text-5xl leading-[1.1 text-balance">
          How it <span className="text-primary">Works</span>
        </TypographyH2>
        <TypographyMuted className="mt-3 text-lg">
          From request to real-world impact in just a few steps.
        </TypographyMuted>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, idx) => (
          <Card
            key={idx}
            className={cn(
              "group relative overflow-hidden text-center border transition-all duration-300",
              "hover:-translate-y-2 hover:shadow-xl hover:border-primary/50",
              "animate-in fade-in slide-in-from-bottom-4 duration-500",
              delays[idx],
            )}
          >
            <BackgroundPattern />
            <CardContent className="p-6 flex flex-col items-center gap-4">
              <step.icon className="w-10 h-10 text-primary transition-transform duration-300 group-hover:scale-110" />
              <TypographyH2 className="text-lg font-semibold">
                {step.title}
              </TypographyH2>
              <TypographyMuted className="text-base">
                {step.desc}
              </TypographyMuted>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
