import {
  TypographyH2,
  TypographyMuted,
  TypographyP,
} from "@/components/shared/typography";
import Image from "next/image";

const testimonials = [
  {
    name: "Abdul Rahman",
    role: "Help Requester",
    avatar: "https://mockmind-api.uifaces.co/content/human/12.jpg",
    testimonial:
      "I was going through a very difficult time, and I didn’t know where to turn. Through Ummah Care, I received help within hours. It truly reminded me what community means.",
  },
  {
    name: "Fatima Noor",
    role: "Donor",
    avatar: "https://mockmind-api.uifaces.co/content/human/45.jpg",
    testimonial:
      "What I love most is the transparency. I can see exactly where my donation goes and how it helps someone in real life.",
  },
  {
    name: "Omar Hassan",
    role: "Volunteer",
    avatar: "https://mockmind-api.uifaces.co/content/human/33.jpg",
    testimonial:
      "Being able to physically help people in my area and track progress through the platform is an amazing experience.",
  },
  {
    name: "Md. Fahad Hasan",
    role: "Organization Manager",
    avatar: "https://github.com/44fahadhasan.png",
    testimonial:
      "Managing volunteers and requests in one place has made our work so much more efficient and impactful.",
  },
  {
    name: "Mahmudul Hasan",
    role: "Community Member",
    avatar: "https://mockmind-api.uifaces.co/content/human/77.jpg",
    testimonial:
      "This platform builds trust. You know the requests are real, and the system keeps everything transparent.",
  },
  {
    name: "Zainab Ali",
    role: "Donor",
    avatar: "https://mockmind-api.uifaces.co/content/human/91.jpg",
    testimonial:
      "Even small contributions feel meaningful because you can see the real impact. That’s what makes Ummah Care special.",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-(--breakpoint-xl) px-6 py-16 sm:py-24">
      <div className="text-center max-w-3xl mx-auto">
        <TypographyH2 className="text-4xl sm:text-5xl">
          Trusted by the Community
        </TypographyH2>
        <TypographyMuted className="mt-4 text-lg">
          Real stories from people who gave help, received support, and made a
          difference.
        </TypographyMuted>
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <span>🤝 Community Driven</span>
          <span>🔐 Verified Users</span>
          <span>📊 Transparent Impact</span>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-5xl columns-1 gap-6 sm:columns-2 lg:columns-3">
        {testimonials.map(({ name, avatar, role, testimonial }, index) => (
          <div
            key={index}
            className="mb-6 break-inside-avoid rounded-xl border bg-muted p-1.5"
          >
            <div className="relative flex flex-col rounded-lg border bg-background px-5 pt-10 pb-4 shadow-sm">
              <span className="absolute top-4 left-3 text-6xl text-muted-foreground/30 font-serif">
                “
              </span>
              <TypographyP className="py-6 text-base leading-relaxed">
                {testimonial}
              </TypographyP>
              <div className="mt-auto flex items-center gap-3 pt-4">
                <div className="relative h-11 w-11">
                  <Image
                    src={avatar}
                    alt={name}
                    fill
                    className="rounded-full object-cover ring-2 ring-border"
                  />
                </div>
                <div>
                  <TypographyP className="text-sm font-semibold">
                    {name}
                  </TypographyP>
                  <TypographyMuted className="text-xs">{role}</TypographyMuted>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
