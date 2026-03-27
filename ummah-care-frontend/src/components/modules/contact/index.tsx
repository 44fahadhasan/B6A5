import {
  TypographyH3,
  TypographyH4,
  TypographyMuted,
  TypographySmall,
} from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import DashedLine from "@/components/ui/dashed-line";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { env } from "../../../../env";
import ContactForm from "./contact-form";
import { contactInfo } from "./contact-info";
import { socialLinks } from "./social-links";

export default function Contact() {
  return (
    <div className="relative mx-auto w-full max-w-4xl border-x">
      <div className="flex flex-col gap-2 p-6 md:p-8 lg:p-12">
        <TypographyH3>Let&apos;s Talk</TypographyH3>
        <TypographyMuted>
          Need support or have a question about {env.NEXT_PUBLIC_APP_NAME}?
          We&apos;re here to help.
        </TypographyMuted>
      </div>
      <FullWidthDivider />
      <div
        className={cn(
          "grid gap-px bg-border *:bg-background md:grid-cols-2",
          "*:p-6 *:md:p-8 *:lg:p-12",
        )}
      >
        <div className="space-y-10 *:space-y-1.5">
          <DashedLine />
          {contactInfo.map((item) => (
            <div key={item.title}>
              <TypographyMuted>{item.title}</TypographyMuted>
              <TypographySmall>{item.value}</TypographySmall>
            </div>
          ))}
          <div>
            <TypographyMuted>Socials</TypographyMuted>
            <div className="flex">
              {socialLinks.map(({ icon, href, label }) => (
                <Button asChild key={label} size="icon-lg" variant="ghost">
                  <Link href={href} target="_blank">
                    {icon}
                    <span className="sr-only">{label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <DashedLine className="hidden md:block" />
          <div className="mb-8 flex flex-col gap-1.5">
            <TypographyH4>Send a message</TypographyH4>
            <TypographyMuted>
              Fill out the form below and our team will get back to you shortly.
            </TypographyMuted>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
