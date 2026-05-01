export const QUERY_KEY = {
  SESSION: "session",
  REQUEST: {
    REQUEST: "requests",
    REQUEST_LIST: "request-list",
    ALL_REQUEST: "all_requests",
    REQUEST_DETAILS: "request-details",
    MY_REQUEST: "my-requests",
  },
  CAMPAIGN: {
    CAMPAIGN: "campaigns",
    MY_CAMPAIGN: "my-campaigns",
    CAMPAIGN_DETAILS: "campaign-details",
  },
  RESPONSE: {
    ALL_RESPONSE: "all_response",
    MY_RESPONSES: "my-responses",
    MY_RESPONSES_DETAILS: "my-responses-details",
    MY_REQUEST_RESPONSES: "my-request-response",
  },
  MESSAGE: {
    MY_CONVERSATION: "my-conversation",
  },
  DONATION: {
    DONATIONS: "donations",
    MY_DONATIONS: "my-donations",
    RECEIVED_DONATIONS: "received-donations",
  },
  ASSIGNMENT: {
    ASSIGNMENTS: "assignments",
    ASSIGNMENT_DETAILS: "assignment-details",
  },
  USER: {
    ALL_USERS: "all_users",
    ALL_VOLUNTEERS: "all_volunteers",
    ALL_DONORS: "all_donors",
    ALL_ORGANIZATIONS: "all_organizations",
  },
  DASHBOARD_STATS: "dashboard-stats",
} as const;
