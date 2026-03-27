import { USER_TYPE } from "@/constants/user.const";
import z from "zod";

export const onboardingSchema = z
  .object({
    types: z
      .array(
        z.enum([USER_TYPE.VOLUNTEER, USER_TYPE.DONOR, USER_TYPE.ORGANIZATION]),
      )
      .nonempty("At least one type must be selected")
      .refine(
        (arr) => new Set(arr).size === arr.length,
        "Duplicate types are not allowed",
      ),

    // Optional org fields, only relevant if ORGANIZATION type is selected
    orgName: z.string().optional(),
    description: z.string().optional(),
    logoUrl: z.url().or(z.literal("")).optional(),
    website: z.url().or(z.literal("")).optional(),
    registrationNumber: z.string().optional(),
    contactEmail: z.email().or(z.literal("")).optional(),
    contactPhone: z.string().optional(),
  })

  .superRefine((data, ctx) => {
    if (!data.types.includes(USER_TYPE.ORGANIZATION)) return;

    const requiredFields: Array<{ field: keyof typeof data; label: string }> = [
      { field: "orgName", label: "Organization Name" },
      { field: "description", label: "Description" },
      { field: "logoUrl", label: "Logo URL" },
      { field: "website", label: "Website" },
      { field: "registrationNumber", label: "Registration Number" },
      { field: "contactEmail", label: "Contact Email" },
      { field: "contactPhone", label: "Contact Phone" },
    ];

    requiredFields.forEach((item) => {
      const value = data[item.field];

      if (!value || (typeof value === "string" && !value.trim())) {
        ctx.addIssue({
          code: "custom",
          path: [item.field],
          message: `${item.label} is required.`,
        });
      }
    });
  });

export type IOnboardingPayloadPayload = z.infer<typeof onboardingSchema>;
