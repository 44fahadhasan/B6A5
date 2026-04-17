import Link from "next/link";

import { TypographyH2, TypographyP } from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DonorPaymentCancelPage() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <TypographyH2 className="mb-4">Payment canceled</TypographyH2>
      <Card className="bg-destructive/15 ring-destructive">
        <CardHeader>
          <CardTitle>Payment was not completed</CardTitle>
          <CardDescription>
            We could not finalize your donation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <TypographyP>
            If you would like to try again, return to your donor dashboard and
            complete the donation process once more.
          </TypographyP>
          <Button asChild>
            <Link href="/donor/dashboard/my-donations">View All Donations</Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
