"use client";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { ArrowLeft, HomeIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex w-full items-center justify-center overflow-hidden">
      <div className="flex h-screen items-center border-x">
        <div>
          <FullWidthDivider />
          <Empty>
            <EmptyHeader>
              <EmptyTitle className="font-black font-mono text-8xl">
                404
              </EmptyTitle>
              <EmptyDescription className="text-nowrap">
                The page you&apos;re looking for might have been <br />
                moved or doesn&apos;t exist.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="flex gap-2">
                <Button
                  onClick={() => router.back()}
                  className="flex items-center"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Button>
                <Button asChild variant="outline">
                  <Link href="/">
                    <HomeIcon data-icon="inline-start" />
                    Go Home
                  </Link>
                </Button>
              </div>
            </EmptyContent>
          </Empty>
          <FullWidthDivider />
        </div>
      </div>
    </div>
  );
}
