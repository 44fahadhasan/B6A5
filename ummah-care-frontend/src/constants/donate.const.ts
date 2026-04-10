export const DONATION_STATUS = {
  PENDING: "PENDING", // Payment intent created, awaiting payment
  COMPLETED: "COMPLETED", // Payment completed successfully
  FAILED: "FAILED", // Payment failed
  CANCELLED: "CANCELLED", // Donation cancelled by user or admin
} as const;

export const PAYMENT_METHOD = {
  STRIPE: "STRIPE",
  MANUAL: "MANUAL", // bank_transfer, cash, cheque, bkash, nagad etc
} as const;

export const PAYMENT_CALLBACK_URL = {
  SUCCESS: "http://localhost:3000/payment-success",
  CANCEL: "http://localhost:3000/payment-cancel",
} as const;
