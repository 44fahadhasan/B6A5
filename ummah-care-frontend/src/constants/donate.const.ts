export const DONATION_STATUS = {
  PENDING: "PENDING", // Payment intent created, awaiting payment
  COMPLETED: "COMPLETED", // Payment completed successfully
  FAILED: "FAILED", // Payment failed
  CANCELLED: "CANCELLED", // Donation cancelled by user or admin
} as const;
