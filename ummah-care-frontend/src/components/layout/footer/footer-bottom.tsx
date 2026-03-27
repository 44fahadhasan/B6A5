import { TypographyMuted } from "@/components/shared/typography";
import Image from "next/image";
import Link from "next/link";
import { env } from "../../../../env";

export default function FooterBottom() {
  return (
    <div className="flex items-center justify-between gap-4 border-t py-4">
      <TypographyMuted>
        &copy; {new Date().getFullYear()} {env.NEXT_PUBLIC_APP_NAME}
      </TypographyMuted>
      <TypographyMuted className="inline-flex items-center gap-1 not-first:mt-0">
        <span>Built by</span>
        <Link
          aria-label="Md. Fahad Hasan"
          className="inline-flex items-center gap-1 text-foreground/80 hover:text-foreground hover:underline"
          href="https://44fahadhasan.vercel.app"
          rel="noreferrer"
          target="_blank"
        >
          <Image
            alt="Md. Fahad Hasan"
            className="size-4 rounded-full"
            height={500}
            src="https://github.com/44fahadhasan.png"
            width={500}
          />
          DEV.FH
        </Link>
      </TypographyMuted>
    </div>
  );
}
