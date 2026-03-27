import { Heart } from "lucide-react";
import Link from "next/link";
import { env } from "../../../env";

export const Logo = () => (
  <Link
    aria-label="Home"
    className="flex items-center gap-2 font-bold text-xl text-primary"
    href="/"
  >
    <Heart />
    <span>{env.NEXT_PUBLIC_APP_NAME}</span>
  </Link>
);
