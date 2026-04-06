"use client";

import { Button } from "@/components/ui/button";
import { Portal, PortalBackdrop } from "@/components/ui/portal";
import { useSession } from "@/hooks/use-session";
import { cn } from "@/lib/utils";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { navLinks } from "./nav-links";

interface MobileNavProps {
  dashboardPath: string;
}

export function MobileNav({ dashboardPath }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);

  const session = useSession();

  return (
    <div className="md:hidden">
      <Button
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label="Toggle menu"
        className="md:hidden"
        onClick={() => setOpen(!open)}
        size="icon"
        variant="outline"
      >
        {open ? (
          <XIcon className="size-4.5" />
        ) : (
          <MenuIcon className="size-4.5" />
        )}
      </Button>
      {open && (
        <Portal className="top-14" id="mobile-menu">
          <PortalBackdrop />
          <div
            className={cn(
              "data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in",
              "size-full p-4",
            )}
            data-slot={open ? "open" : "closed"}
          >
            <div className="grid gap-y-2">
              {navLinks.map((link) => (
                <Button
                  asChild
                  className="justify-start"
                  key={link.label}
                  variant="ghost"
                >
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              ))}
            </div>
            <div className="mt-12 flex flex-col gap-2">
              {session ? (
                <Button asChild size="sm">
                  <Link href={dashboardPath}>Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                  <Button asChild size="sm" className="w-full">
                    <Link href="/sign-up">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}
