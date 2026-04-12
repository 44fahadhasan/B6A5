"use client";

import { deleteResponse } from "@/actions/response.actions";
import { AppModal } from "@/components/shared/app-modal";
import { DataTableRowDeleteAction } from "@/components/shared/table/data-table-row-delete-action";
import {
  TypographyH3,
  TypographyMuted,
  TypographySmall,
} from "@/components/shared/typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { QUERY_KEY } from "@/constants/query.const";
import { HELP_TYPE } from "@/constants/request.const";
import { RESPONSE_TYPE } from "@/constants/response.const";
import { getInitials } from "@/lib/utils";
import { IMyResponse } from "@/types";
import { formatExpiryDate } from "@/utils/date-utils";
import { format } from "date-fns";
import DonateForm from "../donate/donate-form";
import MessageConversation from "../message/message-conversation";
import MessageForm from "../message/message-form";
import ResponseForm from "../responses/response-form";
import MangeRequestStatus from "./mange-request-status";
import MyResponseDetails from "./my-responses-details";

type MyResponseCardProps = {
  response: IMyResponse;
};

export default function MyResponseCard({ response }: MyResponseCardProps) {
  const { responseType, message, createdAt, request } = response;
  const creator = request.creator;

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarImage src={creator.avatarUrl ?? ""} alt={creator.name} />
            <AvatarFallback>{getInitials(creator.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <TypographyH3 className="text-sm font-semibold leading-none">
              {creator.name}
            </TypographyH3>
            <TypographyMuted>{creator.email}</TypographyMuted>
          </div>
          <TypographyMuted className="text-xs whitespace-nowrap">
            {format(new Date(createdAt), "PPpp")}
          </TypographyMuted>
        </div>
        <div className="space-y-1">
          <TypographyH3 className="text-sm font-semibold">
            {request.title}
          </TypographyH3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{request.category}</Badge>
            <Badge variant="outline">{request.status}</Badge>
            <Badge variant="destructive">{request.urgency}</Badge>
            <Badge variant="default">{request.helpType}</Badge>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <TypographySmall className="cursor-default text-muted-foreground">
                {formatExpiryDate(request.expiresAt)}
              </TypographySmall>
            </TooltipTrigger>
            <TooltipContent>
              {format(new Date(request.expiresAt), "PPpp")}
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex items-center gap-2">
          <TypographyMuted>Your Role:</TypographyMuted>
          <Badge className="text-xs px-2 py-0.5">{responseType}</Badge>
        </div>
        <div className="space-y-1">
          <TypographyMuted>Message:</TypographyMuted>
          <TypographyMuted className="leading-relaxed">
            {message?.trim() ? message : "No message provided"}
          </TypographyMuted>
        </div>
      </CardContent>
      <CardFooter className="flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3">
          <DataTableRowDeleteAction
            showIcon={false}
            showSeparator={false}
            id={response.id}
            label={response.request.title}
            queryKey={QUERY_KEY.RESPONSE.MY_RESPONSES}
            deleteFun={deleteResponse}
          />
          <AppModal
            variant="outline"
            className="sm:max-w-2xl"
            triggerText="View Details"
          >
            <MyResponseDetails responseId={response.id} />
          </AppModal>
          <AppModal
            variant="outline"
            className="sm:max-w-sm"
            triggerText="Edit"
          >
            <ResponseForm
              requestId={response.id}
              data={response}
              helpType={response.request.helpType}
            />
          </AppModal>
        </div>
        <div className="flex gap-3">
          {request.helpType !== HELP_TYPE.PHYSICAL &&
            responseType === RESPONSE_TYPE.DONATE && (
              <AppModal
                className="sm:max-w-sm"
                triggerText="Support with Donation"
                title="Make a Donation"
                description="Your contribution can bring relief and make a meaningful difference within the Ummah."
              >
                <DonateForm requestId={response.requestId} />
              </AppModal>
            )}
          <AppModal
            className="sm:max-w-sm"
            triggerText="Update Status"
            title="Update Request Status"
            description="Change the current status of this request."
          >
            <MangeRequestStatus
              requestId={response.requestId}
              currentStatus={response.request.status}
            />
          </AppModal>
          <AppModal
            heightClass="max-h-[30vh] sm:max-h-[35vh] md:max-h-[40vh] lg:max-h-[50vh]"
            className="sm:max-w-lg"
            triggerText="Chat"
            title="Chat with Request Owner"
            description="Communicate directly with the request owner about this request."
            modalFooterChildren={
              <MessageForm
                requestId={response.requestId}
                receiverId={response.request.creator.id}
              />
            }
          >
            <MessageConversation
              currentUserId={response.userId}
              requestId={response.requestId}
              participantId={response.request.creator.id}
            />
          </AppModal>
        </div>
      </CardFooter>
    </Card>
  );
}
