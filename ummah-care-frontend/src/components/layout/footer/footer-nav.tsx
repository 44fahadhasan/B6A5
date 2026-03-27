import Link from "next/link";
import { navLinks } from "./footer-links";

export default function FooterNav() {
  return (
    <nav>
      <ul className="flex flex-wrap gap-4 font-medium text-muted-foreground text-sm md:gap-6">
        {navLinks.map((link) => (
          <li key={link.label}>
            <Link className="hover:text-foreground" href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
