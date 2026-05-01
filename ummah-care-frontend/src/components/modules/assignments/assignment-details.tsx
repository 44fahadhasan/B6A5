import {
  TypographyH4,
  TypographyMuted,
  TypographyP,
} from "@/components/shared/typography";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IAssignmentResponse } from "@/types/assignment.type";
import { format } from "date-fns";

type MyAssignmentDetailsProps = {
  data: IAssignmentResponse;
};

export default function MyAssignmentDetails({
  data,
}: MyAssignmentDetailsProps) {
  return (
    <div className="space-y-4">
      <Card className="ring-0">
        <CardHeader>
          <CardTitle className="text-base">Assignment summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <TypographyH4 className="text-base">Request</TypographyH4>
              <TypographyP className="not-first:mt-0">
                {data.request.title}
              </TypographyP>
            </div>
            <div>
              <TypographyH4 className="text-base">Status</TypographyH4>
              <Badge>{data.status.replace(/_/g, " ")}</Badge>
            </div>
            <div>
              <TypographyH4 className="text-base">Target Type</TypographyH4>
              <Badge>{data.targetType}</Badge>
            </div>
            <div>
              <TypographyH4 className="text-base">Assigned At</TypographyH4>
              <TypographyP className="not-first:mt-0">
                {format(new Date(data.assignedAt), "dd MMM yyyy")}
              </TypographyP>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <TypographyH4 className="text-base">Volunteer</TypographyH4>
              <TypographyP className="not-first:mt-0">
                {data.volunteer?.name ?? "Not assigned"}
              </TypographyP>
              <TypographyMuted>{data.volunteer?.email ?? "-"}</TypographyMuted>
            </div>
          </div>
          {data.notes ? (
            <div>
              <TypographyH4 className="text-base">Notes</TypographyH4>
              <TypographyP className="not-first:mt-0">{data.notes}</TypographyP>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
