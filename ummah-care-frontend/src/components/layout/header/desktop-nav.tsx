"use client";

import { getSession } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { navLinks } from "./nav-links";

interface DesktopNavProps {
  dashboardPath: string;
}

export default function DesktopNav({ dashboardPath }: DesktopNavProps) {
  const { data } = useQuery({
    queryKey: ["session"],
    queryFn: () => getSession(),
  });

  return (
    <div className="hidden items-center gap-2 md:flex">
      <div>
        {navLinks.map((link) => (
          <Button asChild key={link.label} size="sm" variant="ghost">
            <Link href={link.href}>{link.label}</Link>
          </Button>
        ))}
      </div>
      {data?.success ? (
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
