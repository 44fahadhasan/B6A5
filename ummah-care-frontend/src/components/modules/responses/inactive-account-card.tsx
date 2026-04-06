import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function InactiveAccountCard() {
  return (
    <Card className="ring-0">
      <CardHeader>
        <CardTitle>Account Not Active</CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground">
        It looks like your account isn’t active yet. Only active Volunteers,
        Donors, or Organizations can respond. Please check your dashboard or
        complete onboarding to continue.
      </CardContent>
      <Button asChild size="sm" className="w-1/2 ml-auto">
        <Link href="/dashboard">Go to Dashboard</Link>
      </Button>
    </Card>
  );
}
