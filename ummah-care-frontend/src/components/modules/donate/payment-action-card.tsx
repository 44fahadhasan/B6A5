import { TypographyH4, TypographyP } from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import Link from "next/link";

type PaymentActionCardProps = {
  paymentUrl: string;
};

export function PaymentActionCard({ paymentUrl }: PaymentActionCardProps) {
  return (
    <Card className="ring-0">
      <CardContent className="space-y-2">
        <TypographyH4>Complete Your Donation</TypographyH4>
        <TypographyP className="text-muted-foreground">
          Your donation is almost ready. Proceed to the secure payment page to
          finalize your contribution.
        </TypographyP>
        <Button asChild size="sm" className="w-full">
          <Link
            href={paymentUrl}
            className="flex items-center justify-center gap-2"
          >
            <CreditCard className="h-4 w-4" />
            Proceed to Payment
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
