export const CATEGORY = {
  MEDICAL: "MEDICAL", // Hospital, medicine, surgery, disability
  FOOD: "FOOD", // Rations, meals, infant nutrition
  FINANCIAL: "FINANCIAL", // Cash, rent, bills, education fees
  HOUSING: "HOUSING", // Shelter, furniture, repairs, displacement
  OTHER: "OTHER", // Anything that doesn't fit the above
} as const;

export const URGENCY = {
  LOW: "LOW", // Can wait days to weeks
  MEDIUM: "MEDIUM", // Should be addressed within days
  HIGH: "HIGH", // Needs attention within 24–48 hours
  CRITICAL: "CRITICAL", // Life-impacting — needs immediate response
} as const;

export const HELP_TYPE = {
  FINANCIAL: "FINANCIAL", // Monetary donations only
  PHYSICAL: "PHYSICAL", // Volunteer time / in-person effort only
  BOTH: "BOTH", // Accepts either or a combination
} as const;

export const REQUEST_STATUS = {
  OPEN: "OPEN", // Accepting responses
  IN_PROGRESS: "IN_PROGRESS", // At least one assignment or donation confirmed
  COMPLETED: "COMPLETED", // Help has been fully delivered
  CANCELLED: "CANCELLED", // Withdrawn by owner or removed by Admin
} as const;
