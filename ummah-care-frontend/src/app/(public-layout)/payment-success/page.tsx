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

export default function DonorPaymentSuccessPage() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <TypographyH2 className="mb-4">Payment complete</TypographyH2>
      <Card className="bg-primary/10 ring-primary">
        <CardHeader>
          <CardTitle>Thank you for your donation</CardTitle>
          <CardDescription>
            Your payment has been processed successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <TypographyP>
            Your support makes a real difference. You can review your donation
            history and continue supporting causes from your donor dashboard.
          </TypographyP>
          <Button asChild>
            <Link href="/donor/dashboard/my-donations">View All Donations</Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
