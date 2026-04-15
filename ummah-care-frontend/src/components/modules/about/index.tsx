import {
  TypographyH1,
  TypographyH2,
  TypographyLead,
  TypographyList,
  TypographyMuted,
  TypographyP,
} from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function About() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-14">
        <TypographyH1 className="text-balance">About Ummah Care</TypographyH1>
        <TypographyLead className="mt-4 max-w-2xl mx-auto">
          Empowering the Ummah to support each other—anytime, anywhere. Our
          mission is to make help accessible, transparent, and impactful for
          every Muslim in need.
        </TypographyLead>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-20">
        <div>
          <TypographyH2 className="text-2xl sm:text-3xl mb-4">
            Our Vision
          </TypographyH2>
          <TypographyP>
            We envision a world where every member of the Ummah can easily
            request help, offer support, and build trust—no matter where they
            are. By leveraging technology, we connect donors, volunteers,
            organizations, and those in need on a single, secure platform.
          </TypographyP>
        </div>
        <div>
          <TypographyH2 className="text-2xl sm:text-3xl mb-4">
            What Makes Us Unique?
          </TypographyH2>
          <TypographyList>
            <li>Verified users and transparent impact tracking</li>
            <li>Real-time messaging and secure coordination</li>
            <li>
              Role-based system for users, donors, volunteers, and organizations
            </li>
            <li>Easy request posting and structured response management</li>
          </TypographyList>
        </div>
      </div>
      <div className="bg-primary/5 rounded-xl p-8 md:p-12 mb-20 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <TypographyH2 className="text-2xl sm:text-3xl mb-4">
            How We Operate
          </TypographyH2>
          <TypographyP>
            Ummah Care is built on trust, transparency, and community-driven
            values. Every request is reviewed, and every response is tracked for
            accountability. Our platform ensures that help reaches those who
            need it most, efficiently and securely.
          </TypographyP>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <TypographyMuted className="mb-2">
            Ready to make a difference?
          </TypographyMuted>
          <Button asChild size="sm" className="w-full max-w-xs">
            <Link href="/sign-up">Join the Ummah Care Community</Link>
          </Button>
        </div>
      </div>
      <div className="max-w-3xl mx-auto text-center">
        <TypographyH2 className="text-2xl sm:text-3xl mb-4">
          Contact & Collaboration
        </TypographyH2>
        <TypographyP>
          We welcome partnerships with organizations, masjids, and community
          leaders. For collaboration, feedback, or support, please reach out at{" "}
          <Link
            href="mailto:support@ummahcare.com"
            className="underline text-primary"
          >
            support@ummahcare.com
          </Link>
          .
        </TypographyP>
      </div>
    </section>
  );
}
