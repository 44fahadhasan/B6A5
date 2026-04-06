"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/use-session";
import Link from "next/link";
import { navLinks } from "./nav-links";

interface DesktopNavProps {
  dashboardPath: string;
}

export default function DesktopNav({ dashboardPath }: DesktopNavProps) {
  const session = useSession();

  return (
    <div className="hidden items-center gap-2 md:flex">
      <div>
        {navLinks.map((link) => (
          <Button asChild key={link.label} size="sm" variant="ghost">
            <Link href={link.href}>{link.label}</Link>
          </Button>
        ))}
      </div>
      {session ? (
        <Button asChild size="sm">
          <Link href={dashboardPath}>Dashboard</Link>
        </Button>
      ) : (
        <>
          <Button asChild size="sm" variant="outline">
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </>
      )}
    </div>
  );
}
