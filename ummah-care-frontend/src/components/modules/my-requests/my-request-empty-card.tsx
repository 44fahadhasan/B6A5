import { HandHeartIcon } from "lucide-react";

import { DataTableModal } from "@/components/shared/table/data-table-modal";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import MyRequestForm from "./my-request-form";

export function MyRequestEmptyCard() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HandHeartIcon />
        </EmptyMedia>
        <EmptyTitle>No Requests Found</EmptyTitle>
        <EmptyDescription>
          You haven’t submitted any requests yet. Start by creating a new
          request to get help from volunteers, donors, or organizations.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <DataTableModal
          mode="create"
          title="Add New Request"
          description="Fill in the details below to submit a new request."
        >
          <MyRequestForm />
        </DataTableModal>
      </EmptyContent>
    </Empty>
  );
}
