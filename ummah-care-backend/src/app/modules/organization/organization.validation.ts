import { paginationUtils } from "@/app/utils/pagination.util";
import { z } from "zod";

export const createOrganizationSchema = z.object({
  orgName: z.string().min(2).max(200),
  description: z.string().max(5000).optional(),
  logoUrl: z.url().optional(),
  website: z.url().optional().or(z.string().max(255)),
  registrationNumber: z.string().max(100).optional(),
  contactEmail: z.email().optional(),
  contactPhone: z.string().max(20).optional(),
});

export const updateOrganizationSchema = createOrganizationSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required for update",
  });

export const organizationListQuerySchema = paginationUtils.paginationQuerySchema.extend({
  isVerified: z.boolean().optional(),
  search: z.string().optional(),
});

export const verifyOrganizationSchema = z.object({
  isVerified: z.boolean(),
});
