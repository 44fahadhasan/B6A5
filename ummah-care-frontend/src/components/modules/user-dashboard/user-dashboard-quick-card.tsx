import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Users } from "lucide-react";
import Link from "next/link";

export default function UserDashboardQuickCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Access your requests and donations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button asChild variant="outline" className="h-20">
            <Link
              href="/dashboard/my-requests"
              className="flex flex-col items-center gap-2"
            >
              <Users className="size-6" />
              <span>My Requests</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-20">
            <Link
              href="/dashboard/received-donations"
              className="flex flex-col items-center gap-2"
            >
              <Heart className="size-6" />
              <span>Received Donations</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
