const allowedSortByFields = [
  "createdAt",
  "updatedAt",
  "startDate",
  "endDate",
  "goalAmount",
  "currentAmount",
  "status",
] as const;

export const campaignConsts = { allowedSortByFields };
