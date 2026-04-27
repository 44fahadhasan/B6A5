import type z from "zod";
import type {
  createOrganizationSchema,
  organizationListQuerySchema,
  updateOrganizationSchema,
} from "./organization.validation";

export type CreateOrganizationPayload = z.infer<typeof createOrganizationSchema>;
export type UpdateOrganizationPayload = z.infer<typeof updateOrganizationSchema>;
export type OrganizationListQuery = z.infer<typeof organizationListQuerySchema>;
